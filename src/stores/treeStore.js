import {defineStore} from 'pinia'

export const useTreeStore = defineStore('treeStore', {
    state: () => ({ tree_info: [] }),
    actions: {
        set_tree_info(tree_info) {
            this.tree_info = tree_info
        },
    },
})