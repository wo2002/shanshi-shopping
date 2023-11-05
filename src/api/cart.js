import request from '@/utils/request'

// 将商品加入到购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品数量
export const changeCount = (obj) => {
  const { goodsId, goodsNum, goodsSkuId } = obj
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 购物车删除
export const delCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
