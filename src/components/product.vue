<template>
    <div class="product">
        <p class="qu">产品管理 > 重构版产品配置 > {{ti}}</p>
        <div class='pro clearFloat'>
            <div class="pro_left">
                <a href="javascript:void(0)" @click='qieF()' class='qie'>功能开关配置</a>
                <div class='ul'><input type="text" @keyup.enter='submi()' v-model='aa2.pro_version'  maxlength="10" placeholder="输入信息点enter添加新版本">
                    <ul>
                        <li v-for='(a,index) in aa3' :key='a.id' @mouseover='enter(index)' @mouseout='out()' @click='versi(index,a.id)' :class="{active:a.ac}"><a href="javascript:void(0)">{{a.name}}</a>
                        <i v-show="a.a2" @click="deleteb(index,a,a.id)"></i></li>
                    </ul>
                </div>
            </div>
            <div class="pro_right">
                <div v-show='pro_x'>
                    <p class="ji">
                        <label for="">产品名称</label><input type="text" v-model='aa2.product' v-bind:disabled='adis1' onkeydown="if(event.keyCode==32) return false">
                        <a href="javascript:void(0)" class="so" @click='pro_revise()'>修改</a>
                        <a href="javascript:void(0)" class="so" @click='pro_keep()'>保存</a>
                    </p>
                    <p class="ji" style='border-top:1px solid #edf2f5;padding-top:20px;margin:0 20px;'>
                        <a href="javascript:void(0)" class="so" @click='add_func()'>新建功能</a>
                        <a href="javascript:void(0)" class='so' >批量导入</a>
                        <input type="file" class='leading_in' accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="upload()"  ref="upload">
                        <!--span class='ban'><span>引用版本</span><select name="" id=""></select></span-->
                    </p>
                    <p class="cp">
                        <a href="javascript:void(0)" class="c0">序号</a>
                        <a href="javascript:void(0)" class="c1">功能名称</a>
                        <a href="javascript:void(0)" class="c2">功能路径</a>
                        <a href="javascript:void(0)" class="c1">文本形式</a>
                        <a href="javascript:void(0)" class="c2">操作</a>
                    </p>
                    <ul class="it">
                        <li v-for="(item,index) in items" :key="index">
                            <span class="c0">{{item.index}}</span>
                            <span class="c1">{{item.func_name}}</span>
                            <span class="c2">{{item.func_code}}</span>
                            <span class="c1">{{item.func_type}}</span>
                            <span class="c2">
                                <a href="javascript:void(0)" class="bian" @click="bian(item.id)"></a>
                                <a href="javascript:void(0)" class="dele" @click='delet(item.id)'></a>
                            </span>
                        </li>
                    </ul>
                    <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
               </div>
               <div v-show='pro_b' class='pro_b'>
                   <p class="ji">
                       <span class='ban'><span>引用版本</span>
                       <select name="" id="" v-model='yin' @change="por_yi(yin)">
                           <option v-for='a in aa3' :key='a.id' :value='a.id'>{{a.name}}</option>
                        </select></span>
                   </p>
                   <p class='gon'>功能名称</p>
                   <p v-for='ii in pro_list' :key='ii.id' class='lis fl'>
                       <input type="checkbox" :value='ii.id' v-model="pro_liv"><span>{{ii.func_name}}</span>
                   </p>
                   <p class='bao bao_v' style='text-align:right'><a href="javascript:void(0)"  class='quu' @click='clo_v()'>取消</a><a href="javascript:void(0)" class='qub' @click='bao_v()'>保存</a></p>
               </div>
            </div>
        </div>

