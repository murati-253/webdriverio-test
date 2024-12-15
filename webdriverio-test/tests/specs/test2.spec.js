const homePage = require('../pageObjects/home.page.js'); 
const walletPage = require('../pageObjects/wallet.page.js');
const portfolioPage = require('../pageObjects/portfolio.page.js');

describe('Test 2: Recovery Phrase and Twitter Verification', () => {
  it('should verify recovery phrase entry and Twitter navigation', async () => {
    // Step 1: Go to the homepage
    console.log('Navigating to the homepage...');
    await browser.url('https://solflare.com/');
    console.log('Homepage loaded.');

    // Step 2: Click on "Access Wallet"
    console.log('Waiting for "Access Wallet" button to be clickable...');
    await homePage.accessWalletButton.waitForClickable({ timeout: 5000 });
    console.log('Clicking "Access Wallet" button...');
    await homePage.accessWalletButton.click();

    // Step 3: Click on "I need a new wallet"
    console.log('Waiting for "I need a new wallet" button to be clickable...');
    await homePage.newWalletButton.waitForClickable({ timeout: 5000 });
    console.log('Clicking "I need a new wallet" button...');
    await homePage.newWalletButton.click();

    // Step 4: Note the recovery phrase
    console.log('Retrieving recovery phrase...');
    const recoveryPhraseText = await walletPage.recoveryPhrase.getText();
    console.log(`Recovery phrase retrieved: "${recoveryPhraseText}"`);

    // Step 5: Click on "I saved my recovery phrase"
    console.log('Waiting for "I saved my recovery phrase" button to be clickable...');
    await walletPage.savedRecoveryPhraseButton.waitForClickable({ timeout: 5000 });
    console.log('Clicking "I saved my recovery phrase" button...');
    await walletPage.savedRecoveryPhraseButton.click();

    // Step 6: Enter the recovery phrase manually
    const exists = await $('input[data-id="recovery_phrase_input"]').isExisting();
    console.log('Element exists:', exists);

    const recoveryPhraseInput = await $('input[data-id="recovery_phrase_input"]');
    await recoveryPhraseInput.waitForDisplayed({ timeout: 5000 }); // Error is here
    await recoveryPhraseInput.click();

    console.log('Waiting for the recovery phrase input field to be visible...');
    await walletPage.recoveryPhraseInput.waitForDisplayed({ timeout: 5000 });
    console.log('Entering the recovery phrase...');
    await walletPage.enterRecoveryPhrase(recoveryPhraseText);


    // Step 7: Click on "Continue"
    console.log('Waiting for "Continue" button to be clickable...');
    await walletPage.continueButton.waitForClickable({ timeout: 5000 });
    console.log('Clicking "Continue" button...');
    await walletPage.continueButton.click();

    // Step 8: Enter password
    console.log('Entering password...');
    const password = 'TestPassword123!';

    // Ensure password field is visible and set the value
    await walletPage.passwordInput.waitForDisplayed({ timeout: 5000 });
    await walletPage.passwordInput.setValue(password);

    // Ensure confirm password field is visible and set the value
    await walletPage.confirmPasswordInput.waitForDisplayed({ timeout: 5000 });
    await walletPage.confirmPasswordInput.setValue(password);

    console.log('Password entered successfully.');

    // Step 9: Click on "Continue"
    console.log('Waiting for "Continue" button to be clickable...');
    await walletPage.continueButton2.waitForClickable({ timeout: 5000 });
    console.log('Clicking "Continue" button...');
    await walletPage.continueButton2.click();

    // Step 10: Click on "Follow us on Twitter"
    console.log('Waiting for "Follow us on Twitter" button to be clickable...');
    await walletPage.followTwitterButton.waitForClickable({ timeout: 5000 });
    console.log('Clicking "Follow us on Twitter" button...');
    await walletPage.followTwitterButton.click();

    // Step 11: Verify Twitter profile opens in a new tab
    console.log('Verifying Twitter profile opened in a new tab...');
    const windowHandles = await browser.getWindowHandles();
    expect(windowHandles.length).toBe(2);

    // Switch to Twitter tab
    browser.pause(5000);  // Wait for 1 second
    console.log('Switching to Twitter tab...');
    await browser.switchToWindow(windowHandles[1]);
    browser.pause(1000);  // Add a short pause to ensure tab switch completes
    
    // Ensure you check the URL after switching
    const currentUrl = await browser.getUrl();
    console.log('Current URL:', currentUrl);  // Optional: Log the URL to verify
    
    // I want test to fail, uncomment next line and it will pass
    expect(currentUrl).toContain('FAIL');
    //expect(currentUrl).toContain('https://x.com');

    // Step 12: Close the Twitter tab
    console.log('Closing Twitter tab...');
    await browser.closeWindow();

    // Step 13: Verify Twitter tab is closed and user is returned to the app
    console.log('Switching back to the Solflare app tab...');
    await browser.switchToWindow(windowHandles[0]);
    expect(await browser.getUrl()).toContain('solflare');

    // Step 14: Verify the portfolio is loaded
    console.log('Verifying the portfolio page is loaded...');
    await portfolioPage.portfolioContainer.waitForExist({ timeout: 5000 });
    console.log('Portfolio page loaded successfully.');
  });
});
