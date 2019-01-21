/*
 * @Author: liuqian 
 * @Date: 2018-12-06 14:06:13 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-18 10:18:05
 */
<template>
    <div class="productDeploy_create">
        <header>创建问题</header>
        <main>
            <div class="tit_info">
                <div><span>企业ID：</span><span>{{company.company_id}}</span></div>
                <div><span>客户名称：</span><span>{{company.company_name}}</span></div>
                <div><span>部署方式：</span><span>{{company.deploy_way}}</span></div>
                <div><span>客户版本：</span><span>{{company.cli_version}}</span></div>
                <div><span>实施顾问：</span><span>{{company.impl_cslt}}</span></div>
                <div><span>运营顾问：</span><span>{{company.oper_supt}}</span></div>
                <div><span>商务顾问：</span><span>{{company.commercial}}</span></div> 
            </div>
            <div class="main_info">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">
                    <!-- <el-form-item label="问题类型" prop="matter_type" align="left">
                        <el-select v-model="ruleForm.matter_type" placeholder="请选择问题类型">
                            <el-option v-for="item in questionList" :label="item.label" :value="item.value" :key="item.label"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="子站点" prop="children_station">
                        <el-select filterable v-model="ruleForm.children_station" placeholder="请选择">
                            <el-option :label="item.company_id" :value="item.company_id" v-for="(item,index) in subsiteList" :key="index+'a'"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工单主题" prop="workorder_theme" class="unnecessary">
                        <el-input type="textarea" v-model="ruleForm.workorder_theme"></el-input>
                    </el-form-item>
                    <el-form-item label="所属模块" prop="subordinatemodule">
                        <el-select v-model="ruleForm.subordinatemodule" placeholder="请选择">
                            <el-option :label="item.name" :value="item.name" v-for="item in belongModule" :key="item.name"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="功能列表" prop="func_list">
                        <el-col :span="12">
                          <el-select v-model="ruleForm.func_name" placeholder="请选择" @change="changeFunc">
                            <el-option :label="item.func_name" :value="item.func_name" v-for="(item,index) in first_func" :key="index+'b'"></el-option>
                          </el-select>
                        </el-col>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="10">
                          <el-select v-model="ruleForm.func_value" placeholder="请选择">
                            <el-option :label="item.selection__select_name" :value="item.selection__select_name" v-for="item in second_func" :key="item.selection__select_name"></el-option>
                          </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="描述" prop="describe">
                        <el-input type="textarea" v-model="ruleForm.describe"></el-input>
                    </el-form-item>
                    <el-form-item label="上传附件" prop="enclosure">
                        <el-upload
                            v-model="ruleForm.enclosure"
                            class="upload-demo"
                            name="myFileName"
                            :file-list="fileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :before-upload="beforeAvatarUpload"
                            :on-success="trainUploadSuccess"
                            :on-remove="handleRemove"
                            multiple>
                          <el-button size="small" type="primary">+ 选择上传文件</el-button>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </main>
        <footer>
            <el-button size="mini" @click="cancel('ruleForm')">取消</el-button>
            <el-button type="primary" size="mini"  @click="saveFrom('ruleForm')">确定</el-button>
        </footer>
    </div>
</template>

<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
.productDeploy_create .main_info .el-form-item__label {
    text-align: left;
}
.productDeploy_create  .el-checkbox-group .el-checkbox {
    width: 33.3%;
    text-align: left;
    margin: 0;
}

.productDeploy_create .unnecessary .el-form-item__label{
    padding-left: 10px;
}

@media screen and (min-width: 1200px) and (max-width: 1399px) {
    .createQuestions  .el-checkbox-group .el-checkbox {
        width: 50%;
    }
}
@media screen and (min-width: 999px) and (max-width: 1199px) {
    .productDeploy_create  .el-checkbox-group .el-checkbox {
        width: 100%;
    }
}
.productDeploy_create .upload-demo{text-align:left;}
</style>
