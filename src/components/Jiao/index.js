import Shade from '../shade';
import Pagination from '../pagination';
import axioIn from '../../store/axioIn'
import Router from "../../router/index";
export default {
  name:'jiao',
  components:{Shade,Pagination},
  data:function(){
      return {
          messs:'',
          checkedNames:[false,false],
          tabs:false,
          tabb:false,
          adisable:false,
          shad:false,
          qu:false,
          se_name:'',
          zeng:false,
          gett:'',
          geid:0,
          getti:{auth:{
                        group:{view:0,delete:0,modify:0},
                        structure:{view:0,delete:0,modify:0},
                        user:{view:0,delete:0,modify:0},
                        view:0
                        },
                 production_manage:{
                     pro:{view:0,delete:0,modify:0},
                     ops:{view:0,delete:0,modify:0},
                     view:0
                     },
                 workorder_manage:{
                     openstationmanage:{view:0,delete:0,modify:0},
                     view:0
                 },
                 data_manage:{
                     overview:{view:0,delete:0,modify:0},
                     prod_oper:{view:0,delete:0,modify:0},
                     data_ops:{view:0,delete:0,modify:0},
                     view:0
                 },
                 log:{
                     'personal-log':{view:0,delete:0,modify:0},
                     'system-log':{view:0,delete:0,modify:0},
                     view:0
                 },
                 setup:{
                     'help_center':{view:0,delete:0,modify:0},
                     'industry':{view:0,delete:0,modify:0},
                     view:0
                 }
           },
          msn:'',
          img:require('../../assets/clo.png'),
          imgg:[require('../../assets/clo.png'),require('../../assets/open.png')],
          ddds:[],
          aa:[
              {name:'工单管理',id:'workorder_manage',tice:true,quan:false,isActive:false,sho:false,
                children:[
                    {name:'开站管理',id:'openstationmanage',isActive:false}
                ]
              },
              {name:'产品管理',id:'production_manage',tice:true,quan:false,sho:false,isActive:false,
              children:[
                  {name:'运维配置',id:'ops',isActive:false},
                  {name:'产品配置',id:'pro',isActive:false},
                  
              ]},
              {name:'数据管理',id:'data_manage',tice:true,sho:false,quan:false,isActive:false,
                  children:[
                    {name:'总览',id:'overview',isActive:false},
                    {name:'产品和运营统计',id:'prod_oper',isActive:false},
                    {name:'运维统计',id:'data_ops',isActive:false}
                ]
              },
              {name:'权限和人员管理',id:'auth',tice:true,sho:false,quan:false,isActive:false,
                children:[
                    {name:'角色权限',id:'group',isActive:false},
                    {name:'组织架构',id:'structure',isActive:false},
                    {name:'人员配置',id:'user',isActive:false}
                ]
              },
              {name:'日志',id:'log',tice:true,quan:false,isActive:false,sho:false,
                children:[
                    {name:'个人日志',id:'personal-log',isActive:false},
                    {name:'系统日志',id:'system-log',isActive:false}
                ]
              },
              {name:'设置',id:'setup',tice:true,quan:false,isActive:false,sho:false,
                children:[
                    {name:'客户行业设置',id:'industry',isActive:false},
                    {name:'帮助中心设置',id:'help_center',isActive:false}
                ]
              }
          ],
          items:[
              {id:'11r',name:'eee',own_user_count:'srs',sho:false},
          ],
          page:'',
          rowNum: '',
          popp:'',
          pageIndex:1,
          shad1:false,
          tip:false,
          search_open:'',
          authority:false
      }
  },
  created:function(){
   this.$checkCookie();
  },
  methods:{
      qie:function(a){ //开关
          if(this.msn!=='查看'){
                if(this.tabb===false){this.img=require('../../assets/open.png');this.tabb=true;}
                else {this.img=require('../../assets/clo.png');this.tabb=false};
          }
            if(this.msn==='新增'){
                let aaio=this.ddd();
                if( aaio.length==2){
                    this.getti[aaio[0]][aaio[1]].view=Number(this.tabb);//console.log(this.getti[aaio[0]][aaio[1]].view);
                }
                else if(aaio.length==1){this.getti[aaio].view=Number(this.tabb);//console.log(this.getti[aaio].view)
                }
            }
            if(this.msn==='修改'){
                let aaio=this.ddd();
                if( aaio.length==2){
                    this.gett[aaio[0]][aaio[1]].view=Number(this.tabb);//console.log(this.gett[aaio[0]][aaio[1]].view);
                }
                else if(aaio.length==1){this.gett[aaio].view=Number(this.tabb);}
            }
            },
      add:function(){ //新增
          Router.push({ path: "/newj" });
        },
      search:function(){ // 搜索
          this.search_open=true;
          axioIn.get('/permission/groups/?group_name='+this.messs)
          .then((res)=>{
              if(res.data.length==0){alert('未搜到相关信息')}
                 else{this.popp=this.items =res.data.results;
                      this.page=res.data.page_num.total_page;
                      this.rowNum = res.data.page_num.total_count;}
          })
      },
      close:function(){this.shad=false;this.zeng=false;this.tabs=false;},
      cha:function(id){ //查看
          this.shad=true;this.zeng=true;this.tabs=true;this.qu=false;this.msn='查看';this.adisable=true;
          //if(this.gett===''){
           this.aa.forEach((arg)=>{
              arg.isActive=false;arg.quan=false;
              if(arg.children!==undefined){arg.children.forEach((bb)=>{bb.isActive=false})}
          });
          this.img=require('../../assets/clo.png');this.tabb=false;
          this.checkedNames=[false,false];
          axioIn.get('/permission/groups/'+id+'/')
            .then((res) => {
                if(typeof res.data.permissions === 'string'){
                    res.data.permissions=JSON.parse(res.data.permissions)
                }//console.log(res.data.permissions)
                this.ddds=res.data.own_user;//console.log(JSON.stringify(this.ddds))
                this.se_name=res.data.name;
                //console.log(typeof res.data.permissions);
                this.gett=res.data.permissions;//console.log(this.gett.auth.view);
                for( let n in this.gett){console.log(this.gett[n].view)
                    if(this.gett[n].view>0){
                        this.aa.map(v=>{
                            if(v.id===n){v.quan=true}
                        })
                    }else{continue}
                }
                })
          //console.log(res.data)
            .catch((err)=> console.log(err));//}
          },
      revise:function(id){ //编辑
            Router.push({ path: "/newj",query:{id:id} });
         },
      mess:function(){//重置
          this.messs='';this.search_open=false;
          axioIn.get('/permission/groups/ ')
          .then((res) => {
              this.popp=this.items =res.data.results;
              this.page=res.data.page_num.total_page;
              this.rowNum = res.data.page_num.total_count;
              this.pageIndex=1;
          })
        },
      xiu:function(){ //保存
          let aa={};
          if(this.se_name===''||this.se_name===undefined){this.shad1=true;this.tip=true;}
          else{
                if(this.msn==='新增'){
                    aa.name=this.se_name;
                    aa.permissions=this.getti;
                    console.log(JSON.stringify(this.getti))
                    axioIn.post('/permission/groups/',aa)
                    .then((res)=>{
                        alert('增加成功');
                        this.shad=false;this.zeng=false;
                        axioIn.get('/permission/groups/')
                        .then((res) => {
                        this.popp=this.items =res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                         this.search_open=false;
                    }).catch((err)=> {this.shad=false;this.zeng=false;alert(err.response.data.name[0])});
                    
                })}
                if(this.msn==='修改'){
                    aa.name=this.se_name;
                    aa.permissions=this.gett;console.log(JSON.stringify(aa))
                    axioIn.put('/permission/groups/'+this.geid+'/',aa)
                    .then((res)=>{
                        alert('修改成功');
                        this.shad=false;this.zeng=false;
                        if(this.search_open===false){
            axioIn.get('/permission/groups/?page='+this.pageIndex)
                    .then((res) => {
                        this.items = res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                    })
                    .catch((err)=> {console.log(err)}) 
         }
         else{
             axioIn.get('/permission/groups/?group_name='+this.messs+'&page=1')
                    .then((res) => {
                        this.items = res.data.results;
                        this.page=res.data.page_num.total_page;
                        this.rowNum = res.data.page_num.total_count;
                    })
                    .catch((err)=> {console.log(err)}) 
         }
                    })
                    .catch((err)=> {this.shad=false;this.zeng=false;console.log(err)}) 
                    //console.log(JSON.stringify(this.gett))
                }
          }
      },
      nop:function(index,name,a){//开放权限下的数据
          this.authority=false;
          this.aa.forEach((arg)=>{arg.isActive=false;
            if(arg.children!==undefined){arg.children.forEach((bb)=>{bb.isActive=false})}
             });
          this.aa[index].isActive=true;this.checkedNames=[false,false];this.tabb=false;this.img=require('../../assets/clo.png');
          this.checkedNames=[false,false]
          if(name==='产品管理'||name==='权限和人员管理'||name==='工单管理'||name==='日志'||name==='数据管理'||name==='设置'){this.aa[index].sho=!this.aa[index].sho}
          if(this.msn==='新增'){
              if(this.getti[a].view>0){this.tabb=true;this.img=require('../../assets/open.png');}
                else{this.tabb=false;this.img=require('../../assets/clo.png');}
          }
           else{
                if(this.gett[a].view>0){this.tabb=true;this.img=require('../../assets/open.png');}
                else{this.tabb=false;this.img=require('../../assets/clo.png');}
                }
          },
      nopp:function(index,i,id,id1){  console.log(this.checkedNames) 
          this.authority=true;
          this.aa.forEach((arg)=>{
              arg.isActive=false;
              if(arg.children!==undefined){arg.children.forEach((bb)=>{bb.isActive=false})}
              });
            this.aa[index].children[i].isActive=true;this.tabb=false;this.img=require('../../assets/clo.png');
            this.checkedNames=[false,false]
            
            if(this.msn==='新增'){
              if(this.getti[id][id1].view>0){this.tabb=true;this.img=require('../../assets/open.png');}
                   else{this.tabb=false;this.img=require('../../assets/clo.png');}
              this.checkedNames=[this.filte('modify',this.getti[id][id1]),this.filte('delete',this.getti[id][id1])];
              //console.log(this.checkedNames)
            this.getti[id][id1].modify=Number(this.checkedNames[0]);
            this.getti[id][id1].delete=Number(this.checkedNames[1]);
          }else{
              if(this.gett[id][id1].view>0){this.tabb=true;this.img=require('../../assets/open.png');}
                   else{this.tabb=false;this.img=require('../../assets/clo.png');}
              this.checkedNames=[this.filte('modify',this.gett[id][id1]),this.filte('delete',this.gett[id][id1])];
              //console.log(this.checkedNames)
            this.gett[id][id1].modify=Number(this.checkedNames[0]);
            this.gett[id][id1].delete=Number(this.checkedNames[1]);
          }
      },
      ddd:function(){
          let bbi=[];
         this.aa.forEach((arg)=>{
             if(arg.isActive===true){ bbi=[arg.id];return bbi}
             if(arg.children!==undefined){
                 arg.children.forEach((bb)=>{
                     if(bb.isActive===true){ bbi=[arg.id,bb.id];return bbi}
                 });
                 return bbi
             }  
         })
         return bbi
     },
      filte:function(obj,Obj){//返回Obj[obj]的值
          for(let value in Obj){
             if(value===obj){return Obj[value]  }
              else if(typeof Obj[value]=="object"){
                 return this.filte(obj,Obj[value])
              }
          }
     },
     
     ck:function(aia,aib){
         //aia=!aia;
         let aai=this.ddd();
         if(this.msn==='新增'&&aai.length===2){
             if(aib=='0'){//console.log(this.checkedNames)
                 this.$set(this.getti[aai[0]][aai[1]],'modify',Number(this.checkedNames[0]))
             }
             if(aib=='1'){
                 this.$set(this.getti[aai[0]][aai[1]],'delete',Number(this.checkedNames[1]))
                 }
         }
         if(this.msn==='修改'&&aai.length===2){
             if(aib=='0'){
                 this.$set(this.gett[aai[0]][aai[1]],'modify',Number(this.checkedNames[0]))
                 }
             if(aib=='1'){ 
                 this.$set(this.gett[aai[0]][aai[1]],'delete',Number(this.checkedNames[1]))
                 }
         }         
     },
     incrementTotal:function(q){
         q=(q===undefined?1:q);
         if(this.search_open===false){
            axioIn.get('/permission/groups/?page='+q)
                    .then((res) => {
                        this.items = res.data.results;
                        this.pageIndex=q;
                    })
                    .catch((err)=> console.log(err)) 
         }
         else{
             axioIn.get('/permission/groups/?group_name='+this.messs+'&page='+q)
                    .then((res) => {
                        this.items = res.data.results;
                        this.pageIndex=q;
                    })
                    .catch((err)=> console.log(err)) 
         }
      },
      tipp:function(){
          this.shad1=false;this.tip=false;
      },
      deleRole (id) { // 删除角色
        this.$confirm('此操作将删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axioIn.delete('/permission/groups/'+id+'/').then(res=>{
            this.getRolelist()
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      staffContain (id,name) {
          Router.push({ path: "/staffLimit",query: {id: id,name:name} });
      },
      getRolelist () {
        axioIn.get('/permission/groups/')
        .then((res) => {
                this.popp=this.items =res.data.results;
                this.page=res.data.page_num.total_page;
                this.rowNum = res.data.page_num.total_count;
                this.$store.commit('setLoading', false)
            })
        .catch((err)=> {
            console.log(err);
            this.$store.commit('setLoading', false)
        });
        this.search_open=false;
      }
  },
  mounted:function(){
    this.getRolelist()
  },
  
}
