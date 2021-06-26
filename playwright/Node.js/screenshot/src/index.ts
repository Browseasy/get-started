import { chromium } from "playwright";

// Update your endpoint with the one dedicated to your own plan or use freemium.
const BROWSEASY_ENDPOINT = 'wss://freemium.browseasy.com'; 

// Check your API key from My Products page for your plan and update accordingly. 
const BROWSEASY_API_KEY = 'YOUR-API-KEY';

// Your unique connection string.
const BROWSEASY_CONNECTION_STRING = `${BROWSEASY_ENDPOINT}?code=${BROWSEASY_API_KEY}`;

(async () => {
    // Run headless browser locally, no more.
    // const browser = await chromium.launch();
    
    // Run headless browser on the cloud.
    const browser = await chromium.connectOverCDP({
        endpointURL: BROWSEASY_CONNECTION_STRING,
    });

    // Unfortunately, default context is always overwritten by playwright.

    // We need to create a new context, so that Browseasy can handle
    // screen resolution and viewport adjustment.
    const context = await browser.newContext({
        viewport: null
    });
    const page = await context.newPage();
    

    await page.goto('https://browseasy.com/');
    await page.screenshot({ path: 'browseasy.png' });

    await browser.close();
    
})();