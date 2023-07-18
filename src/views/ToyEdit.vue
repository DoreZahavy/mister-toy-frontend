<script>
import {showErrorMsg,showSuccessMsg} from '@/services/event-bus.service.js'


import { toyService } from '@/services/toy.service.js'
export default {

	data() {
		return {
			toyToEdit: toyService.getEmptyToy()
		}
	},
	created() {
		const { toyId } = this.$route.params
		if (toyId) {
			toyService.getById(toyId)
				.then(toy => this.toyToEdit = toy)
		}
	},
	methods: {
		save() {
			this.$store.dispatch({ type: 'saveToy', toyToSave: this.toyToEdit })
				.then(() => {
					this.toyToEdit = toyService.getEmptyToy()
					showSuccessMsg(`Toy ${this.toyToEdit.name} saved`)
					this.$router.push('/toy')
				})
				.catch(() => showErrorMsg(`Couldn't save toy ${this.toyToEdit.name}`))


		},

	},
}
</script>

<template>
	<main class="toy-edit">
		<h1>{{ (toyToEdit._id) ? 'Edit Toy' : 'Add Toy' }}</h1>
		<form @submit.prevent="save">
			<!-- <label> -->
			<label>Name</label>
			<input type="text" v-model="toyToEdit.name" placeholder="Enter name...">
			<!-- </label> -->
			<!-- <label> -->
			<label>In stock?</label>
			<input type="checkbox" v-model="toyToEdit.isStock">
			<!-- </label> -->
			<!-- <label> -->
			<label>Price</label>
			<input type="number" step="any" v-model="toyToEdit.price" placeholder="Enter price..." min="0" max="100">
			<!-- </label> -->
			<!-- <label> -->
			<label>Labels</label>
			<select v-model="toyToEdit.labels" multiple>
				<option>On wheels</option>
				<option>Box game</option>
				<option>Art</option>
				<option>Baby</option>
				<option>Doll</option>
				<option>Puzzle</option>
				<option>Outdoor</option>
				<option>Battery powered</option>
			</select>
			<!-- </label> -->
			<div class="actions">
				<button type="submit"> {{ (toyToEdit._id) ? 'Save' : 'Add' }}</button>
				<RouterLink to="/toy">back</RouterLink>
			</div>
		</form>



	</main>
</template>