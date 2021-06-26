using System.Threading.Tasks;
using PuppeteerSharp;

namespace screenshot
{
    class Program
    {
        // Update your endpoint with the one dedicated to your own plan or use freemium.
        static readonly string BROWSEASY_ENDPOINT = "wss://freemium.browseasy.com";

        // Check your API key from My Products page for your plan and update accordingly. 
        static readonly string BROWSEASY_API_KEY = "YOUR-API-KEY";

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
