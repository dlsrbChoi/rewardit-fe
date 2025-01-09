import { createApp } from 'vue';
import App from './App.vue';
import router from './routers';
import store from './store';
import globalFunction from './util/globalFunction';
import vuetify from './plugins/vuetify';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import '@/assets/sass/main.scss';

const app = createApp(App)

app.use(router).use(store).use(vuetify).use(VueDatePicker);

app.config.globalProperties.$gFunc = globalFunction;

app.mount('#app');
