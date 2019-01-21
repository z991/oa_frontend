<template>
    <div class="Customer">
        <div class="headerSearch">
            <div class="SearchItem">
                <label>
                    企业ID
                </label>
                <el-input  @keyup.enter.native="onSearchFn"  placeholder="请选择"  size="small" style="width:138px;" v-model="searchData.searchVal" ></el-input>

            </div>
            <el-button @click="onSearchFn" type="primary"  size="mini">查询</el-button>
        </div>
        <div class="Main">
            <el-table
                    :data="tableDatas.slice((currentPage-1)*pageSize,pageSize*currentPage)">
                align="center"
                label="序号">
                <el-table-column
                        prop="name"
                        label="信息"
                        header-align="center"
                        align="center"
                >
                </el-table-column>
                <el-table-column
                        prop="info"
                        label="数据"
                        header-align="center"
                        align="center"
                >
                </el-table-column>




            </el-table>
            <div >
                <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        style="margin-top: 20px;text-align: right"
                        layout="total, prev, pager, next, jumper"
                        :total="totalCount">
                </el-pagination>
            </div>
        </div>
    </div>
    </div>
</template>
<script src="./script.js"></script>

<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<style>
    .el-pagination__total{
        float:left;
        padding-left:15px;
    }
</style>