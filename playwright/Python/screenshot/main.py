import asyncio
from playwright.async_api import async_playwright

# Update your endpoint with the one dedicated to your own plan or use freemium.
BROWSEASY_ENDPOINT = 'wss://freemium.browseasy.com'

# Check your API key from My Products page for your plan and update accordingly. 
BROWSEASY_API_KEY = 'YOUR-API-KEY';

# Your unique connection string.
BROWSEASY_CONNECTION_STRING = f'{BROWSEASY_ENDPOINT}?code={BROWSEASY_API_KEY}'

async def main():
    async with async_playwright() as p:
        # Run headless browser locally, no more.
        # browser = await p.chromium.launch()

        # Run headless browser on the cloud.
        browser = await p.chromium.connect_over_cdp(BROWSEASY_CONNECTION_STRING)
        
        # Unfortunately, default context is always overwritten by playwright.

        # We need to create a new context with no viewport, so that 
        # Browseasy can handle screen resolution and viewport adjustment.
        context = await browser.new_context(no_viewport=True)

        page = await context.new_page()

        await page.goto("https://browseasy.com")
        await page.screenshot(path="browseasy.png")
        await browser.close()

asyncio.run(main())