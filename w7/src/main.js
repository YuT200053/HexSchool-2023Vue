import { createApp } from 'vue'
import { createPinia } from 'pinia'

// 需客製變數，bootstrap 由 all.scss 導入
import './assets/all.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
