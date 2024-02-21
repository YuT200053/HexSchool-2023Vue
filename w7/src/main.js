import { createApp } from 'vue';
import { createPinia } from 'pinia';

// 需客製變數，bootstrap 由 all.scss 導入
import './assets/all.scss';
// 導入 Loading Overlay
import Loading from 'vue-loading-overlay';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// 註冊 loading 元件，使用全域註冊在 main.js 設定
app.component('VueLoading', Loading);

app.mount('#app');
