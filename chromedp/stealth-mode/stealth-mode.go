package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/chromedp/chromedp"
)

// Update your endpoint with the one dedicated to your own plan or use freemium.
const BROWSEASY_ENDPOINT = "wss://freemium.browseasy.com"

// Check your API key from My Products page for your plan and update accordingly.
const BROWSEASY_API_KEY = "YOUR-API-KEY"

// Your unique connection string.
var BROWSEASY_CONNECTION_STRING = fmt.Sprintf("%s?code=%s", BROWSEASY_ENDPOINT, BROWSEASY_API_KEY)

// Your unique connection string with stealth mode enabled.
var BROWSEASY_STEALTH_CONNECTION_STRING = fmt.Sprintf("%s&stealth", BROWSEASY_CONNECTION_STRING)

func main() {
	// create allocator context for use with creating a browser context later
	allocatorContext, cancel := chromedp.NewRemoteAllocator(context.Background(), BROWSEASY_STEALTH_CONNECTION_STRING)
	defer cancel()

	// create context
	ctxt, cancel := chromedp.NewContext(allocatorContext)
	defer cancel()

	var buf []byte
	// capture a screenshot
	if err := chromedp.Run(ctxt,
		chromedp.Navigate("https://browseasy.com"),
		chromedp.CaptureScreenshot(&buf),
	); err != nil {
		log.Fatalf("Failed: %v", err)
	}
	if err := ioutil.WriteFile("browseasy.png", buf, 0o644); err != nil {
		log.Fatal(err)
	}
}
