// create / edit modal 元件
export default {
  props: ["tempProduct", "isNew"],
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yu-t-200053",
    };
  },
  methods: {
    // 新增 / 編輯產品
    updateProduct() {
      this.$emit("updateProduct");
    },
  },
  template: `<div
  class="modal fade"
  id="createModal"
  tabindex="-1"
  aria-labelledby="createModal"
  aria-hidden="true"
  data-bs-backdrop="static"
>
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title">
          <span v-if="isNew">新增產品</span>
          <span v-else>編輯產品</span>
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body row">
        <!-- images -->
        <div class="col-md-4">
          <label for="imgUrl" class="form-label">主要圖片</label>
          <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            class="form-control mb-4"
            placeholder="請輸入圖片連結"
            v-model="tempProduct.imageUrl"
          />
          <img
            :src="tempProduct.imageUrl"
            v-if="tempProduct.imageUrl"
            class="img-fluid mb-3"
          />
          <!-- more images -->
          <!-- 如果 imagesUrl 有長度就出現 -->
          <div
            v-for="(img, key) in tempProduct.imagesUrl"
            :key="'img' + key"
            v-if="tempProduct.imagesUrl.length"
          >
            <label for="imgUrl" class="form-label">圖片網址</label>
            <input
              type="text"
              name="imgUrl"
              class="form-control mb-4"
              placeholder="請輸入圖片連結"
              v-model="tempProduct.imagesUrl[key]"
            />
            <img :src="img" v-if="img" class="img-fluid mb-3" />
          </div>
          <!-- image button -->
          <!-- 如果 imagesUrl 是空的，或是有值，就出現新增圖片 -->
          <!-- 點擊新增圖片，先新增一個空字串到 imagesUrl 中 -->
          <button
            type="button"
            class="btn btn-outline-primary w-100"
            v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]"
            @click.prevent="tempProduct.imagesUrl.push('')"
          >
            新增圖片
          </button>
          <!-- 點擊刪除圖片，就刪除最後一個圖片網址 -->
          <button
            type="button"
            class="btn btn-outline-danger w-100"
            v-else
            @click.prevent="tempProduct.imagesUrl.pop()"
          >
            刪除圖片
          </button>
        </div>
        <!-- information -->
        <div class="col-md-8">
          <label for="title" class="form-label">標題</label
          ><input
            type="text"
            class="form-control mb-3"
            id="title"
            placeholder="請輸入標題"
            v-model="tempProduct.title"
          />
          <div class="row mb-3">
            <div class="col-6">
              <label for="category" class="form-label">分類</label
              ><input
                type="text"
                class="form-control"
                id="category"
                placeholder="請輸入分類"
                v-model="tempProduct.category"
              />
            </div>
            <div class="col-6">
              <label for="unit" class="form-label">單位</label
              ><input
                type="text"
                class="form-control"
                id="unit"
                placeholder="請輸入單位"
                v-model="tempProduct.unit"
              />
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-6">
              <label for="origin_price" class="form-label">原價</label
              ><input
                type="number"
                class="form-control"
                id="origin_price"
                placeholder="請輸入原價"
                v-model="tempProduct.origin_price"
              />
            </div>
            <div class="col-6">
              <label for="price" class="form-label">售價</label
              ><input
                type="number"
                class="form-control"
                id="price"
                placeholder="請輸入售價"
                v-model="tempProduct.price"
              />
            </div>
          </div>
          <hr />
          <label for="description" class="form-label">產品描述</label>
          <textarea
            name="description"
            id="description"
            class="form-control mb-3"
            placeholder="請輸入產品描述"
            v-model="tempProduct.description"
          ></textarea>
          <label for="content" class="form-label">說明內容</label>
          <textarea
            name="content"
            id="content"
            class="form-control mb-3"
            placeholder="請輸入說明內容"
            v-model="tempProduct.content"
          ></textarea>
          <input
            type="checkbox"
            name="is_enabled"
            id="is_enabled"
            class="form-check-input me-1"
            v-model="tempProduct.is_enabled"
          /><label for="is_enabled" class="form-label">是否啟用</label>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-dismiss="modal"
        >
          取消
        </button>
        <!-- 因為新增和編輯是同一個 modal，因此要判斷是要 post 還是 put -->
        <button
          type="button"
          class="btn btn-primary"
          @click.prevent="updateProduct"
        >
          確認
        </button>
      </div>
    </div>
  </div>
</div>`,
};
