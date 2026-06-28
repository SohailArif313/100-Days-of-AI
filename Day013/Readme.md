# Day 13 - NumPy Basics and Array Math

This folder contains my solutions for the Day 13 tasks, focusing on using the NumPy library to create grids, handle matrix indexing, and build math functions.

## Problems Solved

* **Custom Vector Setup:** Created a 10-item list of zeros and changed the fifth item to 1.
* **Random Grid Average:** Generated a random grid based on user dimensions and found its average value.
* **Border Matrix:** Wrote a function to build a 2D grid that has 1s on the borders and 0s on the inside.
* **Range Splits:** Created a list of 10 numbers between 0 and 1 without including 0 or 1 themselves.
* **Identity Grid Check:** Tested grid shapes using the eye function to see how rectangular identity grids look.
* **Row Broadcasting:** Created a 5x5 grid where every row counts from 0 to 4 automatically.
* **Distance Calculator:** Used the coordinate math formula to find the distance between a list of random points and a single point.
* **3D Position Finder:** Calculated the exact row, column, and depth index of the 100th item inside a 3D array.
* **Array Reversal:** Flipped a text list of numbers backwards and changed them into float decimals.
* **Element Counter:** Wrote a quick script to find out exactly how many total items are inside any array.
* **Softmax Function:** Built a safe math tool for data science that scales numbers and guards against type errors.
* **Vertical Array Stacker:** Created a function to stack grids on top of each other safely with input checks.
* **Date Series Generator:** Used numpy time objects to print clean arrays of consecutive calendar days.
* **Column Swapping:** Wrote code to instantly trade the positions of the first and second columns in a matrix.
* **Odd Number Filter:** Replaced all odd numbers inside a grid with -1.
* **Data Normalization:** Scaled a random matrix so all values fall perfectly between 0 and 1.
* **Nth Largest Item:** Built a tool to pick the exact nth largest value out of an array with error checks.

## Takeaways

Today's practice showed me how powerful NumPy is for skipping slow Python loops. Using broadcasting, slicing, and vector math allows you to handle thousands of data points instantly with simple, clean code lines.