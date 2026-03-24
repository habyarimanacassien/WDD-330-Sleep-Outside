import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam} from "./utils.mjs";

loadHeaderFooter();

const category = getParam("category") ?? "tents";

// Turn "sleeping-bags" into "Sleeping Bags" for display purposes
const categoryLabel = category
  .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  
const titleSpan = document.querySelector(".title");    
if (titleSpan) titleSpan.textContent = categoryLabel;

const dataSource = new ProductData();
const element = document.querySelector(".product-list");
const listing = new ProductList(category, dataSource, element);
listing.init();
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

loadHeaderFooter();

const category = getParam('category');

const title = document.querySelector(".products h2");
title.textContent = `Top Products: ${category}`;

// first create an instance of the ProductData class.
const dataSource = new ProductData();
// then get the element you want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of the ProductList class and send it the correct information.
const myList = new ProductList(category, dataSource, listElement);
// finally call the init method to show the products
myList.init();
