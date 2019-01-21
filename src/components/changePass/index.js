import axioIn from "../../store/axioIn";
import router from '../../router/index';
// import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      passInfo: {oldPass: '',newPass: '',surePass: ''}
    }
  },
  created(){

  },
  methods: {
    // ...mapMutations(['setHistory', 'setHistoryIndex']),
    sureChange () {
      var fillInfo = Object.values(this.passInfo), flag = false;
      fillInfo.map(n=>{if(n === ''){flag = true;}})
      if(flag){
        this.$message.error('请填写完毕');return;
      }else{
        var _this = this;
        if(this.passInfo.newPass === this.passInfo.surePass){
          axioIn.post('api/user/change_pwd/',{
            old_password: this.passInfo.oldPass,
            new_password: this.passInfo.newPass
          }).then(res=>{
            this.$message({
              type: 'success',
              message: '修改成功！',
              duration: 1000,
              onClose: function (){
                window.sessionStorage.removeItem('UserInfo');
                window.sessionStorage.removeItem('usertype');
                _this.$store.state.HistoryIndex=null;
                _this.$store.state.History=null;
                window.sessionStorage.removeItem("HistoryIndex");
                window.sessionStorage.removeItem("History");
                router.push('/');
              }
            });
          })
        }else{
          this.$message.error('新密码两次填写不一致');this.passInfo.newPass = this.passInfo.surePass = '';
        }
      }
    },
    cancel () {
      router.push('/gong');
    }
  }
}
