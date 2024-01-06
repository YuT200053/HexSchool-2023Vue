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
      const api = "https://vue3-course-api.hexschool.io/v2/admin/signin";

      console.log(this.user);

      axios
        .post(api, this.user)
        .then((res) => {
          // 取得 data 中的 token 和到期日
          const { token, expired } = res.data;
          console.log(token, expired);
          // 設定 Cookie
          document.cookie = `yu-t-200053=${token};expires=${new Date(
            expired
          )};`;
          // 登入成功就跳到產品頁
          window.location = "products.html";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
}).mount("#app");
