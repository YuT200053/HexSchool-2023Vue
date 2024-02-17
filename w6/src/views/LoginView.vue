<template>
  <div class="container text-center d-flex align-items-center" style="height: 100vh">
    <div class="row w-100">
      <div class="col-12 col-md-5 col-lg-4 mx-auto">
        <h2 class="mb-3">請先登入</h2>
        <!-- submit 後驗證 -->
        <form @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              name="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              v-model="user.username"
            />
            <label for="email">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              name="password"
              class="form-control"
              id="password"
              placeholder="Password"
              v-model="user.password"
            />
            <label for="password">Password</label>
          </div>
          <button type="submit" class="btn btn-primary btn-lg w-100">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// 載入 axios
import axios from 'axios';

// 載入環境變數
const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      // 後台登入資料
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login() {
      const api = `${VITE_URL}/admin/signin`;
      axios
        .post(api, this.user)
        .then((res) => {
          // 取得 token 和到期日
          const { token, expired } = res.data;
          // 設定 cookie，在後台產品列表做驗證
          document.cookie = `yu-t-200053=${token};expires=${new Date(expired)};`;
          alert(res.data.message);

          // 用 router 的方法來切換頁面
          this.$router.push('/admin/products');
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }
};
</script>
