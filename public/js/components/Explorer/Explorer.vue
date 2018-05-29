<template>
    <article class="explorer__content">
        <div class="explorer__file_listing">
            <div class="file_listing__container" v-if="item !== null">
                <div v-if="item.hasChildNodes()" v-for="(node, index) in item.childNodes()" :key="index"
                     class="explorer__file" :title="node.name" @click="getContent(node)"
                     :class="{'active': hasSelected && node.getId() === selected.getId()}">
                    <div v-if="node.type === 'image'" class="file__thumbnail"
                         :style="{backgroundImage: 'url(' + node.url + ')'}"></div>
                    <i v-else class="file__icon" :class="icon(node)"></i>
                    <div class="file__name">{{ node.name }}</div>
                </div>
            </div>
        </div>
        <Details/>
    </article>
</template>

<script>
    import Details from './Details.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "Explorer",
        components: {Details},
        computed: mapGetters(['item', 'selected', 'hasSelected', 'icon']),
        methods: {
            ...mapActions(['setItem', 'setSelectedFile']),
            getContent(item) {
                if (item.type === 'folder') this.setItem(item)
                else this.setSelectedFile(item)
            }
        }
    }
</script>

<style scoped>

</style>