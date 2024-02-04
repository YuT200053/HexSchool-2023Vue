import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.3.11/vue.esm-browser.min.js';

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
      user: {
        email: '',
        name: '',
        tel: '',
        address: '',
        notice: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log(this.user);
    },
  },
});

// VeeValidation 元件
app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');
