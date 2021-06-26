package com.browseasy.example;

import java.nio.file.Paths;

import com.microsoft.playwright.*;
import com.microsoft.playwright.Browser.NewContextOptions;

public class StealthMode {
  // Update your endpoint with the one dedicated to your own plan or use freemium.
  static final String BROWSEASY_ENDPOINT = "wss://freemium.browseasy.com";

  // Check your API key from My Products page for your plan and update accordingly.
  static final String BROWSEASY_API_KEY = "YOUR-API-KEY";

  // Your unique connection string.
  static final String BROWSEASY_CONNECTION_STRING = "%s?code=%s".formatted(BROWSEASY_ENDPOINT, BROWSEASY_API_KEY);

  // Your unique connection string with stealth mode enabled.
  static final String BROWSEASY_STEALTH_CONNECTION_STRING = "%s&stealth".formatted(BROWSEASY_CONNECTION_STRING);
  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      // Run headless browser locally, no more.
      // Browser browser = playwright.chromium().launch();
      
      // Run headless browser on the cloud.
      Browser browser = playwright.chromium().connectOverCDP(BROWSEASY_STEALTH_CONNECTION_STRING);

      // Unfortunately, default context is always overwritten by playwright.

      // We need to create a new context, so that Browseasy can handle
      // screen resolution and viewport adjustment.

      // When stealth mode enabled, Browseasy will launch your browser 
      // with a random resolution based on a sample distribution. 
      // See https://gs.statcounter.com/screen-resolution-stats/desktop/worldwide
      BrowserContext context = browser.newContext(new NewContextOptions().setViewportSize(null));

      Page page = context.newPage();
      page.navigate("https://browseasy.com/");

      page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("browseasy.png")));

      browser.close();
    }
  }
}