       /*function：创建axios对象
        describe：包装axios对象axioIn
        date：20171127
        author：qy
        version:1.10/*/
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

var axioIn = axios.create({
  // baseURL: '{{OA_FRONTEND_URL}}',
  // baseURL: 'http://192.168.30.109/',
  // baseURL:'http://localhost:8080/',
  timeout: 40000,
  withCredentials: true
});
axioIn.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  return response;
  }, function (error) {
        switch (error.response.data.detail) {
             
              case "You do not have permission to perform this action.":
      
              // alert('没有权限');
              break;
          }
          switch (error.response.status) {
            case 417:
            ElementUI.Message({
                showClose: true,
                message: '验证码输入错误',
                type: 'error'
              })
                break;  
            case 401:
            ElementUI.Message({
                showClose: true,
                message: '账号或密码输入错误',
                type: 'error'
              })
                break;  
                
            case 400:
            ElementUI.Message({
                showClose: true,
                message: error.response.data.error,
                type: 'error'
              })
            break;
     
            case 403:
            ElementUI.Message({
                showClose: true,
                message: '没有权限',
                type: 'error'
              })
                break;  
          }

      return Promise.reject(error.response);
  });

export default axioIn