<template>
    <div class='single_'>
      <p class="qu">商城管理 > 单件商品配置 > {{ti}}</p>
      <div class='cen'>
          <div style='width:662px;margin:0 auto;'>
          <p><label for="">单件商品编码</label><span >{{goods.goods_sn}}</span></p>
          <p><label for="">商品名称</label><input type="text" v-model="goods.goods_name" maxlength="25"><em class='ii'>*</em></p>
          <p><label for="">所属商品模块</label>
              <select name="" id="" style='width:471px;margin-left:-5px;'  v-model='goods.goods_model'>
                    <option :value="item.id" v-for='(item,index) in item5' :key="index + '_goods_model'" >{{item.model_name}}</option>
                </select>
          <!--input type="text" v-model="goods.goods_model" maxlength="16"--><em class='ii'>*</em></p>
          <p><label for="">商品介绍图片</label>
              <span class='img img2'>
                  <span style='font-size:22px;'>+</span><br/>
                  <span>上传</span>
              </span>
              <input type="file" class='img img1' accept="image/jpeg,image/jpg,image/png" @change="upload1()"  ref="upload1">
              <span @mouseover='mouon(item)' @mouseout='mouov(item)' class='img' v-for='(item,index) in goods.introduce_img' :key="index + '_img'" >
                  <img  :src="item.src" class='img imgv' alt="" >
                <span class='img imgg' v-show='item.img_'>
                    <a href="javascript:void(0)" class="imgg1" @click='onImg(item.src)'></a>
                    <a href="javascript:void(0)" class="imgg2" @click='dele_img()'></a>
                </span>
              </span>
              <em class='ii'>*</em>
          </p>
            
          <p class='cc'><label for="">商品简介</label><textarea name="" id="" maxlength="100" v-model="goods.goods_brief_introduction"></textarea><em class='ii'>*</em></p>
         
          <p><label  for="" style="margin-right:25px;">商品规格和参数</label>    <span class="upload" @click="add_product()">
                    <span  >添加</span>
                  </span><br/>
          <div v-for='(items,index) in product_config' class="product_config"  :key="items.name">
          <label  for="" style="margin-right:25px;"></label>
          <select class="" style="" v-model="items.model" @change="product_change(index,items,items.model)">
              <option v-for="(up,index) in items.product_select" :value="up.id" :key="index + '_model'">{{up.file_name}}</option>
          </select>
         <select class="param_control"  v-model="items.models" v-if="items.flag" >
              <option v-for="(it,index) in items.param_control" :value="it.id" :key="index + '_models'">{{it.param_options_name}}</option>
          </select>
          <input  type="text" class="" v-model="items.name" v-if="!items.flag"  placeholder="">
          <a href="javascript:void(0)" class="imgg3"  @click='dele_product(index)'></a>
                     <em class='ii'>*</em>
         </div>
            </p>
          <p class='cc' style="height:auto; "><label for="">商品详情页配置</label>
             <span id="editorElem" ></span><em class='ii'>*</em>
          </p>
          <div>
              <p style='margin-left:110px;'>
                  <span class="upload">
                    <img src="../assets/upload.png" alt="" /><span>上传</span>
                  </span>
                  <input type="file" class="img" style="position:absolute;left:0;opacity:0;" accept="image/jpeg,image/jpg,image/png" @change="upload3()"  ref="upload3"><em class='ii'>*</em>
              </p>
              <div @dragover="allowDrop($event)" @drop='drop1($event)'>
              <p class='chao' v-for='(it,index) in goods.detail_img' :key="index + '_src'" draggable='true' @dragstart='drag($event,index)' @drop="drop($event,index)">
                  <img :src="it.src" alt="">
                  <span>超链接</span>
                  <input type="text" v-model='it.src'>
                  <a href="javascript:void(0)" class="imgg3" @click='dele_img3(index)'></a><em class='ii'>*</em>
              </p>
              </div>
          </div>
          <p><label for="">成功案例</label>
              <span class='img img2'>
                  <span style='font-size:22px;'>+</span><br/>
                  <span>上传</span>
              </span>
              <input type="file" class='img img1' accept="image/jpeg,image/jpg,image/png" @change="upload2(upload2)"  ref="upload2">
              <span @mouseover='mouon(item)' @mouseout='mouov(item)' class='img' v-for='(item,index) in goods.success_img' :key="index + '_upload'" >
                        <img  class='img imgv' alt=""  :src="item.src">
                  <span class='img imgg' v-show='item.img_'>
                        <a href="javascript:void(0)" class="imgg1" @click='onImg(item.src)'></a>
                        <a href="javascript:void(0)" class="imgg2" @click='dele_img1(index)'></a>
                  </span>
               </span>
              <em class='ii'>*</em>
          </p>
          <p><label for="">商品标签</label>
              <select name="" id="" class='table' @change="shang1()" v-model='tab'>
                    <option value="3">产品类型</option>
                    <option value="1">行业</option>
                    <option value="2">客户案例</option>
                    <option value="5">咨询量/月</option>
                    <option value="4">客服规模</option>
                    <option value="6">机器人</option>
              </select>
              <select name="" id=""  class='table1' @change="selct1" v-model="shang">
                  <option :value="item.goods_tag" v-for='(item,index) in item3' :key="index  + '_shange'" >{{item.goods_tag}}</option>
              </select><em class='ii'>*</em>
           </p>
          <p class='exp'>
             <span v-for='(it,index) in goods_tag' :key="index + '_goodsTag'" class='expon'>{{it}}<em class='cloi' @click='delet_ex(index)'></em></span>
          </p>
          <div v-for='(itt,index_all) in kais' :key="index_all">
                <!-- <p>
                    <label for="">该商品功能开关</label>
                    <input type="text" readonly='true' placeholder="产品/功能开关/功能开关选项" v-model="kais[index]">
                    <a href="javascript:void(0)" class="imgg3" @click='dele_img2(index)'></a>
                    <a href="javascript:void(0)" class="add_func"></a>
                    <em class='ii'>*</em>
                </p> -->
                <!-- <p v-if='kais.length === 0'><label for="" style="margin-right:25px;">添加商品功能开关</label><input type="text" @click="sshow()"  placeholder="添加商品功能开关"><em class='ii'>*</em></p>                 -->
                <p><label v-show="!itt.iconShow" for="" style="margin-right:25px;">添加商品功能开关</label><label v-show="itt.iconShow" for="" style="margin-right:25px;"></label><input v-model="itt.name" type="text" readonly="readonly" @click="sshow(itt)"  placeholder="添加商品功能开关"><a href="javascript:void(0)" class="imgg3" v-show="itt.iconShow" @click='dele_img2(index_all)'></a>
                    <a href="javascript:void(0)" class="add_func" v-show="!itt.iconShow" @click="add_func"></a><em class='ii'>*</em></p>
                <div class="exponent clearFloat" @mouseleave="exponent()">
                        <ul class="deployWay" v-show="itt.deployWay">
                            <li class="deployFirst">产品</li>
                            <li v-for="(item,index) in deploy_data" :key="index + '_pro1'" :class='{pitch: item.a1}' @click="deploy_click(index,item.product,item.id,itt)">{{item.product}}</li>
                        </ul>
                        <ul class="node" v-show="itt.nodeShow">
                            <li class="nodeFirst">功能开关</li>
                            <li v-for="(item,index) in node_data" :key="index + '_pro2'" :class='{pitch: item.a1}' @click="node_click(index,item.func_name,item.id,itt)">{{item.func_name}}</li>
                        </ul>
                        <ul class="lefServ" v-show="itt.servShow">
                            <li class="servFirst">功能开关选项</li>
                            <li v-for="(item,index) in serv_data" :key="index + '_pro3'" :class='{pitch: item.a1}' @click="serv_click(index,index_all)">{{item.select_name}}</li>
                        </ul>
                </div>
          </div>
          <!--p class='bao zz' style='text-align:right'><a href="javascript:void(0)" class='qub' >添加功能开关</a></p-->
          <p><label for="">前提购买商品</label>
                <select name="" id="" style='width:466px' @change="selct3" v-model='qian'>
                    <option :value="item.goods_name" v-for='(item,index) in item4' :key="index + '_qian'" >{{item.goods_name}}</option>
                </select>
          </p>
          <p class='exp'>
             <span v-for='(it,index) in parent' :key="index + '_del'" class='expon'>{{it}}<em class='cloi' @click='delet_ex1(index)'></em></span>
          </p>
          
          <p class='bao zz' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='add1()'>取消</a>
              <a href="javascript:void(0)" class='qub' @click='bao()'>确定</a></p>
        </div>
      </div>
      <div v-show='show_img' class='fix_img'><img :src="site" alt="" style='width:500px;height:500px;'><i @click='close_img()'></i> </div>
      <shade v-show='shad'></shade>
      <div v-show='tip' class='tip'>
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
    import WangEditor from 'wangeditor'
    //let WangEditor=require('wangeditor/release/wangeditor')
    //import WangEditor from  'wangeditor';///release/wangEditor/release/wangEditor
    export default {
        name:'single_',
        components:{Shade},
        data:function(){
            return{
                tip:false,
                individual:false,
                errorMessage:'',
                shad:false,
                ti:'',
                insert:false,
                img_:false,
              
            
             
                goods:{goods_sn:'自动生成',goods_name:'',goods_model:'',
                introduce_img:[],success_img:[],detail_img:[],parent:'',
                goods_tag:[],goods_text:'',goods_selection:[],goods_price:'1'
                },
                _flag:false,
                editor:{},
               
                //item:['22w','33','22w','33','22w','33','22w','33','22w','33'],
                //item1:[],
               // imges:[{id:'',src:'123'}],
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
                kais:[{name: '',iconShow: false}],
                product_config:[{name:'',model:'',models:'',product_select:[],param_control:[],flag:false}],
                parent:[],
                goods_tag:[],
                site: {},
                show_img: false,
                jilu:[],
                jilu2:[],
                site:'',
                chilrden_product:'',
                ceshi:false,
            }
        },
        created(){
                
        },
        mounted:function(){
              axioIn.get('/api/goods/specification/').then(res=>{
                           
                this.product_config[0].product_select=res.data.results;
                                
                })
            axioIn.get('/api/goods/parent/?parent_id=1')
                .then((res)=>{this.item4=res.data[0];
                //console.log(JSON.stringify(this.item4))
                })
                axioIn.get('api/goods/models_list/')
                .then((res)=>{this.item5=res.data})
            axioIn.get('/api/goods/pro_list/')
                .then((res)=>{this.deploy_data=res.data[0]})
            this.editor = new WangEditor('#editorElem');
         
            //this.initEditorConfig();
         this.editor.customConfig.uploadImgServer = '/api/goods/get_editor/'
            this.editor.customConfig.uploadImgUrl = '/setup/avatar-upload/';
           this.editor.customConfig.uploadFileName = 'myFileName';
            this.editor.customConfig.uploadImgHeaders = {
              'Accept': 'text/x-json'}
            this.editor.customConfig.uploadImgHooks = {
            customInsert: function (insertImg, result, editor) {
                var url =result;
                insertImg(url);
            }
        }
            this.editor.customConfig.menus = [
               'head', 'bold',  'underline', 
               'strikeThrough', 'foreColor', 
               'link',  'justify', 'quote', 'emoticon', 
               'image',  'video'
            ];
            this.editor.create();

         
            if(this.$route.query.id===undefined){this.ti='新增'}
             else{
                 
                 this.ti='修改';
                 axioIn.get('/api/goods/singleproduct/'+this.$route.query.id+'/')
                .then((res)=>{
                    this.product_config=[];
                    //Object.assign(this.jilu,res.data);console.log(JSON.stringify(this.jilu))
                    //this.jilu.goods_function=[1]
                    //[this.goods.goods_sn,this.goods.goods_name,this.goods.goods_model]=[res.data.goods_sn,res.data.goods_name,res.data.goods_model[0].model_name]
                    this.goods=res.data;
                
                           axioIn.get('/api/goods/specification/').then(rel=>{
                             res.data.par_options.map((item,index)=>{
                              
                               this.product_config.push(
                          {name:'',model:'',models:'',product_select:[],param_control:[],flag:false}  
                        ) 
                               this.product_config[index].product_select=rel.data.results;
                               this.product_config[index].model=item.control_id
                               this.product_config[index].flag=item.control_type;
                               this.product_config[index].name=item.param_options_value

                                 axioIn.get('/api/goods/specification/'+item.control_id).then(ret=>{                                        
                                        this.product_config[index].param_control=ret.data.param_control;
                                        console.log(ret.data,'tttt');
                                        console.log(this.product_config[index].param_control,'hhhh')
                                        this.product_config[index].models=item.id;
                                })   
                           })
                       
                                  
                  })
                   
                    this.goods.goods_model=res.data.goods_model.id
                    this.goods.success_img.map(n=>{
                        Vue.set(n,'src',n.image)
                        Vue.set(n,'img_',false)
                    });
                    this.goods.introduce_img.map(n=>{
                        Vue.set(n,'src',n.image)
                        Vue.set(n,'img_',false)
                    });
                    this.goods.detail_img.map(n=>{
                        Vue.set(n,'src',n.image)
                        Vue.set(n,'img_',false)
                    });
                    this.goods.detail_img.sort(this.compare('weight'))
                    this.item4.map(n=>{
                        if(n.id===res.data.parent){this.parent[0]=n.goods_name}
                    })
                    this.kais = []
                    if(res.data.goods_selection.length!==0){
                        res.data.goods_selection.map(n=>{
                            this.kais.push({name: n.product+'/'+n.function_name+'/'+n.select_name})
                        })
                        if(this.kais.length!==0){
                            this.kais.map(n=>{n.iconShow = true;});this.kais[0].iconShow=false
                        }else{this.kais[0].iconShow=false}
                    }
                    this.editor.$textElem[0].innerHTML=this.goods.goods_text;
                    this.goods_tag=this.goods.goods_tag.map(n=>n.goods_tag);
                    //this.jilu=this.goods.goods_model;
                    //if(this.goods.goods_model.length!==0){
                    //this.goods.goods_model=this.goods.goods_model[0].model_name;}
                    //this.goods.goods_function=[1]
                    //this.item4.map(n=>{
                        //if(n.id===this.goods.parent){this.parent.push(n.goods_name)}
                    //})
                })
                 }
        },
        methods:{
            product_change(index,items,aa){
                  console.log(index,items,aa,'onchange')
                   axioIn.get('/api/goods/specification/'+items.model).then(res=>{
                          if(res.data.fill_control){
                         console.log(res);
                         items.param_control=res.data.param_control
                         this.$set(items,'flag',true)
                         console.log(items,'ok');
                         

                 }else{                
                         this.$set(items,'flag',false)
                         console.log(items,'no');
                 
            }
             
                })  
            }, 
         
            Hhide(){
                
                
            },
            add_func () {
                this.kais.push({name: '',iconShow: true})
            },
            add_product () {
                if(this.product_config.length<10){
                 this.product_config.push({model:'',name:'',models:'',product_select:[],param_control:[]});
                }
              
                
            },
            upload1:function(){//产品介绍
                this.upload(this.$refs.upload1,this.goods.introduce_img)
            },
            upload2:function(){//成功案例
                this.upload(this.$refs.upload2,this.goods.success_img)
            },
            upload3:function(){//商品详情
                this.upload(this.$refs.upload3,this.goods.detail_img)
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
                                if(width>2000||height>2000) {alert('图片小于或者等于2000*2000')}
                                else{
                                    axioIn.post('/setup/avatar-upload/',dataa,{headers: {'Content-Type': 'multipart/form-data'}})
                                    .then((res)=>{acc.push({src:res.data,img_:false});})//this.site.avatar=res.data;
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
                            if(width>2000||height>2000) {alert('图片小于或者等于2000*2000')}
                            else{
                                axioIn.post('/setup/avatar-upload/',dataa,{headers: {'Content-Type': 'multipart/form-data'}})
                                .then((res)=>{acc.push({src:res.data,img_:false});})//this.site.avatar=res.data
                                .catch((err)=>console.log(err.data.error))
                            }
                        }
                    } 
     
            },
            exponent:function(){
                this.kais.map(n=>this.$set(n,'deployWay',false))
                // this.deployWay=false;
                this.kais.map(n=>this.$set(n,'nodeShow',false))
                this.kais.map(n=>this.$set(n,'servShow',false))
                // this.nodeShow=false;this.servShow=false;
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
                let aa=confirm('确认删除？')
                if(aa===true){this.goods.detail_img.splice(index,1)}
            },
            dele_img1:function(index){
                let aa=confirm('确认删除？')
                if(aa===true){
                this.goods.success_img.splice(index,1)}
            },
            dele_img2:function(index){
                if(this.kais.length === 1){
                    alert('至少需要一个功能开关');return
                }
                this.kais.splice(index,1);
                this.goods.goods_selection.splice(index,1)
            },
            dele_product(item,index){
               
                    if(this.product_config.length === 1){
                    alert('至少需要一个产品规格和参数');return
                }
                this.product_config.splice(item,1);
                // this.goods.goods_selection.splice(index,1)
            },
            shang1:function(){
                axioIn.get('/api/goods/label_list/?label_category='+this.tab)
                .then((res)=>{this.item3=res.data.data;})
            },
            node_click: function(index,aa,bb,m){
                this.node_data.map(n=>n.a1 = false)
                this.serv_data.map(n=>n.a1 = false)
                this.node_data[index].a1 = true
                axioIn.get('/api/goods/selection/?function_id='+bb)
                    .then((res)=>{
                        this.serv_data = res.data
                        this.$set(m,'servShow',true)
                        // this.servShow = true
                    })
            },
            serv_click: function(index,m){
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
                let flag = false;
                if(aa!==undefined&&bb!==undefined&&cc!==undefined){
                    this.kais.map(n=>{
                        if(n.name === aa+'/'+bb+'/'+cc){
                            flag = true;
                        }
                    })
                    if(!flag){
                        this.kais[m].name = aa+'/'+bb+'/'+cc;
                        if(m === 0){this.kais[m].iconShow=false;}
                        else{this.kais[m].iconShow=true;}
                        // this.kais.push({name: aa+'/'+bb+'/'+cc})
                        if(this.$route.query.id!==undefined){this.goods.goods_selection.push({id:service_id})}
                        else{
                        this.goods.goods_selection.push(/*node_id+'/'+/*/service_id) }
                    }else{
                        alert('不能添加重复的指数')
                    }
                    this.deploy_data.map(n=>n.a1 = false)
                }
            },
            deploy_click:function(index,aa,bb,m){
                this.deploy_data.map(n=>n.a1 = false)
                this.serv_data.map(n=>n.a1 = false)
                this.node_data.map(n=>n.a1 = false)
                this.deploy_data[index].a1 = true
                // this.servShow = false
                this.kais.map(n=>this.$set(n,'servShow',false))
                this.kais.map(n=>this.$set(n,'nodeShow',false))
                axioIn.get('/api/goods/function/?goods_id='+bb)
                    .then((res)=>{
                        this.node_data = res.data
                        this.$set(m,'nodeShow',true)
                        // this.nodeShow = true
                    })
            },
            close_img:function(){
                this.show_img=false
            },
            delet_ex:function(index1){
                /*var aa,bb;
                this.item3.map(n=>{if(n.goods_tag===this.goods_tag[index1]){aa=n.id}})
                this.goods.goods_tag.map((v,index)=>{
                    if(v.goods_tag===aa){bb=index}
                })*/
                this.goods.goods_tag.splice(index1,1)
                this.goods_tag.splice(index1,1);this.shang='';
            },
            delet_ex1:function(index){
                this.parent.splice(0,1);this.qian='';this.goods.parent='';this.parent=[]
            },
            sshow:function(n){
                this.kais.map(n=>this.$set(n,'deployWay',false))
                this.$set(n,'deployWay',true)
                // this.deployWay=true;
            },
            bao:function(){
                //console.log(this.editor)
                var pdd=[];
        
                this.product_config.map(item=>{
                             if(item.flag){     
                            
                                pdd.push(item.models)
                             }else{
                      
                                pdd.push({id:item.model,value:item.name})
                             }
                           

                         })
                        
               var reg1 = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$")
               if(!reg1.test(this.goods.goods_name)){alert('商品名称必须为汉字，字母，数字');return}
               if(this.goods.introduce_img.length>5){alert('介绍图片不能超过5张');return}
                if(this.goods.introduce_img.length<1){alert('介绍图片不能少于1张');return}
               this.goods.goods_text=this.editor.$textElem[0].innerHTML;
               this.parent.map(n=>{
                   this.item4.map(v=>{
                       if(n===v.goods_name){this.goods.parent=v.id}
                   })
               })
               
               var aa=false;//console.log(JSON.stringify(this.editor.$textElem[0].innerText))
               for(let iff in this.goods){//console.log(iff)
                    if(iff!=='parent'&&this.goods[iff].length === 0){
                        aa=true
                    }
                //    if(iff!=='parent'&&iff!=='goods_function'&&(this.goods[iff]==='')){
                //        aa=true
                //        }
               }
                           
            this.product_config.map(item=>{
             if(item.flag){
                if(item.models===''){
                     aa=true;
                 }
             }else{
                 if(item.name===''){
                     aa=true;
                 }
             }
                 
                })
               if(this.editor.$textElem[0].innerHTML==='<p><br></p>'){
                   aa=true}
               if(aa===true){this.tip=true;this.individual=false;this.insert=true;this.shad=true;}
               else{
                   this.goods.detail_img.map((n,index)=>{n.weight=index})
                   if(this.$route.query.id===undefined){
                   //this.goods.goods_selection=this.kais;
                  
           
                   this.goods.par_options=pdd;
                   axioIn.post('/api/goods/singleproduct/',this.goods)
                        .then((res)=>{
                            //this.shad=true;this.tip=true;this.insert=false;this.individual=true;this.errorMessage='新增成功';
                            alert('新增成功')
                            this.product_config = [{name:'',model:'',models:'',product_select:[],param_control:[],flag:false}],
                            Router.push('./single_product')
                        })
                        .catch(err=>alert(err.data.error))
                   }
                   else{//console.log(this.jilu)
            
              
                 var cc=Object.assign({},this.goods)
                    cc.par_options=pdd;
                    cc.success_img.map(n=>{
                       n.image=n.src
                       delete n.src
                    });
                    cc.introduce_img.map(n=>{
                        n.image=n.src
                        delete n.src
                    });
                    cc.detail_img.map(n=>{
                        n.image=n.src
                        delete n.src
                    });
                   //if(this.jilu.length===0){this.jilu.goods_model=[{model_name:this.goods.goods_model}]}
                      // else{this.jilu[0].model_name=this.goods.goods_model;}
                       //cc.goods_model=this.jilu
                      // cc.goods_model[0].model_name=this.goods.goods_model;
                       //console.log(JSON.stringify(cc))
                       axioIn.put('/api/goods/singleproduct/'+this.$route.query.id+'/',cc)
                        .then((res)=>{
                            //this.shad=true;this.tip=true;this.insert=false;this.individual=true;this.errorMessage='新增成功';
                            alert('修改成功')
                            Router.push({path: './single_product',query:{flag: true}})
                        })
                        .catch(err=>alert(err.data.error))
                   }
                   }
               
               //console.log(JSON.stringify(this.goods))
            },
            tipp:function(){this.shad=false;this.tip=false;},
            add1:function(){Router.push(
                {path:'/single_product',query:{flag: true}})},
             
            allowDrop:function(ev){
                ev.preventDefault();
            },
            drag:function(ev,index){
                ev.dataTransfer.setData("Text",index);
            },
            drop:function(ev,index){
                ev.preventDefault();
                var wei=ev.dataTransfer.getData("Text")
                var removee=this.goods.detail_img.splice(wei,1);
                this.goods.detail_img.splice(index,0,removee[0])
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
        'product_config':function(res,ret){
            if(res.length>=1){
           let lili=res.length-1;
                axioIn.get('/api/goods/specification/').then(res=>{
                     this.product_config[lili].product_select=res.data.results;})
            }
        
      
        },
        }
  
    }
