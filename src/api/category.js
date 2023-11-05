import request from '@/utils/request'
// 获取商品id
export const getCategoryData = () => {
  return request.get('/category/list')
}
