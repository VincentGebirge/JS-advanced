const products = [
    {id: 1, title: 'Notebook', price: 2000, image: 'https://avatars.mds.yandex.net/get-mpic/4080064/img_id4171773565509789839.jpeg/orig'},
    {id: 2, title: 'Mouse', price: 20, image: 'https://cdn.svyaznoy.ru/upload/iblock/759/08-29-2013_12-52_apple-magic-mouse%20zoom.jpg/resize/483x483/hq/'},
    {id: 3, title: 'Keyboard', price: 200, image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/e94fa004a6095cd9c50dd9fdc681b1b2/a9642abc96b50cbae6a51df39174525808bfa963d54a6028aef314ca801f107c.jpg.webp'},
    {id: 4, title: 'Gamepad', price: 50, image: 'https://avatars.mds.yandex.net/get-mpic/4055688/img_id8137017270087126256.jpeg/orig'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение


/** Функция добавляет разметку в html, полученнуюю на основании массива */
const renderProduct = (el) => {
    return `<div class="product-item">
                <div class="img">
                  <img src="${el.image}" alt="" class="product-img">
                </div>
                <h3>${el.title}</h3>
                <p>${el.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};


/**
 * Функция преобразует массив через map и возвращает его в функцию, которая
 * добавляет разметку html
 * @param {any} item=>renderProduct(item
 * @returns {any}
 */
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);

// простите, не удержался добавить к элементам массива персональные изображения))