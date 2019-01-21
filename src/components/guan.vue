<template>
    <div class="guan">
        <p class="qu">产品管理 > 运维配置>产品关联</p>
        <p class="cp">
          <a href="javascript:void(0)" class="c1">序号</a>
          <a href="javascript:void(0)" class="c1">服务</a>
          <a href="javascript:void(0)" class="c1">关联产品</a>
          <a href="javascript:void(0)" class="c3">操作</a>
      </p>
      <ul class="it">
          <li v-for="item in b2" :key='item.id'>
              <span class="c1">{{item.index}}</span>
              <span class="c1">{{item.ser_type}}</span>
              <span class="c1">
                  <span v-for='(i,k) in item.cor_product' class='spp' :key="k">{{i}}</span>
              </span>
              <span class="c3"><a href="javascript:void(0)" class="cha" @click='cha(item.id)'></a><a href="javascript:void(0)" class="dele" @click='delet(item.id)'></a></span>
          </li>
      </ul>
      <div v-show='ashod' class='ashod'>
          <p class='afb'><span>修改</span><i @click='close()' class='clo'></i></p>
          <p class='pi'><label for="">服务器名称</label><input type="text" v-model='ser.ser_type'><em class='ii'>*</em></p>
          <p class='bao' style='text-align:left;margin-left:36px;'><label for="">关联产品</label><a href="javascript:void(0)" class='quu' @click='addch()'>添加关联产品</a></p>
          <!--p v-for='aa in cor'>
              <select name="" id="" v-model='aa.name'>
                  <option v-for='u in b3' value="u">{{u}}</option>
              </select>
          </p-->
          <p v-for='(i,index) in ser.cor_product' class='pio' :key="index">
              <select name="index" id="" style='width:382px' v-model='i.name' >
                  <option v-for='u in b3' :value="u.product" :key='u.id'>{{u.product}}</option>
              </select><em class='ii'>*</em><a href="javascript:void(0)" class="dele" v-show='i.ac' @click='del(index)'></a>
          </p>
          <p class='bao' style='margin:0;'><a href="javascript:void(0)" class='quu' @click='close()'>取消</a><a href="javascript:void(0)" class='qub' @click='baob(ser.id)'>提交</a></p>
      </div>
      <shade v-show='shad'></shade>
      <shade v-show='shad1' style='z-index:16'></shade>
      <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
      <div v-show='tip' class='tip'>
          带<em class='ii'>*</em>为必填
          <p class='bao' style='text-align:center;margin:20px 0' ><a href="javascript:void(0)" class='qub' @click="tipp()">确定</a></p>
      </div>
    </div>
</template>
<script>
import Shade from './shade';
import axioIn from '../store/axioIn'
import Pagination from './pagination'
export default {
    name:'guan',
    components:{Shade,Pagination},
    created:function(){
        axioIn.get('/api/product/sertype/')
        .then((res)=>{
             this.popp=this.b2=res.data.results;
             this.page=res.data.page_num.total_page;
             this.rowNum = res.data.page_num.total_count;
             this.search_open=false;
        })
        axioIn.get('/api/product/product/foropen/')
        .then((res)=>{this.b3=res.data})
    },
    data:function(){
        return {
            b3:['2','3'],
            ser:{ id:'',ser_type:'',cor_product:[{name:'2',ac:false},{name:'3',ac:false}]},
            ashod:false,
            cor:[{name:'2',ac:false},{name:'3',ac:false}],
            b2:[{ id:'2',ser_type:'2',cor_product:[]}],
            shad:false,
            shad1:false,
            page:'',
            popp:'',
            pageIndex:1,
            tip:false,
            rowNum: ''
        }
    },
    methods:{
        addch:function(){this.ser.cor_product.push({name:'',ac:true})},
        del:function(index){if(confirm('确定删除吗？'))this.ser.cor_product.splice(index,1)},
        close:function(){this.ashod=false;this.shad=false;},
        cha:function(id){//console.log(id)
            this.ashod=true;this.shad=true;
            axioIn.get('/api/product/sertype/'+id+'/')
            .then((res)=>{
                //console.log(res);
                var aax=[];
                this.ser=res.data;
                //this.b3=res.data.cor_product;
                res.data.cor_product.map((n,index)=>{//console.log(index)
                        aax.push({name:n,ac:true})
                        aax[0].ac=false;
                    
                    })
                    //this.$set(this.ser,'cor_product',aax)
                    this.ser.cor_product=aax;
                    //console.log(JSON.stringify(this.ser))
                    //console.log(JSON.stringify(this.ser.cor_product))
            })
        },
        baob:function(id){
            let sero=this.ser;
            sero.pro_list=sero.cor_product.map(n=>n.name);
            sero.cor_product=[];
            axioIn.put('/api/product/sertype/'+id+'/',sero)
            .then((res)=>{
                alert('修改成功');
                this.ashod=false;this.shad=false;
                axioIn.get('/api/product/sertype/?page='+this.pageIndex)
                .then((res)=>{
                    this.popp=this.b2=res.data.results;
                    this.page=res.data.page_num.total_page;
                })
            }).catch((err)=>{this.ashod=false;this.shad=false;console.log(err)})
        },
        delet:function(id){
            let aa=confirm('确认删除？')
            if(aa===true){
                axioIn.delete('/api/product/sertype/'+id+'/')
                .then((res)=>{alert('删除成功')
                this.incrementTotal(this.pageIndex)
                })
            }
            else{return}
        },
        incrementTotal:function(q){
                q=(q===undefined?1:q);
                axioIn.get('/api/product/sertype/?page='+q)
                .then((res)=>{
                    this.popp=this.b2=res.data.results;
                    this.page=res.data.page_num.total_page;
                    this.pageIndex=q;
                })
        },
        tipp:function(){
          this.shad1=false;this.tip=false;
        }
    }

}
</script>
<style lang='scss' scoped>
@import '../assets/home';
.guan{
.ashod{width:560px;background-color:white;position:absolute;top:20%;left:30%;z-index:15;border:1px solid gray;border-radius:5px;}
.cha,.bian{width:20px;height:20px;display:inline-block;}
    .cha{background:url(../assets/bian1.png) no-repeat center;margin-right:20px;}
    .dele{background:url(../assets/dele.png) no-repeat center}
    .spp{display:block;width:100%}
    .pi{label{width:100px;display:inline-block;text-align:left}input{width:360px;display:inline-block;padding:6px 10px;}}
    .pio{margin:5px 0 5px 130px;text-align:left;select{padding:5px;option{padding:5px;}}}
    .clo{background:url(../assets/close.png) no-repeat;display:inline-block;width:11px;height:11px;position:absolute;top:20px;right:20px;}
}
</style>

