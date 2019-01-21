<template>
  <div class="jiao">
      <!-- <p class="qu">权限和人员管理 > 角色权限</p> -->
      <p class="ji"><label for="">角色名称</label><input type="text" v-model="messs" @keyup.enter="search">
          <a href="javascript:void(0)" class="so" @click='search()'>搜索</a><a href="javascript:void(0)" class="cho" @click="mess()">重置</a></p>
      <p class="xin"><a href="javascript:void(0)"  class="so" @click='add()'>新增角色</a></p>
      <p class="cp">
          <a href="javascript:void(0)" class="wid_1 wid5">刘茜</a>
          <a href="javascript:void(0)" class="wid5">角色名称</a>
          <a href="javascript:void(0)" class="wid5">人数</a>
          <a href="javascript:void(0)" class="wid5">查看成员</a>
          <a href="javascript:void(0)" class="wid5">操作</a>
      </p>
      <ul class="it">
          <li v-for="item in items" :key='item.id'>
              <span class="wid_1 wid5">{{item.index}}</span>
              <span class="wid5">{{item.name}}</span>
              <span class="wid5" style="cursor:pointer;" @click="staffContain(item.id,item.name)">{{item.own_user_count}}</span>
              <span class="wid5"><i  style="cursor:pointer;" @click="staffContain(item.id,item.name)" class="el-icon-search"></i></span>
              <span class="wid5">
                  <!--a href="javascript:void(0)" class="cha" @click='cha(item.id)'></a-->
                  <a href="javascript:void(0)" class="bian" @click='revise(item.id)'></a>
                  <a href="javascript:void(0)" class="delete" @click="deleRole(item.id)"></a></span>
          </li>
      </ul>
      <div v-show='zeng' class='xinn'>
          <p  class='afb'><span >{{msn}}</span><i @click='close()' class='clo'></i></p>
          <p><label for="" class='label'>角色名称</label><input type="text" class='input' style='width:345px;' v-model='se_name' v-bind:disabled='adisable'/><em class='ii'>*</em></p>
          <p class='openn'><label for=""  class='label'>开放权限</label><span>模块</span><span>授权内容</span><span class='mo'>整个模块<img :src='img' alt="xx" @click='qie()' :ap='tabb'/></span></p>
          <div class='leful clearFloat'>
                <ul>
                    <li v-for='(a,index) in aa' :key="index">
                        <a  href="javascript:void(0)" @click='nop(index,a.name,a.id)' v-bind:class="{ aps: a.isActive }">{{a.name}}</a><em v-show='a.tice'></em><i v-show='a.quan'></i>
                        <ul v-show='a.sho'>
                            <li v-for='(a1,i) in a.children' :key="i">
                                <a  href="javascript:void(0)" @click='nopp(index,i,a.id,a1.id)' v-bind:class="{ aps: a1.isActive }">{{a1.name}}</a>
                            </li> 
                        </ul>
                    </li>
                </ul>
                 <div class='rout' v-show='authority'><input type="checkbox" v-model="checkedNames[0]"  v-bind:disabled='adisable' @change='ck(checkedNames[0],0)' />增改
                     <input type="checkbox" v-model="checkedNames[1]"  v-bind:disabled='adisable' @change='ck(checkedNames[1],1)' />删除{{ $route.params.id }}</div>
          </div>
          
          <div v-show='tabs' class='tabs'>
              <span>包含人员</span>
              <table cellspacing='0' cellspadding='0'>
                  <tr>
                      <th class='cn'>人员名称</th>
                      <th>组织机构</th>
                  </tr>
                  <tr v-for='(dd,k) in ddds' :key="k">
                      <td>{{dd.user_name}}</td>
                      <td>{{dd.department}}</td>
                  </tr>
              </table>
          </div>
          <p class='bao' style='text-align:right' v-show='qu'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='xiu()'>保存</a></p>
      </div>
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <pagination :number='page' :chain='rowNum' v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
      <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填
          <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div>
  </div>
