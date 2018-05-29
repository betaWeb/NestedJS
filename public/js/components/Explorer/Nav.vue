<template>
    <nav class="explorer__nav">
        <Actions/>
        <Breadcrumb/>
        <Search/>
    </nav>
</template>

<script>
    import Actions from './Header/Actions.vue'
    import Breadcrumb from './Header/Breadcrumb.vue'
    import Search from './Header/Search.vue'

    export default {
        name: "Nav",
        components: {Actions, Breadcrumb, Search}
    }
</script>
