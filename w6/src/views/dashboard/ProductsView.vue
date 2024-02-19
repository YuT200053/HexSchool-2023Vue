<template>
  <div class="container">
    <VueLoading :active="isLoading" />
    <h2>後台產品列表</h2>
    <table class="table">
      <thead>
        <tr>
          <td>分類</td>
          <td>產品名稱</td>
          <td>原價</td>
          <td>售價</td>
          <td>是否啟用</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">$ {{ product.origin_price }}</td>
          <td class="text-end">$ {{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-primary">啟用</span>
            <span v-else>未啟用</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <PaginationComponent :pagination="pagination" @get-product="getProduct"></PaginationComponent>
  </div>
</template>

<script>
import axios from 'axios';
// 要記得導入元件
import PaginationComponent from '@/components/PaginationComponent.vue';
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      pagination: {},
      isLoading: false
    };
  },
  methods: {
    getProduct(page = 1) {
      // 閱讀 api 文件，在網址變數中加入頁碼參數
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;

      this.isLoading = true;

      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  },
  mounted() {
    this.getProduct();
  },
  components: {
    PaginationComponent
  }
};
</script>
