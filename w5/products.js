import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.11/vue.esm-browser.min.js';
// modal 元件
import productModal from './components/productModal.js';

let userModal = null;
const apiUrl = 'https://vue3-course-api.hexschool.io/v2';
const apiPath = 'yu-t-200053';

// 定義規則：將規則全部加入
Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 加入多國語系：讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  // 調整為：輸入文字時，就立即進行驗證
  validateOnInput: true,
});

const app = Vue.createApp({
  data() {
    return {
      // 存放收件者資料
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      // 存放產品列表
      products: [],
      // 查看更多時暫存資料
      tempProduct: {},
      // loading 狀態
      status: {
        addCartLoading: '',
        changeCartQty: '',
      },
      // 購物車資料
      carts: {},
    };
  },
  methods: {
    // 取得產品列表
    getProducts() {
      axios.get(`${apiUrl}/api/${apiPath}/products/all`).then((res) => {
        this.products = res.data.products;
      });
    },
    // 取得單一產品查看更多
    openModal(product) {
      this.tempProduct = product;
      this.$refs.userProductModal.openModal();
    },
    // 加入購物車，記得看 api 文件
    addCart(product_id, qty = 1) {
      const order = {
        product_id,
        qty,
      };

      // 加入 loading 效果，點擊按鈕時將 id 帶入 status
      this.status.addCartLoading = product_id;
      this.$refs.userProductModal.hideModal();

      axios
        .post(`${apiUrl}/api/${apiPath}/cart`, { data: order })
        .then((res) => {
          alert(res.data.message);
          console.log(res);
          // 加入購物車後，清除狀態的 id
          this.status.addCartLoading = '';
          userModal.hide();
          this.getCart();
        });
    },
    // 取得購物車列表
    getCart() {
      axios.get(`${apiUrl}/api/${apiPath}/cart`).then((res) => {
        console.log(res.data.data);
        this.carts = res.data.data;
      });
    },
    // 更改購物車品項數量
    changeCartQty(cart, qty) {
      const order = {
        product_id: cart.product_id,
        qty,
      };

      this.status.changeCartQty = cart.id;

      // 這邊要帶入的是購物車 id
      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${cart.id}`, { data: order })
        .then((res) => {
          alert(res.data.message);
          console.log(res.data);
          this.getCart();
          this.status.changeCartQty = '';
        });
    },
    // 刪除購物車特定品項
    deleteCartItem(id) {
      this.status.changeCartQty = id;

      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`).then((res) => {
        alert(res.data.message);
        this.getCart();
        this.status.changeCartQty = '';
      });
    },
    // 刪除購物車全部品項
    deleteCartAll() {
      axios.delete(`${apiUrl}/api/${apiPath}/carts`).then((res) => {
        alert(res.data.message);
        this.getCart();
      });
    },
    // 送出表單
    createOrder() {
      const url = `${apiUrl}/api/${apiPath}/order`;
      const order = this.form;
      axios
        .post(url, { data: order })
        .then((res) => {
          alert(res.data.message);
          // 清空表單
          this.$refs.form.resetForm();
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
    userModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false,
    });
    // this.userModal = new bootstrap.Modal(this.$refs.modal);
    // this.userModal.show();
  },
});

// product modal
app.component('productModal', productModal);

// VeeValidation 元件
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');
