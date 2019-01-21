/*
 * @Author: liuqian 
 * @Date: 2018-09-13 14:00:31 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-19 18:07:45
 */
<template>
  <div class="createVersion">
    <div class="serviceTitle"><span class="titleDefault">{{versionStatus}}版本管理</span></div>
        <div class='revise'>
            <div class="inContent">
                <p class="serAdd commodify"><label>产品分类</label>
                    <el-radio @change="toggleClassify" v-for="item in produceClassify" :key="item.name" v-model="productData.product_classify" :label="item.value">{{item.name}}</el-radio>
                    <em class="fill">*</em>
                </p>
                <p class='serAdd'><label for="">产品</label>
                    <select style='width:468px;' v-model="productData.product_name">
                        <option v-for="item in productList" :key="item" :value="item">{{item}}</option>
                    </select>
                    <em class="fill">*</em>
                </p>
                <p class='serAdd'><label for="">版本号</label><input placeholder="请输入产品版本号，如7.1.1" v-model="productData.product_version" type="text" ><em class="fill">*</em></p>
                <p class='serAdd'>
                  <label for="">发版时间</label>
                  <el-date-picker
                    v-model="productData.release_date"
                    size="small"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy-MM-dd "
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </p>
                <!-- <p class='serAdd'>
                    <label for="" >发版时间</label><span class='time'></span>
                </p> -->
                <div class='serAdd verExplain'>
                  <label for="">版本说明</label><textarea v-model="productData.product_explain" name="" id="" cols="30" rows="10"></textarea>
                  <img src="../../assets/query.png" alt="" @mouseover="explainShow=true" @mouseout="explainShow=false" /><em class="fill">*</em>
                  <div class="explanation" v-show="explainShow">
                    <p>样例：</p>
                    <p>本次更新</p>
                    <p>发布时间：yymmdd</p>
                    <p>产品版本为vx.y.z；</p>
                    <p>版本说明：简要概括本次产品迭代的目标和需要达到的效果；</p>
                    <p>【全新内容】</p>
                    <p>1.新增XX模块1/功能1，达到XX效果/目的；</p>
                    <p>2.新增XX模块2/功能2，达到XX效果/目的；</p>
                    <p>【产品优化】</p>
                    <p>1.优化现有XX模块1/功能1，改进了/整合了XX体验/操作/展示，达到XX效果/目的；</p>
                    <p>2.优化现有XX模块2/功能2，改进了/整合了XX体验/操作/展示，达到XX效果/目的；</p>
                    <p>【修复内容】</p>
                    <p>1.修复XX模块1/功能1，增强了/整合了XX体验/操作/展示，达到XX效果/目的；</p>
                    <p>2.修复XX模块2/功能2，增强了/整合了XX体验/操作/展示，达到XX效果/目的；</p>
                  </div>
                </div>
                
            </div>
            <p class='bao' style=''><a href="javascript:void(0)" class='quu' @click="cancelProduct">取消</a><a href="javascript:void(0)" class='qub' @click="saveInfo">保存</a></p>
        </div>
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./../../assets/home.scss" scoped></style>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
 .createVersion .el-input--mini .el-input__inner{height:32px;line-height: 32px;}
 .createVersion .el-date-editor.el-input, .el-date-editor.el-input__inner{width:470px;}
</style>
