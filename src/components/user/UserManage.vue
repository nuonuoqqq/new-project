<template>
    <div>
        <el-form :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"></el-input>
            </el-form-item>
        </el-form>
        <el-button @click="sumbit">提交</el-button>
    </div>
</template>
<script>
import {http} from '@/utils/http'
export default {
    name: 'UserManage',
    data: function() {
        return {
            form: {
                username: '',
                password: '',
                email: '',
                phone: ''
            }
        }
    },
    methods: {
        async sumbit() {
            const result = await http.post('/user/add', this.form);
            console.log('user', result)
        }
    }
}
</script>