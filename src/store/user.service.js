import axios from "axios";

class UserService {
    getPageUser(page, typeUser="all"){
        return axios
            .get('/users', {params: {number_page: page, type_user: typeUser}})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    getUserByUuid(uuid){
        return axios
            .get(`/users/${uuid}`)
            .then((response) => {
                if(response.status === 200){
                    return response.data
                }
            })
            .catch(function (e){
                return e
            })
    }
    addUser(user){
        return axios
            .post("/users", user)
            .then((response) => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    updateUser(uuid, user){
        return axios
            .put(`/users/${uuid}`, user)
            .then((response) => {
                if(response.status === 205)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    deleteUser(uuid){
        return axios
            .delete(`/users/${uuid}`)
            .then((response) => {
                if(response.status > 200)
                    return response
            })
            .catch(function (e){
                return e
            })
    }
    getTypeUser(){
        return axios
            .get("/users/type_user/all")
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    getTypeEducation(){
        return axios
            .get("/educational_organizations/type_edu/")
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    getTargetEducation(idTarget){
        return axios
            .get(`/educational_organizations/by_type/${idTarget}`)
            .then((response) => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                return e
            })
    }
    getUsersSearch(search, count){
        return axios
            .get('/users/get/search', {params: {search_field: search, count: count}})
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getUserToContest(uuidContest){
        return axios
            .get(`/users/user_flag_contest/${uuidContest}`)
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getStatusUserByContest(uuidContest){
        return axios
            .get(`/users/status/${uuidContest}`)
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new UserService();