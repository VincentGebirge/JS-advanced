Vue.component('basket', {
  props: ['cartItems', 'img', 'visibility'],
  template:
      `
          <div class="basket-block" v-show="visibility">
            <p v-if="!cartItems.length">Корзина пуста</p>
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item"></cart-item>
          </div>
      `
});

Vue.component('cart-item', {
  props: ['img', 'cartItems'],
  template:
  `
    <div class="cart-item">
      <div class="product-bio">
              <img :src="img" alt="Some img">
              <div class="product-desc">
                 <div class="product-title">{{ cartItem.product_name }}</div>
                 <div class="product-quantity">Quantity: {{ cartItem.quantity }}</div>
                 <div class="product-single-price">$ {{ cartItem.price }} each</div>
                  
                <div class="right-block">
                  <div class="product-price">{{cartItem.quantity*cartItem.price}}</div>
                  <button class="del-btn" @click="$root.remove(item)">&times;</button>
                </div>
              </div>
            </div>
    </div>
    `
})