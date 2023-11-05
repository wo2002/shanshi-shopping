import { getAddressId, getAddressList, getRegion, setDefaultId } from '@/api/address'
import { getDefaultAddress, setDefaultAddress, getDefaultId } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      defaultId: null,
      addressList: [],
      areaList: {}
      // preAddress: []
    }
  },
  mutations: {
    // 获取地址列表
    getAddressList (state, list) {
      // state.addressList = list
      // state.addressList = this.setDedaultAddress
      // state.preAddress = list
      if (state.addressList.length === 0) {
        state.addressList = list
        console.log(111)
      } else {
        state.addressList = getDefaultAddress()
      }
      // console.log(state.addressList.length)
      // console.log(state.preAddress)
      // console.log(state.addressList === state.preAddress)
    },
    // 获取默认地址id
    getAddressId (state, id) {
      state.defaultId = id
    },
    // 获取地区地址
    getArea (state, list) {
      state.areaList = list
      // list.forEach(ele => {
      //   state.areaList = {
      //     province_list: {
      //       id: ele.id,
      //       name: ele.name
      //     },
      //     city_list: {
      //       id: ele[1].city[2].id,
      //       name: ele[1].city[2].name
      //     },
      //     county_list: {
      //       id: ele[1].city[2].region[3].id,
      //       name: ele[1].city[2].region[3].name
      //     }
      //   }
      // })
    },
    // 设置默认地址
    setDedaultAddress (state) {
      // console.log(state.defaultId)
      console.log(state.addressList)
      console.log(state.addressList.find(item => item.address_id === getDefaultId()))
      // const address = state.addressList.find(item => item.address_id !== id)
      const index = state.addressList.findIndex(item => item.address_id === getDefaultId())
      console.log(index)
      const address = state.addressList.splice(index, 1)
      console.log(address)
      state.addressList.splice(0, 0, ...address)
      // setDefaultAddress(addressList)
      console.log(state.addressList)
      setDefaultAddress(state.addressList)
    }
  },
  actions: {
    async addressListAction (context) {
      const res = await getAddressList()
      // console.log(res)
      context.commit('getAddressList', res.data.list)
    },
    async addressIdAction (context) {
      const res = await getAddressId()
      // console.log(res.data.defaultId)
      context.commit('getAddressId', res.data.defaultId)
    },
    async RegionAction (context) {
      const res = await getRegion()
      // const arr = []
      // arr.push(res.data.list)
      // console.log(arr)
      context.commit('getArea', res.data.list)
    },
    async SelDefaultIdAction (context, id) {
      await setDefaultId(id)
      // console.log(res)
      context.dispatch('addressIdAction')
      context.commit('setDedaultAddress')
    }
    // async addAddressDataAction() {
    //   await addData({
    //     name:
    //   })
    // }
  },
  getters: {}
}
