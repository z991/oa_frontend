import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Content from '@/page/content'
import Conii from '@/page/conii'
import Shade from '@/components/shade'
// import Jiao from '@/components/jiao'
import Zu from '@/components/zu'
// import Ren from '@/components/ren'

// 产品管理(经典版、重构版配置)
import Chanp from '@/components/Chanp/index.vue'
import Chanpnow from '@/components/Chanpnow/index.vue'
// 产品功能 (经典版、重构版 修改)
import ChanpProduct from '@/components/ChanpProduct/index.vue'
import Productnow from '@/components/productnow'

// 账号管理(角色权限、人员设置)
import Jiao from '@/components/Jiao/index.vue'
import Ren from '@/components/Ren/index.vue'

import Chanpf from '@/components/chanpf'
import Chanpz from '@/components/chanpz'
import Chanpj from '@/components/chanpj'

import Guan from '@/components/guan'
import Date from '@/components/date'
import System from '@/components/system'
import Personal from '@/components/personal'
import Line from '@/components/online'
import Line1 from '@/components/online1'
import Line2 from '@/components/online2'
import Line3 from '@/components/online3'
import Line4 from '@/components/online4'
import Allshow from '@/components/allshow'
import ServiceGroup from '@/components/serviceGroup'
import NodeCase from '@/components/nodeCase'
import SupSetting from '@/components/supSetting'
import ClientTrade from '@/components/clientTrade'
import Openstationf from '@/components/openstationf'
import Openstations from '@/components/openstations'
import Openstationt from '@/components/openstationt'
import Openstationfr from '@/components/openstationfr'
import RefactorServe from '@/components/refactorServe'
import Newj from '@/components/newj'
import AddService from '@/components/addService'
import AddRefactor from '@/components/addRefactor'
import ProductService from '@/components/productService'
import CommodifyLabel from '@/components/commodifyLabel'
import Single_ from '@/components/single_'
import Singlep from '@/components/single_product'
import CommodifyModule from '@/components/commodifyModule'
import CommodifyOnline from '@/components/commodifyOnline'
import AddOnline from '@/components/addOnline'
import GoodsJoint from '@/components/goodsJoint'
import AddJoint from '@/components/addJoint'
import ManageOrder from '@/components/manageOrder'
import AdsDeploy from '@/components/adsDeploy'
import Advertising from '@/components/Advertising'
import ManageDetail from '@/components/manageDetail'
import GoodsStandard from '@/components/goods_standard'
import AddStandard from '@/components/addStandard'
import AddChanpj from '@/components/addChanpj'
import CostStatistics from '@/components/coststatistics'
import WifiData from '@/components/wifidata'
import LoginSet from '@/components/loginSetting'
import UserManage from '@/components/userManage/index.vue'
import RoleAdmin from '@/components/roleadmin/index.vue'
import ChangePass from '@/components/changePass/index.vue'
import StaffLimit from '@/components/staffLimit.vue'
import HomePage from '@/components/homePage/index.vue'
import Business from '@/components/business/index.vue'
import IndustryStation from '@/components/industryStation/index.vue'

import Openinstall from '@/components/Openinstall/index.vue'//渠道统计
import GrideList from '@/components/GrideList/index.vue'//节点统计
import LargeScreenMonitor from '@/components/LargeScreenMonitor/index.vue' //大屏监控
import CreateVersion from '@/components/createVersion/index.vue'//版本管理，新建产品
import InformVersion from '@/components/informVersion/index.vue'//版本管理，发版通知
import  versionSettings from "@/components/versionSettings/index.vue"//版本管理 版本设置
import SubStation from "@/components/substation/index.vue"//子站列表页面
import RecordDetail from "@/components/recordDetail/index.vue" // 日志详情页

//客户库

import  salesLibrary from "@/components/salesLibrary/index.vue"//销售  客户库
import  createSalesLibrary from "@/components/createSalesLibrary/index.vue"//销售 创建问题
import  examineLibrary from "@/components/oaExamineLibrary/index.vue"//待审批
import Gong from '@/components/gong' // 开站管理
import  cscLibrary from "@/components/oaCscLibrary/index.vue"//交付  客户库
import CustomerInformation from '@/components/CustomerInformation/index.vue'//客户信息  客户库
import createProblem from "@/components/createProblem/index.vue"

// 公司相关
import companyAbout from "@/components/companyAbout/index.vue"
// 创建问题
import createQuestion from "@/components/createQuestion/index.vue"


// 项目管理
import training from '@/components/training/index.vue' //培训管理
import TrainDetail from '@/components/trainDetail/index.vue'//详情
import CreateTrain from '@/components/createTrain/index.vue'
import ProductDeployCreate from '@/components/productDeploy_create/index.vue'//创建产品配置
import ProductDeployList from '@/components/productDeploy_list/index.vue'//产品配置列表页面
import ProductDeployDetail from '@/components/productDeploy_detail/index.vue'//产品配置详情页面

