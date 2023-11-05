<template>
  <div class="address">
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar
        title="收货地址"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <!-- 地址信息 -->
    <div class="content">
      <div
        class="addressBox"
        v-for="item in addressList"
        :key="item.address_id"
      >
        <div class="personInfoTop">
          <div class="name">{{ item.name }}</div>
          <div class="phone">{{ item.phone }}</div>
        </div>
        <div class="personInfoBottom">
          <div class="region">
            {{
              item.region.province +
              item.region.city +
              item.region.region +
              item.detail
            }}
          </div>
        </div>
        <!-- 图标标识 -->
        <div class="icon">
          <div class="left">
            <van-checkbox v-model="checked" icon-size="15px" checked-color="#ee0a24" v-if="defaultId === item.address_id ? true : false" @click="selDefaultAddr(item.address_id)">默认</van-checkbox>
            <van-checkbox v-model="isChecked" icon-size="15px" v-else @click="selDefaultAddr(item.address_id)">选择</van-checkbox>

          </div>
          <div class="right">
            <van-icon name="edit" size="15" />编辑
            <van-icon name="delete-o" size="15" />删除
          </div>
        </div>
      </div>
    </div>

    <!-- 添加收货地址 -->
    <div class="footer">
      <van-button round type="info" color="linear-gradient(to right, #ee0a24,#ff6034 )" @click="addAddress">添加新地址</van-button>
    </div>
  </div>
</template>

<script>
import { DefaultId } from '@/utils/storage'
// import { setDefaultId } from '@/api/address'
import { mapState } from 'vuex'
export default {
  name: 'addressPage',
  data () {
    return {
      checked: true
    }
  },
  computed: {
    ...mapState('address', ['addressList', 'defaultId', 'preAddress']),
    defaultAddress () {
      return this.defaultId
    },
    isChecked () {
      return !this.checked
    }
    // addressList () {
    //   return getDefaultAddress()
    // }
  },
  created () {
    this.getAddressList()
    this.getAddressId()
    // this.addAddress()
    // this.setDedaultAddress()
  },
  methods: {
    getAddressList () {
      this.$store.dispatch('address/addressListAction')
    },
    getAddressId () {
      this.$store.dispatch('address/addressIdAction')
    },
    addAddress () {
      this.$store.dispatch('address/RegionAction')
      this.$router.push('/addaddress')
    },
    selDefaultAddr (id) {
      this.$store.dispatch('address/SelDefaultIdAction', id)
      // this.$store.commit('address/setDedaultAddress', this.defaultId)
      DefaultId(id)
      // this.$router.push('/pay')
    }
    // addData () {
    //   this.$store.dispatch('address/addAddressDataAction')
    // }
  }
}
</script>

<style lang="less" scoped>
.address {
  width: 375px;
  height: 667px;
  background-color: rgba(250, 250, 250);
  .header {
    ::v-deep {
      .van-nav-bar__title {
        font-style: 20px;
        font-weight: 700;
      }
      .van-nav-bar__arrow,
      .van-nav-bar__text {
        color: #333;
      }
    }
  }
  .content {
    box-sizing: border-box;
    padding: 10px;

    .addressBox {
      padding: 20px;
      background-color: #fff;
      margin-bottom: 10px;
      .personInfoTop {
        display: flex;
        .name {
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
      .personInfoBottom {
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(243, 243, 243);
      }
      .icon {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        font-size: 15px;
        .van-icon-delete-o {
          margin-left: 10px;
        }
      }
    }
  }
  .footer{
    position: fixed;
    bottom: 0;
    padding: 10px 20px;
    background-color: rgba(255, 255, 255);
    .van-button{
      width: 335px;
    }
  }
}
</style>
