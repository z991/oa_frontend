<template>
    <div class="system">
        <!-- 搜索选项 -->
        <p class="ji">
            <section>
                <div class="block">
                  <span>操作类型</span>
                  <!-- <el-input size="mini" placeholder="请输入内容"></el-input> -->
                  <el-select size="mini" @change="operate_first" v-model="value_first" placeholder="请选择">
                    <el-option
                      v-for="item in operate_list"
                      :key="item.name"
                      :label="item.name"
                      :value="item.name">
                    </el-option>
                  </el-select>
                  <el-select size="mini" v-model="value_second" v-if="operate_second.length" placeholder="无">
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
                        v-model="date_time"
                        value-format="yyyy-MM-dd"
                        type="daterange"
                        @change = changeTime
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="name_check">
                    <span>操作人员</span>
                    <input class="personName" style="height:30px" type="text" v-model="mes.username" @keyup.enter="search"  placeholder="请输入人员名称">
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
        <el-table
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
            prop="username"
            label="操作人员">
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
            fixed="right"
            label="操作"
            width="100">
            <template slot-scope="scope">
              <a v-if="scope.row.action === '修改'" href="javascript:void(0)" @click="checkDetail(scope.row.id)"><img src="../assets/look.png" alt=""></a>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :background="true"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="rowNum">
        </el-pagination>
        <!-- 表头 -->
        <!-- <p class="cp">
            <a href="javascript:void(0)" class="wid_1 wid7" style='margin-left:10px;'>序号</a>
            <a href="javascript:void(0)" class="wid7">日期</a>
            <a href="javascript:void(0)" class="wid7">时间</a>
            <a href="javascript:void(0)" class="wid7">IP地址</a>
            <a href="javascript:void(0)" class="wid7">人员名称</a>
            <a href="javascript:void(0)" class="wid7">行为对象</a>
            <a href="javascript:void(0)" class="wid7">操作描述</a>
        </p>
        <ul class="it">
            <li v-for="item in items" :key="item.id">
                <span class="wid_1 wid7"  style='margin-left:10px;'>{{item.index}}</span>
                <span class="wid7">{{item.created_date}}</span>
                <span class="wid7">{{item.created_time}}</span>
                <span class="wid7">{{item.ip}}</span>
                <span class="wid7">{{item.username}}</span>
                <span class="wid7">{{item.operationmodule}}</span>
                <span class="wid7">{{item.action}}</span>
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
export default {
    name:'system',
    data:function(){
        return{
            date_time: '',//日历时间
            mes:{form_date:'',to_date:'',username:'',action:''},
            items:[
                {created_date:'',index:'',created_time:'',ip:'',username:'',operationmodule:'',action:''}
            ],
            page:'',
            pageIndex:1,
            date_s:false,
            date_si:false,
            search_val:'',
            pp:'',
            rowNum: 0,
            operate_list: [],
            operate_second: [],
            value_first: '',
            value_second: ''
        }
    },
    created:function(){
        axioIn.get('/operlog/system-log/operation_type/').then(res=>{
          this.operate_list = res.data.data;
        })
        axioIn.get('/operlog/system-log/')
        .then((res)=>{
            this.items=res.data.results;
            this.changeT(this.items);
            this.page=res.data.page_num.total_page;
            this.rowNum = parseInt(res.data.page_num.total_count);
            this.search_val=false;
            setTimeout(()=>{
                this.$store.commit('setLoading', false)
            },1000)
        })
    },
    components:{Pagination,Datee},
    methods:{
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
        incrementTotal:function(q){
            if(this.search_val===false){
                axioIn.get('/operlog/system-log/?page='+q)
                    .then((res) => {
                        this.items = res.data.results;
                        this.changeT(this.items);
                        this.pageIndex=q;
                    })
                    .catch((err)=> console.log(err)) 
             } 
             else{
                 axioIn.get('/operlog/system-log/?'+this.pp+'&page='+q)
                .then((res)=>{
                    this.items=res.data.results;
                    this.changeT(this.items);
                    this.pageIndex=q;
                    this.search_val=true;
                }) 
             }
            },
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
            var aa='';
            let {value_second,operate_second} = this;
            if(operate_second.length > 0 && value_second==""){
              this.$message.error('请选择操作类型子条件');
              return
            }
            for(let o in this.mes){
                if(this.mes[o]!==''&&this.mes[o]!==undefined){
                    if(aa.length===0){aa=o+'='+this.mes[o]}
                    else{aa=aa+'&'+o+'='+this.mes[o]}
                }
            }
            if(this.value_first && !this.value_second){aa += '&name='+this.value_first;}
            else if(this.value_first && this.value_second){aa += '&name='+this.value_second;}

            let star=this.mes.form_date.split('-');
            let end=this.mes.to_date.split('-');
            if(new Date(star[0],star[1],star[2]).getTime()>new Date(end[0],end[1],end[2]).getTime()){alert('开始时间必须小于结束时间');return}
            else{
                axioIn.get('/operlog/system-log/?'+aa)
                .then((res)=>{
                    this.items=res.data.results;
                    this.changeT(this.items);
                    this.pageIndex=1;
                    this.pp=aa;
                    this.page=res.data.page_num.total_page;
                    this.rowNum = res.data.page_num.total_count;
                    this.search_val=true;
                    // this.value_first = '';this.value_second = '';
                }) 
           }
        },
        mess:function(){
            for(let o in this.mes){
                this.mes[o]='';
            }
            this.value_first = '';this.value_second = '';
            axioIn.get('/operlog/system-log/')
           .then((res)=>{
                this.items=res.data.results;
                this.changeT(this.items);
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.pageIndex=1;
                this.search_val=false;
        })
          },
        changeT:function(pp){
            let aa=['','新增','删除','修改','登录','退出'];
            pp.map(n=>n.action=aa[n.action])
        },
        handleCurrentChange (q) {
          if(this.search_val===false){
            axioIn.get('/operlog/system-log/?page='+q)
                .then((res) => {
                    this.items = res.data.results;
                    this.changeT(this.items);
                    this.pageIndex=q;
                })
                .catch((err)=> console.log(err)) 
          } 
          else{
              axioIn.get('/operlog/system-log/?'+this.pp+'&page='+q)
            .then((res)=>{
                this.items=res.data.results;
                this.changeT(this.items);
                this.pageIndex=q;
                this.search_val=true;
            }) 
          }
        },
        checkDetail (id) {//查看详情
          Router.push({path: '/recordDetail',query: {id: id,type: 'system'}})
        },
        operate_first (value) {
          let oper_index = this.operate_list.findIndex(function(v,index,arr){
            return v.name === value
          })
          this.operate_second = this.operate_list[oper_index].children;
          this.value_second = '';
        }
    },
  
}
</script>
<style lang='scss' scoped>
    .system{
        width: 100%;
        .ji span{
            margin: 0
        }
        .so {
            margin: 0 20px;
        }
        .c4{width:60px;}
        .date_dis{display:inline-block;}
        .date_posi{left:63px!important;}
        .date_posii{left:340px!important;}
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
                padding: 5px 0;
                box-sizing: border-box;
                overflow: hidden;
                display: flex;
                justify-content: space-around;
            }
            section:nth-child(1) {
                display: flex;
                justify-content: space-around;
                .name_check , .desc_check{
                    box-sizing: border-box;
                    display: flex;
                    justify-content: flex-start;
                    overflow: hidden;
                    span{
                        width: 60px;
                        height: 32px;
                        line-height: 32px;
                    }
                }
                .name_check {
                    width: 35%;
                    padding: 8px 20px 0;
                    .personName{border:1px solid #dcdfe6;}
                }
                .desc_check {
                    width: 30%;
                    justify-content: flex-end;
                    padding-top: 8px;
                    select {
                        border-radius: 6px;
                        margin: 0 15px;
                        height: 32px;
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
        .ji select{width:120px;padding:6px;}
    }
</style>
<style>
  .el-table th>.cell{text-align:center;}
  .el-pagination{background: #fff;padding:20px;text-align:right;}
  .el-input--mini{height:32px;line-height: 32px;}
  .system .el-input__suffix{margin:0;}
  .system .el-input__inner{border:1px solid #dcdfe6;margin:0;}
  .el-input--mini .el-input__inner{width:130px;}
  .el-select{margin-right:10px;}
</style>

