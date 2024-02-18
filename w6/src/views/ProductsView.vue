<template>
  <div>
    <VueLoading :active="isLoading" />
    <h2 class="pb-3 text-center">產品列表</h2>
    <table class="table align-middle">
      <thead>
        <tr>
          <td width="20%">圖片</td>
          <td width="30%">商品名稱</td>
          <td width="20%">價格</td>
          <td width="20%"></td>
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
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click.prevent="openModal(product)"
                :disabled="loadingStatus.loadingItem === product.id"
              >
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click.prevent="addCart(product.id)"
                :disabled="loadingStatus.loadingItem === product.id"
              >
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- modal -->
    <!-- emit 也要記得加 -->
    <ProductModal
      :temp-product="tempProduct"
      :loading-status="loadingStatus"
      ref="productModal"
      @add-cart="addCart"
    ></ProductModal>
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

// 導入 productModal 元件
import ProductModal from '@/components/ProductModal.vue';

export default {
  data() {
    return {
      products: [],
      // 設定 modal
      productModal: '',
      // 暫存單一商品資料
      tempProduct: {},
      carts: {},
      // loading 狀態
      isLoading: false,
      loadingStatus: {
        loadingItem: ''
      }
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      const api = `${VITE_URL}/api/${VITE_PATH}/products/all`;

      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 開啟 modal 並帶入商品資料
    openModal(product) {
      this.tempProduct = product;
      // this.productModal.show();
      this.$refs.productModal.openModal();
    },
    addCart(product_id, qty = 1) {
      this.isLoading = true;
      const order = { product_id, qty };
      const api = `${VITE_URL}/api/${VITE_PATH}/cart`;
      this.loadingStatus.loadingItem = product_id;

      axios
        .post(api, { data: order })
        .then((res) => {
          alert(res.data.message);
          this.$refs.productModal.hideModal();
          this.isLoading = false;
          this.loadingStatus.loadingItem = '';
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
      console.log(order);
    }
  },
  mounted() {
    this.getProducts();
    // this.productModal = new Modal(this.$refs.productModal, {
    //   Keyboard: false
    // });
  },
  components: {
    ProductModal
  }
};
</script>
