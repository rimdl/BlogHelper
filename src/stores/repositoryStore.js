import {defineStore} from 'pinia'

// const useSettingsStore = defineStore("settingsStore",{
//     state(){
//         return{
//             result: 0
//         }
//     },
//     actions: {
//         setResult(res){
//             this.result = res
//         }
//     }
// })
//
// export default useSettingsStore

export const useRepositoryStore = defineStore('repositoryStore', {
    state: () => ({ repository_info: {} }),
    actions: {
        set_repository_info(repository_info) {
            this.repository_info = repository_info
        },
    },
})