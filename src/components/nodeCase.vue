/*
 * @Author: liuqian 
 * @Date: 2017-11-28 16:41:28 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-08-06 11:46:50
 */
<template>
    <div class="nodeCase">
        <p class="qu">数据管理 > 运营统计 >节点情况</p>
      <p class='tipp'><span >部署方式各节点咨询量及占比</span><a href="javascript:void()" class='out' @click='expor()'>导出</a></p>
      <div class='chart'>
            <p class="ji">
                <span class='jii'><label for="">部署方式</label>
                <select name="" id="" v-model='deplo.deploy_way' >
                    <option value="0">所有</option>
                    <option v-for="(item,index) in deploySelect" :value="item.id" :key="index">{{item.name}}</option>
                        <!-- <option value='0'>所有</option>  
                        <option value="1">标准版</option>
                        <option value="2">vip</option>
                        <option value="3">vpc</option>
                        <option value="4">企业版</option> -->
                </select></span>
                <span  class='jii'><label for="">日期</label>
                <span class='time'>
                  <input type="text" v-model="serviceDate.start_date" @focus='focStart()' readonly="true">~
                  <datee v-if='date_s' v-on:incrementt="incrementTi"  @mouseleave.native='hide()'  class='dat da1'></datee>
                  <input type="text" v-model="serviceDate.end_date" @focus='focEnd()' readonly="true">
                  <datee v-if='date_s1' v-on:incrementt="incrementTi1"  @mouseleave.native='hide()'  class='dat da1'></datee>
                  </span></span>
                <!-- <input type="text" v-model="deplo.date" @focus='focu()' readonly="true"></span>
                <datee v-show='date_s' v-on:incrementt="incrementTi"  @mouseleave.native='hide()' class='dat'></datee> -->
                <span class='jii'><a href="javascript:void(0)" class="so" @click='search_bu()'>确定</a></span>
                <span class='jii mar20'><span>总数：{{pp}}</span></span>
            </p>
            <!--p class="xinz"><a href="javascript:void(0)"  class="so" @click='add()'>新增</a></p-->
            <div id="myChart" :style="{width: '700px', height: '300px',float:'left'}"></div>
      </div>
      <div style='background-color:white;'>
          <p class='tipp'><span  >节点咨询量变化趋势</span><a href="javascript:void()" class='out' @click='export1()'>导出</a></p>
          <p class='lef margin20'>
              <span style='height:38px;display:inline-block;line-height:38px;'>添加指数:</span>
              <span v-for='(it,index) in item' class='expon' :key="index">{{it}}<em class='cloi' @click='delet_ex(index)'></em></span>
          </p>
          <div class='lef margin20'>
              <a href="javascript:void(0)" class="cho" @click='add_index()'>+新增指数</a>
              <div class="exponent" @mouseleave="exponent">
                <ul class="deployWay" v-show="deployWay">
                    <li class="deployFirst">部署方式</li>
                    <li v-for="(item,index) in deployment" :key="index" :class='{pitch: item.a1}' @click="deploy_click(index)">{{item.name}}</li>
                </ul>
                <ul class="node" v-show="nodeShow">
                    <li class="nodeFirst">节点</li>
                    <li v-for="(item,index) in node_data" :key="index" :class='{pitch: item.a1}' @click="node_click(index)">{{item.name}}</li>
                </ul>
              </div>
              <!-- <div style='width:500px;position:absolute;border:1px solid black;z-index:40000;background:white;' v-show='indushow' @mouseleave='lose_focu()'>
                  <p class='left'>行业</p>
                  <ul class='indus'>
                      <li v-for='(ii,index) in industry' :class='{dactiv:ii.a1}' @click='choose(index)' :id='ii.id'>{{ii.industry}}</li>
                  </ul>
                  <p  class='left'> 部署方式</p>
                  <ul  class='indus'>
                      <li v-for='(ii,index) in deployy' :class='{dactiv:ii.a1}' @click='choose1(index)' :id='ii.id'>{{ii.value}}</li>
                  </ul>
                  <p  class='left'> 产品<span style='color:#0386f0'>（必选）</span></p>
                  <ul  class='indus'>
                      <li v-for='(ii,index) in deployi' :class='{dactiv:ii.a1}' @click='choose2(index)' :id='ii.id'>{{ii.product}}</li>
                  </ul>
                  <p  class='right'><a href="javascript:void(0)" class='a1' @click='add_char()'>确定</a></p>
              </div> -->
              <label for="" style="margin-right: 10px;">趋势日期</label><span class='time'>
                  <input type="text" v-model="ke.start_date" @focus='trendStart()' readonly="true">~
                  <datee v-if='date_s2' v-on:incrementt="incrementTi2"  @mouseleave.native='hide()'  class='dat da'></datee>
                  <input type="text" v-model="ke.end_date" @focus='trendEnd()' readonly="true">
                  <datee v-if='date_s3' v-on:incrementt="incrementTi3"  @mouseleave.native='hide()'  class='dat da'></datee>
                  </span>
              <a href="javascript:void(0)" class='so' @click='search_char()'>确定</a>
              
          </div>
          <div id="myChart2" :style="{width: '1220px', height: '500px', marginLeft: '20px'}"></div>
      </div>
    </div>
