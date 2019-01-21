/*
 * @Author: liuqian 
 * @Date: 2017-12-06 15:27:21 
 * @Last Modified by: liuqian
 * @Last Modified time: 2017-12-15 15:40:15
 */
<template>
  <div class="clientTrade">
      <!-- <div class="header">设置 > <strong>客户行业</strong></div> -->
      <div class="increased"><a href="javascript:void(0)" class="so" @click="addTrade">新增</a></div>
      <p class="generic">
          <a href="javascript:void(0)" class="wid_1 c1">序号</a>
          <a href="javascript:void(0)" class="c2">行业名称</a>
          <a href="javascript:void(0)" class="c3">站点数量</a>
          <a href="javascript:void(0)" class="c4">操作</a>
      </p>
      <ul class="it">
          <li v-for="(item,index) in trade_data" :key="index">
              <span class="wid_1 c1">{{item.index}}</span>
              <span class="c2">{{item.industry}}</span>
              <span class="c3">{{item.site_num}}</span>
              <span class="c4">
                  <a href="javascript:void(0)" class="bian" @click="editInfo(index)"><i class="el-icon-edit"></i></a>
                  <a href="javascript:void(0)" class="delete" @click='deleteItem(index)'><i class="el-icon-delete"></i></a>
                  <!-- <a href="javascript:void(0)" class="edit" @click="editInfo(index)"></a><a href="javascript:void(0)" class="delete" @click="deleteItem(index)"></a> -->
                  </span>
          </li>
      </ul>
      <div class="newTrade" v-show="editPopup">
          <div class="describe">
              <span class="title">{{status}}</span><i class="close" @click="closePopup"></i>
          </div>
          <div class="tradeContent">
              <span>行业名称</span><input type="text" v-model="industryName" @keyup.enter="determine"/>
          </div>
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click="closePopup">取消</a>
              <a href="javascript:void(0)" class="save" @click="determine">保存</a>
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
axioIn.defaults.headers['Content-Type'] = 'application/json';
export default {
  name: 'clientTrade',
  components: {Shade, Pagination},
  data: function(){
    return {
        editPopup: false,
        shade: false,
        page: '1',
        rowNum: '',
        pageIndex: '',
        status: '',
        industryName: '',
        modifiy: '',
        trade_data: []
    }
  },
  mounted: function(){
      axioIn.get('/api/setup/cli-industry/')
      .then(res=>{
          this.trade_data=res.data.results;
          this.page=res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.pageIndex=1;
          this.$store.commit('setLoading', false)
      }).catch((res)=>{
          console.log(res.data)
          this.$store.commit('setLoading', false)
      })
  },
  methods: {
      // 删除
      deleteItem: function(index){
        //   this.shade = true;
          var num = this.trade_data[index].site_num;
          var id = this.trade_data[index].id;
          if(num===0){
            if(confirm('确定删除吗？')){
                axioIn.delete('/api/setup/cli-industry/'+id+'/')
                .then(res=>{
                    // 更新数据
                    this.incrementTotal(this.pageIndex)
                }) 
            }
          }else if(num>0){
              alert('有站点在该行业,不可删除');
          }
      },
      // 修改按钮
      editInfo: function(index){
          this.status = '修改行业';
          this.shade = true;
          this.editPopup = true;
          this.industryName = this.trade_data[index].industry;
          this.modifiy = index;
      },
      // 关闭弹窗
      closePopup: function(){
          this.shade = false;
          this.editPopup = false;
      },
      incrementTotal: function(n){
        n=(n===undefined?1:n);
        axioIn.get('/api/setup/cli-industry/?page='+n)
        .then(res=>{
            this.trade_data=res.data.results;
            this.page=res.data.page_num.total_page;
            this.rowNum = res.data.page_num.total_count;
            this.pageIndex=n;
        })
      },
      // 新增
      addTrade: function(){
          this.industryName = '';
          this.status = '新增行业';
          this.shade = true;
          this.editPopup = true;
      },
      // 确定按钮
      determine: function(){
          var reg = /^[a-zA-Z\u4e00-\u9fa5\d]+$/
          var verifyResult = reg.test(this.industryName)
          if(verifyResult&&this.industryName.length<20){
            if(this.status === '新增行业'){
                axioIn.post('/api/setup/cli-industry/',{
                    industry: this.industryName
                }).then(res=>{
                    //更新数据
                    this.incrementTotal(1)
                    this.shade = false;
                    this.editPopup = false;
                }).catch(error=>{
                    console.log(error)
                })
            }else if(this.status === '修改行业'){
                var id = this.trade_data[this.modifiy].id
                axioIn.put('/api/setup/cli-industry/'+id+'/',{
                    industry: this.industryName
                })
                .then(res=>{
                    this.incrementTotal(this.pageIndex)
                    this.shade = false;
                    this.editPopup = false;
                })
            } 
          }else if(this.industryName.length > 20){
              alert('行业名称最多只能输入20字')
          }else if(this.industryName.length === 0){
              alert('客户行业不能为空')
          }else{
              alert('只可输入汉字、字母、数字')
          }
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.clientTrade{width: 100%;
    .header{height:36px;line-height:36px;background-color: #fff;margin:12px auto;}
    .increased{height:68px;background-color: #fff;line-height:68px;text-align:left;border-radius:6px;
        // a{display: inline-block;width:68px;height:36px;line-height:36px;background-color: #0386f0;border-radius:5px;color:#fff;text-align:center;margin:0 20px;}
    }
    .generic{height:55px;line-height: 55px;text-align: left;}
    .c1,.c2,.c3,.c4{color:#666666;display:inline-block;width: calc(100%/4 - 25px)}
    // .c1{margin-left:22px;width:222px;}
    // .c2{width:322px;}
    // .c3{width:322px;}
    // .c4{width:122px;}
    .it{background-color:white;text-align:left;}
    // .edit,.delete{width:20px;height:20px;display:inline-block;}
    // .edit{background:url(../assets/bian1.png) no-repeat center;margin-right:10px;}
    // .delete{background:url(../assets/dele.png) no-repeat center;}
    .newTrade{position: absolute;top:20%;left:30%;z-index:30;width:570px;height:204px;background:#fff;border-radius:5px;
        .describe{height:54px;line-height:54px;
            .title{float:left;margin-left:20px;}
            .close{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
        }
        .tradeContent{height:92px;line-height:92px;border-top:1px solid #e3e3e3;border-bottom: 1px solid #e3e3e3;
            span{margin-right:20px;color:#929292;}
            input{width:454px;height:32px;outline:none;border:1px solid #ccc;border-radius:5px;padding-left:8px;}
        }
        .operate{height:60px;line-height:60px;
            a{display: inline-block;width:68px;height:30px;line-height:30px;border:1px solid #e3e3e3;border-radius:5px;text-align:center;color:#000;}
            .save{background-color:#0386f0;margin-right:20px;color:#fff;}
        }
    
    }
    .delete {margin-left: 10px;}
    .c4 a:link {color: #666666;}
    .c4 a:visited {color: #666666;}
    .c4 a:hover{color: #666666;}
    .c4 a:active {color: #666666;} 

}
</style>


