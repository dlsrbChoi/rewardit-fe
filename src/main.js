import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './store';
import globalFunction from './util/globalFunction';
import vuetify from './plugins/vuetify';

import '@/assets/sass/main.scss';

const app = createApp(App)

app.use(router).use(store).use(vuetify);

app.config.globalProperties.$gFunc = globalFunction;

app.mount('#app');
