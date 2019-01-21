<template>
    <div class="sales">
        <div class="headerSearch">
            <div v-for="(item,index) in searchData" class="SearchItem" :key="index">
                <label>
                    {{item.label}}
                </label>
                <el-input v-if="item.type =='input'"  @keyup.enter.native="onSearchFn"    size="small" style="width:138px;" v-model="item.value"></el-input>
                <el-select v-model="item.value"  size="small"  placeholder="请选择" v-if="item.type =='select'" style="width:138px;">
                    <el-option
                            v-for="item in item.status"
                            :key="item.industry"
                            :label="item.industry"
                            :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <section class="btn_search">
                <a href="javascript:void(0)" class="so" @click='onSearchFn'>搜索</a>
                <a href="javascript:void(0)" class="cho" @click='onResetFn'>重置</a>
            </section>
            <!-- <el-button @click="onResetFn" size="mini">重置</el-button>
            <el-button @click="onSearchFn" type="primary"  size="mini">搜索</el-button> -->
        </div>
        <div class="MainSearch">
            <a href="javascript:void(0)" class="so" @click="dialogFormVisible = true" >导出</a>
            <el-dropdown :hide-on-click="false">
                <el-button type="primary" size="mini">
                    选择显示字段<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown" class="cscField">
                    <el-dropdown-item>
                        <!-- <el-checkbox :indeterminate="isIndeterminateShow" v-model="checkAllShow" @change="handleCheckAllShow">全选</el-checkbox>
                        <div style="margin: 10px 0;"></div> -->
                        <el-checkbox-group v-model="checkedShows" @change="handleCheckedShowChange">
                            <el-checkbox v-for="item in checkeShows" :label="item.label" :key="item.value"  @change="handleCheckChange(item)" :disabled="item.view">{{item.value}}</el-checkbox>
                        </el-checkbox-group>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <oaTablePages  @onPageChange="onPageChangeBind"  :loading="tableLoading"  :operates='operates' :list="tableDatas" :columns="columns"  :pagination="pagination"/>
        </div>

        <el-dialog title="导出" :visible.sync="dialogFormVisible" :modal-append-to-body="false">
            <el-form>
                <el-form-item label="部署方式" :label-width="formLabelWidth">
                    <el-select v-model="deploy_way" placeholder="请选择部署方式" clearable>
                        <el-option v-for="item in deploy_ways" :label="item.industry" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属行业" :label-width="formLabelWidth">
                    <el-select v-model="industry" placeholder="请选择行业" clearable>
                        <el-option v-for="item in industryList" :label="item.industry" :value="item.id" :key="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="导出规则" :label-width="formLabelWidth">
                  <p>1.默认全部导出</p>
                  <p>2.可根据部署方式导出</p>
                  <p>3.可根据所属行业导出</p>
                  <!-- <p>4.可根据所需进行导出字段选择</p> -->
                </el-form-item>
                <!-- <el-form-item label="导出字段" :label-width="formLabelWidth">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <div style="margin: 10px 0;"></div>
                    <el-checkbox-group v-model="checked" @change="handleCheckedChange">
                        <el-checkbox v-for="item in checkes" :label="item.label" :key="item.value">{{item.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelExport">取 消</el-button>
                <el-button type="primary" @click="expor">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<style>
.sales .el-dialog .el-checkbox-group .el-checkbox{
    width: 20%;
    display: block;
    float: left;
    margin: 0 20px 0 0;
}
.MainSearch .el-dropdown .el-button--primary {
    background-color: #0386f0;
}
.MainSearch .el-dropdown .el-button--primary:hover {
    background-color: #0386f0;
}
.sales .el-dialog .el-button {
    padding: 8px 20px;
}
</style>
