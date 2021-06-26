# Debugging Example
This example illustrates using Browseasy with [Puppeteer](https://github.com/puppeteer/puppeteer) to debug your web automation.

## Prerequisites
To run this example, make sure [Node.js](https://nodejs.org/en/) is installed in your system.

Sign in to https://debug.browseasy.com/inspector.html before running the application.

## Running the example
Note that you need to update your connection string with respect to your plan details in [index.ts](./src/index.ts). 
1. Install dependencies
    ```
    $ npm run install
    ```
2. Run application
    ```
    $ npm run start
    ```
3. Check and inspect online chrome devtools application, opened in the browser.
4. Run the application multiple times to inspect fingerprint changes.