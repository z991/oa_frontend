/*
 * @Author: liuqian 
 * @Date: 2018-01-05 15:42:36 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-07-19 13:52:24
 */
<template>
    <div class="addService">
        <!-- <div class="serviceTitle"><span class="titleDefault">产品管理</span><span class="titleCarry"> > </span><span class="titleDefault">运维配置</span><span class="titleCarry"> > </span><span class="titleDefault">经典版服务</span><span class="titleCarry"> > </span><span calss="titlePitch">{{b3}}</span></div> -->
        <div class='revise'>
            <div class="inContent">
            <!-- <p><span>{{b3}}</span><i @click='close()' class='clo'></i></p> -->
            <p><label for="">服务ID</label><input type="text" v-bind:disabled='adisable' v-model='b4.ser_id' ><em class='ii'>*</em></p>
            <p><label for="">服务</label>
                <select style='width:398px;' v-bind:disabled='adisable' v-model='b4.ser_name'>
                    <option v-for='ii in items' :value="ii.id" :key='ii.id'>{{ii.ser_type}}</option>
                </select><em class='ii'>*</em></p>
            <div v-for='(item,index) in b4.ser_url' :key="index">
                <p class='serAdd'><label for="">服务地址</label>
                    <!--textarea v-model="b4.ser_urll" placeholder="以英文逗号,分隔不同地址" style="resize:vertical"></textarea--><!-- style='width:240px;'-->
                    <input type="text" v-model='item.ser_address'><em class='ii'>*</em><a href="javascript:void(0)" class='addAddress' @click='add_address()'></a><a href="javascript:void(0)" class='quu' @click='dele_address(index)'></a></p>
                <p v-for='(a,index) in item.ser_ip' :key="index" class='serAdd'>
                    <label for="" >IP</label><!--style="margin-left:20px;"-->
                <input type="text" v-model='a.ser_ip'><em class='ii' >*</em><a href="javascript:void(0)" class='addIp' @click='add_ip(item.ser_ip)'></a><a href="javascript:void(0)" class='quu' @click='dele_ip(item.ser_ip,index)'></a></p>
            </div>
            <!--textarea v-model="b4.ser_ip" placeholder="adress::x1,x2|adress1::x3,x4" style="resize:vertical"/*b4.ser_ip*/></textarea-->
            <!--p><label for="">版本号</label><input type="text" v-model='b4.ser_version'><em class='ii'>*</em></p-->
                
                <!--input type="text" v-model='b4.ser_ip' placeholder='adress::x1,x2|adress1::x3,x4'-->
            <!--p><label for="">版本号</label><input type="text" v-model='b4.ser_version'><em class='ii'>*</em></p-->
            <!-- <p style='margin:0 40px;text-align:left'>带<em class='ii'>*</em>为必填</p> -->
            </div>
            <p class='bao'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='baob(b4.id)'>保存</a></p>
        </div>
        <shade v-show='shad'></shade>
        <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填    
          <p class='bao' style='text-align:center;margin:20px 0'><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Qs from 'qs';
