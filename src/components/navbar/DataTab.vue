<template>
    <div>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-jihua"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huodong"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-saoma"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-fasong"></use>
        </svg>
        <el-input v-model="aimValue"></el-input>
        <el-button @click="change">点我变更状态</el-button>
        sentence<div>{{ $store.state.sentence }}</div>
        <img v-for="(url, index) in imgUrls" :src="url" :key="index" />
        <file-upload></file-upload>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import FileUpload from './FileUpload.vue'
export default {
    name: 'DataTab',
    components: {
        FileUpload
    },
    data: function () {
        return {
            aimValue: ''
        }
    },
    computed: {
        ...mapGetters(['imgUrls'])
    },
    methods: {
        ...mapMutations(['changeSentence']),
        change() {
            // mutation中的函数需要使用commit方法调用，带上payload
            this.changeSentence({ name: this.aimValue })
            console.log(this.imgUrls)
            console.log(mapGetters(['imgUrls']))
        }
    }
}
</script>