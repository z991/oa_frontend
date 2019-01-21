<template>
   <div class="sales">
       <div class="headerSearch">
       <div v-for="(item,index) in searchData" class="SearchItem" :key="index">
           <label>
               {{item.label}}
           </label>
           <el-input @keyup.enter.native="onSearchFn" v-if="item.type =='input' "    size="small" style="width:138px;" v-model="item.value"></el-input>
           <el-select v-model="item.value"  size="small"  placeholder="请选择" v-if="item.type =='select'" style="width:138px;">
               <el-option
                       v-for="item in item.status"
                       :key="item.value"
                       :label="item.name"
                       :value="item.value">
               </el-option>
           </el-select>
       </div>
       <section class="btn_search">
            <a href="javascript:void(0)" class="so" @click='onSearchFn'>搜索</a>
            <a href="javascript:void(0)" class="cho" @click='onResetFn'>重置</a>
        </section>
           <!-- <el-button @click="onResetFn" size="mini">重置</el-button>
           <el-button @click="onSearchFn" type="primary"  size="mini">搜索</el-button> -->

       </div>
   <div class="MainSearch">
       <el-button type="primary" class="cerateLibrary" @click="onCreateLibrary" size="small">创建客户</el-button>
       <oaTablePages @onPageChange="onPageChangeBind" :loading="tableLoading" :list="tableDatas" :columns="columns" :operates="operates" :pagination="pagination"/>
   </div>
   </div>
</template>
<script src="./script.js"></script>

<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
