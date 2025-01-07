const userStore = {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    name: null,
    isLogin: false,
  }),

  getters: {
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken,
  },

  mutations: {
    setUsers: (state, payload) => {
      state.name = payload.name;
    },

    setTokens: (state, payload) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isLogin = true;
    },
    
    clearTokens: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.isLogin = false;
      state.name = null;
    },
  },

  actions: {    
    setUsers: ({ commit }, payload) => {
      commit('setUsers', payload);
    },

    setTokens: ({ commit }, payload) => {
      commit('setTokens', payload);
    },

    clearTokens: ({ commit }) => {
      commit('clearTokens');
    },
  },
};

export default userStore;
