// Добавляем товар в корзину из API
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


//Класс карточки продукта, получаемый из API файла json
class ProductsList {
  constructor(container = '.products') {
      this.container = container;
      this.goods = [];
      this.allProducts = [];
      this._getProducts()
          .then(data => { 
              this.goods = [...data];
              this.render()
          });
  }
  //Получаем массив объектов из файла json и делаем рендер
  _getProducts() {
      return fetch(`${API}/catalogData.json`)
          .then(result => result.json())
          .catch(error => {
              console.log(error);
          })
  }
  calcSum() {
      return this.allProducts.reduce((accum, item) => accum += item.price, 0);
  }
  render() {
      const block = document.querySelector(this.container);
      for (let product of this.goods) {
          const productObj = new ProductItem(product);
          this.allProducts.push(productObj);
          block.insertAdjacentHTML('beforeend', productObj.render());
      }

  }
}

// Добавляем полученные объекты в разметку страницы
class ProductItem {
  constructor(product, img = 'https://img.freepik.com/premium-vector/online-shop-logo-designs-concept-vector-online-store-logo-designs_7649-661.jpg?w=826') {
      this.title = product.product_name;
      this.price = product.price;
      this.id = product.id_product;
      this.img = img;
  }
  render() {
      return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} $</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`
  }
}

let list = new ProductsList();






// Класс корзины, в котором перебираем массик из json и добавляем объекты в корзину
class basket {
  constructor(container = '.basket') {
      this.container = container;
      this.goods = [];
     
      this._clickBasket();
      this._getBasketItem()
          .then(data => { 
              this.goods = [...data.contents];
              this.render()
          });
  }


  _getBasketItem() {
      return fetch(`${API}/getBasket.json`)
          .then(result => result.json())
          .catch(error => {
              console.log(error);
          })
  }

  render() {
      const block = document.querySelector(this.container);
      for (let product of this.goods) {
          const productObj = new BasketItem();
          
          block.insertAdjacentHTML('beforeend', productObj.render(product));
      }

  }

  _clickBasket() {
      document.querySelector(".btn-cart").addEventListener('click', () => {
          document.querySelector(this.container).classList.toggle('basketHidden');
      });
  }
}

class BasketItem {

  render(product) {
      return `    <div class="cart-item" data-id="${product.id_product}">
                  <div class="product-cart">
                  <img src="${product.img}" alt="Some image">
                  <div class="product-name">
                    <p class="product-title">${product.product_name}</p>
                    <p class="product-quantity">Quantity: ${product.quantity}</p>
                    <p class="product-single-price">$${product.price} each</p>
                  </div>
                </div>
          <div class="right-block">
              <p class="product-price">$${product.quantity * product.price}</p>
              <button class="del-btn" data-id="${product.id_product}">&times;</button>
          </div>
          </div>`
  }
}

let bask = new basket();











// class Item{
//   constructor(el, img = 'https://placehold.it/200x150'){
//       this.product_name = el.product_name;
//       this.price = el.price;
//       this.id_product = el.id_product;
//       this.img = img;
//   }
//   render(){
//       return `<div class="product-item" data-id="${this.id_product}">
//               <img src="${this.img}" alt="Some img">
//               <div class="desc">
//                   <h3>${this.product_name}</h3>
//                   <p>${this.price} $</p>
//                   <button class="buy-btn"
//                   data-id="${this.id_product}"
//                   data-name="${this.product_name}"
//                   data-price="${this.price}">Купить</button>
//               </div>
//           </div>`
//   }
// }


// Для элемента корзины понадобится Наименование товара, его стоимость и количество 
// едениц товара
// class CartEl{
//   constructor(product,amount = 0) {
//     this.title = product.title;
//     this.price = product.price;
//   }
//   render(){

//   }
// }


// // Для корзины понадобятся методы:

// class Cart {
//   amountGood(){

//   };
//   addGood(){

//   };
//   removeGood(){

//   };
//   render(){

//   };
// }

// /**
//  * Функция вычисляет общую стоимость товаров
//  * @returns {any}
//  */
// GoodsList() {
//   let sum = 0;
//   this.goods.forEach(item => {
//     sum += item.price;
//   });
// };






// const products = [
//     {id: 1, title: 'Notebook', price: 2000, image: 'https://avatars.mds.yandex.net/get-mpic/4080064/img_id4171773565509789839.jpeg/orig'},
//     {id: 2, title: 'Mouse', price: 20, image: 'https://cdn.svyaznoy.ru/upload/iblock/759/08-29-2013_12-52_apple-magic-mouse%20zoom.jpg/resize/483x483/hq/'},
//     {id: 3, title: 'Keyboard', price: 200, image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/e94fa004a6095cd9c50dd9fdc681b1b2/a9642abc96b50cbae6a51df39174525808bfa963d54a6028aef314ca801f107c.jpg.webp'},
//     {id: 4, title: 'Gamepad', price: 50, image: 'https://avatars.mds.yandex.net/get-mpic/4055688/img_id8137017270087126256.jpeg/orig'},
// ];
// //Функция для формирования верстки каждого товара
// //Добавить в выводе изображение


// /** Функция добавляет разметку в html, полученнуюю на основании массива */
// const renderProduct = (el) => {
//     return `<div class="product-item">
//                 <div class="img">
//                   <img src="${el.image}" alt="" class="product-img">
//                 </div>
//                 <h3>${el.title}</h3>
//                 <p>${el.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };


// /**
//  * Функция преобразует массив через map и возвращает его в функцию, которая
//  * добавляет разметку html
//  * @param {any} item=>renderProduct(item
//  * @returns {any}
//  */
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item));
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList.join('');
// };

// renderPage(products);

// // простите, не удержался добавить к элементам массива персональные изображения))