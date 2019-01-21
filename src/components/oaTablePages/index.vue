<template>
    <div class="op-table">
        <div class="table-wrap">
            <el-table
                    v-loading="loading"
                    :data="list"
                    ref="mutipleTable"
                    header-cell-class-name="table-header">

                <!--序号-->
                <!--<el-table-column label="序号" type="index" width="50" align="center"></el-table-column>-->

                <!--数据列-->
                <template v-for="(column, index) in columns">
                    <el-table-column :prop="column.prop"
                            v-if="column.show === undefined? true : column.show"
                            :label="column.label"
                            :align="column.align || 'center'"
                            :width="column.width"
                            :fixed="column.fixed">
                        <template slot-scope="scope">

                            <template v-if="!column.render">
                                <template v-if="column.formatter">
                                    <span v-html="column.formatter(scope.row, column)"></span>
                                </template>
                                <template v-else>
                                    <span>{{scope.row[column.prop]}}</span>
                                </template>
                            </template>

                            <!--render-->
                            <template v-else>
                                <oa-RenderDom :column="column" :row="scope.row" :render="column.render" :index="index"></oa-RenderDom>
                            </template>
                        </template>
                    </el-table-column>
                </template>
                <!-- 按钮操作组-->
                <el-table-column v-if="operates" ref="fixedColumn" label="操作" align="center"
                        :width="operates.width" :fixed="operates.fixed">
                    <template slot-scope="scope">
                        <div class="operate-group">
                            <template v-for="(btn, key) in operates.list" v-if="operatesCondition.flag && operatesCondition.modelName=='personal'">
                                <el-button
                                        v-if="scope.row.action  == 3"
                                        :class="[btn.borderFLag?'':'borderNone']"
                                        :title="btn.title"
                                        :type="btn.type" size="mini" :icon="btn.icon" :disabled="btn.disabled"
                                        :plain="btn.plain" @click.native.prevent="btn.method(scope.row, key)">{{ btn.label }}
                                </el-button>
                            </template>
                            <template v-for="(btn, key) in operates.list" v-if="!operatesCondition.flag">
                                <el-button
                                        :class="[btn.borderFLag?'':'borderNone']"
                                        :title="btn.title"
                                        :type="btn.type" size="mini" :icon="btn.icon" :disabled="btn.disabled"
                                        :plain="btn.plain" @click.native.prevent="btn.method(scope.row, key)">{{ btn.label }}
                                </el-button>
                            </template>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 分页-->
        <el-pagination v-if="pagination.show"
                @size-change="handleSizeChange"
                @current-change="handleIndexChange"
                :page-size="pagination.pageSize"
                :current-page="pagination.pageIndex"
                layout="total,prev, pager, next, jumper"
                :total="pagination.total"

                style="margin-top: 20px;text-align: right"></el-pagination>
    </div>
</template>
<style>
    .operate-group .borderNone{
        border:none;
        background:none !important;
        outline:none;
    }
    .el-pagination__total{
        float:left;
        padding-left:15px;
    }
    .cell{
        font-size:14px;
        color:rgba(0,0,0,.85) !important;
    }


    .op-table {
        border-top: 1px solid #ebeef5
    }
    .el-table__header-wrapper  .el-table__header thead tr{
        height: 50px;
    }
    .el-table__header-wrapper  .el-table__header thead tr th{
        background: #e5eaeb;
    }
    .el-table__fixed-right  .el-table__header thead tr {
        height: 50px;
    }
    .el-table__fixed-right  .el-table__header thead tr th{
        background: #e5eaeb;
    }
    .operate-group  .el-button {
        padding: 7px 10px;
    }
</style>
<script src="./script.js"></script>