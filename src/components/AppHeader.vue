<script>
export default {
    data() {
        return {}
    },
}
</script>

<template>
    <header class="header main-layout full">
        <section class="flex inline-flex space-between align-center">

            <div class="logo"><img src="@/assets/img/logo.png"></div>
            <nav class="nav-bar">
                <RouterLink to="/user"><i class="fa-solid fa-user"></i></RouterLink>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/dashboard">Dashboard</RouterLink>
                <RouterLink to="/toy">Toys</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </section>
    </header>
</template>
