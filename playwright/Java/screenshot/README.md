# Screenshot Example
This example illustrates using Browseasy with [Playwright Java API](https://playwright.dev/java/docs/intro) to capture a screenshot.

## Prerequisites
To run this example, make sure [Maven](https://maven.apache.org/what-is-maven.html) is available in your system.

## Running the example
Note that you need to update your connection string with respect to your plan details in [Screenshot.java](./src/main/java/com/browseasy/example/Screenshot.java). 
1. Install dependencies and compile
    ```
    mvn compile
    ```
2. Run application
    ```
    mvn exec:java
    ```
3. Check your working directory for browseasy.png file.