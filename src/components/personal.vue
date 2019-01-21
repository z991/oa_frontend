<template>
    <div class="personal">
        <p class="ji">
            <section>
                <div class="block">
                  <span>操作类型</span>
                  <!-- <el-input size="mini" placeholder="请输入内容"></el-input> -->
                  <el-select size="mini" @change="operate_first" v-model="searchData.value_first" placeholder="请选择">
                    <el-option
                      v-for="item in operate_list"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                  <el-select size="mini" v-model="searchData.value_second" v-if="operate_second.length" placeholder="请选择">
                    <el-option
                      v-for="item in operate_second"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                </div>
                <div class="block">
                    <span>日期</span>
                    <el-date-picker
                        size="small"
                        v-model="searchData.date_time"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        @change = changeTime
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <!-- <div class="desc_check">
                    <span>操作描述</span>
                    <select name="" id="" v-model="mes.action">
                        <option value=" ">---</option>
                        <option value="1">新增</option>
                        <option value="2">删除</option>
                        <option value="3">修改</option>
                        <option value="4">登录</option>
                        <option value="5">退出</option>
                    </select>
                </div> -->
            </section>
            <section>
                <a href="javascript:void(0)" class="so" @click="search()">搜索</a>
                <a href="javascript:void(0)" class="cho" @click="mess()">重置</a>
            </section>
        </p>
            <oaTablePages :operatesCondition="operatesCondition" @onPageChange="onPageChangeBind" :loading="tableLoading" :list="tableDatas" :columns="columns" :operates="operates" :pagination="pagination"/>

        <!-- <el-table
          :data="items"
          style="width: 100%">
          <el-table-column
            prop="index"
            label="序号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="operationmodule"
            label="操作类型">
          </el-table-column>
          <el-table-column 
            prop="created_date"   
            label="日期">
          </el-table-column>
          <el-table-column
            prop="created_time"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="action"
            label="动作">
          </el-table-column>
          <el-table-column
            prop="title"
            label="对象">
          </el-table-column>
          <el-table-column
            v-if="action === '修改'"
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <a href="javascript:void(0)" @click="checkDetail(scope.row.id)"><img src="../assets/look.png" alt=""></a>
            </template>
          </el-table-column>
        </el-table> -->
        <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-size="100"
      layout="total, prev, pager, next"
      :total="1000">
    </el-pagination> -->
 

        <!-- <p class="cp">
            <a href="javascript:void(0)" class="wid_1 wid5" style='margin-left:10px;'>序号</a>
            <a href="javascript:void(0)" class="wid5">日期</a>
            <a href="javascript:void(0)" class="wid5">时间</a>
            <a href="javascript:void(0)" class="wid5">行为对象</a>
            <a href="javascript:void(0)" class="wid5">操作描述</a>
        </p>
        <ul class="it">
            <li v-for="item in items" :key="item.id">
                <span class="wid_1 wid5"  style='margin-left:10px;'>{{item.index}}</span>
                <span class="wid5">{{item.created_date}}</span>
                <span class="wid5">{{item.created_time}}</span>
                <span class="wid5">{{item.operationmodule}}</span>
                <span class="wid5">{{item.action}}</span>
            </li>
        </ul> -->
        <!-- <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination> -->
    </div>
