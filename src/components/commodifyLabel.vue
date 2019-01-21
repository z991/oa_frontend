/*
 * @Author: liuqian 
 * @Date: 2018-01-25 10:13:26 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-04-25 09:48:06
   last modified  by quya
   last modified time:2018/2/5 18:03
 */
<template>
  <div class="commodifyLabel">
      <!-- <div class="header">商城管理 > <strong>商品标签配置</strong></div> -->
      <div class="increased"><label for="">标签类别</label>
          <select name="" id="" v-model="ser.label_category">
              <option value=" ">---</option>
              <option value="3">产品类型</option>
              <option value="1">行业</option>
              <option value="2">客户案例</option>
              <option value="5">咨询量/月</option>
              <option value="4">客服规模</option>
              <option value="6">机器人</option>
          </select>
          <label for="">商品标签</label>
          <input type="text" v-model="ser.goods_tag"  @keyup.enter="ser_ch"/>
          <a href="javascript:void(0)" class="search" @click="ser_ch()">搜索</a>
          <a href="javascript:void(0)" @click="chon()">重置</a>
      </div>
      <div class="content">
        <div class="frontAdd"><a href="javascript:void(0)" @click="addLabel">新增</a></div>
        <p class="generic">
            <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
            <a href="javascript:void(0)" class="wid4">标签类别</a>
            <a href="javascript:void(0)" class="wid4">商品标签</a>
            <a href="javascript:void(0)" class="wid4">操作</a>
        </p>
        <ul class="it">
            <li v-for="item in label_data" :key='item.id'>
                <span class="wid_1 wid4">{{item.index}}</span>
                <span class="wid4">{{item.label_category}}</span>
                <span class="wid4">{{item.goods_tag}}</span>
                <span class="wid4">
                    <a href="javascript:void(0)" class="edit" @click="revise(item.id)"></a>
                    <a href="javascript:void(0)" class="delete" @click="delee(item.id)"></a></span>
            </li> 
        </ul>
      </div>
      <div class="newTrade" v-show="editMessage">
          <div class="describe">
              <span class="title">{{editType}}</span><i class="close" @click="closeDialog"></i>
          </div>
          <div class="fillContent">
              <div class="tradeContent" style="margin-bottom:12px;">
                <label for="">标签类别</label>
                <select name="" id="" v-model="aa.label_category">
                    <option value="3">产品类型</option>
                    <option value="1">行业</option>
                    <option value="2">客户案例</option>
                    <option value="5">咨询量/月</option>
                    <option value="4">客服规模</option>
                    <option value="6">机器人</option>
                </select><em class='ii'>*</em>
              </div>
              <div class="tradeContent">
                <span>商品标签</span><input type="text" v-model="aa.goods_tag" maxlength="16"/><em class='ii'>*</em>
              </div>
          </div>
          
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click='closeDialog()'>取消</a>
              <a href="javascript:void(0)" class="save" @click='bao()'>保存</a>
          </div>
      </div>
      <shade v-show="shade"></shade>
      <shade v-show="shade1" style='z-index:120'></shade>
      <!-- <shade v-show="aa1"></shade> -->
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex' class='pagg'></pagination>
      <div v-show='tip' class='tip'>
          <div >带<em class='ii'>*</em>为必填</div>
          <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div>
  </div>
