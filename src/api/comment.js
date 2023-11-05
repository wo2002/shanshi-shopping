import request from '@/utils/request'

// 请求评论数据
export const getCommentData = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}

// 获取评论列表
export const getCommentList = (obj) => {
  const { scoreType, goodsId, page } = obj
  return request.get('/comment/list', {
    params: {
      scoreType,
      goodsId,
      page
    }
  })
}
