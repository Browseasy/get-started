import asyncio
import time
import webbrowser
from playwright.async_api import async_playwright


# Update your endpoint with the one dedicated to your own plan or use freemium.
BROWSEASY_ENDPOINT = 'wss://freemium.browseasy.com'

# Check your API key from My Products page for your plan and update accordingly. 
BROWSEASY_API_KEY = 'YOUR-API-KEY';

# Your unique connection string.
BROWSEASY_CONNECTION_STRING = f'{BROWSEASY_ENDPOINT}?code={BROWSEASY_API_KEY}'

# Your unique connection string with stealth mode enabled.
BROWSEASY_STEALTH_CONNECTION_STRING = f'{BROWSEASY_CONNECTION_STRING}&stealth'

# Debug endpoint
BROWSEASY_DEBUG_ENDPOINT = 'https://debug.browseasy.com/inspector.html?remoteFrontend=true'

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

        # Find page target id. 
        client = await context.new_cdp_session(page)
        response = await client.send('Target.getTargets')

        # Resolve the recently created page id
        pageId = response['targetInfos'][0]['targetId']

        # Final debug URL for the page.
        debugURL = f'{BROWSEASY_DEBUG_ENDPOINT}&{BROWSEASY_ENDPOINT.replace("://", "=")}/{pageId}'
        # Log to your python console.
        print(debugURL)

        # Open the debug URL and you can inspect the blank page.
        webbrowser.open(debugURL, new=2)

        # You can remove these timeouts, and replace with break points.
        # Wait for 5 seconds, so that debugger can attach to the page.
        time.sleep(5)

        # You can put a break point at the next statement if your editor 
        # Navigate to Am I Unique fingerprint page.
        # Verify that a random fingerprint is generated for each session.
        await page.goto('https://amiunique.org/fp')

        # Wait for 10 seconds, so that debugger can attach to the page. 
        time.sleep(10)
        
        await page.evaluate(f'console.log("Hello world..")')
asyncio.run(main())