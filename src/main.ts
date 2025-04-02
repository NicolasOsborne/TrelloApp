import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router/router'

import './assets/styles/main.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