</script>
<style  lang='scss' scoped>
    .single_{
        .cen{width:100%;;background-color: #fff;text-align:center;margin-top:20px;
            .upload{display:inline-block;width:66px;height:30px;line-height: 30px;text-align: center;background:#0386f0;color:#fff;border-radius:5px;position: relative;}
            p{position:relative;text-align:left;padding:0 0 10px 0;
            textarea{width:458px;border-radius: 5px;border:1px solid #d2d8db;resize:vertical;padding: 7px 5px;font-size: 14px;}
            label{width:98px;margin-right:20px;text-align:right;display:inline-block;font-size: 12px;line-height: 34px;height:34px;color:#666}
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
        .add_func{background:url(../assets/add.png) no-repeat center;width:15px;height:15px;display: inline-block;margin:18px 0 0 8px;}
        }
        .fix_img{width:500px;height:500px;position: fixed;top:22%;left:31%;z-index:10009;
            img{display: block;}
            i{background:url(../assets/img.png) no-repeat 2px 2px;width:25px;height:25px;
            position: absolute;top:0px;right:0px; 
              

            
            }
        }    
   
          .product_config{
            text-align:left;
            .ii{
            position: relative;
            padding:18px 0 0 0;
             }
            }
        .product_config input,select{
          height:32px;
          margin-top:10px;
          margin-left:15px;
        }
        .product_config select{
            position: relative;
            width:100px;
            margin:10px 0 0 98px;
            
        }
        .product_config input{
     
            width:339px;
            position:relative;
        
        }
        .product_config .param_control{
            position: relative;
            width:340px;
           margin: 0 0 0 16px;
        }
    
       
 
    }   
</style>
<style  lang='scss'>

 #editorElem{display:inline-block;width:470px;border-radius:5px;margin-left:-4px;z-index:12;

         .w-e-toolbar{border-top-left-radius: 5px;border-top-right-radius: 5px;border:1px solid black;}
         .w-e-text-container{height: 480px!important;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;border:1px solid black;z-index:12}
         }
</style>



