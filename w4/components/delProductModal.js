// deleteModal 元件
export default {
  props: ["tempProduct"],
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yu-t-200053",
    };
  },
  methods: {
    // 刪除產品
    deleteProduct() {
      this.$emit("delProduct");
    },
  },
  template: `<div
  class="modal fade"
  id="deleteModal"
  tabindex="-1"
  aria-labelledby="deleteModal"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title">刪除產品</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        是否刪除
        <strong class="text-danger"> {{ tempProduct.title }} </strong>
        商品(刪除後將無法恢復)。
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-dismiss="modal"
        >
          取消
        </button>
        <button
          type="button"
          class="btn btn-danger"
          @click.prevent="deleteProduct"
        >
          確認刪除
        </button>
      </div>
    </div>
  </div>
</div>`,
};
