<script>
import { utilService } from '@/services/util.service.js'

export default {
    data() {
        return {
            options: [
                {
                    value: 'on wheels',
                    label: 'On wheels',
                },
                {
                    value: 'box game',
                    label: 'Box game',
                },
                {
                    value: 'art',
                    label: 'Art',
                },
                {
                    value: 'baby',
                    label: 'Baby',
                },
                {
                    value: 'doll',
                    label: 'Doll',
                },
                {
                    value: 'puzzle',
                    label: 'Puzzle',
                },
                {
                    value: 'outdoor',
                    label: 'Outdoor',
                },
                {
                    value: 'battery powered',
                    label: 'Battery powered',
                },
            ],
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
}
</script>

<template>
    <section class="toy-filter">
        <div class="m-4 label-filter">
            <legend>Labels</legend>
            <el-select v-model="filterBy.labels" multiple collapse-tags collapse-tags-tooltip placeholder="Select"
                style="width: 240px">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <legend>Name</legend>
            <el-input type="search" v-model="filterBy.name" placeholder="search" style="width: 240px" clearable />
        </div>
        <div class="more-filter">
            <legend>Stock</legend>
            <select v-model="filterBy.stock">
                <option value="all">all</option>
                <option value="yesStock">In stock</option>
                <option value="noStock">Not in stock</option>
            </select>
            <legend>Sort by</legend>
            <select v-model="filterBy.sortBy">
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created</option>
            </select>
            <i @click="changeSortDir" class="fa-solid fa-sort"></i>
        </div>
    </section>
</template>