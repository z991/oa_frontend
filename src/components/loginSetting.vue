<template>
    <div class="setLogin">
        <!-- <p class="qu">设置 > 登陆模式设置</p> -->

        <div class="container">
            <!-- 设置登陆模式 -->
            <div class="container_header">
                  <div class="header_tit">登陆模式设置：</div>
                  <select class="header_select" v-model="loginType" @change="changeType">
                      <option :value="item.loginType" v-for="(item,index) in items" :key="index">{{item.name}}</option>
                  </select>
            </div>
            <!-- 登陆模式设置 -->
            <div class="container_content">
                <div class="content">
                    <div><p>AUTH_LDAP_BIND_DN</p><input type="text" :disabled="isDisabled" v-model="AUTH_LDAP_BIND_DN"><p>*</p></div>
                    <div><p>AUTH_LDAP_BIND_PASSWORD</p><input v-bind:type="changePasssword" :disabled="isDisabled" v-model="AUTH_LDAP_BIND_PASSWORD" placeholder="请输入LADP数据库密码 "><span @click="showPasssword(changeType_flag)" :class="{'el-icon-edit': !changeType_flag, 'el-icon-view': changeType_flag}"></span><p>*</p></div>
                    <div><p>USER_LDAPSearch</p><input type="text" :disabled="isDisabled" v-model="USER_LDAPSearch"><p>*</p></div>
                    <div><p>USER_SCOPE_SUBTREE</p><input type="text" :disabled="isDisabled" v-model="USER_SCOPE_SUBTREE"><p>*</p></div>
                    <div><p>GROUP_LDAPSearch</p><input type="text" :disabled="isDisabled" v-model="GROUP_LDAPSearch"><p>*</p></div>   
                    <div><p>GROUP_SCOPE_SUBTREE</p><input type="text" :disabled="isDisabled" v-model="GROUP_SCOPE_SUBTREE"><p>*</p></div>
                    <div><p>is_active</p><input type="text" :disabled="isDisabled" v-model="is_active"><p>*</p></div>
                    <div><p>is_staff</p><input type="text" :disabled="isDisabled" v-model="is_staff"><p>*</p></div>
                    <div><p>is_superuser</p><input type="text" :disabled="isDisabled" v-model="is_superuser"><p>*</p></div>
                    <div><p>ldap_server_url</p><input type="text" :disabled="isDisabled" v-model="ldap_server_url"><p>*</p></div>
                    <div><p>ldap_name</p><input type="text" :disabled="isDisabled" v-model="ldap_name"><p>*</p></div>
                </div>
            </div>
            <!-- 提交设置 -->
            <div class="container_footer">
                <p class='bao zz' style='text-align:right'><a href="javascript:void(0)" class='quu' @click='cancel()'>取消</a>
                <a href="javascript:void(0)" class='qub' @click='submit()'>提交</a></p>
            </div>
        </div>

        <!-- 弹窗遮罩层和弹出框 -->
        <shade v-show='shad1' style='z-index:16'></shade>
        <div v-show='tip' class='tip'>
            带
            <em class='ii'>*</em>为必填
            <p class='bao' style='text-align:center;margin:20px 0'>
                <a href="javascript:void(0)" class='qub' @click="tipp()">确定</a>
            </p>
        </div>
    </div>
</template>