<!-- ----------------------------------------------------------------------------------------------------------------------------------- -->

        <div v-show='a1' class='chana'>
          <p class='afb'><span>{{a5}}</span><i @click='clo()'></i></p>
          <p><label for="">功能名称</label><input type="text" v-model="func_.func_name"><em class='ii'>*</em></p>
          <p><label for="">功能路径</label><input type="text" v-model="func_.func_code"><em class='ii'>*</em></p>
          <p><label for="">文本形式</label><select name="" id="" v-model='func_.func_type' @change='wenc()'>
              <option value="文本框">文本框</option>
              <option value="单选框">单选框</option>
              </select><em class='ii'>*</em></p>
          <div>
            <div class='def' v-show="func_.xuans"  v-for='(ii,index) in func_.selection' :key='ii.id'>
                <p class='def bao'  style='text-align:left;margin-left:40px;'><a href="javascript:void(0)" :class="{quu:!ii.is_default,qub:ii.is_default}" style='border-right:1px solid #9d9d9d' @click='de_val(index,func_.selection)' >设置默认</a><span @click='dele_fun(index)'>删除</span></p>
                <p><label for="">选项名称</label><input type="text" v-model="ii.select_name"><em class='ii'>*</em></p>
                <p><label for="">选项值</label><input type="text" v-model="ii.select_value"><em class='ii'>*</em></p> 
            </div>
            <p class='bao'  style='text-align:left'><a href="javascript:void(0)" class='qub' @click='add_fun()'>添加功能选项</a></p>
          </div>

          <p class='lef'>版本展示条件</p>
          <p><label for="">客户版本</label>
             <input type="radio" name='1' value='1' v-model='func_.cli_version'>B2B
             <input type="radio" name='1' value='2' v-model='func_.cli_version'>B2C
             <input type="radio" name='1' value='3' v-model='func_.cli_version'>不限
             <em class='ii'>*</em>
          </p>
          <div>


          <p class='lef'>上级展示条件</p>
          <p v-show='topf'><label for="">上级功能</label>
              <select name="" id="" v-model='func_.top' @change='linkag(func_.top)'>
                  <option :value="ii.id" v-for='ii in ite' :key='ii.id'>{{ii.func_name}}</option>
              </select></p>
          <p class='bao'  style='text-align:left'> 
              <a href="javascript:void(0)" class='qub' @click='add_fun1()'>新增上级条件</a>
          </p>
          <div v-for='(ii,index) in func_.parent' :key='ii.id'>
            <p class='two'><label for="">当上级功能选择</label>
                <select name="" id="" v-model='ii.id' v-if='tiv'>
                    <option :value="ii.id" v-for='ii in ite1' :key='ii'>{{ii.select_name}}</option>
                </select>
                <input type="text" v-model='ii.id' v-else>时展示
                <a href="javascript:void(0)" class="dele" @click='dele_fun1(index)'></a>
                <em class='ii'>*</em>
            </p>
          </div>



            <p class='lef'>联动展示条件</p>
            <p class='bao'  style='text-align:left'>
                <a href="javascript:void(0)" class='qub' @click='add_fun3()'>添加联动功能</a>
            </p>
            
            <div v-for='(ii,index) in func_.selection1' :key='ii.id'>
                <p class=''><label for="">联动功能</label>
                    <select name="" id="" v-model='ii.id' @change='linkage(ii.id,index)'>
                        <option :value="ii.id" v-for='ii in ite2' :key='ii.id'>{{ii.func_name}}</option>
                    </select>
                    <a href="javascript:void(0)" class="dele" @click='dele_fun3(index)'></a><em class='ii'>*</em>
                </p>
                <p class='bao'  style='text-align:left'><a href="javascript:void(0)" class='qub' @click='add_fun2(index)'>新增联动条件</a></p>
                <div v-for='(item,index1) in ii.list' :key='index1'>
                    <p  class='two'><label for="">当联动功能选择</label>
                      <select name="" id="" v-model='item.name'  v-if='ii.tiv'>
                          <option :value="ii.id" v-for='ii in ii.ite' :key='ii.id'>{{ii.name}}</option>
                      </select>
                      <input type="text" v-model='item.name' v-else>时展示
                      <a href="javascript:void(0)" class="dele" @click='dele_fun2(index,index1)'></a>
                      <em class='ii'>*</em>
                    </p>
                </div>
            </div>
          
            <p class='bao' style='text-align:right'>
                <a href="javascript:void(0)"  class='quu' @click='clo()'>取消</a>
                <a href="javascript:void(0)" class='qub' @click='chbao()'>保存</a>
            </p>
          </div>
        </div>


