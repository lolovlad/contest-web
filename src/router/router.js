import LoginPage from "@/pages/LoginPage";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import MenuPage from "@/pages/MenuPage";
import AdminPage from "@/pages/AdminPage";
import ContestPage from "@/pages/ContestPage";
import ContestHomePage from "@/pages/ContestHomePage";
import ContestTaskPage from "@/pages/ContestTaskPage";
import ContestResultPage from "@/pages/ContestResultPage";
import ContestTaskReportPage from "@/pages/ContestTaskReportPage";

const routes = [
    {
        path: '/',
        component: LoginPage
    },
    {
        path: '/menu',
        component: MenuPage,
        beforeEnter: (to, from, next) => {
            if(sessionStorage.getItem("token") !== null){
                if(parseInt(sessionStorage.getItem("typeUser")) === 2) {
                    next();
                }
                else {
                    next(false);
                }
            }else{
                next('/')
            }
        }
    },
    {
        path: '/admin_panel',
        component: AdminPage,
        beforeEnter: (to, from, next) => {
            if(sessionStorage.getItem("token") !== null){
                if(parseInt(sessionStorage.getItem("typeUser")) === 1) {
                    next();
                }
                else {
                    next(false);
                }
            }else{
                next('/')
            }
        }
    },
    {
        path: '/contest/:id_contest',
        component: ContestPage,
        children: [
            {
                path: "",
                component: ContestHomePage
            },
            {
                path: "tasks",
                component: ContestTaskPage
            },
            {
                path: "result",
                component: ContestResultPage
            },
            {
                path: "report/:id_task/:id_answer",
                component: ContestTaskReportPage
            }
        ],
        beforeEnter: (to, from, next) => {
            if(sessionStorage.getItem("token") !== null){
                if(parseInt(sessionStorage.getItem("typeUser")) === 2) {
                    next();
                }
                else {
                    next(false);
                }
            }else{
                next('/')
            }
        }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router