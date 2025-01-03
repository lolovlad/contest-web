import { createApp } from 'vue'
import App from '@/App'
import router from '@/router/router'
import store from "@/store";
import './axios'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VFileUpload, VFileUploadItem } from 'vuetify/labs/VFileUpload'


const vuetify = createVuetify({
    components: {
        VFileUpload,
        VFileUploadItem,
        ...components
    },
    directives,
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },

})

const app = createApp(App)


app.use(router).use(store).use(vuetify).mount('#app')

