/* 
* @Author: liuqian 
* @Date: 2018-05-08 09:59:17 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-11-09 09:46:48
*/
<template>
  <div class="addChanpj">
    <!-- <p class="qu">运维管理 >节点>{{b3}}</p> -->
    <div class='revise'>
      <div class="surround">
        <div class="inContent">
          <p>
            <label for="">服务分类</label>
            <select name="" id="" :disabled='serviceSort' v-model="versionsId" @change="serviceClassify">
              <option value="">请选择</option>
              <option :value="item.id" v-for="item in versions" :key="item.id">{{item.name}}</option>
            </select>
            <em class='ii'>*</em>
          </p>
          <div class="sutra" v-show="sutra">
            <p>
              <label for="">节点名称</label>
              <input type="text" v-bind:disabled='adisable' v-model='site.grid_name' maxlength="20">
              <em class='ii'>*</em>
            </p>
            <p>
              <label for="">机房</label>
              <select name="" id="" style="width:402px;height:32px;" v-bind:disabled='adisable' v-model='site.grid_site'>
                <option value="sdfsddfsfdsdfsd">sdfsddfsfdsdfsd</option>
              </select>
              <em class='ii'>*</em>
            </p>
            <p>
              <label for="">部署方式</label>
              <select name="" id="" style="width:402px;height:32px;" v-bind:disabled='adisable' v-model='site.deploy_way'>
                <option value="1">标准版</option>
                <option value="2">vip</option>
                <option value="3">vpc</option>
                <option value="4">企业版</option>
              </select>
              <em class='ii'>*</em>
            </p>
            <!-- <p>
              <label for="">阿里结算服务器成本</label>
              <input type="text" v-bind:disabled='adisable' v-model='site.server_cost' maxlength="20">
              <em class='ii'>*</em>
            </p> -->
            <p class='bao'>
              <label for="">数据库配置</label>
            </p>
            <!--<a href="javascript:void(0)" class='quu'>配置</a><a href="javascript:void(0)" class='quu' @click='add_server()'>添加数据库</a>-->
            <div class="set_data">
              <div class="shrink" v-for="(item,index) in database" v-show="!item.show_shrink" :key="index">
                <span>数据库{{index+1}}</span>
                <em class="unfold" @click="contract_sh(item,index)"></em>
                <em class="delete" @click="delete_data(index)"></em>
              </div>
              <div v-for='(it,index) in database' v-show='it.show_shrink' :key='it.id' class="data_input">
                <p class="data_name">
                  <span>数据库{{index+1}}</span>
                  <em class="shrink_a" @click="contract_sh(it,index)"></em>
                  <em class="delete" @click="delete_data(index)"></em>
                </p>
                <p>
                  <label for="">数据库类型</label>
                  <input type="text" v-model='it.db_type' v-bind:disabled='adisable'>
                  <em class='ii'>*</em>
                </p>
                <!--<a href="javascript:void(0)" class="dele" @click='dele_server(index)' v-show='it.dele'></a>-->
                <p>
                  <label for="">数据库地址</label>
                  <input type="text" v-model='it.db_address' v-bind:disabled='adisable'>
                  <em class='ii'>*</em>
                </p>
                <p>
                  <label for="">数据库名称</label>
                  <input type="text" v-model='it.db_name' v-bind:disabled='adisable'>
                  <em class='ii'>*</em>
                </p>
                <p>
                  <label for="">用户名</label>
                  <input type="text" v-model='it.db_username' v-bind:disabled='adisable'>
                  <em class='ii'>*</em>
                </p>
                <p>
                  <label for="">密码</label>
                  <input type="password" v-model='it.db_pwd' v-bind:disabled='adisable'>
                  <em class='ii'>*</em>
                </p>
                <p>
                  <label for="">端口</label>
                  <input type="text" v-model='it.db_port' v-bind:disabled='adisable'>
                  <em class='ii'>*</em>
                </p>
                <p class="operate" style="text-align:right;">
                  <a href="javascript:void(0)" class="save">验证</a>
                </p>
              </div>
              <p class="add_data">
                <a href="javascript:void(0)" class='quu' @click='add_server()'>+添加数据库</a>
              </p>
            </div>
            <p>
              <label for="">服务组</label>
            </p>
            <div v-for='(item,index) in items' :key='item.id'>
              <p>
                <label for="">服务组名称</label>
                <select name="" id="" style="width:402px;height:32px;" v-bind:disabled='adisable' v-model='item.group_id'>
                  <option v-for='(ii,index) in ite3' :key="index" :value="ii.id">{{ii.group_name}}</option>
                </select>
                <em class='ii'>*</em>
                <a href="javascript:void(0)" class="dele" @click='dele_ser(index)' v-show='item.dele'></a>
              </p>
            </div>
            <p class='bao' v-show='bao'>
              <a href="javascript:void(0)" class='quu' @click='add_ser()'>+新增服务组</a>
            </p>
            <!-- <div>
              <p>
                <label for="">选择版本</label>
              </p>
              <div v-for='(it,index) in itee' :key="index">
                <p>
                  <label for="">{{it.product}}</label>
                  <select name="" id="" style="width:402px;height:32px;" v-model='it.mode' v-bind:disabled='adisable'>
                    <option v-for='(ii,index) in it.version' :key="index" :value="ii.id">{{ii.pro_version}}</option>
                  </select>
                  <em class='ii'>*</em>
                </p>
              </div>
            </div> -->
          </div>
          <div class="remodeling" v-show="!sutra">
            <p>
              <label for="">节点名称</label>
              <input type="text" v-model="refactor_data.grid_name">
              <em class='ii'>*</em>
            </p>
            <p>
              <label for="">机房</label>
              <select name="" id="" v-model="refactor_data.grid_site">
                <option value="sdfsddfsfdsdfsd">sdfsddfsfdsdfsd</option>
              </select>
              <em class='ii'>*</em>
            </p>
            <p>
              <label for="">部署方式</label>
              <select name="" id="" v-model='refactor_data.deploy_way'>
                <option value="1">标准版</option>
                <option value="2">vip</option>
                <option value="3">vpc</option>
                <option value="4">企业版</option>
              </select>
              <em class='ii'>*</em>
            </p>
            <!-- <p>
              <label for="">阿里结算服务器成本</label>
              <input type="text" v-model="refactor_data.server_cost">
            </p> -->
            <div class="domain">
              <label for="">域名</label>
              <div class="domain_for">
                <span>
                  <label for="">dolphinsetting(设置)</label>
                  <input type="text" v-model="refactor_data.domain_name.dolphinsetting" />
                  <em class='ii'>*</em>
                </span>
                <span>
                  <label for="">init(getflashserver)</label>
                  <input type="text" v-model="refactor_data.domain_name.init" />
                  <em class='ii'>*</em>
                </span>
                <span>
                  <label for="">usercenter(用户中心)</label>
                  <input type="text" v-model="refactor_data.domain_name.usercenter" />
                  <em class='ii'>*</em>
                </span>
                <span>
                  <label for="">client(客户端)</label>
                  <input type="text" v-model="refactor_data.domain_name.client" />
                  <em class='ii'>*</em>
                </span>
              </div>
            </div>
            <p>
              <label for="" style="vertical-align:top;word-break:break-all;">服务端getFlashserver</label>
              <textarea name="" id="" cols="30" rows="10" v-model="refactor_data.getFlashserver"></textarea>
              <em class='ii'>*</em>
            </p>
            <p>
              <label for="" style="vertical-align:top;word-break:break-all;">访客端</label>
              <textarea name="" id="" cols="30" rows="10" v-model="refactor_data.visitors"></textarea>
              <em class='ii'>*</em>
            </p>
          </div>
        </div>
      </div>
      <p class='save_for' style=''>
        <a href="javascript:void(0)" class='quu' @click="cancel">取消</a>
        <a href="javascript:void(0)" class='qub' @click="save_info()">保存</a>
      </p>
    </div>
    <shade v-show='shad1' style='z-index:16'></shade>
    <div v-show='tip' class='tip'>
      带
      <em class='ii'>*</em>为必填
      <p class='bao' style='text-align:center;margin:20px 0'>
        <a href="javascript:void(0)" class='qub' @click="tipp()">确定</a>
      </p>
    </div>
  </div>
