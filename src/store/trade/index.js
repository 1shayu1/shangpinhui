import { reqmyOrder , paystate, reqAddressInfo , transactionPage ,submitOrder,pay } from '@/api'
const actions = {
    //获取用户地址
    async addresss(commit) {
        let address = await reqAddressInfo()
        commit.commit('addresss', address.data)
    },
    //获取订单信息
    async transactionPages(commit){
       let transactionPages = await transactionPage()
       commit.commit('transactionPages',transactionPages.data)
    },
    //提交订单
    async submitOrders(commit,{tradeNo,data}){
       let list = await submitOrder({tradeNo,data})
       if(list.code == 200){
        commit.commit('submitOrders',list.data)
       }
       return list
    },
    //获取支付金额
    async payAll(commit,orderId){
       let list = await pay(orderId)
       if(list.code == 200){
        commit.commit('payAll',list.data)
       }
    },
    //获取支付进度
    async paystates(commit,orderId){
        let list = await paystate(orderId)
        return list
    }, 
    //获取我的订单列表
    async reqmyOrderList(commit,{page,limit}){
        let list = await reqmyOrder(page,limit)
        commit.commit('reqmyOrderList',list.data)
    }
}

const mutations = {
    addresss(state, data) {
        state.address = data || []
    },
    transactionPages(state,data){
        state.transactionPage = data || []
    },
    submitOrders(state,data){
       state.submitOrder = data
    },
    payAll(state,data){
        state.pay = data
    },
    reqmyOrderList(state,data){
       state.reqmyOrder = data
    }
}

const state = {
    address: '',
    transactionPage:'',
    submitOrder:'',
    pay:'',
    reqmyOrder:''
}

const getters = {

}
export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}