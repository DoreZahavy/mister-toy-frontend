<script>
import { utilService } from '@/services/util.service.js'


export default {
    data() {
        return {
            filterBy: { sortBy: 'name', name: '', stock: 'all', labels: [] },

        }
    },
    created() {
        this.filter = utilService.debounce(() => {
            this.$emit('filter', { ...this.filterBy, pageIdx: 0, sortDir: 1 })
        }, 450)
    },
    watch: {
        filterBy: {
            handler() {
                this.filter()
            },
            deep: true,
        },
    },
    methods: {
        changeSortDir() {
            this.$emit('direction', this.filterBy.sortBy)
        }
    },
    components: {
    }
}
</script>

<template>
    <section class="toy-filter">

        <div class="label-filter">
            <legend>Labels</legend>
            <select v-model="filterBy.labels" multiple>
                <option>On wheels</option>
                <option>Box game</option>
                <option>Art</option>
                <option>Baby</option>
                <option>Doll</option>
                <option>Puzzle</option>
                <option>Outdoor</option>
                <option>Battery powered</option>
            </select>
        </div>

        <div class="more-filter">
            <legend>Name</legend>
            <input type="search" v-model="filterBy.name" />

            <legend>Stock</legend>
            <select v-model="filterBy.stock">
                <option value="all">all</option>
                <option value="yesStock">In stock</option>
                <option value="noStock">Not in stock</option>
            </select>

            <legend>Sort</legend>
            <select v-model="filterBy.sortBy">
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="created">Created</option>
            </select>
            <i @click="changeSortDir" class="fa-solid fa-sort"></i>
            <!-- <button @click="changeSortDir">SortDir</button> -->
        </div>

    </section>
</template>