//云工具
import ctDataBase from '@/components/ctDataBase/index.vue'//云工具  数据库查询
import ctWeChat from '@/components/ctWeChat/index.vue'//云工具  线上微信客户
import ctRobot from '@/components/ctRobot/index.vue'//云工具  线上机器人客户
import ctCustomer from '@/components/ctCustomer/index.vue'//云工具  客户查服务器
import ctCustomerGrid from '@/components/ctCustomerGrid/index.vue'//云工具  查Grid下客户
import ctOrder from '@/components/ctOrder/index.vue'//云工具  补订单
import ctClient from '@/components/ctClient/index.vue'//云工具  客户端下载
import ctScript from '@/components/ctScript/index.vue'//云工具  脚本执行


Vue.use(Router)

export default new Router({
  
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/a',
      name:'Conii',
      component:Conii,
      children:[
        {
          path:'/jiao',
          name:'Jiao',
          component: Jiao,
        },
        {
          path:'/newj',
          name:'Newj',
          component: Newj,
        },
        {
          path:'/zu',
          name:'Zu',
          component:Zu
        },
        {
          path:'/ren',
          name:'Ren',
          component:Ren
        },
        {
          path:'/chanp',
          name:'Chanp',
          component:Chanp
        },
        {
          path:'/chanpnow',
          name:'Chanpnow',
          component:Chanpnow
        },
        {
          path:'/product',
          name:'ChanpProduct',
          component:ChanpProduct
        },
        {
          path:'/productnow',
          name:'Productnow',
          component:Productnow
        },
        {
          path:'/chanpf',
          name:'Chanpf',
          component:Chanpf
        },
        {
          path:'/chanpz',
          name:'Chanpz',
          component:Chanpz
        },
        {
          path:'/chanpj',
          name:'Chanpj',
          component:Chanpj
        },
        {
          path:'/guan',
          name:'Guan',
          component:Guan
        },
        {
          path:'/gong',
          name:'gong',
          component:Gong
        },
        {
          path:'/openstationf',
          name:'Openstationf',
          component:Openstationf
        },
        {
          path:'/openstations',
          name:'Openstations',
          component:Openstations
        },{
          path:'/openstationt',
          name:'Openstationt',
          component:Openstationt
        },{
          path:'/openstationfr',
          name:'Openstationfr',
          component:Openstationfr
        },
        {
          path:'/personal',
          name:'personal',
          component:Personal
        },
        {
          path:'/system',
          name:'system',
          component:System
        },
        {
          path:'/line',
          name:'line',
          component:Line
        },
        {
          path:'/line1',
          name:'line1',
          component:Line1
        },
        {
          path:'/line2',
          name:'line2',
          component:Line2
        },
        {
          path:'/line3',
          name:'line3',
          component:Line3
        },
        {
          path:'/line4',
          name:'line4',
          component:Line4
        },
        {
          path:'/allshow',
          name:'allshow',
          component:Allshow
        },
        {
          path:'/serviceGroup',
          name:'serviceGroup',
          component:ServiceGroup
        },
        {
          path:'/nodeCase',
          name:'nodeCase',
          component:NodeCase
        },
        {
          path:'/supSetting',
          name:'supSetting',
          component:SupSetting
        },
        {
          path: '/clientTrade',
          name: 'clientTrade',
          component: ClientTrade
        },
        {
          path: '/refactorServe',
          name: 'refactorServe',
          component: RefactorServe
        },
        {
          path: '/addService',
          name: 'addService',
          component: AddService
        },
        {
          path: '/addRefactor',
          name: 'addRefactor',
          component: AddRefactor
        },{
          path: '/productService',
          name: 'productService',
          component: ProductService
        },
        {
          path: '/commodifyLabel',
          name: 'commodifyLabel',
          component: CommodifyLabel
        },
        {
          path: '/single_',
          name: 'Single_',
          component: Single_
        },
        {
          path: '/Advertising',
          name: 'Advertising',
          component: Advertising
        },
        {
          path: '/single_product',
          name: 'Singlep',
          component: Singlep
        
        },{
          path: '/commodifyModule',
          name: 'commodifyModule',
          component: CommodifyModule
        },
        {
          path: '/commodifyOnline',
          name: 'commodifyOnline',
          component: CommodifyOnline
        },
        {
          path: '/addOnline',
          name: 'addOnline',
          component: AddOnline
        },{
          path: '/goodsJoint',
          name: 'goodsJoint',
          component: GoodsJoint
        },{
          path: '/addJoint',
          name: 'addJoint',
          component: AddJoint
        },{
          path: '/manageOrder',
          name: 'manageOrder',
          component: ManageOrder
        },{
          path: '/adsDeploy',
          name: 'adsDeploy',
          component: AdsDeploy
        },{
          path: '/manageDetail',
          name: 'manageDetail',
          component: ManageDetail
        },{
          path: '/goodsStandard',
          name: 'goods_standard',
          component: GoodsStandard
        },{
          path: '/addStandard',
          name: 'addStandard',
          component: AddStandard
        },{
          path: '/addChanpj',
          name: 'addChanpj',
          component: AddChanpj
        },
        {
          path: '/coststatistics',
          name: 'CostStatistics',
          component: CostStatistics
        },
        {
          path: '/wifidata',
          name: 'WifiData',
          component: WifiData
        },
        {
          path: '/loginSetting',
          name: 'LoginSet',
          component: LoginSet
        },
        {
          path: '/userManage',
          name: 'UserManage',
          component: UserManage
        },
        {
          path: '/roleadmin', 
          name: 'RoleAdmin',
          component: RoleAdmin 
        },
        {
          path: '/changePass',
          name: 'ChangePass',
          component: ChangePass
        },
        {
          path: '/staffLimit',
          name: 'staffLimit',
          component: StaffLimit
        },
        {
          path: '/GrideList',
          name: 'GrideList',
          component: GrideList
        },
        {
          name: "Openinstall",
          path: "/Openinstall",
          component: Openinstall
        },
        {
          path: '/homePage',
          name: 'homePage',
          component: HomePage
        },
        {
          path: '/business',
          name: 'business',
          component: Business
        },
        {
          path: '/industryStation',
          name: 'industryStation',
          component: IndustryStation
        },
        {
          path: '/LargeScreenMonitor',
          name: 'LargeScreenMonitor',
          component: LargeScreenMonitor
        },
        {
          path: '/createVersion',
          name: 'createVersion',
          component: CreateVersion
        },
        {
          path: '/informVersion',
          name: 'informVersion',
          component: InformVersion
        },
        {
          path:'/versionSettings',
          name: 'versionSettings',
          component: versionSettings
        },
        {
          path: '/subStation',
          name: 'subStation',
          component: SubStation
        },
        {
            path:'/examineLibrary',
            name: 'examineLibrary',
            component: examineLibrary
        },
        {
            path:'/cscLibrary',
            name: 'cscLibrary',
            component: cscLibrary
        },
        {
            path:'/salesLibrary',
            name: 'salesLibrary',
            component: salesLibrary
        },
        {
            path:'/createLibrary',
            name: 'createSalesLibrary',
            component: createSalesLibrary
        },
        {
            path:'/createProblem',
            name: 'createProblem',
            component: createProblem

        },
        {
            path:'/CustomerInformation',
            name: 'CustomerInformation',
            component: CustomerInformation
        },
        {
          path:'/recordDetail',
          name: 'recordDetail',
          component: RecordDetail
      },{
            path:'/ctDataBase',
            name: 'ctDataBase',
            component: ctDataBase
        },
          {
              path:'/ctWeChat',
              name: 'ctWeChat',
              component: ctWeChat
          },

          {
              path:'/ctRobot',
              name: 'ctRobot',
              component: ctRobot
          },

          {
              path:'/ctCustomer',
              name: 'ctCustomer',
              component: ctCustomer
          },

          {
              path:'/ctCustomerGrid',
              name: 'ctCustomerGrid',
              component: ctCustomerGrid
          },
          {
              path:'/ctOrder',
              name: 'ctOrder',
              component: ctOrder
          },
          {
              path:'/ctClient',
              name: 'ctClient',
              component: ctClient
          },
          {
              path:'/ctScript',
              name: 'ctScript',
              component: ctScript
          },
          {
            path:'/training',
            name: 'training',
            component: training
          },
          {
            path:'/companyAbout',
            name: 'companyAbout',
            component: companyAbout
          },          
          {
            path:'/createQuestion',
            name: 'createQuestion',
            component: createQuestion
          },{
            path:'/trainDetail',
            name: 'trainDetail',
            component: TrainDetail
          },
          {
            path:'/createTrain',
            name: 'createTrain',
            component: CreateTrain
          },
          {
            path:'/productDeployCreate',
            name: 'productDeploy_create',
            component: ProductDeployCreate
          },
          {
            path:'/productDeployList',
            name: 'ProductDeploy_list',
            component: ProductDeployList
          },
          {
            path:'/productDeployDetail',
            name: 'productDeployDetail',
            component: ProductDeployDetail
          }
      ]
    }
  ]
})
