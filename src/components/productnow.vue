<template>
    <div class="productnow">
        <p class="qu">产品管理 > 经典版产品配置 > {{ti}}</p>
        <div class='pro clearFloat'>
            <div class="pro_left">
                <a href="javascript:void(0)" @click='qieF()' class='qie'>功能开关配置</a>
                <div class='ul'><input type="text" @keyup.enter='submi()' v-model='aa2.pro_version'  maxlength="10" placeholder="输入信息点enter添加新版本">
                    <ul>
                        <li v-for='(a,index) in aa3' :key='a.id' @mouseover='enter(index)' @mouseout='out()' @click='versi(index,a.id)' :class="{active:a.ac}"><a href="javascript:void(0)">{{a.name}}</a>
                        <i v-show="a.a2" @click.stop="deleteb(index,a,a.id)"></i></li>
                    </ul>
                </div>
            </div>
            <div class="pro_right">
                <div v-show='pro_x'>
                    <p class="ji">
                        <label for="">产品名称</label><input type="text" v-model='aa2.product' v-bind:disabled='adis1' onkeydown="if(event.keyCode==32) return false">
                        <a href="javascript:void(0)" class="so" @click='pro_revise()'>修改</a>
                        <a href="javascript:void(0)" class="so" @click='pro_keep()'>保存</a>
                    </p>
                    <p class="ji" style='border-top:1px solid #edf2f5;padding-top:20px;margin:0 20px;'>
                        <a href="javascript:void(0)" class="so" @click='add_func()'>新建功能</a>
                        <a href="javascript:void(0)" class='so' >批量导入</a>
                        <input type="file" class='leading_in' accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="upload()"  ref="upload">
                        <!--span class='ban'><span>引用版本</span><select name="" id=""></select></span-->
                    </p>
                    <p class="cp">
                        <a href="javascript:void(0)" class="c0">序号</a>
                        <a href="javascript:void(0)" class="c1">功能名称</a>
                        <a href="javascript:void(0)" class="c2">功能路径</a>
                        <a href="javascript:void(0)" class="c1">文本形式</a>
                        <a href="javascript:void(0)" class="c2">操作</a>
                    </p>
                    <ul class="it">
                        <li v-for="item in items" :key="item.id">
                            <span class="c0">{{item.index}}</span>
                            <span class="c1">{{item.func_name}}</span>
                            <span class="c2">{{item.func_code}}</span>
                            <span class="c1">{{item.func_type}}</span>
                            <span class="c2">
                                <a href="javascript:void(0)" class="bian" @click="bian(item.id)"></a>
                                <a href="javascript:void(0)" class="dele" @click='delet(item.id)'></a>
                            </span>
                        </li>
                    </ul>
                    <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
               </div>
               <div v-show='pro_b' class='pro_b'>
                   <p class="ji">
                       <span class='ban'><span>引用版本</span>
                       <select name="" id="" v-model='yin' @change="por_yi(yin)">
                           <option v-for='a in aa3' :key='a.id' :value='a.id'>{{a.name}}</option>
                        </select></span>
                   </p>
                   <p class='gon'>功能名称</p>
                   <span v-for='ii in pro_list' :key='ii.id' class='lis'>
                       <input type="checkbox" :value='ii.id' v-model="pro_liv"><span>{{ii.func_name}}</span>
                   </span>
                   <p class='bao bao_v' style='text-align:right'><a href="javascript:void(0)"  class='quu' @click='clo_v()'>取消</a><a href="javascript:void(0)" class='qub' @click='bao_v()'>保存</a></p>
               </div>
            </div>
        </div>
        <div v-show='a1' class='chana'>
          <p class='afb'><span>{{a5}}</span><i @click='clo()'></i></p>
          <p><label for="">功能名称</label><input type="text" v-model="func_.func_name"><em class='ii'>*</em></p>
          <p><label for="">功能路径</label><input type="text" v-model="func_.func_code"><em class='ii'>*</em></p>
          <p><label for="">文本形式</label><select name="" id="" v-model='func_.func_type' @change='wenc()'>
              <option value="文本框">文本框</option>
              <option value="单选框">单选框</option>
              </select><em class='ii'>*</em></p>
          <div >
            <div class='def' v-show="func_.xuans"  v-for='(ii,index) in func_.selection' :key='ii.id'>
                <p class='def bao'  style='text-align:left;margin-left:40px;'><a href="javascript:void(0)" :class="{quu:!ii.is_default,qub:ii.is_default}" style='border-right:1px solid #9d9d9d' @click='de_val(index,func_.selection)' >设置默认</a><span @click='dele_fun(index)'>删除</span></p>
                <p><label for="">选项名称</label><input type="text" v-model="ii.select_name"><em class='ii'>*</em></p>
                <p><label for="">选项值</label><input type="text" v-model="ii.select_value"><em class='ii'>*</em></p> 
            </div>
            <p class='bao'  style='text-align:left'><a href="javascript:void(0)" class='qub' @click='add_fun()'>添加功能选项</a></p>
          </div>
          <p class='lef'>版本展示条件</p>
          <p><label for="">客户版本</label>
             <input type="radio" name='1' value='1' v-model='func_.cli_version'>B2B
             <input type="radio" name='1' value='2' v-model='func_.cli_version'>B2C
             <input type="radio" name='1' value='3' v-model='func_.cli_version'>不限
             <em class='ii'>*</em></p>
          <p class='bao' style='text-align:right'><a href="javascript:void(0)"  class='quu' @click='clo()'>取消</a><a href="javascript:void(0)" class='qub' @click='chbao()'>保存</a></p>
        </div>
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填
          <p class='bao' style='text-align:center;margin:20px 0'><a href="javascript:void(0)" class='qub' @click="tipp1()">确定</a></p>
      </div>
    </div>
