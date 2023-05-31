<template>
    <div class="container">
        <div>
            <el-input v-model="city" />
            <el-button @click="getWeather">查询</el-button>
        </div>
        <el-table stripe :data="tableData">
            <el-table-column prop="name" label="天气条目"></el-table-column>
            <el-table-column prop="property" label="key值"></el-table-column>
            <el-table-column prop="value" label="现状">
                <template v-slot:default="scope">
                    <img :src="imgFormatByPublic(scope.row.value)" v-if="scope.row.property === 'img'" />
                    <div v-else>{{ scope.row.value }}</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { http } from '@/utils/http'
const keyMap = {
    img: '天气图片',
    city: '城市',
    cityid: '城市ID',
    citycode: '城市代码',
    date: '日期',
    humidity: '湿度'

}
export default {
    name: 'MainBody',
    data: function () {
        return {
            tableData: [],
            city: '',
            // 如果以变量的形式传递路径，并且路径在src/assets下，需要将
            // 路径用require包裹
            imgUrl: require('@/assets/weather-img/0.png')
        }
    },
    methods: {
        imgFormat(imgNum) {
            return require(`@/assets/weather-img/${imgNum}.png`)
        },
        imgFormatByPublic(imgNum) {
            return `/weather-img/${imgNum}.png`
        },
        view(scope) {
            console.log(scope)
            return '啦啦啦'
        },
        async getWeather() {
            // 白名单
            const removeKey = ['index', 'aqi', 'daily', 'hourly', 'week']
            const { data } = await http.get('/weather/query', { params: { city: this.city } });
            console.log(data.result)
            const tmp = []
            Object.entries(data.result).forEach(([key, value]) => {
                console.log(key, value)
                if (!removeKey.includes(key)) {
                    tmp.push({ property: key, value, name: keyMap[key] || '待完成' })
                }
            })
            this.tableData = tmp;
        }
    }
}
</script>
<style lang="scss" scoped>
.container {}
</style>