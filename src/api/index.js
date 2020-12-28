import { get, post } from './httpRequestConfig'

export const sendCode = (data) => get('/sys/querySmsCode', data)
// export const checkAuth = (data) => get('/mds/mdsproject/authProject', data)
export const getMenuApiPost =  (data) => post('/mds/mdsprojectcontainer/getProjectContainerList', data)
export const getMenu =  (data) => post('/menu/getMenu', data)
export const userNameLogin =  (data) => post('/user/login', data)
export const login =  (data) => post('/sys/dataShowLogin', data)

