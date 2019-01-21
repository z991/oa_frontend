/*
 * @Author: liuqian 
 * @Date: 2018-08-09 10:05:28 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-11-09 10:51:14
 */
import {
  mapGetters
} from 'vuex';
import axioIn from "../../store/axioIn";
import Router from "../../router/index";
let echarts = require("echarts/lib/echarts")
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
    name: 'industryStation',
    data () {
      return {
        inquiries_line:{
          tooltip: {
            trigger: "axis",
            // position: ['50%', 50]
            position: function (pos, params, dom, rect, size) {
              return [pos[0]+50,pos[1]-100];
            },
          },
          color: ['#75b9ff','#00f0f1','#bc84ff','#ffb578','#97b553'],
          legend: {
            type:'scroll',
            x: 'center',
            bottom: 0,
            selectedMode: false,
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
              areaStyle : {},
              data: [0,0,0]
            }
          ]
        },
        industryNum_Pie:{
          backgroundColor: '#fff',
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color: ['#f2e157','#95b550','#31c5c7','#b6a2df','#5bb1ee','#ffb981','#d97a80','#8d98b4'],
          series:[
            {
              name:'',
              type:'pie',
              radius : '55%',
              center: ['50%', '50%'],
              data:[
                  {value:0,name:'eee'},
                  {value:0,name:'1ee'},
              ],
              roseType: 'radius',
              label: {formatter: "{b}: {d}%",color:'#666'}
            }
          ]
        },
        deploy_Pie:{
          backgroundColor: '#fff',
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color: ['#feb477','#1aa8fe','#00cbca','#b896e2','#ffb981','#8d99b3','#f38468','#726deb','#97b553'],
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
        customerLine:{
          tooltip: {
            trigger: "axis",
            // formatter: "{a} <br/>{b} : {c}"
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
              // splitLine: {show: false},
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
              areaStyle : {},
              data: [0,0,0]
            },
          ]
        },
        stationLine:{
          tooltip: {
            trigger: "axis",
            // formatter: "{a} <br/>{b} : {c}"
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
              areaStyle : {},
              data: [0,0,0]
            },
          ]
        },
        isPitch: true,//切换行业和站点的
        queryTerm: {timeValue: [],stationValue: '',deployData: ''},
        stationSelect: [],
        deploySelect: [],
        timeGap: [{name: '近3天',active: true},{name: '近7天',active: false},{name: '近30天',active: false}],
        norm_industry: [{name: '咨询量',value: 0},{name: '访客量',value: 1}],
        norm_data: 0,
        operaIndex: [],//运营指标
        operaData: '',
        industry_data: {inquiries: '',visitors: ''},
        siteSas: [],
        iconClass: [],
        timeSlot: '近3天',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        portData: {industry: '',stationSum: '',stationNorm: '',stationTrend: ''},
        vertionHome: '',
        industryLine_show: true,
        industryScale_show: true,
        deployScale_show: true,
        //echarts Dom
        consultChart:"",
          scaleChart:"",
          deployChart:"",
          cusChartpv:"",
          numChart:"",
          aa: ''
      }
    },
    mounted () {
  
        axioIn.get('/api/data/get_index/').then(res=>{//运营指标
        this.operaIndex = res.data;
      })
      this.vertionHome = this.$store.state.versionInfo || window.sessionStorage.getItem('vertion');
      if(this.vertionHome){
        if(this.vertionHome == 1){
          this.portData.industry = '/api/data/get_industry_data/';this.portData.stationSum = '/api/data/get_action_data/';
          this.portData.stationNorm = '/api/data/get_station_number/';this.portData.stationTrend = '/api/data/get_station_total/';
        }else if(this.vertionHome == 0){//0经典版 1为重构版
          this.portData.industry = '/api/data/channel_data/get_industry/';this.portData.stationSum = '/api/data/channel_data/get_station_title/';
          this.portData.stationNorm = '/api/data/channel_data/get_station_number/';this.portData.stationTrend = '/api/data/channel_data/get_station_total/';
        }
      }else{
        this.portData.industry = '/api/data/channel_data/get_industry/';this.portData.stationSum = '/api/data/channel_data/get_station_title/';
        this.portData.stationNorm = '/api/data/channel_data/get_station_number/';this.portData.stationTrend = '/api/data/channel_data/get_station_total/';
      }

      var today=new Date();
      var formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
      var agoThree = new Date();agoThree.setDate(agoThree.getDate()-2);
      var formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
      this.queryTerm.timeValue.push(formatThr); this.queryTerm.timeValue.push(formatToday); 
      this.industryPage(this.queryTerm,1);//1为只传时间
      axioIn.get('/api/workorder/industry/').then(res=>{//行业列表
        this.stationSelect = res.data;
      })

        /*
        * 动态get当前页面的宽度 驱使echarts 变化
        */
        // window.addEventListener('resize',  ()=>{
        //     if (this.isPitch){
        //         this.scaleChart.resize();
        //         this.deployChart.resize();
        //         this.consultChart.resize();
        //     }else{
        //         this.cusChartpv.resize();
        //         this.numChart.resize();
        //     }
        // })
    },
    computed: {
      ...mapGetters(['getVersion']),
      'cutVersion' () {
        return this.getVersion;
      }
    },
    watch: {
      queryTerm:{
        handler:function (val, oldVal) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          if(this.queryTerm.timeValue === null){
            this.timeSlot = '近3天';
            // this.timeGap.map(n=>{n.active = false;})
          }else if(this.queryTerm.timeValue.length === 2){
            let begin = this.queryTerm.timeValue[0];
            let over = this.queryTerm.timeValue[1];
            var diff =Math.round((new Date(over) - new Date(begin))/1000/60/60/24);
            if(diff == 2){
              this.timeSlot = '近3天';
            }else if(diff == 6){
              this.timeSlot = '近7天';
            }else if(diff == 29){
              this.timeSlot = '近30天';
            }else{
              this.timeSlot = '';
            }
            if(this.isPitch){//行业统计
              this.industryPage(this.queryTerm,2)
            }else{//站点统计
              this.stationPage(this.queryTerm,'off');
            }
          }
        },
        deep: true    //深度监听
      },
      'cutVersion' (newValue,oldValue) {
        if(newValue){
          if(newValue == 1){
            this.portData.industry = '/api/data/get_industry_data/';this.portData.stationSum = '/api/data/get_action_data/';
            this.portData.stationNorm = '/api/data/get_station_number/';this.portData.stationTrend = '/api/data/get_station_total/';
          }else if(newValue == 0){//0经典版 1为重构版
            this.portData.industry = '/api/data/channel_data/get_industry/';this.portData.stationSum = '/api/data/channel_data/get_station_title/';
            this.portData.stationNorm = '/api/data/channel_data/get_station_number/';this.portData.stationTrend = '/api/data/channel_data/get_station_total/';
          }
        }else{
          this.portData.industry = '/api/data/channel_data/get_industry/';this.portData.stationSum = '/api/data/channel_data/get_station_title/';
          this.portData.stationNorm = '/api/data/channel_data/get_station_number/';this.portData.stationTrend = '/api/data/channel_data/get_station_total/';
        }
        if(this.isPitch){//行业统计
          this.industryPage(this.queryTerm,2)
        }else{//站点统计
          this.stationPage(this.queryTerm,'off');
        }
      }
    },
    methods: {

      miliFormat (num) {
        return num && num
          .toString()
          .replace(/^\d+/, (m) => m.replace(/(?=(?!^)(\d{3})+$)/g, ','))
      },
      industryPage (allSearch,diff) {//行业charts的数据
        let obj;
        switch (diff) {
          case 1:
            obj = {start_date:allSearch.timeValue[0],end_date: allSearch.timeValue[1]}
            break;
          case 2:
            obj = {start_date:allSearch.timeValue[0],
              end_date: allSearch.timeValue[1],
              industry: allSearch.stationValue,
              deploy: allSearch.deployData,
              index: this.norm_data
            }
            break;
        }
        let arr = [];
        arr.push(allSearch.timeValue[0].replace(/-/g,'\/'));
        for(let i=1;new Date(arr[arr.length-1])<new Date(allSearch.timeValue[1].replace(/-/g,'\/'));i++){
            let a=new Date(allSearch.timeValue[0]);
            a.setDate(a.getDate()+i);arr.push(a.toLocaleDateString())
        }
        axioIn.get(this.portData.industry,{
          params: obj
        }).then(res=>{
          if(diff == 1){
            // res.data.industry_list.map(n=>{ this.stationSelect.push({name: n}); })
            this.deploySelect = res.data.deploy_list;
            // res.data.deploy_list.map(n=>{ this.deploySelect.push({name: n}); })
          }
          this.industry_data.inquiries = this.miliFormat(res.data.consult);this.industry_data.visitors = this.miliFormat(res.data.visitors);//行业页面头部显示的数据
          this.inquiries_line.xAxis[0].data = arr;
          let colorArr = this.inquiries_line.color;
          let line_shadow = res.data.broken_line.length > 3 ? false : true;
          res.data.broken_line.map((n,index)=>{n.type = 'line';n.smooth = true;n.symbolSize = 10;
            n.areaStyle = line_shadow ? {
                  normal: {
                      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                          offset: 0,
                          color: colorArr[index]
                      }, {
                          offset: 1,
                          color: '#fff'
                      }])
                  }}
                  : null
          })
          let _this = this
          if(res.data.broken_line.length === 0){
            this.industryLine_show = false;
          }else{
            this.industryLine_show = true;
            _this.inquiries_line.legend.data=res.data.broken_line.map(n=>n.name)
            _this.inquiries_line.series = res.data.broken_line;
              // _this.drawinquiries();// 咨询量折线图 
              setTimeout((_)=>{
                _this.drawinquiries();// 咨询量折线图 
              },0)
          }
          if(res.data.different_bread.length === 0){
            this.industryScale_show = false;
          }else{
            this.industryScale_show = true;
            this.industryNum_Pie.series[0].data=res.data.different_bread;
            setTimeout(function(){
              _this.drawindustry_scale();// 行业占比南丁格尔图
            },0)
          }
          if(res.data.bread.length === 0){
            this.deployScale_show = false;
          }else{
            this.deployScale_show = true;
            this.deploy_Pie.series[0].data=res.data.bread;
            setTimeout(function(){
              _this.drawDeploy_pie();//部署方式占比饼图
            },0)
          }
          
        })
      },
      stationPage (allSearch,norm_data) {//站点charts的数据
        // let obj;
        let obj = {start_date:allSearch.timeValue[0],
          end_date: allSearch.timeValue[1],
          industry: allSearch.stationValue,
          deploy: allSearch.deployData,
          action: this.operaData
        }
        let arr = [];
        arr.push(allSearch.timeValue[0].replace(/-/g,'\/'));
        for(let i=1;new Date(arr[arr.length-1])<new Date(allSearch.timeValue[1].replace(/-/g,'\/'));i++){
            let a=new Date(allSearch.timeValue[0]);
            a.setDate(a.getDate()+i);arr.push(a.toLocaleDateString())
        }//折线图的横坐标的数据
        let obj1 = {start_date:allSearch.timeValue[0],
          end_date: allSearch.timeValue[1],
          industry: allSearch.stationValue,
          deploy: allSearch.deployData,
        }
        if(allSearch.stationValue === ''||allSearch.stationValue===undefined){delete obj1.industry}
        if(allSearch.deployData === ''||allSearch.deployData===undefined){delete obj1.deploy}
        axioIn.get(this.portData.stationSum,{
          params: obj1
        }).then(res=>{//站点新增客户等数字的接口
          if(res.data.name.length === res.data.data.length){
            this.siteSas = [];
            res.data.name.map((n,i)=>{
              this.siteSas.push({name_cur: n,number_cur:res.data.data[i]})
            })
            this.siteSas.map((n,i)=>{
              n.number_cur = this.miliFormat(n.number_cur);
              if(n.name_cur.indexOf('续费客户') !== -1){this.iconClass[i] = 'singCon';}
              else if(n.name_cur.indexOf('上线客户') !== -1){this.iconClass[i] = 'singVis';}
              else if(n.name_cur.indexOf('下线客户') !== -1){this.iconClass[i] = 'singSta';}
              else if(n.name_cur.indexOf('新增客户') !== -1){this.iconClass[i] = 'singPro';}
              // else if(n.name_cur.indexOf('新增产品') !== -1){this.iconClass[i] = 'singVis';}
            })
          }
        })
        axioIn.get(this.portData.stationNorm,{
          params: obj
        }).then(res=>{
          this.customerLine.xAxis[0].data = arr;
          let colorArr = this.customerLine.color;
          let line_shadow = res.data.length > 3 ? false : true;
          res.data.map((n,index)=>{n.type = 'line';n.symbolSize = 10;n.smooth = true; 
            n.areaStyle = line_shadow ? {
              normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: colorArr[index]
                  }, {
                      offset: 1,
                      color: '#fff'
                  }])
              }}
              : null
          })
          this.customerLine.legend.data=res.data.map(n=>n.name)
          this.customerLine.series = res.data; this.drawcustomer();// 折线图
        })
        if(norm_data === 'off'){
          axioIn.get(this.portData.stationTrend,{
            params: obj
          }).then(res=>{
            this.stationLine.xAxis[0].data = arr;
            res.data.type = 'line';res.data.symbolSize = 10;res.data.smooth = true;res.data.areaStyle = {
              normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: '#75b9ff'
                  }, {
                      offset: 1,
                      color: '#fff'
                  }])
              }
            };
            this.stationLine.legend.data.push(res.data.name)
            this.stationLine.series = res.data; this.drawStation();// 站点数量变化确实折线图
          })
        }
      },
      norm_change () {//选择行业的指标项
        this.industryPage(this.queryTerm,2)
      },
      operateFilter () {
        this.stationPage(this.queryTerm,'on');
      },
      chooseTime (name) {// 选择时间段
        this.queryTerm.timeValue = [];
        if(name === '近3天'){
          let today=new Date();
          let formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
          let agoThree = new Date();agoThree.setDate(agoThree.getDate()-2);
          let formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
          this.queryTerm.timeValue.push(formatThr); this.queryTerm.timeValue.push(formatToday);
        }else if(name === '近7天'){
          let today=new Date();
          let formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
          let agoThree = new Date();agoThree.setDate(agoThree.getDate()-6);
          let formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
          this.queryTerm.timeValue.push(formatThr); this.queryTerm.timeValue.push(formatToday);
        }else if(name === '近30天'){
          let today=new Date();
          let formatToday = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();// 获取今天的日期
          let agoThree = new Date();agoThree.setDate(agoThree.getDate()-29);
          let formatThr = agoThree.getFullYear()+'-'+(agoThree.getMonth()+1)+'-'+agoThree.getDate();// 获取三天前的日期
          this.queryTerm.timeValue.push(formatThr); this.queryTerm.timeValue.push(formatToday);
        }
        if(this.isPitch){//行业统计
          this.industryPage(this.queryTerm,2)
        }else{//站点统计
          this.stationPage(this.queryTerm,'off');
        }
      },
      pitchIndustry () {//切换为行业统计
        this.isPitch = true;
        this.industryPage(this.queryTerm,2)
      },
      pitchStation () {//切换为站点统计
        this.isPitch = false;
        this.stationPage(this.queryTerm,'off');
      },
      drawinquiries:function(){
        this.consultChart = echarts.init(document.getElementById('consultChart_indus'));
        this.consultChart.clear();
        this.consultChart.setOption(this.inquiries_line)
      },
      drawindustry_scale:function(){
        this.scaleChart  = echarts.init(document.getElementById('scaleChart_indus'));
          this.scaleChart.setOption(this.industryNum_Pie)
      },
      drawDeploy_pie:function(){
         this.deployChart = echarts.init(document.getElementById('deployChart_indus'));

          this.deployChart.setOption(this.deploy_Pie)

      },
      drawcustomer:function(){
         this.cusChartpv = echarts.init(document.getElementById('cusChartpv_station'));
        this.cusChartpv.setOption(this.customerLine)
      },
      drawStation:function(){
        this.numChart = echarts.init(document.getElementById('numChart_station'));
        this.numChart.setOption(this.stationLine)
      },
      exportInfo () {//导出
        let save_type = '';
        // 行业 derive_industry  站点 
        let version_type = this.$store.state.versionInfo || window.sessionStorage.getItem('vertion');
        if(!version_type)version_type = 0;
        if(this.isPitch){// 行业
          save_type = 'derive_industry';}
          else{//站点
          save_type = 'derive_site';}
        window.open(`/api/data/channel_data/${save_type}/?start_date=${this.queryTerm.timeValue[0]}&end_date=${this.queryTerm.timeValue[1]}&version=${version_type}&industry=${this.queryTerm.stationValue}&deploy=${this.queryTerm.deployData}`)
      }
    },
  
}