// Добавляем товар в корзину из API
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';


//Класс карточки продукта, получаемый из API файла json
class List {
  constructor(url, container, list = list2) {
      this.container = container;
      this.goods = [];
      this.list = list;
      this.url = url;
      this.allProducts = [];
      this.filtered = [];
      this._init();
  }
  //Получаем массив объектов из файла json и делаем рендер
  getJson(url) {
    return fetch(url ? url : `${API + this.url}`)
          .then(result => result.json())
          .catch(error => {
              console.log(error);
          })
  }

  handleData(data){
    this.goods = [...data];
    this.render();
  } 
  calcSum() {
      return this.allProducts.reduce((accum, item) => accum += item.price, 0);
  }
  render() {
      const block = document.querySelector(this.container);
      for (let product of this.goods) {
          const productObj = new this.list[this.constructor.name](product);
          console.log(productObj);
          this.allProducts.push(productObj);
          block.insertAdjacentHTML('beforeend', productObj.render());
      }

  }

  filter(value){
    const regexp = new RegExp(value, 'i');
    this.filtered = this.allProducts.filter(product => regexp.test(product.product_name));
    this.allProducts.forEach(el => {
        const block = document.querySelector(`.product-item[data-id="${el.id_product}"]`);
        if(!this.filtered.includes(el)){
            block.classList.add('productHidden');
        } else {
            block.classList.remove('productHidden');
        }
    })
  }
  _init(){
    return false
}
}

// Добавляем полученные объекты в разметку страницы
class Item {
  constructor(el, img = 'https://img.freepik.com/premium-vector/online-shop-logo-designs-concept-vector-online-store-logo-designs_7649-661.jpg?w=826') {
      this.product_name = el.product_name;
      this.price = el.price;
      this.id_product = el.id_product;
      this.img = img;
  }
  render() {
      return `<div class="product-item" data-id="${this.id_product}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                 <h3>${this.product_name}</h3>
                 <p>${this.price} $</p>
                  <button class="buy-btn"
                 data-id="${this.id_product}"
                  data-name="${this.product_name}"
                  data-price="${this.price}">Купить</button>
                </div>
               </div>`
  }
}


class ProductsList extends List{
  //cart-basket
  constructor(basket, container = '.products', url = "/catalogData.json"){
      super(url, container);
      this.basket = basket;
      this.getJson()
          .then(data => this.handleData(data));
  }
  _init(){
      document.querySelector(this.container).addEventListener('click', e => {
          if(e.target.classList.contains('buy-btn')){
              this.basket.addProduct(e.target);
          }
      });
      document.querySelector('.search').addEventListener('submit', e => {
          e.preventDefault();
          this.filter(document.querySelector('.search-inpt').value)
      })
  }
}

class ProductItem extends Item{}



// Класс корзины, в котором перебираем массик из json и добавляем объекты в корзину
class Basket extends List{
  constructor(container = '.basket', url = "/getBasket.json") {
    super(url, container);
    this.getJson()
        .then(data => {
            this.handleData(data.contents);
        });
}
addProduct(element){
    this.getJson(`${API}/addToBasket.json`)
        .then(data => {
            if(data.result === 1){
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id_product === productId);
                if(find){
                    find.quantity++;
                    this._updateBasket(find);
                } else {
                    let product = {
                        id_product: productId,
                        price: +element.dataset['price'],
                        product_name: element.dataset['name'],
                        quantity: 1
                    };
                    this.goods = [product];
                    this.render();
                }
            } else {
                alert('Error');
            }
        })
}
removeProduct(element){
    this.getJson(`${API}/deleteFromBasket.json`)
        .then(data => {
            if(data.result === 1){
                let productId = +element.dataset['id'];
                let find = this.allProducts.find(product => product.id_product === productId);
                if(find.quantity > 1){
                    find.quantity--;
                    this._updateBasket(find);
                } else {
                    this.allProducts.splice(this.allProducts.indexOf(find), 1);
                    document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
                }
            } else {
                alert('Error');
            }
        })
}
_updateBasket(product){
   let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
   block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`;
   block.querySelector('.product-price').textContent = `$${product.quantity*product.price}`;
}
_init(){
    document.querySelector('.btn-cart').addEventListener('click', () => {
        document.querySelector(this.container).classList.toggle('basketHidden');
    });
    document.querySelector(this.container).addEventListener('click', e => {
       if(e.target.classList.contains('del-btn')){
           this.removeProduct(e.target);
       }
    })
}

}

class BasketItem  extends Item{
  constructor(el, img = 'https://placehold.it/50x100'){
        super(el, img);
        this.quantity = el.quantity;
    }

  render() {
      return `<div class="cart-item" data-id="${this.id_product}">
                <div class="product-cart">
                  <img src="${this.img}" alt="Some image">
                  <div class="product-name">
                    <p class="product-title">${this.product_name}</p>
                    <p class="product-quantity">Quantity: ${this.quantity}</p>
                    <p class="product-single-price">$${this.price} each</p>
                  </div>
                </div>
          <div class="right-block">
              <p class="product-price">$${this.quantity * this.price}</p>
              <button class="del-btn" data-id="${this.id_product}">&times;</button>
          </div>
          </div>`
  }
}


const list2 = {
  ProductsList: ProductItem,
  Basket: BasketItem
};

let basket = new Basket();
let products = new ProductsList(basket);
products.getJson(`getProducts.json`).then(data => products.handleData(data));












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