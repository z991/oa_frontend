<template>
    <div>
        <div class="header">
            <div @click="goBack"></div>
            <div class="tit">
                <section></section>
                <section class="tit_info">
                    <p>{{companyName}}</p>
                    <p>{{moduleName}}</p>
                </section>
            </div>
        </div>
        <div class="container">
           <div class="check_box">
                <el-dropdown :hide-on-click="false">
                    <el-button type="primary" size="mini">
                        选择显示字段<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="companyField">
                        <el-dropdown-item>
                            <!-- <el-checkbox :indeterminate="isIndeterminateShow" v-model="checkAllShow" @change="handleCheckAllShow">全选</el-checkbox>
                                <div style="margin: 10px 0;"></div> -->
                                <el-checkbox-group v-model="checkedShows" @change="handleCheckedShowChange">
                                    <el-checkbox v-for="item in checkeShows" :label="item.label" :key="item.value" @change="handleCheckChange(item)">{{item.value}}</el-checkbox>
                                </el-checkbox-group>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
           </div>
            <oaTablePages  @onPageChange="onPageChangeBind"  :loading="tableLoading"  :operates='operates' :list="tableDatas" :columns="columns"  :pagination="pagination"/>
        </div>
    </div>
</template>

<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style src="./style.css"></style>
