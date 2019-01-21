/*
 * @Author: liuqian 
 * @Date: 2018-12-06 14:06:52 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-10 10:20:54
 */
<template>
  <div class="productDeployList">
    <div class="detailTitle clear" v-show="clientShow">
      <div class="goback fl" @click="goBack">
        <img src="../../assets/goBack.png" alt="" />
      </div>
      <div class="explain fl">
        <p>{{briefLeft.company_name}}</p>
        <p>{{briefLeft.matter_name}}</p>
      </div>
    </div>

    <oaTablePages  @onPageChange="onPageChangeBind" :loading="tableLoading"  :operates='operates' :list="tableDatas" :columns="columns"  :pagination="pagination"/>    
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>