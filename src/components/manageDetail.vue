<template>
    <div class="my_detail">
        <p class="detailTitle">您的位置:<span>我的订单</span>><span>订单详情页面</span></p>
        <div class="orderInfo">
            <div class="order_status">
                <p class="status_title">订单状态</p>
                <p class="statusShow"><label>状态管理</label><span>{{order.order_status}}</span><img src="../assets/change.png" alt="" @click="changeStatus"></p>
                <div class="record clear">
                    <p class="fl"><label>变更记录</label></p>
                    <ul class="fl">
                        <li class="tableTitle">
                            <span class="wid13">操作人</span>
                            <!-- <span class="wid13">经办人</span> -->
                            <span class="wid15">变更前状态</span>
                            <span class="wid15">变更后状态</span>
                            <span class="wid17">时间</span>
                        </li>
                        <li v-for="(item,index) in order_zt" :key="index">
                            <span class="wid13">{{item.order_operator}}</span>
                            <!-- <span class="wid13">{{item.responsible_person}}</span> -->
                            <span class="wid15">{{item.status_before}}</span>
                            <span class="wid15">{{item.status_after}}</span>
                            <span class="wid17">{{item.order_date}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="goods_detail">
                <p class="goods_order">商品详情</p>
                <ul>
                    <li >
                        <p class='listp'>
                            <span class='list_le'>订单编号:{{order.order_sn}}</span>
                        </p>
                        <div class="clearFloat" style='border:1px solid #eee;'>
                            <ul class='order_li'>
                                <li >
                                    <p class='lie'>
                                        <span class='wid15 gray'>商品名称</span>
                                        <span class='wid15 gray'>商品属性</span>
                                        <span class='wid20 gray'>所属商品分类（限单个商品）</span>
                                        <span class='wid15 gray'>内含商品</span>
                                        <span class='wid15 gray'>购买数量</span>
                                        <span class='wid15 gray'>实付款</span>
                                    </p>
                                </li>
                                <li v-for='item in order.order_cp' :key='item.id' class='lie'>
                                    <span class='wid15 gray'>{{item.goods_name}}</span>
                                    <span class='wid15 gray'>{{item.goods_attribute}}</span>
                                    <span class='wid20 gray'>{{item.model_name}}</span>
                                    <span class='wid15 gray'>{{item.num}}</span>
                                    <span class='wid15 gray'>{{item.goods_num}}</span>
                                    <span class='wid15 blue'>{{item.actual}}</span>
                                </li>
                            </ul>
                            <div class='order_gou'>
                                <span>购买年限:{{order.order_year}}</span>
                                <span>折扣:{{order.order_discount}}</span>
                                <p ><span>共<em class="modality">{{order.order_number}}</em>件商品</span>
                                <span>实付总额:<em class="modality">{{order.order_mount}}</em>元</span></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="condition">
                <p class='pd'>订单状况</p>
                <ul class='detail_li'>
                    <p class='pdi'>客户信息</p>
                    <li><label>客户性质</label><span>{{detail.company_info.customer_type}}</span></li>
                    <li><label>站点类型</label><span>{{detail.company_info.station_type}}</span></li>
                    <li><label>公司名称</label><span>{{detail.company_info.company_name}}</span></li>
                    <li><label>公司简称</label><span>{{detail.company_info.abbreviation}}</span></li>
                    <li><label>公司地址</label><span>{{detail.company_info.company_address_for}}</span></li>
                    <li><label>公司网址</label><span>{{detail.company_info.company_url[0].company_url}}</span></li>
                    <li><label>公司邮箱</label><span>{{detail.company_info.company_email}}</span></li>
                    <li><label>所属行业</label><span>{{detail.company_info.industry}}</span></li>
                    <li><label>营业执照名称</label><span>{{detail.company_info.GSZZ}}</span></li>
                    <li><label>客服服务区域</label><span>{{detail.company_info.service_area}}</span></li>
                </ul>
                <ul  class='detail_li'>
                    <p class='pdi'>站点信息</p>
                    <li><label>部署方式</label><span>{{detail.station_info.deploy_way}}</span></li><li><label>有效日期</label><span>{{detail.station_info.valid}}天</span></li>
                    <li><label>客户版本</label><span>{{detail.station_info.cli_version}}</span></li><li><label>折扣</label><span>{{order.order_discount}}</span></li>
                </ul>
                <ul  class='detail_li'>
                    <p class='pdi'>支持人员</p>
                    <li><label>销售人员</label><span>{{detail.station_info.sales}}</span></li>
                    <li><label>售前人员</label><span>{{detail.station_info.pre_sales}}</span></li>
                    <li><label>运营顾问</label><span>{{detail.station_info.oper_cslt}}</span></li>
                    <li><label>实施顾问</label><span>{{detail.station_info.oper_supt}}</span></li>
                    <li><label>运营支持</label><span>{{detail.station_info.oper_supt}}</span></li>
                </ul>
            </div>
            <!-- <div class="order_status">
                <p class="status_title">订单状态</p>
                <p class="statusShow"><label>状态管理</label><span>审核中</span><img src="../assets/change.png" alt="" @click="changeStatus"></p>
                <div class="record clear">
                    <p class="fl"><label>变更记录</label></p>
                    <ul class="fl">
                        <li class="tableTitle">
                            <span class="wid13">操作人</span>
                            <span class="wid13">经办人</span>
                            <span class="wid15">变更前状态</span>
                            <span class="wid15">变更后状态</span>
                            <span class="wid17">时间</span>
                        </li>
                        <li v-for="(item,index) in order_zt" :key="index">
                            <span class="wid13">{{item.order_operator}}</span>
                            <span class="wid13">{{item.responsible_person}}</span>
                            <span class="wid15">{{item.status_before}}</span>
                            <span class="wid15">{{item.status_after}}</span>
                            <span class="wid17">{{item.order_date}}</span>
                        </li>
                    </ul>
                </div>
            </div> -->
        </div>
        <div class="newTrade" v-show="editMessage">
          <div class="describe">
              <span class="title">订单状态</span><i class="close" @click="closeDialog"></i>
          </div>
          <div class="fillContent">
              <div class="tradeContent" style="margin-bottom:12px;">
                <label>状态变更</label>
                <select name="" id="" v-model="status_data.order_status">
                    <option value="1">财务审核</option>
                    <option value="2">开站中</option>
                    <option value="3">实施中</option>
                    <option value="4">交易完成</option>
                    <option value="5">已失效</option>
                </select>
                <em class='ii'>*</em>
              </div>
              <!-- <div class="tradeContent dropSearch">
                <span>经办人</span>
                <input class="single" type="text" v-model="status_data.responsible_person" />
                <em class='ii'>*</em>
              </div> -->
          </div>
          
          <div class="operate" style="text-align: right;">
              <a href="javascript:void(0)" class="cancel" @click="closeDialog">取消</a>
              <a href="javascript:void(0)" class="save" @click="referInfo">提交</a>
          </div>
      </div>
      <shade v-show="shade"></shade>
    </div>
</template>
<script>
import Router from '../router/index'
import axioIn from '../store/axioIn'
import Shade from './shade';
export default {
    name:'my_detail',
    components:{axioIn,Router,Shade},
    data:function(){
        return {
            order:{order_sn:'dd',state:'ddddd',order_year:'2',order_discount:'20%',order_mount:'2',price:'233',
            order_cp:[{goods_name:'33',model_name:'wee',goods_num:'3',put_price:'12'}]},
            detail:{order_discount:'',
                company_info:{
                    station_type:'2',company_name:'2',company_url:[{company_url: 'www.baidu.com'}],company_address:'2',
                    industry:'2',service_area:'2',abbreviation:'2',company_email:'2',GSZZ:'2',customer_type:'2',
                },
                station_info:{deploy_way:'1',cli_version:'2',ale:'3',oper_supt:'4'}
            },
            order_zt:[{order_status:'3'},{order_status:'3'},{order_status:'3'},{order_status:'3'}],
            change_data: [{operate: '张伟',conduct: '陈伟',status_ago: '实施中',status_after: '已完成',time: '2011-01-01 00:00:00'},{operate: '张伟1',conduct: '陈伟1',status_ago: '实施中',status_after: '已完成',time: '2011-01-01 00:00:00'}],
            id: '',
            shade: false,
            editMessage: false,
            status_data: {order_status: '',info_id: ''}
       }
    },
    mounted () {
        this.id = this.$route.query.id;
        if(this.id !== undefined){
            axioIn.get('/api/order/oa_order_list/'+this.id+'/').then(res=>{
                this.order = res.data;this.detail = res.data.open_order;
                this.order_zt = res.data.order_zt;
                let number = 0;
                this.order.order_cp.map(m=>{
                    number += parseInt(m.goods_num)
                    m.actual = (m.put_price * m.goods_num).toFixed(2);
                })
                this.detail.company_info.company_address_for=this.detail.company_info.company_address.province+this.detail.company_info.company_address.city+this.detail.company_info.company_address.detail
                this.order.order_number = number;
                this.detail.station_info.valid = res.data.give_day + res.data.order_year*365;
                var arr = ['提交订单','财务审核','开站中','实施中','交易完成','已失效'];
                this.order_zt.map(n=>{
                    n.status_after = arr[n.order_status];
                    n.status_before = arr[n.order_status - 1];
                })
            })
        }
    },
    methods:{
        changeStatus () {
            this.editMessage = true;this.shade = true;
        },
        closeDialog () {
            this.editMessage = false;this.shade = false;
            for(var attr in this.status_data){
                this.status_data[attr] = '';
            }
            // Router.push({path: './manageOrder'})
        },
        referInfo () {
            if(this.id !== undefined)this.status_data.info_id = this.id;
            var flag = true;
            for(var attr in this.status_data){
                if(!this.status_data[attr]){
                    flag = false;
                }
            }
            if(!flag){
                alert('带*的为必填项')
            }else{
                axioIn.put('/api/order/create_status/',this.status_data).then(res=>{
                    alert(res.data.info);
                    Router.push({path: './manageOrder'})
                }).catch(error=>{
                    // if(error.data.)
              e
                    alert(error.data.error)
                })
            }
        }
    }
}
</script>
<style lang='scss' scoped>
@import '../assets/home';
    .my_detail{width:90%;margin:20px auto;
        .fl{float:left;}.clear:after{content:"";display: block;clear:both;}
        .orderInfo{background:#fff;padding:0 30px;}
        .detailTitle{height:36px;line-height: 36px;background:#fff;margin-bottom:36px;}
        .goods_detail{overflow: hidden;
            .goods_order{text-align: left;font-size: 18px;margin:35px 0 17px 0;padding-left: 20px;background:url(../assets/goods_detail.png) left center no-repeat;}
        }
        .order_status{
            p label{font-size: 12px;color:#999;margin-right:10px;}
            .status_title{text-align: left;font-size: 18px;padding:20px 0;padding-left: 20px;background:url(../assets/orderStatus.png) left center no-repeat;}
            .record{ul{width:910px;text-align:left;border-radius:5px;.tableTitle{background: #efefef;border:none;} li{height:45px;line-height:45px;background:#fafafa;border-bottom:1px solid #efefef;
                span{display: inline-block;margin-left: 20px;color:#666;font-size: 12px;}
                .wid13{width:110px;}.wid15{width:134px;}.wid17{width:170px;}
            }
            li:last-of-type{border:none;}
            }}
            .statusShow{text-align:left;margin-bottom:16px;span{color:#1e73f2;font-size:12px;margin-right:10px;}img{vertical-align:middle;cursor:pointer;}}
        }
        .listp{width:100%;height:55px;background-color: #F5F5F5;position: relative;border:1px solid #eee;height:55px;line-height: 55px;}
        .lie{text-align:left;padding-left:22px;span{color:black;font-size: 12px;display: inline-block;}}
        .order_li{ float:left;width:80%;li{height:55px;border:1px solid #eee;height:55px;line-height: 55px;}}
        .order_gou{float:left;width:19.8%;border-left:1px solid #eee;span{display: inline-block;width:100%;margin:4px;}.modality{color:#1e73f2;font-style: normal;margin:0 5px;}}
        .list_right{float:right;padding-right:22px;}
        .list_le{float:left;padding-left: 22px;}
        .wid15{width:15%;}.wid20{width:20%;}
        .gray{color:#999!important;}
        .blue{color:#1e73f2!important;}
        .yellow{color:#ff9400!important;}
        .detail_li{width:100%;border:1px solid #eee;font-size:12px;padding:20px 0 30px 0;text-align:left;
            .pdi{text-align: left;font-size: 16px;margin:0 0 10px 20px;}
            li{width:49.5%;display: inline-block;text-align:left;margin:8px 0;
                label{color:#999;display: inline-block;padding: 0 10px 0 0;width:90px;text-align: right;}
                span{color:black}
            }
        }
        .condition{padding-bottom:20px;}
        .pd{text-align: left;font-size: 18px;margin:35px 0 17px 0;padding-left: 20px;background:url(../assets/ding.png) left center no-repeat}
        .newTrade{position: absolute;top:20%;left:30%;z-index:30;width:540px;height:212px;background:#fff;border-radius:5px;
        .describe{height:44px;line-height:44px;
            .title{float:left;margin-left:22px;color:#666;}
            .close{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
        }
        .fillContent{padding:18px 0 20px 0;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9;
            .tradeContent{text-align: left;font-size:0;
                span,label{display:inline-block;color:#666;font-size:12px;width:84px;text-align:right;margin:0 20px;}
                input,select{width:376px;height:30px;outline:none;border:1px solid #d2d8db;border-radius:5px;padding-left:5px;box-sizing: border-box;}
            }
            .dropSearch{text-align: left;font-size:0;position: relative;
                // span,label{display:inline-block;color:#666;font-size:12px;width:118px;text-align:right;margin:0 20px;}
                input,select{width:376px;height:30px;outline:none;border:1px solid #d2d8db;border-radius:5px;padding-left:5px;box-sizing: border-box;}
                .single{padding-right:28px;cursor:default;}
                .icon{display:inline-block;background: url(../assets/tan.png) no-repeat;width:14px;height:6px;margin-left:-22px;}
                .serviceAddress{margin:0;padding:20px;padding-bottom:14px;width:356px;height:338px;position: absolute;top:32px;left:124px;z-index:10;background:#fff;box-shadow: 0 0 5px #ccc;border-radius:3px;
                    .search{margin:0;
                    input{width:350px;padding-right:35px;background:#fafafa;border:1px solid #ccc;}}
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
        .ii{font-style:normal;color:red;margin-left:5px;}
    }
</style>


