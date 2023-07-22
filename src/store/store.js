import { createStore } from 'vuex'

import { toyStore } from '@/store/modules/toy.store.js'
import { userStore } from '@/store/modules/user.store.js'

export const store = createStore({
    strict: true,
    modules: {
        toyStore,
        userStore,
    },
    state:{
       
    }
})