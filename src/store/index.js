import {createStore} from "vuex";


export default createStore({
    state: {
        token: sessionStorage.getItem("token") || null,
        typeUser: parseInt(sessionStorage.getItem("typeUser")) || null,
        isCloseContest: !!parseInt(sessionStorage.getItem("state")) || false
    },
    getters: {

    },
    mutations: {
        setToken(state, token){
            state.token = token
            sessionStorage.setItem("token", token)

        },
        setTypeUser(state, typeUser){
            state.typeUser = typeUser
            sessionStorage.setItem("typeUser", typeUser)
        },
        setCloseContest(state, isClose){
            state.isCloseContest = isClose
            sessionStorage.setItem("state", isClose ? 1 : 0)
        }
    }
})