<template>
    <div class="explorer__item" :class="{'opened': opened}">
        <i @click="getChildren()" class="item__caret fa fa-caret-right"></i>
        <a @click="displayContent(item)" class="item__content">
            <i class="item__icon fa fa-folder"></i>
            <span class="item__name">{{ item.name }}</span>
        </a>
    </div>
</template>

<script>
    export default {
        name: "Item",
        props: {
            item: {
                type: Object,
                default: {}
            }
        },
        data () {
            return {
                opened: false
            }
        },
        methods: {
            getChildren() {
                this.$parent.$emit('nested.tree.children', { item: this.item, opened: this.opened })
                this.opened = !this.opened
            },

            displayContent() {
                this.$root.$emit('nested.tree.item.content', { item: this.item })
            }
        }
    }
</script>

<style scoped>

</style>