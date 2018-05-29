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
    import Header from './Explorer/Header'
    import Nav from './Explorer/Nav'
    import Main from './Explorer/Main'
    import {mapActions} from 'vuex'

    export default {
        name: "App",
        components: {Header, Nav, Main},
        methods: mapActions(['instanciateTree']),
        mounted() {
            let collection = require('../collection')
            this.instanciateTree(collection)
        }
    }
</script>
