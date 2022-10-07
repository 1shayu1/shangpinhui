import { getShoppingCartInformation} from '../../api'
const actions = {
    async getShoppingCartInformations(commit) {
        let list = await getShoppingCartInformation()
        if (list.code == 200) {
            commit.commit('getShoppingCartInformations', list.data)
        }
    },
}
const mutations = {
    getShoppingCartInformations(state, list) {
        state.list = list
    }
}
const getters = {
    cartInfoList() {
        return state.list[0] || []
    }
}
const state = {
    list: []
}
export default {
    namespaced: true,
    actions,
    mutations,
    getters,
    state
}