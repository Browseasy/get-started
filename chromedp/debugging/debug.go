package main

import (
	"context"
	"fmt"
	"log"
	"os/exec"
	"runtime"
	"strings"
	"time"

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

// Debug endpoint
var BROWSEASY_DEBUG_ENDPOINT = "https://debug.browseasy.com/inspector.html?remoteFrontend=true"

func main() {
	// create allocator context for use with creating a browser context later
	allocatorContext, cancel := chromedp.NewRemoteAllocator(context.Background(), BROWSEASY_STEALTH_CONNECTION_STRING)
	defer cancel()

	// create context
	ctxt, cancel := chromedp.NewContext(allocatorContext)
	defer cancel()

	// capture entire browser viewport, returning png with quality=90
	if err := chromedp.Run(ctxt,
		chromedp.ActionFunc(func(c context.Context) error {
			var pageId = chromedp.FromContext(ctxt).Target.TargetID

			var debugUrl = fmt.Sprintf("%s&%s/%s",
				BROWSEASY_DEBUG_ENDPOINT,
				strings.ReplaceAll(BROWSEASY_ENDPOINT, "://", "="),
				pageId)

			// Log to your go console.
			fmt.Print(debugUrl)

			// Open the debug URL and you can inspect the blank page.
			openbrowser(debugUrl)

			// You can remove these timeouts, and replace with break points.
			// Wait for 5 seconds, so that debugger can attach to the page.
			time.Sleep(5 * time.Second)
			return nil
		}),
		// You can put a break point at the next statement if your editor supports it.
		// Navigate to Am I Unique fingerprint page.
		// Verify that a random fingerprint is generated for each session.
		chromedp.Navigate("https://amiunique.org/fp"),
		// Log to DevTools console.
		chromedp.Evaluate(`console.log("Hello world..")`, nil),
	); err != nil {
		log.Fatalf("Failed: %v", err)
	}

	// Inspect the page for 30 seconds.
	time.Sleep(30 * time.Second)
}

func openbrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Fatal(err)
	}
}
