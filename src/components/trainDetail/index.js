/*
 * @Author: liuqian 
 * @Date: 2018-11-13 15:04:17 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-06 16:39:46
 */
import axioIn from "../../store/axioIn";
import Router from "../../router/index";

export default {
  name: 'trainDetail',
  data () {
    return {
      // 弹窗数据
      form: {
          textarea: '',
          region: '1',
          name: '',
          fileList: [],
          trainingCount: 1,
          startTime: '',
          endTime: '',
          checkList: ['选中且禁用','复选框 A'],
          radio: '1' ,
      },


      // 培训讲师
      allotTrainers: [
          {
              label: '段会丽',
              value: '1'
          }
      ],
      surveyTrainers: [],//人员分配处的人员
      formLabelWidth: '100px',
      formLabelWidth2: '130px',
      createButton: [],//按钮
      statusShow: '',//状态值
      backUp: true,// 页面的返回按钮
      activeName: 'first', //右侧的tag切换
      allotLecturer: false,//分配讲师弹窗
      dialogAllot: {},//分配讲师弹窗填写的数据
      dialogReject: false,//驳回弹窗
      rejectData: {num: '',textarea: ''},
      customerTerminate_show: false,
      customerTerminate: {termination_reason: '',enclosure: null},
      trainReady_show: false,//培训准备弹窗
      trainReady: {start_time: '',end_time: '' },//培训准备的数据
      sureSchedule_show: false,//确定排期弹窗
      sureSchedule: {start_time: '',end_time: ''},//确定排期数据 
      sureScheduleDateBefore: {
            disabledDate: (time) => { 
                if (this.sureSchedule.end_time != "") {
                    return time.getTime() < Date.now() || time.getTime() < this.sureSchedule.end_time;
                } else {
                    return time.getTime() < Date.now();
                }
            }
        },
        sureScheduleDateAfter: {
            disabledDate: (time) => {
                return time.getTime() < this.sureSchedule.start_time || time.getTime() < Date.now();
            }
        },
        trainReadyDateBefore: {
            disabledDate: (time) => { 
                if (this.trainReady.end_time != "") {
                    return time.getTime() < Date.now() || time.getTime() < this.trainReady.end_time;
                } else {
                    return time.getTime() < Date.now();
                }
            }
        },
        trainReadyDateAfter: {
            disabledDate: (time) => {
                return time.getTime() < this.trainReady.start_time || time.getTime() < Date.now();
            }
        },
      train_show: false,//培训弹窗
      trainData: {region: '',training_model: [],start_time: '',end_time: '',legacy_issue: '',enclosure: []},//培训弹窗数据
      trainDataDateBefore: {
            disabledDate: (time) => { 
                if (this.trainData.end_time != "") {
                    return time.getTime() < Date.now() || time.getTime() < this.trainData.end_time;
                } else {
                    return time.getTime() < Date.now();
                }
            }
        },
        trainDataDateAfter: {
            disabledDate: (time) => {
                return time.getTime() < this.trainData.end_time || time.getTime() < Date.now();
            }
        },
      leaveIssuejoin_show: false,//遗留问题交接弹窗
      leaveIssuejoin: {},//遗留问题交接弹窗数据
      leaveIssuesure_show: false,//遗留问题确认弹窗
      leaveIssuesure: {problem_description: ''},
      personAssign_show: false,//人员分配
      personAssign: {},
      satisfySurvey_show: false,//满意度调查
      satisfySurvey: {invest_start: '', invest_end: ''},
      satisfySurveyBefore: {
            disabledDate: (time) => { 
                if (this.satisfySurvey.invest_end != "") {
                    return time.getTime() < Date.now() || time.getTime() < this.satisfySurvey.invest_end;
                } else {
                    return time.getTime() < Date.now();
                }
            }
        },
        satisfySurveyAfter: {
            disabledDate: (time) => {
                return time.getTime() < this.satisfySurvey.invest_start || time.getTime() < Date.now();
            }
        },
      allDetail: {problem: [],allDate: [],enclosure: []},//详情接口数据
      fieldExplain: {
        // "id": "问题id",
        "matter_type": "问题类型",
        // "matter_status": "问题状态",
        "training_method": "培训方式",
        "legacy_issue": "是否有遗留问题",
        "satisfaction_level": "满意度等级",
        "communication_way": "沟通方式",
        "final_training_method": "最终培训方式",
        "matter_name": "问题名称",
        "training_contactnum": "培训联系人电话",
        "training_contactqq": "培训联系人QQ",
        "training_position": "培训联系人职位",
        "description_customer": "客户现状描述",
        "online_module": "已上线模块",
        "untrained_cause": "未上线模块",
        "termination_reason": "终止原因",
        "customer_training_needs": "客户培训需求",
        "training_model": "培训模块",
        "problem_description": "问题描述",
        "customer_feedback": "客户反馈详情",
        "training_contact": "培训联系人",
        "matter_ofatta": [{
            "id": "附件id",
            "enclosure": "附件信息"
          }],
        "company_matter": "公司信息id",
        "company_name": "公司名称",
        "deploy_way": "部署方式",
        "company_id": "企业id",
        "dismiss_reason": "驳回理由",
        "dismiss_count": "驳回次数"
      },
      syllableDate: {
        "responsible": "经办人",
        "training_instructors": "培训讲师",
        "dealing_person": "问题处理人",
        "investigador": "调查人员",
        "oper_supt": "运营支持",
        "impl_cslt": "实施顾问",
        "commercial": "商务",
        "created_at": "创建时间",
        "updated_at": "更新时间",
        "invest_start": "调查开始时间",
        "invest_end": "调查结束时间",
        "start_time": "培训开始时间",
        "end_time": "培训结束时间",
      },
      detailId: '',//问题id
      leaveList: [{name: '有',value: 1},{name: '没有',value: 0}],
      briefLeft: {company_name: '',matter_name: '' },
      satisficGrade: [],
      remarkData: {content: '',mark_type: 2,matter: ''},//添加备注
      modifyMark: {mark: [],log: [],button_list: []},//备注和改动记录的数据
      remark_show: false,//添加备注的弹窗
      trainModel: [],//培训处的培训模块
      allotFileList:[],//分配讲师处的上传附件
      customerFileList: [],//客户终止培训处上传附件
      readyFileList: [],//培训准备上传附件
      trainFileList: [],//培训上传附件
      connectFileList: [],//遗留问题交接
      confirmFileList: [],//遗留问题确认上传附件
      satisficFileList: [],//满意度调查上传附件
      duringTime: 1500,//消息通知的弹窗显示的时间
      clientShow: false,
    }
  },
  created () {
    this.detailId = this.$route.query.id;
    if(this.$route.query.libraryId){this.clientShow = true;}else{this.clientShow = false;}
    this.gainDetail();//获取详情
    this.getRemark();//获取备注
  },
  methods: {
    gainDetail () {//获取问题的详情
      this.allDetail = {problem: [],allDate: [],enclosure: []};
      axioIn.get(`/api/workorder/matter_flow/${this.detailId}/`).then(res=>{
        this.statusShow = res.data.matter_status;//状态
        this.briefLeft.company_name = res.data.company_name;//最上边左边要显示的数据
        this.briefLeft.matter_name = res.data.matter_name;
        // this.rejectData.num = res.data.dismiss_count;//显示的驳回次数
        // this.trainModel = res.data.online_module//培训处的培训模块
        //洗数据的格式
        for(var attr in res.data){
            if(attr !== 'matter_ofatta'&&attr !== 'button_list'){
              let fieldKey = this.fieldExplain[attr];
              if(fieldKey){
                if(Array.isArray(res.data[attr])){
                    let str = '';
                    res.data[attr].map(n=>{
                        str += n+'、';
                    })
                    str = str.slice(0,str.length-1);
                    this.allDetail.problem.push({fieldName: fieldKey,value: str,fieldCode: attr})
                }else{
                    this.allDetail.problem.push({fieldName: fieldKey,value: res.data[attr],fieldCode: attr})
                }
              }else{
                let aDate = this.syllableDate[attr];
                if(aDate)this.allDetail.allDate.push({fieldName: aDate,value: res.data[attr],fieldCode: attr})
              }
            }else{//附件和按钮，待处理
                if(attr === 'button_list'){
                    this.createButton = res.data[attr];
                }else if(attr === 'matter_ofatta'){
                    if(res.data[attr].length === 0){
                        this.allDetail.enclosure = res.data[attr];
                    }else{
                        res.data[attr].map(n=>{
                            if(n.enclosure){
                                n.enclosure = JSON.parse(n.enclosure);
                                n.enclosure.map(m=>{
                                    let num = m.url.lastIndexOf('.');
                                    if(num !== -1){
                                        m.value = m.name+m.url.slice(num);
                                    }else{m.value = m.name;}
                                    this.allDetail.enclosure.push(m)
                                })
                            }
                            
                        })
                    }
                }
            }//
        }
        
      })
    },
    getRemark () {//获取备注
        axioIn.get(`/api/workorder/simple_matter/${this.detailId}/get_remark/`).then(res=>{
            this.modifyMark = res.data;
        })
    }, 
    addRemark () {//添加备注
        this.remarkData = {content: '',mark_type: 2,matter: this.detailId};
        this.remark_show = true;
    }, 
    remark_sure () {
        let _this = this;
        if(this.remarkData.content === ''){
            this.$message.error('请填写备注');
        }else{
            axioIn.post(`/api/workorder/simple_matter/create_mark/`,this.remarkData).then(res=>{
                this.$message({
                    message: '添加备注成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.remark_show = false;
                        _this.getRemark();
                    }
                  });
            })
        }
    },
    allButton (name) {//所有按钮的事件集合
        switch (name){
            case '分配讲师':
                this.allotLecturer_show();
                break;
            case '驳回':
                this.dialogReject_show();
                break;
            case '再次申请':
                Router.push({path: '/createQuestion',query: {issueId: this.detailId}});
                break;
            case '沟通培训需求':
                Router.push({path: '/createTrain',query: {id: this.detailId}});
                break;
            case '培训准备':
                this.trainReady = {training_instructors: '',start_time: '',end_time: '',enclosure: []};
                this.trainReady_dialog();
                break;
            case '待客户排期': 
                this.delayCustomer();
                break;
            case '确定排期':
                this.sureSchedule = {start_time: '',end_time: ''};
                this.sureSchedule_show = true;
                break;
            case '客户终止培训':
                this.customerTerminate = {termination_reason: '',enclosure: []};
                this.customerTerminate_show = true;
                break;
            case '培训':
                this.trainData_show();
                break;
            case '遗留问题交接':
                this.leaveIssuejoin_exhib();
                break;
            case '遗留问题确认':
                this.leaveIssuesure = {problem_description: '',enclosure: []};//具体补上
                this.allDetail.problem.map(n=>{
                    if(n.fieldCode === 'problem_description'){
                        this.leaveIssuesure.problem_description = n.value;
                    }
                })
                this.leaveIssuesure_show = true;
                break
            case '调查人员分配':
                this.personAssign_exhib();
                break;
            case '满意度调查':
                this.satisfySurvey_exhib();
                break;
        }
    },
    allotLecturer_show () {//分配讲师弹窗
        axioIn.get('/api/workorder/simple_matter/get_staff/?group_name=培训管理讲师').then(res=>{
            this.allotTrainers = res.data;
        })
        this.dialogAllot = {training_instructors: '',enclosure: []};this.allotLecturer = true;

    },
    allotLecturer_sure () {//确定分配讲师
        // console.log(this.dialogAllot.startTime)
        let _this = this;
        if(this.dialogAllot.region === ''){
            this.$message.error('请选择讲师');
        }else{
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/distribution_lecturer/`,this.dialogAllot).then(res=>{
                this.$message({
                    message: '分配成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.allotLecturer = false;
                        _this.gainDetail();
                        _this.getRemark();
                    }
                  });
            })
        }
    },
    dialogReject_show () {//驳回弹窗
        this.rejectData = {dismiss_reason: ''};
        this.allDetail.problem.map(n=>{
            if(n.fieldCode === 'dismiss_count'){
                this.rejectData.num = n.value;
            }
        })
        this.dialogReject = true;
    },
    //确定驳回
    dialogReject_sure () {
        let _this = this;
        if(this.rejectData.dismiss_reason === ''){
            this.$message.error('请填写驳回原因');
        }else{
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/reject/`,this.rejectData).then(res=>{
                this.$message({
                    message: '驳回操作成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.dialogReject = false;
                        _this.gainDetail();
                        _this.getRemark()
                    }
                  });
            })
        }
    },
    customerTerminate_sure () {//确定客户终止培训
        let _this = this;
        // console.log(this.customerTerminate.termination_reason);return;
        if(this.customerTerminate.termination_reason === ''){
            this.$message.error('请填写原因');
        }else{
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/termination_training/`,this.customerTerminate).then(res=>{
                this.$message({
                    message: '客户终止培训操作成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.customerTerminate_show = false;
                        _this.gainDetail();
                        _this.getRemark()
                    }
                  });
            })
        }
    },
    trainReady_dialog () {//培训准备弹窗
        axioIn.get('/api/workorder/simple_matter/get_staff/?group_name=培训管理讲师').then(res=>{
            this.allotTrainers = res.data;
            this.allDetail.allDate.map(n=>{
                if(n.fieldCode === 'training_instructors'){
                    this.trainReady.training_instructors = n.value;
                }
            })
        })
        this.trainReady_show = true;
    },
    trainReady_sure () {//确定培训准备
        let _this = this;
        // console.log(this.trainReady.training_instructors !== '',this.trainReady.start_time !== '',this.trainReady.end_time !== '');return
        if(this.trainReady.training_instructors !== '' && this.trainReady.start_time !== '' && this.trainReady.end_time !== ''){
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/training_prepare/`,this.trainReady).then(res=>{
                this.$message({
                    message: '培训准备操作成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.trainReady_show = false;
                        _this.gainDetail();
                        _this.getRemark()
                    }
                  });
            })
        }else{
            this.$message.error('培训讲师，开始，结束时间为必填');
        }    
    },
    delayCustomer () {//待客户排期
        let _this = this;
        axioIn.get(`/api/workorder/matter_flow/${this.detailId}/set_pending/`).then(res=>{
            this.$message({
                message: '待客户排期操作成功！',
                type: 'success',
                duration: _this.duringTime,
                onClose: function () {
                    _this.gainDetail();
                    _this.getRemark()
                }
            });
        })
    },
    sureSchedule_sure () {//确定客户排期
        let _this = this;
        if(this.sureSchedule.start_time !== '' && this.sureSchedule.end_time !== ''){
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/determine_scheduling/`,this.sureSchedule).then(res=>{
                this.$message({
                    message: '确认排期操作成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.sureSchedule_show = false;
                        _this.gainDetail();
                        _this.getRemark()
                    }
                  });
            })
        }else{
            this.$message.error('开始，结束时间为必填');
        }
    },
    trainData_show () {//培训
        axioIn.get('/api/workorder/simple_matter/get_staff/?group_name=培训管理讲师').then(res=>{
            this.allotTrainers = res.data;
            this.allDetail.allDate.map(n=>{
                if(n.fieldCode === 'training_instructors'){
                    this.trainData.region = n.value;
                }
            })
        })
        this.allDetail.problem.map(n=>{
            if(n.fieldCode === 'online_module'){
                this.trainModel = n.value.split('、');
            }
        })
        this.trainData = {region: '',training_model: [],start_time: '',end_time: '',legacy_issue: '',enclosure: []};
        this.train_show = true;
    },
    trainData_sure () {//确定培训
        let _this = this;
        if(this.trainData.training_model.length !== 0 &&this.trainData.start_time !== '' && this.trainData.end_time !== '' && this.trainData.legacy_issue !== ''){
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/trainning/`,this.trainData).then(res=>{
                this.$message({
                    message: '培训操作成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.train_show = false;
                        _this.gainDetail();
                        _this.getRemark()
                    }
                  });
            })
        }else{
            this.$message.error('只有附件为选填，其他为必填');
        }
    },
    leaveIssuejoin_exhib () {
        axioIn.get('/api/workorder/simple_matter/get_staff/?group_name=培训管理遗留问题处理人').then(res=>{
            this.allotTrainers = res.data;
        })
        this.leaveIssuejoin = {dealing_person: '',problem_description: '',enclosure: []};
        this.leaveIssuejoin_show = true;
    },
    leaveIssuejoin_sure () {//确定遗留问题交接
        let _this = this;
        if(this.leaveIssuejoin.dealing_person !== '' && this.leaveIssuejoin.problem_description !== ''){
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/handover_issues/`,this.leaveIssuejoin).then(res=>{
                this.$message({
                    message: '遗留问题交接操作成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.leaveIssuejoin_show = false;
                        _this.gainDetail();
                        _this.getRemark()
                    }
                });
            })
        }else{
            this.$message.error('只有附件为选填，其他为必填');
        }
    },
    leaveIssuesure_sure () {//确定遗留问题确认
        let _this = this;
        if(this.leaveIssuesure.problem_description === ''){
            this.$message.error('请填写问题描述');
        }else{
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/identification_issues/`,this.leaveIssuesure).then(res=>{
                this.$message({
                    message: '遗留问题确认操作成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.leaveIssuesure_show = false;
                        _this.gainDetail();
                        _this.getRemark()
                    }
                });
            })
        }
    },
    personAssign_exhib () {//调查人员分配弹窗
        //人员的下啦列表
        axioIn.get('/api/workorder/simple_matter/get_staff/?group_name=培训管理调查人员').then(res=>{
            this.surveyTrainers = res.data;
        })
        this.personAssign = {investigador: '',enclosure: []};this.personAssign_show = true;
    },
    personAssign_sure () {//确定调查人员分配
        // console.log(this.personAssign.investigador);return;
        let _this = this;
        if(this.personAssign.investigador === ''){
            this.$message.error('请选择培训讲师');
        }else{
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/personnel_allocation/`,this.personAssign).then(res=>{
                this.$message({
                    message: '调查人员分配操作成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.personAssign_show = false;
                        _this.gainDetail();
                        _this.getRemark()
                    }
                });
            })
        }
    },
    satisfySurvey_exhib () {//满意度调查
        axioIn.get(`/api/workorder/simple_matter/satisfaction_survey/`).then(res=>{
            for(var attr in res.data){
                this.satisficGrade.push({label: res.data[attr],value: attr})
            }
        })
        axioIn.get('/api/workorder/simple_matter/get_staff/?group_name=培训管理讲师').then(res=>{
            this.allotTrainers = res.data;
            this.allDetail.allDate.map(n=>{
                if(n.fieldCode === 'training_instructors'){
                    this.satisfySurvey.region = n.value;
                }
            })
        })
        this.satisfySurvey = {satisfaction_level: '',customer_feedback: '',invest_start: '',invest_end: '',}; 
        //"enclosure": "上传附件返回的数据"
        this.satisfySurvey_show = true;
    },
    satisfySurvey_sure () {
        let _this = this;
        if(this.satisfySurvey.satisfaction_level !== '' && this.satisfySurvey.invest_start !== '' && this.satisfySurvey.invest_end !== ''){
            axioIn.put(`/api/workorder/matter_flow/${this.detailId}/satisfaction_survey/`,this.satisfySurvey).then(res=>{
                this.$message({
                    message: '满意度调查操作成功！',
                    type: 'success',
                    duration: _this.duringTime,
                    onClose: function () {
                        _this.satisfySurvey_show = false;
                        _this.gainDetail();
                        _this.getRemark()
                    }
                });
            })
        }else{
            this.$message.error('除去附件和反馈详情为选填以外，其他均为必填');
        }
    },
    goBack () {
      Router.push({path: '/companyAbout',query: {id: this.$route.query.libraryId}})
    },
    handleClick (tab, event) {

    },
    // 附件操作
    // 附件上传完成操作
    beforeAvatarUpload () {
        
    },
    // 分配讲师附件上传成功
    handleUploadSuccess (file,fileList) {
        this.allotFileList.push({
            name:file.name,
            url:file.url,
            uid:fileList.uid,
        })
    },
    // 分配讲师附件移除
    handleRemoveCover (file,fileList) {
        this.allotFileList.map((item,index)=>{
            if (item.uid == file.uid){
                this.allotFileList.splice(index,1);
            }
        })
    },
    // 客户终止培训上传附件
    customerUploadSuccess (file,fileList) {
        this.customerFileList.push({
            name:file.name,
            url:file.url,
            uid:fileList.uid,
        })
    },
    customerRemoveCover (file,fileList) {
        this.customerFileList.map((item,index)=>{
            if (item.uid == file.uid){
                this.customerFileList.splice(index,1);
            }
        })
    },
    // 培训准备
    readyUploadSuccess (file,fileList) {
        this.readyFileList.push({
            name:file.name,
            url:file.url,
            uid:fileList.uid,
        })
    },
    readyRemoveCover (file,fileList) {
        this.readyFileList.map((item,index)=>{
            if (item.uid == file.uid){
                this.readyFileList.splice(index,1);
            }
        })
    },
    trainUploadSuccess (file,fileList) {
        this.trainFileList.push({
            name:file.name,
            url:file.url,
            uid:fileList.uid,
        })
    },
    trainRemoveCover (file,fileList) {
        this.trainFileList.map((item,index)=>{
            if (item.uid == file.uid){
                this.trainFileList.splice(index,1);
            }
        })
    },
    connectUploadSuccess (file,fileList) {//遗留问题交接上传附件
        this.connectFileList.push({
            name:file.name,
            url:file.url,
            uid:fileList.uid,
        })
    },
    connectRemoveCover (file,fileList) {
        this.connectFileList.map((item,index)=>{
            if (item.uid == file.uid){
                this.connectFileList.splice(index,1);
            }
        })
    },
    confirmUploadSuccess (file,fileList) {//遗留问题确认上传附件
        this.confirmFileList.push({
            name:file.name,
            url:file.url,
            uid:fileList.uid,
        })
    },
    confirmRemoveCover (file,fileList) {
        this.confirmFileList.map((item,index)=>{
            if (item.uid == file.uid){
                this.confirmFileList.splice(index,1);
            }
        })
    },
    satisficUploadSuccess (file,fileList) {
        this.satisficFileList.push({
            name:file.name,
            url:file.url,
            uid:fileList.uid,
        })
    },
    satisficRemoveCover (file,fileList) {
        this.satisficFileList.map((item,index)=>{
            if (item.uid == file.uid){
                this.satisficFileList.splice(index,1);
            }
        })
    },
    // 取消
    cancel() {
        this.dialogFormVisible = false;
    },
    // 保存
    save() {
        this.dialogFormVisible = false;
    },

    //选择开始时间，清空结束时间
    changeTime(date,type){
        switch(type) {
            case 1: 
            this.trainReady.end_time = "";
            this.trainReadyDateAfter={
                disabledDate(time) { 
                     return (time.getTime() < new Date(date).getTime());
                }
            }
            break;
            case 2: 
            this.sureSchedule.end_time = "";
            this.sureScheduleDateAfter={
                disabledDate(time) {
                     return (time.getTime() < new Date(date).getTime());
                }
            }
            break; 
            case 3: 
            this.trainData.end_time = "";
            this.trainDataDateAfter={
                disabledDate(time) {  //开始时间-结束时间   
                     return (time.getTime() < new Date(date).getTime());
                }
            }
            break;
            case 4: 
            this.satisfySurvey.invest_end = '';
            this.satisfySurveyAfter={
                disabledDate(time) {  //开始时间-结束时间   
                     return (time.getTime() < new Date(date).getTime());
                }
            }
        }
    }
  },
  watch: {
    'allotFileList'(res){
        this.dialogAllot.enclosure = JSON.stringify(res);
    },
    'customerFileList'(res){
        this.customerTerminate.enclosure = JSON.stringify(res);
    },
    'readyFileList'(res){
        this.trainReady.enclosure = JSON.stringify(res);
    },
    'trainFileList'(res){
        this.trainReady.enclosure = JSON.stringify(res);
    },
    'connectFileList'(res){
        this.leaveIssuejoin.enclosure = JSON.stringify(res);
    },
    'confirmFileList'(res){
        this.leaveIssuesure.enclosure = JSON.stringify(res);
    },
    'satisficFileList'(res){
        this.satisfySurvey.enclosure = JSON.stringify(res);
    },
  }
}