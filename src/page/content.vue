<template>
  <div class="content">
    <div class="header">
      <img src="../assets/logo1.png" alt="xx">
      <ul class="list">
        <li v-for='aa in aaa' :key='aa.id' @mouseenter='enter(aa.name)'>
          <router-link :to="aa.link">{{aa.name}}</router-link>
        </li>
      </ul>
      <span class="pn">{{pname}}</span>

    </div>
    <div v-show='oo' class="sho sho1" @mouseleave='out()'>
      <ul>
        <li v-for='bb in bbb' :key='bb.id' @mouseenter='enter(bb.name)'>
          <router-link :to="bb.link">{{bb.name}}</router-link>
        </li>
      </ul>
    </div>
    <div v-show='o1' class="sho sho2">
      <ul class="" @mouseleave='out()'>
        <li v-for='cc in ccc' :key='cc.id'>
          <router-link :to="cc.link">{{cc.name}}</router-link>
        </li>
      </ul>
    </div>
    <div v-show='o2' class="sho sho3" @mouseleave='out()'>
      <ul class="">
        <li v-for='dd in ddd' :key='dd.id'>
          <router-link :to="dd.link">{{dd.name}}</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
  import Vue from 'vue'
  import Shade from '../components/shade'

  export default {
    name: 'content',
    data: function () {

      return {
        oo: false,
        o1: false,
        o2: false,
        oo1: false,
        show: false,
        pname: 'xx',
        aaa: [
          // {name: '客户管理', link: '/ke'},
          {name: '订单管理', link: '/ding'},
          {name: '工单管理', link: '/gong'},
          {name: '产品管理', link: ''},
          {name: '数据管理', link: '/shu'},
          {name: '权限和人员管理', link: ''},
          {name: '日志', link: '/ri'},
          {name: '通知', link: '/tong'},
          {name: '设置', link: '/she'}
        ],
        bbb: [
          {name: '运维配置', link: '/chanp'}, {name: '产品配置', link: 'chanp'}, {name: '产品池', link: '/chanw'}
        ],
        ccc: [
          {name: '角色权限', link: '/jiao'}, {name: '组织架构', link: '/zu'}, {name: '人员配置', link: 'ren'}
        ],
        ddd: [{name: '服务器', link: 'chanpf'}, {name: '服务组', link: 'chanps'}, {name: '节点', link: '/chanw'}]
      }
    },
    components: {Shade},
    created () {
      //this.$set(this.aaa[3],'isshow',true)

    },
    methods: {
      enter: function (aa) {
        if (aa === '产品管理') {
          this.oo = true
        }
        else if (aa === '权限和人员管理') {
          this.o1 = true
        }
        else if (aa === '运维配置') {
          this.o2 = true
        }
      },

      out: function () {
        this.oo = false
        this.o1 = false
        this.o2 = false
      },
    }

  }
</script>
<style lang='scss'>
  @import '../assets/home';

  .content {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .header {
    height: 72px;
    background-color: #515c6e;
    width: 100%;
    img {
      margin: 20px 252px 0 44px;
    }

    .list li {
      height: 72px;
      line-height: 72px;
      padding: 0 15px;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .pn {
      position: absolute;
      top: 20px;
      right: 40px;
      background: url(../assets/la.png) no-repeat right;
      width: 80px;
      height: 30px;
      line-height: 30px;
    }
    .list li:hover {
      background-color: #0386f0;
      cursor: pointer;
      a {
        color: black;
      }
    }

    img, .list, .list li, span {
      float: left;
    }
  }

  .sho {
    width: 180px;
    height: 112px;
    background-color: #515c6e;
    border-radius: 5px;
    color: white;
    margin-top: 10px;
    ul {
      padding-top: 10px;
    }
    li {
      height: 30px;
      width: 100%;
      line-height: 30px;
      a {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    li:hover {
      background-color: #7b8391;
    }
  }

  .sho1, .sho2, .sho3 {
    position: absolute;
  }

  .sho1 {
    left: 673px;
  }

  .sho2 {
    left: 862px;
  }

  .sho3 {
    left: 853px;
    margin-left: 5px;
  }


</style>


