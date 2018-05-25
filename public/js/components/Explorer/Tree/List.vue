<template>
    <div class="explorer__list">
        <div v-if="list.length && item.type === 'folder'" v-for="item in list" :key="item.getId()" class="explorer__item" :style="{paddingLeft: paddingShift}">
            <Item :item="item"/>
            <List v-show="hasOpened(item)" :list="item.childNodes()" :depth="deepness"/>
        </div>
    </div>
</template>

<script>
    import Item from './Item'

    export default {
        name: "List",
        components: {Item},
        props: {
            list: {
                type: Array,
                default: function () {
                    return []
                }
            },
            depth: {
                type: Number,
                default: 0
            }
        },
        data () {
            return {
                opened: []
            }
        },
        computed: {
            deepness() {
                let depth = this.depth
                return depth += 1
            },
            paddingShift() {
                return `${10 * this.depth}px`
            }
        },
        methods: {
            hasOpened(item) {
                return this.opened.includes(item.getId())
            },
            addOpened(item) {
                if (this.hasOpened(item)) return
                this.opened.push(item.getId())
            },
            removeOpened(item) {
                if (!this.hasOpened(item)) return
                this.opened = this.opened.filter(id => id !== item.getId())
            }
        },
        mounted() {
            this.$on('nested.tree.children', data => {
                if (data.opened === false) this.addOpened(data.item)
                else this.removeOpened(data.item)
            })
        }
    }
</script>

<style scoped>

</style>