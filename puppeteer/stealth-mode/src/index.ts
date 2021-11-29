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

// Your unique connection string with stealth mode enabled.
const BROWSEASY_STEALTH_CONNECTION_STRING = `${BROWSEASY_CONNECTION_STRING}&stealth`;

const DETECTION_PAGES: Array<{ name: string, url: string }> = [
    { name: "datadome", url: "https://antoinevastel.com/bots/datadome" },
    { name: "areyouheadless", url: "https://arh.antoinevastel.com/bots/areyouheadless" },
    { name: "sannysoft", url: "https://bot.sannysoft.com/" },
    { name: "fingerprintjsPro", url: "https://fingerprintjs.com/" },
    { name: "fingerprintjs", url: "https://fingerprintjs.github.io/fingerprintjs/" },
    // { id: "", url: "" },
];

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

    for (const dp of DETECTION_PAGES) {
        await page.goto(dp.url);
        await page.waitForTimeout(3000);
        await page.screenshot({ path: `${dp.name}.png`, fullPage: true });
    }

    await browser.close();
})();