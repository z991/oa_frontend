<template>
  <div class="zu">
      <p class="qu">权限和人员管理 > 组织架构</p>
      <div class="gou">
          <div id="myChart" class="left">
          </div>
          <div class="right">
              <h3>人员架构</h3>
              <p><span class='ren'>人员名称</span><span class='jiao'>角色名称</span></p>
              <ul>
                  <li v-for='(aa,index) in aabs' :key="index">
                      <span  class='ren'>{{aa.user_name}}</span><span class='jiao'>{{aa.group_name}}</span>
                  </li>
              </ul>
          </div>
      </div>
      <!--div id='myChart' style='width:300px;height:300px;'></div-->
  </div>
</template>
<script>
const photo = require('../assets/company.png')
import axios from 'axios';
import Qs from 'qs';
import Shade from './shade';
import Pagination from './pagination';
import axioIn from '../store/axioIn';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.withCredentials=true;//配置cookie
let echarts = require("echarts/lib/echarts")
// require('echarts/lib/chart/tree')
// let ecConfig = require('echarts/config')// 新版的暂时没有找到这个
export default {
  name:'zu',
  data:function(){
      return {
            aabs:[{user_name:'',group_name:''},{user_name:'',group_name:''}],
            iis:[
              {name:'研发中心',zong:false,children:[{name:'产品部'},{name:'运维部'},{name:'测试部'},{name:'售前组'},{name:'服务器组'}]},
              {name:'二级架构',zong:false,children:[{name:'客服部'},{name:'人事部'},{name:'行政部'}]}
            ],
            twoDirectory: [],
            myChart: '',
            option : {
                series : [
                    {
                        name:'树图',
                        type:'tree',
                        orient: 'horizontal',  // vertical horizontal
                        rootLocation: {x: '8%', y: 'center'}, // 根节点位置  {x: 'center',y: 10}
                        nodePadding: 50,
                        layerPadding: 90,
                        symbol: 'rectangle',
                        symbolSize: [80, 45],
                        itemStyle: {
                            normal: {
                                color: '#0386f0',
                                label: {
                                    show: true,
                                    position: 'inside',
                                    textStyle: {
                                        color: '#fff',
                                        fontSize: 14
                                    }
                                },
                                lineStyle: {
                                    color: '#ccc',
                                    width: 1,
                                    type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                                }
                            },
                            emphasis: {
                                color: '#0386f0',
                                borderWidth: 0,
                                label: {
                                    show: false,
                                    position: 'inside',
                                }
                            }
                        },
                        data: [
                            {
                                name: '总头',
                                meta: '1',
                                value: 6,
                                symbolSize: [70, 70],
                                symbol: 'image://'+photo,//'image://http://www.iconpng.com/png/ecommerce-business/iphone.png
                                itemStyle: {
                                    normal: {
                                        label: {show: false}
                                    }
                                },
                                children: [
                                    // {
                                    //     name: '研发中心',
                                    //     meta: '1',
                                    //     children: []
                                    // },
                                    // {
                                    //     name: '二级架构',
                                    //     meta: '1',
                                    //     children: []
                                    // }
                                ]
                            }
                        ]
                    }
                ]
            }
          //dataa:
          
      }
  },
  methods:{
      zuon:function(index){this.iis[index].zong=!this.iis[index].zong;},
      zukai:function(name){
          axioIn.get('/permission/structure/'+name+'/')
          .then((res)=>{//console.log(res.data.own_user)
              this.aabs=res.data.own_user;
              this.aabs.map(n=>{n.group_name=n.group.map(v=>v.name).join(',')})
              })
          .catch((err)=> console.log(err))
      },
      treeChart () {
          this.myChart = echarts.init(document.getElementById('myChart'));
          this.myChart.setOption(this.option)
          this.myChart.on(ecConfig.EVENT.CLICK, this.clickFun)
      },
      clickFun(param) {
            // 当前没显示
            if(param.data.children && param.data.children.length === 0){
                let twoNum = this.option.series[0].data[0].children;
                for(var i=0;i<twoNum.length;i++){
                    twoNum[i].children = []
                }
                if(param.name === this.option.series[0].data[0].name){
                    param.data.children = twoNum
                }else{
                    var id = param.data.id
                    for(let i=0;i<this.twoDirectory.length;i++){
                        if(id == this.twoDirectory[i].id){
                            param.data.children = this.twoDirectory[i].children
                        }
                    }
                }               
                this.myChart.refresh();
                return
            }else if(param.data.children && param.data.children.length !== 0){
                param.data.children = []
                this.myChart.refresh();
            }else{
                this.zukai(param.data.id)
                return
            }
            this.myChart.refresh(); //一定要refresh，否则不起作用
        },
        objectClone (obj,preventName) { // 深拷贝函数
			if((typeof obj)=='object'){ 
				var res=(!obj.sort)?{}:[]; 
				for(var i in obj){ 
					if(i!=preventName) 
						res[i]=this.objectClone(obj[i],preventName); 
				} 
				return res; 
				}else if((typeof obj)=='function'){ 
					return (new obj()).constructor; 
				} 
			return obj; 
		}
    },
  mounted:function(){
      let vue = this
      axioIn.get('/permission/structure/get_structure_tree/')
      .then((res)=>{
          res.data.children.forEach((n)=>{n.zong=false});
          vue.twoDirectory = this.objectClone(res.data.children)
          console.log(vue.twoDirectory)
          this.iis=res.data.children;
          for(var i = 0;i<this.iis.length;i++){
            this.option.series[0].data[0].children.push(this.iis[i])   
              this.option.series[0].data[0].children[i].children = []
          }
          vue.treeChart()
      })
      .catch((err)=> console.log(err))
  }
}
</script>
<style lang='scss' scoped>
@import '../assets/home';
.gou{width:100%;height:600px;}
a{display:inline-block;width:100px;height:40px;line-height: 40px;border:1px solid gray;border-radius:5px;margin:20px;}
.left{width:70%;height:580px;border:1px dashed gray;float:left;margin-left:15px;padding-top:20px;
.chan{height:82px;width:100%;}
.chann{float:left;}}
.right{width:28%;height:600px;border:1px dashed gray;float:left;
h3{border-bottom:1px solid gray;padding:0 0 15px 20px;text-align: left;}
li{margin:10px;}
.ren,.jiao{display:inline-block;text-align: center;}
.ren{width:30%;}
.jiao{width:68%;}}
</style>


