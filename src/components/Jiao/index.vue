<template>
  <div class="jiao">
      <!-- <p class="qu">权限和人员管理 > 角色权限</p> -->
      <p class="ji"><label for="">角色名称</label><input type="text" v-model="messs" @keyup.enter="search">
        <a href="javascript:void(0)" class="so" @click='search()'>搜索</a>
        <a href="javascript:void(0)" class="cho" @click="mess()">重置</a>
      </p>
      <p class="xin"><a href="javascript:void(0)"  class="so" @click='add()'>新增角色</a></p>
      <p class="cp">
          <a href="javascript:void(0)" class="wid_1 wid5">序号</a>
          <a href="javascript:void(0)" class="wid5">角色名称</a>
          <a href="javascript:void(0)" class="wid5">人数</a>
          <a href="javascript:void(0)" class="wid5">查看成员</a>
          <a href="javascript:void(0)" class="wid5">操作</a>
      </p>
      <ul class="it">
          <li v-for="item in items" :key='item.id'>
              <span class="wid_1 wid5">{{item.index}}</span>
              <span class="wid5">{{item.name}}</span>
              <span class="wid5" style="cursor:pointer;" @click="staffContain(item.id,item.name)">{{item.own_user_count}}</span>
              <span class="wid5"><i  style="cursor:pointer;" @click="staffContain(item.id,item.name)" class="el-icon-search"></i></span>
              <span class="wid5">
                  <!-- a href="javascript:void(0)" class="cha" @click='cha(item.id)'></a -->
                  <!-- <a href="javascript:void(0)" class="bian" @click='revise(item.id)'></a>
                  <a href="javascript:void(0)" class="delete" @click="deleRole(item.id)"></a></span> -->
                  <a href="javascript:void(0)" class="bian" @click="revise(item.id)"><i class="el-icon-edit"></i></a>
                  <a href="javascript:void(0)" class="delete" @click='deleRole(item.id)'><i class="el-icon-delete"></i></a></span>
          </li>
      </ul>
      <div v-show='zeng' class='xinn'>
          <p  class='afb'><span >{{msn}}</span><i @click='close()' class='clo'></i></p>
          <p><label for="" class='label'>角色名称</label><input type="text" class='input' style='width:345px;' v-model='se_name' v-bind:disabled='adisable'/><em class='ii'>*</em></p>
          <p class='openn'><label for=""  class='label'>开放权限</label><span>模块</span><span>授权内容</span><span class='mo'>整个模块<img :src='img' alt="xx" @click='qie()' :ap='tabb'/></span></p>
          <div class='leful clearFloat'>
                <ul>
                    <li v-for='(a,index) in aa' :key="index">
                        <a  href="javascript:void(0)" @click='nop(index,a.name,a.id)' v-bind:class="{ aps: a.isActive }">{{a.name}}</a><em v-show='a.tice'></em><i v-show='a.quan'></i>
                        <ul v-show='a.sho'>
                            <li v-for='(a1,i) in a.children' :key="i">
                                <a  href="javascript:void(0)" @click='nopp(index,i,a.id,a1.id)' v-bind:class="{ aps: a1.isActive }">{{a1.name}}</a>
                            </li> 
                        </ul>
                    </li>
                </ul>
                 <div class='rout' v-show='authority'><input type="checkbox" v-model="checkedNames[0]"  v-bind:disabled='adisable' @change='ck(checkedNames[0],0)' />增改
                     <input type="checkbox" v-model="checkedNames[1]"  v-bind:disabled='adisable' @change='ck(checkedNames[1],1)' />删除{{ $route.params.id }}</div>
          </div>
          
          <div v-show='tabs' class='tabs'>
              <span>包含人员</span>
              <table cellspacing='0' cellspadding='0'>
                  <tr>
                      <th class='cn'>人员名称</th>
                      <th>组织机构</th>
                  </tr>
                  <tr v-for='(dd,k) in ddds' :key="k">
                      <td>{{dd.user_name}}</td>
                      <td>{{dd.department}}</td>
                  </tr>
              </table>
          </div>
          <p class='bao' style='text-align:right' v-show='qu'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='xiu()'>保存</a></p>
      </div>
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <pagination :number='page' :chain='rowNum' v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
      <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填
          <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div>
  </div>
</template>

<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>