import * as puppeteer from 'puppeteer-core';
import * as open from 'open'

// Update your endpoint with the one dedicated to your own plan or use freemium.
const BROWSEASY_ENDPOINT = 'wss://freemium.browseasy.com';

// Check your API key from My Products page for your plan and update accordingly. 
const BROWSEASY_API_KEY = 'YOUR-API-KEY';

// Your unique connection string.
const BROWSEASY_CONNECTION_STRING = `${BROWSEASY_ENDPOINT}?code=${BROWSEASY_API_KEY}`;

// Your unique connection string with stealth mode enabled.
const BROWSEASY_STEALTH_CONNECTION_STRING = `${BROWSEASY_CONNECTION_STRING}&stealth`;

// Debug endpoint
const BROWSEASY_DEBUG_ENDPOINT = 'https://debug.browseasy.com/inspector.html?remoteFrontend=true';

(async () => {
    // Run headless browser locally, no more.
    // const browser = await puppeteer.launch();

    // Run headless browser on the cloud with stealth mode enabled.
    const browser = await puppeteer.connect({
        browserWSEndpoint: BROWSEASY_STEALTH_CONNECTION_STRING,
        // Always reset default viewport.
        defaultViewport: null
    });

    // Once launched, the default page is about:blank
    const page = (await browser.pages())[0];

    // Resolve the page id
    const pageId = (page.target() as any)['_targetId'];

    // Final debug URL for the page.
    const debugURL = `${BROWSEASY_DEBUG_ENDPOINT}&${BROWSEASY_ENDPOINT.replace('://', '=')}/${pageId}`;

    // Log to your node console.
    console.log(debugURL);

    // Open the debug URL and you can inspect the blank page.
    await open(debugURL);

    // You can remove these timeouts, and replace with break points.
    // Wait for 5 seconds, so that debugger can attach to the page.
    await new Promise(resolve => setTimeout(resolve, 5000));

    // You can put a break point at the next statement if your editor supports it.
    // Navigate to Am I Unique fingerprint page.
    // Verify that a random fingerprint is generated for each session.
    await page.goto(`https://amiunique.org/fp`);
    
    // Log to DevTools console.
    await page.evaluate(() => {
        console.log(`Hello world..`);
    });
})();