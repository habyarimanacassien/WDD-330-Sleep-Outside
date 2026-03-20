import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./cartIndicator.mjs";

const productData = new ProductData("tents");
const productList = new ProductList("tents", productData, document.querySelector(".product-list"));
productList.init();
updateCartCount();
import { loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter();
