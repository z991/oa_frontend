/*
 * @Author: liuqian 
 * @Date: 2018-12-06 16:07:16 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-26 16:18:45
 */
<template>
  <div class="productDeploy_detail">
    <div class="detailTitle clear">
      <div class="goback fl" v-show="clientShow" @click="goBack">
        <img src="../../assets/goBack.png" alt="" />
      </div>
      <div class="explain fl">
        <p>{{briefLeft.company_name}}</p>
        <p>{{briefLeft.matter_name}}</p>
      </div>
      <div class="fr">
        <el-button type="primary" @click="addRemark">备注</el-button>
      </div>
    </div>
    <div class="content">
      <!--左半部分-->
      <div class="contentDetail">
        <div class="actionCarry" v-show="!clientShow">
          <el-button type="primary" size="mini" v-for="item in createButton" :key="item" @click="allButton(item)">{{item}}</el-button>
        </div>
        <div class="issueDetail">
          <div class="trainTitle clear">
            <div class="headline fl">问题详情</div>
            <div class="status fr">
              状态：<span class="statusValue">{{statusShow}}</span>
            </div>
          </div>
          <div class="detailShow">
            <p v-for="item in this.allDetail.problem" :key="item.fieldCode">
                <label for="">{{item.fieldName}}：</label><span>{{item.value}}</span>
            </p>
          </div>
        </div>
        <div class="dateDetail">
            <div class="trainTitle">
              <div class="headline">日期</div>
            </div>
            <div class="detailShow">
                <p v-for="item in this.allDetail.allDate" :key="item.fieldCode">
                <label for="">{{item.fieldName}}：</label><span>{{item.value}}</span>
            </p>
            </div>
        </div>
        <div class="dateDetail" v-show="allDetail.enclosure.length">
            <div class="trainTitle">
              <div class="headline">已上传附件</div>
            </div>
            <div class="detailShow">
                <p v-for="item in allDetail.enclosure" :key="item.value">
                    <label for=""><img src="../../assets/release.png" alt="" /></label><span>{{item.value}}</span>
                    <a :download="item.url" :href="item.url" class="downFile" target="_blank"><img src="../../assets/downFile.png" alt="" /></a>
                </p>
            </div>
        </div>
      </div>
      <!--右半部分-->
      <div class="trainRecord">
        <div class="tableHead">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="改动记录" name="first">
              <ul class="listsContainer">
                <li v-for="(item,i) in modifyMark.log" :key="i+'log'">
                    <div class="listLeft">
                        <div class="circle"></div>
                        <div class="line"></div>
                    </div>
                    <div class="listRight">
                        <div class="listTit">
                            <span class="listDesc">{{item.user}}：进行了改变 {{item.modify_list.name}}</span>
                            <span class="listTime">{{item.time}}</span>
                        </div>
                        <div class="listContent">
                            <div>{{item.modify_list.old_value}} 到 {{item.modify_list.new_value}}</div>
                        </div>
                        <div class="listFooter"></div>
                    </div>
                </li>
            </ul>
            </el-tab-pane>
            <el-tab-pane label="备注" name="second">
              <ul class="listsContainer">
                <li v-for="(item,m) in modifyMark.mark" :key="m+'mark'">
                    <div class="listLeft">
                        <div class="circle"></div>
                        <div class="line"></div>
                    </div>
                    <div class="listRight">
                        <div class="listTit">
                            <span class="listDesc">{{item.user}}：进行了备注</span>
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
      </div>
    </div>

    <!--弹窗-->
    <!--备注-->
    <el-dialog title="添加备注" :visible.sync="remark_show"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input
                        placeholder="请输入内容"
                        v-model="remarkData.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="remark_show = false">取 消</el-button>
                <el-button type="primary" @click="remark_sure">确 定</el-button>
            </div>
        </el-dialog>
     <!-- 分配处理人 -->
     <el-dialog title="分配处理人" :visible.sync="allotHandler"  :modal-append-to-body="false">
            <el-form :model="dialogAllot">
                <el-form-item label="任务类型" :label-width="formLabelWidth">
                    <el-radio-group v-model="dialogAllot.resource" size="medium" @change="getPersonnel">
                        <el-radio label="云平台操作"></el-radio>
                        <el-radio label="运维操作"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="处理人" :label-width="formLabelWidth">
                    <el-select v-model="dialogAllot.dealing_person" placeholder="请选择处理人">
                        <el-option v-for="item in disposeList" :label="item.last_name" :value="item.id" :key="item.last_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="dialogAllot.content">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="allotHandler = false">取 消</el-button>
                <el-button type="primary" @click="allotHandler_sure">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 驳回 -->
        <el-dialog title="驳回" :visible.sync="dialogReject"  :modal-append-to-body="false">
            <el-form :model="rejectData">
                <el-form-item label="驳回次数" :label-width="formLabelWidth">
                    {{rejectData.num}}
                </el-form-item>
                <el-form-item label="驳回原因" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="rejectData.dismiss_reason">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth">
                    <el-upload
                            v-model="rejectData.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="rejectFileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :on-success="rejectUploadSuccess"
                            :on-remove="rejectRemoveCover"
                            multiple>
                        <i class="el-icon-plus" style="font-size:40px;"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogReject = false">取 消</el-button>
                <el-button type="primary" @click="dialogReject_sure">分 配</el-button>
            </div>
        </el-dialog>

        <!-- 验证不通过 -->
        <el-dialog title="验证不通过" :visible.sync="verifyNopass"  :modal-append-to-body="false">
            <el-form :model="verifyNopass_data">
                <el-form-item label="不通过次数" :label-width="formLabelWidth">
                    {{verifyNopass_data.num}}
                </el-form-item>
                <el-form-item label="不通过原因" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model="verifyNopass_data.dismiss_reason">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth">
                    <el-upload
                            v-model="verifyNopass_data.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="nopassFileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :on-success="nopassUploadSuccess"
                            :on-remove="nopassRemoveCover"
                            multiple>
                        <i class="el-icon-plus" style="font-size:40px;"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="verifyNopass = false">取 消</el-button>
                <el-button type="primary" @click="verifyNopass_sure">分 配</el-button>
            </div>
        </el-dialog>

        <!--验证通过（需求和操作）和任务关闭-->
        <el-dialog :title="noteLabel" :visible.sync="verifyPass"  :modal-append-to-body="false">
            <el-form :model="verifyPass_data">
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="verifyPass_data.content">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth">
                    <el-upload
                            v-model="verifyPass_data.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="passFileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :on-success="passUploadSuccess"
                            :on-remove="passRemoveCover"
                            multiple>
                        <i class="el-icon-plus" style="font-size:40px;"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="verifyPass = false">取 消</el-button>
                <el-button type="primary" @click="verifyPass_sure">确 定</el-button>
            </div>
        </el-dialog>

        
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
.el-tabs__nav-scroll{padding-left:50px;}

