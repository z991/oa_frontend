<template>
    <div class="hello">
        <!-- 登陆 -->
        <div class="leftp" v-show="showLogin">
            <p class="lo"><img src='../assets/logo.png'/><span>小能云平台后台管理系统</span></p>
            <!-- <div class="nav">
                <ul class="tabs">
                    <li v-for="(tab,index) in tabs" :key="index" @click="changeLogin(index,true)" @mouseover="changeLogin(index,false)" :class="{active: activeIndex == index, actived: accountShow == index}">{{tab.name}}</li>  
                </ul>
            </div> -->
            <div class="inpu">
                <p>账号:</p>
                <input type="text" v-model="name" />
                <p>密码:</p>
                <input type="password" v-model="password"/>
                <p>验证:</p>
                <input type="text" style="ime-mode:disabled" v-model="ident" v-on:keyup.enter="login()" /> 
                <img :src="cc" alt="" class="tu" v-on:click="oncc()">
                <el-checkbox v-model="checked">记住密码</el-checkbox>
            </div>
            <el-button type="primary"  class="btn" @click="login">登录</el-button>
            <div class="toSign clearfix">
              <el-button type="primary" class="btn" @click="retrieve">
                忘记密码？
              </el-button>
            </div>
            <p class="wen">如有登录问题联系运维部门维护人员</p>
        </div>

        <!--找回密码-->
        <div class="find" v-show="findPassword">
            <p class="lo"><img src='../assets/logo.png'/><span>小能云平台后台管理系统</span></p>
            <h3>找回密码</h3>
            <div class="editText" v-show="formShow">
                <el-input placeholder="请输入账号" suffix-icon="el-icon-edit el-input__icon" v-model="findUser.username" aria-required="" maxlength="20" minlength="4" class="input" type="text" clearable></el-input>
                <el-button type="primary" class="btn" @click="getBack">发送邮件</el-button>
                <el-button type="primary" class="btn" @click="ToLogin">返回登录页</el-button>
            </div>
            <div class="cueWord" v-show="codeShow">
                <p>请输入邮箱内验证码</p>
                <el-input placeholder="请输入验证码" suffix-icon="el-icon-edit el-input__icon" v-model="verCode" minlength="4" maxlength="10" class="input" type="text"></el-input>
                <el-button type="primary" class="btn" @click="sureCode">确定</el-button>
                <el-button type="primary" class="btn" @click="ToLogin">返回登录页</el-button>
            </div>
            <div class="newPass" v-show="newShow">
                <span class="codePass">输入新密码：</span><el-input style="margin-bottom:15px;" suffix-icon="el-icon-edit el-input__icon" v-model="newCode" type="password" placeholder="请输入新密码" class="inp"></el-input>
                <span class="codePass">确认新密码：</span><el-input suffix-icon="el-icon-edit el-input__icon" v-model="surePass" type="password" placeholder="请输入新密码" class="inp" @blur="changePass"></el-input>
                <el-button type="primary" class="btn" @click="changePass">确定</el-button>  <!-- @click="changePass" -->
                <el-button type="primary" class="btn" @click="ToLogin">返回登录页</el-button>
            </div>
            <p class="wen">如有登录问题联系运维部门维护人员</p>
        </div>

        <img src="../assets/ima.png" alt="" class="ima">
   </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios';
import Qs from 'qs';
import axioIn from '../store/axioIn'
//axioIn.defaults.headers['accept'] = 'application/x-www-form-urlencoded';
//axioIn.defaults.headers['content-type'] = 'application/x-www-form-urlencoded';
//import Myplugin from '../store/MyPlugin'
import Router from '../router/index';
//Vue.use(Myplugin);
//axios.defaults.baseURL = 'http://192.168.90.239:8000'
axios.defaults.withCredentials=true;//配置cookie

