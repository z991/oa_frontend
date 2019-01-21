<template>
    <div class="staff">
        <div class="btn_right"><el-button type="primary" @click="backList">返回列表页面</el-button></div>
        
        <el-transfer
            style="text-align: left; display: inline-block"
            v-model="hadLimit"
            filterable
            :left-default-checked="[]"
            :right-default-checked="[]"
            :render-content="renderFunc"
            :titles="['人员列表', '已有权限']"
            :format="{
                noChecked: '${total}',
                hasChecked: '${checked}/${total}'
            }"
            @change="handleChange"
            :data="rolesgroup">
            <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
        </el-transfer>
    </div>
</template>
<script>
import axioIn from '../store/axioIn'
import Shade from './shade';
import Router from "../router/index";
export default {
    name: 'staffLimit',
    data() {
      return {
        id: '',
        name: '',
        rolesgroup: [],
        value3: [1],
        hadLimit: [],
        permissions: null,
        renderFunc(h, option) {
          return <span>{ option.key } - { option.label }</span>;
        }
      };
    },

    methods: {
      handleChange(value, direction, movedKeys) {
          const arr = [];
          this.rolesgroup.map(n=>{
              value.map(m=>{
                  if(m == n.key){
                      arr.push({id:n.id});
                  }
              })
          })
          const obj = {name: this.name,own_user:arr,permissions: this.permissions,id: this.id}
          axioIn.put(`/permission/groups/${this.id}/`,obj).then(res=>{
            this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
            });
          })
      },
      backList () {
          Router.push({path: '/jiao'})
      },
      filterSpilt (all,part) {
          all.map((item,i)=>{
              part.map((num,n)=>{
                  if(num.id === item.id){
                      this.hadLimit.push(item.key)
                  }
              })
          })
      }
    },
    created () {
        // const loading = this.$loading({
        //     lock: true,
        //     text: '正在加载数据',
        //     spinner: 'el-icon-loading',
        //     background: 'rgba(0, 0, 0, 0.7)'
        // });
        this.id = this.$route.query.id;this.name = this.$route.query.name;
        axioIn.get('/permission/groups/'+this.id+'/').then((res)=>{
            this.permissions = res.data.permissions;
        })
        axioIn.get('/permission/groups/get_user/?role_id='+this.id).then(res=>{
            const haveArr = [],allArr = [];
            res.data.right_list.map((item,i)=>{
                haveArr.push({
                    key: i,
                    label: item.last_name,
                    id: item.id
                })
            })
            const allLimit  = res.data.left_list.concat(res.data.right_list);
            allLimit.map((num,n)=>{
                allArr.push({
                    key: n,
                    label: num.last_name,
                    id: num.id
                })
            })
            this.rolesgroup = allArr;
            this.filterSpilt(allArr,haveArr)
        })
    }
}
</script>
<style>
.staff .el-transfer-panel{
  width: 500px;
  height: 500px;
}
.staff .el-transfer-panel__body{
  height: calc(100% - 40px);
  width: 105%;
}
.staff .el-transfer-panel__filter {
  margin-right: 8%;
}
.staff .el-transfer-panel__list.is-filterable {
  height: calc(100% - 50px);
}

@media screen and (min-width: 1400px) {
    .staff .el-transfer-panel{
        width: 500px;
        height: 500px;
    }
}
@media screen and (min-width: 1300px) and (max-width: 1399px) {
    .staff .el-transfer-panel{
        width: 460px;
        height: 500px;
    }
}
@media screen and (min-width: 1200px) and (max-width: 1299px) {
    .staff .el-transfer-panel{
        width: 420px;
        height: 500px;
    }
}
@media screen and (min-width: 1000px) and (max-width: 1199px) {
    .staff .el-transfer-panel{
        width: 320px;
        height: 500px;
    }
}
@media screen and (min-width: 768px) and (max-width: 1000px) {
    .staff .el-transfer-panel{
        width: 250px;
        height: 500px;
    }
}

.btn_right{
    height: 40px;
    width: 100%;
    margin: 20px auto;
    
}
.btn_right button {
    float: right;
    margin-right: 10%;
}
</style>
