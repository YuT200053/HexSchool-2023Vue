<template>
  <div class="container py-3 text-center d-flex align-items-center" style="height: 100vh">
    <VueLoading :active="isLoading" />
    <div class="row w-100">
      <div class="col-12 col-md-5 col-lg-4 mx-auto">
        <p class="h2 mb-4">請先登入</p>
        <form @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="name@example.com"
              v-model="user.username"
            />
            <label for="email">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="Password"
              placeholder="Password"
              v-model="user.password"
            />
            <label for="Password">Password</label>
          </div>
          <button type="submit" class="btn btn-primary w-100 my-4">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      // loading overlay 要記得設定 isloading
      isLoading: false
    };
  },
  methods: {
    login() {
      const api = `${VITE_URL}/admin/signin`;

      // 點擊登入時 loading
      this.isLoading = true;

      axios
        .post(api, this.user)
        .then((res) => {
          // 從 res 回傳資料中取得 token 和到期日
          const { token, expired } = res.data;
          // 設定 cookies，將 token 和到期日存入 document.cookie
          document.cookie = `yu-t-200053=${token};expires=${new Date(expired)};`;

          alert(res.data.message);

          // 登入成功候用 router 中的方法切換頁面
          this.$router.push('/admin/products');

          // 登入成功後停止 loading
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.isLoading = false;
        });
    }
  }
};
</script>
