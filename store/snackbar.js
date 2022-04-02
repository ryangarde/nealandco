export const state = () => ({
  status: false,
  message: null,
  color: null,
  timeout: 5000,
});

export const mutations = {
  UPDATE(state, payload) {
    Object.keys(payload).forEach(property => {
      state[property] = payload[property];
    });
  },

  SUCCESS(state, payload) {
    state.status = true;
    state.color = 'success';
    state.message = typeof payload === 'string' ? payload : payload.message;
  },

  ERROR(state, payload) {
    state.status = true;
    state.color = 'red';
    state.message = typeof payload === 'string' ? payload : payload.message;
  },
};

export const actions = {
  update({ commit }, payload) {
    commit('UPDATE', payload);
  },
  success({ commit }, payload) {
    commit('SUCCESS', payload);
  },
  error({ commit }, payload) {
    commit('ERROR', payload);
  },
};
