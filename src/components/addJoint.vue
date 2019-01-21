/*
 * @Author: liuqian 
 * @Date: 2018-01-30 10:40:02 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-07-19 13:21:31
 */
<template>
    <div class="addJoint">
        <div class="serviceTitle"><span class="titleDefault">商城管理</span>
        <span class="titleCarry"> > </span><span class="titleDefault">组合商品配置</span>
        <span class="titleCarry"> > </span><span calss="titlePitch">{{ti}}</span></div>
        <div class='revise'>
            <div class="inContent">
               <p><label for="">添加单件商品</label>
                    <a class="singleGoods" href="javascript:void(0)" @click="addsingleton">添加单件商品</a>
                    <div class="allSingle">
                        <div class="singleList">
                            <div class="title">
                                <span class="c1">单件商品编码</span>
                                <span class="c1">所属商品模块</span>
                                <span class="c1">商品名称</span>
                                <span class="c1">操作</span>
                            </div>
                            <ul>
                                <li v-for="(item,index) in goods.s_goods" v-if="showList(index)" :key="index">
                                    <span class="c1">{{item.goods_sn}}</span>
                                    <span class="c1">{{item.goods_model}}</span>
                                    <span class="c1">{{item.goods_name}}</span>
                                    <span @click="delete_info(item.id)"><img style="margin:0 0 10px 10px;" src="../assets/dele.png" alt="" /></span>
                                </li>
                            </ul> 
                        </div>
                        <pagination :number='page' v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
                    </div>
                </p>
                <p><label for="">组合商品编码</label><span class="jointCode">{{goods.m_goods_sn}}</span></p>
                <p class='serAdd'><label for="">商品名称</label><input type="text" maxlength="25" v-model="goods.m_goods_name"></p>
                <p class='serAdd'>
                    <label for="">商品介绍图片</label>
                    <span class='img img2'>
                        <span style='font-size:22px;'>+</span><br/>
                        <span>上传</span>
                    </span>
                    <input type="file" class='img img1' accept="image/jpeg,image/jpg,image/png" @change="upload1()"  ref="upload1">
                    <span @mouseover='mouon(item)' @mouseout='mouov(item)' class='img' v-for='(item,index) in goods.m_in_goods' :key="index">
                        <img  :src="item.src" class='img imgv' alt="" >
                        <span class='img imgg' v-show='item.img_'>
                            <a href="javascript:void(0)" class="imgg1" @click='onImg(item.src)'></a>
                            <a href="javascript:void(0)" class="imgg2" @click='dele_img()'></a>
                        </span>
                    </span>
                    <em class='ii'>*</em>
                </p>
                <p><label for="" style="vertical-align:top;">商品简介</label><textarea maxlength="100" name="" id="" v-model="goods.m_goods_brief_introduction"></textarea><em class='ii'>*</em></p>
                 <p><label  for="" style="margin-right:25px;">商品规格和参数</label>    <span class="upload" @click="add_product()">
                    <span  >添加</span>
                  </span><br/>
          <div v-for='(items,index) in product_config' class="product_config pdd_config"  :key="index">
          <label  for="" style="margin-right:20px;"></label>
          <select class="" style="" v-model="items.model" @change="product_change(index,items,items.model)">
              <option v-for="(up,index) in items.product_select" :value="up.id" :key="index">{{up.file_name}}</option>
          </select>
         <select class="param_control" style="width:325px;margin:0 0 0 30px;" v-model="items.models" v-if="items.flag" >
              <option v-for="(it,index) in items.param_control"  :value="it.id" :key="index">{{it.param_options_name}}</option>
          </select>
          <input  type="text" style="width:315px;margin:0 0 0 30px;" class="" v-model="items.name" v-if="!items.flag"  placeholder="">
          <a href="javascript:void(0)" class="imgg4"  @click='dele_product(index)'></a>
            <em class='ii'>*</em>
        
         </div>
            </p>
           
                <p class='cc'><label for="">商品详情页配置</label><span id="editorElem" ></span><em class='ii'>*</em></p>
                <div>
                    <p style='margin-left:120px;'>
                        <span class="upload">
                            <img src="../assets/upload.png" alt="" /><span>上传</span>
                        </span>
                        <input type="file" class="img" style="position:absolute;left:0;opacity:0;" accept="image/jpeg,image/jpg,image/png" @change="upload3()"  ref="upload3"><em class='ii'>*</em>
                    </p>
                    <p class='chao' v-for='(it,index) in goods.m_de_goods' :key='it.id'>
                        <img :src="it.src" alt="">
                        <span>超链接</span>
                        <input type="text" v-model='it.src'>
                        <a href="javascript:void(0)" class="imgg3" @click='dele_img3(index)'></a><em class='ii'>*</em>
                    </p>
                </div>
                <p class='serAdd'>
                    <label for="">成功案例</label>
                    <span class='img img2'>
                        <span style='font-size:22px;'>+</span><br/>
                        <span>上传</span>
                    </span>
                    <input type="file" class='img img1' accept="image/jpeg,image/jpg,image/png" @change="upload2()"  ref="upload2">
                    <span @mouseover='mouon(item)' @mouseout='mouov(item)' class='img' v-for='(item,index) in goods.m_su_goods' :key="index">
                        <img  class='img imgv' alt="" :src="item.src">
                    <span class='img imgg' v-show='item.img_'>
                        <a href="javascript:void(0)" class="imgg1" @click='onImg1(item.src)'></a>
                        <a href="javascript:void(0)" class="imgg2" @click='dele_img1(index)'></a>
                    </span></span>
                    <em class='ii'>*</em>
                </p>
                <p class='serAdd'>
                    <label for="">商品标签</label>
                    <select name="" id="" class="labelSort" @change="shang1()" v-model='tab'>
                        <option value="1">行业</option>
                        <option value="2">客户案例</option>
                        <option value="3">产品类型</option>
                        <option value="4">客服规模</option>
                        <option value="5">咨询量/月</option>
                        <option value="6">机器人</option>
                    </select>
                    <select name="" id="" class="labelName" @change="selct1" v-model="shang">
                        <option :value="item.goods_tag" v-for='item in item3' :key='item.id'>{{item.goods_tag}}</option>
                    </select><em class='ii'>*</em>
                </p>
                    <p class='exp'>
             <span v-for='(it,index) in goods_tag'  class='expon' :key="index">{{it}}<em class='cloi' @click='delet_ex(index)'></em></span>
          </p>
                    <!--p class="goodsTab">
                        <span>B2B<img src="../assets/close.png" /></span>
                        <span>B2B<img src="../assets/close.png" /></span>
                    </p-->
                </p>
            </div>
            <p class='bao'><a href="javascript:void(0)" class='quu'  @click="waive">取消</a><a href="javascript:void(0)" class='qub' @click="save_info" >保存</a></p>
        </div>
        <div class="newTrade" v-show="editMessage">
          <div class="describe">
              <!-- <span class="title">{{editType}}</span><i class="close" @click="closeDialog"></i> -->
          </div>
          <div class="fillContent">
              <div class="tradeContent" style="margin-bottom:12px;">
                <label for="">单件商品名称</label>
                <input class="single" type="text" readonly="readonly" @click="addressShow()" v-model="pitchSingle" /><em class="icon"></em>
                <div class="serviceAddress" v-show="singshow" @mouseleave="addressHide()">
                    <div class="search"><input type="text" v-model="definiteSear" /><img style="margin-left:-30px;cursor:pointer;" src="../assets/cha1.png" alt="" @click="search_address()"></div>
                    <div class="choose">请选择</div>
                    <ul>
                        <li v-for='item in singleton_data' :key='item.id' @click="chooseAdd(item)">{{item.goods_name}}</li>
                    </ul>
                    <pagination :number='pageCount' v-on:increment="incrementTotal2" :page-index='pagePresent'></pagination>                    
                </div>
                <!-- <select name="" id="" v-model="singId">
                    <option v-for="item in singleton_data" :value="item.id">{{item.goods_name}}</option>
                </select> -->
              </div>
          </div>
          
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click='closeDialog()'>取消</a>
              <a href="javascript:void(0)" class="save" @click='bao(singId)'>保存</a>
          </div>
        </div>
        <div v-show='show_img' class='fix_img'><img :src="site" alt="" style='width:500px;height:500px;'><i @click='close_img()'></i> </div>
        <shade v-show='shad'></shade>
        <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填    
          <p class='bao' style='text-align:center;margin:20px 0'><a href="javascript:void(0)" class='qub' @click="tipp()" >确定</a></p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Vue from 'vue';
