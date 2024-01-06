import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.11/vue.esm-browser.min.js";

createApp({
  data() {
    return {
      // 產品資料存放空間
      products: [],
      tempProduct: {},
      // 登入驗證資料
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yu-t-200053",
    };
  },
  methods: {
    checkAdmin() {
      const url = `${this.apiUrl}/api/user/check`;

      axios
        .post(url)
        .then(() => {
          // 如果正確則去取產品資料
          this.getData();
        })
        .catch((err) => {
          // 錯誤出現警告且跳回登入頁
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    getData() {
      const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;

      axios
        .get(url)
        .then((res) => {
          // products 賦予 api 中 products 的資料
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    // 取出 Token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)yu-t-200053\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common.Authorization = token;
    // 確認是否為管理員
    this.checkAdmin();
  },
}).mount("#app");
