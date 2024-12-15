exports.config = {
    runner: 'local',
    specs: ['./tests/specs/**/*.js'], // Path to test files
    exclude: [],
    maxInstances: 1, // Number of instances to run simultaneously
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true
    }],
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            // Check if headless mode is passed as an argument, if so, enable headless mode
            args: process.argv.includes('--headless') ? ['--headless', '--disable-gpu'] : []
        }
    }],
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
    before: function () {
        /**
         * Custom commands or global setup can go here.
         * The browser and expect global variables are available by default.
         */
    }
    
};
