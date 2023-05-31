<template>
    <div>
        <el-button @click="openInput">选择单文件</el-button>
        <input ref="visible" class="input-layout" type="file" @change="getFileInfo($event)" />
        <el-button @click="upload">上传</el-button>
        <el-carousel v-show="urls.length !== 0">
            <el-carousel-item v-for="url in urls" :key="url">
                <img :src="url" />
            </el-carousel-item>
        </el-carousel>
        <hr />
        <el-button @click="openMulti">选择多个文件</el-button>
        <input multiple ref="multi" class="input-layout" type="file" @change="getMulFile($event)" />
        <el-button @click="uploadMultiTogether">点击上传{{ fileList.length }}文件</el-button>
    </div>
</template>
<script>
import { http } from '@/utils/http'
export default {
    name: "FileUpload",
    data: function () {
        return {
            // 是一个File对象，继承自Blob
            file: null,
            urls: [],
            fileList: [],
        }
    },
    methods: {
        // 序列化上传
        async uploadMultiSeq() {
            for (let i = 0; i < this.fileList.length; i++) {
                const data = new FormData()
                data.append('file', this.fileList[i])
                const { data: result } = await http.post('/upload', /**放file文件 */data)
                this.urls.push(result.data.netUrl)
                console.log(result)
            }
            // 一次性上传
        },
        async uploadMultiTogether() {
            // 没办法知道哪个请求最后完成
            // this.fileList.forEach(async (file) => {
            //     const data = new FormData()
            //     data.append('file', file)
            //     const { data: result } = await http.post('/upload', /**放file文件 */data)
            //     this.urls.push(result.data.netUrl)
            // })
            // promise.all
            const asyncTask = []
            this.fileList.forEach((file) => {
                const data = new FormData()
                data.append('file', file)
                // 好好思考
                const task = http.post('/upload', /**放file文件 */data)
                asyncTask.push(task)
            })
            const result = await Promise.all(asyncTask)
            console.log(result)
            //同时拿到两个netUrl
        },
        async uploadMulti() {
            const allData = new FormData()
            this.fileList.forEach((file, index) => {
                allData.append(`multi${index}`, file)
            })
            // 一次性上传
            const { data: result } = await http.post('/upload/multi', /**放file文件 */allData)
            this.urls = result.data.urls;
        },
        openMulti() {
            this.$refs.multi.click();
        },
        getMulFile(event) {
            console.log(typeof event.target.files[0])
            console.log(event.target.files)
            // array-like object
            Array.prototype.forEach.call(event.target.files, file => this.fileList.push(file))
            // event.target.files.forEach(file => this.fileList.push(file))
            console.log(this.fileList)
        },
        openInput() {
            this.$refs.visible.click();
        },
        getFileInfo(event) {
            // 1.通过input type="file"获取到用户上传的文件信息
            this.file = event.target.files[0]
            console.log(this.file)
        },
        async upload() {
            // form-data
            // 2.构造http请求体，FormData刚好满足传输文件(content-type：multipart/form-data)
            const formData = new FormData();
            formData.append('name', 'zht')
            // 此处的key file，是后端取文件信息时的key
            formData.append('file', this.file)
            // 3.直接将formdata 放置axios post方法的参数中
            const { data: result } = await http.post('/upload', /**放file文件 */formData)
            console.log(result.data.netUrl)
            this.urls.push(result.data.netUrl)
        }
    }
}
</script>
<style lang="scss">
.input-layout {
    height: 0;
    width: 0;
}
</style>