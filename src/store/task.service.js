import axios from "axios";

class TaskService {
    getTaskToContest(uuidContest){
        return axios
            .get(`/tasks/task_flag_contest/${uuidContest}`)
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getTasksSearch(search, count){
        return axios
            .get('/tasks/get/search', {params: {search_field: search, count: count}})
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    getListTask(page){
        return axios
            .get("/tasks/get_list_task/", {params: {number_page: page}})
            .then(response => {
                if(response.status === 200)
                    return response
            })
            .catch(function (e){
                throw e
            })
    }
    deleteTask(uuidTask){
        return axios
            .delete(`/tasks/${uuidTask}`)
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    getTask(uuidTask){
        return axios
            .get(`/tasks/get_task/${uuidTask}`)
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    addTask(task){
        return axios
            .post("/tasks", task)
            .then(response => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    getTypeTask(){
        return axios
            .get("/tasks/type_task/")
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    updateTask(uuidTask, task){
        return axios
            .put(`/tasks/${uuidTask}`, task)
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    getSettings(uuidTask){
        return axios
            .get(`/tasks/get_settings/${uuidTask}`)
            .then(response => {
                if(response.status === 200)
                    return response.data
            })
            .catch(function (e){
                throw e
            })
    }
    updateSettings(uuidTask, settings){
        return axios
            .put(`/tasks/settings/${uuidTask}`, settings)
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    deleteFile(uuidTask, nameFile){
        return axios
            .delete(`/tasks/delete_file/${uuidTask}/${nameFile}`)
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    uploadJsonFile(uuidTask, file){
        console.log(file)
        const formData = new FormData();
        formData.append("file", file)
        return axios
            .post(`/tasks/upload_json_files/${uuidTask}/`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    uploadFile(uuidTask, file){
        const formData = new FormData();
        formData.append("file", file)
        return axios
            .post(`/tasks/upload_file/${uuidTask}/`, formData, {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new TaskService();