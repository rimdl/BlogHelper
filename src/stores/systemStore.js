import {defineStore} from 'pinia'

export const useSystemStore = defineStore('systemStore', {
    state: () => ({ now_page: "",loading: false,loadTree: false }),
    actions: {
        set_now_page(now_page) {
            this.now_page = now_page
        },
        set_loading(loading) {
            this.loading = loading
        },
        set_loadTree(loadTree) {
            this.loadTree = loadTree
        }
    },
})