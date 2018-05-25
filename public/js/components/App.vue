<template>
    <div class="explorer__wrapper">
        <div class="explorer__container">
            <Header />
            <Nav />
            <Main />
        </div>
    </div>
</template>

<script>
    import Header from './Explorer/Header'
    import Nav from './Explorer/Nav'
    import Main from './Explorer/Main'
    export default {
        name: "App",
        components: { Header, Nav, Main }
    }
</script>
