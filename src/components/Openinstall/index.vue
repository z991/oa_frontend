<template>
    <div class="container">
        <!-- 选项 -->
        <section class="select_container">
            <!-- 时间 -->
            <div class="select_module">
                <span>时间</span>
                <el-select  size="small" v-model="data_type" placeholder="近三天"  @change="changeTime">
                    <el-option v-for="(item,index) in dates" :key="'data_' + index "  :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <div class="block select_module">
                <el-date-picker size="small" @change="changeDate" v-model="time" type="daterange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"> </el-date-picker>
            </div>
            <!-- 站点行业 -->
            <div class="select_module">
                <span>站点/行业</span>
                <el-select  size="small" @change="changeIndustry" v-model="industry_type" placeholder="全部">
                    <el-option v-for="(item,index) in industry" :key="'industry_' + index" :label="item.industry" :value="item.id"> </el-option>
                </el-select>
            </div>
            <!-- 部署方式 -->
            <div class="select_module">
                <span>部署方式</span>
                <el-select  size="small" @change="changeDeployment" v-model="deployment_type" placeholder="全部">
                    <el-option v-for="(item,index) in deployment " :key="'deployment_' + index " :label="item.name" :value="item.value"> </el-option>
                </el-select>
            </div>
            <!-- 渠道 -->
            <div class="select_module">
                <span>渠道</span>
                <el-select size="small" @change="changeChannel" v-model="channel_type" placeholder="全部">
                    <el-option v-for="(item,index) in channel" :key="'channel_' + index " :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div>
            <el-button class="export" size="mini" type="primary" @click="exportDitch">导出</el-button>
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
        <section class="echart_container" >
            <div class="echart_header">
                <div class="echart_header_taregt">
                    <!-- <span>指标</span>
                    <el-select @change='changeIndex' v-model="index" placeholder="请选择">
                        <el-option v-for="(item,index) in targets" :key="'target_' + index" :label="item.label" :value="item.value"></el-option>
                    </el-select> -->
                    <el-radio-group v-show="versionInfo === '1'" v-model="target" size="small" @change='changeIndex'>
                        <el-radio-button label="咨询量"></el-radio-button>
                        <el-radio-button label="访客量"></el-radio-button>
                    </el-radio-group>
                    <el-radio-group v-show="versionInfo != '1'" v-model="target" size="small">
                        <el-radio-button label="咨询量"></el-radio-button>
                    </el-radio-group>
                </div>
                <div class="echart_header_selected">
                    <span>已选渠道：</span>
                    <div class="channel_checked">
                        <div class="checked_container" v-for="(channelSelected,index) in channelSelecteds" :key="'tag_' + index" @click="handleClose(channelSelected)">
                            <div>{{channelSelected.label}}</div><i class="el-icon-close"></i>
                        </div>
                        <!-- <div class="checked_container" v-show="!channelSelected.length"><div>默认全部</div></div> -->
                    </div> 
                </div>
                <div class="echart_header_time">
                    <!-- <div><span :class="{time_checked: !time_checked}" @click="changeAccountType(false)">按时</span><span :class="{time_checked: time_checked}" @click="changeAccountType(true)">按日</span></div> -->
                </div>
            </div>
            <div class="echart_content">
                <!-- 折线图 -->
                <div class="echart_right">
                    <div id="myChart2"></div>
                </div>
                <!-- 饼状图 -->
                <div class="echart_left">
                    <div id="myChart1"></div>
                </div>
            </div>
        </section>
        <!-- 表格 -->
        <section class="table_container">
            <div style="width:100%;height:100%">
                <el-table v-show="versionInfo === '1'" :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="channel" label="渠道类型" align="center"></el-table-column>
                    <el-table-column prop="consult" label="咨询量" align="center"></el-table-column>
                    <el-table-column prop="visitors" label="访客量" align="center"></el-table-column>
                </el-table>
                <el-table v-show="versionInfo != '1'" :data="tableData" stripe style="width: 100%">
                    <el-table-column prop="channel" label="渠道类型" align="center"></el-table-column>
                    <el-table-column prop="consult" label="咨询量" align="center"></el-table-column>
                </el-table>
            </div>
        </section>
    </div>
</template>

<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<script src="./index.js"></script>
