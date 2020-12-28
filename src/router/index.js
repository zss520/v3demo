import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import VueCookie from 'vue-cookie'
import util from '../lib/util'

const _import = require('./import-' + process.env.NODE_ENV)
const Layout = _import('layout')
const ParentView = _import('parent-view')

const app = createApp({})

const routerHistory = createWebHistory()

const staticRoutes = [
    { path: '/login', name: 'login', title: '登录', meta: { hideInMenu: true }, component: _import('login') }
]

const routes = [{
    path: '/',
    redirect: '/home',
    component: Layout,
    name: 'layout',
    title: '入口',
    children: [
        { path: '/home', name: 'Home', title: '首页', component: _import('home') },
        {
            path: '/table1',
            name: 'Table1',
            title: '表格1',
            component: _import('table')
        },
        {
            path: '/table',
            name: 'Table',
            title: '表格',
            component: ParentView,
            children: [
                {
                    path: '/table1-1',
                    name: 'Table1-1',
                    title: '表格1-1',
                    component: ParentView,
                    children: [
                        {
                            path: '/table1-1-1',
                            name: 'Table1-1-1',
                            title: '表格1-1-1',
                            component: _import('table1-1-1')
                        }
                    ]
                }
            ]
        },
        {
            path: '/charts',
            name: 'Charts',
            title: '图表',
            component: ParentView,
            children: [
                {
                    path: '/charts1-1',
                    name: 'Charts1-1',
                    title: '图表1-1',
                    component: _import('charts1-1')
                }
            ]
        }
    ],
    beforeEnter (to, from, next) {
        let token = VueCookie.get('datashowtoken')
        if (!token || !/\S/.test(token) || token === 'undefined' || token === 'null') {
            util.clearLoginInfo()
            next({ name: 'login' })
        } else {
            next()
        }
    }
}]



const router = createRouter({
    history: routerHistory,
    routes: staticRoutes.concat(routes)
})

app.use(router)
app.mount('#app')

export default router
