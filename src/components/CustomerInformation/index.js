import axioIn from '../../store/axioIn'
import Router from "../../router/index";
import {
    mapGetters,
    mapMutations
} from 'vuex';

export default {
    name: 'CustomerInformation',
    data() {
        return {
            leftTabIndex: '1',
            activeName: '1',      //操作tab
            button_list: false,
            // ---------------------------客户信息-------------------------------
            // 基本信息
            company_info: {
                provinces: [],
                citys: [],
                city: '',
                detail: '',
                // 所属行业
                industrys: [],
                // 客户级别
                customer_levels: [],
                // 品牌效应
                brand_effects: [],
            },
            // 联系信息
            link_info: [],
            link_info_types: [],
            // 订单信息
            order_info: {
                training_methods: [],
                // 客户版本
                classifys: [
                    {
                        label: 1,
                        value: '经典版'
                    },{
                        label: 2,
                        value: '重构版'
                    }
                ],
                // 业务模式
                cli_versions: [
                    {
                        label: 1,
                        value: 'B2B'
                    },{
                        label: 2,
                        value: 'B2C'
                    },{
                        label: 3,
                        value: '不限'
                    },{
                        label: 4,
                        value: 'B2B2C'
                    }
                ],
                // 部署方式
                deploy_ways: [
                    {
                        label: 1,
                        value: '标准版'
                    },{
                        label: 2,
                        value: '公有云'
                    },{
                        label: 3,
                        value: '专属云'
                    },{
                        label: 4,
                        value: '私有云'
                    },{
                        label: 5,
                        value: '缺省'
                    }
                ],
                // 是否签署合同
                sign_contracts: [
                    {
                        value: 0,
                        label: '否'
                    }, {
                        value: 1,
                        label: '是'
                    },
                ],
                // 是否已特批
                special_selections: [
                    {
                        label: 1,
                        value: '否'
                      }, {
                        label: 0,
                        value: '是'
                      },
                ],
            },
            // 开通模块
            function_info : {
                checkedbox: [],
                checksbox: [],
            },
            

            // 相关信息
            aboutList: [
                {
                    name: '相关问题',
                    number: 0,
                    type: 1,
                    note: {
                        backgroundImage: "url(" + require("../../../static/training_icon/related.png") + ") ",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      },
                },{
                    name: '需求',
                    number: 0,
                    type: 2,
                    note: {
                        backgroundImage: "url(" + require("../../../static/training_icon/demand.png") + ") ",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      },
                },{
                    name: '培训',
                    number: 0,
                    type: 3,
                    note: {
                        backgroundImage: "url(" + require("../../../static/training_icon/training.png") + ") ",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      },
                },{
                    name: '产品配置',
                    number: 0,
                    type: 4,
                    note: {
                        backgroundImage: "url(" + require("../../../static/training_icon/product.png") + ") ",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      },
                },{
                    name: '合同',
                    number: 0,
                    type: 5,
                    note: {
                        backgroundImage: "url(" + require("../../../static/training_icon/contract.png") + ") ",
                        backgroundPosition: "center center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain",
                      },
                }
            ],
            // ---------------------------操作信息-------------------------------
            // 操作tabs
            Information: {
                Remarks: [],
                ChangeRecords: [],
                DemandResults: []
            },

            fileList: [],
            datas: '',
            isDisabled: true, //资料是否编辑
            idReady: true,   //验证状态
            states: false,   //数据获取状态
            normal: {
                id: 2772,
                order_info: {
                    "id": '',
                    "contract_start_time": "",
                    "contract_end_time": "",
                    "contract_index": "",
                    "contract_accessory": "",
                    "contract_amount": "",
                    "amount_cashed": "",
                    "cashed_time": "",
                    "created_at": "",
                    "visitor": '',
                    "consult": '',
                    "training_method": 0,
                    "special_selection": 0,
                    "sign_contract": 1,
                    "kf_number": '',
                    "cli_version": 2,
                    "transmitting_state": 2,
                    "comment": "{0: '', 1: '', 2: ''}",
                    "deploy_way": 2,
                    "classify": 1
                },
                link_info: [
                    {
                        "id": '',
                        "linkman": "",
                        "link_phone": "",
                        "link_email": "",
                        "link_qq": "",
                        "link_type": 1,
                        "link_work": ""
                    }
                ],
                company_info: {
                    "company_name": "公司名称",
                    "abbreviation": "",
                    "company_url": [
                        {
                            "id": '',
                            "company_url": ""
                        }
                    ],
                    "company_address": {
                        "id": '',
                        "province": '',
                        "city": '',
                        "detail": ""
                    },
                    "industry": "",
                    "company_email": "",
                    "GSZZ": "",
                    "service_area": "",
                    "platform_informatiom": "",
                    "brand_effect": 1,
                    "customer_level": 1,
                    "customer_type": false,
                    "station_type": 2
                },
                function_info: [],
            }
        }
    },
    created() {
        // this.id = this.$route.query.id;
    },
    beforeMount() {
        // 省份列表
        this.getprovince();
        // 开通模块 功能列表
        this.featureList();
        //联系信息列表
        this.connectList();
        //品牌效应列表
        this.effectList();
        //客户级别
        this.customerList();
        //培训方式
        this.trainingList();
        //行业信息
        this.industryList();
        // 客户 getData
        let {getLibraryData} = this;
        this.dataInit(getLibraryData.id);
        this.infoList(getLibraryData.id);
    },
    mounted() {
        
    },

    computed:{
        ...mapGetters(['getLibraryData'])
    },
    methods: {
        ...mapMutations(['OA_LIBRARY', 'OA_BREADCRUMBD']),
        // 获取省份
        getprovince() {
            axioIn.get('/api/workorder/areainfo/?level=1')
            .then(res=>{
                this.company_info.provinces = res.data;
            });
        },
        // 客户（详情）
        dataInit(id) {
            if(id){
                axioIn.get(`/api/workorder/khkcompany/khk_retrieve/?pk=${id}`)
                .then(res=>{
                    this.datas = res.data;
                    this.states = true;

     
                        this.fileList = res.data.order_info.contract_accessory;
                    
                        if(typeof res.data.order_info.contract_accessory == "string" && res.data.order_info.contract_accessory){
                            this.fileList = JSON.parse(res.data.order_info.contract_accessory) || []
                        }
                    
                        if(res.data.order_info.contract_accessory==""){
                            this.fileList = [];
                        }
                    if(this.datas.company_info.company_address.province) {
                        this.company_info.city = this.datas.company_info.company_address.city;
                        this.company_info.detail = this.datas.company_info.company_address.detail;
                        this.changeProvince(1,this.datas.company_info.company_address.province);
                    }
                    this.function_info.checkedbox = this.datas.function_info  || [];
                    if(typeof this.datas.function_info == "string" && this.datas.function_info){
                        this.function_info.checkedbox = JSON.parse(this.datas.function_info);
                    }
                })
                .catch((res)=>{
                    this.buttonMessage('获取信息失败', "warning", 1500);
                    this.datas = this.normal;
                    this.states = false;
                })
            } 
        },
        // 公司地址修改
        changeProvince(type,n) {
            this.company_info.city = type ? this.company_info.city : '';
            this.company_info.detail = this.company_info.city === '' ? "" : this.company_info.detail;
            axioIn.get('/api/workorder/areainfo/?province='+n)
            .then(res=>{
               this.company_info.citys = res.data;
            });
        },
        changeCity() {
            this.company_info.detail = '';
        },
        // 所属行业列表
        industryList() {
            axioIn.get('/api/workorder/industry/')
            .then((res) => {
                this.company_info.industrys = res.data;
            });
        },
        // 开通模块 功能列表
        featureList() {
            axioIn.get('/api/workorder/khkcompany/get_function_config/')
            .then(res=>{
                let arr = res.data;
                Object.keys(arr).forEach((key)=>{
                    this.function_info.checksbox.push({
                        value:parseInt(key),
                        label:arr[key],
                    })
                });
            })
        },
        // 联系信息 列表
        connectList() {
            axioIn.get('/api/workorder/khkcompany/get_link_type/')
            .then(res=>{
                let data = res.data;
                Object.keys(data).forEach((key)=>{
                    this.link_info_types.push({
                        value:parseInt(key),
                        label:data[key],
                    })
                });
            })
        },
        // 品牌效应 列表
        effectList() {
            axioIn.get('/api/workorder/khkcompany/get_brand_effect/')
            .then((res) => {
                let arr = [],
                data = res.data;
                Object.keys(data).forEach((key)=>{
                    arr.push({
                        label:data[key],
                        value:parseInt(key)
                    })
                })
                this.company_info.brand_effects = arr;
            });
        },
        // 客户级别 列表
        customerList() {
            axioIn.get('/api/workorder/khkcompany/get_customer_level/')
            .then((res) => {
                let arr = [],
                data = res.data;
                Object.keys(data).forEach((key)=>{
                    arr.push({
                        label:data[key],
                        value:parseInt(key)
                    })
                })
                this.company_info.customer_levels = arr;
            });
        },
        // 培训方式 列表
        trainingList() {
            axioIn.get('/api/workorder/khkcompany/get_training_method/')
            .then((res) => {
                let arr = [],
                data = res.data;
                Object.keys(data).forEach((key)=>{
                    arr.push({
                        label:data[key],
                        value:parseInt(key)
                    })
                })
                this.order_info.training_methods = arr;
            });
        },

        // 编辑/修改
        edit() {
            // this.isDisabled = false;
            let {getLibraryData} = this,
            data={
                id:getLibraryData.id,
                modelName:'cscdetail',
            };
            this.OA_LIBRARY(data);
            this.$router.push(`createLibrary`)
        },
        // 输入框验证
        /*
        * 0 文字验证
        * 1 邮箱验证
        * 2 QQ验证
        * 3 电话验证
        * 4 数值验证
        * */
        checkText(type,data,tit) {
            if(!data.length){
                this.buttonMessage('请完善必填信息', "warning", 1500);
                this.idReady = false;
            } else {
                this.idReady = true;
            }
            // switch(type) {
            //     case 0:
            //     if(!data.length){
            //         this.buttonMessage( tit + '必填信息', "warning", 1500);
            //         this.idReady = false;
            //     } else {
            //         this.idReady = true;
            //     }
            //     break
            //     case 1:
            //     var regexpEmail = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/;
            //     if(!regexpEmail.test(data) ){
            //         this.buttonMessage( '邮箱验证未通过', "warning", 1500);
            //         this.idReady = false;
            //     } else {
            //         this.idReady = true;
            //     }
            //     break
            //     case 2: 
            //     var regexpQq = /^[1-9][0-9]{4,}$/gim;
            //     if(regexpQq.text(data)) {
            //         this.buttonMessage('QQ验证未通过', "warning", 1500);
            //         this.idReady = false;
            //     } else {
            //         this.idReady = true;
            //     }
            //     case 3: 
            //     var regexpPhone = /^1[3|4|5|6|7|8]\d{9}$/gim;
            //     if(regexpPhone.text(data)) {
            //         this.buttonMessage('电话验证未通过', "warning", 1500);
            //         this.idReady = false;
            //     } else {
            //         this.idReady = true;
            //     }
            //     case 4: 
            //     var regexpNum = /^[1-9][0-9]*$/gim;
            //     if(regexpNum.text(data)) {
            //         this.buttonMessage('数值验证未通过', "warning", 1500);
            //         this.idReady = false;
            //     } else {
            //         this.idReady = true;
            //     }
            // }
        },
        // 取消
        cancle() {
            let {getLibraryData} = this;
            this.dataInit(getLibraryData.id);
            this.isDisabled = true;
        },
        // 保存
        save() {
            // 公司信息 公司地址
            this.datas.company_info.company_address.city = this.company_info.city;
            this.datas.company_info.company_address.detail = this.company_info.detail;
            // 公司信息 公司网址
            let company_url_list = []
            this.datas.company_info.company_url.forEach(item=>{
                company_url_list.push({
                    company_url: item.company_url,
                    id: item.id
                })
            })
            this.datas.company_info.company_url = company_url_list;
            // 功能列表
            if(!this.function_info.checkedbox.length) {
                return this.buttonMessage('开通模块不能为空', "warning", 1500);
            }
            this.datas.function_info = this.function_info.checkedbox;

            let {getLibraryData} = this;
            if(this.idReady) {
                axioIn.put('/api/workorder/khkcompany/' + getLibraryData.id + '/', this.datas)
                .then(res=>{
                    this.isDisabled = true;
                    this.$router.push('cscLibrary');
                })
                .catch((res)=>{
                    this.buttonMessage('修改失败', "error", 1500);
                })
            }
        },

        // tab切换
        tabChange(tab, event) {
        },
        // 附件 
        beforeAvatarUpload(file){
            // console.log(file);
        },
        successUpload(file,fileList){
            this.fileList.push({
                name:file.name,
                url:file.url,
                uid:fileList.uid,
            })
        },
        handleRemove(file, fileList) {
            this.fileList.map((item,index)=>{
                if (item.uid == file.uid){
                    this.fileList.splice(index,1);
                }
            })
        },

        // 提示
        buttonMessage(data, types, time) {
            this.$notify({
                title: "提示",
                message: data,
                position: "top-right",
                type: types,
                duration: time
            });
        },
        // 重新加载
        onReloadFn() {
            let {getLibraryData} = this;
            this.dataInit(getLibraryData.id);
        },
        // 返回
        back() {
            this.$router.push('cscLibrary');
        },
        // 记录信息 列表
        infoList(id) {
            if(id) {
                axioIn.get('/api/workorder/khkcompany/' + id + '/get_remark/')
                .then((res)=>{
                    this.Information.Remarks = res.data[1];
                    this.Information.ChangeRecords = res.data[2];
                    this.Information.DemandResults = res.data[3];
                })
            }
        },
        // 添加备注
        addRemark() {
            let {getLibraryData} = this;
            this.$prompt('备注', '添加备注', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    let data = {
                        "content": value,
                        "mark_type": 1,
                        "company": getLibraryData.id
                    }
                    axioIn.post('/api/workorder/khkcompany/create_remark/', data)
                    .then((res)=>{
                        this.infoList(getLibraryData.id);
                    })
                }).catch(() => {   
                this.buttonMessage('取消输入', "info", 1500);  
                });
        },
        // 添加沟通
        addCommunication() {
            let {getLibraryData} = this;
            this.$prompt('客户需求', '添加沟通', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                let data = {
                        "content": value,
                        "mark_type": 3,
                        "company": getLibraryData.id
                    }
                    axioIn.post('/api/workorder/khkcompany/create_remark/', data)
                    .then((res)=>{
                        this.infoList(getLibraryData.id);
                    })
                    .catch(()=>{

                    })
                }).catch(() => {   
                this.buttonMessage('取消输入', "info", 1500);  
                });
        },
        createTotal (item) {//所有的创建问题
            switch (item.name){
                case '培训':
                    this.createQuestion();
                    break;
                case '产品配置':
                    this.createProduct();
                    break;
            }
        },
        //创建产品配置
        createProduct() {
            let data={
                breadcrumbName: '创建问题',
                breadcrumbParentName: '客户库'
              },
            {getLibraryData} = this,
            deploy_way = this.datas.order_info.deploy_way,
            arr = this.order_info.deploy_ways.filter((item)=>{return item.label == deploy_way});
            this.OA_BREADCRUMBD(JSON.stringify(data));
            this.$store.commit('setActiveIndex', '/CustomerInformation');
            Router.push({
                path: '/productDeployCreate',
                query:{
                    id: getLibraryData.id,
                    name: this.datas.company_info.company_name,
                    // deploy_way: arr[0].value
                }
            })
        },
        // 创建培训问题
        createQuestion() {
            let data={
                breadcrumbName: '创建问题',
                breadcrumbParentName: '客户库'
              },
            {getLibraryData} = this;
            // deploy_way = this.datas.order_info.deploy_way,
            // arr = this.order_info.deploy_ways.filter((item)=>{return item.label == deploy_way});
            // console.log(this.datas,this.order_info.deploy_ways)
            this.OA_BREADCRUMBD(JSON.stringify(data));
            this.$store.commit('setActiveIndex', '/CustomerInformation');
            this.$router.push({
                name: 'createQuestion',
                params:{
                    id: getLibraryData.id,
                    name: this.datas.company_info.company_name,
                    // deploy_way: arr[0].value
                }
            })
        },
        changeleftTabIndex(val) {
            this.leftTabIndex = val;
            if(val=='2') {
                this.getAboutList();
            }
        },
        // 相关信息列表
        getAboutList() {
            let {getLibraryData} = this;
            axioIn.get(`/api/workorder/simple_matter/${getLibraryData.id}/return_count/`)
            .then((res)=>{
                this.aboutList[2].number = res.data.matter;
                this.aboutList[3].number = res.data.product;
                if(res.data.button_list && res.data.button_list.length > 0 && res.data.button_list[0] == '创建问题') {
                    this.button_list = true;
                }
            })
        },
        // 相关信息查看
        details(item) {
            switch(item.type){
            case 3:
                let data={
                    breadcrumbName: item.name,
                    breadcrumbParentName: '客户库'
                },
                {getLibraryData} = this;
                this.OA_BREADCRUMBD(JSON.stringify(data));
                this.$store.commit('setActiveIndex', '/CustomerInformation');
                this.$router.push({
                    path: '/companyAbout',
                    query: {
                        id: getLibraryData.id,
                        name: this.datas.company_info.company_name
                    }
                })
              break;
            case 4:
                let data1={
                    breadcrumbName: item.name,
                    breadcrumbParentName: '客户库'
                },
                getLibraryData1 = this.getLibraryData;
                this.OA_BREADCRUMBD(JSON.stringify(data1));
                this.$store.commit('setActiveIndex', '/CustomerInformation');
                this.$router.push({
                    path: '/productDeployList',
                    query: {
                        id: getLibraryData1.id,
                        name: this.datas.company_info.company_name
                    }
                })
                break;
            }
        }
    },
    watch: {
        'fileList'(res){
            this.datas.order_info.contract_accessory = JSON.stringify(res);
        },
    }
}