import Shade from './shade';
import axioIn from '../store/axioIn'
import Router from "../router/index";
export default {
  name: 'addService',
  components:{Shade},
  data () {
      return {
        b3: '',
        b4:{version_type: 1,ser_id:'',ser_name:'',ser_url:[{ser_address:'',ser_ip:[{ser_ip:''}]}]},
        adisable:false,
        items:[],
        tip: false,
        shad: false,
        id: '',
        searchTerm: '',
        page: 1,
        flag:false
      }
  },
  created: function(){
    
      axioIn.get('/api/product/sertype/forserver/?version_type=1')
        .then((res)=>{
            if(res){
            this.items=res.data;
            this.flag=true;
            return this.flag;
            }
        })
            this.page = this.$route.query.page;this.searchTerm = this.$route.query.search;
  },
//   mounted: function(){
//       this.page = this.$route.query.page;this.searchTerm = this.$route.query.search;
//         if(this.$route.query.id===undefined){
//             this.adisable=false;this.b3='新增'
//             this.b4={ser_id:'',version_type: 1,ser_name:'',ser_url:[{ser_address:'',ser_ip:[{ser_ip:''}]}]};
//         }else{
//             this.id = this.$route.query.id
//             this.adisable=true;this.b3 = '修改'
//             axioIn.get('/api/product/server/'+this.$route.query.id+'/?version_type=1').then(
//                 (res)=>{
//                     this.adisable=true;
//                     this.b4=res.data;
//                     console.log('获取值')
//                     this.b4.version_type = 1;
//                     let aii=[];
//                 }
//             )
//         }
//   },
  methods: {
      getData(){
          console.log('启动')
            if(this.$route.query.id===undefined){
                this.adisable=false;this.b3='新增'
                this.b4={ser_id:'',version_type: 1,ser_name:'',ser_url:[{ser_address:'',ser_ip:[{ser_ip:''}]}]};
            }else{
                this.id = this.$route.query.id
                this.adisable=true;this.b3 = '修改'
               axioIn.get('/api/product/server/'+this.$route.query.id+'/?version_type=1').then(
                    (res)=>{
                        this.adisable=true;
                        this.b4=res.data;
                        this.b4.version_type = 1;
                        let aii=[];
                    }
                )
            }
      },
      close:function(){
          if(this.b3==='修改'){
              console.log('修改')
              Router.push({ path: "/chanpf",query: {page: this.page,search: this.searchTerm}});
          }else if(this.b3 === '新增'){
             Router.push({ path: "/chanpf"});return
          }
       },
       tipp:function(){ // 必填警告弹窗处的确定
          this.shad=false;this.tip=false;
       },
       add_address:function(){ // 增加地址
           this.b4.ser_url.push({ser_address:'',ser_ip:[{ser_ip:''}]})
       },
      add_ip:function(pi){pi.push({ser_ip:''})},
      dele_address:function(index){if(confirm('确定删除吗？'))this.b4.ser_url.splice(index,1)},
      dele_ip:function(pi,i){if(confirm('确定删除吗？'))pi.splice(i,1);},
      baob:function(id){ //新增弹窗处的保存按钮
          //console.log(this.b4);
          let bb=false;
          if(this.b4.ser_id===''||this.b4.ser_name===''){bb=true;}
          this.b4.ser_url.map(n=>{
              if(n.ser_address === ''){
                  bb = true;
              }
          })
          //this.b4.ser_url.map((n)=>{
              //if(n.ser_address===''){bb=true;}
              //n.ser_ip.map((v)=>{if(v.ser_ip===''){bb=true;}})
          //})
          //for(let o in this.b4.ser_url){//console.log(this.b4[o])
              //if(this.b4[o]===undefined||this.b4[o]===''){bb=true;}
         // }
          if(bb===true){
              this.tip=true;this.shad=true; 
          }else {
            if(this.b3==='修改'){//console.log(undefined==0)
                this.b4.version_type = 1;
                axioIn.put('/api/product/server/'+this.id+'/',this.b4).then(
                    (res)=>{
                        // this.shad=false; this.b1=false;
                    axioIn.get('/api/product/server/?version_type=1')
                    .then((res) => {
                        //this.b2 = res.data.slice(0,10);
                        alert('修改成功');
                        Router.push({ path: "/chanpf",query: {page: this.page,search: this.searchTerm}});
                        // this.shad=false;this.b1=false;
                    // if(this.search_open===false){
                    //     axioIn.get('/product/server/?version_type=1&page='+this.pagI)
                    //     .then((res) => {
                    //         this.popp=this.b2=res.data.results;
                    //         this.page=res.data.page_num.total_page;
                    //         this.rowNum = res.data.page_num.total_count;
                    //         //this.pagI=q;
                    //         this.transform(this.b2);
                    //     })
                    //     .catch((err)=>{alert(err.data.error)})
                    // }else{
                    //     axioIn.get('/product/server/?version_type=1&ser_id='+this.messs+'&page=1')
                    //     .then((res) => {
                    //         this.popp=this.b2=res.data.results;
                    //         this.page=res.data.page_num.total_page;
                    //         this.rowNum = res.data.page_num.total_count;
                    //         //this.pagI=q;
                    //         this.transform(this.b2);
                    //     })
                    //     .catch((err)=>{alert(err.data.error)})
                    // }
                                    
                        })
                    
                    }).catch((err)=>{
                        this.shad=false; this.b1=false;
                        alert(err.data.error);
                        
                    })
                    }

            if(this.b3==='新增'){
                this.b4.version_type = 1;
                axioIn.post('/api/product/server/',this.b4).then(
                    (res)=>{
                    //   this.shad=false; this.b1=false;
                      alert('新增成功')
                      Router.push({ path: "/chanpf"});
                    // axioIn.get('/product/server/?version_type=1')
                    // .then((res) => {
                    //     //this.b2 = res.data.slice((this.pagI-1)*10,this.pagI*10)
                    //     this.shad=false;this.b1=false;
                    //     this.popp=this.b2=res.data.results;
                    //     this.page=res.data.page_num.total_page;
                    //     this.rowNum = res.data.page_num.total_count;
                    //     this.search_open=false;
                    //     this.transform(this.b2);
                    // })
                    // .catch((err)=> console.log(err.data.error));
                  })
                .catch((err)=>{
                    // this.shad=false; this.b1=false;
                        if(err.status == 403) {
                            alert('没有权限')
                        }  else {
                             alert(err.data.detail);
                        }
                    })
              //console.log(Qs.stringify(this.b4));
          }
          }
        }
  },
  watch:{
      'flag':function(res){
            if(res){
                this.getData();
            }
      }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.addService{width:100%;margin:auto;background:#edf2f5;
    .titleDefault{color:#999999;}.titleCarry{color: #cccccc;}.titlePitch{color: #515c6e}
    .serviceTitle{width:100%;height:36px;line-height: 36px;background:#fff;margin: 0 0 15px;}
    .revise{width:100%px;background-color:white;
    .inContent{height: 656px;width:100%;border-bottom:1px solid #eee;overflow-y: scroll;padding-top:9px;}
    .bao{
        a{display: inline-block;width: 58px;height:30px;text-align: center;line-height: 30px;border: 1px solid gray;border-radius: 5px;padding:0;margin: 15px 5px;}
        margin: 0px;
        text-align: right;
        height: 60px;
        margin: 0;
        padding-right: 15px;
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
    p{margin:14px;text-align:left;
    label{width:80px;text-align:right;margin-right:20px;display:inline-block;font-size: 12px;color:#666;}}
    input{width:386px;height:30px;padding-left:10px;border-radius:5px;border:1px solid #d2d8db;}
    textarea{width:402px;height:32px;}
    select{height:32px;border-radius:5px;border:1px solid #d2d8db;margin-left:-3px;
    }
    option{height:26px;display:block;padding-top:5px;}}
}
</style>
