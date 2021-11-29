using System;
using System.Threading.Tasks;
using PuppeteerSharp;

namespace stealthmode
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

        // Your unique connection string with stealth mode enabled.
        static readonly string BROWSEASY_STEALTH_CONNECTION_STRING = $"{BROWSEASY_CONNECTION_STRING}&stealth";

        public static async Task Main()
        {
            var options = new ConnectOptions()
            {
                BrowserWSEndpoint = BROWSEASY_STEALTH_CONNECTION_STRING,
                // Always reset default viewport.
                // When stealth mode enabled, Browseasy will launch your browser 
                // with a random resolution based on a sample distribution. 
                // See https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide
                DefaultViewport = null
            };

            // Run headless browser on the cloud.
            using (var browser = await PuppeteerSharp.Puppeteer.ConnectAsync(options))
            {
                using (var page = await browser.NewPageAsync())
                {
                    await page.GoToAsync("https://fingerprintjs.github.io/fingerprintjs/");
                    await page.ScreenshotAsync("fingerprintjs.png");
                }
            }
        }
    }
}
