<template>
    <div class="explorer__file_details">
        <div class="file_details__container" v-if="hasSelected">
            <img class="details__image" v-if="selected.type === 'image'" :src="selected.url" :alt="selected.name">
            <div v-else class="details__icon" :class="icon(selected)"></div>
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
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "Details",
        methods: {
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
        computed: {
            ...mapGetters(['selected', 'hasSelected', 'icon']),
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
    }
</script>

<style scoped>

</style>