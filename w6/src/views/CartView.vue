<template>
  <div class="container">
    <VueLoading :active="isLoading" />
    <h2 class="text-center">前台購物車</h2>
    <div class="text-end my-3">
      <!-- 當購物車是空的，則無法空清購物車 -->
      <button
        type="button"
        class="btn btn-outline-danger"
        @click.prevent="deleteAll"
        :disabled="(loadingStatus.loadingItem === true) | (carts.total === 0)"
      >
        清空購物車
      </button>
    </div>
    <!-- 購物車列表 -->
    <table class="table align-middle">
      <thead>
        <tr>
          <td width="10%"></td>
          <td width="40%">品名</td>
          <td width="30%">數量 / 單位</td>
          <td width="30%">單價</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cart in carts.carts" :key="cart.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.prevent="deleteCart(cart.id)"
              :disabled="loadingStatus.loadingItem === cart.id"
            >
              ×
            </button>
          </td>
          <td>{{ cart.product.title }}</td>
          <td>
            <div class="input-group">
              <!-- select 更換數量時購物車數量也要一起更動 -->
              <select
                class="form-select"
                id="cart"
                v-model="cart.qty"
                @change="changeCartQty(cart, cart.qty)"
                :disabled="loadingStatus.loadingItem === cart.id"
              >
                <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
              </select>
              <label class="input-group-text" for="cart">{{ cart.product.unit }}</label>
            </div>
          </td>
          <td class="text-end">$ {{ cart.product.price }}</td>
        </tr>
      </tbody>
      <tfoot class="text-end">
        <tr>
          <td colspan="3">總計</td>
          <td>$ {{ carts.total }}</td>
        </tr>
        <tr>
          <td colspan="3" class="text-success">折扣價</td>
          <td class="text-success">$ {{ carts.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <!-- 訂購資訊 -->
    <div class="row">
      <!-- submit 時建立訂單 -->
      <VeeForm @submit="createOrder" ref="form" class="col-md-6" v-slot="{ errors }">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <VeeField
            id="email"
            name="email"
            type="email"
            class="form-control"
            :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email"
            rules="email|required"
            v-model="form.user.email"
          />
          <ErrorMessage name="email" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <VeeField
            id="name"
            name="姓名"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名"
            rules="required"
            v-model="form.user.name"
          />
          <ErrorMessage name="姓名" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <VeeField
            id="tel"
            name="電話"
            type="tel"
            class="form-control"
            :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話"
            rules="required|min:8"
            v-model="form.user.tel"
          />
          <ErrorMessage name="電話" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <VeeField
            id="address"
            name="地址"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址"
            rules="required"
            v-model="form.user.address"
          />
          <ErrorMessage name="地址" class="invalid-feedback" />
        </div>
        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" name="留言" class="form-control" v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <!-- 當購物車是空的，則無法送出訂單 -->
          <button type="submit" class="btn btn-danger mb-5" :disabled="carts.total === 0">
            送出訂單
          </button>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      carts: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      },
      isLoading: false,
      loadingStatus: {
        loadingItem: ''
      }
    };
  },
  methods: {
    getCart() {
      this.isLoading = true;
      const api = `${VITE_URL}/api/${VITE_PATH}/cart`;
      axios.get(api).then((res) => {
        this.carts = res.data.data;
        this.isLoading = false;
      });
    },
    deleteCart(id) {
      const api = `${VITE_URL}/api/${VITE_PATH}/cart/${id}`;
      this.loadingStatus.loadingItem = id;

      axios
        .delete(api)
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          this.loadingStatus.loadingItem = '';
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    deleteAll() {
      const api = `${VITE_URL}/api/${VITE_PATH}/carts`;
      this.loadingStatus.loadingItem = true;

      axios
        .delete(api)
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          this.loadingStatus.loadingItem = '';
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 更改購物車品項數量
    changeCartQty(cart, qty) {
      const order = {
        product_id: cart.product_id,
        qty
      };
      // 這裡要帶購物車 id
      const api = `${VITE_URL}/api/${VITE_PATH}/cart/${cart.id}`;

      this.isLoading = true;

      // 更新購物車用 put
      axios
        .put(api, { data: order })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    // 建立訂單
    createOrder() {
      const api = `${VITE_URL}/api/${VITE_PATH}/order`;
      const order = this.form;

      this.isLoading = true;

      axios
        .post(api, { data: order })
        .then((res) => {
          alert(res.data.message);
          // 清空表單
          this.$refs.form.resetForm();
          this.getCart();
          this.isLoading = false;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  },
  mounted() {
    this.getCart();
  }
};
</script>
