import requests from './request'
import home from './swiper'
export const reqCategoryList = ()=>{
   return requests({url:'/product/getBaseCategoryList',method:'get'})
}
export const swipers = ()=>{
   return home({url:'/banner',method:'get'})
}

export const reqFloorList = ()=>{
   return home({url:'/floor',method:'get'})
}
//获取商品列表
export const reqSearchList = (List) =>{
   return requests({url:'/list',method:'post',data:List})
}
//获取商品详情
export const productDetails = (skuId) =>{
   return requests({url:`/item/${skuId}`,method:'get'})
}
//添加购物车
export const addAShoppingCart = (skuId,skuNum) =>{
   return requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})
}
//获取购物车列表
export const getShoppingCartInformation = ()=>{
   return requests({url:'/cart/cartList',method:'get'})
}
//删除购物车
export const deleteAShoppingCart = (skuId)=>{
   return requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
}

//修改购物车选中状态
export const select = (data)=>{
   return requests({url:`/cart/checkCart/${data.skuId}/${data.isChecked}`,method:'get'})
}


//获取验证码
export const verificationCode = (phone)=>{
   return requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
}
//注册
export const register = (data)=>{
   return requests({url:`/user/passport/register`,method:'post',data})
}
//登录
export const login = (data)=>{
   return requests({url:'/user/passport/login',method:'post',data})
}
//自动登录
export const automaticLogin = ()=>{
   return requests({url:'/user/passport/auth/getUserInfo',method:'get'})
}
//退出登录
export const quitLogin = ()=>{
   return requests({url:'/user/passport/logout',method:'get'})
}
//获取用户地址信息
export const reqAddressInfo = ()=>{
   return requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
}

//获取订单交易页信息
export const transactionPage = ()=>{
   return requests({url:'/order/auth/trade',method:'get'})
}

//提交订单
export const submitOrder = ({tradeNo,data})=>{
      return requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,method:'post',data})
}

//获取支付金额
export const pay = (orderId)=>{
   return requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
}

//获取支付信息
export const paystate = (orderId)=>{
   return requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})
}

//获取我的订单列表
export const reqmyOrder = (page,limit)=>{
   return requests({url:`/order/auth/${page}/${limit}`,method:'get'})
}