</template>
<script>
import axioIn from '../store/axioIn'
import axios from 'axios';
let echarts = require("echarts/lib/echarts")
import Datee from './date'
require('echarts/lib/chart/pie')
require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require("echarts/lib/component/legendScroll")
export default {
    name:'nodeCase',
    components:{Datee},
    data:function(){
        return{
            trade:{
                 backgroundColor: '#fff',
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    itemGap: 2,
                    // padding: 2,
                    // itemWidth: 1,
                    x : 'right',
                    data:['eee']
                },
                calculable :true,
                series:[
                    {
                        name:'',
                        type:'pie',
                        
                        stillShowZeroSum:true,
                        radius:'55%',
                        //avoidLabelOverlap: false,
                        center:['20%','60%'],
                        itemStyle: {
                            normal: {
                                label:{
                                    show: false,
                                    position:'outer'
                                } ,
                                textStyle: {
                                    border:'1px solid black',
                                    color: 'rgba(255, 255, 255, 0.3)'
                                },
                                labelLine :{show:false}
                            }
                        },
                        data:[
                            {value:0,name:'eee'},
                            {value:0,name:'1ee'},
                        ]
                    }
                ]
            },
            trade2:{
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c}"
                },
                legend: {
                    x: 'left',
                    data: []
                },
                xAxis: [
                    {
                        type: "category",
                        name: "x",
                        splitLine: {show: false},
                        data:['2016/1/1','2016/1/2','2016/1/3']
                        //min:new Date('2017/01/01'),
                        //max:new Date('2017/01/09')
                    }
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "y",
                        //data:['2','3','4','5']
                    }
                ],
                calculable:false,
                series: [
                    {
                        name: "",
                        type: "line",
                        data: [0,0,0]

                    },
                ]
            },
            deploy:{},
            guest:{},
            pp:0,
            pp1:0,
            me:'',
            me1:'',
            mes:'',
            date_s:false,
            date_s1:false,
            date_s2:false,
            date_s3:false,
            //span_act:true,
            item:[],
            itee:[],            
            deployy:[{value:'公有云',a1:false,id:'2'},{value:'专属云',a1:false,id:'3'},{value:'标准版',a1:false,id:'1'},{value:'私有云',a1:false,id:'4'}],
            // industry:[{value:'vip',a1:false,id:'0',children:[{value:'vip-BJG',a1:false,id:'01',children: [{value:'3vip',a1:false,id:'001'},{value:'3bjg',a1:false,id:'0'},{value:'33vip',a1:false,id:'0'}]},{value:'BJG-vpc',a1:false,id:'02'},{value:'vip-bjg',a1:false,id:'03'}]},{value:'vpc',a1:false,id:'1'},{value:'标准版',a1:false,id:'2'},{value:'企业版',a1:false,id:'3'}],
            indushow:false,
            start_date:'',
            end_date:'',
            deplo:{deploy_way:'0',date:'',industry:'0'},
            gues:{industry:'0',date:''},
            ke:{start_date:'',end_date:''},
            biao:[],
            today:'',
            deployi:[],
            //number:''
            serviceDate: {start_date: '', end_date: ''},
            exponentShow: false,
            deployWay: false,
            nodeShow: false,
            node_data: [],
            serv_data: [],
            deployment: [],
            deploySelect: [],
            maxNum: {
                data : [
                    {type : 'max', name: '最大值'},
                    {type : 'min', name: '最小值'}
                ]
            },
            average: {
                data : [
                    {type : 'average', name: '平均值'}
                ]
            }
        }
    },
    mounted:function(){
        this.drawLine();
        this.drawLine1();
        var aa=this.today=new Date();
        var bb=aa.getFullYear()+'-'+(aa.getMonth()+1)+'-'+aa.getDate();
        this.deplo.date=this.gues.date=bb;
        this.serviceDate.start_date = this.serviceDate.end_date = bb
        this.ke.start_date=this.ke.end_date=bb;
        // 画饼图
        axioIn.get('/api/data/grid_inquires/inquires/',{
            params: {
                deploy_way: this.deplo.deploy_way,
                from_date: this.serviceDate.start_date,
                to_date: this.serviceDate.end_date
            }
        }).then((res)=>{
            let aa= res.data.data.filter(n=>n.value>0)
            if(aa.length!==0){this.trade.calculable=false;}
            else{this.trade.calculable=true}
            if(res.data.data.length!==0){
                this.trade.series[0].data=res.data.data;
                this.trade.legend.data=res.data.data.map(v=>v.name)
                this.drawLine();this.pp=res.data.total
            }else{
                alert('没有数据！')
                this.trade.series[0].data=[{value:0}];
                this.trade.legend.data=[]
                this.drawLine();
            }
        })
        // 节点的新增指数
        axioIn.get('/api/product/deploy_way_grid_ship/')
        .then((res)=>{
            this.deployment = res.data;
        })
        //上方的部署方式
        axioIn.get('/api/product/deployway/')
        .then(res=>{
            this.deploySelect = res.data.data
        })
        // 画折线图
        /*axioIn.get('/api/data/online-product/get_product_allday/?idpypd=1|2|8+&start_date='+this.ke.start_date+'&end_date='+this.ke.end_date)
            .then((res)=>{
                if(res.data.data.length!==0){
                res.data.data.map(n=>n.type='line');
                this.trade2.series=res.data.data;
                //this.deployi.map(n=>this.$set(n,'a1',false));
                this.trade2.legend.data=res.data.data.map(n=>n.name)
                this.drawLine1();}
            })、*/         
    },
   methods:{
       // 鼠标离开时
       exponent: function (){
            this.deployWay = false
            this.nodeShow = false
        },
        node_click: function(index){
            if(this.item.length>9){alert('最多添加10个指数');return}
            this.node_data.map(n=>n.a1 = false)
            this.node_data[index].a1 = true
            this.deployWay = false
            this.nodeShow = false
            var aa,bb,nodeId;
            this.deployment.map(n=>{if(n.a1===true){aa=n.name;}})
            this.node_data.map(n=>{if(n.a1===true){bb=n.name;nodeId=n.id}})
            if(aa!==undefined&&bb!==undefined){
                if(this.item.indexOf(aa+'|'+bb)<0){
                    this.item.push(aa+'|'+bb)
                    this.itee.push(nodeId)
                }else{
                    alert('不能添加重复的指数')
                }
            } 
            // if(this.node_data[index].children.length !== 0)this.serv_data = this.node_data[index].children
            // this.servShow = true
        },
        deploy_click:function(index){
            this.deployment.map(n=>n.a1 = false)
            this.deployment[index].a1 = true
            if(this.deployment[index].children)this.node_data = this.deployment[index].children
            this.nodeShow = true
        },
        // 日历控件的显示
        focStart: function(){
            this.date_s = true
        },
        focEnd: function(){
            this.date_s1 = true
        },
        trendStart: function(){
            this.date_s2 = true
        },
        trendEnd: function(){
            this.date_s3 = true
        },
        drawLine:function(){
           let myChart = echarts.init(document.getElementById('myChart'));
            myChart.setOption(this.trade)
            
            },
        drawLine1:function(){
            let myChart2 = echarts.init(document.getElementById('myChart2'));
            myChart2.setOption(this.trade2)
         },
        add:function(){
            this.trade.series[0].data=[
                {value:22,name:'12e'},{value:22,name:'ee3'},{value:22,name:'e2e'}
            ]
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
        incrementTi:function(a){this.serviceDate.start_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.serviceDate.start_date=''}},
        incrementTi1:function(a){this.serviceDate.end_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.serviceDate.end_date=''}},
        incrementTi2:function(a){this.ke.start_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.ke.start_date=''}},
        incrementTi3:function(a){this.ke.end_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.ke.end_date=''}},
        hide:function(){this.date_s=false;this.date_s1=false;this.date_s2=false;this.date_s3=false},
        blurr1:function(){},
        change_tab:function(){
            this.span_act=!this.span_act
        },
        add_char:function(){
            let aaq=this.deployi.filter((n)=>n.a1===true);
            if(aaq.length===0){alert('产品为必选');return}
            if(this.item.length>10){alert('最多添加10个指数');return}
            else {
                var aa;var bb;var cc;var dd;var ee;var ff;
                this.industry.map(n=>{if(n.a1===true){aa=n.industry;dd=n.id}})
                this.deployy.map(n=>{if(n.a1===true){bb=n.value;cc=n.id}})
                this.deployi.map(n=>{if(n.a1===true){ee=n.product;ff=n.id}})
                if(aa===undefined&&bb===undefined){this.item.push(ee);this.itee.push('0|0|'+ff)}
                else if(aa===undefined&&this.item.indexOf(bb+'|'+ee)<0&&this.item.indexOf(cc+'|'+ff)<0){this.item.push(bb+'|'+ee);this.itee.push('0|'+cc+'|'+ff)}
                else if(bb===undefined&&this.item.indexOf(dd+'|'+ee)<0&&this.itee.indexOf(dd+'|'+ff)<0){this.item.push(aa+'|'+ee);this.itee.push(dd+'|0'+'|'+ff)}
                else if((aa!==undefined&&bb!==undefined)) {
                    if(this.item.indexOf(aa+'|'+bb+'|'+ee)<0){this.item.push(aa+'|'+bb+'|'+ee)}else{alert('不能添加重复指数')}
                    if(this.itee.indexOf(dd+'|'+cc+'|'+ff)<0){this.itee.push(dd+'|'+cc+'|'+ff)}
                    }
                else{alert('不能添加重复指数')}
            }
        },
        // 删除指数
        delet_ex:function(index){
            this.item.splice(index,1);
            this.itee.splice(index,1)
        },
        //点击新增指数
        add_index:function(index){
            this.indushow=true;
            this.deployWay = true
            this.deployment.map(n=>n.a1=false);
            this.node_data.map(n=>n.a1 = false)
            this.deployy.map(n=>n.a1=false);
        },
        lose_focu:function(index){
            this.indushow=false;
            this.industry.map(n=>n.a1=false);
            this.deployy.map(n=>n.a1=false);
        },
        // 点击确定绘制饼图
        search_bu:function(){
            let aa=false;
            for(let a in this.serviceDate){
                if(this.serviceDate[a]===''){aa=true}
            }
            if(aa===true){alert('请完善输入信息')}
            else{
                axioIn.get('/api/data/grid_inquires/inquires/',{
                    params: {
                        deploy_way: this.deplo.deploy_way,
                        from_date: this.serviceDate.start_date,
                        to_date: this.serviceDate.end_date
                    }
                })
                .then((res)=>{
                    let aa= res.data.data.filter(n=>n.value>0)
                    if(aa.length!==0){this.trade.calculable=false;}
                    else{this.trade.calculable=true}
                    if(res.data.data.length!==0){
                        this.trade.series[0].data=res.data.data;
                        this.trade.legend.data=res.data.data.map(v=>v.name)
                        this.drawLine();this.pp=res.data.total
                    }else{
                        alert('没有数据！')
                        this.trade.series[0].data=[{value:0}];
                        this.trade.legend.data=[]
                        this.drawLine();
                    }
                    // let aa= res.data.data.filter(n=>n.value>0)
                    // if(aa.length!==0){this.trade.calculable=false;}
                    // else{this.trade.calculable=true;alert('没有数据');}
                    //     this.trade.series[0].data=res.data.data;
                    //     this.trade.legend.data=res.data.data.map(v=>v.name)
                    //     this.drawLine();this.pp=res.data.total
                    // if(res.data.data.length!==0){
                    //     this.trade.series[0].data=res.data.data;
                    //     this.trade.legend.data=res.data.data.map(v=>v.name)
                    //     this.drawLine();
                    // }
                    // else{alert('没有数据')}
                })
            }
        },
        // 点击确定绘制折线图
        search_char:function(){
            var aa=this.ke.start_date.split('-');
            var bb=this.ke.end_date.split('-');
            var aad=new Date(aa[0],aa[1],aa[2]);
            var bbd=new Date(bb[0],bb[1],bb[2]);
            aad.setMonth(aad.getMonth()+2);
            if(aad<bbd){alert('开始时间和结束时间不能超过2个月')}
            else if(this.ke.start_date===''||this.ke.end_date===''){alert('开始时间和结束时间为必填')}
            else{
                let aai=[];
                aai.push(this.ke.start_date.replace(/-/g,'\/'));//console.log(aai[aai.length-1])
                for(let i=1;new Date(aai[aai.length-1])<new Date(this.ke.end_date.replace(/-/g,'\/'));i++){
                    let a=new Date(this.ke.start_date);
                    a.setDate(a.getDate()+i)
                   // console.log(a)
                    aai.push(a.toLocaleDateString())
                }
                //console.log(aai)
                this.trade2.xAxis[0].data=aai;
                if(this.itee.length===0){alert('指数不可为空');return}
                let aa=this.itee.join('&grid_id=');
                axioIn.get('/api/data/grid_inquires/inquires_trend/?grid_id='+aa+'&from_date='+this.ke.start_date+'&to_date='+this.ke.end_date)
                .then((res)=>{
                    if(res.data.length!==0){
                    res.data.map(n=>n.type='line');
                    this.trade2.series=res.data;
                    this.trade2.legend.data=res.data.map(n=>n.name)
                    this.trade2.series.map(n=>n.markPoint = this.maxNum)
                    this.trade2.series.map(n=>n.markLine = this.average)
                    // console.log(JSON.stringify(res.data.data))
                    // console.log(JSON.stringify(this.trade2.series))
                    this.drawLine1();
                }
                    else{alert('没有数据')}
                })
            }
        },
        // 饼图上方的导出
        expor:function(){
            let aa=false;
            for(let a in this.serviceDate){
                if(this.serviceDate[a]===''){aa=true}
            }
            if(aa===true){alert('请完善输入信息')}else{
                axioIn.get('/api/data/grid_inquires/inquires_csv/?deploy_way='+this.deplo.deploy_way+'&from_date='+this.serviceDate.start_date+'&to_date='+this.serviceDate.end_date).then((res) =>{
                     window.open('/api/data/grid_inquires/inquires_csv/?deploy_way='+this.deplo.deploy_way+'&from_date='+this.serviceDate.start_date+'&to_date='+this.serviceDate.end_date,'_self')
                }).catch(res => {
                    alert(res.date.error)
                })
            }
            // if(this.deplo.date===''){alert('日期为必填')}
            //     //console.log('api/data/online-client/industry_csv/?deploy_way='+this.deplo.deploy_way+'&date='+this.deplo.date)
            //    else{ window.open('/api/data/online-product/csv_day_product/?deploy_way='+this.deplo.deploy_way+'&date='+this.deplo.date+'&industry='+this.deplo.industry)
            //    }
        },
        // 折线图处的导出
        export1:function(){
            if(this.itee.length===0){alert('指数不可为空');return}
            let aa=this.itee.join('&grid_id=');
            if(this.ke.start_date===''||this.ke.end_date===''){alert('开始时间和结束时间为必填')}
            else{
                axioIn.get().catch(res => {
                    alert(res.date.error)
                })
                axioIn.get('/api/data/grid_inquires/inquires_trend_csv/?grid_id='+aa+'&from_date='+this.ke.start_date+'&to_date='+this.ke.end_date).then((res) =>{
                        window.open('/api/data/grid_inquires/inquires_trend_csv/?grid_id='+aa+'&from_date='+this.ke.start_date+'&to_date='+this.ke.end_date,'_self')
                }).catch(res => {
                    alert(res.date.error)
                })
        }},
   }
  
}
</script>

