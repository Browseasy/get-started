package main

import (
	"context"
	"fmt"
	"io/ioutil"
	"log"

	"github.com/chromedp/chromedp"
)

// Check your API key and web socket endpoint from 
// My Products (https://browseasy.com/products/) page.

// Assuming that it's stored in the environment variables, 
// e.g. wss://freemium.browseasy.com
var BROWSEASY_ENDPOINT = os.Getenv("BROWSEASY_ENDPOINT")

// Assuming that it's stored in the environment variables
// e.g. ccc70169f82f4c7c8a33ecca21c1becf
var BROWSEASY_API_KEY = os.Getenv("BROWSEASY_API_KEY")

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
		chromedp.Navigate("https://fingerprintjs.github.io/fingerprintjs/"),
		chromedp.CaptureScreenshot(&buf),
	); err != nil {
		log.Fatalf("Failed: %v", err)
	}
	if err := ioutil.WriteFile("fingerprintjs.png", buf, 0o644); err != nil {
		log.Fatal(err)
	}
}
