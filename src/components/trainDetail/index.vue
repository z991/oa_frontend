/*
 * @Author: liuqian 
 * @Date: 2018-11-13 15:04:11 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-06 16:22:56
 */
<template>
  <div class="trainDetail">
    <div class="detailTitle clear">
      <div class="goback fl" v-show="clientShow" @click="goBack">
        <img src="../../assets/goBack.png" alt="" />
      </div>
      <div class="explain fl">
        <p>{{briefLeft.company_name}}</p>
        <p>{{briefLeft.matter_name}}</p>
      </div>
      <div class="fr">
        <el-button type="primary" @click="addRemark" v-show="this.modifyMark.button_list.length">备注</el-button>
      </div>
    </div>
    <div class="content">
      <!--左半部分-->
      <div class="contentDetail">
        <div class="actionCarry" v-show="!clientShow">
          <el-button type="primary" size="mini" v-for="item in createButton" :key="item.name" @click="allButton(item.name)">{{item.name}}</el-button>
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
     <!-- 分配讲师 -->
        <el-dialog title="分配讲师" :visible.sync="allotLecturer"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="培训讲师" :label-width="formLabelWidth">
                    <el-select v-model="dialogAllot.training_instructors" placeholder="请选择讲师">
                        <el-option v-for="item in allotTrainers" :label="item.last_name" :value="item.last_name" :key="item.last_name"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="上传附件" :label-width="formLabelWidth">
                    <el-upload
                            v-model="dialogAllot.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="allotFileList"
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
            <div slot="footer" class="dialog-footer">
                <el-button @click="allotLecturer = false">取 消</el-button>
                <el-button type="primary" @click="allotLecturer_sure">分 配</el-button>
            </div>
        </el-dialog>

        <!-- 驳回 -->
        <el-dialog title="驳回" :visible.sync="dialogReject"  :modal-append-to-body="false">
            <el-form :model="form">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogReject = false">取 消</el-button>
                <el-button type="primary" @click="dialogReject_sure">确 定</el-button>
            </div>
        </el-dialog>

        <!--客户终止培训-->
        <el-dialog title="客户终止培训" :visible.sync="customerTerminate_show"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="终止原因" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="customerTerminate.termination_reason">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth">
                    <el-upload
                            v-model="customerTerminate.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="customerFileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :before-upload="beforeAvatarUpload"
                            :on-success="customerUploadSuccess"
                            :on-remove="customerRemoveCover"
                            multiple>
                        <i class="el-icon-plus" style="font-size:40px;"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="customerTerminate_show = false">取 消</el-button>
                <el-button type="primary" @click="customerTerminate_sure">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 培训准备 -->
        <el-dialog title="培训准备" :visible.sync="trainReady_show"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="培训讲师" :label-width="formLabelWidth">
                    <el-select v-model="trainReady.training_instructors" placeholder="请选择培训讲师">
                        <el-option v-for="item in allotTrainers" :label="item.last_name" :value="item.last_name" :key="item.last_name"></el-option>
                        <!-- <el-option v-for="item in allotLecturer" :label="item.label" :value="item.value" :key="item.label"></el-option> -->
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="培训开始时间" :label-width="formLabelWidth">
                    <el-date-picker
                        v-model="trainReady.start_time"
                        placeholder="选择日期"
                        format="yyyy - MM - dd "
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item> -->
                <el-form-item label="培训开始时间" :label-width="formLabelWidth">
                    <el-date-picker
                        type="datetime"
                        v-model="trainReady.start_time"
                        :picker-options="trainReadyDateBefore"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="changeTime(trainReady.start_time,1)">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="培训结束时间" :label-width="formLabelWidth">
                    <el-date-picker
                        type="datetime"
                        v-model="trainReady.end_time"
                        :picker-options="trainReadyDateAfter"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth">
                    <el-upload
                            v-model="trainReady.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="readyFileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :before-upload="beforeAvatarUpload"
                            :on-success="readyUploadSuccess"
                            :on-remove="readyRemoveCover"
                            multiple>
                        <i class="el-icon-plus" style="font-size:40px;"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="trainReady_show = false">取 消</el-button>
                <el-button type="primary" @click="trainReady_sure">准 备</el-button>
            </div>
        </el-dialog>

        <!-- 确定排期 -->
        <el-dialog title="确定排期" :visible.sync="sureSchedule_show"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="培训预计开始时间" :label-width="formLabelWidth2">
                    <el-date-picker
                        v-model="sureSchedule.start_time"
                        :picker-options="sureScheduleDateBefore"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="changeTime(sureSchedule.start_time,2)">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="培训预计结束时间" :label-width="formLabelWidth2">
                    <el-date-picker
                        v-model="sureSchedule.end_time"
                        :picker-options="sureScheduleDateAfter"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sureSchedule_show = false">取 消</el-button>
                <el-button type="primary" @click="sureSchedule_sure">准 备</el-button>
            </div>
        </el-dialog>

        <!-- 培训 -->
        <el-dialog title="培训" :visible.sync="train_show"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="培训讲师" :label-width="formLabelWidth2">
                    <el-select v-model="trainData.region" placeholder="请选择培训讲师" disabled>
                        <el-option v-for="item in allotTrainers" :label="item.label" :value="item.value" :key="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="培训模块" :label-width="formLabelWidth2">
                      <el-checkbox-group v-model="trainData.training_model">
                        <el-checkbox v-for="item in trainModel" :key="item" :label="item"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="培训实际开始时间" :label-width="formLabelWidth2">
                    <el-date-picker
                        v-model="trainData.start_time"
                        :picker-options="trainDataDateBefore"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="changeTime(trainData.start_time,3)">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="培训实际结束时间" :label-width="formLabelWidth2">
                    <el-date-picker
                        v-model="trainData.end_time"
                        :picker-options="trainDataDateAfter"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="是否有遗留问题" :label-width="formLabelWidth2">
                      <el-radio v-model="trainData.legacy_issue" v-for="item in leaveList" :key="item.name" :label="item.value">{{item.name}}</el-radio>
                      <!-- <el-radio v-model="trainData.legacy_issue" label="Flase">没有</el-radio> -->
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth2">
                    <el-upload
                            v-model="trainData.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="trainFileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :before-upload="beforeAvatarUpload"
                            :on-success="trainUploadSuccess"
                            :on-remove="trainRemoveCover"
                            multiple>
                        <i class="el-icon-plus" style="font-size:40px;"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="train_show = false">取 消</el-button>
                <el-button type="primary" @click="trainData_sure">准 备</el-button>
            </div>
        </el-dialog>

        <!-- 遗留问题交接 -->
        <el-dialog title="遗留问题交接" :visible.sync="leaveIssuejoin_show"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="处理人" :label-width="formLabelWidth">
                    <el-select v-model="leaveIssuejoin.dealing_person" placeholder="请选择培训讲师">
                        <el-option v-for="item in allotTrainers" :label="item.last_name" :value="item.last_name" :key="item.last_name"></el-option>
                    </el-select>
                    <!-- <el-input v-model="leaveIssuejoin.dealing_person" autocomplete="off"></el-input> -->
                </el-form-item>
                <el-form-item label="问题描述" :label-width="formLabelWidth">
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="leaveIssuejoin.problem_description">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth">
                    <el-upload
                            v-model="leaveIssuejoin.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="connectFileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :before-upload="beforeAvatarUpload"
                            :on-success="connectUploadSuccess"
                            :on-remove="connectRemoveCover"
                            multiple>
                        <i class="el-icon-plus" style="font-size:40px;"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="leaveIssuejoin_show = false">取 消</el-button>
                <el-button type="primary" @click="leaveIssuejoin_sure">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 遗留问题确认 -->
        <el-dialog title="遗留问题确认" :visible.sync="leaveIssuesure_show"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="问题描述" :label-width="formLabelWidth">
                    <el-input
                        type="leaveIssuesure.textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="leaveIssuesure.problem_description">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth">
                    <el-upload
                            v-model="leaveIssuesure.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="confirmFileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :before-upload="beforeAvatarUpload"
                            :on-success="confirmUploadSuccess"
                            :on-remove="confirmRemoveCover"
                            multiple>
                        <i class="el-icon-plus" style="font-size:40px;"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="leaveIssuesure_show = false">取 消</el-button>
                <el-button type="primary" @click="leaveIssuesure_sure">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 人员分配 -->
        <el-dialog title="分配讲师" :visible.sync="personAssign_show"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="培训讲师" :label-width="formLabelWidth">
                    <el-select v-model="personAssign.investigador" placeholder="请选择培训讲师">
                        <!-- <el-option v-for="item in surveyTrainers" :label="item.label" :value="item.value" :key="item.label"></el-option> -->
                        <el-option v-for="item in surveyTrainers" :label="item.last_name" :value="item.last_name" :key="item.last_name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="personAssign_show = false">取 消</el-button>
                <el-button type="primary" @click="personAssign_sure">确 认</el-button>
            </div>
        </el-dialog>

        <!-- 满意度调查 -->
        <el-dialog title="满意度调查" :visible.sync="satisfySurvey_show"  :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="培训讲师" :label-width="formLabelWidth2">
                    <el-select v-model="satisfySurvey.region" placeholder="请选择培训讲师" disabled>
                        <!-- <el-option v-for="item in allotTrainers" :label="item.label" :value="item.value" :key="item.label"></el-option> -->
                        <el-option v-for="item in allotTrainers" :label="item.last_name" :value="item.last_name" :key="item.last_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="满意度等级" :label-width="formLabelWidth2">
                    <el-select v-model="satisfySurvey.satisfaction_level" placeholder="请选择满意度等级">
                        <el-option v-for="item in satisficGrade" :label="item.label" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                    <div>注释：5:非常满意,4:满意,3:一般,2:不满意,1:非常不满意</div>
                </el-form-item>
                <el-form-item label="客户反馈详情" :label-width="formLabelWidth2">
                    <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入内容"
                        v-model="satisfySurvey.customer_feedback">
                    </el-input>
                </el-form-item>
                <el-form-item label="调查开始时间" :label-width="formLabelWidth2">
                    <el-date-picker
                        v-model="satisfySurvey.invest_start"
                        :picker-options="satisfySurveyBefore"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        @change="changeTime(satisfySurvey.invest_start,4)">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="调查结束时间" :label-width="formLabelWidth2">
                    <el-date-picker
                        v-model="satisfySurvey.invest_end"
                        :picker-options="satisfySurveyAfter"
                        type="datetime"
                        placeholder="选择日期"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上传附件" :label-width="formLabelWidth2">
                    <el-upload
                            v-model="satisfySurvey.enclosure"
                            class="upload-demo"
                            drag
                            name="myFileName"
                            :file-list="satisficFileList"
                            accept=".doc,.docx,.pptx,.ppt,.jpg,.png,.jpeg,.xlsx,.xls"
                            action="/api/setup/save_accessory/"
                            :before-upload="beforeAvatarUpload"
                            :on-success="satisficUploadSuccess"
                            :on-remove="satisficRemoveCover"
                            multiple>
                        <i class="el-icon-plus" style="font-size:40px;"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="satisfySurvey_show = false">取 消</el-button>
                <el-button type="primary" @click="satisfySurvey_sure">确 认</el-button>
            </div>
        </el-dialog>
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
.el-tabs__nav-scroll{padding-left:50px;}

