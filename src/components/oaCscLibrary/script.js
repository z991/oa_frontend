import oaTablePages from "../oaTablePages/index"
import axioIn from "../../store/axioIn";
import {
    mapMutations
} from 'vuex';
export default {
    data () {
        return {
            msg: '',
            list: [],
            //表格Lodding加载
            tableLoading:true,
            againFlag:false,
            operates: {
                width: 200,
                fixed: 'right',
                list: [
                    {
                        icon: 'el-icon-edit',
                        plain: true,
                        title:'编辑',
                        showFlag:true,
                        borderFLag:false,
                        disabled: false,
                        method: (row, index) => {
                            this.onEditFn(row, index)
                        }
                    },
                ]
            }, // 操作按钮组
            pagination: {
                show: true,
                total: 0,
                pageIndex: 1,
                pageSize: 10
            }, // 分页参数
            searchData:[
                {
                    label:'企业名称',
                    type:'input',
                    value:'',
                },
                {
                    label:'部署方式',
                    value:'',
                    type:'select',
                    status:[
                        {
                            industry:'标准版',
                            id:1
                        },
                        {
                            industry:'公有云',
                            id:2
                        },
                        {
                            industry:'专属云',
                            id:3
                        },
                        {
                            industry:'私有云',
                            id:4
                        },
                    ]
                },
                {
                    label:'行业',
                    value:'',
                    type:'select',
                    status:[

                    ]
                },


            ],
            columns: [
                { prop: "company_name", label: "企业名称",show: true },
                { prop: "industry__industry", label: "所属行业",show: true },
                {prop: 'deploy_way', label: '部署方式',show: true,
                formatter:((row,index)=>{
                    let {deploy_way} = row,
                        deploy_wayArr=['','标准版','公有云','专属云','私有云'];

                    deploy_way = deploy_wayArr[deploy_way];
                    return deploy_way;
                })},
                {prop: 'platform_informatiom', label: '平台信息', width: '150',show: true},
                {prop: 'order_info__contract_start_time', label: '合同开始', width: '150',show: true},
                {prop: 'order_info__contract_end_time', label: '合同结束', width: '150',show: true},
            ],
            tableDatas: [],

            industryList:[],
            industry: '',
            dialogFormVisible: false,
            deploy_ways: [{
                industry:'标准版',
                id:1
            },
            {
                industry:'公有云',
                id:2
            },
            {
                industry:'专属云',
                id:3
            },
            {
                industry:'私有云',
                id:4
            }],
            deploy_way: '',
            formLabelWidth: '120px',
            checkAll: false,
            checked: [],
            checkes: [{
                label:'platform_informatiom ',
                value:'平台信息',
            },{
                label:'order_info__contract_start_time ',
                value:'合同开始'
            },{
                label:'order_info__contract_end_time',
                value:'合同结束 '
            }],
            isIndeterminate: true,

            checkAllShow: true,
            isIndeterminateShow: true,
            checkedShows: ['company_name','industry__industry','platform_informatiom','deploy_way','order_info__contract_start_time','order_info__contract_end_time'],
            checkeShows: [
                {
                    label:'company_name',
                    value:'企业名称',
                    state: true,
                    view: true,
                },{
                    label:'industry__industry',
                    value:'所属行业',
                    state: true,
                    view: true,
                },{
                    label:'deploy_way',
                    value:'部署方式',
                    state: true,
                    view: false,
                },{
                    label:'platform_informatiom',
                    value:'平台信息 ',
                    state: true,
                    view: false,
                },{
                    label:'order_info__contract_start_time',
                    value:'合同开始',
                    state: true,
                    view: false,
                },{
                    label:'order_info__contract_end_time',
                    value:'合同结束',
                    state: true,
                    view: false,
                }
            ]
        }
    },
    created(){
        // console.log(this);
    },
    beforeMount(){
        this.getData();
        this.onGetIndustry();
    },
    methods: {
        ...mapMutations(['OA_LIBRARY']),
        //行业字典表
        onGetIndustry(){
            axioIn.get(`/api/workorder/industry/`).then((res)=>{
                // console.log(res.data);
                this.searchData[2].status = res.data;
                this.industryList = res.data;
            })
        },
        getData(page=1,company_name='',deploy_way='',industry=''){
            this.tableLoading = true;
            axioIn.get(`/api/workorder/khkcompany/get_khk_list/?page=${page}&company_name=${company_name}&deploy_way=${deploy_way}&industry=${industry}`).then((res)=>{

                if (res.data.page_num !== undefined &&  res.data.results.length > 0){
                    this.tableDatas = res.data.results;
                    this.pagination={
                        show: true,
                        pageIndex: 1,
                        pageSize: 10,
                        total:res.data.page_num.total_count
                    };
                }else{
                    this.tableDatas = [];
                    this.pagination={
                        show: true,
                        pageIndex: 1,
                        pageSize: 10,
                        total:0
                    };
                }

                     this.tableLoading = false;


            })
            .catch((res)=>{
                if(company_name) {
                    this.$message({
                        message: '查询不到该公司',
                        type: 'error',
                        position: "top-right",
                      });
                }
                this.tableLoading = false;
            })
        },
        onSearchFn(){
          let company_name=this.searchData[0].value,
              deploy_way=this.searchData[1].value,
              industry=this.searchData[2].value;

          this.getData(1,company_name,deploy_way,industry)

        },
        onPageChangeBind(current){
            let company_name=this.searchData[0].value,
            deploy_way=this.searchData[1].value,
            industry=this.searchData[2].value;
            this.getData(current,company_name,deploy_way,industry)
        },
        onResetFn(){
            this.searchData.map((item)=>{
                item.value='';
            })
            this.pagination= {
                    show: true,
                    total: 0,
                    pageIndex: 1,
                    pageSize: 10
            };// 分页参数
            this.getData();
        },
        onEditFn(row)
        {
            let data={
                id:row.id,
                modelName:''
            }
        
            this.OA_LIBRARY(data);
            
            this.$router.push(`CustomerInformation`)

        },
        onAgainFn(){
            this.$router.push(`createLibrary`)
        },
        onCreateLibrary(){
            this.$router.push(`createLibrary`)
        },
        onceshi(){
            console.log('111')
        },
        // 导出
        expor() {
            let str = '';
            if(this.deploy_way != '') {
                str = '?deploy_way=' + this.deploy_way;
            }
            if(this.industry != '') {
                if(str != '') {
                    str += '&industry=' + this.industry;
                }else {
                    str += '?industry=' + this.industry;
                }
            }
            if(this.checked != []) {
                if(str != '') {
                    this.checked.map(item=>{
                        str += '&filter=' + item;
                    })
                }else {
                    str += '?';
                    this.checked.map((item,index)=>{
                        if(index === this.checked.length - 1) {
                            str += 'filter=' + item;
                        } else {
                            str += 'filter=' + item + '&';
                        }
                    })
                }
            };
            window.open('/api/workorder/khkcompany/derive_khk/' + str);
        },
        cancelExport() {
            this.dialogFormVisible = false;
            this.deploy_way = '';
            this.industry = '';
            this.checked = [];
        },
        handleCheckAllShow(val) {
            this.checkedShows = [];
            if(val) {
                this.checkeShows.map(item=>{
                    this.checkedShows.push(item.label);
                    this.isIndeterminateShow = false;
                })
            } else {
                this.checkedShows = ['company_name'];
                this.isIndeterminateShow = true;
            }
        },
        handleCheckedShowChange(value) {
            let checkedCount = value.length;
            this.checkAllShow = checkedCount === this.checkeShows.length;
            this.isIndeterminateShow = checkedCount > 0 && checkedCount < this.checkeShows.length;
        },
        handleCheckAllChange(val) {
            if(val) {
                this.checkes.map(item=>{
                    this.checked.push(item.label);
                })
            } else {
                this.checked = [];
            }
            this.isIndeterminate = false;
        },
        handleCheckedChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.checkes.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkes.length;
        },

        handleCheckChange(obj) {
            obj.state = !obj.state;
            let changedArr  = this.columns.filter((item)=>{return item.prop == obj.label});
            changedArr[0].show = obj.state;
        },
    },
    components: {
        oaTablePages
    },
    watch:{
        'tableDatas'(res){
            if (res!==undefined){
                if(res.length){
                    this.tableLoading = false;
                }
            }

        }
    }
};