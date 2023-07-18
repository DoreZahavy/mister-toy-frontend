<script>
import { toyService } from '@/services/toy.service.js'
export default {

	data() {
		return {
			toy: toyService.getEmptyToy()
		}
	},
	created() {
		const { toyId } = this.$route.params
		if (toyId) {
			toyService.getById(toyId)
				.then(toy => this.toy = toy)
		}
	},
	methods: {

	},
	computed: {
		time() {
			this.toy.createdAt.toLocaleString()
		}
	}
}
</script>

<template>
	<main>
		<h1>{{ toy.name }}</h1>
		<h3>${{ toy.price }}</h3>
		<h3>Created at {{ time }}</h3>
		<h3>{{ (toy.inStock) ? 'In stock!' : 'Not in stock' }}</h3>
		<ul>
			Labels
			<li v-for="label in toy.labels">
				{{ label }}
			</li>
		</ul>
		<RouterLink to="/toy">back</RouterLink>
	</main>
</template>