import { reqSearchList } from '../../api'
const actions = {
    async reqSearchLists(commit,List={}) {
         let searList = await reqSearchList(List)
         commit.commit('reqSearchLists',searList.data)
    }
}
const mutations = {
    reqSearchLists(state, searList) {
        state.num = searList
    }
}
const state = {
    num: {}
}
//getters在vuex中相当于计算属性的作用
const getters = {
    goodsList(){
        return state.num.goodsList || []
    },
    attrsList(){
        return state.num.attrsList || []
    },
    trademarkList(){
        return state.num.trademarkList || []
    }
}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}