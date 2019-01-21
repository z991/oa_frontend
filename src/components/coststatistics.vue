<template>
    <div class="lineStation">
        <p class="qu">数据管理 > 成本统计 </p>
     <p class='tipp'><span  >客户合同金额</span></p>
        <div class='chart' >
            <p class="ji" style="overflow: hidden;">
                <span class='serviceAddress' style="overflow-x: hidden;">
                  <div style="margin: 5px 0;"   >
                    <span>grid列表</span> 
                    <input type="text"   v-model="kh_definiteSear"  @click="listen1"/>
                    <img style="margin-left:-45px;" src="../assets/cha1.png" alt="" @click="search_address(ser)">
                  </div>
                  <div class="grid_list" style="height: calc(100% - 50px);" v-show="listentype1" @mouseleave="listenhide1" >
                    <ul v-show="biao.length != 0"     >
                        <li v-for='(it,index) in listenlist1'   :key='index' @click="kh_chooseAdd(it)" style="text-align:center;margin:5px 0;">{{it.grid_name}}</li>
                    </ul>
                    <p v-show="biao.length == 0" style="display: block;margin: 80px auto;text-align: center; font-size: 20px;width:86px;">暂无数据</p>
                    <pagination :number='kh_pageCount' v-on:increment="kh_incrementTotal2" :page-index='kh_pagePresent' ></pagination>  
                  </div>
                </span>
            </p>
            <div id="myChart" :style="{width: '700px', height: '300px',float:'left'}"></div>
        </div>
        <p class='tipp'><span  >客户站点性质配比</span></p>
        <div class='chart' >
            <p class="ji" style="overflow: hidden;">
              <span class='serviceAddress' style="overflow-x: hidden;">
                <div class="select_container" style="margin: 5px 0;">
                  <span class='jii'>
                    <label for="">客户性质</label>
                    <select name="" id="" v-model='gues.roletype' >
                            <option value="0">全部</option>     
                            <option value="1">试用客户</option>                   
                            <option value="2">正式客户</option>
                            <option value="3">市场渠道客户</option>
                            <option value="4">商务渠道客户</option>
                            <option value="5">自用站点</option>
                    </select>
                  </span>
                </div>
                <div style="margin: 5px 0;">
                  <span>grid列表</span> 
                  <input type="text" v-model="definiteSear"  @click="listen2"/>
                  <img style="margin-left:-45px;" src="../assets/cha1.png" alt="" @click="search_address(ser)">
                </div>
                <div class="grid_list" style="height: 240px;" v-show="listentype2"  @mouseleave="listenhide2" >
                  <ul v-show="biao.length != 0">
                      <li v-for='(it,index) in listenlist2'  :key='index' @click="chooseAdd(it)" style="text-align:center;margin:5px 0;">{{it.grid_name}}</li>
                  </ul>
                  <p v-show="biao.length == 0" style="display: block;margin: 80px auto;text-align: center; font-size: 20px">暂无数据</p>
                  <pagination :number='pageCount' v-on:increment="incrementTotal2" :page-index='pagePresent'></pagination>
                </div>  
              </span>
            </p>
            <div id="myChart1" :style="{width: '700px', height: '300px',float:'left'}"></div>
        </div>
        <p class='tipp'><span  >成本统计</span>
        <!-- <a href="javascript:void()" class='out' @click='export1()'>导出</a> -->
        </p>
        <div class='chart' style="height:670px;">
            <p class="ji" style="height:170px;">
              <span class='serviceAddress' style="height: 130px; position:relative">
                  <div class="select_container" style="margin: 15px 0;">
                      <label for="" style="margin:0">趋势日期</label>
                      <span class='time' style="border-radius:5px;">
                        <input type="text"   v-model="ke.start_date" @focus='focu2()' readonly="true" style="margin: 0;"/>
                        <datee v-if='date_s2' v-on:incrementt="incrementTi2"  @mouseleave.native='hide()'  class='dat da'></datee>
                        <p>~</p>
                        <input type="text" v-model="ke.end_date" @focus='focu3()' readonly="true" style="margin: 0"/>
                        <datee v-if='date_s3' v-on:incrementt="incrementTi3"  @mouseleave.native='hide()'  class='dat da'></datee>
                      </span>
                  </div>
                  <div style="margin: 15px 0 25px;">
                    <span>grid列表</span> 
                    <input type="text" @click="listen3" style="width:220px;position:relative;" v-model="cb_definiteSear"  />
                  </div>
                  <div class="grid_list"  @mouseleave="listenhide3" style="width:230px;height: 300px; position:absolute; z-index: 999;left:10px;top:110px; background: #edf2f5" v-show="listentype3">
                    <ul v-show="biao.length != 0" >
                        <li v-for='(it,index) in listenlist3'  :key='index' @click="cb_chooseAdd(it)" style="text-align:center;margin:5px 0;">{{it.grid_name}}</li>
                    </ul>
                    <p v-show="biao.length == 0" style="display: block;margin: 80px auto;text-align: center; font-size: 20px">暂无数据</p>
                                   
                    <pagination   :number='pageCount' v-on:increment="cb_incrementTotal2" :page-index='pagePresent' style="background: #edf2f5"></pagination>  
                  </div>
              </span>
            </p>
            <div id="myChart2" :style="{width: '80%', height: '500px', float: 'left', marginLeft: '10%'}" class='mar20'></div>
        </div>
    </div>
