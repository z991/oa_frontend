import oaTablePages from "../oaTablePages/index"
import axioIn from "../../store/axioIn";
import {
    mapMutations,
} from 'vuex';
export default {
    data () {
        var httpReg = /^((https|http|ftp|rtsp|mms){0,1}(:\/\/){0,1})www\.(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
        var validateDownAddress = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('下载地址不能为空'))
            }
            setTimeout(() => {
                if (!httpReg.test(value)) {
                    callback(new Error('格式有误'))
                } else {
                    callback()
                }
            }, 300)
        };
        return {
            siteid:'',
            siteUrl:'http://update.ntalker.com/update/clientupdate.php',
            activeName:'first',
            siteIdVal:'',
            dialogVisible:false,
            list: [],
            tableLoading:true,
            pagination: {
                show: true,
                total: 0,
                pageIndex: 1,
                pageSize: 10
            }, // 分页参数
            searchData:{
                searchVal:'',
            },
            columns: [
                { prop: "version_num", label: "版本号" },
                { prop: "down_address", label: "下载地址",
                    formatter:((row)=>{
                        return `<a target="_blank" href=${row.down_address}>${row.down_address}</a>`

                    })},
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
            ruleForm: {
                version_num: "",
                down_address: "",
                classify:1
            },
            rules: {
                version_num: [
                    {required: true, message: '请输入版本号', },
                ],
                down_address: [
                    {required: true,validator: validateDownAddress}
                ],
                classify: [
                    {required: true, message: '请选择版本类型',}
                ],

            },

        }
    },
    created(){
        console.log(this);
    },
    beforeMount(){
        console.log(this);
        this.getData();
    },
    methods: {
        ...mapMutations(['OA_LIBRARY']),
        handleClick(){

        },
        buttonMessage(data, types, time) {
            this.$notify({
                title: '提示信息',
                message: data,
                position: 'top-right',
                type: types,
                duration: time,
            });
        },
        handleClose(){
          this.dialogVisible = false;
        },
        getData(siteid=''){
            this.tableLoading = true;
            axioIn.get(`/api/support/client_down/`).then((res)=>{
                if (res.data.page_num !== undefined ||  res.data.results.length > 0){
                    this.tableDatas = res.data.results;
                    this.pagination={
                        show: true,
                        pageIndex: 1,
                        pageSize: 10,
                        total:res.data.page_num.total_count
                    };
                }else{
                    this.tableDatas = [];
                }

                this.tableLoading = false;
            })
        },
        onPageChangeBind(current){
            this.getData(current);
        },
        onPostFn(){
            Object.keys(this.ruleForm).forEach((key)=>{
                this.ruleForm[key] = '';
            })
            this.dialogVisible = true;
        },
        onSearchFn(){
            let siteid = this.siteIdVal;
            console.log(typeof siteid);

            if(siteid==""){
                this.buttonMessage('请先输入企业ID','warning',1500);
                return;
            }
            if(siteid.indexOf("kf_") == -1){
                this.buttonMessage('请输入正确的企业Id','warning',1500)
                return;
            }
            axioIn.get(`/api/support/client_down/get_client_url/?siteid=${siteid}`).then((res)=>{
                if (res){
                    this.$alert(res.data.url, '提示信息', {
                        confirmButtonText: '确定',

                    });
                }
            })

        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                   axioIn.post('/api/support/client_down/',this.ruleForm).then((res)=>{
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
        onResetFn(){
            this.searchData.searchVal = '';
            this.pagination={
                show: true,
                total: 0,
                pageIndex: 1,
                pageSize: 10
            };
            this.getData();
        },
        onToExamine(row){
            let data={
                id:row.id,
                modelName:'csc',
            };
            this.OA_LIBRARY(data);
            this.$router.push(`createLibrary`)

        },
    },
    components: {
        oaTablePages
    },
    watch:{
        'tableDatas'(res){
            if(res.length){
                this.tableLoading = false;
            }
        }
    }
};