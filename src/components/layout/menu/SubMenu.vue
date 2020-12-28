<!--
    User: BlackSir
    Date: 2020/12/4
    Time: 11:05
    PACKAGE_NAME:
    PROJECT_NAME: v3demo
-->

<template>
    <el-submenu :index="name">
        <template #title>
            <i :class="icon"></i>
            <span>{{title}}</span>
        </template>
        <el-menu-item-group v-for="(itemC) in childrenArray" v-bind:key="itemC.name">
            <template v-if="itemC.children && itemC.children.length > 0">
                <SubMenu :name="itemC.name" :title="itemC.title" @hide-drawer-sub="hideDrawer('sub11')" :children="itemC.children"></SubMenu>
            </template>
            <template v-else>
                <MenuItem :name="itemC.name" :title="itemC.title" @hide-drawer="hideDrawer"></MenuItem>
            </template>
        </el-menu-item-group>
    </el-submenu>
</template>

<script>
import { ref } from 'vue'
import MenuItem from './MenuItem'
export default {
    name: 'SubMenu',
    props: {
        name: String,
        title: String,
        icon: {
            type: String,
            default: 'el-icon-folder'
        },
        children: Array
    },
    components: {
        MenuItem
    },
    setup(props, context) {
        let childrenArray = ref(props.children)
        const hideDrawer = (type) => {
            console.log(type)
            context.emit('hide-drawer-sub', type)
        }

        return {
            childrenArray,
            hideDrawer
        }
    }
}
</script>
