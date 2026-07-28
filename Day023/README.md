# Air Quality & Sales Data Visualization with Matplotlib

This project is a set of Matplotlib practice exercises built around two different datasets: a global air quality dataset and a company's yearly sales data. Each task takes raw numbers and turns them into a clear, well-labeled chart. The focus is on learning how to build charts that are actually readable — with proper titles, axis labels, legends, and styling — instead of just calling `plt.plot()` and stopping there.

---

## Project Overview

The notebook is split into two parts. The first five problems use an air quality dataset to compare pollution levels (PM2.5 and PM10) across different countries and years, using line plots, a histogram, a scatter plot, a pie chart, and a bar chart. The last five problems use a company sales dataset to explore monthly and quarterly product sales, using styled line plots, pie charts, multi-line plots, grouped bar charts, and a stacked bar chart.

Each problem is solved from scratch with plain Matplotlib (and NumPy for quarter grouping), with every styling choice — colors, markers, line styles, spacing — written out explicitly rather than relying on default settings. This makes it useful for anyone who wants to see how a basic chart is turned into a presentable one, one design decision at a time.

---

## What You'll Learn

- How to group and reshape data with Pandas before plotting it
- How to build a clean line plot with custom colors, markers, and legends
- How to plot a probability density histogram instead of a plain frequency histogram
- How to create a scatter plot comparing two groups with different colors
- How to build a pie chart with an exploded slice and percentage labels
- How to build a bar chart with value labels shown above each bar
- How to create a multi-line plot with a different style for every line
- How to group data into quarters and build a multi-bar and a stacked bar chart
- How to clean up a chart's appearance: removing borders, formatting axis numbers, adding grid lines, and setting background colors

---

## Features

- Ten independent Matplotlib problems, each solved with fully commented code
- Two real datasets: an international air quality dataset and a company sales dataset
- A wide range of chart types: line, histogram, scatter, pie, bar, multi-line, grouped bar, and stacked bar
- Consistent, professional styling across all charts (custom color palette, clean backgrounds, formatted axis labels)
- Value labels, exploded pie slices, and custom legends used where they make the chart easier to read
- Quarter-wise grouping of monthly sales data using `pd.cut`

---

## Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib

---

## Project Structure

This project currently consists of a single Jupyter notebook. No separate folders or dataset files were included in the upload.

```
├── Day_023_code.ipynb   # Main notebook containing all 10 visualization exercises
└── README.md
```

Note: The datasets used in this notebook are not included in this repository. They are read directly from external links inside the notebook. See the Dataset section below for details.

---

## Dataset

This notebook uses two datasets:

1. **Air Quality dataset** (used in Problems 1-5)
   - Source: external CSV link referenced in the notebook (https://tinyurl.com/2fe6vz4u)
   - Important columns: `Country`, `Year`, `PM2.5`, `PM10`
   - Description: Air pollution measurements for multiple countries across different years, used to compare pollution levels between countries and to look at how PM2.5 and PM10 are distributed.

2. **Sales dataset** (used in Problems 6-10)
   - Source: published Google Sheets CSV link referenced in the notebook
   - Important columns: `month_number`, `total_profit`, and individual product columns (`facecream`, `facewash`, `toothpaste`, `bathingsoap`, `shampoo`, `moisturizer`)
   - Description: Monthly sales and profit figures for a company's product line over one year, used to study monthly trends, March sales share, and quarter-wise performance.

---

## Key Concepts Covered

**Data preparation for plotting**
- Filtering rows for specific countries or months before plotting
- Grouping and reshaping data with `groupby` and `unstack` to get one column per category
- Creating a quarter column from month numbers using `pd.cut`

**Chart types**
- Line plots for comparing trends over time (single and multi-line)
- Histogram with probability density instead of raw counts
- Scatter plot for comparing two numeric variables across groups
- Pie charts with exploded slices and percentage labels
- Bar charts with labeled values, grouped bars, and stacked bars

**Chart styling**
- Custom color palettes applied consistently across charts
- Formatting axis numbers with comma separators instead of scientific notation
- Removing unnecessary chart borders (spines) for a cleaner look
- Adding grid lines, legends, and titles that clearly describe what the chart shows

---

## Example Output

Running the notebook produces:
- A line plot comparing yearly PM2.5 totals for Iran and China
- A histogram showing the probability distribution of PM10 values
- A scatter plot comparing PM2.5 and PM10 for Poland and Chile
- A pie chart and a bar chart showing the top 5 most frequent countries in the dataset
- A dotted, marker-styled line plot of total monthly profit
- A pie chart showing each product's share of March sales, with the toothpaste slice pulled out
- A multi-line plot showing sales trends for all six products, each with its own color and line style
- A grouped bar chart comparing quarterly sales across all products
- A stacked bar chart showing how each product contributes to total quarterly sales

---

## Installation

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
pip install pandas numpy matplotlib
```

---

## How to Run

1. Clone this repository and install the dependencies (see Installation above).
2. Open the notebook:
   ```bash
   jupyter notebook Day_023_code.ipynb
   ```
3. Run the cells from top to bottom. Each problem starts with a markdown cell describing the task, followed by the code and chart for that problem.

---

## Learning Outcome

After going through this notebook, you should be more comfortable turning raw data into clear, well-labeled charts using Matplotlib. You'll understand how to choose the right chart type for a question, how to style a chart so it looks professional instead of default, and how to prepare data with Pandas (grouping, reshaping, binning into quarters) before plotting it.

---

## Future Improvements

- Save each chart as an image file in an `outputs/` or `images/` folder for easy reference
- Store local copies of both datasets so the notebook can run without external links
- Wrap repeated styling code (background colors, removing spines, axis formatting) into reusable helper functions
- Add short written observations after each chart explaining what the chart shows
- Combine related charts (like the pie and bar chart for top 5 countries) into a single side-by-side figure for easier comparison

---

## Author

GitHub:
LinkedIn:
