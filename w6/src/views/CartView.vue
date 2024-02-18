<template>
  <div class="container">
    <h2 class="text-center">前台購物車</h2>
    <div class="text-end my-3">
      <button type="button" class="btn btn-outline-danger">清空購物車</button>
    </div>
    <!-- 購物車列表 -->
    <table class="table align-middle">
      <thead>
        <tr>
          <td width="10%"></td>
          <td width="45%">品名</td>
          <td width="25%">數量 / 單位</td>
          <td width="30%">單價</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cart in carts.carts" :key="cart.id">
          <td>
            <button type="button" class="btn btn-outline-danger">×</button>
          </td>
          <td>{{ cart.product.title }}</td>
          <td>
            <div class="input-group">
              <select class="form-select" id="cart" v-model="cart.qty">
                <option v-for="i in 20" :key="i" :value="i">{{ i }}</option>
              </select>
              <label class="input-group-text" for="cart">個</label>
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
      <VeeForm @submit="Submit" ref="form" class="col-md-6" v-slot="{ errors }">
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
          <button type="submit" class="btn btn-danger">送出訂單</button>
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
      }
    };
  },
  methods: {
    getCart() {
      const api = `${VITE_URL}/api/${VITE_PATH}/cart`;
      axios.get(api).then((res) => {
        this.carts = res.data.data;
        console.log(this.carts);
      });
    },
    Submit() {
      console.log(this.form);
    }
  },
  mounted() {
    this.getCart();
  }
};
</script>
