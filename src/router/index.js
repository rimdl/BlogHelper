import {createRouter, createWebHistory} from 'vue-router'
import Main from '../components/Main.vue'
import {ElNotification} from "element-plus";
import {useSystemStore} from "@/stores/systemStore.js";


const routes = [
    {
        path: '/',
        component: Main,
        name: "Main",
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/posts',
        name: 'posts',
        component: () => import('../components/Posts.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/pages',
        name: 'pages',
        component: () => import('../components/Pages.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../components/Settings.vue'),
    },
    {
        path: '/read',
        name: 'read',
        component: () => import('../components/Read.vue'),
        meta: {
            requiresAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const systemStore = useSystemStore()
    systemStore.set_loading(true)
    if (to.meta.requiresAuth) {
        if (localStorage.getItem("settings") === null) {
            ElNotification({
                title: '提示',
                message: '未设置账户信息，请设置',
                type: 'error',
                position: 'top-right'
            })
            next('/settings')
        } else {
            next()
        }
    } else {
        next()
    }
})
router.afterEach(() => {
    const systemStore = useSystemStore()
    systemStore.set_loading(false)
})


export default router