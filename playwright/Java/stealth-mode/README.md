# Stealth Mode Example
This example illustrates using Browseasy with [Playwright Java API](https://playwright.dev/java/docs/intro) to capture a screenshot when stealth mode activated. Note that stealth mode uses many advanced fingerprint evasion techniques, one of them is to randomize resolution when you connect to headless browser.

## Prerequisites
To run this example, make sure [Maven](https://maven.apache.org/what-is-maven.html) is available in your system.

## Running the example
Note that you need to update your connection string with respect to your plan details in [StealthMode.java](./src/main/java/com/browseasy/example/StealthMode.java). 
1. Install dependencies and compile
    ```
    mvn compile
    ```
2. Run application
    ```
    mvn exec:java
    ```
3. Check your working directory for browseasy.png file.
4. Run the application a few times to see the resolution changes every time.