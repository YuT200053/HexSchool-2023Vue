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
      user: {
        email: '',
        name: '',
        tel: '',
        address: '',
        notice: '',
      },
      // 存放產品列表
      products: [],
      // 查看更多時暫存資料
      tempProduct: {},
      // modal
      //   userModal: null,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.user);
    },
    // 取得產品列表
    getProducts() {
      axios.get(`${apiUrl}/api/${apiPath}/products/all`).then((res) => {
        this.products = res.data.products;
        // console.log(this.products);
      });
    },
    // 取得單一產品查看更多
    openModal(product) {
      this.tempProduct = product;
      userModal.show();
    },
  },
  mounted() {
    this.getProducts();
    userModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false,
    });
    // this.userModal = new bootstrap.Modal(this.$refs.modal);
    // this.userModal.show();
  },
  components: {
    productModal,
  },
});

// VeeValidation 元件
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');