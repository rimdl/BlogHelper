import { createRouter, createWebHistory } from 'vue-router'
import Main from '../components/Main.vue'

const routes = [
    {
        path: '/',
        component: Main,
        name: "Main"
    },
    {
        path: '/posts',
        name: 'posts',
        component: () => import('../components/Posts.vue')
        // component: HistoryExam
    },
    {
        path: '/pages',
        name: 'pages',
        component: () => import('../components/Pages.vue')
        // component: HistoryExam
    },
    {
        path: '/settings',
        name: 'settings',
        component: () => import('../components/Settings.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router