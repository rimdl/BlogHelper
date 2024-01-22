import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index.js'
import {createPinia} from 'pinia'
import {myFetch} from './utils/my_fetch.js'


const app = createApp(App)

app.config.globalProperties.$myFetch = myFetch;

app.use(ElementPlus)
app.use(router)
app.use(createPinia())
app.mount('#app')