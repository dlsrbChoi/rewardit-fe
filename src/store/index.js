import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import modalStore from './modules/modalStore';

const store = createStore({
  modules: {
    modalStore,
  },

  plugins: [
    createPersistedState({
      key: 'vuex',
      paths: ['modalStore'],
      storage: window.sessionStorage,
    }),
  ],
});

export default store;
