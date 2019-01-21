/*
 * @Author: liuqian 
 * @Date: 2018-09-30 11:45:54 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-10-11 17:05:29
 */
import axioIn from "../../store/axioIn";
import Pagination from "./../pagination";
import Router from "../../router/index";
import Shade from "./../shade";
export default{
  name: 'subStation',
  components:{Pagination,Shade},
  data () {
    return {
      listData:[{id:22,ser_id:33,station_info:{open_station_time:'',close_station_time:''}}],
      multipleSelection: [],
      rowNum: '',
      page: 1,
      pageIndex: 1,
      parentId: '',
      editShow: false,
      shade: false,
      pickTime: '',
      isfor: false,
      search_val: {company_name: '',company_id: ''},
      search_open: false,
      stationNumber: 0,//站点数量
      company_info:{station_type:'',company_name:'',abbreviation:'',company_url:[{company_url:'',ac:true,a2:false}],company_address:{province:'',city:'',detail:''},company_email:'',industry:'',GSZZ:'',customer_type:'',service_area:''},
      link_info:[{linkman:'',link_phone:'',link_email:'',link_qq:''}],
      station_info:{company_id:'1',classify:'',deploy_way:'2',validity_days:'2',grid:'',cli_version:'',pact_products:[],open_station_time:'2017-09-09',close_station_time:'2',sales:'2',pre_sales:'2',oper_cslt:'2',impl_cslt:'2',oper_supt:'2',station_open: '2017'},
      func_list:[],
      func_list1:[],
      account_conf:{user_name:'',set_pwd:'',sure_pwd:''},
      parent_company: ''
    }
  },
  mounted () {
    this.parentId = this.$route.query.id;
    this.parent_company = this.$route.query.companyID;
    axioIn.get('api/workorder/openstation/?its_parent='+this.parentId).then(res=>{
      this.listData = res.data.results;
      this.page = res.data.page_num.total_page;
      this.rowNum = this.stationNumber = res.data.page_num.total_count;
      this.pageIndex = 1;
      this.transform(this.listData)
    })
  },
  methods: {
    editInfo: async function(id) {
      // this.$store.commit("getFileld", this.caption);
      var that = this;
      var f3 = await axioIn
        .get("/api/workorder/openstation/" + id + "/?its_parent="+this.parentId)
        .then(async function(res) {
          if (res.data.link_info.length === 0) {
            res.data.link_info = [
              { linkman: "", link_phone: "", link_email: "", link_qq: "" }
            ];
          }
          if (res.data.company_info.company_address === null) {
            res.data.company_info.company_address = {
              province: "",
              city: "",
              detail: ""
            };
          }
          that.$store.commit("evaluate", res.data.company_info);
          that.$store.commit("evaluate1", res.data.link_info); //console.log(JSON.stringify(lill))
          that.$store.commit("evaluate2", res.data.station_info);
          that.$store.commit("evaluate4", res.data.account_conf);
          that.$store.commit("evaluate6", res.data.func_list);
          [that.link_info, that.company_info, that.account_conf] = [
            res.data.link_info,
            res.data.company_info,
            res.data.account_conf[0]
          ];
          if (that.company_info.company_url.length !== 0) {
            that.company_info.company_url.map(n => {
              n.ac = false;
              n.a2 = true;
            });
            that.company_info.company_url[0].ac = true;
            that.company_info.company_url[0].a2 = false;
          } else {
            that.company_info.company_url = [
              { company_url: "", ac: true, a2: false }
            ];
          }
          that.account_conf.sure_pwd = that.account_conf.set_pwd;
          that.company_info.customer_type =
            res.data.company_info.customer_type === false ? "0" : "1";
          that.func_list = res.data.func_list;
        });
      window.sessionStorage.setItem('stationType', this.parentId)
      Router.push({ path: "/openstationf", query: { id: id,parentId: this.parentId } });
    },
    deleteInfo (id) {
      this.$confirm('此操作将删除该站点, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axioIn.delete("/api/workorder/openstation/" + id + "/?its_parent="+this.parentId).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.incrementTotal(this.pageIndex);
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    synchronization () {//同步子站
      axioIn.get(`/api/data/update_siteid/?siteid=${this.parent_company}`).then(res=>{
        this.$message({
          message: '同步操作成功',
          type: 'success'
        });
      })
    },
    exportChild () {//导出
      window.open('api/workorder/openstation/get_station_info/?its_parent='+this.parentId)
    },
    batchEdit () {//批量修改
      if(this.multipleSelection.length === 0){
        this.$message.error('出错了哦，没有选中站点');
      }else{
        this.shade = true;this.editShow = true;this.pickTime = '';
      }
    },
    goback () {
      Router.push({ path: "/gong",query: {flag: true}});
    },
    submitCopy () {
      if(this.pickTime === ''){
        this.$message.error('出错了哦，没有填入到期日期');
      }else{
        let str = '';
        this.multipleSelection.map(res=>{
          str += '&company_id='+res.company_id
        })
        axioIn.get('api/workorder/openstation/modify_time/?date='+this.pickTime+str).then(res=>{
          this.multipleSelection = [];this.shade = false; this.editShow = false;
          this.incrementTotal()
        })
      }
    },
    cancelCopy () {
      this.editShow = false;this.shade = false;
    },
    searchBtn () {
      if(this.search_val.company_name === '' && this.search_val.company_id === ''){
        this.$message.error('出错了哦，所有项');
      }else{
        axioIn.get('api/workorder/openstation/?its_parent='+this.parentId,{
          params: this.search_val
        }).then(res=>{
          this.listData = res.data.results;
          this.page = res.data.page_num.total_page;
          this.rowNum = this.stationNumber = res.data.page_num.total_count;
          this.pageIndex = 1;
          this.transform(this.listData)
        })
      }
    },
    resetSearch () {
      this.search_val.company_name = '';this.search_val.company_id = '';
      this.incrementTotal()
    },
    qie (index, id,c) {
      if (this.isfor === true) return;
      let aa = confirm("确认修改状态？"); //console.log(aa)
      if (aa === true && this.isfor === false) {
        this.isfor = true;
        //this.$set(this.bb[index],'online_status',!this.bb[index].online_status);
        axioIn
          .put("api/workorder/openstation/" + id + "/modify_status/", {
            online_status: !this.listData[index].online_status
          })
          .then(res => {
            alert("修改成功");
            this.isfor = false;
            this.$set(
              this.listData[index],
              "online_status",
              !this.listData[index].online_status
            );
          })
          .catch(err => {
            this.isfor = false;
            alert(err.data.error);
          });
      }
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    incrementTotal (q) {//翻页
      q = q === undefined ? 1 : q;
      if (this.search_open === false) {
        axioIn.get("/api/workorder/openstation/?page=" + q+'&its_parent='+this.parentId).then(res => {
          this.listData = res.data.results;
          this.page = res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.pageIndex = q;
          this.transform(this.listData);
        });
      } else {
        axioIn
          .get("/api/workorder/openstation/?page=" + q+'&its_parent='+this.parentId,{
            params: this.search_val
          })
          .then(res => {
            this.listData = res.data.results;
            this.page = res.data.page_num.total_page;
            this.rowNum = res.data.page_num.total_count;
            this.pageIndex = q;
            this.transform(this.listData);
          });
      }
    },
    transform: function(data) {
      var aac = ["", "标准版", "公有云", "专属云", "私有云"];
      var aab = [
        "",
        "试用客户",
        "正式客户",
        "市场渠道客户",
        "商务渠道客户",
        "自用站点"
      ];
      var aad = ["", "B2B", "B2C"];
      // var aae=['','重构版','经典版']
      data.map(n => {
        n.open_station_time = n.station_info.open_station_time;
        n.close_station_time = n.station_info.close_station_time;
        n.company_name = n.company_info.company_name;
        n.deploy_way = aac[n.station_info.deploy_way];
        n.cli_version = aad[n.station_info.cli_version];
        n.company_id = n.station_info.company_id;
        n.grid = n.station_info.grid;
        n.station_type = aab[n.company_info.station_type];
        n.industry = n.company_info.industry;
        n.classify_name = n.station_info.classify_name;
        n.order_work = n.station_info.order_work;
      });
    },
  }
}