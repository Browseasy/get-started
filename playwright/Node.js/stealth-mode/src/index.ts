import { chromium } from "playwright";

// Check your API key and web socket endpoint from 
// My Products (https://browseasy.com/products/) page.

// Assuming that it's stored in the environment variables, 
// e.g. wss://freemium.browseasy.com
const BROWSEASY_ENDPOINT = process.env.BROWSEASY_ENDPOINT;

// Assuming that it's stored in the environment variables
// e.g. ccc70169f82f4c7c8a33ecca21c1becf
const BROWSEASY_API_KEY = process.env.BROWSEASY_API_KEY;

// Your unique connection string.
const BROWSEASY_CONNECTION_STRING = `${BROWSEASY_ENDPOINT}?code=${BROWSEASY_API_KEY}`;

// Your unique connection string with stealth mode enabled.
const BROWSEASY_STEALTH_CONNECTION_STRING = `${BROWSEASY_CONNECTION_STRING}&stealth`;

(async () => {
    // Run headless browser locally, no more.
    // const browser = await chromium.launch();

    // Run headless browser on the cloud.
    const browser = await chromium.connectOverCDP({
        endpointURL: BROWSEASY_STEALTH_CONNECTION_STRING,
    });

    // Unfortunately, default context is always overwritten by playwright.

    // We need to create a new context, so that Browseasy can handle
    // screen resolution and viewport adjustment.
    
    // When stealth mode enabled, Browseasy will launch your browser 
    // with a random resolution based on a sample distribution. 
    // See https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide
    const context = await browser.newContext({
        viewport: null
    });
    const page = await context.newPage();
    

    await page.goto('https://fingerprintjs.github.io/fingerprintjs/');
    await page.screenshot({ path: 'fingerprintjs.png' });

    await browser.close();
})();