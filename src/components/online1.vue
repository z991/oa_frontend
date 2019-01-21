<template>
    <div class="line1">
        <p class="qu">数据管理 > 产品与运营统计 >线上渠道情况</p>
      <p class='tipp'><span :class='{sactiv:span_act}' @click='change_tab()'>行业/部署方式渠道咨询量及占比</span><span  @click='change_tab()' :class='{sactiv:!span_act}'>具体客户渠道访问量及占比</span><a href="javascript:void()" class='out' @click='expor()'>导出</a></p>
      <div class='chart' v-show='span_act'>
            <p class="ji">
                <span class='jii'><label for="">行业</label>
                <select name="" id="" v-model='deplo.industry'>
                    <option value='0' >所有</option>
                    <option :value="it.id" v-for='(it,index) in biao' :key="index">{{it.industry}}</option>
                </select></span>
                <span class='jii'><label for="">部署方式</label>
                <select name="" id="" v-model='deplo.deploy_way' >
                        <option value='0' >所有</option>  
                        <option value="1">标准版</option>
                        <option value="2">公有云</option>
                        <option value="3">专属云</option>
                        <option value="4">私有云</option>
                </select></span>
                <span  class='jii'><label for="">日期</label>
                <span class='time'>
                  <input type="text" v-model="deplo.start_date" @focus='foc1()' readonly="true">~
                  <datee v-if='date1' v-on:incrementt="increment1"  @mouseleave.native='hide()'  class='dat da1'></datee>
                  <input type="text" v-model="deplo.end_date" @focus='foc2()'>
                  <datee v-if='date2' v-on:incrementt="increment2"  @mouseleave.native='hide()'  class='dat da1'></datee>
                  </span>
                </span>
                <!--input type="text" v-model="deplo.date" @focus='focu()'></span>
                <datee v-show='date_s' v-on:incrementt="incrementTi"  @mouseleave.native='hide()' class='dat'></datee-->
                <span class='jii'><a href="javascript:void(0)" class="so" @click='search_bu()'>确定</a></span>
                <span class='jii mar20'><span>总数：{{pp}}</span></span>
                <!-- <div>单位</div> -->
            </p>
            <!--p class="xinz"><a href="javascript:void(0)"  class="so" @click='add()'>新增</a></p-->
            <div id="myChart" :style="{width: '700px', height: '300px',float:'left'}"></div>
      </div>
      <div class='chart' v-show='!span_act'>
            <p class="ji">
                <span class='jii'><label for="">企业ID</label>
                <input type="text" v-model='gues.industry' style="ime-mode:disabled">
                <!--select name="" id="" v-model='gues.industry'>
                    <option value='0'>所有</option>
                    <option :value="it.id" v-for='it in biao'>{{it.industry}}</option>
                </select--></span>
                <span class='jii'><label for="">日期</label>
                <span class='time'>
                  <input type="text" v-model="gues.start_date" @focus='foc3()' readonly="true">~
                  <datee v-if='date3' v-on:incrementt="increment3"  @mouseleave.native='hide()'  class='dat da1'></datee>
                  <input type="text" v-model="gues.end_date" @focus='foc4()' readonly="true">
                  <datee v-if='date4' v-on:incrementt="increment4"  @mouseleave.native='hide()'  class='dat da1'></datee>
                  </span>
                </span>
                <!--input type="text" v-model="gues.date" @focus='focu1()'></span>
                <datee v-show='date_s1' v-on:incrementt="incrementTi1"  @mouseleave.native='hide()'  class='dat'></datee-->
                <span class='jii'><a href="javascript:void(0)" class="so" @click='search_industry()'>确定</a></span>
            </p>
            <div id="myChart1" :style="{width: '700px', height: '300px',float:'left'}"></div>
      </div>
      <div style='background-color:white;'>
          <p class='tipp'><span>渠道咨询量变化趋势</span><a href="javascript:void()" class='out' @click='export1()'>导出</a></p>
          <p class='lef mar20'>
              <span style='height:38px;display:inline-block;line-height:38px;'>添加指数:</span>
              <span v-for='(it,index) in item' :key="index" class='expon'>{{it}}<em class='cloi' @click='delet_ex(index)'></em></span>
          </p>
          <div class='lef mar20'>
              <a href="javascript:void(0)" class="cho" @click='add_index()'>+新增指数</a>
              <div style='width:500px;position:absolute;border:1px solid black;z-index:40000;background:white;' v-show='indushow' @mouseleave='lose_focu()'>
                  <p class='left'>行业</p>
                  <ul class='indus'>
                      <li v-for='(ii,index) in industry' :key="index" :class='{dactiv:ii.a1}' @click='choose(index)' :id='ii.id'>{{ii.industry}}</li>
                  </ul>
                  <p  class='left'> 部署方式</p>
                  <ul  class='indus'>
                      <li v-for='(ii,index) in deployy' :key="index" :class='{dactiv:ii.a1}' @click='choose1(index)' :id='ii.id'>{{ii.value}}</li>
                  </ul>
                  <p  class='left'> 渠道<span style='color:#0386f0'>（必选）</span></p>
                  <ul  class='indus'>
                      <li v-for='(ii,index) in deployi' :key="index" :class='{dactiv:ii.a1}' @click='choose2(index)' :id='ii.id'>{{ii.name}}</li>
                  </ul>
                  <p  class='right'><a href="javascript:void(0)" class='a1' @click='add_char()'>确定</a></p>
              </div>
              <label for="" style='margin-right:10px'>趋势日期</label>
              <span class='time'>
                  <input type="text" v-model="ke.start_date" @focus='focu2()' readonly="true">~
                  <datee v-if='date_s2' v-on:incrementt="incrementTi2"  @mouseleave.native='hide()'  class='dat da'></datee>
                  <input type="text" v-model="ke.end_date" @focus='focu3()' readonly="true">
                  <datee v-if='date_s3' v-on:incrementt="incrementTi3"  @mouseleave.native='hide()'  class='dat da'></datee>
                  </span>
              <a href="javascript:void(0)" class='so' @click='search_char()'>确定</a>
              
          </div>
          <div id="myChart2" :style="{width: '1220px', height: '500px'}" class='mar20'></div>
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
    name:'line1',
    components:{Datee},
    data:function(){
        return{
            trade:{
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'right',
                    data:['eee']
                },
                calculable : true,
                series:[
                    {
                        name:'',
                        type:'pie',
                        radius:'55%',
                        center:['50%','60%'],
                        data:[
                            {value:0,name:'eee'},
                            
                        ],
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
                        }
                    }
                ]
            },
            trade1:{
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'right',
                    data:['vip']
                },
                calculable : true,
                series:[
                    {
                        name:'',
                        type:'pie',
                        radius:'55%',
                        center:['50%','60%'],
                        data:[
                            {value:0,name:'vip'},
                        ],
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
                        }
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
            date1:false,
            date2:false,
            date3:false,
            date4:false,
            date_s:false,
            date_s1:false,
            date_s2:false,
            date_s3:false,
            span_act:true,
            item:[],
            itee:[],
            deployy:[{value:'公有云',a1:false,id:'2'},{value:'专属云',a1:false,id:'3'},{value:'标准版',a1:false,id:'1'},{value:'私有云',a1:false,id:'4'}],
            industry:[],
            indushow:false,
            start_date:'',
            end_date:'',
            deplo:{deploy_way:0,start_date:'',end_date:'',industry:0,},
            gues:{industry:'',start_date:'',end_date:''},
            ke:{start_date:'',end_date:''},
            biao:[],
            deployi:[],
            today:''
            //number:''
        }
    },
    mounted:function(){
        this.drawLine();
        this.drawLine1();
        var aa=this.today=new Date();
        var bb=aa.getFullYear()+'-'+(aa.getMonth()+1)+'-'+aa.getDate();
        this.deplo.date=this.gues.date=this.deplo.start_date=this.deplo.end_date=this.gues.start_date=this.gues.end_date=bb;
        this.ke.start_date=this.ke.end_date=bb;
        axioIn.get('/api/workorder/industry/')//所属行业
            .then((res)=>{/*console.log(res.data);*/
            this.industry=res.data;this.industry.map(n=>this.$set(n,'a1',false));
            this.biao=res.data;
            })
        axioIn.get('api/data/channel/get_channel_inquiries/?start_date='+bb+'&end_date='+bb+'&industry='+this.deplo.industry+'&deploy_way='+this.deplo.deploy_way)
        .then((res)=>{
            let aa= res.data.data.filter(n=>n.value>0)
                    if(aa.length!==0){
                        this.trade.calculable=false;
                    }
                    else{this.trade.calculable=true}
                        this.trade.series[0].data=res.data.data;
                        this.trade.legend.data=res.data.data.map(v=>v.name)
                        this.drawLine();this.pp=res.data.total
        })
        /*/axioIn.get('api/data/channel/get_channel_inquiries/?start_date='+bb+'&end_date='+bb+'&company_id='+this.gues.industry)
        .then((res)=>{
            let aa= res.data.data.filter(n=>n.value>0)
                    if(aa.length!==0){
                        this.trade1.calculable=false;
                    }
                    else{this.trade1.calculable=true}
                    this.trade1.series[0].data=res.data.data;
                    this.trade1.legend.data=res.data.data.map(v=>v.name)
                    this.drawLine();this.pp=res.data.total
        })/*/
        axioIn.get('/api/data/channellist/')
         .then((res)=>{
            this.deployi=res.data.data;
            this.deployi.map(n=>this.$set(n,'a1',false));
            })
        // axioIn.get('api/data/channel/get_channel_allday/?idpych=1|2|8&start_date='+bb+'&end_date='+bb)
        //  .then((res)=>{
        //      if(res.data.data.length!==0){
        //         res.data.data.map(n=>n.type='line');
        //         this.trade2.series=res.data.data;
        //         this.trade2.legend.data=res.data.data.map(n=>n.name)
        //         this.drawLine1();}
        //         })
    },
   methods:{
        drawLine:function(){
           let myChart = echarts.init(document.getElementById('myChart'));
            myChart.setOption(this.trade)
            let myChart1 = echarts.init(document.getElementById('myChart1'));
            myChart1.setOption(this.trade1)
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
        incrementTi:function(a){this.deplo.date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.deplo.date=''}},
        incrementTi1:function(a){this.gues.date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.gues.date=''}},
        incrementTi2:function(a){this.ke.start_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.ke.start_date=''}},
        incrementTi3:function(a){this.ke.end_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.ke.end_date=''}},
        increment1:function(a){this.deplo.start_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.deplo.start_date=''}},
        increment2:function(a){this.deplo.end_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.deplo.end_date=''}},
        increment3:function(a){this.gues.start_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.gues.start_date=''}},
        increment4:function(a){this.gues.end_date=a;if(new Date(a)>this.today){alert('不能选择未来日期');this.gues.end_date=''}},
        hide:function(){
            this.date_s=false;this.date_s1=false;
            this.date_s2=false;this.date_s3=false;
            this.date1=false;this.date2=false
            this.date3=false;this.date4=false},
        focu:function(){this.date_s=true},
        focu1:function(){this.date_s1=true},
        focu2:function(){this.date_s2=true},
        focu3:function(){this.date_s3=true},
        foc1:function(){this.date1=true},
        foc2:function(){this.date2=true},
        foc3:function(){this.date3=true},
        foc4:function(){this.date4=true},
        blurr1:function(){},
        change_tab:function(){
            this.span_act=!this.span_act
        },
        choose:function(index){
            this.industry.map(n=>n.a1=false)
            this.industry[index].a1=true;
            },
        choose1:function(index){
            this.deployy.map(n=>n.a1=false)
            this.deployy[index].a1=true;
        },
        choose2:function(index){
            this.deployi.map(n=>n.a1=false)
            this.deployi[index].a1=true;
        },
        add_char:function(){
            let aaq=this.deployi.filter((n)=>n.a1===true);
            if(aaq.length===0){alert('渠道为必选');return}
            if(this.item.length>9){alert('最多添加10个指数');return}
            else {
                var aa;var bb;var cc;var dd;var ee;var ff;
                this.industry.map(n=>{if(n.a1===true){aa=n.industry;dd=n.id}})
                this.deployy.map(n=>{if(n.a1===true){bb=n.value;cc=n.id}})
                this.deployi.map(n=>{if(n.a1===true){ee=n.name;ff=n.id}})
                if(aa===undefined&&bb===undefined){if(this.item.indexOf(ee)<0){this.item.push(ee);this.itee.push('0|0|'+ff)}else{alert('不能添加重复指数')}}
                else if(aa===undefined&&this.item.indexOf(bb+'|'+ee)<0&&this.item.indexOf(cc+'|'+ff)<0){this.item.push(bb+'|'+ee);this.itee.push('0|'+cc+'|'+ff)}
                else if(bb===undefined&&this.item.indexOf(dd+'|'+ee)<0&&this.itee.indexOf(dd+'|'+ff)<0){this.item.push(aa+'|'+ee);this.itee.push(dd+'|0'+'|'+ff)}
                else if((aa!==undefined&&bb!==undefined)) {
                    if(this.item.indexOf(aa+'|'+bb+'|'+ee)<0){this.item.push(aa+'|'+bb+'|'+ee)}else{alert('不能添加重复指数')}
                    if(this.itee.indexOf(dd+'|'+cc+'|'+ff)<0){this.itee.push(dd+'|'+cc+'|'+ff)}
                    }
                else{alert('不能添加重复指数')}
            }
        },
        delet_ex:function(index){
            this.item.splice(index,1);
            this.itee.splice(index,1)
        },
        add_index:function(index){
            this.indushow=true;
            this.industry.map(n=>n.a1=false);
            this.deployy.map(n=>n.a1=false);
        },
        lose_focu:function(index){
            this.indushow=false;
            this.industry.map(n=>n.a1=false);
            this.deployy.map(n=>n.a1=false);
            this.deployi.map(n=>n.a1=false);
        },
        search_bu:function(){
            let aa=false;
            for(let a in this.deplo){
                if(this.deplo[a]===''){aa=true}
            }
            if(aa===true){alert('请完善输入信息')}
            else{
                axioIn.get('api/data/channel/get_channel_inquiries/?start_date='+this.deplo.start_date+'&end_date='+this.deplo.end_date+'&industry='+this.deplo.industry+'&deploy_way='+this.deplo.deploy_way)
                .then((res)=>{
                    let aa= res.data.data.filter(n=>n.value>0)
                    if(aa.length!==0){
                        this.trade.calculable=false;
                    }
                    else{this.trade.calculable=true}
                        this.trade.series[0].data=res.data.data;
                        this.trade.legend.data=res.data.data.map(v=>v.name)
                        this.drawLine();this.pp=res.data.total
                })
            }
            
        },
        search_industry:function(){
            if(this.gues.industry===''||this.gues.start_date===''||this.gues.end_date===''){alert('请完善输入信息')}
            else{
            axioIn.get('api/data/channel/get_channel_inquiries/?start_date='+this.gues.start_date+'&end_date='+this.gues.end_date+'&company_id='+this.gues.industry)
            .then((res)=>{
                let aa= res.data.data.filter(n=>n.value>0)
                    if(aa.length!==0){
                        this.trade1.calculable=false;
                    }
                    else{this.trade1.calculable=true}
                    this.trade1.series[0].data=res.data.data;
                    this.trade1.legend.data=res.data.data.map(v=>v.name)
                    this.drawLine();this.pp=res.data.total
                })
            }
        },
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
                //let aa='';
                if(this.itee.length===0){alert('指数不可为空');return}
                let aa=this.itee.join('&idpych=');
                //console.log(aa)
                axioIn.get('api/data/channel/get_channel_allday/?idpych='+aa+'&start_date='+this.ke.start_date+'&end_date='+this.ke.end_date)
            .then((res)=>{
                if(res.data.data.length!==0){
                res.data.data.map(n=>n.type='line');
                this.trade2.series=res.data.data;
                this.trade2.legend.data=res.data.data.map(n=>n.name)
                //console.log(JSON.stringify(res.data.data))
                //console.log(JSON.stringify(this.trade2.series))
                this.drawLine1();}
                else{alert('没有数据')}
            })
            }
        },
        expor:function(){
            if(this.span_act===true){
                if(this.deplo.start_date===''||this.deplo.end_date===''){alert('日期不可为空')}
                else{
                  window.open('api/data/channel/csv_channel_inquiries/?start_date='+this.deplo.start_date+'&end_date='+this.deplo.end_date+'&industry='+this.deplo.industry+'&deploy_way='+this.deplo.deploy_way)
                }
            }
            else{
                if(this.gues.start_date===''||this.gues.end_date===''||this.gues.industry===''){alert('企业id，日期为必填')}
                else{
                  window.open('api/data/channel/csv_channel_inquiries/?start_date='+this.gues.start_date+'&end_date='+this.gues.end_date+'&company_id='+this.gues.industry)
               }
            }
        },
        export1:function(){
            if(this.itee.length===0){alert('指数不可为空');return}
            let aa=this.itee.join('&idpych=');
            if(this.ke.start_date===''||this.ke.end_date===''){alert('开始时间和结束时间为必填')}
            else{
            window.open('api/data/channel/csv_channel_allday/?&idpych='+aa+'&start_date='+this.ke.start_date+'&end_date='+this.ke.end_date)
        }}
   }
  
}
</script>

