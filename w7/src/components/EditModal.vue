<!-- eslint-disable vue/no-mutating-props -->
<template>
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
                <label for="imageUrl" class="form-label">輸入主要圖片網址</label
                ><input
                  type="text"
                  id="imageUrl"
                  class="form-control"
                  placeholder="請輸入圖片連結"
                  v-model="tempProduct.imageUrl"
                />
              </div>
              <!-- 上傳圖片 -->
              <div class="mb-3">
                <VueLoading :active="isLoading" :is-full-page="fullPage" />
                <label for="uploadImg" class="form-label">或 上傳主要圖片</label>
                <!-- 當上傳檔案造成 change 時觸發函式 -->
                <input
                  type="file"
                  class="form-control"
                  id="uploadImg"
                  ref="uploadImg"
                  @change="uploadImg"
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
                    v-model.number="tempProduct.origin_price"
                    min="0"
                  />
                </div>
                <div class="col-6 mb-3">
                  <label for="price" class="form-label">售價</label
                  ><input
                    type="number"
                    id="price"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                    min="0"
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
</template>

<script>
// 要記得導入 Modal js
import axios from 'axios';
import { Modal } from 'bootstrap';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      editModal: '',
      isLoading: false,
      fullPage: false
    };
  },
  props: ['tempProduct', 'isNew'],
  methods: {
    openModal() {
      this.editModal.show();
    },
    hideModal() {
      this.editModal.hide();
    },
    editProduct() {
      this.$emit('editProduct');
    },
    // 上傳檔案
    uploadImg() {
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/upload`;
      // 上傳的檔案
      const file = this.$refs.uploadImg.files[0];
      // 建立 js 物件產生表單格式
      const formData = new FormData();
      // 使用 append 方法，把檔案欄位夾帶進去，前面是 'input 的 name'，後面是要上傳的檔案 也就是上面的 file
      formData.append('file-to-upload', file);

      this.isLoading = true;

      //上傳檔案
      axios
        .post(api, formData)
        .then((res) => {
          alert('圖片已上傳！');
          // 暫存資料的主要圖片變成目前上傳的照片
          // eslint-disable-next-line vue/no-mutating-props
          this.tempProduct.imageUrl = res.data.imageUrl;
          // 清空資料
          this.$refs.uploadImg.value = '';

          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.isLoading = false;
        });
    }
  },
  mounted() {
    // 初始化 modal
    this.editModal = new Modal(this.$refs.editModal, {
      keyboard: false,
      backdrop: 'static'
    });
  }
};
</script>
