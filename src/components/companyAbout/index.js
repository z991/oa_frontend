import axioIn from '../../store/axioIn';
import oaTablePages from "../oaTablePages/index";
import { mapGetters, mapMutations } from 'vuex';
import { isArray } from 'util';

export default {
    name: 'companyAbout',
    data() {
        return {
            companyName: '上海途顺',
            moduleName: '培训列表',
            tableLoading: false,
            // 操作按钮组
            operates: {
                width: 200,
                fixed: 'right',
                list: [{
                        icon: 'el-icon-document',
                        plain: true,
                        title:'查看详情',
                        showFlag:true,
                        borderFLag:false,
                        disabled: false,
                        method: (row, index) => {
                            this.details(row, index)
                        }
                    }]
            }, 
            // 分页参数
            pagination: {
                show: false,
                total: 0,
                pageIndex: 1,
                pageSize: 10
            }, 
            // 表头字段
            columns: [
                { prop: "index", label: "序号", show: true},
                { prop: "company_name", label: "公司名称" , show: true},
                { prop: "company_id", label: "企业ID" ,show: true},
                { prop: "deploy_way", label: "部署方式",show: true,
                    // formatter:((row,index)=>{
                    //     let {deploy_way} = row,
                    //         deploy_wayArr=['标准版','公有云','专属云','私有云'];
                    //         deploy_way = deploy_wayArr[deploy_way];
                    //         return deploy_way;
                    // })
                },
                { prop: "impl_cslt", label: "实施顾问" ,show: true},
                { prop: "oper_supt", label: "运营顾问",show: true },
                { prop: "commercial", label: "商务",show: true },
                { prop: "training_instructors", label: "培训讲师",show: true},
                { prop: 'training_method', label: '培训方式',show: true},
                { prop: "training_contact", label: "培训联系人",show: true},
                { prop: "start_time", label: "培训开始时间",show: true},
                { prop: "end_time", label: "培训结束时间",show: true},
                { prop: "training_model", label: "培训模块",show: true,
                 formatter:((row,index)=>{
                     if(row.training_model) {
                        return row.training_model.join()
                     }
                    })
                },
            ],
            // 表格数据
            tableDatas: [],
            isIndeterminateShow: true,
            checkAllShow: true,
            checkedShows: ['deploy_way','training_method','training_contact','training_instructors','training_model','start_time','end_time'],
            checkeShows: [{
                    label:'deploy_way',
                    value:'部署方式',
                    state: true
                },{
                    label:'training_instructors',
                    value:'培训讲师',
                    state: true
                },{
                    label:'training_method',
                    value:'培训方式',
                    state: true
                },{
                    label:'training_contact',
                    value:'培训联系人',
                    state: true
                },{
                    label:'start_time',
                    value:'培训开始时间',
                    state: true
                },{
                    label:'end_time',
                    value:'培训结束时间',
                    state: true
                },{
                    label:'training_model',
                    value:'培训模块 ',
                    state: true
                }],
            libraryId: '', //客户ID
        }
    },
    components: { oaTablePages },
    created() {
        let  id = this.$route.query.id;
        this.libraryId = this.$route.query.id;
        this.companyName = this.$route.query.name;
        this.getData(id,1);
    },
    mounted() {
    
    },
    computed: {

    },
    methods: {
        ...mapMutations(['OA_BREADCRUMBD']),
        // 获取列表数据
        getData(id,pageIndex) {
          this.tableLoading = true;
          axioIn.get(`/api/workorder/matter_flow/khkl_train/?company_pk=${id}&page=${pageIndex}`)
          .then((res)=>{
            this.tableDatas = res.data.result;
            this.pagination.pageIndex = 1;
            this.pagination.total = res.data.page_num.total_count;
            this.pagination.show = this.pagination.total > 10 ? true : false;
            this.tableLoading = false;
          })
        },
        // 分页
        onPageChangeBind(current){
            let  id = this.$route.query.id;
            this.getData(id,current)
        },
        // 返回
        goBack() {
            let data={
                breadcrumbName: '客户库(csc)',
                breadcrumbParentName: '客户管理'
            }
            this.OA_BREADCRUMBD(JSON.stringify(data));
            this.$store.commit('setActiveIndex', '/CustomerInformation');
            this.$router.push(`CustomerInformation`);
        },

        // 全选
        handleCheckAllShow(val) {
            this.checkedShows = [];
            if(val) {
                this.checkeShows.map(item=>{
                    this.checkedShows.push(item.label);
                    this.isIndeterminateShow = false;
                })
            } else {
                this.checkedShows = [];
                this.isIndeterminateShow = true;
            }
        },
        // 选项选择
        handleCheckedShowChange(value) {
            let checkedCount = value.length;
            this.checkAllShow = checkedCount === this.checkeShows.length;
            this.isIndeterminateShow = checkedCount > 0 && checkedCount < this.checkeShows.length;
        },
        handleCheckChange(obj) {
            obj.state = !obj.state;
            let changedArr  = this.columns.filter((item)=>{return item.prop == obj.label});
            changedArr[0].show = obj.state
        },

        // 查看详情
        details(row, index) {
            let data={
                breadcrumbName: '培训管理',
                breadcrumbParentName: '项目管理'
            }
            this.OA_BREADCRUMBD(JSON.stringify(data));
            // this.$store.commit('setActiveIndex', '/training');
            this.$router.push({path: 'trainDetail',query: {id: row.id,libraryId: this.libraryId} });
        }
    }
}