</template>
<script>
import Pagination from './pagination';
import axioIn from '../store/axioIn';
import Router from "../router/index";
import Datee from './date'
import oaTablePages from "./oaTablePages/index"
export default {
    name:'personal',
    data:function(){
        return{
            date_time: '',//日历时间
            tableLoading:true,
            actionFlag:true,
            operatesCondition:{
              flag:true,
              modelName:"personal",
            },
            operates: {
                width: 200,
                fixed: 'right',
                list: [
                    {
                        icon: 'el-icon-view',
                        plain: true,
                        title:'查看',
                        borderFLag:false,
                        disabled: false,
                        method: (row, index) => {
                         this.checkDetail(row.id)
                        },
                      
                    },
                ]
            }, // 操作按钮组
            pagination: {
                show: true,
                total: 0,
                pageIndex: 1,
                pageSize: 15
            }, // 分页参数
            searchData:{
                    value_first:'',
                    value_second:'',
                    date_time:'',
            },
            columns: [
                { prop: "index", label: "序号" },
                { prop: "operationmodule", label: "客户名称" },
                { prop: "created_date", label: "日期" },
                { prop: "created_time", label: "时间" },
                { prop: "action", label: "动作",formatter:((row,index)=>{
                   let {action} = row,
                      actionArr= ['','新增','删除','修改','登录','退出'];
                    action = actionArr[action];
                    
               
                    if(action){
                            return action;
                    }else{
                      return '空'
                    }
                })},
                { prop: "title", label: "对象" },
            ],
            tableDatas: [],
            mes:{form_date:'',to_date:'',action:''},
            items:[
                {created_date:'',index:'',created_time:'',ip:'',operationmodule:'',action:''}
            ],
            page:'',
            pageIndex:1,
            date_s:false,
            date_si:false,
            search_val:false,
            pp:'',
            rowNum: 0,
            currentPage4: 1,
            operate_list: [],
            operate_second: [],
            value_first: '',
            value_second: ''
        }
    },
    created:function(){
        axioIn.get('/operlog/system-log/operation_type/').then(res=>{//搜索列表的数据
          this.operate_list = res.data.data;
        })
        // if (!this.$route.query.flag) {
        //   this.$store.state.saveInfo = null;
        // }
        // if (this.$store.state.saveInfo) {
        //   this.pageIndex = this.$store.state.saveInfo.page;
        //   this.mess = this.$store.state.saveInfo.sear;
        // }
        
        this.getData();
  
    },
    components:{Pagination,Datee,oaTablePages},
    methods:{
      getData(page=1,name='',form_date='',to_date=''){
              this.tableLoading = true;
         axioIn.get(`/operlog/personal-log/?page=${page}&name=${name}&form_date=${form_date}&to_date=${to_date}`)
                .then((res)=>{
        if (res.data.page_num !== undefined ||  res.data.results.length > 0){
                    this.tableDatas = res.data.results;
                    this.pagination={
                        show: true,
                        pageIndex: 1,
                        pageSize: 10,
                        total:res.data.page_num.total_count
                    };
                }else{
                    this.tableDatas = [];
                }

                this.tableLoading = false;
            })
      },
       onPageChangeBind(current){
        //  console.log(current)
        //   this.getData(current);
        if(this.search_val){
            if(this.operate_second.length){
                this.getData(current,this.searchData.value_second,this.searchData.date_time[0],this.searchData.date_time[1]);
            } else{
                this.getData(current,this.searchData.value_first,this.searchData.date_time[0],this.searchData.date_time[1]);
            }
        }else{
            this.getData(current);
        }
        },
        handleCurrentChange (q) {
          if(this.search_val===false){
            axioIn.get('/operlog/personal-log/?page='+q)
                .then((res) => {
                    this.items = res.data.results;
                    this.changeT(this.items);
                    this.pageIndex=q;
                })
                .catch((err)=> console.log(err)) 
          }
          else{
              axioIn.get('/operlog/personal-log/?'+this.pp+'&page='+q)
            .then((res)=>{
                this.items=res.data.results;
                this.changeT(this.items);
                this.pageIndex=q;
                this.search_val=true;
            }) 
          }
        },
        // 日历选择变化
        changeTime(obj){
            if(obj){
                this.mes.form_date =  obj[0];
                this.mes.to_date =  obj[1];
            }else {
                this.mes.form_date =  '';
                this.mes.to_date =  '';
            }
        },
        // incrementTotal:function(q){
        //     if(this.search_val===false){
        //         axioIn.get('/operlog/personal-log/?page='+q)
        //             .then((res) => {
        //                 this.items = res.data.results;
        //                 this.changeT(this.items);
        //                 this.pageIndex=q;
        //             })
        //             .catch((err)=> console.log(err)) 
        //       }
        //       else{
        //           axioIn.get('/operlog/personal-log/?'+this.pp+'&page='+q)
        //         .then((res)=>{
        //             this.items=res.data.results;
        //             this.changeT(this.items);
        //             this.pageIndex=q;
        //             this.search_val=true;
        //         }) 
        //       }
        //     },
        focu:function(){
            this.date_s=true;
           },
        focui:function(){
            this.date_si=true;
           },
        incrementTi:function(p){
            this.mes.form_date=p;
            this.date_s=false;
            },
        incrementTiii:function(p){
            this.mes.to_date=p;
            this.date_si=false;
            },
        hide1:function(){this.date_s=false;},
        hide2:function(){this.date_si=false;},
        search:function(){
            let {searchData,operate_second} = this,
                {date_time,value_first,value_second} = searchData;

               if(operate_second.length > 0 && value_second==""){
                   this.$message.error('请选择操作类型子条件');
                     return
                }
                this.search_val = true;
                if(operate_second.length){
                  this.getData(1,value_second,date_time[0],date_time[1]);
                } else{
                    this.getData(1,value_first,date_time[0],date_time[1]);
                }
          //   var aa='';
          //   let {value_second,operate_second} = this;
          //   if(operate_second.length > 0 && value_second==""){
          //     this.$message.error('请选择操作类型子条件');
          //     return
          //   }
          //   for(let o in this.mes){
          //       if(this.mes[o]!==''&&this.mes[o]!==undefined){
          //           if(aa.length===0){aa=o+'='+this.mes[o]}
          //           else{aa=aa+'&'+o+'='+this.mes[o]}
          //       }
          //   }
          //   if(this.value_first && !this.value_second){aa += '&name='+this.value_first;}
          //   else if(this.value_first && this.value_second){aa += '&name='+this.value_second;}
          //   let star=this.mes.form_date.split('-');
          //   let end=this.mes.to_date.split('-');
          //   if(new Date(star[0],star[1],star[2]).getTime()>new Date(end[0],end[1],end[2]).getTime()){alert('开始时间必须小于结束时间');return}
          //   else{ this.pp=aa;
          //       axioIn.get('/operlog/personal-log/?'+aa)
          //       .then((res)=>{
          //           this.items=res.data.results;
          //           this.changeT(this.items);
          //           this.pageIndex=1;
          //           this.page=res.data.page_num.total_page;
          //           this.rowNum = res.data.page_num.total_count;
          //           this.search_val=true;
          //       }) 
          //  }
        },
        mess:function(){
            // for(let o in this.mes){
            //     this.mes[o]='';
            // }
            this.searchData.date_time = [];
            this.searchData.value_first = '';
             this.searchData.value_second = '';
             this.search_val = false;
             this.getData();
        //     axioIn.get('/operlog/personal-log/')
        //    .then((res)=>{
        //         this.items=res.data.results;
        //         this.changeT(this.items);
        //         this.page=res.data.page_num.total_page;
        //         this.rowNum = res.data.page_num.total_count;
        //         this.pageIndex=1;
        //         this.search_val=false;
        // })
          },
        changeT:function(pp){
            let aa=['','新增','删除','修改','登录','退出'];
            pp.map(n=>{
              n.action=aa[n.action];
              if(n.action === '修改'){
                n.detailShow = true
              }else{
                n.detailShow = false
              }
            })
            
        },
        checkDetail (id) {//查看详情
        var obj = {},seek = {};
        let {value_first,value_second,operate_second} = this;
        // if(operate_second.length > 0 && value_second){
        //   seek.name = value_second
        // }else if()
        obj.page = this.pageIndex;
        obj.sear = this.mess;
        this.$store.commit("savePage", obj);
          Router.push({path: '/recordDetail',query: {id: id,type: 'person'}})
        },
        operate_first (value) {
          let oper_index = this.operate_list.findIndex(function(v,index,arr){
            return v.name === value
          })
          this.operate_second = this.operate_list[oper_index].children;
          this.value_second = '';
        }
    },watch:{
           'tableDatas'(res){
            if(res.length){
                this.tableLoading = false;
            }
        }
    }
}
</script>
<style lang='scss' scoped>
    .personal{
        width: 100%;
        .c4{width:60px;}
        .date_dis{display:inline-block;}
        .date_posi{left:63px!important;}
        .date_posii{left:340px!important;}
        .ji span{
            margin: 0
        }
        .so {
            margin: 0 20px;
        }
         // 选择项样式修改
        .ji{
            position: relative;
            width: 100%;
            height: 100px;
            margin: 0 0 15px 0;
            background: #ffffff;
            border-radius: 6px;
            section {
                width: 100%;
                height: 50px;
                padding: 5px 15px;
                box-sizing: border-box;
                overflow: hidden;
                display: flex;
                justify-content: space-around;
            }
            section:nth-child(1) {
                display: flex;
                justify-content: space-between;
                .desc_check {
                    width: 30%;
                    display: flex;
                    overflow: hidden;
                    justify-content: flex-end;
                    padding-top: 8px;
                    span{
                        width: 60px;
                        height: 32px;
                        line-height: 32px;
                    }
                    select {
                        border-radius: 6px;
                        margin: 0 15px;
                        height: 32px;
                        box-sizing: border-box;
                    }
                }
                .block {
                    width: 45%;
                    height: 40px;
                    line-height: 40px;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: flex-start;
                    overflow: hidden;
                    padding-top: 8px;
                    span{
                        display: inline-block;
                        height: 32px;
                        line-height: 32px;
                        // width: 40px;
                        text-align: center;
                        margin: 0 15px;
                    }
                    .el-date-picker {
                        width: 500px;
                    }
                }
            }
            section:nth-child(2) {
                padding-left: calc(100% - 250px);
            }
        }
        .ji select{width:100px;padding:6px;}
        
    }
</style>
<style>
  .el-table th>.cell{text-align:center;}
  .el-pagination{background: #fff;padding:20px;text-align:right;}
  .el-input--mini{height:32px;line-height: 32px;}
  .personal .el-input__suffix{margin:0;}
  .personal .el-input__inner{border:1px solid #dcdfe6;margin:0;}
  .el-input--mini .el-input__inner{width:130px;}
  .el-select{margin-right:10px;}
</style>



