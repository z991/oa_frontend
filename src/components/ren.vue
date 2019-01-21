<template>
    <div class="ren back">
      <!-- <p class="qu">权限和人员管理 > 人员配置</p> -->
      <p class="ji">
        <section>
            <!-- <span class="sear"><label for="">组织架构</label><input type="text" v-model="messs" @keyup.enter="search"></span> -->
            <span class="sear"><label for="">角色名称</label><input type="text" v-model="messs1" @keyup.enter="search"></span>
            <span class="sear"><label for="">人员名称</label><input type="text" v-model="messs2" @keyup.enter="search"></span>
             <a href="javascript:void(0)" class="so" @click="search()">搜索</a>
            <a href="javascript:void(0)" class="cho" @click="mess()">重置</a>
        </section>
        <section class="search_container">
            <!-- <a href="javascript:void(0)" class="so" @click="search()">搜索</a>
            <a href="javascript:void(0)" class="cho" @click="mess()">重置</a> -->
        </section>
      </p>
      <p class="xin"><a href="javascript:void(0)"  class="so" @click='add()'>新增账号</a></p>
      <p class="cp">
          <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
          <a href="javascript:void(0)" class="wid4">人员名称</a>
          <!-- <a href="javascript:void(0)" class="wid5">组织架构</a> -->
          <a href="javascript:void(0)" class="wid4">角色名称</a>
          <a href="javascript:void(0)" class="wid4">操作</a>
      </p>
      <ul class="it">
          <li v-for="(item) in items" :key="item.id">
              <span class="wid_1 wid4">{{item.index}}</span>
              <span class="wid4">{{item.last_name}}</span>
              <!-- <span class="wid5">{{item.department}}</span> -->
              <span class="wid4">{{item.groups_name}}</span>
              <span class="wid4">
                <a href="javascript:void(0)" class="bian" @click="bian(item.id)"></a>
                <a href="javascript:void(0)" class="delete" @click="deleRole(item.id)"></a>
              </span>
          </li>
      </ul>
      <div v-show="message1" class='message' v-bind:style="{top: top + 'px' }">
          <p class="mesn">{{zhang.last_name}}</p>
          <div class="pp">
            <p><label for="">账号</label><span style='word-wrap: break-word;'>{{zhang.username}}</span></p>
            <p><label for="">密码</label><span>******</span></p>
            <p><label for="">角色</label><span>{{zhang.groups.name}}</span></p>
            <p><label for="">组织架构</label><span>{{zhang.department}}</span></p>
          </div>
          <div class='bao'><a href="javascript:void(0)" class='quu' @click="yin()">返回</a></div>      
      </div>
      <div v-show="af" class='af'>
          <p class='afb'><span>编辑</span><i @click='close()'></i></p>
          <div class="afm">
            <p><label for="">人员名称:</label><input type='text' v-model='zhang1.last_name' v-bind:disabled='true'/><em class='ii'>*</em></p>
            <p><label for="">人员账号:</label><input type='text' v-model='zhang1.username' v-bind:disabled='true'/><em class='ii'>*</em></p>
            <p><label for="">人员密码:</label><input type='text'  v-model='zhang1.pass' v-bind:disabled='true'/><em class='ii'>*</em></p>
            <p><label for="">角色:</label><input type='text' v-model='zhang1.groups.name' v-bind:disabled='false'/><em class='ii'>*</em></p>
            <p><label for="">组织架构:</label><input type='text' v-model='zhang1.department' v-bind:disabled='true'/><em class='ii'>*</em></p>
            <ul v-show='zhang2'></ul>
          </div>
          <p class='bao'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='bao(zhang1.id)'>保存</a></p>
      </div>
      <shade v-show='ren'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
     <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
     <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填
          <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div>
    </div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';
