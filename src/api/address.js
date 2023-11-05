import request from '@/utils/request'

export const getAddressList = () => {
  return request.get('/address/list')
}

// 获取默认收货地址
export const getAddressId = () => {
  return request.get('/address/defaultId')
}

// 获取省市区地址
export const getRegion = () => {
  return request.get('/region/tree')
}

// 设置默认地址
export const setDefaultId = (addressId) => {
  return request.post('/address/setDefault', {
    addressId
  })
}

// 添加数据
export const addData = (obj) => {
  const { name, phone, region: { value, label } } = obj
  request.post('/address/add', {
    form: {
      name,
      phone,
      region: {
        value,
        label
      }
    }
  })
}
