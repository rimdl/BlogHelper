import {defineStore} from 'pinia'

export const useUserStore = defineStore('userStore', {
    state: () => ({ user_info: {} }),
    actions: {
        set_user_info(user_info) {
            this.user_info = user_info
        },
    },
})