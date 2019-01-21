import axioIn from '../../store/axioIn';
import Router from "../../router/index";
export default {
  name: 'recordDetail',
  data () {
    return {
      record_id: '',//日志ID
      record_type: '',//区分个人还是系统
      record_list: [],//详情数据
    }
  },
  created () {
    this.record_id = this.$route.query.id;
    this.record_type = this.$route.query.type;
    if(this.record_id){
      axioIn.get(`/operlog/system-log/${this.record_id}/get_detail`).then(res=>{
        this.record_list = res.data;
      })
    }
  },
  methods: {
    getBack () {
      if(this.record_type === 'person'){
        Router.push({path: '/personal'})
      }else if(this.record_type === 'system'){
        Router.push({path: '/system',query: {flag: true}})
      }
    }
  }
}