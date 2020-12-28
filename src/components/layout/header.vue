<!--
    User: BlackSir
    Date: 2020/12/3
    Time: 11:14
    PACKAGE_NAME:
    PROJECT_NAME: v3demo
-->

<template>
    <el-header :style="{  padding: 0, color: '#fff', height: '70px', borderBottom: '2px solid #449dc0' }">
        <el-row>
            <el-col :span="20">
                <div class="menuTitle">
                    {{title}}
                </div>
            </el-col>
            <el-col :span="4">
                <div class="headerRight cursorPointer" @click="menuClick">
                    <img src="../../assets/menu.png" alt="">
                    <span>菜单</span>
                </div>
            </el-col>
        </el-row>
    </el-header>
</template>

<script>
import { ref } from 'vue'
export default {
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    methods: {

    },
    setup(props, context) {
        let title = ref('')
        const menuClick = () => {
            context.emit('hide-show-menu')
        }

        return {
            title,
            menuClick
        }
    }
}
</script>

<style scoped>
    .el-row,
    .el-col{
        padding: 0 !important;
        margin: 0 !important;
        height: 70px;
    }
    .headerRight{
        padding: 24px 60px 0 0;
        height: 46px;
        text-align: right;
        font-size: 22px;
        color: #00f0ff;
    }
    .headerRight>img{
        vertical-align: top;
        margin-right: 7px;
    }
    .menuTitle{
        font-size: 26px;
        font-weight: bold;
        color: #57DDFF;
        height: 70px;
        line-height: 70px;
        text-indent: 60px;
    }
</style>
