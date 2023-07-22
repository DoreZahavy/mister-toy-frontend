<script>
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service.js'
import { toyService } from '@/services/toy.service.js'
export default {

	data() {
		return {
			toy: toyService.getEmptyToy(),
			txt: ''
		}
	},
	created() {
		const { toyId } = this.$route.params
		if (toyId) {
			this.getToy(toyId)
		}
	},
	methods: {
		async getToy(toyId) {
			try {
				const toy = await toyService.getById(toyId)
				this.toy = toy
			} catch {
				showErrorMsg('could not get toy details')
			}
		},
		async addMsg() {
			try {
				const msg = await toyService.addToyMsg(this.toy._id, this.txt)
				if (!this.toy.msgs) this.toy.msgs = []
				this.toy.msgs.push(msg)
				this.txt = ''
			} catch {
				showErrorMsg('could not add message')
			}
		},
		async removeMsg(msgId, idx) {
			try {
				await toyService.removeToyMsg(this.toy._id, msgId)
				this.toy.msgs.splice(idx, 1)
			} catch {
				showErrorMsg('could not remove message')
			}
		}
	},
	computed: {
		time() {
			const d = new Date(this.toy.createdAt)
			return d.toLocaleString()
		},
		user() {
			return this.$store.getters.user;
		}
	}
}
</script>

<template>
	<main class="toy-details">
		<h1>{{ toy.name }}</h1>
		<h3>${{ toy.price }}</h3>
		<h3>Created at {{ time }}</h3>
		<h3>{{ (toy.inStock) ? 'In stock!' : 'Not in stock' }}</h3>
		<ul class="label-list" v-if="toy.labels.length > 0">
			<li class="label-pill" v-for="label in toy.labels">
				{{ label }}
			</li>
		</ul>
		<section>
			<input type="text" v-model="txt" placeholder="add a message">
			<i v-if="user" @click="addMsg" class="fa-solid fa-plus"></i>
			<ul class="clean-list">
				<li class="toy-msg flex align-center" v-for="(msg, idx) in toy.msgs" :key="idx">
					<h4>{{ msg.by.fullname }} says: {{ msg.txt }}</h4>
					<i v-if="user?.isAdmin" @click="removeMsg(msg.id, idx)" class="fa-solid fa-x"></i>
				</li>
			</ul>
		</section>
		<RouterLink class="back-icon" to="/toy"><i class="fa-solid fa-arrow-left-long fa-2xl"></i></RouterLink>
	</main>
</template>