<!--
    User: BlackSir
    Date: 2020/12/4
    Time: 11:05
    PACKAGE_NAME:
    PROJECT_NAME: v3demo
-->

<template>
    <el-menu-item :index="name" @click="goRouter">
        <i :class="icon"></i>
        <template #title>{{title}}</template>
    </el-menu-item>
</template>

<script>
export default {
    props: {
        name: String,
        title: String,
        icon: {
            type: String,
            default: 'el-icon-folder'
        }
    },
    methods: {
        goRouter (menu) {
            this.$router.push({
                name: menu.index
            })
            this.$store.commit('increment')
            sessionStorage.setItem('activeMenu', menu.index)
            this.hideDrawer('sub')
        }
    },
    setup(props, context) {
        const hideDrawer = (type) => {
            context.emit('hide-drawer', type)
        }

        return {
            hideDrawer
        }
    }
}
</script>
