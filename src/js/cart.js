// TEAM NOTE:
// This file was updated to fix the error that happened when the cart was empty.
// Previously the app tried to use .map() on a null value from localStorage,
// which caused a runtime error.
//
// Now we safely default to an empty array:
// const cartItems = getLocalStorage("so-cart") || [];
//
// We also added logic to:
// - Show a message when the cart is empty
// - Dynamically calculate and display the cart total
// - Show or hide the cart footer using the CSS utility class `.hide`
//
// This improves UX and prevents crashes.

import { getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartIndicator.mjs";
import { loadHeaderFooter } from "./utils.mjs";

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
