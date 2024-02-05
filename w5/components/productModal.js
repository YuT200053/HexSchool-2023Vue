export default {
  data() {
    return {
      productModal: '',
      qty: 1,
    };
  },
  props: ['tempProduct', 'addCartLoading'],
  eimts: ['addCart'],
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
    });
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    },
  },
  // 用來監聽當外面的值產生變化
  watch: {
    // 當選擇不同商品(tempProduct 值變動時)，qty 變為 1。
    tempProduct() {
      this.qty = 1;
    },
  },
  template: `
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    aria-labelledby="productModal"
    aria-hidden="true"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    ref="modal"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">{{ tempProduct.title }}</h5>
          <button
          type="button" class="btn-close btn-close-white" aria-label="Close"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body row">
          <div class="col-6">
              <img :src="tempProduct.imageUrl" width="100%">
          </div>
          <div class="col-6">
            <div class="badge rounded-pill bg-primary">{{ tempProduct.category }}</div>
            <p>商品描述：{{ tempProduct.description }}</p>
            <p>
              商品內容：{{ tempProduct.content }}
            </p>
            <div v-if="tempProduct.origin_price === tempProduct.price">{{ tempProduct.price }} 元</div>
            <div v-else>
              <del class="h6">原價 {{ tempProduct.origin_price }} 元</del>
              <div class="h5">現在只要 {{ tempProduct.price }} 元</div>
            </div>
            <div class="input-group mt-3">
            <select class="form-select" v-model="qty">
              <option v-for="i in 20" :value="i" :key="i">{{ i }}</option>
            </select>
              <button type="button" class="btn btn-primary" @click.prevent="$emit('add-cart', tempProduct.id, qty)">
              <i class="fas fa-spinner fa-pulse" v-if="addCartLoading === tempProduct.id"></i>
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
};
