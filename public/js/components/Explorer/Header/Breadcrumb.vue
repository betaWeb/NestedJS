<template>
    <div class="nav__breadcrumb">
        <div class="breadcrumb__content">
            <div v-if="breadcrumb.length" v-for="(node, index) in breadcrumb" :key="node.getId()" class="breadcrumb__item">
                <span @click="goTo(node)" class="breadcrumb__name" :class="{'selected': isLast(index)}">{{ node.name }}</span>
                <i v-if="!isLast(index)" class="breadcrumb__icon fa fa-angle-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "Breadcrumb",
        methods: {
            ...mapActions(['setItem']),
            isLast(index) {
                return index === this.breadcrumb.length - 1
            },
            goTo(node) {
                this.setItem(node)
            }
        },
        computed: {
            ...mapGetters(['breadcrumb'])
        }
    }
</script>
