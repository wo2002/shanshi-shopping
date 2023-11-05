<template>
  <div class="user">
    <div class="head-page" v-if="isLogin">
      <div class="head-img" >
        <img class="prew" :src=" imgUrl || defaultImg " alt="" />
      </div>
       <div class="avatar-box" >
        <label for="upload" @click="submitImage()">更换头像</label>
        <input id="upload" type="file" class="upload">
      </div>
      <div class="info">
        <div class="mobile">{{ detail.mobile }}</div>
        <div class="vip">
          <van-icon name="diamond-o" />
          普通会员
        </div>
      </div>
    </div>

    <div v-else class="head-page" @click="$router.push('/login')">
      <div class="head-img">
        <img :src="defaultImg" alt="" />
      </div>
      <div class="info">
        <div class="mobile">未登录</div>
        <div class="words">点击登录账号</div>
      </div>
    </div>

    <div class="my-asset">
      <div class="asset-left">
        <div class="asset-left-item">
          <span>{{ balance || 0 }}</span>
          <span>账户余额</span>
        </div>
        <div class="asset-left-item">
          <span>{{coupon  || 0}}</span>
          <span>积分</span>
        </div>
        <div class="asset-left-item">
          <span>{{points || 0}}</span>
          <span>优惠券</span>
        </div>
      </div>
      <div class="asset-right">
        <div class="asset-right-item">
          <van-icon name="balance-pay" />
          <span>我的钱包</span>
        </div>
      </div>
    </div>
    <div class="order-navbar">
      <div class="order-navbar-item" @click="$router.push('/myorder?dataType=all')">
        <van-icon name="balance-list-o" />
        <span>全部订单</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/myorder?dataType=payment')">
        <van-icon name="clock-o" />
        <span>待支付</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/myorder?dataType=delivery')">
        <van-icon name="logistics" />
        <span>待发货</span>
      </div>
      <div class="order-navbar-item" @click="$router.push('/myorder?dataType=received')">
        <van-icon name="send-gift-o" />
        <span>待收货</span>
      </div>
    </div>

    <div class="service">
      <div class="title">我的服务</div>
      <div class="content">
        <div class="content-item">
          <van-icon name="records" />
          <span>收货地址</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-o" />
          <span>领券中心</span>
        </div>
        <div class="content-item">
          <van-icon name="gift-card-o" />
          <span>优惠券</span>
        </div>
        <div class="content-item">
          <van-icon name="question-o" />
          <span>我的帮助</span>
        </div>
        <div class="content-item">
          <van-icon name="balance-o" />
          <span>我的积分</span>
        </div>
        <div class="content-item">
          <van-icon name="refund-o" />
          <span>退换/售后</span>
        </div>
      </div>
    </div>

    <div class="logout-btn">
     <button @click="loginOut">退出登录</button>
    </div>
  </div>
</template>

<script>
import { getUserInfoDetail, submitImage } from '@/api/user.js'
import { mapState } from 'vuex'

import defaultImg from '@/assets/default-avatar.png'

import axios from 'axios'
const creator = '老马'
export default {
  name: 'UserPage',
  data () {
    return {
      imgUrl: JSON.parse(localStorage.getItem('imgUrl')),
      detail: {},
      defaultImg
    }
  },
  created () {
    if (this.isLogin) {
      this.getUserInfoDetail()
    }
    this.getUserMoney()
    // this.imgUrl = JSON.parse(localStorage.getItem('imgUrl'))
  },
  computed: {
    ...mapState('user', ['balance', 'coupon', 'points', 'userInfo']),
    isLogin () {
      return this.$store.getters.token
    }
    // imgUrl () {
    //   return JSON.parse(localStorage.getItem('imgUrl'))
    // }

  },
  methods: {
    async getUserInfoDetail () {
      const { data: { userInfo } } = await getUserInfoDetail()
      this.detail = userInfo
      // console.log(this.detail)
      // console.log(this.setBalance)
      // console.log(this.userInfo)
    },

    // 我的余额，积分，优惠卷
    getUserMoney () {
      this.$store.dispatch('user/getUserMoneyAction')
    },
    // 上传头像
    async submitImage () {
      // console.log(e.target)
      // await submitImage()
      document.querySelector('.upload').addEventListener('change', (e) => {
        console.log(e.target.files[0])
        // 新建一个表单对象
        const fd = new FormData()
        fd.append('avatar', e.target.files[0])
        fd.append('creator', creator)
        axios({
          url: 'http://hmajax.itheima.net/api/avatar',
          method: 'PUT',
          data: fd
        }).then(result => {
          console.log(result.data.data)
          const imgUrl = result.data.data.avatar

          document.querySelector('.prew').src = imgUrl
          localStorage.setItem('imgUrl', JSON.stringify(imgUrl))
        })
      })
      const res = await submitImage(this.imgUrl)
      console.log(res)
    },
    // 退出登录
    loginOut () {
      this.$dialog.confirm({
        title: '温馨提示',
        message: '确定要退出登陆吗'
      })
        .then(() => {
          // on confirm
          this.$store.dispatch('user/loginOut')
          this.detail = {}
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding-bottom: 50px;
}

.head-page {
  height: 130px;
  background: url("http://cba.itlike.com/public/mweb/static/background/user-header2.png");
  background-size: cover;
  display: flex;
  align-items: center;

  .head-img {
    position: relative;
//  flex-direction: column;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 10px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

  }
  .avatar-box label{
   position: absolute;
    top: 95px;
    left: 13px;
    font-size: 12px;
  }
  .avatar-box #upload{

    display: none;
  }
}

.info {
  .mobile {
    margin-bottom: 5px;
    color: #c59a46;
    font-size: 18px;
    font-weight: bold;
  }
  .vip {
    display: inline-block;
    background-color: #3c3c3c;
    padding: 3px 5px;
    border-radius: 5px;
    color: #e0d3b6;
    font-size: 14px;
    .van-icon {
      font-weight: bold;
      color: #ffb632;
    }
  }
}

.my-asset {
  display: flex;
  padding: 20px 0;
  font-size: 14px;
  background-color: #fff;
  .asset-left {
    display: flex;
    justify-content: space-evenly;
    flex: 3;
    .asset-left-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      span:first-child {
        margin-bottom: 5px;
        color: #ff0000;
        font-size: 16px;
      }
    }
  }
  .asset-right {
    flex: 1;
    .asset-right-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
      }
    }
  }
}

.order-navbar {
  display: flex;
  padding: 15px 0;
  margin: 10px;
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  .order-navbar-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 25%;
    .van-icon {
      font-size: 24px;
      margin-bottom: 5px;
    }
  }
}

.service {
  font-size: 14px;
  background-color: #fff;
  border-radius: 5px;
  margin: 10px;
  .title {
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 16px;
  }
  .content {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 14px;
    background-color: #fff;
    border-radius: 5px;
    .content-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 25%;
      margin-bottom: 20px;

      .van-icon {
        font-size: 24px;
        margin-bottom: 5px;
        color: #ff3800;
      }
    }
  }
}

.logout-btn {
  button {
    width: 60%;
    margin: 10px auto;
    display: block;
    font-size: 13px;
    color: #616161;
    border-radius: 9px;
    border: 1px solid #dcdcdc;
    padding: 7px 0;
    text-align: center;
    background-color: #fafafa;
  }
}
</style>
