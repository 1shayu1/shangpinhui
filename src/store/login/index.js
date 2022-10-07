import { verificationCode, register, login, automaticLogin, quitLogin } from "@/api"
const actions = {
    //验证码
    async verificationCodes(commit, phone) {
        let list = await verificationCode(phone)
        if (list.code == 200) {
            commit.commit('verificationCodes', list)
        }
    },
    //注册
    async registers(commit, data) {
        let registeR = await register(data)
        return registeR
    },
    //登录
    async logins(commit, data) {
        let Login = await login(data)
        if (Login.code == 200) {
            sessionStorage.setItem("userId", Login.data.userId);
            commit.commit('logins', Login.data)
        }

        return Login
    },
    //自动登录
    async automaticLogins(commit) {
        let login = await automaticLogin()
        if (login.code == 200) {
            sessionStorage.setItem("userId", login.data.id);
            commit.commit('automaticLogins', login.data.id)
        }else if(login.code == 208){
            localStorage.removeItem('TOKEN')
            alert('信息已过期请重新登录')
    }
    },
    //退出登录
    async quitLogins(commit) {
        let login = await quitLogin()
        if (login.code == 200) {
            localStorage.removeItem('TOKEN')
            sessionStorage.removeItem('TOKEN')
            sessionStorage.removeItem('userId')
            commit.commit('quitLogins')
        }
    }
}
const mutations = {
    verificationCodes(state, verificationCode) {
        state.verificationCode = verificationCode
    },
    logins(state, token) {
        state.id = token.userId
    },
    automaticLogins(state, id) {
        state.id = id
    },
    quitLogins(state) {
        state.id = ''
    }
}
const state = {
    verificationCode: '',
    id: ''
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