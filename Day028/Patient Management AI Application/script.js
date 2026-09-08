const API_BASE = "http://127.0.0.1:8000";

let lastDeletedId = null; // powers the one-click "Undo" toast after a delete

// ---------------------------------------------------------
// Dark mode
// ---------------------------------------------------------
// Applied immediately (not waiting for DOMContentLoaded) so the page
// doesn't flash light-then-dark on reload. Preference is remembered
// in localStorage.
function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("medibot_theme", isDark ? "dark" : "light");
}

const savedTheme = localStorage.getItem("medibot_theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme ? savedTheme === "dark" : prefersDark);

// Table state: search / sort / pagination
const tableState = {
  search: "",
  sortBy: "",
  order: "asc",
  page: 1,
  pageSize: 20
};

let searchDebounceTimer = null;

// ---------------------------------------------------------
// Boot
// ---------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  checkServer();
  loadPatients();

  document.getElementById("themeToggle").addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("dark"));
  });

  document.getElementById("createForm").addEventListener("submit", handleCreate);
  document.getElementById("askForm").addEventListener("submit", handleAsk);
  document.getElementById("refreshBtn").addEventListener("click", () => loadPatients());
  document.getElementById("undoBtn").addEventListener("click", handleManualUndo);

  document.getElementById("searchBox").addEventListener("input", (e) => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      tableState.search = e.target.value.trim();
      tableState.page = 1; // reset to first page on a new search
      loadPatients();
    }, 300); // debounce: wait until the user pauses typing
  });

  document.getElementById("sortBy").addEventListener("change", (e) => {
    tableState.sortBy = e.target.value;
    tableState.page = 1;
    loadPatients();
  });

  document.getElementById("sortOrder").addEventListener("change", (e) => {
    tableState.order = e.target.value;
    tableState.page = 1;
    loadPatients();
  });

  document.getElementById("pageSize").addEventListener("change", (e) => {
    tableState.pageSize = parseInt(e.target.value, 10);
    tableState.page = 1;
    loadPatients();
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (tableState.page > 1) {
      tableState.page -= 1;
      loadPatients();
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    tableState.page += 1;
    loadPatients();
  });
});

async function checkServer() {
  const status = document.getElementById("topStatus");
  try {
    const res = await fetch(`${API_BASE}/about`);
    if (res.ok) {
      status.textContent = "● API connected";
      status.classList.remove("offline");
    } else {
      throw new Error("bad status");
    }
  } catch {
    status.textContent = "● API offline";
    status.classList.add("offline");
  }
}

