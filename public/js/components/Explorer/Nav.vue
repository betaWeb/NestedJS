<template>
    <nav class="explorer__nav">
        <Actions/>
        <Breadcrumb/>
        <Search/>
    </nav>
</template>

<script>
    import Actions from './Header/Actions'
    import Breadcrumb from './Header/Breadcrumb'
    import Search from './Header/Search'

    export default {
        name: "Nav",
        components: {Actions, Breadcrumb, Search}
    }
</script>
