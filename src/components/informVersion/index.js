/*
 * @Author: liuqian 
 * @Date: 2018-09-13 14:00:06 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-21 14:48:38
 */
import axioIn from "../../store/axioIn";
import Router from "../../router/index";
import versionSettings from "../versionSettings/index"
export default {
  name: 'informVersion',
  data () {
    return {
      versionList: [],
      productList: [],
      optFor: false,//用来记录是否选中了某一个版本
      versionNum: '',//编辑版本号时的值
      version_id: '',//存一下id给后台传值用的
      versionStatus: '',
      a: '32432',
      isSendFlag:false,
      propsContent:null,
      describeShow: false,
      propsId:'',
      propsType:'',
      currentVersion: null,

      // 项目进度
      productLines: [{
          id: 12,
          product_name: '呼叫中心项目立项',
          stepIndex: 1,
          steps: [{
            name: '项目立项',
            time: '2018/12/12',
            mileageTime: '2018/12/20'
          },{
            name: '产品设计',
            time: '2018/12/12',
            mileageTime: ''
          },{
            name: '研发',
            time: '2018/12/12',
            mileageTime: '2018/12/21'
          }]
        },{
          product_name: '工单',
          stepIndex: 3,
          steps: [{
            name: '产品设计',
            time: '2018/12/12',
            mileageTime: '2018/12/22'
          }]
        }],
      // 修改记录列表
      ChangeRecords: [{
        user: '小明',
        model: '在线咨询',
        modify_list:[{
          name: '类型',
          old_value: '无',
          new_value: '开通',
          time: '2018-12-12'
        }]
      },{
        user: '小王',
        model: '在线咨询',
        modify_list:[{
          name: '类型',
          old_value: '无',
          new_value: '开通',
          time: '2018-12-12'
        }]
      }],
      value1: '',//日期
      versionFlow: [],//版本流程
      modifyRecord: [],//改动记录 
      buttonList: [{buttonOperate:[]},{buttonOperate:['评审通过']},{buttonOperate:['提测']},{buttonOperate:['驳回','通过','冒烟通过']},
        {buttonOperate:['驳回','通过']},{buttonOperate:['确认']},{buttonOperate:['发版']}]
    }
  },
  components:{versionSettings},
  mounted () {
    this.getVersion()
  },
  methods: {
    getVersion () {
      this.describeShow = false;
      axioIn.get('/api/version/versionrepository/').then(res=>{
        this.$store.commit("setLoading", false);
        this.versionList = res.data;
        this.versionList.map(n=>{
          this.$set(n,'operateShow',false)
          this.$set(n,'createJunior',false)
          if(n.children.length !== 0){
            n.children.map(m=>{
              this.$set(m,'operateShow',false)
              this.$set(m,'createJunior',false)
              if(m.children.length !== 0){
                m.children.map(i=>{
                  this.$set(i,'operateShow',false)
                })
              }
            })
          }
        })
      })
    },
    getProduct (item) {
      this.currentVersion = item;let arr = [];
      axioIn.get('/api/version/versionproduct/?version_id='+item.id).then(res=>{
        this.productList = res.data.version_info;
        this.modifyRecord = res.data.log;//改动记录
        this.modifyRecord.map(n=>{
          n.modify_list.time = n.time;
          let record = n.modify_list;
          n.modify_list = [];n.modify_list.push(record);
        })
        this.productList.map((n,i)=>{
          arr.push({product_name: n.product_name,schedule: n.schedule,id: n.id});
          arr[i].schedule.pop();
          arr[i].schedule.map((m,d)=>{
            m.buttonOperate = this.buttonList[d].buttonOperate;
          })
        })
        this.versionFlow = arr;
      })
      this.currentChick(item);
      this.optFor = item.id;
    },
    predictChoose (id,name,planTime) {
      let _this = this;
      let obj = {step: name,course: planTime};
      axioIn.put(`api/version/versionproduct/${id}/set_time/`,obj).then(res=>{
        this.$message({
          message: '操作成功！',
          type: 'success',
          duration: 1200,
          onClose: function () {
              _this.getProduct(_this.currentVersion);
          }
        });
        // this.getProduct(this.currentVersion)
      })
    },
    operateStep (id,name,button) {
      console.log(id)
      let _this = this;
      axioIn.put(`/api/version/versionproduct/${id}/put_schedule/`,{
        step: name,
        button: button
      }).then(res=>{
        this.$message({
          message: '操作成功！',
          type: 'success',
          duration: 1200,
          onClose: function () {
              _this.getProduct(_this.currentVersion);
          }
        });
      })
    },
    currentChick (item) {
      this.versionList.map(n=>{
        this.$set(n,'versionShow',false)
        if(n.children.length !== 0){
          n.children.map(m=>{
            this.$set(m,'versionShow',false)
            if(m.children.length !== 0){
              m.children.map(i=>{
                this.$set(i,'versionShow',false)
              })
            }
          })
        }
      })
      this.$set(item,'versionShow',true);
    },
    editProduct (id,versionId) {
      Router.push({path: './createVersion',query: {id: id,versionId: versionId }})
    },
    deleteProduct (id) {
      let _this = this;
      let aa = confirm('确定删除么？')
      if(aa){
        axioIn.delete('/api/version/versionproduct/'+id+'/').then(res=>{
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000,
            onClose () {
              _this.getVersion();
              _this.getProduct(_this.currentVersion)
            }
          });
        })
      }
      
    },
    createProduct () {
      if(this.optFor){
        Router.push({path: './createVersion',query: {versionId: this.optFor}})
      }else{
        this.$message.error('请选择一个版本');
      }
    },
    createStair () {//创建一级版本
      let _this = this;
      this.$prompt('一级版本名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '格式不正确'
      }).then(({ value }) => {
        if(!value){
          this.$message.error('不能填入为空');return;
        }
        let str = value.charAt(0).toLowerCase();
        if(str !== 'v'){
          value = 'v' + value;
        }
        axioIn.post('/api/version/versionrepository/',{parent: "",version_id:value}).then(res=>{
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 1000,
            onClose () {
              _this.getVersion();
            }
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });       
      });
    },
    createSecond (item) {// 创建下一级版本
      this.version_id = '';this.versionNum = '';this.versionStatus = true;
      this.versionList.map(n=>{
        this.$set(n,'createJunior',false)
        if(n.children.length !== 0){
          n.children.map(m=>{
            this.$set(m,'createJunior',false);
            if(m.children.length !== 0){
              m.children.map(i=>{
                this.$set(i,'createJunior',false)
              })
            }
          })
        }
      })
      this.$set(item,'createJunior',true);
      this.version_id = item.id;
    },
    editFirst (item) {//编辑
      this.versionStatus = false;
      this.version_id = item.id;
      this.versionList.map(n=>{
        this.$set(n,'createJunior',false)
        if(n.children.length !== 0){
          n.children.map(m=>{
            this.$set(m,'createJunior',false);
            if(m.children.length !== 0){
              m.children.map(i=>{
                this.$set(i,'createJunior',false)
              })
            }
          })
        }
      })
      this.$set(item,'createJunior',true);
      this.versionNum = item.version_id;
    },
    deleteFirst (item) {//删除
      let _this = this;
      // this.$confirm('此操作删除该版本, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
        if(confirm('确定删除么？')){
          axioIn.delete('/api/version/versionrepository/'+item.id).then(res=>{
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000,
              onClose () {
                _this.getVersion();
              }
            });
          })
        }
        
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   });          
      // });
      
    },
    /*
      发送给子组件参数
     */
    onSendFirst(type,item)
    {
        if (type =='content'){
          this.propsContent = item;
        }
        this.propsType = type;
        this.propsId = item.id;
        this.isSendFlag = true;
    },
      /*
       接受子组件的参数
    */
    onSendFlag(flag)
    {
     this.isSendFlag = flag[0];
     this.propsId = flag[1];
    },
      
    createLower () {//确定按钮
      var reg = /^[\d.vV]{1,11}$/;
      if(!reg.test(this.versionNum)){
        this.$message.error('最多填11位并且不要输入非法字符');return;
      }
      // if(this.versionNum === ''){
      //   this.$message.error('请填写版本号');return;
      // }else if(this.versionNum.length > 11){
      //   this.$message.error('最多填11位');return;
      // }
      let str = this.versionNum.charAt(0).toLowerCase();
      if(str !== 'v'){
        this.versionNum = 'v'+this.versionNum;
      }
      let _this = this;
      if(this.versionStatus){
        //说明是新建下一级版本
        axioIn.post('/api/version/versionrepository/',{parent:this.version_id,version_id:this.versionNum}).then(res=>{
          this.version_id = '';//成功以后清除；
          this.$message({
            message: '成功',
            type: 'success',
            duration: 800,
            onClose () {
              _this.hideInput();
              _this.getVersion();
            }
          });
        })
      }else{
        //编辑当前版本
        axioIn.put('/api/version/versionrepository/'+this.version_id+'/',{version_id:this.versionNum}).then(res=>{
          this.version_id = '';//成功以后清除；
          this.$message({
            message: '成功',
            type: 'success',
            duration: 800,
            onClose () {
              _this.hideInput();
              _this.getVersion();
            }
          });
        })
      }
      
      
    },
    cancelLower () {//取消按钮
      this.hideInput()
    },
    limitNumber () {
      if(this.versionNum.length > 11){
        this.$message.error('最多填11位');
      }
    },
    hideInput () {
      this.versionList.map(n=>{
        this.$set(n,'createJunior',false)
        if(n.children.length !== 0){
          n.children.map(m=>{
            this.$set(m,'createJunior',false)
            if(m.children.length !== 0){
              m.children.map(i=>{
                this.$set(i,'createJunior',false)
              })
            }
          })
        }
      })
    }
  }
}