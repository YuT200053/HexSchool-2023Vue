<template>
  <div>
    <h2 class="pb-3">產品列表</h2>
    <table class="table align-middle">
      <thead>
        <tr>
          <td width="20%">圖片</td>
          <td width="20%">商品名稱</td>
          <td>價格</td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>
            <div class="product-img" :style="{ backgroundImage: `url(${product.imageUrl})` }"></div>
          </td>
          <td>{{ product.title }}</td>
          <td>
            <h5 v-if="product.price === product.origin_price">{{ product.price }} 元</h5>
            <div v-else>
              <del>原價 {{ product.origin_price }} 元</del>
              <h5>現在只要 {{ product.price }} 元</h5>
            </div>
          </td>
          <td>
            <div class="btn-group" role="group" aria-label="button action">
              <button type="button" class="btn btn-outline-secondary">查看更多</button>
              <button type="button" class="btn btn-outline-danger">加到購物車</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.product-img {
  height: 100px;
  background-size: cover;
  background-position: center;
}
</style>

<script>
import axios from 'axios';
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: []
    };
  },
  methods: {
    getProducts() {
      const api = `${VITE_URL}/api/${VITE_PATH}/products/all`;

      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          console.log(this.products);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  },
  mounted() {
    this.getProducts();
  }
};
</script>
