/*
 * @Author: liuqian 
 * @Date: 2018-03-29 21:15:22 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-05-09 17:34:33
 */
<template>
    <div class="manageOrder">
        <p class="qu">订单管理 > 订单管理</p>
        <div class="ji">
            <span><label for="">订单号</label><input type="text" v-model="search_data.order_sn" @keyup.enter="search_btn"/></span>
            <span>
                <label for="">订单状态</label>
                <select name="" id="" v-model="search_data.order_status">
                    <option value=" ">---</option>
                    <option value="1">财务审核</option>
                    <option value="2">开站中</option>
                    <option value="3">实施中</option>
                    <option value="4">交易完成</option>
                    <option value="5">已失效</option>
                </select>
            </span>
            <span><label for="">客户名称</label><input type="text" v-model="search_data.company_name"  @keyup.enter="search_btn"/></span>
            <span><label for="">销售人员</label><input type="text" v-model="search_data.sales"  @keyup.enter="search_btn"/></span>
            <p class="operate">
                <a href="javascript:void(0)" class="so" @click="search_btn">搜索</a><a href="javascript:void(0)" class="cho" @click="reset">重置</a>                
            </p>
        </div>
        <p class="cp">
          <a href="javascript:void(0)" class="wid1">序号</a>
          <a href="javascript:void(0)" class="wid2">订单号</a>
          <a href="javascript:void(0)" class="wid2">订单状态</a>
          <a href="javascript:void(0)" class="wid1">销售人员</a>
          <a href="javascript:void(0)" class="wid2">客户名称</a>
          <a href="javascript:void(0)" class="wid1">操作</a>
      </p>
      <ul class="it">
          <li v-for="item in listData" :key='item.id'>
              <span class="wid1">{{item.index}}</span>
              <span class="wid2">{{item.order_sn}}</span>
              <span class="wid2">{{item.order_status}}</span>
              <span class="wid1">{{item.sales}}</span>
              <span class="wid2">{{item.company_name}}</span>
              <span class="wid1"><a href="javascript:void(0)" class="check" @click="orderView(item.id)"></a></span>
          </li>
      </ul>
      <shade v-show='shade'></shade>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
      <!-- <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填
          <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div> -->
    </div>
</template>
<script>
import Shade from './shade';
import axioIn from '../store/axioIn';
import Pagination from './pagination';
import Router from "../router/index";
export default {
  name: 'manageOrder',
  components: {Shade, Pagination},
  data () {
      return {
          shade: false,
          page: '',
          rowNum: '',
          pageIndex: 1,
          listData: [],
          search_data: {order_sn: '',order_status: '',company_name: '',sales: ''},
          search_status: false
        //   b2: [{index: 1,grid_name: '测试1',grid_site: '测试2',version_name: '测试3',deploy_way: '测试4'}]
      }
  },
  mounted () {
          this.initialize()
  },
  methods: {
      search_btn () {
          var num = 0;
          for(var attr in this.search_data){
              if(!this.search_data[attr]){
                  ++num;
              }
          }
          if(num === 4){
              alert('未查询到结果！');
          }else{
              axioIn.get('/api/order/oa_order_list/',{
                  params: this.search_data
              }).then(res=>{
                this.search_status = true;
                var arr = ['','财务审核','开站中','实施中','交易完成','已失效'];
                this.listData = res.data.results;
                this.listData.map(n=>{
                    n.company_name = n.open_order.company_info.company_name;
                    n.sales = n.open_order.station_info.sales;
                    var num = n.order_zt.length;
                    n.order_status = arr[n.order_zt[num-1].order_status];

                }) 
                this.pageIndex = 1;this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
              }).catch(err=>{
                  alert(err.data.error)
              })
          }
      },
      reset () {
          for(var attr in this.search_data){
              this.search_data[attr] = ''
          }
          this.initialize()
      },
      orderView (id) {
          Router.push({path: './manageDetail',query: {id: id}})
      },
      initialize (q) {
          if(!q){q = 1}
          var arr = ['','财务审核','开站中','实施中','交易完成','已失效'];
          axioIn.get('/api/order/oa_order_list/?page='+q).then(res=>{
            this.listData = res.data.results;
            this.listData.map(n=>{
                n.company_name = n.open_order.company_info.company_name;
                n.sales = n.open_order.station_info.sales;
                var num = n.order_zt.length;
                n.order_status = arr[n.order_zt[num-1].order_status];

            }) 
            this.pageIndex = q;this.page=res.data.page_num.total_page;
            this.rowNum = res.data.page_num.total_count;
            return this.listData;
          })
      },
      incrementTotal (n) {
          if(!this.search_status){
              this.initialize(n)
          }else{
              //搜索状态下的
              axioIn.get('/api/order/oa_order_list/?page='+n,{
                  params: this.search_data
              }).then(res=>{
                var arr = ['','财务审核','开站中','实施中','交易完成','已失效'];
                this.listData = res.data.results;
                this.listData.map(n=>{
                    n.company_name = n.open_order.company_info.company_name;
                    n.sales = n.open_order.station_info.sales;
                    var num = n.order_zt.length;
                    n.order_status = arr[n.order_zt[num-1].order_status];

                }) 
                this.pageIndex = n;this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
              }).catch(err=>{
                  alert(err.data.error)
              })
          }
      }
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/home';
.manageOrder{background-color: #edf2f5;width:90%;margin:auto;
    .wid1,.wid2{color: #666666;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;}
    .wid1{width:110px;margin-left:20px;}
    .wid2{width:170px;margin-left:20px;}
    .ji{
        .operate{text-align: right;margin-top:18px;}
        input{width:190px;border:1px solid #999;}label{color:#999;}
        select{width:160px;height:32px;margin:0 10px;border-radius:5px;}option{padding:5px;}
        .cho{border:1px solid #c0c6cd;}
    }
    .check{display:inline-block;width:14px;height:15px;background:url(../assets/bian1.png) no-repeat center center;}
    // .tip{width:150px;height:100px;position:fixed;top:35%;left:45%;z-index:22;border:1px solid gray;background-color:white;padding:20px;}
}
</style>


