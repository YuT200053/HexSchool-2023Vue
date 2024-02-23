<template>
  <div class="container mx-auto py-3">
    <h1 class="text-center">後台</h1>
    <nav class="mx-auto text-center my-3">
      <RouterLink to="/admin/products">後台產品列表</RouterLink> │
      <RouterLink to="/admin/orders">後台訂單</RouterLink> │<RouterLink
        to=""
        @click.prevent="logout"
        >登出</RouterLink
      >
    </nav>
    <!-- 如果驗證成功再顯示畫面 -->
    <RouterView v-if="checkSuccess" />
  </div>
</template>

<script>
import axios from 'axios';
const { VITE_URL } = import.meta.env;

export default {
  data() {
    return {
      checkSuccess: false
    };
  },
  methods: {
    checkAdmin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)yu-t-200053\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      // 判斷是否已登入
      if (token) {
        // 如果已登入就驗證
        // 設定 header
        axios.defaults.headers.common.Authorization = `${token}`;

        const api = `${VITE_URL}/api/user/check`;
        axios
          .post(api)
          .then(() => {
            // 如果驗證成功再顯示畫面
            this.checkSuccess = true;
          })
          .catch((err) => {
            alert(err.response.data.message);
            // 如果驗證失敗，跳回登入頁
            this.$router.push('/');
          });
      } else {
        // 如果沒有 token 則沒有登入，跳回登入頁
        alert('您尚未登入');
        this.$router.push('/');
      }
    },
    logout() {
      // 清除 cookie，token 和到期日都設為空
      document.cookie = 'yu-t-200053=;expires=;';

      alert('token 已清除');
      this.$router.push('/');
    }
  },
  mounted() {
    this.checkAdmin();
  }
};
</script>
