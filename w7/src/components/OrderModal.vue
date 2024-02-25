<template>
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
</template>

<script>
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      orderModal: ''
    };
  },
  props: ['tempOrder'],
  methods: {
    openModal() {
      this.orderModal.show();
    },
    hideModal() {
      this.orderModal.hide();
    },
    updateOrder() {
      // 要記得帶入 tempOrder 參數
      this.$emit('updateOrder', this.tempOrder);
    }
  },
  mounted() {
    this.orderModal = new Modal(this.$refs.orderModal, {
      keyboard: false,
      backdrop: 'static'
    });
  }
};
</script>
