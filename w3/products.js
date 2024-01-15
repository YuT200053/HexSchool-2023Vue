import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.11/vue.esm-browser.min.js";

createApp({
  data() {
    return {
      // 登入驗證的資料
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "yu-t-200053",
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
      console.log("取得資料中");
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
  },
}).mount("#app");
