<template>
    <div :style="{ color: color }" :class="{container: isBig}">{{ title }}</div>
</template>
<script>
export default {
    name: 'TabHeader',
    props: ['title', 'color'],
    data: function() {
        return {
            colorFul: 'blue',
            isBig: false
        }
    },
    mounted() {
        setTimeout(() => {
            this.colorFul = 'red'
            // this.isBig = true // 动态变更class
        }, 3000)
    }
}
</script>
<style lang="scss" scoped>
.container {
    font-size: 40px;
    font-weight: 700;
}
</style>