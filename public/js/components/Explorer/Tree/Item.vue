<template>
    <div class="explorer__item" :class="{'opened': opened, 'active': isActive}">
        <div class="item__wrapper" :style="{marginLeft: paddingShift}">
            <i @click="getChildren()" class="item__caret fa fa-caret-right"></i>
            <a @click="displayContent()" class="item__content">
                <i class="item__icon fa fa-folder"></i>
                <span class="item__name">{{ node.name }}</span>
            </a>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Item",
        props: {
            node: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                opened: false
            }
        },
        computed: {
            ...mapGetters(['item']),
            isActive() {
                return this.item !== null && this.item.getId() === this.node.getId()
            },
            paddingShift() {
                return `${10 * (this.node.depth() + 1)}px`
            }
        },
        methods: {
            ...mapActions(['toggleOpened', 'setItem']),
            getChildren() {
                this.toggleOpened(this.node.getId())
                this.opened = !this.opened
            },

            displayContent() {
                this.setItem(this.node)
            }
        }
    }
</script>

<style scoped>

</style>