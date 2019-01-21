import axios from "axios";
import Pagination from "../pagination";
import axioIn from "../../store/axioIn";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.withCredentials = true; //配置cookie
export default {
  name: "ren",
  components: { Pagination },
  data: function() {
    return {
      messs: "",
      messs1: "",
      messs2: "",
      items: [{
          id: "",
          groups_name: "",
          email: "",
          lase_name: "",
          dpt_name: ""
      }],
      zhang1: {
        id: "",
        username: "",
        email: "",
        pass: "",
        type: false,
        create_source: '',
        last_name: "",
        groups: [{ name: "" }],
        setRule: {
            checkAll: false,
            checkedRules: [],
            Rules: [],
            isIndeterminate: true
        }
      },
      page: "",
      pageIndex: 1,
      rowNum: "",
      search_val: "",
      search_open: false,
      dialogTitle: '',
      dialogFormVisible: false,
      formLabelWidth: '120px'
    };
  },
  created() {
    this.getList();
  },
  methods: {
    // 提示
    buttonMessage(data, types, time) {
        this.$notify({
          title: "提示",
          message: data,
          type: types,
          position: "top-right",
          duration: time
        });
    },
    // 获取人员列表
    getList() {
      let API = this.search_open === false ? "/permission/users/?page=" + this.pageIndex : "/permission/users/?" + this.search_val + "&page=1";
      axioIn.get(API).then(res => {
        this.items = res.data.results;
        this.page = res.data.page_num.total_page;
        this.rowNum = res.data.page_num.total_count;
        this.transform(this.items);
        this.$store.commit("setLoading", false);
      })
      .catch(err => {
        console.log(err);
        this.$store.commit("setLoading", false);
      });
    },
    // dialog 弹窗操作 取消
    dialogCancel() {
      this.dialogFormVisible = false;
    },
    // 确定
    dialogDetermine() {
      let sure = true;
      let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
      if(this.zhang1.last_name == "" || this.zhang1.last_name == undefined) {
        sure = false;
        return this.buttonMessage("请输入人员名称", "info", 1500);
      } 
      if(!reg.test(this.zhang1.last_name)) {
        sure = false;
        this.zhang1.last_name = '';
        return this.buttonMessage("请输入用户名称(中文)", "info", 1500);
      }
      let regName = /^[a-zA-Z]+$/;
      if(!regName.test(this.zhang1.username)) {
        sure = false;
        this.zhang1.username = '';
        return this.buttonMessage("请输入人员账号(拼音)", "info", 1500);
      }
      if(this.zhang1.username == "" || this.zhang1.username == undefined) {
        sure = false;
        return this.buttonMessage("请输入人员账号", "info", 1500);
      }
      if(this.dialogTitle === '新增') {
        if(this.zhang1.pass == "" || this.zhang1.pass == undefined) {
          sure = false;
          return this.buttonMessage("请输入人员密码", "info", 1500);
        }
      }
      if(!this.zhang1.setRule.checkedRules.length) {
        sure = false;
        return this.buttonMessage("请选择人员角色", "info", 1500);
      }
      this.zhang1.setRule.Rules.map((obj)=>{
        if(this.zhang1.setRule.checkedRules.indexOf(obj.name) != -1) {
          obj.view = 1;
        } else {
          obj.view = 0;
        }
      })
      let rule = {
        cn: this.zhang1.username,
        sn: this.zhang1.last_name,
        mail: this.zhang1.email,
        create_source: this.zhang1.create_source,
        password: this.zhang1.pass,
        permission: this.zhang1.setRule.Rules,
        permission_list: this.zhang1.setRule.Rules,
      }
      if(sure) {
        if(this.dialogTitle === '新增账户') {
          axioIn.post('/api/user/user_add/', rule)
          .then(()=> {
            this.buttonMessage("新增成功", "success", 1500);
            this.getList();
          })
          .catch(res=>{
            // this.buttonMessage(res.data.error, "error", 1500);
          })
        }else {
          axioIn.put('/api/user/user_put/', rule)
          .then(()=> {
            this.buttonMessage("修改成功", "success", 1500);
            this.getList();
          })
        }
        this.dialogFormVisible = false;
      }
    },
    // 账号新增、编辑
    operating(username) {
        this.dialogFormVisible = true;
        let API = '';
        if(username) {
            this.dialogTitle = '编辑账户';
            this.zhang1.type = false;
            API = "/api/user/user_detail/?user=" + username;
        } else {
            this.dialogTitle = '新增账户';
            this.zhang1.type = true;
            API = "/api/user/all_permission/";
        };
        this.zhang1.setRule =  {
            checkAll: false,
            checkedRules: [],
            Rules: [],
            isIndeterminate: true
        };
        axioIn.get(API).then((res)=>{
            if(username) {
                this.zhang1.username = res.data.data.cn;
                this.zhang1.last_name = res.data.data.sn;
                this.zhang1.email = res.data.data.mail;
                this.zhang1.pass = '******'; 
                this.zhang1.create_source = res.data.data.create_source;
                res.data.data.permission.map(item => {
                    this.zhang1.setRule.Rules.push({name: item.name ,id: item.id,view: item.view})
                    if(item.view) {
                        this.zhang1.setRule.checkedRules.push(item.name);
                        this.zhang1.setRule.checkAll = false;
                    }
                })
            }else {
                this.zhang1.username = '';
                this.zhang1.last_name = '';
                this.zhang1.email = '';
                this.zhang1.pass = ''; 
                this.zhang1.create_source = '';
                res.data.map(item => {
                    this.zhang1.setRule.Rules.push({name: item.name ,id: item.id,view: item.view})
                    if(item.view) {
                        this.zhang1.setRule.checkedRules.push(item.name);
                        this.zhang1.setRule.checkAll = false;
                    }
                })
            }
            this.zhang1.setRule.isIndeterminate = !this.zhang1.setRule.checkAll;
        })
        .catch(()=>{
          if(username) {
            this.buttonMessage('修改失败', "error", 1500);
          }else {
            this.buttonMessage('新增失败', "error", 1500);
          }
        })
    },
    // 人员角色选择 全选
    handleCheckAllChange(val) {
        let checkAll = [];
        this.zhang1.setRule.Rules.map(item=>{
          checkAll.push(item.name);
        })
        this.zhang1.setRule.checkedRules = val ? checkAll : [];
        this.zhang1.setRule.isIndeterminate = false;
    },
    handleCheckedRulesChange(value) {
        let checkedCount = value.length;
        this.zhang1.setRule.checkAll = checkedCount === this.zhang1.setRule.Rules.length;
        this.zhang1.setRule.isIndeterminate = checkedCount > 0 && checkedCount < this.zhang1.setRule.Rules.length;
    },
    // 删除人员
    deleRole(username) {
      this.$confirm("此操作将删除该人员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        axioIn.delete('/api/user/user_delete/?cn=' + username)
        .then(res => {
          this.getList();
          this.$message({
            type: "success",
            message: res.data.message
          });
        });
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    // 分页调转
    incrementTotal(q) {
      q = q === undefined ? 1 : q;
      if (this.search_open === false) {
        axioIn 
          .get("/permission/users/?page=" + q)
          .then(res => {
            this.items = res.data.results;
            this.pageIndex = q;
            this.transform(this.items);
          })
          .catch(err => console.log(err));
      } else {
        axioIn
          .get("/permission/users/?" + this.search_val + "&page=" + q)
          .then(res => {
            this.items = res.data.results;
            this.pageIndex = q;
            this.transform(this.items);
          })
          .catch(err => console.log(err));
      }
    },
    // 重置
    mess() {
      this.messs = "";
      this.messs1 = "";
      this.messs2 = "";
      this.search_open = false;
      axioIn
        .get("/permission/users/")
        .then(res => {
          this.items = res.data.results;
          this.transform(this.items);
          this.page = res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.pageIndex = 1;
        })
        .catch(err => console.log(err));
    },
    // 搜索
    search() {
      let aa = this.messs ? "department=" + this.messs : "";
      if (aa !== "") {
        if (this.messs1 !== "") {
          aa = aa + "&group_name=" + this.messs1;
          if (this.messs2 !== "") {
            aa = aa + "&username=" + this.messs2;
          }
        } else {
          if (this.messs2 !== "") {
            aa = aa + "&username=" + this.messs2;
          }
        }
      } else {
        if (this.messs1 !== "") {
          aa = "group_name=" + this.messs1;
          if (this.messs2 !== "") {
            aa = aa + "&username=" + this.messs2;
          }
        } else {
          if (this.messs2 !== "") {
            aa = aa + "username=" + this.messs2;
          }
        }
      }
      this.search_val = aa;
      this.search_open = true;
      axioIn
        .get("/permission/users/?" + aa)
        .then(response => {
          if (response.data.length == 0) {
            alert("未搜到相关信息");
          } else {
            this.items = response.data.results;
            this.pageIndex = 1;
            this.page = response.data.page_num.total_page;
            this.rowNum = response.data.page_num.total_count;
            this.transform(this.items);
          }
        })
        .catch(err => console.log(err));
    },
    // 转换数据格式
    transform(data) {
      data.forEach(item => {
        let aa = "";
        item.groups.forEach(aar => {
          if (aa == "") {
            aa = aar.name;
          } else {
            aa = aa + "," + aar.name;
          }
        });
        item.groups_name = aa;
      });
    }
  }
};
 