<template>
  <div class="addAddress">
    <div class="header">
      <van-nav-bar
        title="新增收获地址"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="content">
      <span class="title">收货地址</span>
      <form action="">
        <ul>
          <li>
            <label class="name">姓名</label>
            <input type="text" placeholder="请输入收件人姓名" />
            <div class="hint">请输入姓名</div>
          </li>
          <li>
            <label class="phone">姓名</label>
            <input type="text" placeholder="请输入收件人手机号" />
            <div class="hint">请输入手机号</div>
          </li>
          <li>
            <label class="area">地区</label>
            <!-- <van-area title="标题" :area-list="areaList" /> -->
            <div class="areaInfo" @click="showArea">请选择省/市/区</div>
          </li>
        </ul>
      </form>
    </div>
    <!-- 显示区域面板 -->
    <!-- <van-popup v-model="showPanel" round position="bottom" :style="{ height: '30%' }" >
      <van-area :area-list="areaList" />
    </van-popup> -->
    <van-action-sheet v-model="showPanel" title="标题">
      <van-area :area-list="areaList" />
    </van-action-sheet>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import { areaList } from '@vant/area-data'
export default {
  data: function () {
    return {
      showPanel: false,
      areaList
      // areaList: {
      //   province_list: {
      //     110000: '北京市',
      //     120000: '天津市'
      //   },
      //   city_list: {
      //     110100: '北京市',
      //     120100: '天津市'
      //   },
      //   county_list: {
      //     110101: '东城区',
      //     110102: '西城区'
      //     // ....
      //   }
      // }
    }
  },
  computed: {
    // ...mapState('address', ['areaList'])
  },
  methods: {
    showArea () {
      this.showPanel = true
    }
  }
}
</script>

<style lang="less" scoped>
.addAddress {
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
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    .title {
      position: absolute;
      padding-top: 15px;
      // margin-bottom: 10px;
      color: rgba(140, 153, 160);
      font-size: 14px;
    }
    form {
      position: absolute;
      top: 45px;
      background-color: rgba(255, 255, 255);
      padding: 20px;
      border-radius: 10px;
      ul {
        li {
          width: 100%;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid rgba(246, 247, 249);
          &:nth-child(3) {
            display: flex;
            .areaInfo {
              // color: green;
              font-size: 13px;
            }
          }
          .name {
            margin-right: 30px;
            font-size: 14px;
          }
          .phone {
            margin-right: 30px;
            font-size: 14px;
          }
          .area {
            margin-right: 30px;
            font-size: 14px;
          }
          [type="text"] {
            border: none;
            &::placeholder {
              font-size: 13px;
              color: rgba(140, 153, 160);
            }
          }
          .hint {
            margin-top: 8px;
            margin-left: 63px;
            font-size: 12px;
            color: red;
            display: none;
          }
        }
      }
    }
  }
}
</style>
