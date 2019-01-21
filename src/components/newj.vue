<template>
  <div class='newj'>
      <p class="qu">权限和人员管理 > 角色权限 > {{b3}}</p>
      <p class='ji'>
          <label for="">角色名称</label>
          <input type="text" v-model="name">
      </p>
      <p class='xian'>开放权限</p>
      <div v-for='(it,index) in aa' :key='it.key' class='kai' v-show="it.view">
          <p class='tipi'><label for="">{{it.name}}</label><input type="checkbox" v-model="it.quan" value=1 @change='quan(index)'><span>全选</span></p>
          <div v-for='(ic,i) in it.children' :key='i'>
              <span class='wid90 mar20'>{{ic.name}}</span>
              <span v-if='ic.view!==undefined' class='sst'><input type="checkbox" v-model="ic.view" value='1'><label for="" v-if= 'ic.id != "userset"'>页面可见性</label><label for="" v-else>增改删</label></span>
              <span v-if='ic.modify!==undefined' class='sst'><input type="checkbox" v-model="ic.modify" value='1'><label for="">增改</label></span>
              <span v-if='ic.delete!==undefined' class='sst'><input type="checkbox" v-model="ic.delete" value='1'><label for="">删除</label></span>
              <p v-for='(item,index) in ic.children' :key='index'>
                  <span class='wid90 mar40'>{{item.name}}</span>
                  <span v-if='item.view!==undefined' class='sst'><input type="checkbox" v-model="item.view" value='1'><label for="">页面可见性</label></span>
                  <span v-if='item.modify!==undefined' class='sst'><input type="checkbox" v-model="item.modify" value='1'><label for="">增改</label></span>
                  <span v-if='item.delete!==undefined' class='sst'><input type="checkbox" v-model="item.delete" value='1'><label for="">删除</label></span>
              </p>
          </div>
      </div>
      <p class='bao zz' ><a href="javascript:void(0)"  class='quu' @click='clo()'>取消</a><a href="javascript:void(0)" class='qub' @click='chbao()'>保存</a></p>
  </div>
