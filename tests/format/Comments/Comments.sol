pragma solidity ^0.4.24;



contract Comments12 {
  function f() public {
    purchaseData[0] = DomainPurchaseData({
      /* test */prices: _rootPrices,
      // test2
      subdomainMintingEnabled: /* test3 */_rootPrices.short > 0,
      allowSubdomainsToMint: true, // test4
      wasAllowedToSubdomainMintOnCreation: true
    });
           }
}
