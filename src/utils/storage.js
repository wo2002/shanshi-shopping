// 设置通用键名
const HISTORY_KEY = 'sh_history_list'
const DEFAULT_ID = 'sh_default_id'
const DEFAULT_ADDRESS = 'sh_default_address'

// 获取个人信息
export const getInfo = () => {
  const res = localStorage.getItem('userInfo')
  return res ? JSON.parse(res) : { token: '', userId: '' }
}

// 设置个人信息
export const setInfo = (info) => {
  localStorage.setItem('userInfo', JSON.stringify(info))
}

// 移除个人信息
export const removeInfo = () => {
  localStorage.removeItem('userInfo')
}

// 获取搜索历史
export const getHistoryList = () => {
  const res = localStorage.getItem(HISTORY_KEY)
  return res ? JSON.parse(res) : []
}

// 保存搜索历史
export const setHistoryList = (list) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(list))
}

// 保存默认Id
export const DefaultId = (id) => {
  localStorage.setItem(DEFAULT_ID, id)
}

// 获取默认id
export const getDefaultId = () => {
  const res = localStorage.getItem(DEFAULT_ID)
  return res ? JSON.parse(res) : {}
}

// 保存收获地址列表
export const setDefaultAddress = (addressList) => {
  localStorage.setItem(DEFAULT_ADDRESS, JSON.stringify(addressList))
}

// 获取收货地址列表
export const getDefaultAddress = () => {
  const res = localStorage.getItem(DEFAULT_ADDRESS)
  return res ? JSON.parse(res) : []
}
