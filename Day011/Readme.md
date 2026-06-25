# Day 11 - Exception Handling

This folder contains the complete solutions for the Day 11 tasks, focusing on error handling, custom exception design, and writing crash-resistant Python programs.

## Problems Solved

* **Handling Multiple Exceptions:** Wrote a test block to catch and log various errors like IndexError, ValueError, TypeError, KeyError, and ZeroDivisionError from an unedited function.
* **Robust Mixed Data Summation:** Implemented a loop that safely extracts and sums data from a list containing single-key dictionaries, integers, and numeric strings without crashing on data format mismatches.
* **Safe File Operations:** Developed a file writer that catches FileNotFoundError, PermissionError, and OSError, utilizing the else block to securely close the file stream upon success.
* **Guessing Game with Custom Exceptions:** Designed a number guessing game that defines and raises custom exceptions named ValueTooLarge, ValueTooSmall, and GuessError based on the user's inputs.
* **Voter Eligibility Validation:** Built an input validator that raises custom InvalidName exceptions for blank names or single-word entries, and InvalidAge exceptions for underage values.
* **Loop Interruption via StopIteration:** Created a function printing natural numbers infinitely that uses a try-except block to intercept a raised StopIteration error and exit cleanly after 20 cycles.

## Takeaways

This session focused on defensive coding. Instead of writing code that only works under perfect conditions, these exercises showed how to anticipate common failures, manage faulty inputs, and use custom exception structures to build robust programs that fail gracefully rather than crashing.