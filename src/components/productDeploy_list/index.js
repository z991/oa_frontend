/*
 * @Author: liuqian 
 * @Date: 2018-12-06 14:06:35 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-26 10:49:15
 */
import axioIn from "../../store/axioIn";
import Router from "../../router/index";
import oaTablePages from "../oaTablePages/index";
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'productDeploy_list',
  components: { oaTablePages },
  data () {
    return {
      // 表格状态
      tableLoading: false,
      // 表格操作配置
      operates: {
          width: 200,
          fixed: 'right',
          list: [{
                  // icon: 'el-icon-document',
                  plain: true,
                  title:'查看详情',
                  showFlag:true,
                  borderFLag:false,
                  disabled: false,
                  label: '查看详情',
                  method: (row, index) => {
                      this.onEditFn(row, index)
                  }
              }]
      },
      // 表格数据
      tableDatas: [],
      // 表头字段
      columns: [
        // { prop: "index", label: "序号"},
        { prop: "workorder_theme", label: "问题名称"},
        { prop: "func_list", label: "功能列表" },
        { prop: "deploy_way", label: "部署方式" },
        { prop: "subordinatemodule", label: "所属模块" },
        { prop: "grid", label: "所属环境" },
        { prop: "product_stautus", label: '节点状态'},
        { prop: "created_at", label: "申请时间"}
      ],
      // 分页数据
      pagination: {
          show: true,
          total: 0,
          pageIndex: 1,
          pageSize: 10
      },
      briefLeft: {company_name: '',matter_name: '产品配置列表'},//客户库进来的列表上边显示的信息
      clientShow: true,
      customerId: '',//客户库id
      parameter: '',//客户库id
    }
  },
  beforeMount(){
    this.customerId = this.$route.query.id;
    if(this.customerId){
      this.clientShow = true;
      this.briefLeft.company_name = this.$route.query.name;
      this.getCursomer(this.customerId);
    }else{
      this.clientShow = false;
      this.getData();
    }
  },
  mounted () {
    // 为了检验是客户库过来的还是菜单栏
    // this.customerId = this.$route.query.id;
    // if(this.customerId){
    //   this.clientShow = true;
    //   this.briefLeft.company_name = this.$route.query.name;
    //   this.getCursomer(this.customerId);
    // }else{
    //   this.clientShow = false;
    //   this.getData();
    // }
  },
  methods: {
    ...mapMutations(['OA_BREADCRUMBD']),
    getData (page=1) {
      this.tableLoading = true;
      
      axioIn.get(`/api/workorder/product_config/?page=${page}`).then(res=>{
        this.tableDatas = res.data.result;
        this.tableDatas.map(n=>{
          
          n.func_list = n.func_name+'-'+n.func_value;
        })
        if (res.data.page_num.total_page > 0 ||  res.data.result.length > 0){
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
    getCursomer (id,page=1) {//客户库过来的产品配置
      this.tableLoading = true;
      
      axioIn.get(`/api/workorder/product_config/?page=${page}&khk_id=${id}`).then(res=>{
        this.tableDatas = res.data.result;
        this.tableDatas.map(n=>{
          
          n.func_list = n.func_name+'-'+n.func_value;
        })
        if (res.data.page_num.total_page > 0 ||  res.data.result.length > 0){
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
    // 分页
    onPageChangeBind(current) {
      if(this.customerId){
        this.getCursomer(this.customerId);
      }else{
        this.getData(current)
      }
      // 
    },
    // 编辑查看详情
    onEditFn(row,index) {
      if(this.customerId){
        this.$store.commit('setActiveIndex', '/CustomerInformation');
      this.$router.push({path: '/productDeployDetail',query: {id: row.id,company_id: this.customerId}})
      }else{//菜单栏的产品配置
        this.$store.commit('setActiveIndex', '/productDeployList');
      this.$router.push({path: '/productDeployDetail',query: {id: row.id}})
      }
    },
    goBack () {
      let data={
        breadcrumbName: '客户库(csc)',
        breadcrumbParentName: '客户管理'
      }
      this.OA_BREADCRUMBD(JSON.stringify(data));
      this.$store.commit('setActiveIndex', '/CustomerInformation');
      this.$router.push(`CustomerInformation`);
    }
  },

watch: {
  $route(){
    this.customerId = '';//路由变化时，清空customerId
    this.customerId = this.$route.query.id;
    // console.log(this.parameter,this.customerId)
    if(this.customerId){
      //客户库过来的产品配置
      this.clientShow = true;
      this.getCursomer(this.customerId);
    }else{
      this.clientShow = false;
      //菜单项的产品配置
      this.getData();
    }
    // this.pjtid = this.$route.query.pjtid
  },
  // pjtid() {
  //   this.pjtdetail()
  // },
}
}