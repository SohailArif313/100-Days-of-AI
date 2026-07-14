# Day 19: Advanced Pandas Groupby & Aggregations

## Overview
Today's focus was on mastering complex data aggregation, transformation, and custom group-based workflows using Pandas. Worked on three different datasets to solve practical, multi-level analytical problems.

## Datasets Covered

### 1. Titanic Dataset
- **Groupby & Aggregation:** Calculated class-wise (`Pclass`) average age and counted missing values in the `Age` column.
- **Group-based Imputation:** Filled missing `Embarked` values using the mode of their respective passenger class group via `.transform()`.
- **Multi-level Groupby & Unstacking:** Analyzed average fares across multi-indexed groups (`Embarked` and `Pclass`) and restructured the output into a table format using `.unstack()`.

### 2. FIFA World Cup 2022 Dataset
- **Custom Function Optimization:** Implemented a custom `z_normalization` function and applied it group-by-group (`Team`) across multiple performance metrics (Passes, Completed Passes, Line Breaks) using `.apply()`.
- **Multi-column Aggregations:** Leveraged `.agg()` to compute complex statistical summaries (min, max, mean, std) across various match metrics simultaneously.

### 3. IPL Deliveries Dataset
- **Situational Filtering & Aggregation:** Extracted second-innings data to find the highest run-scorer and the best strike-rate batsman (minimum 100 balls faced) while chasing.
- **Matchup Analysis:** Identified the most successful bowler-batsman rivalry based on maximum dismissals and minimum runs conceded.
- **Batting Pair Statistics:** Engineered order-independent tracking to analyze performance metrics (Total Runs, Average Partnership, and Strike Rate) for all unique batting combinations.

## Key Concepts Mastered
- Grouping data based on single and multiple columns using `df.groupby()`.
- Applying customized logic across data slices using `.apply()` and `.transform()`.
- Transforming multi-level indices using `.unstack()`.
- Performing complex multi-metric evaluations with `.agg()`.