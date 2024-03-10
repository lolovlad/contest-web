import LoginPage from "@/pages/LoginPage";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import {auth as $store} from "@/store/auth.model";
import MenuPage from "@/pages/MenuPage";
import AdminPage from "@/pages/AdminPage";
import ContestPage from "@/pages/ContestPage";
import ContestHomePage from "@/pages/ContestHomePage";
import ContestTaskPage from "@/pages/ContestTaskPage";
import ContestResultPage from "@/pages/ContestResultPage";
import ContestTaskReportPage from "@/pages/ContestTaskReportPage";
import AdminUserPage from "@/pages/AdminUserPage";
import AdminContestPage from "@/pages/AdminContestPages/AdminContestPage";
import AdminTeamPage from "@/pages/AdminTeamPage";
import AdminContestForm from "@/pages/AdminContestPages/AdminContestForm";
import AdminContestListPage from "@/pages/AdminContestPages/AdminContestListPage";
import AdminTaskPage from "@/pages/AdminContestPages/Task/AdminTaskPage";
import AdminTaskViewPage from "@/pages/AdminContestPages/Task/AdminTaskViewPage";
import AdminTaskForm from "@/pages/AdminContestPages/Task/AdminTaskForm";
import AdminTaskSettingsForm from "@/pages/AdminContestPages/Task/AdminTaskSettingsForm";

const routes = [
    {
        path: '/',
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            const initialState = $store.state
            console.log(initialState.status.loggedIn)
            if(initialState.status.loggedIn){
                if(initialState.user.type.name === "user") {
                    next("/menu");
                }
                else {
                    next("/admin");
                }
            }else{
                next(true)
            }
        }
    },
    {
        path: '/menu',
        component: MenuPage,
        beforeEnter: (to, from, next) => {
            const initialState = $store.state
            if(initialState.status.loggedIn){
                if(initialState.user.type.name === "user") {
                    next();
                }
                else {
                    next("/admin");
                }
            }else{
                next('/')
            }
        }
    },
    {
        path: '/admin',
        component: AdminPage,
        children: [
            {
              path: "",
              component: AdminUserPage
            },
            {
                path: "user",
                component: AdminUserPage
            },
            {
                path: "contest",
                component: AdminContestPage,
                children: [
                    {
                        path: "edit/:id_contest",
                        component: AdminContestForm,
                    },
                    {
                        path: "add",
                        component: AdminContestForm
                    },
                    {
                        path: "",
                        component: AdminContestListPage
                    },
                    {
                        path: ":id_contest/task",
                        component: AdminTaskPage,
                        children: [
                            {
                                path: "",
                                component: AdminTaskViewPage,
                            },
                            {
                                path: "edit/:id_task",
                                component: AdminTaskForm,
                            },
                            {
                                path: "add",
                                component: AdminTaskForm
                            },
                            {
                                path: ":id_task/settings",
                                component: AdminTaskSettingsForm
                            },
                        ]
                    },
                ]
            },
            {
                path: "team",
                component: AdminTeamPage
            },
        ],
        beforeEnter: (to, from, next) => {
            const initialState = $store.state;
            if(initialState.status.loggedIn){
                if(initialState.user.type.name === "admin") {
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
            const initialState = $store.state
            if(initialState.status.loggedIn){
                if(initialState.user.type.name === "user") {
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