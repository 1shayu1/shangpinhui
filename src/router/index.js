import Vue from "vue";
import VueRouter from "vue-router";

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
Vue.use(VueRouter)
const routes = [
    {
        path: '/detail/:skuId?',
        name: 'detail',
        component: () => import('@/pages/Detail'),
        meta: { show: true }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/Home'),
        meta: { show: true }
    },
    {
        path: '/login',
        component: () => import('@/pages/Login'),
        meta: { show: false }
    },
    {
        path: '/register',
        component: () => import('@/pages/Register'),
        meta: { show: false }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('@/pages/search'),
        meta: { show: true }
    },
    {
        path: '/addCartSuccess/:quantity?/:skuId?',
        name: 'addCartSuccess',
        component: () => import('@/pages/AddCartSuccess'),
        meta: { show: true }
    },
    {
        path: '/shopCart',
        component: () => import('@/pages/ShopCart/ShopCart/index.vue'),
        meta: { show: true }
    },
    {
        path: '/trade',
        component: () => import('@/pages/Trade'),
        meta: { show: true },
        beforeEnter:(to,from,next)=>{
        if(from.path == '/shopCart'){
            next()
        }else{
            next(false)
        }
        }
    },
    {
        path: '/pay',
        component: () => import('@/pages/Pay'),
        meta: { show: true },
        beforeEnter:(to,from,next)=>{
            if(from.path == '/trade'){
                next()
            }else{
                next(false)
            }
            }
    },
    {
        path: '/paySuccess',
        component: () => import('@/pages/PaySuccess'),
        meta: { show: true },
        beforeEnter:(to,from,next)=>{
            if(from.path == '/pay'){
                next()
            }else{
                next(false)
            }
            }
    }, 
    {
        path:'/center',
        component:()=>import('@/pages/Center'),
        mata:{show:true}
    },
    {
        path: '*',
        //默认跳转
        redirect: "/Home"
    }
]
const router = new VueRouter({
    /* routes: [
        {
            path: '/detail/:skuId?',
            name: 'detail',
            component: () => import('@/pages/Detail'),
            meta: { show: true }
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/pages/Home'),
            meta: { show: true }
        },
        {
            path: '/login',
            component: () => import('@/pages/Login'),
            meta: { show: false }
        },
        {
            path: '/register',
            component: () => import('@/pages/Register'),
            meta: { show: false }
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: () => import('@/pages/search'),
            meta: { show: true }
        },
        {
            path: '/addCartSuccess/:quantity?/:skuId?',
            name: 'addCartSuccess',
            component: () => import('@/pages/AddCartSuccess'),
            meta: { show: true }
        },
        {
            path: '/shopCart',
            component: () => import('@/pages/ShopCart/ShopCart/index.vue'),
            meta: { show: true }
        },
        {
            path: '/trade',
            component: () => import('@/pages/Trade'),
            meta: { show: true },
            beforeEnter:(to,from,next)=>{
            if(from.path == '/shopCart'){
                next()
            }else{
                next(false)
            }
            }
        },
        {
            path: '/pay',
            component: () => import('@/pages/Pay'),
            meta: { show: true },
            beforeEnter:(to,from,next)=>{
                if(from.path == '/trade'){
                    next()
                }else{
                    next(false)
                }
                }
        },
        {
            path: '/paySuccess',
            component: () => import('@/pages/PaySuccess'),
            meta: { show: true },
            beforeEnter:(to,from,next)=>{
                if(from.path == '/pay'){
                    next()
                }else{
                    next(false)
                }
                }
        }, 
        {
            path:'/center',
            component:()=>import('@/pages/Center'),
            mata:{show:true}
        },
        {
            path: '*',
            //默认跳转
            redirect: "/Home"
        }
    ], */
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { y: 0 }
    },
})
router.beforeEach((to, from, next) => {
    if (to.path == '/login' || to.path == '/register') {
        if (localStorage.getItem('TOKEN') || sessionStorage.getItem('TOKEN')) {
            alert('您已处于登录状态')
        } else {
            next()
        }
    } else if(to.path == '/center' || 
    to.path == '/paySuccess' ||
    to.path == '/pay' ||
    to.path == '/trade'
    ){
    if(localStorage.getItem('TOKEN') || sessionStorage.getItem('TOKEN')){
        next()
    }
    else{
        alert('请登录后再操作')
        next('/login')
    }
    }
    else {
        next()
    }
    
})
export default router