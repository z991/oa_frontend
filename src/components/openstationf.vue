<template>
    <div class='openstationf'>
          <!-- <p style='' class='ccc'><span>工单管理 > 开站管理 >{{b3}}</span></p> -->
          <p class='topLine'>
            <span class='line gray cd'><span @click="stepOne"><em class='num num1'>1</em>公司信息</span></span>
            <span class=' cd gray'><span @click="stepTwo"><em class='num'>2</em>站点信息</span></span>
            <span class=' cd gray'><span @click="stepThree"><em class='num'>3</em>功能开关</span></span>
            <span style="cursor: pointer;"><span @click="stepFour"><em class='num'>4</em>账户配置</span></span>
          </p>

          <div class='cen'>
            <div class="basicInfo">
              <div class="basicTitle">基本资料</div>
              <div class="conpamyInfo">
                <!-- <p class='mes'>公司信息：</p> -->
                <p>
                  <label for=""><em class='ii'>*</em>站点类型</label><select name="" id=""  v-model='company_info.station_type' >
                    <option value="1">试用客户</option>
                    <option value="2">正式客户</option>
                    <option value="3">市场渠道客户</option>
                    <option value="4">商务渠道客户</option>
                    <option value="5">自用站点</option>
                  </select>
                </p>
                <p><label for=""><em class='ii'>*</em>公司名称</label><input type="text" v-model='company_info.company_name' maxlength="50" ></p>
                <p><label for=""><em class='ii'>*</em>公司简称</label><input type="text" v-model='company_info.abbreviation' maxlength="50" ></p>
                <p class='bao' v-for='(item,index) in company_info.company_url' :key='item.id'><label for=""><em class='ii'>*</em>公司网址</label><input type="url"  style="ime-mode:disabled" v-model='item.company_url' >
                    <!-- <a href="javascript:void(0)" class='qub' @click='ad_url()' v-show='item.ac'>增加网址</a> -->
                    <a href="javascript:void(0)" class='addUrl' @click='ad_url()' v-show='item.ac'></a>
                    <a href="javascript:void(0)" class="dele" @click='de_url(index)' v-show='item.a2' style='border:none'></a>
                </p>
                <p><label for=""><em class='ii'>*</em>公司地址</label><select name="" id=""  style='width:120px;' v-model='company_info.company_address.province' @change='gon_change(company_info.company_address.province)'>
                    <option v-for='it in ite2' :value="it.id" :key='it.id'>{{it.atitle}}</option>
                    </select>
                    <select style='width:120px;margin:0 10px;' name="" id="" v-model='company_info.company_address.city'>
                        <option v-for='it in ite3' :value="it.id" :key='it.id'>{{it.atitle}}</option>
                    </select><input type="text" style='width:140px' maxlength="80" v-model='company_info.company_address.detail'>{{company_info.company_address.aa}}</p>
                <p><label for=""><em class='ii'>*</em>公司邮箱</label><input type="text" v-model='company_info.company_email' maxlength="50" ></p>
                <p><label for=""><em class='ii'>*</em>所属行业</label><select name="" id="" v-model='company_info.industry' >
                    <option v-for='it in ite1' :value="it" :key='it.id'>{{it}}</option>
                    </select></p>
                <p><label for=""><em class='ii'>*</em>营业执照名称</label><input type="text" v-model='company_info.GSZZ' maxlength="50" ></p>
                
                <p><label for=""><em class='ii'>*</em>客服服务区域</label><input type="text" v-model='company_info.service_area' maxlength="60" ></p>
                <p>
                    <!-- <label for="">客户性质</label><select name="" id="" v-model='company_info.customer_type' @change="customerListen(company_info.customer_type)" >
                        <option   v-for="(item,index) in customer_type" :value="item.value" :key="index">{{item.name}}</option> -->
                    <label for=""><em class='ii'>*</em>客户性质</label>
                    <span>
                    <el-radio v-model='company_info.customer_type' v-for="(item,index) in customer_type" :key="index" @change="customerListen(company_info.customer_type)" :label="item.value">{{item.name}}</el-radio>
                    </span>
                    <!-- <el-radio v-model='company_info.customer_type' label="2">备选项</el-radio> -->
                    <!-- </select> -->
                </p>
              </div>
            </div>
            <div class="contactFirm">
              <div class="basicTitle">企业联系人</div>
              <div class="contacts">
                <!-- <p  class='mes'>企业联系人：</p> -->
                <div v-for='(item,index) in link_info' :key='item.id'>
                  <P><label for="">联系人</label><input type="text" v-model='item.linkman' ><a href="javascript:void(0)" class='addUrl'  @click='clo()' ></a><a href="javascript:void(0)" class="dele" @click='dele_ser(index)'/></P>
                  <P><label for="">联系电话</label><input onkeydown="if(event.keyCode==32) return false" type="text" v-model='item.link_phone' maxlength="11"/></P>
                  <P><label for="">电子邮箱</label><input onkeydown="if(event.keyCode==32) return false" type="email" v-model='item.link_email' maxlength="50" /></P>
                  <P><label for="">QQ号</label><input onkeydown="if(event.keyCode==32) return false" type="text" v-model='item.link_qq' maxlength="15"/></p>
                </div>
                <!-- <p class='bao' style='margin-left:112px;'><a href="javascript:void(0)" class='qub' @click='clo()'>新增联系人</a></p> -->
              </div>
            </div>
          <!-- <div>{{errorMessage}}</div> -->
          
          </div>
          <shade v-show='shad'></shade>
          <p class='bao zz' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a>
              <a href="javascript:void(0)" class='qub' @click='next()'>下一步</a></p>
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
export default {
    name:'openstationf',
    components:{Shade},
    data:function(){
        return {
            b3:'',
            company_info:{station_type:'',company_name:'',abbreviation:'',company_url:[{company_url:'',ac:true,a2:false}],company_address:{province:'',city:'',detail:''},company_email:'',industry:'',GSZZ:'',customer_type:'',service_area:''},
            link_info:[{linkman:'',link_phone:'',link_email:'',link_qq:''}],
            ite1:'',
            ite2:'',
            ite3:[],
            tip:false,
            shad:false,
            errorMessage:'',
            insert:true,
            individual:false,
            aa: {},
            customer_type:[
                {name:'新客户',value:'0'},
                {name:'老客户补录',value:'1'},
            ],
            aa: '12345'
        }
    },
    watch:{
        //'company_info.company_address.province':'gon_change'
    },
    created:function(){
     
        this.$checkCookie();var that = this;
        if(this.$route.query.id===undefined){this.b3='新增'}
        else{this.b3='修改'}
        this.$store.commit('evaluate5',this.$route.query.id);
        axioIn.get('/api/workorder/industry/')//所属行业ite1
        .then((res)=>{/*console.log(res.data);*/this.ite1=res.data.map(n=>n.industry)})
        axioIn.get('/api/workorder/areainfo/?level=1')
        .then((res)=>{this.ite2=res.data}) // 公司地址ite2
        // console.log(JSON.stringify(this.$store.state.company_info));return
        if(this.$store.state.company_info.station_type){
            this.company_info=this.$store.state.company_info;
            this.link_info=this.$store.state.link_info;
            if(this.company_info.customer_type){
                this.company_info.customer_type='1'
            }else{
                this.company_info.customer_type='0'
            }
            
            if(this.company_info.company_url[0].company_url === ''){
                this.company_info.company_url[0].company_url = 0;
            }   
            if(this.$store.state.company_info.company_address){
              this.gon_change(this.$store.state.company_info.company_address.province)
            }
        }
        else if(this.$store.state.company_info.station_type||this.$route.query.id!==undefined){
          let parentLevel = window.sessionStorage.getItem('stationType');
          let str = parentLevel ? '?its_parent=' + parentLevel : '';
            axioIn.get('/api/workorder/openstation/'+this.$route.query.id+'/'+str)
                .then((res)=>{
                    this.$store.commit('evaluate',res.data.company_info);
                    this.$store.commit('evaluate1',res.data.link_info);//console.log(JSON.stringify(lill))
                    this.$store.commit('evaluate3',[]);
                    this.$store.commit('evaluate2',res.data.station_info);
                    this.$store.commit('evaluate4',res.data.account_conf);
                    this.$store.commit('evaluate6',res.data.func_list);
                    
                    if(res.data.company_info.company_address){
                      this.gon_change(res.data.company_info.company_address.province)
                    }
                    
                    this.company_info=this.$store.state.company_info;
                    this.link_info=this.$store.state.link_info;
                    this.company_info.customer_type=this.$store.state.customer_type;
                    if(this.company_info.customer_type){
                        this.company_info.customer_type='1'
                    }else{
                        this.company_info.customer_type='0'
                    }
                })
        }
    },
    computed:{
        
    },
    methods:{
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
        customerListen(typevalue){
            this.$store.commit('evaluate8',this.company_info.customer_type);
        },
        gon_change:function(n){//公司地址第二项选择
           
          if(n!==undefined){
          axioIn.get('/api/workorder/areainfo/?province='+n)
            .then((res)=>{
                this.ite3=res.data})  }
         },
        ad_url:function(){//增加网址
            this.company_info.company_url.push({ac:false,a2:true})
        },
        de_url:function(id){//删除网址
            if(confirm('确定要删除吗？'))this.company_info.company_url.splice(id,1)
        },
        clo:function(){//增加联系人
            this.link_info.push({linkman:'',link_phone:'',link_email:'',link_qq:''})
        },
        dele_ser:function(id){//删除联系人
          if(confirm('确定要删除吗？'))this.link_info.splice(id,1)
        },
        close:function(){
          let parent = this.$route.query.parentId || window.sessionStorage.getItem('stationType');
          if(parent){
            Router.push({ path: "/subStation" ,query: {id: parent}});
          }else{
            Router.push({ path: "/gong" ,query: {flag: true}});
          }
            
            //this.$store.commit('empty');
        },
        next:function(){
          let aa=false;
           // 验证
          var reg = /[\u4e00-\u9fa5]+/g;
          var companyUrl = this.company_info.company_url.map(n=>n.company_url)
          let tt=companyUrl.join(' ')
          if(reg.test(tt)){
              this.errorMessage = '网址中不能有中文'
              this.insert = false
              this.individual = true
              aa=true
          }
          // 验证QQ号
          var numReg = /^\d+$/
        //   var reg = /[^\u4e00-\u9fa5]+/g
          var a = this.link_info
          var shuzu=false;
          var qqNum = this.link_info.map(n=>{if(!numReg.test(n.link_qq)){shuzu=true}})
          var phone = this.link_info.map(n=>{if(!numReg.test(n.link_phone)){shuzu=true}})
        //   if(shuzu===true){
        //         this.errorMessage = 'QQ号或电话只能填数字'
        //         this.insert = false
        //         this.individual = true
        //         aa = true
        //     }
          for(let i in this.company_info){if(this.company_info[i]===''||this.company_info[i]===undefined){aa=true;this.insert=true;this.individual=false}}
          this.company_info.company_url.map(v=>{if(v.company_url===''||v.company_url===undefined){aa=true;this.insert=true;this.individual=false}})
          //for(let i in this.company_info.company_url){if(this.company_info.company_url.company_url===''||this.company_info.company_url.company_url===undefined){aa=true;}}
          for(let i in this.company_info.company_address){if(this.company_info.company_address[i]===''||this.company_info.company_address[i]===undefined){aa=true;this.insert=true;this.individual=false}}
          this.link_info.map(n=>{
                
            //    for(let i in n){if(n[i]===''||n[i]===undefined){aa=true;this.insert=true;this.individual=false}}
          })
          //console.log(JSON.stringify(this.company_info))
          if(aa===false){
              //console.log(JSON.stringify(this.link_info))
          
              this.$store.commit('evaluate',this.company_info);
            //   console.log(this.$store.state.company_info)
              this.$store.commit('evaluate1',this.link_info);
              //console.log(JSON.stringify(this.$store.state.link_info))
              //this.$store.commit('evaluate1',{id:this.link_info});
              Router.push({ path: "/openstations",query:{id:this.$route.query.id}});
          }
          else{this.tip=true;this.shad=true;}
          },
        tipp:function(){this.shad=false;this.tip=false;},
        
    },
    watch:{
            // this..detail='';
        
    }
}
</script>
<style lang='scss' scoped>
.openstationf{margin:auto;position: relative;min-height:700px;width:100%;background:#fff;
    
    .topLine{margin:auto;border-bottom: 1px solid #d5d6d8;height: 23px;line-height: 23px;padding:18px 15%;
    background-color: #fff;}
    .cen{background:#fff;padding-top:15px;color:#868484;}
    .basicInfo,.contactFirm{margin:0 30px;border:1px solid #d5d6d8;border-radius:5px;
      .basicTitle{font-size:16px;padding-left:18px;text-align:left;height:38px;line-height:38px;color:#333;background:#f6f6f6;border-bottom:1px solid #d5d6d8;}
    }
    .contactFirm{margin-top:15px;}
    .contacts,.conpamyInfo{width:70%;padding-right:30%;background-color: #fff;p{padding: 10px 20px;}}
    .ccc{height:30px;line-height:30px;padding-left:20px;text-align: center;background-color: #fff;border-radius: 3px;margin-bottom: 20px;}
    p{position:relative;text-align:left;width:auto;
    .clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
    
    input{width:50%;height:32px;padding-left:10px;border-radius:5px;border:1px solid #d0d8da;}
    input[type=checkbox]{width:50px;}
    .sp{display:inline-block;height:32px;line-height:20px;position:relative;width:100px;}
    .spp{display: inline-block;height:32px;width:160px;position: relative;
    input[type=checkbox]{display: inline-block;width:50px;height:20px;line-height:35px;position: relative}}
    select{height:32px;width:51%;padding-left:10px;border-radius:5px;border:1px solid #d0d8da;}
    option{padding:5px;}
    .num{display:inline-block;border:1px solid gray;width:20px;height:20px;font-style:normal;border-radius:50%;margin:0 10px;text-align:center;}
    .num1{color:white;background-color:#067ad8;border-color:#067ad8;}
    }
    p>label{width:20%;margin-right:20px;text-align:right;display:inline-block;font-size: 14px;}
    .cen .mes{text-align:left;font-size:15px; padding: 10px}
    .line{color:#067ad8;width:18%;span{cursor:pointer;}}
    .cd{display:inline-block;width:18%;&:hover{cursor: pointer;}}
    .back{background:url(../assets/blue.png) no-repeat 120px 10px}
    .gray{background:url(../assets/gray.png) no-repeat 120px 10px}
    .addUrl{display:inline-block;width:20px;height:20px;transform:scale(0.8);padding-left:8px;vertical-align:middle;border:none;background:url(../assets/circleAdd.png) no-repeat center; }
    .dele{display:inline-block;padding-left:8px;vertical-align:middle;background:url(../assets/dele.png) no-repeat center; }
    .ii{font-style:normal;color:red;margin-right:5px;}
    .zz{background-color: #fff;margin-right: 0;margin-top:15px;padding: 21px 20px 23px 0;border: 1px solid #e9e9e9;border-radius: 3px;}
    .conpamyInfo .bao {
        margin: 0;
    }
}
</style>


