/*
 * @Author: liuqian 
 * @Date: 2018-01-08 18:34:39 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-11-07 11:23:33
 */
<template>
  <div class="productService">
      <!-- <div class="groupTitle"><span class="titleDefault">产品管理</span><span class="titleCarry">></span><span>运维配置</span><span>></span><span>服务组</span><span>></span><span>{{b3}}</span></div> -->
      <div class="fzu">
          <!-- <p class='afb'><span>{{b3}}</span><i @click='close()'></i></p> -->
          <div class="groupContent">
            <p>
                <label for="">服务分类</label>
                <select name="" id="" :disabled = 'serviceSort' v-model="versionsId" @change="serviceClassify">
                    <option value="">请选择</option>
                    <!-- <option :value="item.id"  v-for="item in versions" :key="item.id">{{item.name}}</option> -->
                    <option value="1">经典版</option>
                </select><em class='ii'>*</em>
            </p><!--{{zum}}-->
            <p><label for="">服务组名称</label><input type="text" v-bind:disabled='adisabl' v-model="b4.group_name" maxlength="60"><em class='ii'>*</em></p>
            <p v-show='yin'><label for="">已有服务组引用</label>
                <select v-bind:disabled='adisabl' v-model='b4.ser_rel' @change='gai(b4.ser_rel)'>
                        <option v-for='it in ite4' :key="it.id" :value="it.id">{{it.group_name}}</option>
                </select><em class='ii'>*</em></p>
            <p class='type'><span>服务类型</span><span style='margin:0 30px;'>服务ID</span><span>服务地址</span><!--span>版本号</span--></p>
            <div class="serList" style="margin-left:150px;" v-for='(ser,index) in servers' :key="index">
                <label for="" class='lab'>{{ser.ser_type}}{{ser.ser_name}}</label><!--//@change='ser_change(index,ser.ser_id)'-->
                <select name="" id="" class="serviceId" v-bind:disabled='adisabl' v-model='ser.ser_id' @change='ser_change(index)'>
                    <option :value="item" v-for='item in ser.items' :key='item.id'>{{item}}</option>
                </select>
                <!-- <select name="" id="" style='width:160px;' v-bind:disabled='adisabl' v-model='ser.ser_url'>
                    <option v-for='it in ser.ite' :key='it.id' :value="it.id" >{{it.ser_address}}</option>
                </select>  :value='ser.ser_url'-->
                <input type="text" class="service_show"  v-bind:disabled='adisabl' readonly="readonly" v-model="ser.ser_url" @click="addressShow(ser)" /><em class="icon"></em>
                <div class="serviceAddress" v-show="ser.show" @mouseleave="addressHide(ser)">
                    <div class="search"><input type="text"  @keyup.enter="search_address(ser)" v-model="definiteSear" /><img style="margin-left:-30px;" src="../assets/cha1.png" alt="" @click="search_address(ser)"></div>
                    <div class="choose">请选择</div>
                    <ul v-show="allList">
                        <li v-for='(it,index) in ser.ite' v-if="showList(index)" :key='it.id' @click="chooseAdd(ser,it)">{{it.ser_address}}</li>
                    </ul>
                    <ul v-show="searchList">
                        <li v-for='(it,index) in count_search' v-if="showList(index)" :key='it.id' @click="chooseAdd(ser,it)">{{it.ser_address}}</li>
                    </ul>
                    <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>                    
                </div>
                <!--input type="text" class='duan' v-bind:disabled='adisable' :value="ser.ser_url"-->
                <!--span style='margin-left:25px;'>{{ser.ser_version}}</span-->
            </div>
          </div>
          <p class='bao' v-show='bao'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='baoo(b4.id)'>保存</a></p>     
      </div>
      <shade v-show='shad'></shade>
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
import Pagination from './pageDevice';
import Router from "../router/index";
export default {
  name: 'productService',
  components:{Shade,Pagination},
  data () {
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
           bao:'true',
           ite4:'',
           servers:[{ser_type:'',ser_id:'',ser_rel:'',ser_url:'44',ser_sub:'',ser_version:'',items:[],ite:[]}],
           b4:{group_name:'1',ser_rel:''},
           bser:'',
           page:'',
           popp:'',
           pageIndex:1,//当前页
           shad1:false,
           tip:false,
           ttp:[],
           search_open:'',
           rowNum: '',
           serviceSort: false,
           versions: [],
           versionsId: '',
           verObj: {},
           searchTerm: '',
           pageCount: 1,
           quantity: 10,
           allData: [],
           definiteSear: '',
           searchList: false,
           allList: true,
           count_search: []
      }
  },
  created () {
      axioIn.get('/api/product/version_type/')
        .then((res)=>{
            this.versions= res.data
            this.versions.map(n=>{this.verObj[n.id] = n.name})
      })
      axioIn.get('/api/product/group/forgrid/')
          .then((res=>{
              this.ite4=res.data;// ite4已有服务组的引用
          }))
        .catch((err)=> console.log(err));
        //TODO: 重构版的?vertion_type=2
        axioIn.get('/api/product/sertype/forgroup/')//获取服务类型，id，地址
            .then((res)=>{
                this.servers=res.data;
                this.servers.map(n=>{
                    this.$set(n,'show',false)
                })
                this.ttp=res.data;
                this.servers.map((n)=>{
                     n.items=n.server.map(v=>v.ser_id);
                })
            })
      this.pretreatment()
  },
  methods: {
      search_address (ser) {
          if(this.definiteSear === '' || this.definiteSear === undefined){
              alert('请输入搜索内容')
          }else{
              this.count_search = []
              ser.ite.map((n,index)=>{
                  if(n.ser_address.indexOf(this.definiteSear)>=0){
                      this.pageIndex = 1;
                      this.count_search.push(ser.ite[index])
                  }
              })
              if(this.count_search.length !== 0){
                  this.searchList = true;this.allList = false;
                  if(this.count_search.length%this.quantity){
                    this.page = parseInt(this.count_search.length/this.quantity)+1
                  }else{
                    this.page = parseInt(this.count_search.length/this.quantity)
                  }
              }else{
                  alert('没有找到')
              }
          }
      },
      addressHide (ser) {
          ser.show = false
          this.searchList = false;this.allList = true;
          this.count_search = [];this.definiteSear = ''
      },
      chooseAdd (ser,it) {
          ser.ser_url = it.ser_address
          ser.ser_sub = it.id
          ser.show = false
          this.searchList = false;this.allList = true;
          this.count_search = [];this.definiteSear = ''
      },
      showList (index) {
          let num = this.pageIndex
          return index >= this.quantity*(num-1) && index<this.quantity*num
      },
      addressShow (ser) {
          this.servers.map(i=>{i.show = false});this.definiteSear = '';
          this.searchList = false;this.allList = true;this.count_search = [];
          if(ser.ite === undefined)return
          this.alldata = ser.ite
          if(ser.ite.length%this.quantity){
              this.page = parseInt(ser.ite.length/this.quantity)+1
          }else{
              this.page = parseInt(ser.ite.length/this.quantity)
          }
          ser.show = true
      },
      pretreatment: async function (){
        this.pageCount = this.$route.query.page;this.searchTerm = this.$route.query.search;
        if(this.$route.query.id===undefined){
            this.serviceSort = false;this.adisabl=false;this.b3='新增'
            this.yin=true;this.bao=true;
            this.servers.map(n=>{this.b4.group_name='';this.b4.ser_rel='';n.ser_id='';n.ser_url='';n.ser_sub='';n.show=false;});//将输入框内容置空
            this.b4.group_name='';this.b4.ser_rel='';this.versionsId = ''
        }else{
            let id = this.$route.query.id;
            this.versionsId = this.$route.query.type;
            this.b3 = '修改';this.serviceSort = true;this.adisabl=false;this.yin=false;this.bao=true;
            await axioIn.get('/api/product/group/forgrid/',{params:{
              version_type: this.versionsId
            }}).then((res=>{
                this.ite4=res.data;// ite4已有服务组的引用
            })).catch((err)=> console.log(err));
            await axioIn.get('/api/product/sertype/forgroup/?version_type='+this.versionsId)//获取服务类型，id，地址
            .then((res)=>{
                this.servers=res.data;
                this.servers.map(n=>{
                    this.$set(n,'show',false)
                })
                this.ttp=res.data;
                this.servers.map((n)=>{
                     n.items=n.server.map(v=>v.ser_id);
                })
            })
            // this.versionsId = type
            this.servers.map(n=>{this.b4.group_name='';n.ser_id='';n.ser_url='';n.ser_sub='';n.ser_version=''});//将输入框内容置空
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
                        this.$set(this.servers[index],'ser_url',aa[0].ser_address)
                        this.$set(this.servers[index],'ser_sub',aa[0].id)
                        this.$set(this.servers[index],'ser_version',aa[0].ser_version) }
                        //console.log(n.ser_url);
                    })
                }
            })
        }
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
            if(appi===true){this.tip=true;this.shad=true;}
            else{
                let aia=[];
                let abi=this.servers.map(v=>{
                    if(v.ser_sub!==''){aia.push({id:v.ser_sub})}
                });
                this.b4.addr_list=aia;
                this.b4.ser_address=[];//console.log(JSON.stringify(aia)) 
                if(this.b3==='新增'){//console.log(JSON.stringify(this.b4)) 
                    this.b4.version_type = this.versionsId
                    axioIn.post('/api/product/group/',JSON.stringify(this.b4),{headers:{'Content-Type':'application/json'}})
                    .then((res)=>{
                        alert('增加成功');
                        Router.push({ path: "/chanpz"});
                        // this.zusho=false;this.shad=false;
                        // axioIn.get('/product/group/')
                        // .then((res) => {
                        //     this.ite4=res.data.results;
                        //     this.popp=this.b2=res.data.results;
                        //     this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})                            
                        //     this.page=res.data.page_num.total_page;
                        //     this.rowNum = res.data.page_num.total_count;
                        //     this.search_open=false;
                        // })
                        // .catch((err)=> {console.log(err)});
                    })
                    .catch((err)=> {this.zusho=false;this.shad=false;console.log(err)});     
                }
                if(this.b3==='修改'){
                //console.log(JSON.stringify(this.b4))  
                    this.b4.version_type = this.versionsId
                    axioIn.put('/api/product/group/'+id+'/',JSON.stringify(this.b4),{headers:{'Content-Type':'application/json'}})
                    .then((res)=>{
                        alert('修改成功');
                        Router.push({ path: "/chanpz",query: {page: this.pageCount,search: this.searchTerm}});  
                        // this.zusho=false;this.shad=false;
                        // if(this.search_open===false){
                        //     axioIn.get('/api/product/group/?page='+this.pageIndex)
                        //     .then((res) => {
                        //         this.ite4=res.data.results;
                        //         this.popp=this.b2=res.data.results;
                        //         this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
                        //         this.page=res.data.page_num.total_page;
                        //         this.rowNum = res.data.page_num.total_count;
                        //         this.message1=false;
                        //     })
                        //     .catch((err)=> {console.log(err)});
                        // }else{
                        //     axioIn.get('/product/group?group_name='+this.mess+'&page=1')
                        //     .then((res) => {
                        //         this.ite4=res.data.results;
                        //         this.popp=this.b2=res.data.results;
                        //         this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
                        //         this.page=res.data.page_num.total_page;
                        //         this.rowNum = res.data.page_num.total_count;
                        //         this.message1=false;
                        //     })
                        //     .catch((err)=> console.log(err));
                        // }
                    })
                    .catch((err)=> {this.zusho=false;this.shad=false;console.log(err)});
                }
            }
        },
      close:function(){
          if(this.b3==='修改'){
              Router.push({ path: "/chanpz",query: {page: this.pageCount,search: this.searchTerm}}); 
          }else if(this.b3 === '新增'){
             Router.push({ path: "/chanpz"});return
          }
      },
      serviceClassify: function(){
            this.servers.map(n=>{n.ser_id='';n.ser_url='';n.ser_sub='';});//将输入框内容置空
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
    gai:function(id){
            this.b4.group_name='';
            if(id===undefined){return}
            else{
            this.servers.map(n=>{this.b4.group_name='';n.ser_id='';this.$set(n,'ser_url','');n.ser_url='',this.$set(n,'show',false);n.show=false,this.$set(n,'ser_sub','');n.ser_sub=''});
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
                    this.$set(this.servers[index],'ser_url',aa[0].ser_address)
                    this.$set(this.servers[index],'ser_sub',aa[0].id)
                    this.$set(this.servers[index],'ser_version',aa[0].ser_version) }
                    //console.log(n.ser_url);
                })   }
            })
           }
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
        incrementTotal:function(q){
            this.pageIndex = q
            // this.showList(index,q)
            // q=(q===undefined?1:q);
            //  if(this.search_open===false){
            //      axioIn.get('/product/group/?page='+q)
            //     .then((res) => {
            //         this.ite4=res.data.results;
            //         this.popp=this.b2=res.data.results;
            //         this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
            //         this.page=res.data.page_num.total_page;
            //         this.rowNum = res.data.page_num.total_count;
            //         this.message1=false;this.pageIndex=q;
            //             })
            //     .catch((err)=> console.log(err));
            //  }
            //  else{
            //      axioIn.get('/product/group?group_name='+this.mess)
            //     .then((res) => {
            //         this.ite4=res.data.results;
            //         this.popp=this.b2=res.data.results;
            //         this.b2.map(n=>{n.version_name = this.verObj[n.version_type]})
            //         this.page=res.data.page_num.total_page;
            //         this.rowNum = res.data.page_num.total_count;
            //         this.message1=false;this.pageIndex=q;
            //     })
            //     .catch((err)=> console.log(err));
            //         }
            //this.b2 = this.popp.slice((q-1)*10,q*10);
            //this.pageIndex=q;
            //this.message1=false;
      },
      tipp:function(){
          this.shad=false;this.tip=false;
      }
  }
}
</script>
<style lang="scss" scoped>
.productService{
    width: 100%;
    height: 100%;
    .groupTitle{height:40px;background:#fff;line-height: 40px;margin: 0 0 15px;border-radius: 6px}
    .groupContent{width:100%;border-bottom:1px solid #ccc;margin:0;padding-bottom: 20px}
    .fzu{background-color:white;height: calc(100% - 70px);overflow-y: scroll;border-radius: 6px;
    i{background:url(../assets/close.png) no-repeat;}
    div,p{margin:20px;text-align:left;font-size: 0;
    .duan{width:120px;margin-left:20px;}
    label{width:120px;text-align:right;margin-right:10px;display:inline-block;font-size:14px;}
    input,select{width:350px;height:32px;padding-left:10px;border-radius:5px;border:1px solid gray;box-sizing: border-box;}
    .serList{position:relative;width:960px;margin:0;padding:7px 0;border:1px solid #e8e8e8;border-top:0;
    .service_show{width:290px;padding-right:28px;cursor:default;}
    .icon{display:inline-block;background: url(../assets/tan.png) no-repeat;width:14px;height:6px;margin-left:-22px;}}
    .serviceAddress{margin:0;padding:20px;padding-bottom:0;width:250px;position: absolute;top:35px;left:380px;z-index:10;background:#fff;box-shadow: 0 0 5px #ccc;border-radius:3px;
    .search{margin:0;
    input{width:250px;padding-right:35px;background:#fafafa;border:1px solid #ccc;}}
    .choose{margin:0;font-size: 14px;line-height: 26px;}
    ul li{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 26px;cursor: pointer;color:#666;font-size: 12px;}
    }
    }
    div{margin: 0}
    option{padding:5px;}
    .serviceId{width:150px;margin:0 30px;border:1px solid #bcc3ca;border-radius:3px;}
    .lab{width:150px;text-align:left;margin-right: 0;margin-left:20px;font-size: 12px;color:#666;}
    .type{background-color:#f7f7f7;width:960px;height:34px;line-height:34px;margin:20px 0px 0px 150px;border-radius:10px 10px 0 0;border:1px solid #eee;color:#666;font-size:12px;
    span{display:inline-block;width:150px;margin-left:20px;}}
    }
    .fzu .bao {
        margin: 0px;
        text-align: right;
        height: 60px;
        margin: 0;
        padding-right: 15px;
        a {
            display: inline-block;
            width: 58px;
            height: 30px;
            text-align: center;
            line-height: 30px;
            border: 1px solid gray;
            border-radius: 5px;
            padding: 0;
            margin: 15px 5px;
        }
    }
}
</style>

