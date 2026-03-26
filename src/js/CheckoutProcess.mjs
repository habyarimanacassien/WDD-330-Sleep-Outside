export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
   this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);
 
  const subtotalElement = document.querySelector(
    `${this.outputSelector} #subtotal`
  );
  const itemCountElement = document.querySelector(
    `${this.outputSelector} #itemCount`
  );
 
  subtotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  if (itemCountElement) {
    itemCountElement.innerText = this.list.length;
  }
} 
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    const itemCount = this.list.length;

    this.tax = (this.itemTotal * 0.06)
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
 

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const taxElement = document.querySelector(`${this.outputSelector} #tax`);
    const shippingElement = document.querySelector(
      `${this.outputSelector} #shipping`
    );
    const orderTotalElement = document.querySelector(
      `${this.outputSelector} #orderTotal`
    );
 
    taxElement.innerText = `$${this.tax.toFixed(2)}`;
    shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}
