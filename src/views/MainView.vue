<template>
  <div class="container">
    <header><header-cop /></header>
    <!-- <header>{{ $route.params }}</header> -->
    <div class="body">
      <aside>
        <aside-cop></aside-cop>
      </aside>
      <main>
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script>
// import { store } from '@/utils/store'
import AsideCop from '@/components/AsideCop.vue'
import HeaderCop from '@/components/HeaderCop.vue'
export default {
  name: 'MainView',
  components: {
    AsideCop,
    HeaderCop,
  },
  // vue-router进行传递
  props: ['userId'],
  mounted() {
    // console.log('main组件', store)
    // console.log(this.$route)
  },
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
    if (answer) {
      next()
    } else {
      next(false)
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100%;

  header {
    height: 60px;
    background-color: #000;
    color: #fff;
  }

  .body {
    height: calc(100% - 60px);
    display: flex;

    aside {
      width: 264px;
      height: 100%;
    }

    main {
      width: calc(100% - 264px);
    }
  }

  // main {
  //   width: calc(100% - 264px)
  //   height: 
  // }
}
</style>
