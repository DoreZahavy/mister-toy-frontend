
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
    },
    computed: {
        user() {
            return this.$store.getters.user;
        }
    },
}
</script>

<template>
    <ul class="toy-list">
        <li v-for="toy in toys" :key="toy._id" class="toy-card">
            <ToyPreview :toy="toy" />
            <section class="actions">
                <RouterLink :to="'/toy/' + toy._id"><i class="fa-solid fa-circle-info"></i></RouterLink>
                <RouterLink v-if="user?.isAdmin" :to="'/toy/edit/' + toy._id"><i class="fa-solid fa-pen-to-square"></i></RouterLink>
                <i v-if="user?.isAdmin" @click="removeToy(toy._id)" class="fa-sharp fa-solid fa-trash"></i>
                <!-- <button @click="removeToy(toy._id)">x</button> -->
            </section>
        </li>
    </ul>
</template>