import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username' || '[]')),
        adminMenus: []
    },
    mutations: {
        login (state, data) {
            state.username = data.object
            window.localStorage.setItem('username', JSON.stringify(data.object))
        },
        logout (state) {
            state.username = ''
            window.localStorage.removeItem('username')
        },
        initAdminMenu(state, menus) {
            state.adminMenus = menus
        }
    }
})