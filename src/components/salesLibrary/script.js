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
            againFlag:false,
            transmittingStateList:[],
            //表格Lodding加载
            tableLoading:true,
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
                    {
                        title:'再次申请',
                        icon:"el-icon-edit-outline",
                        plain: false,
                        showFlag:true,
                        borderFLag:false,
                        method: (row, index) => {

                            this.onAgainFn(row, index)
                        }
                    }
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
                    label:'客户名称',
                    type:'input',
                    value:'',
                },
                
                {
                    label:'完成状态',
                    type:'select',
                    value:'',
                    status:[
                        {
                            name:'审批通过',
                            value:0
                        },
                        {
                            name:'待审批',
                            value:1
                        },
                        {
                            name:'审批驳回',
                            value:2
                        },
                        {
                            name:'上线',
                            value:3
                        },
                    ]
                },

            ],
            columns: [
                { prop: "index", label: "序号" },
                { prop: "company_name", label: "客户名称" },
                { prop: "cli_version", label: "客户版本",formatter:((row,index)=>{
                    let {cli_version} = row;
                    let verSionArr=['','B2B','B2C','B2B2C','不限'];
                        cli_version = verSionArr[cli_version];
                        return cli_version;


                    })},
                { prop: "comment", label: "驳回理由",formatter:((row,index)=>{
                        if (!row.comment) {
                            return '暂无驳回理由';
                        }else{
                            let arr=[];
                            Object.keys(row.comment).forEach((key)=>{
                              arr.push(row.comment[key]);
                            })
                            return arr.join(",");
                        }

                    }) },
                {
                    prop: 'transmitting_state',
                    label: '状态',
                    width: '180',
                    formatter:((row,index)=>{
                        let {transmitting_state} = row;
                        transmitting_state = this.transmittingStateList[transmitting_state];
                        return transmitting_state;
                    })
                }
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
    created(){
    },
    beforeMount(){
        this.getData();
        this.onGetTransmittingStateData();
    },
    methods: {
        ...mapMutations(['OA_LIBRARY']),
        getData(page='1',company_name='',transmitting_state=''){
          this.tableLoading = true;
          axioIn.get(`/api/workorder/khkcompany/?page=${page}&company_name=${company_name}&transmitting_state=${transmitting_state}`).then((res)=>{
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
        //流转状态 字典表
        onGetTransmittingStateData(){
          axioIn.get(`/api/workorder/khkcompany/get_transmitting_state/`).then((res)=>{
              let arr=[],
                  data= res.data;

              Object.keys(data).forEach((key)=>{
                  arr.push(data[key])
              })
              this.transmittingStateList = arr;
          })
        },
        // get_transmitting_state
        onPageChangeBind(current){
            this.getData(current);
        },
        onSearchFn(){
            let {searchData} = this,
                company_name=searchData[0].value,
                transmitting_state=searchData[1].value;

            this.getData(1,company_name,transmitting_state);
        },
        onResetFn(){
          this.searchData.map((item)=>{
              item.value = '';
          })
            this.pagination={
                    show: true,
                    total: 0,
                    pageIndex: 1,
                    pageSize: 10
            };

            this.getData();4
        },
        onEditFn(row){
            let data={
                id:row.id,
                modelName:'sales',
            }
            this.OA_LIBRARY(data);
            this.$router.push(`createLibrary`)

        },
        onAgainFn(row){
 
            let data={
                id:row.id,
                modelName:'salesAgain',
            }
            this.OA_LIBRARY(data);
            this.$router.push(`createLibrary`)
        },
        onCreateLibrary(){
            let data={
                id:'',
                modelName:'',
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