<template>
    <div class='openstationt'>
         <!-- <p style='' class='ccc'><span>工单管理 > 开站管理 >{{b3}}</span></p> -->
           <p  class='topLine'>
               <span class='line cd back'><span @click="stepOne"><em class='num num1'>1</em>公司信息</span></span>
               <span class='line cd back'><span @click="stepTwo"><em class='num num1'>2</em>站点信息</span></span>
               <span class='line  cd gray'><span @click="stepThree"><em class='num num1'>3</em>功能开关</span></span>
               <span style="cursor: pointer;"><span @click="stepFour"><em class='num'>4</em>账户配置</span></span>
            </p>
          <div  class='cen'>
            <div class="toggleInfo"  v-for='(itt,index) in ite6' :key='itt.id'>
              <div class="basicTitle">{{itt.product}}</div>
              <div class="toggleContent clear">
                <!-- <div> -->
                  <!-- <p class='mes'>{{itt.product}}</p> -->
                  <div class="singleFeature fl" v-for='it in itt.function' :key='it.id'>
                      <div v-show='it.show' v-bind:class="{ inde: it.inde }">
                          <p><label for=""><em class='ii' @change="select_(index,it.func_value)">*</em>{{it.func_name}}</label>
                          <select v-if='it.func_type==="单选框"&&it.selection.length>2' name="" id="" v-model='it.func_value' @change="select_(index,it.func_value)">
                              <option v-for='it in it.selection' :value="it.id" :key='it.id'>{{it.select_name}}</option>
                          </select>
                          <span v-else-if='it.func_type==="单选框"&&it.selection.length<=2'>
                            <!-- <input type="radio" v-for='it in it.selection' :key='it.id' v-model='it.func_value' @change="select_(index,it.func_value)" :value="it.id"><label>{{it.select_name}}</label> -->
                            <el-radio v-model='it.func_value' v-for='item in it.selection' :key='item.id' @change="select_(index,it.func_value,item,it.func_name)" :label="item.id">{{item.select_name}}</el-radio>
                          </span>
                          <input v-else type="text" v-model='it.func_value' >
                          </p>
                          <p v-for='(ic,index) in it.dependences' :key="index">{{ic}}</p>
                      </div>
                  </div>
                <!-- </div> -->
              </div>
            </div>
          </div>
          <p v-show="!productShow" class='bao zz' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='next()'>上一步</a><a href="javascript:void(0)" class='qub' @click='next2()'>下一步</a></p>
          <p v-show="productShow" class='bao zz' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='closeOperate()'>取消</a><a href="javascript:void(0)" class='qub' @click='sureOperate()'>确定</a></p>         
          <shade v-show='shad'></shade>
          <div v-show='tip' class='tip'>
            <div v-show="insert">带<em class='ii'>*</em>为必填</div><div v-show="individual"><span>{{errorMessage}}</span></div>
            <p class='bao ' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
          </div>
      </div>
