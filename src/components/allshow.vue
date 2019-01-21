<template>
    <div class="allshow">
        <p class="qu">数据管理 > 产品与运营统计 >总览</p>
      <p class="ji">
          <label for="">客户名称</label><input type="type" v-model="mess_search.company_name" @keyup.enter="search">
          <label for="">企业ID</label><input type="type" v-model="mess_search.company_id" @keyup.enter="search">
          <label for="">行业</label>
              <select name="" id="" v-model="mess_search.industry">
                  <option value=" ">---</option>
                  <option v-for='(it,index) in itr' :key="index" :value='it.id' >{{it.industry}}</option>
              </select>
          <label for="">部署方式</label>
              <select name="" id="" v-model="mess_search.deploy_way">
                <option value=" ">---</option>
                <option value="1">标准版</option>
                <option value="2">公有云</option>
                <option value="3">专属云</option>
                <option value="4">私有云</option>
              </select>
          <a href="javascript:void(0)" class="so" @click='search()'>搜索</a>
          <a href="javascript:void(0)" class="cho" @click='chon()'>重置</a></p>
          <p class="xinz"><a href="javascript:void(0)"  class="so" @click='add()'>数据项</a></p>
          <div v-show='message'>
                <p class='left basic'>基本信息<span class='mid'><span class='ms'>{{msi}}</span><span>/10</span></span></p>
                <p class='left guset'> 
                    <!--input type="checkbox" v-model="checkedNames" value='company_name'>客户名称
                    <input type="checkbox" v-model="checkedNames" value='company_id'-->
                    <input type="checkbox" v-model="checkedNames" value='industry'>行业
                    <input type="checkbox" v-model="checkedNames" value='deploy_way'>部署方式
                    <input type="checkbox" v-model="checkedNames" value='open_station_time'>开站日期
                    <input type="checkbox" v-model="checkedNames" value='close_station_time'>到期日期
                </p>
                <p class='left basic'>渠道咨询量</p>
                <p class='left guset'><span v-for='(it,index) in lists' :key="index">
                        <input type="checkbox"  v-model="checkedNames" :value='it.value' />{{it.name}}
                    </span>
                    </p>
                <p class='left basic'>咨询量</p> 
                <p class='left guset'><input type="checkbox" v-model="checkedNames" value='avg_inquiries'>日均咨询量
                    <input type="checkbox" v-model="checkedNames" value='sum_inquiries'>总咨询量
                    </p>
                <p class='left basic'>产品</p>
                <p class='left guset'><input type="checkbox" v-model="checkedNames" value='pact_products'>查看产品</p>
                <p class='left basic'>部署环境</p>
                <p class='left guset'><input type="checkbox" v-model="checkedNames" value='grid'>部署所在节点
                    <input type="checkbox" v-model="checkedNames" value='server_grp'>部署所在服务组
                    </p>
            </div>
           <p class="cp" >
                <a href="javascript:void(0)" class="c0">序号</a>
                <a href="javascript:void(0)" class="c3">客户名称</a>
                <a href="javascript:void(0)" class="c2">企业ID</a>
                <a href="javascript:void(0)" v-for='(it,index) in basic' :key="index" class="c2" v-show='it.ol' style="height:55px">
                    <!-- <div href="javascript:void(0)" v-if='it.value==="open_station_time"' class="c1" v-show='it.ol' @click="orderBy('open_station_time', toggleOrder1)">
                        <span>{{it.name}}</span> <span class="sortBy">    
                            <div><p v-bind:class="{'upActive': upIsActive, 'unUpActive': !upIsActive}"></p></div>
                            <div><p v-bind:class="{'downActive': downActive, 'unDownActive': !downActive}"></p></div>
                        </span>  
                    </div>      
                    <div href="javascript:void(0)" class="c1" v-else-if='it.value==="close_station_time"'  v-show='it.ol' @click="orderBy('close_station_time', toggleOrder2)">
                        <span>{{it.name}}</span><span class="sortBy">    
                            <div><p v-bind:class="{'upActive': upCloseActive, 'unUpActive' : !upCloseActive}"></p></div>
                            <div><p v-bind:class="{'downActive': downCloseActive, 'unDownActive' : !downCloseActive}"></p></div>
                        </span>
                    </div>
                    <a v-show='it.ol' v-else>{{it.name}}</a> -->
                    {{it.name}}
                </a>
            </p>
           <ul class="it">
              <li v-for="(item,index) in itee" :key="index">
                <a href="javascript:void(0)" class="c0">{{item.index}}</a>
                <span class="c3">{{item.company_name}}</span>
                <span class="c2">{{item.company_id}}</span>
                <span v-for="(it,index) in basic" :key="index">
               <a href="javascript:void(0)" class="cha c2" @click="cha(item.id)" v-if='it.value==="pact_products"' v-show='it.ol'></a>
                <a class="c2" v-show='it.ol' v-else>{{item[it.value]}}</a></span>
                <!--span class="c2"><a href="javascript:void(0)" class="cha" @click="cha()"></a>
                </span-->
            </li>
      </ul>
      <div class='neg' v-show='neg'>
          <p><span>小能科技</span><span>产品情况</span></p>
          <table>
              <tr><td>产品名称</td><td>使用状态</td></tr>
              <tr v-for='(i,index) in guset' :key="index"><td>{{i}}</td><td>使用中</td></tr>
          </table>
          <p><a href="javascript:void(0)" class='cloo' @click='cloo()'>关闭</a></p>
      </div>
      <shade v-show='shad'></shade>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
    </div>
