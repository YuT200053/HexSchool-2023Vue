import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.11/vue.esm-browser.min.js";

let productModal = null;
let deleteModal = null;

const app = createApp({
  data() {
    return {
      // 登入驗證的資料
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yu-t-200053",
      // 產品資料存放空間
      products: [],
      pagination: {},
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
    // 取得產品資料 / 分頁功能
    // 帶入 page 參數，預設為 1
    getData(page = 1) {
      // const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
      // ? 是網址參數寫法，帶入 page 參數顯示該頁產品資料
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;

      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          console.log(this.products, this.pagination);
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
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
  },
});

// deleteModal 元件
app.component("delProductModal", {
  template: "#delProductModal",
  props: ["tempProduct"],
  data() {
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yu-t-200053",
    };
  },
  methods: {
    // 刪除產品
    deleteProduct() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then((res) => {
          alert(res.data.message);
          deleteModal.hide();
          // 要用 emit 觸發
          this.$emit("getData");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"), {
      keyboard: false,
    });
  },
});

// create / edit modal 元件
app.component("productModal", {
  template: "#productModal",
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
      // 預設微新增產品
      let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
      let http = "post";

      // 判斷是否為編輯產品
      if (!this.isNew) {
        url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
        http = "put";
      }

      axios[http](url, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          productModal.hide();
          this.$emit("getData");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById("createModal"), {
      keyboard: false,
    });
  },
});

// pagination 元件
app.component("pagination", {
  template: "#pagination",
  props: ["pages"],
  methods: {
    changePage(page) {
      this.$emit("change-page", page);
    },
  },
});

app.mount("#app");