</template>
<script>
import Shade from './shade';
import axios from 'axios';
import Qs from 'qs';
import Pagination from './pagination';
import axioIn from '../store/axioIn'
import Router from "../router/index";
export default {
  
  name:'jiao',
  components:{Shade,Pagination},
  data:function(){
      return {
          messs:'',
          checkedNames:[false,false],
          tabs:false,
          tabb:false,
          adisable:false,
          shad:false,
          qu:false,
          se_name:'',
          zeng:false,
          gett:'',
          geid:0,
          getti:{auth:{
                        group:{view:0,delete:0,modify:0},
                        structure:{view:0,delete:0,modify:0},
                        user:{view:0,delete:0,modify:0},
                        view:0
                        },
                 production_manage:{
                     pro:{view:0,delete:0,modify:0},
                     ops:{view:0,delete:0,modify:0},
                     view:0
                     },
                 workorder_manage:{
                     openstationmanage:{view:0,delete:0,modify:0},
                     view:0
                 },
                 data_manage:{
                     overview:{view:0,delete:0,modify:0},
                     prod_oper:{view:0,delete:0,modify:0},
                     data_ops:{view:0,delete:0,modify:0},
                     view:0
                 },
                 log:{
                     'personal-log':{view:0,delete:0,modify:0},
                     'system-log':{view:0,delete:0,modify:0},
                     view:0
                 },
                 setup:{
                     'help_center':{view:0,delete:0,modify:0},
                     'industry':{view:0,delete:0,modify:0},
                     view:0
                 }
           },
          msn:'',
          img:require('../assets/clo.png'),
          imgg:[require('../assets/clo.png'),require('../assets/open.png')],
          ddds:[
              //{user_name:'',department:''},
              
          ],
          aa:[
              /*{name:'客户管理',id:'/jiao/ke',tice:false,quan:false,isActive:false},
              {name:'订单管理',id:'/jiao/di',tice:false,quan:false,isActive:false},*/
              {name:'工单管理',id:'workorder_manage',tice:true,quan:false,isActive:false,sho:false,
                children:[
                    {name:'开站管理',id:'openstationmanage',isActive:false}
                ]
              },
              {name:'产品管理',id:'production_manage',tice:true,quan:false,sho:false,isActive:false,
              children:[
                  {name:'运维配置',id:'ops',isActive:false},
                  {name:'产品配置',id:'pro',isActive:false},
                  
              ]},
              {name:'数据管理',id:'data_manage',tice:true,sho:false,quan:false,isActive:false,
                  children:[
                    {name:'总览',id:'overview',isActive:false},
                    {name:'产品和运营统计',id:'prod_oper',isActive:false},
                    {name:'运维统计',id:'data_ops',isActive:false}
                ]
              },
              {name:'权限和人员管理',id:'auth',tice:true,sho:false,quan:false,isActive:false,
                children:[
                    {name:'角色权限',id:'group',isActive:false},
                    {name:'组织架构',id:'structure',isActive:false},
                    {name:'人员配置',id:'user',isActive:false}
                ]
              },
              {name:'日志',id:'log',tice:true,quan:false,isActive:false,sho:false,
                children:[
                    {name:'个人日志',id:'personal-log',isActive:false},
                    {name:'系统日志',id:'system-log',isActive:false}
                ]
              },
              {name:'设置',id:'setup',tice:true,quan:false,isActive:false,sho:false,
                children:[
                    {name:'客户行业设置',id:'industry',isActive:false},
                    {name:'帮助中心设置',id:'help_center',isActive:false}
                ]
              }
          ],
          items:[
              {id:'11r',name:'eee',own_user_count:'srs',sho:false},
          ],
          page:'',
          rowNum: '',
          popp:'',
          pageIndex:1,
          shad1:false,
          tip:false,
          //search_val:'',
          search_open:'',
          authority:false
      }
  },
  created:function(){
   this.$checkCookie();   
  },
  methods:{
      qie:function(a){ //开关
          if(this.msn!=='查看'){
                if(this.tabb===false){this.img=require('../assets/open.png');this.tabb=true;}
                else {this.img=require('../assets/clo.png');this.tabb=false};
          }
            if(this.msn==='新增'){
                let aaio=this.ddd();
                //console.log(aaio);
                if( aaio.length==2){
                    this.getti[aaio[0]][aaio[1]].view=Number(this.tabb);//console.log(this.getti[aaio[0]][aaio[1]].view);
                }
                else if(aaio.length==1){this.getti[aaio].view=Number(this.tabb);//console.log(this.getti[aaio].view)
                }
            }
            if(this.msn==='修改'){
                let aaio=this.ddd();
                if( aaio.length==2){
                    this.gett[aaio[0]][aaio[1]].view=Number(this.tabb);//console.log(this.gett[aaio[0]][aaio[1]].view);
                }
                else if(aaio.length==1){this.gett[aaio].view=Number(this.tabb);}
            }
            },
      add:function(){ //新增
          /*this.shad=true;this.zeng=true;this.tabs=false;this.qu=true;this.msn='新增';this.adisable=false;
          this.checkedNames=[false,false];this.se_name='';
          this.img=require('../assets/clo.png');this.tabb=false;
          this.ddds=[];
          this.aa.forEach((arg)=>{
              arg.isActive=false;arg.quan=false;
              if(arg.children!==undefined){arg.children.forEach((bb)=>{bb.isActive=false})}
          });/*/
          Router.push({ path: "/newj" });
          },
      search:function(){ // 搜索
          this.search_open=true;
          axioIn.get('/permission/groups/?group_name='+this.messs)
          .then((res)=>{
              if(res.data.length==0){alert('未搜到相关信息')}
                 else{this.popp=this.items =res.data.results;
                      this.page=res.data.page_num.total_page;
                      this.rowNum = res.data.page_num.total_count;}
          })
      },
      close:function(){this.shad=false;this.zeng=false;this.tabs=false;},
      cha:function(id){ //查看
          this.shad=true;this.zeng=true;this.tabs=true;this.qu=false;this.msn='查看';this.adisable=true;
          //if(this.gett===''){
           this.aa.forEach((arg)=>{
              arg.isActive=false;arg.quan=false;
              if(arg.children!==undefined){arg.children.forEach((bb)=>{bb.isActive=false})}
          });
          this.img=require('../assets/clo.png');this.tabb=false;
          this.checkedNames=[false,false];
          axioIn.get('/permission/groups/'+id+'/')
            .then((res) => {
                if(typeof res.data.permissions === 'string'){
                    res.data.permissions=JSON.parse(res.data.permissions)
                }//console.log(res.data.permissions)
                this.ddds=res.data.own_user;//console.log(JSON.stringify(this.ddds))
                this.se_name=res.data.name;
                //console.log(typeof res.data.permissions);
                this.gett=res.data.permissions;//console.log(this.gett.auth.view);
                for( let n in this.gett){console.log(this.gett[n].view)
                    if(this.gett[n].view>0){
                        this.aa.map(v=>{
                            if(v.id===n){v.quan=true}
                        })
                    }else{continue}
                }
                })
          //console.log(res.data)
            .catch((err)=> console.log(err));//}
          },
      revise:function(id){ //编辑
         /* this.shad=true;this.zeng=true;this.tabs=true;this.qu=true;this.msn='修改';this.adisable=false;
           //if(this.gett===''){
         this.aa.forEach((arg)=>{//将左边选择的一项置空
            arg.isActive=false;arg.quan=false;
            if(arg.children!==undefined){arg.children.forEach((bb)=>{bb.isActive=false})}
         });
          this.img=require('../assets/clo.png');this.tabb=false;
          this.checkedNames=[false,false];
          axioIn.get('/permission/groups/'+id+'/')
            .then((res) => {
                if(typeof res.data.permissions === 'string'){
                    res.data.permissions=JSON.parse(res.data.permissions)
                }
                this.se_name=res.data.name;
                this.ddds=res.data.own_user;
                this.geid=res.data.id;
                this.gett=res.data.permissions;
                for( let n in this.gett){//console.log(this.gett[n].view)
                    if(this.gett[n].view>0){
                        this.aa.map(v=>{
                            if(v.id===n){v.quan=true}
                        })
                    }else{continue}
                }
                //console.log(JSON.stringify(this.gett))
                })//}/*/
                console.log(id);return
            Router.push({ path: "/newj",query:{id:id} });
         },
      mess:function(){//重置
          this.messs='';this.search_open=false;
          axioIn.get('/permission/groups/ ')
          .then((res) => {
              this.popp=this.items =res.data.results;
              this.page=res.data.page_num.total_page;
              this.rowNum = res.data.page_num.total_count;
              this.pageIndex=1;
          })
        },
      xiu:function(){ //保存
          let aa={};
          if(this.se_name===''||this.se_name===undefined){this.shad1=true;this.tip=true;}
          else{
                if(this.msn==='新增'){
                    aa.name=this.se_name;
                    aa.permissions=this.getti;
                    console.log(JSON.stringify(this.getti))
                    axioIn.post('/permission/groups/',aa)
                    .then((res)=>{
                        alert('增加成功');
                        this.shad=false;this.zeng=false;
                        axioIn.get('/permission/groups/')
                        .then((res) => {
                        this.popp=this.items =res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                         this.search_open=false;
                    }).catch((err)=> {this.shad=false;this.zeng=false;alert(err.response.data.name[0])});
                    
                })}
                if(this.msn==='修改'){
                    aa.name=this.se_name;
                    aa.permissions=this.gett;console.log(JSON.stringify(aa))
                    axioIn.put('/permission/groups/'+this.geid+'/',aa)
                    .then((res)=>{
                        alert('修改成功');
                        this.shad=false;this.zeng=false;
                        if(this.search_open===false){
            axioIn.get('/permission/groups/?page='+this.pageIndex)
                    .then((res) => {
                        this.items = res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                    })
                    .catch((err)=> {console.log(err)}) 
         }
         else{
             axioIn.get('/permission/groups/?group_name='+this.messs+'&page=1')
                    .then((res) => {
                        this.items = res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                    })
                    .catch((err)=> {console.log(err)}) 
         }
                    })
                    .catch((err)=> {this.shad=false;this.zeng=false;console.log(err)}) 
                    //console.log(JSON.stringify(this.gett))
                }
          }
      },
      nop:function(index,name,a){//开放权限下的数据
          this.authority=false;
          this.aa.forEach((arg)=>{arg.isActive=false;
            if(arg.children!==undefined){arg.children.forEach((bb)=>{bb.isActive=false})}
             });
          this.aa[index].isActive=true;this.checkedNames=[false,false];this.tabb=false;this.img=require('../assets/clo.png');
          this.checkedNames=[false,false]
          if(name==='产品管理'||name==='权限和人员管理'||name==='工单管理'||name==='日志'||name==='数据管理'||name==='设置'){this.aa[index].sho=!this.aa[index].sho}
         
          /*if(this.filte('modify',this.gett[a])!==undefined&&this.filte('delete',this.gett[a])!==undefined){
          this.checkedNames=[this.filte('modify',this.gett[a]),this.filte('delete',this.gett[a])]
          console.log(this.checkedNames)}*/
          if(this.msn==='新增'){
              if(this.getti[a].view>0){this.tabb=true;this.img=require('../assets/open.png');}
                else{this.tabb=false;this.img=require('../assets/clo.png');}
          }
           else{
                if(this.gett[a].view>0){this.tabb=true;this.img=require('../assets/open.png');/*this.aa[index].quan=true;*/}
                else{this.tabb=false;this.img=require('../assets/clo.png');}
                }
          },
      nopp:function(index,i,id,id1){  console.log(this.checkedNames) 
          this.authority=true;
          this.aa.forEach((arg)=>{
              arg.isActive=false;
              if(arg.children!==undefined){arg.children.forEach((bb)=>{bb.isActive=false})}
              });
            this.aa[index].children[i].isActive=true;this.tabb=false;this.img=require('../assets/clo.png');
            this.checkedNames=[false,false]
            
            if(this.msn==='新增'){
              if(this.getti[id][id1].view>0){this.tabb=true;this.img=require('../assets/open.png');}
                   else{this.tabb=false;this.img=require('../assets/clo.png');}
              this.checkedNames=[this.filte('modify',this.getti[id][id1]),this.filte('delete',this.getti[id][id1])];
              //console.log(this.checkedNames)
            this.getti[id][id1].modify=Number(this.checkedNames[0]);
            this.getti[id][id1].delete=Number(this.checkedNames[1]);
          }else{
              if(this.gett[id][id1].view>0){this.tabb=true;this.img=require('../assets/open.png');}
                   else{this.tabb=false;this.img=require('../assets/clo.png');}
              this.checkedNames=[this.filte('modify',this.gett[id][id1]),this.filte('delete',this.gett[id][id1])];
              //console.log(this.checkedNames)
            this.gett[id][id1].modify=Number(this.checkedNames[0]);
            this.gett[id][id1].delete=Number(this.checkedNames[1]);
          }
      },
      ddd:function(){
          let bbi=[];
         this.aa.forEach((arg)=>{
             if(arg.isActive===true){ bbi=[arg.id];return bbi}
             if(arg.children!==undefined){
                 arg.children.forEach((bb)=>{
                     if(bb.isActive===true){ bbi=[arg.id,bb.id];return bbi}
                 });
                 return bbi
             }  
         })
         return bbi
     },
      filte:function(obj,Obj){//返回Obj[obj]的值
          for(let value in Obj){
             if(value===obj){return Obj[value]  }
              else if(typeof Obj[value]=="object"){
                 return this.filte(obj,Obj[value])
              }
          }
     },
     
     ck:function(aia,aib){
         //aia=!aia;
         let aai=this.ddd();
         if(this.msn==='新增'&&aai.length===2){
             if(aib=='0'){//console.log(this.checkedNames)
                 this.$set(this.getti[aai[0]][aai[1]],'modify',Number(this.checkedNames[0]))
                 //this.getti[aai[0]][aai[1]].modify=Number(!this.checkedNames[0]);
            //console.log(this.checkedNames[0])
                 //console.log(this.checkedNames);console.log(this.getti[aai[0]][aai[1]].modify)
                 //console.log(JSON.stringify(this.getti))
             }
             if(aib=='1'){
                 this.$set(this.getti[aai[0]][aai[1]],'delete',Number(this.checkedNames[1]))
                 //this.getti[aai[0]][aai[1]].delete=Number(!this.checkedNames[1]);
            //console.log(JSON.stringify(this.getti))
            //console.log(aai)
                 //console.log(this.checkedNames);console.log(this.getti[aai[0]][aai[1]].modify)
                 }
         }
         if(this.msn==='修改'&&aai.length===2){
             if(aib=='0'){
                 this.$set(this.gett[aai[0]][aai[1]],'modify',Number(this.checkedNames[0]))
                 //this.gett[aai[0]][aai[1]].modify=Number(this.checkedNames[0]);
            //console.log(JSON.stringify(this.gett))
                 }
             if(aib=='1'){ 
                 this.$set(this.gett[aai[0]][aai[1]],'delete',Number(this.checkedNames[1]))
                // this.gett[aai[0]][aai[1]].modify=Number(this.checkedNames[1]);
            //console.log(JSON.stringify(this.gett))
                 }
         }
         //this.checkedNames[1]=!this.checkedNames[1];
         
     },
     incrementTotal:function(q){
         q=(q===undefined?1:q);
         if(this.search_open===false){
            axioIn.get('/permission/groups/?page='+q)
                    .then((res) => {
                        this.items = res.data.results;
                        this.pageIndex=q;
                    })
                    .catch((err)=> console.log(err)) 
         }
         else{
             axioIn.get('/permission/groups/?group_name='+this.messs+'&page='+q)
                    .then((res) => {
                        this.items = res.data.results;
                        this.pageIndex=q;
                    })
                    .catch((err)=> console.log(err)) 
         }
      },
      tipp:function(){
          this.shad1=false;this.tip=false;
      },
      deleRole (id) { // 删除角色
        this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axioIn.delete('/permission/groups/'+id+'/').then(res=>{
            this.getRolelist()
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
      staffContain (id,name) {
          Router.push({ path: "/staffLimit",query: {id: id,name:name} });
      },
      getRolelist () {
        axioIn.get('/permission/groups/')
        .then((res) => {
                this.popp=this.items =res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.$store.commit('setLoading', false)
            })
        .catch((err)=> {
            console.log(err);
            this.$store.commit('setLoading', false)
        });
        this.search_open=false;
      }
  },
  mounted:function(){
    this.getRolelist()
  },
  
}

</script>
<style lang="scss" scoped>
.jiao{background-color: #edf2f5;width:100%;margin:auto;
.clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
    .qu{height:36px;line-height:36px;background-color: white;}
    .ji{text-align:left;margin:32px 0 30px;
        label{margin:0 0 0 10px;}
        input{height:32px;margin:0 20px;padding-left:5px;}
        
      }
      .so,.cho{height:32px;width:80px;text-align:center;border-color:#bcc3ca;display:inline-block;border-radius:5px;line-height:32px;}
        .so{background-color: #0386f0;margin-right:20px;color:white;}
        .cho{background-color: #eeeeee;color:black;}
    .xin{height:52px;background-color: white;text-align:left;border-radius: 5px 5px 0 0}
    .afb{margin:0!important;i{background:url(../assets/close.png)}}
    .cp{height:55px;line-height: 55px;text-align: left;}
    .c1,.c2,.c3,.c4{color:#666666;display:inline-block;}
    .c1{margin-left:22px;width:222px;}
    .c2{width:322px;}
    .c3{width:322px;}
    .c4{width:122px;}
    .it{background-color:white;text-align:left;
    //li{height:45px;line-height:45px;}
    }
    .cha,.bian,.delete{width:20px;height:20px;display:inline-block;}
    .cha{background:url(../assets/cha1.png) no-repeat center;margin-right:20px;}
    .bian{background:url(../assets/bian1.png) no-repeat center}
    .delete{background:url(../assets/dele.png) no-repeat center;}
    .xinn{width:540px;height:510px;border:1px solid gray;background-color:white;position:absolute;z-index:11;top:20%;left:35%;overflow-y:scroll;
         p{text-align:left;margin:10px;}
         .openn span{display:inline-block;line-height:40px;background-color:#e5eaeb;padding-left:5px;width:95px;
         img{position:relative;right:-30px;top:7px;}
         }
         .mo{width:155px!important;}
         .openn{margin-bottom:0px!important;}
         .leful{border:1px solid #e5eaeb;width:358px;left:120px;position:relative;}
         ul{width:160px;text-align:left;/*margin-left:120px;*/border:1px solid #e5eaeb;padding:10px 0 0px 0;float:left;
           li{/*height:30px;*/position:relative;
           ul{float:none;margin-left:0;}
           a{display:inline-block;width:140px;height:30px;line-height: 30px;padding-left:20px;}
           em,i{position:absolute;top:8px;display:inline-block;width:15px;height:15px;}
           em{right:8px;background:url(../assets/quan.png) no-repeat right;}
           i{background:url(../assets/tick.png) no-repeat right;right:25px;}
           }
           li:hover{background-color:#e4f7fc;}
           .aps{background-color:#e4f7fc;}
         }
         .rout{width:196px;height:210px;float:left;text-align: left;
         input{margin:15px 5px 0 15px;}}
         .tabs{height:240px;margin:20px 0;
             span{float:left;width:110px;text-align:right;height:44px;line-height: 44px;margin-right:10px;}
             table{float:left;width:360px;
                 th{font-weight:500;background-color:#e5eaeb;}
                 tr{height:42px;line-height: 44px;}
                 th,td{border:1px solid #e5eaeb;}
                 .cn{width:130px;}
             }
         }
    }
    
    .ji{height: 60px;line-height: 60px;margin: 0 0 15px;background: #ffffff;border-radius: 6px;
      input{margin-right: calc(100% - 550px)}
    }
}
</style>


