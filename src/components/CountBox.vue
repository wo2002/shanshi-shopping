<template>
  <div class="count-box">
    <button @click="sub()" class="sub">-</button>
    <input @change="handleChange" type="text" :value="value"/>
    <button @click="add()" class="add">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    add () {
      this.$emit('input', this.value + 1)
    },
    sub () {
      this.$emit('input', this.value - 1 > 1 ? this.value - 1 : 1)
    },
    handleChange ($event) {
    //   console.log($event.target.value)
      const num = +$event.target.value
      //   console.log(typeof num)
      if (isNaN(num) || num <= 0) {
        $event.target.value = this.value
      }
      this.$emit('input', +$event.target.value)
    }
  }
}
</script>

<style lang="less">
.count-box {
  width: 100px;
  display: flex;
  justify-content: space-between;
  input {
    width: 35px;
    height: 30px;
    text-align: center;
  }
  .add,
  .sub {
    width: 30px;
    height: 30px;
  }
}
</style>
