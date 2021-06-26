# Stealth Mode Example
This example illustrates using Browseasy with [Playwright Node.js API](https://playwright.dev/python/docs/intro/) to capture a screenshot when stealth mode activated. Note that stealth mode uses many advanced fingerprint evasion techniques, one of them is to randomize resolution when you connect to headless browser.

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
3. Check your working directory for browseasy.png file.
4. Run the application a few times to see the resolution changes every time.