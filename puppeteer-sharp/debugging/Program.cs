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

        // Debug endpoint
        static readonly string BROWSEASY_DEBUG_ENDPOINT = "https://debug.browseasy.com/inspector.html?remoteFrontend=true";

        public static void OpenBrowser(string uri)
        {
            var psi = new System.Diagnostics.ProcessStartInfo();
            psi.UseShellExecute = true;
            psi.FileName = uri;
            System.Diagnostics.Process.Start(psi);
        }

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
                    // Final debug URL for the page.
                    var debugURL = $"{BROWSEASY_DEBUG_ENDPOINT}&{(BROWSEASY_ENDPOINT.Replace("://", "="))}/{page.Target.TargetId}";

                    // Log to your dotnet console.
                    Console.WriteLine(debugURL);

                    // Open the debug URL and you can inspect the blank page.
                    OpenBrowser(debugURL);

                    // You can remove these timeouts, and replace with break points.
                    // Wait for 5 seconds, so that debugger can attach to the page.
                    await Task.Delay(5000);

                    await page.GoToAsync("https://amiunique.org/fp");

                    // Log to DevTools console.
                    await page.EvaluateExpressionAsync("console.log('Hello world..')");

                    // Wait for any input from console.
                    Console.ReadLine();
                }
            }
        }
    }
}
