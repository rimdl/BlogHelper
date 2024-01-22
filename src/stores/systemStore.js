import {defineStore} from 'pinia'

export const useSystemStore = defineStore('systemStore', {
    state: () => ({ now_page: "" }),
    actions: {
        set_now_page(now_page) {
            this.now_page = now_page
        },
    },
})