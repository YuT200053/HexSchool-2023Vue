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
              <button type="button" class="btn btn-outline-danger">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 頁碼 -->
    <PaginationComponent :pagination="pagination" @get-products="getProducts"></PaginationComponent>
    <!-- 編輯產品 modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="editModal"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white">
              <span v-if="isNew">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-4">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">主要圖片</label
                  ><input
                    type="text"
                    id="imageUrl"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
                <img class="w-100 mb-3" :src="tempProduct.imageUrl" :alt="tempProduct.title" />
                <!-- 更多圖片，先把所有圖片連結渲染出來 -->
                <div v-for="(img, key) in tempProduct.imagesUrl" :key="'img' + key">
                  <label for="imagesUrl" class="form-label">圖片網址</label>
                  <!-- 渲染出第 key 個圖片連結 -->
                  <input
                    type="text"
                    id="imagesUrl"
                    class="form-control mb-3"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imagesUrl[key]"
                  />
                  <img v-if="img" class="w-100 mb-3" :src="img" :alt="'img' + key" />
                </div>
                <!-- 判斷出現哪個按鈕 -->
                <!-- 新增：如果 imagesUrl 是空的，有最後一個值，則可以點擊 push 一個空值到 tempProduct.imagesUrl 中，換句話說救世會出現空的 input -->
                <button
                  type="button"
                  class="btn btn-outline-primary w-100 mb-3"
                  v-if="
                    !tempProduct.imagesUrl.length ||
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                  @click.prevent="tempProduct.imagesUrl.push('')"
                >
                  新增圖片
                </button>
                <!-- 刪除：點擊時則刪掉最後一個 imagesUrl -->
                <button
                  type="button"
                  class="btn btn-outline-danger w-100 mb-3"
                  v-else
                  @click.prevent="tempProduct.imagesUrl.pop()"
                >
                  刪除圖片
                </button>
              </div>
              <div class="col-8">
                <div class="row">
                  <div class="col-12 mb-3">
                    <label for="title" class="form-label">標題</label
                    ><input
                      type="text"
                      id="title"
                      class="form-control"
                      placeholder="請輸入標題"
                      v-model="tempProduct.title"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="category" class="form-label">分類</label
                    ><input
                      type="text"
                      id="category"
                      class="form-control"
                      placeholder="請輸入分類"
                      v-model="tempProduct.category"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="unit" class="form-label">單位</label
                    ><input
                      type="text"
                      id="unit"
                      class="form-control"
                      placeholder="請輸入單位"
                      v-model="tempProduct.unit"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="origin_price" class="form-label">原價</label
                    ><input
                      type="number"
                      id="origin_price"
                      class="form-control"
                      placeholder="請輸入原價"
                      v-model="tempProduct.origin_price"
                    />
                  </div>
                  <div class="col-6 mb-3">
                    <label for="price" class="form-label">售價</label
                    ><input
                      type="number"
                      id="price"
                      class="form-control"
                      placeholder="請輸入售價"
                      v-model="tempProduct.price"
                    />
                  </div>
                </div>
                <hr />
                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label
                  ><textarea
                    name="description"
                    id="description"
                    class="form-control"
                    cols="30"
                    placeholder="請輸入產品描述"
                    v-model="tempProduct.description"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label
                  ><textarea
                    name="content"
                    id="content"
                    class="form-control"
                    cols="30"
                    placeholder="請輸入說明內容"
                    v-model="tempProduct.content"
                  ></textarea>
                </div>
                <div class="mb-3">
                  <input
                    type="checkbox"
                    id="is_enabled"
                    class="form-check-input me-1"
                    v-model="tempProduct.is_enabled"
                  />
                  <label for="is_enabled" class="form-check-label">是否啟用</label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click.prevent="editProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/PaginationComponent.vue';
// 要記得導入 Modal js
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
      editModal: ''
    };
  },
  components: {
    PaginationComponent
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
        this.editModal.show();
      } else if (isNew === 'edit') {
        this.isNew === false;
        // 展開 item 賦予給 tempProduct
        this.tempProduct = { ...item };
        // tempProduct.imagesUrl 要補上空陣列，否則沒有東西會出錯
        this.tempProduct.imagesUrl = this.tempProduct.imagesUrl || [];
        this.editModal.show();
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
          this.editModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  },
  mounted() {
    this.getProducts();

    // 初始化 modal
    this.editModal = new Modal(this.$refs.editModal, {
      keyboard: false,
      backdrop: 'static'
    });
  }
};
</script>
