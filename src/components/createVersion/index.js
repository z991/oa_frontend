/*
 * @Author: liuqian 
 * @Date: 2018-09-13 14:00:06 
 * @Last Modified by: liuqian
 * @Last Modified time: 2018-12-26 10:30:23
 */
import axioIn from "../../store/axioIn";
import Router from "../../router/index";
export default {
  name: 'createVersion',
  data () {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      radio: '1',
      aa: 'dsfsad',
      versionStatus: '新建',
      produceClassify: [{name: '经典版',value: 1},{name: '重构版',value: 2}],
      productList: [],
      productData: {product_classify: '',product_name: '',product_version: '',release_date: '',product_explain: '',version_id: ''},
      explainShow: false,
      ver_id: '',
    }
  },
  mounted () {
    this.ver_id = this.$route.query.id;
    if(this.ver_id){
      this.versionStatus = '编辑'; let cutInter = '';
      axioIn.get('/api/version/versionproduct/?id='+this.ver_id).then(res=>{
        this.productData = res.data.version_info[0];
        
        axioIn.get(`/api/version/versionrepository/classic_re/?version=${this.productData.product_classify}`).then(res=>{
          this.productList = res.data;
        })
        this.productData.version_id = this.$route.query.versionId;
      })
    }else{
      this.productData.version_id = this.$route.query.versionId;
    }
    
  },
  methods: {
    toggleClassify (value) {//选择产品分类，联动产品
      this.productData.product_name = '';
      axioIn.get(`/api/version/versionrepository/classic_re/?version=${value}`).then(res=>{
        this.productList = res.data;
      })
    },
    saveInfo () {//保存
      let flag = true;
      for(var attr in this.productData){
        if(attr !== 'release_date' && attr !== 'release_number'){
          if(this.productData[attr] === ""){
            flag = false;
          }
        }
      }
      if(!flag){
        this.$message.error('请填写完整');
      }else{
        let str = this.productData.product_version.charAt(0).toLowerCase();
        if(str !== 'v'){
          this.productData.product_version = 'v' + this.productData.product_version;
        }
        if(this.versionStatus === '新建'){
          axioIn.post('/api/version/versionproduct/',this.productData).then(res=>{
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 1000,
              onClose () {
                Router.push({path: './informVersion'})
              }
            });
          })
        }else if(this.versionStatus === '编辑'){
          axioIn.put('/api/version/versionproduct/'+this.ver_id+'/',this.productData).then(res=>{
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 1000,
              onClose () {
                Router.push({path: './informVersion'})
              }
            });
          })
        }
      }
    },
    cancelProduct () {//取消操作
      Router.push({path: './informVersion'})
    }
  },
  created() {
    this.$store.commit("setLoading", false);
  }
}