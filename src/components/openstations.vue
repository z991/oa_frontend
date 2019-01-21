<template>
    <div class='openstations'>
          <!-- <p style='' class='ccc'><span>工单管理 > 开站管理 >{{b3}}</span></p> -->
           <p class='topLine'>
               <span class='line cd back'><span @click="stepOne"><em class='num num1'>1</em>公司信息</span></span>
              <span class=' cd gray'><span @click="stepTwo"><em class='num num1'>2</em>站点信息</span></span>
              <span class=' cd gray'><span @click="stepThree"><em class='num'>3</em>功能开关</span></span>
              <span style="cursor: pointer;"><span @click="stepFour"><em class='num'>4</em>账户配置</span></span></p>
          <div class='cen'>
          <p class='mes'></p>
          <div class="stationInfo">
            <div class="basicTitle">站点信息</div>
            <div class="stationContent">
            <P><label for=""><em class='ii'>*</em>企业ID</label>
                <input type="text" v-model='station_info.company_id' maxlength="20" v-bind:disabled='adisab2'>
            </P>
          <P v-show="childShow"><label for=""><em class='ii'>*</em>产品分类</label>
              <!-- <select name="" id="" v-model='station_info.classify'   @change="check_class(station_info.classify)">
                  <option value="1">经典版</option>
                  <option value="2">重构版</option>
              </select> -->
              <span>
                <!-- <input  v-model='station_info.classify' type="radio" value="1"><label for="">经典版</label> -->
                <!-- <input v-model='station_info.classify' type="radio" value="2"><label for="">重构版</label> -->
                <el-radio v-for="item in chooseVersion" :key="item.value+'a'" v-model='station_info.classify' :label="item.value" @change="check_class(station_info.classify)">{{item.name}}</el-radio>
               
                <!-- <el-radio v-model='station_info.classify' label="1" @change="check_class(station_info.classify)">经典版</el-radio> -->
                <!-- <el-radio v-model="station_info.classify" label="2" @change="check_class(station_info.classify)">重构版</el-radio> -->
              </span>
          </P>
            <P v-show="childShow"><label for=""><em class='ii'>*</em>部署方式</label>
                <select name="" id="" v-model='station_info.deploy_way'  @change="selectVal(station_info.deploy_way,station_info.classify)">
                  <option value="1">标准版</option>
                  <option value="2">公有云</option>
                  <option value="3">专属云</option>
                  <option value="4">私有云</option>
                </select></P><!--  @blur='blurr()' v-model.number='station_info.validity_days' -->
            <P><label for=""><em class='ii'>*</em>有效日期</label>
              <input style="width:170px;" type="text" v-model="station_info.open_station_time" maxlength="50" disabled='disabled' />
              <span style="width:50px;text-align:center;color:#d0d8da;">———</span>
              <el-date-picker
                type="date"
                format="yyyy-MM-dd "
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                :picker-options="pickerOptions"
                v-model="station_info.close_station_time"
                @change="pick" 
                size="small">
              </el-date-picker>
              <!-- <input style="width:170px;" type="text" v-model="station_info.close_station_time" @focus='focu()'  -->
                  <!-- readonly="true" @mouseleave='hidee()' />@blur='figure()' -->
              <span>共{{station_info.validity_days}}天</span>
              <!-- <datee style="left:calc(15% + 260px);" v-if='date_s' v-on:incrementt="incrementTi"  @mouseleave.native='hide1()'></datee>           -->
            </P>
            <!-- </P> -->
            <P v-show="childShow">
              <label for=""><em class='ii'>*</em>节点选择</label>
              <select name="" id="" v-model='station_info.grid'>
                  <option v-for='it in ite4' :value="it.id" :key='it.id'>{{it.grid_name}}</option>
              </select></P>
            <!-- <P><label for="">客户版本</label>
                <select name="" id="" v-model='station_info.cli_version'  >
                    <option value="1">B2B</option>
                    <option value="2">B2C</option>
                </select><em class='ii'>*</em>
            </P> -->
            <P v-show="childShow">
              <label for=""><em class='ii'>*</em>客户版本</label>
              <span>
                <el-radio v-for="item in chooseClientele" :key="item.value+'b'" v-model='station_info.cli_version' :label="item.value">{{item.name}}</el-radio>
                <!-- <el-radio v-model='station_info.cli_version' label="1">B2B</el-radio> -->
                <!-- <el-radio v-model="station_info.cli_version" label="2">B2C</el-radio> -->
              </span>
              
            </P>
            <p><label><em class='ii'>*</em>选择版本ID</label><select name="" id="" v-model='station_info.version_id'><option :value="item.key" v-for="item in versionId" :key="item.value">{{item.value}}</option></select></p>
            </div>
          </div>
          <div class="pactInfo">
            <div class="basicTitle">合同产品</div>
            <div class="pactContent">
              <!-- <p class='mes'><em class='ii'>*</em></p> -->
              <!-- <p style="padding-left: 10%"></p> -->
              <!-- <p><label>合同金额</label><label type="text" v-model='station_info.contract_amount' v-number-only="station_info.contract_amount"></p> -->
              <!-- <p><label>回款金额</label><input type="text" v-model='station_info.amount_cashed'  v-back-Num:back="station_info.amount_cashed"></p> -->
              <p><label for="">SDK_key</label><input type="text" v-model='uuidCode' disabled='disabled'></p>          
              <p class="productType">
                <label for=""><em class='ii'>*</em>产品类型</label>
                <span class="parentPact"><span class='spp' v-for='it in ite5' :key='it.id'>
                  <input @click="ticked(it)" type="checkbox" :value='it.id' :disabled="it.forbidden" v-model='station_info.pact_products' >
                  <span class='sp'>{{it.product}}</span></span></span>
                  
              </p>
            </div>
          </div>
          <div class="supportInfo" v-show="childShow">
            <div class="basicTitle">支持人员</div>
            <div class="supportContent">
              <!-- <p class='mes'>支持人员：</p> -->
              <p><label for=""><em class='ii'>*</em>销售人员</label><input type="text" v-model='station_info.sales' ></p>
              <p><label for="">售前人员</label><input type="text" v-model='station_info.pre_sales' ></p>
              <p><label for="">运营顾问</label><input type="text" v-model='station_info.oper_cslt' ></p>
              <p><label for=""><em class='ii'>*</em>实施顾问</label><input type="text" v-model='station_info.impl_cslt' ></p>
              <p><label for=""><em class='ii'>*</em>运营支持</label><input type="text" v-model='station_info.oper_supt' ></p>
            </div>
          </div>
          </div>
          <p class='bao zz' style='text-align:right'><a v-show="lastShow" href="javascript:void(0)" class='quu' @click='add1()'>上一步</a>
              <a href="javascript:void(0)" class='qub' @click='next1()'>下一步</a></p>              
          <shade v-show='shad'></shade>
          <div v-show='tip' class='tip'>
            <div v-show="insert">带<em class='ii'>*</em>为必填</div><div v-show="individual"><span>{{errorMessage}}</span></div>
            <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
          </div>
      </div>
