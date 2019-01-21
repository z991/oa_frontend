<template>
    <div class="gong">
      <!-- <p class="qu">业务管理>开站管理</p> -->
      <p class="ji">
        <section>
          <div class="lab_input"><p for="">客户名称</p><input type="text" placeholder="请输入客户名称" v-model="mess.company_name" style='width:110px;margin:0 10px' @keyup.enter="search"></div>
          <div class="lab_input"><p for="">企业ID</p><input type="text" placeholder="请输入客户ID" v-model="mess.company_id"  style='width:110px;margin:0 10px' @keyup.enter="search"></div>
          <div class="lab_sel">
             <p for="">客户版本</p>
             <select name="" id="" v-model='mess.cli_version'>
                  <option value=" ">---</option>
                  <option value="1">B2B</option>
                  <option value="2">B2C</option>
              </select>
          </div>
          <div class="lab_sel">
            <p for="">上线状态</p>
            <select name="" id="" v-model='mess.online_status'>
                <option value=" ">---</option>
                <option value="True">上线</option>
                <option value="False">未上线/下线</option>
            </select>
          </div>
        </section>
        <section>
          <div class="lab_sel">
             <p for="">部署方式</p>
             <select name="" id="" v-model='mess.deploy_way'>
                <option value=" ">---</option>
                <option value="1">标准版</option>
                <option value="2">公有云</option>
                <option value="3">专属云</option>
                <option value="4">私有云</option>
            </select>
          </div>
          <div class="lab_sel">
            <p for="">站点类型</p>
            <select name="" id=""  v-model='mess.station_type'>
                <option value=" ">---</option>
                <option value="1">试用客户</option>
                <option value="2">正式客户</option>
                <option value="3">市场渠道客户</option>
                <option value="4">商务渠道客户</option>
                <option value="5">自用站点</option>
            </select>
          </div>
          <div class="lab_input">
            <p for="">节点</p>
            <input type="text" style='width:110px;margin:0 10px' v-model="mess.grid_name" @keyup.enter="search"/>
          </div>
          <div class="lab_input"> 
            <p for="">行业</p>
            <input type="text" style='width:110px;margin:0 10px' v-model="mess.industry" @keyup.enter="search"/>
          </div>
        </section>
        <section class="btn_search">
          <a href="javascript:void(0)" class="so" @click='search()'>搜索</a>
          <a href="javascript:void(0)" class="cho" @click='chon()'>重置</a>
        </section>
      </p>
      <div class="xinz">
          <a href="javascript:void(0)"  class="so" @click='add()'>新增</a>
          <a href="javascript:void(0)" class="so" @click='expor()'>导出</a>
          <input type="file" @change="importFile(this)" id="imFile" style="display: none"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
          <!-- <el-button class="button" @click="uploadFile()">导入</el-button> -->

          <span class="field" @click="choose_field">选择显示字段<img src="../assets/tan.png" /></span>
          <div class="allChoice" v-show="all_option" @mouseleave="allChoice">
              <p class="all_check"><span style="margin-left:26px;cursor:pointer;"><img src="../assets/multiSelect.png" />所有字段</span></p>
              <p v-for="(item,index) in caption" :key="index" class="captions"><input @change="changeField" type="checkbox" v-model="item.checked" :disabled="item.disabled" class="_checkbox"/><label for="" class="_label">{{item.name}}</label></p>
          </div>
      </div>
      <el-table
        :data="bb"
        style="width: 100%;"
        >
        <el-table-column
          prop="index"
          label="序号"
          width="90">
        </el-table-column>
        <el-table-column
          v-if="caption[0].checked"
          prop="company_name"
          label="客户名称">
        </el-table-column>
        <el-table-column
          v-if="caption[1].checked"
          prop="company_id"
          label="客户ID">
        </el-table-column>
        <el-table-column
          v-if="caption[2].checked"
          prop="open_station_time"
          :render-header="renderOpentime"
          label="开站日期">
        </el-table-column>
        <el-table-column
          v-if="caption[3].checked"
          prop="close_station_time"
          :render-header="renderClosetime"
          label="到期日期">
        </el-table-column>
        <el-table-column
          v-if="caption[4].checked"
          prop="industry"
          label="行业">
        </el-table-column>
        <el-table-column
          v-if="caption[5].checked"
          prop="classify_name"
          label="产品分类">
        </el-table-column>
        <el-table-column
          v-if="caption[6].checked"
          prop="deploy_way"
          label="部署方式">
        </el-table-column>
        <el-table-column
          v-if="caption[7].checked"
          prop="cli_version"
          label="客户版本">
        </el-table-column>
        <el-table-column
          v-if="caption[8].checked"
          prop="station_type"
          label="站点类型">
        </el-table-column>
        <el-table-column
          v-if="caption[9].checked"
          prop="grid"
          label="节点"
          width="90">
        </el-table-column>
        <el-table-column
          v-if="caption[10].checked"
          prop="order_work"
          label="信息来源">
        </el-table-column>
        <el-table-column
          v-if="caption[11].checked"
          label="反向同步">
          <template slot-scope="scope">
            <a class="migration" href="javascript:void(0)" @click="reverseStep(scope.row.company_id)">反向同步</a>
          </template>
        </el-table-column>
        <el-table-column
          v-if="caption[12].checked"
          label="状态"
          width="90">
          <template slot-scope="scope">
            <img src='../assets/open.png' alt="xx" @click='qie(scope.$index,scope.row.id,scope.row.online_status)' v-if='scope.row.online_status'>
            <img src='../assets/clo.png' alt="xx" @click='qie(scope.$index,scope.row.id,scope.row.online_status)' v-else >
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <a href="javascript:void(0)" title="编辑" class="bian" @click='bian(scope.row.id)'><i class="el-icon-edit"></i></a>
            <a href="javascript:void(0)" title="复制" class="copyOperate" @click='copyStation(scope.row.id,scope.row.classify_name)'></a>
            <a href="javascript:void(0)" title="子站" v-if="scope.row.cli_version === 'B2B'" class="subSite" @click='subSite(scope.row.id,scope.row.company_id)'></a>
            <a href="javascript:void(0)" title="删除" class="dele" @click='delet(scope.row.id)'><i class="el-icon-delete"></i></a>
            <!-- <el-button @click="handleClick(scope.row,scope.column,scope.$index)" type="text" size="small">查看</el-button> -->
            <!-- <el-button type="text" size="small">编辑</el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <!-- <div class="showMenu">
        <p class="cp">
            <a href="javascript:void(0)" class="c2">序号</a>          
            <a href="javascript:void(0)" class="c3" v-show="caption[0].checked">客户名称</a>
            <a href="javascript:void(0)" class="c2" v-show="caption[1].checked">企业ID</a>
            <a href="javascript:void(0)" class="c1" v-show="caption[2].checked" @click="orderBy('open_station_time', toggleOrder1)">
              <span>开站日期</span>
              <span class="sortBy">    
                <div><p v-bind:class="{'upActive': upIsActive, 'unUpActive': !upIsActive}"></p></div>
                <div><p v-bind:class="{'downActive': downActive, 'unDownActive': !downActive}"></p></div>
              </span>  
            </a>      
            <a href="javascript:void(0)" class="c1" v-show="caption[3].checked" @click="orderBy('close_station_time', toggleOrder2)">
              <span>到期日期</span>  
              <span class="sortBy">    
                <div><p v-bind:class="{'upActive': upCloseActive, 'unUpActive' : !upCloseActive}"></p></div>
                <div><p v-bind:class="{'downActive': downCloseActive, 'unDownActive' : !downCloseActive}"></p></div>
              </span>
            </a>
            <a href="javascript:void(0)" class="c2" v-show="caption[4].checked">行业</a>
            <a href="javascript:void(0)" class="c2" v-show="caption[5].checked">产品分类</a>
            <a href="javascript:void(0)" class="c2" v-show="caption[6].checked">部署方式</a>
            <a href="javascript:void(0)" class="c2" v-show="caption[7].checked">客户版本</a>
            <a href="javascript:void(0)" class="c2" v-show="caption[8].checked">站点类型</a>
            <a href="javascript:void(0)" class="c2" v-show="caption[9].checked">节点</a>
            <a href="javascript:void(0)" class="c2" v-show="caption[10].checked">信息来源</a>
            <a href="javascript:void(0)" class="c2" v-show="caption[11].checked">状态</a>
            <a href="javascript:void(0)" class="c2" v-show="caption[11].checked">反向同步</a>
            <a href="javascript:void(0)" class="c2">操作</a>
        </p>
        <ul class="it">
            <li v-for="(item,index) in bb" :key='item.id'>
                <span class="c2">{{item.index}}</span> 
                <span class="c3" v-show="caption[0].checked">{{item.company_name }}</span>
                <span class="c2" v-show="caption[1].checked">{{item.company_id}}</span> 
                <span class="c1" v-show="caption[2].checked">{{item.open_station_time}}</span>
                <span class="c1" v-show="caption[3].checked">{{item.close_station_time}}</span>
                <span class="c2" v-show="caption[4].checked">{{item.industry}}</span>
                <span class="c2" v-show="caption[5].checked">{{item.classify_name}}</span>
                <span class="c2" v-show="caption[6].checked">{{item.deploy_way}}</span>
                <span class="c2" v-show="caption[7].checked">{{item.cli_version}}</span>
                <span class="c2" v-show="caption[8].checked">{{item.station_type}}</span>
                <span class="c2" v-show="caption[9].checked">{{item.grid}}</span>
                <span class="c2" v-show="caption[10].checked">{{item.order_work}}</span>
                <span class="c2" :class="{forbid: isfor}" v-show="caption[11].checked">
                  <img src='../assets/open.png' alt="xx" @click='qie(index,item.id)' v-if='item.online_status'>
                  <img src='../assets/clo.png' alt="xx" @click='qie(index,item.id)' v-else  >
                </span>
                <span class="c2" ><a class="migration" href="javascript:void(0)" @click="reverseStep(item.company_id)">反向同步</a></span>
                <span class="c2">
                  <a href="javascript:void(0)" class="bian" @click='bian(item.id)'></a>
                  <a href="javascript:void(0)" class="dele" @click='delet(item.id,index)'></a>
                  <a href="javascript:void(0)" class="copyOperate" @click='copyStation(item.id,item.classify_name)'></a>
                </span>
            </li>
        </ul>
      </div> -->
      <div v-show='newSite' class='newSite'>
          <p style='height:50px;line-height:50px;padding-left:20px;'><span>{{b3}}</span><i @click='close()' class='clo'></i></p>
          <p><span class='line gray cd'><em class='num num1'>1</em>公司信息</span><span class='gray cd'><em class='num'>2</em>站点信息</span><span class='gray cd'><em class='num'>3</em>功能开关</span><span><em class='num'>4</em>账户配置</span></p>
          <p class='mes'>公司信息</p>
          <p>
              <label for="">站点类型</label>
              <select name="" id=""  v-model='company_info.station_type' v-bind:disabled='adisabl'>
                  <option value="1">试用客户</option>
                  <option value="2">正式客户</option>
                  <option value="3">市场渠道客户</option>
                  <option value="4">商务渠道客户</option>
                  <option value="5">自用站点</option>
              </select><em class='ii'>*</em></p>
          <p><label for="">公司名称</label><input type="text" v-model='company_info.company_name' maxlength="50" v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p><label for="">公司简称</label><input type="text" v-model='company_info.abbreviation' maxlength="50" v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p class='bao' v-for='(item,index) in company_info.company_url' :key="index">
              <label for="">公司网址</label><input type="url"  style="ime-mode:disabled" v-model='item.company_url' v-bind:disabled='adisabl'><em class='ii'>*</em>
              <a href="javascript:void(0)" class='qub' @click='ad_url()' v-show='item.ac'>增加网址</a>
              <a href="javascript:void(0)" class="dele" @click='de_url(index)' v-show='item.a2' style='border:none'></a>
          </p>
          <p><label for="">公司地址</label>
              <select name="" id="" v-bind:disabled='adisabl' style='width:120px;' v-model='company_info.company_address.province' @change='gon_change()'>
              <option v-for='(it,index) in ite2' :key="index" :value="it.id">{{it.atitle}}</option>
              </select>
              <select style='width:120px;margin:0 10px;' name="" id="" v-bind:disabled='adisabl' v-model='company_info.company_address.city'>
                  <option v-for='(it,ind) in ite3' :key="ind" :value="it.id">{{it.atitle}}</option>
              </select><input type="text" style='width:140px' maxlength="80" v-bind:disabled='adisabl' v-model='company_info.company_address.detail'><em class='ii'>*</em></p>
          <p><label for="">公司邮箱</label><input type="text" v-model='company_info.company_email' maxlength="50" v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p><label for="">所属行业</label><select name="" id="" v-model='company_info.industry' v-bind:disabled='adisabl'>
              <option v-for='(it,index) in ite1' :value="it" :key="index">{{it}}</option>
              </select><em class='ii'>*</em></p>
          <p><label for="">营业执照名称</label><input type="text" v-model='company_info.GSZZ' maxlength="50" v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p>
              <label for="">客户性质</label><select name="" id="" v-model='company_info.customer_type' v-bind:disabled='adisabl'>
                  <option value="0">新客户</option>
                  <option value="1">老客户补录</option>
              </select><em class='ii'>*</em>
              </p>
          <p><label for="">客服服务区域</label><input type="text" v-model='company_info.service_area' maxlength="60" v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p  class='mes'>企业联系人</p>
          <div v-for='(item,index) in link_info' :key='item.id'>
             <P><label for="">联系人</label><input type="text" v-model='item.linkman' v-bind:disabled='adisabl'><a href="javascript:void(0)" class="dele" @click='dele_ser(index)' ></a><em class='ii'>*</em></P>
             <P><label for="">联系电话</label><input onkeydown="if(event.keyCode==32) return false" type="text" v-model='item.link_phone' maxlength="50" v-bind:disabled='adisabl'><em class='ii'>*</em></P>
             <P><label for="">电子邮箱</label><input onkeydown="if(event.keyCode==32) return false" type="email" v-model='item.link_email' maxlength="50" v-bind:disabled='adisabl'><em class='ii'>*</em></P>
             <P><label for="">QQ号</label><input onkeydown="if(event.keyCode==32) return false" type="text" v-model='item.link_qq' maxlength="15" v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          </div>
          <p class='bao'><a href="javascript:void(0)" class='qub' @click='clo()'>新增联系人</a></p>
          <!-- <div>{{errorMessage}}</div> -->
          <p class='bao' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='next()'>下一步</a></p>
      </div>
      <div v-show='newSite1' class='newSite'>
          <p style='height:50px;line-height:50px;padding-left:20px;'><span>{{b3}}</span><i @click='close()' class='clo'></i></p>
           <p><span class='line cd back'><em class='num num1'>1</em>公司信息</span><span class='line cd gray'><em class='num num1'>2</em>站点信息</span><span class='gray cd'><em class='num'>3</em>功能开关</span><span><em class='num'>4</em>账户配置</span></p>
          <p class='mes'>站点信息</p>
          <P><label for="">企业ID</label><input type="text" v-model='station_info.company_id' maxlength="20" v-bind:disabled='adisab2'><em class='ii'>*</em></P>
          <P><label for="">部署方式</label>
              <select name="" id="" v-model='station_info.deploy_way' v-bind:disabled='adisabl' @change="selectVal()">
                  <option value="1">标准版</option>
                  <option value="2">公有云</option>
                  <option value="3">专属云</option>
                  <option value="4">私有云</option>
              </select><em class='ii'>*</em></P><!--  @blur='blurr()' v-model.number='station_info.validity_days' v-bind:disabled='adisabl'-->
          <P><label for="">有效日期</label>
          <input style="width:170px;" type="text" v-model="station_info.open_station_time" maxlength="50" disabled='disabled'>
          <span style="width:50px;text-align:center;">———</span>
          <input style="width:170px;" type="text" v-model="station_info.close_station_time" @focus='focu()' 
          @blur='figure()' readonly="true" @mouseleave='hidee' />
          <em class='ii'>*</em><span>共{{station_info.validity_days}}天</span></P>
          <datee v-if='date_s' v-on:incrementt="incrementTi"  @mouseleave.native='hide1()'></datee>
          <P><label for="">节点选择</label>
                <select name="" id="" v-model='station_info.grid' v-bind:disabled='adisabl'>
                    <option v-for='(it,index) in ite4' :value="it.grid_name" :key="index">{{it.grid_name}}</option>
                </select><em class='ii'>*</em></P>
          <P><label for="">客户版本</label>
                <select name="" id="" v-model='station_info.cli_version' v-bind:disabled='adisabl' >
                    <option value="1">B2B</option>
                    <option value="2">B2C</option>
                    <!--option value="3">不限</option-->
                </select><em class='ii'>*</em></P>
          <!-- <P ><label for="">开站日期</label><input type="text"  @focus='focu()' @blur='blurr()' readonly="true" @mouseleave='hidee' v-model='station_info.open_station_time' v-bind:disabled='adisabl' placeholder="以英文格式输入：0000-00-00" ><em class='ii'>*</em>到期日期:<span>{{station_info.close_station_time}}</span> -->
          <!-- <datee v-show='date_s' v-on:incrementt="incrementTi"  @mouseleave.native='hide1()'></datee></P> -->
          <p class='mes'>合同产品<em class='ii'>*</em></p>
          <p><span class='spp' v-for='(it,index) in ite5' :key="index"><input type="checkbox" :value='it' v-model='station_info.pact_products' v-bind:disabled='adisabl'><span class='sp'>{{it}}</span></span></p>
          <p><label for="">SDK_key</label><input type="text" v-model='uuidCode' disabled='disabled'></p>          
          <p class='mes'>支持人员</p>
          <p><label for="">销售人员</label><input type="text" v-model='station_info.sales' v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p><label for="">售前人员</label><input type="text" v-model='station_info.pre_sales' v-bind:disabled='adisabl'></p>
          <p><label for="">运营顾问</label><input type="text" v-model='station_info.oper_cslt' v-bind:disabled='adisabl'></p>
          <p><label for="">实施顾问</label><input type="text" v-model='station_info.impl_cslt' v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p><label for="">运营支持</label><input type="text" v-model='station_info.oper_supt' v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p class='bao' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='add1()'>上一步</a><a href="javascript:void(0)" class='qub' @click='next1()'>下一步</a></p>
      </div>
      <div v-show='newSite2' class='newSite'>
          <p style='height:50px;line-height:50px;padding-left:20px;'><span>{{b3}}</span><i @click='close()' class='clo'></i></p>
           <p><span class='line cd back'><em class='num num1'>1</em>公司信息</span><span class='line cd back'><em class='num num1'>2</em>站点信息</span><span class='line  cd gray'><em class='num num1'>3</em>功能开关</span><span><em class='num'>4</em>账户配置</span></p>
          <div v-for='(it,index) in ite6' :key="index">
              <p class='mes'>{{it.product}}</p>
              <p v-for='iq in it.function' :key='iq.id'>
                  <label for="">{{iq.func_name}}</label>
                  <select v-if='iq.func_type==="单选框"' name="" id="" v-model='iq.func_value' v-bind:disabled='adisabl'>
                      <option v-for='it in iq.selection' :value="it.id" :key='it.id'>{{it.select_name}}</option>
                  </select>
                 <input v-else type="text" v-model='iq.func_valu' v-bind:disabled='adisabl'><em class='ii'>*</em>
              </p>
          </div>
          <p class='bao' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='next()'>上一步</a><a href="javascript:void(0)" class='qub' @click='next2()'>下一步</a></p>
      </div>
      <div v-show='newSite3' class='newSite'>
          <p style='height:50px;line-height:50px;padding-left:20px;'><span>{{b3}}</span><i @click='close()' class='clo'></i></p>
           <p><span class='line cd back'><em class='num num1'>1</em>公司信息</span><span class='line cd back'><em class='num num1'>2</em>站点信息</span><span class='line cd back'><em class='num num1'>3</em>功能开关</span><span class='line gray'><em class='num num1'>4</em>账户配置</span></p>
          <P><label for="">用户名</label><input type="text" v-model='account_conf.user_name' v-bind:disabled='adisabl'><em class='ii'>*</em></P>
          <p><label for="">设置密码</label><input type="text" v-model='account_conf.set_pwd' maxlength="16" v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p><label for="">确认密码</label><input type="text" v-model='account_conf.sure_pwd' maxlength="16" v-bind:disabled='adisabl'><em class='ii'>*</em></p>
          <p class='bao' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='next1()'>上一步</a><a href="javascript:void(0)" class='qub' @click='chbao(pid)'>提交</a></p>
      </div>
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex' class='pagg'></pagination>
      <div v-show='tip' class='tip'>
          <div v-show="insert">带<em class='ii'>*</em>为必填</div><div v-show="individual"><span>{{errorMessage}}</span></div>
          <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div>
      <div class="migrate" v-show="migrateShow">
          <div class="describe">
              <span class="title">提示</span><i class="close" @click="cancelRemov"></i>
          </div>
          <div class="fillContent">
              <div class="tradeContent" style="margin-bottom:12px;">
                  <span>当前节点为{{presentGrid}}，请选择将要迁移到的节点</span>
                  <select name="" id="">
                      <option value=""></option>
                  </select>
              </div>
          </div>
          
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click="cancelRemov">取消</a>
              <a href="javascript:void(0)" class="save" @click="submitRemov">提交</a>
          </div>
      </div>
      <div class="deriveInfo" v-show="exportShow"><!--导出站点的弹窗-->
        <div class="describe">
              <span class="title">导出</span><i class="close" @click="cancelExport"></i>
          </div>
          <div class="fillContent">
              <div class="tradeContent" style="margin-bottom:12px;">
                <p>
                  <label>行业</label>
                  <el-select size="small" clearable v-model="exportData.industry" placeholder="请选择">
                    <el-option
                      v-for="item in industryList"
                      :key="item.grid_name"
                      :label="item.industry"
                      :value="item.industry">
                    </el-option>
                  </el-select>
                </p>
                <p>
                  <label>节点</label>
                  <el-select size="small" clearable v-model="exportData.node" placeholder="请选择">
                    <el-option
                      v-for="item in exportNode"
                      :key="item.grid_name"
                      :label="item.grid_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </p>
                <div class="explainExport">
                  <p>导出规则：</p>
                  <p>1.可根据行业导出</p>
                  <p>2.可根据节点导出</p>
                  <p>3.默认全部导出</p>
                  <p>4.可根据所需进行导出字段选择</p>
                </div>
                <div class="exportField">
                  <div class="titleExport">导出字段</div>
                  <div class="checkField">
                    <el-checkbox-group v-model="exportData.checkField">
                      <el-checkbox v-for="item in fieldList" v-if="item.name" :key="item.name" :label="item.name">{{item.field}}</el-checkbox>
                    </el-checkbox-group>
                    <!-- <span class="checkField"> -->
                    <!-- <el-checkbox>开站日期</el-checkbox><el-checkbox>开站日期</el-checkbox> -->
                      <!-- <input type="checkbox" /><label for="">开站日期</label> -->
                  <!-- </span> -->
                  </div>
                </div>
              </div>
          </div>
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click="cancelExport">取消</a>
              <a href="javascript:void(0)" class="save" @click="submitExport">提交</a>
          </div>
      </div>
      <div class="migrate" v-show="copySite">
        <div class="describe">
              <span class="title">复制站点</span><i class="close" @click="cancelCopy"></i>
          </div>
          <div class="fillContent">
              <div class="tradeContent" style="margin-bottom:12px;">
                  <p class="chooseNape">
                    <label>企业ID</label>
                    <input type="text" v-model="copyData.companyId" />
                  </p>
                  <p class="chooseNape">
                    <label>节点选择</label>
                    <el-select size="small" v-model="copyData.node" placeholder="请选择节点">
                      <el-option
                        v-for="item in nodeList"
                        :key="item.grid_name"
                        :label="item.grid_name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </p>
              </div>
          </div>
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click="cancelCopy">取消</a>
              <a href="javascript:void(0)" class="save" @click="submitCopy">提交</a>
          </div>
      </div>
      <!--router-link to="/openstationf">Go to First</router-link>
      <router-link to="/openstations">Go to second</router-link>
      <router-link to="/openstationt">Go to third</router-link>
      <router-link to="/openstationfr">Go to Four</router-link-->
    </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
