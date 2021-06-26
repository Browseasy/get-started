# Stealth Mode Example
This example illustrates using Browseasy with [Puppeteer](https://github.com/puppeteer/puppeteer) to capture a screenshot when stealth mode activated. Note that stealth mode uses many advanced fingerprint evasion techniques, one of them is to randomize resolution when you connect to headless browser.

## Prerequisites
To run this example, make sure [Node.js](https://nodejs.org/en/) is installed in your system.

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
3. Check your working directory for browseasy.png file.
4. Run the application a few times to see the resolution changes every time.