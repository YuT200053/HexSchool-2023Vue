export default {
  data() {
    return {
      productModal: '',
    };
  },
  props: ['tempProduct'],
  eimts: ['addCart'],
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal, {
      keyboard: false,
      backdrop: 'static',
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
  template: `<!-- 要記得加 ref -->
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
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
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
            <select name="qty" id="qty" class="form-select">
              <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
          </select> 
              <button type="button" class="btn btn-primary" @click.prevent="$emit('add-cart', tempProduct.id)">
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`,
};
