import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './store';
import globalFunction from './util/globalFunction';

import '@/assets/sass/main.scss';

const app = createApp(App).use(router).use(store);

app.config.globalProperties.$gFunc = globalFunction;

app.mount('#app');
