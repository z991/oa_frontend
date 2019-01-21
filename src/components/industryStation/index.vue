/*
 * @Author: liuqian 
 * @Date: 2018-08-09 10:05:15 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-11-07 23:01:39
 */
<template>
    <div class="industryStation">
        <!-- 选项 -->
        <section class="select_container">
            <div style="width:16%;" class="select_module">
                <span>时间</span>
                <el-select size="small" v-model="timeSlot" @change="chooseTime">
                    <el-option
                    v-for="item in timeGap"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    >
                    </el-option>
                </el-select>
                <!-- <span v-for="(item,index) in timeGap" class="slotTime" :class="{pitchTime: item.active}" :key="index">{{item.name}}</span> -->
                <!-- <span class="slotTime">近一周</span>
                <span class="slotTime">近一个月</span> -->
            </div>
            <div style="width:25%;" class="block select_module">
                <el-date-picker
                    :clearable='false'
                    :editable="false"
                    size="small"
                    v-model="queryTerm.timeValue"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    format="yyyy - MM - dd "
                    value-format="yyyy-MM-dd">
                </el-date-picker>
            </div>
            <div class="block select_module">
                <span>行业</span>
                <el-select size="small" v-model="queryTerm.stationValue" clearable placeholder="全部">
                    <el-option
                    v-for="item in stationSelect"
                    :key="item.id"
                    :label="item.industry"
                    :value="item.industry">
                    </el-option>
                </el-select>
            </div>
            <div class="select_module">
                <span>部署方式</span> 
                <el-select  size="small" v-model="queryTerm.deployData" clearable placeholder="全部">
                    <el-option
                    v-for="item in deploySelect"
                    :key="item.name"
                    :label="item.name"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
             <el-button class="export" size="mini" type="primary" @click="exportInfo">导出</el-button>
              <!-- <el-button type="primary" size="mini" @click="inquireChart">查询</el-button> -->
        </section>
        <div class="cutWay">
          <span style="margin-left:6px;" :class="{optFor: isPitch}" @click="pitchIndustry">行业统计</span>
          <span :class="{optFor: !isPitch}"  @click="pitchStation">站点统计</span>
        </div>
        <div class="industry" v-show="isPitch">
          <!-- 咨询量 -->
          <section class="count_container">
              <div class="count_module">
                  <div class="count_header" style="background: #b198dc">咨询量</div>
                  <div class="count_content">
                      <section class="count_counter">
                          <img src="../../assets/openinstall/consulte.png" alt=""><div class="counter_num">{{industry_data.inquiries}}</div>
                      </section>
                  </div>
              </div>
              <div class="count_module">
                  <div class="count_header" style="background: #58bdde">访客量</div>
                  <div class="count_content">
                      <section class="count_counter"> 
                          <img src="../../assets/openinstall/vistor.png" alt=""><div class="counter_num">{{industry_data.visitors}}</div>
                      </section>
                  </div>
              </div>
          </section>
          <div class="deploy">
              <div class="inforLine">
                <label for="">指标 </label>
                <el-select size="mini" v-model="norm_data" placeholder="咨询量" @change="norm_change">
                  <el-option
                  v-for="item in norm_industry"
                  :key="item.name"
                  :label="item.name"
                  :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div id="consultChart_indus" v-show="industryLine_show" :style="{width: '90%', height: '310px', margin: '0 auto'}"></div>
              <div class="noData"  v-show="!industryLine_show">暂无数据</div>
          </div>
          <div class="trend" id="trend">
              <div class="trendSum">
                  <div class="sumTitle">
                      <p class="fl">行业数量占比</p><p class="fr"></p>
                  </div>
                  <div id="scaleChart_indus" v-show="industryScale_show" :style="{width: '90%', height: '310px', margin: '0 auto'}"></div>
                  <div class="noData" v-show="!industryScale_show">暂无数据</div>
              </div>
              <div class="trendSum">
                  <div class="sumTitle">
                      <p class="fl">部署方式行业数量及占比</p><p class="fr"></p>
                  </div>
                  <div id="deployChart_indus" v-show="deployScale_show" :style="{width: 90 +'%',height: '310px', margin: '0 auto'}"></div>
                  <div class="noData" v-show="!deployScale_show">暂无数据</div>
              </div>
          </div>
        </div>
        <div class="station"  v-show="!isPitch">
          <div class="induction">
            <!-- <div class="singleCase">
                <span class="fl singCon" ></span>
                <span class="singNum fl">
                    <p>续费客户</p>
                    <p class="current">222</p>
                </span>
            </div> -->
            <div class="singleCase" v-for="(item,index) in siteSas" :key="item.name_cur">
                <span class="fl" :class="iconClass[index]" ></span>
                <span class="singNum fl">
                    <p>{{item.name_cur}}</p>
                    <p class="current">{{item.number_cur}}</p>
                </span>
            </div>
            <!-- <div class="singleCase" v-for="(item,index) in homoeTop" :key="index">
                <span class="fl" :class="iconClass[index]"></span>
                <span class="singNum fl">
                    <p>{{item.name}}</p>
                    <p class="current">{{item.today}}</p>
                    <p class="contrast">（昨）{{item.yesterday}}</p>
                </span>
            </div> -->
          </div>
          <div class="deploy">
              <div class="inforLine">
                <label for="">运营指标 </label>
                <el-select size="mini" v-model="operaData" placeholder="全部" @change="operateFilter">
                  <el-option
                  v-for="item in operaIndex"
                  :key="item.name"
                  :label="item.name"
                  :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div id="cusChartpv_station" ref="cusChartpv_station" :style="{width: 90 + '%', height: '310px', margin: '0 auto'}"></div>
          </div>
          <div class="deploy">
            <p class="stationNum">站点数量变化趋势</p>
            <div id="numChart_station" :style="{width: '90%', height: '310px', margin: '0 auto'}"></div>
          </div>
        </div>
    </div>
</template>
<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<script src="./index.js"></script>
