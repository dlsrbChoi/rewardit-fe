import { createApp } from 'vue'
import App from './App.vue'
import router from './routers';
import store from './store';

import '@/assets/sass/main.scss';

const app = createApp(App)
  .use(router)
  .use(store);
  
app.mount('#app')
