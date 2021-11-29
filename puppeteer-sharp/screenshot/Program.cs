using System;
using System.Threading.Tasks;
using PuppeteerSharp;

namespace screenshot
{
    class Program
    {
        // Check your API key and web socket endpoint from 
        // My Products (https://browseasy.com/products/) page.

        // Assuming that it's stored in the environment variables, 
        // e.g. wss://freemium.browseasy.com
        static readonly string BROWSEASY_ENDPOINT =
            Environment.GetEnvironmentVariable("BROWSEASY_ENDPOINT");

        // Assuming that it's stored in the environment variables
        // e.g. ccc70169f82f4c7c8a33ecca21c1becf
        static readonly string BROWSEASY_API_KEY =
            Environment.GetEnvironmentVariable("BROWSEASY_API_KEY");

        // Your unique connection string.
        static readonly string BROWSEASY_CONNECTION_STRING = $"{BROWSEASY_ENDPOINT}?code={BROWSEASY_API_KEY}";

        public static async Task Main()
        {
            var options = new ConnectOptions()
            {
                BrowserWSEndpoint = BROWSEASY_CONNECTION_STRING,
                // Always reset default viewport.
                // Browseasy will launch your browser with 1920x1080 resolution by default.
                DefaultViewport = null
            };

            // Run headless browser on the cloud.
            using (var browser = await PuppeteerSharp.Puppeteer.ConnectAsync(options))
            {
                using (var page = await browser.NewPageAsync())
                {
                    await page.GoToAsync("https://browseasy.com");
                    await page.ScreenshotAsync("browseasy.png");
                }
            }
        }
    }
}
