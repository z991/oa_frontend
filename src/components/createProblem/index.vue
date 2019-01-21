<template>
        <div class="createProblem">

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{cardTitle}}</span>
            </div>
            <!--基本信息dom-->
            <div>
                <el-form :model="company" :rules="companyRules" ref="company" label-width="230px" class="demo-ruleForm">
                    <el-form-item label="问题类型" prop="industry">
                        <el-select v-model="company.industry" placeholder='请选择'  style="width:374px;"     size="small">
                            <el-option
                                    v-for="item in industryList"
                                    :key="item.industry"
                                    :label="item.industry"
                                    :value="item.industry"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="经办人" prop="industry">
                        <el-select v-model="company.industry" placeholder='请选择'  style="width:374px;"     size="small">
                            <el-option
                                    v-for="item in industryList"
                                    :key="item.industry"
                                    :label="item.industry"
                                    :value="item.industry"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="问题名称" prop="company_name">
                        <el-input  v-model="company.company_name" size="small" placeholder="请输入客户名称" style="width:374px;"></el-input>
                    </el-form-item>
                    <el-form-item label="培训方式" prop="industry">
                        <el-select v-model="company.industry" placeholder='请选择'  style="width:374px;"     size="small">
                            <el-option
                                    v-for="item in industryList"
                                    :key="item.industry"
                                    :label="item.industry"
                                    :value="item.industry"></el-option>

                        </el-select>
                    </el-form-item>

                    <el-form-item label="客户现状描述" >
                        <el-input type="textarea" v-model="company.platform_informatiom"  placeholder="请输入平台信息" style="width:374px;"   :autosize="{ minRows: 4, maxRows: 8}"  size="small"></el-input>
                    </el-form-item>

                    <el-form-item label="培训联系人" prop="abbreviation">
                            <el-input  style="width:374px;"  v-model="company.abbreviation"  placeholder="请输入公司简介" size="small"></el-input>
                    </el-form-item>

                    <el-form-item label="培训联系人电话" prop="company_email">
                        <el-input  style="width:374px;"  v-model="company.company_email"    placeholder="请输入公司邮箱" size="small"></el-input>
                    </el-form-item>

                    <el-form-item label="培训联系人QQ"  prop="GSZZ">
                        <el-input   style="width:374px;" v-model="company.GSZZ"  placeholder="请输入营业执照" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="培训联系人职位" prop="service_area">
                        <el-input  style="width:374px;"   v-model="company.service_area" placeholder="请输入客户工作区域" size="small"></el-input>
                    </el-form-item>

                </el-form>
            </div>

                <!--开通模块-->
                <div  v-if="openUpModel && !orderModel && !customerModel && !contactsModel ">
                    <el-button @click="onPrevBind('orderModel')" size="mini">上一步</el-button>
                    <el-button type="primary"  size="mini" v-if="getLibraryData.modelName=='salesAgain'"  @click="onPutFn('salesAgain')" >再次申请</el-button>
                    <el-button @click="onPutFn('cscDetail')"  v-if="getLibraryData.modelName =='cscdetail'" size="mini"  type="primary" >修改</el-button>
                    <el-button type="primary"  @click="onStateFn(1)" size="mini" v-if="getLibraryData.modelName == 'csc'"  >开通</el-button>
                    <el-button type="primary" v-if="getLibraryData.id==''" @click="onCreateFn" size="mini" >提交</el-button>
                    <el-button type="primary"  v-if="getLibraryData.id!=='' && getLibraryData.modelName=='sales'"  @click="onPutFn('sales')" size="mini" >修改</el-button>
                    <el-button type="primary" @click="onRejectFn" size="mini"  v-if="getLibraryData.modelName == 'csc'" >驳回</el-button>
                </div>
        </el-card>
        <div  style="width:500px;" v-if="rejectFlag">
            <el-dialog title="驳回原因"
                    :visible.sync="rejectFlag"
                    width="30%"
                    :modal-append-to-body = "false"
            >
            <el-form :model="rejectData" :rules="rejectRules" ref="rejectForm">
                <el-form-item label="原因：" prop="reason" >
                    <el-input  type="textarea" v-model="rejectData.reason" autocomplete="off" style="width: 300px;" :autosize="{ minRows: 4, maxRows: 8}"></el-input>
                </el-form-item>
            </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="rejectFlag = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="onRejectActionBind" size="mini">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script src="./script.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
    .createSalesLibrary .el-steps--horizontal{
        background:#ffffff;
    }
    .createSalesLibrary .el-card__header{
        background:rgb(246,246,246);
        height:42px;
        padding: 11px 20px;
    }
    .createSalesLibrary .el-checkbox{
        display:block;
    }
    .createSalesLibrary .el-dialog{
        width:435px;
    }
    .createSalesLibrary .el-dialog__title{
        font-size:12px;
    }
    .createSalesLibrary .el-form-item__label{
        font-size:12px;
    }

    .createSalesLibrary .el-date-editor .el-input__inner, .createSalesLibrary  .el-upload {
       width: 374px;
    }
    .createSalesLibrary  .el-upload-dragger {
        width: 100%;
    }
    .createSalesLibrary .el-form-item.is-success .el-input__inner {
        border-color: #dcdfe6;
        border: 1px solid #dcdfe6;
    }
    .createSalesLibrary .upload-demo .el-upload-dragger{
        padding-top: 60px;
    }
    .createSalesLibrary .upload-demo .el-upload-dragger .el-icon-plus {
        color: #b5b7b8
    }
</style>