// TEAM NOTE:
// This file was simplified after refactoring the shopping cart into its own module.
//
// Previously, cart.js contained all logic related to:
// - Reading localStorage
// - Rendering cart items
// - Calculating totals
// - Manipulating DOM directly
//
// Now cart.js acts only as an entry point that:
//
// - Loads the shared header and footer using loadHeaderFooter()
// - Queries required DOM elements
// - Creates an instance of the ShoppingCart class
// - Calls init() to render the cart
//
// This separation of concerns keeps the file lightweight and aligns
// the cart implementation with the modular architecture used elsewhere
// in the application.


import { getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartIndicator.mjs";
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Renders cart items dynamically and controls the visibility of the cart total section.
// If there are no items, it displays an empty cart message instead of breaking the app.

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    productList.innerHTML = htmlItems.join("");

    
    const total = cartItems.reduce(
      (sum, item) => sum + item.FinalPrice,
      0
    );

    
    cartFooter.classList.remove("hide");
    cartTotalElement.innerHTML = `Total: $${total.toFixed(2)}`;
  } else {
    productList.innerHTML = "<p>Your cart is empty</p>";
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();
updateCartCount();
loadHeaderFooter();

const productList = document.querySelector(".product-list");
const cartFooter = document.querySelector(".cart-footer");
const cartTotal = document.querySelector(".cart-total");

// Create a ShoppingCart instance by passing the DOM elements it needs to control.

const shoppingCart = new ShoppingCart(
  productList,
  cartFooter,
  cartTotal
);

// Initialize the cart rendering process.

shoppingCart.init();


// NOTE FOR TEAM:
// Future cart features (remove item, update quantity, checkout validation)
// should be implemented inside ShoppingCart.mjs to maintain architectural consistency.