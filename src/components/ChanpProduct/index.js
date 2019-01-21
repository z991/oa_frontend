import axioIn from "../../store/axioIn";
import Pagination from "../pagination";
export default {
  name: "chanpnow",
  components: { Pagination },
  data() {
    return {
      // messs: "",//输出框查询
      items: [],// 列表内容
      page: "",//总页数
      rowNum: "",//总数
      pageIndex: 1,//当前页码
      type: "",//版本
      typeName: "",//产品名称   经典版/重构版 
      productName: "",//产品名称
      productId: "",//产品ID
      dialogFormVisible: false,//dialog是否显示
      dialogTitle: "新增",//form标题
      func_id: '',//功能ID
      form: {
        func_name: "", //功能名称
        func_code: "",//功能路径
        func_type: "",//文本形式
        cli_version: 3,//客户版本
        featuresShow: true,//功能添加显示与否  
        selection: [], //功能选项
        dependences: { id:[], ipu:[]},//联动功能
        parent: {},      //上级功能
        product: '',     //产品ID
      },
      optionsIndex: 0,   // 默认功能
      SuperiorItems: [], //上级条件列表
      SuperiorItem: [],  //上级功能名称
      Superior: [],
      SuperiorItemType: true,//上级条件切换
      LinkageItems: [], //联动功能模块列表
      LinkageItem: [],  //联动功能列表
      Linkage: [],
      LinkageItemType: true,//联动功能切换
      formLabelWidth: "80px",//label宽度
      formLabelWidth2: "120px",
      noWidth: "0px",
    };
  },
  created() {
    this.dataInit();
    this.$checkCookie();
  },
  methods: {
    // 提示
    buttonMessage(data, types, time) {
      this.$notify({
        title: "提示",
        message: data,
        position: "top-right",
        type: types,
        duration: time
      });
    },
    // 初始化、更新数据
    dataInit() {
      this.typeName = this.$route.query.type
        ? "重构版产品配置"
        : "经典版产品配置";
      this.type = this.$route.query.type ? 1 : 0;
      this.productId = this.$route.query.id;
      let _API = this.$route.query.type
        ? "/api/product/ref-product/" + this.productId + "/"
        : "/api/product/product/" + this.productId + "/";
      let API = "/api/product/function/?product=" + this.productId;
      if (this.$route.query.id === undefined) {
        return;
      } else {
        axioIn.get(_API)
        .then(res => {
          this.productName = res.data.product;
        });
        axioIn.get(API)
        .then(res => {
          this.items = res.data.results;
          this.page = res.data.page_num.total_page
            ? res.data.page_num.total_page
            : 1;
          this.rowNum = res.data.page_num.total_count
            ? res.data.page_num.total_count
            : 0;
        })
        .catch(err => {
          this.$store.commit("setLoading", false);
          this.buttonMessage('获取数据失败', "error", 1500);
        });
      }
    },
    // 删除产品
    delet(id) {
      this.$confirm("删除该产品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        axioIn.delete("/api/product/function/" + id + "/")
          .then(res => {
            this.buttonMessage("删除成功", "success", 1500);
            axioIn.get("/api/product/function/?product=" + this.productId)
            .then(res => {
              this.items = res.data.results;
              this.page = res.data.page_num.total_page ? res.data.page_num.total_page : 1;
              this.rowNum = res.data.page_num.total_count ? res.data.page_num.total_count : 0;
              this.pageIndex = 1;
            });
          })
          .catch(err => {this.buttonMessage('删除失败', "error", 1500)});
      })
      .catch(() => {this.buttonMessage("已取消删除", "info", 1500);});
    },
    // 分页数据
    incrementTotal(q) {
      let _pageIndex = q === undefined ? 1 : q;
      let API = "/api/product/function/?product=" + this.productId + "&page=" + _pageIndex;
      axioIn.get(API)
      .then(res => {
        this.items = res.data.results;
        this.pageIndex = _pageIndex;
        this.page = res.data.page_num.total_page;
        this.rowNum = res.data.page_num.total_count;
      })
      .catch(err => console.log(err));
    },

    // 修改产品名称
    modify() {
      this.$prompt("功能名称", this.productName, {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
        inputPlaceholder: "请输入修改功能名称"
    })
    .then(({ value }) => {
        if (value) {
          axioIn.put("/api/product/product/" + this.$route.query.id + '/', { product: value })
          .then((res) => {
            this.buttonMessage('修改成功', "success", 1500);
            this.productName = res.data.product;
          })
          .catch(res => {
              this.buttonMessage('修改失败', "error", 1500);
          });
        }
    })
    .catch(() => {
        this.buttonMessage("取消输入", "info", 1500);
    });
    },

    /*---------------------------------------------------功能模块 dialog--------------------------------------------------*/
    // 产品功能展示
    showDialog(type, id) {
      /*operating 操作    新增：0 修改：1
      * id        版本    功能id
      *  */
      this.formInit(type, id);
      this.dialogTitle = type ? "修改" : "新增";
    },
    formInit(type, id) {
      this.func_id = id;
      let API_FUNC = "/api/product/function/" + id;
      let API_DEP = "/api/product/function/?product=" + this.productId + "&depend=1"; 
      let API_PAR = "/api/product/function/?product=" + this.productId + "&parent=1"; 
      if(type === 0) {
        this.formDataInit();
      } else {
        axioIn.get(API_FUNC).then(res => {
          this.form = res.data; 
          this.form.selection = res.data.selection.length ? res.data.selection : [{ select_name: "", select_value: "", is_default: true }];
          this.form.featuresShow = res.data.func_type === "单选框" ? true : false;
          this.form.selection.map((item,index)=>{
            if(item.is_default === true) {
              this.optionsIndex = index;
            }
          })
        });
      };
      //上级功能列表
      axioIn.get(API_PAR).then(res => {
        this.SuperiorItem = res.data;
        this.SuperiorItems =  [{id:'',list: this.SuperiorItem, SeletedVal:'', default:'',  func_type: "单选框" }]; 
      });
      //联动功能列表
      axioIn.get(API_DEP).then(res => {
        this.LinkageItem = res.data;
        this.LinkageItems = [{id: '', list: this.LinkageItem, SeletedVal:'', default:'',  func_type: "单选框" }];
      });
      this.dialogFormVisible = true;
    },
    formDataInit() {
      this.form = {
        func_name: "", 
        func_code: "",
        func_type: "",
        cli_version: 3,
        featuresShow: true,                                       
        selection: [{ select_name: "", select_value: "", is_default: true}], 
        dependences: {'id':'','ipu':[]},            
        parent: {},   
        product: '', 
      };
      this.optionsIndex = 0;
      this.Superior = [{id:'',is_default: true,select_name: "",select_value: ""}],
      this.Linkage = [{id:'',is_default: true,select_name: "",select_value: ""}],
      this.SuperiorItem = [{cli_version: '',func_code: '',func_name: '',func_type: '',id: '',product: '',selection: this.Superior}];
      this.SuperiorItems = [{id:'',list: this.SuperiorItem, SeletedVal:'', default:'',  func_type: "单选框" }]; 
      this.LinkageItem = [{cli_version: '',func_code: '',func_name: '',func_type: '',id: '',product: '',selection: this.Linkage}]
      this.LinkageItems = [{id: '', list: this.LinkageItem, SeletedVal:'', default:'', func_type: "单选框" }];
    },
    // 文本框和单选框切换
    textFormChange(type) {
      this.form.featuresShow = type === "文本框" ? false : true;
    },
    // 添加功能选择
    featureChange(value) {
      this.form.selection.map( (item,index)=> {
        if(index === value) {
          item.is_default = true;
        }else {
          item.is_default = false;
        }
      })
    },
    // 选择联动功能
    linkageFormChange(id) {    
      if(!id) {
        this.Linkage = [{id:'',is_default: true,select_name: "",select_value: ""}];
      }
      this.LinkageItem.map(item => {
         if(item.id === id) {
           this.LinkageItemType = item.func_type === '文本框' ? false : true;
           if(item.selection.length) {
            item.default = '';
            this.Linkage = item.selection;
           } else {
            this.Linkage = [{id:'',is_default: true,select_name: "",select_value: ""}];
           }
         }
      })
    },
    // 择上级功能
    superFormChange(id) {
      if(!id) {
        this.Superior = [{id:'',is_default: true,select_name: "",select_value: ""}];
      }
      this.SuperiorItem.map(item => {
        if(item.id === id) {
          this.SuperiorItemType = item.func_type === '文本框' ? false : true;
          if(item.selection.length) {
           this.Superior = item.selection;
          } else {
           this.Superior = [{id:'',is_default: true,select_name: "",select_value: ""}];
          }
        }
     })
    },
    LinkageItemChange(id) {
      
    },
    SuperiorItemChange(id) {

    },
    // 添加功能选择 0 ; 添加上级条件 1 ; 添加联动功能 2 ;
    add_funs(type) {
      switch (type) {
        case 0: 
          this.form.selection.push({select_name: "",select_value: "",is_default: false});
          break;
        case 1:
          this.SuperiorItems.push({id: '', list: this.SuperiorItem, SeletedVal:'', default:'',  func_type: "单选框" });
          break;
        case 2:
          this.LinkageItems.push({id: '', list: this.LinkageItem, SeletedVal:'', default:'',  func_type: "单选框" });
          break;
        case 3:
          this.Superior.push({id:'',is_default: true,select_name: "",select_value: ""});
          break;
        case 4: 
          this.Linkage.push({id:'',is_default: true,select_name: "",select_value: ""});
          break;
      }
    },
    // 删除功能
    delFeature(datas, index) {
      let _length = datas.length;
      if (_length === 1) {
        this.buttonMessage("至少保留一个", "info", 1500);
      } else {
        datas.splice(index, 1);
      }
    },
    /*功能模板删除
    *type   删除类型： 0：删除功能选项； 1：删除上级条件；2：删除联动功能
    *index  删除项的index
    * */
    delFeatures(type, index) {
      switch (type) {
        case 0:
          this.delFeature(this.form.selection, index);
          break;
        case 1:
          this.delFeature(this.SuperiorItems, index);
          break;
        case 2:
          this.delFeature(this.LinkageItems, index);
          break;
        case 3:
          this.delFeature(this.Superior, index);
          break;
        case 4: 
          this.delFeature(this.Linkage, index);
          break;
      }
    },

    // 下拉选项选择数据格式修改
    seletedData(data,seletedData) {
      let obj = {ipu: []};
      let _obj = {id:'',value:[]};
      data.map(items=>{
        items.list.map(item=>{
          if(items.SeletedVal === item.id) {
            _obj.id = item.id;
          }
        })
        seletedData.map(item=> {
          if(item.id) {
            _obj.value.push(item.id)
          }
        })
      })
      obj.ipu.push(_obj)
      return obj;
    },
    // 取消
    dialogCancel() {
      this.dialogFormVisible = false;
    },
    // 确定
    dialogDetermine() {
      let sure = true;
      if(this.form.func_name === '') {
        sure = false;
        return this.buttonMessage("请输入功能名称", "info", 1500);
      } 
      if(this.form.func_code === '') {
        sure = false;
        return this.buttonMessage("请输入功能路径", "info", 1500);
      }
      if(this.form.func_type === '') {
        sure = false;
        return this.buttonMessage("请选择文本形式", "info", 1500);
      }
      if(this.form.func_type === '单选框') {
        this.form.selection.map(item=> {
          if(item.select_name === '' || item.select_value === '' ) {
            sure = false;
            return this.buttonMessage("请完善功能选项", "info", 1500);
          }
        })
      }
      let _parent = this.seletedData(this.SuperiorItems,this.Superior);
      let _dependences = this.seletedData(this.LinkageItems,this.Linkage)
      let data = {
        func_name: this.form.func_name,
        func_code: this.form.func_code,
        func_type: this.form.func_type,
        parent: _parent,
        product: this.productId,
        selection: this.form.selection,
        cli_version: this.form.cli_version,
        dependences: _dependences
      }
      if(sure) {
        if(this.dialogTitle === '新增') {
          axioIn.post("/api/product/function/", data).then(res => {
            axioIn.get("/api/product/function/?product=" + this.productId)
            .then(res => {
              this.buttonMessage("新增成功", "success", 1500);
              this.items = res.data.results;
              this.page = res.data.page_num.total_page ? res.data.page_num.total_page : 1;
              this.rowNum = res.data.page_num.total_count ? res.data.page_num.total_count : 0;
              this.pageIndex = 1;
            })
            .catch(res=>{
              this.buttonMessage("新增失败", "success", 1500);
            })
          });
        } else {
          axioIn.put("/api/product/function/" + this.func_id + "/", data)
          .then(res => {
            this.buttonMessage("修改成功", "success", 1500);
            axioIn.get("/api/product/function/?product=" + this.productId)
              .then(res => {
                this.items = res.data.results;
                this.page = res.data.page_num.total_page ? res.data.page_num.total_page : 1;
                this.rowNum = res.data.page_num.total_count ? res.data.page_num.total_count : 0;
                this.pageIndex = 1;
              })
              .catch(res=>{
                this.buttonMessage("新增失败", "success", 1500);
              })
          });
        }
        this.dialogFormVisible = false;
        this.formDataInit();
      }
    }
  }
};
