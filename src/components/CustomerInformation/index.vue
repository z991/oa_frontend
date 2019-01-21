<template>
    <div class="customerInfo"  v-loading="!states">
        <div class="header" v-if="datas">
            <div style="width:calc(100% - 200px)">{{datas.company_info.company_name}}</div>
            <div style="width:200px" v-show="!states">
                <el-button type="primary" size="mini"  @click="back()">返 回</el-button>
                <el-button type="primary" size="mini"  @click="onReloadFn()">重新加载</el-button>
            </div>
            <div style="width:200px" v-show="states && leftTabIndex == '1'">
                <el-button v-show="leftTabIndex == '1'" type="primary" size="mini"  @click="addRemark">添加备注</el-button>
                <el-button v-show="leftTabIndex == '1'" type="primary" size="mini"  @click="addCommunication">添加沟通</el-button>
            </div>
            <!-- <div style="width:200px;display:flex;justify-content:flex-end;" v-show="states && leftTabIndex == '2' && button_list">
                <el-button style="height: 30px;margin: 5px;" type="primary" size="mini"  @click="createQuestion">创建问题</el-button>                
            </div> -->
        </div>
        <div class="container" v-if="datas">
            <div class="infoLeft">
                <div class="leftHeader">
                    <span :class="{leftTabActive: leftTabIndex == '1'}" @click="changeleftTabIndex(1)">详细信息</span>
                    <span :class="{leftTabActive: leftTabIndex == '2'}" @click="changeleftTabIndex(2)">相关</span>
                    <el-button v-show="leftTabIndex == '1'" type="primary" style="margin-left:calc(100% - 245px)" size="mini" :disabled="!states"  @click="edit()">修 改</el-button>
                </div>
                <div class="leftContainer" v-show="leftTabIndex == '1'">
                    <!-- 基本资料 -->
                    <div class="box">
                        <div class="boxHeader">
                            <div>基本资料</div>
                        </div>
                        <div class="boxContent">
                            <ul>
                                <li>
                                    <span><em class='ii'>*</em>公司名称：</span> 
                                    <span>
                                        <el-input placeholder="请输入公司名称" v-model="datas.company_info.company_name"  maxlength="50" :disabled="isDisabled" @blur="checkText(0,datas.company_info.company_name,'公司名称')"></el-input>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>公司简介：</span> 
                                    <span>
                                        <el-input placeholder="请输入公司简介" v-model="datas.company_info.abbreviation" :disabled="isDisabled" @blur="checkText(0,datas.company_info.abbreviation,'公司简介')"></el-input>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>公司邮箱：</span> 
                                    <span>
                                        <el-input placeholder="请输入公司邮箱" v-model="datas.company_info.company_email" :disabled="isDisabled"  @blur="checkText(1,datas.company_info.company_email)"></el-input>
                                    </span>
                                </li>
                                <li style="height:auto">
                                    <span><em class='ii'></em><em class='ii'></em>公司网址：</span> 
                                    <span>
                                        <div v-if="datas.company_info.company_url.length" v-for="(item,index) in datas.company_info.company_url" :key="index" style="margin-bottom:10px">
                                            <el-input placeholder="请输入公司网址" v-model="item.company_url" :disabled="isDisabled"></el-input>
                                        </div>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'></em><em class='ii'></em>公司地址：</span> 
                                    <span class="componyAdd">
                                        <el-select v-model="datas.company_info.company_address.province" placeholder="请选择"  @change='changeProvince(0,datas.company_info.company_address.province)' :disabled="isDisabled">
                                            <el-option
                                            v-for="item in company_info.provinces"
                                            :key="item.id"
                                            :label="item.atitle"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                        <el-select v-model="company_info.city" placeholder="请选择"  @change="changeCity" :disabled="isDisabled">
                                            <el-option
                                            v-for="item in company_info.citys"
                                            :key="item.id"
                                            :label="item.atitle"
                                            :value="item.id">
                                            </el-option>
                                        </el-select>
                                        <el-input placeholder="请输入内容" v-model="company_info.detail"  :title="company_info.detail" :disabled="isDisabled"></el-input>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>所属行业：</span> 
                                    <span>
                                         <el-select style="width:100%" v-model="datas.company_info.industry" placeholder="请选择" :disabled="isDisabled">
                                            <el-option
                                            v-for="item in company_info.industrys"
                                            :key="item.industry"
                                            :label="item.industry"
                                            :value="item.industry">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>营业执照：</span> 
                                    <span>
                                        <el-input placeholder="请输入营业执照" v-model="datas.company_info.GSZZ " :disabled="isDisabled" @blur="checkText(0,datas.company_info.GSZZ,'营业执照')"></el-input>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'></em><em class='ii'></em>客服服务区域：</span> 
                                    <span>
                                        <el-input placeholder="请输入客服服务区域" v-model="datas.company_info.service_area" :disabled="isDisabled"></el-input>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'></em><em class='ii'></em>品牌效应：</span> 
                                    <span>
                                        <el-select style="width:100%" v-model="datas.company_info.brand_effect" placeholder="请选择" :disabled="isDisabled"> 
                                            <el-option
                                            v-for="item in company_info.brand_effects"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'></em><em class='ii'></em>客户级别：</span> 
                                    <span>
                                        <el-select style="width:100%"  v-model="datas.company_info.customer_level" placeholder="请选择" :disabled="isDisabled">
                                            <el-option
                                            v-for="item in company_info.customer_levels"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                <li class="infoBox">
                                    <span><em class='ii'></em><em class='ii'></em>平台信息：</span> 
                                    <span class="infoAdd">
                                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 8}" placeholder="请输入平台信息"  v-model="datas.company_info.platform_informatiom" :disabled="isDisabled"></el-input>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 联系信息 -->
                    <div class="box">
                        <div class="boxHeader">
                             <div>联系信息</div>
                        </div>
                        <div class="boxContent">
                            <ul>
                                <li v-for="(obj,index) in datas.link_info" :key="index" style="height:auto;display:inline-block;padding-right:0">
                                    <ul>
                                        <li>
                                            <span style="width:150px;"><em class='ii'>*</em>类型：</span> 
                                            <span>
                                                  <el-select style="width:100%" v-model="obj.link_type" placeholder="请选择" :disabled="isDisabled">
                                                    <el-option
                                                    v-for="item in link_info_types"
                                                    :key="item.label"
                                                    :label="item.label"
                                                    :value="item.value">
                                                    </el-option>
                                                </el-select>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:150px;"><em class='ii'>*</em>联系人姓名:</span> 
                                            <span>
                                                <el-input placeholder="请输入内容" v-model="obj.linkman" :disabled="isDisabled" @blur="checkText(0,obj.linkman,'联系人')"></el-input>
                                            </span>
                                        </li>
                                        <li>
                                            <span style="width:150px;"><em class='ii'></em><em class='ii'></em>联系人职务:</span> 
                                            <span>
                                                <el-input placeholder="请输入内容" v-model="obj.link_work" :disabled="isDisabled"></el-input>
                                            </span>
                                        </li>
                                        <li>
                                              <span style="width:150px;"><em class='ii'>*</em>联系人电话：</span> 
                                            <span>
                                                <el-input placeholder="请输入内容" v-model="obj.link_phone" :disabled="isDisabled" @blur="checkText(3,obj.link_phone)"></el-input>
                                            </span>
                                        </li>
                                        <li>
                                             <span style="width:150px;"><em class='ii'>*</em>联系人邮箱：</span>  
                                            <span>
                                                <el-input placeholder="请输入内容" v-model="obj.link_email" :disabled="isDisabled" @blur="checkText(1,obj.link_email)"></el-input>
                                            </span>
                                        </li>
                                        <li>
                                             <span style="width:150px;"><em class='ii'>*</em>联系人QQ：</span>  
                                            <span>
                                                <el-input placeholder="请输入内容" v-model="obj.link_qq" :disabled="isDisabled" @blur="checkText(2,obj.link_qq)"></el-input>
                                            </span>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 订单信息 -->
                    <div class="box">
                        <div class="boxHeader">
                            <div>订单信息</div>
                        </div>
                        <div class="boxContent">
                            <ul>
                                <li>
                                    <span><em class='ii'>*</em>产品版本：</span> 
                                    <span>
                                        <el-select style="width:100%" v-model="datas.order_info.classify" placeholder="请选择" :disabled="isDisabled">
                                            <el-option
                                            v-for="item in order_info.classifys"
                                            :key="item.label"
                                            :label="item.value"
                                            :value="item.label">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>业务模式：</span> 
                                    <span>
                                        <el-select style="width:100%" v-model="datas.order_info.cli_version" placeholder="请选择" :disabled="isDisabled">
                                            <el-option
                                            v-for="item in order_info.cli_versions"
                                            :key="item.label"
                                            :label="item.value"
                                            :value="item.label">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>部署方式：</span> 
                                    <span>
                                        <el-select style="width:100%" v-model="datas.order_info.deploy_way" placeholder="请选择" :disabled="isDisabled">
                                            <el-option
                                            v-for="item in order_info.deploy_ways"
                                            :key="item.label"
                                            :label="item.value"
                                            :value="item.label">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>座席数：</span> 
                                    <span>
                                        <el-input placeholder="请输入内容" v-model="datas.order_info.kf_number" :disabled="isDisabled" @blur="checkText(4,datas.order_info.kf_number)"></el-input>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>合同金额：</span> 
                                    <span>
                                        <el-input placeholder="请输入内容" v-model="datas.order_info.contract_amount" :disabled="isDisabled"  @blur="checkText(4,datas.order_info.kf_number)"></el-input>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>回款金额：</span> 
                                    <span>
                                        <el-input placeholder="请输入内容" v-model="datas.order_info.amount_cashed" :disabled="isDisabled"  @blur="checkText(4,datas.order_info.kf_number)"></el-input>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>合同开始时间：</span> 
                                    <span>
                                        <el-date-picker style="width:100%" v-model="datas.order_info.contract_start_time" type="date" placeholder="选择日期" :disabled="isDisabled"></el-date-picker>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>合同结束时间：</span> 
                                    <span>
                                        <el-date-picker style="width:100%" v-model="datas.order_info.contract_end_time" type="date" placeholder="选择日期" :disabled="isDisabled"></el-date-picker>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>是否签署合同：</span> 
                                    <span>
                                        <el-select style="width:100%" v-model="datas.order_info.sign_contract" placeholder="请选择" :disabled="isDisabled">
                                            <el-option
                                            v-for="item in order_info.sign_contracts"
                                            :key="item.label"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>合同编号：</span> 
                                    <span>
                                        <el-input placeholder="请输入内容" v-model="datas.order_info.contract_index" :disabled="isDisabled"  @blur="checkText(4,datas.order_info.kf_number)"></el-input>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'>*</em>是否已特批：</span> 
                                    <span>
                                        <el-select style="width:100%" v-model="datas.order_info.special_selection" placeholder="请选择" :disabled="isDisabled">
                                            <el-option
                                            v-for="item in order_info.special_selections"
                                            :key="item.label"
                                            :label="item.value"
                                            :value="item.label">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                <li>
                                    <span><em class='ii'></em><em class='ii'></em>培训方式：</span> 
                                    <span>
                                        <el-select style="width:100%" v-model="datas.order_info.training_method" placeholder="请选择" :disabled="isDisabled">
                                            <el-option
                                            v-for="item in order_info.training_methods"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </li>
                                 <li>
                                    <span><em class='ii'></em><em class='ii'></em>咨询量/天：</span> 
                                    <span>
                                        <el-input placeholder="请输入内容" v-model="datas.order_info.consult" :disabled="isDisabled"></el-input>
                                    </span>
                                </li>
                                 <li>
                                    <span><em class='ii'></em><em class='ii'></em>访客量/天：</span> 
                                    <span>
                                        <el-input placeholder="请输入内容" v-model="datas.order_info.visitor" :disabled="isDisabled"></el-input>
                                    </span>
                                </li>
                                 <li style="height:auto">
                                    <span><em class='ii'></em><em class='ii'></em>附件：</span> 
                                    <span>
                                        <el-upload
                                            name="myFileName"
                                            :disabled="isDisabled"
                                            class="upload-demo"
                                            action="/api/setup/save_accessory/"
                                            :on-success="successUpload"
                                            :on-remove="handleRemove"
                                            multiple
                                            drag
                                            :file-list="fileList"
                                            accept="image/jpeg,image/jpg,image/png,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-powerpoint">
                                           <i class="el-icon-plus" style="font-size:40px;margin-top:60px"></i>                                            
                                        </el-upload>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- 开通模块 -->
                    <div class="box">
                        <div class="boxHeader">
                            <div>开通模块</div>
                        </div>
                        <div class="boxContent">
                            <div>
                                <span class="openBox">开通模块：</span> 
                                <span class="openModule">
                                    <el-checkbox-group v-model="function_info.checkedbox" size="mini">
                                        <el-checkbox  :disabled="isDisabled"   v-for="item in function_info.checksbox" :label="item.value"  :key="item.value">{{item.label}}</el-checkbox>
                                    </el-checkbox-group>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div style="margin:10px 15px 10px 0;display:flex;justify-content: flex-end" v-show="!isDisabled">
                        <el-button type="primary" size="mini"  @click="cancle()">取 消</el-button>
                        <el-button type="primary" size="mini"  @click="save()">保 存</el-button>
                    </div>
                </div>
                <div class="leftContainer" v-show="leftTabIndex == '2'">
                    <div class="box" v-for="item in aboutList" :key="item.name">
                        <div class="abloutContainer">
                            <span :style ="item.note" class="bg"></span>
                            <span>{{item.name}}({{item.number}})</span>
                            <el-button class="create" size="small"  @click="createTotal(item)">创建</el-button>
                            <el-button size="small"  @click="details(item)">查看全部</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="infoRight">
                <div class="rightTabs">
                    <el-tabs v-model="activeName" @tab-click="tabChange" :stretch='true'>
                        <el-tab-pane label="备注" name="1">
                            <ul class="listsContainer">
                                <li v-for="(item,index) in Information.Remarks" :key="index">
                                    <div class="listLeft">
                                        <div class="circle"></div>
                                        <div class="line"></div>
                                    </div>
                                    <div class="listRight">
                                        <div class="listTit">
                                            <span class="listDesc">{{item.user}}：添加备注</span>
                                            <span class="listTime">{{item.time}}</span>
                                        </div>
                                        <div class="listContent">
                                            <div>{{item.content}}</div>
                                        </div>
                                        <div class="listFooter"></div>
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="改动记录" name="2">
                            <ul class="listsContainer">
                                <li v-for="(changeRecord,index) in Information.ChangeRecords" :key="index" v-if="changeRecord.modify_list.length">
                                    <div class="listLeft">
                                        <div class="circle"></div>
                                        <div class="line"></div>
                                    </div>
                                    <div class="listRight">
                                        <div class="listTit">
                                            <span class="listDesc">{{changeRecord.user}}：改变了状态</span>
                                            <!-- <span class="listDesc"  v-else>{{changeRecord.user}}：创建问题</span> -->
                                            <span class="listTime">{{changeRecord.time}}</span>
                                        </div>
                                        <div class="listContent">
                                            <el-table
                                                :data="changeRecord.modify_list"
                                                stripe
                                                style="width: 100%"
                                                v-show="changeRecord.modify_list.length">
                                                <el-table-column type="index" align="center">#</el-table-column>
                                                <el-table-column prop="name" label="类型" align="center"></el-table-column>
                                                <el-table-column prop="old_value" label="原值" align="center"></el-table-column>
                                                <el-table-column prop="new_value" label="新值" align="center"></el-table-column>
                                            </el-table>
                                        </div>
                                        <div class="listFooter"></div>
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                        <el-tab-pane label="客户需求沟通结果" name="3"> 
                            <ul class="listsContainer">
                                <li v-for="(item,index) in Information.DemandResults" :key="index">
                                    <div class="listLeft">
                                        <div class="circle"></div>
                                        <div class="line"></div>
                                    </div>
                                    <div class="listRight">
                                        <div class="listTit">
                                            <span class="listDesc">{{item.user}}：添加备注</span>
                                            <span class="listTime">{{item.time}}</span>
                                        </div>
                                        <div class="listContent">
                                            <div>{{item.content}}</div>
                                        </div>
                                        <div class="listFooter"></div>
                                    </div>
                                </li>
                            </ul>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div class="rightTime">
                    <div class="timeHeader">日期</div>
                    <div>
                        <ul>
                            <li><span>创建时间：</span><span>{{datas.order_info.created_at ? new Date(+new Date(new Date(datas.order_info.created_at).toJSON())+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'') : ''}}</span></li>
                            <li><span>合同开始时间：</span><span>{{datas.order_info.contract_start_time}}</span></li>
                            <li><span>合同结束时间：</span><span>{{datas.order_info.contract_end_time}}</span></li>
                            <li><span>申请时间：</span><span>{{datas.order_info.created_at ? new Date(+new Date(new Date(datas.order_info.created_at).toJSON())+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'') : ''}}</span></li>
                            <li><span>更新时间：</span><span>{{datas.order_info.update_date}}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- <div v-else>
            <span @click="onReloadFn"  style="cursor: pointer;">数据加载失败 点击请重新加载</span>
        </div> -->
    </div>
</template>

<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style src="./style.css"></style>