</template>
<script >
import axioIn from '../store/axioIn'
import Shade from './shade';
import Router from "../router/index";
import {
    mapState,
    mapMutations,
    mapGetters,
} from 'vuex';
export default {
    name:'openstationt',
    components:{Shade},
    data:function(){
        return{
            ite6:[],
            b3:'',
            old_ite6:[],
            new_i:[],
            shad:false,
            tip:false,
            insert:false,
            individual:false,
            errorMessage:'',
            ill:[1],
            jing: '',
            chong: '',
            logArr:[],
            productParameter: {},//产品配置跳过来的，后台需要的参数
            productShow: false,//产品配置过来的这一步显示确定
        }
    },
    created:function(){
      axioIn.get('/api/product/product/foropen/').then((res)=>{
        this.jing=res.data.map(n=>n.id) // 合同产品
      })
      axioIn.get('/api/product/ref-product/foropen/').then((res)=>{
        this.chong=res.data.map(n=>n.id) // 合同产品
      })
      if(window.sessionStorage.productStart){//判断是否是产品配置跳转过来的
          this.productParameter = JSON.parse(window.sessionStorage.productStart);
          this.productShow = true;
      } 
      
        if(this.$store.state.functio.length!==0){
            
            // 洗后台传过来的数据
            this.$store.state.functio.map(n=>{n.function.map(v=>{
                if(v.show===undefined){
                this.$set(v,'show',false);
                this.$set(v,'func_value','');
                this.$set(v,'inde',true)}
                //if(this.$store.state.id===undefined){v.func_value=v.}
                //v.show=false;v.func_value=''
            })})
                
            this.ite6=this.$store.state.functio;//console.log(JSON.stringify(this.ite6))
            this.ite6.map(n=>{//显示功能列表
                n.function.map(v=>{
                    if(v.parent===null){v.show=true;v.inde=false}
                    if(v.func_type==='单选框'&&v.func_value===''){
                        v.selection.map(n1=>{
                            if(n1.is_default===true){
                                v.func_value=n1.id;//console.log(n1.id)
                            }
                        })
                    }
                }) 
            })
        }
        else if(this.$store.state.functio.length===0&&this.$route.query.id!==undefined){
          
            let parentLevel = window.sessionStorage.getItem('stationType');
            let str = parentLevel ? '?its_parent=' + parentLevel : '';
            axioIn.get('/api/workorder/openstation/'+this.$route.query.id+'/'+str)
                .then((res)=>{
                    this.$store.commit('evaluate',res.data.company_info);
                    this.$store.commit('evaluate1',res.data.link_info);//console.log(JSON.stringify(lill))
                    this.$store.commit('evaluate2',res.data.station_info);
                    this.$store.commit('evaluate4',res.data.account_conf);
                    this.$store.commit('evaluate6',res.data.func_list);
                    this.account_conf=this.$store.state.account_conf[0];
                    this.getFunction()
                })
            
        }
        if(this.$store.state.id===undefined){this.b3='新增'}
        else{this.b3='修改'}
        if(this.$store.state.func_list.length!==0){
            this.ite6.map(n=>{
                n.function.map(v=>{
                    this.$store.state.func_list.map(b=>{
                        if(b.function===v.id){
                            if(v.func_type==='单选框'){v.func_value=b.id}
                            else{ v.func_value=b.select_value; }
                        }
                    })
                })
            })
        }
        
    },
    methods:{
        ...mapMutations(['LOG_FUNCTION']),
        next:function(){
            this.$store.commit('evaluate3',this.ite6);
            Router.push({ path: "/openstations",query:{id:this.$route.query.id}})
        },
        next2:function(){
            var aa=false;
            this.ite6.map(n=>{
                n.function.map(v=>{
                    if(v.show===true&&v.func_value===''){aa=true;return}
                })
            })
            if(aa===false){
                this.$store.commit('evaluate3',this.ite6);
                // console.log(this.$store.state.company_info)
               Router.push({ path: "/openstationfr",query:{id:this.$route.query.id}})}
            else{
                this.shad=true;this.tip=true;this.insert=true;
            }
        },
        select_:function(index,id,item,name){//显示功能列表


            let  logArr= {
                 name: name,
                 old_value: item.old_value,
                 new_value: item.select_name
            }

            if (logArr.new_value =="开通"){
                logArr.old_value='关闭'
            }else if (logArr.new_value=="关闭") {
                logArr.old_value='开通'
            }else if (logArr.new_value =="启用"){
                logArr.old_value='不启用'
            }else if (logArr.new_value=="不启用") {
                logArr.old_value='启用'
            }
            console.log(logArr);
            this.LOG_FUNCTION(logArr);
            this.ite6[index].function.map(n=>{
               // n.function.map(v=>{
                 if(n.parent !== null){
                    if(n.parent.length===0){n.show=true}
                    else{n.show=false}
                  }
                //})  
            })
            var aa=[];var bb=[],cc=[];//console.log(index,id)
            // this.ite6[index].function.map(n=>{//选出子
            //     n.selection.map(v=>{
            //         if(v.id===id||v.select_value===id){aa=v.childfunc}
            //     })
            // })
            // this.set_show(aa,index);
            this.digui(index);
            this.digui1(index);
            // this.ite6[index].function.map(v=>{
            //     if(v.show===false&&v.selection.length!==0){
            //         cc=v.selection.map(n=>n.childfunc);
            //         cc=[...new Set(cc.join(',').split(','))];//console.log(cc)
            //         this.set_hide(cc,index);//console.log(JSON.stringify(this.ite6))
            //     }
            // })
        },
        set_show:function(aa,index){//使aa里面的id显示出来
            aa.map(v=>{
                this.ite6[index].function.map(n=>{
                   if(n.id===v||n.select_value===v){n.show=true;
                    }
                })
            })
        },
        set_hide:function(aa,index){//使aa里面的id隐藏起来
            aa.map(v=>{
                this.ite6[index].function.map(n=>{
                   if((n.id==v||n.select_value===v)&&v!==''){n.show=false;
                    }
                })
            })
        },
        digui:function(index){//向上显示父
            this.ite6[index].function.map(v=>{
                if(v.show===true&&v.parent){
                    this.ite6[index].function.map(n=>{
                        if((n.id===v.parent[0]||n.select_value===v.parent[0])&&n.show===false){
                            n.show=true;
                           if(n.parent){
                               this.digui(index)
                           }
                            }
                        
                    })
                    
                }
            })
        },
        digui1:function(index){//向下显示子
            this.ite6[index].function.map(n=>{
                if(n.func_value===''){return}
                // n.selection.map(v=>{
                //     if((v.id===n.func_value||v.select_value===n.func_value)&&v.childfunc.length!==0){
                //         v.childfunc.map(x=>{
                //             this.ite6[index].function.map(c=>{
                //                if(c.id===x){
                //                    c.show=true
                //                    if(c.func_value!==''&&c.show===false){this.digui1(index)}
                //                    }
                //            })
                //         })
                        
                //     }
                // })
            })
        },
        tipp:function(){this.shad=false;this.tip=false;},
        stepOne () {
          if(this.b3==='修改')
            Router.push({ path: "/openstationf" ,query: {id: this.$route.query.id}});
        },
        stepTwo () {
          if(this.b3==='修改')
            Router.push({ path: "/openstations" ,query: {id: this.$route.query.id}});
        },
        stepThree () {
          if(this.b3==='修改')
            Router.push({ path: "/openstationt" ,query: {id: this.$route.query.id}});
        },
        stepFour () {
          if(this.b3==='修改')
            Router.push({ path: "/openstationfr" ,query: {id: this.$route.query.id}});
        },
        getFunction: async function() {
               console.log('function')
              let station = this.$store.state.station_info
              //this.shad=true;
              let bb = this.$route.query.id ? this.$route.query.id : 'post';
                //   let bb = this.$route.query.id || '';
              let aa='';
              aa='grid='+station.grid+'&cli_version='+station.cli_version;
              station.pact_products.map(n=>{aa=aa+'&product='+n});
              if(station.classify==1){//经典版
                await  axioIn.get('/api/product/product/for_open_func/?station='+bb+'&'+aa,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
                .then((res)=>{
                  var funcData = this.formatData(res.data);
                  this.$store.commit('evaluate3',funcData);
                })
              }else{//重构版
                let bb = this.$route.query.id ? this.$route.query.id : 'post';
                await axioIn.get('/api/product/ref-product/for_open_func/?station='+bb+'&'+aa,{headers:{'Content-Type':'application/x-www-form-urlencoded'}})
                .then((res)=>{//console.log(this.station_info.pact_products)
                  if(this.$store.state.functio.length!==0){
                      let ac=this.$store.state.functio.map(n=>n.id);//console.log(ac)
                      var apl=new Set(ac);//console.log(apl)
                      var aj=new Set(this.jing);//console.log(JSON.stringify(aj))
                      var ach=new Set(this.chong);//console.log(JSON.stringify(ach))
                      var bjin=new Set(station.pact_products);
                      var differenceABSet = new Set([...bjin].filter(x => !apl.has(x)));
                      let d=Array.from(differenceABSet);//console.log(d)
                      let e=new Set([...apl].filter(x => !bjin.has(x)));
                      let g=Array.from(e);
                      if(station.classify==1){g=g.concat(this.chong)}
                      else{g=g.concat(this.jing)}
                    //   console.log(g)
                      let f=this.$store.state.functio;
                      if(d.length!==0){
                        d.map(n=>{
                          res.data.map(v=>{
                              if(v.id===n){
                                  v.show=false;v.func_value='';v.inde=true;
                                  f.push(v)
                              }
                          })
                        })  
                        g.map(n=>{
                          f.map((v,index)=>{
                              if(v.id===n){
                                  f.splice(index,1)
                              }
                          })
                        });
                        this.$store.commit('evaluate3',f)
                      }
                  }else{
                    var funcData = this.formatData(res.data);
                    this.$store.commit('evaluate3',funcData);
                    // this.$store.commit('evaluate3',res.data);
                  }
                //   this.$store.commit('evaluate3',res.data);
               })
              }
              this.$store.state.functio.map(n=>{n.function.map(v=>{
                if(v.show===undefined){
                this.$set(v,'show',false);
                this.$set(v,'func_value','');
                this.$set(v,'inde',true)}
                //if(this.$store.state.id===undefined){v.func_value=v.}
                //v.show=false;v.func_value=''
            })})
                
            this.ite6=this.$store.state.functio;//console.log(JSON.stringify(this.ite6))
            this.ite6.map(n=>{//显示功能列表
                n.function.map(v=>{
                    if(v.parent===null){v.show=true;v.inde=false}
                    if(v.func_type==='单选框'&&v.func_value===''){
                        v.selection.map(n1=>{
                            if(n1.is_default===true){
                                v.func_value=n1.id;//console.log(n1.id)
                            }
                        })
                    }
                }) 
            })
        },
        formatData (data) {//洗后台传过来的功能开关的数据
            var ary = [];var sub = '';var funcSub = '';
            data.map(n=>{
                var flag = false,funexit = false;
                ary.map((m,index)=>{
                    if(n.product === m.product){
                        flag = true;sub = index;
                        if(m.function.length!==0){
                            m.function.map((v,num)=>{
                                if(v.func_name === n.func_name){funexit=true;funcSub=num;}
                            })
                        }
                    }
                })
                if(!flag){
                    var obj = {};obj['product'] = n.product;obj['id'] = n.id;obj['function'] = [];var chilObj = {};
                    chilObj['func_name'] = n.func_name;chilObj['id'] = n.func_id;chilObj['func_type'] = n.func_type;
                    // if(n.parent === null){chilObj['parent'] = [];}else{chilObj['parent']=n.parent;}
                    chilObj['parent']=n.parent;
                    obj['function'].push(chilObj);
                    chilObj['selection'] = [];var seleObj = {};
                    seleObj['id'] = n.selec_id;seleObj['select_name'] = n.selec_name;seleObj['select_value'] = n.selec_value;seleObj['is_default'] = n.is_default;chilObj['selection'].push(seleObj)
                    ary.push(obj);
                }
                else{
                    if(funexit){
                        var seleObj = {};
                        seleObj['id'] = n.selec_id;seleObj['select_name'] = n.selec_name;seleObj['select_value'] = n.selec_value;seleObj['is_default'] = n.is_default;
                        ary[sub].function[funcSub]['selection'].push(seleObj)
                    }else{
                        var chilObj = {};
                        chilObj['func_name'] = n.func_name;chilObj['id'] = n.func_id;chilObj['func_type'] = n.func_type;
                        // if(n.parent === null){chilObj['parent'] = []}else{chilObj['parent']=n.parent;}
                        chilObj['parent']=n.parent;
                        ary[sub]['function'].push(chilObj);
                        chilObj['selection'] = [];var seleObj = {};
                        seleObj['id'] = n.selec_id;seleObj['select_name'] = n.selec_name;seleObj['select_value'] = n.selec_value;seleObj['is_default'] = n.is_default;chilObj['selection'].push(seleObj)
                    }
                }
            })
            return ary;
        },
        closeOperate () {//产品配置跳转过来的，取消
            window.sessionStorage.removeItem('stationType');window.sessionStorage.removeItem('productStart');
            Router.push({path: '/productDeployDetail',query: {id: this.productParameter.detailId}});
        },
        sureOperate () {//产品配置跳转过来的，确定
        
            var aa=false;
            this.ite6.map(n=>{
                n.function.map(v=>{
                    if(v.show===true&&v.func_value===''){aa=true;return}
                })
            })
            if(aa===false){
                let _this = this;
                var aa=this.ite6;
                var bb=[];
                var aac={}
                aa.map(n=>{
                    n.function.map(v=>{
                        v.value=[];v.valu=[];
                        if(v.func_type==='单选框'){
                            v.valu.push(v.func_value)
                        }
                        else{v.value.push({id:v.id,value:v.func_value})}
                    })
                    n.function.map(v=>{
                        bb.push({product:n.id,id:v.valu,ipu:v.value})
                    })
                })
                aac.company_info=this.$store.state.company_info
                aac.link_info=this.$store.state.link_info
                aac.station_info=this.$store.state.station_info
                aac.account_conf=this.$store.state.account_conf;
                aac.func_list=bb;

                let flag=true;let str = '';
                let parentId = window.sessionStorage.getItem('stationType');
                aac.company_info.customer_type=this.$store.state.customer_type
                if( aac.company_info.customer_type=='1'){
                    aac.company_info.customer_type=flag;
                }else{
                    flag=false
                    aac.company_info.customer_type=false;
                }
                if(parentId){
                    aac.its_parent = parentId;str = '?its_parent='+parentId;
                    aac.open_id = parentId;aac.children_id = this.productParameter.id;
                }else{
                    aac.its_parent = '';
                    aac.open_id = this.$route.query.id;
                }
                aac.actual_start_time = this.productParameter.start;
                // return;
                axioIn.put(`/api/workorder/product_config/${this.productParameter.detailId}/product_open/${str}`,aac).then(res=>{
                    this.$message({
                        message: '操作成功！',
                        type: 'success',
                        duration: 1200,
                        onClose: function () {
                            _this.$store.commit('evaluate2',{});
                            _this.$store.commit('evaluate4',[]);
                            _this.$store.commit('evaluate6',[]);
                            window.sessionStorage.removeItem('stationType');window.sessionStorage.removeItem('productStart');
                            Router.push({path: '/productDeployDetail',query: {id: _this.productParameter.detailId}});
                        }
                    });
                    
                })
            }else{
                this.shad=true;this.tip=true;this.insert=true;
            }
        }
    }
}
</script>
<style lang='scss' scoped>
.openstationt{margin:auto;position: relative;min-height:700px;width:100%;background:#fff;
    .clear:after{content: "";display:block;clear:both;}
    .fl{float:left;}
    .ccc{height:30px;line-height:30px;padding-left:20px;text-align: center;background-color: #fff;border-radius: 3px;margin-bottom: 20px;}
    // .cen{width:70%;padding: 0 15%;background-color: #fff;position: relative;p{padding: 10px 20px;}}
    .cen{background:#fff;padding-top:15px;color:#868484;}
    .toggleInfo{margin:0 30px;margin-bottom:15px;border:1px solid #d5d6d8;border-radius:5px;
      .basicTitle{font-size:16px;padding-left:18px;text-align:left;height:38px;line-height:38px;color:#333;background:#f6f6f6;border-bottom:1px solid #d5d6d8;}
    }
    .toggleContent{width:94%;padding-right: 6%;background-color: #fff;position: relative;p{padding: 10px 20px;}}
    .singleFeature{width:48%;margin:0 1%;}
    .topLine{margin:auto;border-bottom: 1px solid #edf2f5;height: 23px;line-height: 23px;padding:18px 17%;background-color: #fff;}
    p{position:relative;text-align:left;font-size:14px;width:auto;
    .clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;
    position:absolute;top:20px;right:20px;}
    
    input{width:50%;height:32px;padding-left:10px;border-radius:5px;border:1px solid #d0d8da;}
    input[type=checkbox]{width:50px;}
    input[type=radio]{width:30px;}
    .sp{display:inline-block;height:32px;line-height:20px;position:relative;width:100px;}
    .spp{display: inline-block;height:32px;width:160px;position: relative;
    input[type=checkbox]{display: inline-block;width:50px;height:20px;line-height:35px;position: relative}}
    select{height:32px;width:51%;padding-left:10px;border-radius:5px;border:1px solid gray;}
    option{padding:5px;}
    .num{display:inline-block;border:1px solid gray;width:20px;height:20px;font-style:normal;border-radius:50%;
    margin:0 10px;text-align:center;}
    .num1{color:white;background-color:#067ad8;border-color:#067ad8;}
    }
    p>label{width:35%;margin-right:10px;text-align:right;display:inline-block;font-size: 14px;}

    .cen .mes{text-align:left;font-size:15px; padding: 10px}
    .line{color:#067ad8;width:18%;span{cursor:pointer;}}
    .cd{display:inline-block;width:18%;&:hover{cursor: pointer;}}
    .back{background:url(../assets/blue.png) no-repeat 120px 10px}
    .gray{background:url(../assets/gray.png) no-repeat 120px 10px}
    
    .dele{display:inline-block;padding:0px 8px;background:url(../assets/dele.png) no-repeat center;
    position:relative;top:5px; }
    .ii{font-style:normal;color:red;margin-right:5px;}
    .inde{text-indent: 30px;input,select{width:383px;}}
    .zz{background-color: #fff;margin-right: 0;margin-top:15px;padding: 21px 20px 23px 0;border: 1px solid #e9e9e9;border-radius: 3px;}
}
</style>