<template>
    <el-container class="conten">
        <!-- header 顶部-->
        <el-header class="header">
          <!-- logo -->
          <div class="header_left">
            <!-- 企业logo -->
            <img src="../assets/logo1.png" alt="xx">
            <!-- 导航控制按钮 -->
            <div class="menu" :class="{active:!isCollapse,unActive:isCollapse}" @click="toggle"></div>
          </div>
          <!-- 个人信息 -->
          <div class="header_right">
            <span v-show="versionTypeShow" class="currVer">当前版本：</span>
            <el-dropdown v-show="versionTypeShow"  @command="changeVertion">
              <span class="el-dropdown-link">
                {{cutVersions}}
                <i class="el-icon-arrow-down el-icon--right" style="color:#fff;"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item command="0">经典版</el-dropdown-item>
                <el-dropdown-item command="1">重构版</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 日志 -->
            <el-dropdown @command="handleCommand" v-show="dialog.view"><!-- @click="onBreadcrumb(dialog.name)" @mouseover="onBreadcrumb(dialog.name)"-->
              <span class="el-dropdown-link" @click="onBreadcrumb(dialog)">{{dialog.name}}</span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item v-if="item.view" v-for="(item,index) in dialog.children"  :command="item" :key="index" @click="onBreadcrumbChild(item)">{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- 通知 --> 
            <!-- <div v-show="notice.view" class="notice">
               <span class="el-dropdown-link" @click="noticeTo('/')"><span>{{notice.name}}</span><div class="notice_count" v-show="Number(notice_count)">{{notice_count}}</div></span>
            </div> -->
            <el-dropdown @command="handleClick" class="userName">
              <span class="el-dropdown-link">
                <i class="al-icon-renyuanpeizhi" style="color:#fff;"></i>
                {{pname}}
                <i class="el-icon-arrow-down el-icon--right" style="color:#fff;"></i>
              </span>
              <el-dropdown-menu slot="dropdown" >
                <el-dropdown-item v-for="(item,index) in userListen"  :command="item.value" :key="index">{{item.label}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <!-- content 内容 -->
        <el-container class="main">
          <!-- 左侧菜单 -->
          <el-aside style="width: auto; height: 100%" id="aside">
            <transition name="slide-fade">
              <el-menu 
              @select="selectIndex"
              :default-active="activeIndex" 
              :class="{isShowOpen: isShowOpen}" 
              :unique-opened="true" 
              :router="true"
              background-color="#515c6e" 
              text-color="#fff" 
              class="el-menu-vertical-demo" 
              @open="handleOpen"
              @close="handleClose" 
              :collapse="isCollapse">
              <!-- 一级导航 -->
                <el-menu-item :index="aa.link" v-if="!aa.children && aa.view" v-for='(aa,index) in aaa' :key='index' @click="onBreadcrumb(aa)">
                  <!-- <i :class="aa.icon"></i> -->
                  <p v-show="activeIndex != aa.link && !isCollapse" :style="{backgroundImage: 'url(' +  aa.icon + ')'}"></p>
                  <p v-show="activeIndex === aa.link && !isCollapse" :style="{backgroundImage: 'url(' + aa.icon1 + ')'}"></p>
                  <p v-show="isCollapse" :style="{backgroundImage: 'url(' +  aa.icon + ')'}" :class="isCollapse ? 'nav_bgClass': ''"> </p>
                  <span slot="title">{{aa.name}}</span>
                </el-menu-item>
                <el-submenu :index='aa.id' v-if="aa.children && aa.view" v-for='(aa,index) in aaa' :key='index'>
                  <template slot="title">
                    <!-- <i :class="aa.icon"></i> -->
                    <p :style="{backgroundImage: 'url(' +  aa.icon + ')'}" :class="isCollapse ? 'nav_bgClass': ''"> </p>
                    <span slot="title">{{aa.name}}</span>
                  </template>
                  <!-- 二级导航 -->
                  <el-menu-item :index="a.link" v-if="!a.children && a.view" v-for='(a,index) in aa.children' :key='index' @click="onBreadcrumbChild(a)">
                    <i :class="a.icon"></i>
                    <span slot="title">{{a.name}}</span>
                  </el-menu-item>
                  <el-submenu :index="a.name" v-if="a.children && a.view"  v-for='(a,index) in aa.children' :key='index'>
                    <template slot="title">
                      <i :class="a.icon"></i>
                      <span slot="title">{{a.name}}</span>
                    </template>
                    <!-- 三级导航 -->
                    <el-menu-item :index="a1.link" v-if="!a1.children && a1.view"  v-for='a1 in a.children' :key="a1.id">
                      <i :class="a1.icon"></i>
                      <span slot="title">{{a1.name}}</span>
                    </el-menu-item>
                    <el-submenu :index="a1.link" v-if="a1.children && a1.view"  v-for='a1 in a.children' :key="a1.id">
                      <template slot="title">
                        <i :class="a1.icon"></i>
                        <span>{{a1.name}}</span>
                      </template>
                    </el-submenu>
                  </el-submenu>
                </el-submenu>   
              </el-menu>
            </transition>
          </el-aside>
          <!-- 右侧组件内容 -->
          <el-main :class="{isCollapsed: isCollapse, isNoCollapsed: !isCollapse}">


            <el-breadcrumb separator-class="el-icon-arrow-right">
                  <el-breadcrumb-item  v-if="breadcrumbParentName">{{breadcrumbParentName}}</el-breadcrumb-item>

                  <el-breadcrumb-item :to="{'path':activeIndex}">{{breadcrumbName}}</el-breadcrumb-item>
                </el-breadcrumb>
                <router-view></router-view>

          </el-main>


        </el-container>
    </el-container>
</template>
<script>
import Vue from "vue";
import Shade from "../components/shade";

import axioIn from "../store/axioIn";
import axios from "axios";
import Qs from "qs";
import Router from "../router/index";
import index from '../router/index';
import {
  mapState,
  mapMutations,
  mapGetters,
} from 'vuex';
axios.defaults.withCredentials = true; //配置cookie
export default {
  name: "conten",
  data: function() {
    return {
      loading: true,           //loading 是否加载中
      isCollapse: false,       //菜单按钮是否展开
      activeIndex: '/homePage',//默认展开项
      versionTypeShow: false,  //经典版/重构版 统计数据是否显示
      notice_count: "10",      //通知个数
      isShowOpen: true,        //导航显示展开合并切换样式 
      oo: false,
      o1: false,
      o2: false,
      oo1: false,
      show: false,
      cutVersions: '经典版',
      breadcrumbName:'数据总揽',
      breadcrumbParentName:'',
      // aaa: [
        //   { name: "总览", link: "/homePage", view: 1 ,o1: false,icon: "al-icon-dataOverview-copy"},
        //   {
        //     name: "订单管理",
        //     link: "/manageOrder",
        //     o1: false,
        //     id: "order_info_manage",
        //     view: 1,
        //     // children:[
        //     //   { name: "订单列表", id:'orderinfo',link: "/manageOrder",view: 1,icon: "al-icon-renyuanpeizhi"},
        //     // ],
        //     icon: "al-icon-danjiangoumai"
        //   },
        //   {
        //     name: "业务管理",
        //     link: "",
        //     view: 1,
        //     id: "workorder_manage",
        //     ol: false,
        //     view: 1,
        //     icon: "al-icon-shangjia2",
        //     children: [
        //       {
        //         name: "开站管理",
        //         link: "/gong",
        //         view: 1,
        //         id: "openstationmanage",
        //         ol: false,
        //         icon: "al-icon-dian"
        //       }
        //     ]
        //   },
        //   {
        //     name: "产品管理",
        //     link: "",
        //     o1: false,
        //     id: "production_manage",
        //     view: 1,
        //     icon: "al-icon-product",
        //     children: [
        //       {
        //         name: "运维配置",
        //         link: "",
        //         o1: false,
        //         id: "ops",
        //         view: 1,
        //         icon: "al-icon-chengben",
        //         children: [
        //           { name: "经典版服务", link: "chanpf",view: 1,id:'server',icon: "al-icon-chengben"},
        //           { name: "重构版服务", link: "refactorServe" ,view: 1,id:'ref-server',icon: "al-icon-Fill"},
        //           { name: "服务组", link: "chanpz",view: 1,id:'ser-grp',icon: "al-icon-user-lock" },
        //           { name: "节点", link: "/chanpj",view: 1, id:'grid',icon: "al-icon-jiaosequanxian1"},
        //           //{ name: "产品关联", link: "/guan",view: 1, }
        //         ]
        //       },
        //       {
        //         name: "产品配置",
        //         link: "",
        //         id: "pro",
        //         view: 1,
        //         icon: "al-icon-hangye_huaban_huaban",
        //         children: [
        //           { name: "经典版产品配置", link: "/chanpnow",view: 1,id:'product' ,icon: "al-icon-gerenrizhi"},
        //           { name: "重构版产品配置", link: "/chanp",view: 1,id:'ref-product' ,icon: "al-icon-node"},
        //         ]
        //       } /*,{name:'产品池',link:'/chanw',view:1,id:''}*/
        //     ]
        //   },

          // {
          //   name: "商城管理",
          //   link: "",
          //   o1: false,
          //   id: "goods_manage",
          //   view: 1,
          //   icon: "al-icon-shangchengmokuai",
          //   children: [
          //     {name: "商品模块配置",link: "/commodifyModule",o1: false,id: "goodsmodel",view: 1,icon:"al-icon-zhonggouyewu"},
          //     {name: "商品标签配置",link: "/commodifyLabel",o1: false,id: "tagclass",view: 1,icon:"al-icon-navicon-ywpz"},
          //     {name: "单件商品配置",link: "/single_product",o1: false,id: "singlegoods",view: 1,icon: "al-icon-syslog"},
          //     {name: "组合商品配置",link: "/goodsJoint",o1: false,id: "multiplegoods",view: 1,icon: "al-icon-jiaoseguanli"},
          //     {name: "商品上架",link: "/commodifyOnline",o1: false,id: "putaway",view: 1,icon: "al-icon-guanggaoweiguanli"},
          //     {name: "广告位配置",link: "/adsDeploy",o1: false,id: "advertising",view: 1,icon: "al-icon-danjiangoumai"},
          //     {name: "商品规格和参数",link: "/goodsStandard",o1: false,id: "",view: 1,icon:"al-icon-yunweitongji"}
          //   ]
          // },

        //   {
        //     name: "数据管理",
        //     link: "",
        //     view: 1,
        //     o1: "",
        //     id: "data_manage",
        //     icon: "al-icon-yunweitongji",
        //     children: [
        //       {
        //         name: '总览',
        //         link: "/allshow",
        //         view: 1,
        //         id: "Overview",
        //         ol: false,
        //         icon: "al-icon-shujuzonglan"
        //       },
        //       {
        //         name: "运维统计",
        //         link: "",
        //         view: 1,
        //         id: "data_ops",
        //         ol: false,
        //         icon:"al-icon-allocation",
        //         children: [
        //           {name: "节点情况",link: "nodeCase",view: 1,id:'grid-inquiries',icon:"al-icon-chanpinyunying"},
        //           { name: "服务组情况", link: "serviceGroup",view: 1,id:'sergrp-inquiries',icon:"al-icon-allocation" } /*,{name: '产品使用情况', link: '' },
        //                       {name: '客户运营情况', link: '' },{name: '版本情况', link: '' },*/
        //         ]
        //       },
        //       {
        //         name: "产品运营统计",
        //         link: "",
        //         view: 1,
        //         id: "prod_oper",
        //         ol: false,
        //         icon:"al-icon-chanpinyunying",
        //         children: [
        //           { name: "线上站点情况", link: "line",view: 1,id:'online-client',icon:'al-icon-renyuanguanli'},
        //           { name: "线上渠道情况", link: "line1",view: 1,id:'channel-inquiries' ,icon:"al-icon-notice"},
        //           { name: "客户使用情况", link: "line2",view: 1,id:'customer-use' ,icon: "al-icon-zuzhijiagou"},
        //           { name: "线上产品情况", link: "line3",view: 1,id:'online-product',icon: "al-icon-Sys-Config" },
        //           { name: "站点运营情况", link: "line4",view: 1,id:'site-oper',icon: "al-icon-jiaosequanxian" } /*,{name: '产品使用情况', link: '' },
        //                       {name: '客户运营情况', link: '' },{name: '版本情况', link: '' },*/
        //         ]
        //       },
        //       {
        //         name: '成本统计',
        //         link: "/CostStatistics",
        //         view: 1,
        //         id: "pandect",
        //         ol: false,
        //         icon:"al-icon-guigecanshu"
        //       }
        //       //   {
        //       //   name: 'WIFI数据',
        //       //   link: "/wifidata",
        //       //   view: 1,
        //       //   id: "pandect",
        //       //   ol: false
        //       // },
        //     ]
        //   },
        //   {
        //     name: "数据统计",
        //     link: "",
        //     view: 1,
        //     o1: "",
        //     id: "data_account",
        //     icon: "al-icon-guigecanshu",
        //     children:[
        //       // {
        //       //   name: '企业数据',
        //       //   link: "/busines",
        //       //   view: 1,
        //       //   id: "Overview",
        //       //   ol: false,
        //       //   icon: "al-icon-shujuzonglan"
        //       // },
        //       {
        //         name: '站点/行业统计',
        //         link: "/industryStation",
        //         view: 1,
        //         id: "industryStation",
        //         ol: false,
        //         icon:"al-icon-yunweitongji"
        //       },{
        //         name: '渠道统计',
        //         link: "/Openinstall",
        //         view: 1,
        //         id: "Openinstall",
        //         ol: false,
        //         icon:"al-icon-guigecanshu"
        //       },{
        //         name: '节点统计',
        //         link: "/GrideList",
        //         view: 1,
        //         id: "GrideList",
        //         ol: false,
        //         icon:"al-icon-guigecanshu"
        //       },
        //     ]
        //   },
        //   {
        //     name: "账号管理",
        //     link: "",
        //     o1: "",
        //     id: "auth",
        //     view: 1,
        //     icon: "al-icon-account",
        //     children: [
        //       { name: "角色权限", link: "/jiao", id: "group", view: 1 ,icon: "al-icon-jiaosequanxian"},
        //       { name: "组织架构", link: "/zu", id: "structure", view: 1 ,icon: "al-icon-zuzhijiagou"},
        //       { name: "人员配置", link: "ren", id: "user", view: 1,icon: "al-icon-renyuanpeizhi" }
        //     ]
        //   },
        //   {
        //     name: "日志  ",
        //     link: "",
        //     view: 1,
        //     id: "log",
        //     ol: false,
        //     icon: "al-icon-renyuanguanli",
        //     children: [
        //       {
        //         name: "个人日志",
        //         link: "/personal",
        //         view: 1,
        //         id: "personal-log",
        //         ol: false,
        //         icon: "al-icon-gerenrizhi"
        //       },
        //       {
        //         name: "系统日志",
        //         link: "/system",
        //         view: 1,
        //         id: "system-log",
        //         ol: false,
        //         icon: "al-icon-syslog"
        //       }
        //     ]
        //   },
        //   // { name: "通知", link: "", view: 1 },
        //   { 
        //     name: "设置", 
        //     link: "",
        //     view: 1 ,
        //     id: "setup",
        //     ol: false,
        //     icon: "al-icon-serverGroup",
        //     children: [
        //       {
        //         // name: "系统设置",
        //         // link: "",
        //         // view: 1,
        //         // id: "systemSetting",
        //         // ol: false,
        //         name: "用户管理", id: "userManage", link: "/userManage", view: 1, ol: false,
        //         icon: "al-icon-account",
        //         // children: [
        //         //   {name: "用户管理", id: "userManage", link: "/userManage", view: 1, ol: false},
        //         //   {name: "角色管理", id: "roleadmin", link: "/roleadmin", view: 1, ol: false}
        //         // ]
        //       },
        //       {
        //         name: "登陆模式设置",
        //         link: "/loginSetting",
        //         view: 1,
        //         id: "loginconfig",
        //         ol: false,
        //         icon: "al-icon-Fill"
        //       },
        //       {
        //         name: "客户行业设置",
        //         link: "/clientTrade",
        //         view: 1,
        //         id: "industry",
        //         ol: false,
        //         icon: "al-icon-hangye1"
        //       },
        //       {
        //         name: "帮助中心设置",
        //         link: "./supSetting",
        //         view: 1,
        //         id: "help_center",
        //         ol: false,
        //         icon: "al-icon-hangye_huaban_huaban"
        //       }
        //     ]
        //   }
      // ],
      // 导航菜单
      aaa: [
          { name: "数据总览", link: "/homePage", o1: false, id: "data_overview", view: 1, 
          icon: './static/aside_icon/homePage.png',
          icon1: './static/aside_icon/homePage1.png',
          },
          { name: "客户管理", link: "", o1: false, view: 1,
              id:'workorder_manage',
              icon: './static/aside_icon/client.png',
              icon1: './static/aside_icon/client1.png',
              children: [
                  { name: "客户库(销售)", link: "/salesLibrary",view: 1,id:'customer-khk',"parentName":"客户管理"},
                  { name: "待审批", link: "/examineLibrary",view: 1,id:'customer-khk',"parentName":"客户管理"},
                  { name: "开站管理", link: "/gong",view: 1,id:'openstationmanage',"parentName":"客户管理"},
                  { name: "客户库(csc)", link: "/cscLibrary",view: 1, id:'customer-khk',"parentName":"客户管理"}
                  ]
          },
          {name: "项目管理",link: "",o1: false,id: "project_management",view: 1, 
            icon: './static/aside_icon/projectManagement.png',
            children:[
              { name: "培训管理", id:'training',link: "/training",view: 1, "parentName":"项目管理"},
              { name: "产品配置管理", id:'training',link: "/productDeployList",view: 1, "parentName":"项目管理"}
            ]
          },
          // { name: "开站管理", link: "/gong",ol: false,id: "workorder_manage", view: 1,
          // icon: './static/aside_icon/openstationmanage.png',
          // icon1: './static/aside_icon/openstationmanage1.png',
          // },
          { name: "监控大屏", link: "/LargeScreenMonitor",ol: false,id: "", view: 1,  
          icon: './static/aside_icon/largeScreenMonitor.png',
          icon1: './static/aside_icon/largeScreenMonitor1.png',
          },
          // { name: "IT资源管理", link: "", o1: false, id: "intRes",view: 1, icon: "al-icon-dian"},
          {name: "订单管理",link: "/manageOrder",o1: false,id: "order_info_manage",view: 0, 
          children:[
            { name: "订单列表", id:'orderinfo',link: "/manageOrder",view: 0, icon: "al-icon-renyuanpeizhi","parentName":"订单管理"}]
          },
          { name: "运维管理", link: "", o1: false, id: "ops",view: 1,  
          icon: './static/aside_icon/ops.png',
          icon1: './static/aside_icon/ops1.png',
          children: [
            { name: "经典版服务", link: "/chanpf",view: 1,id:'server',"parentName":"运维管理"},
            // { name: "重构版服务", link: "/refactorServe" ,view: 1,id:'ref-server'},
            { name: "服务组", link: "/chanpz",view: 1,id:'ser-grp',"parentName":"运维管理"},
            { name: "节点", link: "/chanpj",view: 1, id:'grid',"parentName":"运维管理"}]
          },
          { name: "产品管理", link: "", o1: false, id: "pro",view: 1, 
          icon: './static/aside_icon/pro.png',
          icon1: './static/aside_icon/pro1.png',
          children: [
            { name: "经典版产品配置", link: "/chanpnow",view: 1,id:'product',"parentName":"产品管理"},
            { name: "重构版产品配置", link: "/chanp",view: 1,id:'ref-product',"parentName":"产品管理"}]
          },
          // {name: "商城管理",link: "",o1: false,id: "goods_manage",view: 1,
          // icon: './static/aside_icon/goodsManage.png',
          // icon1: './static/aside_icon/goodsManage1.png',
          // children: [
          //     {name: "商品模块配置",link: "/commodifyModule",o1: false,id: "goodsmodel",view: 1},
          //     {name: "商品标签配置",link: "/commodifyLabel",o1: false,id: "tagclass",view: 1},
          //     {name: "单件商品配置",link: "/single_product",o1: false,id: "singlegoods",view: 1},
          //     {name: "组合商品配置",link: "/goodsJoint",o1: false,id: "multiplegoods",view: 1},
          //     {name: "商品上架",link: "/commodifyOnline",o1: false,id: "putaway",view: 1},
          //     {name: "广告位配置",link: "/adsDeploy",o1: false,id: "advertising",view: 1},
          //     {name: "商品规格和参数",link: "/goodsStandard",o1: false,id: "",view: 1}]
          // },
          { name: "数据统计", link: "", o1: false, id: "data_manage",view: 1, 
          icon: './static/aside_icon/prod_oper.png',
          icon1: './static/aside_icon/prod_oper1.png',
          children: [
            {name: "企业数据",link: "/business", ol: false, id: "company-inquire",view: 1,"parentName":"数据统计"},
            {name: "渠道统计",link: "/Openinstall", ol: false, id: "channel-inquire",view: 1,"parentName":"数据统计"},
            {name: "节点统计",link: "/GrideList", ol: false,id: "grid-inquire",view: 1,"parentName":"数据统计"},
            {name: "站点/行业统计",link: "/industryStation", ol: false,id: "site-industry",view: 1,"parentName":"数据统计"}]
          },
          { name: "账户管理", link: "", o1: false, id: "auth",view: 1, 
          icon: './static/aside_icon/auth.png',
          icon1: './static/aside_icon/auth1.png',
          children: [
            {name: "角色权限",link: "/jiao",ol: false, id: "group",view: 1,"parentName":"账户管理"},
            {name: "人员设置",link: "/ren",ol: false, id: "user",view: 1,"parentName":"账户管理"}]
          },
          { name: "版本管理", link: "", o1: false, id: "version_manage",view: 1, 
          icon: './static/aside_icon/versionManagement.png',
          icon1: './static/aside_icon/versionManagement1.png',
          children: [
            // {name: "新建产品",link: "/createVersion", ol: false, id: "new_products", view: 1},
            {name: "版本设置",link: "/informVersion",ol: false, id: "repository",view: 1,"parentName":"版本管理"}]
          },
          { name: "设置", link: "", o1: false, id: "setup",view: 1, 
          icon: './static/aside_icon/setup.png',
          icon1: './static/aside_icon/setup1.png',
          children: [
            // {name: "用户账号管理",link: "/userManage", ol: false, id: "userset", view: 0,"parentName":"设置"},
            {name: "登陆模式设置",link: "/loginSetting",ol: false, id: "loginconfig", view: 1,"parentName":"设置"},
            {name: "客户行业设置",link: "/clientTrade",ol: false, id: "industry",view: 1,"parentName":"设置"},
            {name: "帮助中心设置",link: "/supSetting",ol: false, id: "help_center",view: 1,"parentName":"设置"}]
          },
          { name: "运营工具", link: "", o1: false, id: "operatingtools",view: 1,
              icon: './static/aside_icon/toolclound.png',
              icon1: './static/aside_icon/toolclound1.png',
              children: [
                  {name: "数据库查询",link: "/ctDataBase", ol: false, id: "support", view: 0,"parentName":"运营工具"},
                  {name: "线上微信客户",link: "/ctWeChat",ol: false, id: "support",view: 1,"parentName":"运营工具"},
                  {name: "线上机器人客户",link: "/ctRobot",ol: false, id: "support",view: 1,"parentName":"运营工具"},
                  {name: "客户查服务器",link: "/ctCustomer",ol: false, id: "support",view: 1,"parentName":"运营工具"},
                  {name: "查grid下客户",link: "/ctCustomerGrid",ol: false, id: "support",view: 1,"parentName":"运营工具"},
                  {name: "补订单",link: "/ctOrder",ol: false, id: "support",view: 1,"parentName":"运营工具"},
                  {name: "客户端下载",link: "/ctClient",ol: false, id: "support",view: 1,"parentName":"运营工具"},
                  {name: "脚本执行",link: "/ctScript",ol: false, id: "script-execution",view: 1,"parentName":"运营工具"},

              ]
          },
      ],

      // 用户信息
      userListen:[
        {value:'1',label:'修改密码'},
        {value:'2',label:'退出登录'}
      ],
      // 日志
      dialog: {name: "日志",link: "",view: 0,id: "log",ol: false,children: [
          {name: "个人日志",link: "/personal",view: 1,id: "personal-log",ol: false,"parentName":"日志"},
          {name: "系统日志",link: "/system",view: 1,id: "system-log",ol: false,"parentName":"日志"}]
      },
      // 通知
      notice: { name: "通知", link: "", view: 1,ol: false,id: 'notice',children: [
        {name: "节点预警",link: "/",view: 1,id: "personal-notice",ol: false},
        {name: "系统预警",link: "/system",view: 1,id: "system-notice",ol: false}]
      }
    };
  },
  components: { Shade },
  created()
  {
      
  //导航面包屑
   this.breadcrumbName = this.getBreadcrumbData.breadcrumbName||'数据总揽';
   this.breadcrumbParentName = this.getBreadcrumbData.breadcrumbParentName||'';

    var vertionHome = this.$store.state.versionInfo || window.sessionStorage.getItem('vertion');
    if(vertionHome == 0){this.cutVersions = '经典版';}else if(vertionHome == 1){this.cutVersions = '重构版'}
    this.$checkCookie();
    axioIn
      .get("/permission/users/" + localStorage.id + "/get_user_perm/")
      .then(res => {
        // this.$store.commit('setUserType', res.data.setup.userset.view);
        // window.sessionStorage.setItem('usertype', res.data.setup.userset.view);
        window.sessionStorage.setItem('loginName',res.data.user_name);
        this.dialog.view = res.data.log.view;
        this.dialog.children.map(item=> {
            if (res.data.log[item.id]){
              item.view = res.data.log[item.id].view;
            }
        }); 
        // 将后端的数据解构 转化为前端需要显示的数据解构
        this.aaa.map(n => {
          if (n.id != undefined && n.id != "") {
            if (res.data[n.id].view !== undefined) {
              n.view = res.data[n.id].view;
            }
            if (n.children !== undefined) {
              n.children.map(v => {
                if(res.data[n.id][v.id]){
                  if (res.data[n.id][v.id].view !== undefined) {
                      v.view = res.data[n.id][v.id].view;//console.log(v.id,v.view)  
                  }
              }
                  if (v.children !== undefined) {
                      v.children.map(c => {
                        if(res.data[n.id][v.id][c.id]){
                          if (res.data[n.id][v.id][c.id].view !== undefined) {
                             c.view = res.data[n.id][v.id][c.id].view;//console.log(c.id,c.view) 
                           }
                        }
                      })
                  }
              });
            }
          }
        })  
        setTimeout(()=>{
          this.loading = false
        },1000)
      })
      .catch(err => {
        this.loading = false
        if (err.status === 403 && localStorage.name === undefined) {
          alert("登录已过期，请重新登录");
          Router.push({ path: "/" });
        }
      });
      
  },
  computed:{
    // 用户名称
    ...mapGetters(['getBreadcrumbData']),
    pname(){
      return  this.$store.state.username || localStorage.name || '';
    },
    // 菜单选中选项
    activeIndexed() {
      return this.$store.state.activeIndex || sessionStorage.getItem('activeIndex');
    },
    // 加载中
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  methods: {
    ...mapMutations(['saveVersion','OA_BREADCRUMBD']),
    enter: function(aa) {
      this.aaa.map((n, index) => {
        if (aa === n.name) {
          Vue.set(this.aaa[index], "o1", true);
        }
        if (n.children !== undefined && n.children.length !== 0) {
          n.children.map((c, index1) => {
            if (c.name === aa) {
              Vue.set(this.aaa[index].children[index1], "o1", true);
            }
          });
        }
      });
    },

    out: function(aa) {
      this.aaa.map((n, index) => {
        if (aa === n.name) {
          Vue.set(this.aaa[index], "o1", false);
        }
        if (n.children !== undefined && n.children.length !== 0) {
          n.children.map((c, index1) => {
            if (c.name === aa) {
              Vue.set(this.aaa[index].children[index1], "o1", false);
            }
          });
        }
      });
    },

    // 个人信息  修改密码 退出操作
    handleClick(command) {
      if(command == '1'){ //修改密码
        Router.push({ path: "/changePass" });
      }
      if(command=='2'){ //个人登录退出
         axioIn.get("/backend/logout").then(res => {
            localStorage.clear();
            sessionStorage.clear();
            this.$store.commit('setroletype',null); 
            this.$store.state.username = "";
            this.$store.commit('setUserType',null); 
            this.$store.commit('setActiveIndex',null);
            this.$clearCookie("header");
            this.$message({
              type: 'success',
              message: '退出成功',
              duration: 800,
              onClose () {
                Router.push({path: '/'})
              }
            });
        });
      }
    },
    // 导航菜单打开
    handleOpen(key, keyPath) {
      
      // console.log(key);
    },
    // 导航菜单关闭
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    
    // 日志 跳转
    handleCommand(command) {
      window.sessionStorage.setItem('activeIndex', '');
      this.$store.commit('setActiveIndex', '');
      Router.push({ path: command.link });
      this.$store.commit('setLoading', true);
      this.onBreadcrumbChild(command)
    },

    // 菜单按钮切换  左侧导航收缩
    toggle() {
      this.isCollapse = !this.isCollapse;
      this.isActive = !this.isActive;
      this.$store.state.isCollapse = !this.$store.state.isCollapse;
      this.isShowOpen = !this.isCollapse  // 切换导航样式
    },
    // 通知  跳转
    noticeTo(to) {
        Router.push({ path: to });
    },
    // 菜单按钮选项
    selectIndex(indexPath) {
      this.activeIndex = indexPath;
      if(this.activeIndex === '/homePage' || this.activeIndex === '/business' || this.activeIndex === '/Openinstall' || this.activeIndex === '/GrideList' || this.activeIndex === '/industryStation'){
        this.versionTypeShow = true;
      }else {
        this.versionTypeShow = false;
      }
      this.$store.commit('setActiveIndex', indexPath);
      window.sessionStorage.setItem('activeIndex', indexPath);
    },
    changeVertion (val) {// 存上经典版
      if(val == 0){
        this.cutVersions = '经典版';
      }else if(val == 1){
        this.cutVersions = '重构版';
      }
      this.saveVersion(val)
    },
     onBreadcrumb(item){
        let {OA_BREADCRUMBD} = this,
            data={};

        data.breadcrumbName = item.name;
         this.breadcrumbParentName = "";
         OA_BREADCRUMBD(JSON.stringify(data));
       this.breadcrumbName = item.name;
      },

      onBreadcrumbChild(item){
          let {OA_BREADCRUMBD} = this,
              data={};

          data.breadcrumbName = item.name;
          data.breadcrumbParentName = item.parentName;
          OA_BREADCRUMBD(JSON.stringify(data));
        this.breadcrumbParentName = item.parentName;
        this.breadcrumbName = item.name;
      }
  },
  mounted() {
    if(this.activeIndexed) {
        this.activeIndex = this.activeIndexed;
        if(this.activeIndexed === '/homePage' || this.activeIndexed === '/business' || this.activeIndexed === '/Openinstall' || this.activeIndexed === '/GrideList' || this.activeIndexed === '/industryStation'){
          this.versionTypeShow = true;
        }else {
          this.versionTypeShow = false;
        }
    }
  },
  watch: {
    // 切换导航
    'getBreadcrumbData' : {
        handler:function(res) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
        if(typeof res == "string"){
          res =JSON.parse(res);
        }
        this.breadcrumbParentName = res.breadcrumbParentName;
        this.breadcrumbName = res.breadcrumbName;
        },
        deep: true    //深度监听

},
    activeIndexed(val){
        // console.log(val);
      this.activeIndex = val;
      this.$store.commit('setLoading', true);
    },

    // 加载状态
    isLoading(val) {
      this.loading = val
    }
  }
};
</script>
<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<style>
.conten .header_right .userName {
  box-sizing:border-box;
  text-overflow:hidden; 
  white-space:nowrap; 
}
</style>
