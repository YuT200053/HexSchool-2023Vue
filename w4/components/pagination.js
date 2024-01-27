// pagination 元件
// methods 名稱記得也要改
export default {
  props: ["pages"],
  methods: {
    changePage(page) {
      this.$emit("change-page", page);
    },
  },
  template: `<nav aria-label="Page navigation example">
  <ul class="pagination">
    <!-- 當目前在第一頁則不能使用 -->
    <li
      class="page-item"
      :class="{'disabled': pages.current_page === 1}"
    >
    <!-- 當點擊時觸發元件 changePage methods，使用 emit 由內向外傳頁數並取得該頁資料 -->
      <a
        class="page-link"
        href="#"
        aria-label="Previous"
        @click.prevent="changePage(pages.current_page - 1)"
      >
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <!-- v-for 渲染總頁數 -->
    <!-- 目前頁數加上 active class -->
    <li
      class="page-item"
      aria-current="page"
      v-for="(page, index) in pages.total_pages"
      :key="'page' + key"
      :class="{'active': page === pages.current_page}"
    >
      <a class="page-link" href="#" @click.prevent="changePage(page)"
        >{{ page }}</a
      >
    </li>
    <!-- 當目前頁數等於總頁數則不能使用 -->
    <li
      class="page-item"
      :class="{'disabled': pages.current_page === pages.total_pages}"
    >
      <a
        class="page-link"
        href="#"
        aria-label="Next"
        @click.prevent="changePage(pages.current_page + 1)"
      >
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`,
};
