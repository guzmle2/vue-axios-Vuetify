import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: {
            title: '',
            state: false,
            color: 'primary'
        }
    },
    mutations: {

        showLoading(state, payload) {
            state.loading = {
                ...payload,
                state: true
            };
            console.log(state)
        },

        hideLoading(state) {
            state.loading = {
                ...state.loading,
                state: false
            };
        }

    },
    actions: {}
})
