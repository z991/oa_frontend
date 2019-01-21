/*
 * @Author: liuqian 
 * @Date: 2018-08-03 10:54:33 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-09-18 15:46:56
 */
import axioIn from "../../store/axioIn";
import Router from "../../router/index";
let echarts = require("echarts/lib/echarts")
require('echarts/lib/chart/pie')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require("echarts/lib/component/legendScroll")
import {
  mapGetters
} from 'vuex';
export default {
    name: 'homePage',
    data () {
        return {
            tableData: [],
            isOpt: true,
            electSlot: {lateThr: true,lateWeek: false,lateMon: false},
            homoeTop: [],
            iconClass: ['singCon'],
            allChart: null,
            trendline:{
                tooltip: {
                    trigger: "axis",
                    formatter: "{a} <br/>{b} : {c}"
                },
                grid: { left: '3%',right: '4%', bottom: '12%', containLabel: true},
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
                        data:[]
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
                        // symbolSize: symbolSize,
                        data: [0,0,0]

                    },
                ]
            },
            consultPie:{
                backgroundColor: '#fff',
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ['#feb477','#1aa8fe','#00cbca','#b896e2','#ffb981','#8d99b3','#f38468','#726deb','#97b553'],
                // legend: {
                //     orient : 'vertical',
                //     itemGap: 2,
                //     x : 'right',
                //     data:['eee']
                // },
                // calculable :true,
                series:[
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        // center:['20%','60%'],
                        data:[
                            {value:0,name:'eee'},
                            {value:0,name:'1ee'},
                        ],
                        label: {formatter: "{b}: {d}%",color:'#666'}
                    }
                ]
            },
            deployLine:{
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                color: ['#75b9ff','#00f0f1','#bc84ff','#ffb578','#97b553'],
                legend: {
                    x: 'center',
                    type:'scroll',
                    bottom: 5,
                    data: []
                },
                xAxis: [
                    {
                        type: "category",
                        splitLine: {show: false},
                        boundaryGap : false,
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
                        // areaStyle: {},
                        data: [0,0,0]

                    },
                ]
            },
            deployPie:{
                backgroundColor: '#fff',
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ['#feb477','#1aa8fe','#00cbca','#b896e2','#ffb981','#8d99b3','#f38468','#726deb','#97b553'],
                legend: {
                    orient : 'vertical',
                    itemGap: 2,
                    x : 'right',
                    data:['eee']
                },
                calculable :true,
                series:[
                    {
                        name:'',
                        type:'pie',
                        radius: ['50%', '70%'],
                        // center:['20%','60%'],
                        data:[
                            {value:0,name:'eee'},
                            {value:0,name:'1ee'},
                        ],
                        label: {formatter: "{b}: {d}%",color:'#666'}
                    }
                ]
            },
            industryBar:{
              color: ['#3398DB'],
              tooltip : {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                  return `${params[0].name}: ${params[0].value}（${params[0].data.per}）`
                }
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              xAxis : [
                {
                  type : 'category',
                  data : ['Mon', 'Tue', 'Wed'],
                  axisTick: {
                      alignWithLabel: true
                  }
                }
              ],
              yAxis : [{
                type : 'value'
              }],
              series : [
                {
                  data:[{"value":1656,"per":"100.0%"},],
                  industry:["缺省"],
                  barWidth: '60%',
                  name:"咨询量",
                  type: 'bar'
                }
              ]
            },
            timeSlot: [],
            vertionHome: '',
            toggle_top: '',
            toggle_main: '',
            //echarts Dom
            trendChart:"",
            consultChart:"",
            deployChart1:"",
            deployChart2:"",
            industryChart:"",
            target: '咨询量',

        }
    },
    computed: {
      ...mapGetters(['getVersion']),
      'cutVersion' () {
        // console.log(this.getVersion)
        return this.getVersion;
      }
    },
    watch: {
      'cutVersion' (newValue,oldValue) {
        console.log(newValue)
        if(newValue){
          if(newValue == 1){
            this.toggle_top = '/api/data/home_top/';
            this.toggle_main = '/api/data/home_rest/';
          }else if(newValue == 0){//0经典版 1为重构版
            this.toggle_top = '/api/data/jd_home_top/';
            this.toggle_main = '/api/data/jd_home_rest/';
          }
        }else{
          this.toggle_top = '/api/data/jd_home_top/';
          this.toggle_main = '/api/data/jd_home_rest/';
        }
        this.isOpt = true;
        this.getHead_info();//头部的接口数据
        this.getChartdata(this.timeSlot[0],this.timeSlot[1])
      }
    },
    mounted () {

        this.vertionHome = this.$store.state.versionInfo || window.sessionStorage.getItem('vertion');
        if(this.vertionHome){
          if(this.vertionHome == 1){
            this.toggle_top = '/api/data/home_top/';
            this.toggle_main = '/api/data/home_rest/';
          }else if(this.vertionHome == 0){
            this.toggle_top = '/api/data/jd_home_top/';
            this.toggle_main = '/api/data/jd_home_rest/';
          }
        }else{
          this.toggle_top = '/api/data/jd_home_top/';
          this.toggle_main = '/api/data/jd_home_rest/';
        }
        this.getHead_info();//头部的接口数据
        var today=new Date();
        var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
        var agoThree = new Date();
        agoThree.setDate(agoThree.getDate()-2);
        var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
        this.timeSlot[0] = formatThr;this.timeSlot[1] = formatToday;
        this.getChartdata(formatThr,formatToday)// 下边图表的数据
        // this.drawConsult();

        /*
        * 动态get当前页面的宽度 驱使echarts 变化
        */
        window.addEventListener('resize',  ()=>{
            this.trendChart.resize();
            this.consultChart.resize();
            this.deployChart1.resize();
            this.deployChart2.resize();
            this.industryChart.resize();
        })

    },
    methods: {
      miliFormat (num) {
        return num && num
          .toString()
          .replace(/^\d+/, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
      },
      aa () {
        console.log('TABsss')
      },
      getHead_info () {
        axioIn.get(this.toggle_top).then(res=>{ // 头部信息
          this.homoeTop = res.data
          this.homoeTop.map((n,i)=>{
              n.total = this.miliFormat(n.total)
              n.percent = parseFloat(n.percent).toFixed(2);
              if(n.name.indexOf('咨询') !== -1){this.iconClass[i] = 'singCon';n.totalName = '咨询总量';}
              else if(n.name.indexOf('访客') !== -1){ this.iconClass[i] = 'singVis';n.totalName = '访客总量';}
              // else if(n.name.indexOf('产品') !== -1){this.iconClass[i] = 'singPro';n.totalName = '产品总量';}
              else if(n.name.indexOf('站点') !== -1){this.iconClass[i] = 'singSta';n.totalName = '站点总量';}
          })
          setTimeout(()=>{
              this.$store.commit('setLoading', false)
          },1000)
        }).catch(res => {
            this.$store.commit('setLoading', false)
        })
      },
      getChartdata (start,end) {
        let arr = [];
        arr.push(start.replace(/-/g,'\/'));
        for(let i=1;new Date(arr[arr.length-1])<new Date(end.replace(/-/g,'\/'));i++){
            let a=new Date(start);
            a.setDate(a.getDate()+i);arr.push(a.toLocaleDateString())
        }/*n.smooth = true;*/
        axioIn.get(this.toggle_main+'?from_date='+start+'&to_date='+end).then(res=>{
            setTimeout(()=>{
                this.$store.commit('setLoading', false)
            })
            this.allChart = res.data;this.tableData = this.allChart.grid;
            this.tableData.map(n=>{n.percent = n.percent+'%';}); // 节点的表格数据
            this.trendline.xAxis[0].data = this.deployLine.xAxis[0].data = arr;
            let colorArr = this.trendline.color; 
            res.data.con.map((n,index)=>{n.type = 'line';n.symbolSize = 10;n.smooth = true; n.areaStyle = {
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
            this.trendline.legend.data=res.data.con.map(n=>n.name)
            this.trendline.series = res.data.con; this.drawTrend();// 趋势总图 
            this.consultPie.series[0].data=res.data.channal;this.drawConsult();// 咨询量渠道饼图
            let colorArr2 = this.deployLine.color;
            res.data.dez.map((n,index)=>{n.type = 'line';n.symbolSize = 10;n.smooth = true; 
              // n.areaStyle = {
              //     normal: {
              //         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //             offset: 0,
              //             color: colorArr2[index],
              //         }, {
              //             offset: 1,
              //             color: '#fff'
              //         }])
              //     }
              // }
            })
            this.deployLine.legend.data=res.data.dez.map(n=>n.name)
            this.deployLine.series = res.data.dez; this.drawDeloy_line();// 部署折线图 
            this.deployPie.series[0].data=res.data.deploy;this.drawDeloy_pie();// 部署饼图
            if(res.data.industry[0].data.length === 1){res.data.industry.map(n=>{n.barWidth = '20%';})}
            else{res.data.industry.map(n=>{n.barWidth = '';})}
            res.data.industry.map(n=>{n.type = 'bar';});this.industryBar.series = res.data.industry;
            this.industryBar.xAxis[0].data = res.data.industry[0].industry;this.drawIndustry()// 行业柱状图
        })
      },
      drawTrend () {
          this.trendChart = echarts.init(document.getElementById('trendChart'));
          this.trendChart.setOption(this.trendline)
      },
      drawConsult () {
        this.consultChart = echarts.init(document.getElementById('consultChart'));
        this.consultChart.setOption(this.consultPie)
      },
      drawDeloy_line () {
        this.deployChart1 = echarts.init(document.getElementById('deployChart1'));
        this.deployChart1.setOption(this.deployLine)
      },
      drawDeloy_pie () {
        this.deployChart2 = echarts.init(document.getElementById('deployChart2'));
        this.deployChart2.setOption(this.deployPie)
      },
      drawIndustry () {
        this.industryChart = echarts.init(document.getElementById('industryChart'));
        this.industryChart.setOption(this.industryBar)
      },
      lateThr () {//近三天
        for(var attr in this.electSlot){
          this.electSlot[attr] = false;
        }
        this.electSlot.lateThr = true;this.isOpt = true
        var today=new Date();
        var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
        var agoThree = new Date();
        agoThree.setDate(agoThree.getDate()-2);
        var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
        this.timeSlot[0] = formatThr;this.timeSlot[1] = formatToday;
        this.getChartdata(formatThr,formatToday)// 下边图表的数据
      },
      lateWeek () {
        Object.keys(this.electSlot).map(n=>{
          this.electSlot[n] = false;
        })
        this.electSlot.lateWeek = true;this.isOpt = true
        var today=new Date();
        var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
        var agoWeek = new Date();
        agoWeek.setDate(agoWeek.getDate()-6);
        var formatWeek = agoWeek.getFullYear()+'-'+(agoWeek.getMonth()+1)+'-'+agoWeek.getDate();// 获取三天前的日期
        this.timeSlot[0] = formatWeek;this.timeSlot[1] = formatToday;
        this.getChartdata(formatWeek,formatToday)// 下边图表的数据
      },
      lateMon () {
        for(var attr in this.electSlot){
          this.electSlot[attr] = false;
        }
        this.electSlot.lateMon = true;this.isOpt = true
        var today=new Date();
        var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
        var agoMonth = new Date();
        agoMonth.setDate(agoMonth.getDate()-29);
        var formatMonth = agoMonth.getFullYear()+'-'+(agoMonth.getMonth()+1)+'-'+agoMonth.getDate();// 获取三天前的日期
        this.timeSlot[0] = formatMonth;this.timeSlot[1] = formatToday;
        this.getChartdata(formatMonth,formatToday)// 下边图表的数据
      },
      changeIndex(target) {
        this.target = target;
        if(target === '咨询量') {
            this.cutConsult();
        }else {
            this.cutVisitor();
        };
      },
      cutConsult () {
        this.isOpt = true
        // this.trendline.xAxis[0].data = arr;
        let colorArr = this.trendline.color;
        this.allChart.con.map((n,index)=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;n.areaStyle = {
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
        this.trendline.legend.data=this.allChart.con.map(n=>n.name)
        this.trendline.series = this.allChart.con; this.drawTrend();// 趋势总图咨询量
      },
      cutVisitor () {
        this.isOpt = false
        // this.trendline.xAxis[0].data = this.deployLine.xAxis[0].data = arr;
        let colorArr = this.trendline.color;
        this.allChart.vis.map((n,index)=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;n.areaStyle = {
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
        this.trendline.legend.data=this.allChart.vis.map(n=>n.name);
        this.trendline.series = this.allChart.vis; this.drawTrend();// 趋势总图 
      },
      general_trend () {//趋势总图
        this.$store.commit('setActiveIndex', "/business");
        window.sessionStorage.setItem('activeIndex', "/business");
        Router.push({ path: "/business" });
      },
      consult_ditch () {//咨询量渠道占比图
        this.$store.commit('setActiveIndex', "/Openinstall" );
        window.sessionStorage.setItem('activeIndex', "/Openinstall");
        Router.push({ path: "/Openinstall" });
      },
      node_consult () {//节点咨询量
        this.$store.commit('setActiveIndex', "/GrideList");
        window.sessionStorage.setItem('activeIndex', "/GrideList");
        Router.push({ path: "/GrideList" });
      },
      industry_consult () {//行业咨询量
        this.$store.commit('setActiveIndex', "/industryStation" );
        window.sessionStorage.setItem('activeIndex', "/industryStation");
        Router.push({ path: "/industryStation" });
      }
    }
}