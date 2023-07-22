import { userService } from '@/services/user.service.js'

export const userStore = {
  strict: true,
  state: {
    user: userService.getLoggedinUser()
  },
  getters: {
    user({ user }) { return user }
  },
  mutations: {
    logout(state) {
      state.user = null
    },
    setUser(state, { user }) {
      state.user = user
    }
  },
  actions: {
    async login({ commit }, { credentials }) {
      try {
        const user = await userService.login(credentials)
        commit({ type: "setUser", user })
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },
    async signup({ commit }, { signupInfo }) {
      try {
        const user = await userService.signup(signupInfo)
        commit({ type: "setUser", user })
      } catch (err) {
        console.log(err)
        return Promise.reject()
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout()
        commit({ type: 'logout' })
        return Promise.resolve()
      }
      catch (err) {
        console.log(err)
        return Promise.reject()
      }
    }

  },
}
