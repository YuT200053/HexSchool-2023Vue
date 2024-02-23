<template>
  <div class="container mx-auto">
    <h2 class="text-center">後台產品列表</h2>
    <div class="text-end my-3">
      <button type="button" class="btn btn-primary" @click.prevent="openModal('add')">
        建立新產品
      </button>
    </div>
    <!-- 產品列表 -->
    <table class="table align-middle">
      <thead>
        <tr>
          <td>分類</td>
          <td width="25%">產品名稱</td>
          <td>原價</td>
          <td>售價</td>
          <td>是否啟用</td>
          <td>編輯</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="edit">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click.prevent="openModal('edit', product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click.prevent="openModal('delete', product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 頁碼 -->
    <PaginationComponent :pagination="pagination" @get-products="getProducts"></PaginationComponent>
    <!-- 編輯產品 modal -->
    <EditModal
      ref="editModal"
      :temp-product="tempProduct"
      :is-new="isNew"
      @edit-product="editProduct"
    ></EditModal>
    <!-- 刪除產品 modal -->
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
            <button type="button" class="btn btn-danger">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/PaginationComponent.vue';
import EditModal from '@/components/EditModal.vue';
import { Modal } from 'bootstrap';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      pagination: {},
      // 用來判斷是不是要新增產品
      isNew: false,
      // 暫存資料
      tempProduct: {
        imagesUrl: []
      },
      deleteModal: ''
    };
  },
  components: {
    PaginationComponent,
    EditModal
  },
  methods: {
    // 預設頁面為 1
    getProducts(page = 1) {
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;

      axios
        .get(api)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 判斷開啟哪個 modal
    openModal(isNew, item) {
      if (isNew === 'add') {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: []
        };
        // 初始化完成後，可用名稱直接叫
        this.$refs.editModal.openModal();

        console.log(this.isNew);
      } else if (isNew === 'edit') {
        this.isNew === false;
        // 展開 item 賦予給 tempProduct
        this.tempProduct = { ...item };
        // tempProduct.imagesUrl 要補上空陣列，否則沒有東西會出錯
        this.tempProduct.imagesUrl = this.tempProduct.imagesUrl || [];
        this.$refs.editModal.openModal();

        console.log(this.isNew);
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        this.tempProduct.imagesUrl = this.tempProduct.imagesUrl || [];
        this.deleteModal.show();
      }
    },
    // 判斷是編輯產品還是新增
    editProduct() {
      // 預設為新增產品
      let api = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
      let http = 'post';

      // 用 isNew 判斷是不是編輯
      if (!this.isNew) {
        api = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
        http = 'put';
      }

      axios[http](api, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.$refs.editModal.hideModal();
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  },
  mounted() {
    this.getProducts();
    this.deleteModal = new Modal(this.$refs.deleteModal, {
      keyboard: false,
      backdrop: 'static'
    });
  }
};
</script>
