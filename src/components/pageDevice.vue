<template>
  <div class="pagination">
      <ul class='uli'>
          <!-- <li style="width:200px;border:none">共{{chain}}条</li> -->
          <li><a href="javascript:void(0)" @click='pre()'><</a></li>
          <li  class='ull' style='border:none;width:15px;' v-show='shen0'><a href="javascript:void(0)">···</a></li>
          <li class='ul' :style="{width:aap+'px'}">
              <ul >
                  <transition-group name="list" tag="ul">
                  <li v-for='item in items' :class="{active:index==item}" :key='item' class="list-item">
                      <a href="javascript:void(0)" @click='go(item)' >{{item}}</a><!--:class="{active:index==item}"-->  
                  </li>
                  <!--p v-show='shen'><a href="javascript:void(0)">……</a></p-->
                  </transition-group>
              </ul>
          </li>
          <li style='border:none;width:15px;' v-show='shen1'><a  href="javascript:void(0)" >···</a></li>
          <li v-show='shen2'><a  href="javascript:void(0)"  @click='go(shen)'>{{shen}}</a></li>
          <li><a href="javascript:void(0)" @click='next()'>></a></li>
          <!-- <li class='sure'><span>Goto</span><input  v-model.number='pag' type="text"><a href="javascript:void(0)" @click='gotoo(pag)'>确定</a></li> -->
          <!--li style='width:200px;border:none;'>共{{number}}页</li-->
      </ul>
  </div>
</template>
<script>
export default {
    name:'pagination',
    props:[
        'number','pageIndex','chain'],
    data:function(){
        return {
            shen:'',
            shen0:false,
            shen1:false,
            shen2:false,
            pag:'',
            perPages:1,
            item:'1',
            isActive:'false',
            aap:'',//ul的宽度
            index:this.pageIndex,//当前页码
        }
    },
    
    computed : {
        items () {
            const array = []
            const perPages = this.perPages
            const pageCount = this.number
            let current = this.index
            const _offset = (perPages - 1) / 2
''
            
            const offset = {
                start : current - _offset,
                end   : current + _offset
            }

            //-1, 3
            if (offset.start < 1) {
                offset.end = offset.end + (1 - offset.start)
                offset.start = 1
            }
            if (offset.end > pageCount) {
                offset.start = offset.start - (offset.end - pageCount)
                offset.end = pageCount
            }
            if (offset.start < 1) offset.start = 1

            this.showPrevMore = (offset.start > 1)
            this.showNextMore = (offset.end < pageCount)

            for (let i = offset.start; i <= offset.end; i++) {
                array.push(i)
            }

            return array
        }
    },
    watch:{
        number(val){
            if(this.number>=5){this.perPages=5;this.aap=104;this.shen=this.number;this.shen1=true;this.shen2=true;}
            //else if(this.number===5){this.perPages=5;this.aap=260;this.shen1=false;this.shen2=false;this.shen0=false}
            //else if(this.number===6){this.perPages=5;this.aap=260;this.shen=this.number;this.shen1=false;this.shen2=true;}
            else {this.perPages=this.number;this.shen1=false;this.shen2=false;this.shen0=false}
            if(this.number==1){this.aap=26;}
            else if(this.number==2){this.aap=54;}
            else if(this.number==3){this.aap=80;}
            else if(this.number==4){this.aap=106;}
            //else if(this.number>=5){this.aap=260;}
            //else if(this.number>=4){this.aap=208;}
        },
        pageIndex(val) {
            this.index = val || 1;
            if(this.number<=5){this.shen1=false;this.shen2=false;this.shen0=false}
            else if(this.index>=this.number-2&&this.number>5){this.shen1=false;this.shen2=false;this.shen0=true}
            else if(this.index<this.number-2&&this.index>3){this.shen1=true;this.shen2=true;this.shen0=true}
            else if(this.index<this.number-2&&this.index<=3){this.shen1=true;this.shen2=true;this.shen0=false}
        }
    },
    methods:{
        pre:function(){
            if (this.index > 1) {
                this.go(this.index - 1)
            }
        },
        next:function(){
            if (this.index < this.number) {
                this.go(this.index + 1)
            }
        },
        go:function(item){
            if(this.index!==item){
                this.index=item;
            this.$emit('increment',this.index);}
            },
        gotoo:function(pag){
            if(pag>0&&pag<this.number+1){this.go(pag)}
            else{alert('超过页码范围')}
        }
    },
  
}
</script>
<style lang='scss' scoped>
.pagination{height:20px;background-color:white;position: relative;margin:2px 0 0 0;
.uli{height:60px;position: absolute;right:20px;}
    ul li{list-style:none;float:left;width:20px;height:18px;line-height:18px;text-align:center;border-radius:5px;
    a{display:inline-block;width:100%;height:100%;color:#615e60;}}
    .ul{border:0;margin-right:0px;}
    .ul ul li{margin-left:0px;margin-top:0;}
    input{float:left;width:60px;height:35px;border:1px solid #ccc;border-radius:5px;margin:0 15px;padding-left:10px;}
    .sure{width:190px;border:none;margin-right:0;
    span{float:left}
    a{width:50px;height:35px;border:1px solid #ccc;border-radius:5px;float:left;}}
}
.active{
    border:1px solid #147ad5;a{color:#147ad5!important}	}
    // background-color:#147ad5;a{color:white!important}}
    .list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-item {
  display: inline-block;
  //margin-right: 10px;
}
.list-enter, .list-leave-to{
  opacity: 0;
  transform: translateY(30px);
}
</style>


