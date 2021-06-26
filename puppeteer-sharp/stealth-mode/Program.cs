using System.Threading.Tasks;
using PuppeteerSharp;

namespace stealthmode
{
    class Program
    {
        // Update your endpoint with the one dedicated to your own plan or use freemium.
        static readonly string BROWSEASY_ENDPOINT = "wss://freemium.browseasy.com";

        // Check your API key from My Products page for your plan and update accordingly. 
        static readonly string BROWSEASY_API_KEY = "YOUR-API-KEY";

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
                    await page.GoToAsync("https://browseasy.com");
                    await page.ScreenshotAsync("browseasy.png");
                }
            }
        }
    }
}
