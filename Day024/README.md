# Day 24 - 3D Plotting & Advanced Matplotlib Visualizations

Part of the [100-Days-of-AI](https://github.com/SohailArif313/100-Days-of-AI) series. Matplotlib practice exercises focused on 3D charts and mathematical surface plots, built across three datasets: a power generation dataset, a Nifty-50 stock dataset, and a synthetic time-series dataset. Also includes two pure-math problems that plot equations directly (no dataset needed).

---

## Overview

- **Problems 1-2:** Power generation data — a 2-panel scatter comparison of top 5 power stations, and a 3D scatter plot of capacity vs maintenance metrics.
- **Problems 3-5:** Pure math — surface, 3D contour, and combined surface+contour plots of `z = |x| - |y|`.
- **Problems 6-7:** Nifty-50 stock data — line plot of top 5 stocks' closing prices in 2020, and a scatter plot of close price vs volume in 2021.
- **Problem 8:** A synthetic 3D dataset (`time`, `sin(time)`, `cos(time)`) plotted as a 3D scatter with a color gradient.
- **Problems 9-10:** Surface and contour plots of two more equations — `z = sin(√(x²+y²))` and `z = tan(log₂(x²+y²))`.

---

## Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib (including `mplot3d`)
- scikit-learn (`LabelEncoder`, imported but limited use)

---

## Project Structure

```
100-Days-of-AI/
└── Day_024/
    ├── Day_024_code.ipynb
    ├── Data/
    │   ├── PowerGeneration.csv
    │   └── nifty-50.csv
    ├── Plots/
    │   ├── all plots(.png)
    └── README.md
```

---

## Dataset

Both datasets are included locally in the `Data/` folder:

1. **PowerGeneration.csv** — Key columns: `Power Station`, `Monitored Cap.(MW)`, `Total Cap. Under Maintenace (MW)`, `Forced Maintanence(MW)`, `Actual(MU)`.
2. **nifty-50.csv** — Key columns: `Date`, `Symbol`, `Open`, `High`, `Low`, `Close`, `Volume`, `VWAP`, `Turnover`.

The synthetic dataset used in Problem 8 (`time`, `sin(time)`, `cos(time)`) is generated inside the notebook with NumPy, so no file is needed for it.

---

## What's Covered

- 3D scatter, surface, and contour plots using `mplot3d`
- Combining a 3D surface with a projected contour map in one plot
- Plotting mathematical functions directly from a NumPy meshgrid
- Grouping and pivoting real data (top-N by turnover, closing price trends) before plotting
- Color gradients tied to a third variable (colorbars) and per-category coloring (by station or stock symbol)

---

## How to Run

```bash
git clone https://github.com/SohailArif313/100-Days-of-AI.git
cd 100-Days-of-AI/Day024
pip install pandas numpy matplotlib scikit-learn
jupyter notebook Day_024_code.ipynb
```

Run cells top to bottom. Each problem has a markdown cell describing the task, followed by its code and chart. Update the file paths inside the notebook (`PowerGeneration.csv`, `nifty-50.csv`) to point to the `Data/` folder, since the notebook currently expects them in `/content/` (Google Colab style).

---

## Author

GitHub: [SohailArif313](https://github.com/SohailArif313/100-Days-of-AI)
LinkedIn: [Muhammad Sohail](https://www.linkedin.com/in/muhammad-sohail-316279397/)