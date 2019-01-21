<template>
    <div class='single_product'>
      <!-- <p class="qu">商城管理 > 单件商品配置</p> -->
      <p class="ji">
          <label for="">单件商品编码</label><input type="text" v-model="product.goods_sn" @keyup.enter="search">
          <label for="">商品分类</label><input type="text" v-model="product.goods_model" @keyup.enter="search">
          <label for="">商品名称</label><input type="text" v-model="product.goods_name" @keyup.enter="search">
          <a href="javascript:void(0)" class="so" @click='search()'>搜索</a><a href="javascript:void(0)" class="cho" @click='chon()'>重置</a></p>
      <p class="xinz"><a href="javascript:void(0)"  class="so" @click='add()'>新增</a></p>
      <p class="cp">
          <a href="javascript:void(0)" class="wid_1 wid5">序号</a>
          <a href="javascript:void(0)" class="wid5">单件商品编码</a>
          <a href="javascript:void(0)" class="wid5">商品名称</a>
          <a href="javascript:void(0)" class="wid5">所属商品分类</a>
          <a href="javascript:void(0)" class="wid5">操作</a>
      </p>
      <ul class="it">
          <li v-for="item in items" :key="item.id">
              <span class="wid_1 wid5">{{item.index}}</span>
              <span class="wid5">{{item.goods_sn}}</span>
              <span class="wid5">{{item.goods_name}}</span>
              <span class="wid5">{{item.goods_model}}</span>
              <span class="wid5">
                <a href="javascript:void(0)" class="bian" @click="bian(item.id)"></a>
                <a href="javascript:void(0)" class="dele" @click='delet(item.id)'></a>
                </span>
          </li>
      </ul>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
    </div>
</template>
<script>
    import axioIn from '../store/axioIn';
    import Pagination from './pagination';
    import Router from "../router/index";
    export default {
        name:'single_product',
        components:{Pagination},
        data:function(){
            return{
                product:{goods_sn:'',goods_model:'',goods_name:''},
                items:[{goods_sn:'',goods_name:'',classify:''}],
                page:1,
                rowNum:1,
                pageIndex:1
            }
        },
        mounted: function(){
            if(!this.$route.query.flag){this.$store.state.saveInfo=null}
          if(this.$store.state.saveInfo){
           this.pageIndex = this.$store.state.saveInfo.page;
           this.product = this.$store.state.saveInfo.sear;
           console.log('sajshjAJ')
            axioIn.get('/api/goods/singleproduct/?page='+this.pageIndex,{params: this.product})
                .then((res)=>{
                       if(res.data.results.length===0){alert('未搜索到结果')} else{
                           this.$store.commit('setLoading', false);
                                this.items=res.data.results;
                                this.page=res.data.page_num.total_page;
                                this.rowNum = res.data.page_num.total_count;}
           
                })
         }else{
                    axioIn.get('/api/goods/singleproduct/')
                .then((res)=>{
                    this.$store.commit('setLoading', false);
                    this.items=res.data.results;
              
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                })
       
         }
        },
        methods:{
            search:function(){
                if(this.product.goods_name===''&&this.product.goods_sn===''&&this.product.goods_model===''){alert('未搜索到结果');return}
                var reg=/^[0-9a-zA-Z]+$/;
                var reg1 = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$")
                if(!reg.test(this.product.goods_sn)&&this.product.goods_sn!==''){
                    alert("商品编码请输入数字和字母");
                    return
                }
                if(!reg1.test(this.product.goods_name)&&this.product.goods_name!==''){alert("商品分类和名称请输入数字和字母和汉字");return}
                if(!reg1.test(this.product.goods_model)&&this.product.goods_model!==''){
                    alert("商品分类和名称请输入数字和字母和汉字");return
                }
                axioIn.get('/api/goods/singleproduct/?goods_name='+this.product.goods_name+'&goods_sn='+this.product.goods_sn+'&goods_model='+this.product.goods_model)
                .then((res)=>{
                    if(res.data.results.length===0){alert('未搜索到结果')}
                    else{
                    this.items=res.data.results;
                    //this.items.map(n=>{
                        //if(n.goods_model.length!==0){n.goods_model=n.goods_model[0]}
                        //else{n.goods_model=''}
                    //})
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;}
                })
            },
            chon:function(){
                this.product={goods_sn:'',goods_model:'',goods_name:''};
                axioIn.get('/api/goods/singleproduct/')
                .then((res)=>{
                    this.items=res.data.results;
                    //this.items.map(n=>{
                        //if(n.goods_model.length!==0){n.goods_model=n.goods_model[0]}
                       // else{n.goods_model=''}
                    //})
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                })
            },
            add:function(){Router.push('./single_')},
            bian:function(id){ 
                var obj = {};obj.page = this.pageIndex;obj.sear = this.product;
                this.$store.commit('savePage',obj); 

                //   Router.push({ path: "/addService",query: {id:id,page: this.pagI,search: this.messs}});return
                Router.push({path:'/single_',query:{id:id}})
            
            
            
            },
            delet:function(id){
                if(!confirm('确定删除吗？')){return}
                axioIn.delete('/api/goods/singleproduct/'+id+'/')
                .then((res)=>{
                    alert('删除成功');
                    axioIn.get('/api/goods/singleproduct/')
                .then((res)=>{

                    this.items=res.data.results;
               
                    // this.items.map(n=>{
                    //     if(n.goods_model.length!==0){n.goods_model=n.goods_model[0]}
                    //     else{n.goods_model=''}
                    // })
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                })
                }).catch(error=>{
                    if(error.status==400){
                    alert(error.data.error)
                }
                })
            },
            incrementTotal:function(q){console.log(q)
                axioIn.get('/api/goods/singleproduct/?page='+q)
                .then((res)=>{
                    this.items=res.data.results
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.pageIndex=q;
                })
            },
        }
  
    }
</script>
<style  lang='scss' scoped>
    .single_product{
        width: 100%;
        .ji {
            padding: 10px;
        }
        .bian{background:url(../assets/bian1.png) no-repeat center;}
        .dele{background:url(../assets/dele.png) no-repeat center}
        .c0,.c1,.c2,.c3,.c4{display: inline-block;}
        .c0{width:70px;margin-left:20px;}
        //.it li{border-bottom: 1px solid #eee}
    }
</style>


