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
        try {
            const list = await this.dataSource.getData();
            this.renderList(list);
        } catch (error) {
            console.error("Error loading product data:", error);
        }
    }

    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList, "beforeend", true);
    }
}

function productCardTemplate(product) {
  return `<li class="product-card">
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
            <h2 class="card__brand">${product.Brand?.Name ?? ""}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <p class="product-card__price">$${Number(product.FinalPrice).toFixed(2)}</p>
        </a>
    </li>`;
}
