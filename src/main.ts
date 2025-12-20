import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@fortawesome/fontawesome-free/css/all.min.css'
import App from './App.vue'
import router from '@/router'
import i18n from '@/i18n'

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ToastPlugin, {
    position: 'top-right',
    duration: 4000,
    dismissible: true
})

app.mount('#app')
