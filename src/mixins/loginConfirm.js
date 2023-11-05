export default {
  // mixins
// 此处编写的是Vue组件实例的，通过一定语法，可以直接混入到组件内部
// 例如：data,methods,computed,生命周期函数
// 如果 此处和组件内，提供了同名的data或 methods,则组件内优先级更高
// 生命周期函数不会产生冲突
  methods: {
    // // 判断是否存在token，是否登录
    loginConfirm () {
      if (!this.$store.getters.token) {
        this.$dialog
          .confirm({
            title: '温馨提示',
            message: '需要登陆后才能操作',
            confirmButtonText: '登录',
            cancelButtonText: '再逛逛'
          })
          .then(() => {
            // on confirm
            // this.$router.push('/login')
            // push进行跳转时，会保留当前页面，跳转到下一个页面，replace会将跳转页面替换掉当前页面
            this.$router.replace({
              path: '/login',
              //  跳转时，转递当前页面的地址并且携带参数（fullPath），path不传递地址
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {
            // on cancel
          })
        return true
      }
      return false
    }
  }
}
