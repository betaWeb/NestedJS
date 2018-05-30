<template>
    <header class="explorer__header">
        <div class="header__title">
            <i class="header__logo fa fa-folder"></i> {{ title }}
        </div>
        <div class="header__actions">
            <button class="action__maximize" @click="toggleMaximize()">
                <i class="fa fa-expand-arrows-alt"></i>
            </button>
        </div>
    </header>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "Header",
        data() {
            return {
                title: 'NestedJS File Explorer'
            }
        },
        methods: mapActions(['toggleMaximize'])
    }
</script>
