import { reqFloorList, swipers } from "@/api"
const actions = {
    async swipersList(commit) {
        let swiper = await swipers()
        if (swiper.code === 200) {
            commit.commit('swipersList', swiper.data)
        }

    },
    async reqFloorList(commit) {
        let reqFloor = await reqFloorList()
        if (reqFloor.code === 200) {
            commit.commit('reqFloorList', reqFloor.data)
        }

    }
}
const mutations = {
    swipersList(state, swiperList) {
        state.num = swiperList
    },
    reqFloorList(state, reqFloorList) {
        state.Floor = reqFloorList
    }
}
const state = {
    num: {},
    Floor: {}
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