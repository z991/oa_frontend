<template>
    <div class="examine">
        <div class="headerSearch">
            <div class="SearchItem">
                <label>
                    客户名称
                </label>
                <el-input  @keyup.enter.native="onSearchFn" placeholder="请输入客户名称"  size="small" style="width:138px;" v-model="searchData.searchVal"></el-input>

            </div>
            <section class="btn_search">
                <a href="javascript:void(0)" class="so" @click='onSearchFn'>搜索</a>
                <a href="javascript:void(0)" class="cho" @click='onResetFn'>重置</a>
            </section>
            <!-- <el-button @click="onResetFn" size="mini">重置</el-button>
            <el-button @click="onSearchFn" type="primary"  size="mini">搜索</el-button> -->
        </div>
        <div class="Main">
            <h4 class="Main-Title">审批列表</h4>
            <oaTablePages  @onPageChange="onPageChangeBind" :loading="tableLoading" :list="tableDatas" :columns="columns" :operates="operates" :pagination="pagination"/>
        </div>
    </div>
</template>
<script src="./script.js"></script>

<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
