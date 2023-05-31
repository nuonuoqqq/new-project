<template>
    <div class="container">
        <div class="title">
            <h2><span>¶</span><slot></slot></h2>
        </div>
        <p class="sub-title"><slot name="sub"></slot></p>
    </div>
</template>
<script>
export default {
    name: 'MainTitle'
}
</script>
<style lang="scss" scoped>
.container {
    .title {
        h2 {
            font-weight: 400;
            color: #1f2f3d;

            span {
                opacity: 0;
            }

            span:hover {
                cursor: pointer;
            }

        }

        h2:hover {
            cursor: pointer;

            span {
                opacity: 0.5;
            }
        }
    }

    .sub-title {
        font-size: 14px;
        color: #5e6d82;
        margin-left: 18px;
    }
}
</style>