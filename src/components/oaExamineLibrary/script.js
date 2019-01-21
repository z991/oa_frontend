import oaTablePages from "../oaTablePages/index"
import axioIn from "../../store/axioIn";
import {
    mapMutations,
} from 'vuex';
export default {
    data () {
        return {
            msg: '',
            list: [],
            tableLoading:true,
            operates: {
                width: 200,
                fixed: 'right',
                list: [
                    {
                        icon: 'el-icon-document',
                        plain: true,
                        title:'审核信息',
                        borderFLag:false,
                        disabled: false,
                        method: (row, index) => {
                            this.onToExamine(row, index)
                        }
                    },
                ]
            }, // 操作按钮组
            pagination: {
                show: true,
                total: 0,
                pageIndex: 1,
                pageSize: 15
            }, // 分页参数
            searchData:{
                    searchVal:'',
            },
            columns: [
                { prop: "company_name", label: "客户名称" },
                { prop: "cli_version", label: "版本类型" },
                { prop: "industry", label: "所属行业" },
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

        }
    },
    mounted(){
        this.getData()

    },
    methods: {
        ...mapMutations(['OA_LIBRARY']),
        getData(page=1,company_name=''){
            // console.log("测试驳回日志打印",'ok');
            this.tableLoading = true;
            axioIn.get(`/api/workorder/khkcompany/get_company_list/?page=${page}&company_name=${company_name}`).then((res)=>{
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
        onSearchFn(){
            let searchVal = this.searchData.searchVal;
            this.getData(1,searchVal)
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