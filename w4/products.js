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
    // admin 驗證
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;

      axios
        .post(url)
        .then(() => {
          console.log("123");
          // 若成功則取產品資料
          this.getData();
        })
        .catch((err) => {
          // 錯誤則出現警告並跳回登入頁
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
          console.log(this.products);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 判斷開啟哪個 modal
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
  },
  mounted() {
    // 取出存在 cookie 中的 token 資料
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)yu-t-200053\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // 驗證成功後不用每次都重複驗證
    axios.defaults.headers.common.Authorization = token;
    // 確認是否是管理員
    this.checkAdmin();

    productModal = new bootstrap.Modal(document.getElementById("createModal"), {
      keyboard: false,
    });
    deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"), {
      keyboard: false,
    });
  },
}).mount("#app");
