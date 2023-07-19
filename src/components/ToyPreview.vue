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
        <h2>{{ toy.name }}</h2>
        <h4>${{ toy.price }}</h4>
    </article>
</template>