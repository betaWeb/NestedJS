<template>
    <div class="explorer__wrapper" :class="{'full-width': windowMaximized}">
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
    import {mapActions, mapGetters} from 'vuex'
    import collection from '../collection.json'

    export default {
        name: "App",
        components: {Header, Nav, Main},
        methods: mapActions(['instanciateTree']),
        computed: mapGetters(['windowMaximized']),
        mounted() {
            this.instanciateTree(collection)
        }
    }
</script>
