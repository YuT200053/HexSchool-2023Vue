<template>
  <div class="container fw-bold text-center pt-5">
    <h1>後台頁面</h1>
    <nav>
      <RouterLink to="/">回到前台</RouterLink> │
      <RouterLink to="/admin/products">後台產品列表</RouterLink> │
      <RouterLink to="/admin/order">後台訂單</RouterLink> │
      <RouterLink to="/admin">登出</RouterLink>
    </nav>
    <routerView></routerView>
  </div>
</template>

<script>
import axios from 'axios';
const { VITE_URL } = import.meta.env;

export default {
  methods: {
    // 後台登入驗證
    checkAdmin() {
      const api = `${VITE_URL}/api/user/check`;

      axios
        .post(api)
        .then(() => {
          console.log('驗證成功');
        })
        .catch((err) => {
          alert(err.response.data.message);

          // 驗證失敗的話跳回登入頁
          this.$router.push('/login');
        });
    }
  },
  mounted() {
    // 取出 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)yu-t-200053\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common.Authorization = token;

    // 先取出 token 再驗證
    this.checkAdmin();
  }
};
</script>
