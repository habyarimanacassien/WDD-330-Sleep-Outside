import { getLocalStorage } from "./utils.mjs";

export function updateCartCount() {
  const badge = document.querySelector(".cart-count");
  if (!badge) return;

  const cart = getLocalStorage("so-cart") || [];

  const count = cart.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);

  if (count > 0) {
    badge.textContent = count;
    badge.classList.add("is-visible");
  } else {
    badge.textContent = 0;
    badge.classList.remove("is-visible");
  }
}

export function animateCartIcon() {
  const cartLink = document.querySelector(".cart-link");
  if (!cartLink) return;

  cartLink.classList.remove("cart-animate");

  // fuerza al navegador a reiniciar la animación
  void cartLink.offsetWidth;

  cartLink.classList.add("cart-animate");

  cartLink.addEventListener(
    "animationend",
    () => {
      cartLink.classList.remove("cart-animate");
    },
    { once: true }
  );
}