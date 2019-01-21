import axioIn from "../../store/axioIn";
import Router from "../../router/index";
import oaTablePages from "../oaTablePages/index"

export default {
    name: 'training',
    components: { oaTablePages },
    data() {
        return {
          form: {
            textarea: '',
            region: '1',
            name: '',
            fileList: [],
            trainingCount: 1,
            formLabelWidth: '100px',
            formLabelWidth2: '120px',
            startTime: '',
            endTime: '',
            checkList: ['选中且禁用','复选框 A'],
            radio: '1' ,
          },
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
            { prop: "index", label: "序号"},
            { prop: "company_name", label: "公司名称"},
            { prop: "company_id", label: "企业ID" },
            { prop: "impl_cslt", label: "实施顾问" },
            { prop: "oper_supt", label: "运营顾问" },
            { prop: "commercial", label: "商务" },
            { prop: "training_method", label: '培训方式',
                // formatter:((row,index)=>{
                //     let {training_way} = row,
                //         training_wayArr=['无','远程','远程+现场','现场'];
                //         training_way = training_wayArr[training_way];
                //         return training_way;
                // })
            },
            {
              prop: "matter_status", label: "状态"
            }
          ],
          // 分页数据
          pagination: {
              show: true,
              total: 0,
              pageIndex: 1,
              pageSize: 10
          },
          all_option: false,
          formLabelWidth: '120px',
          dialogExport: false,//导出的弹窗
          exportTime: [],//导出时间
        }
    },
    beforeMount(){
        this.getData();
        this.columns.map(n=>{//控制选择显示字段
          this.$set(n,'show',true)
        })
    },
    methods: {
        exportTrain () {
          this.dialogExport = true;
          this.exportTime = [];
        },
        // 获取项目列表
        getData(page=1) {
            this.tableLoading = true;
            // this.columns.map(n=>{
            //   n.show = true;
            // })
            axioIn.get(`/api/workorder/matter_flow/train_list/?page=${page}`).then(res=>{
              this.tableDatas = res.data.result;
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
        // 编辑查看详情
        onEditFn(row,index) {
          this.$store.commit('setActiveIndex', '/training');
          this.$router.push({path: '/trainDetail',query: {id: row.id}})
        },
        // 分页
        onPageChangeBind(current) {
            this.getData(current)
        },
        choose_field: function(){
          this.all_option = true;
        },
        allChoice: function(){
          this.all_option = false;
        },
        changeField () {
          // window.sessionStorage.setItem('saveField',JSON.stringify(this.caption));
        },
        sureExport () {//确定导出
          if(this.exportTime.length !== 2){
            this.$message.error('请填写开始和结束日期');
          }else{
            window.open(`/api/workorder/simple_matter/matter_export/?start_time=${this.exportTime[0]}&end_time=${this.exportTime[1]}`);
            this.dialogExport = false;
          }
        },
    }
}