</template>
<script>
import axioIn from "../store/axioIn";
import axios from "axios";
import Pagination from "./pageDevice";
let echarts = require("echarts/lib/echarts")
import Datee from "./date";
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require("echarts/lib/component/legendScroll")
export default {
  name: "lineStation",
  components: { Datee, Pagination },
  data: function() {
    return {
      pageCount: "",
      listentype1:false,
      listentype2:false,
      listentype3:false,
      cb_pageCount: "",
      kh_pageCount: "",
      definiteSear: "",
      pagePresent: "",
      cb_pagePresent: "",
      kh_pagePresent: "",
      cb_definiteSear:"",
      kh_definiteSear:"",
      definiteGrid: "",
      cb_definiteGrid: "",
      kh_definiteGrid: "",
      trade: {
        backgroundColor: "#fff",
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["合同金额","grid流量"]
        },
        calculable: true,
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "60%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "outer"
                },
                textStyle: {
                  border: "1px solid black",
                  color: "rgba(255, 255, 255, 0.3)"
                },
                labelLine: { show: false }
              }
            },
            data: [{ value: 0, name: "合同金额" }, { value: 0, name: "grid流量" }]
          }
        ]
      },
      trade1: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "right",
          data: ["正式客户"]
        },
        calculable: true,
        series: [
          {
            name: "",
            type: "pie",
            radius: "55%",
            
            center: ["50%", "60%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  position: "outer"
                },
                labelLine: { show: false }
              }
            },
            data: [{ value: 0, name: "正式客户" }]
          }
        ]
      },
      trade2: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}"
        },
        legend: {
          x: "left",
          data: []
        },
        xAxis: [
          {
            type: "category",
            name: "x",
            splitLine: { show: false },
            data: ["2016/1/1", "2016/1/2", "2016/1/3"]
            //min:new Date('2017/01/01'),
            //max:new Date('2017/01/09')
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "y"
            //data:['2','3','4','5']
          }
        ],
        calculable: false,
        series: [
          {
            name: "",
            type: "line",
            data: [0, 0, 0],
            label: {
              normal: {
                show: true
              }
            }
          }
        ]
      },
      deploy: {},
      guest: {},
      pp: 0,
      pp1: 0,
      me: "",
      me1: "",
      mes: "",
      date_s: false,
      date_s1: false,
      date_s2: false,
      date_s3: false,
      date_s4: false,
      date_s5: false,
      item: [],
      itee: [],
      deployy: [
        { value: "公有云", a1: false, id: "2" },
        { value: "专属云", a1: false, id: "3" },
        { value: "标准版", a1: false, id: "1" },
        { value: "私有云", a1: false, id: "4" }
      ],
      industry: [],
      indushow: false,
      start_date: "",
      end_date: "",
      deplo: { deploy_way: "0", date: "" },
      gues: { grid_id: "0", roletype: "0" },
      ke: { start_date: "", end_date: "" },
      listen: { start_date: "", end_date: "" },
      biao: [],
      cb_biao: [],
      kh_biao: [],
      today: "",
      initData: "name"
      //number:''
    };
  },
  mounted: function() {
    this.drawLine();
    this.drawLine1();
    this.draw();
    var aa = (this.today = new Date());
    var bb = aa.getFullYear() + "-" + (aa.getMonth() + 1) + "-" + aa.getDate();
    var agoW = new Date();
    agoW.setDate(agoW.getDate()-30);
        // var weekAgo = new Date().setDate(agoW);
    var agoMon = agoW.getFullYear()+'-'+(agoW.getMonth()+1)+'-'+agoW.getDate();
    this.deplo.date = this.gues.date = this.ke.start_date = this.ke.end_date = bb;
    this.ke.start_date=agoMon

  axioIn
      .get("/api/product/grid/") //所属行业
      .then(res => {
        /*console.log(res.data);*/
        this.pageCount = res.data.page_num.total_page;
        this.pagePresent = 1;
        this.biao = res.data.results;
        this.cb_pageCount = res.data.page_num.total_page;
        this.cb_pagePresent = 1;
        this.cb_biao = res.data.results;
        this.kh_pageCount = res.data.page_num.total_page;
        this.kh_pagePresent = 1;
        this.kh_biao = res.data.results;
      });
    axioIn
      .get("/api/data/contract_amount/date=" + bb)
      .then(res => {
        let aa = res.data.data.filter(n => n.value > 0);
        if (aa.length !== 0) {
          this.trade.calculable = false;
        } else {
          this.trade.calculable = true;
        }
        this.trade.series[0].data = res.data.data;
        this.trade.legend.data = res.data.data.map(v => v.name);
        this.drawLine();
        this.pp = res.data.total;
      });
    axioIn.get("/api/data/customer_nature_matching").then(res => {
      let arr = [];
      console.log(res);
      Object.keys(res.data).forEach(key => {
        arr.push({
          name: key,
          value: res.data[key]
        });
      });

      let aa = arr.filter(n => n.value > 0);
      if (aa.length !== 0) {
        this.trade1.calculable = false;
      } else {
        this.trade1.calculable = true;
      }

      this.trade1.series[0].data = arr;
      this.trade1.legend.data = arr.map(v => v.name);
      this.drawLine();
      this.pp1 = res.data.total;
    });
  },
  computed:{
        listenlist1() {
            let data = []
            let Sear_val = this.kh_definiteSear.toLocaleLowerCase().trim()
            for (let i in this.kh_biao) {
                let newArr = this.kh_biao[i]
                if (newArr.grid_name.indexOf(Sear_val) >= 0) {
                    data.push(newArr)
                }
            }
            return data
        },
              listenlist2() {
            let data = []
            let Sear_val = this.definiteSear.toLocaleLowerCase().trim()
            for (let i in this.biao) {
                let newArr = this.biao[i]
                if (newArr.grid_name.indexOf(Sear_val) >= 0) {
                    data.push(newArr)
                }
            }
            return data
        },
              listenlist3() {
            let data = []
            let Sear_val = this.cb_definiteSear.toLocaleLowerCase().trim()
            for (let i in this.cb_biao) {
                let newArr = this.cb_biao[i]
                if (newArr.grid_name.indexOf(Sear_val) >= 0) {
                    data.push(newArr)
                }
            }
            return data
        },
  },
  methods: {
    listen1(){
      this.listentype1=true;
      this.kh_definiteSear='';
    },
    listen2(){
      this.listentype2=true;
      this.definiteSear='';
    },
    listen3(){
      this.listentype3=true;
      this.cb_definiteSear='';
    },
    listenhide1(){
      this.listentype1=false;
    },
    listenhide2(){
      this.listentype2=false;
    },
      listenhide3(){
      this.listentype3=false;
    },
    incrementTotal2(n) {
      axioIn.get("/api/product/grid/?page=" + n).then(res => {
        this.pageCount = res.data.page_num.total_page;
        this.pagePresent = n;
        this.biao = res.data.results;
      });
    },
    cb_incrementTotal2(n) {
      axioIn.get("/api/product/grid/?page=" + n).then(res => {
        this.cb_pageCount = res.data.page_num.total_page;
        this.cb_pagePresent = n;
        this.cb_biao = res.data.results;
      });
    },
    kh_incrementTotal2(n) {
      axioIn.get("/api/product/grid/?page=" + n).then(res => {
        this.kh_pageCount = res.data.page_num.total_page;
        this.kh_pagePresent = n;
        this.kh_biao = res.data.results;
      });
    },
    chooseAdd(item) {
      console.log(item);
      this.definiteSear = item.grid_name;
      this.definiteGrid = item.id;
      this.search_industry();
      this.listentype2=false;      
    },
    kh_chooseAdd(item) {
      console.log(item);
      this.kh_definiteSear = item.grid_name;
      this.kh_definiteGrid = item.id;
      this.search_bu();
      this.listentype1=false;

    },
    cb_chooseAdd(item){
      this.cb_definiteSear = item.grid_name;
      this.cb_definiteGrid = item.id;
      this.search_char();
      this.listentype3=false;
    },
    draw(){
      let myChart = echarts.init(document.getElementById("myChart"));
      myChart.setOption(this.trade);
    },
    drawLine: function() {

      let myChart1 = echarts.init(document.getElementById("myChart1"));
      myChart1.setOption(this.trade1);
    },
    drawLine1: function() {
      let myChart2 = echarts.init(document.getElementById("myChart2"));
      myChart2.setOption(this.trade2);
    },
    add: function() {
      this.trade.series[0].data = [
        { value: 22, name: "12e" },
        { value: 22, name: "ee3" },
        { value: 22, name: "e2e" }
      ];
      this.drawLine();
      /*var myChart = echarts.init(document.getElementById('myChart'));
            myChart. setOption({
                series: [{
                    type:'pie',
                data:[
                    {value:122,name:'eee'},
                    {value:233,name:'eae'},
                    {value:322,name:'ewe'},
                    {value:4222,name:'e1e'}
                ]  }],
                //notMerge:true
            })*/
    },
    incrementTi: function(a) {
      this.deplo.date = a;
      if (new Date(a) > this.today) {
        alert("不能选择未来日期");
        this.deplo.date = "";
      }
    },
    incrementTi1: function(a) {
      this.gues.date = a;
      if (new Date(a) > this.today) {
        alert("不能选择未来日期");
        this.gues.date = "";
      }
    },
    incrementTi2: function(a) {
      this.ke.start_date = a;
      if (new Date(a) > this.today) {
        alert("不能选择未来日期");
        this.ke.start_date = "";
      }
      this.search_char();
    },
    incrementTi3: function(a) {
      this.ke.end_date = a;
      alert(this.listentype3);
      if (new Date(a) > this.today) {
        alert("不能选择未来日期");
        this.ke.end_date = "";
      }
      this.search_char();
    },
    incrementTi4: function(a) {
      this.listen.start_date = a;
      if (new Date(a) > this.today) {
        alert("不能选择未来日期");
        this.listen.start_date = "";
      }
    },
    incrementTi5: function(a) {
      this.listen.start_date = a;
      if (new Date(a) > this.today) {
        alert("不能选择未来日期");
        this.listen.start_date = "";
      }
    },
    hide: function() {
      this.date_s = false;
      this.date_s1 = false;
      this.date_s2 = false;
      this.date_s3 = false;
    },
    focu: function() {
      this.date_s = true;
    },
    focu1: function() {
      this.date_s1 = true;
    },
    focu2: function() {
      this.date_s2 = true;
      this.listentype3 = false;
    },
    focu3: function() {
      this.date_s3 = true;
      this.listentype3 = false;
    },

    blurr1: function() {},

    choose: function(index) {
      this.industry.map(n => (n.a1 = false));
      this.industry[index].a1 = true;
    },
    choose1: function(index) {
      this.deployy.map(n => (n.a1 = false));
      this.deployy[index].a1 = true;
    },
    add_char: function() {
      if (this.item.length > 9) {
        alert("最多添加10个指数");
        return;
      } else {
        var aa;
        var bb;
        var cc;
        var dd;
        this.industry.map(n => {
          if (n.a1 === true) {
            aa = n.industry;
            dd = n.id;
          }
        });
        this.deployy.map(n => {
          if (n.a1 === true) {
            bb = n.value;
            cc = n.id;
          }
        });
        if (aa === undefined && bb === undefined) {
          return;
        } else if (
          aa === undefined &&
          this.item.indexOf(bb) < 0 &&
          this.itee.indexOf(cc) < 0
        ) {
          this.item.push(bb);
          this.itee.push("0|" + cc);
        } else if (
          bb === undefined &&
          this.item.indexOf(aa) < 0 &&
          this.itee.indexOf(dd) < 0
        ) {
          this.item.push(aa);
          this.itee.push(dd + "|0");
        } else if (aa !== undefined && bb !== undefined) {
          if (this.item.indexOf(aa + "|" + bb) < 0) {
            this.item.push(aa + "|" + bb);
          } else {
            alert("不能添加重复指数");
          }
          if (this.itee.indexOf(dd + "|" + cc) < 0) {
            this.itee.push(dd + "|" + cc);
          }
        } else {
          alert("不能添加重复指数");
        }
      }
    },
    delet_ex: function(index) {
      this.item.splice(index, 1);
      this.itee.splice(index, 1);
    },

    lose_focu: function(index) {
      this.indushow = false;
      this.industry.map(n => (n.a1 = false));
      this.deployy.map(n => (n.a1 = false));
    },
    search_bu: function() {
      if (this.deplo.deploy_way === "" || this.deplo.date === "") {
        alert("请完善输入信息");
      } else {
        axioIn
          .get(
            "/api/data/contract_amount/?grid=" +
              this.kh_definiteGrid)
          .then(res => {
           let arr=[];
           Object.keys(res.data).forEach(key => {
                    arr.push({
                      name:key,
                      value:res.data[key]
                    })
            });
           
            let aa = arr.filter(n => n.value > 0);
            if (aa.length !== 0) {
              this.trade.calculable = false;
            } else {
              this.trade.calculable = true;
            }
            this.trade.series[0].data = arr;
            this.trade.legend.data = arr.map(item=>item.name);
            this.draw();
            // this.pp = res.data.total;
          });
      }
    },
    search_industry: function() {
      if (this.definiteGrid === "") {
        alert("请先选择grid");
      } else {
        axioIn
          .get(
            "/api/data/customer_nature_matching?grid=" +
              this.definiteGrid +
              "&nature=" +
              this.gues.roletype
          )
          .then(res => {
            let arr = [];
            let arr1=[];
            var keys = Object.keys(res.data).forEach(key => {
                    arr.push({
                      'name':key,
                      'value':res.data[key]
                    })
        
            });

            
            
            let aa = arr.filter(n => n.value > 0);
            if (aa.length !== 0) {
              this.trade1.calculable = false;
            } else {
              this.trade1.calculable = true;
            }
            this.trade1.series[0].data = arr;
            this.trade1.legend.data = arr.map(v => v.name);
            this.drawLine();
            this.pp1 = res.data.total;
          });
      }
    },
 
    search_char: function() {
      if(this.cb_definiteSear==''){
        alert('请先选择grid')
        return
      }
      var aa = this.ke.start_date.split("-");
      var bb = this.ke.end_date.split("-");
      var aad = new Date(aa[0], aa[1], aa[2]);
      var bbd = new Date(bb[0], bb[1], bb[2]);
      aad.setMonth(aad.getMonth() + 2);
      if (aad < bbd) {
        alert("开始时间和结束时间不能超过2个月");
      } else if (this.ke.start_date === "" || this.ke.end_date === "") {
        alert("开始时间和结束时间为必填");
      } else {
        let aai = [];
        aai.push(this.ke.start_date.replace(/-/g, "/")); //console.log(aai[aai.length-1])
        for (
          let i = 1;
          new Date(aai[aai.length - 1]) <
          new Date(this.ke.end_date.replace(/-/g, "/"));
          i++
        ) {
          let a = new Date(this.ke.start_date);
          a.setDate(a.getDate() + i);
          // console.log(a)
          aai.push(a.toLocaleDateString());
        }
        //console.log(aai)
        this.trade2.xAxis[0].data = aai;
        //let aa='';
        //console.log(aa)
        axioIn
          .get(
            "/api/data/cost_statistics/?grid=" +this.cb_definiteSear
               +
              "&start_date=" +
              this.ke.start_date +
              "&end_date=" +
              this.ke.end_date
          )
          .then(res => {
            let arr=[];
            Object.keys(res.data).forEach(function (key) {
              arr.push({
                name:key,
                value:res.data[key]
              })
        });
          
            this.trade2.series[0].data = arr.map(item=>item.value);
            this.drawLine1();
          });
      }
    },
    expor: function() {
      if (this.deplo.date === "") {
        alert("日期不可为空");
      } else {
        window.open(
          "api/data/online-client/industry_csv/?deploy_way=" +
            this.deplo.deploy_way +
            "&date=" +
            this.deplo.date
        );
      }

      if (this.gues.date === "") {
        alert("日期不可为空");
      } else {
        window.open(
          "api/data/online-client/deploy_way_csv/?industry=" +
            this.gues.industry +
            "&date=" +
            this.gues.date
        );
      }
    },
    export1: function() {
      if (this.itee.length === 0) {
        alert("指数不可为空");
        return;
      }
      let aa = this.itee.join("&idpy=");
      if (this.ke.start_date === "" || this.ke.end_date === "") {
        alert("开始时间和结束时间为必填");
      } else {
        window.open(
          "api/data/online-client/trend_csv/?idpy=" +
            aa +
            "&start_date=" +
            this.ke.start_date +
            "&end_date=" +
            this.ke.end_date
        );
      }
    }
  },
  watch:{
    'gues.roletype'(res){
      this.search_industry();
    },
 
  }
};
</script>

