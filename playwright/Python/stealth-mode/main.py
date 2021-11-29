import asyncio
import os
from playwright.async_api import async_playwright

# Check your API key and web socket endpoint from 
# My Products (https://browseasy.com/products/) page.

# Assuming that it's stored in the environment variables, 
# e.g. wss://freemium.browseasy.com
BROWSEASY_ENDPOINT = os.environ["BROWSEASY_ENDPOINT"]

# Assuming that it's stored in the environment variables
# e.g. ccc70169f82f4c7c8a33ecca21c1becf
BROWSEASY_API_KEY = os.environ["BROWSEASY_API_KEY"]

# Your unique connection string.
BROWSEASY_CONNECTION_STRING = f'{BROWSEASY_ENDPOINT}?code={BROWSEASY_API_KEY}'

# Your unique connection string with stealth mode enabled.
BROWSEASY_STEALTH_CONNECTION_STRING = f'{BROWSEASY_CONNECTION_STRING}&stealth'

async def main():
    async with async_playwright() as p:
        # Run headless browser locally, no more.
        # browser = await p.chromium.launch()

        # Run headless browser on the cloud.
        browser = await p.chromium.connect_over_cdp(BROWSEASY_STEALTH_CONNECTION_STRING)
        
        # Unfortunately, default context is always overwritten by playwright.

        # We need to create a new context with no viewport, so that 
        # Browseasy can handle screen resolution and viewport adjustment.
        context = await browser.new_context(no_viewport=True)

        page = await context.new_page()

        await page.goto("https://fingerprintjs.github.io/fingerprintjs/")
        await page.screenshot(path="fingerprintjs.png")
        await browser.close()

asyncio.run(main())