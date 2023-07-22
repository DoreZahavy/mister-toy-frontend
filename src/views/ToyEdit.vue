<script>
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service.js'

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
			this.getToy(toyId)
		}
	},
	computed: {
		user() {
			return this.$store.getters.user
		}
	},
	methods: {
		async save() {
			try {
				this.$store.dispatch({ type: 'saveToy', toyToSave: this.toyToEdit })
				this.toyToEdit = toyService.getEmptyToy()
				showSuccessMsg(`Toy ${this.toyToEdit.name} saved`)
				this.$router.push('/toy')

			} catch {
				showErrorMsg(`Couldn't save toy ${this.toyToEdit.name}`)
			}


		},
		async getToy(toyId) {
			try {
				const toy = await toyService.getById(toyId)
				this.toyToEdit = toy
			} catch {
				showErrorMsg(`Failed loading toy`)
			}
		}

	},
}
</script>

<template>
	<main class="toy-edit">
		<h1>{{ (toyToEdit._id) ? 'Edit Toy' : 'Add Toy' }}</h1>
		<form @submit.prevent="save">

			<label>Name</label>

			<el-input v-model="toyToEdit.name" placeholder="Enter name..." style="width: 240px" clearable />

			<!-- <input type="text" v-model="toyToEdit.name" placeholder="Enter name..."> -->

			<div>

				<label>In stock?</label>
				<input type="checkbox" v-model="toyToEdit.isStock">
			</div>


			<label>Price</label>
			<el-input type="number" step="any" v-model="toyToEdit.price" style="width: 240px" placeholder="Enter price..." min="0"  />

			<!-- <input type="number" step="any" v-model="toyToEdit.price" placeholder="Enter price..." min="0" max="100"> -->


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

			<button v-if="user?.isAdmin" type="submit"> {{ (toyToEdit._id) ? 'Save' : 'Add' }}</button>
			<RouterLink class="back-icon" to="/toy"><i class="fa-solid fa-arrow-left-long fa-2xl"></i></RouterLink>
			<!-- <div class="actions">
			</div> -->
		</form>



	</main>
</template>