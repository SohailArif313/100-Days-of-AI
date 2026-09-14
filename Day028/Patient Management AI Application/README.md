# MediBot — Patient Records

A small patient management app. FastAPI backend, SQLite database, plain HTML/CSS/JS frontend, with a chat-style assistant for looking up patients or asking general health questions.

## What it does

- Add, edit, and (soft) delete patient records
- Search, sort, and paginate the patient table
- Undo a delete by patient ID
- BMI and weight verdict (Underweight / Healthy / Overweight / Obese) are calculated automatically from height and weight
- Dark mode toggle on the frontend
- "Ask MediBot" box that understands three kinds of input:
  - a patient ID (e.g. `P001`) → returns that patient
  - a name → returns matching patient(s)
  - a filter/list request (e.g. `list patients above age 50`, `bmi < 20`, `overweight patients`) → returns matches straight from the database, no AI call needed
  - anything else → gets passed to an LLM (via LangChain + OpenAI) as a general health question, with a rate limit of 5 requests per minute per IP

## Tech stack

- **Backend:** FastAPI, SQLAlchemy, Pydantic
- **Database:** SQLite
- **AI:** LangChain + OpenAI (`gpt-5-nano`) for the general Q&A fallback
- **Frontend:** plain HTML, CSS, JavaScript (no framework)

## Project structure

```
main.py          # FastAPI app — all routes
models.py        # Pydantic schemas (Patient, requests/responses)
database.py      # SQLAlchemy engine, session, and table models
migrate.py       # one-time script to load patients.json into the database
check_db.py      # quick script to print out everything currently in the db
patients.json    # sample/seed data used by migrate.py
index.html       # frontend page
script.js        # frontend logic (fetches, table state, edit/undo)
style.css        # frontend styling
requirements.txt
```

## Setup

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Create a `.env` file in the project root with your OpenAI key:
   ```
   OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx
   ```

3. (Optional) If you want to start from the sample data, run the migration script once:
   ```bash
   python migrate.py
   ```
   This reads `patients.json` and loads it into `patients.db`.

4. Start the API:
   ```bash
   uvicorn main:app --reload
   ```
   API docs are available at `http://127.0.0.1:8000/docs`.

5. Open `index.html` in your browser. It talks to the API at `http://127.0.0.1:8000`.

## API endpoints

| Method | Route | What it does |
|---|---|---|
| GET | `/view` | List patients — supports `search`, `sort_by`, `order`, `page`, `page_size` |
| GET | `/patient/{id}` | Get one patient by ID |
| GET | `/sort` | Get all patients sorted by height, weight, or age |
| POST | `/create` | Add a new patient |
| PUT | `/edit/{id}` | Update a patient |
| DELETE | `/delete/{id}` | Soft-delete a patient (kept in the db, marked as deleted) |
| POST | `/undo/{id}` | Restore a soft-deleted patient |
| POST | `/ask` | The MediBot endpoint described above |

Deletes are soft — a deleted patient is flagged with `is_deleted`, not removed, which is what makes the undo feature possible.

## Notes

- `check_db.py` is just a debug helper — run it to print every row currently in `patients.db`.
- The `/ask` filter parsing (`_parse_filter` in `main.py`) understands both symbols (`age>43`) and natural language (`patients above age 50`), and only falls back to the LLM when nothing else matches.
- CORS is wide open (`allow_origins=["*"]`) since this is a local/learning project — lock it down before deploying anywhere real.