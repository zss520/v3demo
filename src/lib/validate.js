let validate = {
    validateFn: {},
    validateMessage: {
        checkTaxIdMessage: ''
    }
}

/**
 * 特殊符号正则
 * @type {RegExp}
 */
const regularSpecialSymbols = /[`~!@#$%^&*()_\\+=<>?:"{}|\\/;'\\[\]·~！@#￥%……&*（）——\\+={}|《》？：“”【】；‘']/im

/**
 * 普通车牌号正则
 * @type {RegExp}
 */
const regularCareCode = /^[京][ABCDEFGHJKLMNPQRSTUWXY][\dABCDEFGHJKLNMPQRSTUVWXYZ]{5}$/

/**
 * 新能源车牌号正则
 * @type {RegExp}
 */
const regularNewCareCode = /^[京][ABCDEFGHJKLMNPQRSTUVWXY]([DF][\dABCDEFGHJKLMNPQRSTUVWXYZ]\d{4}|\d{5}[DF])$/

/**
 * 座机号正则
 * @type {RegExp}
 */
const regularPhoneNumber = /^(\d{3,4}-\d{7,8}|\d{3,4}-\d{7,8}-\d{1,6})$/

/**
 * 手机号正则
 * @type {RegExp}
 */
const regularMobilePhoneNumber = /^((1[3-9][0-9]{1})+\d{8})$/

/**
 * javascript验证纳税人识别号格式
 * @param  taxId [纳税人识别号]
 * @return true格式正确，false格式错误
 */
validate.validateFn.checkTaxId = function (taxId) {
    let p = /^[0-9A-Z]+$/
    // 18位校验及大写校验
    if ((taxId.length !== 18) || (p.test(taxId) === false)) {
        console.error('位数错误...')
        return false
    } else {
        console.info('位数正确...')
    }
    let reg = /^(11|12|13|19|51|52|53|59|91|92|93|Y1)\d{6}\w{9}\w$/
    if (!reg.test(taxId)) {
        console.error('开头错误...')
        return false
    } else {
        console.info('开头正确...')
    }
    // 三证合一之后，纳税人识别号跟统一社会信用代码一致，所以直接采用统一社会信用代码的正则进行校验
    if (!/[1-9A-GY]{1}[1239]{1}[1-5]{1}[0-9]{5}[0-9A-Z]{10}/.test(taxId)) {
        console.error('正则校验错误...')
        return false
    } else {
        console.info('正则校验通过...')
    }
    let Ancode// 统一社会信用代码的每一个值
    let Ancodevalue// 统一社会信用代码每一个值的权重
    let total = 0
    let weightedfactors = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]// 加权因子
    let str = '0123456789ABCDEFGHJKLMNPQRTUWXY'
    // 不用I、O、S、V、Z
    for (let i = 0; i < taxId.length - 1; i++) {
        Ancode = taxId.substring(i, i + 1)
        Ancodevalue = str.indexOf(Ancode)
        total = total + Ancodevalue * weightedfactors[i]
        // 权重与加权因子相乘之和
    }
    let logicCheckCode = 31 - total % 31
    if (logicCheckCode === 31) {
        logicCheckCode = 0
    }
    let Str = '0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y'
    let ArrayStr = Str.split(',')
    logicCheckCode = ArrayStr[logicCheckCode]
    let checkCode = taxId.substring(17, 18)
    if (logicCheckCode !== checkCode) {
        console.error('JS校验错误...')
        return false
    } else {
        console.info('JS校验通过...')
    }
    return true
}

/**
 * 校验内容中是否包含特殊字符
 * @param val 校验内容
 * @returns {boolean} 返回结果 false 不包含  true 包含
 */
validate.validateFn.checkSpecialSymbols = function (val) {
    if (!regularSpecialSymbols.test(val)) {
        return false
    } else {
        return true
    }
}

/**
 * 校验普通车牌号
 * @param val 校验内容
 * @returns {boolean} 返回结果 false 不包含  true 包含
 */
validate.validateFn.checkCareCode = function (val) {
    if (!regularCareCode.test(val)) {
        return false
    } else {
        return true
    }
}

/**
 * 校验新能源车牌号
 * @param val 校验内容
 * @returns {boolean} 返回结果 false 不包含  true 包含
 */
validate.validateFn.checkNewCareCode = function (val) {
    if (!regularNewCareCode.test(val)) {
        return false
    } else {
        return true
    }
}

/**
 * 校验座机号
 * @param val 校验内容
 * @returns {boolean} 返回结果 false 不包含  true 包含
 */
validate.validateFn.checkPhoneNumber = function (val) {
    if (!regularPhoneNumber.test(val)) {
        return false
    } else {
        return true
    }
}

/**
 * 校验手机号
 * @param val 校验内容
 * @returns {boolean} 返回结果 false 不包含  true 包含
 */
validate.validateFn.checkMobilePhoneNumber = function (val) {
    if (!regularMobilePhoneNumber.test(val)) {
        return false
    } else {
        return true
    }
}

export default validate
