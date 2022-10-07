import { reqCategoryList } from '../../api'
const actions = {
    async categoryList(commit) {
        let result = await reqCategoryList()
        if(result.code === 200){
            commit.commit("categoryList", result.data)
        }
        
    }
}
const mutations = {
    categoryList(state, categoryList) {
        state.num = categoryList
    }
}
const state = {
    num: []
}
//getters在vuex中相当于计算属性的作用
const getters = {
}

export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}