</template>
<script>
import Vue from 'vue'
import Shade from './shade';
import axioIn from '../store/axioIn';
import Pagination from './pagination';
import Router from "../router/index";
export default {
  name:'productnow',
  components:{Shade,Pagination},
  data:function(){
      return{
         aa2:{product:'',version:'',pro_version:''},
         aa3:[],
         func_:{func_name:'',func_type:'',xuans:false,cli_version:'',func_code:'',selection:[{select_name:'',select_value:'',is_default:''}]},
         
         adis1:true,
         a1:false,//弹窗展示
         a5:'新增',//弹窗是新增还是修改
         items:[],  
         shad:false,
         shad1:false,
         page:'1',
         rowNum:1,
         pageIndex:1,
         tip:false,
         ti:'',
         yin:'',//引用版本的数据
         tiv:true,//条件渲染
         revi:false,//展示产品的名字是新增还是修改的状态
         pro_id:'',//新增成功后的产品id
         ite:[],//上级功能的下拉列表
         ite1:[],//上级功能选择下拉列表
         ite2:[],//联动功能下拉列表
         ite3:[],//联动功能选择下拉列表
         lina:'',//存储联动信息
         lina1:'',//存储上级功能
         topf:false,//上级功能是否展示
         pro_x:true,//控制列表显示
         pro_b:false,//控制复选框显示
         pro_list:'',//所有版本信息
         pro_liv:[],//现有版本的信息
         pro_livv:[],//暂存版本信息
      }
  },
  watch:{
      adis1:function(oldvalue,newvalue){
          
      }
  },
  mounted:function(){//初始化信息
      if(this.$route.query.id===undefined){this.adis1=false;this.ti='新增'}
      else{this.adis1=true;this.ti='修改';this.pro_id=this.$route.query.id;
      axioIn.get('/api/product/product/'+this.$route.query.id+'/')
      .then((res)=>{this.aa2.product=res.data.product;
                    this.aa3=res.data.version;
                    this.pro_list=res.data.function
                    this.aa3.map(n=>{
                        Vue.set(n,'ac',false);Vue.set(n,'a2',false);
                        n.name=n.pro_version})
                    });//console.log(this.pro_list)
      axioIn.get('/api/product/function/?product='+this.pro_id)
       .then((res)=>{
           this.items=res.data.results;
           this.page=res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
       })
      }
  },
  methods:{
      enter:function(index){// 左侧信息鼠标移上时
          this.aa3.map(n=>n.a2=false);this.aa3[index].a2=true;
          },
      out:function(){this.aa3.map(n=>n.a2=false);},
      versi:function(index){
          this.aa3.map(n=>n.ac=false)
          if(this.aa3[index]!==undefined){
              this.aa3[index].ac=true;
              axioIn.get('/api/product/version/'+this.aa3[index].id+'/')
              .then(res=>{this.pro_liv=this.pro_livv=res.data.function.map(n=>n.id)})
          }//console.log(this.pro_liv)
          axioIn.get('/api/product/product/'+this.pro_id+'/')
       .then((res)=>{console.log(res)
           this.aa2.product=res.data.product;
                    this.aa3=res.data.version;
                    this.pro_list=res.data.function
                    this.aa3.map(n=>{
                        Vue.set(n,'ac',false);Vue.set(n,'a2',false);
                        n.name=n.pro_version})
                        this.aa3[index].ac=true;
                    });
          this.pro_x=false;this.pro_b=true;
       },
      submi:function(){ //弹窗左侧input的keycode:enter事件
          var abc=this.aa3.map( x => x.name);
          if(this.pro_id===''){alert('请先创建产品');return}
          if(this.aa2.pro_version === '' || this.aa2.pro_version === undefined){
              alert('输入框不能为空');
          }else{
            if(abc.indexOf(this.aa2.pro_version)===-1){
              axioIn.post('/api/product/version/',{product:this.pro_id,pro_version:this.aa2.pro_version})
              .then((res)=>{
                  this.aa3.push({name:res.data.pro_version,a2:false,ac:false,id:res.data.id});
                  this.aa3.map(n=>n.ac=false)
              })
            }else{alert('请勿重复添加')}
          }
          
          this.aa2.pro_version='';
       },
      deleteb:function(a,b,c){
          //let aa=0;//console.log(a)
          //this.aa3.map((n)=>{if(n.id!==undefined)aa=aa+1})
          //if(c===undefined){
              let d=confirm('确认删除？');
              if(d==true){
                  this.aa3.splice(a,1);
                  axioIn.delete('/api/product/version/'+c)
                    .then(res=>{alert('删除成功');
                    this.versi(a,c)
                    // this.pro_x=true;this.pro_b=false;
                    })
                  }
             // }
       },
      search:function(){},
      chbao:function(){
          //console.log(JSON.stringify(this.func_))
          var aa=false;var bb={selection:[],parent:{},dependences:[]}
          for(let i in this.func_){//判断输入文本框不为空
              if(this.func_[i]===''){aa=true;}
          }
          if(this.func_.func_type==='单选框'){this.func_.selection.map(n=>{if(n.select_name===''||n.select_value===''){aa=true}})}//判断选项是否为空
         /* if(this.func_.parent.length!==0){this.func_.parent.map(n=>{if(n.id===''){aa=true}})}
          if(this.func_.selection1.length!==0){
              this.func_.selection1.map(n=>{
                  if(n.id===''){aa=true}//console.log(JSON.stringify(n.list))
                  n.list.map(v=>{if(v.name===''){aa=true}})
                  })
          }/*/
          if(aa===true){this.shad1=true;this.tip=true;console.log(JSON.stringify(this.func_))}
          else{
              this.func_.product=this.pro_id;
              if(this.a5==='新增'){
              axioIn.post('/api/product/function/',this.func_)
              .then((res)=>{
                          this.shad=false;this.tip=false;this.a1=false;
                          alert('新增成功')
                          axioIn.get('/api/product/function/?product='+this.pro_id)
                            .then((res)=>{
                                this.items=res.data.results;
                                this.page=res.data.page_num.total_page;
                                this.rowNum = res.data.page_num.total_count;
                            })
                      })
              }
              else{
                  
                  axioIn.put('/api/product/function/'+this.func_.id+'/',this.func_)
                  .then((res)=>{
                          this.shad=false;this.tip=false;this.a1=false;
                          alert('修改成功')
                          axioIn.get('/api/product/function/?product='+this.pro_id)
                            .then((res)=>{
                                this.items=res.data.results;
                            })
                      })
              }
              }
          },
      add_fun:function(i){ //添加单选框
           if(this.func_.func_type==='单选框'){
              this.func_.selection.push({select_name:'',select_value:'',is_default:''});//console.log(2)
           }
      },
      add_func:function(){//新建功能
          this.func_={func_name:'',func_type:'',cli_version:'',xuans:false,func_code:'',selection:[{select_name:'',select_value:'',is_default:''}]}
          if(this.pro_id===''){alert('请输入产品名称并保存');return}
          else{
              this.a1=true;this.shad=true;this.a5='新增'
              axioIn.get('/api/product/function/?product='+this.pro_id+'&parent=1')
              .then((res)=>{
                  if(res.data.length===0){this.topf=false}
                  else{
                    this.topf=true;
                    this.ite=res.data
                    this.lina1=res.data;
                    //this.ite1=res.data.filter(n=>n.func_name===this.func_.top).map(n=>n.select_name)
                  }
              })
              axioIn.get('/api/product/function/?product='+this.pro_id+'&depend=1')
              .then((res)=>{
                  this.ite2=res.data//.map(v=>v.func_name)
                  this.lina=res.data;
                  //this.ite3=res.data.filter(n=>n.func_name===this.func_.bott).map(n=>n.select_name)
              })
              }
      },
      bian:function(id){
          this.a1=true;this.shad=true;this.a5='修改'
          axioIn.get('/api/product/function/?product='+this.pro_id+'&parent=1')
              .then((res)=>{
                  if(res.data.length===0){this.topf=false}
                  else{
                    this.topf=true;
                    this.ite=res.data//.map(v=>v.func_name)
                    this.lina1=res.data;
                    
                  }
              })
              axioIn.get('/api/product/function/?product='+this.pro_id+'&depend=1')
              .then((res)=>{
                  this.ite2=res.data//.map(v=>v.func_name)
                  this.lina=res.data;
              })
          axioIn.get('/api/product/function/'+id)
            .then((res)=>{
                this.func_=res.data;
                if(this.func_.func_type === '单选框')this.func_.xuans = true;
            })
      },
      delet:function(id){
          let aa=confirm('确认删除？')
          if(aa){
              axioIn.delete('/api/product/function/'+id)
                 .then((res)=>{
                          axioIn.get('/api/product/function/?product='+this.pro_id)
                            .then((res)=>{
                                this.items=res.data.results;
                                this.page=res.data.page_num.total_page;
                                this.rowNum = res.data.page_num.total_count;
                            })
                      })
              }
      },
      dele_fun:function(i){ //
            if(confirm('确定删除吗？')){this.func_.selection.splice(i,1);}//console.log(2)
      },
      wenc:function(i){ // 文本形式的文本框和单选框
          if(this.func_.func_type==='文本框'){
              this.func_.xuans=false;this.func_.selection=[];
          }
          else{this.func_.xuans=true;//console.log(0)
          this.func_.selection=[{select_name:'',select_value:'',is_default:false}]
          }
       },
      de_val:function(n,aaa){ // 设置默认
         
         if(this.a5==='修改'&&aaa[n].id!==undefined&&aaa[n].is_default===false){
              axioIn.put('/api/product/selection/'+aaa[n].id+'/modify_default/')
              .then((res)=>{
                  alert('设置成功');
                  aaa.map(v=>v.is_default=false);
                  aaa[n].is_default=true;
              })
          }
          else{//console.log(aaa[n].id)
              aaa.map(v=>v.is_default=false);
              aaa[n].is_default=true;
          } 
       },
      incrementTotal:function(q){
          axioIn.get('/api/product/function/?page='+q+'&product='+this.pro_id)
           .then((res)=>{
                this.items=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
          })
      },
      pro_revise:function(){this.adis1=false},
      pro_keep:function(){//保存产品名称
         if(this.aa2.product===''){alert('请输入产品名称');return}
         this.adis1=true;
         if(this.ti==='修改'){
             axioIn.put('/api/product/product/'+this.$route.query.id+'/',{product:this.aa2.product})
              .then((res)=>{alert('修改成功')})
              return
         }
         if(this.revi===false){
         axioIn.post('/api/product/product/',{product:this.aa2.product})
            .then((res)=>{this.revi=true;this.pro_id=res.data.id;alert('增加产品成功')})
            .catch((err)=>alert(err.data.product[0]))
         }else{
            axioIn.put('/api/product/product/'+this.pro_id+'/',{product:this.aa2.product})
            .then((res)=>{alert('修改成功')})
         }
      },
      clo:function(){
          this.a1=false;this.shad=false;
          this.func_={func_name:'',func_type:'',xuans:false,func_code:'',selection:[{select_name:'',select_value:'',is_default:''}]};
      },
      qieF:function(){
          this.pro_x=true;this.pro_b=false;this.aa3.map(n=>n.ac=false)
      },
      tipp:function(){this.shad=false;this.tip=false;},
      tipp1:function(){this.shad1=false;this.tip=false;},
      upload:function(){//批量导入
        let input = this.$refs.upload;
        let data = new FormData();
        data.append('file',input.files[0]);
        axioIn.post('/api/product/function-selection-import/?product='+this.pro_id,data,{headers: {'Content-Type': 'application/vnd.ms-excel'}})
        .then((res)=>{
            this.clo();alert('导入成功')
            axioIn.get('/api/product/function/?product='+this.pro_id)
         .then((res) => {
          this.items=res.data.results;
          this.page=res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          })
        }).catch((err)=>{alert(err.data.error)})
    
       },
      bao_v:function(){
          var aa='';
          var bb={function:this.pro_liv}
          this.aa3.map(n=>{if(n.ac===true){aa=n.id}})
          console.log(aa)
          if(aa === ''){alert('没有选择对应的版本');this.pro_x=true;this.pro_b=false;return}
          //console.log(this.pro_liv)
          axioIn.put('/api/product/version/'+aa+'/modify_func/',bb)
           .then(res=>{alert('新增成功')})
      },
      clo_v:function(){
          this.pro_liv=this.pro_livv;this.yin='';
      },
      por_yi:function(id){
          if(id===undefined){return}
          axioIn.get('/api/product/version/'+id+'/')
              .then(res=>{this.pro_liv=res.data.function.map(n=>n.id)})
      }
  }
}
</script>
<style lang='scss' scoped>
  .productnow{width: 100%;
    //    height: 100%;overflow: hidden;
      .ji{margin:20px 0 0 0;padding-bottom:20px;position: relative;label{margin-left:20px;font-size: 12px;color:#999;}.so{margin-right:0px;margin-left:0;width:80px;height:32px;line-height: 32px;}
      .ban{position: absolute;left:20px;height: 30px;line-height: 30px;border:1px solid gray;border-radius:5px;font-size:0;
      span{display: inline-block;width:80px;text-align: center;background-color: #fafafa;border-top-left-radius: 5px;border-bottom-left-radius: 5px;border-right: 1px solid #eee;font-size:12px;line-height: 28px;}
      select{height:30px;width:315px;border:none;border-radius:5px;}}
      input{height:30px;border:1px solid #d2d8db;width:388px;}
      }
      .active{background-color:#eaf8fe;}
      .pro{width:100%;margin-top:15px;display:flex;justify-content: space-around;
    //   .pro_left,.pro_right{float:left;}
      /*border-right:1px solid #d9d9d9;*/
      .pro_left{width:18%;margin-right:10px;border-right:1px solid #d9d9d9;min-height: 600px;
        .qie{width:100%;height:35px;line-height: 35px;color:#0386f0;background-color: white;margin-bottom: 10px;display: inline-block;border-radius:5px;}
        .ul{background-color: white; overflow: hidden;height: calc(100% - 45px);}
        input{width:calc(100% - 30px);height:32px;border-radius:5px;margin:10px;outline:none;border:1px solid gray;padding-left:8px;}
        li{height:46px;width:100%;background: #ebecee;border-bottom: 1px solid #e1e6ee;overflow: hidden;
        a{width:120px;float:left;text-align:left;height:46px;line-height:46px;color:#666;margin-left:20px;}
        i{width:25px;height:44px;display:inline-block;background:url(../assets/close.png) no-repeat center;&:hover{cursor: pointer;}}}
        li:hover{background-color:#eaf8fe;}a:hover{color:#0386f0}
        ul{
            width: 104%;
            height: 100%;
            background: #ffffff;
            overflow-y: scroll
        }
    }
      .pro_right{
          width:81%;min-height:640px;background-color: white;
          .cp{background-color:#dfe5e6}
          .cp,.it{margin:0 20px;border-radius: 5px;}
          .it{font-size:14px;color:#666;
          li{padding:10px 0;border-bottom:1px solid #eee;}}
          .c0,.c1,.c2{display: inline-block;text-align: left;}
          .c0{width:50px;margin-left:20px;}
          .c2{width:80px}
          .pro_b{height:640px;text-align:left;overflow-y:scroll;position: relative;p{height:32px;}
          .bao{border-top:1px solid #eee;width:100%;
              .qub{margin-right:20px;}
              a{width:70px;height:20px;text-align: center;padding:5px 0px;margin:16px 5px;}
          } 
          .lis{display: inline-block;width:150px;text-align: left;height: 32px;line-height: 32px;margin:0 20px;
          input,span{display: inline-block}
          input{width:13px;height:13px;margin-right:10px;vertical-align: middle;}
          span{width:120px;height:32px;text-overflow: ellipsis;font-size: 12px;color:#666;}
          }
          }
          }}
      .def{background-color:#f9f9f9;margin-top:-5px;a{margin-right:15px;}span{color:#0386f0;cursor: pointer;}}
      .cha{background:url(../assets/cha1.png) no-repeat center;margin-right:15px;}
      .bian{background:url(../assets/bian1.png) no-repeat center;}
      .dele{background:url(../assets/dele.png) no-repeat center}
      .chana{width:500px;height:480px;border:1px solid gray;background-color:white;overflow-y:scroll;position:absolute;top:20%;left:25%;z-index:11;
      .afb{margin:10px;
          i{background:url(../assets/close.png) no-repeat;}}
      p{text-align: left;margin:5px;
        label{width:60px;text-align: right;display: inline-block;margin-left:40px;}
        input,select{display: inline-block;width:320px;height:32px;line-height: 32px;border:1px solid #d9d9d9;border-radius: 5px;margin-left:10px;padding-left:10px;}
        select{width:333px;}
        input[type=radio]{width:20px;position: relative;top:10px;}
      }
      
      .two{margin-left:70px;
      label{width:100px;}
      select,input{width:160px;margin-right:10px;}
      .dele{top:5px;position: relative;margin-left: 10px}
      }
      .bao{margin-left:110px;}
      .lef{margin-left:50px;}
      }
      .leading_in{position: absolute;width:74px;height:33px;top:4px;left:91px;z-index: 3;opacity: 0.8;cursor: pointer;opacity: 0;}
      .bao_v{position: absolute!important;right:0px;bottom: 12px;margin-right: 0px;}
      .gon{height:32px;line-height: 32px;margin:10px 20px;font-size: 12px;color:#999;}
  }
</style>


