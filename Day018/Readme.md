# Day 18 - Advanced Data Aggregations and Dynamic Standings

This folder contains my solutions and practice notebooks for Day 18, focusing on advanced data structuring, table view optimization, and designing complex tournament ranking engines using Pandas.

## Problems Solved

* **Multi-Dataset Exploratory Analysis:** Loaded and inspected structured historical tables—specifically the Titanic survival records and the **FIFA World Cup 2022 match dataset**—to check data formats and column distributions.
* **Global Output Formatting:** Utilized `pd.set_option` configurations to adjust display width and column limits, ensuring comprehensive datasets print cleanly in the console without line wrapping.
* **Dynamic Tournament Leaderboard Logic:** Designed a standalone, modular `point_table()` Python function to read chronological tournament match records.
* **Bi-Directional Aggregation:** Wrote parsing logic to search across both home-team and away-team columns concurrently to calculate aggregate performance metrics accurately.
* **Standings Ranking Automation:** Processed match details to calculate matches played, total wins, losses, draws, and accumulated group points, sorting teams instantly by official league rank.

## Takeaways

Today's work highlighted how to build operational summary dashboards from transactional match log rows. Learning how to loop over multiple columns concurrently to calculate metrics is a critical data-engineering skill when building real-world performance KPIs and business metrics.