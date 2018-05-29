<template>
    <div class="explorer__wrapper">
        <div class="explorer__container">
            <Header/>
            <Nav/>
            <Main/>
        </div>
    </div>
</template>

<script>
    import Header from './Explorer/Header.vue'
    import Nav from './Explorer/Nav.vue'
    import Main from './Explorer/Main.vue'
    import {mapActions} from 'vuex'
    import collection from '../collection.json'

    export default {
        name: "App",
        components: {Header, Nav, Main},
        methods: mapActions(['instanciateTree']),
        mounted() {
            this.instanciateTree(collection)
        }
    }
</script>