</template>
<script>
import axioIn from '../store/axioIn'
import Router from "../router/index";
export default {
    name:'newj',
    data:function(){
        return {
            b3:'',
            name:'',
            own_user: [],
            aa:[
            /*{name:'客户管理',id:'/jiao/ke',tice:false,quan:false,isActive:false},
            {name:'订单管理',id:'/jiao/di',tice:false,quan:false,isActive:false},*/
            //   { name: "订单管理",  id:"order_info_manage", children:[
            //             {name:'订单列表',id:'orderinfo',view:0,modify:0},
            //   ]},
            //   {name:'产品管理',id:'production_manage',quan:false,
            //   children:[
            //       {name:'运维配置',id:'ops',
            //         children:[
            //             {name:'节点',id:'grid',view:0,delete:0,modify:0},
            //             {name:'服务组',id:'ser-grp',view:0,delete:0,modify:0},
            //             {name:'经典版服务',id:'server',view:0,delete:0,modify:0},
            //             {name:'重构版服务',id:'ref-server',view:0,delete:0,modify:0}
            //         ]
            //       },
            //       {name:'产品配置',id:'pro',
            //         children:[
            //             {name:'经典版产品配置',id:'product',view:0,delete:0,modify:0},
            //             {name:'重构版产品配置',id:'ref-product',view:0,delete:0,modify:0}
            //         ]
            //       },
                  
            //   ]},
            // {name:'数据管理',id:'data_manage',quan:false,
            //         children:[
            //         {name:'总览',id:'pandect',view:0,},
            //         {name:'产品和运营统计',id:'prod_oper',
            //             children:[
            //                 {name:'线上站点情况',id:'online-client',view:0,},
            //                 {name:'线上渠道情况',id:'channel-inquiries',view:0,},
            //                 {name:'客户使用情况',id:'customer-use',view:0,},
            //                 {name:'线上产品情况',id:'online-product',view:0,},
            //                 {name:'站点运营情况',id:'site-oper',view:0,},
            //             ]
            //         },
            //         {name:'运维统计',id:'data_ops',
            //             children:[
            //                 {name:'节点情况',id:'grid-inquiries',view:0,},
            //                 {name:'服务组情况',id:'sergrp-inquiries',view:0,}
            //             ]
            //         }
            //     ]
            // },
            {name:'总览',id:'data_overview',quan:false, view: 1, children:[
                {name:'数据总览',id:'data-overview',view:0}]
            },
            // {name:'开站',id:'workorder_manage',quan:false, view: 1, children:[
            //     {name:'开站管理',id:'openstationmanage',view:0,delete:0,modify:0}]
            // },
            { name: "客户管理",  view: 1,quan:false,
              id:'workorder_manage',
              children: [
                  // { name: "客户库(销售)", view: 1,id:'customer-khk',modify:0},
                  // { name: "待审批", view: 1,id:'customer-khk',modify:0},
                  { name: "开站管理", view: 1,id:'openstationmanage',modify:0,delete:0},
                  { name: "客户库(csc)", view: 1, id:'customer-khk',modify:0}
                  ]
            },
            // {name:'监控',id:'workorder_manage',quan:false, view: 1, children:[
            //     {name:'大屏监控',id:'LargeScreenMonitor',view:0,}]
            // },
            {name:'运维管理',id:'ops', quan:false, view: 1, children:[
                {name:'节点',id:'grid',view:0,delete:0,modify:0},
                {name:'服务组',id:'ser-grp',view:0,delete:0,modify:0},
                {name:'经典版服务',id:'server',view:0,delete:0,modify:0},
                // {name:'重构版服务',id:'ref-server',view:0,delete:0,modify:0}
                ]
            },
            {name:'产品管理',id:'pro', quan:false, view: 1, children:[
                {name:'经典版产品配置',id:'product',view:0,delete:0,modify:0},
                {name:'重构版产品配置',id:'ref-product',view:0,delete:0,modify:0}]
            },
            // {name:'商城管理',id:"goods_manage", quan:false, view: 1, children:[
            //     {name: "商品模块配置",id: "goodsmodel",view:0,delete:0,modify:0},
            //     {name: "商品标签配置",id: "tagclass",view: 0,delete:0,modify:0},
            //     {name: "单件商品配置",id: "singlegoods",view: 0,delete:0,modify:0},
            //     {name: "组合商品配置",id: "multiplegoods",view: 0,delete:0,modify:0},
            //     {name: "商品上架",id: "putaway",view: 0,delete:0,modify:0},
            //     {name: "广告位配置",id: "advertising",view:0,delete:0,modify:0}]
            // },
            {name:'数据统计',id:'data_manage', quan:false, view: 1, children:[
                {name:'企业数据',id:'company-inquire',view:0},
                {name:'渠道统计',id:'channel-inquire',view:0},
                {name:'节点统计',id:'grid-inquire',view:0},
                {name:'站点/行业统计',id:'site-industry',view:0}]
            },
            {name:'账户管理',id:'auth',quan:false, view: 1,
            children:[
                {name:'角色权限',id:'group',view:0,delete:0,modify:0},
                {name:'组织架构',id:'structure',view:0,modify:0},
                {name:'人员配置',id:'user',view:0,modify:0}
            ]
            },
            {name:'日志',id:'log',quan:false, view: 1,
            children:[
                {name:'个人日志',id:'personal-log',view:0,},
                {name:'系统日志',id:'system-log',view:0,}
            ]
            },
            {name:'设置',id:'setup',quan:false, view: 1,
            children:[
                {name:'客户行业设置',id:'industry',view:0,delete:0,modify:0},
                {name:'帮助中心设置',id:'help_center',view:0,delete:0,modify:0},
                {name:'登陆模式设置',id:'loginconfig',view:0,modify:0},
                // {name:'用户管理设置',id:'userset',view:0}
            ]
            },
            {name:'版本管理',id:'version_manage',quan:false, view: 1,
                children:[
                    {name:'版本设置',id:'repository',view:0,delete:0,modify:0},
                ]
            },
            {
              name:'运营工具',id:'operatingtools',quan:false, view: 1,
                children:[
                    {name:'运营工具',id:'support',view:0}
                ]
            }
        ],
        }
    },
    created:function(){
        if(this.$route.query.id===undefined){
            this.b3='新增';
            
            }
        else{
            this.b3='修改';
            axioIn.get('/permission/groups/'+this.$route.query.id+'/')
            .then((res)=>{
                this.name=res.data.name;
                this.own_user = res.data.own_user;
                this.get_data(res.data.permissions)
            })
            }
    },
    methods:{
        change_value:function(){//把本地数据转换成提交数据格式
            var bb={}
            this.aa.map(n=>{
                bb[n.id]={};
                n.children.map(v=>{
                    bb[n.id][v.id]={};//console.log(n.id,v.id,v.view)
                    if(v.view!==undefined){bb[n.id][v.id].view=new Number(v.view)}
                    if(v.delete!==undefined){bb[n.id][v.id].delete=new Number(v.delete);}
                    if(v.modify!==undefined){bb[n.id][v.id].modify=new Number(v.modify)};//console.log(JSON.stringify(bb))
                    if(v.children!==undefined){
                        bb[n.id][v.id]={};
                        v.children.map(b=>{//console.log(JSON.stringify(b))
                            bb[n.id][v.id][b.id]={};//console.log(n.id,v.id,b.id,b.view)
                            if(b.view!==undefined){bb[n.id][v.id][b.id].view=new Number(b.view)}
                            if(b.delete!==undefined){bb[n.id][v.id][b.id].delete=new Number(b.delete)}
                            if(b.modify!==undefined){bb[n.id][v.id][b.id].modify=new Number(b.modify)};
                        })   
                    }
                })
            })
            console.log(bb);
            
            return bb
        },
        chbao:function(){//保存
            let aa=this.change_value();
            if(this.name===''){alert('请输入角色名称');return}
            // console.log(JSON.stringify({name:this.name,permissions:aa}))
            if(this.$route.query.id===undefined){
                
                axioIn.post('/permission/groups/',{name:this.name,permissions:aa})
                    .then((res)=>{
                        alert('新增成功')
                        Router.push({ path: "/jiao" });
                    })
                    .catch((err)=>{alert(err.data.error)})
            }
            else{
                 
                axioIn.put('/permission/groups/'+this.$route.query.id+'/',{name:this.name,permissions:aa,own_user:this.own_user})
                    .then((res)=>{
                        
                        alert('修改成功')
                        Router.push({ path: "/jiao" });
                    })
                    .catch((err)=>{alert(err.data.error.name)})
            }
        },
        quan:function(index){//全选
            if(this.aa[index].quan===false){
                this.aa[index].children.map(v=>{
                    if(v.view!==undefined){v.view=0}
                    if(v.delete!==undefined){v.delete=0}
                    if(v.modify!==undefined){v.modify=0}
                    if(v.children!==undefined){
                        v.children.map(c=>{
                            if(c.view!==undefined){c.view=0}
                            if(c.delete!==undefined){c.delete=0}
                            if(c.modify!==undefined){c.modify=0}
                        })
                    }
                })
            }
            else{
                this.aa[index].children.map(v=>{
                    if(v.view!==undefined){v.view=1}
                    if(v.delete!==undefined){v.delete=1}
                    if(v.modify!==undefined){v.modify=1}
                    if(v.children!==undefined){
                        v.children.map(c=>{
                            if(c.view!==undefined){c.view=1}
                            if(c.delete!==undefined){c.delete=1}
                            if(c.modify!==undefined){c.modify=1}
                        })
                    }
                })
            }
        },
        get_data:function(aac){//把后台给的数据转换成本地数据
            this.aa.map(n=>{
                n.children.map(v=>{
                    if(v.view!==undefined){v.view=aac[n.id][v.id].view}
                    if(v.modify!==undefined){v.modify=aac[n.id][v.id].modify}
                    if(v.delete!==undefined){v.delete=aac[n.id][v.id].delete}
                    if(v.children!==undefined){
                        v.children.map(c=>{
                            if(c.view!==undefined){c.view=aac[n.id][v.id][c.id].view}
                            if(c.modify!==undefined){c.modify=aac[n.id][v.id][c.id].modify}
                            if(c.delete!==undefined){c.delete=aac[n.id][v.id][c.id].delete}
                        })
                    }
                })
            })
        },
        clo:function(){
            Router.push({ path: "/jiao" });
        }
    }
  
}
</script>
<style lang='scss' scoped>
    .newj{
        .ji{margin:10px 0 0 0;padding:17px 0 19px 0;background-color:#fff;}
        p{}
        .xian{background-color: #fff;text-align: left;padding:10px;}
        .kai{padding-left:30px;text-align:left;border-bottom:1px dashed gray;background-color:white;
          .sst{padding: 6px 0;display: inline-block;vertical-align: middle;
              input{display: inline-block;width:33px;height:13px;line-height: 24px;}
              label{display: inline-block;width:70px;height:24px;line-height: 24px;}
          }
          .wid90{display: inline-block;width:105px;height:30px}
          .mar20{margin-left: 20px;}
          .mar40{margin-left: 40px;}
          .tipi{height:32px;vertical-align:middle;padding:10px 0;
          label{display: inline-block;height:32px;line-height: 32px;font-size: 15px;color:#0386f0}
          input{margin:0 5px 0 294px;display: inline-block;}
          span{color:#bcc3ca}
          }
        }
        .zz{background-color: #fff;margin-right: 0;padding: 21px 20px 23px 0;border: 1px solid #e9e9e9;border-radius: 3px;}
    }
</style>


