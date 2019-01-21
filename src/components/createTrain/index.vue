/*
 * @Author: liuqian 
 * @Date: 2018-11-15 16:35:12 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-11-20 16:16:58
 */
<template>
  <div class="createTrain">
    <div class="title">沟通培训需求</div>
    <div class="trainFrom">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="174px" class="demo-ruleForm">
        <el-form-item label="培训讲师" prop="training_instructors">
          <el-select size="small" v-model="ruleForm.training_instructors" placeholder="请选择讲师">
            <el-option v-for="item in trainTrainers" :key="item.last_name" :label="item.last_name" :value="item.last_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培训联系人" prop="training_contact">
          <el-input size="small" v-model="ruleForm.training_contact"></el-input>
        </el-form-item>
        <el-form-item label="培训联系人电话" prop="training_contactnum">
          <el-input size="small" v-model="ruleForm.training_contactnum"></el-input>
        </el-form-item>
        <el-form-item label="培训联系人QQ" prop="training_contactqq">
          <el-input size="small" v-model="ruleForm.training_contactqq"></el-input>
        </el-form-item>
        <el-form-item label="培训联系人职位" prop="training_position">
          <el-input size="small" v-model="ruleForm.training_position"></el-input>
        </el-form-item>
        <el-form-item label="客户培训需求" prop="customer_training_needs">
          <el-input type="textarea" v-model="ruleForm.customer_training_needs"></el-input>
        </el-form-item>
        <el-form-item label="沟通方式" prop="communication_way">
          <el-checkbox-group size="small" v-model="ruleForm.communication_way">
            <el-checkbox v-for="item in communicMode" :label="item.name" :key="item.id">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="最终培训方式" prop="final_training_method">
          <el-select size="small" v-model="ruleForm.final_training_method" placeholder="">
            <el-option v-for="item in trainMode" :key="item.name" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培训预计开始时间" prop="start_time">
          <el-date-picker
            size="small"
            v-model="ruleForm.start_time"
            :picker-options="ruleFormDateBefore"
            type="date"
            placeholder="选择日期"
            format="yyyy - MM - dd "
            value-format="yyyy-MM-dd"
            @change="changeTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="培训预计结束时间" prop="end_time">
          <el-date-picker
            size="small"
            v-model="ruleForm.end_time"
            :picker-options="ruleFormDateAfter"
            type="date"
            placeholder="选择日期"
            format="yyyy - MM - dd "
            value-format="yyyy-MM-dd">
          </el-date-picker>
          <!-- <el-input size="small" v-model="ruleForm.desc"></el-input> -->
        </el-form-item>
        <el-form-item label="未培训原因" prop="untrained_cause">
          <el-input size="small" v-model="ruleForm.untrained_cause"></el-input>
        </el-form-item>
        <el-form-item class="execute">
          <el-button type="primary" @click="submitForm('ruleForm')">确认</el-button>
          <el-button @click="closeForm('ruleForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
.createTrain .el-textarea__inner,.createTrain .el-input--small, .createTrain .el-input--small .el-input__inner{width:530px;}
.execute{border-top:1px solid #eee;padding:14px 30px;text-align:right;}
</style>
