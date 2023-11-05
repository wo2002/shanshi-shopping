import { getInfo, setInfo } from '@/utils/storage'
import { getUserMoney } from '@/api/user'
export default {
  namespaced: true,
  state () {
    return {
      balance: '',
      coupon: null,
      points: null,
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    },
    setBalance (state, balance) {
      state.balance = balance
      console.log(state.balance)
    },
    setCoupon (state, coupon) {
      state.coupon = coupon
    },
    setPoints (state, points) {
      state.points = points
    }
  },
  actions: {
    // 退出登录
    loginOut (context) {
      context.commit('setUserInfo', {})
      context.commit('setCartList', [], { root: true })
    },
    // 获取余额
    async getUserMoneyAction (context) {
      const { data: { assets } } = await getUserMoney()
      console.log(assets)
      context.commit('setBalance', assets.balance)
      context.commit('setCoupon', assets.coupon)
      context.commit('setPoints', assets.points)
    }
  },
  getters: {}
}
