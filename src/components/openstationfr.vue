<template>
    <div class='openstationfr'>
          <!-- <p style='' class='ccc'><span>工单管理 > 开站管理 >{{b3}}</span></p> -->
           <p class='topLine'><span class='line cd back'><span @click="stepOne"><em class='num num1'>1</em>公司信息</span></span>
           <span class='line cd back'><span @click="stepTwo"><em class='num num1'>2</em>站点信息</span></span>
           <span class='line cd back'><span @click="stepThree"><em class='num num1'>3</em>功能开关</span></span>
           <span class='line ' style="cursor: pointer;"><span @click="stepFour"><em class='num num1'>4</em>账户配置</span></span></p>
          <div class='cen'><P><label for=""><em class='ii'>*</em>用户名</label><input type="text" :disabled="accountSet" v-model='account_conf.user_name' ></P>
              <p><label for=""><em class='ii'>*</em>设置密码</label><input type="text"  :disabled="accountSet" v-model='account_conf.set_pwd' maxlength="16" ></p>
              <p><label for=""><em class='ii'>*</em>确认密码</label><input type="text"  :disabled="accountSet" v-model='account_conf.sure_pwd' maxlength="16" ></p>
          </div>
          <p class='bao zz' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='next1()'>上一步</a><a href="javascript:void(0)" class='qub' @click='chbao()'>提交</a></p>
          <shade v-show='shad'></shade>
          <div v-show='tip' class='tip'>
            <div v-show="insert">带<em class='ii'>*</em>为必填</div><div v-show="individual"><span>{{errorMessage}}</span></div>
            <p class='bao ' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
          </div>
      </div>
