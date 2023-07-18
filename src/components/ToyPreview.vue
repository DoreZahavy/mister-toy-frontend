<script>
export default {
    props: ['toy'],
    data() {
        return {}
    },
}
</script>

<template>
    <article class="toy-preview">
        <h3>{{ toy.name }}</h3>
        <h4>{{ toy.price }}</h4>
    </article>
</template>