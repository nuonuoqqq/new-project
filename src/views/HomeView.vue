<template>
  <!-- 0.v-bind -->
  <div class="page">
    <div class="bg-video">
      <video src="../assets/HomeVideo.mp4" autoplay loop></video>
    </div>
    <div class="container">
      <!-- <ChildComp></ChildComp> -->
      <!-- <div class="desc"></div> -->
      <div class="login">
        <div class="login-wrapper">
          <el-form :model="form" label-width="80px">
            <el-form-item :label="$t('msg.name')">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('msg.email')">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item :label="$t('msg.passwd')">
              <el-input v-model="form.passwd" show-password></el-input>
            </el-form-item>
          </el-form>
          <div class="operator">
            <el-button size="small" @click="login" :disabled="canLogin">{{ $t("msg.login") }}</el-button>
            <el-select v-model="selectedLang" placeholder="请选择语言" @change="changeLang">
              <el-option v-for="(lang, index) in langArr" :label="lang.label" :value="lang.value"
                :key="index"></el-option>
              <!-- <el-option label="中文站" value="zh"></el-option>
              <el-option label="英文站" value="en"></el-option> -->
            </el-select>
            <el-date-picker v-model="date" type="date" placeholder="选择日期">
            </el-date-picker>
            <!-- <el-input v-model="globalData.token"></el-input> -->
            {{ globalData.getter('token') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/store.js'
import { state } from '@/store/index'
import {http} from '@/utils/http'

export default {
  // 预定义属性
  name: 'HomeView',
  // 组件当中所有的响应式数据
  data: function () {
    return {
      form: {
        name: '',
        email: '',
        passwd: '',
      },
      date: '',
      isShowChild: true,
      pInfo: '这是用来设置默认的input框的值',
      langArr: [
        { label: '中文站', value: 'zh' },
        { label: '英文站', value: 'en' }
      ],
      selectedLang: '',
      globalData: state // store模式具有响应式的原因
    }
  },
  mounted() {
    console.log(this.globalData)
    setTimeout(() => this.globalData.commit('token', 'vuex', 'HomeView'), 4000)
  },
  destroyed() {
    console.log('销毁了')
  },
  computed: {
    canLogin() {
      const { email, name, passwd } = this.form;
      return !(email && name && passwd);
      // if (this.form.email && this.form.name && this.form.passwd) {
      //   return false;
      // } else {
      //   return true
      // }
    }
  },
  // 方法
  methods: {
    changeLang(lang) {
      console.log(this.$i18n.locale, this.$root.$i18n.locale)
      this.$i18n.locale = lang
      // TODO: 更改国际化语言
    },
    async login() {
      // console.log(this.$router)
      // 提供 isAuthenticated
      // TODO: 网络请求
      const result = await http.post('/login', {username: this.form.name, password: this.form.passwd, email: this.form.email})
      const data = result.data;
      if (data.success) {
        console.log(data)
        const token = data.data.token;
        sessionStorage.setItem('token', token)
        this.$router.push({ path: `main/${this.form.name}`, query: { email: this.form.email } })
      } else {
        this.$message('失败')
      }
      console.log(result)
      // const token = await getToken()
      // this.$router.push({ path: `main/${this.form.name}`, query: { email: this.form.email } })
      // router.push({path: 'about'})
      // store.push(this.form)
      // console.log(store)
    },
  }
}
</script>


<style lang="scss" scoped>
/**
使用了scoped关键字，当前样式只应用于此组件以及子组件，不会影响父组件
*/
.container {
  display: flex;
}

.operator {
  display: flex;
  justify-content: center;
}

.desc {
  width: 60%;
}

.login {
  padding-top: 150px;

  .login-wrapper {
    background-color: #fff;
    width: 300px;
    padding: 40px;
    border-radius: 10px;
  }
}

.bg-video {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  video {
    width: 100%;
  }
}
</style>
