<template>
  <div class="container mx-auto">
    <VueLoading :active="isLoading" />
    <h2 class="text-center">後台訂單</h2>
    <!-- 訂單列表 -->
    <table class="table align-middle">
      <thead>
        <tr>
          <td>購買時間</td>
          <td width="25%">Email</td>
          <td width="25%">購買款項</td>
          <td>應付金額</td>
          <td>是否付款</td>
          <td>編輯</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <!-- 將 create_at 轉換為時間，要記得乘 1000，並轉換為當地時間格式 -->
          <td>{{ new Date(order.create_at * 1000).toLocaleDateString() }}</td>
          <td>{{ order.user.email }}</td>
          <td>
            <ul class="list-unstyled">
              <li v-for="product in order.products" :key="product.id">
                {{ product.product.title }} {{ product.qty }} {{ product.product.unit }}
              </li>
            </ul>
          </td>
          <td>{{ order.total }}</td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                :id="`paidSwitch${order.id}`"
                v-modal="order.is_paid"
              />
              <label class="form-check-label" :for="`paidSwitch${order.id}`">
                <span v-if="order.is_paid">已付款</span><span v-else>未付款</span></label
              >
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="edit">
              <button type="button" class="btn btn-outline-primary">檢視</button>
              <button type="button" class="btn btn-outline-danger">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 頁碼 -->
    <PaginationComponent :pagination="pagination" @get-products="getOrders"></PaginationComponent>
  </div>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/PaginationComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      orders: {},
      pagination: {},
      isLoading: false
    };
  },
  components: {
    PaginationComponent
  },
  methods: {
    getOrders() {
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/orders`;

      axios
        .get(api)
        .then((res) => {
          // 把資料帶進 data 中
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          console.log(this.orders[0]);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  },
  mounted() {
    this.getOrders();
  }
};
</script>
