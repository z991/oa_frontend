<template>
    <div class="wifadata">
        <p class="qu">数据管理 > 店铺数据 </p>
         <span class="login_position" ></span>
         <span class="login_text" > & copy北京能通天下网络技术有限公司版权所有</span>
         <!-- <span class="login_ab" ></span> -->
         <!-- <span class="login" >&copy 北京能通天下网络技术有限公司版权所有</span> -->
        <iframe  :src="src"   frameborder="0" scrolling="no" id="external-frame" ></iframe>
     

    </div>
</template>
<script>
export default {
  name: "wifidata",
  data: function() {
    return {
      src: "http://mancy.wifipix.com/"
    };
  },
  mounted() {

        var _iframe = document.getElementById('external-frame');
      
    this.setIframeHeight(document.getElementById("external-frame"));
    this.login();
  },
  methods: {
    setIframeHeight(iframe) {
      if (iframe) {
        var iframeWin =
          iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
          iframe.height =
            iframeWin.document.documentElement.scrollHeight ||
            iframeWin.document.body.scrollHeight;
        }
      }
    },
    login() {
      var request = new XMLHttpRequest();
      request.open("POST", "http://mancy.wifipix.com/api/user/login", true);
      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
        }
      };

      var formData = new FormData();
      formData.append("userName", "demo");
      formData.append("password", "shiyu2017");
      var obj = JSON.stringify(obj);
      request.send(formData);
    },
    getCookie(name) {
      var cookieValue = "";
      var search = name + "=";
      if (document.cookie.length > 0) {
        offset = document.cookie.indexOf(search);
        if (offset != -1) {
          offset += search.length;
          end = document.cookie.indexOf(";", offset);
          if (end == -1) end = document.cookie.length;
          cookieValue = unescape(document.cookie.substring(offset, end));
        }
      }
      return cookieValue;
    }
  }
};
</script>
<style lang='scss' scoped>
.wifadata {
  width: 100%;
  height: 100%;
  overflow: hidden;
  #external-frame {
    width: 100%;
    position: relative;
    min-height: 1000px;
  }
  .login_position {
    position: absolute;
    display: block;
    background: #fff url(../assets/logo.png) no-repeat;
    width: 120px;
    height: 40px;
    z-index: 999;
    left: 38px;
    top: 155px;
  }
  .login_text {
    position: absolute;
    display: block;
    background: #fff;
    width: 490px;
    height: 40px;
    z-index: 999;
    right: 12.5px;
    bottom: 3px;
  }
  .login_ab {
    position: absolute;
    display: block;
    background: #e9f1f2 url(../assets/logo.png) no-repeat;
    width: 250px;
    height: 40px;
    z-index: 999;
    left: 24%;
    top: 208px;
  }
  .login {
    position: absolute;
    display: block;
    background: #e9f1f2;
    width: 380px;
    height: 40px;
    font-size: 13px;
    z-index: 999;
    right: 39%;
    bottom: 0;
    margin: 0 auto;
  }
}
</style> 
        
 

