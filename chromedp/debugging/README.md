# Stealth Mode Example
This example illustrates using Browseasy with [Chromedp](https://github.com/chromedp/chromedp) to debug your web automation.

## Prerequisites
To run this example, make sure [Go](https://golang.org/) is installed in your system.

Sign in to https://debug.browseasy.com/inspector.html before running the application.

## Running the example
Note that you need to update your connection string with respect to your plan details in [debug.go](./debug.go). 
1. Install dependencies
    ```
    $ go get .
    ```
2. Run application
    ```
    $ go run .
    ```
3. Check and inspect online chrome devtools application, opened in the browser.
4. Run the application multiple times to inspect fingerprint changes.