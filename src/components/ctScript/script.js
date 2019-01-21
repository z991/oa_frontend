import axioIn from "../../store/axioIn";
import oaTablePages from "../oaTablePages/index";
import ctNotification from "../ctNotification/index";
import moment from "moment";
export default {
    data () {
        return {
            msg: '',
            list: [],
            scriptType:'',
            scriptGridFlag:false,
            notifiFlag:false,
            gridList:[],
            dataList:[],
            notifiTitle:'执行记录',
            tableLoading:true,
            dialogVisible:false,
            pagination: {
                show: false,
                total: 0,
                pageIndex: 1,
                pageSize: 10
            }, // 分页参数
            searchData:{
                searchVal:'',
            },
            columns: [
                { prop: "script_name", label: "脚本类型" },
                { prop: "last_execution_time", label: "上次执行时间",formatter:((row)=>{
                    if (row.last_execution_time){
                        return moment(row.last_execution_time).format('YYYY-MM-DD HH:mm:ss')
                    }else{
                        return '空'
                    }
                }) ,},
                { prop: "start_date", label: "执行时间段", formatter:((row)=>{
                     if (row.start_date && row.end_date){
                         return `<div>${row.start_date} - ${row.end_date}</div></a>`
                     } else{
                         return '空'
                     }
                    })},
            ],
            ceList:[
                {
                    time:'2018-10-22 11:24',
                    content:'时间段: 滴滴答答滴滴答答滴滴答答滴滴答答'
                },
                {
                    time:'2018-10-22 11:24',
                    content:'时间段: 滴滴答答滴滴答答滴滴答答滴滴答答'
                },
            ],
            tableDatas: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    status:'11',
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄',
                    status:'11',
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄',
                    status:'11',
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄',
                    status:'11',
                }],
            operates: {
                width: 200,
                fixed: 'right',
                list: [
                    {
                        icon:'el-icon-edit',
                        title:'脚本执行',
                        showFlag:true,
                        borderFLag:false,
                        disabled: false,
                        method: (row, index) => {
                            this.scriptType = row.type;
                            if (row.type == 3 ||row.type == 5 || row.type == 6){
                                this.onScriptCondition(row.type);
                                return;
                            }
                            this.onScriptFn(row.type)
                        }
                    },
                    {
                        icon:'el-icon-document',
                        title:'执行记录',
                        plain: false,
                        showFlag:true,
                        borderFLag:false,
                        method: (row,index) => {
                            this.onAgainFn(row.type)
                        }
                    }
                ]
            }, // 操作按钮组
            ruleForm: {
                grid:'',
                date: "",
            },
            rules: {
                grid:[
                    {required: true, message: '请选择Grid节点', },
                ],
                date: [
                    {required: true, message: '请选择脚本执行时间', },
                ],

            },
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },

        }
    },
    created(){
        console.log(this);
    },
    components:{
        oaTablePages,ctNotification
    },
    beforeMount(){
        console.log(this);
        this.getData();
        this.gridData();
    },
    methods: {
        //grid 字典表
        gridData(){
            axioIn.get(`/api/support/get_grid_list/`).then((res)=>{
                this.gridList = res.data;
            })
        },
        onShowFn(flag){
            console.log(flag);
            this.notifiFlag = flag;

        },
        onCloseFn(flag){
          this.notifiFlag = flag;
        },
        onAgainFn(id)
        {
            this.onGetScriptRecord(id);
            this.notifiFlag = true;

            // return false;
        },
        onGetScriptRecord(index){
          axioIn.get(`/api/data/get_script_record/?index=${index}`).then((res)=>{
              this.dataList = res.data;
          })
        },

        onScriptFn(type){
            if (type ==0 || type ==1 || type ==4){
                this.dialogVisible = true;
                this.scriptGridFlag = false;
                this.ruleForm.date = "";
                return;
            }else if(type == 2){
                this.dialogVisible = true;
                this.scriptGridFlag = true;
                this.ruleForm.grid ="";
                return;
            }
        },
        onScriptCondition(type){
            let headerUrl='';
            if (type ==3){
                headerUrl = `/api/data/update_all/`;
            } else if (type ==5){
                headerUrl = `/api/support/classic_day_pwd/`
            } else if (type ==6){
                headerUrl = `/api/support/classic_week_pwd/`
            }
            axioIn.get(headerUrl).then((res)=>{
                if (res){

                }
            })

        },
        handleClose(){
          this.dialogVisible = false;
        },
        submitForm(formName) {
           let {ruleForm,scriptType} = this,
               {date,grid} = ruleForm;
            let headerUrl='';
            if (scriptType==1){
                headerUrl = `/api/data/test_history_channel/?start_date=${date[0]}&end_date=${date[1]}`;
            }else if (scriptType == 0){
                headerUrl = `/api/data/test_consult/?start_date=${date[0]}&end_date=${date[1]}`;
            }else if (scriptType == 2){
                headerUrl = `/api/data/update_grid/?grid=${grid}`
            }else if (scriptType==4){
                headerUrl = `/api/data/test_visitor/?start_date=${date[0]}&end_date=${date[1]}`;
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                        axioIn.get(headerUrl).then((res)=>{
                            if (res){
                                this.dialogVisible = false;
                                this.getData();
                            }
                        })


                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        getData(){
            this.tableLoading = true;
            axioIn.get(`/api/data/get_script_name/`).then((res)=>{
                this.tableDatas = res.data;

                this.tableLoading = false;
            })
        },
        onPageChangeBind(current){
            this.getData(current);
        },
        onSearchFn(){
            let searchVal = this.searchData.searchVal;
            this.getData(1,searchVal)
        },


    },

    watch:{

    }
};