import * as puppeteer from 'puppeteer-core';

// Update your endpoint with the one dedicated to your own plan or use freemium.
const BROWSEASY_ENDPOINT = 'wss://freemium.browseasy.com'; 

// Check your API key from My Products page for your plan and update accordingly. 
const BROWSEASY_API_KEY = 'YOUR-API-KEY';

// Your unique connection string.
const BROWSEASY_CONNECTION_STRING = `${BROWSEASY_ENDPOINT}?code=${BROWSEASY_API_KEY}`;

// Your unique connection string with stealth mode enabled.
const BROWSEASY_STEALTH_CONNECTION_STRING = `${BROWSEASY_CONNECTION_STRING}&stealth`;

(async () => {
    // Run headless browser locally, no more.
    // const browser = await puppeteer.launch();

    // Run headless browser on the cloud.
    const browser = await puppeteer.connect({
        browserWSEndpoint: BROWSEASY_STEALTH_CONNECTION_STRING,
        // Always reset default viewport.
        // When stealth mode enabled, Browseasy will launch your browser 
        // with a random resolution based on a sample distribution. 
        // See https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide
        defaultViewport: null
    });

    const page = await browser.newPage();
    await page.goto('https://browseasy.com');
    await page.screenshot({ path: 'browseasy.png' });

    await browser.close();
})();