// wdio.conf.js

// Get the browser from the command line argument (default to 'chrome' if not provided)
const browserType = process.argv.find(arg => arg.includes('--browser'))?.split('=')[1] || 'chrome'; 

// Check if '--headless' is passed in the command line arguments
const isHeadless = process.argv.includes('--headless'); // Check for headless flag in command line args

// Check if '--screenshots' is passed in the command line arguments
const isScreenshotsEnabled = process.argv.includes('--screenshots'); // Check for screenshots flag in command line args

const fs = require('fs');
const path = require('path');

// Function to save screenshots (if enabled)
async function takeScreenshot(testName) {
    if (!isScreenshotsEnabled) {
        return; // Skip taking screenshots if the flag is not provided
    }

    const screenshotDir = './screenshots'; // Directory to save screenshots

    // Ensure the directory exists
    if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir);
    }

    // Create a timestamped filename to avoid overwriting screenshots
    const timestamp = new Date().toISOString().replace(/[^\w\s]/gi, '-');
    const filename = `${testName}-${timestamp}.png`;
    const filePath = path.join(screenshotDir, filename);

    // Take a screenshot and save it to the specified file path
    await browser.saveScreenshot(filePath);
    console.log(`Screenshot saved to ${filePath}`);
}

exports.config = {
    runner: 'local',
    specs: ['./tests/specs/**/*.js'], // Path to test files
    exclude: [],
    maxInstances: 1, // Number of instances to run simultaneously
    capabilities: [
        // Chrome configuration
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    ...(isHeadless ? ['--headless'] : []), // Add --headless only if 'headless' flag is present
                    '--window-size=1280x1024',
                    '--remote-debugging-port=9222',
                ],
            },
        },
        // Firefox configuration
        {
            browserName: 'firefox',
            'moz:firefoxOptions': {
                args: [
                    ...(isHeadless ? ['-headless'] : []), // Add '-headless' only if 'headless' flag is present
                    '-width=1280',
                    '-height=1024',
                ],
            },
        },
    ].filter(capability => capability.browserName === browserType), // Filter capabilities based on the selected browser type
      
    logLevel: 'info',
    bail: 0, // Don't stop running tests after a failure
    baseUrl: 'https://solflare.com', // Base URL for your application
    waitforTimeout: 10000, // Timeout for waitFor commands
    connectionRetryTimeout: 120000, // Retry timeout
    connectionRetryCount: 3, // Retry attempts
    framework: 'mocha', // Framework to use
    reporters: ['spec'], // Test results reporter
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000 // Mocha test timeout
    },

    // Add the 'afterTest' hook to take a screenshot after each failed test (if enabled)
    afterTest: async function (test, context, result) {
        if (result.error) {
            // If the test failed and screenshots are enabled, take a screenshot
            await takeScreenshot(test.title);
        }
    },

    before: function () {
        /**
         * Custom commands or global setup can go here.
         * The browser and expect global variables are available by default.
         */
    }
};
