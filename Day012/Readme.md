# Day 12 - Namespaces, Iterators, Generators, and Decorators

This folder contains my complete solutions for the Day 12 tasks, focusing on Python scope rules, custom iteration tools, and modifying function behaviors using decorators.

## Problems Solved

* **Class Namespaces:** Built a Person class with a mix of public and private attributes to explore how Python maps names inside class structures.
* **Instance Namespaces:** Learned how to use `__dict__` to view the variables stored inside an object and understand private variable name mangling.
* **Recursive GCD with Call Counter:** Created a recursive Greatest Common Divisor function that tracks and outputs the exact number of recursive execution calls required to find the answer.
* **Custom Enumerate Iterator:** Designed a MyEnumerate class from scratch that replicates Python's native enumerate function, ensuring it safely handles errors if a non-iterable item is passed.
* **Circular Sequence Iterator:** Built a `Circle` class and a `CircleIterator` that repeats the items of a sequence until a specified limit.
* **Time-Elapsed Generator:** Created a generator function that tracks the exact execution time delta between sequential loop iterations using high-resolution performance counters.
* **Chained String Decorators:** Built a chain of custom decorators (bold, italic, underline) to demonstrate how multiple wrappers modify a single function string output from the bottom up.
* **Conditional Return Printer Decorator:** Wrote a printer decorator that automatically intercepts and logs a function's return value, doing absolutely nothing if the output evaluates to None.
* **Double Execution Decorator:** Designed a call_twice wrapper that forces any decorated target function to execute twice sequentially on a single call.
* **Mathematical Doubling Decorator:** Created a decorator that automatically multiplies a function's numeric return value by two, testing its accuracy across multiple cases using strict assert validations.

## Takeaways

Today's notebook helped me understand how Python manages variables under the hood and how to elegantly extend language syntax. Writing custom decorators and iterators shows you how to build clean, professional-grade logic tools instead of relying strictly on basic built-in commands.