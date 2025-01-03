import LoginPage from "@/pages/LoginPage";
import {createRouter, createWebHistory} from "vue-router/dist/vue-router";
import {auth as $store} from "@/store/auth.model";
import MenuPage from "@/pages/UserPage/Menu/MenuPage.vue";
import AdminPage from "@/pages/AdminPage";
import ContestPage from "@/pages/UserPage/Contest/ContestPage.vue";
import ContestHomePage from "@/pages/UserPage/Contest/ContestHomePage.vue";
import ContestTaskPage from "@/pages/UserPage/Contest/ContestTaskPage.vue";
import ContestResultPage from "@/pages/UserPage/Contest/ContestResultPage.vue";
import ContestTaskReportPage from "@/pages/UserPage/Contest/ContestTaskReportPage.vue";
import AdminUserPage from "@/pages/AdminPage/User/AdminUserPage.vue";
import AdminContestPage from "@/pages/AdminPage/Contest/AdminContestPage.vue";
import AdminTeamPage from "@/pages/UserPage/AdminTeamPage.vue";
import AdminContestForm from "@/pages/AdminPage/Contest/AdminContestForm.vue";
import AdminContestListPage from "@/pages/AdminPage/Contest/AdminContestListPage.vue";
import AdminTaskPage from "@/pages/AdminPage/Contest/Task/AdminTaskPage";
import AdminTaskViewPage from "@/pages/AdminPage/Contest/Task/AdminTaskViewPage";
import AdminTaskForm from "@/pages/AdminPage/Contest/Task/AdminTaskForm";
import AdminTaskSettingsForm from "@/pages/AdminPage/Contest/Task/AdminTaskSettingsForm";
import AdminContestControllerPage from "@/pages/AdminPage/Contest/AdminContestControllerPage.vue";
import AdminAnswerFormEditPage from "@/pages/AdminPage/Contest/Answer/AdminAnswerFormEditPage";
import EditUserAdminPage from "@/pages/AdminPage/User/EditUserAdminPage.vue";
import ViewUserAdminPAge from "@/pages/AdminPage/User/ViewUserAdminPAge.vue";

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
                component: AdminUserPage,
                children: [
                    {
                        path: "",
                        component: ViewUserAdminPAge
                    },
                    {
                        path: "edit/:id_user",
                        component: EditUserAdminPage,
                    },
                    {
                        path: "add",
                        component: EditUserAdminPage,
                    },
                ]
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
                        path: "controller/:id_contest",
                        component: AdminContestControllerPage
                    },
                    {
                        path: "answer/:id_contest/:id_task/:id_answer",
                        component: AdminAnswerFormEditPage
                    },
                    {
                        path: "result/:id_contest",
                        component: ContestResultPage
                    }
                ]
            },
            {
                path: "task",
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