</template>
<script>
import axioIn from '../store/axioIn'
import Shade from './shade';
import Router from "../router/index";
import {
    mapState,
    mapMutations,
    mapGetters,
} from 'vuex';
export default {
    name:'openstationfr',
    components:{Shade},
    data:function(){
        return {
            b3:'',
            account_conf:{user_name:'',set_pwd:'',sure_pwd:''},
            shad:false,
            tip:false,
            insert:false,
            individual:false,
            errorMessage:'',
            accountSet: false,
            old_data:{},
        }
    },
    created:function(){//console.log(JSON.stringify(this.$store.state.account_conf))
        //日志fn
        if(this.$route.query.id) {
            this.getLogData();
        }

        if(this.$store.state.account_conf.length!==0){
            this.account_conf=this.$store.state.account_conf[0];//console.log(JSON.stringify(this.account_conf))
        }
        else if(this.$store.state.account_conf.length===0&&this.$route.query.id!==undefined){
            axioIn.get('/api/workorder/openstation/'+this.$route.query.id+'/')
                .then((res)=>{
                    console.log(res.data,'old_Data');
                    this.$store.commit('evaluate',res.data.company_info);
                    this.$store.commit('evaluate1',res.data.link_info);//console.log(JSON.stringify(lill))
                    this.$store.commit('evaluate2',res.data.station_info);
                    this.$store.commit('evaluate4',res.data.account_conf);
                    this.$store.commit('evaluate6',res.data.func_list);
                    this.account_conf=this.$store.state.account_conf[0];
                })
        }
        if(this.$store.state.station_info.classify == 2){
          this.accountSet = true;
          this.account_conf.user_name = 'admin';this.account_conf.set_pwd = '111111' ;this.account_conf.sure_pwd = '111111';
        }else{
          this.accountSet = false;
        }
        
        if(this.$store.state.id===undefined){this.b3='新增'}
        else{this.b3='修改'}
    },
    computed:{
          ...mapGetters(['getLogFuncArr'])
    },
    methods:{
        next1:function(){
            //this.$store.commit('evaluate4',this.account_conf);
            Router.push({ path: "/openstationt",query:{id:this.$route.query.id}})
        },
        getLogData(){
            axioIn.get('/api/workorder/openstation/'+this.$route.query.id+'/')
                .then((res)=>{
                    this.old_data = res.data;

                })
        },
        putDetail(data){
            data.func_list = this.getLogFuncArr;
            data.company_info.company_url[0]={
                id:data.company_info.company_url[0].id,
                company_url: data.company_info.company_url[0].company_url,
            }
            axioIn.post('/operlog/open_log/put_detail/',{
                id:this.$route.query.id,
                old_date:this.old_data,
                new_date:data,
            })
                .then((res)=>{


                })
        },
        chbao:function(){
            if(this.account_conf.user_name===''||this.account_conf.set_pwd===''||this.account_conf.sure_pwd===''){
                this.shad=true;this.tip=true;this.insert=true;
            }else if(this.account_conf.sure_pwd!==this.account_conf.set_pwd){
              this.$message.error('两次密码不一致');
            }else{
                var aa=this.$store.state.functio;
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
                // console.log(this.$store.state.station_info);
                aac.station_info=this.$store.state.station_info
                aac.account_conf=[this.account_conf];
                // delete aac.account_conf[0].sure_pwd
                aac.func_list=bb;

                if(this.$store.state.id === undefined || this.$store.state.id == ""){
                    let url = aac.company_info.id ? `/api/workorder/khkcompany/approval_open/` : `/api/workorder/openstation/`
                    axioIn.post(url,aac)
                    // axioIn.post('/api/workorder/openstation/',aac)
                      .then((res)=>{
                          this.shad=false;this.tip=false;
                          alert('新增成功');Router.push({ path: "/gong" });
                      })
                      .catch(res=>{
                          alert('新增失败')
                      })
                }
                else{
                    let flag=true;let str = '';
                    let parentId = window.sessionStorage.getItem('stationType');
                    aac.company_info.customer_type=this.$store.state.customer_type
                    if( aac.company_info.customer_type=='1'){
                        aac.company_info.customer_type=flag;
                   }else{
                       flag=false
                        aac.company_info.customer_type=false;
                   }
                   if(parentId){aac.its_parent = parentId;str = '?its_parent='+parentId;}else{
                     aac.its_parent = '';
                   }
                   axioIn.put('/api/workorder/openstation/'+this.$store.state.id+'/'+str,aac)
                      .then((res)=>{
                        this.shad=false;this.tip=false;
                        //日志api
                        this.putDetail(aac);
                          alert('修改成功');
                        if(parentId){
                          Router.push({ path: "/subStation",query: {id: parentId} });
                        }else{
                          Router.push({ path: "/gong",query: {flag: true} });
                        }
                        
                    })
                    .catch((res)=>{
                        if(res.data.detail == 'You do not have permission to perform this action.') {
                            alert('没有操作权限')
                        } else {
                            alert('修改失败')
                        }
                    })
                }
            }
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
        }
    }
}
</script>
<style lang='scss' scoped>
.openstationfr{position: relative;min-height:700px;width:100%;background:#fff;
      
      .cen{width:70%;padding: 0 15%;background-color: #fff;position: relative;p{padding: 10px 20px;}}
      .ccc{height:30px;line-height:30px;padding-left:20px;text-align: center;background-color: #fff;border-radius: 3px;margin-bottom: 20px;}
      .topLine{margin:auto;border-bottom: 1px solid #edf2f5;height: 23px;line-height: 23px;padding:18px 17%;background-color: #fff;}
        p{position:relative;text-align:left;font-size:0;width:auto;
        .clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
        label{width:20%;margin-right:20px;text-align:right;display:inline-block;font-size: 14px;}
        input{width:50%;height:32px;padding-left:10px;border-radius:5px;border:1px solid gray;}
        input[type=checkbox]{width:50px;}
        .sp{display:inline-block;height:32px;line-height:20px;position:relative;width:100px;}
        .spp{display: inline-block;height:32px;width:160px;position: relative;
        input[type=checkbox]{display: inline-block;width:50px;height:20px;line-height:35px;position: relative}}
        select{height:32px;width:51%;padding-left:10px;border-radius:5px;border:1px solid gray;}
        option{padding:5px;}
        .num{display:inline-block;border:1px solid gray;width:20px;height:20px;font-style:normal;
        border-radius:50%;margin:0 10px;text-align:center;vertical-align: middle;}
        .num1{color:white;background-color:#067ad8;border-color:#067ad8;}
        }

        .cen .mes{text-align:left;font-size:15px; padding: 10px}
        .line{color:#067ad8;width:18%;span{cursor:pointer;}}
        .cd{display:inline-block;}
        .back{background:url(../assets/blue.png) no-repeat 120px 10px}
        .gray{background:url(../assets/gray.png) no-repeat 120px 10px}
        .bao{position: relative;border-top: 1px solid #edf2f5;padding-top:20px;}
        .dele{display:inline-block;padding:0px 8px;background:url(../assets/dele.png) no-repeat center;position:relative;top:5px; }
        .ii{font-style:normal;color:red;margin-left:5px;}
        .zz{background-color: #fff;margin-right: 0;margin-top:15px;padding: 21px 20px 23px 0;border: 1px solid #e9e9e9;border-radius: 3px;}
}
</style>