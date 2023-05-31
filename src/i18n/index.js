import Eli18nen from 'element-ui/lib/locale/lang/en'
import Eli18nzh from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale/index'
import I18n from 'vue-i18n'
// vue静态挂载
import Vue from 'vue'
Vue.use(I18n)

const language = {
    // 语言
    zh: {
        msg: {
            login: '登录',
        name: '用户名',
            passwd: '密码',
            email: '邮箱',
            index: '首页',
            dataMg: '数据管理',
            todayWh: '今日天气信息',
            subMsg: '野心和实力是对等的，在没有实力的时候谈野心，前方等待你的只会是万劫不复。',
            search: '查询',
            whItem: '天气条目',
            key: 'key值',
            current: '现状'
        },
        ...Eli18nzh,
    },
    en: {
        msg: {
            login: 'Login in',
            name: 'Username',
            passwd: 'Password',
            email: 'Email',
            index: 'Main Page',
            dataMg: 'Data Manager',
            todayWh: 'Today Weather Information',
            subMsg: 'Ambition and strength are equal. If you talk about ambition when you have no strength, what awaits you in front of you will be nothing but doom.',
            search: 'search',
            whItem: 'Weather Property',
            key: "Key's value",
            current: 'Current Condition'
        },
        ...Eli18nen,
    }
}

const i18n = new I18n({
    locale: 'zh',
    messages: language
})

// 按需引入
ElementLocale.i18n((key, value) => i18n.t(key, value))

export default i18n