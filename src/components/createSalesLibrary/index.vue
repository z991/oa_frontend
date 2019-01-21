<template>
    <div class="createSalesLibrary">
        <el-steps :active="cardActive" align-center  >
            <el-step title="公司信息" @click="onStepFn"></el-step>
            <el-step title="联系信息"></el-step>
            <el-step title="订单信息"></el-step>
            <el-step title="开通模块"></el-step>
        </el-steps>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>{{cardTitle}}</span>
            </div>
            <!--基本信息dom-->
            <div v-if="customerModel && !contactsModel && !orderModel && !openUpModel">
                <el-form :model="company" :rules="companyRules" ref="company" label-width="230px" class="demo-ruleForm">
                    <el-form-item label="客户名称" prop="company_name">
                            <el-input  v-model="company.company_name" size="small" placeholder="请输入客户名称" style="width:374px;"></el-input>
                    </el-form-item>
                    <el-form-item label="公司简介" prop="abbreviation">
                            <el-input  style="width:374px;"  v-model="company.abbreviation"  placeholder="请输入公司简介" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="公司网址" >
                        <el-input  v-for="(item,index) in company.company_url" :key="index" style="width:374px;"    v-model="item.company_url"    size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址" prop="company_address">
                        <el-select v-model="company.company_address.province" placeholder="请选择" style="width:110px;"     size="small" @change="onProvinceChange(company.company_address.province)">
                            <el-option  v-for="(item,index) in provinceData" :key="index"  :label="item.atitle" :value="item.id"></el-option>
                        </el-select>
                        <el-select v-model="company.company_address.city"  placeholder="请选择" style="width:110px;"     size="small">
                            <el-option v-for="item in cityData" :key="item.atitle"  :label="item.atitle" :value="item.id"></el-option>
                        </el-select>
                        <el-input v-model="company.company_address.detail" style="width: 145px;"  placeholder="请输入地址"   size="small"></el-input>
                    </el-form-item>

                    <el-form-item label="公司邮箱" prop="company_email">
                        <el-input  style="width:374px;"  v-model="company.company_email"    placeholder="请输入公司邮箱" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="所属行业" prop="industry">
                        <el-select v-model="company.industry" placeholder='请选择'  style="width:374px;"     size="small">
                            <el-option
                                    v-for="item in industryList"
                                    :key="item.industry"
                                    :label="item.industry"
                                    :value="item.industry"></el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="营业执照"  prop="GSZZ">
                        <el-input   style="width:374px;" v-model="company.GSZZ"  placeholder="请输入营业执照" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="客户性质" prop="customer_type">
                        <el-select v-model="company.customer_type" placeholder="请选择"  style="width:374px;"     size="small">
                            <el-option v-for="item in natureTypeList" :key="item.label"  :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客服工作区域" prop="service_area">
                        <el-input  style="width:374px;"   v-model="company.service_area" placeholder="请输入客户工作区域" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌效应" prop="brand_effect">
                        <el-select v-model="company.brand_effect" placeholder="请选择"  style="width:374px;"     size="small">
                            <el-option  v-for="item in brandEffectList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户级别" prop="name">
                        <el-select v-model="company.customer_level" placeholder="请选择"  style="width:374px;"     size="small">
                            <el-option  v-for="item in customerLevelList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="平台信息" >
                        <el-input type="textarea" v-model="company.platform_informatiom"  placeholder="请输入平台信息" style="width:374px;"   :autosize="{ minRows: 4, maxRows: 8}"  size="small"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!--联系人信息dom-->
            <div v-if="contactsModel && !customerModel && !orderModel && !openUpModel"  v-for="(item,index) in contactsForm"  :key="index">
                <el-form  refs="contactsForm" :rules="contactsRules"   :model="item" label-width="230px" class="demo-ruleForm">
                    <el-form-item :label='linkinfoLabel.type'  prop="link_type">
                        <el-select  v-model="item.link_type" style="width:374px;"     size="small" >
                            <el-option key="客户方业务" label="客户方业务" :value=1></el-option>
                            <el-option key="客户方项目" label="客户方项目" :value=2></el-option>
                            <el-option key="客户方技术" label="客户方技术" :value=3 ></el-option>
                            <el-option key="商务（小能）" label="商务（小能）" :value=4></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label='linkinfoLabel.name' prop="linkman">
                        <el-input  v-model="item.linkman" style="width:374px;"     size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label='linkinfoLabel.phone' prop="link_phone">
                        <el-input  v-model="item.link_phone" style="width:374px;"     size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label='linkinfoLabel.email'  prop="link_email">
                        <el-input   v-model="item.link_email" style="width:374px;"     size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label='linkinfoLabel.QQ' prop="link_qq">
                        <el-input  v-model="item.link_qq" style="width:374px;"     size="small"></el-input>
                    </el-form-item>
                    <el-form-item :label='linkinfoLabel.work'>
                        <el-input  v-model="item.link_work"  style="width:374px;"     size="small"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <!--订单信息dom-->
            <div v-if="orderModel && !customerModel && !contactsModel && !openUpModel ">
                <el-form :model="orderForm" :rules="orderRules" ref="orderForm" label-width="230px" class="demo-ruleForm">
                    <el-form-item label="产品版本" prop="classify">
                        <el-select v-model="orderForm.classify" placeholder="请选择" style="width:374px;"  size="small">
                            <el-option key="经典版" label="经典版" :value=1></el-option>
                            <el-option key="重构版" label="重构版" :value=2></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务模式" prop="cli_version">
                        <el-select v-model="orderForm.cli_version" placeholder="请选择" style="width:374px;"  size="small">
                            <el-option key="B2B" label="B2B" :value=1></el-option>
                            <el-option key="B2C" label="B2C" :value=2></el-option>
                            <el-option key="B2B2C" label="B2B2C"  :value=3></el-option>
                            <el-option key="不限" label="不限" :value=4></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="部署方式"  prop="deploy_way">
                        <el-select v-model="orderForm.deploy_way" placeholder="请选择" style="width:374px;"  size="small">
                            <el-option key="标准版" label="标准版" :value=1></el-option>
                            <el-option key="公有云" label="公有云" :value=2></el-option>
                            <el-option key="专属云" label="专属云"  :value=3></el-option>
                            <el-option key="私有云" label="私有云" :value=4></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="坐席数" prop="kf_number">
                        <el-input  v-model="orderForm.kf_number" style="width:374px;"     size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="合同金额" prop="contract_amount">
                        <el-input  style="width:374px;" v-model="orderForm.contract_amount"    size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="回款金额" prop="amount_cashed">
                        <el-input  style="width:374px;" v-model="orderForm.amount_cashed  "     size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="合同开始时间" prop="contract_start_time">
                        <el-date-picker
                                align="right"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                @change="getSTime"
                                v-model="orderForm.contract_start_time"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item label="合同结束时间" prop="contract_end_time">
                        <el-date-picker
                                align="right"
                                type="date"
                                value-format="yyyy-MM-dd"
                                placeholder="选择日期"
                                v-model="orderForm.contract_end_time"
                                :picker-options="pickerOptions">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="是否签署合同" prop="sign_contract">
                        <el-select v-model="orderForm.sign_contract" placeholder="请选择"  style="width:374px;"     size="small">
                            <el-option  key="否" label="否" :value=0></el-option>
                            <el-option  key="是" label="是" :value=1></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="合同编号" prop="contract_index">
                        <el-input  style="width:374px;"   v-model="orderForm.contract_index"   size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="是否已特批"   prop="special_selection">
                        <el-select v-model="orderForm.special_selection" placeholder="请选择"  style="width:374px;"     size="small">
                            <el-option  key="否" label="否" :value=0></el-option>
                            <el-option  key="是" label="是" :value=1></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="培训方式" prop="training_method">
                        <el-select v-model="orderForm.training_method" placeholder="请选择"  style="width:374px;"     size="small">
                            <el-option  v-for="item in trainingMethodList" :key="item.label" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="UV/天" prop="visitor">
                        <el-input  style="width:374px;"   v-model="orderForm.visitor"   size="small"></el-input>

                    </el-form-item>
                    <el-form-item label="PV/天" prop="consult">
                        <el-input  style="width:374px;"   v-model="orderForm.consult "   size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="附件">
                        <el-upload
                                v-model="orderForm.contract_accessory"
                                class="upload-demo"
                                drag
                                name="myFileName"
                                :file-list="fileList"
                                accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                                action="/api/setup/save_accessory/"
                                :before-upload="beforeAvatarUpload"
                                :on-success="handleUploadSuccess"
                                :on-remove="handleRemoveCover"
                                multiple>
                            <i class="el-icon-plus" style="font-size:40px;"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
            <!---->
            <div v-if="openUpModel && !orderModel && !customerModel && !contactsModel">
                <el-form :model="openUpForm"  ref="openUpForm" label-width="230px">
                    <el-form-item label="开通模块">
                     <el-checkbox-group   v-model="openUpForm.function_info" class="checkGroup" >
                          <el-checkbox  v-for="(item,index) in openUpModelData" :label="item.id"   :key="item.id"  @change="handleCheckedCitiesChange">{{item.label}}</el-checkbox>
                     </el-checkbox-group>
                </el-form-item>
                </el-form>

            </div>
            <div class="btnClass">
                <!--基本信息-->
                <div v-if="customerModel && !contactsModel && !orderModel && !openUpModel ">
                    <el-button @click="onEndBind" size="mini" >取消</el-button>
                    <el-button type="primary" @click="onNextBind('contactsModel','company')"  size="mini">下一步</el-button>
                </div>
                <!--联系人信息-->
                <div v-if="contactsModel && !customerModel && !orderModel && !openUpModel">
                    <el-button @click="onPrevBind('customerModel')" size="mini"  >上一步</el-button>
                    <el-button type="primary" @click="onNextBind('orderModel','contactsForm')" size="mini" >下一步</el-button>
                </div>
                <!--订单信息-->
                <div v-if="orderModel && !customerModel && !contactsModel && !openUpModel">
                    <el-button @click="onPrevBind('contactsModel')" size="mini" >上一步</el-button>
                    <el-button type="primary" @click="onNextBind('openUpModel','orderForm')" size="mini">下一步</el-button>
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