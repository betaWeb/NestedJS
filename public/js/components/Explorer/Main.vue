<template>
    <section class="explorer__body">
        <aside class="explorer__tree">
            <List :list="collection"/>
        </aside>
        <Explorer/>
    </section>
</template>

<script>
    import List from './Tree/List.vue'
    import Explorer from './Explorer.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Main",
        components: {List, Explorer},
        computed: mapGetters(['collection']),
        methods: mapActions(['setItem', 'setSelectedFile'])
    }
</script>
