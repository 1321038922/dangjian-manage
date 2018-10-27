import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userinfo: {
            
        },
        token:'',
        isLogin:''
    },
    mutations: {
        CHANGE_USERINFO(state, userinfo) {
            state.userinfo = userinfo
        },
        IS_LOGIN(state, isLogin) {
            state.isLogin = isLogin
        },
        SAVE_TOKEN(state, token) {
            state.token = token
        },
    },
    actions: {

    },
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => sessionStorage.getItem(key),
                // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
                setItem: (key, value) => sessionStorage.setItem(key, value, { expires: 3, secure: true }),
                removeItem: key => sessionStorage.removeItem(key)
            }
        })
    ]
})

export default store