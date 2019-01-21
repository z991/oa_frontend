<template>
   <div class="container">
        <!-- 选项 -->
        <section class="select_container">
            <!-- 时间 -->
            <div class="select_module">
                <span>时间</span>
                <el-select size="small" v-model="data_type" placeholder="近三天"  @change="changeTime">
                    <el-option v-for="(item,index) in dates" :key="'data_' + index "  :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <div class="block select_module">
                <el-date-picker size="small" @change="changeDate" v-model="time" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"> </el-date-picker>
            </div>
            <!-- 部署方式 -->
            <div class="select_module">
                <span>部署方式</span>
                <el-select size="small" @change="changeDeployment" v-model="deployment_type" placeholder="全部">
                    <el-option v-for="(item,index) in deployment " :key="'deployment_' + index " :label="item.name" :value="item.value"> </el-option>
                </el-select>
            </div>
            <!-- 节点 -->
            <div class="select_module">
                <span>节点</span>
                <el-select  size="small" @change="changeGrid" v-model="grid_type" placeholder="全部">
                    <el-option v-for="(item,index) in grid_list" :key="'grid_list_' + index " :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <el-button class="export" size="mini" type="primary" @click="exportGride">导出</el-button>
        </section>
        <!-- 咨询量 -->
        <section class="count_container">
            <div class="count_module">
                <div class="count_header" style="background: #b198dc">咨询量</div>
                <div class="count_content">
                    <section class="count_counter">
                        <img src="../../assets/openinstall/consulte.png" alt=""><div class="counter_num">{{parseFloat(consult).toLocaleString()}}</div>
                    </section>
                </div>
            </div>
            <div class="count_module">
                <div class="count_header" style="background: #58bdde">访客量</div>
                <div class="count_content">
                    <section class="count_counter"> 
                        <img src="../../assets/openinstall/vistor.png" alt=""><div class="counter_num">{{parseFloat(visitors).toLocaleString()}}</div>
                    </section>
                </div>
            </div>
        </section>
        <!-- 图标 -->
        <section class="echart_container">
            <div class="echart_header">
                <div class="echart_header_taregt">
                    <!-- <span>指标</span>
                    <el-select @change='changeIndex' v-model="index" placeholder="请选择">
                        <el-option v-for="(item,index) in targets" :key="'target_' + index" :label="item.label" :value="item.value"></el-option>
                    </el-select> -->
                    <el-radio-group v-model="target" size="small" @change='changeIndex'>
                        <el-radio-button label="咨询量"></el-radio-button>
                        <el-radio-button label="访客量"></el-radio-button> 
                    </el-radio-group>
                </div>
                <div class="echart_header_selected">
                    <span>已选节点：</span>
                    <div class="grid_checked">
                        <div class="checked_container" v-for="(gridChecked,index) in grid_Selecteds" :key="'tag_' + index" @click="handleClose(gridChecked)">
                            <div>{{gridChecked.label}}</div><i class="el-icon-close"></i>
                        </div>
                        <!-- <div class="checked_container" v-show="!grid_Selecteds.length"><div>默认全部</div></div> -->
                        <!-- <el-tag v-for="(tag,index) in grid_Selecteds" :key="'tag_' + index" closable :disable-transitions="false" @close="handleClose(tag)">{{tag}}</el-tag> -->
                    </div> 
                </div>
                <div class="echart_header_time">
                    <!-- <div><span :class="{time_checked: !time_checked}" @click="changeAccountType(false)">按时</span><span :class="{time_checked: time_checked}" @click="changeAccountType(true)">按日</span></div> -->
                </div>
            </div>
            <!-- 折线图 -->
            <div class="echart_content">
                <div id="myChart"></div>
            </div>
        </section>
        <!-- 表格 -->
        <section class="table_container">
            <div class="table_header">节点咨询量列表</div>
            <div style="width:100%">
                <el-table :data="tableData" stripe @sort-change = "sortChange" :default-sort="{ order: 'descending'}">
                    <el-table-column prop="index" label="序号" align="center" width="150"></el-table-column>
                    <el-table-column prop="grid" label="节点名称" align="center"></el-table-column>
                    <el-table-column v-if="chooseGrid" prop="company_id" label="企业ID" align="center"></el-table-column>
                    <el-table-column prop="value" label="咨询量" align="center" sortable='custom' ></el-table-column>
                    <el-table-column prop="proportion" label="占比" align="center"></el-table-column>
                </el-table>
            </div>
            <pagination  v-show="paginationShow" :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
            <!-- element分页样式 -->
            <!-- <div class="pagination"><el-pagination :current-page.sync="currentPage" @current-change="handleCurrentChange"  layout="total, prev, pager, next, jumper" :total="currentAll"></el-pagination></div> -->
        </section>
    </div>
</template>

<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<script src="./index.js"></script>