<template>
  <div class="default" ref="default" @scroll="setButton($event, '哈哈哈')">
      <div ref="top">
          <main-title>
              今日天气信息{{ globalData.getter('token') }}
              <template v-slot:sub>
                  野心和实力是对等的，在没有实力的时候谈野心，前方等待你的只会是万劫不复。
              </template>
          </main-title>
          <!-- <tab-header :title="msg" color="red" />
          <tab-header title="这是第二个父亲传递的" color="green" /> -->
      </div>
      <div class="body">
          <main-body></main-body>
          <!-- <tab-body>
              <template v-slot:header="slotProp">
                  <h1>{{ slotProp.user.name }}</h1>
              </template>
              <template v-slot:header="{ user }">
                  <h1>{{ user.name }}</h1>
              </template>
          </tab-body> -->
      </div>
      <div v-show="needTopBtn" class="back"><el-button type="primary" @click="returnTop">回顶部</el-button></div>
  </div>
</template>
<script>
import MainTitle from './MainTitle.vue'
import MainBody from './MainBody.vue'
import { state } from '@/store/index'
export default {
  name: 'DefaultTab',
  components: {
      MainTitle,
      MainBody
  },
  data: function () {
      return {
          needTopBtn: false,
          msg: '这是绑定在slot当中的父组件的变量',
          globalData: state,
      }
  },
  mounted() {
      console.log(this.globalData)
      // 原生的事件绑定
      // this.$refs.default.addEventListener('scroll', this.setButton)
      // this.$refs.default.onscroll = this.setButton
  },
  methods: {
      returnTop() {
          this.$refs.top.scrollIntoView(true, {
              behavior: 'smooth'
          });
      },
      setButton(e, name) {
          // 可优化
          // if (this.$refs.default.scrollTo > 0) {
          //     this.needTopBtn = true;
          // } else {
          //     this.needTopBtn = false;
          // } 
          // 和上面的逻辑等价
          // 对于原生的变量，如何监听变化呢？
          console.log(e, name)
          // if (this.$refs.default.scrollTop > 0) {
          if (e.target.scrollTop > 0) {
              this.needTopBtn = true
          } else {
              this.needTopBtn = false
          }
          // this.needTopBtn = e.target.scrollTop > 0;
      }
  },
  destroyed() {
      // this.$refs.default.removeEventListener('scroll', this.setButton);
      // this.$refs.default.onscroll = null;
  }
}
</script>
<style lang="scss" scoped>
.back {
  position: fixed;
  right: 40px;
  bottom: 40px;
}

.default {
  height: 100%;
  overflow-y: auto;
  padding: 0 20px;
}
</style>