/*
 * @Author: liuqian 
 * @Date: 2018-01-26 18:08:29 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-04-18 10:56:06
 */
<template>
  <div class="commodifyModule">
      <!-- <div class="header">商城管理 > <strong>商品模块配置</strong></div> -->
        <div class="increased">
            <label for="">商品模块</label>
            <input v-model="searchModule.name" style="margin-right:28px;" type="text"  @keyup.enter="searchBtn"/>
            <a href="javascript:void(0)" class="search" @click="searchBtn">搜索</a>
            <a href="javascript:void(0)" @click="reset">重置</a>
        </div><!--<label for="">所属父类（商品模块）</label><input v-model="searchModule.pertain" type="text" />-->
      <div class="content">
        <div class="frontAdd"><a href="javascript:void(0)" @click="addLabel">新增</a></div>
        <p class="generic">
            <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
            <a href="javascript:void(0)" class="wid4">商品模块</a>
            <a href="javascript:void(0)" class="wid4">所属父类</a>
            <a href="javascript:void(0)" class="wid4">操作</a>
        </p>
        <ul class="it">
            <li v-for="(item,index) in label_data" :key="index">
                <span class="wid_1 wid4">{{item.index}}</span>
                <span class="wid4">{{item.model_name}}</span>
                <span class="wid4">{{item.good_parents}}</span>
                <span class="wid4"><a href="javascript:void(0)" @click="editInfo(item)" class="edit" ></a><a href="javascript:void(0)" class="delete" @click="deleteInfo(item.id)" ></a></span>
            </li>
        </ul>
      </div>
      <div class="newTrade" v-show="editMessage">
          <div class="describe">
              <span class="title">{{editType}}</span><i class="close" @click="closeDialog"></i>
          </div>
          <div class="fillContent">
              <div class="tradeContent" style="margin-bottom:12px;">
                <label>商品模块名称</label>
                <input type="text" v-model="moduleInfo.decri" />
              </div>
              <div class="tradeContent dropSearch">
                <span>所属父类</span>
                <input class="single" type="text" readonly="readonly" @click="addressShow()" v-model="pitchSingle" /><em class="icon"></em>
                <div class="serviceAddress" v-show="singshow" @mouseleave="addressHide()">
                    <div class="search"><input type="text" v-model="definiteSear" /><img style="margin-left:-30px;" src="../assets/cha1.png" alt="" @click="search_address()"></div>
                    <div class="choose">请选择</div>
                    <ul>
                        <li v-for='(item,index) in singleton_data' :key='index' @click="chooseAdd(item)">{{item.model_name}}</li>
                    </ul>
                    <Pagedevice :number='pageCount' v-on:increment="incrementTotal2" :page-index='pagePresent'></Pagedevice>                    
                </div>
                <!-- <select name="" id="" v-model="moduleInfo.parents">
                    <option :value="item.id" v-for="item in all_data">{{item.model_name}}</option>
                </select> -->
              </div>
          </div>
          
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click="closeDialog">取消</a>
              <a href="javascript:void(0)" class="save" @click="referInfo">提交</a>
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
import Pagedevice from './pageDevice';
axioIn.defaults.headers['Content-Type'] = 'application/json';
export default {
  name: 'commodifyModule',
  components: {Shade, Pagination,Pagedevice},
  data: function(){
    return {
        shade: false,
        pageIndex: 1,//当前页
        rowNum: '',
        page: '',
        editMessage: false,
        editType: '',
        searchModule: {name: ''},/*,pertain: '',pertainId: ''*/
        moduleInfo: {decri: '',parents: ''},
        label_data: [],
        all_data: [],
        editId: '',
        search_state: false,
        pitchSingle: '',//以下为新增处的下拉检索列表以及分页所用变量
        singshow: false,
        definiteSear: '',
        singleton_data: [],
        pageCount: '',
        pagePresent: 1
    }
  },
  mounted: function(){
      axioIn.get('/api/goods/filtermodel/').then(res=>{
          this.$store.commit('setLoading', false);
          this.singleton_data = res.data.results;
          this.pageCount = res.data.page_num.total_page;this.pagePresent = 1;
      })
      this.initialize_data()
  },
  methods: {
      searchBtn () {
          let reg = /^[a-zA-Z\u4e00-\u9fa5\d]+$/;
          if(this.searchModule.name === ''){
              alert('未查询到结果');return
          }else{
            if(this.searchModule.name.length > 16){
                alert('输入框最多只能输入16个字');return
            }else {
                if(!reg.test(this.searchModule.name)){
                    alert('输入框内只能输入汉字，英文字母，数字');return
                }
            }
          }
          axioIn.get('/api/goods/goodsmodel/?model_name='+this.searchModule.name).then(res=>{
              if(res.data.results.length === 0){
                  alert('未搜索到结果');
                  this.searchModule.name = '';
                  this.initialize_data()
              }else if(res.data.results.length > 0){
                this.label_data = res.data.results;
                this.rowNum = res.data.page_num.total_count;this.page = res.data.page_num.total_page;
                this.pageIndex = 1;this.searchModule.pertainId = '';
              }
          })
      },
      referInfo: function(){ //保存
          let reg = /^[a-zA-Z\u4e00-\u9fa5\d]+$/
          if(this.moduleInfo.decri === ''){
              alert('商品模块名称为必填');return
          }else{
              if(this.moduleInfo.decri !== ''){
                  if(this.moduleInfo.decri.length > 16){
                      alert('输入框最多只能输入16个字');return
                  }else {
                      if(!reg.test(this.moduleInfo.decri)){
                          alert('输入框内只能输入汉字，英文字母，数字');return
                      }
                  }
              }
          }
          if(this.editType === '新增'){
              axioIn.post('/api/goods/goodsmodel/',{
                model_name: this.moduleInfo.decri,
                good_parents: this.moduleInfo.parents
              }).then(res=>{
                this.editMessage = false;this.shade = false;
                alert('保存成功');
                this.initialize_data()
              }).catch((err)=> alert(err.data.error));
          }else if(this.editType === '修改'){
              axioIn.put('/api/goods/goodsmodel/'+this.editId+'/',{
                model_name: this.moduleInfo.decri,
                good_parents: this.moduleInfo.parents
              }).then(res=>{
                this.editMessage = false;this.shade = false;
                alert('修改成功');
                if(this.search_state === false){
                    axioIn.get('/api/goods/goodsmodel/?page='+this.pageIndex).then(res=>{
                        this.label_data = res.data.results;
                        this.rowNum = res.data.page_num.total_count;this.page = res.data.page_num.total_page;
                    })
                }else{
                    axioIn.get('/api/goods/goodsmodel/?model_name='+this.searchModule.name+'&good_parents='+this.searchModule.pertain).then(res=>{
                        if(res.data.results.length > 0){
                            this.search_state = true;
                            this.label_data = res.data.results;
                            this.rowNum = res.data.page_num.total_count;this.page = res.data.page_num.total_page;
                            this.pageIndex = 1;
                        }
                    })
                }
                
              })
          }
      },
      addressShow () {
        this.singshow = true;this.definiteSear = '';
        axioIn.get('/api/goods/filtermodel/').then(res=>{
          this.singleton_data = res.data.results;
          this.pageCount = res.data.page_num.total_page;this.pagePresent = 1;
        })
      },
      addressHide () {
        this.singshow = false;
      },
      search_address () {
        if(this.definiteSear === ''){
            alert('请输入内容！');return;
        }
        axioIn.get('/api/goods/filtermodel/?model_name='+this.definiteSear).then(res=>{
          this.singleton_data = res.data.results;
          this.pageCount = res.data.page_num.total_page;this.pagePresent = 1;
        })
      },
      chooseAdd (item) {
        this.pitchSingle = item.model_name;this.moduleInfo.parents = item.id;this.singshow = false;
      },
      incrementTotal2 (n) {
        axioIn.get('/api/goods/filtermodel/?page='+n).then(res=>{
          this.singleton_data = res.data.results;
          this.pageCount = res.data.page_num.total_page;this.pagePresent = n;
        })
      },
      editInfo (item) {
          this.editMessage = true;this.shade = true;this.editType = '修改';this.editId = item.id;
          this.search_state = false;this.pitchSingle = '';
          axioIn.get('/api/goods/goodsmodel/'+ item.id+'/').then(res=>{
              this.moduleInfo.decri = res.data.model_name;
              this.moduleInfo.parents = res.data.good_parents;  
              this.pitchSingle = item.good_parents;    
          })
      },
      deleteInfo (id) { // 删除某一条数据
          if(confirm('确定删除吗？')){
              axioIn.delete('/api/goods/goodsmodel/'+ id+'/').then(res=>{
                this.initialize_data()
            })
          }
      },
      reset () {// 重置按钮
          this.searchModule.name = '';this.searchModule.pertain = '';
          this.initialize_data()
      },
      addLabel () {//新增按钮
          this.editMessage = true;this.shade = true;this.editType = '新增';this.pitchSingle = '';
          this.moduleInfo.decri = '';this.moduleInfo.parents = '';this.search_state = false;
      },
      closeDialog () {//关闭弹窗
          this.editMessage = false;this.shade = false;this.singshow = false;
      },
      initialize_data () {
          axioIn.get('/api/goods/goodsmodel/').then(res=>{
            this.label_data = res.data.results;
            this.rowNum = res.data.page_num.total_count;this.page = res.data.page_num.total_page;
            this.pageIndex = 1;
          })
      },
      incrementTotal (n) {
        n=(n===undefined?1:n);
        if(this.search_state){
             axioIn.get('/api/goods/goodsmodel/?model_name='+this.searchModule.name+'&page='+n)
            .then(res=>{
                this.label_data=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.pageIndex=n;
            })
        }else{
            axioIn.get('/api/goods/goodsmodel/?page='+n)
            .then(res=>{
                this.label_data=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.pageIndex=n;
            })
        }
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.commodifyModule{width:100%;margin:auto;background:#edf2f5;
    .header{height:36px;line-height:36px;background-color: #fff;margin:0 auto;margin-bottom:0;border-radius:5px;}
    .increased{line-height:60px;text-align:left;margin: 0 0 15px 0;background: #fff;padding-left:15px;border-radius: 5px;
        label{color:#999;margin-right:20px;}
        input{width:200px;height:30px;padding-left:6px;box-sizing:border-box;border: 1px solid #999;border-radius:5px;}
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
            .dropSearch{text-align: left;font-size:0;position: relative;
                // span,label{display:inline-block;color:#666;font-size:12px;width:118px;text-align:right;margin:0 20px;}
                input,select{width:396px;height:30px;outline:none;border:1px solid #d2d8db;border-radius:5px;padding-left:5px;box-sizing: border-box;}
                .single{padding-right:28px;cursor:default;}
                .icon{display:inline-block;background: url(../assets/tan.png) no-repeat;width:14px;height:6px;margin-left:-22px;}
                .serviceAddress{margin:0;padding:20px;padding-bottom:14px;width:356px;height:338px;position: absolute;top:32px;left:124px;z-index:10;background:#fff;box-shadow: 0 0 5px #ccc;border-radius:3px;
                    .search{margin:0;
                    input{width:350px;padding-right:35px;background:#fafafa;border:1px solid #ccc;}}
                    .choose{margin:0;font-size: 14px;line-height: 26px;}
                    ul li{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 26px;cursor: pointer;color:#666;font-size: 12px;}
                }
            }
        }
        .operate{height:56px;line-height:56px;
            a{display: inline-block;width:68px;height:30px;line-height:30px;border:1px solid #d9d9d9;border-radius:5px;text-align:center;color:#000;margin-top:10px;}
            .save{background-color:#0386f0;margin:0 20px 0 10px;color:#fff;}
        }
    
    }

}
</style>


