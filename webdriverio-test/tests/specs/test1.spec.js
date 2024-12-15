const homePage = require('../pageObjects/home.page.js'); 
const walletPage = require('../pageObjects/wallet.page.js');

describe('Test 1: Recovery Phrase Copy', () => {
  it('should verify that the copied recovery phrase matches the displayed phrase', async () => {
    // Step 1: Go to the homepage
    console.log('Navigating to the homepage...');
    await browser.url('https://solflare.com/');
    console.log('Homepage loaded.');

    // Ensure the "Access Wallet" button exists and is clickable
    console.log('Waiting for "Access Wallet" button to exist and be clickable...');
    await homePage.accessWalletButton.waitForExist({ timeout: 10000 });
    await homePage.accessWalletButton.waitForClickable();
    console.log('"Access Wallet" button is ready. Clicking the button...');
    await homePage.accessWalletButton.click();

    // Ensure the "New Wallet" button exists and is clickable
    console.log('Waiting for "New Wallet" button to exist and be clickable...');
    await homePage.newWalletButton.waitForExist({ timeout: 5000 });
    await homePage.newWalletButton.waitForClickable();
    console.log('"New Wallet" button is ready. Clicking the button...');
    await homePage.newWalletButton.click();

    // Step 2: Copy the recovery phrase
    console.log('Retrieving recovery phrase...');
    const recoveryPhraseText = await walletPage.recoveryPhrase.getText();
    console.log(`Recovery phrase retrieved: "${recoveryPhraseText}"`);
    console.log('Waiting for the "Copy" button to be clickable...');
    await walletPage.copyButton.waitForClickable();
    console.log('"Copy" button is ready. Clicking the button...');
    await walletPage.copyButton.click();

    // Step 3: Verify the copied recovery phrase
      it('should verify that the copied recovery phrase matches the displayed phrase', async () => {
        // Clear clipboard
        await browser.execute(() => navigator.clipboard.writeText(''));
    
        // Trigger copy
        const copyButton = await $('button[data-id="translate_button"]');
        await copyButton.click();
    
        // Wait for clipboard update
        await browser.pause(1000);
    
        // Retrieve clipboard content
        const clipboardText = await browser.execute(() => navigator.clipboard.readText());
        console.log('Clipboard content:', clipboardText);
    
        // Compare with expected recovery phrase
        expect(clipboardText.trim()).toBe(recoveryPhraseText.trim());
    });
  });
});




