import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// vuex的初始化

const vuexStore = new Vuex.Store({
    state: {
        // 全局状态变量
        sentence: '小用一下vuex🤣🤣🤣🤣🤣',
        imgArr: [0, 1, 2, 3, 4]
    },
    mutations: {
        // 第一个参数是state变量，第二个参数是playload
        changeSentence(state, playload) {
            state.sentence = playload.name
        }
    },
    // 类比计算属性
    getters: {
        imgUrls: (state) => {
            return state.imgArr.map((imgInt) => require(`@/assets/weather-img/${imgInt}.png`) )
        }
    }
})

export {
    vuexStore
}