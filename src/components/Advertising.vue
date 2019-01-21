<template>
    <div class='single_'>
      <!-- <p class="qu">商城管理 > 广告位配置 > {{ti}}</p> -->
      <div class='cen'>
          <div style='width:625px;margin:0 auto;'>   
          <div>
             <p><label for="" class="Fl">选择位置</label>
             <select v-model="goods.ad_position"  style="width:470px;">
                 <option v-for="(item,index) in Position" :value="item.value" :key="index">{{item.label}}</option>
             </select>
             <em class='ii'>*</em>
             </p>
             <p><label for="" class="Fl">广告名称</label>
             <input v-model="goods.ad_name" /><em class='ii'>*</em>
             </p>
              <div @dragover="allowDrop($event)" @drop='drop1($event)'>
                  <p><label for="" class="Fl">图片上传</label></p>
              <p class='chao' v-show="goods.ad_image"  draggable='true' @dragstart='drag($event,index)' @drop="drop($event,index)">
                  <img :src="goods.ad_image" alt="">
                  <span>超链接</span>
                  <input type="text" v-model='goods.ad_image' readonly="readonly" />
                  <a href="javascript:void(0)" class="imgg3" @click='dele_img3()'></a><em class='ii'>*</em>
              </p>
                   <p style='margin-left:110px;'>
                  <span class="upload">
                    <img src="../assets/upload.png" alt="" /><span>上传</span>
                  </span>
                  <input type="file" class="img" style="position:absolute;left:0;opacity:0;" accept="image/jpeg,image/jpg,image/png" @change="upload3()"  ref="upload3"><em class='ii'>*</em>
              </p>
              </div>
                <p>
                <label for="" class="Fl">上下架日期</label>
                   <span class='time'>
                        <input @focus="showStart" v-model="goods.ad_put_recent_on" type="text" placeholder="Start date" readonly="true">~
                        <datee @mouseleave.native='hide()' v-if="date_start" v-on:incrementt="incrementTi1" class='dat da'></datee>
                        <input @focus="showEnd" v-model="goods.ad_put_off" type="text" placeholder="End date" readonly="true">
                        <datee @mouseleave.native='hide()' v-if="date_end" v-on:incrementt="incrementTi2" class='dat da'></datee>
                    </span><em class='ii'>*</em>
                </p>
          </div>
        
      
              <p class='bao zz' style='text-align:right'>
              <a href="javascript:void(0)" class='quu' @click='add1()'>取消</a>
              <a href="javascript:void(0)" class='qub' @click='bao()'>确定</a>
              
              </p>
       
  
        </div>
      </div>
      <div v-show='show_img' class='fix_img'><img :src="site" alt="" style='width:500px;height:500px;'><i @click='close_img()'></i> </div>
      <shade v-show='shad'></shade>
      <div v-show='tip' class='tip' style="top:20%;">
          <div v-show="insert">带<em class='ii'>*</em>为必填</div><div v-show="individual"><span>{{errorMessage}}</span></div>
          <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div>
    </div>
