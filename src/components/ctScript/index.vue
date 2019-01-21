<template>
    <div class="Script">
        <div class="Main">
            <oaTablePages  @onPageChange="onPageChangeBind" :loading="tableLoading" :list="tableDatas" :columns="columns"  :operates="operates" :pagination="pagination" />
            <el-dialog
                    title="脚本执行"
                    :visible.sync="dialogVisible"
                    :modal-append-to-body="false"
                    width="550px"
                    :before-close="handleClose">

                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item prop="grid" label="grid节点：" v-if="scriptGridFlag">
                    <el-select v-model="ruleForm.grid"   size="small" style="width:320px;">
                        <el-option v-for="item in gridList"
                                :key="item.id"
                                :label="item.grid_name"
                                :value="item.grid_name" ></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item label="时间：" prop="date" v-if="!scriptGridFlag">
                        <el-date-picker
                                size="small"
                                v-model="ruleForm.date"
                                type="datetimerange"
                                :picker-options="pickerOptions"
                                range-separator="至"
                                value-format="yyyy-MM-dd"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right">
                        </el-date-picker>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
  </span>
            </el-dialog>
            <ctNotification :show="notifiFlag" :title="notifiTitle" :dataList="dataList" @closeType="onCloseFn"  />

        </div>
    </div>
</template>
<script src="./script.js"></script>

<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<style>

</style>