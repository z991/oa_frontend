/*
 * @Author: liuqian 
 * @Date: 2018-09-13 14:00:31 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-26 17:32:24
 */
<template>
  <div class="informVersion">
    <div class="allContent" v-if="!isSendFlag">
      <div class="allVersion">
        <div class="versionTitle">
          <div class="headline">版本库<img src="../../assets/doubt.png" alt="" @mouseover="describeShow=true" ></div>
          <p><span @click="createStair" title="创建一级标签" class="addLow"></span></p>
          <div class="explanation" v-show="describeShow" @mouseover="describeShow=true" @mouseout="describeShow=false">
            <p>样例：</p>
            <p>本次更新</p>
            <p>发布时间：yymmdd</p>
            <p>产品版本为vx.y.z；</p>
            <p>版本说明：简要概括本次产品迭代的目标和需要达到的效果；</p>
            <p>【全新内容】</p>
            <p>1.新增XX模块1/功能1，达到XX效果/目的；</p>
            <p>2.新增XX模块2/功能2，达到XX效果/目的；</p>
            <p>【产品优化】</p>
            <p>1.优化现有XX模块1/功能1，改进了/整合了XX体验/操作/展示，达到XX效果/目的；</p>
            <p>2.优化现有XX模块2/功能2，改进了/整合了XX体验/操作/展示，达到XX效果/目的；</p>
            <p>【修复内容】</p>
            <p>1.修复XX模块1/功能1，增强了/整合了XX体验/操作/展示，达到XX效果/目的；</p>
            <p>2.修复XX模块2/功能2，增强了/整合了XX体验/操作/展示，达到XX效果/目的；</p>
          </div>
        </div>
        <div class="versionRecord" v-for="(item,index) in versionList" :key="index+'a'">
          <div class="firstGrade">
            <div class="firstShow" :class="{pick: item.operateShow || item.versionShow}" @mouseover="item.operateShow=true" @mouseout="item.operateShow=false">
              <div class="firstLeft" @click="getProduct(item)"><img v-show="item.children.length" src="../../assets/down.png">{{item.version_id}}</div>
              <div class="firstOperate" v-show="item.operateShow || item.versionShow">
                <a href="javascript:void(0)" class="addLow" @click="createSecond(item)"></a>
                <a href="javascript:void(0)" class="editCurrent" @click="editFirst(item)"></a>
                <a href="javascript:void(0)" class="deleteCurr" @click="deleteFirst(item)"></a>
                <a href="javascript:void(0)" class="firstSend" @click="onSendFirst('id',item)"></a>
              </div>
            </div>
            <div class="firstEdit" v-show="item.createJunior">
              <input type="text" v-model="versionNum" /><img src="../../assets/ensure.png" alt="" @click="createLower()" /><img src="../../assets/abolish.png" alt=""  @click="cancelLower()">
            </div>
          </div>
          <div v-for="seconItem in item.children" :key="seconItem.version_id+'b'">
            <div class="secondGrade" v-show="item.children.length">
              <div class="firstShow" :class="{pick: seconItem.operateShow || seconItem.versionShow}" @mouseover="seconItem.operateShow=true" @mouseout="seconItem.operateShow=false">
                <div class="firstLeft" @click="getProduct(seconItem)"><img v-show="item.children.length" src="../../assets/down.png">{{seconItem.version_id}}</div>
                <div class="firstOperate" v-show="seconItem.operateShow || seconItem.versionShow">
                  <a href="javascript:void(0)" class="addLow" @click="createSecond(seconItem)"></a>
                  <a href="javascript:void(0)" class="editCurrent" @click="editFirst(seconItem)"></a>
                  <a href="javascript:void(0)" class="deleteCurr" @click="deleteFirst(seconItem)"></a>
                  <a href="javascript:void(0)" class="firstSend" @click="onSendFirst('id',seconItem)"></a>
                </div>
              </div>
              <div class="firstEdit" v-show="seconItem.createJunior">
                <input type="text" v-model="versionNum" /><img src="../../assets/ensure.png" alt="" @click="createLower()" /><img src="../../assets/abolish.png" alt="" @click="cancelLower()" />
              </div>
            </div>
            <div class="thirdGrade" v-show="seconItem.children.length" v-for="(thirdItem,index) in seconItem.children" :key="index+'c'" >
              <div class="firstShow" :class="{pick: thirdItem.operateShow || thirdItem.versionShow}" @mouseover="thirdItem.operateShow=true" @mouseout="thirdItem.operateShow=false">
                <div class="firstLeft" @click="getProduct(thirdItem)">{{thirdItem.version_id}}</div>
                <div class="firstOperate" v-show="thirdItem.operateShow || thirdItem.versionShow">
                  <a href="javascript:void(0)" class="editCurrent" @click="editFirst(thirdItem)"></a>
                  <a href="javascript:void(0)" class="deleteCurr" @click="deleteFirst(thirdItem)"></a>
                  <a href="javascript:void(0)" class="firstSend" @click="onSendFirst('id',thirdItem)"></a>
                </div>
              </div>
              <div class="firstEdit" v-show="thirdItem.createJunior">
                <input type="text" v-model="versionNum" @change="limitNumber" /><img src="../../assets/ensure.png" alt="" @click="createLower()" /><img src="../../assets/abolish.png" alt="" @click="cancelLower()" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="versionList">
        <div class="createLine">
          <el-button @click="createProduct" type="primary" size="small">创建产品线版本</el-button>
        </div>
        <div class="showVersion">
          <ul>
            <li class="title">
              <span class="wid5">产品线名称</span>
              <span class="wid5">产品线版本号</span>
              <span class="wid5">发版时间</span>
              <span class="wid5">是否发版</span>
              <span class="wid5">操作</span>
            </li>
            <li v-for="(item,index) in productList" :key="index">
              <span class="wid5">{{item.product_name}}</span>
              <span class="wid5">{{item.product_version}}</span>
              <span class="wid5">{{item.release_date}}</span>
              <span class="wid5">{{item.release_status}}</span>
              <span class="wid5">
                <a href="javascript:void(0)" class="editInfo" @click="editProduct(item.id,item.version_id.id)"></a>
                <a href="javascript:void(0)" class="deleteInfo" @click="deleteProduct(item.id)"></a>
                <a href="javascript:void(0)" class="emailInfo" @click="onSendFirst('content',item)"></a>
              </span>
            </li>
            <!-- <li >
              <span class="wid4">在线咨询</span>
              <span class="wid4">7.1.1</span>
              <span class="wid4">2018-09-23</span>
              <span class="wid4">
                <a href="javascript:void(0)" class="editInfo"></a>
                <a href="javascript:void(0)" class="deleteInfo"></a>
                <a href="javascript:void(0)" class="emailInfo"></a>
              </span>
            </li> -->
          </ul>
        </div>
        <!-- 进度条 -->
        <div class="progressBar">
          <ul>
            <li class="amongProduct" v-for="(item,index1) in versionFlow" :key="index1+'z'">
              <label class="firstHeadline" for="">{{item.product_name}}</label>
              <div class="allProcess">
                <div class="amongStep">
                  <div class="trabeculaBar" v-for="(item2,index2) in item.schedule" :key="index2+'x'">
                    <span 
                      class="serialNum" 
                      :class="{performBar:item2.mileage == 1,passiveRejectBar: item2.mileage == 3,rejectBar: item2.mileage == 2}">
                      {{item2.index}}
                    </span>
                    <div v-show="!(item2.index%2)" class="operateExplain overlap">
                      <p>{{item2.name}}</p>
                      <p><span @click="operateStep(item.id,item2.name,item3)" class="operateBtn" v-for="(item3,index3) in item2.buttonOperate" :key="index3+'q'">{{item3}}</span></p>
                      <p>{{item2.time}}</p>
                      <p v-show="!(item2.index == 1)">
                        <label for="" class="mileage">里程：</label>
                        <span>{{item2.course}}</span>
                        <el-date-picker
                          v-model="item2.course"
                          @change="predictChoose(item.id,item2.name,item2.course)"
                          type="date"
                          :clearable='false'
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </p>
                    </div>
                    <div v-show="item2.index%2" class="operateExplain">
                      <p>{{item2.name}}</p>
                      <p><span  @click="operateStep(item.id,item2.name,item3)" class="operateBtn" v-for="(item3,index3) in item2.buttonOperate" :key="index3+'q'">{{item3}}</span></p>
                      <p>{{item2.time}}</p>
                      <p v-show="!(item2.index == 1)">
                        <label for="" class="mileage">里程：</label>
                        <span>{{item2.course}}</span>
                        <el-date-picker
                          v-model="item2.course"
                          @change="predictChoose(item.id,item2.name,item2.course)"
                          type="date"
                          :clearable='false'
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </p>
                    </div>
                  </div>
                  <!-- <div class="trabeculaBar">
                    <span class="serialNum passiveRejectBar">2</span>
                    <div class="operateExplain">
                      <p>测试</p>
                      <p><span class="operateBtn">驳回1</span></p>
                    </div>
                  </div> -->
                  <!-- <div class="trabeculaBar">
                    <div class="operateExplain">
                      <p>测试</p>
                      <p><span class="operateBtn">驳回2</span></p>
                      <p>
                        <label for="" class="mileage">里程：</label>
                        <span>{{value1}}</span>
                        <el-date-picker
                          v-model="value1"
                          type="date"
                          :clearable='false'
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd">
                        </el-date-picker>
                      </p>
                    </div>
                    <span class="serialNum rejectBar">3</span>
                  </div> -->
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        <!-- 修改记录 -->
        <div class="modifyRecord"  v-show="modifyRecord.length">
          <header>日期</header>
          <ul class="listsContainer">
              <li v-for="(record,index) in modifyRecord" :key="index+'i'">
                  <div class="listLeft">
                      <div class="circle"></div>
                      <div class="line"></div>
                  </div>
                  <div class="listRight">
                      <div class="listTit">
                          <span class="listDesc">{{record.user}}改变了：</span>
                          <span class="listModel">{{record.modify_list[0].type}}</span>
                      </div>
                      <div class="listContent">
                          <el-table
                              :data="record.modify_list"
                              style="width: 100%">
                              <el-table-column prop="name" label="类型" align="center"></el-table-column>
                              <el-table-column prop="old_value" label="原值" align="center"></el-table-column>
                              <el-table-column prop="new_value" label="新值" align="center"></el-table-column>
                              <el-table-column prop="time" label="" align="center"></el-table-column>
                          </el-table>
                      </div>
                      <!-- <div class="listFooter"></div> -->
                  </div>
              </li>
          </ul>
        </div>
      </div>
    </div>
    <versionSettings v-if="isSendFlag" :propsId="propsId" :propsContent="propsContent" :propsType="propsType" @onPropsSendFlag="onSendFlag"/>
  </div>
</template>
<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./../../assets/home.scss" scoped></style>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style>
.operateExplain .el-date-editor.el-input, .operateExplain .el-date-editor.el-input__inner{width:0;}
.operateExplain .el-input--prefix .el-input__inner{padding-left:0;}
.operateExplain .el-input--suffix .el-input__inner{padding-right:0;}
.operateExplain .el-input__inner{border:none;height:20px;}
.operateExplain .el-input__icon{line-height: 20px;}
</style>

