/*
 * @Author: liuqian 
 * @Date: 2018-08-06 16:54:15 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-10-26 14:53:28
 */
<template>
    <div class="business">
        <div class="searchTerm">
            企业ID  <el-input size="small" v-model="parameterSearch.company_id" placeholder="请输入企业ID"></el-input>
            时间  <el-date-picker
                    size="small"
                    v-model="parameterSearch.startDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    format="yyyy - MM - dd "
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            <el-button size="mini" type="primary" @click="inquireChart">查询</el-button>
            <el-button size="mini" type="primary" @click="exportCompany">导出</el-button>
            <!-- <span>{{versionMess}}</span><span>{{rancc}}</span> -->
        </div>
        <!-- 企业名称 -->
        <div class="company_name" v-show="company_name">{{company_name}}</div>
        <div class="deploy">
            <div class="inforLine">
                <p class="deployTitle">PV</p>
                <div class="compare">
                  对比：<input type="checkbox" :disabled="forbidCom" v-model="pickPv" @change="comparePv" />上周周期
                  <!-- 对比：<input type="radio" value="pv" :disabled="forbidCom" v-model="pickPv" />上周周期 -->
                </div>
            </div>
            <div id="firmChartpv" :style="{width: '100%', height: '310px', margin: '0 auto'}"></div>
        </div>
        <div class="deploy">
            <div class="inforLine">
                <p class="deployTitle">UV</p>
                <div class="compare">
                    对比：<input type="checkbox" :disabled="forbidCom" v-model="pickUv" @change="compareUv" />上周周期
                    <!-- 对比：<input type="radio" :disabled="forbidCom" value="uv" v-model="pickUv" />上周周期 -->
                </div>
            </div>
            <div id="firmChartuv" :style="{width: '100%', height: '310px', margin: '0 auto'}"></div>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./../../assets/home.scss" scoped></style>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>