<script>
import axioIn from "../store/axioIn";
import Router from "../router/index";
import Shade from "./shade";
export default {
    name: 'loginSetting',
    components: {Shade},
    data() {
        return {
            shad1: false,   //弹窗遮罩层
            tip: false,     //弹窗提示
            items: [
                {
                    name:'LDAP登陆',
                    loginType: '1'
                },
                { 
                    name: '本地登陆',
                    loginType: '2',
                },
                { 
                    name: '本地优先',
                    loginType: '3'
                },
                { 
                    name: 'LDAP优先',
                    loginType: '4'
                },
            ],
            loginType: "1",   //设置登陆的方式
            isDisabled: false,//是否可点击编辑
            changeType_flag: true,//修改密码显示
            changePasssword: 'password',//密码显示类型
            // 设置LADP参数(默认值)
            AUTH_LDAP_BIND_DN: "cn=admin,dc=xiaoneng,dc=cn",
            AUTH_LDAP_BIND_PASSWORD: "8ql6,yhY",
            USER_LDAPSearch: "ou=Users,dc=xiaoneng,dc=cn",
            USER_SCOPE_SUBTREE: "(cn=%(user)s)",
            GROUP_LDAPSearch: "cn=LDAP,ou=Roles,dc=xiaoneng,dc=cn",
            GROUP_SCOPE_SUBTREE: "(objectClass=groupOfUniqueNames)",
            is_active: "cn=users,cn=LDAP,ou=Roles,dc=xiaoneng,dc=cn",
            is_staff: "cn=ldap-admin,cn=LDAP,ou=Roles,dc=xiaoneng,dc=cn",
            is_superuser: "cn=ldap-admin,cn=LDAP,ou=Roles,dc=xiaoneng,dc=cn",
            ldap_server_url: "ldap.xiaoneng.cn",
            ldap_name:"ldap://ldap.xiaoneng.cn",
        }
    },
    created() {
        // 显示默认登陆模式
        axioIn.get('/api/setup/login_models/').then((res) => {
            switch(res.data.login_model){
                case 'ldap登陆模式' :
                this.loginType = 1;
                this.isDisabled = false;
                break

                case '本地验证模式':
                this.loginType = 2;
                this.isDisabled = true;
                break

                case '本地+ldap':
                this.loginType = 3;
                this.isDisabled = false;
                break

                case 'ldap和本地验证':
                this.loginType = 4;
                this.isDisabled = false;
                break
            };
            this.$store.commit('setLoading', false)
        }).catch((err) => {
            console.log(err.data.error);
            this.$store.commit('setLoading', false)         
        })
    },
    methods: {
        // 选择登陆类型
        changeType() {
            if(this.loginType == '2') {
                this.isDisabled = true;
            }else {
                this.isDisabled = false;
            }
        },
        // 取消
        cancel() {
           Router.push({ path: "/gong"});
        },
        // 提交
        submit() {
            if(this.loginType == '1' || this.loginType == '3' || this.loginType == '4') {
                 if(this.AUTH_LDAP_BIND_DN != "" && this.AUTH_LDAP_BIND_PASSWORD != "" && this.USER_LDAPSearch != "" && this.USER_SCOPE_SUBTREE != "" && this.GROUP_LDAPSearch != "" && this.GROUP_SCOPE_SUBTREE != "" && this.is_active != "" && this.is_staff != ""
                    && this.is_superuser != "" && this.ldap_server_url != "" && this.login_model != "") {
                        axioIn.put('/api/setup/login_config/', {
                            AUTH_LDAP_BIND_DN:  this.AUTH_LDAP_BIND_DN ,
                            AUTH_LDAP_BIND_PASSWORD: this.AUTH_LDAP_BIND_PASSWORD,
                            USER_LDAPSearch: this.USER_LDAPSearch,
                            USER_SCOPE_SUBTREE: this.USER_SCOPE_SUBTREE,
                            GROUP_LDAPSearch: this.GROUP_LDAPSearch,
                            GROUP_SCOPE_SUBTREE: this.GROUP_SCOPE_SUBTREE,
                            is_active: this.is_active,
                            is_staff: this.is_staff,
                            is_superuser: this.is_superuser,
                            ldap_server_url: this.ldap_server_url,
                            login_model: this.loginType,
                            ldap_name: this.ldap_name
                        }).then((res) => {
                            Router.push({ path: "/"})
                        }).catch((err) => {
                            alert(err.data.error);
                        })
                    }else {
                        this.shad1 = this.tip = true;
                    }
            }else {
                axioIn.put('/api/setup/login_config/', {login_model: this.loginType}).then((res) => {Router.push({ path: "/"})}).catch((err)=>{alert(err.data.error);})
            }
        },
        // 遮罩层
        tipp() {
            this.shad1 = this.tip = false;
        },
        // 切换密码显示与否
        showPasssword() {
            if(!this.isDisabled) {
                if(this.changeType_flag) {
                    this.changePasssword = 'text'
                }else {
                    this.changePasssword = 'password'
                }
                this.changeType_flag = !this.changeType_flag
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/home";
.setLogin{
    width: 100%;
    height: 100%;
    margin: 0 auto;
    overflow: hidden;
}
.container{
    width: 70%;
    height: 100%;
    padding: 0 15%;
    background: #fff;
    border-radius: 8px;
    .container_header{
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-around;
        .header_tit{
            width: 35%;
            height: 40px;
            line-height: 40px;
            margin-top: 10px;
            font-size: 16px;
            text-align: left;
            letter-spacing: 2px;
            font-weight: bold;
        }
        .header_select {
            width: 30%;
            height: 30px;
            margin-top: 15px;
            margin-right: 35%;
            line-height: 40px;
            padding-left: 10px;
            border-radius: 5px;
            border: 1px solid gray;
        }
    }
    .container_content {
        height: calc(100% - 120px);
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 0 0 10px #000000;
        overflow: hidden;
        .content{
            height: 100%;
            width: 103%;
            background: #f7f6f6;
            overflow-y: scroll;
            position: relative;
            div {
                width: 98%;
                height: 36px;
                line-height: 36px;
                margin: 15px auto;
                justify-content: space-between;
                display: flex;
                p:nth-of-type(1){
                    width: 35%;
                    text-align: left;
                    font-size: 13px;
                }
                p:nth-of-type(2) {
                    width: 3%;
                    color: red;
                }
                input {
                    width: 62%;
                    padding-left: 10px;
                    border-radius: 5px;
                    border: 1px solid gray;
                    &:hover {
                        cursor: pointer;
                    }
                }
                span {
                    position: absolute;
                    width: 25px;
                    height: 36px;
                    line-height: 36px;
                    right: 5%;
                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }
    }
    .container_footer {
        height: 60px;
        padding-top: 10px;
        box-sizing: border-box;
    }
}
</style>