<style lang='scss' scoped>
    .line1{
        .ji{width:442px;float:left;margin:10px 0 0 0;
        
            }
        .jii{width:100%;display: inline-block;margin:10px 0;
            label{display: inline-block;width:70px;text-align:right;padding-right:10px;}
            select,input{border-radius:5px;border:1px solid gray;}
            select{width:302px;height:34px;margin-bottom:10px;option{padding:4px;}}
            input{width:290px;height:32px;margin:0;padding:0 5px;}
        }
        .so{margin:30px 94px;}
        .dat{left:189px!important}
        .out{position: absolute;right:120px;top:10px;height:34px;line-height: 34px;color:white;width:80px;background-color:rgba(3,124,240,1);border-radius: 5px;text-align: center;}
        .chart{width:100%;height:400px;background-color: white;}
        .tipp{margin-top:10px;background-color:white;text-align:left;height:54px;position: relative;border-bottom:1px solid #EDF2F5;
        span{display:inline-block;width:210px;height:34px;cursor: pointer;text-align: center;
            background-color:rgba(245,245,245,1);line-height: 34px;margin:10px 20px;border-radius:5px;}
        }
        .sactiv{color:rgba(3,124,240,1)}
        .expon{display: inline-block;background-color:#f5f5f5;margin:0 5px ;height:25px;line-height: 25px;text-align: center;padding-left:8px;}
        .cloi{width:28px;height:19px;display:inline-block;background:url(../assets/close.png) no-repeat 10px 10px;}
        .dactiv{color:#0386F0;background:url(../assets/tic.png) no-repeat right;}
        .indus{text-align: left;
            li{display: inline-block;width:100px;text-align: center;cursor: pointer;margin:5px 0;}}
        .left{text-align: left;padding:5px 20px;border: 1px solid #EDF2F5;}
        .lef{text-align: left;position: relative}
        .right{text-align: right;}
        .a1{display: inline-block;width:50px;height:24px;line-height:24px;border: 1px solid #EDF2F5;color:white;margin:10px 30px;text-align: center;background-color: #0386F0;border-radius: 5px;}
        .cho{margin-right:30px;}
        .time{border:1px solid gray;display: inline-block;border-radius:5px;
        input{width:123px;height:30px;border:0;margin:0 5px 0;}
        .da{left:172px!important;}
        .da1{left:190px!important;}
        }
    }
</style>

