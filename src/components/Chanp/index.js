import Shade from "../shade";
import axioIn from "../../store/axioIn";
import Pagination from "../pagination";
import Router from "../../router/index";
export default {
  name: "chanp",
  components: { Shade, Pagination },
  data() {
    return {
      messs: "",
      items: [{ id: "", index: '', product: "",version : '', version_count: "", version_count: "" }],
      page: "",     //总页数
      pageIndex: 1,//当前页码
      rowNum: ""   //总数
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
      axioIn.get("/api/product/ref-product/")
        .then(res => {
          this.items = res.data.results;
          this.page = res.data.page_num.total_page;
          this.rowNum = res.data.page_num.total_count;
          this.$store.commit("setLoading", false);
        })
        .catch(err => {
          this.$store.commit("setLoading", false);
        });
    },
    // 搜索
    search() {
      axioIn.get("/api/product/ref-product/?product_name=" + this.messs)
        .then(res => {
          if (res.data.length == 0) {
            this.buttonMessage("未搜到相关信息",'warning',1500);
            this.page = 1;
            this.rowNum = 0;
            this.pageIndex = 1;
          } else {
            this.items = res.data.results;
            this.page = res.data.page_num.total_page ? res.data.page_num.total_page : 1;
            this.rowNum = res.data.page_num.total_count ? res.data.page_num.total_count : 0;
          }
        })
        .catch((res) => {
            this.buttonMessage('搜索失败','error',1500);
        });
    },
    // 重置
    chon() {
      this.messs = "";
      axioIn.get("/api/product/ref-product/").then(res => {
        this.items = res.data.results;
        this.page = res.data.page_num.total_page;
        this.rowNum = res.data.page_num.total_count;
        this.pageIndex = 1;
      });
    },
    // 新增产品
    add() {
        this.$prompt("产品名称", "新增产品", {
            confirmButtonText: "保存",
            cancelButtonText: "取消",
            inputPlaceholder: "请输入产品名称"
        })
        .then(({ value }) => {
            if (value) {
            axioIn.post("/api/product/ref-product/", { product: value })
                .then(() => {
                  this.buttonMessage('新增成功', "success", 1500);
                  axioIn.get('/api/product/ref-product/')
                  .then((res) => {
                      this.popp=this.items=res.data.results;
                      this.page=res.data.page_num.total_page;
                      this.rowNum = res.data.page_num.total_count;
                      this.pageIndex = 1;
                  })
                })
                .catch(res => {
                    this.buttonMessage('新增失败', "error", 1500);
                });
            } else {
              this.buttonMessage("未输入产品名称", "warning", 1500);
            }
        })
        .catch(() => {
            this.buttonMessage("取消输入", "info", 1500);
        });
    },
    // 删除产品
    delet(id) {
      this.$confirm("删除该产品?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          axioIn.delete("/api/product/ref-product/" + id + "/").then(() => {
            this.buttonMessage("删除成功", "success", 1500);
            axioIn.get("/api/product/ref-product/").then(res => {
              this.items = res.data.results;
              this.page = res.data.page_num.total_page;
              this.rowNum = res.data.page_num.total_count;
            });
          });
        })
        .catch(() => {
          this.buttonMessage("已取消删除", "info", 1500);
        });
    },
    // 编辑产品
    bian(id) {
      Router.push({ path: "/product", query: { id: id , type: 1} });
    },
    // 分页数据
    incrementTotal(q) {
      let _pageIndex = q === undefined ? 1 : q;
      let API_SEARCH = "/api/product/ref-product/?product_name=" + this.messs +"&page=" + _pageIndex;
      let API_NOSEARCH = "/api/product/ref-product/?page=" + _pageIndex;
      let API= this.messs ? API_SEARCH : API_NOSEARCH;
      axioIn.get(API)
      .then(res => {
        this.items = res.data.results;
        this.pageIndex = _pageIndex;
        this.page = res.data.page_num.total_page;
        this.rowNum = res.data.page_num.total_count;
      })
      .catch(err => console.log(err));
    }
  }
};
