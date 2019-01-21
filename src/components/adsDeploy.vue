/*
 * @Author: liuqian 
 * @Date: 2018-03-30 10:54:03 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-05-07 17:24:00
 */
<template>
    <div class="adsDeploy">
        <!-- <p class="qu">商城管理 > 广告位配置</p> -->
        <div class="ji">
            <span>
                <label for="">位置</label>
                <select name="" id="" v-model="SearchObj.Search_Position">
                    <option value=" ">---</option>
                    <option  v-for="(item,index) in Position" :value="item.value" :key="index">{{item.label}}</option>
                </select>
            </span>
            <span>
                <label for="">广告名称</label>
                <input type="text" v-model="SearchObj.Search_Advertisement" @keyup.enter="search"/>
            </span>
            <span><label for="">操作人</label><input type="text"   v-model="SearchObj.Search_People" @keyup.enter="search"/></span>
            <span style="position:relative;"><label for="">最近上架时间</label>
             <input @focus="showStart" v-model="SearchObj.ShopData" type="text"  readonly="true">
             <datee @mouseleave.native='hide()' v-if="date_start" v-on:incrementt="incrementTi1" class='dat da'></datee>
            <!-- <input type="text"  v-model="SearchObj.ShopData"/> -->
            </span>
            <span>
                <label for="">上架状态</label>
                <select name="" id="" v-model="SearchObj.ShopGrounding"  >
                    <option value=" ">---</option>
                    <option v-for="(item,index) in Grounding"  :value="item.value" :key="index">{{item.label}}</option>
                </select>

            </span>
            <a href="javascript:void(0)" class="so" @click="search()">搜索</a><a href="javascript:void(0)" class="cho" @click="reset()">重置</a>
        </div>
        <div class="adsContent">
            <div class="frontAdd"><a href="javascript:void(0)" @click="addLabel">新增</a></div>
            <p class="cp" style="width:100%">
                <a href="javascript:void(0)" class="wid_1 wid8">序号</a>
                <a href="javascript:void(0)" class="wid8">最近上架时间</a>
                <a href="javascript:void(0)" class="wid8">上架状态</a>
                <a href="javascript:void(0)" class="wid8">位置</a>
                <a href="javascript:void(0)" class="wid8">广告名称</a>
                <a href="javascript:void(0)" class="wid8">下架时间</a>
                <a href="javascript:void(0)" class="wid8">操作人</a>
                <a href="javascript:void(0)" class="wid8">操作</a>
            </p>
        <ul class="it">
            <li v-for="item in Deploy" :key='item.id'>
                <span class="wid_1 wid8">{{item.index}}</span>
                <span class="wid8">{{item.ad_put_recent_on}}</span>
                <span class="wid8">{{item.ad_status===1?'上架':item.ad_status===2?'下架':item.ad_status===3?'待上架':''}}</span>
                <span class="wid8">{{item.ad_position===0?'首页':item.ad_position===1?'列表':""}}</span>
                <span class="wid8">{{item.ad_name}}</span>
                <span class="wid8">{{item.ad_put_off}}</span>
                <span class="wid8">{{item.ad_put_operator}}</span>
                <span class="wid8">
                    <a href="javascript:void(0)" :title="item.ad_status===1?'上架':item.ad_status===2?'下架':item.ad_status===3?'待上架':''" class="check grounding"  :class="{'groundingT':item.ad_status!==1}" @click="Up_Status(item)"></a>
                    <a href="javascript:void(0)" title="修改" class="check edit" @click="update(item.id)"></a>
                    <a href="javascript:void(0)" title="删除" class="check del" @click='delet(item.id)'></a>
                </span>
            </li>
        </ul>
      </div>
      <shade v-show='shade'></shade>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>

    </div>
</template>
<script>
import Shade from './shade';
import axioIn from '../store/axioIn';
import Pagination from './pagination';
import Router from "../router/index";
import Datee from './date'

