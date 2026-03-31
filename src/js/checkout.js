import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";    

async function initCheckout() {
   await loadHeaderFooter();

   const checkout = new CheckoutProcess("so-cart", ".order-summary");
   checkout.init();

    const form = document.getElementById("checkout-form")
    if (!form) return
    
    form.addEventListener("submit", async (evt) => {
        evt.preventDefault();
        const submitBtn = form.querySelector("[type=\"submit\"]");
        if (submitBtn) submitBtn.disabled = true; // prevent multiple submissions
  
        try {
            await checkout.checkout(form);
        } catch (err) {
            console.error("Checkout failed:", err);
            alert("There was an issue processing your order. Please try again.");
        } finally {
            if (submitBtn) submitBtn.disabled = false; // re-enable the button
        }
    });
}

window.addEventListener("DOMContentLoaded", initCheckout);
