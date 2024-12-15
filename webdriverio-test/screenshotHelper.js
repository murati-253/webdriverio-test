// screenshotHelper.js

const fs = require('fs');
const path = require('path');

async function takeScreenshot(testName) {
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

module.exports = { takeScreenshot };
