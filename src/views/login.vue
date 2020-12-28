<!--
    User: BlackSir
    Date: 2020/12/7
    Time: 9:38
    PACKAGE_NAME:
    PROJECT_NAME: v3demo
-->

<template>
    <div id='login'>
        <div class="loginCont">
            <div class="loginTitle">
            </div>
            <el-tabs tab-position="left" v-model="activeName">
                <el-tab-pane name="phone" label="手机号登录">
                    <div class="loginForm">
                        <el-form ref="loginForm" status-icon :rules="loginRules" @keyup.enter="loginFn">
                            <el-form-item prop="phone">
                                <el-input class="inputBGColor" v-model="phone" placeholder="请输入手机号" prefix-icon=""></el-input>
                            </el-form-item>
                            <el-form-item prop="sms">
                                <el-row>
                                    <el-col :span="18">
                                        <el-input class="inputBGColor" v-model="sms" placeholder="请输入验证码" prefix-icon=""></el-input>
                                    </el-col>
                                    <el-col :span="6" class="textCenter">
                                        <span class="cursorPointer" v-if="isNoSms" @click="getSms">{{smsText}}</span>
                                        <span class="cursorPointer" v-else>{{smsText}}</span>
                                    </el-col>
                                </el-row>
                            </el-form-item>
                        </el-form>
                        <div class="loginBtn">
                            <el-button @click="loginFn">登&nbsp;&nbsp;录</el-button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="username" label="用户名登录">
                    <div class="loginForm">
                        <el-form ref="userForm" status-icon :rules="loginRules" @keyup.enter="userNameLoginFn">
                            <el-form-item prop="phone">
                                <el-input class="inputBGColor" v-model="userName" placeholder="请输入用户名" prefix-icon=""></el-input>
                            </el-form-item>
                            <el-form-item prop="sms">
                                <el-input class="inputBGColor" type="password" v-model="password" placeholder="请输入密码" prefix-icon=""></el-input>
                            </el-form-item>
                        </el-form>
                        <div class="loginBtn">
                            <el-button @click="userNameLoginFn">登&nbsp;&nbsp;录</el-button>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script>
import { ref, reactive } from 'vue'
import validate from '../lib/validate'
import { sendCode, login } from '../api'
import VueCookie from 'vue-cookie'

export default {
    methods: {
        checkPhone() {
            return new Promise((resolve, reject) => {
                if (this.phone === '') {
                    reject({code: 1, msg: '手机号为空'})
                } else if (!validate.validateFn.checkMobilePhoneNumber(this.phone)) {
                    reject({code: 2, msg: '手机号格式错误'})
                } else {
                    resolve({code: 3, msg: '手机号正确'})
                }
            })
        },
        loginFn() {
            this.checkPhone()
                .then(() => {
                    if (this.sms === '') {
                        this.$message({
                            message: '验证码不能为空',
                            type: 'error'
                        })
                        return
                    }
                    login({
                        phone: this.phone,
                        sms: this.sms
                    })
                        .then(({data}) => {
                            VueCookie.set('datashowtoken', data.token)
                            VueCookie.set('organId', data.organId)
                            VueCookie.set('regionCode', data.regionCode)
                            VueCookie.set('regionLayerCode', data.regionLayerCode)
                            VueCookie.set('regionName', data.regionName)
                            VueCookie.set('url', data.url)
                            this.$message({
                                message: '登录成功',
                                type: 'success',
                                duration: 1000,
                                onClose: () => {
                                    this.$router.push({
                                        name: 'Home'
                                    })
                                }
                            })
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
                .catch((e) => {
                    this.$message({
                        message: e.msg,
                        type: e.code === 1 ? 'warning' : 'error',
                        duration: 2000
                    })
                })
        },
        userNameLoginFn() {
            if (this.userName === '') {
                this.$message({
                    message: '用户名不能为空',
                    type: 'error'
                })
                return
            }

            if (this.password === '') {
                this.$message({
                    message: '密码不能为空',
                    type: 'error'
                })
                return
            }
            VueCookie.set('datashowtoken', '8888888999999999900000')
            this.$message({
                message: '登录成功',
                type: 'success',
                duration: 1000,
                onClose: () => {
                    this.$router.push({
                        name: 'Home'
                    })
                }
            })

            /*userNameLogin({
                username: this.userName,
                password: this.password
            })
                .then(({data}) => {
                    VueCookie.set('datashowtoken', data.token)
                    VueCookie.set('regionName', data.userInfo.username)
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                        duration: 1000,
                        onClose: () => {
                            this.$router.push({
                                name: 'Home'
                            })
                        }
                    })
                })
                .catch(error => {
                    console.log(error)
                })*/
        },
        getSms() {
            this.checkPhone()
                .then(() => {
                    sendCode({
                        phone: this.phone
                    })
                        .then((data) => {
                            this.$message({
                                message: data.data,
                                type: 'success',
                                duration: 2000
                            })
                            this.smsTextTimeout(120)
                            this.isNoSms = false
                        })
                        .catch(error => {
                            console.log(error)
                        })
                })
                .catch((e) => {
                    this.$message({
                        message: e.msg,
                        type: e.code === 1 ? 'warning' : 'error',
                        duration: 2000
                    })
                })
        },
        smsTextTimeout(n) {
            let time = n
            this.smsText = time + '秒后重试'
            let stt = setTimeout(() => {
                if (time === 1) {
                    clearTimeout(stt)
                    this.isNoSms = true
                    this.smsText = '重新获取'
                } else {
                    time --
                    this.smsTextTimeout(time)
                }
            }, 1000)
        }
    },
    setup() {
        let phone = ref('')
        let sms = ref('')
        let activeName = ref('username')
        let userName = ref('admin')
        let password = ref('admin')
        let isNoSms = ref(true)
        let smsText = ref('获取验证码')
        const loginRules = reactive([])

        return {
            phone,
            sms,
            userName,
            password,
            isNoSms,
            smsText,
            activeName,
            loginRules
        }
    }
}
</script>

<style scoped>
    @import "../style/login.css";
    .el-form{
        width: calc(100% - 40px);
        height: 130px;
        padding: 15px 20px;
    }
    .el-form-item{
        margin: 8px 18px;
    }
    .el-col{
        height: 50px;
        line-height: 50px;
        color: #fff;
    }
    .el-tabs__item{
        color: #ffffff;
    }
</style>
