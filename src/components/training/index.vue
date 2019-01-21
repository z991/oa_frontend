<template>
    <div class="training">
        <!--导出的弹窗-->
        <el-dialog title="导出" :visible.sync="dialogExport" :modal-append-to-body="false">
            <el-form :model="form">
                <el-form-item label="请选择时间" :label-width="formLabelWidth">
                    <el-date-picker
                    v-model="exportTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy - MM - dd "
                    value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogExport = false">取 消</el-button>
                <el-button type="primary" @click="sureExport">确 定</el-button>
            </div>
      </el-dialog>


        <div class="operateItem">
          <span class="field" @click="choose_field">选择显示字段<img src="../../assets/tan.png" /></span>
          <div class="allChoice" v-show="all_option" @mouseleave="allChoice">
              <p class="all_check"><span style="margin-left:26px;cursor:pointer;"><img src="../../assets/multiSelect.png" />所有字段</span></p>
              <p v-for="(item,index) in columns" :key="index" class="captions"><input @change="changeField(item)" type="checkbox" v-model="item.show" :disabled="item.disabled" class="_checkbox"/><label for="" class="_label">{{item.label}}</label></p>
          </div>
          <a href="javascript:void(0)" class="so" @click="exportTrain">导出</a>
        </div>
        
        <oaTablePages  @onPageChange="onPageChangeBind" :loading="tableLoading"  :operates='operates' :list="tableDatas" :columns="columns"  :pagination="pagination"/>
    </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
    .training .el-dialog {
        width: 45%;
    }
   .training .el-dialog__header {
       text-align: left;
       height: 50px;
       box-sizing: border-box;
       padding: 10px 20px;
       font-size: 16px;
   }
    .training .el-dialog__header .el-dialog__title {
        line-height: 30px;
    }
    .training .el-dialog__footer, .training .el-dialog__footer .el-button {
        padding: 10px 15px;
    }
    .training  .el-form-item__content .el-date-editor , .training  .el-form-item__content .el-select{
        width: 100%;
    }
    .training  .el-form-item__content .el-upload , .training  .el-form-item__content .el-upload  .el-upload-dragger{
        width: 100%;
    }
    .training  .el-form-item__content .el-upload .el-icon-plus {
        margin-top: 60px;
    }
    .training  .el-form-item__content {
        text-align: left;
    }
    .training  .el-dialog__body {
        padding: 20px;
    }
    .training .el-form-item__content .el-checkbox-group .el-checkbox {
        width: 33%;
        margin-left: 0;
    }
    .training .el-dialog__body {
        padding: 20px 20px 0;
    }

</style>
