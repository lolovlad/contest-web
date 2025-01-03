import axios from "axios";

class ContestService {
    getListContest(page){
        return axios
            .get("/contests/list_contest", {params: {number_page: page}})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    deleteContest(uuid){
        return axios
            .delete(`/contests/${uuid}`)
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    getTypeContest(){
        return axios
            .get("/contests/get_type_contest")
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getStateContest(){
        return axios
            .get("/contests/get_state_contest")
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    addContest(contest){
        return axios
            .post("/contests", contest)
            .then(response => {
                if(response.status > 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    updateContest(contest, uuid){
        return axios
            .put(`/contests/${uuid}`, contest)
            .then(response => {
                if(response.status > 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getContest(uuid){
        return axios
            .get(`/contests/${uuid}`)
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    registrationUser(idUser, uuidContest){
        return axios
            .post(`/contests/registration_user`, {
                "id_user": idUser,
                "uuid_contest": uuidContest
            })
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    deleteUser(idUser, uuidContest){
        return axios
            .delete(`/contests/registration_user/${idUser}/${uuidContest}`)
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    registrationTask(uuidTask, uuidContest){
        return axios
            .post(`/contests/registration_task`, {
                "uuid_task": uuidTask,
                "uuid_contest": uuidContest
            })
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    deleteTask(uuidTask, uuidContest){
        return axios
            .delete(`/contests/registration_task/${uuidTask}/${uuidContest}`)
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    getContestByUser(){
        return axios
            .get("/contests/contests_by_user_id")
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getSelectContestByUser(uuidContest){
        return axios
            .get(`/user_contest_view/get_contest/${uuidContest}`)
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    closeContest(uuidContest){
        return axios
            .put(`/contests/update_state_user_in_contest/${uuidContest}`)
            .then(response => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }

    getListTasks(uuidContest){
        return axios
            .get(`/user_contest_view/get_list_task/${uuidContest}`)
            .then((response) => {
                return response.data;
            })
            .catch(function (e){
                throw e
            })
    }
    getTaskUser(uuidTask){
        return axios
            .get(`/user_contest_view/get_task/${uuidTask}`)
            .then((response) => {
                return response.data;
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new ContestService();