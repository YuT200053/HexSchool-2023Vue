<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="deleteModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white">刪除產品</h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger"> {{ tempProduct.title }} </strong>
          商品 (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-danger" @click.prevent="deleteProduct">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      deleteModal: ''
    };
  },
  props: ['tempProduct'],
  methods: {
    openModal() {
      this.deleteModal.show();
    },
    hideModal() {
      this.deleteModal.hide();
    },
    deleteProduct() {
      this.$emit('deleteProduct');
    }
  },
  mounted() {
    this.deleteModal = new Modal(this.$refs.deleteModal, {
      keyboard: false,
      backdrop: 'static'
    });
  }
};
</script>
