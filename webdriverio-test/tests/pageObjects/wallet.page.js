class WalletPage {
  // Existing selectors
  get copyButton() {
    return $('button.MuiButton-root.MuiButton-text.MuiButton-textPrimary.MuiButton-sizeMedium.MuiButton-textSizeMedium.MuiButton-colorPrimary');
  }

  get recoveryPhrase() {
    return $('.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-2.jssSolrise18.css-isbt42');
  }

  // New selector for the "Continue" button
  get continueButton() {
    return $('button[data-id="continue_button"]'); // Using the data-id attribute to uniquely identify the button
  }

  get continueButton2() {
    return $('button.MuiButton-contained.MuiButton-containedPrimary');  // Combining the classes to make the selector more specific
  }

  // Methods
  async clickContinueButton() {
    await this.continueButton.waitForClickable({ timeout: 5000 });
    await this.continueButton.click();
  }

  get savedRecoveryPhraseButton() {
    return $('button.MuiButton-root.MuiButton-contained.MuiButton-containedPrimary.MuiButton-sizeMedium.MuiButton-containedSizeMedium.MuiButton-colorPrimary');
  }

  // Methods
  async clickSavedRecoveryPhraseButton() {
    await this.savedRecoveryPhraseButton.waitForClickable({ timeout: 5000 });
    await this.savedRecoveryPhraseButton.click();
  }
  
  get recoveryPhraseInput() {
    return $('input[data-id="recovery_phrase_input"]');
  }

  // Methods
  async enterRecoveryPhrase(recoveryPhraseText) {
    console.log(`Raw recovery phrase: "${recoveryPhraseText}"`);
    const words = recoveryPhraseText.trim().split(/\s+/);
    console.log(`Split recovery phrase: ${words}`);
    console.log(`Type of words: ${typeof words}`);
    console.log(`Words array after splitting:`, words);

    for (let i = 0; i < words.length; i++) {
      const inputField = $(`input[id="mnemonic-input-${i}"]`); 
      console.log(`Entering word "${words[i]}" into field mnemonic-input-${i}`);
      await inputField.waitForDisplayed({ timeout: 5000 });
      await inputField.setValue(words[i]);
    }
  }

  get passwordInput() {
    return $('input[name="password"]'); 
  }

  get confirmPasswordInput() {
    return $('input[name="password2"]'); 
  }

    // Selector for the "Follow us on Twitter" button
  get followTwitterButton() {
    return $('button._1a406992._1a406994._1a406998._16aew8t0._16aew8ta._16aew8tj._16aew8tr._9rd95r0._1a40699a._1a406991.btn-secondary._1a406990');
  }

  get enterSolanaButton() {
    return $('button._1a406992._1a406993._1a406998._16aew8t0._16aew8ta._16aew8tj._16aew8tr._9rd95r0._1a40699a._1a406991.btn-primary._1a406990');
  }

  get walletManagementButton() {
    return $('div.edp3oa0 svg[role="img"]');
  }  

  get mainWallet() {
    return $('div.wctcrs1.wctcrs2.wctcrs8.wctcrsd.wctcrse.wctcrsi.wctcrs0').$('span=Main Wallet');
  }  

  get plusIcon() {
    return $('button._1dnyra90 div._1do4akc1._1do4akc6 svg[data-icon="plus"]');
  }  

  get manageRecoveryPhraseButton() {
    return $('div.wctcrs1 div.tlirieb svg[data-icon="list"]');
  }  

  get firstToggle() {
    return $('button._1qwtpic0');
  }

  get isToggleDisabled() {
    return $('button._1qwtpic0').getAttribute('data-disabled') !== null;
  }

  get isFirstToggleOn() {
    const button = $('button._1qwtpic0');
    return button.getAttribute('aria-checked') === 'true' || button.getAttribute('data-state') === 'checked';
  } 



  async selectRecoveryPhraseItem(index) {
    console.log(`Attempting to select recovery phrase item with index: ${index}`);

    // Locate the container element using the index
    const itemContainer = await $(`div[data-index="${index}"]`);

    // Check if the container exists
    const isContainerExisting = await itemContainer.isExisting();
    if (!isContainerExisting) {
        throw new Error(`Recovery phrase item container with index ${index} does not exist.`);
    }
    console.log(`Container located: Recovery phrase item with index ${index}`);

    // Locate the button within the container
    const button = await itemContainer.$('button[type="button"]');

    // Check if the button exists
    const isButtonExisting = await button.isExisting();
    if (!isButtonExisting) {
        throw new Error(`Button inside recovery phrase item with index ${index} does not exist.`);
    }
    console.log(`Button located within container for index ${index}`);

    // Ensure the button is clickable
    await button.waitForClickable({ timeout: 5000 });
    console.log(`Button is clickable: Recovery phrase item with index ${index}`);

    // Log state before clicking (if applicable)
    const stateBefore = await button.getAttribute('aria-checked'); // Replace with correct attribute if different
    console.log(`State before click for index ${index}: ${stateBefore}`);

    // Click the button
    await button.click();
    console.log(`Button clicked for recovery phrase item with index ${index}`);

    // Log state after clicking (if applicable)
    const stateAfter = await button.getAttribute('aria-checked'); // Replace with correct attribute if different
    console.log(`State after click for index ${index}: ${stateAfter}`);

    // Verify state change (optional, depending on your requirements)
    if (stateBefore === stateAfter) {
        console.warn(`State did not change for index ${index}. Ensure click has the desired effect.`);
    }
  }



  get saveRecoveryPhraseButton() {
    return $('button._1a406992._1a406993._1a406998._16aew8t0._16aew8ta._16aew8tj._16aew8tr._9rd95r0._1a40699a._1a406991.btn-primary._1a406990');
  }

  get recoveryPhraseList() {
    return $('div.s99g393');
  }

}

module.exports = new WalletPage();
