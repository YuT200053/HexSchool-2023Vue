<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
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
                <select class="form-select" id="inputGroupSelect01" v-model="qty">
                  <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
                </select>
                <button
                  class="btn btn-primary fw-bold"
                  type="button"
                  id="button-addon2"
                  @click="$emit('add-cart', tempProduct.id, qty)"
                >
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 從 node 導入 bootstrap 的 Modal js
import { Modal } from 'bootstrap';
// import Modal from 'bootstrap/js/dist/modal';

export default {
  props: ['tempProduct'],
  eimts: ['add-cart'],
  data() {
    return {
      modal: '',
      qty: 1
    };
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    hideModal() {
      this.modal.hide();
    }
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal, {
      Keyboard: false,
      backdrop: 'static'
    });
  },
  // 監聽當外面的直產生變化 qty 變為 1
  watch: {
    tempProduct() {
      this.qty = 1;
    }
  }
};
</script>
