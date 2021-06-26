# Debugging Example
This example illustrates using Browseasy with [Puppeteer-Sharp](https://github.com/hardkoded/puppeteer-sharp) to debug your web automation.

## Prerequisites
To run this example, make sure [.NET CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/) is installed in your system. 

Follow [prerequisites of Puppeteer-Sharp](https://github.com/hardkoded/puppeteer-sharp#prerequisites).

Sign in to https://debug.browseasy.com/inspector.html before running the application.

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
3. Check and inspect online chrome devtools application, opened in the browser.
4. Run the application multiple times to inspect fingerprint changes.