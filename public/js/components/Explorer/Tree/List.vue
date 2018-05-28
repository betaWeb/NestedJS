<template>
    <div class="explorer__list">
            <div v-if="list.length && node.type === 'folder'" v-for="node in list" :key="node.getId()" class="explorer__item" :class="{'root__item': !node.hasRootNode()}">
            <Item :node="node"/>
            <List v-show="$store.getters.hasOpened(node.getId())" :list="node.childNodes()"/>
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
            }
        }
    }
</script>
