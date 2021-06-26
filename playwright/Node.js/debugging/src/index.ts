import { chromium } from "playwright";
import * as open from 'open'

// Update your endpoint with the one dedicated to your own plan or use freemium.
const BROWSEASY_ENDPOINT = 'wss://freemium.browseasy.com';

// Check your API key from My Products page for your plan and update accordingly. 
const BROWSEASY_API_KEY = 'YOUR-API-KEY';

// Your unique connection string with stealth mode enabled.
const BROWSEASY_CONNECTION_STRING = `${BROWSEASY_ENDPOINT}?code=${BROWSEASY_API_KEY}`;

// Your unique connection string with stealth mode enabled.
const BROWSEASY_STEALTH_CONNECTION_STRING = `${BROWSEASY_CONNECTION_STRING}&stealth`;

// Debug endpoint
const BROWSEASY_DEBUG_ENDPOINT = 'https://debug.browseasy.com/inspector.html?remoteFrontend=true';

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
    const context = await browser.newContext({
        viewport: null
    });

    // Create a new page to work on.
    const page = await context.newPage();

    // Find page target id.    
    var client = await context.newCDPSession(page)
    var response = await client.send('Target.getTargets');

    // Resolve the recently created page id
    const pageId = response.targetInfos[0].targetId;

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

    // Wait for 10 seconds, so that debugger can attach to the page. 
    await new Promise(resolve => setTimeout(resolve, 10000));

    // Log to DevTools console.
    await page.evaluate(() => {
        console.log(`Hello world..`);
    });
})();