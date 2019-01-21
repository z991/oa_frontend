import axioIn from "../../store/axioIn";
import Router from "../../router/index";
/*
 * @Author: liuqian 
 * @Date: 2018-11-15 16:35:17 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-14 10:57:19
 */
export default {
  name: 'createTrain',
  data () {
    var validatePass = (rule, value, callback) => {
      let reg = /^\d{11}$/
      if (value === '') {
        callback(new Error('请输入培训联系人电话'));
      } else {
        let transNum = Number(value);
        if(!reg.test(transNum)){
          callback(new Error('请输入11位电话号码'));
        }else{
          callback();
        }
      }
    };
    return {
      ruleForm: {
        training_instructors: '',
        training_contact: '',
        training_contactnum: '',
        training_contactqq: '',
        training_position: '',
        customer_training_needs: '',
        communication_way: [],
        final_training_method: '',
        start_time: '',
        end_time: '',
        untrained_cause: ''
      },
      ruleFormDateBefore: {
          disabledDate: (time) => { 
              if (this.ruleForm.end_time != "") {
                  return time.getTime() < Date.now() || time.getTime() < this.ruleForm.end_time;
              } else {
                  return time.getTime() < Date.now();
              }
          }
      },
      ruleFormDateAfter: {
          disabledDate: (time) => {
              return time.getTime() < this.ruleForm.start_time || time.getTime() < Date.now();
          }
      },
      rules: {
        training_contact: [
          { required: true, message: '请输入培训联系人', trigger: 'change' }
        ],
        training_contactnum: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        training_contactqq: [
          { required: true, message: '请输入培训联系人QQ', trigger: 'change' }
        ],
        communication_way: [
          { required: true, message: '请至少选择一个沟通方式', trigger: 'change' }
        ],
        final_training_method: [
          { required: true, message: '请选择最终培训方式', trigger: 'change' }
        ],
      },
      problemId: '',//问题ID
      communicMode: [],//沟通方式列表
      trainTrainers: [],//讲师列表
      trainMode: [],//培训方式
    }
  },
  created:async function () {
    this.problemId = this.$route.query.id;
    //讲师列表
    await axioIn.get('/api/workorder/simple_matter/get_staff/?group_name=培训管理讲师').then(res=>{
      this.trainTrainers = res.data;
    })
    //沟通方式
    await axioIn.get('/api/workorder/simple_matter/communicate_way/').then(res=>{
      for(var attr in res.data){
        this.communicMode.push({name: res.data[attr],id: attr});
      }
    })
    await axioIn.get('/api/workorder/simple_matter/training_methods/').then(res=>{
      for(var attr in res.data){
        this.trainMode.push({name: res.data[attr],id: attr});
      }
    })
    axioIn.get(`/api/workorder/matter_flow/${this.problemId}/`).then(res=>{
      this.ruleForm.training_instructors = res.data.training_instructors //培训讲师
      this.ruleForm.training_contact = res.data.training_contact//培训联系人
      this.ruleForm.training_contactnum = res.data.training_contactnum // 培训联系人电话
      this.ruleForm.training_contactqq = res.data.training_contactqq // 培训联系人qq
      this.ruleForm.training_position = res.data.training_position;//培训人职位
    })
  },
  methods: {
    submitForm (formName) {
      let _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axioIn.put(`api/workorder/matter_flow/${this.problemId}/communication_requirements/`,this.ruleForm).then(res=>{
            this.$message({
              message: '表单提交成功',
              type: 'success',
              duration: 1500,
              onClose: function () {
                Router.push({path: '/trainDetail',query: {id: _this.problemId}});
              }
            });
          })
        } else {//必填项没有填完整
          // console.log(this.ruleForm.communication_way)
          return false;
        }
      });
    },
    closeForm () {//取消操作
      Router.push({path: '/trainDetail',query: {id: this.problemId}});
    },

      //选择开始时间，清空结束时间
      changeTime(date){
          this.ruleForm.end_time = "";
          this.ruleFormDateAfter={
              disabledDate(time) { 
                    return (time.getTime() < new Date(date).getTime());
              }
          }
      }
  }
}