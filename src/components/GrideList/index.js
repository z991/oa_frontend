/* 节点统计 -------------------------------------*/
import axioIn from '../../store/axioIn';
let echarts = require('echarts/lib/echarts');
require('echarts/src/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');

// 分页
import Pagination from "../pagination";
import {mapGetters} from 'vuex';

export default {
    name: 'GrideList',
    components: { Pagination },
    data(){
        return {
            // 部署方式
            versionInfo: this.$store.state.versionInfo ||  window.sessionStorage.getItem('vertion'),
            // 日期限制设置
            pickerOptions: {
                disabledDate(time) {
                  return time.getTime() > Date.now();
                }
            },  
            // 时间
            dates: [
                {
                    value: new Date() - 3600 * 1000 * 24 * 2,
                    label: '近三天'
                }, {
                    value: new Date() - 3600 * 1000 * 24 * 6,
                    label: '近七天'
                }, {
                    value: new Date() - 3600 * 1000 * 24 * 29,
                    label: '近三十天',
                }
            ],
            data_type: "",
            // 日期
            time: "",
            // 部署方式
            deployment: [],
            deployment_type: "", 
            // 节点
            grid_list: [],
            grid_type: "",
            // 咨询量
            consult: 0,
            // 访客量
            visitors: 0,
            // 指标
            // targets: [{value: "0",label: '咨询量'}, {value: "1",label: '访客量'}],
            target: '咨询量',
            index: '', //选中指标
            // 已选节点
            grid_Selecteds: [],
            // 折线图
            trade: {
                tooltip: { trigger: 'axis',textStyle:{align:'left'},confine: true},
                legend: { data:['微信','QQ'], bottom: '0',selectedMode: false},
                grid: { left: '3%',right: '4%', bottom: '12%', containLabel: true},
                // dataZoom: [ {type: 'inside', realtime: true}],
                xAxis: { type: 'category', boundaryGap: false , data: []},
                yAxis: { type: 'value'},
                series: [
                    {
                        name:'微信',
                        type:'line',
                        stack: '微信',
                        data:[0, 0, 0],
                        smooth: true,
                        areaStyle : {}
                    },
                    {
                        name:'QQ',
                        type:'line',
                        stack: 'QQ',
                        data:[0, 0, 0],
                        smooth: true,
                        areaStyle : {}
                    }
                ],
                color:['#75b9ff','#00f0f1','#bc84ff','#ffb578','#97b553','#1E90FF','#0000CD','#00FF00','#DAA520','#FF8C00']
            },
            time_checked: false,
            // 表格数据
            tableData: [],
            // 排序规则
            rules: 0,
            // 页数
            page: 1,
            // 总数
            rowNum: '',
            // 页码
            pageIndex: 1,
            paginationShow: false,
            //echarts Dom
            myChart:'',
            chooseGrid: false
        }
    },
    created() {
        this.getInit(this.versionInfo);
        this.formInit(this.versionInfo)
    },
    mounted() {

        this.drawLine();

        /*
          * 动态get当前页面的宽度 驱使echarts 变化
          */
        window.addEventListener('resize',  ()=>{
            this.myChart.resize();
        })
    },
    methods: {
        // 提示
        buttonMessage(data, types, time) {
            this.$notify({
                title: '提示',
                message: data,
                position: 'top-right',
                type: types,
                duration: time,
            });
        },
        // 转换时间格式
        formatDate (date) {  
            var y = date.getFullYear();  
            var m = date.getMonth() + 1;  
            m = m < 10 ? ('0' + m) : m;  
            var d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            var h = date.getHours();  
            var minute = date.getMinutes();  
            minute = minute < 10 ? ('0' + minute) : minute; 
            var second= date.getSeconds();  
            second = minute < 10 ? ('0' + second) : second;  
            return  y + '-' + m + '-' + d                                        //统计到天
            // y + '-' + m + '-' + d +' '+ h +':' + minute + ':' + second;       //统计到时分秒
        }, 
        // 日期转换
        getDay(begin,end) {
            var dateAllArr = [];
            var ab = begin.split("-");
            var ae = end.split("-");
            var db = new Date();
            db.setUTCFullYear(ab[0], ab[1]-1, ab[2]);
            var de = new Date();
            de.setUTCFullYear(ae[0], ae[1]-1, ae[2]);
            var unixDb = db.getTime();
            var unixDe = de.getTime();
            for(var k = unixDb; k <= unixDe;){
                var day = this.formatDate(new Date(parseInt(k))).toString().replace(/-/g,'\/');
                dateAllArr.push(day)
                k = k + 24*60*60*1000;
            }
            return dateAllArr;
        },
        /*---------- 初始化数据------------------------------------------*/ 
        // 初始化数据
        getInit( type , datas) {
            let normal = new Date();
            normal.setDate(normal.getDate() - 2);
            let stateTime = this.formatDate(normal);
            let endTime = this.formatDate(new Date());
            this.time = [stateTime, endTime];
            this.trade.xAxis.data = this.getDay(stateTime,endTime);
            let args = {'start_date': stateTime , 'end_date' : endTime};
            let API = '';
            /*  经典版本0    重构版本1*/
            if(type === '1') {
              API = '/api/data/get_grid_data/'
            } else {
                API = '/api/data/jd_grid_data/'
            } 
            if(datas) {
                this.time = [datas.start_date, datas.end_date];
                this.trade.xAxis.data = this.getDay(datas.start_date,datas.end_date);
                args = {
                    'start_date': datas.start_date,
                    'end_date': datas.end_date,
                    'deploy': datas.deploy,
                    'index': datas.index
                };
                let arg = '';
                let _length = datas.grid.length - 1;
                if(datas.grid) {
                    API += '?'
                }
                datas.grid.forEach((item,index) => {
                    if(_length === index) {
                        let arg_end = 'grid=' + item.label;
                        arg += arg_end
                    }else {
                        let arg_other = 'grid=' + item.label + '&';
                        arg += arg_other
                    }
                })
                API += arg
            }
            axioIn.get(API, {params: args}).then((res) => {
                this.$store.commit('setLoading', false);
                // 部署方式
                if(!datas) {
                    this.deployment = res.data.deploy_list;
                    res.data.grid_list.forEach( (grid_list_val,grid_list_index) => {
                        this.grid_list.push({value: grid_list_index, label: grid_list_val})
                    })
                }
                //访客量
                this.visitors = res.data.visitors ? res.data.visitors : 0; 
                //咨询量
                this.consult = res.data.consult ? res.data.consult : 0; 
                // 图像更新
                if(res.data.broken_line.length){
                    this.trade.series = [];
                    this.trade.legend.data = [];
                    let colorArr = this.trade.color;
                    let line_shadow = res.data.broken_line.length > 3 ? false : true;
                    res.data.broken_line.map((item,index) => {
                        this.trade.series.push({
                            name: item.name,
                            data: item.data,
                            type:'line',
                            stack: item.name,
                            smooth: true,
                            connectNulls: true,
                            areaStyle: line_shadow ? {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                        offset: 0,
                                        color: colorArr[index]
                                    }, {
                                        offset: 1,
                                        color: '#fff'
                                    }])
                                }}
                                : null
                        });
                        this.trade.legend.data.push(item.name);
                    });
                }else {
                    this.trade.series = [{
                            name:'QQ',
                            type:'line',
                            stack: 'QQ',
                            smooth: true,
                            areaStyle : {},
                            data:[0, 0, 0]},
                        {
                            name:'微信',
                            type:'line',
                            stack: '微信',
                            smooth: true,
                            areaStyle : {},
                            data:[0, 0, 0]
                        }]
                    this.trade.legend.data = ['QQ','微信'];
                }
                this.drawLine();
            }).catch((err) => {
                this.$store.commit('setLoading', false);
                this.drawLine();
                this.buttonMessage(err,'error',1500);
            })
        },

        /*----------下拉选择改变  更新视图---------------------------------*/ 
        // 时间  选择
        changeTime(value) {
            let endTime = this.formatDate(new Date());
            let stateTime = this.formatDate(new Date(value));
            this.time = [stateTime,endTime];
            if(endTime === 'NaN-NaN-NaN' || endTime === "" || endTime === null || endTime === 'undefined') {
                return
            }else {
                this.updateData(stateTime,endTime, '' ,'' ,'' );
                // this.formInit(this.versionInfo, 0,this.deployment_type,true)
            }
        },
        // 日期  选择
        changeDate(obj) {
            if(obj){this.updateData(obj[0], obj[1], '' , '' , '')}
            // this.formInit(this.versionInfo,0,this.deployment_type,true)
        },
        // 部署方式  选择
        changeDeployment(val){
            this.updateData('' , '' ,  val, '' ,'' );
            // this.formInit(this.versionInfo,0,val,true);
        },
        // 节点  选择
        changeGrid(val) {
            
            if(this.grid_Selecteds.length >= 6){
                return this.buttonMessage('最多选六项','error',1500)
            }else {
              this.chooseGrid = true;
                // 已选渠道筛选
                this.grid_list.forEach((item) => {
                    if(item.value === val) {
                        let secStr = JSON.stringify(this.grid_Selecteds);
                        if(secStr.indexOf(item.label) != -1){
                            return this.buttonMessage('选择重复','warning',1500)
                        }else {
                            this.grid_Selecteds.push({label: item.label, value: item.value});
                        }
                    }
                });
            }
            this.updateData('' , '' , '', this.grid_Selecteds , '' );
            this.formInit(this.versionInfo,0,this.deployment_type,true);
        },
        // 指标  选择
        changeIndex(target) {
            this.target = target;
            if(target === '咨询量') {
                this.index = "0";
            }else {
                this.index = "1";
            };
            this.trade.series[0].name = target;
            this.updateData('' , '' , '', '' ,  this.index)
        },

        // 更新数据视图
        updateData(start_date, end_date, deploy, grid ,index) {
            let datas = {
                'start_date': start_date ? start_date : this.time[0],
                'end_date': end_date ? end_date : this.time[1],
                'deploy': deploy ? deploy : this.deployment_type,
                'grid': grid ? grid : this.grid_Selecteds,
                'index': index ? index : 0
            };
            this.getInit(this.versionInfo, datas);
        },
        // 实例饼图  实例折线图
        drawLine() {
            this.myChart = echarts.init(document.getElementById('myChart'));
            this.myChart.setOption(this.trade, true);
        },
        // 删除 已选节点
        handleClose(tag) {
            this.grid_type = "";
            this.grid_Selecteds = this.grid_Selecteds.filter(item => {
                return item.label != tag.label
            })
            if(this.grid_Selecteds.length === 0) {
              this.chooseGrid = false;
              this.updateData()
            }else {
              this.chooseGrid = true;
              this.updateData( '' , '' ,this.grid_Selecteds,'' ,'' , '')
            }
            this.formInit(this.versionInfo,0,this.deployment_type,true);
        },

        // 按时/按日  选择
        changeAccountType(type) {
            this.time_checked = type;
        },

        /* 表格数据
        *versionInfo 服务方式（经典/重构）
        * type      排序方式 
        * deploy    部署方式
        * ment      是否更新排序
        * */
        formInit(versionInfo,type='',deploy,ment) {
            // let normal = new Date();
            // normal.setDate(normal.getDate() - 2);
            // let stateTime = this.formatDate(normal);
            // let endTime = this.formatDate(new Date());
            // let args = {'start_date': stateTime , 'end_date' : endTime};
            // if(ment) {
            //     args = {
            //         'start_date' : this.time[0],
            //         'end_date': this.time[1],
            //         'deploy': deploy,
            //         'rules': type
            //     }
            // }
            let API = '',str = '';
            if(versionInfo === '1'){
              API = '/api/data/get_form_data/?page=1&rules=' + type
            }else {
              API = '/api/data/jd_grid_form/?page=1&rules=' + type
            }
            if(this.grid_Selecteds.length !== 0){
              this.grid_Selecteds.map(n=>{
                str += `&grid=${n.label}`
              })
              API += str;
            }
            // axioIn.get(API, {params: args}).then((res) => {
            axioIn.get(API).then((res) => {
                if(res.data.data.length<10){
                    this.paginationShow = false;
                }else {
                    this.paginationShow = true;
                }
                this.tableData = res.data.data.map(item => {
                    return {
                        grid:item.grid,
                        index:item.index,
                        proportion: item.proportion.toFixed(2) + '%',
                        value:item.value,
                        company_id: item.company_id
                    }
                });
                this.page = res.data.total_page;
                this.rowNum = res.data.total_count;
                this.pageIndex = 1;
            })
        },
        // 表格排序
        /* type 排序类型
        *  0    升序
        *  1    降序
        */
        sortChange(obj) {
            let type = "";
            if(obj.order === "descending" || obj.order === null) {
                type = 1; //降序 descending
            }else if(obj.order === "ascending") {
                type = 0; //升序 ascending
            };
            this.formInit(this.versionInfo,type,this.deployment_type,true)
        },
        // 分页切换
        incrementTotal(val) {
            let API = "",str = '';
            if(this.versionInfo === '1' ) {
              API  = '/api/data/get_form_data/?page=' + val;
            } else {
              API = '/api/data/jd_grid_form/?page=' + val;
            }
            if(this.grid_Selecteds.length !== 0){
              this.grid_Selecteds.map(n=>{
                str += `&grid=${n.label}`
              })
              API += str;
            }
            this.pageIndex = val;
            axioIn.get(API).then((res) => {
                this.tableData = res.data.data.map(item => {
                    return {
                        grid:item.grid,
                        index:item.index,
                        proportion: item.proportion.toFixed(2) + '%',
                        value:item.value,
                        company_id: item.company_id
                    }
                });
                this.page = res.data.total_page;
                this.rowNum = res.data.total_count;
            })
        },
        exportGride () {//导出
          let version_type = this.$store.state.versionInfo || window.sessionStorage.getItem('vertion');
          if(!version_type)version_type = 0;
          window.open(`/api/data/channel_data/derive_grid/?start_date=${this.time[0]}&end_date=${this.time[1]}&version=${version_type}&deploy=${this.deployment_type}&grid=${this.grid_Selecteds}`)
        }
    },
    computed: {
        ...mapGetters({
            version_type: 'getVersion'
        }),
    },
    
    watch: {
        version_type (val) {
            this.versionInfo = val;
            this.getInit(this.versionInfo);
            this.formInit(this.versionInfo);
            this.deployment_type = "";
            this.grid_type = "";
            this.index = "";
            this.grid_Selecteds = [];
            this.deployment = [];
            this.grid_list = [];
        }
    }
}
