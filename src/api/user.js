import request from '@/utils/request'
export const getUserInfoDetail = () => {
  return request.get('/user/info')
}

// 我的余额，积分，优惠卷
export const getUserMoney = () => {
  return request.get('/user/assets')
}

// 订单评价商品列表
export const orderCommentList = (orderId) => {
  return request.get('/order.comment/list', {
    params: {
      orderId
    }
  })
}

// 上传头像
export const submitImage = (file) => {
  return request.post('/upload/image', {
    file
  })
}
