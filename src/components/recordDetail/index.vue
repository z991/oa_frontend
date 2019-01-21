<template>
  <div class="recordDetail">
    <p class="detailTitle"><a href="javascript:void(0)" @click="getBack()"><img src="../../assets/left.png" alt="" /></a>查看详情</p>
    <div class="content">
      <div class="content_part" v-for="(item,index) in record_list" :key="index">
        <p>修改了{{item.name}}：</p>
        <p>原值：</p>
        <p>{{item.old_value}}</p>
        <p>新值：</p>
        <p>{{item.new_value}}</p>
      </div>
      
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./../../assets/home.scss" scoped></style>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>