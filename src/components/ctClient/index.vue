<template>
    <div class="Client">
        <div class="headerSearch">
            <div >
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="经典版" name="first">
                        <div class="Main">
                            <div>
                                <label>企业ID：</label>
                                <el-input @keyup.enter.native="onSearchFn"   v-model="siteIdVal" type="primary"  size="mini" style="width:322px;"></el-input>
                                <el-button @click="onSearchFn" type="primary"  size="mini" style="margin:10px;">搜索</el-button>
                                <el-button @click="onPostFn" type="primary"  size="mini" style="float: right;">添加链接</el-button>
                            </div>

                            <oaTablePages  @onPageChange="onPageChangeBind" :loading="tableLoading" :list="tableDatas" :columns="columns"  :pagination="pagination"/>
                        </div>
                    </el-tab-pane>
                </el-tabs>

            </div>
        </div>
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :modal-append-to-body="false"
                :before-close="handleClose">

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="版本号" prop="version_num">
                    <el-input v-model="ruleForm.version_num" size="mini" ></el-input>
                </el-form-item>
                <el-form-item label="下载地址" prop="down_address">
                    <el-input size="mini"  v-model="ruleForm.down_address"></el-input>
                </el-form-item>
                <el-form-item label="版本类型" prop="classify">
                        <el-radio :label="1" v-model="ruleForm.classify">经典版</el-radio>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<style>
    .el-message-box__message p{
        padding:0 10px 0 0;
        word-wrap: break-word;
    }
</style>