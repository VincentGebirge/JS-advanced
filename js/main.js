const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        userSearch: '',
        showCart: false,
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        cartItems: [],
        filtered: [],
        imgCart: 'https://img.freepik.com/premium-vector/online-shop-logo-designs-concept-vector-online-store-logo-designs_7649-661.jpg?w=826',
        products: [],
        imgProduct: 'https://img.freepik.com/premium-vector/online-shop-logo-designs-concept-vector-online-store-logo-designs_7649-661.jpg?w=826'
    },
    methods: {
      getJson(url){
        return fetch(url)
            .then(result => result.json())
            .catch(error => {
              console.log(error);
              this.error = true;
            })   
    },
        addProduct(item){
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                       let find = this.cartItems.find(el => el.id_product === item.id_product);
                       if(find){
                           find.quantity++;
                       } else {
                           const prod = Object.assign({quantity: 1}, item);
                           this.cartItems.push(prod)
                       }
                    }
                })
        },
        remove(item){
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if  (data.result === 1){
                        if(item.quantity>1){
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                        }
                    }
                })
        },
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered =  this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let item of data.contents){
                    this.cartItems.push(item);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let item of data){
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let item of data){
                    this.products.push(item);
                    this.filtered.push(item);
                }
            })
    }

});










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