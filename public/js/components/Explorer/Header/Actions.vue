<template>
    <div class="nav__actions">
        <div class="actions__left">
            <button class="action__button action__prev" @click="getParentItem()"><i class="fa fa-arrow-left"></i></button>
            <button class="action__button action__next"><i class="fa fa-arrow-right"></i></button>
            <button class="action__button action__undo"><i class="fa fa-undo"></i></button>
        </div>
        <div class="actions__right">
            <button class="action__button action__up" @click="getRootItem()"><i class="fa fa-arrow-up"></i></button>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    export default {
        name: "Actions",
        methods: {
            ...mapActions(['setItem']),
            getParentItem() {
                this.setItem(this.parentItem)
            },
            getRootItem() {
                this.setItem(this.rootItem)
            }
        },
        computed: {
            ...mapGetters(['parentItem', 'rootItem'])
        }
    }
</script>

<style scoped>

</style>