</template>
<script>
  import axioIn from "../store/axioIn";
  import Router from "../router/index";
  import Shade from "./shade";
  export default {
    name: "addChanpj",
    components: {
      Shade
    },
    data() {
      return {
        mess: {
          grid_name: "",
          grid_site: "",
          deploy_way: ""
        },
        b2: [{
          id: "",
          grid_name: "",
          grid_site: "",
          deploy_way: ""
        }],
        b3: "",
        jsho: false,
        items: [{
          group_id: "",
          dele: false
        }],
        mysql: true,
        shad: false,
        ite3: "",
        shad1: false,
        // itee: [{//选择版本的数据
        //   product: "",
        //   mode: "",
        //   version: [{
        //     pro_version: "",
        //     id: ""
        //   }]
        // }],
        adisable: false,
        bao: true,
        site: {
          grid_name: "",
          grid_site: "",
          deploy_way: "",
        //   server_cost: "" //阿里服务器结算成本
        },
        database: [{
          show_shrink: true,
          db_port: "",
          db_address: "",
          db_username: "",
          db_name: "",
          db_pwd: "",
          db_type: ""
        }],
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
        sutra: true,
        id: "",
        ver_type: "",
        refactor_data: {
          grid_name: "",
          grid_site: "",
          deploy_way: "",
        //   server_cost: "", //阿里结算服务器成本
          version_type: "",
          domain_name: {
            dolphinsetting: "",
            init: "",
            usercenter: "",
            client: ""
          },
          getFlashserver: "",
          visitors: ""
        }
      };
    },
    created() {
      axioIn
        .get("/api/product/version_type/") //版本
        .then(res => {
          this.versions = res.data;
          this.versions.map(n => {
            this.verObj[n.id] = n.name;
          });
        });
      if (this.$route.query.id === undefined) {
        this.b3 = "新增";
        this.serviceSort = false;
        this.jsho = true;
        this.shad = true;
        this.b3 = "新增";
        this.mysql = true;
        this.adisable = false;
        this.bao = true;
        this.diso = true;
        this.site = {
          grid_name: "",
          grid_site: "",
          deploy_way: "",
        //   server_cost: ""
        };
        this.versionsId = "";
        this.database = [{
          db_port: "",
          db_address: "",
          db_username: "",
          db_name: "",
          db_pwd: "",
          db_type: "",
          show_shrink: true
        }];
        this.items = [{
          group_id: "",
          dele: false
        }];
        // this.itee.map(n => (n.mode = ""));
        this.items.forEach(arg => {
          arg.dele = true;
        });
        this.items[0].dele = false;
      } else {
        this.b3 = "修改";
        this.id = this.$route.query.id;
        this.ver_type = this.$route.query.type;
        if (this.ver_type == 1) {
          this.sutra = true;
          // axioIn.get("/api/product/product/forgrid/").then(res => {
          //   this.itee = res.data;
          //   this.itee.map(n => (n.mode = ""));
          // });
          axioIn
            .get("/api/product/group/forgrid/")
            .then(res => (this.ite3 = res.data));
          this.versionsId = this.ver_type;
          this.site = {
            grid_name: "",
            grid_site: "",
            deploy_way: "",
            // server_cost: ""
          };
          this.database = [{
            db_port: "",
            db_address: "",
            db_username: "",
            db_name: "",
            db_pwd: "",
            db_type: "",
            show_shrink: true
          }];
          this.items = [{
            group_id: "",
            dele: false
          }];
          // this.itee.map(n => (n.mode = ""));
          this.serviceSort = true;
          this.jsho = true;
          this.shad = true;
          this.mysql = true;
          this.adisable = false;
          this.bao = true;
          this.diso = true;
          axioIn.get("/api/product/grid/" + this.id + "/").then(res => {
            //console.log(JSON.stringify(res.data.versionInfos))
            [
              this.site.grid_site,
              this.site.grid_name,
              this.site.deploy_way,
              this.site.id,
            //   this.server_cost
            ] = [
              res.data.grid_site,
              res.data.grid_name,
              res.data.deploy_way,
              res.data.id,
              // res.data.server_cost
            ];
            // console.log(this.itee);return
            if (res.data.group.length === 0) {
              this.items = [{
                group_id: "",
                dele: false
              }];
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
            // if (res.data.versionInfos.length === 0) {
            //   // return;
            // } else {
            //   this.itee.map((it, index) => {
            //     res.data.versionInfos.map(v => {
            //       if (v.product == it.product) {
            //         it.mode = v.id;
            //       }
            //     });
            //   });
            // }
            // this.itee.map(n => {
            //   res.data.versionInfos.map(m => {
            //     if (m.product === n.product) {
            //       n.mode = m.id;
            //     }
            //   });
            // });
            
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
              this.database = [{
                db_port: "",
                db_address: "",
                db_username: "",
                db_name: "",
                db_pwd: "",
                db_type: "",
                show_shrink: true
              }];
            }
            //if(res.data.db_info.length===0){
            //this.database={db_port:'',db_address:'',db_username:'',db_name:'',db_pwd:'',db_type:''}}
            //else{this.database=res.data.db_info[0];}

            //console.log(JSON.stringify(this.itee[0]))
          });
          //   .catch(error=>alert(error.data.error))
        } else if (this.ver_type == 2) {
          this.sutra = false;
          this.versionsId = 2;
          this.serviceSort = true;
          axioIn.get("/api/product/grid/" + this.id + "/").then(res => {
            this.refactor_data = res.data;
          });
        }
      }
    },
    methods: {
      serviceClassify: function () {
        if (this.versionsId === 1) {
          this.sutra = true;
          // axioIn.get("/api/product/product/forgrid/").then(res => {
          //   this.itee = res.data;
          //   this.itee.map(n => (n.mode = ""));
          // });
          axioIn
            .get("/api/product/group/forgrid/")
            .then(res => (this.ite3 = res.data));
        } else if (this.versionsId === 2) {
          this.sutra = false;
        }
        this.site = {
          grid_name: "",
          grid_site: "",
          deploy_way: "",
          // server_cost: ""
        };
        this.database = [{
          db_port: "",
          db_address: "",
          db_username: "",
          db_name: "",
          db_pwd: "",
          db_type: "",
          show_shrink: true
        }];
        this.items = [{
          group_id: "",
          dele: false
        }];
        for (var attr in this.refactor_data.domain_name) {
          this.refactor_data.domain_name[attr] = "";
        }
        // TODO: 传参返回的数据没变化
        //   axioIn.get('/api/product/product/forgrid/?version_type='+this.versionsId)
        //     .then((res)=>{
        //         //console.log(res);
        //         this.itee=res.data;
        //         this.itee.map(n=>n.mode='')
        //     })
        //   axioIn.get('/api/product/group/forgrid/?version_type='+this.versionsId)
        //     .then((res)=>this.ite3=res.data)
      },
      cancel() {
        Router.push({
          path: "/chanpj",
          query: {
            flag: true
          }
        });
      },
      save_info() {
        var id = this.id;
        if(this.versionsId == '' || this.versionsId == undefined || this.versionsId == null) {
          alert('请先填写信息')
        }
        if (this.versionsId === 1) {
          var aaa = false;
          // var aa = this.itee.map(n => n.mode);
          var bb = [];
          // aa.map(n => {
          //   bb.push({
          //     id: n
          //   });
          // });
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
            // this.site.server_cost == "" ||
            this.items.some(n => n.group_id == "")
          ) {
            aaa = true;
          }
          //}
          if (this.versionsId == "") {
            aaa = true;
          }
          // this.itee.map(n => {
          //   if (n.mode === "" || n.mode === undefined) {
          //     aaa = true;
          //   }
          // });
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
            // aaai.versionInfos = [];
            aaai.database.map(n => {
              delete n.show_shrink;
            });
            //console.log(JSON.stringify(aaai))
            if (this.b3 === "修改") {
              console.log('修改');
              axioIn
                .put("/api/product/grid/" + id + "/", aaai)
                .then(res => {
                  alert("修改成功");
                  Router.push({
                    path: "/chanpj",
                    query: {
                      flag: true
                    }
                  });
                  // this.jsho=false;this.shad=false;
                  // if(this.search_open===false){
                  //     axioIn.get('/api/product/grid/?page='+this.pageIndex)
                  //         .then((res) => {
                  //             let a3=['','标准版','vip','vpc','企业版'];
                  //             this.popp=this.b2=res.data.results;
                  //             this.b2.map(n=>{n.deploy_way=a3[n.deploy_way];n.version_name = this.verObj[n.version_type]})
                  //             this.page=res.data.page_num.total_page;
                  //             this.rowNum = res.data.page_num.total_count;
                  //             })
                  // }
                  // else{
                  //     axioIn.get('/api/product/grid/?'+this.search_val+'&page=1')
                  //     .then((res) => {
                  //         let a3=['','标准版','vip','vpc','企业版'];
                  //         this.popp=this.b2=res.data.results;
                  //         this.b2.map(n=>{n.deploy_way=a3[n.deploy_way];n.version_name = this.verObj[n.version_type]})
                  //         this.page=res.data.page_num.total_page;
                  //         this.rowNum = res.data.page_num.total_count;
                  //         })
                  // }
                })
                .catch(err => {
                  this.jsho = false;
                  this.shad = false;
                  alert(err.data.error);
                });
            }
            if (this.b3 === "新增") {
              // if(this.versionsId === 1){
              //     this.sutra = true;
              // }else if(this.versionsId === 2){
              //     // this.sutra = false;
              //     axioIn.post('/api/product/grid/',this.refactor_data).then(res=>{
              //         console.log('jhfsjafh')
              //     })
              // }
              axioIn
                .post("/api/product/grid/", aaai)
                .then(res => {
                  alert("增加成功");
                  Router.push({
                    path: "/chanpj"
                  });
                  // this.jsho=false;this.shad=false;
                  // let a3=['','标准版','vip','vpc','企业版'];
                  // this.popp=this.b2=res.data.results;
                  // this.b2.map(n=>{n.deploy_way=a3[n.deploy_way];n.version_name = this.verObj[n.version_type]})
                  // this.page=res.data.page_num.total_page;
                  // this.rowNum = res.data.page_num.total_count;
                  // this.search_open=false;
                })
                .catch(err => {
                  this.jsho = false;
                  this.shad = false;
                  if(err.status !== 400 && err.status !== 403){
                    alert(err.data.error);
                  }
                  // alert(err.data.error);
                  // alert(err.data.error);
                });
            }
          }
        } else if (this.versionsId === 2) {
          var flag = false;
          this.refactor_data.version_type = this.versionsId;
          for (var attr in this.refactor_data) {
            if (this.refactor_data[attr] === "") {
              flag = true;
            }
          }
          for (var attr in this.refactor_data.domain_name) {
            if (this.refactor_data.domain_name[attr] === "") {
              flag = true;
            }
          }
          if (flag) {
            this.tip = true;
            this.shad1 = true;
          } else {
            if (this.b3 === "修改") {
              console.log('修改')
              axioIn
                .put("/api/product/grid/" + this.id + "/", this.refactor_data)
                .then(res => {
                  alert(res.data.info);
                  Router.push({
                    path: "chanpj"
                  });
                })
                .catch(err => {
                  // alert(err.data.error);
                });
            } else if (this.b3 === "新增") {
              axioIn
                .post("/api/product/grid/", this.refactor_data)
                .then(res => {
                  alert(res.data.info);
                  Router.push({
                    path: "chanpj"
                  });
                })
                .catch(err => {
                  // alert(err.data.error);
                });
            }
          }
        }
      },
      contract_sh(it, index) {
        //收缩展开
        it.show_shrink = !it.show_shrink;
      },
      delete_data: function (index) {
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
      add_server: function () {
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
      add_ser: function () {
        // 弹窗里新增服务组
        if (this.b3 === "查看") {
          return;
        } else {
          this.items.push({
            group_id: "",
            dele: true
          });
        }
      },
      dele_ser: function (index) {
        //删除服务组
        if (this.b3 === "查看") {
          return;
        } else {
          confirm("确认删除？") ? this.items.splice(index, 1) : 0;
        }
      },
      tipp: function () {
        //必填弹窗的确定
        this.shad1 = false;
        this.tip = false;
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import "../assets/home";
  .addChanpj {width: 100%;margin-bottom:15px;
    .revise {
      width: 100%px;
      background-color: white;
      margin-top: 20px;
      .save_for {
        margin: 0;
        text-align: right;
        height: 72px;
        border-top: 1px solid #d2d8db;
      }
      .save_for {
        a {
          display: inline-block;
          width: 58px;
          height: 30px;
          text-align: center;
          line-height: 30px;
          border: 1px solid gray;
          border-radius: 5px;
          padding: 0;
          margin: 0;
        }
        .qub {
          margin: 20px 20px 20px 10px;
          background: #0386f0;
          color: #fff;
        }
        .quu {
          color: #515c6e;
        }
      }
      .surround {
        height: 580px;
        overflow-y: scroll;
      }
      .inContent {
        background-color: white;
        height: 580px;
        width: 620px;
        margin: 0 auto;
        p,
        .domain {
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
          textarea {
            width: 336px;
            height: 100px;
            border-radius: 5px;
            resize: none;
            padding: 10px;
            word-break: break-all;
            font-size: 14px;
            line-height: 20px;
          }
          option {
            padding: 5px;
          }
          .dele {
            display: inline-block;
            background: url(../assets/dele.png) no-repeat center;
            position: relative;
            top: 5px;
          }
        } // .remodeling{input{width:350px;}select{width:350px;}label{width:180px;}}
        .domain {
          input {
            width: 350px;
          }
          select {
            width: 350px;
          }
          label {
            width: 80px;
          }
          .domain_for {
            margin: 10px 0;
            margin-left: 90px;
            span {
              display: inline-block;
              width: 350px;
              margin: 6px 0;
              label {
                font-size: 12px;
                color: #999;
                width: 120px;
              }
              input {
                width: 208px;
              }
            }
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
    }
  }
</style>