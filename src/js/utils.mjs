// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
// function to get the parameters from the URL when requested

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "beforeend", clear = true) {
  if (!parentElement || !templateFn || !Array.isArray(list)) return;
  if (clear) parentElement.innerHTML = "";
  list.forEach((item) => {
    const html = templateFn(item);
    parentElement.insertAdjacentHTML(position, html);
  });
}
export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false,) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if(callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}


export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("/partials/header.html")
  const footerTemplate = await loadTemplate("/partials/footer.html")
 
  const headerElement = document.getElementById("main-header");
  const footerElement = document.getElementById("main-footer");
 
  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