<style lang='scss' scoped>
.lineStation {
  .ji {
    width: 442px;
    float: left;
    height: 100%;
    margin: 0;
    position: relative;
  }
  .select_container {
    width: 100%;
    height: 35px;
    margin: 5px auto;
    display: flex;
    justify-content: space-between;
    label{
      line-height: 35px;
    }
  }
  .jii {
    width: 20%;
    display: inline-block;
    display: flex;
    justify-content: space-between;
    label {
      display: inline-block;
      text-align: right;
      line-height: 35px;
      margin: 0;
      padding: 0;
      font-size: 12px;
      width: 30%;
      overflow: hidden;
    }
    select,
    input {
      border-radius: 5px;
      border: 1px solid gray;
    }
    select {
      height: 34px;
      margin-left: 15%;
      width: 60%;
      overflow: hidden;
      option {
        padding: 4px;
      }
    }
    input {
      width: 290px;
      height: 32px;
      margin: 0;
      padding: 0 5px;
    }
    .so {
      margin: 0;
    }
  }
  .jii:nth-child(1) {
    width: 50%;
  }
  .dat {
    // left: 95px !important;
  }
  .out {
    position: absolute;
    right: 120px;
    top: 10px;
    height: 34px;
    line-height: 34px;
    color: white;
    width: 80px;
    background-color: rgba(3, 124, 240, 1);
    border-radius: 5px;
    text-align: center;
  }
  .chart {
    width: 100%;
    height: 400px;
    background-color: white;
    position: relative;
    overflow: hidden;
  }
  .tipp {
    margin-top: 10px;
    background-color: white;
    text-align: left;
    height: 54px;
    position: relative;
    border-bottom: 1px solid #edf2f5;
    span {
      display: inline-block;
      width: 170px;
      height: 34px;
      cursor: pointer;
      text-align: center;
      background-color: rgba(245, 245, 245, 1);
      line-height: 34px;
      margin: 10px 20px;
      border-radius: 5px;
    }
  }
  .sactiv {
    color: rgba(3, 124, 240, 1);
  }
  .expon {
    display: inline-block;
    background-color: #f5f5f5;
    margin: 0 5px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    padding-left: 8px;
  }
  .cloi {
    width: 28px;
    height: 19px;
    display: inline-block;
    background: url(../assets/close.png) no-repeat 10px 10px;
  }
  .serviceAddress {
    display: inline-block;
    box-sizing: border-box;
    width: 90%;
    height: 90%;
    position: relative;
    margin: 5%;
    padding: 10px 20px;
    z-index: 10;
    background: #fff;
    box-shadow: 0 0 5px #ccc;
    border-radius: 3px;
    .grid_list {
      margin: 0 10% 0 22%;
      width: 65%;
      border: 1px solid #999;
      box-shadow: 0 0 5px #999999;
      overflow: hidden;
      border-radius: 5px;
    }
    .search {
      margin: 0;
      input {
        width: 250px;
        padding-right: 35px;
        background: #fafafa;
        border: 1px solid #ccc;
      }
    }
    .choose {
      margin: 0;
      font-size: 14px;
      line-height: 26px;
    }
    ul {
      overflow-y: scroll;
      width: 110%;
      height: calc(100% - 40px);
      margin-top: 5px;
    }
    ul li {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 26px;
      cursor: pointer;
      color: #666;
      font-size: 12px;
    }
    ul li:hover {
      background: #edf2f5;
    }
    .pagination {
      width: calc(100% - 40px);
      height: 30px;
      overflow: hidden;
      // position: absolute;
      bottom: 0;
    }
  }
  .dactiv {
    color: #0386f0;
    background: url(../assets/tic.png) no-repeat right;
  }
  .indus {
    text-align: left;
    li {
      display: inline-block;
      width: 100px;
      text-align: center;
      cursor: pointer;
      margin: 5px 0;
    }
  }
  .left {
    text-align: left;
    padding: 5px 20px;
    border: 1px solid #edf2f5;
  }
  .lef {
    text-align: left;
    position: relative;
    float: left;
    width: 500px;
    margin-top: 50px;
  }
  .right {
    text-align: right;
  }
  .a1 {
    display: inline-block;
    width: 50px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #edf2f5;
    color: white;
    margin: 10px 30px;
    text-align: center;
    background-color: #0386f0;
    border-radius: 5px;
  }
  .cho {
    margin-right: 30px;
  }
  .time {
    width: calc(100% - 72px);
    position: relative;
    border: 1px solid gray;
    display: inline-block;
    display: flex;
    justify-content: space-between;
    p{
      display: inline-block;
      line-height: 32px;
    }
    input {
      width: 80px;
      height: 32px;
      border: 0;
      padding-left: 5px;
    }
    .da {
      left: 0 !important;
      top: 40px !important;
    }
  }
}
</style>