.trainDetail .el-dialog {
        width: 45%;
    }
   .trainDetail .el-dialog__header {
       text-align: left;
       height: 50px;
       box-sizing: border-box;
       padding: 10px 20px;
       font-size: 16px;
   }
    .trainDetail .tableHead .el-tabs__header {
       height: 53px;
       line-height: 53px;
   }
    .trainDetail .el-dialog__header .el-dialog__title {
        line-height: 30px;
    }
    .trainDetail .el-dialog__footer, .trainDetail .el-dialog__footer .el-button {
        padding: 10px 15px;
    }
    .trainDetail  .el-form-item__content .el-date-editor , .trainDetail  .el-form-item__content .el-select{
        width: 100%;
    }
    .trainDetail  .el-form-item__content .el-upload , .trainDetail  .el-form-item__content .el-upload  .el-upload-dragger{
        width: 100%;
    }
    .trainDetail  .el-form-item__content .el-upload .el-icon-plus {
        margin-top: 60px;
    }
    .trainDetail  .el-form-item__content {
        text-align: left;
    }
    .trainDetail  .el-dialog__body {
        padding: 20px;
    }
    .trainDetail .el-form-item__content .el-checkbox-group .el-checkbox {
        width: 33%;
        margin-left: 0;
    }
    .trainDetail .el-dialog__body {
        padding: 20px 20px 0;
    }
</style>