import Shade from "./shade";
import Datee from "./date";
import axioIn from "../store/axioIn";
import Pagination from "./pagination";
import Router from "../router/index";
export default {
    name:'gong',
    components:{Shade,Pagination,Datee},
    data:function(){
        return {
            mess:{company_name:'',station_type:'',deploy_way:'',cli_version:'',company_id:'',grid_name: '',industry: ''},
            b3:'',
            ite1:'',
            ite2:'',
            ite3:[],
            ite4:[],
            ite5:'',
            ite6:[],
            date_s:false,
            img:require('../assets/clo.png'),
            adisabl:false,
            adisab2:false,
            //checkes:'',
            newSite:false,
            newSite1:false,
            newSite2:false,
            newSite3:false,
            bb:[{id:22,ser_id:33,station_info:{open_station_time:'',close_station_time:''}}],
            company_info:{station_type:'',company_name:'',abbreviation:'',company_url:[{company_url:'',ac:true,a2:false}],company_address:{province:'',city:'',detail:''},company_email:'',industry:'',GSZZ:'',customer_type:'',service_area:''},
            link_info:[{linkman:'',link_phone:'',link_email:'',link_qq:''}],
            station_info:{company_id:'1',classify:'',deploy_way:'2',validity_days:'2',grid:'',cli_version:'',pact_products:[],open_station_time:'2017-09-09',close_station_time:'2',sales:'2',pre_sales:'2',oper_cslt:'2',impl_cslt:'2',oper_supt:'2',station_open: '2017'},
            func_list:[],
            func_list1:[],
            account_conf:{user_name:'',set_pwd:'',sure_pwd:''},
            shad:false,
            shad1:false,
            tip:false,
            insert: true,
            individual: false,
            functions:[{ac:'0'}],
            funcs:['2','3'],
            page:'',
            popp:'',
            pageIndex:1,
            pid:'',
            search_val:'',
            func_list2:'',
            search_open:'',
            errorMessage: '',
            rowNum: '',
            uuidCode: '',
            isfor: false,
            all_option: false,
            caption: [{name: '客户名称',checked: true,disabled: false},{name: '企业ID',checked: true,disabled: false},{name: '开站时间',checked: true,disabled: false},{name: '到期日期',checked: true,disabled: false},{name: '行业',checked: false,disabled: false},{name: '产品分类',checked: false,disabled: false},{name: '部署方式',checked: true,disabled: false},{name: '客户版本',checked: false,disabled: false},{name: '站点类型',checked: true,disabled: false},{name: '节点',checked: true,disabled: false},{name: '信息来源',checked: false,disabled: false},{name: '反向同步',checked: false,disabled: false},{name: '状态',checked: true,disabled: false}],
            migrateShow: false,
            presentGrid: '',
            upIsActive: false,
            downActive: false,
            upCloseActive: false,
            downCloseActive: false,
            orderUrl: '',
            isOrderBy: false,
            toggleOrder1: false,
            toggleOrder2: false,
            exportShow: false,//导出的弹窗
            copySite: false,//复制站点弹窗
            copyData: {companyId: '',node: ''},
            nodeList: [],
            station: {id: '',classify: ''},
            industryList: [],
            exportNode: [],
            fieldList: [],
            exportData: {industry: '',node: '',checkField: []}
        }
  },
  created: function() {
    window.sessionStorage.removeItem('stationType');window.sessionStorage.removeItem('productStart');
    this.$checkCookie();
    if (!this.$route.query.flag) {
      this.$store.state.saveInfo = null;
    }
    if (this.$store.state.saveInfo) {//保留页数
      this.pageIndex = this.$store.state.saveInfo.page;
      this.mess = this.$store.state.saveInfo.sear;
      axioIn
        .get("/api/workorder/openstation/?page=" + this.pageIndex, {
          params: this.mess
        })
        .then(res => {
          if (res.data.length == 0) {
            alert("未搜到相关信息");
          } else {
            this.popp = this.bb = res.data.results;
            this.page = res.data.page_num.total_page; //console.log(this.page)
            this.rowNum = res.data.page_num.total_count;
            this.search_open = true;
            this.transform(this.bb);
          }
        })
        .catch(err => console.log(err));
    } else {
      axioIn.get("/api/workorder/openstation/").then(res => {
        /*console.log(res);*/
        this.popp = this.bb = res.data.results;
        this.page = res.data.page_num.total_page;
        this.rowNum = res.data.page_num.total_count;
        this.pageIndex = 1;
        this.search_open = false;
        this.transform(this.bb);
      });
    }

    axioIn
      .get("/api/workorder/industry/") //所属行业ite1
      .then(res => {
        /*console.log(res.data);*/ this.ite1 = res.data.map(n => n.industry);
      });
    axioIn.get("/api/workorder/areainfo/?level=1").then(res => {
      this.ite2 = res.data;
    }); // 公司地址ite2

    axioIn.get("/api/product/product/foropen/").then(res => {
      this.ite5 = res.data.map(n => n.product); // 合同产品
      //console.log(this.ite5)
    });
    this.$store.commit("empty");
    if(window.sessionStorage.getItem('saveField')){
      this.caption = JSON.parse(window.sessionStorage.getItem('saveField'));
    }
    // if (this.$store.state.fileld.length !== 0) {
    //   this.caption = this.$store.state.fileld;
    // }
    // TODO: 初始化caption的数据
    this.caption.map(n => {
      // n.checked = true;
      if (n.name === "企业ID" || n.name === "客户名称") {
        n.disabled = true;
      } else {
        n.disabled = false;
      }
    });
    setTimeout(()=>{
      this.$store.commit('setLoading', false)
    },1000)
  },
  watch: {
    change_num(newValue, oldValue) {
      newValue = newValue.replace(/[^\d.]/g, "");
    },
  },
  computed: {
    change_num(a) {
      return a;
    }
  },
  methods:{
      renderOpentime(h, {column,$index,store,_self}) {
        return h('div', [
          h('span',{
            on: {
              click (e) {
                _self.orderBy('open_station_time',_self.toggleOrder1)
              }
            }
          },column.label),
          h('span',{
            'class': {sortBy:true}
          },[
            h('div', [
              h('p',
                {
                  'class': {
                    upActive: this.upIsActive,
                    unUpActive: !this.upIsActive
                  }
              }),
              h('p',
                {
                  'class': {
                    downActive: this.downActive,
                    unDownActive: !this.downActive
                  }
              })
            ]),
          ])  
        ]);
      },
      renderClosetime(h, {column,$index,store,_self}) {
        return h('div', [
          h('span',{
            on: {
              click (e) {
                _self.orderBy('close_station_time',_self.toggleOrder2)
              }
            }
          },column.label),
          h('span',{
            'class': {sortBy:true}
          },[
            h('div', [
              h('p',
                {
                  'class': {
                    upActive: this.upCloseActive,
                    unUpActive: !this.upCloseActive
                  }
              }),
              h('p',
                {
                  'class': {
                    downActive: this.downCloseActive,
                    unDownActive: !this.downCloseActive
                  }
              })
            ]),
          ])  
        ]);
      },
      subSite (id,company) {
        var obj = {};
        obj.page = this.pageIndex;
        obj.sear = this.mess;
        this.$store.commit("savePage", obj);
        Router.push({path: '/subStation',query: {id: id,companyID: company}})
      },
      handleClick (a,b,c) {
        
      },
      cancelExport () {//导出弹窗的关闭
        this.exportShow = false;this.shad = false;
      },
      submitExport () {//导出弹窗的提交
        let str = '',fieStr = '';
        if(this.exportData.industry !== ''){str = '?industry=' + this.exportData.industry}
        if(this.exportData.node !== ''){if(str !== ''){str += '&grid='+this.exportData.node}else{str = '?grid='+this.exportData.node}}
        if(this.exportData.checkField !== []){
          if(str !== ''){
            this.exportData.checkField.map(n=>{
              str += '&filter='+n
            })
          }else{
            str += '?'
            this.exportData.checkField.map((n,i)=>{
              if(i === this.exportData.checkField.length-1){
                str += 'filter='+n
              }else{
                str += 'filter='+n+'&'
              }
            })
          }
        }
        window.open('/api/workorder/openstation/get_station_info/'+str);
      },
      copyStation (id,type) {//复制站点弹窗显示
        this.station = {id: '',classify: ''};
        this.station.classify = type === '经典版'? '1' : '2';
        this.shad = true; this.copySite = true;this.station.id = id;
        this.copyData = {companyId: '',node: ''};
        axioIn.get('api/product/grid/foropen/?version_type='+this.station.classify).then(res=>{
          this.nodeList = res.data;
        })
      },
      cancelCopy () {
        this.shad = false;this.copySite = false;this.station = {id: '',classify: ''};
      },
      submitCopy () {
        var regkf = /^kf_\d{1,}$/g;
        var regaz = /^[A-Za-z]{1,}_1000$/g;
        if(this.copyData.companyId === '' || this.copyData.node === ''){
          this.$message.error('请填写完整');
        }else{
          var aip = regaz.test(this.copyData.companyId);
          var aio = regkf.test(this.copyData.companyId);
          var company = aio || aip;
          if(company){
            axioIn.get('/api/workorder/openstation/verify_company_id/?company_id='+this.copyData.companyId+'&grid_id='+this.copyData.node+'&version='+this.station.classify).then(res=>{
              axioIn.get('/api/workorder/openstation/copy_open/?id='+this.station.id+'&grid='+this.copyData.node+'&company_id='+this.copyData.companyId).then(res=>{
                this.shad = false;this.copySite = false;
                this.$message({
                  message: '复制站点成功',
                  type: 'success'
                });
              })
            }).catch(error=>{
              this.$notify.error({
                title: '错误',
                message: error.error || '出错了'
              });
            })
          }else{
            this.$message.error('企业id只能为kf_加数据或者字母_1000');
          }
        }
      },
      reverseStep (companyId) { // 反向同步
        this.$confirm('此操作将进行反向同步, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axioIn.get(`/api/workorder/update_site/?site_id=${companyId}`).then(res=>{
            this.$message({
              type: 'success',
              message: '反向同步成功!'
            });
          }).catch(err=>{
            if(err.status == 500){
              this.$notify.error({
                title: '错误',
                message: '数据错误，请联系管理员'
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      },  
      cancelRemov () {
        this.shad = false;this.migrateShow = false;this.presentGrid = '';
      },
      submitRemov () {
        axioIn.get('').then(res=>{
            this.shad = false;this.migrateShow = false;this.presentGrid = '';
            axioIn.get('/api/workorder/openstation/?page='+this.pageIndex,{params: this.mess})
            .then((res) => {
                if(res.data.length==0){alert('未搜到相关信息')}
                 else{
                     this.popp=this.bb=res.data.results;
                     this.page=res.data.page_num.total_page;//console.log(this.page)
                     this.rowNum = res.data.page_num.total_count;
                     this.search_open=true;
                     this.transform(this.bb);
                 }
                }).catch((err)=>console.log(err))
        })
      },
      turnRemoval (grid) {//一键迁移的点击事件
        this.shad = true;this.migrateShow = true;
        if(grid){
            this.presentGrid = grid;
        }
      },
      allChoice: function(){
          this.all_option = false;
      },
      choose_field: function(){
          this.all_option = true;
      },
    //   pitchOn: function(index){//控制最多显示多少个字段的
    //     var _this = this
    //     setTimeout(function(){
    //         let num = _this.caption.filter(_this.filterNum)
    //         if(num.length>10){
    //             _this.caption[index].checked = false
    //             // alert('最多只能显示12个字段')
    //             _this.individual = true;_this.insert=false;_this.tip = true;_this.shad1 = true;_this.errorMessage = '最多只能显示12个字段'
    //         }
    //     },0)
    //   },
    filterNum: function(value) {
      return value.checked === true;
    },
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return uuid;
    },
    // 状态按钮
    qie: function(index, id,c) {
      if (this.isfor === true) return;
      let aa = confirm("确认修改状态？"); //console.log(aa)
      if (aa === true && this.isfor === false) {
        this.isfor = true;
        //this.$set(this.bb[index],'online_status',!this.bb[index].online_status);
        axioIn
          .put("api/workorder/openstation/" + id + "/modify_status/", {
            online_status: !this.bb[index].online_status
          })
          .then(res => {
            alert("修改成功");
            this.isfor = false;
            this.$set(
              this.bb[index],
              "online_status",
              !this.bb[index].online_status
            );
            //   this.isfor = false
          })
          .catch(err => {
            //console.log(err.response.data.error);//console.log(err.error)
            this.isfor = false;
            alert(err.data.error);
          });
      }
    },
    // 搜索按钮
    search: function() {
      var aa = "";
      var aac = ["", "标准版", "公有云", "专属云", "私有云"];
      var aab = [
        "",
        "试用客户",
        "正式客户",
        "市场渠道客户",
        "商务渠道客户",
        "自用站点"
      ];
      var aad = ["", "B2B", "B2C"];
      for (let i in this.mess) {
        if (this.mess[i] !== "" && this.mess[i] !== undefined) {
          if (aa.length === 0) {
            aa = i + "=" + this.mess[i];
          } else {
            aa = aa + "&" + i + "=" + this.mess[i];
          }
        }
      }
      this.search_val = aa;
      axioIn
        .get("/api/workorder/openstation/?" + aa)
        .then(res => {
          if (res.data.length == 0) {
            alert("未搜到相关信息");
          } else {
            this.popp = this.bb = res.data.results;
            this.page = res.data.page_num.total_page; //console.log(this.page)
            this.rowNum = res.data.page_num.total_count;
            this.search_open = true;
            this.transform(this.bb);
            if(this.bb.length == 0){
              this.upIsActive =  false;
              this.downActive = false;
              this.upCloseActive =  false;
              this.downCloseActive = false
            }
          }
        })
        .catch(err => console.log(err));
    },
    // 提示
    buttonMessage(data, types, time) {
        this.$notify({
            title: '提示',
            message: data,
            position: 'top-right',
            type: types,
            duration: time,
        });
    },
    // 导出
    expor(){
      this.exportData = {industry: '',node: '',checkField: []};
      this.exportShow = true;this.shad = true;
      axioIn.get('/api/workorder/industry/').then(res=>{
        this.industryList = res.data;
      })
      axioIn.get('api/product/grid/foropen/').then(res=>{
        this.exportNode = res.data;
      })
      axioIn.get('/api/workorder/openstation/derived_field/').then(res=>{
        this.fieldList = res.data;
      })
      // window.open('/api/workorder/openstation/get_station_info/','_self');
    },
    // 导入
    uploadFile: function () { 
      this.imFile.click()
    },
    importFile: function () { // 导入excel
          let obj = this.imFile
          if (!obj.files) {
            return
          }
          var f = obj.files[0]
          var reader = new FileReader()
          let $t = this
          reader.onload = function (e) {
            var data = e.target.result
            if ($t.rABS) {
              $t.wb = XLSX.read(btoa(this.fixdata(data)), {  // 手动转化
                type: 'base64'
              })
            } else {
              $t.wb = XLSX.read(data, {
                type: 'binary'
              })
            }
            let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]])
            $t.dealFile($t.analyzeData(json)) // analyzeData: 解析导入数据
          }
          if (this.rABS) {
            reader.readAsArrayBuffer(f)
          } else {
            reader.readAsBinaryString(f)
          }
    },
    analyzeData: function (data) {  // 此处可以解析导入数据
      return data
    },
    dealFile: function (data) {   // 处理导入的数据
      this.imFile.value = ''
      if (data.length <= 0) {
         this.buttonMessage('请导入正确信息','warning',1500);
      } else {
        //  axioIn.get('/api/workorder/syn_industry',{params: data}).
        axioIn.post('/api/workorder/syn_industry/', data).then((res)=>{
          console.log(res)
        })
      }
    },
    fixdata: function (data) {  // 文件流转BinaryString
        var o = ''
        var l = 0
        var w = 10240
        for (; l < data.byteLength / w; ++l) {
          o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        }
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
    },
    // 排序
    orderBy(type,value){
      if(this.bb.length == 0){
        return false
      }else{
        this.isOrderBy = true;
        if(type === 'open_station_time'){
            this.upCloseActive = this.downCloseActive = this.toggleOrder2 = false;
            this.toggleOrder1 = !this.toggleOrder1;
          if(value){
            this.downActive = true;
            this.upIsActive = false;
          }else{
            this.upIsActive = true;
            this.downActive = false;
          }
          this.orderUrl = '/api/workorder/openstation/?open_station_time=' + Number(this.upIsActive) + '&close_station_time=' + Number(this.upCloseActive);
        }else{
            this.upIsActive = this.downActive = this.toggleOrder1 = false;
            this.toggleOrder2 = !this.toggleOrder2;
          if(value){   
            this.upCloseActive = false;
            this.downCloseActive = true;
          }else{
            this.downCloseActive = false;
            this.upCloseActive = true;
          }
          this.orderUrl = '/api/workorder/openstation/?close_station_time=' + Number(this.upCloseActive);
        }
        axioIn.get(this.orderUrl)
        .then( res => {
            if (res.data.length == 0) {
              alert("未搜到相关信息");
            } else {
              this.popp = this.bb = res.data.results;
              this.page = res.data.page_num.total_page;
              this.rowNum = res.data.page_num.total_count;
              this.search_open = true;
              this.transform(this.bb);
            }
        })
        .catch(err => console.log(err)); 
      }
    },

    // 新增联系人
    clo: function() {
      if (this.b3 === "查看") {
        return;
      } else {
        this.link_info.push({
          linkman: "",
          link_phone: "",
          link_email: "",
          link_qq: ""
        });
      }
    },
    // 联系人后的删除按钮
    dele_ser: function(id) {
      if (confirm("确定要删除吗？")) this.link_info.splice(id, 1);
    },
    // 增加/删除网址按钮
    ad_url: function() {
      if (this.b3 === "查看") {
        return;
      } else {
        this.company_info.company_url.push({ ac: false, a2: true });
      }
    },
    de_url: function(id) {
      if (this.b3 === "查看") {
        return;
      } else {
        if (confirm("确定要删除吗？"))
          this.company_info.company_url.splice(id, 1);
      }
    },
    //新增按钮
    add: function() {
      // this.$store.commit("getFileld", this.caption);
      this.uuidCode = this.uuid();
      var time =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      //this.shad=true;this.newSite=true;this.newSite1=false;this.newSite2=false;this.newSite3=false;this.b3='新增';this.adisabl=false;
      this.adisab2 = false;
      this.func_list2 = [];
      this.company_info = {
        station_type: "",
        company_name: "",
        abbreviation: "",
        company_url: [{ company_url: "", ac: true, a2: false }],
        company_address: { province: "", city: "", detail: "" },
        company_email: "",
        industry: "",
        GSZZ: "",
        customer_type: "",
        service_area: ""
      };
      this.link_info = [
        { linkman: "", link_phone: "", link_email: "", link_qq: "" }
      ];
      this.station_info = {
        company_id: "",
        deploy_way: "",
        validity_days: "",
        grid: "",
        cli_version: "",
        pact_products: [],
        open_station_time: "",
        close_station_time: "",
        sales: "",
        pre_sales: "",
        oper_cslt: "",
        impl_cslt: "",
        oper_supt: ""
      };
      this.account_conf = { user_name: "", set_pwd: "", sure_pwd: "" };
      this.station_info.open_station_time = time;
      Router.push({ path: "/openstationf" });
    },
    //站点信息处的上一步
    add1: function() {
      this.shad = true;
      this.newSite = true;
      this.newSite1 = false;
      this.newSite2 = false;
      this.newSite3 = false;
      this.b3 = this.b3 === "" ? "新增" : this.b3;
      this.adisabl = false;
      //this.company_info={station_type:'',company_name:'',company_url:[{company_url:'',ac:true,a2:false}],company_address:{province:'',city:'',detail:''},company_email:'',industry:'',GSZZ:'',customer_type:'',service_area:''};
      //this.link_info=[{linkman:'',link_phone:'',link_email:'',link_qq:''}];
      //this.station_info={company_id:'',deploy_way:'',validity_days:'',grid:'',cli_version:'',pact_products:[],open_station_time:'',close_station_time:'',sales:'',pre_sales:'',oper_cslt:'',impl_cslt:'',oper_supt:''};
      //this.account_conf={user_name:'',set_pwd:'',sure_pwd:''};
    },
    // 重置按钮
    chon: function() {
      this.mess = {
        company_name: "",
        station_type: "",
        deploy_way: "",
        cli_version: ""
      };
      axioIn.get("/api/workorder/openstation/").then(res => {
        this.popp = this.bb = res.data.results;
        this.page = res.data.page_num.total_page;
        this.rowNum = res.data.page_num.total_count;
        this.search_open = false;
        this.transform(this.bb);
        this.pageIndex = 1;
        this.upIsActive = false;
        this.downActive = false;
        this.upCloseActive = false;
        this.downCloseActive =  false
      });
    },
    // 信息的编辑按钮
    bian: async function(id) {
      // this.$store.commit("getFileld", this.caption);
      //   this.caption
      //this.shad=true;this.newSite=true;this.newSite1=false;this.newSite2=false;this.newSite3=false;this.b3='修改';this.adisabl=false;
      var that = this;
      this.adisab2 = true;
      this.func_list2 = [];
      this.company_info = {
        station_type: "",
        company_name: "",
        abbreviation: "",
        company_url: [{ company_url: "", ac: true, a2: false }],
        company_address: { province: "", city: "", detail: "" },
        company_email: "",
        industry: "",
        GSZZ: "",
        customer_type: "",
        service_area: ""
      };
      this.station_info = {
        company_id: "",
        classify: "",
        deploy_way: "",
        validity_days: "",
        grid: "",
        cli_version: "",
        pact_products: [],
        open_station_time: "",
        close_station_time: "",
        sales: "",
        pre_sales: "",
        oper_cslt: "",
        impl_cslt: "",
        oper_supt: ""
      };
      this.account_conf = { user_name: "", set_pwd: "", sure_pwd: "" };
      this.uuidCode = this.uuid();
      var f3 = await axioIn
        .get("/api/workorder/openstation/" + id + "/")
        .then(async function(res) {
          //var lill=res.data.link_info;console.log(lill)
          if (res.data.link_info.length === 0) {
            res.data.link_info = [
              { linkman: "", link_phone: "", link_email: "", link_qq: "" }
            ];
          }
          if (
            res.data.company_info.company_address !== null &&
            res.data.company_info.company_address.province !== ""
          ) {
            var f1 = await axioIn
              .get(
                "/api/workorder/areainfo/?province=" +
                  res.data.company_info.company_address.province
              )
              .then(res => {
                that.ite3 = res.data;
              });
          }
          that.pid = res.data.id;
          var f2 = await axioIn
            .get(
              "/api/product/grid/foropen/?is_open=1&deploy_way=" +
                res.data.station_info.deploy_way
            )
            .then(res => {
              that.ite4 = res.data; //that.$store.commit('evaluate6',res.data)
            });
          if (res.data.company_info.company_address === null) {
            res.data.company_info.company_address = {
              province: "",
              city: "",
              detail: ""
            };
          }
          that.$store.commit("evaluate", res.data.company_info);
          that.$store.commit("evaluate1", res.data.link_info); //console.log(JSON.stringify(lill))
          that.$store.commit("evaluate2", res.data.station_info);
          that.$store.commit("evaluate4", res.data.account_conf);
          that.$store.commit("evaluate6", res.data.func_list);
          [that.link_info, that.company_info, that.account_conf] = [
            res.data.link_info,
            res.data.company_info,
            res.data.account_conf[0]
          ];
          if (that.company_info.company_url.length !== 0) {
            that.company_info.company_url.map(n => {
              n.ac = false;
              n.a2 = true;
            });
            that.company_info.company_url[0].ac = true;
            that.company_info.company_url[0].a2 = false;
          } else {
            that.company_info.company_url = [
              { company_url: "", ac: true, a2: false }
            ];
          }
          that.account_conf.sure_pwd = that.account_conf.set_pwd;
          that.company_info.customer_type =
            res.data.company_info.customer_type === false ? "0" : "1";
          that.func_list = res.data.func_list;
        });
      //this.selectVal();
      var obj = {};
      obj.page = this.pageIndex;
      obj.sear = this.mess;
      this.$store.commit("savePage", obj);
      window.sessionStorage.removeItem('stationType');
      Router.push({ path: "/openstationf", query: { id: id } });
    },
    // 查看按钮
    cha: function(id) {
      this.shad = true;
      this.newSite = true;
      this.newSite1 = false;
      this.newSite2 = false;
      this.newSite3 = false;
      this.b3 = "查看";
      this.adisabl = true;
      var that = this;
      this.adisab2 = true;
      this.func_list2 = [];
      this.uuidCode = this.uuid();
      this.company_info = {
        station_type: "",
        company_name: "",
        abbreviation: "",
        company_url: [{ company_url: "", ac: true, a2: false }],
        company_address: { province: "", city: "", detail: "" },
        company_email: "",
        industry: "",
        GSZZ: "",
        customer_type: "",
        service_area: ""
      };
      this.link_info = [
        { linkman: "", link_phone: "", link_email: "", link_qq: "" }
      ];
      this.station_info = {
        company_id: "",
        deploy_way: "",
        validity_days: "",
        grid: "",
        cli_version: "",
        pact_products: [],
        open_station_time: "",
        close_station_time: "",
        sales: "",
        pre_sales: "",
        oper_cslt: "",
        impl_cslt: "",
        oper_supt: ""
      };
      this.account_conf = { user_name: "", set_pwd: "", sure_pwd: "" };
      axioIn
        .get("/api/workorder/openstation/" + id + "/")
        .then(async function(res) {
          //console.log(res);
          if (
            res.data.company_info.company_address !== null &&
            res.data.company_info.company_address.province !== ""
          ) {
            var f1 = await axioIn
              .get(
                "/api/workorder/areainfo/?province=" +
                  res.data.company_info.company_address.province
              )
              .then(res => {
                that.ite3 = res.data;
              });
          }
          //console.log(that.ite3);
          var f2 = await axioIn
            .get(
              "/api/product/grid/foropen/?is_open=1&deploy_way=" +
                res.data.station_info.deploy_way
            )
            .then(res => {
              that.ite4 = res.data;
            });
          that.pid = res.data.id;
          if (res.data.company_info.company_address === null) {
            res.data.company_info.company_address = {
              province: "",
              city: "",
              detail: ""
            };
          }
          [that.link_info, that.company_info, that.account_conf] = [
            res.data.link_info,
            res.data.company_info,
            res.data.account_conf[0]
          ];
          if (that.company_info.company_url.length !== 0) {
            that.company_info.company_url.map(n => {
              n.ac = false;
              n.a2 = true;
            });
            that.company_info.company_url[0].ac = true;
            that.company_info.company_url[0].a2 = false;
          } else {
            that.company_info.company_url = [
              { company_url: "", ac: true, a2: false }
            ];
          }
          that.account_conf.sure_pwd = that.account_conf.set_pwd;
          that.company_info.customer_type =
            res.data.company_info.customer_type === false ? "0" : "1"; //console.log(that.company_info.customer_type);
          //that.account_conf=res.data.account_conf[0];
          that.func_list = res.data.func_list;
        });
      //this.selectVal();
    },
    // 公司信息的下一步和功能开关的下一步
    next: function() {
      let aa = false;
      this.insert = true;
      this.individual = false;
      // 验证
      var reg = /[\u4e00-\u9fa5]+/g;
      var companyUrl = this.company_info.company_url.map(n => n.company_url);
      let tt = companyUrl.join(" ");
      if (reg.test(tt)) {
        this.errorMessage = "网址中不能有中文";
        this.insert = false;
        this.individual = true;
        aa = true;
      }
      // 验证QQ号
      var numReg = /^\d+$/;
      //   var reg = /[^\u4e00-\u9fa5]+/g
      var a = this.link_info;
      var qqNum = this.link_info.map(n => n.link_qq);
      var qqNumStr = Number(qqNum.join(""));
      var phone = this.link_info.map(n => n.link_phone);
      var phoneStr = Number(phone.join(""));
      if (!numReg.test(qqNumStr) || !numReg.test(phoneStr)) {
        this.errorMessage = "QQ号或电话只能填数字";
        this.insert = false;
        this.individual = true;
        aa = true;
      }
      for (let i in this.company_info) {
        if (this.company_info[i] === "" || this.company_info[i] === undefined) {
          aa = true;
          this.insert = true;
          this.individual = false;
        }
      }
      this.company_info.company_url.map(v => {
        if (v.company_url === "" || v.company_url === undefined) {
          aa = true;
          this.insert = true;
          this.individual = false;
        }
      });
      //for(let i in this.company_info.company_url){if(this.company_info.company_url.company_url===''||this.company_info.company_url.company_url===undefined){aa=true;}}
      for (let i in this.company_info.company_address) {
        if (
          this.company_info.company_address[i] === "" ||
          this.company_info.company_address[i] === undefined
        ) {
          aa = true;
          this.insert = true;
          this.individual = false;
        }
      }
      this.link_info.map(n => {
        for (let i in n) {
          if (n[i] === "" || n[i] === undefined) {
            aa = true;
            this.insert = true;
            this.individual = false;
          }
        }
      });
      //console.log(JSON.stringify(this.company_info))
      if (aa === false) {
        this.shad = true;
        this.newSite = false;
        this.newSite1 = true;
        this.newSite2 = false;
        this.newSite3 = false;
      } else {
        this.shad1 = true;
        this.tip = true;
      }
    },
    // 站点信息的下一步和账户配置的上一步
    next1: async function() {
      //console.log(this.station_info.grid)
      var aa = false;
      var bb = false;
      this.insert = true;
      this.individual = false;
      var ece;
      this.ite4.map(n => {
        if (n.grid_name === this.station_info.grid) {
          ece = n.id;
        }
      });
      if (this.b3 === "新增") {
        var regkf = /^kf_\d{1,}$/g;
        var regaz = /^[A-Za-z]{1,}_1000$/g;
        var aip = regaz.test(this.station_info.company_id);
        var aio = regkf.test(this.station_info.company_id);
        var kf = aio && !(this.station_info.cli_version == 2);
        var other = aip && !(this.station_info.cli_version == 1);
        var company = aio || aip;
        //console.log(aio,aip,company)
        //   var other = regaz.test(this.station_info.company_id);
        if (this.station_info.company_id === "" || ece === undefined) {
          alert("企业id和节点不可为空");
        } else if (!company) {
          alert("企业id只能为kf_加数据或者字母_1000");
          return;
        } else {
          const aia = await axioIn
            .get(
              "/api/workorder/openstation/verify_company_id/?company_id=" +
                this.station_info.company_id +
                "&grid_id=" +
                ece
            )
            .then(res => {})
            .catch(error => {
              alert(error.data.error);
              bb = true;
            });
        }
        if (bb === true) {
          return;
        }
      }
      var indate = /^\d+$/g;
      if (
        !indate.test(this.station_info.validity_days) ||
        this.station_info.validity_days < 0 ||
        this.station_info.validity_days === 0
      ) {
        this.errorMessage = "有效期填写正确格式";
        this.insert = false;
        this.individual = true;
        aa = true;
      } else {
        this.errorMessage = "";
        this.insert = true;
        this.individual = false;
        aa = false;
      }
      var regkf = /^kf_\d+$/g;
      var regaz = /^[A-Za-z]+_1000$/g;
      var kf =
        regkf.test(this.station_info.company_id) &&
        !(this.station_info.cli_version == 2);
      var other =
        regaz.test(this.station_info.company_id) &&
        !(this.station_info.cli_version == 1);
      if (kf || other) {
        this.errorMessage = "客户版本错误";
        this.insert = false;
        this.individual = true;
        aa = true;
      } else {
        this.errorMessage = "";
        this.insert = true;
        this.individual = false;
        aa = false;
      }
      for (let i in this.station_info) {
        if (i !== "pre_sales" && i !== "oper_cslt") {
          if (
            this.station_info[i] === "" ||
            this.station_info[i] === undefined
          ) {
            aa = true;
            this.insert = true;
            this.individual = false;
          }
        }
      }
      if (this.station_info.pact_products.length === 0) {
        aa = true;
        this.insert = true;
        this.individual = false;
      }
      //console.log(JSON.stringify(this.func_list1))
      if (aa === false) {
        this.shad = true;
        this.newSite = false;
        this.newSite1 = false;
        this.newSite2 = true;
        this.newSite3 = false;
        let aa = "";
        aa =
          "grid=" +
          this.station_info.grid +
          "&cli_version=" +
          this.station_info.cli_version;
        this.station_info.pact_products.map(n => {
          aa = aa + "&product=" + n;
        });
        //console.log(this.station_info.pact_products)
        //aa.push({grid:this.station_info.grid});console.log(JSON.stringify(aa))
        //console.log(aa)
        axioIn
          .get("/api/product/version/foropen/?" + aa, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
          })
          .then(res => {
            this.ite6 = res.data;
            this.ite6.map((n, index) => {
              n.function.map((v, index2) => {
                if (v.func_type === "单选框") {
                  this.$set(
                    this.ite6[index].function[index2],
                    "func_value",
                    ""
                  );
                  v.selection.map(z => {
                    if (z.is_default === true) {
                      v.func_value = z.id;
                    }
                  });
                } else {
                  this.$set(this.ite6[index].function[index2], "func_valu", "");
                }
                //console.log(JSON.stringify(this.ite6))
                //else{v.func_valu=''}
              });
            });
            //console.log(this.b3)
            if (this.b3 !== "新增") {
              this.ite6.map(n => {
                n.function.map(v => {
                  this.func_list.map(c => {
                    if (c.function === v.id) {
                      if (v.func_type === "单选框") {
                        v.func_value = c.id;
                      } else {
                        v.func_valu = c.select_name;
                      }
                    }
                  });
                });
              });
            }
            if (this.func_list2.length !== 0) {
              this.ite6.map(n => {
                this.func_list2.map(c => {
                  if (n.product === c.product) {
                    n.function.map(v => {
                      c.id.map(e => {
                        if (v.id === e.id) {
                          v.func_value = e.value;
                        }
                      });
                      c.ipu.map(e => {
                        if (v.id === e.id) {
                          v.func_valu = e.value;
                        }
                      });
                    });
                  }
                });
              });
            }
          });
      } else {
        this.shad1 = true;
        this.tip = true;
      }
    },
    // 功能开关的下一步
    next2: function() {
      var aa = false;
      this.insert = true;
      this.individual = false; //console.log(JSON.stringify(this.ite6))
      this.ite6.map(n => {
        n.function.map(v => {
          if (v.func_value === "" || v.func_valu === "") {
            aa = true;
          }
        });
      });
      if (aa === true) {
        this.shad1 = true;
        this.tip = true; /*console.log(JSON.stringify(this.ite6))/*/
      } else {
        this.shad = true;
        this.newSite = false;
        this.newSite1 = false;
        this.newSite2 = false;
        this.newSite3 = true;
        let aa = [];
        let bb = [];
        this.ite6.map(n => {
          //吧func_list转换成{"product":"prod_6","id":[45],"ipu":[]}
          n.value = [];
          n.valu = [];
          n.value2 = [];
          n.function.map(v => {
            if (v.func_value != undefined) {
              n.value2.push({ value: v.func_value, id: v.id });
            }
          });
          n.function.map(v => {
            if (v.func_value != undefined) {
              n.value.push(v.func_value);
            }
          });
          n.function.map(v => {
            if (v.func_valu !== undefined) {
              n.valu.push({ value: v.func_valu, id: v.id });
            }
          });
          aa.push({ product: n.product, id: n.value, ipu: n.valu });
          bb.push({ product: n.product, id: n.value2, ipu: n.valu });
        });
        this.func_list1 = aa;
        this.func_list2 = bb;
        //console.log(JSON.stringify(this.func_list1));
      }
    },
    // 四步的关闭按钮以及第一步的取消
    close: function() {
      this.shad = false;
      this.newSite = false;
      this.newSite1 = false;
      this.newSite2 = false;
      this.newSite3 = false;
      this.ite6 = [];
    },
    //提示框处的确定按钮
    tipp: function() {
      this.shad1 = false;
      this.tip = false;
    },
    // 有效期至的失焦blur事件
    figure: function() {
      if (
        this.station_info.open_station_time === "" ||
        this.station_info.open_station_time == undefined ||
        this.station_info.close_station_time == "" ||
        this.station_info.close_station_time == undefined
      ) {
        return;
      } else {
        var split_open = this.station_info.open_station_time.split("-");
        var split_close = this.station_info.close_station_time.split("-");
        var aa = new Date(
          split_open[0],
          split_open[1] - 1,
          split_open[2]
        ).getTime();
        var bb = new Date(
          split_close[0],
          split_close[1] - 1,
          split_close[2]
        ).getTime();
        // if(bb-aa<=0){alert('时间不得少于起始时间')}
        // else{
        var date = (bb - aa) / 1000 / 60 / 60 / 24;
        this.station_info.validity_days = date;
        return false;
        // }
      }
    },
    // 公司地址处省级select框的change事件
    gon_change: function() {
      //console.log(this.company_info.company_address)
      if (this.company_info.company_address.province !== undefined) {
        axioIn
          .get(
            "/api/workorder/areainfo/?province=" +
              this.company_info.company_address.province
          )
          .then(res => {
            this.ite3 = res.data;
          });
      }
    },
    //账户配置处的提交按钮
    chbao: function(id) {
      this.insert = true;
      this.individual = false;
      if (this.account_conf.set_pwd === this.account_conf.sure_pwd) {
        var aa = false;
        for (let i in this.account_conf) {
          if (
            this.account_conf[i] === "" ||
            this.account_conf[i] === undefined ||
            this.account_conf === {}
          ) {
            aa = true;
          }
        }
        var aac = {}; //console.log(aa);
        aac.account_conf = []; //console.log(JSON.stringify(this.account_conf))
        let oo = {};
        Object.assign(oo, this.account_conf);
        aac.account_conf[0] = oo;
        delete aac.account_conf[0].sure_pwd; //console.log(JSON.stringify(aac.account_conf[0]))
        aac.company_info = this.company_info;
        aac.link_info = this.link_info;
        aac.station_info = this.station_info;
        aac.func_list = this.func_list1;
        //[aac.company_info,aac.link_info,aac.station_info,aac.func_list]=[this.company_info,this.link_info,this.station_info,this.func_list1]
        if (aa === true) {
          this.shad1 = true;
          this.tip = true;
        } else {
          if (this.b3 === "新增") {
            //console.log(JSON.stringify(aac));
            axioIn
              .post("/api/workorder/openstation/", aac)
              .then(res => {
                alert("添加成功");
                this.shad = false;
                this.newSite3 = false;
                axioIn.get("/api/workorder/openstation/").then(res => {
                  /*console.log(res);*/
                  this.popp = this.bb = res.data.results;
                  this.page = res.data.page_num.total_page;
                  this.rowNum = res.data.page_num.total_count;
                  this.search_open = false;
                  this.transform(this.bb);
                });
              })
              .catch(err => {
                this.shad = false;
                this.newSite3 = false;
                this.newSite = false;
                this.newSite1 = false;
                this.newSite2 = false;
                alert(err.data.error);
              });
            this.ite6 = [];
          }
          if (this.b3 === "修改") {
            axioIn
              .put("/api/workorder/openstation/" + id + "/", aac)
              .then(res => {
                alert("修改成功");
                this.shad = false;
                this.newSite3 = false;
                if (this.search_open === false) {
                  axioIn
                    .get("/api/workorder/openstation/?page=" + this.pageIndex)
                    .then(res => {
                      this.popp = this.bb = res.data.results;
                      this.page = res.data.page_num.total_page;
                      this.rowNum = res.data.page_num.total_count;
                      //this.pageIndex=q;
                      this.transform(this.bb);
                    });
                } else {
                  axioIn
                    .get(
                      "/api/workorder/openstation/" +
                        this.search_val +
                        "&page=1"
                    )
                    .then(res => {
                      this.popp = this.bb = res.data.results;
                      this.page = res.data.page_num.total_page;
                      this.rowNum = res.data.page_num.total_count;
                      //this.pageIndex=q;
                      this.transform(this.bb);
                    });
                }
              })
              .catch(err => {
                this.shad = false;
                this.newSite3 = false;
                this.newSite = false;
                this.newSite1 = false;
                this.newSite2 = false;
                alert(err.data.error);
              });
            this.ite6 = [];
          }
        }
      } else {
        alert("密码和确认密码不一致");
      }
    },
    incrementTotal: function(q) {
      var url = "";
      if(this.isOrderBy){
        url = this.orderUrl
      }else {
        url = "/api/workorder/openstation/?";
      }
      q = q === undefined ? 1 : q;
      if (this.search_open === false) {
        axioIn.get(url + "page=" + q).then(res => {
          this.popp = this.bb = res.data.results;
          this.page = res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.pageIndex = q;
          this.transform(this.bb);
        });
      } else {
        axioIn
          .get(url + this.search_val + "&page=" + q)
          .then(res => {
            this.popp = this.bb = res.data.results;
            this.page = res.data.page_num.total_page;
            this.rowNum = res.data.page_num.total_count;
            this.pageIndex = q;
            this.transform(this.bb);
          });
      }
    },
    transform: function(data) {
      var aac = ["", "标准版", "公有云", "专属云", "私有云"];
      var aab = [
        "",
        "试用客户",
        "正式客户",
        "市场渠道客户",
        "商务渠道客户",
        "自用站点"
      ];
      var aad = ["", "B2B", "B2C"];
      // var aae=['','重构版','经典版']
      data.map(n => {
        n.open_station_time = n.station_info.open_station_time;
        n.close_station_time = n.station_info.close_station_time;
        n.company_name = n.company_info.company_name;
        n.deploy_way = aac[n.station_info.deploy_way];
        n.cli_version = aad[n.station_info.cli_version];
        n.company_id = n.station_info.company_id;
        n.grid = n.station_info.grid;
        n.station_type = aab[n.company_info.station_type];
        n.industry = n.company_info.industry;
        n.classify_name = n.station_info.classify_name;
        n.order_work = n.station_info.order_work;
      });
    },
    incrementTi: function(p) {
      var split_open = this.station_info.open_station_time.split("-");
      var split_close = p.split("-");
      var aa = new Date(
        split_open[0],
        split_open[1] - 1,
        split_open[2]
      ).getTime();
      var bb = new Date(
        split_close[0],
        split_close[1] - 1,
        split_close[2]
      ).getTime();
      if (bb - aa <= 0) {
        alert("不能选择历史时间");
      } else {
        this.station_info.close_station_time = p;
        this.date_s = false;
      }
    },
    changeField () {
      window.sessionStorage.setItem('saveField',JSON.stringify(this.caption));
    },
    // 有效期至聚焦focus时
    focu: function() {
      this.date_s = true;
    },
    // 有效期至input框处鼠标移开mouseleave
    hidee: function() {
      return false;
    },
    // 日期控件鼠标移开mouseleave
    hide1: function() {
      if (this.figure() === false) {
        this.date_s = false;
      }
    },
    // 删除按钮
    delet: function(id) {
      confirm("确认删除？")
        ? axioIn.delete("/api/workorder/openstation/" + id + "/?its_parent=''").then(res => {
            alert("删除成功");
            this.incrementTotal(this.pageIndex);
          })
        : 0;
    },
    // 站点信息处的部署方式的change事件
    selectVal: function() {
      if (
        this.station_info.deploy_way !== "" &&
        this.station_info.deploy_way !== undefined
      ) {
        axioIn
          .get(
            "/api/product/grid/foropen/?is_open=1&deploy_way=" +
              this.station_info.deploy_way
          )
          .then(res => {
            this.ite4 = res.data;
          });
      }
    }
  },
  mounted() {
    this.imFile = document.getElementById('imFile')
    document.addEventListener('click', (e) => { 
      if (e.target.className == 'field' || 
      e.target.className == 'allChoice' || 
      e.target.className == 'all_check' || 
      e.target.className == 'captions' || 
      e.target.className == '_checkbox' ||
      e.target.className == '_label') {
        this.all_option = true
      }else {
        this.all_option = false
      }
    })
  }
};
</script>

