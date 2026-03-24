import ProductData from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // Pass in a dataSource with getData() and the UL/OL element to render into
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
   const list = await this.dataSource.getData(this.category);
    this.renderList(list);
  }

  renderList(productList) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      productList,
      "beforeend",
      true,
    );
  }
}

function productCardTemplate(product) {
  const isDiscounted =
    Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);
  const savingsAmount = isDiscounted
    ? (
        Number(product.SuggestedRetailPrice) - Number(product.FinalPrice)
      ).toFixed(2)
    : null;
  const savingsPercent = isDiscounted
    ? Math.round(
        ((Number(product.SuggestedRetailPrice) - Number(product.FinalPrice)) /
          Number(product.SuggestedRetailPrice)) *
          100,
      )
    : null;

  productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}
