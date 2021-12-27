export const state = () => ({
    user: ''
})

export const mutations = {
    setUser(state, payload) {
        state.user = payload
    }
}

export const actions = {
    setUser({ commit }, payload) {
        commit('setUser', payload)
    }
}