</template>
<script>
import axios from 'axios';
import Shade from './shade';
import axioIn from '../store/axioIn';
import Pagination from './pagination';
axioIn.defaults.headers['Content-Type'] = 'application/json';
export default {
  name: 'commodifyLabel',
  components: {Shade, Pagination},
  data: function(){
    return {
        shade: false,
        pageIndex: 1,//当前页
        rowNum: 1,
        page: 1,
        editMessage: false,
        editType: '新增',
        label_data: [{index: 1,label_category: '客户案例',goods_tag: 'B2B'}],
        aa:{id:'',label_category:'',goods_tag:''},
        ser:{label_category: '',goods_tag: ''},
        shade1:false,
        tip:false,
    }
  },
  mounted: function(){
      this.initial();
      
  },
  methods: {
      addLabel:function(){
          this.editType='新增'
          this.aa.label_category='';this.aa.goods_tag='';
          this.editMessage = true;this.shade = true;
      },
      closeDialog:function(){
          this.editMessage = false;this.shade = false;
      },
      incrementTotal:function(q){
          this.initial(q);
          console.log(q)
      },
      bao:function(){
          if(this.aa.label_category===''||this.aa.goods_tag===''){this.shade1=true;this.tip=true;return}
          if(this.aa.id===''){
              axioIn.post('/api/goods/tagclass/',this.aa)
                .then((res)=>{
                     alert('保存成功')
                    this.editMessage = false;this.shade = false;
                    this.initial();
                })
          }
          else{
          axioIn.put('/api/goods/tagclass/'+this.aa.id+'/',this.aa)
          .then((res)=>{
              alert('保存成功')
              this.editMessage = false;this.shade = false;
               this.initial();
          })
      }
      },
      revise:function(id){
          this.editType='修改'
          this.editMessage = true;this.shade = true;
          axioIn.get('/api/goods/tagclass/'+id+'/')
          .then((res)=>{this.aa=res.data
          })
       },
      delee:function(id){
          if(!confirm('确定删除吗？')){return}
          axioIn.delete('/api/goods/tagclass/'+id+'/')
          .then((res)=>{
               alert('删除成功')
               this.initial();
          })
      },
      ser_ch:function(){
          var cc='';
          if(this.ser.label_category===''&&this.ser.goods_tag===''){alert('未搜索到结果');return}
          //var reg = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$")
          //if(!reg.test(this.ser.goods_tag)&&this.ser.goods_tag!=='')
            //{alert("商品标签请输入中文、数字和英文");return}
          //if(this.ser.label_category===undefined){cc='goods_tag='+this.ser.goods_tag}
          ///else{cc='label_category='+this.ser.label_category+'&goods_tag='+this.ser.goods_tag}
          axioIn.get('/api/goods/tagclass/?'+'label_category='+this.ser.label_category+'&goods_tag='+this.ser.goods_tag)
          .then((res)=>{
              if(res.data.results.length===0){alert('未搜索到结果')}
              else{
             var aa=['行业','客户案例','产品类型','客服规模','咨询量/月','机器人']
              this.label_data=res.data.results;
              this.label_data.map(n=>{
                    n.label_category=aa[n.label_category-1]
                })
              this.page=res.data.page_num.total_page;
              this.rowNum = res.data.page_num.total_count;   }
          })
      },
      chon:function(){
          
          this.ser={label_category: '',goods_tag: ''}
          //this.ser.label_category='';
          //this.ser.goods_tag='';
          this.initial();
      },
      initial:async function(q){//初始化页面
         var aa=['行业','客户案例','产品类型','客服规模','咨询量/月','机器人']
         var bb={};
         if(q===undefined){
            await  axioIn.get('/api/goods/tagclass/')
            .then((res)=>{
                this.$store.commit('setLoading', false);
                bb=res.data;
            })
         }
         else{
            await axioIn.get('/api/goods/tagclass/?page='+q)
            .then((res)=>{
                this.$store.commit('setLoading', false);
                bb=res.data;
            })
         }
                this.label_data=bb.results;
                this.label_data.map(n=>{
                    n.label_category=aa[n.label_category-1]
                })
                this.page=bb.page_num.total_page;
                this.rowNum = bb.page_num.total_count;
                
      },
      tipp:function(){this.shade1=false;this.tip=false;},
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.commodifyLabel{width:100%;margin:auto;background:#edf2f5;
    .header{height:36px;line-height:36px;background-color: #fff;margin:0 auto;margin-bottom:0;border-radius:5px;}
    .increased{line-height:60px;text-align:left;margin:  0 0 15px 0;background: #fff;padding-left:15px;border-radius: 5px;
        label{color:#999;margin-right:20px;}
        select{margin-right:28px;}
        input,select{width:200px;height:30px;padding-left:6px;box-sizing:border-box;border: 1px solid #999;border-radius:5px;}
        .search{margin:0 20px 0 30px;background-color: #0386f0;color:#fff;border: none;border:1px solid #0386f0;}
        a{display: inline-block;width:66px;height:32px;line-height:32px;background-color: #eee;color:#666;border-radius:5px;text-align:center;border:1px solid #bcc3ca;}
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


