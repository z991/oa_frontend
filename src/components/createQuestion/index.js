import { mapGetters, mapMutations } from 'vuex';
import axioIn from '../../store/axioIn';
import Router from "../../router/index";

export default {
    data() {
        return {
            // 公司信息
            company: {
                id: 'kf_10000',
                name: '',
                deploy_way: '',
                operation: '暂无',      //运营顾问
                implementation: '暂无', //实施顾问
                business: '暂无',       //商务顾问
            },
            // 表单信息
            ruleForm: {
                company_pk: "",       //公司id
                matter_type: 1,    //问题类型
                // responsible: '',     //经办人
                matter_name: '',     //问题名称
                training_method: '',  //培训方式
                description_customer: '',//客户现状描述
                online_module: [],    //已上线模块
                unonline_module: [],  //未上线模块  
                training_contact: '',  //培训联系人
                training_contactnum: '',//培训联系人电话
                training_contactqq: '',//培训联系人QQ
                training_position: '',//培训联系人职位
            },
            // 表单信息验证规则
            rules: {
                matter_type: [
                    { required: true, message: '请选择问题类型', trigger: 'change' }
                ],
                responsible: [
                    { required: false, message: '请选择经办人', trigger: 'blur' },
                ],
                matter_name: [
                    { required: true, message: '请输入问题名称', trigger: 'blur' },
                    { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
                ],
                training_method: [
                    { required: true, message: '请选择经办人', trigger: 'blur' },
                ],
                description_customer: [
                    { required: false, message: '请输入客户现状描述', trigger: 'blur' }
                ],
                online_module: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                unonline_module: [
                    { type: 'array', required: false, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                training_contact: [
                    { required: true, message: '请输入培训联系人', trigger: 'blur' },
                    { min: 1, max: 50, message: '请输入培训联系人', trigger: 'blur' }
                ],
                training_contactnum: [
                    { required: true, message: '请输入培训联系人电话', trigger: 'blur' },
                    // { type: 'number', message: '请输入培训联系人电话(数字)', trigger: 'blur' }
                ],
                training_contactqq: [
                    { required: true, message: '请输入培训联系人QQ', trigger: 'blur' },
                    { min: 1, max: 20, message: '请输入培训联系人QQ', trigger: 'blur' }
                ],
                training_position: [
                    { required: true, message: '请输入培训联系人职位', trigger: 'blur' },
                    { min: 1, max: 50, message: '请输入培训联系人职位', trigger: 'blur' }
                ]
            },

            // 问题类型列表
            questionList: [{
                label: '培训',
                value: '1'
            }],
            // 经办人列表
            managerList: [],
            // 培训方式列表
            trainingMethodList : [],
            // 模块列表
            onlinemodelList: [],
            unonlinemodelList: [],
            // 运营顾问列表
            operationList: [{
                label: '陈睿',
                value: '2'
            }],  
            // 实施顾问列表 
            implementationList: [{
                label: '陈睿',
                value: '2'
            }],
            // 商务顾问列表
            businessList: [{
                label: '陈睿',
                value: '2'
            }],
            problemId: '',
        }
    },
    created() {
        let id = this.$route.params.id;
        this.problemId = this.$route.query.issueId;
        
        this.ruleForm.company_pk = id;
        this.company.name = this.$route.params.name;
        this.company.deploy_way = this.$route.params.deploy_way;

        this.getQuestionData();
        this.getManagerData();
        this.getTrainingMethod();
        this.getOpenUpModelData();
        // this.getImplementationdata();
        // this.getOperationList();
        // this.getBusinessData();
        if(this.problemId){
            //说明是再次申请,
            this.getproblemData()
        }
    },
    computed: {
        userName() {
            // return  this.$store.state.username || localStorage.name || '';
        },
        ...mapGetters(['getLibraryData'])
    },
    mounted() {
        // let user  = this.managerList.filter((item)=>{return item.label == this.userName})
        // this.ruleForm.responsible = user[0].value || '0';
    },
    methods: {
        ...mapMutations(['OA_BREADCRUMBD']),
        //获取数据并且填充进去
        getproblemData () {
            axioIn.get(`/api/workorder/matter_flow/${this.problemId}/`).then(res=>{
                this.ruleForm =res.data;
            })
        },
        // -------------------------------获取字典表------------------------------
        // 问题类型 字典表获取 
        getQuestionData() {
            axioIn.get(`/api/workorder/simple_matter/matter_type/`).then((res)=>{
                let arr=[],
                    data= res.data;
                Object.keys(data).forEach((key)=>{
                        arr.push({
                            label:data[key],
                            value:parseInt(key)
                        })
                })
                this.questionList = arr;
            })
        },
        // 经办人 字典表获取
        getManagerData() {
            let group_name = '培训管理经办人';
            axioIn.get(`/api/workorder/simple_matter/get_staff/?group_name=${group_name}`).then((res)=>{
                this.managerList = res.data
            })
        },
        //培训方式 字典表获取
        getTrainingMethod(){
            axioIn.get(`/api/workorder/simple_matter/training_methods/`).then((res)=>{
                let arr=[],
                    data= res.data;
                Object.keys(data).forEach((key)=>{
                    arr.push({
                        label:data[key],
                        value:parseInt(key)
                    })
                })
                this.trainingMethodList = arr;
            })
        },
        //开通模块 字典表获取
        getOpenUpModelData(){
            axioIn.get(`/api/workorder/khkcompany/get_function_config/`).then((res)=>{
                    let arr=[],
                        data= res.data;
                Object.keys(data).forEach((key)=>{
                    arr.push({
                        label:data[key],
                        id:parseInt(key),
                        disabled: false,
                        state: false
                    })
                })
                let str = JSON.stringify(arr);
                this.onlinemodelList = JSON.parse(str);
                this.unonlinemodelList = JSON.parse(str);
            })
        },
        // 商务顾问 字典表获取
        getImplementationdata() {
            axioIn.get(``).then((res)=>{
                 this.implementationList = res.data;
            })
        },
        // 商务顾问 字典表获取
        getOperationList() {
            axioIn.get(``).then((res)=>{
                this.operationList = res.data;
            })
        },
        // 商务顾问 字典表获取
        getBusinessData() {
            axioIn.get(``).then((res)=>{
                this.businessList = res.data;
            })
        },

        // 上线模块选择 未上线模块选择
        CheckChange(e,data) {
            e.state = !e.state;
            let checkedArr  = data.filter((item)=>{return item.label == e.label});
            if(e.state) {
                checkedArr[0].disabled = true
            } else {
                checkedArr[0].disabled = false
            }
        },

        // -------------------------------取消 保存-------------------------------
        // 取消
        cancel(formName) {
            let data={
                breadcrumbName: '客户库(csc)',
                breadcrumbParentName: '客户管理'
            }
            this.OA_BREADCRUMBD(JSON.stringify(data));
            this.$store.commit('setActiveIndex', '/CustomerInformation');
            
            this.$refs[formName].resetFields();
            if(this.problemId){
                Router.push({path: '/trainDetail',query: {id: this.problemId}})
            }else{
                this.$router.push(`CustomerInformation`);
            }
        },
        // 保存
        save(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                  if(this.problemId){//再次申请的
                    axioIn.put(`/api/workorder/matter_flow/${this.problemId}/put_train/`,this.ruleForm)
                    .then((res)=>{
                        let data={
                            breadcrumbName: '培训列表',
                            breadcrumbParentName: '客户库(csc)'
                        }
                        let  {getLibraryData} = this;
                        this.OA_BREADCRUMBD(JSON.stringify(data));
                        this.$store.commit('setActiveIndex', '/CustomerInformation');
                        // this.$router.push({
                        //     path:'/companyAbout',
                        //     query: {id: getLibraryData.id}
                        // });
                        Router.push({path: '/trainDetail',query: {id: this.problemId}})
                    })
                  }else{//新建的
                    axioIn.post(`/api/workorder/matter_flow/create_train/`,this.ruleForm)
                    .then((res)=>{
                        let data={
                            breadcrumbName: '培训列表',
                            breadcrumbParentName: '客户库(csc)'
                        }
                        let  {getLibraryData} = this;
                        this.OA_BREADCRUMBD(JSON.stringify(data));
                        this.$store.commit('setActiveIndex', '/CustomerInformation');
                        this.$router.push({
                            path:'/companyAbout',
                            query: {id: getLibraryData.id}
                        });
                    })
                  }
                } else {
                    this.$message({
                        message: '请检查必填信息',
                        type: 'warning'
                    });
                  return false;
                }
              });
        }
    }
}