export default {
  name: 'adsDeploy',
  components: {Shade, Pagination,axioIn,Datee},
  data () {
      return {
         date_start:false, 
          SearchObj:{
          Search_Position:'',
          Search_Advertisement:'',
          ShopData:'',
          ShopGrounding:'',
          Search_People:'',
          },
          Grounding:[
              {
                label:'上架',
                value:1,
              },
              {
                label:'下架',
                value:2,
              },
             {
                label:'待上架',
                value:3,
              },
          ],
            Position:[
              {
                label:'首页',
                value:0,
              },
              {
                label:'列表',
                value:1,
              },
  
         
          ],
          shade: false,
          page: '',
          rowNum: '',
          pageIndex: 1,
          Deploy: [{index: 1, ad_position: 1, ad_name: "yzq", ad_image: "", ad_put_recent_on: "2018-03-24",
ad_put_off:"2018-03-31",ad_put_operator:"297",ad_put_recent_on:"2018-03-24",ad_status:1,}],
      }
  },
  created(){
      if(!this.$route.query.flag){this.$store.state.saveInfo=null}
      if(this.$store.state.saveInfo){
          this.pageIndex = this.$store.state.saveInfo.page;
          this.SearchObj = this.$store.state.saveInfo.sear;
          axioIn.get('/api/goods/advertising_manage/?ad_position='+this.SearchObj.Search_Position+'&ad_name='+this.SearchObj.Search_Advertisement+'&ad_put_recent_on='+this.SearchObj.ShopData
            +'&ad_put_operator='+this.SearchObj.Search_People+'&ad_status='+this.SearchObj.ShopGrounding+'&page='+this.pageIndex )
            .then((res)=>{
                this.$store.commit('setLoading', false);
                if(res.data.results.length===0){alert('未搜索到结果')}
                else{
                this.Deploy=res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;}
            })
      }else{
        this.$store.commit('setLoading', false);
          //数据源泉加载完=>加载完获取列表
        this.getData();
      }
},
  methods: {  
        showStart () {this.date_start = true},
        hide () {this.date_start = false;this.date_end = false;},
        incrementTi1:function(a){
          this.SearchObj.ShopData=a;
          if(this.SearchObj.ShopData!==''){
       
          }
      },
        update:function(id){ 
            var obj = {};obj.page = this.pageIndex;obj.sear = this.SearchObj;
            this.$store.commit('savePage',obj); 
            Router.push({path:'/Advertising',query:{id:id}})
        },
        Up_Status(item){
            //item.ad_status 为上架状态
            switch (item.ad_status){
                //上架
            case 1:   
            let First_judgment=confirm('确认下架？')
            if(First_judgment){
                   axioIn.get("/api/goods/ad_put/?ad_id="+item.id).then(res=>{
                    if(res){
                    this.getData();   
                    }
                }).catch(error=>{
                    alert(error.data.error)
                }) 
            };
            break;
            //下架
            case 2: let Two_judgment=confirm('确认上架？')
                    if(Two_judgment){
                axioIn.get("/api/goods/ad_put/?ad_id="+item.id).then(res=>{
                                 if(res){
                    this.getData();   
                    }   
                }).catch(res=>{
                    alert(res.data.error)
                })
                    };
            break;
            //待上架
            case 3:
                let Three_judgment=confirm('是否提前上架');
                if(Three_judgment){
                 axioIn.get("/api/goods/ad_time/?ad_id="+item.id).then(res=>{
                    if(res){
                    this.getData();   
                    }    
                }).catch(res=>{
                    alert(res.data.error)
                 })    
                }; 
            break; 
      }
          
        },
         search(){
            if(this.SearchObj.Search_Position===''&&this.SearchObj.Search_Advertisement===''&&this.SearchObj.ShopData===''&&this.SearchObj.ShopGrounding===''&&this.SearchObj.Search_People===''){alert('未搜索到结果');return}
                var reg1 = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$")
           
                if(!reg1.test(this.SearchObj.Search_People)&&this.SearchObj.Search_People!==''){alert("商品分类和名称请输入数字和字母和汉字");return}
                if(!reg1.test(this.SearchObj.Search_Advertisement)&&this.SearchObj.Search_Advertisement!==''){
                    alert("广告名称和操作人请输入数字和字母和汉字");return
                }
                console.log(this.SearchObj.ShopGrounding)
                axioIn.get('/api/goods/advertising_manage/?ad_position='+this.SearchObj.Search_Position+'&ad_name='+this.SearchObj.Search_Advertisement+'&ad_put_recent_on='+this.SearchObj.ShopData
               +'&ad_put_operator='+this.SearchObj.Search_People+'&ad_status='+this.SearchObj.ShopGrounding )
                .then((res)=>{
                    if(res.data.results.length===0){alert('未搜索到结果')}
                    else{
                    this.Deploy=res.data.results;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;}
                }).catch((res)=>{
                    this.$message({
                        message: '登陆过期，请重新登陆',
                        type: 'warning'
                    });
                })
            },
            reset(){
                this.SearchObj={Search_Position:'',Search_Advertisement:'',ShopData:'',ShopGrounding:'',Search_People:'',};
                this.getData();
            },
      getData(){
         axioIn.get('/api/goods/advertising_manage/').then(res=>{
             if(res.data.results){
                 this.Deploy=res.data.results
                 this.page=res.data.page_num.total_page;
                 this.rowNum = res.data.page_num.total_count;
             }
            
      })
      },
      incrementTotal (n) {
         axioIn.get('/api/goods/advertising_manage?page='+n).then(res=>{
            this.Deploy = res.data.results
          
            this.page=res.data.page_num.total_page;
            this.rowNum = res.data.page_num.total_count;
            this.pageIndex=n;
          })
         
          
      },
       delet(id){
          if(confirm('确定删除吗？')){
                axioIn.delete('/api/goods/advertising_manage/'+id+'/').then(res=>{
                    axioIn.get('/api/goods/advertising_manage/')
                    .then((res)=>{
                        this.Deploy=res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                        this.pageIndex = 1;
                    })
                }).catch(error=>{
                           if(error.status==400){
                    alert(error.data.error)
                }
                })
          }
       },
      addLabel(){
          this.$router.push('Advertising');
          
      },
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/home';
.adsDeploy{background-color: #edf2f5;width:100%;margin:auto;height: 100%;
    .wid0,.wid1,.wid2{color: #666666;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
    .wid1{width:100px;margin-left:20px;}.wid0{width:60px;margin-left:20px;}
    .wid2{width:170px;margin-left:20px;}
    .ji{
        .operate{text-align: right;margin-top:18px;}span{display: inline-block;}
        input{width:188px;border:1px solid #999;}label{color:#999;}
        select{width:188px;height:32px;margin:0 10px;border-radius:5px;}option{padding:5px;}
        .cho{
            border:1px solid #c0c6cd;
            // margin-top:18px;
        }
    }
    .check{display:inline-block;width:14px;height:14px;
    }
    .grounding{
    background:url(../assets/UpShop.png) no-repeat center;
        margin:0 5px 0 0;
    
    }
    .grounding:hover{
    background:url(../assets/UpShop_.png) no-repeat center;    
    }
    .groundingT{
    background:url(../assets/DownShop.png) no-repeat center;   
    margin:0 5px 0 0;     
    }
    .groundingT:hover{   
    background:url(../assets/DownShop_.png) no-repeat center;    
    }
    .edit{
    background:url(../assets/Deployinsert.png) no-repeat center;
    margin:0 5px;

    }
    .edit:hover{
    background:url(../assets/Deployinsert_.png) no-repeat center;
        
    }
    .del{
    background:url(../assets/dele.png) no-repeat center;
        margin:0 5px;
        
    }
    // .tip{width:150px;height:100px;position:fixed;top:35%;left:45%;z-index:22;border:1px solid gray;background-color:white;padding:20px;}
    .adsContent{
        .frontAdd{width:100%;height:64px;background:#fff;text-align:left;/**/
        a{display: inline-block;width:70px;height:32px;background:#0386f0;color:#fff;text-align:center;line-height: 32px;margin:16px 0 0 20px;border-radius:5px;}}
    }
    
}
</style>


