       /*function：创建全局cookie
        describe：把cookie函数挂载到全局
        date：20171127
        author：qy
        version:1.10/*/
import Vue from 'vue'
import axios from 'axios';
import Qs from 'qs';
import axioIn from '../store/axioIn'
import Router from '../router/index';
var MyPlugin = {};
MyPlugin.install = function (Vue, options) {
    Vue.prototype.$setCookie =function(c_name,value,expiredays) {
        let exdate=new Date();
            exdate.setDate(exdate.getDate()+expiredays);
            document.cookie=c_name+'='+escape(value)+((expiredays==null)?"":";expires="+exdate.toGMTString);
           // console.log(document.cookie)
      }

      Vue.prototype.$getCookie = function(c_name){
        if(document.cookie.length>0){
            let c_end;
                let c_start=document.cookie.indexOf(c_name+"=")
                if(c_start!=-1){
                    c_start=c_start+c_name.length+1;
                    c_end=document.cookie.indexOf(";",c_start)
                    if(c_end==-1){c_end=document.cookie.length}
                    return unescape(document.cookie.substring(c_start,c_end))
                }
            }
            return ""
      }
        Vue.prototype.$checkCookie = function () {
            var header=Vue.prototype.$getCookie('csrftoken');
            if(header!=null&&header!=""){axioIn.defaults.headers.common['X-CSRFtoken']=header}
            else{ 
                if(header==''&&this.msn==undefined){alert('登录过期，请重新登录');Router.push({ path: '/'});}
                else{
                header=this.msn;
                 if(header!=null&&header!=""){
                     Vue.prototype.$setCookie('csrftoken',header,5)}
                }
            }
       }
        Vue.prototype.$clearCookie = function (c_name) {
            this.$setCookie(c_name, "", -1); 
        }
 }
export default MyPlugin;



 