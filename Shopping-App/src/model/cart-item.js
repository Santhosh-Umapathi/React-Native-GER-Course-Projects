export default class CartItem {
  constructor(
    quantity = 0,
    productPrice = 0,
    productTitle = "",
    sum = 0,
    ownerPushToken = ""
  ) {
    this.quantity = quantity;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
    this.ownerPushToken = ownerPushToken;
  }
}
