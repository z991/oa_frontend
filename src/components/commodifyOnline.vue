/*
 * @Author: liuqian 
 * @Date: 2018-01-29 10:35:01 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-07-25 14:34:07
 */
<template>
  <div class="commodifyOnline">
      <!-- <div class="header">商城管理 > <strong>商品上架</strong></div> -->
      <div class="increased">
          <div class="clear">
            <p><label for="">商品编码</label><input type="text" v-model="goods_search.goods_sn" @keyup.enter="searchInfo"/></p>
            <p><label for="">商品名称</label><input type="text" v-model="goods_search.goods_name" @keyup.enter="searchInfo"/></p>
            <p><label for="">商品属性</label>
                <select name="" id="" v-model="goods_search.goods_attribute">
                    <option value=" ">---</option>
                    <option value="1">单件商品</option>
                    <option value="2">组合商品</option>
                </select>
            </p>
            <p><label for="">操作人</label><input type="text" v-model="goods_search.putaway_operator" @keyup.enter="searchInfo"/></p>
            <p style="position:relative;"><label for="">最近上架时间</label><input @focus="showStart" @blur="hide()" v-model="goods_search.putaway_recent_on_time"  type="text" readonly="true" @keyup.enter="searchInfo"/>
                 <datee @mouseleave.native='hide()' v-if="date_start" v-on:incrementt="incrementTi1" class='dat da'></datee>
            </p>
            <p style="position:relative;"><label for="">下架时间</label><input @focus="showEnd" @blur="hide()" type="text" v-model="goods_search.putaway_off_time" readonly="true" />
                 <datee @mouseleave.native='hide()' v-if="date_end" v-on:incrementt="incrementTi2" class='dat da'></datee>                
            </p>
            <p><label for="">上架状态</label>
                <select name="" id="" v-model="goods_search.putaway_on_status">
                    <option value=" ">---</option>
                    <option value="1">上架</option>
                    <option value="2">下架</option>
                    <option value="3">待上架</option>
                </select>
            </p>
            <p><label for="">售卖状态</label>
                <select name="" id="" v-model="goods_search.sell_status">
                    <option value=" ">---</option>
                    <option value="1">预售</option>
                    <option value="2">可售卖</option>
                </select>
            </p>
          </div>
          <div class="operateBtn">
              <a href="javascript:void(0)" class="search" @click="searchInfo">搜索</a><a href="javascript:void(0)" @click="reset">重置</a>
          </div>
      </div>
      <div class="content">
        <div class="frontAdd"><a href="javascript:void(0)" @click="addLabel">新增</a></div>
        <p class="generic">
            <a href="javascript:void(0)" class="wid_1 wid11">序号</a>
            <a href="javascript:void(0)" class="wid11">最近上架时间</a>
            <a href="javascript:void(0)" class="wid11">上架状态</a>
            <a href="javascript:void(0)" class="wid11">商品属性</a>
            <a href="javascript:void(0)" class="wid11">商品编号</a>
            <a href="javascript:void(0)" class="wid11">商品名称</a>
            <a href="javascript:void(0)" class="wid11">商品价格</a>
            <a href="javascript:void(0)" class="wid11">下架时间</a>
            <a href="javascript:void(0)" class="wid11">售卖状态</a>
            <a href="javascript:void(0)" class="wid11">操作人</a>
            <a href="javascript:void(0)" class="wid11">操作</a>
        </p>
        <ul class="it">
            <li v-for="(item,index) in online_data" :key="index">
                <span class="wid_1 wid11">{{item.index}}</span>
                <span class="wid11">{{item.putaway_recent_on_time}}</span>
                <span class="wid11">{{item.putaway_on_status}}</span>
                <span class="wid11">{{item.goods_attribute}}</span>
                <span class="wid11">{{item.goods_sn}}</span>   
                <span class="wid11">{{item.goods_name}}</span>
                <span class="wid11">{{item.put_price}}</span>
                <span class="wid11">{{item.putaway_off_time}}</span>
                <span class="wid11">{{item.sell_status}}</span>
                <span class="wid11">{{item.putaway_operator}}</span>
                <span class="wid11"><span @click="putaway(item.putaway_on_status,item)"><img v-if="item.putaway_on_status === '待上架' || item.putaway_on_status === '下架'" src="../assets/putaway.png" alt=""><img v-else src="../assets/soldOut.png" alt=""></span><a href="javascript:void(0)" @click="compile(item.goods_sn,item.goods_attribute)" class="edit" ></a><a href="javascript:void(0)" class="delete" @click="delete_info(item)" ></a></span>
            </li> 
        </ul>
      </div>
      <div class="newTrade" v-show="editMessage">
          <div class="describe">
              <i class="prompt"></i><span class="title">上架提示</span>
          </div>
          <div class="fillContent">
              <div class="tradeContent">
                确定是否提前{{putaway_state}}
              </div>
          </div>
          
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click="closeDialog">取消</a>
              <a href="javascript:void(0)" class="save" @click="commit_info">提交</a>
          </div>
      </div>
      <div class="putawayDate" v-show="editPutaway">
          <div class="describe">
              <i class="prompt"></i><span class="title">上架提示</span>
          </div>
          <div class="fillContent">
              <label for="">上架日期</label>
              <span class='time'>
                <input @focus="putStart" v-model="putTime.on_time" type="text" placeholder="Start date" readonly="true">~
                <datee v-if="put_start" @mouseleave.native='hide()' v-on:incrementt="incrementTi3" class='dat da'></datee>
                <input @focus="putEnd" v-model="putTime.off_time" type="text" placeholder="End date" readonly="true">
                <datee v-if="put_end" @mouseleave.native='hide()' v-on:incrementt="incrementTi4" class='dat da'></datee>
              </span>
          </div>
          
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click="closeDialog">取消</a>
              <a href="javascript:void(0)" class="save" @click="putaway_info">提交</a>
          </div>
      </div>
      <shade v-show="shade"></shade>
      <!-- <shade v-show="aa1"></shade> -->
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex' class='pagg'></pagination>

  </div>
