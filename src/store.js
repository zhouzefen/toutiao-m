import Vue from 'vue'
import Vuex from 'vuex'
import { getToken } from '@/utils/storage.js'
Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
    state: {
        // 用户的登录状态信息
        // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
        user: getToken(TOKEN_KEY)
            // user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
            window.localStorage.setItem(TOKEN_KEY, JSON.stringify(user))
                // setToken(TOKEN_KEY, state.user)
        }
    },
    actions: {},
    modules: {}
})