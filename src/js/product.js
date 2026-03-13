import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();


//import { getParam } from "./utils.mjs";
//import ProductData from "./ProductData.mjs";

//const dataSource = new ProductData("tents");
//const productId = getParam('product');

//console.log(dataSource.findProductById(productId));

//dataSource.findProductById(productId).then((product) => {
  //console.log(product);
//});

