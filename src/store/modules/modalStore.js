const modalStore = {
  state: () => ({
    msg: null,
    alertType: null,
    url: null,
    confirmOkMessage: null,
    confirmCancelMessage: null,
    confirmOkHandler: null,
  }),

  mutations: {
    modalObject: (state, payload) => {
      state.msg = payload?.msg ?? null;
      state.alertType = payload?.alertType ?? null;
      state.url = payload?.url ?? null;
      state.confirmOkMessage = payload?.confirmOkMessage ?? null;
      state.confirmCancelMessage = payload?.confirmCancelMessage ?? null;
      if (payload?.confirmOkHandler) {
        state.confirmOkHandler = payload?.confirmOkHandler;
      }
    },
    confirmOkHandler: (state, payload) => {
      state.confirmOkHandler = payload;
    },
  },

  actions: {
    modalObject: ({ commit }, payload) => {
      commit('modalObject', payload);
    },
    confirmOkHandler: ({ commit, state }) => {
      state.confirmOkHandler();
      commit('confirmOkHandler', null);
    },
  },
};

export default modalStore;
