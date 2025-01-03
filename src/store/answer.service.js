import axios from "axios";

class AnswerService {
    getListAnswer(uuidContest, uuidTask){
        return axios
            .get(`/user_contest_view/get_list_answers/${uuidContest}/${uuidTask}`)
            .then((response) => {
                return response.data;
            })
            .catch(function (e){
                throw e
            })
    }

    sendAnswer(uuidContest, uuidTask, file, selectLeng){
        const formData = new FormData()
        formData.append("file", file)
        formData.append("id_compilation", parseInt(selectLeng))
        return axios
            .post(`/user_contest_view/send_answer/${uuidContest}/${uuidTask}/`,
                formData,
                {headers: {'Content-Type': 'multipart/form-data'}})
            .then(response => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }

    sendEditAnswer(uuidContest, uuidTask, ansText){
        const formData = new FormData();
        formData.append("text", ansText)
        return axios
            .post(`/user_contest_view/send_answer/${uuidContest}/${uuidTask}/`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            .then((response) => {
                return response
            })
            .catch(function (e){
                throw e
            })
    }
    getReportAnswer(uuidAnswer){
        return axios
            .get(`/user_contest_view/get_report/${uuidAnswer}`)
            .then((response) => {
                return response.data;
            })
            .catch(function e(){
                throw e
            })
    }
}

export default new AnswerService();