</template>
<script>
import axioIn from '../store/axioIn'
import Pagination from './pagination';
import Shade from './shade';
export default {
    name:'allshow',
    components:{Shade,Pagination},
    data:function(){
        return{
            checkedNames:['company_name','company_id','industry','deploy_way','open_station_time','close_station_time', 'avg_inquiries' , 'sum_inquiries' , 'grid'],
            basic:[
                //{value:'company_name',name:'客户名称',ol:true},
                //{value:'company_id',name:'企业ID',ol:true},
                {value:'industry',name:'行业',ol:true},
                {value:'deploy_way',name:'部署方式',ol:true},
                {value:'open_station_time',name:'开站日期',ol:true},
                {value:'close_station_time',name:'到期日期',ol:true},
                {value:'avg_inquiries',name:'日均咨询量',ol:true},
                {value:'sum_inquiries',name:'总咨询量',ol:true},
                {value:'channel_pc',name:'web咨询量',ol:false},
                {value:'channel_wap',name:'wap咨询量',ol:false},
                {value:'channel_app',name:'app咨询量',ol:false},
                {value:'channel_wechat',name:'微信咨询量',ol:false},
                {value:'channel_weibo',name:'微博咨询量',ol:false},
                {value:'channel_android',name:'安卓咨询量',ol:false},
                {value:'channel_qq',name:'qq咨询量',ol:false},
                {value:'channel_ios',name:'ios咨询量',ol:false},
                {value:'channel_unknown',name:'其他渠道咨询量',ol:false},
                {value:'grid',name:'部署所在节点',ol:true},
                {value:'server_grp',name:'部署所在服务组 ',ol:false},
                {value:'pact_products',name:'查看产品',ol:false},
            ],
            itee:[{index:'2',company_name:22,company_id:12,sum_inquiries:2212}],
            message:true,
            msi:'9',
            page:'1',
            pageIndex:'1',
            mess_search:{company_name:'',company_id:'',industry:'',deploy_way:''},
            itr:'',
            guset:[],
            neg:false,
            shad:false,
            rowNum: '',
            search_open:'',
            bb:'',

            upIsActive: false,
            downActive: false,
            upCloseActive: false,
            downCloseActive: false,
            orderUrl: '',
            isOrderBy: false,
            toggleOrder1: false,
            toggleOrder2: false
        }
    },
    created:function(){
       axioIn.get('/api/data/pandect/')
        .then((res)=>{
            this.itee=res.data.results;
            this.pageIndex=1;
            this.search_open=false;
            this.page=res.data.page_num.total_page;//console.log(this.page)
            this.rowNum = res.data.page_num.total_count;
        }) 
    },
    mounted:function(){
        axioIn.get('/api/workorder/industry/')//所属行业
        .then((res)=>{/*console.log(res.data);*/
        this.itr=res.data;
        })
        
    },
    methods:{
        add:function(){this.message=!this.message;},
        incrementTotal:function(q){
             var url = "";
            if(this.isOrderBy){
                url = this.orderUrl
            }else {
                url = "/api/data/pandect/?";
            }
            if(this.search_open===false){
                axioIn.get(url + 'page=' + q )
                .then((res)=>{
                    this.itee=res.data.results;
                    this.pageIndex=q;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                })
           }else{
                 axioIn.get(url + this.bb + '&page=' + q)
                .then((res)=>{
                    this.itee=res.data.results;
                    this.pageIndex=q;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                })
           }
        },
        chon:function(){
            for(let i in this.mess_search){
                this.mess_search[i]='';
                this.search_open=false;
            }
            axioIn.get('/api/data/pandect/')
        .then((res)=>{
            this.itee=res.data.results;
            this.pageIndex=1;
            this.page=res.data.page_num.total_page;//console.log(this.page)
            this.rowNum = res.data.page_num.total_count;
            this.upIsActive = false;
            this.downActive = false;
            this.upCloseActive = false;
            this.downCloseActive =  false
        }) 
         },
        search:function(){
            var aa='';
            for(let i in this.mess_search){
                  if(this.mess_search[i]!==''&&this.mess_search[i]!==undefined){
                      if(aa.length===0){aa=i+'='+this.mess_search[i]}
                      else{aa=aa+'&'+i+'='+this.mess_search[i]}
                  }
          };this.bb=aa;
          axioIn.get('/api/data/pandect/?'+aa).then((res)=>{
                this.itee=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.search_open=true;
                if(this.itee.length == 0){
                    this.upIsActive =  false;
                    this.downActive = false;
                    this.upCloseActive =  false;
                    this.downCloseActive = false
                }
          })
        },
        cha:function(id){
            this.shad=true;this.neg=true;
            axioIn.get('/api/workorder/openstation/'+id+'/get_pact_products/')
            .then((res)=>{this.guset=res.data.data})
        },
        cloo:function(){
            this.shad=false;this.neg=false;
        },
        // 排序
        orderBy(type,value){
            if(this.itee.length == 0){
                return false
            }else{
                this.isOrderBy = true;
                if(type === 'open_station_time'){
                    this.upCloseActive = this.downCloseActive = this.toggleOrder2 = false;
                    this.toggleOrder1 = !this.toggleOrder1;
                if(value){
                    this.downActive = true;
                    this.upIsActive = false;
                }else{
                    this.upIsActive = true;
                    this.downActive = false;
                }
                this.orderUrl = '/api/data/pandect/?open_station_time=' + Number(this.upIsActive) + '&close_station_time=' + Number(this.upCloseActive);
                }else{
                    this.upIsActive = this.downActive = this.toggleOrder1 = false;
                    this.toggleOrder2 = !this.toggleOrder2;
                if(value){   
                    this.upCloseActive = false;
                    this.downCloseActive = true;
                }else{
                    this.downCloseActive = false;
                    this.upCloseActive = true;
                }
                this.orderUrl = '/api/data/pandect/?close_station_time=' + Number(this.upCloseActive);
                }
                axioIn.get(this.orderUrl)
                .then( res => {
                    if (res.data.length == 0) {
                      alert("未搜到相关信息");
                    } else {
                        this.page = res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                        this.search_open = true;
                        this.pageIndex = 1;
                        this.itee=res.data.results;
                    }
                })
                .catch(err => console.log(err)); 
            }
        },
    },
    watch:{
        checkedNames:function(newValue,oldValue){
            if(newValue.length>10){this.checkedNames=oldValue;this.msi=oldValue.length}
            else{
                this.msi=newValue.length;
            this.basic.map(i=>i.ol=false)
            newValue.map(n=>{
                this.basic.map(v=>{
                    if(v.value===n){v.ol=true;}
                })
            }) }
        }
    },
    computed:{
        lists:function(){
            return this.basic.filter(n=>{
                if(n.value.indexOf('channel')>-1){return n}
            })
        }
    }
  
}
</script>
<style lang='scss' scoped>
    .allshow{
         min-width: 1400px;
        .c2{width:120px;text-align: center;cursor:default;-moz-user-select:text;-webkit-user-select:text;}
        .c3{width:180px;text-align: center;cursor:default;-moz-user-select:text;-webkit-user-select:text;}
        .c0{width:38px;display: inline-block;margin-left:20px;text-align: center}
        .it{}
        .neg{width:260px;background-color:white;padding:15px;position: absolute;top:35%;left:35%;z-index:555;
        p{span{display: inline-block;margin: 15px 15px 15px 0;}}
        table{border-collapse:collapse;width:90%;margin:auto;
        td{padding:10px 20px;border:1px solid #ccc;}}
        .cloo{
            color:black;display: inline-block;margin:20px 0 5px 0;border-radius:5px;background-color:#ccc;width:120px;height:24px;line-height: 24px;
        }
        }
        .left{text-align: left;position: relative}
        .mid{position: absolute;right:20px;color:#666}
        select{width:120px;height:34px;line-height: 34px;margin:0 20px 0 10px;border-radius:5px;border:1px solid #999;
        option{padding:5px;}}
        .cha{background:url(../assets/cha1.png) no-repeat center;}
        .basic{font-size: 14px;margin:10px 20px;color:#999;}
        .guset{font-size: 12px;color: #666;margin:10px 0px;
        input{display: inline-block;margin: 0 10px 0 20px;}}
        .ms{color:#0386F0;}
        .leng{height:200px;overflow-y:scroll;}
        // up选中/未选中
        .upActive{
            margin-top: 18px;
            border-bottom: 8px solid #0386f0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }
        .unUpActive{
            margin-top: 18px;
            border-bottom: 8px solid white;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }
        // down选中/未选中
        .downActive{
            margin-top: 3px;
            border-top: 8px solid  #0386f0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }
        .unDownActive{
            margin-top: 3px;
            border-top: 8px solid  white;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
        }
        .c1 {
             width:120px;
             height: 100%;
             text-align: center;
             cursor: default;
             -moz-user-select:text;
             -webkit-user-select:text;
        }
        .c1 span{
            width: 40%;
            height: 55px;
            float: left;
        }
        .c1 span:nth-child(1){
            width: 60%;
            color: #666666;;
        }
        .sortBy div{
            width: 30%;
            height: 50%;
            overflow: hidden;
        }
    }
</style>

