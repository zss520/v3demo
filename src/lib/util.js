import Cookie from 'vue-cookie'
// import router from '@/router'
// import store from '@/store'
import httpUrls from '../api/httpUrl'
import vd from './validate'
import { ElMessage } from 'element-plus'


let util = {}

/* 获取route对象 */
util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null
    }
    // debugger;
    let routerObj = null
    for (let item of routers) {
        if (item.name === name) {
            return item
        }
        routerObj = util.getRouterObjByName(item.children, name)
        if (routerObj) {
            return routerObj
        }
    }
    return null
}
util.sotrArr = function (property) {
    return function (a, b) {
        let value1 = a.meta[property]
        let value2 = b.meta[property]
        return value1 - value2
    }
}
util.getQueryStringArgs = function (url) {
    let obj = {}
    let start = url.indexOf('?') + 1
    let str = url.substr(start)
    let arr = str.split('&')
    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        obj[arr2[0]] = arr2[1]
    }
    return obj
}
/* 生成uuid */
util.getUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
}
/* 删除前后空格 */
util.trim = function (str) {
    if (typeof str === 'string') {
        return str.replace(/(^\s*)|(\s*$)/g, '')
    } else {
        return 'string'
    }
}
/* 是否为空字符串，全空格不算空字符串 */
util.isEmpty = function (str) {
    if (str === null || typeof str === 'undefined' || str === '') {
        return true
    }
}
/* 是否为空字符串，全空格也是空字符串 */
util.isBlank = function (str) {
    if (str === null || typeof str === 'undefined' || str === '' || util.trim(str) === '') {
        return true
    }
}

// 转换api请求地址
util.getApiUrl = function (url) {
    if (process.env.NODE_ENV === 'production') {
        return httpUrls.httpUrls.apiUrlProd + url
    } else {
        return '/tokenApi' + url
    }
}

/**
 * 清空登录信息
 */
util.clearLoginInfo = function () {
    Cookie.delete('token')
    Cookie.delete('datashowtoken')
    Cookie.delete('organId')
    Cookie.delete('regionCode')
    Cookie.delete('regionLayerCode')
    Cookie.delete('regionName')
    Cookie.delete('url')
}

/**
 * URL地址
 * @param {*} s
 */
util.isURL = function (s) {
    return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 清空对象 属性的值
 * @param {Object} obj
 */
util.resetObjectValue = function (obj) {
    for (let i in obj) {
        if (typeof obj[i] === 'object') {
            if (obj[i] instanceof Array) {
                obj[i] = []
            } else if (obj[i] instanceof Object) {
                util.resetObjectValue(obj[i])
            }
        } else if (typeof obj[i] === 'number') {
            obj[i] = 0
        } else {
            obj[i] = ''
        }
    }
}

/**
 * 手动校验表单
 * @param vm this
 * @param a 校验字段
 * @param b 校验字段名
 * @returns {boolean}
 */
util.checkValue = function (vm, a, b) {
    if (a === null || a === undefined || a === 'null' || a === 'undefined') {
        setTimeout(() => {
            vm.$message.error(`请填写${b}`)
        }, 50)
        return false
    }

    if (vd.validateFn.checkSpecialSymbols(a)) {
        setTimeout(() => {
            vm.$message.error(`${b}不允许包含特殊字符`)
        }, 50)
        return false
    }

    if (typeof a === 'object') {
        if (a instanceof Array) {
            if (a.length > 0) {
                return true
            } else {
                setTimeout(() => {
                    ElMessage.error(`请填写${b}`)
                }, 50)
                return false
            }
        } else if (a instanceof Object) {
            if (Object.getOwnPropertyNames(a).length > 0) {
                return true
            } else {
                setTimeout(() => {
                    ElMessage.error(`请填写${b}`)
                }, 50)
                return false
            }
        }
    } else if (typeof a === 'number') {
        if (String(a) && a >= 0) {
            return true
        } else {
            setTimeout(() => {
                ElMessage.error(`请填写${b}`)
            }, 50)
            return false
        }
    } else {
        if (a && a !== null && a !== undefined && a !== 'undefined' && a !== 'null' && a !== '' && a.replace(/(^\s*)|(\s*$)/g, '') !== '') {
            return true
        } else {
            setTimeout(() => {
                ElMessage.error(`请填写${b}`)
            }, 50)
            return false
        }
    }
}

/**
 * 处理小于10 的 月、日、时、分、秒
 * @param {number} value
 */
function resetTimeNum (value) {
    if (value < 10) {
        return '0' + value
    } else {
        return value
    }
}

/**
 * 获取当前日期 时间
 * @param {boolean} date 是否返回年月日
 * @param {boolean} time 是否返回时分秒
 * @param {string} val 需要转换的日期
 * @returns {string}
 */
util.getDateTime = function (date, time, val) {
    let t
    let v
    if (val !== undefined) {
        if (val === '' || val === null) {
            v = '-'
            return v
        } else {
            t = new Date(val)
        }
    } else {
        t = new Date()
    }
    let [year, month, day, hour, minute, second] = [t.getFullYear(), resetTimeNum(t.getMonth() + 1), resetTimeNum(t.getDate()), resetTimeNum(t.getHours()), resetTimeNum(t.getMinutes()), resetTimeNum(t.getSeconds())]
    if (date && time) {
        v = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    } else if (!date && time) {
        v = hour + ':' + minute + ':' + second
    } else if (date && !time) {
        v = year + '-' + month + '-' + day
    } else {
        v = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    }
    return v
}

/**
 * 创建a标签下载文件
 * @param url
 * @param id
 * @constructor
 */
/*util.AUploadFile = function (url, id) {
    app.axios.get(url + id, {
        resetUrl: true,
        responseType: 'blob'
    }).then((data) => {
        let a = new File([data.data], id + '.doc', {type: 'text/plain;charset=utf-8'})
        let b = new Blob([a], {type: 'text/plain;charset=utf-8'})
        let fileUrl = window.URL.createObjectURL(b)
        let aEle = document.createElement('a')
        aEle.download = id + '.doc'
        aEle.setAttribute('href', fileUrl)
        aEle.setAttribute('target', '_blank')
        aEle.style.display = 'none'
        document.getElementsByTagName('body')[0].append(aEle)
        aEle.click()
        ElMessage.success({
            message: '下载成功！',
            duration: 2000
        })
    }).catch((error) => {
        ElMessage.error({
            message: '下载失败！',
            duration: 2000
        })
        console.log(error)
    })
}*/

export default util
