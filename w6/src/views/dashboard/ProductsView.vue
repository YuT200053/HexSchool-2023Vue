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
    <nav aria-label="Page navigation mx-auto">
      <ul class="pagination">
        <!-- 當 current_page 在第一頁時，不能前往上一頁 -->
        <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
          <!-- 點擊此連結，current_page 數字減一渲染上一頁產品列表 -->
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getProduct(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 當 item 等於目前頁面，則顯示 active class -->
        <li
          v-for="(item, index) in pagination.total_pages"
          :key="index"
          class="page-item"
          :class="{ active: item === pagination.current_page }"
        >
          <!-- 點擊此連結，渲染該頁產品列表 -->
          <a class="page-link" href="#" @click.prevent="getProduct(item)">{{ item }}</a>
        </li>
        <!-- 當 current_page 等於總頁數，則不能前往下一頁 -->
        <li
          class="page-item"
          :class="{ disabled: pagination.current_page === pagination.total_pages }"
        >
          <!-- 點擊此連結，current_page 數字加一渲染下一頁產品列表 -->
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getProduct(current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import axios from 'axios';
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
  }
};
</script>
