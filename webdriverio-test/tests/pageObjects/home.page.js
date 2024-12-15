class HomePage {
  // Selector for the "Access Wallet" button
  get accessWalletButton() {
    //return $('div.header__btn');
    return $('a.btn.btn--dark.btn--mobile-full[href="/access"]');
  }

  // Selector for the "I need a new wallet" button
  get newWalletButton() {
    return $('button[data-id="i_need_a_wallet_button"]');
  }
}

module.exports = new HomePage();
