// Incrementações a serem feitas:
// 1 - Criar botões para apagar o item; - v
// 3 - Colocar image acompanhando o item no carrinho - V
// 4 - Reformatar o estilo;
// 5 - adicionar um input de pesquisas;

async function onchangeurl() {
  const input = document.querySelector('.input__search');
  const button = document.querySelector('.submit__search');
  button.addEventListener('click', async () => {
    await createItemElements(`https://api.mercadolibre.com/sites/MLB/search?q=${input.value}`);
    executeFunctionWhenClick()
  })
}

function eventListenerOlList() {
  const arrayLiCartItems = Array.from(document.querySelectorAll('.cart__item'));
  const splitedArray = (arrayLiCartItems).map((element) => element.innerText.split('$'));
  const justPrices = splitedArray.map((element) => Number(element[1]));
  const finalPrice = justPrices.reduce((sum, number) => sum + number, 0);
  if (finalPrice - Math.floor(finalPrice) === 0) return finalPrice.toFixed(0);
  if (finalPrice - finalPrice.toFixed(1) === 0) return finalPrice.toFixed(1);
  return finalPrice.toFixed(2);
}

async function createPriceElement() {
  const paragraph = document.querySelector('.price__container');
  return paragraph.innerText = `${await eventListenerOlList()}`;
}  

async function addSumToCartList() {
  const price = document.querySelector('.price__container');
  price.innerText = `Preço total: R$${await eventListenerOlList()}`;
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function rememberCartItemsOnload() {
  const cartItemsHTMLFather = document.querySelector('ol');
  cartItemsHTMLFather.innerHTML = localStorage.getItem('CartHTML');
  cartItemsHTMLFather.addEventListener('click', cartItemClickListener);
}

function setLocalStorageItemCartItems() {
  const items = document.querySelector('ol').innerHTML;
  localStorage.CartHTML = items;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';
  
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  // coloque seu código aqui
  event.target.parentNode.parentNode.remove();
  setLocalStorageItemCartItems();
  addSumToCartList();
}

function createButtonsRemoveItem() {
  const button = document.createElement('input');
  button.className = 'button__remove__item__cart';
  button.type = 'image';
  button.src = 'https://www.flaticon.com/svg/vstatic/svg/3143/3143542.svg?token=exp=1618510454~hmac=a0759c233db3e76512f812159daf8788';
  button.addEventListener('click', cartItemClickListener);
  return button
}

async function createCartItemElement({ id: sku, title: name, price: salePrice, thumbnail: image  }) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const img = document.createElement('img');
  img.className = 'img__cart__shopping';
  img.src = image;
  img.style.display = 'block';
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} |           NAME: ${name} | PRICE: $${salePrice}`;
  li.appendChild(div);
  div.className = 'div__cart__item';
  div.appendChild(img);
  div.appendChild(createButtonsRemoveItem());
  return li;
}

// requisito 1 ------------------------------------------------------------------------------------
// essa função acessa os array "results" da API
async function getResultsAPI(url) {
  const { results } = await fetch(url)
  .then((response) => response.json())
  .catch(() => 'não foi possível acessar a API');
  return results;
}

// Essa função chama executa uma chamada para a função que monta o elemento;
async function createItemElements(url) {
  const sectionItems = document.querySelector('.items');
  
// Essa linha começa a trabalhar no 'loading' da página.
  const APILoading = '<div class = "loading" >loading...</div>';
  sectionItems.innerHTML = APILoading;
  const getLoading = document.querySelector('.loading');
  
  const createHTMLElements = await getResultsAPI(url)
  .then((array) => {
    getLoading.remove();
    array.forEach((element) => sectionItems.appendChild(createProductItemElement(element)));
  })
  .catch((error) => getLoading.remove());
  return createHTMLElements;
}

// requisito 2 ------------------------------------------------------------------------------------

function executeFunctionWhenClick() {
  const getOlList = document.querySelector('.cart__items');
  const ItemsGrid = document.querySelectorAll('.item');
  ItemsGrid.forEach(async (item) => {
    item.lastChild.addEventListener('click', async () => {
      const idItem = getSkuFromProductItem(item);

      const itemInfo = await fetch(`https://api.mercadolibre.com/items/${idItem}`)
      .then((response) => response.json())
      .then((data) => data);

      getOlList.appendChild(await createCartItemElement(itemInfo));
      setLocalStorageItemCartItems();
      addSumToCartList();
    });
  });
}

// requisito 3 ------------------------------------------------------------------------------------
// código na linha 41

// requisito 4 ------------------------------------------------------------------------------------
// Quando devo salvar o carrinho? Quando ele é atualizado?
// Quando adiciono um item
// Quando removo um item
// Quando esvazio o carrinho

// Função feita na linha 8

// requisito 5 ------------------------------------------------------------------------------------
// Quando devo somar no carrinho? Quando a soma é atualizada?
// Nas mesmas horas que algum item do carrinho muda.
// código na linha 1;
// requisito 6 ------------------------------------------------------------------------------------
function actionCleanItemsCart() {
  const arrayItems = document.querySelectorAll('.cart__item');  
  arrayItems.forEach((item) => {
    item.remove();
  });
  setLocalStorageItemCartItems();
  addSumToCartList();
}

function cleanAllItemsShoppingCart() {
  const cartButton = document.querySelector('.empty-cart');
  cartButton.addEventListener('click', actionCleanItemsCart);
}

// requisito 7 ------------------------------------------------------------------------------------
// código na linha 69 em diante
// peguei a idéia desse requisito nesses links:
//  stackoverflow.com/questions/53799108/how-to-add-a-loading-animation-while-fetch-data-from-api-vanilla-js
//  stackoverflow.com/questions/36294109/how-to-check-if-a-promise-is-pending
// ------------------------------------------------------------------------------------------------

window.onload = async function onload() {
  rememberCartItemsOnload();
  await createPriceElement();
  await createItemElements('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  await onchangeurl();
  await executeFunctionWhenClick();
  cleanAllItemsShoppingCart();
  await addSumToCartList();
};
