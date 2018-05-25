<template>
    <header class="explorer__header">
        <div class="header__title">
            <i class="header__logo fa fa-folder"></i> {{ title }}
        </div>
    </header>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                title: 'NestedJS File Explorer'
            }
        }
    }
</script>
