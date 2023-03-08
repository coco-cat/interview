var Mock = require('mockjs')
const detectLanguage = (defaultLang = 'en-US') =>
navigator.language ||
(Array.isArray(navigator.languages) && navigator.languages[0]) ||
defaultLang;

module.exports = Mock.mock('/getLanguage','get',()=>detectLanguage())

module.exports = Mock.mock('/getTime','get',()=>{
    return {
        targetTime:'2023/03/8 12:00:00',
        nowTime:'2023/03/7 12:00:00'
    }
})