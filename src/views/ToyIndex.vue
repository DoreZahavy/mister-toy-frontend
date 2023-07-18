<script>
import {showErrorMsg,showSuccessMsg} from '@/services/event-bus.service.js'
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
        removeToy(toyId) {
            this.$store.dispatch({ type: 'removeToy', toyId })
                .then(() => showSuccessMsg(`Toy ${toyId} removed`))
                .catch(() => showErrorMsg(`Couldn't remove toy ${toyId}`))
        },
        setFilter(filterBy) {
            this.$store.dispatch({ type: 'setFilter', filterBy })

        },
        getPage(dir) {
            this.$store.dispatch({ type: 'changePage', dir })
            
        },
        changeSortDir(sort){
            this.$store.dispatch({type:'sortDir',sort})
        }
    },
    computed: {
        toys() { return this.$store.getters.toys },
        maxPageCount() {
            return this.$store.getters.maxPageCount
        },
        pageIdx(){
            return this.$store.getters.pageIdx
        },
        currPage() {
			return `${this.pageIdx + 1} / ${this.maxPageCount}`
		}

    },
}
</script>

<template>
    <section v-if="toys" class="shop-page router-view">
        <h1>The Shop</h1>
        <ToyFilter @filter="setFilter" @direction="changeSortDir"/>
        <RouterLink to="/toy/edit">Add a toy</RouterLink>
        <ToyList :toys="toys" @remove="removeToy" />
        <section class="pagination">
            <button @click="getPage(-1)" :disabled="!pageIdx">Prev</button>
            <p>{{ currPage }}</p>
            <button @click="getPage(1)" :disabled="pageIdx + 1 === maxPageCount">Next</button>
        </section>
    </section>
    <section v-else class="Spinner">
        <Spinner />
    </section>
</template>