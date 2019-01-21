<template>
    <div class="chanpj">
        <!-- <p class="qu">产品管理 > 运维配置>节点</p> -->
        <p class="ji">
            <section>
              <div><label for="">节点名称</label><input type="text" v-model="mess.grid_name"  @keyup.enter="search"/></div>
              <div><label for="">机房</label><input type="text" v-model="mess.grid_site"  @keyup.enter="search"/></div>
              <div><label for="">部署方式</label><select name="" id="" v-model='mess.deploy_way'>
                  <option value=" ">---</option>
                  <option value="1">标准版</option>
                  <option value="2">公有云</option>
                  <option value="3">专属云</option>
                  <option value="4">私有云</option>
                </select></div>
              <div>
                <label for="">服务分类</label><select name="" id="" v-model='mess.version_type'>
                  <option value=" ">---</option>
                  <option value="1">经典版</option>
                  <option value="2">重构版</option>
                </select>
              </div>
            </section>
            <section><a href="javascript:void(0)" class="so" @click='search()'>搜索</a><a href="javascript:void(0)" class="cho" @click='chon()'>重置</a></section>
        </p>
        <p class="xinz"><a href="javascript:void(0)"  class="so" @click='add()'>新增</a></p>
        <!-- <p class="cp">
          <a href="javascript:void(0)" class="wid_1 wid6">序号</a>
          <a href="javascript:void(0)" class=" wid6">节点名称</a>
          <a href="javascript:void(0)" class=" wid6">机房</a>
          <a href="javascript:void(0)" class=" wid6">服务分类</a>
          <a href="javascript:void(0)" class=" wid6">部署方式</a>
          <a href="javascript:void(0)" class="c3">阿里结算服务器成本</a>
          <a href="javascript:void(0)" class=" wid6">操作</a>
      </p> -->
      <ul class="it">
          <oaTablePages @onPageChange="onPageChangeBind" :loading="tableLoading" :list="b2" :columns="columns" :operates="operates" :pagination="pagination"/>
          <!-- <li v-for="item in b2" :key='item.id'>
              <span class="wid_1 wid6">{{item.index}}</span>
              <span class=" wid6">{{item.grid_name}}</span>
              <span class=" wid6">{{item.grid_site}}</span>
              <span class=" wid6">{{item.version_name}}</span>
              <span class=" wid6">{{item.deploy_way}}</span>
              <span class="c3">{{item.server_cost}}</span>
              <span class=" wid6">
                 <a href="javascript:void(0)" class="bian" @click="bian(item.id,item.version_type)"><i class="el-icon-edit"></i></a>
                    <a href="javascript:void(0)" class="delete" @click='delet(item.id,index)'><i class="el-icon-delete"></i></a>
                <a href="javascript:void(0)" class="bian" @click='bian(item.id,item.version_type)'></a>
              <a href="javascript:void(0)" class="dele" @click='delet(item.id,index)'></a>
              </span>
          </li> -->
      </ul>
      <div class="jzu" v-show='jsho'>
          <p class='afb'><span>{{b3}}</span><i @click='close()'></i></p>
          <p><label for="">服务分类</label><select name="" id="" :disabled = 'serviceSort' v-model="versionsId" @change="serviceClassify">
              <option value="">请选择</option>
              <option :value="item.id" v-for="item in versions" :key="item.id">{{item.name}}</option>
          </select><em class='ii'>*</em></p>
          <p><label for="">节点名称</label><input type="text"  v-bind:disabled='adisable' v-model='site.grid_name' maxlength="20"><em class='ii'>*</em></p>
          <p><label for="">机房</label><select name="" id="" style="width:402px;height:32px;"  v-bind:disabled='adisable' v-model='site.grid_site'>
              <option value="sdfsddfsfdsdfsd">sdfsddfsfdsdfsd</option>
              </select><em class='ii'>*</em></p>
          <p><label for="">部署方式</label>
          <select name="" id="" style="width:402px;height:32px;"  v-bind:disabled='adisable' v-model='site.deploy_way'>
              <option value="1">标准版</option>
                <option value="2">公有云</option>
                <option value="3">专属云</option>
                <option value="4">私有云</option>
              </select><em class='ii'>*</em></p>
          <p  class='bao'><label for="">数据库配置</label></p><!--<a href="javascript:void(0)" class='quu'>配置</a><a href="javascript:void(0)" class='quu' @click='add_server()'>添加数据库</a>-->
          <div class="set_data">
            <div class="shrink" v-for="(item,index) in database" v-show="!item.show_shrink" :key="index">
                <span>数据库{{index+1}}</span><em class="unfold" @click="contract_sh(item,index)"></em><em class="delete" @click="delete_data(index)"></em>
            </div>
            <div v-for='(it,index) in database' v-show='it.show_shrink' :key='it.id' class="data_input">
                <p class="data_name"><span>数据库{{index+1}}</span><em class="shrink_a" @click="contract_sh(it,index)"></em><em class="delete" @click="delete_data(index)"></em></p>
                <p><label for="">数据库类型</label><input type="text" v-model='it.db_type' v-bind:disabled='adisable'><em class='ii'>*</em></p><!--<a href="javascript:void(0)" class="dele" @click='dele_server(index)' v-show='it.dele'></a>-->
                <p><label for="">数据库地址</label><input type="text" v-model='it.db_address' v-bind:disabled='adisable'><em class='ii'>*</em></p>
                <p><label for="">数据库名称</label><input type="text" v-model='it.db_name' v-bind:disabled='adisable'><em class='ii'>*</em></p>
                <p><label for="">用户名</label><input type="text" v-model='it.db_username' v-bind:disabled='adisable'><em class='ii'>*</em></p>
                <p><label for="">密码</label><input type="password" v-model='it.db_pwd' v-bind:disabled='adisable'><em class='ii'>*</em></p>
                <p><label for="">端口</label><input type="text" v-model='it.db_port' v-bind:disabled='adisable'><em class='ii'>*</em></p>
                <p class="operate" style="text-align:right;"><a href="javascript:void(0)" class="save">验证</a></p>
            </div>
            <p class="add_data"><a href="javascript:void(0)" class='quu' @click='add_server()'>+添加数据库</a></p>
          </div>
          <p><label for="">服务组</label></p>
          <div v-for='(item,index) in items' :key='item.id'>
                <p><label for="">服务组名称</label><select name="" id="" style="width:402px;height:32px;"  v-bind:disabled='adisable' v-model='item.group_id' >
                    <option v-for='(ii,index) in ite3' :key="index" :value="ii.id">{{ii.group_name}}</option>
                </select><em class='ii'>*</em>
                <a href="javascript:void(0)" class="dele" @click='dele_ser(index)' v-show='item.dele'></a></p>
          </div>
          <p class='bao' v-show='bao'><a href="javascript:void(0)"  class='quu' @click='add_ser()'>+新增服务组</a></p>
          <div >
              <p><label for="">选择版本</label></p>
              <div v-for='(it,index) in itee' :key="index">
                    <p><label for="">{{it.product}}</label>
                       <select name="" id="" style="width:402px;height:32px;" v-model='it.mode' v-bind:disabled='adisable'>
                           <option v-for='(ii,index) in it.version' :key="index" :value="ii.id">{{ii.pro_version}}</option></select><em class='ii'>*</em></p>
              </div>
              <!--p><label for="">在线咨询</label><select name="" id="" style="width:402px;height:32px;" v-model='site.version'>
                  <option value="rr">rr</option></select><em class='ii'>*</em></p>
              <p><label for="">互动记录</label><select name="" id="" style="width:402px;height:32px;" v-model='site.record'>
                  <option value="rr">rr</option></select><em class='ii'>*</em></p-->
          </div>
          <p style='margin:0 40px;text-align:left'>带<em class='ii'>*</em>为必填</p>
          <p class='bao' style='text-align:right;margin:0' v-show='diso'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='baoo(site.id)'>保存</a></p>
      </div>
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <!-- <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination> -->
      <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填
          <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div>
    </div>