<style lang='scss' scoped>
    .nodeCase{
        .margin20 span,.margin20 a{margin-left:20px;}
        .ji{display: inline-block;width:442px;float:left;margin:10px 0 0 0;
            }
        .jii{width:100%;display: inline-block;margin:10px 0;
            label{display: inline-block;width:70px;text-align:right;padding-right:10px;}
            select,input{border-radius:5px;border:1px solid gray;}
            select{width:302px;height:34px;margin-bottom:10px;option{padding:4px;}}
            input{width:290px;height:32px;margin:0;padding:0 5px;}
        }
        .so{margin:30px 94px;}
        .dat{left:0!important}
        .out{position: absolute;right:120px;top:10px;height:34px;line-height: 34px;color:white;width:80px;background-color:rgba(3,124,240,1);border-radius: 5px;text-align: center;}
        .chart{width:100%;height:400px;background-color: white;}
        .tipp{margin-top:10px;background-color:white;text-align:left;height:54px;position: relative;border-bottom:1px solid #EDF2F5;
        span{display:inline-block;width:182px;height:34px;cursor: pointer;text-align: center;
            background-color:rgba(245,245,245,1);line-height: 34px;margin:10px 20px;border-radius:5px;}
        }
        .sactiv{color:rgba(3,124,240,1)}
        .expon{display: inline-block;background-color:#f5f5f5;margin:0 5px ;height:25px;line-height: 25px;text-align: center;padding-left:8px;}
        .cloi{width:28px;height:19px;display:inline-block;background:url(../assets/close.png) no-repeat 10px 10px;}
        .dactiv{color:#0386F0;background:url(../assets/tic.png) no-repeat right;}
        .deployWay,.node,.lefServ{background: #fff;min-width:120px;border:1px solid #ccc;height:180px;float: left;overflow-y: scroll;
            li{height:30px;line-height: 30px;padding:0 10px;cursor: pointer;}
            .pitch{background:#f0f0f0;}     
        }
        .deployWay{box-shadow: -3px 1px 5px #ccc;left:0;.deployFirst{border-bottom: 1px solid #ccc;}}
        .node{left:100px;.nodeFirst{border-bottom: 1px solid #ccc;}}
        .lefServ{left: 200px;.servFirst{border-bottom: 1px solid #ccc;}}
        .exponent{position:absolute;top:80px;left:0;z-index: 99;}
        .indus{text-align: left;
            li{display: inline-block;width:100px;text-align: center;cursor: pointer;margin:5px 0;}}
        .left{text-align: left;padding:5px 20px;border: 1px solid #EDF2F5;}
        .lef{text-align: left;position: relative}
        .right{text-align: right;}
        .a1{display: inline-block;width:50px;height:24px;line-height:24px;border: 1px solid #EDF2F5;color:white;margin:10px 30px;text-align: center;background-color: #0386F0;border-radius: 5px;}
        .cho{margin-right:30px;}
        .time{border:1px solid gray;margin-left:0px;display: inline-block;padding:0 3px;border-radius: 5px;position: relative;
        input{width:120px;height:30px;border:0;margin-left:10px;}
        .da{left:0!important;}
        }
    }
</style>

