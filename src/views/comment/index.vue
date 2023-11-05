<template>
  <div class="comment">
    <div class="header">
      <van-nav-bar
        title="商品评价页"
        left-text="返回"
        left-arrow
        @click-left="$router.go(-1)"
      />
    </div>
    <div class="middle">
      <div class="nav">
        <ul>
          <li v-for="(item, index) in choose" :key="index">
            <a
              :class="{ active: activeId === index }"
              @click="commentData(index)"
              >{{ item }}</a>
          </li>
          <!-- <li><a :value="10">好评(10)</a></li>
          <li><a>中评(10)</a></li>
          <li><a>差评(10)</a></li> -->
        </ul>
      </div>
      <div class="comment-item" v-for="item in list" :key="item.comment_id">
        <div class="top">
          <img :src="item.user.avatar_url || defaultImg" alt="" />
          <div class="name">{{ item.user.nick_name }}</div>
          <van-rate
            :size="16"
            :value="item.score / 10"
            color="#ffd21e"
            void-icon="star"
            void-color="#eee"
          />
        </div>
        <div class="content">
          {{ item.content }}
        </div>
        <!-- <img :src="item.images.image_url" alt="" /> -->
        <!-- <img :src="item.images.file.external_url" alt="" /> -->
        <div class="time">
          {{ item.create_time }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import { getProDetail } from '@/api/product'
// 导入默认图片
import defaultImg from '@/assets/default-avatar.png'
export default {
  name: 'CommentList',
  data () {
    return {
      total: '',
      activeId: 0,
      type: -1,
      list: [],
      detail: {},
      defaultImg,
      choose: ['全部', '好评', '中评', '差评']
    }
  },
  computed: {
    goodsId () {
      // 动态路由携带id,用params来获取地址栏id信息
      return this.$route.params.id
    }
  },
  async created () {
    const {
      data: { detail }
    } = await getProDetail(this.goodsId)
    console.log(detail)
    // this.images = detail.goods_images
    this.detail = detail

    this.getCommentList()
  },

  methods: {
    // 获取评价列表
    async getCommentList () {
      const {
        data: {
          list: { data }
        }
      } = await getCommentList({
        scoreType: this.type,
        goodsId: this.detail.goods_id,
        page: 1
      })
      console.log(data)
      this.list = data
      //   console.log(this.list[0].images[0].image_url)
    },
    commentData (index) {
      console.log(index)
      this.activeId = index
      if (index === 0) {
        this.type = -1
        this.getCommentList()
        this.total = this.list.length
      }
      if (index === 1) {
        this.type = 30
        this.getCommentList()
      }
      if (index === 2) {
        this.type = 20
        this.getCommentList()
      }
      if (index === 3) {
        this.type = 10
        this.getCommentList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  .header {
    ::v-deep {
      .van-nav-bar__text {
        color: #333;
      }
    }
  }
  .middle {
    padding: 20px;
    .nav {
      ul {
        display: flex;
        justify-content: space-between;
        li {
          a {
            padding-bottom: 5px;
            color: #333;
          }
          a.active {
            color: #e01222;
            border-bottom: 3px solid #e01222;
          }
        }
      }
    }
    .comment-item {
      font-size: 16px;
      line-height: 30px;
      .top {
        height: 30px;
        display: flex;
        align-items: center;
        margin-top: 20px;
        img {
          width: 20px;
          height: 20px;
        }
        .name {
          margin: 0 10px;
        }
      }
      .time {
        color: #999;
      }
    }
  }
}
</style>
