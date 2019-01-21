/*
 * @Author: liuqian 
 * @Date: 2018-04-27 10:52:18 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-05-10 16:24:41
 */
<template>
  <div class="goods_standard">
      <!-- <div class="header">商城管理 > <strong>商品规格和参数设置</strong></div> -->
      <div class="increased"><label for="">商品模块</label><input style="margin-right:28px;" type="text" v-model="searchCon.param_model" @keyup.enter="searchBtn"/><label for="">字段名称</label><input style="margin-right:28px;" type="text" v-model="searchCon.file_name" @keyup.enter="searchBtn"/><a href="javascript:void(0)" class="search" @click="searchBtn">搜索</a><a href="javascript:void(0)" @click="reset">重置</a></div><!--<label for="">所属父类（商品模块）</label><input v-model="searchModule.pertain" type="text" />-->
      <div class="content">
        <div class="frontAdd"><a href="javascript:void(0)" @click="addStand">新增</a></div>
        <p class="generic">
            <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
            <a href="javascript:void(0)" class="wid4">字段名称</a>
            <a href="javascript:void(0)" class="wid4">所属商品模块</a>
            <a href="javascript:void(0)" class="wid4">操作</a>
        </p>
        <ul class="it">
            <li v-for="(item,index) in showList" :key="index">
                <span class="wid_1 wid4">{{item.index}}</span>
                <span class="wid4">{{item.file_name}}</span>
                <span class="wid4">{{item.param_model}}</span>
                <span class="wid4"><a href="javascript:void(0)" @click="editInfo(item.id)" class="edit" ></a><a href="javascript:void(0)" class="delete" @click="deleteInfo(item.id)" ></a></span>
            </li>
        </ul>
      </div>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex' class='pagg'></pagination>
  </div>
</template>
<script>
import axioIn from '../store/axioIn';
import Pagination from './pagination';
import Router from "../router/index";
export default {
  name: 'goods_standard',
  components: {Pagination},
  data () {
      return {
          page: '1',
          rowNum: '',
          pageIndex: 1,
          showList: [],
          searchCon: {file_name: '', param_model: ''},
          searchStatus: false
      }
  },
  created () {
      if(!this.$route.query.flag){this.$store.state.saveInfo=null}
      if(this.$store.state.saveInfo){
        this.pageIndex = this.$store.state.saveInfo.page;
        this.searchCon = this.$store.state.saveInfo.sear;
        axioIn.get('/api/goods/specification/?page='+this.pageIndex,{params: this.searchCon}).then(res=>{
            this.$store.commit('setLoading', false);
            if(res.data.results.length === 0){
                alert('未搜索到结果');
            }else {
                this.showList = res.data.results;
                this.page = res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;this.pageIndex = 1;
                this.searchStatus = true;
            }     
        }).catch((err)=> alert(err.data.error));
      }else{
          this.initialize();
          this.$store.commit('setLoading', false);
        this.searchStatus = false;
      }
  },
  methods: {
      addStand () {
          Router.push({ path: '/addStandard'})
      },
      editInfo (id) {
          var obj = {};obj.page = this.pageIndex;obj.sear = this.searchCon;
          this.$store.commit('savePage',obj);   
          Router.push({ path: "/addStandard",query: {id:id}});
      },
      deleteInfo (id) {
          if(confirm('确定删除吗？')){
            axioIn.delete('/api/goods/specification/'+id+'/').then(res=>{
                alert('删除成功！');
                this.initialize();
            }).catch(err=>{alert(err.data.error)})
          }
          
      },
      searchBtn () {
        if(this.searchCon.file_name === '' && this.searchCon.param_model === ''){
            alert('未搜索到结果');return
        }
        axioIn.get('/api/goods/specification/',{params: this.searchCon}).then(res=>{
            if(res.data.results.length === 0){
                alert('未搜索到结果');
            }else {
                this.showList = res.data.results;
                this.page = res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;this.pageIndex = 1;
                this.searchStatus = true;
            }     
        }).catch((err)=> alert(err.data.error));
      },
      reset () {
        this.initialize();
        for(var attr in this.searchCon){
            this.searchCon[attr] = ''
        }
        this.searchStatus = false;
      },
      incrementTotal (num) {
        if(this.searchStatus){
            axioIn.get('/api/goods/specification/?page='+num,{params: this.searchCon}).then(res=>{
                this.showList = res.data.results;
                this.page = res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;this.pageIndex = n;
            }).catch((err)=> alert(err.data.error));
        }else{
            this.initialize(num)
        }
      },
      initialize (n) {
        if(!n)n=1;
        axioIn.get('/api/goods/specification/?page='+n).then(res=>{
            this.showList = res.data.results;
            this.page = res.data.page_num.total_page;
            this.rowNum = res.data.page_num.total_count;this.pageIndex = n;
        }).catch((err)=> alert(err.data.error));
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.goods_standard{width:100%;margin:auto;background:#edf2f5;
    .header{height:36px;line-height:36px;background-color: #fff;margin:0 auto;margin-bottom:0;border-radius:5px;}
    .increased{line-height:60px;text-align:left;margin-bottom: 15px;background: #fff;padding-left:15px;border-radius: 5px;
        label{color:#999;margin-right:20px;}
        input{width:200px;height:30px;padding-left:6px;box-sizing:border-box;border: 1px solid #999;border-radius:5px;}
        .search{margin:0 20px 0 30px;background-color: #0386f0;color:#fff;border: none;border:1px solid #0386f0;}
        a{display: inline-block;width:66px;height:34px;line-height:36px;background-color: #eee;color:#666;border-radius:5px;text-align:center;border:1px solid #bcc3ca;}
    }
    .frontAdd{width:100%;height:64px;background:#fff;text-align:left;/**/
    a{display: inline-block;width:70px;height:32px;background:#0386f0;color:#fff;text-align:center;line-height: 32px;margin:16px 0 0 20px;border-radius:5px;}}
    .generic{height:55px;line-height: 55px;text-align: left;background:#dfe5e6;}
    .c1,.c2,.c3,.c4{color:#666666;display:inline-block;}
    .c1{margin-left:22px;width:222px;}.c2{width:322px;}.c3{width:322px;}.c4{width:122px;}
    .it{background-color:white;text-align:left;li{padding:9px 0;border-bottom: 1px solid #eee;}}
    .edit,.delete{width:20px;height:20px;display:inline-block;}
    .edit{background:url(../assets/bian1.png) no-repeat center;margin-right:10px;}
    .delete{background:url(../assets/dele.png) no-repeat center;}
}
</style>
