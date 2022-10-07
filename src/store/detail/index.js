import { select, productDetails, addAShoppingCart, deleteAShoppingCart } from "../../api/index"
import { getUUID } from '../../utils/uuid'
import shopcart from '../shopcart'
const actions = {
    async detailsPage(commit, skuId) {
        let list = await productDetails(skuId)
        if (list.code === 200) {
            commit.commit('detailsPage', list.data)
        }
    },
    //修改购物车数量
    async addToShoppingCart(commit, { skuId, skuNum }) {
        let add = await addAShoppingCart(skuId, skuNum)
        return add
    },
    //删除购物车
    async deleteAShoppingCarts(commit, skuId) {
        let deletes = await deleteAShoppingCart(skuId)
        return deletes
    },
    //删除全部
    deleteAllCheckedCart({ dispatch }) {
        let PromiseAll = []
        shopcart.state.list[0].cartInfoList.forEach((item) => {
            let promises = item.isChecked == 1 ? dispatch('deleteAShoppingCarts', item.skuId) : ''
            if (promises === '') {
                return
            }
            PromiseAll.push(promises)
        })
        return Promise.all(PromiseAll)
    },
    //修改商品选中状态
    async selects(commit, data) {
        let list = await select(data)
        return list
    },
    //商品全选
    selectList(commit, data) {
        let state = data ? 1 : 0
        let PromiseAll = []
        if(shopcart.state.list[0]){
            shopcart.state.list[0].cartInfoList.forEach( (item) => {
                let selectLists = select({ skuId: item.skuId, isChecked: state })
                PromiseAll.push(selectLists)
            })
        }/* else{
            alert('请添加商品')
            return false
        } */
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    detailsPage(state, detailsPage) {
        state.num = detailsPage
    },
}
const state = {
    num: {},
    uuid: getUUID()
}
const getters = {
    categoryView() {
        return state.num.categoryView || {}
    },
    skuInfo() {
        return state.num.skuInfo || {}
    },
    spuSaleAttrList() {
        return state.num.spuSaleAttrList || []
    }
}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}