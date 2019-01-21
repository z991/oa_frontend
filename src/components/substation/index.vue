/*
 * @Author: liuqian 
 * @Date: 2018-09-30 11:45:47 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-10-11 17:12:58
 */
<template>
  <div class="subStation">
    <div class="subTitle">开站管理-子站-{{parent_company}}</div>
    <div class="subSearch clear">
      <span class="fl">
         <img src="../../assets/goBack.png" alt="" class="goback" @click="goback"/>
        <label for="">客户名称</label><el-input size="small" v-model="search_val.company_name" placeholder="请输入客户名称" @keyup.enter.native="searchBtn()"></el-input>
        <label for="">企业ID</label><el-input size="small" v-model="search_val.company_id" placeholder="请输入企业ID" @keyup.enter.native="searchBtn()"></el-input>
      </span>
      <span class="searchbtn fr">
        <a href="javascript:void(0)" class="so" @click='searchBtn'>搜索</a>
        <a href="javascript:void(0)" class="cho" @click='resetSearch'>重置</a>
        <!-- <el-button size="small" type="primary" @click="searchBtn">搜索</el-button>
        <el-button size="small" type="info" plain @click="resetSearch">重置</el-button> -->
      </span>
    </div>
    <div class="stationList">
      <div class="listTitle clear">
        <span class="fl">站点数量：{{stationNumber}}</span>
        <span class="searchbtn fr">
          <el-button size="small" type="primary" @click="synchronization">同步</el-button>
          <el-button size="small" type="primary" @click="exportChild">导出</el-button>
          <el-button size="small" type="primary" @click="batchEdit">批量修改</el-button>
      </span>
      </div>
      <div class="stationData">
        <el-table
          ref="multipleTable"
          :data="listData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="index"
            label="序号">
            <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
          </el-table-column>
          <el-table-column
            prop="company_name"
            label="客户名称"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="company_id"
            label="客户ID">
          </el-table-column>
          <el-table-column
            prop="open_station_time"
            label="开站日期">
          </el-table-column>
          <el-table-column
            prop="close_station_time"
            label="到期日期">
          </el-table-column>
          <el-table-column
            prop="industry"
            label="行业">
          </el-table-column>
          <el-table-column
          label="状态"
          width="90">
          <template slot-scope="scope">
            <img src='../../assets/open.png' alt="xx" @click='qie(scope.$index,scope.row.id,scope.row.online_status)' v-if='scope.row.online_status'>
            <img src='../../assets/clo.png' alt="xx" @click='qie(scope.$index,scope.row.id,scope.row.online_status)' v-else >
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <a href="javascript:void(0)" title="编辑" class="bian" @click='editInfo(scope.row.id)'></a>
            <a href="javascript:void(0)" title="删除" class="dele" @click='deleteInfo(scope.row.id)'></a>
          </template>
        </el-table-column>
        </el-table>
        <!-- <div style="margin-top: 20px">
          <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>          -->
      </div>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex' class='pagg'></pagination>
      <shade v-show="shade"></shade>
      <div class="migrate" v-show="editShow">
        <div class="describe">
              <span class="title">修改到期时间</span><i class="close" @click="cancelCopy"></i>
          </div>
          <div class="fillContent">
              <div class="tradeContent" style="margin-bottom:12px;">
                  <p class="chooseNape">
                    <label>时间选择</label>
                    <el-date-picker
                      v-model="pickTime"
                      type="date"
                      placeholder="请选择日期"
                      format="yyyy-MM-dd "
                      value-format="yyyy-MM-dd">
                    </el-date-picker>
                  </p>
              </div>
          </div>
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click="cancelCopy">取消</a>
              <a href="javascript:void(0)" class="save" @click="submitCopy">提交</a>
          </div>
      </div>
    </div>
    
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./../../assets/home.scss" scoped></style>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
.subStation .el-table td, .subStation .el-table th.is-leaf{text-align:center;}
.subStation .el-input{width:170px;}
.subStation .el-table__header-wrapper .has-gutter tr{
  height: 53px;
}
.subStation .el-table__fixed-header-wrapper .el-table__header tr {
  height: 53px;
}
</style>
