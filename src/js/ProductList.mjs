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
    const isDiscounted = Number(product.FinalPrice) < Number(product.SuggestedRetailPrice);  
    const savingsAmount = isDiscounted ? (Number(product.SuggestedRetailPrice) - Number(product.FinalPrice)).toFixed(2) : null;
    const savingsPercent = isDiscounted ? Math.round((Number(product.SuggestedRetailPrice) - Number(product.FinalPrice)) / Number(product.SuggestedRetailPrice) * 100) : null;

return `<li class="product-card${isDiscounted ? " product-card--sale" : ""}">
        <a href="product_pages/?product=${product.Id}">
            <img src="${product.Image}" alt="Image of ${product.NameWithoutBrand}">
            <h2 class="card__brand">${product.Brand?.Name ?? ""}</h2>
            <h3 class="card__name">${product.NameWithoutBrand}</h3>
            <div class="product-card__pricing">${isDiscounted ? `<span class="price price--retail">$${Number(product.SuggestedRetailPrice).toFixed(2)}</span> ` : ""}
            <span class="price price---final">$${Number(product.FinalPrice).toFixed(2)}</span>${isDiscounted ? `<span class="badge badge--sale">Save $${savingsAmount} (${savingsPercent}% off)</span>` : ""}
          </div>
        </a>
    </li>`;
}