import Shade from './shade';
import axioIn from '../store/axioIn';
import Pagination from './pageDevice';
import Router from "../router/index";
import WangEditor from 'wangeditor'
axioIn.defaults.headers['Content-Type'] = 'application/json';
//let WangEditor=require('wangeditor/release/wangeditor')
//import WangEditor from  'wangeditor';///release/wangEditor..../node_modules/
export default {
  name: 'addJoint',
  components: {Shade,Pagination},
  data: function(){
    return {
        shade: false,
        pageIndex: 1,//当前页
        rowNum: '',
        page: '',
        quantity: 5,
        shad: false,
        tip:false,
        editType: '新增',
        date_start: false,
        date_end: false,
        ti:'',
        editMessage: false,
        singId: '',
        singleton_data: [],
        sing_list: [],
        joint_data: {},
        save_id: [],
        goods_label: '',
        label_count: [],
        goods:{m_goods_sn:'自动生成',m_goods_name:'',m_goods_attribute: '组合商品',
                m_in_goods:[],m_su_goods:[],m_de_goods:[],m_goods_brief_introduction: '',
                m_goods_tag:[],m_goods_details_edit:'',m_goods_price:1,s_goods: [],parameter_id:[],
                },
        qian:'',
        shang:'',
        tab:'',
        item3:'',
        goods_tag:[],
        show_img: false,
        site: {},
        singshow: false,
        definiteSear: '',
        pageCount: '',
        pagePresent: '',
        pitchSingle: '',
        product_config:[{name:'',model:'',models:'',product_select:[],param_control:[],flag:false}],
        
        
    }
  },
  mounted:function(){
 
            axioIn.get('/api/goods/specification/').then(res=>{
                           
            this.product_config[0].product_select=res.data.results;})
            axioIn.get('/api/goods/single_multiple/').then(res=>{
                this.singleton_data = res.data.results;
                this.pageCount=res.data.page_num.total_page;
                this.pagePresent = 1;
            })
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
            if(this.$route.query.id===undefined){this.ti='新增';this.page = '';}
             else{
                   this.product_config=[];
                 this.ti='修改';
                  axioIn.get('/api/goods/multipleprodut/'+this.$route.query.id)
                    .then((res)=>{
                        this.goods = res.data;
                        res.data.s_goods.map(res=>{
                            this.save_id.push(res.id)
                        })
                        res.data.m_goods_tag.map(res=>{
                            this.goods_tag.push(res.goods_tag);
                        })
                     
           
            
                    axioIn.get('/api/goods/specification/').then(rel=>{
                           res.data.multiple_par_options.map((item,index)=>{
                              
                               this.product_config.push(
                          {name:'',model:'',models:'',product_select:[],param_control:[],flag:false}  
                        )
                               this.product_config[index].product_select=rel.data.results;
                               this.product_config[index].model=item.control_id
                               this.product_config[index].flag=item.control_type;
                               this.product_config[index].name=item.param_options_value

                            axioIn.get('/api/goods/specification/'+item.control_id).then(ret=>{                                        
                                        this.product_config[index].param_control=ret.data.param_control;
                                        this.product_config[index].models=item.id;
                                })    
                      
                               
                           })
                                  
                  })
                        // res.data.m_goods_tag.map(n=>{
                        //     this.goods.m_goods_tag.push(n.id)
                        // })
                        // console.log(this.goods.m_goods_tag)
                        // this.goods.m_goods_tag = 
                        // axioIn.get('/api/goods/goods_deployway/?label_category='+this.tab).then((res)=>{this.item3=res.data.data;})
                        this.editor.$textElem[0].innerHTML=res.data.m_goods_details_edit;
                        this.goods.m_de_goods.map(n=>{
                            Vue.set(n,'src',n.image)
                            Vue.set(n,'img_',false)
                        });
                        this.goods.m_in_goods.map(n=>{
                            Vue.set(n,'src',n.image)
                            Vue.set(n,'img_',false)
                        });
                        this.goods.m_su_goods.map(n=>{
                            Vue.set(n,'src',n.image)
                            Vue.set(n,'img_',false)
                        });
                        if(this.goods.s_goods.length%this.quantity){
                            this.page = parseInt(this.goods.s_goods.length/this.quantity)+1
                        }else{
                            this.page = parseInt(this.goods.s_goods.length/this.quantity)
                        }
                    })
             }
        },
  methods: {

        dele_product(item,index){
               
                    if(this.product_config.length === 1){
                    alert('至少需要一个产品规格和参数');return
                }
                this.product_config.splice(item,1);
                // this.goods.goods_selection.splice(index,1)
            },
        product_change(index,items,aa){
              
                   axioIn.get('/api/goods/specification/'+aa).then(res=>{
                          if(res.data.fill_control){
                         items.param_control=res.data.param_control
                         this.$set(items,'flag',true)
                         console.log(items,'ok');

                 }else{                
                         this.$set(items,'flag',false)
                         console.log(items,'no');
                 
            }
             
                })  
            }, 
       add_product () {
                if(this.product_config.length<10){
                 this.product_config.push({model:'',name:'',models:'',product_select:[],param_control:[]});
                }
              
                
            },
      addressHide () {
          this.singshow = false;
      },
      search_address () {
          axioIn.get('/api/goods/single_multiple/?goods_name='+this.definiteSear).then(res=>{
            this.singleton_data = res.data.results;
            this.pageCount=res.data.page_num.total_page;
            this.pagePresent = 1;
          })
      },
      chooseAdd (item) {
          this.pitchSingle = item.goods_name;
          this.singId = item.id;
      },
      addressShow () {
          
          this.singshow = true;
          this.definiteSear = '';
          axioIn.get('/api/goods/single_multiple/').then(res=>{
            this.singleton_data = res.data.results;
            this.pageCount=res.data.page_num.total_page;
            this.pagePresent = 1;
          })
      },
      bao (id) {
          let recored_id = '';
          this.save_id.push(id)
          this.save_id.map(n=>{
              if(recored_id.length === 0){recored_id = 'id='+n}
              else{recored_id += '&id='+n}
          })
          axioIn.get('/api/goods/member_list/?'+recored_id).then(res=>{
            
            this.goods.s_goods = res.data;
            this.editMessage = false;
            this.shad = false;
            if(this.goods.s_goods.length%this.quantity){
                this.page = parseInt(this.goods.s_goods.length/this.quantity)+1
            }else{
                this.page = parseInt(this.goods.s_goods.length/this.quantity)
            }
          })
      },
      showList (index) {
          let num = this.pageIndex || 1;
          return index >= this.quantity*(num-1) && index<this.quantity*num;
      },
      save_info () {
            var pdd=[];
            this.product_config.map(item=>{
            if(item.flag){     
            pdd.push(item.models)
                           
            }else{
                             
                           
            pdd.push({id:item.model,value:item.name})
                            
            }
             })
                         
      
        // console.log(JSON.stringify(this.goods.s_goods),1)
        // console.log(JSON.stringify(this.save_id),2)
        // this.goods.m_goods_tag = this.goods_tag
        /*if(this.item3 !== ''){
            this.goods_tag.map(n=>{
                this.item3.map(v=>{
                    //if(v.goods_tag===n){this.goods.m_goods_tag.push(v.id)}
                })
            })
        } */     
        let reg = /^[a-zA-Z\u4e00-\u9fa5\d]+$/;
        if(this.goods.m_goods_name !== ''){
            if(this.goods.m_goods_name.length > 25){
                alert('输入框最多只能输入25个字');return
            }else {
                if(!reg.test(this.goods.m_goods_name)){
                    alert('输入框内只能输入汉字，英文字母，数字');return
                }
            }
        }
        var aa=false;var flag = false;
        if(this.editor.$textElem[0].innerHTML==='<p><br></p>'){aa=true;}
        this.goods.m_goods_details_edit=this.editor.$textElem[0].innerHTML;
        for(let iff in this.goods){
            console.log(this.goods[iff])
            if(this.goods[iff]===''){aa=true;}
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
        if(aa===true){this.tip=true;this.individual=false;this.insert=true;this.shad=true;}
        else{
       
        this.goods.s_goods = this.save_id;
            if(this.ti === '新增'){

                 this.goods.multiple_par_options=pdd;
                axioIn.post('/api/goods/multipleprodut/',this.goods)
                .then((res)=>{
                    
                    this.shad=true;this.tip=true;this.insert=false;this.individual=true;this.errorMessage='新增成功';
                    alert('保存成功');
                    Router.push('./goodsJoint')
                })
                .catch(err=>console.log(err))
            }else if(this.ti === '修改'){ 
                var cc=Object.assign({},this.goods)
                     cc.multiple_par_options=pdd;
                 cc.m_de_goods.map((n,index)=>{
                       n.image=n.src;
                       n.weight=index;
                       delete n.src
                    });
                    cc.m_in_goods.map(n=>{
                        n.image=n.src
                        delete n.src
                    });
                    cc.m_su_goods.map(n=>{
                        n.image=n.src
                        delete n.src
                    });
             
               
        
                axioIn.put('/api/goods/multipleprodut/'+this.$route.query.id+'/',cc).then((res)=>{
                    
                    this.shad=true;this.tip=true;
                    this.insert=false;
                    this.individual=true;
                    this.errorMessage='修改成功';
                    alert("修改成功")
                    
                    Router.push({path: './goodsJoint',query: {flag: true}})
                })
                .catch(err=>console.log(err))
            }
            
        }
      },
      delete_info (id) {
          if(confirm('确定删除吗？')){
            let recored_id = '';
            this.save_id.map((n,index)=>{
                if(n === id){
                    this.save_id.splice(index,1);
                }
            })
            this.save_id.map(n=>{
                if(recored_id.length === 0){recored_id = '?id='+n}
                else{recored_id += '&id='+n}
            })
            axioIn.get('/api/goods/member_list/'+recored_id).then(res=>{
                this.goods.s_goods = res.data;
                this.editMessage = false;this.shad = false;
            })
          }
      },
      choose_label (id) {
          axioIn.get('/api/goods/label_list/?label_category='+id).then(res=>{
              this.label_count = res.data.data;
          })
      },
      addsingleton () {
          this.editMessage = true;this.shad = true;this.singId = '';this.pitchSingle = '';
      },
      closeDialog () {this.editMessage = false;this.shad = false},
      incrementTotal (q) {
          this.pageIndex = q
      },
      incrementTotal2 (num) {
          axioIn.get('/api/goods/single_multiple/?page='+num).then(res=>{
            this.singleton_data = res.data.results;
            this.pageCount=res.data.page_num.total_page;
          })
      },
      upload1:function(){//产品介绍
                this.upload(this.$refs.upload1,this.goods.m_in_goods,'产品介绍')
       },
      upload2:function(){//成功案例
                this.upload(this.$refs.upload2,this.goods.m_su_goods,'成功案例')
       },
       upload3:function(){//商品详情
                this.upload(this.$refs.upload3,this.goods.m_de_goods,'商品详情')
            },
        upload:function(ac,acc,title){
            if(title === '产品介绍'&&acc.length === 5){alert('最多只能上传5张图片');return;}
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
                                .then((res)=>{acc.push({src:res.data,img_:false});this.site.avatar=res.data})
                                .catch((err)=>alert(err.data.error));
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
                            .then((res)=>{acc.push({src:res.data,img_:false});this.site.avatar=res.data})
                            .catch((err)=>alert(err.data.error))
                        }
                    }
                } 
    
        },
      selct1:function(){
                if(this.shang!=undefined&&this.goods_tag.indexOf(this.shang)<0){//console.log(this.goods_tag.indexOf(this.shang)<0)
                    this.goods_tag.push(this.shang);
                    //this.goods_tag.map(n=>{
                        this.item3.map(v=>{
                            if(v.goods_tag===this.shang&&this.$route.query.id==undefined){this.goods.m_goods_tag.push(v.id)
                            
                            }
                            else if(v.goods_tag===this.shang){this.goods.m_goods_tag.push({id:v.id})}
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
       close_img:function(){
            this.show_img=false
        },
       onImg:function(imgSrc){
           this.site=imgSrc;
           if(this.site.avatar!==''){this.show_img=true;}
                //if(this.site.avatar!=='')
                     //{this.show_img=true;}
        },
       onImg1:function(imgSrc){
           this.site=imgSrc;
           if(this.site.avatar!==''){this.show_img=true;}
                //if(this.site.avatar!=='')
                     //{this.show_img=true;}
        },
       dele_img1:function(index){
                let aa=confirm('确认删除？')
                if(aa===true){
                this.goods.m_su_goods.splice(index,1)}
        },
       dele_img:function(index){
                let aa=confirm('确认删除？')
                if(aa===true){this.goods.m_in_goods.splice(index,1)}
            },
        dele_img3:function(index){
     
                let aa=confirm('确认删除？')
               
                if(aa===true){this.goods.m_de_goods.splice(index,1)}
            },
       shang1:function(){
                axioIn.get('/api/goods/label_list/?label_category='+this.tab)
                .then((res)=>{this.item3=res.data.data;})
         },
       delet_ex:function(index){
                this.goods_tag.splice(index,1);this.shang='';
            },
       delet_ex1:function(index){
                this.goods.parent.splice(index,1);this.qian='';
            },
        tipp:function(){this.shad=false;this.tip=false;},
        waive () {Router.push({path: './goodsJoint',query: {flag: true}})}
  },
  computed:{
        Product_config() {
         return this.product_config
  }
  },
  watch:{
        Product_config(res){
                if(res.length>=1){
                let lili=res.length-1;
                axioIn.get('/api/goods/specification/').then(res=>{
                     this.product_config[lili].product_select=res.data.results;})
            }
               

    
      
        },
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/home';
.addJoint{width:90%;margin:auto;background:#edf2f5;
    .upload{display:inline-block;width:66px;height:30px;line-height: 30px;text-align: center;background:#0386f0;color:#fff;border-radius:5px;position: relative;}
    .c1{width:108px;margin-left:6px;}
    .titleDefault{color:#999999;}.titleCarry{color: #cccccc;}.titlePitch{color: #515c6e}
    .serviceTitle{width:100%;height:36px;line-height: 36px;background:#fff;margin:15px 0;}
    .revise{width:100%;background-color:white;
    .bao{margin:0;text-align:right;height:72px;border-top:1px solid #eee;}
    input:focus{border: 1px solid red;}
    .inContent{width:625px;margin: 0 auto;padding-top:9px;
        .img{display: inline-block;width:50px;height:50px;vertical-align:middle;margin-right:20px;text-align: center;position: relative}
        .img1{position: absolute;left:110px;opacity: 0;}
        .img2{border:1px dotted gray;border-radius: 5px;}
        .imgg{background-color:gray;opacity: 0.8;position: absolute;left:0px;z-index:3;top:0;}
        .imgg1,.imgg2{width:15px;height:15px;display: inline-block;margin-top:18px;}
        .imgg1{background:url(../assets/yan.png) no-repeat center;}
        .imgg2{background:url(../assets/delete.png) no-repeat center;}
    .goodsTab{margin-left:123px;font-size:0;
    span{display:inline-block;padding-left:7px;height:24px;line-height: 24px;border: 1px solid #d2d8db;background:#fafafa;border-radius:5px;font-size:12px;margin-right:10px;}
    img{margin:0 10px;}}
    .singleGoods{display:inline-block;width:90px;height:32px;line-height:32px;margin-left:-4px;text-align:center;color:#fff;border-radius:5px;font-size: 12px;background:#0386f0;}
    .jointCode{color: #ccc;}
    .commodify{span{margin: 0 30px 0 10px;}}
    .labelSort{width:100px;margin-right: 10px;}
    .labelName{width:360px;}
    .allSingle{margin-left:124px;width:470px;
        .singleList{width:468px;height:224px;border:1px solid #d2d8db;border-radius:3px;text-align:left;border-radius:3px;margin-bottom:10px;
            .title{height:42px;line-height: 42px;background:#fafafa;color:#999;font-size: 12px;border-bottom:1px solid #d2d8db;}
            ul li{height:35px;line-height: 35px;border-bottom:1px solid #d2d8db;color:#666;font-size: 12px;}
        }
    }
    textarea{width:464px;height:90px;border: 1px solid #d2d8db;border-radius:6px;word-break: break-all;resize: none;}}
    .bao{
        a{display: inline-block;width: 58px;height:30px;text-align: center;line-height: 30px;border: 1px solid gray;border-radius: 5px;padding:0;margin:0;}
        .qub{margin:20px 20px 20px 10px;}
    }
    .serAdd{text-align:left;font-size:0;position: relative;
        a{display:inline-block;width:20px;height:20px;padding:0;vertical-align:middle;}
        .addAddress{background:url(../assets/add.png) no-repeat;margin:0 10px;}
        .addAddress:active{background: url(../assets/add1.png) no-repeat;}
        .addIp{background:url(../assets/ip.png) no-repeat;margin:0 10px;}
        .addIp:active{background: url(../assets/ip1.png) no-repeat;}
        .quu{background:url(../assets/dele.png) no-repeat;margin-top: 4px;}
    }
    .clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
    p{margin:14px;text-align:left;position: relative;
    label{width:90px;text-align:right;margin-right:20px;display:inline-block;font-size: 12px;color:#666;}}
    input[type="text"]{width:458px;height:30px;padding-left:10px;border-radius:5px;border:1px solid #d2d8db;}
    textarea{width:402px;height:32px;}
    select{height:32px;border-radius:5px;border:1px solid #d2d8db;
    }
    .exp{padding-left:111px;width:410px;}
    .cloi{width:28px;height:19px;display:inline-block;background:url(../assets/close.png) no-repeat 6px 10px;}
    .expon{display:inline-block;padding-left:7px;height:24px;vertical-align:middle;line-height: 24px;border: 1px solid #d2d8db;background:#fafafa;border-radius:5px;font-size:12px;margin:5px 10px 5px 0;}
    .chao{border:1px solid #d2d8db;width:467px;margin-left:124px;vertical-align:middle;padding-bottom:8px;margin-bottom:10px;border-radius:5px;
        img{display: inline-block;width:50px;height: 50px;position: relative;margin:8px 0 0 9px;vertical-align:middle;border-radius:5px;}
        span{margin:10px;vertical-align:middle;}
        input{width:230px;vertical-align:middle;}
        .imgg3{background:url(../assets/dele.png) no-repeat center;width:15px;height:15px;display: inline-block;margin:18px 0 0 8px;}
        }
    option{height:26px;display:block;padding-top:5px;}}
    
    .cc label{vertical-align: top}
    .newTrade{position: absolute;top:20%;left:30%;z-index:30;width:540px;height:212px;background:#fff;border-radius:5px;
        .describe{height:44px;line-height:44px;
            .title{float:left;margin-left:22px;color:#666;}
            .close{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
        }
        .fillContent{padding:18px 0 20px 0;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9;
            .tradeContent{text-align: left;font-size:0;position: relative;
                span,label{display:inline-block;color:#666;font-size:12px;width:118px;text-align:right;margin:0 20px;}
                input,select{width:342px;height:30px;outline:none;border:1px solid #d2d8db;border-radius:5px;padding-left:5px;box-sizing: border-box;}
                .single{padding-right:28px;cursor:default;}
                .icon{display:inline-block;background: url(../assets/tan.png) no-repeat;width:14px;height:6px;margin-left:-22px;}
                .serviceAddress{margin:0;padding:20px;padding-bottom:14px;width:300px;height:338px;position: absolute;top:32px;left:160px;z-index:10;background:#fff;box-shadow: 0 0 5px #ccc;border-radius:3px;
                    .search{margin:0;
                    input{width:300px;padding-right:35px;background:#fafafa;border:1px solid #ccc;}}
                    .choose{margin:0;font-size: 14px;line-height: 26px;}
                    ul li{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;line-height: 26px;cursor: pointer;color:#666;font-size: 12px;}
                }
            }
        }
        .operate{height:56px;line-height:56px;
            a{display: inline-block;width:68px;height:30px;line-height:30px;border:1px solid #d9d9d9;border-radius:5px;text-align:center;color:#000;margin-top:10px;}
            .save{background-color:#0386f0;margin:0 20px 0 10px;color:#fff;}
        }
    
    }
    .fix_img{width:500px;height:500px;position: fixed;top:22%;left:31%;z-index:10009;
            img{display: block;}
            i{background:url(../assets/img.png) no-repeat 2px 2px;width:25px;height:25px;
            position: absolute;top:0px;right:0px;background-color: white; }
        
        
        
        }


}
</style>
<style lang="scss" scoped>
#editorElem{display:inline-block;width:470px;border-radius:5px;margin-left:-4px;
         .w-e-toolbar{border-top-left-radius: 5px;border-top-right-radius: 5px;border:1px solid black;}
         .w-e-text-container{height: 100px!important;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;border:1px solid black}
         }

    .pdd_config{
        text-align:left;
        .ii{
            left:1230px;
        }
    }
        .pdd_config input,select{
          height:32px;
          margin-top:10px;
   
          border-radius:5px;border:1px solid #d2d8db;
        }
        .pdd_config select{
            position: relative;
            width:100px;
            margin:10px 0 0 98px;
          border-radius:5px;border:1px solid #d2d8db;
            
        }
        .pdd_config input{
     
            width:395px;
            position:relative;
        
        }
        .pdd_config .param_control{
           position: relative;
            width:346px;
           margin: 0 0 0 16px;
        }
        .imgg4{background:url(../assets/dele.png) no-repeat center;width:15px;height:15px;display: inline-block;margin:18px 0 0 8px;}
        
</style>



