import axios from "axios";

class CompilationService {
    getCompilations(){
        return axios
            .get("/compilations/list_compilations")
            .then((response) => {
                if(response.status === 200){
                    return response.data
                }
            })
            .catch(function (e){
                throw e
            })
    }
}

export default new CompilationService();