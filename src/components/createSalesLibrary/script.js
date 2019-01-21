import axioIn from "../../store/axioIn";
import Router from "../../router/index";
import {
    mapState,
    mapMutations,
    mapGetters
} from  'vuex';
export default {
    name: 'createVersion',
    data () {
        return {
            logArr:[],
            //日志OldData
            logOldData:{},
            //联系人模块 label
            linkinfoLabel:{
                name:'联系人姓名',
                phone:'联系人电话',
                QQ:'联系人QQ',
                email:'联系人邮箱',
                work:'联系人职务',
                type:'类型',
            },
            //card模块
            cardTitle:'基本信息',
            cardActive:1,
            //四个Model
            customerModel:true,
            contactsModel:false,
            orderModel:false,
            openUpModel:false,
            //省市data
            provinceData:[],
            cityData:[],
            //品牌效应
            brandEffectList:[],
            //客户级别
            customerLevelList:[],
            //培训方式
            trainingMethodList:[],
            //所属行业
            industryList:[],
            //站点类型
            SiteTypeList:[
                {
                    label:'试用客户',
                    value:'1',
                },
                {
                    label:'正式客户',
                    value:'2',
                },
                {
                    label:'市场渠道客户',
                    value:'3',
                },
                {
                    label:'商务渠道客户',
                    value:'4',
                },
                {
                    label:'自用站点',
                    value:'5',
                },
            ],
            natureTypeList:[
                {
                  label:'新客户',
                  value:false,
                },
                {
                    label:'老客户信息补录',
                    value:true,
                },
            ],

            company: {
                company_name: '',
                company_url: [
                    {
                        company_url:'',
                    }
                ],
                industry:'',
                company_email: '',
                customer_type:'',
                GSZZ: '',
                service_area:'',
                brand_effect:'',
                company_address:{
                    province:'',
                    city:'',
                    detail:'',
                },
                abbreviation:'',
            },
            contactsForm:[
                {
                    link_email: "",
                    link_phone: "",
                    link_qq: "",
                    link_type: 1,
                    link_work: "",
                    linkman: "",
                },
                {
                    link_email: "",
                    link_phone: "",
                    link_qq: "",
                    link_type: 2,
                    link_work: "",
                    linkman: "",
                },
                {
                    link_email: "",
                    link_phone: "",
                    link_qq: "",
                    link_type: 3,
                    link_work: "",
                    linkman: "",
                },
                {
                    link_email: "",
                    link_phone: "",
                    link_qq: "",
                    link_type: 4,
                    link_work: "",
                    linkman: "",
                },
            ],
            orderForm:{
                customer_type:'',
                training_method:'',
                visitor:'',
                consult:'',
                sign_contract:'',
                deploy_way:'',
                special_selection:'',
                contract_start_time:'',
                contract_end_time:'',
                contract_index:'',
                contract_accessory:[],

            },
            companyRules: {
                station_type: [
                    { required: true, message: '请填写客户名称', },
                ],
                brand_effect:[
                    { required: true, message: '请选择品牌效应', },
                ],
                abbreviation:[
                    { required: true, message: '请填写公司简介', }
                ],
                company_name: [
                    { required: true, message: '请填写客户名称', }
                ],
                company_address:[
                    {  required: true, message: '请填写公司地址',}

                ],
                company_email: [
                    { required: true, message: '请填写公司邮箱', }
                ],
                industry: [
                    { required: true, message: '请选择行业',  }
                ],
                GSZZ: [
                    { required: true, message: '请填写营业执照', }
                ],
                customer_type: [
                    { required: true, message: '请选择客户性质',  }
                ],
                service_area:[
                    { required: true, message: '请填写客服工作区域',  }
                ]
            },
            contactsRules:{
                linkman: [
                    { required: true, message: '请填写联系人姓名', },
                ],
                link_phone: [
                    { required: true, message: '请填写联系人电话', },
                ],
                link_email: [
                    { required: true, message: '请填写联系人邮箱', },
                ],
                link_type:[
                    { required: true, message: '请选择联系人类型', },

                ],
                link_qq: [
                    { required: true, message: '请填写联系人QQ', },
                ],
            },
            orderRules: {
                classify:[
                    { required: true, message: '请选择产品版本', },
                ],
                deploy_way:[
                    { required: true, message: '请选择部署方式', },
                ],
                cli_version: [
                    { required: true, message: '请选择业务模式', },
                ],
                special_selection: [
                    { required: true, message: '请选择是否已特批', }
                ],
                sign_contract: [
                    {  required: true, message: '请选择是否签署合同',}
                ],
                kf_number: [
                    { required: true, message: '请填写坐席数', }
                ],
                contract_start_time: [
                    { required: true, message: '请选择合同开始时间',  }
                ],
                contract_end_time: [
                    { required: true, message: '请选择合同开始时间', }
                ],
                contract_index: [
                    { required: true, message: '请填写合同编号',  }
                ],
                contract_amount: [
                    { required: true, message: '请填写合同金额',  }
                ],
                amount_cashed: [
                    { required: true, message: '请填写回款金额',  }
                ],
                cashed_time: [
                    { required: true, message: '请填写回款时间',  }
                ],
                contract_content: [
                    { required: true, message: '请填写合同内容',  }
                ],
                visitor:[
                    { required: true, message: '请填写UV',  }
                ],
                consult:[
                    { required: true, message: '请填写PV',  }
                ],
                training_method:[
                    { required: true, message: '请选择培训方式',  }
                ]
            },
            rejectRules:{
                reason:[
                    { required: true, message: ' ',  }
                ]
            },

            //开通模块
            openUpModelData:[],
            openUpForm:{
                function_info:[],
            },

            rejectData:{
                reason:'',
            },
            rejectFlag:false,
            pickerOptions: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }],
            },
                fileList:[
                ]
        }
    },
    beforeMount(){

        this.getProvinceData();
        this.onGetBrandEffect();
        this.onGetCustomerLevel();
        this.onGetTrainingMethod();
        this.getOpenUpModelData();
        this.onGetIndustry();
        this.putData(this.getLibraryData.id);
        if(this.getLibraryData.modelName && this.getLibraryData.modelName == 'salesAgain'){
            this.openUpModel = true;
            this.orderModel = false;
            this.contactsModel = false;
            this.customerModel = false;
        }

        

    },
    computed: {
        ...mapGetters(['getLibraryData']),
    },
    methods: {
        ...mapMutations(['OA_BREADCRUMBD']),
        handleCheckedCitiesChange(){
            
        },
        getSTime(val){
        //   console.log(val);
        },
        //update flag
        putData(id){
            let {getLibraryData} = this,
            {modelName} = getLibraryData;
            if (getLibraryData.id){
                let url = `/api/workorder/khkcompany/${id}/`;
                if(modelName == 'cscdetail') {
                    url = `/api/workorder/khkcompany/khk_retrieve/?pk=${id}`
                }
                axioIn.get(url).then((res)=>{
                    //日志 老值对象 <=>
                    this.logOldData = JSON.parse(JSON.stringify(res.data));
                    this.company = res.data.company_info;
                    if(res.data.link_info.length) {
                        this.contactsForm =  res.data.link_info
                    }
                    this.orderForm = res.data.order_info;
                    
                    this.fileList = res.data.order_info.contract_accessory || [];
                    
                    if(typeof res.data.order_info.contract_accessory == "string" && res.data.order_info.contract_accessory){
                        this.fileList = JSON.parse(res.data.order_info.contract_accessory) || []
                    }

                    this.openUpForm.function_info = res.data.function_info  || [];
                    if(typeof res.data.function_info == "string" && res.data.function_info){
                        this.openUpForm.function_info = JSON.parse(res.data.function_info);
                      
                    }
                    if(res.data.company_info.company_address && res.data.company_info.company_address.province) {
                        this.onCityData(res.data.company_info.company_address.province)
                    } else {
                        this.company.company_address = {
                            province: 513201,
                            city: 513209,
                            detail:'康健宝胜广场',
                        }
                        this.getProvinceData();
                    }
                    if(!res.data.company_info.company_url.length) {
                        this.company.company_url.push({
                            company_url: ''
                        })
                    }
                })
            }
        },
        //行业字典表
        onGetIndustry(){
            axioIn.get(`/api/workorder/industry/`).then((res)=>{
                this.industryList  = res.data;

            })
        },
        //品牌效应 字典表获取
       onGetBrandEffect(){
        axioIn.get(`/api/workorder/khkcompany/get_brand_effect/`).then((res)=>{
                let arr=[],
                    data= res.data;

                Object.keys(data).forEach((key)=>{
                    arr.push({
                        label:data[key],
                        value:parseInt(key)
                    })
                })

                this.brandEffectList = arr;

            })
         },
        //客户级别 字典表获取
        onGetCustomerLevel(){
            axioIn.get(`/api/workorder/khkcompany/get_customer_level/`).then((res)=>{
                let arr=[],
                    data= res.data;

                Object.keys(data).forEach((key)=>{
                    arr.push({
                        label:data[key],
                        value:parseInt(key)

                    })
                })
                this.customerLevelList = arr;

            })
        },
        //培训方式 字典表获取
        onGetTrainingMethod(){
            axioIn.get(`/api/workorder/khkcompany/get_training_method/`).then((res)=>{
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
        //省市 字典表获取
        onCityData(province=''){
            axioIn.get(`/api/workorder/areainfo/?province=${province}`).then((res)=>{
                this.cityData = res.data;
            })
        },
        //省市Change获取 字典表获取
        onProvinceChange(province=''){
            this.company.company_address.city = '';
            this.company.company_address.detail = '';
            axioIn.get(`/api/workorder/areainfo/?province=${province}`).then((res)=>{
                this.cityData = res.data;
          })
        },
        getProvinceData(){
            axioIn.get(`api/workorder/areainfo/?level=1`).then((res)=>{
                this.provinceData = res.data;
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
                      id:parseInt(key)
                  })
              })
              this.openUpModelData = arr;
          })
        },
        onEndBind(){
            let {getLibraryData} = this,
                {modelName} = getLibraryData;
            if (modelName=='' || modelName=='sales'){
                this.$router.push(`salesLibrary`);
            }else if (modelName=='csc'){
                this.$router.push(`examineLibrary`);
            }else if (modelName=='cscdetail'){
                this.$router.push(`CustomerInformation`);
            }
        },
        onCreateFn(){
            let {company,contactsForm,orderForm,openUpForm} = this,
                {function_info} = openUpForm;
          axioIn.post(`/api/workorder/khkcompany/`,{
              company_info:company,
              link_info:contactsForm,
              order_info:orderForm,
              function_info:function_info,
          }).then((res)=>{
              if(res){
                      this.$router.push(`salesLibrary`);
              }
          })
        },
        // 提交
        onPutFn(modelName){
            let {getLibraryData,company,contactsForm,orderForm,openUpForm} = this,
                {function_info} = openUpForm,
                {id} = getLibraryData;
                if(this.fileList.length == 0) {
                    orderForm.contract_accessory = ""
                }
                let arr = this.onActionLogFn();
                // console.log(arr)
                if(getLibraryData.modelName=='salesAgain') {
                    this.onStateFn(2)
                } else {
                    axioIn.put(`/api/workorder/khkcompany/${id}/`,{
                        id:id,
                        company_info:company,
                        link_info:contactsForm,
                        order_info:orderForm,
                        function_info:function_info,
                    }).then((res)=>{
                        if(res){
                            if(modelName == 'sales'){
                                this.$router.push(`salesLibrary`);
                            } 
                            else if (modelName == 'cscDetail'){
                                let data = {
                                    title: id,
                                    operationmodule: "客户库",
                                    modify_list: arr
                                }
    
                                this.onPutOpertion(data);
                                
                     
                            }
                        }
                    })
                }
        },
        
        onPutOpertion(data)
        {
            axioIn.post('/operlog/open_log/khk_put/',data)
            .then((result)=>{
                this.$router.push(`CustomerInformation`);
            })
        },

        objectIsRight( x, y ) { 
            // If both x and y are null or undefined and exactly the same 
            if ( x === y ) { 
             return true; 
            } 
             
            // If they are not strictly equal, they both need to be Objects 
            if ( ! ( x instanceof Object ) || ! ( y instanceof Object ) ) { 
             return false; 
            } 
             
            //They must have the exact same prototype chain,the closest we can do is
            //test the constructor. 
            if ( x.constructor !== y.constructor ) { 
             return false; 
            } 
              
            for ( var p in x ) { 
             //Inherited properties were tested using x.constructor === y.constructor
             if ( x.hasOwnProperty( p ) ) { 
             // Allows comparing x[ p ] and y[ p ] when set to undefined 
             if ( ! y.hasOwnProperty( p ) ) { 
              return false; 
             } 
             
             // If they have the same strict value or identity then they are equal 
             if ( x[ p ] === y[ p ] ) { 
              continue; 
             } 
             
             // Numbers, Strings, Functions, Booleans must be strictly equal 
             if ( typeof( x[ p ] ) !== "object" ) { 
              return false; 
             } 
             
             // Objects and Arrays must be tested recursively 
             if ( ! Object.equals( x[ p ], y[ p ] ) ) { 
              return false; 
             } 
             } 
            } 
             
            for ( p in y ) { 
             // allows x[ p ] to be set to undefined 
             if ( y.hasOwnProperty( p ) && ! x.hasOwnProperty( p ) ) { 
             return false; 
             } 
            } 
            return true; 
         },
        onActionLogFn(){

            let {company,contactsForm,orderForm,openUpForm,logOldData} = this,
                arr =[],
                {function_info} = openUpForm,
                logNewData= {
                    company_info:company,
                    order_info:orderForm,
                };
            let link_oldArr = [] , function_infoArr = [];
            for(let key in logOldData) { 
                if(key == "link_info") {
                    link_oldArr = JSON.parse(JSON.stringify(logOldData[key])) || [];
                    delete logOldData.link_info;
                } 
                if(key == "function_info") {
                    function_infoArr = JSON.parse(logOldData[key]) || [];
                    delete logOldData.function_info;
                } 
            }
            
     
            Object.keys(logOldData).forEach((key)=>{
                if(key == 'order_info' || key == 'company_info'){
                    for(var childKey in logOldData[key]){
                            arr.push({
                                        word:childKey,
                                        old_value:logOldData[key][childKey],
                                    })
                    }
                }
                arr.push({
                    word:key,
                    old_value:logOldData[key],
                })
            })
            
            Object.keys(logNewData).forEach((key)=>{
                Object.keys(logNewData[key]).forEach((childKey)=>{
                    arr.push({
                        word:childKey,
                        new_value:logNewData[key][childKey],
                    })
                }) 
            })

            arr.map((n,i)=>{
                let current = n.word;
                arr.map((m,t)=>{
                    if(m.word === current && t !== i){
                        arr[i] = Object.assign(arr[i], arr[t]);
                        arr.splice(t,1);
                    }
                })
            })
            let result = arr.filter((element) => {
                return element.new_value != element.old_value

            })
            
            // 公司地址  公司网址处理  flag=false splice移除掉 
            // console.log(result);
            let company_urlArr = result.filter(item=>item.word == 'company_url'),
                company_address = result.filter(item=>item.word == 'company_address'),
                company_addressFlag = false,
                company_urlFlag =false;
            
            Object.keys(company_address).forEach((key)=>{
                company_addressFlag=this.objectIsRight(company_address[key].new_value,company_address[key].old_value);
            })

            
            
            // console.log(company_addressFlag,"company_addressFlag");

            company_urlArr.map((item)=>{
                if(Array.isArray(item.new_value) && Array.isArray(item.old_value) && item.new_value.length > 0 && item.old_value.length >0  ){
                   if(item.new_value[0].company_url != item.old_value[0].company_url){
                   
                    item.new_value =  item.new_value[0].company_url
                    item.old_value =  item.old_value[0].company_url
                    company_urlFlag = true;
                   }    
                }
               
            })


            //删除 无用key:value order_info and company_info
           result.map((item,index)=>{
    
            if(item.word =='order_info' || item.word =='company_info'){
                    result.splice(index,1);
                }
             
               
            })
            
            // 附件
            let contract_accessoryArr =  result.filter(item => item.word == 'contract_accessory');
            contract_accessoryArr.map(item=>{
                if(item.new_value == '[]' && item.old_value == "") {
                    result.map((item,index)=>{
                        if(item.word == 'contract_accessory') {
                            result.splice(index,1)
                        } 
                    })
                }
            })
            // 开通模块处理
            let intersection = function_info.filter(v => function_infoArr.includes(v)) // 交集
            let oldDifference =  function_infoArr.concat(intersection).filter(v => ! function_infoArr.includes(v) || !intersection.includes(v)) 
            let newDifference = function_info.concat(intersection).filter(v => !function_info.includes(v) || !intersection.includes(v)) // 差集
            newDifference.map(item=>{
                let function_Info =  this.openUpModelData.filter(obj=>obj.id == item)
                result.push({
                    word: function_Info[0].label,
                    old_value: '关闭',
                    new_value: '开通',
                })
            })
            oldDifference.map(item=>{
                let function_Info =  this.openUpModelData.filter(obj=>obj.id == item)
                result.push({
                    word: function_Info[0].label,
                    old_value: '开通',
                    new_value: '关闭',
                })
            })
      
            result.map((item,index)=>{
                if(!company_urlFlag && item.word=='company_url'){
                    result.splice(index,1);
                }     
               
            })
            
            result.map((item,index)=>{
                if(company_addressFlag && item.word=='company_address'){
                    result.splice(index,1);
                } 
               
            })

            result.map((item,index)=>{
                if(item.word=='comment'){
                    result.splice(index,1);
                } 
               
            })

          
            return result
        },

        onLogFilterFn(arr) {
            arr.map((item)=>{
                return item.new_value != item.old_value
            })
        },

        onNextBind(modelName,formName){
            switch (modelName){
                case 'contactsModel':
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let {company} = this,
                                {company_address} = company,
                                {province,detail,city} = company_address;
                        if (province!=='' && detail !=='' && city !=='' ){
                                this.contactsModel = true;
                                this.customerModel = false;
                            }else{
                         this.$notify({
                            title: "提示",
                            message: '请检查必填项',
                            position: "top-right",
                            type: 'error',
                            duration: 1000
                        });
                        }
                        } else {
                            // console.log('error submit!!');
                            return false;
                        }
                    });

                    break;

                case 'orderModel':
                    let flag = true;
                   this.contactsForm.forEach((item, index) => {
                            if(item.link_qq==''){
                                flag = false;
                            }else if (item.link_type== ''){
                                flag = false;
                            } else if (item.link_email=='' ){
                                flag = false;
                            } else if (item.linkman=='' ){
                                flag = false;
                            }else if (item.link_phone==''){
                                flag = false;
                            }
                        });
                        if (flag) {
                            this.orderModel = true;
                            this.contactsModel = false;
                            this.customerModel = false;
                        }

                    break;
                case 'openUpModel':
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            this.openUpModel = true;
                            this.orderModel = false;
                            this.contactsModel = false;
                            this.customerModel = false;
                        } else {
                            // console.log('error submit!!');
                            return false;
                        }
                    });
                    break;

            }
        },
        onStepFn(){
        //   console.log('ok');
        },
        onPrevBind(modelName){
            switch (modelName){
                case 'customerModel':
                    this.customerModel = true;
                    this.contactsModel = false;
                    this.openUpModel = false;
                    this.orderModel = false;
                    break;
                case 'contactsModel':
                    this.contactsModel = true;
                    this.customerModel = false;
                    this.orderModel = false;
                    this.openUpModel = false;
                    break;
                case 'orderModel':
                    this.orderModel = true;
                    this.customerModel = false;
                    this.contactsModel = false;
                    this.openUpModel = false;
                    break;

            }
        },
        onRejectFn(){
                this.rejectData.reason = '';
                this.rejectFlag = true;
        },
        onRejectActionBind(){
                let {rejectFlag,rejectData,getLibraryData} = this,
                    {reason} = rejectData,
                    {id} = getLibraryData;
            this.$refs['rejectForm'].validate((valid) => {
                if (valid) {
                    axioIn.post(`/api/workorder/khkcompany/reject_reason/`,{
                        id:id,
                        comment:reason,
                    }).then((res)=>{
                        if (res){
                     
                                this.onStateFn(0);
                                rejectFlag = false;
                     
                        }
                    })
                } else {
                    // console.log('error submit!!');
                    return false;
                }
            });

        },
        onStateFn(boole){

            let {getLibraryData, company, contactsForm} = this,
                {id} = getLibraryData;
                if(boole === 1) {
                    company.station_type = company.station_type ? company.station_type : 1;
                    company.id = id;
                    this.$store.commit('evaluate',company);
                    this.$store.commit('evaluate1',contactsForm);
                    window.sessionStorage.setItem('activeIndex', '/gong');
                    let data={
                        breadcrumbName:'开站管理',
                        breadcrumbParentName:'客户管理',
                    }
                    this.OA_BREADCRUMBD(JSON.stringify(data));
                    this.$store.commit('setActiveIndex', '/gong');
                    this.$router.push(`/openstationf`);
                } else {
                    axioIn.get(`/api/workorder/khkcompany/status?boole=${boole}&company_id=${id}`).then((res)=>{
                        if(res){
                            window.sessionStorage.setItem('activeIndex', '/examineLibrary');
                            let data={
                              breadcrumbName:'待审批',
                              breadcrumbParentName:'客户管理'
                            }
                            this.OA_BREADCRUMBD(JSON.stringify(data));
                            this.$store.commit('setActiveIndex', '/examineLibrary');
                            this.$router.push(`/examineLibrary`);
                        }
                    })   
                }
        },
        beforeAvatarUpload(file){
            // console.log(file);
        },
        handleUploadSuccess(file,fileList){
            // console.log(fileList);
            this.fileList.push({
                name:file.name,
                url:file.url,
                uid:fileList.uid,
            })
        },
        handleRemoveCover(file, fileList) {
            this.fileList.map((item,index)=>{
                if (item.uid == file.uid){
                    this.fileList.splice(index,1);
                }
            })
        },


    },
    watch:{
        'fileList'(res){
            this.orderForm.contract_accessory = JSON.stringify(res);
       
        },
        'customerModel'(flag){
            if (flag){
                this.cardTitle = '基本信息';
                this.cardActive = 1;
            }
        },
        'contactsModel'(flag){
        if (flag){
            this.cardTitle = '联系信息';
            this.cardActive = 2;
        }
        },
        'orderModel'(flag){
            if (flag){
                this.cardTitle = '订单信息';
                this.cardActive = 3;

            }
        },
        'openUpModel'(flag){
            if (flag){
                this.cardTitle = '开通模块';
                this.cardActive = 4;
            }
        },
    }
}