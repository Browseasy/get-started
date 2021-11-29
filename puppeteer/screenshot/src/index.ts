import * as puppeteer from 'puppeteer-core';

// // Check your API key and web socket endpoint from 
// My Products (https://browseasy.com/products/) page.

// Assuming that it's stored in the environment variables, 
// e.g. wss://freemium.browseasy.com
const BROWSEASY_ENDPOINT = process.env.BROWSEASY_ENDPOINT;

// Assuming that it's stored in the environment variables
// e.g. ccc70169f82f4c7c8a33ecca21c1becf
const BROWSEASY_API_KEY = process.env.BROWSEASY_API_KEY;

// Your unique connection string.
const BROWSEASY_CONNECTION_STRING = `${BROWSEASY_ENDPOINT}?code=${BROWSEASY_API_KEY}`;

(async () => {
    // Run headless browser locally, no more.
    // const browser = await puppeteer.launch();

    // Run headless browser on the cloud.
    const browser = await puppeteer.connect({
        browserWSEndpoint: BROWSEASY_CONNECTION_STRING,
        // Always reset default viewport.
        // Browseasy will launch your browser with 1920x1080 resolution by default.
        defaultViewport: null
    });

    const page = await browser.newPage();
    await page.goto('https://browseasy.com');
    await page.screenshot({ path: 'browseasy.png' });

    await browser.close();
})();