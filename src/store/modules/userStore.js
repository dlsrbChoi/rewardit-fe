const userStore = {
  state: () => ({
    accessToken: null,
    refreshToken: null,
    name: null,
    role: null,
    isLogin: false,
  }),

  getters: {
    accessToken: state => state.accessToken,
    refreshToken: state => state.refreshToken,
  },

  mutations: {
    setUsers: (state, payload) => {
      state.name = payload.name;
      state.role = payload.role;
    },

    setTokens: (state, payload) => {
      state.accessToken = payload.accessToken;
      state.refreshToken = payload.refreshToken;
      state.isLogin = true;
    },
    
    clearTokens: state => {
      state.accessToken = null;
      state.refreshToken = null;
      state.name = null;
      state.role = null;
      state.isLogin = false;
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