</template>
<script>
    import axioIn from '../store/axioIn';
    import Vue from 'vue'
    import Router from "../router/index";
    import Shade from './shade';
    import Datee from './date'
    export default {
        name:'single_',
        components:{Shade,Datee},
        data:function(){
            return{
                tip:false,
                date_end:false,
                date_start:false,
                individual:false,
                errorMessage:'',
                shad:false,
                ti:'',
                insert:false,
                img_:false,
                goods:{ad_name:'',ad_position:'',ad_image:'',ad_put_recent_on:'',ad_put_operator:'1',
                ad_put_off:'',},
                Position:[
              {
                label:'首页',
                value:0,
              },
              {
                label:'列表',
                value:1,
              },],
                deployWay:false,
                nodeShow:false,
                servShow:false,
                deploy_data:[],
                node_data:[],
                serv_data:[],
                qian:'',
                shang:'',
                tab:'',
                item3:'',
                item4:[],
                item5:[],
                kais:[],
                parent:[],
                goods_tag:[],
                site: {},
                show_img: false,
                jilu:[],
                jilu2:[],
                site:''
            }
        },
        mounted:function(){
            axioIn.get('/api/goods/parent/?parent_id=1')
                .then((res)=>{this.item4=res.data[0];//console.log(JSON.stringify(this.item4))
                })
                axioIn.get('api/goods/models_list/')
                .then((res)=>{this.item5=res.data})
            axioIn.get('/api/goods/pro_list/')
                .then((res)=>{this.deploy_data=res.data[0]})
    
            if(this.$route.query.id===undefined){this.ti='新增'}
             else{
                 this.ti='修改';
                 axioIn.get('/api/goods/advertising_manage/'+this.$route.query.id+'/')
                .then((res)=>{
                    console.log(res);
                    //Object.assign(this.jilu,res.data);console.log(JSON.stringify(this.jilu))
                    //this.jilu.goods_function=[1]
                    //[this.goods.goods_sn,this.goods.ad_name,this.goods.goods_model]=[res.data.goods_sn,res.data.ad_name,res.data.goods_model[0].model_name]
                    this.goods=res.data;
                    this.goods.goods_model=res.data.goods_model.id
                    this.goods.success_img.map(n=>{
                        Vue.set(n,'src',n.image)
                        Vue.set(n,'img_',false)
                    });
                    this.goods.introduce_img.map(n=>{
                        Vue.set(n,'src',n.image)
                        Vue.set(n,'img_',false)
                    });
             
      
                    this.item4.map(n=>{
                        if(n.id===res.data.parent){this.parent[0]=n.ad_name}
                    })
                    res.data.goods_selection.map(n=>{
                        this.kais.push(n.product+'/'+n.function_name+'/'+n.select_name)
                    })
                    
                    this.goods_tag=this.goods.goods_tag.map(n=>n.goods_tag);
            
                })
                 }
        },
        methods:{
    
      showEnd () {this.date_end = true},
      showStart () {this.date_start = true},
      hide () {this.date_start = false;this.date_end = false;},
      incrementTi1:function(a){
          this.goods.ad_put_recent_on=a;
          if(this.goods.ad_put_off!==''){
              if(new Date(this.goods.ad_put_off) < new Date(this.goods.ad_put_recent_on)){
                  alert('下架时间不能早于上架时间');
                  this.goods.ad_put_recent_on = '';
              }
          }
      },
      incrementTi2:function(a){
          this.goods.ad_put_off=a;
          if(this.goods.ad_put_recent_on!==''){
              if(new Date(this.goods.ad_put_off)< new Date(this.goods.ad_put_recent_on)){
                  alert('下架时间不能早于上架时间');
                  this.goods.ad_put_off = '';
              }
          }
      },

            Hhide(){
            },
            upload1:function(){//产品介绍
                this.upload(this.$refs.upload1,this.goods.introduce_img)
            },
            upload2:function(){//成功案例
                this.upload(this.$refs.upload2,this.goods.success_img)
            },
            upload3:function(){//商品详情
                this.upload(this.$refs.upload3,this.goods.ad_image)
            },
            upload:function(ac,acc){
                var input = ac;
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
                                if(width>1000||height>1000) {alert('图片小于或者等于1000*1000')}
                                else{
                                    axioIn.post('/setup/avatar-upload/',dataa,{headers: {'Content-Type': 'multipart/form-data'}})
                                    .then((res)=>{
                                        this.goods.ad_image=res.data;
                                       console.log(res.data);
                                        
                                        })
                                    .catch((err)=>console.log(err))
                                }
                            };  
                            image.src= data;  
                        };     
                    }else{ 
                        var image = new Image();   
                        image.onload =()=>{  
                            var width = image.width;  
                            var height = image.height; 
                            if(width>1000||height>1000) {alert('图片小于或者等于1000*1000')}
                            else{
                                axioIn.post('/setup/avatar-upload/',dataa,{headers: {'Content-Type': 'multipart/form-data'}})
                                .then((res)=>{acc.push({src:res.data,img_:false});})//this.site.avatar=res.data
                                .catch((err)=>console.log(err.data.error))
                            }
                        }
                    } 
     
            },
            exponent:function(){
                this.deployWay=false;this.nodeShow=false;this.servShow=false;
            },
            selct3:function(){
                if(this.parent.length===1){alert('只能选择一个前置商品');return}
                if(this.qian!=undefined){
                this.parent.push(this.qian)}
            },
            selct1:function(){
                if(this.shang!=undefined&&this.goods_tag.indexOf(this.shang)<0){//console.log(this.goods_tag.indexOf(this.shang)<0)
                    this.goods_tag.push(this.shang);
                    //this.goods_tag.map(n=>{
                        this.item3.map(v=>{
                            if(v.goods_tag===this.shang&&this.$route.query.id==undefined){this.goods.goods_tag.push(v.id)
                            
                            }
                            else if(v.goods_tag===this.shang){this.goods.goods_tag.push({id:v.id})}
                        })
                    //})
                }
            },
            
            mouon:function(item){
                if(item.img_!==undefined){
                    item.img_=true;
                }
            },
            mouov:function(item){
                item.img_=false;
            },
            onImg:function(index){
                this.site=index;
                if(this.site!==''){this.show_img=true;}
                //if(this.site.avatar!=='')
                     //{this.show_img=true;}
            },
            dele_img:function(index){
                let aa=confirm('确认删除？')
            
                if(aa===true){this.goods.introduce_img.splice(index,1)}
            },
            dele_img3:function(index){
                console.log(index);
                let aa=confirm('确认删除？')
                if(aa===true){this.goods.ad_image=""}
            },
            dele_img1:function(index){
                let aa=confirm('确认删除？')
                if(aa===true){
                this.goods.success_img.splice(index,1)}
            },
            dele_img2:function(index){
                this.kais.splice(index,1);
                this.goods.goods_selection.splice(index,1)
            },
            shang1:function(){
                axioIn.get('/api/goods/label_list/?label_category='+this.tab)
                .then((res)=>{this.item3=res.data.data;})
            },
            node_click: function(index,aa,bb){
                this.node_data.map(n=>n.a1 = false)
                this.serv_data.map(n=>n.a1 = false)
                this.node_data[index].a1 = true
                axioIn.get('/api/goods/selection/?function_id='+bb)
                    .then((res)=>{
                        this.serv_data = res.data
                        this.servShow = true
                    })
            },
            serv_click: function(index){
                //if(this.item.length>9){alert('最多添加10个指数');return}
                this.serv_data.map(n=>n.a1 = false)
                this.serv_data[index].a1 = true
                // this.deployWay = false
                // this.nodeShow = false
                // this.servShow = false
                var aa,bb,cc,deploy_id,node_id,service_id;
                this.deploy_data.map(n=>{if(n.a1===true){aa=n.product;deploy_id=n.id}})
                this.node_data.map(n=>{if(n.a1===true){bb=n.func_name;node_id=n.id}})
                this.serv_data.map(n=>{if(n.a1===true){cc=n.select_name;service_id=n.id}})
                if(aa!==undefined&&bb!==undefined&&cc!==undefined){
                    if(this.kais.indexOf(aa+'/'+bb+'/'+cc)<0){
                        this.kais.push(aa+'/'+bb+'/'+cc)
                        if(this.$route.query.id!==undefined){this.goods.goods_selection.push({id:service_id})}
                        else{
                        this.goods.goods_selection.push(/*node_id+'/'+/*/service_id) }
                    }else{
                        alert('不能添加重复的指数')
                    }
                    this.deploy_data.map(n=>n.a1 = false)
                }
            },
            deploy_click:function(index,aa,bb){
                this.deploy_data.map(n=>n.a1 = false)
                this.serv_data.map(n=>n.a1 = false)
                this.node_data.map(n=>n.a1 = false)
                this.deploy_data[index].a1 = true
                this.servShow = false
                axioIn.get('/api/goods/function/?goods_id='+bb)
                    .then((res)=>{
                        this.node_data = res.data
                        this.nodeShow = true
                    })
            },
            close_img:function(){
                this.show_img=false
            },
            delet_ex:function(index1){
                this.goods.goods_tag.splice(index1,1)
                this.goods_tag.splice(index1,1);this.shang='';
            },
            delet_ex1:function(index){
                this.parent.splice(0,1);this.qian='';this.goods.parent='';this.parent=[]
            },
            sshow:function(){
                this.deployWay=true;
            },
            bao:function(){
               var aa=false;
               //判断 必填项是否都填写
               for(let iff in this.goods){
                    if(this.goods[iff]===''){
                      this.tip=true;
                      this.insert=true;
                      this.shad=true;
                       return;
                      }        
        }
                   if(this.$route.query.id===undefined){
                   axioIn.post('/api/goods/advertising_manage/',this.goods)
                        .then((res)=>{
                            //this.shad=true;this.tip=true;this.insert=false;this.individual=true;this.errorMessage='新增成功';
                            alert('新增成功')
                            Router.push('./adsDeploy')
                        })
                        .catch(err=>alert(err.data.error))
                   }
                   else{//console.log(this.jilu)
                   var cc=Object.assign({},this.goods)
                   //if(this.jilu.length===0){this.jilu.goods_model=[{model_name:this.goods.goods_model}]}
                      // else{this.jilu[0].model_name=this.goods.goods_model;}
                       //cc.goods_model=this.jilu
                      // cc.goods_model[0].model_name=this.goods.goods_model;
                       //console.log(JSON.stringify(cc))
                       axioIn.put('/api/goods/advertising_manage/'+this.$route.query.id+'/',cc)
                        .then((res)=>{
                            //this.shad=true;this.tip=true;this.insert=false;this.individual=true;this.errorMessage='新增成功';
                            alert('修改成功')
                            Router.push({path: './adsDeploy',query: {flag: true}})
                        })
                        .catch(err=>alert(err.data.error))
                   }
               
          
            },
            tipp:function(){this.shad=false;this.tip=false;},
            add1:function(){Router.push({path: './adsDeploy',query: {flag: true}})},
            allowDrop:function(ev){
                ev.preventDefault();
            },
            drag:function(ev,index){
                ev.dataTransfer.setData("Text",index);
            },
            drop:function(ev,index){
                ev.preventDefault();
                var wei=ev.dataTransfer.getData("Text")
                var removee=this.goods.ad_image.splice(wei,1);
                this.goods.ad_image.splice(index,0,removee[0])
            },
            drop1:function(e){
                e.stopPropagation();
                e.preventDefault();
            },
            compare:function(property){
                return function(a,b){
                    let value1=a[property];
                    let value2=a[property];
                    return value1-value2
                }
            }
        },
        watch:{
            'goods.ad_name':function(val){
                if(val.length===25){
                    alert('商品名称最多只能输入25个字')
                }
            }
        }
  
    }
