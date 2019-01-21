<template>
  <div class="chanpnow">
      <!-- <p class="qu">产品管理 > 经典版产品配置</p> -->
      <p class="ji"><label for="">产品名称</label><input type="text" v-model="messs"  @keyup.enter="search">
          <a href="javascript:void(0)" class="so" @click='search()'>搜索</a><a href="javascript:void(0)" class="cho" @click='chon()'>重置</a></p>
      <p class="xinz"><a href="javascript:void(0)"  class="so" @click='add()'>新增</a></p>
      <p class="cp">
          <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
          <a href="javascript:void(0)" class="wid4">产品名称</a>
          <a href="javascript:void(0)" class="wid4">版本数量</a>
          <!--a href="javascript:void(0)" class="c3">产品数量</a-->
          <a href="javascript:void(0)" class="wid4">操作</a>
      </p>
      <ul class="it">
          <li v-for="(item,index) in items" :key="item.id">
              <span class="wid_1 wid4">{{item.index}}</span>
              <span class="wid4">{{item.product}}</span>
              <span class="wid4">{{item.version_count}}</span>
              <!--span class="c3">{{item.pro_count}}</span-->
              <span class="wid4">
                  <!--a href="javascript:void(0)" class="cha" @click="cha(item.id)"></a-->
                <a href="javascript:void(0)" class="bian" @click="bian(item.id)"></a>
                <a href="javascript:void(0)" class="dele" @click='delet(item.id,index)'></a>
                </span>
          </li>
      </ul>
      <div v-show='a1' class='chana'>
          <p class='afb'><span>{{a5}}</span><i @click='clo()'></i></p>
          <p class='afcc'><label for="">产品名称</label><input type="text" v-bind:disabled='adis' v-model='aa2.product' maxlength="20"><em class='ii'>*</em></p>
          <div class='center'>
                <div class='afleft'>
                    <input type="text" @keyup.enter='submi()' v-model='aa2.pro_version' v-bind:disabled='adis' maxlength="10" placeholder="输入信息点enter键添加新版本">
                    <ul>
                        <li v-for='(a,index) in aa3' @mouseover='enter(index)' @mouseout='out()' @click='versi(index)' :class="{active:a.ac}" :key="index"><a href="javascript:void(0)">{{a.name}}</a>
                        <i v-show="a.a2" @click="deleteb(index,a,a.id)"></i></li>
                    </ul>
                </div>
                <div class='afright'>
                    <p class='bao' style='text-align:left;margin-top:5px;margin-left:20px;'>
                        <a href="javascript:void(0)" class='qub' @click='func_ad()'>新增功能</a>
                        <a href="javascript:void(0)" class='qub'>批量导入</a>
                        <input type="file" class='leading_in' v-bind:disabled='adisable' accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="upload()"  ref="upload">
                        </p>
                    <p class='rela'>
                        <label for="">引用版本</label>
                        <select name="" id="" style='width:330px;' v-bind:disabled='adisable' v-model='aa2.version' @change="ychang(aa2.version)">
                            <option v-for='(item,index) in itmms' :value="item.id" :key="index">{{item.pro_version}}</option>
                        </select>
                    </p>
                    <div v-show='a3' class='funname' v-for='(aa1,index) in aa1s' :key="index">
                        <p style="font-size:0;">
                            <label for="">功能名称</label>
                            <input type="text" v-model="aa1.func_name" v-bind:disabled='adisable'>
                            <em class='ii'>*</em>
                            <a  class="dele" @click='dele(index)'></a>
                            <a  class="open" @click='open(index)'></a>
                            </p>
                        <div v-show='aa1.show'>
                            <p><label for="">客户版本</label>
                                <input type="radio" :name='index' v-bind:disabled='adisable' value='1' v-model='aa1.cli_version'>B2B
                                <input type="radio" :name='index' v-bind:disabled='adisable' value='2' v-model='aa1.cli_version'>B2C
                                <input type="radio" :name='index' v-bind:disabled='adisable' value='3' v-model='aa1.cli_version'>不限<em class='ii'>*</em></p>
                            <p><label for="">功能路径</label><input type="text" v-bind:disabled='adisable'  v-model='aa1.func_code'><em class='ii'>*</em></p>
                            <p style="font-size:0;">
                                <label for="">文本形式</label>
                                <select name="" id="" style='width:330px;' v-bind:disabled='adisable' v-model='aa1.func_type' @change='wenc(index)'>
                                    <option value="文本框">文本框</option>
                                    <option value="单选框">单选框</option>
                                </select><em class='ii'>*</em>
                            </p>
                            <div v-show='aa1.xuans'>
                                <div v-for='(it,index) in aa1.selection' :key='it.id'  class='def'>
                                    <p class='def bao' :class="{colo:!adisable,colo1:adisable}" style='text-align:left'><a href="javascript:void(0)"  :class="{quu:!it.is_default,qub:it.is_default}" style='border-right:1px solid #9d9d9d' @click='de_val(index,aa1.selection)'>设置默认</a><span @click='dele_fun(index,aa1.selection)'>删除</span></p>
                                    <p><label for="">选项名称</label><input type="text" v-model="it.select_name" v-bind:disabled='adisable'><em class='ii'>*</em></p>
                                    <p><label for="">选项值</label><input type="text" v-model="it.select_value" v-bind:disabled='adisable'><em class='ii'>*</em></p>
                                </div>
                            </div>
                        <p class='bao' style='text-align:left'><a href="javascript:void(0)" class='quu' @click='add_fun(index)'>添加功能选项</a></p>
                    </div>
          </div> 
                    <p class='bao' v-show='chs'><a href="javascript:void(0)"  class='quu' @click='clo()'>取消</a><a href="javascript:void(0)" class='qub' @click='chbao(aa2.id)'>保存</a></p>
                </div>
          </div>
          
      </div>
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
      <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填
          <p class='bao' style='text-align:center;margin:20px 0'><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div>
  </div>
