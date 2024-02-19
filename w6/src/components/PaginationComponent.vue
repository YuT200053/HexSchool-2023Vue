<template>
  <div>
    <nav aria-label="Page navigation">
      <!-- 用 justify-content-center 來置中 -->
      <ul class="pagination mb-0 justify-content-center">
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
export default {
  props: ['pagination'],
  methods: {
    getProduct(page) {
      this.$emit('getProduct', page);
    }
  }
};
</script>
