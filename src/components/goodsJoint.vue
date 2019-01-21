/*
 * @Author: liuqian 
 * @Date: 2018-01-30 10:40:02 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-05-09 20:58:30
 */
<template>
  <div class="goodsJoint">
      <!-- <div class="header">商城管理 > <strong>组合商品配置</strong></div> -->
      <div class="increased">
          <label for="">组合商品编码</label><input style="margin-right:40px;" type="text" v-model="goods.m_goods_sn" @keyup.enter="search"/>
          <label for="">组合商品名称</label><input type="text" v-model="goods.m_goods_name" @keyup.enter="search"/>
          <a href="javascript:void(0)" class="search" @click='search()'>搜索</a>
          <a href="javascript:void(0)" @click='chon()'>重置</a></div>
      <div class="content">
        <div class="frontAdd"><a href="javascript:void(0)" @click="addLabel" >新增</a></div>
        <p class="generic">
            <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
            <a href="javascript:void(0)" class="wid4">组合商品编码</a>
            <a href="javascript:void(0)" class="wid4">组合商品名称</a>
            <a href="javascript:void(0)" class="wid4">操作</a>
        </p>
        <ul class="it">
            <li v-for="(item,index) in label_data" :key="index">
                <span class="wid_1 wid4">{{item.index}}</span>
                <span class="wid4">{{item.m_goods_sn}}</span>
                <span class="wid4">{{item.m_goods_name}}</span>
                <span class="wid4">
                    <a href="javascript:void(0)" class="edit" @click="bian(item.id)"></a>
                    <a href="javascript:void(0)" class="delete"  @click='delet(item.id)'></a></span>
            </li> 
        </ul>
      </div>
      <div class="newTrade" v-show="editMessage">
          <div class="describe">
              <span class="title">{{editType}}</span><i class="close" @click="closeDialog"></i>
          </div>
          <div class="fillContent">
              <div class="tradeContent" style="margin-bottom:12px;">
                <label for="">商品分类名称</label>
                <select name="" id="">
                    <option value=""></option>
                </select>
              </div>
              <div class="tradeContent">
                <span>所属父类</span><input type="text" />
              </div>
          </div>          
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel">取消</a>
              <a href="javascript:void(0)" class="save">提交</a>
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
import Router from "../router/index";
import axioIn from '../store/axioIn';
import Pagination from './pagination';
axioIn.defaults.headers['Content-Type'] = 'application/json';
export default {
  name: 'goodsJoint',
  components: {Shade, Pagination},
  data: function(){
    return {
        shade: false,
        pageIndex: 1,//当前页
        rowNum: '',
        page: '',
        editMessage: false,
        editType: '新增',
        label_data: [{index: 1,sort: '客户案例',commodify: 'B2B'},{index: 2,sort: '客户案例',commodify: 'B2B'}],
        goods:{m_goods_name:'',m_goods_sn:''}
    }
  },
  mounted: function(){
      if(!this.$route.query.flag){this.$store.state.saveInfo=null}
      if(this.$store.state.saveInfo){
          
          this.pageIndex = this.$store.state.saveInfo.page;
        this.goods = this.$store.state.saveInfo.sear;
        axioIn.get('/api/goods/multipleprodut/?m_goods_name='+this.goods.m_goods_name+'&m_goods_sn='+this.goods.m_goods_sn+'&page='+this.pageIndex)
            .then((res)=>{
                this.$store.commit('setLoading', false);
                if(res.data.results.length===0){alert('未搜索到结果')}
                else{
                this.label_data=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;}
            })
      }else{
          axioIn.get('/api/goods/multipleprodut/')
        .then((res)=>{
            this.$store.commit('setLoading', false);
            this.label_data=res.data.results;
            this.page=res.data.page_num.total_page;
            this.rowNum = res.data.page_num.total_count;
            this.pageIndex = 1;
        })
      } 
  },
  methods: {
      search:function(){
          axioIn.get('/api/goods/multipleprodut/?m_goods_name='+this.goods.m_goods_name+'&m_goods_sn='+this.goods.m_goods_sn)
                .then((res)=>{
                    if(res.data.results.length===0){alert('未搜索到结果')}
                    else{
                    this.label_data=res.data.results;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;this.pageIndex = 1;}
                })
      },
      chon:function(){
          this.goods={m_goods_name:'',m_goods_sn:''};
          axioIn.get('/api/goods/multipleprodut/')
                .then((res)=>{
                    this.label_data=res.data.results;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;this.pageIndex=1;
                })
      },
      addLabel:function() {
          Router.push('./addJoint')
      },
      closeDialog:function() {
          this.editMessage = false;this.shade = false;
      },
      bian:function(id){ 
           var obj = {};obj.page = this.pageIndex;obj.sear = this.goods;
            this.$store.commit('savePage',obj);   
          Router.push({path:'/addJoint',query:{id:id}})
      },
      delet:function(id){
          if(confirm('确定删除吗？')){
                axioIn.delete('/api/goods/multipleprodut/'+id+'/').then(res=>{
                    axioIn.get('/api/goods/multipleprodut/')
                    .then((res)=>{
                        this.label_data=res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                        this.pageIndex = 1;
                    })
                })
          }
       },
      incrementTotal:function(q) {
          axioIn.get('/api/goods/multipleprodut/?page='+q)
                .then((res)=>{
                    this.label_data=res.data.results;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.pageIndex = q;
                })
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.goodsJoint{width:100%;margin:auto;background:#edf2f5;
    .header{height:36px;line-height:36px;background-color: #fff;margin:0 auto;margin-bottom:0;border-radius:5px;}
    .increased{line-height:60px;text-align:left;margin: 0 0 15px 0;background: #fff;padding-left:15px;border-radius: 5px;
        label{color:#999;margin-right:20px;}
        input{width:200px;height:30px;padding-left:6px;box-sizing:border-box;border: 1px solid #999;border-radius:5px;}
        .search{margin:0 20px 0 30px;background-color: #0386f0;color:#fff;border: none;border:1px solid #0386f0;}
        a{display: inline-block;width:66px;height:34px;line-height:36px;background-color: #eee;color:#666;border-radius:5px;text-align:center;border:1px solid #bcc3ca;}
    }
    .frontAdd{width:100%;height:64px;background:#fff;text-align:left;/**/
    a{display: inline-block;width:70px;height:32px;background:#0386f0;color:#fff;text-align:center;line-height: 32px;margin:16px 0 0 20px;border-radius:5px;}}
    .generic{height:55px;line-height: 55px;text-align: left;background:#dfe5e6;}
    .c1,.c2,.c3,.c4{color:#666666;display:inline-block;}
    .c1{margin-left:22px;width:222px;}
    .c2{width:322px;}
    .c3{width:322px;}
    .c4{width:122px;}
    .it{background-color:white;text-align:left;li{padding:9px 0;border-bottom: 1px solid #eee;}}
    .edit,.delete{width:20px;height:20px;display:inline-block;}
    .edit{background:url(../assets/bian1.png) no-repeat center;margin-right:10px;}
    .delete{background:url(../assets/dele.png) no-repeat center;}
    .newTrade{position: absolute;top:20%;left:30%;z-index:30;width:540px;height:212px;background:#fff;border-radius:5px;
        .describe{height:44px;line-height:44px;
            .title{float:left;margin-left:22px;color:#666;}
            .close{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
        }
        .fillContent{padding:18px 0 20px 0;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9;
            .tradeContent{text-align: left;font-size:0;
                span,label{display:inline-block;color:#666;font-size:12px;width:84px;text-align:right;margin:0 20px;}
                input,select{width:396px;height:30px;outline:none;border:1px solid #d2d8db;border-radius:5px;padding-left:5px;box-sizing: border-box;}
            }
        }
        .operate{height:56px;line-height:56px;
            a{display: inline-block;width:68px;height:30px;line-height:30px;border:1px solid #d9d9d9;border-radius:5px;text-align:center;color:#000;margin-top:10px;}
            .save{background-color:#0386f0;margin:0 20px 0 10px;color:#fff;}
        }
    
    }

}
</style>


