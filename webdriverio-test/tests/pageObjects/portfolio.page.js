class PortfolioPage {
    // Selector for the portfolio container
    get portfolioContainer() {
      return $('.MuiContainer-root.MuiContainer-maxWidthLg.css-2jualf');
    }
  
    // Selector for the "Follow us on Twitter" button
    get followUsOnTwitterButton() {
      return $('button._1a406992._1a406994._1a406998._16aew8t0._16aew8ta._16aew8tj._16aew8tr._9rd95r0._1a40699a._1a406991.btn-secondary._1a406990');
    }
  
    // Method to check if the portfolio container is loaded
    async isPortfolioLoaded() {
      await this.portfolioContainer.waitForExist({ timeout: 5000 });
      return await this.portfolioContainer.isDisplayed();
    }
  
    // Method to click on the "Follow us on Twitter" button
    async clickFollowUsOnTwitter() {
      await this.followUsOnTwitterButton.waitForClickable({ timeout: 5000 });
      await this.followUsOnTwitterButton.click();
    }
  
    // Method to verify the Twitter tab is opened
    async verifyTwitterTab(originalTabHandle) {
      const allWindowHandles = await browser.getWindowHandles();
      return allWindowHandles.length > 1 && allWindowHandles.includes(originalTabHandle) === false;
    }
  
    // Method to close the Twitter tab and return to the original window
    async closeTwitterTabAndReturn(originalTabHandle) {
      const allWindowHandles = await browser.getWindowHandles();
      for (const handle of allWindowHandles) {
        if (handle !== originalTabHandle) {
          await browser.switchToWindow(handle);
          await browser.closeWindow();
        }
      }
      await browser.switchToWindow(originalTabHandle);
    }
  }
  
  module.exports = new PortfolioPage();
  