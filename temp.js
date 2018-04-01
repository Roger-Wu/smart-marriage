this.itemTokenContract.ownerOf(0).then((result) => {
  this.owner = result._owner;
});
this.itemTokenContract.startingPriceOf(0).then((result) => {
  this.startingPrice = result._startingPrice; // BN -> number
});
this.itemTokenContract.priceOf(0).then((result) => {
  this.price = result._price; // BN -> number
});
this.itemTokenContract.nextPriceOf(0).then((result) => {
  this.nextPrice = result._nextPrice; // BN -> number
});