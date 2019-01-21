<template>
    <div class="CustomerGrid">
        <div class="headerSearch">
            <div class="SearchItem">
                <label>
                    grid节点
                </label>
                <el-select  placeholder="请选择"  size="small" style="width:138px;" v-model="searchData.searchVal" @change="onGridChange">
                    <el-option v-for="item in gridList"
                            :key="item.id"
                            :label="item.grid_name"
                            :value="item.id" ></el-option>
                </el-select>

            </div>
            <el-button @click="onSearchFn" type="primary"  size="mini">查询</el-button>
        </div>
        <div class="Main">

            <el-button @click="onExportFn" type="primary"  size="mini" style="margin:10px;">导出</el-button>
            <el-table
                    :data="tableDatas.slice((currentPage-1)*pageSize,pageSize*currentPage)">
                <el-table-column
                        prop="siteid"
                        header-align="center"
                        align="center"
                        label="企业ID"
                >
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="企业名称"
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
</template>
<script src="./script.js"></script>

<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<style>
    .el-pagination__total{
        float:left;
        padding-left:15px;
    }
</style>