// ---------------------------------------------------------
// Load patients: search + sort + pagination all handled server-side,
// so this stays fast even with thousands of records.
// ---------------------------------------------------------
async function loadPatients() {
  const table = document.getElementById("patient_table");
  table.innerHTML = `<tr><td colspan="10" class="empty">Loading patients…</td></tr>`;

  const params = new URLSearchParams({
    page: tableState.page,
    page_size: tableState.pageSize
  });
  if (tableState.search) params.set("search", tableState.search);
  if (tableState.sortBy) {
    params.set("sort_by", tableState.sortBy);
    params.set("order", tableState.order);
  }

  try {
    const res = await fetch(`${API_BASE}/view?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to load");
    const data = await res.json();

    renderPagination(data);

    if (!data.items || data.items.length === 0) {
      table.innerHTML = tableState.search
        ? `<tr><td colspan="10" class="empty">No patients match "${tableState.search}".</td></tr>`
        : `<tr><td colspan="10" class="empty">No patient records yet. Register one above.</td></tr>`;
      return;
    }

    table.innerHTML = data.items.map(rowHtml).join("");
    attachRowHandlers();
  } catch (err) {
    table.innerHTML = `<tr><td colspan="10" class="empty">Could not reach the server. Is it running?</td></tr>`;
    document.getElementById("resultSummary").textContent = "—";
  }
}

function renderPagination(data) {
  const { total, page, page_size, total_pages } = data;

  const start = total === 0 ? 0 : (page - 1) * page_size + 1;
  const end = Math.min(page * page_size, total);

  document.getElementById("resultSummary").textContent =
    total === 0 ? "No results" : `Showing ${start}–${end} of ${total} patients`;

  document.getElementById("pageIndicator").textContent = `Page ${page} of ${total_pages}`;
  document.getElementById("prevPage").disabled = page <= 1;
  document.getElementById("nextPage").disabled = page >= total_pages;

  tableState.page = page; // in case the server clamped an out-of-range page
}

function verdictClass(v) {
  const map = {
    "Underweight": "underweight",
    "Healthy weight": "healthy",
    "Overweight": "overweight",
    "Obese": "obese"
  };
  return map[v] || "healthy";
}

function rowHtml(p) {
  return `
    <tr data-id="${p.id}">
      <td><span class="id-chip">${p.id}</span></td>
      <td class="cell-name">${p.name}</td>
      <td class="cell-city">${p.city}</td>
      <td class="cell-gender">${p.gender}</td>
      <td class="cell-age">${p.age}</td>
      <td class="cell-height">${p.height}</td>
      <td class="cell-weight">${p.weight}</td>
      <td>${p.bmi ?? "—"}</td>
      <td><span class="verdict ${verdictClass(p.verdict)}">${p.verdict ?? "—"}</span></td>
      <td>
        <div class="row-actions">
          <button class="btn btn-ghost btn-sm" data-action="edit">Edit</button>
          <button class="btn btn-danger btn-sm" data-action="delete">Delete</button>
        </div>
      </td>
    </tr>`;
}

function attachRowHandlers() {
  document.querySelectorAll('[data-action="delete"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = e.target.closest("tr").dataset.id;
      handleDelete(id);
    });
  });
  document.querySelectorAll('[data-action="edit"]').forEach(btn => {
    btn.addEventListener("click", (e) => {
      const tr = e.target.closest("tr");
      enterEditMode(tr);
    });
  });
}

// ---------------------------------------------------------
// Create
// ---------------------------------------------------------
async function handleCreate(e) {
  e.preventDefault();
  const msg = document.getElementById("createMsg");
  msg.textContent = "";
  msg.className = "form-msg";

  const payload = {
    id: document.getElementById("c_id").value.trim(),
    name: document.getElementById("c_name").value.trim(),
    city: document.getElementById("c_city").value.trim(),
    age: parseInt(document.getElementById("c_age").value, 10),
    gender: document.getElementById("c_gender").value,
    height: parseFloat(document.getElementById("c_height").value),
    weight: parseFloat(document.getElementById("c_weight").value)
  };

  try {
    const res = await fetch(`${API_BASE}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      msg.textContent = "Patient saved.";
      msg.classList.add("ok");
      document.getElementById("createForm").reset();
      loadPatients();
    } else {
      msg.textContent = typeof data.detail === "string" ? data.detail : "Could not save patient.";
      msg.classList.add("err");
    }
  } catch {
    msg.textContent = "Connection failed. Is the server running?";
    msg.classList.add("err");
  }
}

// ---------------------------------------------------------
// Edit (inline row editing)
// ---------------------------------------------------------
function enterEditMode(tr) {
  const id = tr.dataset.id;
  const get = (cls) => tr.querySelector(`.${cls}`).textContent.trim();

  const current = {
    name: get("cell-name"),
    city: get("cell-city"),
    gender: get("cell-gender"),
    age: get("cell-age"),
    height: get("cell-height"),
    weight: get("cell-weight")
  };

  tr.querySelector(".cell-name").innerHTML = `<input class="edit-input" data-f="name" value="${current.name}">`;
  tr.querySelector(".cell-city").innerHTML = `<input class="edit-input" data-f="city" value="${current.city}">`;
  tr.querySelector(".cell-gender").innerHTML = `
    <select class="edit-input" data-f="gender">
      <option value="male" ${current.gender === "male" ? "selected" : ""}>male</option>
      <option value="female" ${current.gender === "female" ? "selected" : ""}>female</option>
      <option value="others" ${current.gender === "others" ? "selected" : ""}>others</option>
    </select>`;
  tr.querySelector(".cell-age").innerHTML = `<input class="edit-input" type="number" data-f="age" value="${current.age}">`;
  tr.querySelector(".cell-height").innerHTML = `<input class="edit-input" type="number" step="0.01" data-f="height" value="${current.height}">`;
  tr.querySelector(".cell-weight").innerHTML = `<input class="edit-input" type="number" step="0.1" data-f="weight" value="${current.weight}">`;

  const actionsCell = tr.querySelector(".row-actions");
  actionsCell.innerHTML = `
    <button class="btn btn-primary btn-sm" data-action="save">Save</button>
    <button class="btn btn-ghost btn-sm" data-action="cancel">Cancel</button>
  `;

  tr.querySelector('[data-action="save"]').addEventListener("click", () => saveEdit(tr, id));
  tr.querySelector('[data-action="cancel"]').addEventListener("click", () => loadPatients());
}

