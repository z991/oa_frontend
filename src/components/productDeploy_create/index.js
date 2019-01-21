import axioIn from "../../store/axioIn";
import { mapGetters, mapMutations } from 'vuex';
import Router from "../../router/index";
/*
 * @Author: liuqian 
 * @Date: 2018-12-06 14:05:44 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-18 14:21:04
 */
export default {
  name: 'productDeploy_create',
  data () {
    var validateTheme = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入工单主题'));
        } else {
            if(value.length > 50){
                callback(new Error('请输入50字以内的内容'));
            }else{
                callback();
            }
        }
    };
    return {
      company: {
        company_id: 'kf_10000',
        company_name: '',
        deploy_way: '',
        cli_version: '',
        commercial: '',
        oper_supt: '暂无',      //运营顾问
        impl_cslt: '暂无' //实施顾问
    },
    // 表单信息
    ruleForm: {
        khk_id: '',//id
        children_station: '',//子站id
        workorder_theme: '',//工单主题
        subordinatemodule: '',//所属模块
        func_value: '',//功能列表
        describe: '',//描述
        enclosure: [],//上传附件
        func_name: ''
    },
    // 表单信息验证规则
    rules: {
        workorder_theme: [
            { required: true, validator: validateTheme, trigger: 'blur' }
        ]
    },
    first_func: [],//一级功能列表
    second_func: [],//二级功能列表
    subsiteList: [],//子站列表
    belongModule: [],//所属模块列表
    problemId: '',
    fileList: [],
    productId: '',//产品配置id
    } 
  },
  mounted:async function () {
    let id = this.$route.query.id;//公司id
    this.productId = this.$route.query.productId;
    this.ruleForm.khk_id = id;
    await axioIn.get(`/api/workorder/simple_config/${id}/get_station_info/`).then(res=>{//头部信息
        this.company = res.data;
    })
    await axioIn.get(`/api/workorder/simple_config/${id}/get_func/`).then(res=>{//获取站点的所有功能开关
        this.first_func = res.data.func_list;
    })
    await axioIn.get(`/api/workorder/simple_config/${id}/get_children/`).then(res=>{//获取一个公司的所有子站
        this.subsiteList = res.data;
    })
    await axioIn.get('/api/workorder/simple_config/get_module/').then(res=>{
        this.belongModule = [];
        for(var attr in res.data){
            this.belongModule.push({name: res.data[attr],value: attr});
        }
    })
    if(this.productId){
        axioIn.get(`/api/workorder/product_config/${this.productId}/`).then(res=>{
            this.ruleForm = res.data;
        })
    }
  },
  methods: {
    ...mapMutations(['OA_BREADCRUMBD']),
    changeFunc (value) {//功能列表二级联动
        let func_id = '';this.ruleForm.func_value = '';
        this.first_func.map(n=>{
            if(n.func_name === value){func_id = n.id;}
        })
        axioIn.get(`/api/workorder/simple_config/${func_id}/get_select_name/`).then(res=>{
            this.second_func = res.data;
        })
    },
    saveFrom (formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.productId){
                axioIn.put(`/api/workorder/product_config/${this.productId}/put_proconfig/`,this.ruleForm).then(res=>{
                    this.$message({
                        message: '操作成功',
                        type: 'success',
                        duration: 1500,
                        onClose: function () {
                        Router.push({path: '/ProductDeployDetail',query: {id: _this.productId}});
                        }
                    });
                })
            } else{
                axioIn.post(`/api/workorder/product_config/`,this.ruleForm).then(res=>{
                    this.$message({
                        message: res.data.info,
                        type: 'success',
                        duration: 1500,
                        onClose: function () {
                        Router.push({path: '/ProductDeployList',query: {id: _this.ruleForm.khk_id}});
                        }
                    });
                })
            }
          } else {//必填项没有填完整
            return false;
          }
        });
    },
    cancel(formName) {
        let data={
            breadcrumbName: '客户库(csc)',
            breadcrumbParentName: '客户管理'
        }
        this.OA_BREADCRUMBD(JSON.stringify(data));
        this.$store.commit('setActiveIndex', '/CustomerInformation');
        
        this.$refs[formName].resetFields();
        this.$router.push(`CustomerInformation`);
    },
    //附件上传
    beforeAvatarUpload () {

    },
    handleRemove (file,fileList) {
        this.fileList.map((item,index)=>{
            if (item.uid == file.uid){
                this.fileList.splice(index,1);
            }
        })
    },
    trainUploadSuccess (file,fileList) {
        this.fileList.push({
            name:file.name,
            url:file.url,
            uid:fileList.uid,
        })
    }
  },
  watch:{
    'fileList'(res){
        this.ruleForm.enclosure = JSON.stringify(res);
    },
  }
}