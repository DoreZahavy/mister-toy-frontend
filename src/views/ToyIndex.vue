<script>
import { showErrorMsg, showSuccessMsg } from '@/services/event-bus.service.js'
import ToyList from '@/components/ToyList.vue'
import ToyFilter from '@/components/ToyFilter.vue'
import Spinner from '@/components/Spinner.vue'



export default {
    data() {
        return {}
    },
    components: {
        ToyList,
        ToyFilter,
        Spinner
    },
    methods: {
        async removeToy(toyId) {
            try {
                await this.$store.dispatch({ type: 'removeToy', toyId })
                showSuccessMsg(`Toy removed`)
            } catch {
                showErrorMsg(`Couldn't remove toy`)
            }

        },
        setFilter(filterBy) {
            this.$store.dispatch({ type: 'setFilter', filterBy })

        },
        getPage(dir) {
            this.$store.dispatch({ type: 'changePage', dir })

        },
        changeSortDir(sort) {
            this.$store.dispatch({ type: 'sortDir', sort })
        }
    },
    computed: {
        toys() { return this.$store.getters.toys },
        maxPageCount() {
            return this.$store.getters.maxPageCount
        },
        pageIdx() {
            return this.$store.getters.pageIdx
        },
        currPage() {
            return `${this.pageIdx + 1} / ${this.maxPageCount}`
        },
        user() {
            return this.$store.getters.user;
        }

    },
}
</script>

<template>
    <section v-if="toys" class="toy-index router-view">
        <ToyFilter @filter="setFilter" @direction="changeSortDir" />
        <RouterLink v-if="user?.isAdmin" class="add-btn" to="/toy/edit">Add a toy</RouterLink>

        <section class="toy-carousel">
            <i @click="getPage(-1)" :disabled="!pageIdx" class="fa-solid fa-caret-left fa-3x"></i>
            <ToyList :toys="toys" @remove="removeToy" />
            <i @click="getPage(1)" :disabled="pageIdx + 1 === maxPageCount" class="fa-solid fa-caret-right fa-3x"></i>
        </section>

        <p class="pagination">{{ currPage }}</p>
        <!-- <section class="pagination"> -->
        <!-- <button @click="getPage(-1)" :disabled="!pageIdx"><img src='../assets/svg/caret-left.svg' alt=""></button> -->
        <!-- <button @click="getPage(1)" :disabled="pageIdx + 1 === maxPageCount">Next</button> -->
        <!-- </section> -->
    </section>
    <section v-else class="Spinner">
        <Spinner />
    </section>
</template>