.productDeploy_detail .el-dialog {
        width: 45%;
    }
   .productDeploy_detail .el-dialog__header {
       text-align: left;
       height: 50px;
       box-sizing: border-box;
       padding: 10px 20px;
       font-size: 16px;
   }
    .productDeploy_detail .tableHead .el-tabs__header {
       height: 53px;
       line-height: 53px;
   }
    .productDeploy_detail .el-dialog__header .el-dialog__title {
        line-height: 30px;
    }
    .productDeploy_detail .el-dialog__footer, .productDeploy_detail .el-dialog__footer .el-button {
        padding: 10px 15px;
    }
    .productDeploy_detail  .el-form-item__content .el-date-editor , .productDeploy_detail  .el-form-item__content .el-select{
        width: 100%;
    }
    .productDeploy_detail  .el-form-item__content .el-upload , .productDeploy_detail  .el-form-item__content .el-upload  .el-upload-dragger{
        width: 100%;
    }
    .productDeploy_detail  .el-form-item__content .el-upload .el-icon-plus {
        margin-top: 60px;
    }
    .productDeploy_detail  .el-form-item__content {
        text-align: left;
    }
    .productDeploy_detail  .el-dialog__body {
        padding: 20px;
    }
    .productDeploy_detail .el-form-item__content .el-checkbox-group .el-checkbox {
        width: 33%;
        margin-left: 0;
    }
    .productDeploy_detail .el-dialog__body {
        padding: 20px 20px 0;
    }
</style>

