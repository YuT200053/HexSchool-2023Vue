import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.11/vue.esm-browser.min.js";

let productModal = null;
let deleteModal = null;

createApp({
  data() {
    return {
      // 登入驗證的資料
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yu-t-200053",
      // 產品資料存放空間
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
    };
  },
  methods: {
    // 確認是否是管理員
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;

      axios
        .post(url)
        .then(() => {
          // 若成功則取產品資料
          this.getData();
        })
        .catch((err) => {
          // 若錯誤則出現警告，並跳回 login.html
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    // 取得產品資料
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;

      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 呼叫 modal，因為需要重整暫存資料，所以統一在點擊按鈕時進行判斷並重置 tempProduct
    openModal(isNew, item) {
      if (isNew === "new") {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
        };
        productModal.show();
      } else if (isNew === "edit") {
        this.isNew = false;
        this.tempProduct = { ...item };
        this.tempProduct.imagesUrl = this.tempProduct.imagesUrl || [];
        productModal.show();
      } else if (isNew === "delete") {
        this.tempProduct = { ...item };
        this.tempProduct.imagesUrl = this.tempProduct.imagesUrl || [];
        deleteModal.show();
      }
    },
    // 新增產品 或 編輯產品

    // 刪除產品
    deleteProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          deleteModal.hide();
          // 重新渲染產品列表
          this.getData();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    // 一跳到產品頁就要執行登入驗證
    // 取出存在 cookie 中的 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)yu-t-200053\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 驗證成功後不用每次都重複驗證
    axios.defaults.headers.common.Authorization = token;
    // 確認是否是管理員
    this.checkAdmin();
    // 感覺應該是要偵測 modal? 不確定 keyboard 是做什麼的?
    productModal = new bootstrap.Modal(document.getElementById("addProduct"), {
      keyboard: false,
    });
    deleteModal = new bootstrap.Modal(
      document.getElementById("deleteProduct"),
      {
        keyboard: false,
      }
    );
  },
}).mount("#app");
