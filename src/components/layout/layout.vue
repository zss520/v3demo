<!--
    User: BlackSir
    Date: 2020/12/3
    Time: 11:04
    PACKAGE_NAME:
    PROJECT_NAME: v3demo
-->

<template>
    <div id="content">
        <Header @hide-show-menu='hideShowMenu' :isCollapse='isCollapse'></Header>
        <el-container :style="{ 'min-height': documentClientHeight - 72 + 'px' }">
            <el-container class="block relative">
                <el-main>
                    <span>{{counter}}</span>
                    <!--<span>{{headerText}}</span>-->
                    <router-view></router-view>
                </el-main>
                <el-drawer
                        :model-value="drawerMenu"
                        direction="rtl"
                        :show-close="false"
                        :withHeader="false"
                        size="285px">
                    <Aside @handle-close='handleClose' @layout-hide-drawer="layoutHideDrawer" @handle-open='handleOpen' :isCollapse='isCollapse'></Aside>
                </el-drawer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { ref } from 'vue'
import Header from './header'
import Aside from './aside'

/*const useDebouncedRef = ((value, delay = 200) => {
    let timeout
    return customRef((track, trigger) => {
        return {
            get() {
                track()
                return value
            },
            set(newValue) {
                clearTimeout(timeout)
                timeout = setTimeout(() => {
                    trigger()
                    value = newValue
                }, delay)
            }
        }
    })
})*/
export default {
    components: {
        Aside,
        Header
    },
    mounted() {
        setInterval(() => {
            this.counter++
        }, 1000)
        this.resetDocumentClientHeight()

    },
    setup() {
        let drawerMenu = ref(false)
        let isCollapse = ref(false)
        let counter = ref(0)
        let headerText = ref('')
        let documentClientHeight = ref(300)

        // defaultActive.value = sessionStorage.getItem('activeMenu') ? sessionStorage.getItem('activeMenu') : ''

        const handleOpen = () => {
            // val, key, keyPath
        }

        const handleClose = () => {
            // val, key, keyPath
        }

        const hideShowMenu = () => {
            drawerMenu.value = true
        }

        const layoutHideDrawer = () => {
            console.log('close drawer')
            drawerMenu.value = false
            console.log(drawerMenu.value)
        }

        const resetDocumentClientHeight = () => {
            documentClientHeight.value = document.documentElement['clientHeight']
            window.onresize = () => {
                documentClientHeight.value = document.documentElement['clientHeight']
            }
        }

        return {
            drawerMenu,
            isCollapse,
            documentClientHeight,
            counter,
            headerText,
            handleOpen,
            handleClose,
            resetDocumentClientHeight,
            hideShowMenu,
            layoutHideDrawer
        }
    }
}
</script>

<style>
    #content{
        height: 100%;
        background: url("../../assets/bg.png") no-repeat;
        background-size: 100% 100%;
    }
    .el-main{
        height: 100%;
        padding: 10px 20px !important;
    }
</style>
