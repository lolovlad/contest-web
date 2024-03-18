import {createStore} from "vuex";
import {auth} from "@/store/auth.model";
import {contestUser} from "@/store/contestUser.model";


export default createStore({
    modules: {
        auth,
        contestUser
    }
})
