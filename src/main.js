import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';

import '@/assets/sass/main.scss';

const app = createApp(App)
  .use(router)  
  
app.mount('#app')
