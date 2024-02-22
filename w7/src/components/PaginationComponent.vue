<template>
  <div>
    <nav aria-label="Page navigation">
      <!-- 用 justify-content-center 來置中 -->
      <ul class="pagination justify-content-center">
        <!-- 判斷 class 要不要增加 disabled -->
        <li class="page-item" :class="{ disabled: pagination.current_page === 1 }">
          <!-- 點擊連結時再渲染產品列表，所以 v-on 加在連結上 -->
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            @click.prevent="getProducts(pagination.current_page - 1)"
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <!-- 目前頁面增加 active 的 class 標籤 -->
        <li
          class="page-item"
          v-for="(item, index) in pagination.total_pages"
          :key="index"
          :class="{ active: item === pagination.current_page }"
        >
          <a class="page-link" href="#" @click.prevent="getProducts(item)">{{ item }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: pagination.current_page === pagination.total_pages }"
        >
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            @click.prevent="getProducts(pagination.current_page + 1)"
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pagination'],
  methods: {
    getProducts(page) {
      this.$emit('getProducts', page);
    }
  }
};
</script>