</script>
<style  lang='scss' scoped>
    .single_{
        .cen{width:100%;;background-color: #fff;text-align:center;margin-top:20px;
             height:600px;
             padding:20px 0;
            .Fl{float:left;line-height: 34px;}
            .time{display:inline-block;width:468px;height:34px;border:1px solid #d2d8db;border-radius:5px;
    input{width:150px;border:none;}}
            .upload{display:inline-block;width:66px;height:30px;line-height: 30px;text-align: center;background:#0386f0;color:#fff;border-radius:5px;position: relative;}
            p{position:relative;text-align:left;padding:0 0 20px 0;
            textarea{width:458px;border-radius: 5px;border:1px solid #d2d8db;resize:vertical;padding: 7px 5px;font-size: 14px;}
            label{width:90px;margin-right:20px;text-align:right;display:inline-block;font-size: 12px;line-height: 34px;height:34px;color:#666}
            input,select{width:458px;height:32px;padding-left:10px;border-radius:5px;border:1px solid #d2d8db;}
            .img{display: inline-block;width:50px;height:50px;vertical-align:middle;margin:0 20px 0 0px;text-align: center;position: relative;}
            .img1{position: absolute;left:110px;opacity: 0;}
            .img2{border:1px dotted gray;border-radius: 5px;}
            .imgg{background-color:gray;opacity: 0.8;position: absolute;left:0px;z-index:3;top:0;}
            .imgg1,.imgg2{width:15px;height:15px;display: inline-block;margin-top:18px;}
            .imgg1{background:url(../assets/yan.png) no-repeat center;}
            .imgg2{background:url(../assets/delete.png) no-repeat center;}
            .table{width:100px;height: 34px;border: 1px solid #d2d8db;border-radius: 5px;}
            .table1{width:352px;margin-left:10px;height: 34px;border: 1px solid #d2d8db;border-radius: 5px;}
            .expon{display:inline-block;padding-left:7px;height:24px;vertical-align:middle;line-height: 24px;border: 1px solid #d2d8db;background:#fafafa;border-radius:5px;font-size:12px;margin:5px 10px 5px 0;}
            
            
           .cloi{width:28px;height:19px;display:inline-block;background:url(../assets/close.png) no-repeat 6px 10px;}
        }
        .chao{border:1px solid #d2d8db;width:467px;margin-left:110px;vertical-align:middle;padding-bottom:8px;margin-bottom:10px;border-radius:5px;
        img{display: inline-block;width:50px;height: 50px;position: relative;margin:8px 0 0 9px;vertical-align:middle;border-radius:5px;}
        span{margin:10px;vertical-align:middle;}
        input{width:230px;vertical-align:middle;}
        .imgg3{background:url(../assets/dele.png) no-repeat center;width:15px;height:15px;display: inline-block;margin:18px 0 0 8px;}
        }
        .exp{padding-left:111px;width:410px;}
        .cc label{vertical-align: top}
        .deployWay,.node,.lefServ{background: #fff;min-width:120px;border:1px solid #ccc;height:180px;float: left;overflow-y: scroll;
            li{height:30px;line-height: 30px;padding:0 10px;cursor: pointer;}
            .pitch{background:#f0f0f0;}     
        }
        .deployWay{box-shadow: -3px 1px 5px #ccc;left:0;.deployFirst{border-bottom: 1px solid #ccc;}}
        .node{left:100px;.nodeFirst{border-bottom: 1px solid #ccc;}}
        .lefServ{left: 200px;.servFirst{border-bottom: 1px solid #ccc;}}
        .exponent{position: relative;;left:110px;z-index: 99;width:100%;top:-10px;}
        .imgg3{background:url(../assets/dele.png) no-repeat center;width:15px;height:15px;display: inline-block;margin:18px 0 0 8px;} 
        }
        .fix_img{width:500px;height:500px;position: fixed;top:22%;left:31%;z-index:10009;
            img{display: block;}
            i{background:url(../assets/img.png) no-repeat 2px 2px;width:25px;height:25px;
            position: absolute;top:0px;right:0px; 
              

            
            }
        }       
    }   
</style>




