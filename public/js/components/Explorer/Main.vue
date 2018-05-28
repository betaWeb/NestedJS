<template>
    <section class="explorer__body">
        <aside class="explorer__tree">
            <List :list="collection"/>
        </aside>
        <article class="explorer__content">
            <div class="explorer__file_listing">
                <div class="file_listing__container" v-if="item !== null">
                    <div v-if="item.hasChildNodes()" v-for="(node, index) in item.childNodes()" :key="index" class="explorer__file" :title="node.name" @click="getContent(node)" :class="{'is-active': node.getId() === item.getId()}">
                        <i class="file__icon fa" :class="getFileClass(node)"></i>
                        <div class="file__name">{{ node.name }}</div>
                    </div>
                </div>
            </div>
            <div class="explorer__file_details">
                <div class="file_details__container" v-if="hasSelected">
                    <img class="details__image" v-if="selected.type === 'image'" :src="selected.url" :alt="selected.name">
                    <div v-else class="details__icon fa" :class="getFileClass(item)"></div>
                    <div class="details__info">
                        <h5 class="info__name">{{ selected.title }}</h5>
                        <span class="info__type">{{ selected.type }}</span>
                    </div>
                    <div class="details__credentials">
                        <h5 class="credentials__title">Infos</h5>
                        <table class="credentials__table">
                            <tr class="credentials__table__row">
                                <td class="credentials__table__row__title">Created</td>
                                <td class="credentials__table__row__value">{{ createdAt }}</td>
                            </tr>
                            <tr class="credentials__table__row">
                                <td class="credentials__table__row__title">Modified</td>
                                <td class="credentials__table__row__value">{{ createdAt }}</td>
                            </tr>
                            <tr v-if="selected.type === 'image'" class="credentials__table__row">
                                <td class="credentials__table__row__title">Dimensions</td>
                                <td class="credentials__table__row__value">{{ dimensions }}</td>
                            </tr>
                            <tr class="credentials__table__row">
                                <td class="credentials__table__row__title">Size</td>
                                <td class="credentials__table__row__value">{{ size }}</td>
                            </tr>
                            <tr v-if="selected.author" class="credentials__table__row">
                                <td class="credentials__table__row__title">Author</td>
                                <td class="credentials__table__row__value">{{ selected.author }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>

<script>
    import List from './Tree/List'
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "Main",
        components: {List},
        computed: {
            ...mapGetters(['collection', 'item', 'selected', 'hasSelected']),
            dimensions() {
                if (!this.selected || !this.selected.dimensions || this.selected.type !== 'image') return
                let dimensions = this.selected.dimensions
                return `${dimensions[0]} x ${dimensions[1]}`
            },
            size() {
                if (!this.selected || !this.selected.size) return
                let unit = 'Mo'
                let size = (1048576 / this.selected.size).toFixed(2)
                if (size < 1) {
                    unit = 'Ko'
                    size = Math.round(size * 1000)
                } else if (size >= 1000) {
                    unit = 'Go'
                    size = (size / 1000).toFixed(2)
                }
                return `${size} ${unit}`
            },
            createdAt() {
                if (!this.selected || !this.selected.created_at) return
                return this.date(this.selected.created_at)
            },
            updatedAt() {
                if (!this.selected || !this.selected.updated_at) return
                return this.date(this.selected.updated_at)
            },
        },
        methods: {
            ...mapActions(['instanciateTree', 'setItem', 'setSelectedFile']),
            getContent(item) {
                if (item.type === 'folder') this.setItem(item)
                else this.setSelectedFile(item)
            },
            getFileClass(item) {
                let icon = 'fa-'
                switch (item.type) {
                    case 'folder':
                        icon += 'folder'
                        break
                    case 'image':
                        icon += 'image'
                        break
                    case 'pdf':
                        icon += 'file-pdf'
                        break
                    default:
                        icon += 'file'
                        break
                }
                return icon
            },
            date(ts) {
                if (!ts) return ''
                let d = new Date(ts)
                let seconds = d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()
                let minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes()
                let hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours()
                let day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
                let month = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth()
                return `${day}/${month}/${d.getFullYear()} ${hours}:${minutes}:${seconds}`
            }
        },
        mounted() {
            let collection = require('../../collection')
            this.instanciateTree(collection)
        }
    }
</script>
