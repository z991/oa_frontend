/*
 * @Author: liuqian 
 * @Date: 2018-08-03 10:54:20 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-09-06 14:39:40
 */
<template>
    <div class="homePage">
        <div class="induction">
            <div class="singleCase" v-for="(item,index) in homoeTop" :key="index">
                <span class="fl" :class="iconClass[index]"></span>
                <span class="singNum fl">
                  <p style="text-align:center;" class="allNum">{{item.total}}  <span></span></p>
                  <p style="text-align:center;height:20px">{{item.totalName}}</p>
                  <!-- <p class="contrast">{{item.name}} :   {{item.today}}</p> -->
                    <!-- <p>{{item.name}}</p>
                    <p class="current">{{item.today}}</p> -->
                    <!-- <p class="contrast">（较前一日）{{item.yesterday}}
                       <img v-show="item.rate === -1" style="margin:0 5px;" src="../../assets/drop.png" />
                      <img  v-show="item.rate === 1" style="margin:0 5px;" src="../../assets/up.png" /><span class="down">{{item.percent}}%</span>
                    </p> -->
                </span>
            </div>
        </div>
        <div class="timeChoose">
            <div style="margin-left:20px;">
                <span :class="{pitchBtn: electSlot.lateThr}" @click="lateThr" @keyup.tab="lateThr">近3天</span>
                <span :class="{pitchBtn: electSlot.lateWeek}" @click="lateWeek" @keyup.tab="lateWeek">近7天</span>
                <span :class="{pitchBtn: electSlot.lateMon}" @click="lateMon" @keyup.tab="lateMon">近30天</span>
            </div>
        </div>
        <div class="trend">
            <div class="trendSum">
                <div class="sumTitle">
                    <p class="fl">趋势总图</p><p class="fr"><img title="企业数据统计" @click="general_trend" style="cursor:pointer" src="../../assets/detail.png" alt="" /></p>
                </div>
                <div style="text-align:left;">
                  <span class="switchBtn mar30">
                    <!-- <span :class="{opt: isOpt}" @click="cutConsult">咨询量</span><span :class="{opt: !isOpt}" @click="cutVisitor">访客量</span> -->
                    <div class="echart_header_taregt">
                        <el-radio-group v-model="target" size="small" @change='changeIndex'>
                            <el-radio-button label="咨询量"></el-radio-button>
                            <el-radio-button label="访客量"></el-radio-button> 
                        </el-radio-group>
                    </div>
                  </span>
                </div>
                <div id="trendChart" :style="{width: '95%', height: '310px', margin: '0 auto'}"></div>
            </div>
            <div class="trendSum">
                <div class="sumTitle mar30">
                    <p class="fl">咨询量渠道占比图</p><p class="fr"><img title="渠道统计" @click="consult_ditch" style="cursor:pointer" src="../../assets/detail.png" alt="" /></p>
                </div>
                <div id="consultChart" :style="{width: '95%', height: '310px', margin: '0 auto'}"></div>
            </div>
        </div>
        <div class="deploy">
            <div class="deployTitle mar30">
                <p class="fl">部署咨询量趋势</p><p class="fr"></p>
            </div>
            <div class="diagram">
                <div class="half">
                  <div id="deployChart1" :style="{width: '95%', height: '310px', margin: '0 auto'}"></div>
                </div>
                <div class="half">
                  <div id="deployChart2" :style="{width: '95%', height: '310px', margin: '0 auto'}"></div>
                </div>
            </div>
        </div>
        <div class="trend">
            <div class="trendSum">
                <div class="sumTitle mar30">
                    <p class="fl">节点咨询量 TOP10</p><p class="fr"><img title="节点统计" @click="node_consult" style="cursor:pointer" src="../../assets/detail.png" alt="" /></p>
                </div>
                <div class="form">
                    <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                        <el-table-column 
                        prop="grid"
                        label="节点名称"
                        align="center"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="total"
                        label="咨询量"
                        align="center"
                        width="180">
                        </el-table-column>
                        <el-table-column
                        prop="percent"
                        align="center"
                        label="占比">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="trendSum">
                <div class="sumTitle mar30">
                    <p class="fl">行业咨询量TOP10</p><p class="fr"><img title="行业统计" @click="industry_consult" style="cursor:pointer" src="../../assets/detail.png" alt="" /></p>
                </div>
                <div id="industryChart" :style="{width: '80%', height: '310px', margin: '0 auto'}"></div>
            </div>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./../../assets/home.scss" scoped></style>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
.el-table td, .el-table th{padding:4px 0;}
</style>
