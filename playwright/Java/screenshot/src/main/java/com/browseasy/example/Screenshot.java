package com.browseasy.example;

import java.nio.file.Paths;
import com.microsoft.playwright.*;
import com.microsoft.playwright.Browser.NewContextOptions;

public class Screenshot {
  // Check your API key and web socket endpoint from
  // My Products (https://browseasy.com/products/) page.

  // Assuming that it's stored in the environment variables
  // e.g. ccc70169f82f4c7c8a33ecca21c1becf
  static final String BROWSEASY_ENDPOINT = System.getenv("BROWSEASY_ENDPOINT");

  // Check your API key from My Products page for your plan and update
  // accordingly.
  static final String BROWSEASY_API_KEY = System.getenv("BROWSEASY_API_KEY");

  // Your unique connection string.
  static final String BROWSEASY_CONNECTION_STRING = "%s?code=%s".formatted(BROWSEASY_ENDPOINT, BROWSEASY_API_KEY);

  public static void main(String[] args) {
    try (Playwright playwright = Playwright.create()) {
      // Run headless browser locally, no more.
      // Browser browser = playwright.chromium().launch();

      // Run headless browser on the cloud.
      Browser browser = playwright.chromium().connectOverCDP(BROWSEASY_CONNECTION_STRING);

      // Unfortunately, default context is always overwritten by playwright.

      // We need to create a new context, so that Browseasy can handle
      // screen resolution and viewport adjustment.
      BrowserContext context = browser.newContext(new NewContextOptions().setViewportSize(null));

      Page page = context.newPage();
      page.navigate("https://browseasy.com/");

      page.screenshot(new Page.ScreenshotOptions().setPath(Paths.get("browseasy.png")));

      browser.close();
    }
  }
}