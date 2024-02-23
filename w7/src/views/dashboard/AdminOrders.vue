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
              <!-- 已付款時切為 checked 狀態 -->
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                :id="`paidSwitch${order.id}`"
                v-modal="order.is_paid"
                :checked="order.is_paid"
              />
              <label class="form-check-label" :for="`paidSwitch${order.id}`">
                <span v-if="order.is_paid">已付款</span><span v-else>未付款</span></label
              >
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm" role="group" aria-label="edit">
              <button
                type="button"
                class="btn btn-outline-primary"
                @click.prevent="openModal(order)"
              >
                檢視
              </button>
              <button type="button" class="btn btn-outline-danger">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 頁碼 -->
    <PaginationComponent :pagination="pagination" @get-products="getOrders"></PaginationComponent>
    <!-- 檢視 modal -->
    <div
      class="modal fade"
      id="orderModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="orderModal"
    >
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header bg-dark">
            <h5 class="modal-title text-white">訂單細節</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-4">
                <h3>用戶資料</h3>
                <table class="table">
                  <!-- 需先判斷是否為空值，否則會噴錯 -->
                  <tbody v-if="tempOrder.user">
                    <tr>
                      <th>姓名</th>
                      <td>{{ tempOrder.user.name }}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{{ tempOrder.user.email }}</td>
                    </tr>
                    <tr>
                      <th>電話</th>
                      <td>{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td>{{ tempOrder.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="col-8">
                <h3>訂單細節</h3>
                <table class="table">
                  <tbody>
                    <tr>
                      <th>訂單編號</th>
                      <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr>
                      <th>下單時間</th>
                      <td>{{ new Date(tempOrder.create_at * 1000).toLocaleDateString() }}</td>
                    </tr>
                    <tr>
                      <th>付款時間</th>
                      <td>
                        <!-- 如果有 paid_date 則顯示付款時間，沒有則出現尚未付款 -->
                        <span v-if="tempOrder.paid_date">
                          {{ new Date(tempOrder.paid_date * 1000).toLocaleDateString() }}</span
                        >
                        <span v-else class="text-muted">尚未付款</span>
                      </td>
                    </tr>
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <strong v-if="tempOrder.is_paid" class="text-success">已付款</strong>
                        <span v-else class="text-muted">尚未付款</span>
                      </td>
                    </tr>
                    <tr>
                      <th>總金額</th>
                      <td>{{ tempOrder.total }}</td>
                    </tr>
                  </tbody>
                </table>
                <h3>選購商品</h3>
                <table class="table">
                  <tr v-for="product in tempOrder.products" :key="product.id">
                    <th>{{ product.product.title }}</th>
                    <td>{{ product.qty }} / {{ product.product.unit }}</td>
                    <td>{{ product.total }}</td>
                  </tr>
                </table>
                <div class="form-check d-flex justify-content-end">
                  <input
                    class="form-check-input me-1"
                    type="checkbox"
                    value=""
                    id="is_paid"
                    v-model="tempOrder.is_paid"
                  />
                  <label class="form-check-label" for="is_paid">
                    <span v-if="tempOrder.is_paid">已付款</span>
                    <span v-else>未付款</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click.prevent="updateOrder(tempOrder)">
              修改付款狀態
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PaginationComponent from '@/components/PaginationComponent.vue';
import { Modal } from 'bootstrap';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      orders: {},
      pagination: {},
      isLoading: false,
      orderModal: '',
      tempOrder: {}
    };
  },
  components: {
    PaginationComponent
  },
  methods: {
    // 一樣要帶入頁碼
    getOrders(page = 1) {
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`;

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
    },
    // 一樣用淺層複製將該訂單帶入 tempOrder
    openModal(order) {
      this.tempOrder = { ...order };
      this.orderModal.show();
    },
    // 修改付款資訊
    updateOrder(order) {
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/order/${order.id}`;
      const paid = {
        is_paid: order.is_paid
      };

      axios
        .put(api, { data: paid })
        .then((res) => {
          alert(res.data.message);
          this.orderModal.hide();
          this.getOrders(this.pagination.current_page);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  },
  mounted() {
    this.getOrders();
    this.orderModal = new Modal(this.$refs.orderModal, {
      keyboard: false,
      backdrop: 'static'
    });
  }
};
</script>