</template>
<script>
import axios from 'axios';
import Shade from './shade';
import axioIn from '../store/axioIn';
import Pagination from './pagination';
import Datee from './date'
import Router from "../router/index";
axioIn.defaults.headers['Content-Type'] = 'application/json';
export default {
  name: 'commodifyOnline',
  components: {Shade, Pagination,Datee},
  data: function(){
    return {
        shade: false,
        pageIndex: 1,//当前页
        rowNum: '',
        page: '',
        ComplyChange:'',
        editMessage: false,
        editType: '新增',
        online_data: [],
        date_start: false,
        date_end: false,
        putaway_state: '',
        goods_search: {goods_sn: '',goods_name: '',goods_attribute: '',sell_status: '',putaway_on_status: '',putaway_recent_on_time: '',putaway_off_time: '',putaway_operator: ''},
        search_state: false,
        goods_sn: '',
        editPutaway: false,
        put_start: false,
        put_end: false,
        putTime: {on_time: '',off_time: '',goods_sn: ''}
    }
  },
  mounted: function(){
      if(!this.$route.query.flag){this.$store.state.saveInfo=null}
      if(this.$store.state.saveInfo){
          this.pageIndex = this.$store.state.saveInfo.page;
        this.goods_search = this.$store.state.saveInfo.sear;
        axioIn.get('/api/goods/listputaway/?page='+this.pageIndex,{params:this.goods_search}).then(res=>{
            this.$store.commit('setLoading', false);
            if(res.data.results.length === 0){
                alert('未搜索到结果')
            }else if(res.data.results.length > 0){
                let sellCode = ['','预售','可售卖'];
                this.search_state = true;
                this.online_data = res.data.results;
                this.online_data.map(n=>{n.sell_status = sellCode[n.sell_status];})
                this.page=res.data.page_num.total_page;this.rowNum = res.data.page_num.total_count;this.pageIndex=1;
            }           
          })
      }else{
          axioIn.get('/api/goods/listputaway/').then(res=>{
            this.$store.commit('setLoading', false);
            let sellCode = ['','预售','可售卖'];
            this.online_data = res.data.results;
            this.online_data.map(n=>{n.sell_status = sellCode[n.sell_status];})
            this.page=res.data.total_page;this.rowNum = res.data.total_count;this.pageIndex=1;
        })
        this.goods_sn = '';
      }
      
  },
  methods: {
      compile (id,attr) {
        //   let flag = false;
        //   for(var val in this.goods_search){
        //       if(this.goods_search[val] !== ''){
        //           flag = true;
        //       }
        //   }
        //   if(flag){this.$store.commit('condition',this.goods_search)} 
        var obj = {};obj.page = this.pageIndex;obj.sear = this.goods_search;
        this.$store.commit('savePage',obj);   
          Router.push({ path: "/addOnline",query: {goods_sn:id,attr: attr}});return
      },
      addLabel () {
          Router.push({ path: '/addOnline'})
      },
      commit_info () {
          if(this.putaway_state === '下架'){
              axioIn.put('/api/goods/oa_put_off/',{'goods_sn': this.goods_sn}).then(res=>{
                  this.trim_data();
                  this.goods_sn = '';this.editMessage = false;this.shade = false;
              })
            //   axioIn.get('/api/goods/oa_put_off/?goods_sn='+this.goods_sn).then(res=>{
            //       this.trim_data();
            //       this.goods_sn = '';this.editMessage = false;this.shade = false;
            //   })
          }else if(this.putaway_state === '上架'){
              this.shade = true;this.editPutaway = true;this.editMessage = false;
              for(var attr in this.putTime){
                  this.putTime[attr] = ''
              }
            //   axioIn.get('/api/goods/put_up/?id='+this.goods_id).then(res=>{
            //       this.trim_data();   
            //       this.goods_id = '';this.editMessage = false;this.shade = false;         
            //   })
          }
      },
      searchInfo () {
          //搜索
          this.ComplyChange = ''
          for(let i in this.goods_search){
            if(this.goods_search[i]!==''&&this.goods_search[i]!==undefined){
                if(this.ComplyChange.length===0){this.ComplyChange=i+'='+this.goods_search[i]}
                else{this.ComplyChange=this.ComplyChange+'&'+i+'='+this.goods_search[i]}
            }
          };
          axioIn.get('/api/goods/listputaway/?'+this.ComplyChange).then(res=>{
            if(res.data.results.length === 0){
                alert('未搜索到结果')
            }else if(res.data.results.length > 0){
                let sellCode = ['','预售','可售卖'];
                this.search_state = true;
                this.online_data = res.data.results;
                this.online_data.map(n=>{n.sell_status = sellCode[n.sell_status];})
                // this.convert(this.online_data);
                this.page=res.data.total_page;this.rowNum = res.data.total_count;
                this.pageIndex=1;
            }           
          })
      },
      putaway (status,item) {
          console.log(status)
          this.putTime.status = status;
          this.goods_sn = item.goods_sn;
          if(status === '上架'){
              this.putaway_state = '下架';
          }else if(status === '下架' || status === '待上架'){
              this.putaway_state = '上架';
          }
          this.editMessage = true;this.shade = true;
      },
      delete_info (item) {
          console.log(item.putaway_on_status)
          if(confirm('确定删除吗？')){
              axioIn.delete('/api/goods/delete_put/?goods_sn='+item.goods_sn+'&putaway_on_status='+item.putaway_on_status).then(res=>{
                this.trim_data()
            })
          }
      },
      putaway_info () {
          if(this.putTime.on_time === '' || this.putTime.off_time === ''){
              alert('请输入上架的起始日期');return;
          }
          this.putTime.goods_sn = this.goods_sn;
          axioIn.put('/api/goods/oa_put_up/',this.putTime).then(res=>{
              this.closeDialog()
              this.trim_data(this.pageIndex)
          })
        //   axioIn.get('/api/goods/oa_put_up/',{
        //       params: this.putTime
        //   }).then(res=>{
        //       this.closeDialog()
        //       this.trim_data(this.pageIndex)
        //   }).catch(err=>{alert(err.data.error)})
      },
      putStart () {this.put_start = true;},
      putEnd () {this.put_end = true;},
      showStart () {this.date_start = true;},
      showEnd () {this.date_end = true;},
      hide () {this.date_start = false;this.date_end = false;this.put_start = false;this.put_end = false;},
      closeDialog () {this.editMessage = false;this.editPutaway = false;this.shade = false;this.goods_sn = '';this.putTime.status = '';},
      reset () {
        this.trim_data();
        for(var n in this.goods_search){
            this.goods_search[n] = '';
        }
      },
      incrementTi1:function(a){
        this.goods_search.putaway_recent_on_time=a;
        if(this.goods_search.putaway_off_time!==''){
              if(new Date(this.goods_search.putaway_off_time) < new Date(this.goods_search.putaway_recent_on_time)){
                  alert('下架时间不能早于上架时间');
                  this.goods_search.putaway_recent_on_time = '';
              }
          }
      },
      incrementTi2:function(a){
          this.goods_search.putaway_off_time=a;
          if(this.goods_search.putaway_recent_on_time!==''){
              if(new Date(this.goods_search.putaway_off_time)< new Date(this.goods_search.putaway_recent_on_time)){
                  alert('下架时间不能早于上架时间');
                  this.goods_search.putaway_off_time = '';
              }
           }
      },
      incrementTi3 (a) {
          var today=new Date();this.putTime.on_time = a;
          console.log()
          if(new Date(this.putTime.on_time)<new Date(today.toLocaleDateString())){alert('不能选择历史时间');this.putTime.on_time='';return;}
          if(this.putTime.off_time!==''){
              if(this.putTime.off_time=== this.putTime.on_time){alert('上下架日期不能选择同一天');this.putTime.on_time='';return}
              if(new Date(this.putTime.off_time)< new Date(this.putTime.on_time)){
                  alert('下架时间不能早于上架时间');
                  this.putTime.on_time = '';
              }
           }
      },
      incrementTi4 (a) {
          var today=new Date();this.putTime.off_time = a;
          if(new Date(this.putTime.off_time)<new Date(today.toLocaleDateString())){alert('不能选择历史时间');this.putTime.off_time='';return;}
          if(this.putTime.off_time===this.putTime.on_time){alert('上下架日期不能选择同一天');this.putTime.off_time='';return}
          if(this.putTime.on_time!==''){
              if(new Date(this.putTime.off_time)< new Date(this.putTime.on_time)){
                  alert('下架时间不能早于上架时间');
                  this.putTime.off_time = '';
              }
           }
      },
      incrementTotal (n) {
         if(this.ComplyChange===''){
         axioIn.get('api/goods/listputaway?page='+n).then(res=>{
            let sellCode = ['','预售','可售卖'];
            this.online_data = res.data.results;
            this.online_data.map(n=>{n.sell_status = sellCode[n.sell_status];})
            // this.convert(this.online_data);
            this.page=res.data.total_page;this.rowNum = res.data.total_count;this.pageIndex=n;
          })
         }else{
            let aa = ''
          for(let i in this.goods_search){
            if(this.goods_search[i]!==''&&this.goods_search[i]!==undefined){
                if(aa.length===0){aa=i+'='+this.goods_search[i]}
                else{aa=aa+'&'+i+'='+this.goods_search[i]}
            }
          };
            axioIn.get('api/goods/listputaway?page='+n+'&'+aa).then(res=>{
                let sellCode = ['','预售','可售卖'];
                this.online_data = res.data.results;
                this.online_data.map(n=>{n.sell_status = sellCode[n.sell_status];})
                // this.convert(this.online_data);
                this.page=res.data.total_page;this.rowNum = res.data.total_count;this.pageIndex=n;
          })
         }
    
      },
      trim_data (n) {
        n?n:n=1;
        axioIn.get('/api/goods/listputaway/?page='+n).then(res=>{
            let sellCode = ['','预售','可售卖'];
            this.online_data = res.data.results;
            this.online_data.map(n=>{n.sell_status = sellCode[n.sell_status];})
            this.page=res.data.total_page;this.rowNum = res.data.total_count;this.pageIndex=n;
        })
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.commodifyOnline{width:100%;margin:auto;background:#edf2f5;
    .clear:after{ content: ""; display: block; clear: both;}
    .header{height:36px;line-height:36px;background-color: #fff;margin:0 auto;margin-bottom:0;border-radius:5px;}
    .increased{text-align:left;padding:32px 0 22px 0;border-radius: 5px; margin: 0 0 15px 0;background: #fff; 
        p{float:left;font-size:0;}
        label{display:inline-block;width: 80px;text-align:right;font-size:12px; color:#999;margin-right:20px;margin-bottom: 18px;}
        input,select{width:198px;height:30px;border: 1px solid #999;border-radius:5px;padding-left:6px;box-sizing:border-box;}
        .search{margin:0 20px 0 30px;background-color: #0386f0;color:#fff;border: none;border:1px solid #0386f0;}
        a{display: inline-block;width:66px;height:34px;line-height:36px;background-color: #eee;color:#666;border-radius:5px;text-align:center;border:1px solid #bcc3ca;}
    }
    .operateBtn{text-align:right;}
    .frontAdd{width:100%;height:64px;background:#fff;text-align:left;/**/
    a{display: inline-block;width:70px;height:32px;background:#0386f0;color:#fff;text-align:center;line-height: 32px;margin:16px 0 0 20px;border-radius:5px;}}
    .generic{height:55px;line-height: 55px;text-align: left;background:#dfe5e6;}
    .c1,.c2,.c3,.c4{color:#666666;display:inline-block;}
    .c1{margin-left:15px;width:120px;}
    .c2{margin-left:10px;width:80px;}
    .c3{width:322px;}
    .c4{width:122px;}
    .it{background-color:white;text-align:left;li{padding:9px 0;border-bottom: 1px solid #eee;span{display:inline-block;color:#666;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;img{margin:0 10px -2px 0;}}}}
    .edit,.delete,.move{width:20px;height:20px;display:inline-block;}
    .move{background:url(../assets/soldOut.png) no-repeat center;margin-right:10px;}
    .edit{background:url(../assets/bian1.png) no-repeat center;margin-right:10px;}
    .delete{background:url(../assets/dele.png) no-repeat center;}
    .newTrade,.putawayDate{position: absolute;top:20%;left:30%;z-index:30;width:320px;height:167px;background:#fff;border-radius:5px;
        .describe{height:44px;line-height:44px;text-align:left;
            .title{color:#0386f0;}
            .prompt{background:url(../assets/question.png) no-repeat;display:inline-block;width:18px;height:18px;vertical-align: middle;margin:0 10px 0 20px;}
            .close{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;}
        }
        .fillContent{height:68px;line-height:68px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9;
            .tradeContent{font-size: 12px;color:#666;
                span,label{display:inline-block;color:#666;font-size:12px;width:84px;text-align:right;margin:0 20px;}
                input,select{width:396px;height:30px;outline:none;border:1px solid #d2d8db;border-radius:5px;padding-left:5px;box-sizing: border-box;}
            }
        }
        .operate{height:56px;line-height:56px;
            a{display: inline-block;width:68px;height:30px;line-height:30px;border:1px solid #d9d9d9;border-radius:5px;text-align:center;color:#000;margin-top:10px;}
            .cancel{width:60px;}.save{width:48px;background-color:#0386f0;margin:0 20px 0 10px;color:#fff;}
        }
    
    }
    .putawayDate{width:420px;.fillContent{line-height:1;label{margin-right:10px;line-height:68px;}input{width:130px;height:30px;padding-left:5px;border:none;border:1px solid #ccc;border-radius:5px;}}}

}
</style>