</template>
<script>
import Vue from 'vue'
import Shade from './shade';
import axios from 'axios';
import axioIn from '../store/axioIn';
import Pagination from './pagination';
import Router from "../router/index";
export default {
    name:'chanpnow',
    components:{Shade,Pagination},
  data:function(){
      return {
      messs:'',
      items:[
          {id:'11',product:'22',version_count:'33',pro_count:'44'},
          {id:'111',product:'222',version_count:'323',pro_count:'424'}
      ],
      itemss:[
          {nume:'11',nan:'22',num:'44'},
          {nume:'111',nan:'222',num:'424'}
      ],
      a1:false,
      aa2:{product:'',version:'',pro_version:''},
      aa1s:[
          {func_name:'',
          cli_version:'',
          func_code:''
          ,func_type:'',
          show:true,
          xuans:true,
          selection:[
              {select_name:'',select_value:'',is_default:false}
              ]
            }
          ],
      a2:'false',
      aa3:[/*{name:'22',a2:false,ac:false},{name:'33',a2:false,ac:false},{name:'11',a2:false,ac:false}*/],
      a3:'true',
      a4:'',
      adis:false,
      itmms:[],
      shad:false,
      ites:[{select_name:'',select_value:''}],
      a5:'',
      adisable:true,
      chs:true,
      page:'',
      popp:'',
      pageIndex:1,
      yin:'',
      xuans:true,
      tip:false,
      shad1:false,
      pro_version:'',
      a6:{},
      search_open:'',
      rowNum: '' 
      }
  },
  created:function(){
      axioIn.get('/api/product/product/')
      .then((res) => {
          this.popp=this.items=res.data.results;
          this.page=res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.search_open=false;
          this.$store.commit('setLoading', false)
          })
      .catch((err)=> {
          console.log(err)
          this.$store.commit('setLoading', false)
       });
      this.$checkCookie();
      this.search_open=false; 
  },
  watch:{
      aa1s:{handler:function(val,oldval){},
      //deep:true
      }
  },
  computed:{
      //add_fun:function(i){this.aa1s[i].selection.push({select_name:'',select_value:''});console.log(2)}
  },
  methods:{
      enter:function(index){// 左侧信息鼠标移上时
          if(this.a5=='查看'){
              this.aa3.map(n=>n.a2=false);
          }
          else{this.aa3.map(n=>n.a2=false);this.aa3[index].a2=true;}
          },
      add:function(){
         /* this.a5='新增';this.chs=true;this.itmms=[];
          this.aa2.product='';
          this.shad=true;this.a1=true;this.adisable=true;this.aa3=[];this.adis=false;
          //this.ites=[{select_name:'',select_value:''}];
          this.aa1s=[{func_name:'',cli_version:'',func_code:'',show:true,func_type:'',selection:[{select_name:'',select_value:'',is_default:false}]}];
          //console.log(this.aa1s[0].show)*/
          Router.push({path:'productnow'})
         },
      // 新增弹窗处的取消
      clo:function(){this.shad=false;this.a1=false;},
      // 左侧信息鼠标移开时
      out:function(){this.aa3.map(n=>n.a2=false);},
      versi:function(index){  // 左侧信息的点击事件
          this.aa3.map(n=>n.ac=false);//console.log(this.aa3[index])
          if(this.aa3[index]!==undefined){
              this.aa3[index].ac=true;}
          else if(this.aa3[0]!=undefined){this.aa3[0].ac=true;}
          else{return}
          let pp=this.aa3.filter((n)=>n.ac==true);
          var pi;
          this.pro_version.filter((n)=>{if(n.pro_version===pp[0].name){pi= n.id}});
          if(pi===undefined){
              this.aa2.version='';
              this.aa1s=[{func_name:'',cli_version:'',func_code:'',func_type:'',show:true,xuans:true,selection:[{select_name:'',select_value:''}] }]}
          else{
          axioIn.get('product/version/'+pi+'/')
          .then((res)=>{
              this.aa1s=res.data.function;
              res.data.function.map(n=>Vue.set(n,'show',false));
              this.aa1s.map((n)=>{
                  if(n.func_type=='单选框'){
                      Vue.set(n,'xuans','true');
                      if(n.selection.length===0){
                          this.$set(n,'selection',[{select_name:'',select_value:'',is_default:false}])
                          }
                      else{this.$set(n,'selection',n.selection)
                          }
                             }else{this.$set(n,'selection',[])}
              })
          })   }
          if(this.a5!=='新增'){
              //console.log(JSON.stringify(this.a6))
              let pp=this.aa3.filter((n)=>n.ac==true);
              let pi=this.a6.version.filter((n)=>{if(n.pro_version===pp[0].name){return n.function}});
              if(pi[0]!==undefined){
                pi[0].function.map(n=>n.show=true);
                this.aa1s=pi[0].function;
                this.aa1s.map((n)=>{
                    if(n.func_type=='单选框'){
                        n.xuans=true;
                    n.selection=n.selection;}
                })
                } 
              }


          //let pp=this.aa3.map((n)=>{if(n.ac==true){return n.name}})
          //this.aa1s=this.a6.version.map((n)=>{if(n.pro_version===pp&&n.function!==[]){return n.function}})
        },
        // 左侧信息的x关闭
      deleteb:function(a,b,c){
          let aa=0;//console.log(a)
          this.aa3.map((n)=>{if(n.id!==undefined)aa=aa+1})
          if(c===undefined){
              let b=confirm('确认删除？');
              if(b==true){this.aa3.splice(a,1);}
              }
          if(c!==undefined&&aa>1){
              let b=confirm('该数据在数据库存在，是否删除？');
              if(b==true){
              this.aa3.splice(a,1);
              axioIn.delete('/api/product/version/'+c).then(res=>alert('删除成功'))}
          }
          if(aa===1&&c!==undefined){alert('只有一个版本不允许删除')}
          /*let b=confirm('确认删除？');
          if(b==true){
              this.aa3.splice(a,1);
              if(this.aa3.length===0){this.adisable=true;}}
              axioIn.delete()/*/
          },
      cha:function(id){
          this.a5='查看';this.aa3=[];
          this.aa2={product:'',version:'',pro_version:''};
          this.aa1s=[{func_name:'',cli_version:'',func_code:'',func_type:'',show:true,xuans:true,selection:[{select_name:'',select_value:'',is_default:false}]}];
          this.shad=true;this.a1=true;this.adisable=true;this.chs=false;this.adis=true;
          axioIn.get('/api/product/product/'+id+'/')
          .then((res)=>{
              //console.log(res);
              this.aa2.product=res.data.product;
              this.a6=res.data;
              this.pro_version=res.data.version;
              //console.log(JSON.stringify(this.a6))
              this.itmms=res.data.version;
              let po=res.data.version.map((n)=>{return n.pro_version})
              for( var i=0;i<po.length;i++){this.aa3.push({name:po[i],a2:false,ac:false})
              }//console.log(JSON.stringify(this.aa3))
              /*this.a6.version.map((n)=>{if(n.ac=true){return n.function}})

              this.aa3[0].ac=true;
              let pp=this.aa3.filter((n)=>n.ac==true);
              let pi=res.data.version.filter((n)=>{if(n.pro_version===pp[0].name){return n.function}});
              if(pi[0]!==undefined){
              pi[0].function.map(n=>n.show=true);
              this.aa1s=pi[0].function;
              this.aa1s.map((n)=>{
                  if(n.func_type=='单选框'){
                      n.xuans=true;
                  n.selection=n.selection;}
              }) }/*/


              });
        },
      dele:function(i){ // 功能名称后的删除
         if(this.a5=='查看'){return}
         else{
          if(confirm('确定删除吗？'))this.aa1s.splice(i,1)}
        },
      bian:function(id){ // 编辑
          /*this.a5='修改';this.aa3=[];this.itmms=[];//console.log(JSON.stringify(this.a6))
          this.aa2={product:'',version:'',pro_version:''};
          this.aa1s=[{func_name:'',cli_version:'',func_code:'',func_type:'',show:true,xuans:true,selection:[{select_name:'',select_value:'',is_default:false}]}];
          this.shad=true;this.a1=true;this.adisable=false;this.chs=true;this.adis=false;
          axioIn.get('/api/product/ref-product/'+id+'/')
          .then((res)=>{
              this.aa2.id=res.data.id;
              this.aa2.product=res.data.product;
              this.a6=res.data;
              this.pro_version=res.data.version;
              let po=res.data.version//.map((n)=>{return n.pro_version});
              //console.log(JSON.stringify(po))
              this.itmms=res.data.version;
              for( var i=0;i<po.length;i++){
                  this.aa3.push({name:po[i].pro_version,a2:false,ac:false,id:po[i].id});
                  //this.itmms.push(po[i])
              }
              })*/
              Router.push({path:'/productnow',query:{id:id}})
        },
      submi:function(){ //弹窗左侧input的keycode:enter事件
          var abc=this.aa3.map( x => x.name);
          this.adisable=false;
          if(abc.indexOf(this.aa2.pro_version)===-1){
              this.aa3.push({name:this.aa2.pro_version,a2:false,ac:false});
              this.aa3.map(n=>n.ac=false)
              if(this.a5==='新增'){
              this.aa3[this.aa3.length-1].ac=true;}
              }
          else{alert('请勿重复添加')}
          this.aa2.pro_version='';
       },
      add_fun:function(i){ //弹窗处添加功能选项的点击事件
          if(this.a5==='查看'){return}
          else if(this.aa1s[i].func_type==='文本框'){return}
          else{
              //console.log(this.aa1s)
          //let aap=[];
          //Object.assign(aap,this.aa1s[i].selection);
          //aap.push({select_name:'',select_value:''})
          //this.$set(this.aa1s[i],'selection',aap)
          this.aa1s[i].selection.push({select_name:'',select_value:'',is_default:false});//console.log(2)
          //console.log(this.aa1s)
          }
        },
      func_ad:function(){ // 弹窗处新增功能的点击事件
          if(this.a5==='查看'){return}
          else{
              this.aa1s.push({func_name:'',cli_version:'',func_code:'',show:true,func_type:'',xuans:true,selection:[{select_name:'',select_value:'',is_default:false}]})
          }
        },
      dele_fun:function(i,aaa){ // 功能选项的删除
          if(this.a5==='查看'){return}
          else{
          if(confirm('确定删除吗？'))aaa.splice(i,1);}
        },
      de_val:function(n,aaa){ // 设置默认
          if(this.a5==='查看'){return}
          else if(this.a5==='修改'&&aaa[n].id!==undefined&&aaa[n].is_default===false){
              axioIn.put('product/selection/'+aaa[n].id+'/modify_default/')
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
      chbao:function(id){ //弹窗处的保存
          let abaa=false;
          if(this.aa3.length===0){alert('版本不能为空');return}
          if(this.aa2.product==''||this.aa2.product==undefined){alert('产品名称不能为空');return}
          //for(let v in this.aa1){
              //if(v=='pro_version'||v=='version'){continue;}
              //else{
                  //if(this.aa1[v]==''){abaa=true;}}
          //}console.log(JSON.stringify(this.aa1))
          this.aa1s.map((n)=>{
              for(let a in n){//console.log(n[a])
                  if(n[a]===""||n[a]===undefined){abaa=true;}
                  if(n.func_type==='单选框'){n.selection.map((v)=>{
                      if((v.select_name==''||v.select_name==undefined)||(v.select_value==''||v.select_value==undefined)){
                         abaa=true;}
                      }
                   )}
                  }
          })
          var ol,o2;
              this.aa3.map((v=>{if(v.ac==true){ol=v.name;o2=v.id}}))
              let pro={};
              pro.product=this.aa2.product;
              pro.version=[];
              pro.version.push({pro_version:ol,function:this.aa1s})
          //console.log(JSON.stringify(this.aa1s))
          if(abaa==true){this.shad1=true;this.tip=true;return}//console.log(abaa)
          if(this.a5=='新增'){
              axioIn.post('/api/product/product/',pro)
              .then((res)=>{
                  this.shad=false;this.a1=false;alert('新增成功')
                  axioIn.get('/api/product/product/')
                    .then((res) => {
                        this.popp=this.items=res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                        //this.search_open=false;
                        })
              })
              .catch(err=>{alert(err.data.company_id)})
              //this.asyncPrint();
          }
          if(this.a5=='修改'){
              pro.version[0].id=o2;
             axioIn.put('/api/product/product/'+id+'/',pro)
              .then((res)=>{
                  this.shad=false;this.a1=false;alert('修改成功')
                  axioIn.get('/api/product/product/')
                    .then((res) => {
                        this.popp=this.items=res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                        //this.search_open=false;
                        })
              })
              .catch(err=>{alert(err.data.company_id)})
          }
       },
      incrementTotal:function(q){
          q=(q===undefined?1:q);
          if(this.search_open===false){
              axioIn.get('/api/product/product/?page='+q)
               .then((res) => {
                this.popp=this.items=res.data.results;
                this.pageIndex=q;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                })
            .catch((err)=> console.log(err));
                }
          else{
              axioIn.get('/api/product/product/?product_name='+this.messs+'&page='+q)
               .then((res) => {
                this.popp=this.items=res.data.results;
                this.pageIndex=q;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                })
            .catch((err)=> console.log(err));
          }
          //this.items = this.popp.slice((q-1)*10,q*10);
          //this.pageIndex=q;
          
       },
      ychang:function(n){ // 引用版本处的select的change事件
          if(n===undefined){return}else{
              axioIn.get('product/version/'+n+'/')
          .then((res)=>{
              this.aa1s=res.data.function;
              res.data.function.map(n=>Vue.set(n,'show','true'));
              this.aa1s.map((n)=>{
                  if(n.func_type=='单选框'){
                      Vue.set(n,'xuans','true');
                      if(n.selection.length===0){
                          this.$set(n,'selection',[{select_name:'',select_value:'',is_default:false}])
                          //n.selection=[{select_name:'',select_value:''}]
                          }
                      else{this.$set(n,'selection',n.selection)
                      //n.selection=Object.assign([],n.selection)
                          //Object.assign(n.selection,n.selection)//n.selection=n.selection;
                          }
                             }else{this.$set(n,'selection',[])}
              })
          }) 
          }
       },
      wenc:function(i){ // 文本形式的select的change事件
          if(this.aa1s[i].func_type==='文本框'){
              this.aa1s[i].xuans=false;this.aa1s[i].selection=[];
          }
          else{this.aa1s[i].xuans=true;//console.log(0)
          this.aa1s[i].selection=[{select_name:'',select_value:'',is_default:false}]
          }
          //this.$set(this.aa1s[i],'selection',"[{select_name:'',select_value:''}]")
          //console.log(this.aa1s[i].selection)
          
       },
      search:function(){ //搜索
          axioIn.get('/api/product/product/?product_name='+this.messs)
            .then((res) => {//console.log(response);
                if(res.data.length==0){alert('未搜到相关信息')}
                 else{
                     this.popp=this.items=res.data.results;
                     this.page=res.data.page_num.total_page;
                     this.rowNum = res.data.page_num.total_count;
                 }
            })
            .catch()
       },
      chon:function(){// 重置
          this.messs='';
       axioIn.get('/api/product/product/')
       .then((res) => {
          this.popp=this.items=res.data.results;
          this.page=res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.search_open=false;
       })
       },
      produi:  function(){return axioIn.post('/api/product/product/',{product:this.aa2.product});},
      versii:  function(a){
          var ol;this.aa3.map((v=>{if(v.ac==true){ol=v.name}}));
          return axioIn.post('/api/product/version/',{pro_version:ol,product:a.data.id,function:[]});},
      versii1:  function(a){
          var ol,o2;this.aa3.map((v=>{if(v.ac==true){ol=v.name;o2=v.id}}));
          return axioIn.put('/api/product/version/'+o2+'/',{pro_version:ol,product:a.data.id,function:[]});},
      functi:  function(c){ 
          this.aa1s.map((n)=>{n.version=c.data.id;
          if(n.selection!==undefined){n.selection}
          n.selection=[]})
          return axioIn.post('/api/product/function/',{functions:this.aa1s}).then((res)=>{this.incrementTotal(this.pageIndex)})},
      produi1:  function(id){return axioIn.put('/api/product/product/'+id+'/',{product:this.aa2.product});},
      /*asyncPrint:async function(value, ms) {
          var a;
          try {
               a=await this.produi();//console.log(a)
              } 
              catch(e) {  this.shad=false;this.a1=false;
              if(e.response.status===400){
              alert('已存在该产品名称');}return
             }
          let c=await this.versii(a);
          let b=await this.functi(c);
          this.shad=false;this.a1=false;alert('新增成功')
       },
      asyncPrint1:async function(id) {
          let a=await this.produi1(id);//console.log(a) 
          let c=await this.versii(a);
          let b=await this.functi(c);
          this.shad=false;this.a1=false;
       },
      asyncPrint2:async function(id) {
          let a=await this.produi1(id);//console.log(a) 
          let c=await this.versii1(a);
          let b=await this.functi(c);
          this.shad=false;this.a1=false;alert('修改成功');
      },*/
      tipp:function(){ // 警告弹窗的确定
          this.shad1=false;this.tip=false;
       },
      open:function(index){ // 功能名称后展开收缩的按钮
          Vue.set(this.aa1s[index],'show',!this.aa1s[index].show)
          //console.log(this.aa1s[index].show)
          //this.aa1s[index].show=!this.aa1s[index].show
       },
      delet:function(id,index){ // 展示信息处的删除
         confirm('确认删除？')?
          axioIn.delete('/api/product/product/'+id+'/')
          .then((res)=>{
              alert('删除成功');
              axioIn.get('/api/product/product/')
                .then((res) => {
                    this.popp=this.items=res.data.results;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    //this.search_open=false;
                    })
              }):0;
          
       },
    upload:function(){
        let input = this.$refs.upload;
        let data = new FormData();
        var oll;
        this.aa3.map((v=>{if(v.ac==true){oll=v.name;}}))
        if(oll===undefined||this.aa2.product===''){alert('产品名称必填，版本必选');return}
        data.append('file',input.files[0]);
        axioIn.post('/api/product/function-selection-import/?product='+this.aa2.product+'&version='+oll,data,{headers: {'Content-Type': 'application/vnd.ms-excel'}})
        .then((res)=>{
            this.clo();alert('导入成功')
            axioIn.get('/api/product/product/')
      .then((res) => {
          this.popp=this.items=res.data.results;
          this.page=res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.search_open=false;
          })
        }).catch((err)=>{alert(err.data.company_id)})
    
    },
  }
}
</script>
<style lang='scss' scoped>
.chanpnow{width: 100%;
.c0{margin-left:22px;width:160px;}
    .c1{width:300px;}
    .c2{width:280px;}
    .c3{width:200px;}
    .c4{width:200px;}
    .cha{background:url(../assets/cha1.png) no-repeat center;margin-right:15px;}
.bian{background:url(../assets/bian1.png) no-repeat center;}
.dele{background:url(../assets/dele.png) no-repeat center}
.chana{width:840px;height:630px;border:1px solid gray;position:absolute;top:15%;left:25%;z-index:11;background-color:white;}
.afb{margin:10px;
    i{background:url(../assets/close.png) no-repeat;}}
    .afcc{text-align:left;
        label{width:110px;text-align:right;display:inline-block;margin-right:20px;}
        input{width:600px;height:32px;padding:0 10px;border-radius:5px;margin:10px;outline:none;border:1px solid gray;}
    }
    .center{width:840px;height:281px;border-top:1px solid #d9d9d9;
    .afleft{width:299px;height:525px;float:left;border-right:1px solid #d9d9d9;
        input{width:250px;height:32px;margin-left:24px;border-radius:5px;margin:10px;outline:none;border:1px solid gray;padding-left:10px;}
        li{height:32px;width:100%;
        a{width:260px;float:left;text-align:center;height:32px;line-height:32px;}
        i{width:39px;height:32px;display:inline-block;background:url(../assets/close.png) no-repeat center;}}
        li:hover{background-color:#eaf8fe;}
    }
    .afright{width:540px;height:525px;float:left;overflow-y:scroll;
    
    }
    }
    .dele{background:url(../assets/dele.png) no-repeat 5px 5px;margin-left:10px;}
    .open{background:url(../assets/tan.png) no-repeat 5px 8px;margin-left:0px;}
    .rela{width:450px;
        margin:10px 10px 10px 0;
        font-size: 0;
        label{width:70px;text-align:right;display:inline-block;margin-right:10px;font-size:14px;}
        input[type=text],select{width:320px;height:32px;border-radius:5px;border:1px solid gray;padding-left:10px;}
        option{padding:6px;}
    }
    .def{background-color:#f9f9f9;margin:0!important;padding:5px 0;}
    .active{background-color:#eaf8fe;}
    .colo{color:gray}
    .colo{color:#0386f0;}
    .funname{
        width:510px;text-align:left;border:1px solid #d9d9d9;margin-left:9px;border-radius:5px;color:#666;
        p{margin:10px;
        label{width:70px;text-align:right;display:inline-block;margin-right:10px;font-size:14px;}
        input[type=text],select{width:320px;height:32px;border-radius:5px;border:1px solid gray;padding-left:10px;}
        option{padding:6px;}
        span{margin:10px 0px 10px 10px;padding-right:15px;cursor:pointer;}
        }
        input[type=radio]{margin:10px 20px;}
    }
    .leading_in{position: absolute;width:74px;height:33px;top:4px;left:91px;z-index: 3;opacity: 0.8;cursor: pointer;opacity: 0;}
    .ji{height: 60px;line-height: 60px;margin: 0 0 15px;background: #ffffff;border-radius: 6px;
    input{margin-right: calc(100% - 550px)}
    }
}
</style>


