import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cartIndicator.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }
  async init() {
    // 1 search the product
    const product = await this.dataSource.findProductById(this.productId);
    // 2 save the product
    this.product = product;
    // 3 render HTML
    this.renderProductDetails();
    // 4 configure button
    this.setupAddToCartButton();
  }

  addProductToCart() {
    let cart = getLocalStorage("so-cart") || [];
    cart.push(this.product);
    setLocalStorage("so-cart", cart);
  }

  addToCartHandler() {
    this.addProductToCart();
  }

  setupAddToCartButton() {
    document.getElementById("addToCart").addEventListener("click", () => {
      this.addProductToCart();
    });
  }
  renderProductDetails() {

export default class ProductDetails{
    constructor(productId, dataSource){
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }
    async init() {

    // 1 buscar producto
    const product = await this.dataSource.findProductById(this.productId);
    // 2 guardar producto
    this.product = product;
    // 3 renderizar html
    this.renderProductDetails();
    // 4 configurar boton
    this.setupAddToCartButton();
    }

    addProductToCart() {
        let cart = getLocalStorage("so-cart") || [];
        cart.push(this.product);
        setLocalStorage("so-cart", cart);
    }

    addToCartHandler() {
    this.addProductToCart();
    }

    setupAddToCartButton() {
        document
            .getElementById("addToCart")
            .addEventListener("click", () => {
                this.addProductToCart();
        });
    }
    renderProductDetails() {
    const main = document.querySelector("main");

    main.innerHTML = `
    <section class="product-detail">
      <h3>${this.product.Brand.Name}</h3>
      <h2>${this.product.NameWithoutBrand}</h2>
      <img src="${this.product.Image}" alt="${this.product.Name}">
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <div class="product__description">
        ${this.product.DescriptionHtmlSimple}
      </div>
      <button id="addToCart">Add to Cart</button>
    </section>`;
  }
}

updateCartCount();
    }





}
