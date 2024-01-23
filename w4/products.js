import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.11/vue.esm-browser.min.js";

createApp({
  data() {
    return {
      // 登入驗證的資料
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yu-t-200053",
      // 產品資料存放空間
      products: [],
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
}).mount("#app");
