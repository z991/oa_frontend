import axioIn from "../../store/axioIn";
import Router from "../../router/index";

/*
 * @Author: liuqian 
 * @Date: 2018-12-06 15:47:47 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-24 16:17:32
 */
export default {
  name: 'productDeployDetail',
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
      formLabelWidth: '100px',
      formLabelWidth2: '130px',
      createButton: [],//按钮
      statusShow: '',//状态值
      backUp: true,// 页面的返回按钮
      activeName: 'first', //右侧的tag切换

      allotHandler: false,//分配处理人弹窗
      dialogAllot: {content: '',dealing_person: ''},//分配处理人弹窗填写的数据
      handlerList: [],//处理人下拉列表
      dialogReject: false,//驳回弹窗
      rejectData: {num: ''},
      taskClose: false,//任务关闭弹窗
      taskClose_data: {},
      verifyNopass: false,//验证不通过弹窗
      verifyNopass_data: {num: 0,dismiss_reason: '',enclosure: []},
      verifyPass: false,//验证通过弹窗
      verifyPass_data: {},
      fieldExplain: {
          "workorder_theme": "工单主题",
          "subordinatemodule": "所属模块",
          "func_name": "功能名称",
          "func_value": "功能选项值",
          "allocation_people": "分配人",
          "dealing_person": "处理人",
          "khk_id": "客户库id",
          "open_id": "开站id",
          "company_name": "公司名称",
          "deploy_way": "部署方式",
          "company_id": "企业id",
          "oper_supt": "运营支持",
          "impl_cslt": "实施顾问",
          "grid": "节点名称",
          "commercial": "商务",
          "cli_version": "客户版本",
          "its_parent": "子站id",
          "matter_type": "问题类型",
          "reject_count": "驳回次数"
      },
      syllableDate: {
        "allocate_time": "分配时间",
          "actual_start_time": "实际开始时间",
          "actual_completion_time": "实际完成时间",
          "created_at": "创建时间",
          "updated_at": "更新时间",
      },
      detailId: '',//问题id
      productCompany: '',//公司id
      briefLeft: {company_name: '',matter_name: '' },
      modifyMark: {mark: [],log: []},//备注和改动记录的数据
      allDetail: {problem: [],allDate: [],enclosure: []},//详情接口数据
      allotFileList:[],//分配讲师处的上传附件
      customerFileList: [],//客户终止培训处上传附件
      readyFileList: [],//培训准备上传附件
      trainFileList: [],//培训上传附件
      duringTime: 1500,//消息通知的弹窗显示的时间
      clientShow: false,
      sizeForm: {},
      disposeList: [],//处理人列表
      stationId: {parent: '',children: ''},//开战的id
      noteLabel: '',//区分是任务关闭还是验证通过
      rejectFileList: [],//驳回上传附件
      nopassFileList: [],//不通过附件
      passFileList: [],//通过附件
      frequency: {demand: '',operate: ''},
      remark_show: false,//备注弹窗
      remarkData: {content: '',correlation_id: ''},
    }
  },
  mounted () {
    window.sessionStorage.removeItem('stationType');window.sessionStorage.removeItem('productStart');
    this.detailId = this.$route.query.id;
    if(this.$route.query.company_id){this.clientShow = true;}else{this.clientShow = false;}
    this.gainDetail();
    this.getRemark();
  },
  methods: {
    allButton (name) {
      switch (name){
        case '分配处理人':
          this.allotHandler = true;
          this.dialogAllot = {content: '',dealing_person: '',resource: ''};
          break;
        case '驳回':
          this.dialogReject_show();
          break;
        case '再次申请':
          this.reapply();
          break;
        case '云平台操作完成':
          this.operateFinish();
          break;
        case '运维操作完成':
          this.operateFinish();
          break;
        case '操作方验证': 
          this.operateVerification();
          break;
        case '需求方验证通过':
          this.verifyPass_data = {content: '',enclosure: []};
          this.noteLabel = '验证通过';
          this.verifyPass = true;
          break;
        case '操作方验证通过':
        console.log(this.frequency)
          this.verifyPass_data = {content: '',enclosure: []};
          this.noteLabel = '验证通过';
          this.verifyPass = true;
          break;
        case '任务关闭':
          this.verifyPass_data = {content: '',enclosure: []};
          this.noteLabel = '任务关闭';
          this.verifyPass = true;
          break;
        case '需求方验证不通过':
          this.verifyNopass_data = {dismiss_reason: '',enclosure: [],num: 0};
          this.verifyNopass_data.num = this.frequency.demand;
          this.verifyNopass = true;
          break;
        case '操作方验证不通过':
          this.verifyNopass_data = {dismiss_reason: '',enclosure: [],num: 0};
          this.verifyNopass_data.num = this.frequency.operate;
          this.verifyNopass = true;
          break;
      }
    },
    gainDetail () {//获取问题的详情
      this.allDetail = {problem: [],allDate: [],enclosure: []};
      axioIn.get(`/api/workorder/product_config/${this.detailId}/`).then(res=>{
        this.statusShow = res.data.product_stautus;//状态
        this.briefLeft.company_name = res.data.company_name;//最上边左边要显示的数据
        this.rejectData.num = res.data.reject_count;
        this.frequency = {demand: res.data.demand_count,operate: res.data.operation_count};//不通过的次数
        this.stationId =  {parent: res.data.open_id ,children: res.data.children_id};
        // this.briefLeft.matter_name = res.data.matter_name;
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
                                    // m.url = m.url;
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
    getRemark () {
      axioIn.get(`/api/workorder/simple_config/${this.detailId}/get_remark/`).then(res=>{
        this.modifyMark = res.data;
      })
    },
    addRemark () {//添加备注弹窗
      this.remarkData = {content: '',correlation_id: this.detailId};
      this.remark_show = true;
    },
    remark_sure () {//确认添加备注
      let _this = this;
      if(this.remarkData.content === ''){
          this.$message.error('请填写备注');
      }else{
          axioIn.post(`/api/workorder/simple_config/create_mark/`,this.remarkData).then(res=>{
              this.$message({
                  message: '添加备注操作成功！',
                  type: 'success',
                  duration: _this.duringTime,
                  onClose: function () {
                      _this.remark_show = false;
                      _this.gainDetail();
                      _this.getRemark()
                  }
                });
          })
      }
    },
    getPersonnel (value) {//获取人员列表
      if(value === '云平台操作'){
        axioIn.get(`api/workorder/simple_matter/get_staff/?group_name=平台组`).then(res=>{
          this.disposeList = res.data;
          this.dialogAllot.dealing_person = '';
        })
      }else if(value === '运维操作'){
        axioIn.get(`api/workorder/simple_matter/get_staff/?group_name=运维`).then(res=>{
          this.disposeList = res.data;
          this.dialogAllot.dealing_person = '';
        })
      }
    },
    allotHandler_sure () {//分配处理人确定
      let _this = this;
      if(this.dialogAllot.dealing_person === ''){
          this.$message.error('请填写处理人');
      }else{
          axioIn.put(`/api/workorder/product_config/${this.detailId}/problem_solver/`,this.dialogAllot).then(res=>{
              this.$message({
                  message: '分配处理人操作成功！',
                  type: 'success',
                  duration: _this.duringTime,
                  onClose: function () {
                      _this.allotHandler = false;
                      _this.gainDetail();
                      _this.getRemark()
                  }
                });
          })
      }
    },
    dialogReject_show () {//驳回弹窗
      this.dialogReject = true;
      this.rejectData = {dismiss_reason: '',enclosure: '',num: ''};
      this.allDetail.problem.map(n=>{
        if(n.fieldCode === 'reject_count'){
            this.rejectData.num = n.value;
        }
      })
    },
    dialogReject_sure () {//驳回确定
      let _this = this;
      if(this.rejectData.dismiss_reason === ''){
          this.$message.error('请填写驳回原因');
      }else{
          axioIn.put(`/api/workorder/product_config/${this.detailId}/reject/`,this.rejectData).then(res=>{
              this.$message({
                  message: '分配处理人操作成功！',
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
    reapply () {//再次申请
      let companyId = '';
      axioIn.get(`/api/workorder/simple_config/${this.detailId}/tell_khkid/`).then(res=>{
        companyId = res.data.khk_id;
        Router.push({path: '/productDeployCreate',query: {productId: this.detailId,id: companyId}})
      })
    },
    operateFinish () {//平台操作完成
      let product = {};
      var d = new Date();
      var str = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      product.start = str;product.detailId = this.detailId;
      window.sessionStorage.setItem('productStart',JSON.stringify(product));
      if(this.stationId.children){
        window.sessionStorage.setItem('stationType', this.stationId.parent);
        Router.push({path: '/openstations',query: {id: this.stationId.children}});
      }else{
        Router.push({path: '/openstations',query: {id: this.stationId.parent}});
      }
      
    },
    operateVerification () {//操作方验证
      let _this = this;
      axioIn.get(`/api/workorder/product_config/${this.detailId}/operator_verification/`).then(res=>{
        this.$message({
          message: '操作成功！',
          type: 'success',
          duration: _this.duringTime,
          onClose: function () {
              _this.gainDetail();
              _this.getRemark()
          }
        });
      })
    },
    // taskClose_sure () {//任务关闭确定

    // },
    verifyNopass_sure () {//验证不通过确定
      let _this = this;
      if(this.verifyNopass_data.dismiss_reason === ''){
          this.$message.error('请填写原因');
      }else{
          axioIn.put(`/api/workorder/product_config/${this.detailId}/fail_verification/`,this.verifyNopass_data).then(res=>{
              this.$message({
                  message: '操作成功！',
                  type: 'success',
                  duration: _this.duringTime,
                  onClose: function () {
                      _this.verifyNopass = false;
                      _this.gainDetail();
                      _this.getRemark()
                  }
                });
          })
      }
    },
    verifyPass_sure () {//验证通过确定和任务关闭
      let _this = this;
      if(this.verifyPass_data.content === ''){
          this.$message.error('请填写备注');
      }else{
          axioIn.put(`/api/workorder/product_config/${this.detailId}/verification_pass/`,this.verifyPass_data).then(res=>{
              this.$message({
                  message: '操作成功！',
                  type: 'success',
                  duration: _this.duringTime,
                  onClose: function () {
                      _this.verifyPass = false;
                      _this.gainDetail();
                      _this.getRemark()
                  }
                });
          })
      }
    },
    //上传附件的操作
    rejectUploadSuccess (file,fileList) {
      this.rejectFileList.push({
        name:file.name,
        url:file.url,
        uid:fileList.uid,
      })
    },
    rejectRemoveCover (file,fileList) {
      this.rejectFileList.map((item,index)=>{
        if (item.uid == file.uid){
            this.rejectFileList.splice(index,1);
        }
      })
    },
    passUploadSuccess (file,fileList) {
      this.passFileList.push({
          name:file.name,
          url:file.url,
          uid:fileList.uid,
      })
    },
    passRemoveCover (file,fileList) {
      this.passFileList.map((item,index)=>{
          if (item.uid == file.uid){
              this.fileList.splice(index,1);
          }
      })
    },
    nopassUploadSuccess (file,fileList) {
      this.nopassFileList.push({
        name:file.name,
        url:file.url,
        uid:fileList.uid,
      })
    },
    nopassRemoveCover (file,fileList) {
      this.nopassFileList.map((item,index)=>{
        if (item.uid == file.uid){
            this.nopassFileList.splice(index,1);
        }
      })
    },
    goBack () {
      Router.push({path: '/productDeployList',query: {id: this.$route.query.company_id}})
    },
    handleClick (tab, event) {

    },
  },
  watch:{
    'rejectFileList'(res){
      this.rejectData.enclosure = JSON.stringify(res);
    },
    'nopassFileList'(res){
      this.verifyNopass_data.enclosure = JSON.stringify(res);
    },
    'passFileList'(res){
      this.verifyPass_data.enclosure = JSON.stringify(res);
    },
  }
}

