import axioIn from '../../store/axioIn';
export default {
    name: 'roleadmin',
    data() {
        return {
            roleCreateList: [],
            leftrole: [],//人员列表
            freeStyle: true,
            rightrole: [],
            putType: false,
            roleMessage: '添加系统',
            group: { role: '', roleSer: '', },
            roleArr: [], // 表格当前数据
            pagesize: 10, //默认每页数据量
            currentPage: 1, //当前页码
            rolepagesize: 10, //权限列表详情
            rolecurrentPage: 1, //权限列表详情
            roletotalCount: 10,//权限列表总数
            totalCount: 10, //默认数据总数
            loading: false,
            role_sear: true,//一级显示
            gridData: [],//详情列表
            tableData: [],//分类列表
            roleName: '',//一级类名
            rolesNames: '',//二级类名
            rolepage: false,//大类下面的分页
            pagetype: false,//用户组权限详情分页
            rolesgroup: [],
            superadmin: true,
            renderFunc(h, option) {
                return <span>{ option.key } - { option.label }</span>;
              },
        };
    },

    created() {
        this.getData();
    },
    computed: {
        //用户角色列表检索
        roleChidrenList() {
            let data = []
            let Sear_val = this.group.roleSer.toLowerCase().trim()
            // let Sear_valupeper= this.group.roleSer.toUpperCase().trim()
            for (let i in this.tableData) {
                let newArr = this.tableData[i]
                if (newArr.cn.toLowerCase().trim().indexOf(Sear_val) >= 0 || newArr.cn.indexOf(this.group.roleSer) >= 0) {
                    data.push(newArr)
                }
                this.totalCount = data.length;
            }
            return data
        },
        //系统列表检索
        roleList() {
            let data = []
            let Sear_val = this.group.roleSer.toUpperCase().trim()
            // let Sear_valupper= this.group.roleSer.toLowerCase().trim()
            for (let i in this.roleArr) {
                let newArr = this.roleArr[i]
                console.log(newArr.cn.indexOf(Sear_val) >= 0)
                if (newArr.cn.toUpperCase().trim().indexOf(Sear_val) >= 0 || newArr.cn.indexOf(this.group.roleSer) >= 0) {
                    data.push(newArr)
                }
            }
            return data
        },
        //超级管理员权限获取
        'superrole'(){
            return  this.$store.state.roletype || window.localStorage.getItem('roletype');
        }
    },
    methods: {
        //获取系统列表
        getData() {
            const loading = this.$loading({
                lock: true,
                text: '正在加载数据',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            axioIn.get("/api/user/group_list/").then((res) => {
                setTimeout(_=>{
                    loading.close();
                    this.roleArr = res.data;
                },1000)
            })
            if(this.superrole === 'Y' || window.localStorage.getItem('roletype') == 'Y'){
                this.superadmin=true;
            }else{
                this.superadmin=false
            }
        },
        prveroleType() {
            this.roleMessage = '添加系统'
            this.group.roleSer = '';
            this.role_sear = true;
        },
        prverole() {
            this.putType = false;
        },
        toggleRowExpansion() {
            console.log('ok');
        },
        expand() {
            console.log('ok');
        },
        role_put(value,rolename){
            let $this = this;
            let oldVal = value;
                this.$prompt('正在操作的用户组为:' + value, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    required: true,
                    inputValidator: function (input) {
                        let cn = /^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,20}$/
                        if (cn.test(input)) {
                            return true
                        } else {
                            return '用户组请以数字、英文、汉字、"-"组合'+'最大长度支持20位'
                        }
                    },
                }).then(({ value }) => {
                    console.log(oldVal,rolename,value)
                    axioIn.get("/api/user/change_role/?role=" + oldVal + '&group=' + rolename+'&new_role='+value).then(res => {
                        if(res){
                                this.group_roles(this.roleName);
                                this.role_sear=false;
                        }
                    })
                }).catch(err => {
                    this.buttonMessage('您已取消操作', 'warning', 1500)
                })
        },
        //拿到权限列表移除掉人员的数据
        leftroleType(data) {
            this.leftrole = data;
        },
        //修改人员列表和权限列表数据
        handleChange(roles,role,data) {
             let arr=[];
             axioIn.get("/api/user/left_right_list/?role=" + roles + '&group=' + role).then(res => {
                         
            }).catch(res=> {
                this.buttonMessage(res.data.error, 'warning', 1500)
            })
             data.map(item=>{
                this.roleCreateList.map(grop_rolep=>{
                    if(item.key==grop_rolep){
                        arr.push(item.dn)
                    }
                })
             })
             arr=Array.from(new Set(arr));
  
         axioIn.put("/api/user/update_role_members/",{
                    role:this.rolesNames,
                    group:role,
                    members:arr
                }).then(res=>{
                    
                })
        },
        // 修改系统
        put_role(value, types) {
            let $this = this;
            let oldVal = value;
            if (types) {
                this.$prompt('正在操作的系统为:' + value, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    required: true,
                    inputValidator: function (input) {
                        console.log(input)
                        let cn = /^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,20}$/
                        if (cn.test(input)) {
                            return true
                        } else {
                            return '系统请以数字、英文、汉字、"-"组合'+'最大长度支持20位'
                        }
                    },
                }).then(({ value }) => {
                    
                    axioIn.get("/api/user/change_group/?group=" + oldVal + '&new_group=' + value).then(res => {
                        if(res){
                            this.getData();
                            this.role_sear=true;
                        }
                    })
                }).catch(err => {
                    this.buttonMessage('您已取消操作', 'warning', 1500)
                })
            } else {
                this.roleCreateList=[];
                this.rolesNames=value;
                this.putType = true;
                this.rolesgroup=[];
                this.put_roles(value, this.roleName)
            }
        },
        //组织角色权限列表
        put_roles(roles, role) {
            const loading = this.$loading({
                lock: true,
                text: '正在加载数据',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            axioIn.get("/api/user/left_right_list/?role=" + roles + '&group=' + role).then(res => {
                console.log(res);
                //    有权限
                var arr = [];
                Object.keys(res.data.data.members).forEach(
                (key,i) => {  
                    let concat;
                    concat=res.data.data.members[key]
                    arr.push({
                        key: i,
                        label:concat,
                        dn:res.data.data.members[key]
                    })
                    }
                );
                //复制response里面的所有对象返还给一个新对象
                var concatObj=Object.assign(res.data.data.members,res.data.data.non_member);
                var rightarr=[];
                //没有权限 
                Object.keys(concatObj).forEach(
                    (key,i) => {
                        let concat;
                        concat= concatObj[key];
                        concat=concat.split(",");
                        concat=concat[0];
                        concat=concat.split("=");
                        concat=concat[1];
                        rightarr.push({
                                key: i,
                                label:concat +`   （${key}）`,
                                dn:concatObj[key]
                            })
                    }
                );
              this.rolesgroup=rightarr;
              //传参分隔权限和人员列表
              this.put_fiter(rightarr,arr);
            }).catch(res=> {
                this.buttonMessage(res.data.error, 'warning', 1500)
            })
            setTimeout(_=>{
                loading.close();
            },2000)
        },
        //传参分隔权限和人员列表数据处理
        put_fiter(data,role) {
           data.map((item,index)=>{
               role.map((role,roleindex)=>{
                  if(item.dn===role.dn){
                      this.roleCreateList.push(item.key);
                  }
               })
           })
        },
        // 系统和角色新增
        addRole(types) {
            let $this = this;
            if (types) {
                this.$prompt('请输入要添加的' + '系统:', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    required: true,
                    inputValidator: function (input) {
                        let cn = /^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,20}$/;
                        if (cn.test(input)) {
                            return true
                        } else {
                            return '系统请以数字、英文、汉字、"-"组合'+'最大长度支持20位'
                        }
                    },
                }).then(({ value }) => {
                    axioIn.post("/api/user/group_list/", {
                        cn: value
                    }).then(res => {
                        console.log(res.data.error);
                        this.getData();
                    }).catch(res=> {
                        this.buttonMessage(res.data.error, 'warning', 1500)
                    })
                }).catch((err) => {
                    console.log(err);
                    this.buttonMessage('您已取消操作', 'warning', 1500)
                })
            } else {
                this.$prompt('请输入要添加的' + '角色名:', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    required: true,
                    inputValidator: function (input) {
                        let cn = /^[\u4E00-\u9FA5\uF900-\uFA2D\w-]{1,20}$/;
                        if (cn.test(input)) {
                            return true
                        } else {
                            return  '角色请以数字、英文、汉字、"-"组合'+'最大长度支持20位'
                        }
                    },
                }).then(({ value }) => {
                    axioIn.post("/api/user/create_role_members/", {
                        'name': value,
                        'group': this.roleName

                    }).then(res => {
                        this.group_roles(this.roleName);
                    }).catch(res=> {
                        this.buttonMessage(res.data.error, 'warning', 1500)
                    })

                }).catch(err => {
                    this.buttonMessage('您已取消操作', 'warning', 1500)
                })
            }

        },
        // 系统和角色删除
        delrole(cn, types) {
            let $this = this;
            if (types) {
                this.$prompt('需要输入要删除的系统名称:'+cn, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    required: true,
                    inputValidator: function (input) {
                        if (input === cn) {
                            return true
                        } else {
                            return '输入不匹配！'
                        }
                    },
                }).then(({ value }) => {
                    axioIn.delete("/api/user/group_detail?pk="+cn).then(res => {
                        this.getData();
                    })
                }).catch(err => {
                    this.buttonMessage('您已取消操作', 'warning', 1500)
                })
            } else {
                this.$prompt('需要输入要删除的角色名称:'+cn, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    inputValidator: function (input) {
                        if (input === cn) {
                            return true
                        } else {
                            return '输入不匹配！'
                        }
                    },
                }).then(({ value }) => {
                    axioIn.get("/api/user/delete_role_members/?role=" + value + '&group=' + this.roleName).then(res => {
                        this.group_roles(this.roleName);
                    }).catch(err => {
                        this.buttonMessage(err.data.error, 'warning', 1500)
                    })
                }).catch(err => {
                    this.buttonMessage('您已取消操作', 'warning', 1500)
                })
            }
        },
        roleType() {
            this.role_sear = false;
        },
        // 系统进入和角色查看 处理
        sear_role(cn, type) {
            this.group.roleSer = '';
            if (type) {
                this.roleName = cn;
                //传当前系统的名称
                this.group_roles(cn);
                this.role_sear = false;
                this.roleMessage = '添加角色'
            } else {
                console.log(cn);
                this.rolesNames = cn;
                this.freeStyle = true;
                this.roletotalCount = 0;
                 //传当前角色的名称
                this.group_searquery(cn);
            }
        },
        //角色下的人员查询
        group_searquery(data) {
            this.rolepage = false;
            axioIn.get("/api/user/list_role_members/?role=" + data + '&group=' + this.roleName).then(res => {
                if (res.data.length) {
                    var arr = [];
                    Object.keys(res.data).forEach(
                        (key, i) => {
                            arr.push({
                                cn: res.data[key],
                            })
                        }
                    );
                    this.roletotalCount = arr.length;
                    this.gridData = arr;
                    this.rolepage = true;
                    this.rolecurrentPage = 1;
                    this.freeStyle = false;

                }else{
                    this.freeStyle = false;                    
                    this.roletotalCount = arr.length;
                    this.gridData = arr;
                    this.rolepage = true;
                    this.rolecurrentPage = 1;
                }
            })

        },
        //系统下的角色查询
        group_roles(role) {
            this.pagetype = false;
            const loading = this.$loading({
                lock: true,
                text: '正在加载数据',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            axioIn.get("/api/user/list_role?role="+ role).then(res => {
                if (res.data.length) {
                    loading.close();
                    this.totalCount = res.data.length;
                    this.tableData = res.data;
                    this.currentPage = 1;
                    this.pagetype = true;
                }else{
                    loading.close();
                    this.totalCount = res.data.length;
                    this.tableData = res.data;
                    this.currentPage = 1;
                    this.pagetype = true;
                }
                // this.buttonMessage('您已添加成功','success', 1500)
            }).catch((res)=>{
                this.buttonMessage(res.data.error,'warning', 1500) 
            })
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        rolehandleCurrentChange(val) {
            this.rolecurrentPage = val;
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
        // 搜索
        searchquery() {

        },
        // 重置
    },
    watch:{
        //对超级管理员监听
        'superrole'(res){
           if(res === 'Y'){
            this.superadmin=true;
           }else{
            this.superadmin=false
           }
        }
    }
}
