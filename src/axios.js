import axios from "axios";
import {auth as $store} from "@/store/auth.model";


axios.defaults.baseURL = `http://${process.env.VUE_APP_HOST_SERVER}:${process.env.VUE_APP_PORT_SERVER}/`;
axios.defaults.headers.common.authorization = `Bearer ` + $store.state.token;

