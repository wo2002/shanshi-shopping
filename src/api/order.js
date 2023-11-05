import request from '@/utils/request'

// mode: cart  => obj(cartIds)
// mode: buyNow => obj(goodsId, goodsNum,goodsSkuId)
// 获取订单信息
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // 结算模式 buyNow立即购买，cart购物车
      delivery: 10, // 配送方式 10快递配送，20上门自提
      couponId: 0,
      isUsePoint: 0,
      ...obj
    }
  })
}

// 提交订单
// mode: cart  => obj(cartIds,remark)
// mode: buyNow => obj(remark,goodsId, goodsNum,goodsSkuId)
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 快递配送
    isUsePoint: 0,
    couponId: 0,
    PayType: 10, // 余额 支付
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page // list
    }
  })
}

// 取消订单
export const cancelOrderList = (orderId) => {
  return request.post('/order/cancel', {
    orderId
  })
}
