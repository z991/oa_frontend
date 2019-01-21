<template>
    <div class="chanpz" >
        <!-- <p class="qu">产品管理 > 运维配置>服务组</p> -->
        <p class="ji"><label for="">服务组名称</label><input type="text" v-model="mess"  @keyup.enter="search">
          <a href="javascript:void(0)" class="so" @click='search()'>搜索</a><a href="javascript:void(0)" class="cho" @click='chon()'>重置</a></p>
        <p class="xinz"><a href="javascript:void(0)"  class="so" @click='add()'>新增</a></p>
        <!-- <p class="cp">
          <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
          <a href="javascript:void(0)" class="wid4">服务分类</a>          
          <a href="javascript:void(0)" class="wid4">服务组名称</a>
          <a href="javascript:void(0)" class="wid4">操作</a>
      </p> -->
      <ul class="it">
          <oaTablePages @onPageChange="onPageChangeBind" :loading="tableLoading" :list="b2" :columns="columns" :operates="operates" :pagination="pagination"/>
          <!-- <li v-for="item in b2" :key='item.id'>
              <span class="wid_1 wid4">{{item.index}}</span>
              <span class="wid4">{{item.version_name}}</span>
              <span class="wid4">{{item.group_name}}</span>
              <span class="wid4">
                   <a href="javascript:void(0)" class="bian" @click="bian(item.id,item.version_type)"><i class="el-icon-edit"></i></a>
                    <a href="javascript:void(0)" class="delete" @click='delet(item.id,index)'><i class="el-icon-delete"></i></a> -->
                  <!-- <a href="javascript:void(0)" class="bian" @click='bian(item.id,item.version_type)'></a>
                  <a href="javascript:void(0)" class="dele" @click='delet(item.id,index)'></a> -->
                  <!-- </span> -->
                  <!--<a href="javascript:void(0)" class="cha" @click='cha(item.id)'></a>-->
          <!-- </li> -->
      </ul>
      <div class="fzu" v-show='zusho'>
          <p class='afb'><span>{{b3}}</span><i @click='close()'></i></p>
          <p>
              <label for="">服务分类</label>
              <select name="" id="" :disabled = 'serviceSort' v-model="versionsId" @change="serviceClassify">
                <option value="">请选择</option>
                <option :value="item.id"  v-for="item in versions" :key="item.id">{{item.name}}</option>
                <!-- <option value="1">经典版</option> -->
              </select><em class='ii'>*</em>
          </p>
          <p><label for="">{{zum}}</label><input type="text" v-bind:disabled='adisabl' v-model="b4.group_name" maxlength="60"><em class='ii'>*</em></p>
          <p v-show='yin'><label for="">已有服务组引用</label>
               <select v-bind:disabled='adisabl' v-model='b4.ser_rel' @change='gai(b4.ser_rel)'>
                    <option v-for='it in ite4' :key="it.id" :value="it.id">{{it.group_name}}</option>
               </select></p>
          <p class='type'><span>服务类型</span><span style='margin:0 30px;'>服务ID</span><span>服务地址</span><!--span>版本号</span--></p>
          <p v-for='(ser,index) in servers' :key="index">
              <label for="" class='lab'>{{ser.ser_type}}{{ser.ser_name}}</label><!--//@change='ser_change(index,ser.ser_id)'-->
              <select name="" id="" style='width:160px;margin:0 30px;' v-bind:disabled='adisabl' v-model='ser.ser_id' @change='ser_change(index)'>
                  <option :value="item" v-for='item in ser.items' :key='item.id'>{{item}}</option>
              </select>
              <select name="" id="" style='width:160px;' v-bind:disabled='adisabl' v-model='ser.ser_url'>
                  <option v-for='it in ser.ite' :key='it.id' :value="it.id" >{{it.ser_address}}</option>
              </select>
              <!--input type="text" class='duan' v-bind:disabled='adisable' :value="ser.ser_url"-->
              <!--span style='margin-left:25px;'>{{ser.ser_version}}</span-->
          </p>
          <p class='bao' style='text-align:right' v-show='bao'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='baoo(b4.id)'>保存</a></p>
      </div>
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <!-- <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination> -->
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
import axioIn from '../store/axioIn'
import Pagination from './pagination';
import Router from "../router/index";
import oaTablePages from './oaTablePages/index';
//axioIn.defaults.headers.post['content-type'] = 'application/json';
axios.defaults.withCredentials=true;//配置cookie
export default {
    name:'chanpz',
    components:{Shade,Pagination,oaTablePages},
    /*mounted:function(){
      axioIn.get('/product/group/')
      .then((res) => {this.b2 = res.data;
      })
      .catch((err)=> console.log(err));
    },*/
    data:function(){
        return {
           mess:'',
           b3:'新增',
           zusho:false,
           b2:[{id:'22',ser_id:'33'}],
           shad:false,
           yin:true,
           adisable:false,
           adisabl:false,
           zum:'',
           bao:'',
           ite4:'',
           servers:[{ser_type:'',ser_id:'',ser_rel:'',ser_url:'44',ser_version:'',items:[],ite:[]}],
           b4:{group_name:'1',ser_rel:''},
           bser:'',
           page:'',
           popp:'',
           pageIndex:1,
           shad1:false,
           tip:false,
           ttp:[],
           search_open:'',
           rowNum: '',
           serviceSort: false,
           versions: [],
           versionsId: '',
           verObj: {},

           tableLoading:true,
            operates: { 
                width: 200,
                fixed: 'right',
                list: [
                    {
                        icon: 'el-icon-edit',
                        plain: true,
                        title:'编辑',
                        showFlag:true,
                        borderFLag:false,
                        disabled: false,
                        method: (row, index) => {
                            this.bian(row.id, row.version_type)
                        }
                    },
                    // {
                    //     icon: 'el-icon-search',
                    //     plain: true,
                    //     title:'查看',
                    //     showFlag:true,
                    //     borderFLag:false,
                    //     disabled: false,
                    //     method: (row, index) => {
                    //         this.cha(row.id, row.version_type)
                    //     }
                    // },
                    {
                        title:'删除',
                        icon:"el-icon-delete",
                        plain: false,
                        showFlag:true,
                        borderFLag:false,
                        method: (row, index) => {

                            this.delet(row.id, index)
                        }
                    }
                ]
            }, // 操作按钮组
            pagination: {
                show: true,
                total: 0,
                pageIndex: 1,
                pageSize: 10
            }, // 分页参数
            columns: [
                { prop: "index", label: "序号" },
                { prop: "version_name", label: "服务分类" },
                { prop: "group_name", label: "服务组名称", },
            ],
        }
    },
    created:function(){
        this.$checkCookie();
        axioIn.get('/api/product/version_type/')
        .then((res)=>{
            this.versions= res.data
            this.versions.map(n=>{this.verObj[n.id] = n.name})
        })
        axioIn.get('/api/product/sertype/').then((res)=>{this.bser=res.data;})   
        // axioIn.get('/api/product/group').then((res) => {
        //     this.popp=this.b2=res.data.results; //b2是页面展示的数据
        //     this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
        //     this.page=res.data.page_num.total_page;
        //     this.rowNum = res.data.page_num.total_count;
        //     this.search_open=false;
        // })
          axioIn.get('/api/product/group/forgrid/')
          .then((res=>{
              this.ite4=res.data;// ite4已有服务组的引用
          }))
        .catch((err)=> alert(err.data.error));
        //TODO: 重构版的?vertion_type=2
        axioIn.get('/api/product/sertype/forgroup/')//获取服务类型，id，地址
            .then((res)=>{
                this.servers=res.data;
                this.ttp=res.data;
                this.servers.map((n)=>{
                     n.items=n.server.map(v=>v.ser_id);
                     /*let a=n.server.map(v=>
                         v.ser_url.map(n=>n.ser_address)  
                     )
                     let aaa=a.join(',').split(',');console.log(aaa)
                     for(let i=0;i<aaa.length;i++){//数组去空
                         if(aaa[i]===''||aaa[i]===undefined){
                             aaa.splice(i,1);
                             i=i-1;
                         }
                     }
                     n.ite=aaa;*/
                })
            })
    },
    mounted:function(){
      this.pageIndex = this.$route.query.page || 1;var searchMess = this.$route.query.search;
    //   if(b === '' || b === undefined){this.search_result = false}else{this.search_result = true}
      this.haveSearch(this.pageIndex,searchMess)
    //   this.refesh(a,this.search_result);
    },
    methods:{
        serviceClassify: function(){
            this.servers.map(n=>{n.ser_id='';n.ser_url=''});//将输入框内容置空
            this.b4.group_name='';this.b4.ser_rel='';
            axioIn.get('/api/product/group/forgrid/',{params:{
              version_type: this.versionsId
            }}).then((res=>{
                this.ite4=res.data;// ite4已有服务组的引用
            })).catch((err)=> console.log(err));
            axioIn.get('/api/product/sertype/forgroup/?version_type='+this.versionsId)//获取服务类型，id，地址
            .then((res)=>{
                this.servers=res.data;
                this.ttp=res.data;
                this.servers.map((n)=>{
                     n.items=n.server.map(v=>v.ser_id);
                })
            })
        },
        add:function(){
            Router.push({ path: "/productService"});return
            // this.serviceSort = false;this.zusho=true;this.shad=true;this.adisable=true;this.adisabl=false;this.yin=true;this.zum='服务组名称';this.bao=true;this.b3='新增'
            // this.servers.map(n=>{this.b4.group_name='';this.b4.ser_rel='';n.ser_id='';n.ser_url=''});//将输入框内容置空
            // this.b4.group_name='';this.b4.ser_rel='';
            // this.versionsId = ''
        },
        ser_change:function(index){// 服务ID的change事件
            if(index===undefined){return}
            else{
                let aa=this.servers[index].server.filter((aap)=>aap.ser_id===this.servers[index].ser_id)
                 if(aa.length!==0){
                 let bb=aa[0].ser_url.map(n=>n.ser_address)
                 this.$set(this.servers[index],'ite',aa[0].ser_url);
                 if(aa[0].ser_version!==undefined){
                 this.$set(this.servers[index],'ser_version',aa[0].ser_version)}   }
            }
            },
        gai:function(id){
            this.b4.group_name='';
            if(id===undefined){return}
            else{
            this.servers.map(n=>{this.b4.group_name='';n.ser_id='';n.ser_url=''});
            axioIn.get('/api/product/group/'+id+'/?version_type='+this.versionsId)//填充获取的数据
            .then((res)=>{
                this.b4.id=res.data.id;
                this.b4.group_name=res.data.group_name;
                if(res.data.ser_address.length!==0){//console.log(33)
                    res.data.ser_address.map((n,index)=>{
                        this.servers.filter(v1=>{
                        if(v1.ser_type===n.ser_type){
                            v1.server.filter(v2=>
                            {if(v2.ser_id===n.server){
                                    let cc=v2.ser_url.map(c=>c.ser_address);
                                    this.$set(v1,'ite',v2.ser_url);
                                    //this.$set(v1,'ser_version',v2.ser_version)
                                }
                            });
                        }
                        })
                    })  
                
                this.servers.map((n,index)=>{
                    let aa=res.data.ser_address.filter(v=>v.ser_type===n.ser_type)
                    //console.log(aa);
                    if(aa.length!==0){
                    this.$set(this.servers[index],'ser_id',aa[0].server)
                    this.$set(this.servers[index],'ser_url',aa[0].id)
                    this.$set(this.servers[index],'ser_version',aa[0].ser_version) }
                    //console.log(n.ser_url);
                })   }
                })
           }
        },
        close:function(){
            this.zusho=false;this.shad=false;
        },
        bian: async function(id,type){
            Router.push({ path: "/productService",query: {id:id,type: type,page: this.pageIndex,search: this.mess}});return
            await axioIn.get('/api/product/group/forgrid/',{params:{
              version_type: type
            }}).then((res=>{
                this.ite4=res.data;// ite4已有服务组的引用
            })).catch((err)=> console.log(err));
            await axioIn.get('/api/product/sertype/forgroup/?version_type='+type)//获取服务类型，id，地址
            .then((res)=>{
                this.servers=res.data;
                this.ttp=res.data;
                this.servers.map((n)=>{
                     n.items=n.server.map(v=>v.ser_id);
                })
            })
            this.versionsId = type
            this.serviceSort = true;this.zusho=true;this.shad=true;this.adisable=false;this.adisabl=false;this.b3='修改';this.yin=false;this.zum='服务组名称';this.bao=true;
            this.servers.map(n=>{this.b4.group_name='';n.ser_id='';n.ser_url='';n.ser_version=''});//将输入框内容置空
            axioIn.get('/api/product/group/'+id+'/')//填充获取的数据
            .then((res)=>{
                this.b4.id=res.data.id;
                this.b4.group_name=res.data.group_name;
                if(res.data.ser_address.length!==0){//console.log(33)
                    res.data.ser_address.map((n,index)=>{
                        this.servers.filter(v1=>{
                            if(v1.ser_type===n.ser_type){
                                v1.server.filter(v2=>{
                                    if(v2.ser_id===n.server){
                                        let cc=v2.ser_url.map(c=>c.ser_address);
                                        this.$set(v1,'ite',v2.ser_url);
                                        //this.$set(v1,'ser_version',v2.ser_version)
                                    }
                                });
                            }
                        })
                    })  
                
                    this.servers.map((n,index)=>{
                        let aa=res.data.ser_address.filter(v=>v.ser_type===n.ser_type)
                        //console.log(aa);
                        if(aa.length!==0){
                        this.$set(this.servers[index],'ser_id',aa[0].server)
                        this.$set(this.servers[index],'ser_url',aa[0].id)
                        this.$set(this.servers[index],'ser_version',aa[0].ser_version) }
                        //console.log(n.ser_url);
                    })   
                }
            })
        },
        cha:function(id){
            this.serviceSort = true;this.zusho=true;this.shad=true;this.adisable=true;this.adisabl=true;this.b3='查看';this.yin=false;this.zum='服务组名称';this.bao=false;
            this.servers.map(n=>{this.b4.group_name='';n.ser_id='';n.ser_url='';n.ser_version=''});//将输入框内容置空
            axioIn.get('/api/product/group/'+id+'/')//填充获取的数据
            .then((res)=>{
                this.versionsId = res.data.version_type
                this.b4.group_name=res.data.group_name;
                if(res.data.ser_address.length!==0){
                    res.data.ser_address.map((n,index)=>{
                        this.servers.filter(v1=>{
                        if(v1.ser_type===n.ser_type){
                            v1.server.filter(v2=>
                            {if(v2.ser_id===n.server){
                                    let cc=v2.ser_url.map(c=>c.ser_address);
                                    this.$set(v1,'ite',v2.ser_url)
                                }
                            });
                        }
                        })
                    })
                    this.servers.map((n,index)=>{
                        let aa=res.data.ser_address.filter(v=>v.ser_type===n.ser_type)
                        if(aa.length!==0){//console.log(JSON.stringify(aa))
                        this.$set(this.servers[index],'ser_id',aa[0].server)
                        this.$set(this.servers[index],'ser_url',aa[0].id)  
                        this.$set(this.servers[index],'ser_version',aa[0].ser_version)}
                    })
                }
                    })
        },
        search:function(){
            axioIn.get('/api/product/group/?group_name='+this.mess)
            .then((res) => {//console.log(response);
                if(res.data.length==0){alert('未搜到相关信息')}
                 else{
                    this.ite4=res.data.results;
                    this.popp=this.b2=res.data.results;
                    this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})                    
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.search_open=true;
                 }
            })
            .catch(err=>{alert(err.data.error)})
        },
        chon:function(){
            this.mess='';
            axioIn.get('/api/product/group/')
            .then((res) => {
                this.ite4=res.data.results;
                this.popp=this.b2=res.data.results;
                this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.search_open=false;
                this.pageIndex=1;
            })
            .catch((err)=> alert(err.data.error));
        },
        baoo:function(id){
            var appi=false;
            // var classify = this.versionsId == undefined || this.versionsId == ''
            if(this.b4.group_name==undefined||this.b4.group_name==''){
                appi=true;
            }else if(this.versionsId == undefined || this.versionsId == ''){
                appi=true;
            }
            //this.servers.map(v=>{
                //if(v.ser_id===undefined||v.ser_id===''||v.ser_url===undefined||v.ser_url===''){appi=true}
            //})
            if(appi===true){this.tip=true;this.shad1=true;}
            else{
                let aia=[];
                let abi=this.servers.map(v=>{
                    if(v.ser_url!==''){aia.push({id:v.ser_url})}
                });
                this.b4.addr_list=aia;
                this.b4.ser_address=[];//console.log(JSON.stringify(aia)) 
                if(this.b3==='新增'){//console.log(JSON.stringify(this.b4)) 
                    this.b4.version_type = this.versionsId
                    axioIn.post('/api/product/group/',JSON.stringify(this.b4),{headers:{'Content-Type':'application/json'}})
                   //axioIn({method:'post',url:'/api/product/group/',headers:{'X-Requested-With': 'XMLHttpRequest'},data:JSON.stringify(this.b4)})
                    .then((res)=>{
                        alert('增加成功');
                        this.zusho=false;this.shad=false;
                        axioIn.get('/api/product/group/')
                        .then((res) => {
                            this.ite4=res.data.results;
                            this.popp=this.b2=res.data.results;
                            this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})                            
                            this.page=res.data.page_num.total_page;
                            this.rowNum = res.data.page_num.total_count;
                            this.search_open=false;
                        })
                        .catch((err)=> {console.log(err)});
                    })
                    .catch((err)=> {this.zusho=false;this.shad=false;console.log(err)});     
                }
                if(this.b3==='修改'){
                //console.log(JSON.stringify(this.b4))  
                    this.b4.version_type = this.versionsId
                    axioIn.put('/api/product/group/'+id+'/',JSON.stringify(this.b4),{headers:{'Content-Type':'application/json'}})
                    .then((res)=>{
                        alert('修改成功');
                        this.zusho=false;this.shad=false;
                        if(this.search_open===false){
                            axioIn.get('/api/product/group/?page='+this.pageIndex)
                            .then((res) => {
                                this.ite4=res.data.results;
                                this.popp=this.b2=res.data.results;
                                this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
                                this.page=res.data.page_num.total_page;
                                this.rowNum = res.data.page_num.total_count;
                                this.message1=false;
                            })
                            .catch((err)=> {console.log(err)});
                        }else{
                            axioIn.get('/api/product/group?group_name='+this.mess+'&page=1')
                            .then((res) => {
                                this.ite4=res.data.results;
                                this.popp=this.b2=res.data.results;
                                this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
                                this.page=res.data.page_num.total_page;
                                this.rowNum = res.data.page_num.total_count;
                                this.message1=false;
                            })
                            .catch((err)=> console.log(err));
                        }
                    })
                    .catch((err)=> {this.zusho=false;this.shad=false;console.log(err)});
                }
            }
        },
        haveSearch (pageNum, search) {
            pageNum === undefined?pageNum = 1:pageNum;
            if(search===''||search===undefined){
                axioIn.get('/api/product/group/?page='+pageNum)
                .then((res) => {
                    this.ite4=res.data.results;
                    this.popp=this.b2=res.data.results;
                    this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.message1=false;
                    this.search_open=false;
                    // this.$store.commit('setLoading', false)
                     this.pagination.total = 0;
                    if (res.data.page_num){
                        this.pagination.total = res.data.page_num.total_count;
                    }
                    this.tableLoading = false;
                })
                .catch((err)=> {
                    alert(err.data.error)
                    // this.$store.commit('setLoading', false)
                });
            }else{
                this.mess = search
                axioIn.get('/api/product/group?group_name='+search+'&page='+pageNum)
                .then((res) => {
                    this.ite4=res.data.results;
                    this.popp=this.b2=res.data.results;
                    this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.message1=false;
                    this.search_open=true;
                    this.pagination.total = 0;
                    if (res.data.page_num){
                        this.pagination.total = res.data.page_num.total_count;
                    }
                    this.tableLoading = false;
                })
                .catch((err)=> console.log(err));
            }
        },
        onPageChangeBind(current){
            this.incrementTotal(current);
        },
        incrementTotal:function(q){
            q=(q===undefined?1:q);
            this.tableLoading = true;
             if(this.search_open===false){
                 axioIn.get('/api/product/group/?page='+q)
                .then((res) => {
                    this.ite4=res.data.results;
                    this.popp=this.b2=res.data.results;
                    this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.message1=false;this.pageIndex=q;
                    this.pagination.total = 0;
                    if (res.data.page_num){
                        this.pagination.total = res.data.page_num.total_count;
                    }
                    this.tableLoading = false;
                        })
                .catch((err)=> console.log(err));
             }
             else{
                 axioIn.get('/api/product/group?group_name='+this.mess)
                .then((res) => {
                    this.ite4=res.data.results;
                    this.popp=this.b2=res.data.results;
                    this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.message1=false;this.pageIndex=q;
                    this.pagination.total = 0;
                    if (res.data.page_num){
                        this.pagination.total = res.data.page_num.total_count;
                    }
                    this.tableLoading = false;
                })
                .catch((err)=> console.log(err));
                    }
            //this.b2 = this.popp.slice((q-1)*10,q*10);
            //this.pageIndex=q;
            //this.message1=false;
      },
      tipp:function(){
          this.shad1=false;this.tip=false;
      },
      delet:function(id,index){
         confirm('确认删除？')?
          axioIn.delete('/api/product/group/'+id+'/')
          .then((res)=>{alert('删除成功');this.incrementTotal(this.pageIndex)}):0;
          
       },
        
    },
    watch:{
      'b2'(res){
          if(res.length){
              this.tableLoading = false;
          }
          console.log(res);
      }
    }
  
}
</script>
<style lang='scss' scoped>
@import '../assets/home';
.chanpz{width: 100%;
    position: relative;
    height: calc(100% - 70px);
    .it {
        margin-bottom: 15px;
        border-radius: 0 0 5px 5px;
    }
    .c2{width:200px;}
    // .c1{width:320px;}
    // .cha{background:url(../assets/cha1.png) no-repeat center;}
    .bian{
        // background:url(../assets/bian1.png) no-repeat center;
        margin-right:10px;}
    .dele{background:url(../assets/dele.png) no-repeat center;margin-left:10px;}
    .fzu{
        width:550px;
        position:absolute;
        top:0;
        left:15%;
        height: 100%;
        overflow-y: scroll;
        z-index:15;
        border:1px solid gray;
        background-color:white;
    i{background:url(../assets/close.png) no-repeat;}
    p{margin:20px;text-align:left;font-size: 0;
    .duan{width:120px;margin-left:20px;}
    label{width:120px;text-align:right;margin-right:10px;display:inline-block;font-size:14px;}
    input,select{width:350px;height:32px;padding-left:10px;border-radius:5px;border:1px solid gray;box-sizing: border-box;}
    }
    option{padding:5px;}
    .lab{width:80px;}
    .type{background-color:gray;height:34px;line-height:34px;margin:20px 0px;
    span{display:inline-block;width:150px;margin-left:20px;}}
    }
    .ji{height: 60px;line-height: 60px;margin: 0 0 15px;background: #ffffff;border-radius: 6px;
      input{margin-right: calc(100% - 550px)}
    }
    .wid4 a:link {color: #666666;}
    .wid4 a:visited {color: #666666;}
    .wid4 a:hover{color: #666666;}
    .wid4 a:active {color: #666666;} 
}
</style>
<style>
    .el-pager .number {
        padding: 0;
    }
    .chanpj .it li {
        padding: 0;
        border: none;
    }
</style>


