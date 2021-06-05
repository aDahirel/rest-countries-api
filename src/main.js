import { createApp } from 'vue'
import App from './App.vue'
import './assets/global.css'
import router from './router/index'

createApp(App).use(router).use(router).mount('#app');