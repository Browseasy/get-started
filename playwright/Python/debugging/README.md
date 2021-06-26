# Debugging Example
This example illustrates using Browseasy with [Playwright Node.js API](https://playwright.dev/python/docs/intro/) to debug your web automation.

## Prerequisites
To run this example, make sure [Python 3.7 or above](https://www.python.org/downloads/) is installed in your system.

## Running the example
Note that you need to update your connection string with respect to your plan details in [main.py](./main.py). 
1. Install dependencies
    ```
    $ pip install playwright
    ```
2. Run application
    ```
    $ python main.py
    ```
3. Check and inspect online chrome devtools application, opened in the browser.
4. Run the application multiple times to inspect fingerprint changes.