<style lang='scss' scoped>
@import '../assets/home';
.gong{
  width: 100%;
  height: 100%;
    .showMenu{
      white-space: nowrap;
      min-width: 100%;
      overflow-x: scroll;}
    // .cp,.it{width:130%}
    // .ji{select{width:120px;height:32px;margin:20px 10px;border-radius:5px;border:1px solid #999}option{padding:5px;}}
    .ji{
      width: 100%;
      height: 160px;
      margin: 0 0 15px;
      background: #ffffff;
      overflow: hidden;
      box-sizing: border-box;
      border-radius: 5px;
      section {
        width: 96%;
        height: 40px;
        margin: 10px auto;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        .lab_sel , .lab_input{
          width: 24%;
          height: 40px;
          line-height: 40px;
          display: flex;
          justify-content: space-around;
          &:hover {
            cursor: pointer;
          }
        }
        .lab_sel p, .lab_input p{
            display: inline-block;
            width: 40%;
            margin: 5px 10px 0;
            height: 30px;
            line-height: 30px;
            text-align: center;
            &:hover {
              cursor: pointer;
            }
        }
        .lab_sel select{
            width: calc(60% - 20px) !important;
            height: 30px;
            margin: 3px 0 0 !important;
            border-radius: 5px;
            &:hover {
              cursor: pointer;
            }
            option:hover {
              cursor: pointer;
            }
          }
        .lab_input input{
            width: calc(60% - 20px) !important;
            margin: 3px 0 0 !important;
            box-sizing: border-box;
            &:hover {
              cursor: pointer;
            }
        }
      }
      .btn_search {
        height: 40px;
        padding-left: calc(100% - 200px);
        overflow: hidden;
        a{
          width: 70px;
          margin-top: 5px;
          height: 30px;
          line-height: 30px;
        }
        .so {
          margin: 5px 20px 0 0 !important;
        }
      }
    }
    .forbid{cursor:not-allowed;}
    .cp, .it li{
      display:flex;justify-content: space-around;
    }
    .cp,.it{min-width: 1700px;
      
    }
    .cp .c1 span{
    width: 40%;
    height: 55px;
    float: left;
  }
  .cp .c1 span:nth-child(1){
    width: 60%;
  }
  .sortBy div{
    width: 30%;
    height: 50%;
    // margin: 0 auto;
    overflow: hidden;
  }

  
    // .it li span{float:left;}
    .newSite{width:720px;border:1px solid gray;border-radius:5px;background-color:white;position:absolute;top:10%;left:30%;z-index:11;height:840px;overflow-y:scroll;
        p{margin:10px;position:relative;text-align:left;font-size:0;
        .clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
        label{width:107px;margin-right:10px;text-align:right;display:inline-block;font-size: 14px;}
        input{width:402px;height:32px;padding-left:10px;border-radius:5px;border:1px solid gray;}
        input[type=checkbox]{width:50px;}
        .sp{display:inline-block;height:32px;line-height:32px;top:-10px;position:relative;width:100px;}
        .spp{display: inline-block;height:32px;width:160px;position: relative;
        input[type=checkbox]{display: inline-block;width:50px;height:20px;line-height:35px;top:-4px;position: relative}}
        select{height:32px;width:413px;padding-left:10px;border-radius:5px;border:1px solid gray;}
        option{padding:5px;}
        .num{display:inline-block;border:1px solid gray;width:20px;height:20px;font-style:normal;border-radius:50%;margin:0 10px;text-align:center;}
        .num1{color:white;background-color:#067ad8;border-color:#067ad8;}
        }
        .mes{text-align:left;font-size:15px;margin-left:30px;}
        .line{color:#067ad8;}
        .cd{display:inline-block;width:180px;}
        .back{background:url(../assets/blue.png) no-repeat 100px 10px}
        .gray{background:url(../assets/gray.png) no-repeat 100px 10px}
        
        .dele{display:inline-block;padding:0px 8px;background:url(../assets/dele.png) no-repeat center;position:relative;top:5px; }
        .ii{font-style:normal;color:red;margin-left:5px;}
    }
    .xinz{position:relative;padding:10px;box-sizing:border-box;
        .field{display:inline-block;width:130px;height:32px;line-height:32px;border:1px solid #ccc;border-radius: 5px;text-align:center;cursor: pointer;
         img{width:10px;height:5px;vertical-align: middle;margin-left:8px;}}
         .allChoice{position:absolute;top:56px;left:222px;z-index:8;background:#fff;border:1px solid #e6e5e5;box-shadow:0 0 10px #d0cfcf;border-radius:6px;
            p{width:170px;height:30px;line-height: 30px;margin:5px 0;
            input{vertical-align: middle;margin:0 6px 0 26px;outline: none;}}
            .all_check{margin:0;height:40px;line-height:40px;background:#f6f7f1;
            img{margin-right:6px;vertical-align: middle;}}
            .pitch{background:#e4fdfc;}
         }
         a{
           margin: 0 10px;
         }
         .so:nth-child(2) {
           margin-left: 0px;
         }
    }
    .cha,.bian,.copyOperate,.subSite{width:20px;height:20px;display:inline-block;}
       .cha{background:url(../assets/cha1.png) no-repeat center;margin-left:10px;}
      //  .bian{background:url(../assets/bian1.png) no-repeat center}
       .dele{
        //  background:url(../assets/dele.png) no-repeat center;
       margin-left:10px;}
       .copyOperate{background:url(../assets/copy.png) no-repeat center;margin-left:10px;background-position: 0 7px}
       .subSite{background:url(../assets/subsite.png) no-repeat center;margin-left:10px;background-position: 0 7px}
       .migration{display: inline-block;width:80px;height:26px;line-height: 26px;background: #0386f0;color:#fff;text-align:center;border-radius:6px;}
       .c2{width:100px;margin-left:10px;}
       .c3{width:180px;margin-left:10px;}
       #date{left: 238px;}
       .migrate{position: absolute;top:20%;left:30%;z-index:30;width:540px;background:#fff;border-radius:5px;
        .describe{height:44px;line-height:44px;
            .title{float:left;margin-left:22px;color:#666;}
            .close{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
        }
        .fillContent{padding:18px 0 20px 0;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9;
            .tradeContent{text-align: left;font-size:0;
                span{display:inline-block;color:#666;font-size:14px;text-align:right;margin:0 20px;}
                input,select{width:130px;height:30px;outline:none;border:1px solid #d2d8db;border-radius:5px;padding-left:5px;box-sizing: border-box;}
              .chooseNape{margin-bottom:16px;label{display:inline-block;width:86px;text-align:right;margin-right:20px;}div{width:350px;}input{width:350px;}}
            }
        }
        .operate{height:56px;line-height:56px;
            a{display: inline-block;width:68px;height:30px;line-height:30px;border:1px solid #d9d9d9;border-radius:5px;text-align:center;color:#000;margin-top:10px;}
            .save{background-color:#0386f0;margin:0 20px 0 10px;color:#fff;}
        }
    }
    .deriveInfo{position:absolute;top:20%;left:30%;width:520px;z-index:30;background:#fff;color:#666;border: 1px solid #d4d8db;border-radius:5px;
      .describe{height:44px;line-height:44px;
            .title{float:left;margin-left:22px;color:#666;}
            .close{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
        }
        .fillContent{padding:18px 0 20px 0;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9;
            .tradeContent{text-align: left;font-size:0;
              p{width:78%;padding: 0 11%;margin-bottom:16px;div{width:86%;}}
                span{display:inline-block;color:#666;font-size:14px;text-align:right;margin:0 20px;}
                input,select{width:130px;height:30px;outline:none;border:1px solid #d2d8db;border-radius:5px;padding-left:5px;box-sizing: border-box;}
              p>label{display:inline-block;width:12%;text-align:left;}
              .exportField{.titleExport{padding-left:24px;height:38px;line-height:38px;background:#f6f6f6;}
              input{width:14px;height:14px;vertical-align: middle;}
              .checkField{width:78%;padding: 0 11%;padding-top:16px;}}
            }
        }
        .operate{height:56px;line-height:56px;
            a{display: inline-block;width:68px;height:30px;line-height:30px;border:1px solid #d9d9d9;border-radius:5px;text-align:center;color:#000;margin-top:10px;}
            .save{background-color:#0386f0;margin:0 20px 0 10px;color:#fff;}
        }
    }
}
</style>
<style>
.el-checkbox{margin-bottom:8px;}
.el-select-dropdown__item{padding:0 20px !important;}
.el-table td, .el-table th.is-leaf{text-align:center;}
/* .el-table--border td, .el-table--border th, .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{border-right:none;} */
  
  .sortBy div{
    width: 30%;
    height: 50%;
    /*margin: 0 auto;*/ 
    overflow: hidden;
  }
  /*up选中/未选中*/ 
  .upActive{
    margin-top: 18px;
    border-bottom: 8px solid #0386f0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
  .unUpActive{
    margin-top: 18px;
    border-bottom: 8px solid grey;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
  /*down选中/未选中*/ 
  .downActive{
    margin-top: 3px;
    border-top: 8px solid  #0386f0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }
  .unDownActive{
    margin-top: 3px;
    border-top: 8px solid  grey;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
  }

  .cell a:link {color: #666666;}
  .cell a:visited {color: #666666;}
  .cell a:hover{color: #666666;}
  .cell a:active {color: #666666;} 
</style>


