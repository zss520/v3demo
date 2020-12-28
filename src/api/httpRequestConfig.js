import VueCookie from 'vue-cookie'
import Axios from 'axios'
// import httpUrl from './httpUrl'
import util from '../lib/util'
import { ElMessage } from 'element-plus'

const instance = Axios.create({
    // baseURL: httpUrl.httpUrls.apiUrl,
    timeout: 600000,
    headers: {
        // token: '207a73e6b3e9163272a5515a14c05930'
        token: VueCookie.get('datashowtoken')
    }
})

//get请求
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        instance
            // .get(url, {
            .get(util.getApiUrl(url), {
                params: params,
            })
            .then((response) => {
                if (response.data.code === 200) {
                    resolve(response.data)
                } else {
                    ElMessage({
                        message: response.data.data ? response.data.data : response.data.msg,
                        type: 'error',
                        duration: 3000
                    })
                }
            })
            .catch((err) => {
                reject(err)
            })
    })
}
//post请求
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        // instance.post(url, data).then(
        instance.post(util.getApiUrl(url), data).then(
            (response) => {
                if (response.data.code === 200) {
                    resolve(response.data)
                } else {
                    ElMessage({
                        message: response.data.data ? response.data.data : response.data.msg,
                        type: 'error',
                        duration: 3000
                    })
                }
            },
            (err) => {
                reject(err)
            }
        )
    })
}
