import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // 測試 console.log(this.user);
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      // user 要記得加 this
      axios
        .post(api, this.user)
        .then((res) => {
          // 測試 console.log(res.data);
          // 從 res.data 取出 token & expired
          const { token, expired } = res.data;
          // 將 token & expired 存入 cookie 中
          document.cookie = `yu-t-200053=${token}; expires=${new Date(
            expired
          )}`;
          // 登入成功就跳到 products.html
          window.location = "products.html";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
}).mount("#app");
