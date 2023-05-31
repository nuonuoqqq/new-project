<template>
  <div class="aside-container">
    <el-menu :default-active="activeFlag" @select="active">
      <el-menu-item index="0" :route="{ path: '/main/default' }">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="1">
        <i class="el-icon-document"></i>
        <span slot="title">数据管理</span>
      </el-menu-item>
      <!-- <div style="height: 60px"></div> -->
    </el-menu>
    <div class="aside-footer">@2023</div>
  </div>
</template>
<script>
export default {
  name: "AsideCop",
  data: function () {
    return {
      activeFlag: "0",
      routerMap: new Map()
    };
  },
  mounted(){
    console.log('导航栏',this.$route.params)
    const pathVal = this.$route.params.userId;
    this.routerMap.set('0', `/main/${pathVal}/default`)
    this.routerMap.set('1', `/main/${pathVal}/data`)
  },
  methods: {
    active(index) {
      this.activeFlag = index;
      console.log(typeof index);
      if (this.routerMap.has(index)) {
        //防止目标url与当前url相同时，push出错
        const aimUrl = this.routerMap.get(index);
        const currentUrl = this.$router.currentRoute.fullPath;
        console.log(currentUrl)
        if (aimUrl !== currentUrl) {
          this.$router.push(aimUrl);
        }
        // const aimUrl = routeMap.get(index);
        // if (aimUrl !== this.$router.currentRoute.fullPath) {
        //   this.$router.push(routeMap.get(index));
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.aside-container {
  height: calc(100% - 60px);
  ul {
    overflow-y: auto;
    height: 100%;
    margin-bottom: 60px;
    padding-bottom: 60px;
  }
}
.aside-footer {
  position: fixed;
  width: 264px;
  height: 60px;
  // background-color: rgb(195, 132, 208) ;
  left: 0;
  bottom: 0;
  border-top: 1px solid #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}
</style>
