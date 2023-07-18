

<script>
import ToyPreview from '@/components/ToyPreview.vue'
export default {
    props: ['toys'],
    data() {
        return {}
    },
    components: {
        ToyPreview
    },
    methods: {
        removeToy(toyId) {
            this.$emit('remove', toyId)
        }
    }
}
</script>

<template>
    <section class="toy-list">
        <ul>
            <li v-for="toy in toys">
                <ToyPreview :toy="toy" />
                <section class="actions">
                    <!-- <button @click="addToCart(toy)">Add to Cart</button>
                        <button @click="updateToy(toy)">Edit</button> -->
                    <RouterLink :to="'/toy/'+toy._id">Details</RouterLink>
                    <RouterLink :to="'/toy/edit/'+toy._id">Edit</RouterLink>
                    <button @click="removeToy(toy._id)">x</button>
                </section>
            </li>
        </ul>
    </section>
</template>