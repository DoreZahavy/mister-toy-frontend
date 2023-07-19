<script>
	import { RouterLink, RouterView } from 'vue-router'
	import AppHeader from './components/AppHeader.vue'
	import AppFooter from './components/AppFooter.vue'
	export default {
		
		data() {
			return {}
		},
		created(){
			this.$store.dispatch({ type: 'loadToys' })
            // .then(() => showSuccessMsg('HomePage Loaded'))
		},
		components: {
			AppFooter,
			AppHeader,
		}
	}
</script>

<template>
	<main class="main-layout">
		<AppHeader />
		<RouterView class="router-view"/>
		<AppFooter />
	</main>
</template>
