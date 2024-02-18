<template>
  <div class="container">
    <h2 class="text-center">前台購物車</h2>
    <div class="text-end">
      <button type="button" class="btn btn-outline-danger">清空購物車</button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <td width="10%"></td>
          <td width="50%">品名</td>
          <td width="25%">數量 / 單位</td>
          <td width="25%">單價</td>
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
          <td>{{ cart.product.price }} 元</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return { carts: {} };
  },
  methods: {
    getCart() {
      const api = `${VITE_URL}/api/${VITE_PATH}/cart`;
      axios.get(api).then((res) => {
        this.carts = res.data.data;
        console.log(this.carts);
      });
    }
  },
  mounted() {
    this.getCart();
  }
};
</script>
