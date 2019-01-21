<template>
  <div class="chanp">
      <!-- <p class="qu">产品管理 > 重构版产品配置</p> -->
      <p class="ji"><label for="">产品名称</label><input type="text" v-model="messs"  @keyup.enter="search">
          <a href="javascript:void(0)" class="so" @click='search()'>搜索</a><a href="javascript:void(0)" class="cho" @click='chon()'>重置</a></p>
      <p class="xinz"><a href="javascript:void(0)"  class="so" @click='add()'>新增</a></p>
      <p class="cp">
          <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
          <a href="javascript:void(0)" class="wid4">产品名称</a>
          <a href="javascript:void(0)" class="wid4">当前版本</a>
          <a href="javascript:void(0)" class="wid4">操作</a> 
      </p>
      <ul class="it">
          <li v-for="(item,index) in items" :key="item.id">
              <span class="wid_1 wid4">{{item.index}}</span>
              <span class="wid4">{{item.product}}</span>
              <span class="wid4">{{item.version}}</span>
              <span class="wid4">
                    <a href="javascript:void(0)" class="bian" @click="bian(item.id)"><i class="el-icon-edit"></i></a>
                    <a href="javascript:void(0)" class="dele" @click='delet(item.id,index)'><i class="el-icon-delete"></i></a>
                <!-- <a href="javascript:void(0)" class="bian" @click="bian(item.id)"></a>
                <a href="javascript:void(0)" class="dele" @click='delet(item.id,index)'></a> -->
                </span>
          </li>
      </ul>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
  </div>
</template>
<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<script src="./index.js"></script>
<style>
.chanp .el-message-box__message {
    width: 20%;   
}
</style>
