<template>
    <section class="explorer__body">
        <aside class="explorer__tree">
            <List :list="collection"/>
        </aside>
        <article class="explorer__content">
            <div class="explorer__file_listing">
                <div class="file_listing__container" v-if="content !== null">
                    <div v-if="content.hasChildNodes()" v-for="(node, index) in content.childNodes()" :key="index" class="explorer__file" :title="node.name" @click="getContent(node)" :class="{'is-active': node.getId() === active}">
                        <i class="file__icon fa" :class="getFileClass(node)"></i>
                        <div class="file__name">{{ node.name }}</div>
                    </div>
                </div>
            </div>
            <div class="explorer__file_details">
                <div class="file_details__container" v-if="details !== null">
                    <img class="details__image" v-if="details.type === 'image'" :src="details.url" :alt="details.name">
                    <div v-else class="details__icon fa" :class="getFileClass(details)"></div>
                    <div class="details__info">
                        <h5 class="info__name">{{ details.title }}</h5>
                        <span class="info__type">{{ details.type }}</span>
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
                            <tr v-if="details.type === 'image'" class="credentials__table__row">
                                <td class="credentials__table__row__title">Dimensions</td>
                                <td class="credentials__table__row__value">{{ dimensions }}</td>
                            </tr>
                            <tr class="credentials__table__row">
                                <td class="credentials__table__row__title">Size</td>
                                <td class="credentials__table__row__value">{{ size }}</td>
                            </tr>
                            <tr v-if="details.author" class="credentials__table__row">
                                <td class="credentials__table__row__title">Author</td>
                                <td class="credentials__table__row__value">{{ details.author }}</td>
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

    export default {
        name: "Main",
        components: {List},
        data() {
            return {
                collection: [],
                content: null,
                details: null,
                active: null
            }
        },
        computed: {
            dimensions() {
                if (!this.details || !this.details.dimensions || this.details.type !== 'image') return
                let dimensions = this.details.dimensions
                return `${dimensions[0]} x ${dimensions[1]}`
            },
            size() {
                if (!this.details || !this.details.size) return
                let unit = 'Mo'
                let size = (1048576 / this.details.size).toFixed(2)
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
                if (!this.details || !this.details.created_at) return
                return this.date(this.details.created_at)
            },
            updatedAt() {
                if (!this.details || !this.details.updated_at) return
                return this.date(this.details.updated_at)
            },
        },
        methods: {
            getContent(item) {
                if (this.details === item) return
                this.details = null
                this.active = null
                if (item.type === 'folder') this.setContent(item)
                else {
                    this.details = item
                    this.active = item.getId()
                }
            },
            setContent(content) {
                if (this.content !== null && content !== null && this.content.getId() === content.getId()) return
                this.content = content
                this.$root.$emit('nested.breadcrumb', { breadcrumb: this.content.breadcrumb() })
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
            this.collection = (new Nested(collection)).data
            this.$root.$on('nested.tree.item.content', data => {
                this.setContent(data.item || null)
            })
        }
    }
</script>
