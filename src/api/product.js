import request from '@/utils/request'

// 获取商品列表
export const getGoodsList = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params:
    {
      categoryId,
      goodsName,
      page
    }
  })
}

// 商品详情页
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}
