<template>
    <div class="header-container">
        <div class="logo"><img src="//csstools.chinaz.com/tools/images/public/logos/logo-index.png" /></div>
        <div class="content"></div>
        <div class="info">
            <el-tooltip effect="dark" :content="email" placement="bottom">
                <div><i class="el-icon-user-solid"></i></div>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HeaderCop',
    data: function() {
        return {
            email: ''
        }
    },
    mounted() {
        this.email = this.$route.query.email;
    }
}
</script>

<style lang="scss" scoped>
.header-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    div {
        height: 100%;
    }

    .logo {
        width: 220px;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            height: 40px;
        }
    }

    .content {
        flex-grow: 1;
    }

    .info {
        width: 50px;
        display: flex;
        // justify-content: center;
        align-items: center;
        font-size: 12px;

        div {
            font-size: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .info:hover {
        cursor: pointer;
    }
}
</style>