<template>
  <div class="hello">
    <img src='../assets/logo.png'/><span>小能云平台后台管理系统</span>
    <p>账号:</p>
    <p><input type="text" /></p>
    <p>密码:</p>
    <p><input type="password" /></p>
    <p>验证码:</p>
    <p><input type="text" /> <img src="" alt=""></p>
    <p>登录</p>
    <p>如有登录问题联系运维部门维护人员</p>
    <img src="../assets/ima.png" alt="" class="ima">
  </div>
</template>

<script>
export default {
  name: 'hello',
  data:function(){
    return {msn:'2'}
  }  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped="scss" scoped>
.hello{background:url(../assets/back.png) no-repeat ;width:1200px;height:675px;margin:auto;position:relative;

}
</style>
