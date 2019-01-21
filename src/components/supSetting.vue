<template>
    <div class="supSetting">
        <!-- <p class="qu">设置 > 帮助中心设置</p> -->
        <p class="ji"><label for="">接待组</label>
            <select name="" id="" v-model='mess.title'>
                <option value=" ">---</option>
                <option v-for='(ii,index) in ite3' :key="index" :value="ii.name">{{ii.name}}</option>
              </select>
            <label for="">专属客服经理</label><input type="text" v-model="mess.manager" @keyup.enter="search">
            <!-- <label for="">企业ID</label><input type="text" v-model="mess.company_id" @keyup.enter="search"> -->
            <a href="javascript:void(0)" class="so" @click='search()'>搜索</a><a href="javascript:void(0)" class="cho" @click='chon()'>重置</a></p>
        <p class="xinz"><a href="javascript:void(0)"  class="so" @click='add()'>新增</a></p>
        <p class="cp">
          <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
          <a href="javascript:void(0)" class="wid4">接待组</a>
          <!-- <a href="javascript:void(0)" class="c1">企业ID</a> -->
          <a href="javascript:void(0)" class="wid4">专属客服经理</a>
          <a href="javascript:void(0)" class="wid4">操作</a>
      </p>
      <ul class="it">
          <li v-for="item in b2" :key='item.id'>
              <span class="wid_1 wid4">{{item.index}}</span>
              <span class="wid4">{{item.group_id}}</span>
              <!-- <span class="c1">{{item.company_id}}</span> -->
              <span class="wid4">{{item.manager}}</span>
              <span class="wid4">
                  <a href="javascript:void(0)" class="bian" @click="bian(item.id)"><i class="el-icon-edit"></i></a>
                  <a href="javascript:void(0)" class="delete" @click='delet(item.id,index)'><i class="el-icon-delete"></i></a>
                  <!-- <a href="javascript:void(0)" class="bian" @click='bian(item.id)'></a>
                  <a href="javascript:void(0)" class="dele" @click='delet(item.id,index)'></a> -->
                  </span>
          </li>
      </ul>
      <div class="jzu" v-show='jsho'>
          <p class='afb'><span>{{b3}}</span><i @click='close()'></i></p>
          <p><label for="">接待组</label>
             <select name="" id="" v-model='site.title' @change="receive()">
                  <option v-for='(ii,index) in ite3' :key="index" :value="ii.name">{{ii.name}}</option>
              </select>
              <em class='ii'>*</em></p>
          <p><label for="">接待组ID</label><span>{{site.group_id}}</span></p>
          <p><label for="">分配的客户企业ID</label>
         
             <input type="text" v-model='site.company_id' placeholder="格式为只能为kf_加数据或者字母_1000">
         
          <span class="upload" @click="parentAdd">添加</span>
                 </p>
         
          <!-- <em class='ii'>*</em> -->
          <p class='exp' >
             <span v-for='(it,index) in site.set_info' :key="index" class='expon' v-if="it.company_id!==''">{{it.company_id}}<em class='cloi' @click='delcompany(it,index)'></em></span>
          </p>
          
          <p><label for="">专属客服经理</label><input type="text" v-model='site.manager'></p>
          <p><label for="">一句话介绍</label><input type="text" v-model='site.desc'></p>
          <p><label for="">头像展示</label>
              <span class='img img2'>
                  <span style='font-size:22px;'>+</span><br/>
                  <span>上传</span>
              </span>
              <input type="file" class='img img1' accept="image/jpeg,image/jpg,image/png" @change="upload()"  ref="upload">
              <span @mouseover='mouon()' @mouseout='mouov()' class='img'><img :src="site.avatar" class='img imgv' alt="" >
              <span class='img imgg' v-show='img_'>
                  <a href="javascript:void(0)" class="imgg1" @click='onImg()'></a>
                  <a href="javascript:void(0)" class="imgg2" @click='dele_img()'></a>
              </span></span>
              </p>
          <p><label for="">电话</label><input type="text" v-model='site.phone_number'></p>
          <p><label for="">邮箱</label><input type="text" v-model='site.email'></p>
          <p><label for="">网址</label><input type="text" v-model='site.url'></p>
          <p style='margin:0 40px;text-align:left'><span style="font-size:14px;">带<em class='ii'>*</em>为必填</span></p>
          <p class='bao' style='text-align:right;margin:0' v-show='diso'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='baoo(site.id)'>保存</a></p>
      </div>
      <shade v-show='shad'></shade>
      <div v-show='show_img' class='fix_img'><img :src="site.avatar" alt="" style='width:500px;height:500px;'><i @click='close_img()'></i> </div>
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
import axioIn from '../store/axioIn';
import Pagination from './pagination';
axioIn.defaults.headers['Content-Type'] = 'application/json';
axios.defaults.withCredentials=true;//配置cookie
export default {
    name:'supSetting',
    components:{Shade,Pagination},
    data:function(){
        return {
            parent:[],
            mess:{title:'',manager:'',company_id:''},
            b2:[{index:'',title:'',company_id:'',manager:''},],
            b3:'',
            jsho:false,
            items:[{group_id:'',dele:false}],
            mysql:true,
            shad:false,
            ite3:{},
            shad1:false,
            //itee:[{product:'',mode:'',version:[{pro_version:'',id:''}]},],
            adisable:false,
            bao:true,
            site:{title:'',group_id:'',avatar:'',company_id:'',manager:'',desc:'',phone_number:'',email:'',url:'',set_info:[{company_id:''}],},
            //database:[{db_port:'',db_address:'',db_username:'',db_name:'',db_pwd:'',db_type:''}],
            diso:true,
            ser_name:[],
            page:'',
            popp:'',
            pageIndex:1,
            tip:false,
            search_val:'',
            search_open:'',
            rowNum:'' ,
            show_img:false,
            img_:false
        }
    },
    created:function(){
        this.$checkCookie();   
      axioIn.get('/setup/site-reception-group/')
      .then((res) => {
          this.popp=this.b2=res.data.results;
          this.page=res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.search_open=false;
          this.$store.commit('setLoading', false)
          })
      .catch((err)=>{
          this.$store.commit('setLoading', false);
          alert(err.data.error);
        })
      this.$checkCookie(); 
      axioIn.get('/setup/reception-groups/')
      .then((res)=>this.ite3=res.data)
      .catch((err)=>{
          this.$store.commit('setLoading', false);
          alert(err.data.error);
        })
  },
  methods:{
      parentAdd(){
        if( this.site.company_id===''){
            alert('分配的客户企业ID不能为空')            
        }else{
            console.log(this.site)
          this.site.set_info.push({company_id:this.site.company_id})
          this.site.company_id='';
        }
        
      },
      delcompany(it,index){
              this.site.company_id=''
              this.site.set_info.splice(index,1)
              

      },
      search:function(){
          var aa='';
          let test_mange=/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.mess.manager);
          if(this.mess.manager!==''&&test_mange===false){alert('客服经理只能为字母或者汉字');return}
          let test_id=/^kf_\d{1,}$/g.test(this.mess.company_id);
          let test_Id=/^[A-Za-z]test_id}_1000$/g.test(this.mess.company_id);
        //   if(this.mess.company_id!==''&&test_id===false&&test_Id===false){alert('企业id只能为kf_加数据或者字母_1000');return}
          for(let i in this.mess){
                  if(this.mess[i]!==''&&this.mess[i]!==undefined){
                      if(aa.length===0){aa=i+'='+this.mess[i]}
                      else{aa=aa+'&'+i+'='+this.mess[i]}
                  }
          };this.search_val=aa;
          console.log(this.search_val)
          axioIn.get('/setup/site-reception-group/?'+aa)
            .then((res) => {
                if(res.data.length==0){alert('未搜到相关信息')}
                 else{
                    this.popp=this.b2=res.data.results;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.search_open=true;}
                                })
            .catch((err)=>alert(err.data.error))
      },
      chon:function(){
            this.mess.title='';this.mess.manager='';this.mess.company_id='';
            axioIn.get('/setup/site-reception-group/')
            .then((res) => {
          this.popp=this.b2=res.data.results;
          this.page=res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.search_open=false;
          this.pageIndex=1;
          })  
        },
      add:function(){
          this.jsho=true;this.shad=true;this.b3='新增';this.mysql=true;this.adisable=false;this.bao=true;this.diso=true;
          this.site={title:'',group_id:'',avatar:'',company_id:'',manager:'',desc:'',phone_number:'',email:'',url:'',set_info:[]};
      },
      bian:function(id){
          this.site={title:'',group_id:'',avatar:'',company_id:'',manager:'',desc:'',phone_number:'',email:'',url:'',set_info:[]};
          this.jsho=true;this.shad=true;this.b3='修改';this.mysql=true;this.adisable=false;this.bao=true;this.diso=true;
          axioIn.get('/setup/site-reception-group/'+id+'/')
          .then((res)=>{ //console.log(JSON.stringify(res.data.versionInfos))
             [this.site]=[res.data];
              
              })
              .catch(error=>alert(error.data.error))
              
      },
      close:function(){
          this.jsho=false;this.shad=false;
      },
      baoo:function(id){
        // console.log(this.pageIndex);return
        var aaa=false;
        //var aa=this.itee.map(n=>n.mode);

        var bb=[];
        // this.site.set_info.map((item)=>{
        //     console.log(item.company_id);

        //         let test_id=/^kf_\d{1,}$/g.test(item.company_id);
        // let test_Id=/^[A-Za-z]{1,}_1000$/g.test(item.company_id); 
        // console.log(item.company_id)
        //   if(test_id===false&&test_Id===false){alert('企业id只能为kf_加数据或者字母_1000');return}
          
        // })
   
        let test_mange=/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.site.manager);
        if(this.site.manager!==''&&test_mange===false){alert('客服经理只能为字母或者汉字');return}
        let test_phone=/^1[34578]\d{9}$/.test(this.site.phone_number)
        if(this.site.phone_number!==''&&test_phone===false){alert('电话号码格式不正确');return}
        let test_email=/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(this.site.email)
        if(this.site.email!==''&&test_email===false){alert('邮箱格式不正确');return}
        let test_url=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/.test(this.site.url)
        if(this.site.url!==''&&test_url===false){alert('网址不合法');return}
        //aa.map(n=>{bb.push({id:n})})
        // for(let i in this.site){
        //     if(this.site[i]===''){aaa=true}
        // }
        if(this.site.title === ''){aaa=true}
       
        if(aaa==true){this.tip=true;this.shad1=true;
            }
            else{
                var aaai=this.site;
          
                if(this.b3==='修改'){
                    axioIn.put('/setup/site-reception-group/'+id+'/',aaai)
                    .then((res)=>{alert('修改成功');
                    this.jsho=false;this.shad=false;
                    if(this.search_open===false){
                        axioIn.get('/setup/site-reception-group/?page='+this.pageIndex)
                        .then((res) => {
                            this.popp=this.b2=res.data.results;
                        
                            this.page=res.data.page_num.total_page;
                            this.rowNum = res.data.page_num.total_count;
                            })
                        .catch((err)=>{
                            this.jsho=false;this.shad=false;
                           
                        } )
                }
                else{
                    axioIn.get('/setup/site-reception-group/?'+this.search_val+'&page=1')
                    .then((res) => {
                        
                        this.popp=this.b2=res.data.results;
                        
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                        })
                }
                                    })  
                    .catch((err)=>{
                        // this.jsho=false;this.shad=false;
                        alert(err.data[0])
                    } )
                }
                if(this.b3==='新增'){
                                    
                    axioIn.post('/setup/site-reception-group/',aaai)
                    .then((res)=>{alert('增加成功');
                        this.jsho=false;this.shad=false;
                         axioIn.get('/setup/site-reception-group/')
                            .then((res) => {
                                this.popp=this.b2=res.data.results;
                                this.page=res.data.page_num.total_page;
                                this.rowNum = res.data.page_num.total_count;
                                this.search_open=false;
                                })
                                    })
                    .catch((err)=>{
                     
                        //  alert(err.data[0])  
                        // this.jsho=false;this.shad=false;
                        // alert(err.data.company_id[0])
                    }
                        )
                }
            }
      },
      incrementTotal:function(q){
          q=(q===undefined?1:q);
          if(this.search_open===false){
              axioIn.get('/setup/site-reception-group/?page='+q)
                .then((res) => {
                    let a3=["", "标准版", "公有云", "专属云", "私有云"];
                    this.popp=this.b2=res.data.results;
                    this.b2.map(n=>{n.deploy_way=a3[n.deploy_way];})
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.pageIndex = q;
                    }).catch(err=>{alert(err.data.company_id[0])})
          }
          else{
            console.log(this.search_val)
              axioIn.get('/setup/site-reception-group/?'+this.search_val+'&page='+q)
             .then((res) => {
                let a3=["", "标准版", "公有云", "专属云", "私有云"];
                this.popp=this.b2=res.data.results;
                this.b2.map(n=>{n.deploy_way=a3[n.deploy_way];})
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.pageIndex = q;
                }).catch(err=>{alert(err.data.company_id[0])})
          }
          //this.b2 = this.popp.slice((q-1)*10,q*10);
          //this.pageIndex=q;
          
      },
      tipp:function(){
          this.shad1=false;this.tip=false;
      },
      delet:function(id,index){
         confirm('确认删除？')?
          axioIn.delete('/setup/site-reception-group/'+id+'/')
          .then((res)=>{alert('删除成功');this.incrementTotal(this.pageIndex)}):0;
       },
      upload:function(){
          var input = this.$refs.upload;
          var dataa = new FormData();
             dataa.append('file',input.files[0]);
           if(input.files){  
                //读取图片数据  
            var f = input.files[0];  
             
            var reader = new FileReader();
             reader.readAsDataURL(f);
             reader.onload =  (e) => {
                var data = e.target.result;  
                //加载图片获取图片真实宽度和高度  
                var image = new Image(); 
                image.onload= ()=>{ 
                    var width = image.width;  
                    var height = image.height; 
                    if(width>280||height>280) {alert('图片小于或者等于280*280')}
                    else{
                        axioIn.post('/setup/avatar-upload/',dataa,{headers: {'Content-Type': 'multipart/form-data'}})
                        .then((res)=>{this.site.avatar=res.data})
                        .catch((err)=>alert(err.data.error))
                    }
                };  
                image.src= data;  
            };  
                 
            }else{ 
                var image = new Image();   
                image.onload =()=>{  
                     var width = image.width;  
                     var height = image.height; 
                    if(width>280||height>280) {alert('图片小于或者等于280*280')}
                    else{
                        axioIn.post('/setup/avatar-upload/',dataa,{headers: {'Content-Type': 'multipart/form-data'}})
                        .then((res)=>{this.site.avatar=res.data})
                        .catch((err)=>alert(err.data.error))
                    }
                }} 
     
      },
      receive:function(){
          this.ite3.map(n=>{
              if(n.name===this.site.title){this.site.group_id=n.id}
          })
      },
      onImg:function(){
          if(this.site.avatar!=='')
             {this.show_img=true;}
      },
      close_img:function(){
          this.show_img=false
      },
      dele_img:function(){
          this.site.avatar='';
      },
      mouon:function(){
           if(this.site.avatar!=='')
             {this.img_=true;}
      },
      mouov:function(){
          this.img_=false;
      },
  }
  
}
</script>
<style lang='scss' scoped>
@import '../assets/home';
.supSetting{width: 100%;
    .ji{select{width:160px;height:32px;margin:0 10px;border-radius:5px;border:1px solid gray;}option{padding:5px;}}
    .afb{margin:10px;
    i{background:url(../assets/close.png) no-repeat;}}
    .cha{background:url(../assets/cha1.png) no-repeat center;}
    // .bian{background:url(../assets/bian1.png) no-repeat center;margin-right:20px;}
    // .dele{background:url(../assets/dele.png) no-repeat center;margin-left:10px;}
    .jzu{width:680px;position:absolute;top:10%;left:30%;z-index:15;border:1px solid gray;background-color:white;height:620px;overflow-y:scroll;
    p{margin:20px;text-align:left;position: relative;font-size:0;
    label{width:120px;text-align:right;margin-right:10px;display:inline-block;font-size:14px;}
    input,select{width:390px;height:32px;padding-left:10px;border-radius:5px;border:1px solid gray;}
    .img{display: inline-block;width:50px;height:50px;vertical-align:middle;margin-right:20px;text-align: center;}
    .img1{position: absolute;left:130px;opacity: 0;}
    .img2{border:1px dotted gray;border-radius: 5px;}
    option{padding:5px;}
    // .dele{display:inline-block;padding:0px 8px;background:url(../assets/dele.png) no-repeat center;position:relative;top:5px; }
    }
    }
    .fix_img{width:500px;height:500px;position: fixed;top:22%;left:31%;z-index:27;
    img{display: block;}
     i{background:url(../assets/img.png) no-repeat 2px 2px;width:25px;height:25px;
     position: absolute;top:0px;right:0px;background-color: white; }
    }
     .cloi{width:28px;height:19px;display:inline-block;background:url(../assets/close.png) no-repeat 6px 10px;}
    .upload{
            display:inline-block;width:66px;height:30px;line-height: 30px;text-align: center;background:#0386f0;color:#fff;border-radius:5px;position: relative;left:5px;cursor: pointer;}
    .imgg{background-color:gray;opacity: 0.8;position: absolute;left:210px;z-index:3;top:0;}
    .imgg1,.imgg2{width:15px;height:15px;display: inline-block;margin-top:18px;}
    .imgg1{background:url(../assets/yan.png) no-repeat center;}
    .imgg2{background:url(../assets/delete.png) no-repeat center;}
    .tip{width:150px;height:100px;position:fixed;top:35%;left:45%;z-index:22;border:1px solid gray;background-color:white;padding:20px;}
    .expon{    cursor: pointer;
        display:inline-block;padding-left:7px;height:24px;vertical-align:middle;line-height: 24px;border: 1px solid #d2d8db;background:#fafafa;border-radius:5px;font-size:12px;margin:5px 10px 5px 0;}
    .exp{padding-left:131px;width:410px;}

    .ji{height: 60px;line-height: 60px;margin: 0 0 15px;background: #ffffff;border-radius: 6px;overflow: hidden;
       .so{margin-left: calc(100% - 800px)}
    }
    .delete{margin-left: 10px;}
    .wid4 a:link {color: #666666;}
    .wid4 a:visited {color: #666666;}
    .wid4 a:hover{color: #666666;}
    .wid4 a:active {color: #666666;} 
}
</style>


