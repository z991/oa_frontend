/*
 * @Author: liuqian 
 * @Date: 2017-12-25 15:27:37 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-04-25 14:10:55
 */
<template>
  <div class="chanpf">
      <p class="qu">产品管理 > 运维配置>重构版服务</p>
      <p class="ji"><label for="">服务ID</label><input type="text" v-model="messs"  @keyup.enter="search">
          <a href="javascript:void(0)" class="so" @click='search()'>搜索</a><a href="javascript:void(0)" class="cho" @click='resiv()'>重置</a></p>
      <p class="xinz">
          <a href="javascript:void(0)"  class="so" @click='add()'>新增</a>
          <a href="javascript:void(0)"  class="so">批量导入</a>
          <input type="file" class='leading_in' accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" @change="upload()"  ref="upload">
          <a href="javascript:void(0)"  class="so" @click='derive()'>批量导出</a>
      </p>
      <p class="cp">
          <a href="javascript:void(0)" class="c1">序号</a>
          <a href="javascript:void(0)" class="c1">服务ID</a>
          <a href="javascript:void(0)" class="c1">服务</a>
          <a href="javascript:void(0)" class="c3">服务地址</a>
          <!-- <a href="javascript:void(0)" class="c1">IP</a> -->
          <!--a href="javascript:void(0)" class="c1">版本号</a-->
          <a href="javascript:void(0)" class="c1">操作</a>
      </p>
      <ul class="it">
          <li v-for="(item,index) in b2" :key='item.id'>
              <span class="c1">{{item.index}}</span>
              <span class="c1">{{item.ser_id}}</span>
              <span class="c1">{{item.ser_name}}</span>
              <span class="c3">{{item.ser_urll}}</span>
              <!-- <span class="c1">{{item.ser_ip}}</span> -->
              <!--span class="c1">{{item.ser_version}}</span-->
              <span class="c1"><a href="javascript:void(0)" class="cha" @click='cha(item.id)'></a><a href="javascript:void(0)" class="dele" @click='delet(item.id,index)'></a></span>
          </li>
      </ul>
      <div v-show='b1' class='revise'>
          <p><span>{{b3}}</span><i @click='close()' class='clo'></i></p>
          <p><label for="">服务ID</label><input type="text" v-bind:disabled='adisable' v-model='b4.ser_id' ><em class='ii'>*</em></p>
          <p><label for="">服务</label>
              <select style='width:414px;' v-bind:disabled='adisable' v-model='b4.ser_name'>
                  <option v-for='ii in items' :value="ii.id" :key='ii.id'>{{ii.ser_type}}</option>
              </select><em class='ii'>*</em></p>
          <div v-for='(item,index) in b4.ser_url' :key="index">
                <p class='bao'><label for="">服务地址</label>
                    <!--textarea v-model="b4.ser_urll" placeholder="以英文逗号,分隔不同地址" style="resize:vertical"></textarea-->
                    <input type="text" v-model='item.ser_address' style='width:240px;'><em class='ii'>*</em><a href="javascript:void(0)" class='quu' @click='add_address()'>增加地址</a><a href="javascript:void(0)" class='quu' @click='dele_address(index)'>删除</a></p>
                <p v-for='(a,index) in item.ser_ip' :key="index" class='bao'>
                    <label for="" style="margin-left:20px;">IP</label>
                <input type="text" v-model='a.ser_ip' style='width:240px;'><em class='ii' >*</em><a href="javascript:void(0)" class='quu' @click='add_ip(item.ser_ip)'>增加IP</a><a href="javascript:void(0)" class='quu' @click='dele_ip(item.ser_ip,index)'>删除</a></p>
          </div>
          <!--textarea v-model="b4.ser_ip" placeholder="adress::x1,x2|adress1::x3,x4" style="resize:vertical"/*b4.ser_ip*/></textarea-->
          <!--p><label for="">版本号</label><input type="text" v-model='b4.ser_version'><em class='ii'>*</em></p-->
               
              <!--input type="text" v-model='b4.ser_ip' placeholder='adress::x1,x2|adress1::x3,x4'-->
          <!--p><label for="">版本号</label><input type="text" v-model='b4.ser_version'><em class='ii'>*</em></p-->
          <p style='margin:0 40px;text-align:left'>带<em class='ii'>*</em>为必填</p>
          <p class='bao' style='margin:0;text-align:right;'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='baob(b4.id)'>保存</a></p>
      </div>
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :pageIndex='pagI'></pagination>
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
import Pagination from './pagination'
import Router from "../router/index";
//axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.withCredentials=true;//配置cookie
export default {
  name: 'chanpf',
  data:function(){
      return {
        messs:'',
        b1:false,
        shad:false,
        shad1:false,
        b2:[
            {id:'11',ser_id:'xx',ser_name:'xx',ser_urll:'',ser_ip:''}
        ],
        b3:'',
        items:[],
        b4:{version_type: 2,ser_id:'',ser_name:'',ser_url:[{ser_address:'',ser_ip:[{ser_ip:''}]}]},
        b5:'',
        adisable:false,
        b6:'',
        page:'',//总数据条数
        popp:'',
        tip:false,
        pagI:1,//当前页码
        search_open:'',
        rowNum: '',
        search_result: false
      }
  },
  components:{Shade,Pagination},
  created:function(){
   this.$checkCookie();
   // 服务栏的数据
   axioIn.get('/api/product/sertype/forserver/?version_type=2')
   .then((res)=>{
       this.items=res.data
   })
   this.pagI = this.$route.query.page || 1;var SearchMess = this.$route.query.search;
   this.haveSearch(this.pagI,SearchMess)
  },
//   mounted:function(){
//       this.refesh();
//   },
  methods:{
      cha:function(id){ // 编辑，带入已有数据
        Router.push({ path: "/addRefactor",query: {id:id,page: this.pagI,search: this.messs}});return
        //   this.b3='修改';
        //   this.b1=true;this.adisable=true;
        //   if(this.b3==='修改'){
        //   axioIn.get('/api/product/server/'+id+'/?version_type=2').then(
        //       (res)=>{
        //           this.b4=res.data;
        //           this.b4.version_type = 2;
        //           let aii=[];
        //           /*this.b4.ser_url.map(n=>{
        //               aii.push(n.ser_address+'::'+n.ser_ip.map(v=>v.ser_ip))
        //           })
        //           this.b4.ser_ip=aii.join('|')
        //           let a=res.data.ser_url.map(n=>n.ser_address);
        //           if(a.length===1){
        //               this.b4.ser_urll=a[0];
        //           }else if(a.length>1){
        //               this.b4.ser_urll=a.join(',')
        //           }*/
                  
        //       }
        //   )}
      },
      resiv:function(){// 重置
          this.messs='';this.adisable=true;
          axioIn.get('/api/product/server/?version_type=2')
          .then((res) => {
          this.popp=this.b2=res.data.results;
          this.page=res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.search_open=false;
          this.transform(this.b2);this.pagI=1;
         })
         .catch((err)=>{alert(err.data.error)})
        },
      search:function(){ // 搜索
          if(this.messs!==''){
          axioIn.get('/api/product/server/?version_type=2&ser_id='+this.messs)
           .then((res) => {//console.log(response.data)
               if(res.data.length==0){alert('未搜到相关信息')}
               else{
                    this.popp=this.b2=res.data.results;
                    this.page=res.data.page_num.total_page;console.log(this.page)
                    this.rowNum = res.data.page_num.total_count;
                    this.search_open=true;
                    this.transform(this.b2);
        
               }
               })
           .catch((err)=>{
                        alert(err.data.error)
                    })
            }
           else{alert('请输入搜索信息')}
        },
      add:function(){ // 新增
        Router.push({ path: "/addRefactor"});return
        //  this.shad=true;
        //  this.b3='新增';this.adisable=false;
        //  this.b1=true;this.b4={ser_id:'',version_type: 1,ser_name:'',ser_url:[{ser_address:'',ser_ip:[{ser_ip:''}]}]};
       },
      incrementTotal:function(q){
          q=(q===undefined?1:q);
          if(this.search_open===false){//console.log(q===undefined)
              
              axioIn.get('/api/product/server/?version_type=2&page='+q)
              .then((res) => {
                this.popp=this.b2=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.pagI=q;
                this.transform(this.b2);
              })
              .catch((err)=>{alert(err.data.error)})
          }
          else{
              axioIn.get('/api/product/server/?version_type=2&ser_id='+this.messs+'&page='+q)
              .then((res) => {
                this.popp=this.b2=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.pagI=q;
                this.transform(this.b2);
              })
              .catch((err)=>{alert(err.data.error)})
          }
          //this.b2 = this.popp.slice((q-1)*10,q*10);
          //this.pagI=q;
          },
      delet:function(id,index){ // 删除
         confirm('确认删除？')?
          axioIn.delete('/api/product/server/'+id+'/?version_type=2')
          .then((res)=>{alert('删除成功');this.incrementTotal(this.pageI)}):0;
          
       },
      baob:function(id){ //新增弹窗处的保存按钮
          //console.log(this.b4);
          let bb=false;
          if(this.b4.ser_id===''||this.b4.ser_name===''){bb=true;}
          //this.b4.ser_url.map((n)=>{
              //if(n.ser_address===''){bb=true;}
              //n.ser_ip.map((v)=>{if(v.ser_ip===''){bb=true;}})
          //})
          //for(let o in this.b4.ser_url){//console.log(this.b4[o])
              //if(this.b4[o]===undefined||this.b4[o]===''){bb=true;}
         // }//console.log(bb);
          if(bb===true){
              this.tip=true;this.shad1=true; 
          }else {   
            if(this.b3==='修改'){//console.log(undefined==0)
                this.b4.version_type = 2;
                axioIn.put('/api/product/server/'+id+'/',this.b4).then(
                    (res)=>{this.shad=false; this.b1=false;
                    axioIn.get('/api/product/server/?version_type=2')
                    .then((res) => {
                        //this.b2 = res.data.slice(0,10);
                        alert('修改成功');
                        this.shad=false;this.b1=false;
                    if(this.search_open===false){
                        axioIn.get('/api/product/server/?version_type=2&page='+this.pagI)
                        .then((res) => {
                            this.popp=this.b2=res.data.results;
                            this.page=res.data.page_num.total_page;
                            this.rowNum = res.data.page_num.total_count;
                            //this.pagI=q;
                            this.transform(this.b2);
                        })
                        .catch((err)=>{alert(err.data.error)})
                    }else{
                        axioIn.get('/api/product/server/?version_type=2&ser_id='+this.messs+'&page=1')
                        .then((res) => {
                            this.popp=this.b2=res.data.results;
                            this.page=res.data.page_num.total_page;
                            this.rowNum = res.data.page_num.total_count;
                            //this.pagI=q;
                            this.transform(this.b2);
                        })
                        .catch((err)=>{alert(err.data.error)})
                    }
                                    
                        })
                    
                    }).catch((err)=>{
                        this.shad=false; this.b1=false;
                        alert(err.data.error);
                        
                    })
                    }

            if(this.b3==='新增'){
                this.b4.version_type = 2;
                axioIn.post('/api/product/server/',this.b4).then(
                    (res)=>{this.shad=false; this.b1=false;
                    alert('新增成功')
                    axioIn.get('/api/product/server/?version_type=2')
                    .then((res) => {
                        //this.b2 = res.data.slice((this.pagI-1)*10,this.pagI*10)
                        this.shad=false;this.b1=false;
                        this.popp=this.b2=res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                        this.search_open=false;
                        this.transform(this.b2);
                    })
                    .catch((err)=> console.log(err.data.error));
                  })
                .catch((err)=>{
                    this.shad=false; this.b1=false;
                        alert(err.data.error);
                    })
              //console.log(Qs.stringify(this.b4));
          }
          }
        },
      close:function(){
          this.shad=false;
          this.b1=false;
       },
      tipp:function(){ // 必填警告弹窗处的确定
          this.shad1=false;this.tip=false;
       },
      transform:function(data){
          data.map(n=>{//填充数据
                if(n.ser_url.length!==0){
                  let a=n.ser_url.map(n=>n.ser_address);
                  if(a.length===1){
                      n.ser_urll=a[0]
                  }else if(a.length>1){
                      n.ser_urll=a.join('|')
                  }
                  n.ser_name=n.ser_url[0].ser_type;
                  n.ser_url.map(n=>{
                      n.ser_ipp=n.ser_ip.map(n=>n.ser_ip)
                  });
                  let b=n.ser_url.map(n=>n.ser_ipp);
                  if(b.length===1){n.ser_ip=b[0].join(',')}
                  else if(b.length>1){n.ser_ip=b.join('|')}
                }
              });
       },
    add_address:function(){ // 增加地址
           this.b4.ser_url.push({ser_address:'',ser_ip:[{ser_ip:''}]})
       },
    add_ip:function(pi){pi.push({ser_ip:''})},
    dele_address:function(index){if(confirm('确定删除吗？'))this.b4.ser_url.splice(index,1)},
    dele_ip:function(pi,i){if(confirm('确定删除吗？'))pi.splice(i,1);},
    upload:function(){
          let input = this.$refs.upload;
          let data = new FormData();
          data.append('file',input.files[0]); 
           axioIn.post('/api/product/seraddress/import_save/?version_type=2',data,{headers: {'Content-Type': 'application/vnd.ms-excel'}})
            .then((res)=>{this.refesh();alert('导入成功')})
            .catch((err)=>{
                alert('导入失败')
                if(err.status == 400) {
                    return 
                }else if(err.response) {
                    if(err.response.data.detail == "You do not have permission to perform this action." || error.response.status == 400) return
                }else if(err.data.error){
                    alert(err.data.error)
                }else {
                    alert('导入失败')
                }
            })
     
      },
      haveSearch (page,search,res) {
        page === undefined?page = 1:page;
        if(search===''||search===undefined){
            axioIn.get('/api/product/server/?version_type=2&page='+page)
            .then((res) => {
                this.popp=this.b2=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                //this.pagI=q;
                this.transform(this.b2);
            })
            .catch((err)=>{alert(err.data.error)})
        }else{
            this.messs = search
            axioIn.get('/api/product/server/?version_type=2&ser_id='+search+'&page='+page)
            .then((res) => {
                this.popp=this.b2=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                //this.pagI=q;
                this.transform(this.b2);
            })
            .catch((err)=>{alert(err.data.error)})
        }
      },
      refesh:function(){
          // 数据展示
          axioIn.get('/api/product/server/?version_type=2')
            .then((res) => {
                this.popp=this.b2=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.search_open=false;
                this.transform(this.b2);
            })
            .catch((err)=>{alert(err.data.error)})
      },
      derive:function(){
          window.open('/api/product/seraddress/export/?version_type=2')
      }
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/home';
.chanpf{
    .revise{width:580px;position:absolute;top:20%;left:30%;z-index:15;border:1px solid gray;background-color:white;max-height:800px;overflow-y:scroll;
    .clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
    p{margin:20px;
    label{width:80px;text-align:right;margin-right:10px;display:inline-block;}}
    input{width:402px;height:32px;padding-left:10px;border-radius:5px;border:1px solid gray;}
    textarea{width:402px;height:32px;}
    select{height:34px;border-radius:5px;border:1px solid gray;margin-left:-3px;
    }
    option{height:26px;display:block;padding-top:5px;}}
    .c1{margin-left:22px;width:132px;}
    .cha,.bian{width:20px;height:20px;display:inline-block;}
    .cha{background:url(../assets/bian1.png) no-repeat center;margin-right:20px;}
    .dele{background:url(../assets/dele.png) no-repeat center}
    .ii{font-style:normal;color:red;margin-left:5px;}
    .leading_in{position: absolute;width:68px;height:36px;left:130px;z-index: 3;opacity: 0;cursor: pointer;}
}
</style>