
export const contestUser = {
    namespaced: true,
    state: {
        isCloseContest: false,
        isUserCloseContest: false,
    },
    actions: {
        isCloseContest({state}){
            return state.isCloseContest || state.isUserCloseContest
        },
        closeContest( { commit }) {
            commit('closeContest');
        },
        openContest( { commit }){
            commit('openContest');
        },
        closeUserContest( { commit }) {
            commit('closeUserContest');
        },
        openUserContest( { commit }){
            commit('openUserContest');
        }
    },
    mutations: {
        closeContest(state) {
            state.isCloseContest = true;

        },
        openContest(state) {
            state.isCloseContest = false;
        },
        closeUserContest(state) {
            state.isUserCloseContest = true;

        },
        openUserContest(state) {
            state.isUserCloseContest = false;
        }

    },
    getters: {
        isCloseContest: state => {
            return state.isCloseContest || state.isUserCloseContest
        }
    }
}