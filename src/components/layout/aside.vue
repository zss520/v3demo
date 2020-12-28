<!--
    User: BlackSir
    Date: 2020/12/3
    Time: 11:14
    PACKAGE_NAME:
    PROJECT_NAME: v3demo
-->

<template>
    <el-menu class="el-menu-vertical-demo"
             ref="menu"
             :collapse-transition="false"
             :unique-opened="true"
             @open="openFn"
             @close="closeFn"
             :collapse="isCollapse"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <template v-for="(item) in menuData" v-bind:key="item.name">
            <template v-if="item.children && item.children.length > 0">
                <SubMenu :name="item.name" @hide-drawer-sub="hideDrawer('sub')" :title="item.title" :children="item.children"></SubMenu>
            </template>
            <template v-else>
                <MenuItem :name="item.name" @hide-drawer="hideDrawer('aside')" :title="item.title"></MenuItem>
            </template>
        </template>
    </el-menu>
</template>

<script>
import { ref } from 'vue'
import router from '../../router'
import MenuItem from './menu/MenuItem'
import SubMenu from './menu/SubMenu'
// import { getMenuApiPost } from '../../api'

export default {
    props: {
        isCollapse: {
            type: Boolean,
            default: false
        }
    },
    components: {
        MenuItem,
        SubMenu
    },
    mounted() {
        //-------------------------------------------------------
        this.getAsideMenu()
    },
    setup(props, context) {
        let menuData = ref(router.options.routes[1].children)
        let color = ref('')
        const openFn = (key, keyPath) => {
            context.emit('handle-open', 'handleOpen', key, keyPath)
        }
        const closeFn = (key, keyPath) => {
            context.emit('handle-close', 'handleClose', key, keyPath)
        }
        const hideDrawer = (type) => {
            console.log(type)
            context.emit('layout-hide-drawer', type)
        }
        const getAsideMenu = () => {
            /*let data = {
                projectId: '0896b59323968863101ac0b8bd01bae0',
                templateId: '33431ecc807d2ba076fb8be9b4d0d76b'
            }
            getMenuApiPost(data)
                .then((res) => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })*/
        }

        return {
            menuData,
            color,
            openFn,
            closeFn,
            hideDrawer,
            getAsideMenu
        }
    }
}
</script>

<style scoped>
    .el-menu {
        border: none;
    }
</style>
