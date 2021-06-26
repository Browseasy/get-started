# Stealth Mode Example
This example illustrates using Browseasy with [Chromedp](https://github.com/chromedp/chromedp) to capture a screenshot when stealth mode activated. Note that stealth mode uses many advanced fingerprint evasion techniques, one of them is to randomize resolution when you connect to headless browser.

## Prerequisites
To run this example, make sure [Go](https://golang.org/) is installed in your system.

## Running the example
Note that you need to update your connection string with respect to your plan details in [stealth-mode.go](./stealth-mode.go). 
1. Install dependencies
    ```
    $ go get .
    ```
2. Run application
    ```
    $ go run .
    ```
3. Check your working directory for browseasy.png file.
4. Run the application a few times to see the resolution changes every time.