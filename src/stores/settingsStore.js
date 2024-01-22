import {defineStore} from 'pinia'
export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({ settings: {} }),
    actions: {
        set_settings(settings) {
            this.settings = settings
        },
    },
})