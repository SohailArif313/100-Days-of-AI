# Day 25 - Seaborn Visualization Exercises

Part of the [100-Days-of-AI](https://github.com/SohailArif313/100-Days-of-AI) series. Seaborn practice covering scatter plots, heatmaps, clustermaps, KDE plots, and distribution plots across three datasets.

---

## Overview

- **Q1:** Scatter plot of GDP per capita vs life expectancy (2007), sized by population, colored by continent — using the built-in Gapminder dataset.
- **Q2-3:** Heatmap and clustermap of monthly passenger trends — using seaborn's built-in `flights` dataset.
- **Q4-8:** Insurance dataset — filtered scatter plot (age vs BMI), line plot (blood pressure vs children), side-by-side histograms (age by gender/smoker), 2D KDE plot (age vs blood pressure), and a clustermap of age/BMI/blood pressure correlations.

---

## Technologies Used

- Python
- Pandas
- NumPy
- Seaborn
- Matplotlib
- Plotly Express (only for loading the Gapminder dataset)

---

## Dataset

- **Gapminder** and **flights** — loaded directly from `plotly.express` and `seaborn`'s built-in datasets, no file needed.
- **Insurance dataset** — loaded from a Google Sheets CSV link in the notebook. Original source: [Kaggle - Insurance Claim Analysis](https://www.kaggle.com/datasets/thedevastator/insurance-claim-analysis-demographic-and-health). Key columns: `age`, `bmi`, `bloodpressure`, `children`, `gender`, `smoker`, `diabetic`.

The notebook saves every chart as a PNG into a `Plots/` folder — make sure that folder exists before running, or create it first (`mkdir Plots`).

---

## How to Run

```bash
git clone https://github.com/SohailArif313/100-Days-of-AI.git
cd 100-Days-of-AI/Day_025
mkdir -p Plots
pip install pandas numpy seaborn matplotlib plotly
jupyter notebook Day_025_code.ipynb
```

---

## Author

GitHub: [SohailArif313](https://github.com/SohailArif313/100-Days-of-AI)
LinkedIn: [Muhammad Sohail](https://www.linkedin.com/in/muhammad-sohail-316279397/)