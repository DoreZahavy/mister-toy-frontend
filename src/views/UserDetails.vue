<template>
    <div class="user-page">
        <section v-if="user">
            <p>Welcome {{ user.fullname }}</p>
            <button @click="onLogout">Logout</button>
        </section>
        <section v-else>
            <LoginSignup @login="onLogin" @signup="onSignup" />
        </section>
    </div>
</template>

<script>
import LoginSignup from '@/components/LoginSignup.vue'
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service.js'

export default {
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
    methods: {
        async onLogin(credentials) {
            try {
                await this.$store.dispatch({ type: 'login', credentials })
                showSuccessMsg(`Login successful`)
            }
            catch (err) {
                console.log('Cannot login', err)
                showErrorMsg(`Cannot login`)
            }
        },
        async onSignup(signupInfo) {
            try {
                await this.$store.dispatch({ type: 'signup', signupInfo })
                showSuccessMsg(`Signup successful`)
            }
            catch (err) {
                console.log('Cannot signup', err)
                showErrorMsg(`Cannot signup`)
            }
        },
        async onLogout() {
            try {
                this.$store.dispatch({ type: "logout" });
                showSuccessMsg(`Logout successful`)
            }
            catch (err) {
                console.log("Cannot logout", err);
                showErrorMsg(`Cannot logout`);
            }
        },
        onSetUser(user) {
            console.log('user:', user)
            this.$store.commit({ type: "setUser", user })
            // this.$router.push('/')
        }
    },
    // components: LoginSignup,
    components: { LoginSignup }
}
</script>