<!-- ------------------------------------------------------------------------------------------------------------------------------------ -->
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填
          <p class='bao' style='text-align:center;margin:20px 0'><a href="javascript:void(0)" class='qub' @click="tipp1()">确定</a></p>
      </div>
    </div>
</template>
<script>
import Vue from "vue";
import Shade from "./shade";
import axioIn from "../store/axioIn";
import Pagination from "./pagination";
import Router from "../router/index";
export default {
  name: "product",
  components: { Shade, Pagination },
  data: function() {
    return {
      aa2: { product: "", version: "", pro_version: "" },
      aa3: [],
      func_: {
        func_name: "",
        cli_version: "",
        func_type: "",
        top: "",
        xuans: false,
        func_code: "",
        selection: [{ select_name: "", select_value: "", is_default: "" }],
        parent: [],
        dependences: [{ id: "" }],
        selection1: []
      },

      adis1: true,
      a1: false, //弹窗展示
      a5: "新增", //弹窗是新增还是修改
      items: [
        /*{id:'',index:'',func_name:'',func_code:'',func_type:''}*/
      ],
      shad: false,
      shad1: false,
      page: "1",
      rowNum: 1,
      pageIndex: 1,
      tip: false,
      ti: "",
      yin: "", //引用版本的数据
      tiv: true, //条件渲染
      revi: false, //展示产品的名字是新增还是修改的状态
      pro_id: "", //新增成功后的产品id
      ite: [], //上级功能的下拉列表
      ite1: [], //上级功能选择下拉列表
      ite2: [], //联动功能下拉列表
      lina: "", //存储联动信息
      lina1: "", //存储上级功能
      topf: false, //上级功能是否展示
      pro_x: true, //控制列表显示
      pro_b: false, //控制复选框显示
      pro_list: "", //所有版本信息
      pro_liv: [], //现有版本的信息
      pro_livv: [] //暂存版本信息
    };
  },
  watch: {
    adis1: function(oldvalue, newvalue) {}
  },
  mounted: function() {
    //初始化信息
    if (this.$route.query.id === undefined) {
      this.adis1 = false;
      this.ti = "新增";
    } else {
      this.adis1 = true;
      this.ti = "修改";
      this.pro_id = this.$route.query.id;
      axioIn.get("/api/product/ref-product/" + this.$route.query.id + "/")
        .then(res => {
            this.aa2.product = res.data.product;
            this.aa3 = res.data.version;
            this.pro_list = res.data.function;
            this.aa3.map(n => {
                Vue.set(n, "ac", false);
                Vue.set(n, "a2", false);
                n.name = n.pro_version;
            });
        });
      axioIn.get("/api/product/function/?product=" + this.pro_id).then(res => {
        this.items = res.data.results;
        this.page = res.data.page_num.total_page;
        this.rowNum = res.data.page_num.total_count;
      });
    }
  },
  methods: {
    enter: function(index) {
      // 左侧信息鼠标移上时
      this.aa3.map(n => (n.a2 = false));
      this.aa3[index].a2 = true;
    },
    out: function() {
      this.aa3.map(n => (n.a2 = false));
    },
    versi: function(index, id) {
      this.aa3.map(n => (n.ac = false));
      if (this.aa3[index] !== undefined) {
        this.aa3[index].ac = true;
        axioIn
          .get("/api/product/version/" + this.aa3[index].id + "/")
          .then(res => {
            this.pro_liv = this.pro_livv = res.data.function.map(n => n.id);
          });
        console.log(this.aa3);
      }
      axioIn.get("/api/product/ref-product/" + this.pro_id + "/").then(res => {
        this.aa2.product = res.data.product;
        this.aa3 = res.data.version;
        this.pro_list = res.data.function;
        this.aa3.map(n => {
          Vue.set(n, "ac", false);
          Vue.set(n, "a2", false);
          n.name = n.pro_version;
        });
      });
      this.aa3[index].ac = true;
      this.pro_x = false;
      this.pro_b = true;
    },
    submi: function() {
      //弹窗左侧input的keycode:enter事件
      var abc = this.aa3.map(x => x.name);
      if (this.pro_id === "") {
        alert("请先创建产品");
        return;
      }
      if (abc.indexOf(this.aa2.pro_version) === -1) {
        axioIn
          .post("/api/product/version/", {
            product: this.pro_id,
            pro_version: this.aa2.pro_version
          })
          .then(res => {
            this.aa3.push({
              name: res.data.pro_version,
              a2: false,
              ac: false,
              id: res.data.id
            });
            this.aa3.map(n => (n.ac = false));
          });
      } else {
        alert("请勿重复添加");
      }
      this.aa2.pro_version = "";
    },
    deleteb: function(a, b, c) {
      //this.aa3.map((n)=>{if(n.id!==undefined)aa=aa+1})
      //if(c===undefined){
      let d = confirm("确认删除？");
      if (d == true) {
        this.aa3.splice(a, 1);
        axioIn.delete("/api/product/version/" + c).then(ress => {
          alert("删除成功");
        });
      }
      // }
    },


    // 表单保存
    chbao: function() {
      var aa = false;
      var bb = { selection: [], parent: {}, dependences: [] };
      for (let i in this.func_) {
        //判断输入文本框不为空
        if (this.func_[i] === "" && i !== "top") {
          aa = true;
        }
      }
      if (this.func_.func_type === "单选框") {
        this.func_.selection.map(n => {
          if (n.select_name === "" || n.select_value === "") {
            aa = true;
          }
        });
      } //判断选项是否为空
      if (this.func_.parent.length !== 0) {
        this.func_.parent.map(n => {
          if (n.id === "") {
            aa = true;
          }
        });
      }
      if (this.func_.selection1.length !== 0) {
        this.func_.selection1.map(n => {
          if (n.id === "") {
            aa = true;
          }
          n.list.map(v => {
            if (v.name === "") {
              aa = true;
            }
          });
        });
      }
      if (aa === true) {
        this.shad1 = true;
        this.tip = true;
      } else {
        [
          bb.product,
          bb.func_name,
          bb.cli_version,
          bb.func_code,
          bb.func_type
        ] = [
          this.pro_id,
          this.func_.func_name,
          this.func_.cli_version,
          this.func_.func_code,
          this.func_.func_type
        ];
        if (this.func_.func_type === "单选框") {
          Object.assign(bb.selection, this.func_.selection);
        }
        //bb.parent={};
        if (this.tiv === true) {
          var cci = this.func_.parent.map(n => n.id);
        } else {
          bb.parent = {};
          bb.parent.ipu = [];
          bb.parent.ipu.push({
            id: this.func_.top,
            value: this.func_.parent.map(n => n.id)
          });
        }
        bb.dependences = { id: [], ipu: [] };
        var cc = [];
        var dd = {};
        if (this.func_.selection1.length !== 0) {
          this.func_.selection1.map(v => {
            var ccv = v.list.map(n => n.name);
            if (v.tiv === true && ccv.length !== 0) {
              cc = ccv;
              bb.dependences.id.push(cc);
            } else {
              dd.id = v.id;
              dd.value = ccv;
              bb.dependences.ipu.push(dd);
            }
          });
          bb.dependences.id = bb.dependences.id.join(",").split(",");
        }
        if (this.a5 === "新增") {
          axioIn.post("/api/product/function/", bb).then(res => {
            alert("新增成功");
            this.a1 = false;
            this.shad = false;
            axioIn
              .get("/api/product/function/?product=" + this.pro_id)
              .then(res => {
                this.items = res.data.results;
                this.page = res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
              });
          });
        } else {
          axioIn
            .put("/api/product/function/" + this.func_.id + "/", bb)
            .then(res => {
              alert("修改成功");
              this.a1 = false;
              this.shad = false;
              axioIn
                .get("/api/product/function/?product=" + this.pro_id)
                .then(res => {
                  this.items = res.data.results;
                });
            });
        }
      }
    },
    // 新建功能
    add_func: function() {
      //新建功能
      this.func_ = {
        func_name: "",
        cli_version: "",
        func_type: "",
        top: "",
        xuans: false,
        func_code: "",
        selection: [{ select_name: "", select_value: "", is_default: "" }],
        parent: [],
        dependences: [{ id: "" }],
        selection1: []
      };
      if (this.pro_id === "") {
        alert("请输入产品名称并保存");
        return;
      } else {
        this.a1 = true;
        this.shad = true;
        this.a5 = "新增";
        axioIn.get("/api/product/function/?product=" + this.pro_id + "&parent=1").then(res => {
          if (res.data.length === 0) {
            this.topf = false;
          } else {
            this.topf = true;
            this.lina1 = this.ite = res.data;
          }
        });
        axioIn.get("/api/product/function/?product=" + this.pro_id + "&depend=1").then(res => {
          this.lina = this.ite2 = res.data; 
        });
      }
    },
    //添加功能选项
    add_fun: function(i) {if (this.func_.func_type === "单选框") {this.func_.selection.push({select_name: "",select_value: "",is_default: ""});}},
    //新增上级条件
    add_fun1: function(i) {this.func_.parent.push({ id: "" });},
    //联动功能新增
    add_fun2: function(i) {this.func_.selection1[i].list.push({ name: "" });},
    //联动条件新增
    add_fun3: function(i) {
      if (this.func_.selection1 === undefined) {this.$set(this.func_, "selection1", []);}
      this.func_.selection1.push({ id: "", list: [{ name: "" }], tiv: false });
    },

    // 编辑产品
    bian: async function(id) {
      this.a1 = true;
      this.shad = true;

      this.a5 = "修改";
      await axioIn
        .get("api/product/function/?product=" + this.pro_id + "&parent=1")
        .then(res => {
          if (res.data.length === 0) {
            this.topf = false;
          } else {
            this.topf = true;
            this.ite = res.data; //.map(v=>v.func_name)
            this.lina1 = res.data;
          }
        });
      var f = await axioIn
        .get("/api/product/function/?product=" + this.pro_id + "&depend=1")
        .then(res => {
          this.ite2 = res.data; //.map(v=>v.func_name)
          this.lina = res.data;
        });

      axioIn.get("/api/product/function/" + id).then(res => {
        var a2 = [];
        this.func_ = res.data;
        if (this.func_.func_type === "单选框") this.func_.xuans = true;
        if (
          res.data.parent.length !== 0 &&
          res.data.parent[0].function !== ""
        ) {
          this.$set(this.func_, "top", res.data.parent[0].function);
          this.linkag(this.func_.top);
          if (this.tiv === true) {
            this.func_.parent = res.data.parent.map(n => ({ id: n.id }));
          } else {
            this.func_.parent = res.data.parent.map(n => ({
              id: n.select_name
            }));
          }
        }

        this.$set(this.func_, "selection1", []);
        if (res.data.dependences.length !== 0) {
          var a2 = res.data.dependences.map(n => n.function);
          a2 = [...new Set(a2)];
          a2.map((v, index) => {
            var a4 = false;
            var a3 = res.data.dependences
              .filter(n => n.function === v)
              .map(n => {
                if (n.func_type === "单选框") {
                  a4 = true;
                  return { name: n.id };
                } else {
                  a4 = false;
                  return { name: n.select_name };
                }
              });
            this.func_.selection1.push({ id: v, list: a3, tiv: a4, ite: [] });
            let aa = this.lina.filter(n => n.id === v);
            this.func_.selection1[index].ite = aa[0].selection.map(n => ({
              name: n.select_name,
              id: n.id
            }));
          });
        }
      });
    },
    // 删除产品
    delet: function(id) {
      let aa = confirm("确认删除？");
      if (aa) {
        axioIn.delete("/api/product/function/" + id).then(res => {
          axioIn.get("/api/product/function/?product=" + this.pro_id)
            .then(res => {
              this.items = res.data.results;
              this.page = res.data.page_num.total_page;
              this.rowNum = res.data.page_num.total_count;
            });
        });
      }
    },

    // 删除功能选择
    dele_fun: function(i) {if (confirm("确定删除吗？")) {this.func_.selection.splice(i, 1);}},
    //删除上级功能
    dele_fun1: function(i) {if (confirm("确定删除吗？")) {this.func_.parent.splice(i, 1);}},
    //删除联动功能
    dele_fun2: function(i, j) {if (confirm("确定删除吗？")) {this.func_.selection1[i].list.splice(j, 1);}},
    //删除联动条件
    dele_fun3: function(i) {if (confirm("确定删除吗？")) {this.func_.selection1.splice(i, 1);}},
    // 文本形式 切换
    wenc: function(i) { func_type
      // 文本形式的文本框和单选框
      if (this.func_.func_type === "文本框") {
        this.func_.xuans = false;
        this.func_.selection = [];
      } else {
        this.func_.xuans = true;
        this.func_.selection = [
          { select_name: "", select_value: "", is_default: false }
        ];
        if (this.a5 === "新增") {
          this.func_.selection[0].is_default = true;
        }
      }
    },
    // 添加功能 设置默认
    de_val: function(n, aaa) {
      // 设置默认

      if (
        this.a5 === "修改" &&
        aaa[n].id !== undefined &&
        aaa[n].is_default === false
      ) {
        axioIn
          .put("/api/product/selection/" + aaa[n].id + "/modify_default/")
          .then(res => {
            alert("设置成功");
            aaa.map(v => (v.is_default = false));
            aaa[n].is_default = true;
          });
      } else {
        aaa.map(v => (v.is_default = false));
        aaa[n].is_default = true;
      }
    },
    // 分页
    incrementTotal: function(q) {
      axioIn
        .get("/api/product/function/?page=" + q + "&product=" + this.pro_id)
        .then(res => {
          this.items = res.data.results;
          this.page = res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
        });
    },
    // 产品名称 修改
    pro_revise: function() {
      this.adis1 = false;
    },
    // 产品名称  保存
    pro_keep: function() {
      if (this.aa2.product === "") {
        alert("请输入产品名称");
        return;
      }
      this.adis1 = true;
      if (this.ti === "修改") {
        axioIn
          .put("/api/product/ref-product/" + this.$route.query.id + "/", {
            product: this.aa2.product
          })
          .then(res => {
            alert("修改成功");
          });
        return;
      }
      if (this.revi === false) {
        axioIn
          .post("/api/product/ref-product/", { product: this.aa2.product })
          .then(res => {
            this.revi = true;
            this.pro_id = res.data.id;
            alert("增加产品成功");
          })
          .catch(err => alert(err.data.product[0]));
      } else {
        axioIn
          .put("/api/product/ref-product/" + this.pro_id + "/", {
            product: this.aa2.product
          })
          .then(res => {
            alert("修改成功");
          });
      }
    },
    // 关闭弹窗
    clo: function() {
      this.a1 = false;
      this.shad = false;
      this.func_ = {
        func_name: "",
        func_type: "",
        top: "",
        xuans: false,
        func_code: "",
        selection: [{ select_name: "", select_value: "", is_default: "" }],
        parent: [],
        dependences: [{ id: "" }],
        selection1: []
      };
    },
    //联动功能change事件
    linkage: function(i, index) {
      let aa = this.lina.filter(n => n.id === i);
      this.func_.selection1[index].ite = aa[0].selection.map(n => ({
        name: n.select_name,
        id: n.id
      }));
      if (aa[0].func_type === "单选框") {
        this.func_.selection1[index].tiv = true;
        this.func_.selection1[index].list = [{ name: "" }];
      } else {
        this.func_.selection1[index].tiv = false;
        this.func_.selection1[index].list = [{ name: "" }];
        this.func_.selection1[index].list = aa[0].selection.map(n => ({
          name: n.select_name
        }));
      }
    },
    // 上级功能change事件
    linkag: function(i) {
      //上级功能change事件
      if (this.lina1 === "") {
        return;
      }
      let aa = this.lina1.filter(n => n.id === i);
      if (aa[0].selection.lenght !== 0) {
        this.ite1 = aa[0].selection;
      } //.map(n=>n.select_name)
      if (aa[0].func_type === "单选框") {
        this.tiv = true;
      } else {
        this.tiv = false;
      }
    },

    // ------------------------------------------------------------------------------------------------------------
    qieF: function() {
      this.pro_x = true;
      this.pro_b = false;
      this.aa3.map(n => (n.ac = false));
    },
    tipp: function() {
      this.shad = false;
      this.tip = false;
    },
    tipp1: function() {
      this.shad1 = false;
      this.tip = false;
    },
    upload: function() {
      //批量导入
      var inputv = this.$refs.upload;
      var datav = new FormData();
      datav.append("file", inputv.files[0]);
      axioIn
        .post(
          "/api/product/function-selection-import/?product=" + this.pro_id,
          datav,
          { headers: { "Content-Type": "application/vnd.ms-excel" } }
        )
        .then(res => {
          this.clo();
          alert("导入成功");
          axioIn
            .get("api/product/function/?product=" + this.pro_id)
            .then(res => {
              this.items = res.data.results;
              this.page = res.data.page_num.total_page;
              this.rowNum = res.data.page_num.total_count;
            });
        })
        .catch(error => {
          inputv = {};
          datav = {};
          alert(error.data.error);
        });
    },
    bao_v: function() {
      var aa = "";
      var bb = { function: this.pro_liv };
      //   console.log(this.aa3);return
      this.aa3.map(n => {
        if (n.ac === true) {
          aa = n.id;
        }
      });
      axioIn
        .put("/api/product/version/" + aa + "/modify_func/", bb)
        .then(res => {
          alert("新增成功");
        });
    },
    clo_v: function() {
      this.pro_liv = this.pro_livv;
      this.yin = "";
    },
    por_yi: function(id) {
      if (id === undefined) {
        return;
      }
      axioIn.get("/api/product/version/" + id + "/").then(res => {
        this.pro_liv = res.data.function.map(n => n.id);
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.product {
  width: 100%;
  .ji {
    margin: 20px 0 0 0;
    padding-bottom: 20px;
    position: relative;
    label {
      margin-left: 20px;
      font-size: 12px;
      color: #999;
    }
    .so {
      margin-right: 0px;
      margin-left: 0;
      width: 80px;
      height: 32px;
      line-height: 32px;
    }
    input {
      height: 30px;
      border: 1px solid #d2d8db;
      width: 388px;
    }
    .ban {
      position: absolute;
      left: 20px;
      height: 30px;
      line-height: 30px;
      border: 1px solid gray;
      border-radius: 5px;
      font-size: 0;
      span {
        display: inline-block;
        width: 80px;
        text-align: center;
        background-color: #fafafa;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-right: 1px solid #eee;
        font-size: 12px;
        line-height: 28px;
      }
      select {
        height: 30px;
        width: 315px;
        border: none;
        border-radius: 5px;
      }
    }
  }
  .active {
    background-color: #eaf8fe;
  }
  .pro {
    width: 100%;
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
    //   .pro_left,.pro_right{float:left;}
    .pro_left {
      width: 18%;
      margin-right: 10px;
      border-right: 1px solid #d9d9d9;
      min-height: 600px;
      .qie {
        width: 100%;
        height: 35px;
        line-height: 35px;
        color: #0386f0;
        background-color: white;
        margin-bottom: 10px;
        display: inline-block;
      }
      .ul {
        background-color: white;
        overflow: hidden;
        height: calc(100% - 45px);
      }
      input {
        width: calc(100% - 30px);
        height: 32px;
        border-radius: 5px;
        margin: 10px;
        outline: none;
        border: 1px solid gray;
        padding-left: 8px;
      }
      li {
        height: 46px;
        width: 100%;
        background: #ebecee;
        border-bottom: 1px solid #e1e6ee;
        overflow: hidden;
        a {
          width: 120px;
          float: left;
          text-align: left;
          height: 46px;
          line-height: 46px;
          color: #666;
          margin-left: 20px;
        }
        i {
          width: 25px;
          height: 44px;
          display: inline-block;
          background: url(../assets/close.png) no-repeat center;
          &:hover {
            cursor: pointer;
          }
        }
      }
      li:hover {
        background-color: #eaf8fe;
      }
      a:hover {
        color: #0386f0;
      }
      ul {
        width: 104%;
        height: 100%;
        background: #ffffff;
        overflow-y: scroll;
      }
    }
    .pro_right {
      width: 81%;
      min-height: 640px;
      background-color: white;
      .cp,
      .it {
        margin: 0 20px;
        border-radius: 5px;
      }
      .it {
        font-size: 14px;
        color: #666;
        li {
          padding: 10px 0;
          border-bottom: 1px solid #eee;
        }
      }
      .c0,
      .c1,
      .c2 {
        display: inline-block;
        text-align: center;
      }
      .c0 {
        width: 50px;
        margin-left: 20px;
      }
      .c2 {
        width: 80px;
      }
      .pro_b {
        height: 640px;
        text-align: left;
        overflow-y: scroll;
        position: relative;
        p {
          height: 32px;
        }
        .lis {
          display: inline-block;
          width: 150px;
          text-align: left;
          height: 32px;
          line-height: 32px;
          margin: 0 20px;
          input,
          span {
            display: inline-block;
          }
          input {
            width: 13px;
            height: 13px;
            margin-right: 15px;
            vertical-align: middle;
          }
          span {
            width: 120px;
            height: 32px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .def {
    background-color: #f9f9f9;
    margin-top: -5px;
    a {
      margin-right: 15px;
    }
    span {
      color: #0386f0;
      cursor: pointer;
    }
  }
  .cha {
    background: url(../assets/cha1.png) no-repeat center;
    margin-right: 15px;
  }
  .bian {
    background: url(../assets/bian1.png) no-repeat center;
  }
  .dele {
    background: url(../assets/dele.png) no-repeat center;
  }
  .chana {
    width: 540px;
    height: 500px;
    border: 1px solid gray;
    background-color: white;
    overflow-y: scroll;
    position: absolute;
    top: 15%;
    left: 25%;
    z-index: 11;
    .afb {
      margin: 10px;
      i {
        background: url(../assets/close.png) no-repeat;
      }
    }
    p {
      text-align: left;
      margin: 5px;
      label {
        width: 60px;
        text-align: right;
        display: inline-block;
        margin-left: 40px;
      }
      input,
      select {
        display: inline-block;
        width: 320px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        margin-left: 10px;
        padding-left: 10px;
      }
      select {
        width: 333px;
      }
      input[type="radio"] {
        width: 20px;
        position: relative;
        top: 10px;
      }
    }

    .two {
      margin-left: 70px;
      label {
        width: 100px;
      }
      select,
      input {
        width: 160px;
        margin-right: 10px;
      }
      .dele {
        top: 5px;
        position: relative;
        margin-left: 10px;
      }
    }
    .bao {
      margin-left: 110px;
    }
    .lef {
      margin-left: 50px;
    }
  }
  .leading_in {
    position: absolute;
    width: 74px;
    height: 33px;
    top: 4px;
    left: 91px;
    z-index: 3;
    opacity: 0.8;
    cursor: pointer;
    opacity: 0;
  }
  .bao_v {
    position: absolute !important;
    right: 20px;
    bottom: 15px;
  }
  .gon {
    height: 32px;
    line-height: 32px;
    margin: 10px 20px;
  }
}
</style>