async function saveEdit(tr, id) {
  const payload = {
    name: tr.querySelector('[data-f="name"]').value.trim(),
    city: tr.querySelector('[data-f="city"]').value.trim(),
    gender: tr.querySelector('[data-f="gender"]').value,
    age: parseInt(tr.querySelector('[data-f="age"]').value, 10),
    height: parseFloat(tr.querySelector('[data-f="height"]').value),
    weight: parseFloat(tr.querySelector('[data-f="weight"]').value)
  };

  try {
    const res = await fetch(`${API_BASE}/edit/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      loadPatients();
    } else {
      const data = await res.json();
      alert(data.detail || "Could not update patient.");
    }
  } catch {
    alert("Connection failed. Is the server running?");
  }
}

// ---------------------------------------------------------
// Delete + one-click undo toast
// ---------------------------------------------------------
async function handleDelete(id) {
  if (!confirm(`Delete patient ${id}? You can restore them afterwards.`)) return;

  try {
    const res = await fetch(`${API_BASE}/delete/${id}`, { method: "DELETE" });
    const data = await res.json();

    if (res.ok) {
      lastDeletedId = id;
      document.getElementById("undo_id").value = id;
      const undoMsg = document.getElementById("undoMsg");
      undoMsg.textContent = `${id} deleted — click Restore to undo.`;
      undoMsg.className = "form-msg ok";
      loadPatients();
    } else {
      alert(data.detail || "Could not delete patient.");
    }
  } catch {
    alert("Connection failed. Is the server running?");
  }
}

async function handleManualUndo() {
  const id = document.getElementById("undo_id").value.trim().toUpperCase();
  const msg = document.getElementById("undoMsg");
  msg.textContent = "";
  msg.className = "form-msg";

  if (!id) {
    msg.textContent = "Enter a Patient ID first.";
    msg.classList.add("err");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/undo/${id}`, { method: "POST" });
    const data = await res.json();

    if (res.ok) {
      msg.textContent = `${id} restored.`;
      msg.classList.add("ok");
      document.getElementById("undo_id").value = "";
      loadPatients();
    } else {
      msg.textContent = data.detail || "Could not restore patient.";
      msg.classList.add("err");
    }
  } catch {
    msg.textContent = "Connection failed. Is the server running?";
    msg.classList.add("err");
  }
}

// ---------------------------------------------------------
// Ask MediBot — handles: single patient / multiple patients / text / error
// ---------------------------------------------------------
async function handleAsk(e) {
  e.preventDefault();
  const input = document.getElementById("ai_question");
  const question = input.value.trim();
  const box = document.getElementById("ai_response");

  if (!question) return;

  box.innerHTML = `<span class="muted">Thinking…</span>`;

  try {
    const res = await fetch(`${API_BASE}/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });

    const data = await res.json();

    if (!res.ok) {
      box.innerHTML = `<span style="color:var(--coral)">${data.detail || "Something went wrong."}</span>`;
      return;
    }

    if (data.type === "patient" && data.patient) {
      box.innerHTML = patientMiniHtml(data.patient);
    } else if (data.type === "patients" && data.patients) {
      const label = data.label || `${data.patients.length} patients matched`;
      box.innerHTML =
        `<div class="match-count">${label}</div>` +
        data.patients.map(patientMiniHtml).join("");
    } else if (data.type === "error") {
      box.innerHTML = `<span style="color:var(--coral)">${data.message}</span>`;
    } else {
      box.innerHTML = `<p style="margin:0">${data.answer || "No response received."}</p>`;
    }
  } catch {
    box.innerHTML = `<span style="color:var(--coral)">Connection failed. Is the server running?</span>`;
  }
}

function patientMiniHtml(p) {
  return `
    <div class="patient-mini">
      <div class="row">
        <span class="name">${p.name}</span>
        <span class="id-chip">${p.id}</span>
      </div>
      <div class="meta">${p.city} · ${p.age} yrs · ${p.gender} · ${p.height}m / ${p.weight}kg · BMI ${p.bmi ?? "—"}</div>
    </div>`;
}