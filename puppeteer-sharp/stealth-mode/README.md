# Stealth Mode Example
This example illustrates using Browseasy with [Puppeteer-Sharp](https://github.com/hardkoded/puppeteer-sharp) to capture a screenshot when stealth mode activated. Note that stealth mode uses many advanced fingerprint evasion techniques, one of them is to randomize resolution when you connect to headless browser.

## Prerequisites
To run this example, make sure [.NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/) is installed in your system. 

Follow [prerequisites of Puppeteer-Sharp](https://github.com/hardkoded/puppeteer-sharp#prerequisites).

## Running the example
Note that you need to update your connection string with respect to your plan details in [Program.cs](./Program.cs). 
1. Install dependencies and build application
    ```
    $ dotnet build
    ```
2. Run application
    ```
    $ dotnet run
    ```
3. Check your working directory for browseasy.png file.
4. Run the application a few times to see the resolution changes every time.