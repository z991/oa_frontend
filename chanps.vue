<template>
  <div class="chanps">
    <p class="qu">产品管理 > 运维配置>节点</p>
    <p class="ji">
      <label for="">节点名称</label><input type="text" v-model="messs">
      <label for="">服务器名称</label><input type="text" v-model="messs1">
      <a href="javascript:void(0)" class="so">搜索</a>
      <a href="javascript:void(0)" class="cho">重置</a>
    </p>
    <p class="xinz">
      <a href="javascript:void(0)" class="so">新增</a>
    </p>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      messs: '',
      messs1: '',
      c1: '',
      c2: '',
      c3: '',
      c4: '',
      c5: '',
      c6: ''
    }
  }
}
</script>
<style lang='scss'>
@import '../assets/home'
</style>
