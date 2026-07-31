# Day 26 - Seaborn Categorical, Regression & Grid Plots

Part of the [100-Days-of-AI](https://github.com/SohailArif313/100-Days-of-AI) series. Seaborn practice covering categorical plots (violin, box, strip, swarm, bar, point), regression plots, and multi-plot grids (PairGrid, jointplot, JointGrid) across three datasets.

---

## Overview

- **Q1-3:** Violin plot, regression plot, and box plot on the built-in `diamonds` dataset (price by cut, carat vs. price, and price by color).
- **Q4:** Built-in `taxis` dataset — average fare by payment type and regression plots of ride time vs. fare (colored by payment type and taxi color).
- **Q5-12:** Insurance dataset — strip/swarm plots, box/violin plots, bar/point plots, a regression plot, two PairGrids (using different plot types), a jointplot, and a JointGrid.

---

## Technologies Used

- Python
- Pandas
- NumPy
- Seaborn
- Matplotlib

---

## Dataset

- **diamonds** and **taxis** are loaded directly from Seaborn's built-in datasets, so no external files are required.

- **insurance.csv** should be placed in the same directory as the notebook. The dataset is loaded using `pd.read_csv("insurance.csv")`.

**Key columns used:**
`gender`, `bloodpressure`, `smoker`, `region`, `bmi`, `diabetic`, `claim`, `age`, `children`,`carat`,`price` etc

---

## How to Run

```bash
git clone https://github.com/SohailArif313/100-Days-of-AI.git
cd 100-Days-of-AI/Day_026
pip install pandas numpy seaborn matplotlib
jupyter notebook Day_026_code.ipynb
```

---

## Author

GitHub: [SohailArif313](https://github.com/SohailArif313)

LinkedIn: [Muhammad Sohail](https://www.linkedin.com/in/muhammad-sohail-316279397/)