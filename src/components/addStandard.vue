/*
 * @Author: liuqian 
 * @Date: 2018-04-27 10:52:08 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-05-11 20:44:14
 */
<template>
    <div class="addStandard">
        <div class="serviceTitle"><span class="titleDefault">商城管理</span><span class="titleCarry"> > </span><span class="titleDefault">商品规格和参数</span><span class="titleCarry"> > </span><span calss="titlePitch">{{currentState}}</span></div>
        <div class='revise'>
            <div class="all_con">
                <div class="inContent">
                    <p><label for="">所属商品模块</label>
                        <select v-model="standList.param_model">
                            <option v-for="(item,index) in modelList" :key="index" :value="item.id">{{item.model_name}}</option>
                        </select><em class='ii'>*</em>
                    </p>
                    <p >
                        <label for="">字段名称</label>
                        <input class="single" type="text" v-model="standList.file_name" /><em class='ii'>*</em>
                    </p>
                    <p class='serAdd'>
                        <label for="">填写控件</label>
                        <select v-model="standList.fill_control" @change="selectVal()">
                            <option value=0>单行文本框</option>
                            <option value=1>下拉列表框</option>
                        </select>
                        <span class="addControl" @click="addOption" v-if="addShow">添加</span><em class='ii'>*</em>
                    </p>
                    <div class="option" v-if="optionShow">
                    <p class='serAdd' v-for="(item,index) in standList.param_control" :key="index"><label for="">选项{{index+1}}</label><input type="text" v-model="item.param_options_name" ><a href="javascript:void(0)" class="delete" @click="delete_info(index)"></a><em class='ii'>*</em></p>
                    </div>
                    <!-- <p class='serAdd'><label for="">选项2</label><input type="text" ><a href="javascript:void(0)" class="delete"></a></p> -->
                </div>
            </div>
            <p class='bao' style=''><a href="javascript:void(0)" class='quu' @click="cancel">取消</a><a href="javascript:void(0)" class='qub' @click="save_info()" >保存</a></p>
        </div>
        <shade v-show='shade'></shade>
        <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填    
          <p class='bao' style='text-align:center;margin:20px 0'><a href="javascript:void(0)" class='qub' >确定</a></p>
        </div>
    </div>
</template>
<script>
import Shade from './shade';
import axioIn from '../store/axioIn'
import Router from "../router/index";
export default {
  name: 'addStandard',
  components: {Shade},
  data () {
      return {
          shade: false,
          tip: false,
          modelList: [],
          standList: {param_model: '',file_name: '',fill_control: -1,param_control: [{param_options_name: ''},{param_options_name: ''}]},
          currentState: '',
          id: '',
          addShow: false,
          optionShow: false
      }
  },
  created: async  function(){
      await axioIn.get('/api/goods/models_list/').then(res=>{
          this.modelList = res.data;
      }).catch((err)=> alert(err.data.error));
      if(this.$route.query.id===undefined){
        this.currentState = '新增';
      }else{
        this.currentState = '编辑';this.id = this.$route.query.id;
        axioIn.get('/api/goods/specification/'+this.id+'/').then(res=>{
          this.standList = res.data;
          if(res.data.fill_control === 1){
            this.addShow = true;this.optionShow = true;
          } 
        }).catch((err)=> alert(err.data.error));
      }
  },
  methods: {
      save_info () {
          var flag = false;
          if(this.standList.param_model === '' || this.standList.file_name === '' || this.standList.fill_control === ''){
              alert('必填项必须填写');return
          }
          if(this.optionShow){
              for(var i = 0;i<this.standList.param_control.length;i++){
                  if(this.standList.param_control[i].param_options_name === ''){
                      flag = true;
                  }
              }
          }
          if(flag){alert('必填项必须填写');return}
          this.standList.fill_control = parseInt(this.standList.fill_control)
          if(this.currentState === '新增'){
              axioIn.post('/api/goods/specification/',this.standList).then(res=>{
                  alert('新增成功！');
                  Router.push({ path: '/goodsStandard'})
              }).catch((err)=> alert(err.data.error));
          }else if(this.currentState === '编辑'){
            axioIn.put('/api/goods/specification/'+this.id+'/',this.standList).then(res=>{
              alert('修改成功');
              Router.push({ path: '/goodsStandard',query: {flag: true}})
            }).catch((err)=> alert(err.data.error));
          }
        
      },
      delete_info (index) {
          if(confirm('确定删除吗？')){
              this.standList.param_control.splice(index,1)
          }
      },
      addOption () {
          this.standList.param_control.push({param_options_name: ''})
      },
      selectVal () {
          console.log(typeof this.standList.fill_control)
          if(this.standList.fill_control === '0'){
              this.addShow = false;this.optionShow = false;
          }else{
              this.addShow = true;this.optionShow = true;
          }
      },
      cancel () {
          Router.push({ path: '/goodsStandard',query: {flag: true}})
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.addStandard{width:90%;margin:auto;background:#edf2f5;
    .titleDefault{color:#999999;}.titleCarry{color: #cccccc;}.titlePitch{color: #515c6e}
    .serviceTitle{width:100%;height:36px;line-height: 36px;background:#fff;margin:15px 0;}
    .revise{width:100%px;background-color:white;
        .all_con{overflow-y: scroll;}
        .bao{margin:0;text-align:right;height:72px;border-top:1px solid #d2d8db;}
        .inContent{height: 656px;width:600px;margin:0 auto;padding-top:9px;
        img{vertical-align: middle;}
        .addControl{display: inline-block;width:70px;height:30px;line-height:30px;text-align:center;color:#fff;border-radius:5px;vertical-align:top;margin-left:12px;background:#067ad8;cursor:pointer;}
        .delete{width:20px;height:20px;display:inline-block;margin-left:10px;background:url(../assets/dele.png) no-repeat center;vertical-align: middle;}}
        .bao{
            a{display: inline-block;width: 58px;height:30px;text-align: center;line-height: 30px;border: 1px solid gray;border-radius: 5px;padding:0;margin:0;}
            .qub{margin:20px 20px 20px 10px;}
        }
        .serAdd{text-align:left;font-size:0;
            a{display:inline-block;width:20px;height:20px;padding:0;vertical-align:middle;}
            .quu{background:url(../assets/dele.png) no-repeat;margin-top: 4px;}
        }
        p{margin:14px;text-align:left;font-size:0;
        label{width:80px;text-align:right;margin-right:20px;display:inline-block;font-size: 12px;color:#666;vertical-align: middle;}}
        input[type="text"],input[type="number"]{width:308px;height:30px;padding-left:10px;border-radius:5px;border:1px solid #d2d8db;vertical-align: middle;}
        select{height:32px;width:318px;border-radius:5px;border:1px solid #d2d8db;padding-left:6px;
        }
        option{height:26px;display:block;padding-top:5px;}
    }
}
</style>
