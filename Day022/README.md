# Pandas Pivot Table & Data Cleaning Exercises

This project is a collection of hands-on Pandas exercises built around real-world style datasets. Each task starts from a messy or incomplete dataset and works through cleaning, reshaping, and summarizing the data until it answers a specific business question. It's meant as a practice log for building stronger data manipulation skills using pivot tables, string operations, date handling, and merging.

---

## Project Overview

Instead of following one single dataset from start to finish, this notebook works through ten separate problems, each using a different dataset and a different kind of challenge. The goal was to practice the everyday things a data analyst actually does: fixing broken columns, pulling out hidden information (like a brand name buried inside a product name), reshaping data with pivot tables, and merging multiple files together to answer a question.

This is a learning notebook, not a packaged application. It's useful for anyone who wants to see practical, worked examples of common Pandas problems rather than toy examples.

---

## What You'll Learn

- How to clean and fix messy columns (like inconsistent year values)
- How to extract information from text columns using string methods
- How to build and reshape data using `pivot_table`
- How to plot KDE charts and heatmaps directly from pivoted data
- How to work with dates: extracting month names, weekday names, and filtering by day type (weekday vs weekend)
- How to merge two related datasets using a common key
- How to fill missing values using logic derived from other columns
- How to filter and search text with conditions like "starts with" and "does not contain"

---

## Features

- Ten independent Pandas problems, each with its own dataset and question
- Data cleaning steps shown clearly (fixing years, splitting names, filling missing values)
- Pivot tables built for different reporting needs (by brand, by month, by weekday)
- Visualizations: KDE plots and a Seaborn heatmap
- Text parsing exercises (extracting questions and answers from a raw CSV)
- Date-based analysis (month-wise, weekday-wise, weekend vs business day)
- Merging two datasets (employee records and activity logs) to answer combined questions

---

## Technologies Used

- Python
- Pandas
- NumPy
- Matplotlib
- Seaborn


---

## Project Structure

This project currently consists of a single Jupyter notebook. No separate folders, scripts, or dataset files were included in the upload.

```
├── Data/
│   ├── cars.csv
│   ├── PowerGeneration.csv       # Second dataset (e.g., raw or secondary data)
│   └── question-answer.csv       # Third dataset
├── Day_022_code.ipynb      # Main notebook containing all 10 exercises
└── README.md               # Documentation and project overview

```

---

## Dataset

This notebook uses five different datasets, each tied to a specific question:

1. **Cars dataset** (`cars.csv`)
   - Source: external link referenced in the notebook (https://tinyurl.com/2r24n45l)
   - Important columns: `Name`, `Year`, `Price`, `Miles`
   - Description: Car listings where the brand is not given directly — it has to be extracted from the first word of the `Name` column. The `Year` column also contains invalid values that need to be cleaned before use.

2. **Daily Power Generation dataset** (`PowerGeneration.csv`)
   - Source: external link referenced in the notebook (https://tinyurl.com/2nq6kugt)
   - Important columns: `Dates`, `Power Station`, `Actual(MU)`, `Excess(+) / Shortfall (-)`
   - Description: Daily power generation records for power stations across India, used to calculate required generation and to study monthly generation trends.

3. **Question-Answer dataset** (`question-answer.csv`)
   - Source: shared Google Drive link referenced in the notebook
   - Description: A raw CSV where questions and answers are stored as alternating rows in a single column, needing to be split into two proper `Questions` and `Answers` columns.

4. **Activity Log dataset** (`log_file`)
   - Source: published Google Sheets CSV link referenced in the notebook
   - Important columns: `emp_id`, `dt`, `activity`, `Log_ID`
   - Description: A log of employee activities with timestamps, used for month-wise, weekday-wise, and weekend-vs-business-day analysis.

5. **Employee dataset** (`employee`)
   - Source: published Google Sheets CSV link referenced in the notebook
   - Important columns: `EMPLOYEE_ID`, `FIRST_NAME`, `LAST_NAME`, `EMAIL`
   - Description: Employee records with some missing first names and incomplete email addresses that need to be filled and corrected.

---

## Key Concepts Covered

**Data cleaning**
- Fixing a column with inconsistent year formats
- Extracting a brand name from a text column
- Filling missing first names using patterns found in the email column
- Completing incomplete email addresses by adding a domain

**Reshaping data**
- Building pivot tables with multiple aggregation functions (mean and median together)
- Reordering pivot table columns into a logical order (months, weekdays)

**Date and time handling**
- Extracting month name and weekday name from a date column
- Splitting records into weekends vs business days

**Text processing**
- Splitting a single raw column into two separate columns (questions and answers)
- Filtering rows based on whether text starts with or contains a certain character

**Merging datasets**
- Joining an activity log with employee details using a shared ID to answer questions that span both files

**Visualization**
- KDE plots to compare distributions across different years
- A Seaborn heatmap to visualize a pivot table across stations and months

---

## Example Output

Running the notebook produces:
- A pivot table showing average price and median miles per car brand, from 2018 to 2022
- Two KDE plots comparing price and mileage distributions across years
- A pivot table of average power generation per station per month, plus a heatmap for the top 10 most frequent power stations
- A cleaned `Questions` / `Answers` dataframe built from raw text
- A filtered list of questions that don't contain a question mark
- Several small pivot tables and printed results answering specific questions about employee activity (busiest employee in January, most active employee on weekends, most common activity on business days, weekday-wise activity counts)
- A list of employee full names starting with "A" who performed a specific set of activities

---


## Learning Outcome

After going through this notebook, you should be more comfortable cleaning messy real-world data, building pivot tables for different kinds of reporting, working with dates to group data by month or weekday, merging two related datasets, and turning a pivot table into a simple visualization. These are core skills used in almost any data analysis job.


