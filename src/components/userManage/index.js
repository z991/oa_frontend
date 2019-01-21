import axioIn from '../../store/axioIn';
import { SIGALRM } from 'constants';
export default {
  name:'userManage',
  data() {
    return {
      searchContent: '', //搜索框内容
      filterData: [],    //用户显示列表
      tableData: [{cn: 'liuqian',sn: '刘茜'}],//所有用户列表
      exhibition: true,   //用户列表与用户信息切换
      defaultProps: { id: 'id', label: 'name' },
      pageAll: 1,         //用户列表总数
      userFill: {mail: "",permission: [],cn: "",sn: "",password: "",permission_list: []},
      pitchData: [],      //权限管理树状结构   选中的节点
      status: '',         //新增或编辑的状态保存
      emailShow: true,    //邮箱展示的控制
      currPage: 1,        //分页的当前的页数
      userAmend: false,   //控制用户名栏是否禁用
      pageshow: true,     //分页是否显示
      limitIs: '',        //用户权限控制 显示与否
      clearData: true,    //控制搜索可不可以写入数据，为了解决谷歌浏览器保存了账号的问题
      limitUser: false,   //输入框控制
      passWordShow: false, //密码是否显示
      controlOpe: '编辑',
    };
  },
  computed: {},
  created() {
    // 根据用户权限  显示不同的权限功能
    var a = this.$store.state.usertype || sessionStorage.getItem('usertype');
    if(a == 1){
      this.limitIs = true;
      this.controlOpe = '编辑';
      this.limitUser = false;
    }
    else if(a == 0){
      this.limitIs = false;
      this.controlOpe = '查看';
      this.limitUser = true;
      this.searchContent = localStorage.name;
      this.searchBtn();
    }
    if(this.searchContent === '' || this.searchContent === undefined){
        this.flipOver(1);
        this.currPage = 1;
        this.pageshow = true;
    }
  },
  mounted(){
    // 获取用户列表信息
    axioIn.get('/api/user/user_list/').then(res=>{
      this.filterData = res.data.result;
      this.tableData = res.data.total_result;
      this.pageAll = res.data.total_count;
      this.searchBtn();
      this.$store.commit('setLoading', false)
    })
  },
  methods: {
    //保存
    getCheckedNodes () {
      var reg = /^[a-zA-Z]+$/;
      if(this.userFill.cn == ''){
        this.$alert('请把必选项都填写完整', {confirmButtonText: '确定'});
        return
      }
      if(!reg.test(this.userFill.cn)){
        this.$message.error('用户名一栏只能输入字母哦');
        return;
      };
      var authority = this.$refs.tree.getCheckedNodes();//拿到树状结构选中的节点
      if(this.userFill.cn === '' || this.userFill.sn === '' || this.userFill.password === '' || authority.length === 0){
        this.$alert('请把必选项都填写完整', {confirmButtonText: '确定'});
        return;
      };
      this.userFill.permission.map(item => {
        item.view = 0
      })
      authority.map(item=>{
        this.userFill.permission.map( i =>{
          if(i.id === item.id){
            console.log(i.id)
            i.view = 1
          }
        })
      });
      if(this.status === '编辑'){
        axioIn.put('/api/user/user_put/',this.userFill).then(res=>{
          this.exhibition = true;
          this.$message({
            type: 'success',
            duration: '1500',
            message: '修改成功'
          });
          this.currPage = 1;
          this.flipOver(1);
          this.searchContent = '';
        })
      }else if(this.status === '新增'){
        axioIn.post('/api/user/user_add/',this.userFill).then(res=>{
          this.exhibition = true;
          this.$message({
            type: 'success',
            duration: '1500',
            message: '新增成功'
          });
          this.currPage = 1;
          this.flipOver(1);
          this.searchContent = '';
        }).catch((res) => {
          if(res.status != 400) {
            this.$message({
              type: 'err',
              duration: '1500',
              message: res.data.error
            });
          }
        })
      }
    },
    //搜索 
    searchBtn () {  
      if(this.searchContent === '' || this.searchContent === undefined){
        this.flipOver(1);
        this.currPage = 1;
        this.pageshow = true;
      }else{
        let data = [];
        this.pageshow = false;
        let searchContent = this.searchContent.toLowerCase().trim();
        this.tableData.map(n=>{
          if(n.last_name.toLowerCase().indexOf(searchContent) >= 0 || n.username.toLowerCase().indexOf(searchContent) >= 0){
            data.push(n)
          }
        })
        this.filterData = data
      }
    },
    // 用户名验证
    userVerify () {
      var reg = /^[a-zA-Z]+$/;
      if(!reg.test(this.userFill.cn)){
        this.$message.error('用户名一栏只能输入字母哦');
      }
    },
    // 同步LDAP数据
    getLadp() {
      axioIn.get('/api/user/ldap_local/').then((res)=>{
        console.log(res)
        this.$message({
          type: 'success',
          duration: '1500',
          message: res.data
        });
      }).catch(res=>{
        this.$message({
          type: 'err',
          duration: '1500',
          message: res.data.error
        });
      })
    },
    //翻页
    flipOver (page) { 
      axioIn.get('/api/user/user_list/?page='+page).then(res=>{
        this.filterData = res.data.result;
        this.tableData = res.data.total_result;
      })
    },
    // 新增
    addUser () { 
      this.status = '新增';
      this.emailShow = false;
      this.userAmend = false;
      this.passWordShow = true;
      for(var attr in this.userFill){
        this.userFill[attr] = ''
      };
      this.userFill.permission = [];
      this.userFill.permission_list = [];
      this.pitchData = [];
      axioIn.get('/api/user/all_permission/').then(res=>{// 所有权限的接口，然后把拿到的数据转为树状结构需要的数据格式
        this.userFill.permission = res.data;
        this.userFill.permission_list = res.data;
        this.exhibition = false;
      })
    },
    //编辑
    editInfo (item) {  
      this.status = '编辑';
      this.exhibition = false;
      this.emailShow = true;
      this.userAmend = true;
      this.pitchData = [];
      this.passWordShow = false;
      axioIn.get('/api/user/user_detail/?user='+item.username).then(res=>{
        this.userFill = res.data.data;
        this.userFill.permission = res.data.data.permission;
        this.userFill.permission_list = res.data.data.permission;
        var objData = res.data.data.permission;
        for(var attr in objData){
          var obj = {};
          obj['id'] = attr;
          if(objData[attr]){
            for(var pro in objData[attr]){
              if(objData[attr][pro] == 1){
                this.pitchData.push(objData[attr]['id'])
              }
            }
          }          
        };
      })
    },
    // 删除
    deleteInfo (item) { 
      this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        axioIn.delete('/api/user/user_delete/?cn='+item.username).then(res=>{
          this.$message({
            type: 'success',
            duration: '1500',
            message: '删除成功!'
          });
          this.currPage = 1;
          this.flipOver(1);
          this.searchContent = '';
        }).catch((res)=>{
          this.$message({
            type: 'err',
            duration: '1500',
            message: res.data.error
          })
        })
      })
    },
    // 取消按钮
    cancle () { 
      this.exhibition = true;
      // this.searchContent = '';
    }
  }
}
