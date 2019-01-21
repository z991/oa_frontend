/*
 * @Author: liuqian 
 * @Date: 2018-01-29 16:26:47 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-05-11 15:11:50
 */
<template>
    <div class="addOnline">
        <div class="serviceTitle"><span class="titleDefault">商城管理</span><span class="titleCarry"> > </span><span class="titleDefault">商品上架</span><span class="titleCarry"> > </span><span calss="titlePitch">{{currentState}}</span></div>
        <div class='revise'>
            <div class="inContent">
                <p class="commodify"><label>商品属性</label><input type="radio" name="goodsAttr" value="单件商品" v-model="edit_message.goods_attribute" @change="chooseAttribute" /><span>单件商品</span><input type="radio" name="goodsAttr" value="组合商品" v-model="edit_message.goods_attribute" @change="chooseAttribute" /><span>组合商品</span></p>
                <p><label for="">售卖状态</label>
                    <select style='width:468px;' v-model="edit_message.sell_status" >
                        <option value="1">预售</option>
                        <option value="2">可售卖</option>
                    </select>
                </p>
                <div style="font-size:0" class="dropSearch"><label for="">选择商品</label>
                    <input class="single" type="text" readonly="readonly" @click="addressShow()" v-model="pitchSingle" style="width:470px;" /><em class="icon"></em>
                    <div class="serviceAddress" v-show="singshow" @mouseleave="addressHide()">
                        <div class="search"><input type="text" v-model="definiteSear" /><img style="margin-left:-30px;" src="../assets/cha1.png" alt="" @click="search_address()"></div>
                        <div class="choose">请选择</div>
                        <ul>
                            <li v-for='(item,index) in singleton_data' :key='index' @click="chooseAdd(item)">{{item.goods_name}}</li>
                        </ul>
                        <Pagedevice :number='pageCount' v-on:increment="incrementTotal2" :page-index='pagePresent'></Pagedevice>                    
                    </div>
                    <!-- <select name="" id="" style="width: 468px;" v-model="edit_message.m_up_goods">
                        <option v-for="item in choose_goods" :value="item.id">{{item.goods_name}}</option>
                    </select> -->
                </div>
                <p class='serAdd'><label for="">商品价格</label><input v-model="edit_message.put_price" type="text" v-number-Num="edit_message.put_price" ></p>
                <p class='serAdd' style="position:relative;">
                    <label for="" >上下架日期</label>
                    <span class='time'>
                        <input @focus="showStart" v-model="edit_message.putaway_recent_on_time" type="text" placeholder="Start date" readonly="true">~
                        <datee @mouseleave.native='hide()' v-if="date_start" v-on:incrementt="incrementTi1" class='dat da'></datee>
                        <input @focus="showEnd" v-model="edit_message.putaway_off_time" type="text" placeholder="End date" readonly="true">
                        <datee @mouseleave.native='hide()' v-if="date_end" v-on:incrementt="incrementTi2" class='dat da'></datee>
                    </span>
                </p>
                <p class='serAdd'><label for="">购买限制</label><input :disabled="edit_message.active" v-model="edit_message.goods_price" type="text"   ></p>
                <p><label for="">首页展示</label><span @click="main_show"><img v-show="switch_main" src='../assets/clo.png' alt="xx" ><img v-show="!switch_main" src='../assets/open.png' alt="xx" ></span>
               </p>
            </div>
            <p class='bao' style=''><a href="javascript:void(0)" class='quu' @click="cancel">取消</a><a href="javascript:void(0)" class='qub' @click="save_info(edit_message.id)" >保存</a></p>
        </div>
        <shade v-show='shad'></shade>
        <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填    
          <p class='bao' style='text-align:center;margin:20px 0'><a href="javascript:void(0)" class='qub' >确定</a></p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';
