<template>
  <div class="userManage">
    <!-- 用户列表 -->
    <div class="listShow" v-show="exhibition">
      <div class="addLdap">
        <el-button type="primary" v-show="limitIs" @click="getLadp">同步ldap用户数据</el-button>
      </div>
      <div class="addBtn">
        <el-button type="primary" v-show="limitIs" @click="addUser">添加用户</el-button>
      </div>
      <div class="search">
        <el-input placeholder="请输入内容" @input="searchBtn" v-model="searchContent" :readonly="clearData" @focus="clearData=false" :disabled="limitUser"
          class="input-with-select" clearable>
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div style="height:calc(100% - 80px);">
        <div class="userData daily_content">
          <div class="daily_table">
            <el-table :data="filterData" highlight-current-row height="100%" style="width: 103%">
              <el-table-column prop="username" label="用户名" width="180" align="center">
              </el-table-column>
              <el-table-column prop="last_name" label="姓名" width="180" align="center">
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="editInfo(scope.row)" size="small" type="primary">{{controlOpe}}</el-button>
                  <el-button @click="deleteInfo(scope.row)" size="small" type="danger" v-show="limitIs">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="page daily_pages" v-show="pageshow">
            <el-pagination background @current-change="flipOver" :current-page.sync="currPage" layout="total,prev, pager, next,jumper"
              :total="pageAll">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>
    <!-- 用户信息 -->
    <div class="userInfo" v-show="!exhibition">
      <div>
        <label for="">
          <em>*</em>用户名</label>
        <el-input v-model="userFill.cn" @blur="userVerify" :disabled="userAmend" placeholder="请输入内容" clearable></el-input>
      </div>
      <div v-show="emailShow">
        <label for="">
          <em>*</em>邮箱</label>
        <el-input v-model="userFill.mail" :disabled="userAmend" placeholder="请输入内容" clearable></el-input>
      </div>
      <div>
        <label for="">
          <em>*</em>姓名(中文)</label>
        <el-input v-model="userFill.sn" placeholder="请输入内容" clearable></el-input>
      </div>
      <div v-show="passWordShow">
        <label for="">
          <em>*</em>密码</label>
        <el-input v-model="userFill.password" placeholder="请输入内容" type="password" clearable></el-input>
      </div>
      <div class="control">
        <label for="" style="vertical-align:top;"><em>*</em>权限管理</label>
        <div class="tree_container">
          <el-tree
            :data="userFill.permission_list"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-checked-keys="pitchData"
            :props="defaultProps">
          </el-tree>
        </div>
      </div>
      <div style="margin-left:172px;">
        <el-button size="small" @click="cancle">取消</el-button>
        <el-button type="primary" size="small" @click="getCheckedNodes" v-show="limitIs">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss" src="./style.scss" scoped></style>

<style>
  .userManage .el-table__body-wrapper,
  .userManage .el-table__footer-wrapper,
  .userManage .el-table__header-wrapper {
    width: 102%;
  }

  .userManage .el-table__body-wrapper .el-table__body,
  .userManage .el-table__header-wrapper .el-table__header {
    width: 100% !important;
  }
</style>