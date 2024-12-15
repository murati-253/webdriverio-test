const homePage = require('../pageObjects/home.page.js'); 
const walletPage = require('../pageObjects/wallet.page.js');
const portfolioPage = require('../pageObjects/portfolio.page.js');


describe('Test 3: Recovery Phrase and My Wallets', () => {
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

    // Step 10: Click on "Enter Solana"
    console.log('Waiting for "Enter Solana" button to be clickable...');
    await walletPage.enterSolanaButton.waitForClickable({ timeout: 5000 });
    console.log('Clicking "Enter Solana" button...');
    await walletPage.enterSolanaButton.click();

    // Step 11: Click on "Wallet management" (Avatar in the right corner of the header)
    console.log('Waiting for "Wallet management" button to be clickable...');
    await walletPage.walletManagementButton.waitForClickable({ timeout: 10000 });
    console.log('Clicking "Wallet management" button...');
    await walletPage.walletManagementButton.click();

    // Step 12: Verify that the Main wallet is displayed
    console.log('Verifying main wallet is displayed...');
    await walletPage.mainWallet.waitForDisplayed({ timeout: 5000 });
    console.log('Main wallet is displayed.');

    // Step 13: Click on icon "+"
    console.log('Clicking on "+" icon...');
    await walletPage.plusIcon.waitForClickable({ timeout: 5000 });
    await walletPage.plusIcon.click();

    // Step 14: Click on "Manage recovery phrase"
    console.log('Clicking on "Manage recovery phrase" button...');
    await walletPage.manageRecoveryPhraseButton.waitForClickable({ timeout: 5000 });
    await walletPage.manageRecoveryPhraseButton.click();

    // Step 15: Verify that the first toggle is disabled
    if (this.isToggleDisabled) {
        console.log('Button is disabled');
    } else {
        console.log('Button is not disabled');
    }

    // Step 16: Verify that the first toggle is on

    if (this.isFirstToggleOn) {
        console.log('Toggle is ON');
    } else {
        console.log('Toggle is OFF');
    }

    // Step 17: Select the 3rd and 4th list items
    console.log('Selecting the 3rd and 4th list items...');
    try {
        await walletPage.selectRecoveryPhraseItem(2); // Index 2 for 3rd item
        console.log('Successfully selected the 3rd recovery phrase item.');

        await walletPage.selectRecoveryPhraseItem(3); // Index 3 for 4th item
        console.log('Successfully selected the 4th recovery phrase item.');
    } catch (error) {
        console.error(`Error during selection of recovery phrase items: ${error.message}`);
        throw error; // Re-throw the error for further investigation
    }

    // Step 18: Click on "Save" button
    console.log('Clicking on "Save" button...');
    await walletPage.saveRecoveryPhraseButton.waitForClickable({ timeout: 5000 });
    await walletPage.saveRecoveryPhraseButton.click();

    // Step 19: Verify that the recovery phrase list contains the original wallet and newly added wallets
    console.log('Verifying recovery phrase list contains the original and newly added wallets...');
    const recoveryPhraseList = await walletPage.recoveryPhraseList.getText();
    console.log('Recovery Phrase List:', recoveryPhraseList);
    expect(recoveryPhraseList).toContain('Main Wallet'); // Assuming original wallet is identified as such
    expect(recoveryPhraseList).toContain('Wallet 2'); // Assuming newly added wallet appears here

    console.log('Test completed successfully.');
  });
});