</template>
<script >
import axioIn from '../store/axioIn'
import Shade from './shade';
import Datee from './date'
import Router from "../router/index";
export default {
    name:'openstations',
    components:{Shade,Datee},
    data:function(){
        return {
            b3:'新增',
            value1: '',
            limitTime: new Date('2018-08-28').getTime(),
            pickerOptions: {
            disabledDate:(time)=> {
              return time.getTime() < this.limitTime
            }
           },
            station_info:{
                company_id:'',
                deploy_way:'',
                validity_days:'',
                grid:'',
                cli_version:'',
                pact_products:[],
                open_station_time:'',
                close_station_time:'',
                sales:'',
                classify:'',
                pre_sales:'',
                oper_cslt:'',
                impl_cslt:'',
                oper_supt:'',
                version_id: 1
                // linkage:'1',
            },
            adisab2:false,
            date_s:false,
            ite4:[],
            ite5:'',
            checkedite:{
                value:1,
                product:"关联",
     
            },
            uuidCode: '',
            tip:false,
            shad:false,
            errorMessage:'',
            insert:true,
            individual:false,
            jing:'',//经典版本合同产品
            chong:'',//重构版本合同产品
            pro: null,
            versionId: null,
            chooseVersion: [{name: '经典版',value: 1},{name: '重构版',value: 2}],
            chooseClientele: [{name: 'B2B',value: 1},{name: 'B2C',value: 2}],
            childShow: true,
            lastShow: true,
        }
    },
    directives: {
     numberOnly: {
            bind: function(el,bindings) {

            },
          　update:function(el,bindings,old){
            var formatVal = /^[\d\.]{1,12}$/;
            var val = bindings.value;
            if(!formatVal.test(val)){
              old.context.station_info.contract_amount = ''
            //   var reg = new RegExp(val,'g');
            }
            // if(bindings.value>999999999){
            // old.context.station_info.contract_amount=999999999;
            // }
          },
       },
       backNum: {
           update: function(el,bindings,old){
               var formatVal = /^[\d\.]{1,12}$/;
                var val = bindings.value;
                if(!formatVal.test(val)){
                    old.context.station_info.amount_cashed = ''
                }
                // if(bindings.value>999999999){
                //     old.context.station_info.amount_cashed=999999999;
                // }
           }
       }
    },
    watch: {
        ite5: function (old) {
            // console.log(this.ite5.length)
        }
    },
    mounted: async function(){
        if(window.sessionStorage.productStart){//判断是否是产品配置跳转过来的
          this.lastShow = false;
        } 
        var time = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate();
        var _this = this;
        this.station_info.open_station_time = time;//console.log(this.$store.station_info.classify)
        axioIn.get('/api/workorder/openstation/get_version_choice/').then(res=>{
            this.versionId = res.data;
        })
        this.childShow = window.sessionStorage.getItem('stationType') ? false : true; 
        this.uuidCode = this.uuid()
        if(this.$store.state.station_info.company_id!==undefined){
            var a1=await axioIn.get('/api/product/grid/foropen/?is_open=1&deploy_way='+this.$store.state.station_info.deploy_way)
            .then((res)=>{
                this.ite4 = res.data.filter(item => {
                    return item.deploy_way == this.$store.state.station_info.deploy_way;
                })
                this.check_class(this.$store.state.station_info.classify);
            })
              
            this.station_info.pact_products=this.$store.state.station_info.pact_products;
            this.adisab2=true;
            //this.ite4=this.$store.state.ite4
            this.station_info=this.$store.state.station_info;
            //this.station_info.grid=this.$store.state.station_info.grid
            //console.log(this.$store.state.station_info.deploy_way)
        }else if(this.$store.state.station_info.company_id===undefined&&this.$route.query.id!==undefined){
            let parentLevel = window.sessionStorage.getItem('stationType');
            let str = parentLevel ? '?its_parent=' + parentLevel : '';
             await axioIn.get('/api/workorder/openstation/'+this.$route.query.id+'/'+str)
                .then((res)=>{
                    this.$store.commit('evaluate',res.data.company_info);
                    this.$store.commit('evaluate1',res.data.link_info);
                    this.$store.commit('evaluate2',res.data.station_info);
                    this.$store.commit('evaluate4',res.data.account_conf);
                    this.$store.commit('evaluate6',res.data.func_list);
                    axioIn.get('/api/product/grid/foropen/?is_open=1&deploy_way='+res.data.station_info.deploy_way)
                       .then((res1)=>{
                           this.ite4 = res1.data.filter(item => {
                                return item.deploy_way == res.data.station_info.deploy_way;
                            })
                            
                            this.check_class(res.data.station_info.classify);
                    
                            this.station_info=this.$store.state.station_info;
                            this.station_info.grid=res.data.station_info.grid;
                       })
                    //this.selectVal()

                    // this.check_class(res.data.station_info.classify);
                    
                    // this.station_info=this.$store.state.station_info;
                    // this.station_info.grid=res.data.station_info.grid;
                })
                this.station_info.pact_products=this.$store.state.station_info.pact_products;
        }
        this.$store.commit('evaluate5',this.$route.query.id);//产品配置跳转过来直接到第二步
        if(this.$store.state.id===undefined){
          this.b3='新增';this.limitTime = Date.now();
          this.station_info.oper_supt = window.sessionStorage.getItem('loginName');
        }else{
          this.b3='修改';this.limitTime = new Date(this.station_info.open_station_time).getTime()
        }
        axioIn.get('/api/product/product/foropen/')
                .then((res)=>{
                this.jing=res.data.map(n=>n.id) // 合同产品
               })
        axioIn.get('/api/product/ref-product/foropen/')
                .then((res)=>{
                this.chong=res.data.map(n=>n.id) // 合同产品
                }) 
        // this.station_info.classify = this.station_info.classify.toString()
        },
    methods:{
      pick (value) {
        var split_open = this.station_info.open_station_time.split('-');
        var split_close = this.station_info.close_station_time.split('-');
        var aa = new Date(split_open[0],split_open[1]-1,split_open[2]).getTime()
        var bb = new Date(split_close[0],split_close[1]-1,split_close[2]).getTime();
        var date = (bb-aa)/1000/60/60/24;
        this.station_info.validity_days = date;
        return false
      },
        // aa () {
        //     if(this.figure()===false){this.date_s=false;}
        //     console.log(this.$refs.tree.className)
        // },
        checkitem(item){
             if(item.value){
                 item.value=0;
            }else{
                item.value=1;
            }
        },
        ticked (item) {
            var _this = this

            setTimeout(function(){
                if(_this.station_info.pact_products.includes(8)){ //方案二
                    _this.ite5.map(n=>{
                        if(n.id == 3){
                            _this.$set(n,'forbidden',true)
                        }
                    })
                }else{
                    _this.ite5.map(n=>{
                        if(n.id == 3){
                            _this.$set(n,'forbidden',false)
                        }
                    })
                }
                if(_this.station_info.pact_products.includes(3)){
                    _this.ite5.map(n=>{
                        if(n.id == 8){
                            _this.$set(n,'forbidden',true)
                        }
                    })
                }else{
                    _this.ite5.map(n=>{
                        if(n.id == 8){
                            _this.$set(n,'forbidden',false)
                        }
                    })
                }
                if(_this.station_info.pact_products.includes(8) && _this.station_info.pact_products.includes(3)){
                    _this.ite5.map(n=>{
                        if(n.id == 8 || n.id == 3){
                            _this.$set(n,'forbidden',false);
                        }
                    })
                }
            },100)
        },
        selectVal:function(n,classify){//根据部署方式获取节点信息
            if(!classify){
                this.station_info.deploy_way = "";
                alert('请先选择产品分类');
                return
            } 
            if(n!==''&&n!==undefined){ 
                axioIn.get('/api/product/grid/foropen/?is_open=1&deploy_way='+n)
                .then((res)=>{
                    this.ite4 = res.data.filter(item => {
                        return item.version_type == classify && item.deploy_way == n;
                    })
                    this.station_info.grid=''
                })
            }
        },
        formatData (data) {//洗后台传过来的功能开关的数据
            var ary = [];var sub = '';var funcSub = '';
            // console.log(this.$store.state.functio);return
            // this.$store.state.functio.forEach(n => {
            //     console.log(n)
            // });
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
        next1:async function(){
          var aa=false;var bb=false;
          var ece;
          this.$store.commit('evaluate7',this.station_info.pact_products)
          //this.ite4.map(n=>{
              //if(n.id===this.station_info.grid){ece=n.id}
         // })
         for(let i in this.station_info){
              if(i!=='pre_sales'&&i!=='oper_cslt'){//
                  if(this.station_info[i]===''||this.station_info[i]===undefined){aa=true;this.insert = true;this.individual = false;}
              }
              }
          if(this.station_info.pact_products.length===0){aa=true;this.insert = true;this.individual = false}
          if(aa===true){this.shad=true;this.tip=true;this.insert=true;return}
          if(this.b3==='新增'){//新增验证企业id
              var regkf = /^kf_\d{1,}$/g;
              var regaz = /^[A-Za-z]{1,}_1000$/g;
              var aip=regaz.test(this.station_info.company_id);
              var aio=regkf.test(this.station_info.company_id);
              var kf = aio&&!(this.station_info.cli_version==2);
              var other = aip&&!(this.station_info.cli_version==1)      
              var company = aio||aip
              //console.log(aio,aip,company)
            //   var other = regaz.test(this.station_info.company_id);
              if(this.station_info.company_id===''||this.station_info.grid===undefined){alert('企业id和节点不可为空')}
              else if(!company){alert('企业id只能为kf_加数据或者字母_1000');return}
              else{
                  const aia=await axioIn.get('/api/workorder/openstation/verify_company_id/?company_id='+this.station_info.company_id+'&grid_id='+this.station_info.grid+'&version='+this.station_info.classify)
                  .then((res)=>{})
                  .catch(error=>{
                    //   alert(error.data.error)
                      bb=true
                      this.$notify.error({
                        title: '错误',
                        message: error.error || '出错了'
                      });
                      })
                }
                if(bb===true){return}
            }
          var indate = /^\d+$/g
          /*if(!indate.test(this.station_info.validity_days) || this.station_info.validity_days<0 || this.station_info.validity_days===0){
              this.errorMessage = '有效期填写正确格式'
              this.insert = false
              this.individual = true
              aa = true
          }else{
              this.errorMessage = ''
              this.insert = true
              this.individual = false
              aa = false
          }/*/
          var regkf = /^kf_\d+$/g;
          var regaz = /^[A-Za-z]+_1000$/g;
          var kf = regkf.test(this.station_info.company_id)&&!(this.station_info.cli_version==2);
          var other = regaz.test(this.station_info.company_id)&&!(this.station_info.cli_version==1)
          if(kf || other){
            this.errorMessage = '客户版本错误'
            this.insert = false;this.shad=true;this.tip=true;
            this.individual = true
            aa = true;return
          }else{
            this.errorMessage = ''
            this.insert = true
            this.individual = false
            aa = false
          }
        //   for(let i in this.station_info){
        //       if(i!=='pre_sales'&&i!=='oper_cslt'){
        //           if(this.station_info[i]===''||this.station_info[i]===undefined){aa=true;this.insert = true;this.individual = false}
        //       }
        //       }
        //   if(this.station_info.pact_products.length===0){aa=true;this.insert = true;this.individual = false}
          //console.log(JSON.stringify(this.func_list1))
            if(aa===false){
              //this.shad=true;
              let bb = this.$route.query.id ? this.$route.query.id : 'post';
                //   let bb = this.$route.query.id || '';
              let aa='';
              aa='grid='+this.station_info.grid+'&cli_version='+this.station_info.cli_version;
              this.station_info.pact_products.map(n=>{aa=aa+'&product='+n});
              this.$store.commit('evaluate2',this.station_info);
              if(this.station_info.classify==1){//经典版
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
                      var bjin=new Set(this.station_info.pact_products);//console.log(bjin)
                      /*/if(this.station_info.classify==1){
                         apl=new Set([...apl].filter(x => !ach.has(x)))
                         bjin=new Set([...bjin].filter(x => !ach.has(x)))
                      }
                      else{
                          apl=new Set([...apl].filter(x => !aj.has(x)))
                          bjin=new Set([...bjin].filter(x => !aj.has(x)))
                          };console.log(Array.from(apl))/*/
                      var differenceABSet = new Set([...bjin].filter(x => !apl.has(x)));
                      let d=Array.from(differenceABSet);//console.log(d)
                      let e=new Set([...apl].filter(x => !bjin.has(x)));
                      let g=Array.from(e);
                      if(this.station_info.classify==1){g=g.concat(this.chong)}
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
              Router.push({ path: "/openstationt" ,query:{id:this.$route.query.id}});
            }else if(aa===true){
                this.shad=true;this.tip=true;this.insert=true;
            }
          },
        incrementTi:function(p){//日期选择
          var split_open = this.station_info.open_station_time.split('-');
          var split_close = p.split('-');
          var aa = new Date(split_open[0],split_open[1]-1,split_open[2]).getTime()
          var bb = new Date(split_close[0],split_close[1]-1,split_close[2]).getTime()
          if((bb-aa)<=0){alert('不能选择历史时间')}
          else{
            this.station_info.close_station_time=p;this.date_s=false;
            this.figure()
          }
        },
        hide1:function(){
          if(this.figure()===false){this.date_s=false;}
        },
        figure: function(){//判断时间不得少于起始时间
           if(this.station_info.open_station_time===''||this.station_info.open_station_time==undefined||this.station_info.close_station_time==""||this.station_info.close_station_time==undefined){return}
            else{
            var split_open = this.station_info.open_station_time.split('-');
            var split_close = this.station_info.close_station_time.split('-');
            var aa = new Date(split_open[0],split_open[1]-1,split_open[2]).getTime()
            var bb = new Date(split_close[0],split_close[1]-1,split_close[2]).getTime()
            // if(bb-aa<=0){alert('时间不得少于起始时间')}
            // else{
                var date = (bb-aa)/1000/60/60/24
                this.station_info.validity_days = date
                console.log(date)
                return false
             }
        },
        hidee:function(){
          return false;
        },
        uuid:function(){// 状态按钮
		    var s = [];
		    var hexDigits = "0123456789abcdef";
		    for (var i = 0; i < 36; i++) {
		        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		    }
		    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
		    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
		    s[8] = s[13] = s[18] = s[23] = "-";
		 
		    var uuid = s.join("");
		    return uuid;
        },
        focu:function(){//日历插件显示
          this.date_s=true;
        },
        tipp:function(){this.shad=false;this.tip=false;},
        add1:function(){Router.push({ path: "/openstationf",query:{id:this.$route.query.id}});},
        hide1:function(){
          if(this.figure()===false){this.date_s=false;}
        },
        // figure: function(){ 
        //     if(this.station_info.open_station_time===''||this.station_info.open_station_time==undefined||this.station_info.close_station_time==""||this.station_info.close_station_time==undefined){return}
        //     else{
        //         var split_open = this.station_info.open_station_time.split('-');
        //         var split_close = this.station_info.close_station_time.split('-');
        //         var aa = new Date(split_open[0],split_open[1]-1,split_open[2]).getTime()
        //         var bb = new Date(split_close[0],split_close[1]-1,split_close[2]).getTime()
        //         // if(bb-aa<=0){alert('时间不得少于起始时间')}
        //         // else{
        //             var date = (bb-aa)/1000/60/60/24
        //             this.station_info.validity_days = date
        //             return false
        //         // }
        //     }
        //  },
        check_class:async function(n){
            // pro = new Promise(function(resolve,reject){
                this.station_info.pact_products=[]; 
                this.selectVal(this.station_info.deploy_way,n);
                if(n==1){
                    await axioIn.get('/api/product/product/foropen/').then((res)=>{
                        this.ite5=this.jing=res.data.map(n=>({id:n.id,product:n.product})) // 合同产品
                        // resolve(data)
                        this.check_robot();
                    })
                }
                else{
                    await axioIn.get('/api/product/ref-product/foropen/').then((res)=>{
                        this.ite5=this.chong=res.data.map(n=>({id:n.id,product:n.product})) // 合同产品
                        this.check_robot();
                    }) 
                }
            // })
            
        },
        check_robot () {
            if(this.station_info.pact_products.includes(8)){
                this.ite5.map(n=>{
                    if(n.id == 3){
                        this.$set(n,'forbidden',true);
                    }
                })
            }
            if(this.station_info.pact_products.includes(3)){//云问机器人
                this.ite5.map(n=>{
                    if(n.id == 8){
                        this.$set(n,'forbidden',true);
                    }
                })
            }
            if(this.station_info.pact_products.includes(3)&&this.station_info.pact_products.includes(8)){
                this.ite5.map(n=>{
                    if(n.id == 8 || n.id == 3){
                        this.$set(n,'forbidden',false);
                    }
                })
            }
        },
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
      }
}

</script>
<style lang='scss' scoped>
.openstations{margin:auto;position: relative;min-height:700px;width: 100%;background:#fff;
    // .dateVaild{position:relative;top:20px;}
    .ccc{height:30px;line-height:30px;padding-left:20px;text-align: center;background-color: #fff;border-radius: 3px;margin-bottom: 20px;}
    .cen{background:#fff;padding-top:15px;color:#868484;}
    .stationInfo,.pactInfo,.supportInfo{margin:0 30px;border:1px solid #d5d6d8;border-radius:5px;
      .basicTitle{font-size:16px;padding-left:18px;text-align:left;height:38px;line-height:38px;color:#333;background:#f6f6f6;border-bottom:1px solid #d5d6d8;}
    }
    .pactInfo{margin: 16px 30px;}
    .stationContent,.pactContent,.supportContent{width:70%;padding-right:30%;background-color: #fff;position: relative;p{width:100%;padding: 10px 20px;}}
    .topLine{margin:auto;border-bottom: 1px solid #edf2f5;height: 23px;line-height: 23px;padding:18px 17%;background-color: #fff;}
    p{position:relative;text-align:left;font-size:0;width:auto;
    .clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;
    position:absolute;top:20px;right:20px;}
    input{width:50%;height:32px;padding-left:10px;border-radius:5px;border:1px solid #d0d8da;}
    input[type=checkbox]{width:50px;}
    .sp{display:inline-block;height:32px;line-height:20px;position:relative;width:100px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;vertical-align: middle;}
    .spp{display: inline-block;height:32px;width:160px;position: relative;overflow: hidden;
    input[type=checkbox]{display: inline-block;width:50px;height:20px;line-height:35px;position: relative}}
    select{height:32px;width:51%;padding-left:10px;border-radius:5px;border:1px solid #d0d8da;}
    option{padding:5px;}
    .num{display:inline-block;border:1px solid gray;width:20px;height:20px;font-style:normal;border-radius:50%;
    margin:0 10px;text-align:center;}
    .num1{color:white;background-color:#067ad8;border-color:#067ad8;}
    }
    p>label{width:15%;margin-right:20px;text-align:right;display:inline-block;font-size: 14px;}
    .productType{label{vertical-align: top;}.parentPact{display:inline-block;width:50%;}}
    .cen .mes{text-align:left;font-size:15px; padding: 10px}
    .line{color:#067ad8;width:18%;span{cursor:pointer;}}
    .cd{display:inline-block;width:18%;&:hover{cursor: pointer;}}
    .back{background:url(../assets/blue.png) no-repeat 120px 10px}
    .gray{background:url(../assets/gray.png) no-repeat 120px 10px}
    .dele{display:inline-block;padding:0px 8px;background:url(../assets/dele.png) no-repeat center;
    position:relative;top:5px; }
    .ii{font-style:normal;color:red;margin-right:5px;}
    .zz{background-color: #fff;margin-right: 0;margin-top:15px;padding: 21px 20px 23px 0;border: 1px solid #e9e9e9;border-radius: 3px;}
}
</style>
<style>
/* .el-input__inner{border:1px solid #d0d8da;} */
.el-input--small .el-input__inner{height:34px;line-height: 34px;}
</style>