import Shade from './shade';
import axioIn from '../store/axioIn'
import Router from "../router/index";
import Datee from './date'
import Pagedevice from './pageDevice';
export default {
  name: 'addOnline',
  components:{Shade,Datee,Pagedevice},
  data () {
      return {
          shad: false,
          tip:false,
          putaway: {start: '',end: ''},
          date_start: false,
          date_end: false,
          today: '',
          currentState: '',
          commodity_attribute: '',
          switch_main: true,
          online_data: '',
          edit_message: {goods_attribute: '',sell_status: '',put_price: '',goods_price: 1,putaway_recent_on_time: '',putaway_off_time: '',recommend: ''},
          goods_sn: '',
          attribute: '',
          choose_goods: [],
          pageCount: '',
          pagePresent: 1,
          pitchSingle: '',
          definiteSear: '',
          singleton_data: [],
          singshow: false
      }
  },
    directives: {
          numberNum: {
            bind: function(el,bindings) {

            },
          　update:function(el,bindings,old){
            var formatVal = /^[\d\.]{1,7}$/;
            var val = bindings.value;
            if(!formatVal.test(val)){
              var reg = new RegExp(val,'g');
              old.context.edit_message.put_price= ''
            }
            if(bindings.value>9999999){
                old.context.edit_message.put_price=9999999;
            }
          },
       },
    },

  created: function(){
      if(this.$route.query.goods_sn===undefined){
          this.currentState = '新增'
      }else{
          this.currentState = '编辑';
          this.goods_sn = this.$route.query.goods_sn;
          axioIn.get('/api/goods/listputaway/?goods_sn='+this.goods_sn).then(res=>{
              this.edit_message = res.data.results[0];
              this.pitchSingle = this.edit_message.goods_name;this.edit_message.goods_sn = this.edit_message.goods_sn;
              if(this.edit_message.recommend === 2){this.switch_main = true;}else if(this.edit_message.recommend === 1){this.switch_main = false;}
              // 获取选择商品一栏的数据
              let chara = '';
              if(this.edit_message.goods_attribute === '单件商品'){chara = 1;}
              else if(this.edit_message.goods_attribute === '组合商品'){chara = 2;}
              if(chara !== ''){
                axioIn.get('/api/goods/put_select/?sid='+chara).then(res=>{
                    this.singleton_data = res.data.results;
                    this.pageCount = res.data.total_page;this.pagePresent = 1;
                })
              }   
          })
        //   this.attribute = this.$route.query.attr;
        //   if(this.attribute === '单件商品'){
        //       axioIn.get('/api/goods/sgoodlistput/').then(res=>{
        //         this.choose_goods = res.data.results;
        //       })
              
        //   }else{
        //       axioIn.get('/api/goods/mgoodlistput/').then(res=>{
        //         this.choose_goods = res.data.results
        //         this.choose_goods.map(n=>{
        //             n.goods_name = n.m_goods_name
        //         })
        //       })
        //   }
        //   axioIn.get('/api/goods/listputaway/'+this.id).then(res=>{
        //        this.edit_message = res.data;
        //        const object2 = Object.assign({}, res.data);
        //        this.convert(object2)
        //        if(this.edit_message.attribute === 'S_put'){
        //            this.edit_message.active = false;
        //        }else{
        //            this.edit_message.active = true;
        //            this.edit_message.goods_price = 1;
        //        }
        //         if(res.data.recommend === 2){this.switch_main = true;}else if(res.data.recommend === 1){this.switch_main = false;}
        //    })
      }
  },
  methods: {
      chooseAttribute () {
          this.edit_message.goods_price = 1;
          let chara = '';
          if(this.edit_message.goods_attribute === '单件商品'){chara = 1;}
          else if(this.edit_message.goods_attribute === '组合商品'){chara = 2;}
          if(chara !== ''){
            axioIn.get('/api/goods/put_select/?sid='+chara).then(res=>{
                this.singleton_data = res.data.results;
                this.pageCount = res.data.total_page;this.pagePresent = 1;
            })
          }
        //   if(this.edit_message.attribute === 'S_put'){
        //       axioIn.get('/api/goods/sgoodlistput/').then(res=>{
        //         this.singleton_data = res.data.results;
        //         this.pageCount = res.data.page_num.total_page;this.pagePresent = 1;
        //         // this.choose_goods = res.data.results;
        //         this.edit_message.active = false;
        //       })
        //   }else if(this.edit_message.attribute === 'M_put'){
        //       axioIn.get('/api/goods/mgoodlistput/').then(res=>{
        //         this.singleton_data = res.data.results;
        //         this.pageCount = res.data.page_num.total_page;this.pagePresent = 1;
        //         // this.choose_goods = res.data.results;
        //         this.edit_message.active = true;
        //         this.singleton_data.map(n=>{
        //             n.goods_name = n.m_goods_name
        //         })
        //       })
        //   }
      },
      save_info (id) {
          if(this.switch_main){this.edit_message.recommend = 2}else{this.edit_message.recommend = 1}
          let reg = /^[\d.]+$/;
          if(this.edit_message.put_price !== ""){
              if(!reg.test(this.edit_message.put_price)){
                  alert('商品价格请输入合法的数字');return
              }else{
                  if(!/^\d+$/.test(this.edit_message.put_price)){
                    var aa = this.edit_message.put_price.indexOf('.');
                    var bb = this.edit_message.put_price.slice(aa+1);
                    if(!/^\d+$/.test(bb)||bb.length>2){
                        alert('商品价格小数点后只能为数字且最多两位');return;
                    }
                  }                 
              }
          }
          if(!/^\d+$/.test(this.edit_message.goods_price)){
              alert('购买限制只能填入数字！');return;
          }
          let flag = false
          for(var attr in this.edit_message){
              if(this.edit_message[attr] === ''){
                  flag = true
              }
          }
          if(flag){alert('有必填项没有填写');return;};
          if(this.currentState === '新增'){
              axioIn.post('/api/goods/create_put_up/',this.edit_message).then(res=>{
                  alert('新增成功');
                  Router.push({ path: "/commodifyOnline"});
              })
          }else if(this.currentState === '编辑'){
              axioIn.put('/api/goods/create_put_up/',this.edit_message).then(res=>{
                  alert('修改成功');
                  Router.push({ path: "/commodifyOnline",query: {flag: true}});
              })
          }
        //   if(this.edit_message.attribute === 'S_put'){
        //     this.edit_message.s_up_goods = this.edit_message.m_up_goods;
        //     if(this.currentState === '新增'){
        //         console.log('单品新增')
        //         //   delete this.edit_message.attribute
        //         axioIn.post('/api/goods/sputaway/',this.edit_message).then(res=>{
        //             alert('新增成功');
        //             Router.push({ path: "/commodifyOnline"});
        //         }).catch((err)=> alert(err.data.error));
        //     }else if(this.currentState === '编辑'){
        //         console.log('单品编辑')
        //         axioIn.put('/api/goods/sputaway/'+id+'/',this.edit_message).then(res=>{
        //             alert('修改成功');
        //             Router.push({ path: "/commodifyOnline"});
        //         }).catch((err)=> alert(err.data.error));
        //     } 
        //   }else if(this.edit_message.attribute === 'M_put'){
        //     if(this.currentState === '新增'){
        //         console.log('组合新增')
        //         //   delete this.edit_message.attribute
        //         axioIn.post('/api/goods/mputaway/',this.edit_message).then(res=>{
        //             alert('新增成功');
        //             Router.push({ path: "/commodifyOnline"});
        //         }).catch((err)=> alert(err.data.error));
        //     }else if(this.currentState === '编辑'){console.log('组合编辑')
        //         axioIn.put('/api/goods/mputaway/'+id+'/',this.edit_message).then(res=>{
        //             alert('修改成功');
        //             Router.push({ path: "/commodifyOnline"});
        //         }).catch((err)=> alert(err.data.error));
        //     } 
        //   }
      },
      cancel () {Router.push({ path: '/commodifyOnline',query: {flag: true}})},
      main_show () {this.switch_main = !this.switch_main;},
      /*日历操作*/
      showStart () {this.date_start = true},
      showEnd () {this.date_end = true},
      hide () {this.date_start = false;this.date_end = false;},
      convert (data) {
          if(data.s_up_goods!==null){
              this.edit_message.attribute = 'S_put';
            //   this.edit_message.put_price = data.s_up_goods.goods_price;
              this.edit_message.m_up_goods = data.s_up_goods.id;
              this.pitchSingle = data.s_up_goods.goods_name;
          }else if(data.m_up_goods !== null){
              console.log(data)
              this.edit_message.attribute = 'M_put';
            //   this.edit_message.put_price = data.m_up_goods.m_goods_price;
              this.edit_message.m_up_goods = data.m_up_goods.id;
              this.pitchSingle = data.m_up_goods.m_goods_name;
          }
      },
      incrementTi1:function(a){
        //   this.edit_message.putaway_recent_on_time=a;
        //   if(this.edit_message.putaway_off_time!==''){
        //       if(new Date(this.edit_message.putaway_off_time) < new Date(this.edit_message.putaway_recent_on_time)){
        //           alert('下架时间不能早于上架时间');
        //           this.edit_message.putaway_recent_on_time = '';
        //       }
        //   }
          var today=new Date();this.edit_message.putaway_recent_on_time=a;
          if(new Date(this.edit_message.putaway_recent_on_time)<new Date(today.toLocaleDateString())){alert('不能选择历史时间');this.edit_message.putaway_recent_on_time='';return;}
          if(this.edit_message.putaway_off_time!==''){
              if(this.edit_message.putaway_off_time=== this.edit_message.putaway_recent_on_time){alert('上下架日期不能选择同一天');this.edit_message.putaway_recent_on_time='';return}
              if(new Date(this.edit_message.putaway_off_time)< new Date(this.edit_message.putaway_recent_on_time)){
                  alert('下架时间不能早于上架时间');
                  this.edit_message.putaway_recent_on_time = '';
              }
           }
      },
      incrementTi2:function(a){
        //   this.edit_message.putaway_off_time=a;
        //   if(this.edit_message.putaway_recent_on_time!==''){
        //       if(new Date(this.edit_message.putaway_off_time)< new Date(this.edit_message.putaway_recent_on_time)){
        //           alert('下架时间不能早于上架时间');
        //           this.edit_message.putaway_off_time = '';
        //       }
        //   }
        var today=new Date();this.edit_message.putaway_off_time = a;
        if(new Date(this.edit_message.putaway_off_time)<new Date(today.toLocaleDateString())){alert('不能选择历史时间');this.edit_message.putaway_off_time='';return;}
        if(this.edit_message.putaway_off_time===this.edit_message.putaway_recent_on_time){alert('上下架日期不能选择同一天');this.edit_message.putaway_off_time='';return}
        if(this.edit_message.putaway_recent_on_time!==''){
            if(new Date(this.edit_message.putaway_off_time)< new Date(this.edit_message.putaway_recent_on_time)){
                alert('下架时间不能早于上架时间');
                this.edit_message.putaway_off_time = '';
            }
        }
      },
      // 检索分页下拉列表
      addressShow () {
          this.singshow = true;this.definiteSear = '';
          this.chooseAttribute()
      },
      addressHide () {
          this.singshow = false;
      },
      search_address () {//搜索
          if(this.definiteSear === ''){
            alert('请输入内容！');return;
          }
          let attri = '';
          if(this.edit_message.goods_attribute === '单件商品'){attri = 1;}
          else if(this.edit_message.goods_attribute === '组合商品'){attri = 2;}
          if(attri !== ''){
              axioIn.get('/api/goods/put_select/?sid='+attri+'&goods_name='+this.definiteSear).then(res=>{
                this.singleton_data = res.data.results;
                this.pageCount = res.data.page_num.total_page;this.pagePresent = 1;
              })
          }
        //   }else if(this.edit_message.goods_attribute === '组合商品'){
        //       axioIn.get('/api/goods/mgoodlistput/m_goods_name='+this.definiteSear).then(res=>{
        //         this.singleton_data = res.data.results;
        //         this.pageCount = res.data.page_num.total_page;this.pagePresent = 1;
        //         this.edit_message.active = true;
        //         this.singleton_data.map(n=>{
        //             n.goods_name = n.m_goods_name
        //         })
        //       })
        //   } 
      },
      chooseAdd (item) {
        //   console.log(item);return
          this.pitchSingle = item.goods_name;
          this.edit_message.goods_sn = item.goods_sn;
          this.singshow = false;
      },
      incrementTotal2 (n) {
          let attri = '';
          if(this.edit_message.goods_attribute === '单件商品'){attri = 1;}
          else if(this.edit_message.goods_attribute === '组合商品'){attri = 2;}
          if(attri !== ''){
              axioIn.get('/api/goods/put_select/?sid='+attri+'&goods_name='+this.definiteSear+'&page='+n).then(res=>{
                this.singleton_data = res.data.results;
                this.pageCount = res.data.page_num.total_page;this.pagePresent = n;
              })
          }
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.addOnline{width:90%;margin:auto;background:#edf2f5;
    .titleDefault{color:#999999;}.titleCarry{color: #cccccc;}.titlePitch{color: #515c6e}
    .serviceTitle{width:100%;height:36px;line-height: 36px;background:#fff;margin:15px 0;}
    .revise{width:100%px;background-color:white;
    .bao{margin:0;text-align:right;height:72px;border-top:1px solid #d2d8db;}
    input:focus{border: 1px solid red;}
    .inContent{height: 656px;width:600px;margin:0 auto;padding-top:9px;
    .commodify{span{margin: 0 30px 0 10px;}}
    .time{display:inline-block;width:468px;height:30px;border:1px solid #d2d8db;border-radius:5px;
    input{width:150px;border:none;}}
    img{vertical-align: middle;}}
    .bao{
        a{display: inline-block;width: 58px;height:30px;text-align: center;line-height: 30px;border: 1px solid gray;border-radius: 5px;padding:0;margin:0;}
        .qub{margin:20px 20px 20px 10px;}
    }
    .serAdd{text-align:left;font-size:0;
        a{display:inline-block;width:20px;height:20px;padding:0;vertical-align:middle;}
        .addAddress{background:url(../assets/add.png) no-repeat;margin:0 10px;}
        .addAddress:active{background: url(../assets/add1.png) no-repeat;}
        .addIp{background:url(../assets/ip.png) no-repeat;margin:0 10px;}
        .addIp:active{background: url(../assets/ip1.png) no-repeat;}
        .quu{background:url(../assets/dele.png) no-repeat;margin-top: 4px;}
    }
    .clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
    p,div{margin:14px;text-align:left;
    label{width:80px;text-align:right;margin-right:20px;display:inline-block;font-size: 12px;color:#666;}}
    input[type="text"],input[type="number"]{width:458px;height:30px;padding-left:10px;border-radius:5px;border:1px solid #d2d8db;}
    textarea{width:402px;height:32px;}
    select{height:32px;border-radius:5px;border:1px solid #d2d8db;margin-left:-3px;
    }
    option{height:26px;display:block;padding-top:5px;}}
    #date.dat{left:100px;}
    .dropSearch{text-align: left;font-size:0;position: relative;
        // span,label{display:inline-block;color:#666;font-size:12px;width:118px;text-align:right;margin:0 20px;}
        input,select{width:458px;height:30px;outline:none;border:1px solid #d2d8db;border-radius:5px;padding-left:5px;box-sizing: border-box;}
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
</style>