</template>
<script>
import axios from "axios";
import Qs from "qs";
import Shade from "./shade";
import axioIn from "../store/axioIn";
import Pagination from "./pagination";
import Router from "../router/index";
import Datee from './date'
import oaTablePages from './oaTablePages/index';
axioIn.defaults.headers["Content-Type"] = "application/json";
axios.defaults.withCredentials = true; //配置cookie
export default {
  name: "chanpj",
  components: { Shade, Pagination, Datee , oaTablePages},
  data: function() {
    return {
      mess: { grid_name: "", grid_site: "", deploy_way: "", version_type: "" ,start_time: "", end_time: ""},
      date_start: false, //开始时间状态
      date_end: false,   //结束时间状态
      b2: [{ id: "", grid_name: "", grid_site: "", deploy_way: "",version_type: "", server_cost: "" }],
      b3: "",
      jsho: false,
      items: [{ group_id: "", dele: false }],
      mysql: true,
      shad: false,
      ite3: "",
      shad1: false,
      itee: [{ product: "", mode: "", version: [{ pro_version: "", id: "" }] }],
      adisable: false,
      bao: true,
      site: { grid_name: "", grid_site: "", deploy_way: "" , server_cost: "" },
      database: [
        {
          show_shrink: true,
          db_port: "",
          db_address: "",
          db_username: "",
          db_name: "",
          db_pwd: "",
          db_type: ""
        }
      ],
      diso: true,
      ser_name: [],
      page: "",
      popp: "",
      pageIndex: 1,
      tip: false,
      search_val: "",
      search_open: "",
      rowNum: "",
      breviary: [],
      serviceSort: false,
      versions: [],
      versionsId: "",
      verObj: {},
      //aaai:''

      tableLoading:true,
          operates: { 
              width: 200,
              fixed: 'right',
              list: [
                  {
                      icon: 'el-icon-edit',
                      plain: true,
                      title:'编辑',
                      showFlag:true,
                      borderFLag:false,
                      disabled: false,
                      method: (row, index) => {
                          this.bian(row.id, row.version_type)
                      }
                  },
                  {
                      title:'删除',
                      icon:"el-icon-delete",
                      plain: false,
                      showFlag:true,
                      borderFLag:false,
                      method: (row, index) => {

                          this.delet(row.id, index)
                      }
                  }
              ]
          }, // 操作按钮组
          pagination: {
              show: true,
              total: 0,
              pageIndex: 1,
              pageSize: 10
          }, // 分页参数
          columns: [
              { prop: "index", label: "序号" },
              { prop: "grid_name", label: "节点名称" },
              { prop: "grid_site", label: "机房", },
              { prop: "version_name", label: "服务分类", },
              { prop: "deploy_way", label: "部署方式", },
          ],
    };
  },
  created: function() {
    //   this.$checkCookie();
    axioIn.get("/api/product/version_type/").then(res => {
      this.versions = res.data;
      this.versions.map(n => {
        this.verObj[n.id] = n.name; 
      });
    })
    //   this.$checkCookie();
    //   axioIn.get('/api/product/product/forgrid/')
    //   .then((res)=>{
    //       //console.log(res);
    //       this.itee=res.data;
    //       this.itee.map(n=>n.mode='')
    //   })
    //   axioIn.get('/api/product/group/forgrid/')
    //   .then((res)=>this.ite3=res.data)
    if (!this.$route.query.flag) {
      this.$store.state.saveInfo = null;
    }
    if (this.$store.state.saveInfo) {
      this.pageIndex = this.$store.state.saveInfo.page;
      this.mess = this.$store.state.saveInfo.sear;
      axioIn
        .get("/api/product/grid/?page=" + this.pageIndex, { params: this.mess })
        .then(res => {
          if (res.data.length == 0) {
            alert("未搜到相关信息");
          } else {
            let a3 = ["", "标准版", "公有云", "专属云", "私有云"];
            this.popp = this.b2 = res.data.results;
            this.b2.map(n => {
              n.deploy_way = a3[n.deploy_way];
              n.version_name = this.verObj[n.version_type];
            });
            this.page = res.data.page_num.total_page;
            this.rowNum = res.data.page_num.total_count;
            this.search_open = true;
            this.pagination.total = 0;
            if (res.data.page_num){
                this.pagination.total = res.data.page_num.total_count;
            }
            this.tableLoading = false;
          }
        })
        .catch(err => {console.log(err)});
    } else {
      axioIn
        .get("/api/product/grid/")
        .then(res => {
          let a3 = ["", "标准版", "公有云", "专属云", "私有云"];
          this.popp = this.b2 = res.data.results;
          this.b2.map(n => {
            n.deploy_way = a3[n.deploy_way];
            n.version_name = this.verObj[n.version_type];
          });
          this.page = res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.search_open = false;
          // this.$store.commit('setLoading', false)
          this.pagination.total = 0;
          if (res.data.page_num){
              this.pagination.total = res.data.page_num.total_count;
          }
          this.tableLoading = false;
        })
        .catch(err => {
          
          // this.$store.commit('setLoading', false)
          this.tableLoading = false;
        });
    }
  },
  methods: {
    serviceClassify: function() {
      this.site = { grid_name: "", grid_site: "", deploy_way: "" ,  server_cost: "" };
      this.database = [
        {
          db_port: "",
          db_address: "",
          db_username: "",
          db_name: "",
          db_pwd: "",
          db_type: "",
          show_shrink: true
        }
      ];
      this.items = [{ group_id: "", dele: false }];
      // TODO: 传参返回的数据没变化
      axioIn
        .get("/api/product/product/forgrid/?version_type=" + this.versionsId)
        .then(res => {
          //console.log(res);
          this.itee = res.data;
          this.itee.map(n => (n.mode = ""));
        });
      axioIn
        .get("/api/product/group/forgrid/?version_type=" + this.versionsId)
        .then(res => (this.ite3 = res.data));
    },
    delete_data: function(index) {
      var a = this.database.length;
      if (a <= 1) {
        alert("需至少有一个数据库！");
        return;
      }
      if (this.b3 === "查看") {
        return;
      } else {
        confirm("确认删除？") ? this.database.splice(index, 1) : 0;
      }
    },
    contract_sh(it, index) {
      //收缩展开
      it.show_shrink = !it.show_shrink;
    },
    search: function() {
      //搜索
      var aa = "";
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
        .get("/api/product/grid/?" + aa)
        .then(res => {
          if (res.data.length == 0) {
            alert("未搜到相关信息");
          } else {
            let a3 = ["", "标准版", "公有云", "专属云", "私有云"];
            this.popp = this.b2 = res.data.results;
            this.b2.map(n => {
              n.deploy_way = a3[n.deploy_way];
              n.version_name = this.verObj[n.version_type];
            });
            this.pagination={
                show: true,
                pageIndex: 1,
                pageSize: 10,
                total:res.data.page_num.total_count
            };
            // this.page = res.data.page_num.total_page;
            // this.rowNum = res.data.page_num.total_count;
            this.search_open = true;
          }
        })
        .catch(err => console.log(err));
    },
    chon: function() {
      //重置
      this.pagination={
          show: true,
          total: 0,
          pageIndex: 1,
          pageSize: 10
      };
      this.mess.grid_name = "";
      this.mess.grid_site = "";
      this.mess.deploy_way = "";
      this.mess.start_time = "";
      this.mess.end_time = "";
      this.mess.version_type = "";
      axioIn.get("/api/product/grid/").then(res => {
        let a3 = ["", "标准版", "公有云", "专属云", "私有云"];
        this.popp = this.b2 = res.data.results;
        this.b2.map(n => {
          n.deploy_way = a3[n.deploy_way];
          n.version_name = this.verObj[n.version_type];
        });
        this.page = res.data.page_num.total_page;
        this.rowNum = res.data.page_num.total_count;
        this.search_open = false;
        this.pageIndex = 1;

        if (res.data.page_num){
            this.pagination.total = res.data.page_num.total_count;
        }
        this.tableLoading = false;
      });
    },
    add: function() {
      //新增
      Router.push({ path: "/addChanpj" });
      return;
      this.serviceSort = false;
      this.jsho = true;
      this.shad = true;
      this.b3 = "新增";
      this.mysql = true;
      this.adisable = false;
      this.bao = true;
      this.diso = true;
      this.site = { grid_name: "", grid_site: "", deploy_way: "" };
      this.versionsId = "";
      this.database = [
        {
          db_port: "",
          db_address: "",
          db_username: "",
          db_name: "",
          db_pwd: "",
          db_type: "",
          show_shrink: true
        }
      ];
      this.items = [{ group_id: "", dele: false }];
      this.itee.map(n => (n.mode = ""));
      this.items.forEach(arg => {
        arg.dele = true;
      });
      this.items[0].dele = false;
    },
    bian: function(id, type) {
      //编辑
      var obj = {};
      obj.page = this.pageIndex;
      obj.sear = this.mess;
      this.$store.commit("savePage", obj);
      Router.push({ path: "/addChanpj", query: { id: id, type: type } });
      return;
      axioIn.get("/api/product/product/forgrid/").then(res => {
        //console.log(res);
        this.itee = res.data;
        this.itee.map(n => (n.mode = ""));
      });
      axioIn
        .get("/api/product/group/forgrid/")
        .then(res => (this.ite3 = res.data));
      this.versionsId = type;
      this.site = { grid_name: "", grid_site: "", deploy_way: "" , server_cost: "" };
      this.database = [
        {
          db_port: "",
          db_address: "",
          db_username: "",
          db_name: "",
          db_pwd: "",
          db_type: "",
          show_shrink: true
        }
      ];
      this.items = [{ group_id: "", dele: false }];
      this.itee.map(n => (n.mode = ""));
      this.serviceSort = true;
      this.jsho = true;
      this.shad = true;
      this.b3 = "修改";
      this.mysql = true;
      this.adisable = false;
      this.bao = true;
      this.diso = true;
      axioIn
        .get("/api/product/grid/" + id + "/")
        .then(res => {
          //console.log(JSON.stringify(res.data.versionInfos))
          //  console.log('hdsufjdsah')
          [
            this.site.grid_site,
            this.site.grid_name,
            this.site.deploy_way,
            this.site.id,
            this.server_cost
          ] = [
            res.data.grid_site,
            res.data.grid_name,
            res.data.deploy_way,
            res.data.id,
            res.data.server_cost
          ];
          if (res.data.group.length === 0) {
            this.items = [{ group_id: "", dele: false }];
          } else {
            this.items = res.data.group;
            this.items.forEach(aag => {
              aag.dele = true;
            });
            this.items[0].dele = false;
            this.items.map(v => {
              v.group_id = v.id;
            });
          }
          // TODO：加了重构版1.12后这个versionInfos为空
          if (res.data.versionInfos.length === 0) {
            return;
          } else {
            this.itee.map((it, index) => {
              res.data.versionInfos.map(v => {
                if (v.product == it.product) {
                  it.mode = v.id;
                }
              });
            });
          }
          this.database = res.data.db_info;
          // this.database.map((n,index)=>{n.show_shrink = true})
          if (this.database.length !== 0) {
            this.database.map(n => (n.dele = true));
            // this.database.map((n,index)=>{n.show_shrink = true})
            this.database.map(n => {
              this.$set(n, "show_shrink", true);
            });
            // this.$set()
            this.database[0].dele = false;
          } else {
            this.database = [
              {
                db_port: "",
                db_address: "",
                db_username: "",
                db_name: "",
                db_pwd: "",
                db_type: "",
                show_shrink: true
              }
            ];
          }
          //if(res.data.db_info.length===0){
          //this.database={db_port:'',db_address:'',db_username:'',db_name:'',db_pwd:'',db_type:''}}
          //else{this.database=res.data.db_info[0];}

          //console.log(JSON.stringify(this.itee[0]))
        })
        .catch(error => alert(error.data.error));
    },
    cha: function(id) {
      //查看
      this.serviceSort = true;
      this.jsho = true;
      this.shad = true;
      this.b3 = "查看";
      this.mysql = true;
      this.adisable = true;
      this.bao = false;
      this.diso = false;
      this.items = [
        { group_id: "", dele: false },
        { group_id: "", dele: true }
      ];

      this.items.forEach(arg => {
        arg.dele = false;
      });
      this.site = { grid_name: "", grid_site: "", deploy_way: "", server_cost:"" };
      this.database = {
        db_port: "",
        db_address: "",
        db_username: "",
        db_name: "",
        db_pwd: "",
        db_type: "",
        show_shrink: true
      };
      this.items = [{ group_id: "", dele: false }];
      this.itee.map(n => (n.mode = ""));
      axioIn.get("/api/product/grid/" + id + "/").then(res => {
        [
          this.site.grid_site,
          this.site.grid_name,
          this.site.deploy_way,
          this.site.id,
          this.server_cost
        ] = [
          res.data.grid_site,
          res.data.grid_name,
          res.data.deploy_way,
          res.data.id,
          res.data.server_cost
        ];
        this.versionsId = res.data.version_type;
        if (res.data.group.length === 0) {
          this.items = [{ group_id: "", dele: false }];
        } else {
          this.items = res.data.group;
          this.items.forEach(aag => {
            aag.dele = true;
          });
          this.items[0].dele = false;
          this.items.map(v => {
            v.group_id = v.id;
          });
        }
        this.database = res.data.db_info;
        this.database.map(n => {
          n.show_shrink = true;
        });
        //if(res.data.db_info.length===0){
        // this.database={db_port:'',db_address:'',db_username:'',db_name:'',db_pwd:'',db_type:''}}
        //else{this.database=res.data.db_info[0];}
        if (res.data.versionInfos.length === 0) {
          return;
        } else {
          this.itee.map((it, index) => {
            res.data.versionInfos.map(v => {
              if (v.product == it.product) {
                it.mode = v.id;
              }
            });
          });
        }
      });
    },
    add_ser: function() {
      // 弹窗里新增服务组
      if (this.b3 === "查看") {
        return;
      } else {
        this.items.push({ group_id: "", dele: true });
      }
    },
    dele_ser: function(index) {
      //删除服务组
      if (this.b3 === "查看") {
        return;
      } else {
        confirm("确认删除？") ? this.items.splice(index, 1) : 0;
      }
    },
    close: function() {
      this.jsho = false;
      this.shad = false;
    },
    baoo: function(id) {
      var aaa = false;
      var aa = this.itee.map(n => n.mode);
      var bb = [];
      aa.map(n => {
        bb.push({ id: n });
      });
      /*for(let i=0;i<aa.length;i++){//数组去空
                    if(aa[i]===''||aa[i]===undefined){
                        aa.splice(i,1);
                        i=i-1;
                    }
                }*/
      //for(let n in this.site){
      if (
        this.site.grid_name == "" ||
        this.site.grid_site == "" ||
        this.site.deploy_way == "" ||
        this.site.server_cost == "" ||
        this.items.some(n => n.group_id == "")
      ) {
        aaa = true;
      }
      //}
      if (this.versionsId == "") {
        aaa = true;
      }
      this.itee.map(n => {
        if (n.mode === "" || n.mode === undefined) {
          aaa = true;
        }
      });
      this.database.map(c => {
        for (let ni in c) {
          if (c[ni] === "" || c[ni] === undefined) {
            aaa = true;
          }
        }
      });

      //console.log(aaa)
      if (aaa == true) {
        this.tip = true;
        this.shad1 = true; //console.log(JSON.stringify(this.site));
        //console.log(JSON.stringify(this.database));console.log(JSON.stringify(this.items))
      } else {
        var aaai = this.site;
        /*this.site.grp_list=this.items;
                this.site.group= [];
                this.site.group.map(n=>n.ser_address=[])
                this.site.verinfo_list=bb;
                this.site.database=[];
                this.site.database[0]=this.database;this.site.db_info=[];this.site.versionInfos=[]; */
        //
        //[aaai.grid_name,aaai.grid_site,aaai.deploy_way]=[this.site.grid_name,this.site.grid_site,this.site.deploy_way]
        aaai.grp_list = this.items;
        aaai.group = [];
        //aaai.group.map(n=>n.ser_address=[])
        aaai.verinfo_list = bb;
        aaai.version_type = this.versionsId;
        aaai.database = this.database;
        aaai.db_info = [];
        aaai.versionInfos = [];
        aaai.database.map(n => {
          delete n.show_shrink;
        });
        //console.log(JSON.stringify(aaai))
        if (this.b3 === "修改") {
          //console.log(this.site.id);console.log(id)
          axioIn
            .put("/api/product/grid/" + id + "/", aaai)
            .then(res => {
              alert("修改成功");
              this.jsho = false;
              this.shad = false;
              if (this.search_open === false) {
                axioIn
                  .get("/api/product/grid/?page=" + this.pageIndex)
                  .then(res => {
                    let a3 = ["", "标准版", "公有云", "专属云", "私有云"];
                    this.popp = this.b2 = res.data.results;
                    this.b2.map(n => {
                      n.deploy_way = a3[n.deploy_way];
                      n.version_name = this.verObj[n.version_type];
                    });
                    this.page = res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                  });
              } else {
                axioIn
                  .get("/api/product/grid/?" + this.search_val + "&page=1")
                  .then(res => {
                    let a3 = ["", "标准版", "公有云", "专属云", "私有云"];
                    this.popp = this.b2 = res.data.results;
                    this.b2.map(n => {
                      n.deploy_way = a3[n.deploy_way];
                      n.version_name = this.verObj[n.version_type];
                    });
                    this.page = res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                  });
              }
            })
            .catch(err => {
              this.jsho = false;
              this.shad = false;
              alert(err.data.detail);
            });
        }
        if (this.b3 === "新增") {
          axioIn
            .post("/api/product/grid/", aaai)
            .then(res => {
              alert("增加成功");
              this.jsho = false;
              this.shad = false;
              let a3 = ["", "标准版", "公有云", "专属云", "私有云"];
              this.popp = this.b2 = res.data.results;
              this.b2.map(n => {
                n.deploy_way = a3[n.deploy_way];
                n.version_name = this.verObj[n.version_type];
              });
              this.page = res.data.page_num.total_page;
              this.rowNum = res.data.page_num.total_count;
              this.search_open = false;
            })
            .catch(err => {
              this.jsho = false;
              this.shad = false;
              alert(err.data.error);
            });
        }
      }
    },
    onPageChangeBind(current){
        this.incrementTotal(current);
    },
    incrementTotal: function(q) {
      q = q === undefined ? 1 : q;
      this.tableLoading = true;
      if (this.search_open === false) {
        axioIn.get("/api/product/grid/?page=" + q).then(res => {
          let a3 = ["", "标准版", "公有云", "专属云", "私有云"];
          this.popp = this.b2 = res.data.results;
          this.b2.map(n => {
            n.deploy_way = a3[n.deploy_way];
            n.version_name = this.verObj[n.version_type];
          });
          // this.page = res.data.page_num.total_page;
          // this.rowNum = res.data.page_num.total_count;
          // this.pageIndex = q;
          this.pagination.total = 0;
          if (res.data.page_num){
              this.pagination.total = res.data.page_num.total_count;
          }
          this.tableLoading = false;
        });
      } else {
        axioIn
          .get("/api/product/grid/?" + this.search_val + "&page=" + q)
          .then(res => {
            let a3 = ["", "标准版", "公有云", "专属云", "私有云"];
            this.popp = this.b2 = res.data.results;
            this.b2.map(n => {
              n.deploy_way = a3[n.deploy_way];
              n.version_name = this.verObj[n.version_type];
            });
            this.page = res.data.page_num.total_page;
            this.rowNum = res.data.page_num.total_count;
            this.pageIndex = q;
          });
      }
      //this.b2 = this.popp.slice((q-1)*10,q*10);
      //this.pageIndex=q;
    },
    tipp: function() {
      //必填弹窗的确定
      this.shad1 = false;
      this.tip = false;
    },
    add_server: function() {
      // 添加数据库
      if (this.b3 === "查看") {
        return;
      } else {
        var arrLength = this.database.length;
        this.database.push({
          db_port: "",
          db_address: "",
          db_username: "",
          db_name: "",
          db_pwd: "",
          db_type: "",
          dele: true,
          show_shrink: true
        });
      }
    },
    dele_server: function(index) {
      //删除数据库
      if (this.b3 === "查看") {
        return;
      } else {
        confirm("确认删除？") ? this.database.splice(index, 1) : 0;
      }
    },
    delet: function(id, index) {
      //展示信息处的删除
      confirm("确认删除？")
        ? axioIn.delete("/api/product/grid/" + id + "/").then(res => {
            alert("删除成功");
            this.incrementTotal(this.pageIndex);
          })
        : 0;
    },

    /*-----------------阿里结算服务器成本 起始时间---截止时间 --------------*/ 
    // 时间显示  隐藏 切换
    showStart(){this.date_start = true},
    showEnd(){this.date_end = true},
    hide1(){this.date_start = false},
    hide2(){this.date_end = false},
    incrementTi1(a){
      this.mess.start_time = a;
      if(this.mess.start_time !==''){
          if(new Date(this.mess.end_time) < new Date(this.mess.start_time)){
              alert('截止时间不能早于起始时间');
              this.mess.start_time = '';
          }
      }
    },
    incrementTi2(a){
      this.mess.end_time = a;
      if(this.mess.start_time !==''){
        if(new Date(this.mess.end_time) < new Date(this.mess.start_time)){
            alert('截止时间不能早于起始时间');
            this.mess.end_time = '';
        }
      }
    },
  },
  watch:{
      'b2'(res){
          if(res.length){
              this.tableLoading = false;
          }
      }
  }
};
</script>
<style lang='scss' scoped>
@import "../assets/home";
.chanpj {
  width: 100%;
  .ji {
    height: 110px;
    background: #fff;
    border-radius: 6px;
    margin: 0 0 20px;
    position: relative;
    overflow: hidden;
    section{
      width: 100%;
      height: 40px;
      margin: 10px 0;
      line-height: 40px;
      overflow: hidden;
      display: flex;
      justify-content: space-around;
      div{
        width: 24%;
        display: flex;
        justify-content: space-around;
      }
    }
    section:nth-child(2){
      box-sizing: border-box;
      padding-left:  calc(100% - 220px);
      padding-top: 4px;
    }
    .al_times{
      display: inline-block;
      .al_time1{
        left: 710px !important;
      }
      .al_time2{
        left: 1020px !important;
      }
    }
    label{
      width: 30%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      padding-left: 15px;
    }
    select , input{
      width: 60%;
      height: 30px;
      line-height: 30px;
      padding: 0;
      margin: 0;
    }
    option {
      padding: 5px;
    }
    .so{margin:0;}
  }
  .afb {
    margin: 10px;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 2;
    i {
      background: url(../assets/close.png) no-repeat;
    }
  }
  .cha {
    background: url(../assets/cha1.png) no-repeat center;
  }
  .bian {
    // background: url(../assets/bian1.png) no-repeat center;
    margin-right: 20px;
  }
  .dele {
    // background: url(../assets/dele.png) no-repeat center;
    margin-left: 10px;
  }
  .jzu {
    width: 620px;
    position: absolute;
    top: 20%;
    left: 30%;
    z-index: 15;
    border: 1px solid gray;
    background-color: white;
    height: 580px;
    overflow-y: scroll;
    p {
      margin: 10px;
      text-align: left;
      label {
        width: 80px;
        text-align: right;
        margin-right: 10px;
        display: inline-block;
      }
      input,
      select {
        width: 290px;
        height: 32px;
        padding-left: 10px;
        border-radius: 5px;
        border: 1px solid gray;
        box-sizing: content-box;
      }
      option {
        padding: 5px;
      }
      .dele {
        display: inline-block;
        // background: url(../assets/dele.png) no-repeat center;
        position: relative;
        top: 5px;
      }
    }
  }
  .set_data {
    background: #f7f6f6;
    padding: 15px 0;
    .data_input {
      margin: 0 36px 0 100px;
      border: 1px solid #e6e6e6;
      box-shadow: 0 0 10px #ccc;
      background: #fff;
      margin-top: 12px;
      .data_name {
        padding-bottom: 8px;
        border-bottom: 1px solid #e0dfdf;
        em {
          width: 18px;
          height: 18px;
          float: right;
        }
        .shrink_a {
          background: url(../assets/arrows_bottom.png) no-repeat;
          margin-right: 4px;
        }
        .delete {
          background: url(../assets/dele.png) no-repeat center;
          margin-right: 12px;
        }
      }
      .operate {
        text-align: right;
        background: #f7f6f6;
        height: 46px;
        line-height: 46px;
        margin: 0;
        a {
          display: inline-block;
          width: 56px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ccc;
          border-radius: 5px;
          color: #000;
          margin-right: 8px;
        }
        .save {
          color: #fff;
          background: #0386f0;
        }
      }
    }
    .shrink {
      width: 462px;
      height: 36px;
      line-height: 36px;
      background: #fff;
      margin: 0 0 0 100px;
      border: 1px solid gray;
      border-radius: 5px;
      margin-top: 10px;
      span {
        float: left;
        padding-left: 10px;
      }
      em {
        width: 18px;
        height: 18px;
        display: inline-block;
        float: right;
        margin-top: 7px;
        margin-right: 12px;
      }
      .delete {
        background: url(../assets/dele.png) no-repeat center;
      }
      .unfold {
        background: url(../assets/arrows_right.png) no-repeat center;
      }
    }
    .add_data {
      margin: 0 0 0 100px;
      .quu {
        display: inline-block;
        color: #0386f0;
        width: 120px;
        height: 34px;
        line-height: 34px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 5px;
        background: #fff;
        margin-top: 12px;
      }
    }
  }
  .tip {
    width: 150px;
    height: 100px;
    position: fixed;
    top: 35%;
    left: 45%;
    z-index: 22;
    border: 1px solid gray;
    background-color: white;
    padding: 20px;
  }

  .wid6 a:link {color: #666666;}
  .wid6 a:visited {color: #666666;}
  .wid6 a:hover{color: #666666;}
  .wid6 a:active {color: #666666;} 
}
</style>
<style>
.el-pager li{padding:0;}
</style>
