import { changeCount, delCart, getCartList } from '@/api/cart'
// import { Toast } from 'vuex'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    setCartList (state, cartList) {
      state.cartList = cartList
    },
    // 设置小复选框反选
    toggleChecked (state, id) {
      const goods = state.cartList.find(item => item.goods_id === id)
      goods.isChecked = !goods.isChecked
    },

    // 让所有小复选框，根据全选框变化,forEach没有返回值
    toggleAllChecked (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },

    // 更新购物车单独商品的个数
    updateCart (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    }
  },
  actions: {
    // 获取购物车后台数据
    async getCartData (context) {
      const { data: { list } } = await getCartList()
      //   对复选框进行设置选中
      list.forEach(ele => {
        ele.isChecked = true
      })
      context.commit('setCartList', list)
    },
    // 更新购物车后台数据
    async changeCountAction (context, obj) {
      const { goodsId, goodsNum } = obj
      // 更新本地数据
      context.commit('updateCart', { goodsId, goodsNum })
      const res = await changeCount(obj)
      console.log(res)
    },
    async updateCartData (context) {
      const { data: { list } } = await getCartList()
      //   对复选框进行设置选中
      list.forEach(ele => {
        ele.isChecked = false
      })
      context.commit('setCartList', list)
    },

    // 删除购物车数据
    async delCartAction (context) {
      const selCartList = context.getters.selGoods
      const cartIds = selCartList.map(item => item.id)
      await delCart(cartIds)
      // Toast('删除成功')
      // 重新拉取最新的购物车数据 (重新渲染)
      context.dispatch('updateCartData')
    }
  },
  getters: {
    // 购物车商品总数
    totalCart (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 选中的商品
    selGoods (state) {
      return state.cartList.filter(item => item.isChecked)
    },

    // 选中的商品总数
    selGoodsCount (state, getters) {
      return getters.selGoods.reduce((sum, item) => sum + item.goods_num, 0)
    },

    // 选中的商品的总价格
    selTotalPrice (state, getters) {
      return getters.selGoods.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },

    // 当所有小复选框被选中，全选框被选中
    isAllChecked (state) {
      // 判断所有复选框是否被选中，如果都被选中返回true
      return state.cartList.every(item => item.isChecked === true)
    }
  }
}