import Shade from './shade';
import Pagination from './pagination';
import axioIn from '../store/axioIn';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.withCredentials=true;//配置cookie
export default {
  name:'ren',
  components:{Shade,Pagination},
  data:function(){
      return {
          messs:'',
          messs1:'',
          messs2:'',
          ren:'',
          tip:false,
          shad1:false,
          top:'',
          items:[
              {id:'11',groups_name:'',email:'33',lase_name:'44',dpt_name:''}
          ],
          message:'',
          message1:false,
          af:false,
          zhang:{id:'11', username:'22',email:'33',last_name:'44',groups:[{name:''}],dpt_name:''},
          zhang1:{id:'11', username:'22',email:'33',pass:'******',last_name:'44',groups:[{name:''}],grop_list:[1,2,3],dpt_name:''},
          zhang2:false,
          zhangg:'',
          page:'',
          popp:'',
          pageIndex:1,
          search_val:'',
          search_open:'',
          rowNum: ''
      }
  },
  created(){
      this.getUserslist()
  },
  
  methods:{
    //   获取人员列表
      getUserslist() { 
        axioIn.get('/permission/users/')
            .then((res) => {
                this.popp=res.data.results;
                this.items=res.data.results;
                this.transform(this.items);
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.$store.commit('setLoading', false)
                })
            .catch((err)=> {
                console.log(err);
                this.$store.commit('setLoading', false)
                });
            this.$checkCookie(); 
            this.search_open=false;
      },
      cha:function(id,index){
          this.message1=true;//console.log(id);
          this.top=260+45*index;
           axioIn.get('/permission/users/'+id+'/')
           .then((response) => {
               this.zhang = response.data;
               let aa='';
               this.zhang.groups.forEach((aar)=>{
                      if(aa==''){
                        aa=aar.name}
                      else{aa=aa+','+aar.name}
                    })
                    this.zhang.groups.name=aa;
               })
           .catch((err)=> console.log(err));
        },
      bao:function(i){
          this.zhang1.grop_list=this.zhang1.groups.name;
          
          if((this.zhang1.last_name==''||this.zhang1.last_name==undefined)||(this.zhang1.username==''||this.zhang1.username==undefined)||(this.zhang1.groups.name==''||this.zhang1.groups.name==undefined)||(this.zhang1.department==''||this.zhang1.department==undefined)||(this.zhang1.pass==''||this.zhang1.pass==undefined)){
              this.tip=true;this.shad1=true;//console.log(this.zhang1.groups.name)
          }
          //console.log(this.zhang1.groups.name)
          else{//console.log(this.zhang1.groups.name)
          this.zhang1.groups=[];
              axioIn.put('/permission/users/'+i+'/',JSON.stringify(this.zhang1))
              .then((res)=>{
                    this.af=false;this.ren=false;
                    if(this.search_open===false){
              axioIn.get('/permission/users/?page='+this.pageIndex)
                .then((res) => {
                    this.items = res.data.results;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.transform(this.items);
                    this.message1=false;})
                .catch((err)=> console.log(err))  
          }
          else{
              axioIn.get('/permission/users/?'+this.search_val+'&page=1')
                .then((res) => {
                    this.items = res.data.results;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.transform(this.items);
                    this.message1=false;})
                .catch((err)=> console.log(err)) 
          }
                    /*axioIn.get('/permission/users/')
                    .then((response) => {
                        this.popp=response.data.results;
                        this.items=response.data.results;
                        this.transform(this.items);
                        this.page=res.data.page_num.total_page;
                        })
                    .catch((err)=> console.log(err));*/
            })
            .catch((err)=> {this.af=false;this.ren=false;console.log(err)})
          }
          //console.log(JSON.stringify(this.zhang1))
        },
      bian:function(id){
          this.af=true;this.ren=true;
          axioIn.get('/permission/users/'+id+'/')
           .then((response) => {
               this.zhang1 = response.data;
               let aai='';
               this.zhang1.grop_list=[1];
               this.zhang1.pass="******";
               this.zhang1.groups.forEach((aar)=>{
                      if(aai==''){
                        aai=aar.name}
                      else{aai=aai+','+aar.name}
                    })
                    this.zhang1.groups.name=aai;
                    
               })
           .catch((err)=> console.log(err));
          },
      // 删除人员
      deleRole (id) { 
            this.$confirm('此操作将删除该人员, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
            axioIn.delete('/permission/groups/'+ id+'/').then(res=>{
                this.getUserslist()
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
      },
      yin:function(){this.message1=false},
      incrementTotal:function(q){
          q=(q===undefined?1:q);
          if(this.search_open===false){
              axioIn.get('/permission/users/?page='+q)
                .then((res) => {
                    this.items = res.data.results;
                    this.pageIndex=q;
                    this.transform(this.items);
                    this.message1=false;})
                .catch((err)=> console.log(err))  
          }
          else{
              axioIn.get('/permission/users/?'+this.search_val+'&page='+q)
                .then((res) => {
                    this.items = res.data.results;
                    this.pageIndex=q;
                    this.transform(this.items);
                    this.message1=false;})
                .catch((err)=> console.log(err)) 
          }
        },
      mess:function(){this.messs='';this.messs1='';this.messs2='';this.search_open=false;
           axioIn.get('/permission/users/')
           .then((res) => {
                this.popp=res.data.results;
                this.items=res.data.results;
                this.transform(this.items);
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.pageIndex=1;
                })
         .catch((err)=> console.log(err));
        },
      search:function(){
          let aa=this.messs?('department='+this.messs):'';
          if(aa!==''){
              if(this.messs1!==''){
                  aa=aa+'&group_name='+this.messs1;
                  if(this.messs2!==''){aa=aa+'&username='+this.messs2;}
                }
                else{
                    if(this.messs2!==''){aa=aa+'&username='+this.messs2;}
                }
                
            } 
            else{
                if(this.messs1!==''){//console.log(0)
                  aa='group_name='+this.messs1;
                  if(this.messs2!==''){aa=aa+'&username='+this.messs2;}
                }
                else{//console.log(1)
                    if(this.messs2!==''){aa=aa+'username='+this.messs2;}
                }
            }
            this.search_val=aa;this.search_open=true;
           axioIn.get('/permission/users/?'+aa)
           .then((response) => {
               if(response.data.length==0){alert('未搜到相关信息')}
                 else{
                     this.items = response.data.results;
                     this.popp=response.data.results;
                     this.pageIndex=1;
                     this.page=response.data.page_num.total_page;
                     this.rowNum = response.data.page_num.total_count;
                     this.transform(this.items);
                                }
               })
           .catch((err)=> console.log(err));
        },
      close:function(){this.af=false;this.ren=false;},
      tipp:function(){
          this.shad1=false;this.tip=false;
        },
      transform:function(data){
          data.forEach((item)=>{
                let aa='';
                item.groups.forEach((aar)=>{
                    if(aa==''){
                        aa=aar.name}
                    else{aa=aa+','+aar.name}
                    })
                item.groups_name=aa;
            })
            }
        }
}
</script>
<style lang='scss' scoped>
@import '../assets/home';
    .c0{margin-left:22px;width:160px;}
    .c1{width:200px;}
    .c2{width:200px;}
    .c3{width:200px;}
    .c4{width:200px;}
    .xin{height:52px;background-color: white;text-align:left;border-radius: 5px 5px 0 0 }
    .cha,.bian,.delete{width:20px;height:20px;display:inline-block;}
    .cha{background:url(../assets/cha1.png) no-repeat center;margin-right:20px;}
    .bian{background:url(../assets/bian1.png) no-repeat center}
    .delete{background:url(../assets/dele.png) no-repeat center;}
    .message{width:260px;height:357px;background:url(../assets/bei.png) no-repeat top;background-color:white;position:absolute;z-index:5;
    left:1030px;top:260px;border:1px solid gray;border-radius:5px;
    .mesn{width:80px;height:80px;border-radius:50%;border:2px solid #fff;background-color:#515c6e;color:#fff;line-height: 80px;font-size:16px;
    position:absolute;top:54px;left:84px;}
    .bao{position:relative;top:170px;text-align:center;}
    .pp{position:relative;top:160px;
        p{margin:7px;color:#666666;font-size:14px;}
        label,span{display:inline-block;}
        label{width:80px;margin-right:24px;text-align: right;}
        span{width:120px;text-align: left;}
    }
    }
    .af{width:540px;height:392px;background-color:#fff;position:absolute;z-index:11;top:30%;left:35%;
        .afb{width:100%;height:50px;line-height:50px;border-bottom:1px solid gray;position:relative;
        i{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}}
        .afm{margin:30px 10px;font-size:14px;border-bottom:1px solid gray;
        p{text-align:left;margin-bottom:15px;}
        label,input{display:inline-block;}
        label{width:60px;margin-right:28px;text-align:right;margin-left:20px;}
        input{width:330px;text-align:left;padding:5px 10px;}
        }
        
    }
    .sear{display: inline-block;}
    .bao{text-align:right;margin-right:20px;
        a{display:inline-block;padding:5px 8px;border:1px solid gray;border-radius:5px;margin:5px;}
        .quu{color:#515c6e}.qub{color:#fff;background-color:#0386f0}}


// ----------------------------样式修改-----------------------------------
.ji {
    background: #fff;
    overflow: hidden;
    box-sizing: border-box;
    margin: 0 0 15px;
    border-radius: 6px;
    height: 110px;
    section {
        width: 100%;
        height: 40px;
        display: flex;
        margin: 10px auto;
        overflow: hidden;
        justify-content: space-between;
        .sear {
            width: 280px;
            height: 40px;
            margin: 0 15px;
            line-height: 40px;
            display: flex;
            justify-content: space-around;
            label{
                display: inline-block;
                width: 30%;
                margin: 5px auto;
                height: 30px;
                padding: 0 15px;
                line-height: 30px;
                text-align: center;
            }
            input {
                width: calc(70% - 20px) !important;
                margin: 3px 0 0 !important;
                box-sizing: border-box;
            }
        }
    }
    .search_container {
        padding: 5px 4% 5px 0;
        padding-left: calc(95% - 180px);
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .so{
            margin: 0;
        }
        a {
            height: 30px;
            line-height: 30px;
        }
    }
}
</style>

