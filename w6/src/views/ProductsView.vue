<template>
  <div>
    <h2 class="pb-3 text-center">產品列表</h2>
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
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click.prevent="openModal(product)"
              >
                查看更多
              </button>
              <button type="button" class="btn btn-outline-danger">加到購物車</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="productModal"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white" id="exampleModalLabel">{{ tempProduct.title }}</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row row-cols-2">
              <div class="col">
                <img :src="tempProduct.imageUrl" :alt="tempProduct.title" class="w-100" />
              </div>
              <div class="col">
                <span class="badge rounded-pill bg-primary">{{ tempProduct.category }}</span>
                <p>商品描述：{{ tempProduct.description }}</p>
                <p>商品說明：{{ tempProduct.content }}</p>
                <p>
                  <span v-if="tempProduct.price === tempProduct.origin_price" class="h5"
                    >{{ tempProduct.price }} 元</span
                  >
                  <span v-else>
                    <del>原價 {{ tempProduct.origin_price }} 元</del><br />
                    <span class="h5">現在只要 {{ tempProduct.price }} 元</span>
                  </span>
                </p>
                <div class="input-group my-3">
                  <select class="form-select" id="inputGroupSelect01">
                    <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                  </select>
                  <button class="btn btn-primary fw-bold" type="button" id="button-addon2">
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
// 導入 bs modal
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      products: [],
      // 設定 modal
      productModal: '',
      // 暫存單一商品資料
      tempProduct: {}
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
    },
    openModal(product) {
      this.tempProduct = product;
      this.productModal.show();
      console.log(this.tempProduct);
    }
  },
  mounted() {
    this.getProducts();
    this.productModal = new Modal(this.$refs.productModal, {
      Keyboard: false
    });
  }
};
</script>
