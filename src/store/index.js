import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import userStore from './modules/userStore';
import modalStore from './modules/modalStore';

const store = createStore({
  modules: {
    userStore,
    modalStore,
  },

  plugins: [
    createPersistedState({
      key: 'user',
      paths: ['userStore'],
      storage: window.localStorage,
    }),

    createPersistedState({
      key: 'vuex',
      paths: ['modalStore'],
      storage: window.sessionStorage,
    }),
  ],
});

window.addEventListener('storage', event => {
  if (event.key === 'user') {
    const newState = JSON.parse(event.newValue);
    store.replaceState(Object.assign({}, store.state, newState));
  }
});

export default store;
