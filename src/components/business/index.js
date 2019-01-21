/*
 * @Author: liuqian 
 * @Date: 2018-08-06 16:54:08 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-10-31 10:55:05
 */
import {
  mapGetters
} from 'vuex';
import axioIn from "../../store/axioIn";
import Router from "../../router/index";
let echarts = require("echarts/lib/echarts")
// require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
// require("echarts/lib/component/legendScroll")
export default {
    name: 'business',
    data () {
        return {
            pvtrade:{
               tooltip: {
                  trigger: "axis",
                  //  formatter: "{a} <br/>{b} : {c}"
                  formatter: function (params, ticket, callback) {
                    if(params.length === 1){
                      return params[0].seriesName+'<br />'+params[0].name+': '+params[0].value;
                    }else{
                      var a = params[0].name.split('与');var b1 = params[0].color;var b2 = params[1].color;
                      return params[0].seriesName+'<br />'+'<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+b1+';"></span>  '+a[0]+': '+params[0].value+'<br />'+'<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+b2+';"></span>  '+a[1]+': '+params[1].value;
                    }
                  },
                  backgroundColor: '#fff',
                  padding: 10,
                  textStyle: {
                    color: '#666'
                  },
                  extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);text-align: left;'
               },
               color: ['#75b9ff','#00f0f1','#bc84ff','#ffb578','#97b553'],
               legend: {
                   x: 'center',
                   bottom: 5,
                   data: []
               },
               xAxis: [
                   {
                       type: "category",
                       boundaryGap : false,
                       splitLine: {show: false},
                       data:['2016/1/1','2016/1/2','2016/1/3']
                   }
               ],
               yAxis: [
                   {
                       type: "value"
                   }
               ],
               calculable:false,
               series: [
                  {
                       name: "",
                       type: "line",
                       smooth: true,
                       areaStyle: {},
                       data: [0,0,0]
                  },
               ]
            },
            uvtrade:{
                tooltip: {
                    // trigger: "item",
                    trigger: "axis",
                    formatter: function (params, ticket, callback) {
                      if(params.length === 1){
                        return params[0].seriesName+'<br />'+params[0].name+': '+params[0].value;
                      }else{
                        var a = params[0].name.split('与');var b1 = params[0].color;var b2 = params[1].color;
                        return params[0].seriesName+'<br /><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+b1+';"></span>  '+a[0]+': '+params[0].value+'<br /><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+b2+';"></span>  '+a[1]+': '+params[1].value;
                      }
                    },
                    backgroundColor: '#fff',
                    padding: 10,
                    textStyle: {color: '#666'},
                    extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);text-align: left;'
                },
                color: ['#75b9ff','#00f0f1','#bc84ff','#ffb578','#97b553'],
                legend: {
                  x: 'center',
                  bottom: 5,
                  data: []
                },
                xAxis: [{
                  type: "category",
                  boundaryGap : false,
                  splitLine: {show: false},
                  smooth: true,
                  areaStyle: {},
                  data:['2016/1/1','2016/1/2','2016/1/3']
                }],
                yAxis: [{
                  type: "value"
                }],
                calculable:false,
                series: [
                  {
                    name: "",
                    type: "line",
                    smooth: true,
                    areaStyle: {},
                    data: [0,0,0]
                  },
                ]
            },
           parameterSearch: {company_id: '',startDate: []},
           company_name: '',//企业名称
           default_date: [],
           pickPv: '',
           pickUv: '',
           forbidCom: false,// 控制对比按钮的禁用与否
           pickerOptions: {
            disabledDate(time) {
              return time.getTime() > Date.now();
            }
           },
           cutPort: '/api/data/company_data/',
           vertion: '',

           //echarts Dom
           pvChart:'',
           uvChart:'',
        }
    },
    props: {
      versionMess:{
        type: String
      }
    },
    computed: {
      ...mapGetters(['getVersion']),
      'cutVersion' () {
        return this.getVersion;
      }
    },
    mounted () {

        this.vertion = this.$store.state.versionInfo || window.sessionStorage.getItem('vertion');
      if(this.vertion){
        if(this.vertion == 1){
          this.cutPort = '/api/data/company_data/'
        }else if(this.vertion == 0){
          this.cutPort = '/api/data/jd_company_data/'
        }
      }else{
        this.cutPort = '/api/data/jd_company_data/'
      }
        var today=new Date();
        var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
        var agoThree = new Date();
        agoThree.setDate(agoThree.getDate()-6);
        var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
        this.parameterSearch.startDate.push(formatThr); this.parameterSearch.startDate.push(formatToday);
        this.getChart_infor('all',formatThr,formatToday);
        this.$nextTick(function () {
          window.screenTop = 0;
        });

        /*
        * 动态get当前页面的宽度 驱使echarts 变化
        */
        window.addEventListener('resize',  ()=>{
            this.pvChart.resize();
            this.uvChart.resize();

        })
    },
    watch: {
      // pickPv () {
      //   if(this.pickPv === true){
      //     if(this.parameterSearch.startDate.length===0){//说明是没有检索的情况下，对比的
      //       var today=new Date();
      //       var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
      //       var agoThree = new Date();
      //       agoThree.setDate(agoThree.getDate()-6);
      //       var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
      //       this.compareWeek_pv(formatThr,formatToday)
      //     }else if(this.parameterSearch.startDate.length===2){//说明是检索的情况下，对比的
      //       this.compareWeek_pv(this.parameterSearch.startDate[0],this.parameterSearch.startDate[1],this.parameterSearch.company_id);
      //     }
      //   }else{
      //     if(this.parameterSearch.startDate.length===0){//说明是没有检索的情况下，对比的
      //       var today=new Date();
      //       var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
      //       var agoThree = new Date();
      //       agoThree.setDate(agoThree.getDate()-6);
      //       var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
      //       console.log('dddd');this.getChart_infor('pv',formatThr,formatToday)
      //     }else if(this.parameterSearch.startDate.length===2){//说明是检索的情况下，对比的
      //       console.log('ccccc');this.getChart_infor('pv',this.parameterSearch.startDate[0],this.parameterSearch.startDate[1],this.parameterSearch.company_id);
      //     }
      //   }
      // },
      // pickUv () {
      //   if(this.pickUv === true){
      //     if(this.parameterSearch.startDate.length===0){//说明是没有检索的情况下，对比的
      //       var today=new Date();
      //       var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
      //       var agoThree = new Date();
      //       agoThree.setDate(agoThree.getDate()-6);
      //       var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
      //       this.compareWeek_uv(formatThr,formatToday)
      //     }else if(this.parameterSearch.startDate.length===2){//说明是检索的情况下，对比的
      //       this.compareWeek_uv(this.parameterSearch.startDate[0],this.parameterSearch.startDate[1],this.parameterSearch.company_id);
      //     }
      //   }else{
      //     if(this.parameterSearch.startDate.length===0){//说明是没有检索的情况下，对比的
      //       var today=new Date();
      //       var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
      //       var agoThree = new Date();
      //       agoThree.setDate(agoThree.getDate()-6);
      //       var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
      //       console.log('hhhh');this.getChart_infor('uv',formatThr,formatToday)
      //     }else if(this.parameterSearch.startDate.length===2){//说明是检索的情况下，对比的
      //       console.log('nnnn');this.getChart_infor('uv',this.parameterSearch.startDate[0],this.parameterSearch.startDate[1],this.parameterSearch.company_id);
      //     }
      //   }
      // },
      'cutVersion':function (newValue,oldValue) {
        if(newValue){
          if(newValue == 1){
            this.cutPort = '/api/data/company_data/'
          }else if(newValue == 0){
            this.cutPort = '/api/data/jd_company_data/'
          }
        }else{
          this.cutPort = '/api/data/jd_company_data/'
        }
        if(this.parameterSearch.startDate.length === 0){
          var today=new Date();
          var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
          var agoThree = new Date();
          agoThree.setDate(agoThree.getDate()-6);
          var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
          this.pickPv = false;this.pickUv = false;
          this.getChart_infor('all',formatThr,formatToday);
          this.$nextTick(function () {
            window.screenTop = 0;
          });
        }else{
          let begin = this.parameterSearch.startDate[0];
          let over = this.parameterSearch.startDate[1];
          var diff =parseInt((new Date(over) - new Date(begin))/1000/60/60/24);
          if(diff>6){
            this.forbidCom = true;
          }else{
            this.forbidCom = false;
          }
          this.pickPv = false;this.pickUv = false
          this.getChart_infor('all',begin,over,this.parameterSearch.company_id)
        }
      },
    },
    methods: {
      comparePv () {
        if(this.pickPv === true){
          if(this.parameterSearch.startDate.length===0){//说明是没有检索的情况下，对比的
            var today=new Date();
            var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
            var agoThree = new Date();
            agoThree.setDate(agoThree.getDate()-6);
            var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
            this.compareWeek_pv(formatThr,formatToday)
          }else if(this.parameterSearch.startDate.length===2){//说明是检索的情况下，对比的
            this.compareWeek_pv(this.parameterSearch.startDate[0],this.parameterSearch.startDate[1],this.parameterSearch.company_id);
          }
        }else{
          if(this.parameterSearch.startDate.length===0){//说明是没有检索的情况下，对比的
            var today=new Date();
            var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
            var agoThree = new Date();
            agoThree.setDate(agoThree.getDate()-6);
            var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
            this.getChart_infor('pv',formatThr,formatToday)
          }else if(this.parameterSearch.startDate.length===2){//说明是检索的情况下，对比的
            this.getChart_infor('pv',this.parameterSearch.startDate[0],this.parameterSearch.startDate[1],this.parameterSearch.company_id);
          }
        }
      },
      compareUv () {
        if(this.pickUv === true){
          if(this.parameterSearch.startDate.length===0){//说明是没有检索的情况下，对比的
            var today=new Date();
            var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
            var agoThree = new Date();
            agoThree.setDate(agoThree.getDate()-6);
            var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
            this.compareWeek_uv(formatThr,formatToday)
          }else if(this.parameterSearch.startDate.length===2){//说明是检索的情况下，对比的
            this.compareWeek_uv(this.parameterSearch.startDate[0],this.parameterSearch.startDate[1],this.parameterSearch.company_id);
          }
        }else{
          if(this.parameterSearch.startDate.length===0){//说明是没有检索的情况下，对比的
            var today=new Date();
            var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
            var agoThree = new Date();
            agoThree.setDate(agoThree.getDate()-6);
            var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
            this.getChart_infor('uv',formatThr,formatToday)
          }else if(this.parameterSearch.startDate.length===2){//说明是检索的情况下，对比的
            this.getChart_infor('uv',this.parameterSearch.startDate[0],this.parameterSearch.startDate[1],this.parameterSearch.company_id);
          }
        }
      },
        compareWeek_pv (begin,over,id) {//对比上一周的PV的函数
          var diff =parseInt((new Date(over) - new Date(begin))/1000/60/60/24);
          let arr = [];
          // arr.push(begin.replace(/-/g,'\/'));
          for(let i=0;i<diff+1;i++){
              let a=new Date(begin);let b = new Date(begin)
              b.setDate(b.getDate()+i-7);
              a.setDate(a.getDate()+i);
              arr.push(a.toLocaleDateString()+'与'+b.toLocaleDateString())
          }// 横坐标的时间
          var firm_id = id ? id : '';
          let obj = {company_id: firm_id,from_date: begin,to_date: over,compare:1}
          axioIn.get(this.cutPort,{
              params: obj
          }).then(res=>{
              this.pvtrade.xAxis[0].data =  arr;
              let colorArr = this.pvtrade.color;
              res.data.con.map((n,index)=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;n.areaStyle = {
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: colorArr[index],
                  }, {
                      offset: 1,
                      color: '#fff'
                  }])
              }
              }})
              this.pvtrade.legend.data=res.data.con.map(n=>n.name);
              this.pvtrade.series = res.data.con; this.drawLinepv();// pv图 
          })
        },
        compareWeek_uv (begin,over,id) {//对比上一周的uV的函数
          var diff =parseInt((new Date(over) - new Date(begin))/1000/60/60/24);
          let arr = [];
          // arr.push(begin.replace(/-/g,'\/'));
          for(let i=0;i<diff+1;i++){
              let a=new Date(begin);let b = new Date(begin)
              b.setDate(b.getDate()+i-7);
              a.setDate(a.getDate()+i);
              arr.push(a.toLocaleDateString()+'与'+b.toLocaleDateString())
          }// 横坐标的时间
          var firm_id = id ? id : '';
          let obj = {company_id: firm_id,from_date: begin,to_date: over,compare:1}
          axioIn.get(this.cutPort,{
              params: obj
          }).then(res=>{
              this.uvtrade.xAxis[0].data =  arr;
              let colorArr = this.uvtrade.color;
              res.data.vis.map((n,index)=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;n.areaStyle = {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: colorArr[index],
                    }, {
                        offset: 1,
                        color: '#fff'
                    }])
                }
              }})
              this.uvtrade.legend.data=res.data.vis.map(n=>n.name);this.uvtrade.series = []
              this.uvtrade.series = res.data.vis; this.drawLineuv();// pv图 
              // res.data.vis.map(n=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;})
              // this.uvtrade.legend.data=res.data.vis.map(n=>n.name)
              // this.uvtrade.series = res.data.vis; this.drawLineuv();// uv图 
          })
        },
        getChart_infor (quale,start,end,id,) {//没有对比上一周的函数
            let arr = [];
            arr.push(start.replace(/-/g,'\/'));
            for(let i=1;new Date(arr[arr.length-1])<new Date(end.replace(/-/g,'\/'));i++){
                let a=new Date(start);
                a.setDate(a.getDate()+i);
                arr.push(a.toLocaleDateString())
            }// 横坐标的时间
            var firm_id = id ? id : '';
            let obj = {company_id: firm_id,from_date: start,to_date: end,compare:0}
            axioIn.get(this.cutPort,{
                params: obj
            }).then(res=>{
              this.$store.commit('setLoading', false);
              let colorArr1 = this.uvtrade.color;
              let colorArr2 = this.pvtrade.color;
              switch (quale) {
                case 'pv':
                  this.pvtrade.xAxis[0].data = arr;
                  res.data.con.map((n,index)=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;n.areaStyle = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colorArr2[index],
                        }, {
                            offset: 1,
                            color: '#fff'
                        }])
                    }}})
                  this.pvtrade.legend.data=res.data.con.map(n=>n.name);this.pvtrade.series = [];
                  this.pvtrade.series = res.data.con; this.drawLinepv();// pv图 
                  break;
                case 'uv':
                  this.uvtrade.xAxis[0].data = arr;
                  res.data.vis.map((n,index)=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;n.areaStyle = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colorArr1[index],
                        }, {
                            offset: 1,
                            color: '#fff'
                        }])
                    }
                  }})
                  this.uvtrade.legend.data=res.data.vis.map(n=>n.name);this.uvtrade.series = [];
                  this.uvtrade.series = res.data.vis; this.drawLineuv();// uv图 
                  break;
                case 'all':
                  this.pvtrade.xAxis[0].data = this.uvtrade.xAxis[0].data = arr;
                  res.data.con.map((n,index)=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;n.areaStyle = {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: colorArr2[index],
                        }, {
                            offset: 1,
                            color: '#fff'
                        }])
                    }}})
                  this.pvtrade.legend.data=res.data.con.map(n=>n.name);this.pvtrade.series = [];
                  this.pvtrade.series = res.data.con; this.drawLinepv();// pv图 
                  res.data.vis.map((n,index)=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;n.areaStyle = {
                    normal: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                              offset: 0,
                              color: colorArr1[index],
                          }, {
                              offset: 1,
                              color: '#fff'
                          }])
                      }
                    }})
                  this.uvtrade.legend.data=res.data.vis.map(n=>n.name);this.uvtrade.series = [];
                  this.uvtrade.series = res.data.vis; this.drawLineuv();// uv图 
                  break;
              }
                // this.pvtrade.xAxis[0].data = this.uvtrade.xAxis[0].data = arr;
                // res.data.con.map(n=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;})
                // this.pvtrade.legend.data=res.data.con.map(n=>n.name);this.pvtrade.series = [];
                // this.pvtrade.series = res.data.con; this.drawLinepv();// pv图 
                // res.data.vis.map(n=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;})
                // this.uvtrade.legend.data=res.data.vis.map(n=>n.name);this.uvtrade.series = [];
                // this.uvtrade.series = res.data.vis; this.drawLineuv();// uv图 
            })
        },
        inquireChart () {// 查询
            if(this.parameterSearch.company_id === '' && this.parameterSearch.startDate.length === 0){
              this.$message.error('请填写企业ID或时间');
            }else{
                let begin = this.parameterSearch.startDate[0];
                let over = this.parameterSearch.startDate[1];
                var diff =parseInt((new Date(over) - new Date(begin))/1000/60/60/24);
                if(diff>6){
                  this.forbidCom = true;
                }else{
                  this.forbidCom = false;
                }
                this.pickPv = false;this.pickUv = false;
                this.getChart_infor('all',begin,over,this.parameterSearch.company_id)
            }
        },
        drawLinepv:function(){
            this.pvChart = echarts.init(document.getElementById('firmChartpv'));
            this.pvChart.clear();
            this.pvChart.setOption(this.pvtrade)
        },
        drawLineuv:function(){
            this.uvChart  = echarts.init(document.getElementById('firmChartuv'));
            this.uvChart.clear();
            this.uvChart.setOption(this.uvtrade)
        },
        exportCompany () {//导出 this.parameterSearch.startDate[0]
          let version_type = this.$store.state.versionInfo || window.sessionStorage.getItem('vertion');
          if(!version_type)version_type = 0;
          window.open(`/api/data/channel_data/derive_enterprise/?start_date=${this.parameterSearch.startDate[0]}&end_date=${this.parameterSearch.startDate[1]}&version=${version_type}&company_id=${this.parameterSearch.company_id}`)
        }
    }
}