export default {
    name:'hello',
    data:function(){
        return{
            holder: 'csadsacdsacdsacdcdcdscscds',
            name: '',
            password: '',
            ident: '',
            msn: '',
            cc:'/backend/verifycode/',
            dd:localStorage.name,

            tabs: [{name: 'LDAP'}, {name: 'Standard'}],  //登陆模式切换
            accountShow: false,                          //默认显示登陆模式 LDAP
            activeIndex: 0,                              //滑动切换样式

            findUser: {username: '请输入要找回密码的账号',email: '请输入要找回密码的邮箱'},
            findPassword: false,
            formShow: true,
            showLogin: true,
            codeShow: false,
            newShow: false,
            verCode: '',
            newCode: '',
            surePass: '',
            new_key: '',
            checked: false
        }
    },
    mounted:function(){
        this.oncc();
        this.getCookie();
    },
    methods:{
        
        login(){
            if(this.name===''||this.password===''||this.ident===''){alert('请完善登录信息')}
            else{                
             axioIn.post('/backend/login/',Qs.stringify({
              username:this.name,
              password:this.password,
              check_code:this.ident,
              grant_type:'password',
              client_id:'da',
              client_secret:'dadadada'}),{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then((response)=>{
                  //console.log(response);
                if(response.status==200){
                    if(typeof response.data === 'string'){
                    //response.data= JSON.parse(response.data);
                    }
                //axios.defaults.headers.common['Authorization']=response.data.token_type+' '+response.data.access_token;
                //axios.defaults.headers.common['X-CSRFToken']=
                //this.msn=response.data.token_type+' '+response.data.access_token;
                // if(localStorage.length===0){
                    localStorage.setItem("name",this.name);localStorage.setItem("id",response.data.id)
                // }
                    //判断复选框是否被勾选 勾选则调用配置cookie方法
                    if(this.checked){
                        //传入账号名，密码，是否自动登陆 和保存天数 4个参数
                        this.setCookie(this.name,this.password,true,7);
                    } else {
                        this.setCookie('','','',0);
                    }
                    this.$store.state.username= this.name;
                    Router.push({ path: '/homePage'});
                    this.$store.commit('setActiveIndex', "/homePage");
                    window.sessionStorage.setItem('activeIndex', "/homePage");
                    this.$checkCookie();
                }
                
                })
                .catch((err)=>{
                    this.oncc()
                 
                });
        }},
        // 验证码
        oncc:function(){
            this.cc='/backend/verifycode/?d='+Math.random();
        }, 
        // 忘记密码切换
        retrieve() {
            this.findPassword = true;
            this.formShow = true;
            this.showLogin = false;
            this.codeShow = false;
            this.newShow = false;
            for(var attr in this.findUser){
                this.findUser[attr] = '';
            }
            this.verCode = '';
            this.newCode = '';
            this.new_key = '';
            this.clearCookie();
        },
        // 返回登陆
        ToLogin() {
            this.showLogin = true;
            this.findPassword = false;
            this.formShow = true;
            this.codeShow = false;
            this.newShow = false;
        },
        // 发送邮件
        getBack () {
            axioIn.post('api/user/reset_passwd/',this.findUser).then(res=>{
                this.formShow = false;
                this.codeShow = true;
            }).catch(res=> {
                this.$message.error(res.data.error);
            })
        },
        // 验证邮箱
        sureCode () {
            if(this.verCode === ''){
                this.$message.error('请输入验证码');
                return;
            }else{
                axioIn.get('/api/user/verify_code/?code='+this.verCode.trim()).then(res=>{
                    this.newShow = true;this.codeShow = false;
                    this.new_key = res.data.result;
                    this.$message({
                        message: res.data.error,
                        type: 'success'
                    });
                })
            }
        },
        // 重置密码 
        changePass () {
            if(this.newCode === '' || this.surePass === ''){
                this.$message.error('请输入新密码');
                return;
            }else{
                if(this.newCode === this.surePass){
                    axioIn.get('/api/user/reset/?new_key='+this.new_key.trim()+'&password='+this.newCode).then(res=>{
                        this.$message({
                            message: res.data.error,
                            type: 'success'
                        });
                        for(var attr in this.findUser){
                             this.findUser[attr] = '';
                        }
                        this.verCode = '';
                        this.newCode = '';
                        this.new_key = '';
                        this.ToLogin();
                    }).catch(err=>{
                        this.$message.error(err.data.error);
                    })
                }else{
                     this.$message.error('两次输入的密码不一致');
                }
            }
        },

        // 切换登陆模式(LDAP 或 LOCALTION)
        changeLogin(typeIndex,type) { /*typeIndex：index；type：滑动(false)/点击(true)*/
            if(type) {
                this.activeIndex = this.accountShow = typeIndex;
            }
            else {
                this.activeIndex = typeIndex;
            }
        },

        //设置cookie
        setCookie(c_name,c_pwd,checked,exdays) {
            let exdate = new Date();
            exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
            window.document.cookie="userName="+c_name+";path=/;expires="+exdate.toGMTString();
            window.document.cookie="userPwd="+c_pwd+";path=/;expires="+exdate.toGMTString();
            window.document.cookie="checked="+checked +";path=/;expires="+exdate.toGMTString();
        },
        //读取cookie
        getCookie () {
            if (document.cookie.length>0) {
                let arr=document.cookie.split('; ');//这里显示的格式需要切割一下
                for(let i=0;i<arr.length;i++){
                    let arr2=arr[i].split('=');
                    if(arr2[0]=='userName'){
                       this.name=arr2[1];
                    }else if(arr2[0]=='userPwd'){
                       this.password=arr2[1];
                    } else if(arr2[0]=='checked'){
                        this.checked = true;
                    }
                }
            }
        },
        //清除cookie
        clearCookie () {
            this.name = this.password = '';
            this.checked = false;
            this.setCookie(this.name,this.password,this.checked,-1);//修改值都为空，天数为负1天就好了
        }
    }
}
</script>
<style  lang="scss" scoped>
@import '../assets/home';
.hello{background:url(../assets/back.png) no-repeat ;width:1200px;height:675px;margin:auto;position:relative;
.leftp,.find{width:400px;height:500px;position:relative;top:100px;left:163px;
 .lo{height:30px;
 img{float:left;padding-top:6px}
 span{float:left;margin-left:30px;color:#3b4441;font-size:25px}}
}
.inpu{position:relative;margin-top:20px;height:260px;
    p,input{margin:6px;}
    p{color:#999999;text-align:left;height:28px;}
    input{border:none;border-bottom:1px solid #bcc34a;outline:none;width:400px;height:30px;font-size:17px;color:#4c4c4c;position:relative;}
}
.login{margin-top:20px;background:url(../assets/butt.png) no-repeat center;color:white;height:60px;font-size: 18px;line-height:50px;cursor:pointer;}
.ima{position:absolute;top:120px;left:760px;}
.wen{color:#999999;margin-top:10px;}
.tu{display:inline-block;width:100px;height:40px;position:absolute;right:-5px;bottom:30px;}
}

a {text-decoration: none;color: #fff;}
.router-link-active {text-decoration: none;}
.cueWord p{font-size: 14px;color:#848585;text-align:center;}
.backIndex{display: block;text-align: center;font-size: 14px;color:#007fff;}
.codePass{font-weight:normal;font-size:16px;margin-right:20px;color:#666;}
.inp{width:66%;}
.form{
  position: absolute;
  left: 0;
  right: 0;
  width: 350px;
  padding: 25px 35px;
  margin: 180px auto;
  background: #fff;
  -moz-border-radius: 8px;
  -webkit-border-radius: 8px;
  -o-border-radius: 8px;
  border-radius: 8px;
}
 h3{
  text-align: center;
  font-size: 28px;
  letter-spacing: 10px;
  margin: 30px auto;
  color: #5dd5c8;;
}
.input,.btn{
  margin: 15px 0;
  width: 100%;
  height: 40px;
  font-size: 16px;
}
.input {
    padding: 0;
}
.el-button ,.toSign {
   width: 100%;
}
.toSign{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
}
.toSign .btn{
  width: 100%;
  margin: 10px auto;
  height: 40px;
  font-size: 14px;
}
.psw_btn{
  float: left;
}
.sign_btn{
  float: right;
}
.clearfix:after {
  content:"";
  display: block;
  clear:both;
}

// 切换登陆样式
.nav {
    width: 100%;
    height: 40px;
    margin: 15px auto 0;
    .tabs {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: space-between;
        background: #6fc4fc;
        border-radius:  8px;
    .active {
            background: #2ba1ff;
            box-shadow: 0 0 5px rgb(156, 86, 236); 
        }
        .actived {
            border-bottom: 2px solid rgb(46, 111, 172);
        }
        li {
            width: 50%;
            height: 40px;
            line-height: 40px;
            border-left: 1px solid #ffffff; 
            box-sizing: border-box;
            padding-left: 1px;
            font-size: 16px;
            color: #fff;
            border-radius: 0 8px 8px 0;
            &:hover{
                cursor: pointer;
            }
        }
        li:nth-child(1) {
            border-left: none;
            border-radius: 8px 0 0 8px;
            border-right: 1px solid #ffffff;
            box-sizing: border-box;
            padding-right: 1px; 
        }
    }
}

.el-checkbox {
    height: 40px;
    float: left;
    margin: 10px 0 0;
    line-height: 40px;
}
</style>
