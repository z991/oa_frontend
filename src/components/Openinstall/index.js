/* 渠道统计 -------------------------------------*/
import axioIn from '../../store/axioIn';
let echarts = require('echarts/lib/echarts');
require('echarts/src/chart/pie');
require('echarts/src/chart/line');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/legend');

import {mapGetters} from 'vuex';

export default {
    name: 'Openinstall',
    data() {
      return {
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
        time: "",
        // 站点行业
        industry: [],
        industry_type: '',
        // 部署方式
        deployment: [],
        deployment_type: "",
        // 渠道
        channel: [],
        channel_type: "",
        channel_lsit: [],
        // 咨询量
        consult: 0,
        // 访客量
        visitors: 0,
        // 饼图
        trade: {
            tooltip: { trigger: 'item',formatter: "{a} <br/>{b}: {c} ({d}%)"},
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['50%', '70%'],
                    // center : ['50%', '50%'],
                    // avoidLabelOverlap: false,
                    label: {formatter: '{b}: {d}%',color: "#999999"},
                    data:[{
                            "name": "IOS App",
                            "value": 0
                        },{
                            "name": "web",
                            "value": 0
                        },{
                            "name": "wechat",
                            "value": 0
                        },{
                            "name": "未知",
                            "value": 0
                        }
                    ],
                    color:['#feb477','#1aa8fe','#00cbca','#b896e2','#ffb981','#8d99b3','#f38468','#726deb','#97b553','#FF8C00'],
                }
            ]
        },
        // 指标
        // targets: [{value: 0,label: '咨询量'}, {value: 1,label: '访客量'}],
        target: '咨询量',
        index: '',
        // 已选渠道
        channelSelecteds: [], 
        time_checked: false,
        // 折线图 
        trade2: {
            tooltip: { trigger: 'axis',textStyle:{align:'left'},confine: true},
            legend: { data:['QQ','微信'], bottom: '0',selectedMode: false,type:'scroll'},
            grid: { left: '3%',right: '4%', bottom: '15%', containLabel: true},
            xAxis: { type: 'category', boundaryGap: true, data: []},
            yAxis: { type: 'value'},
            series: [
                {
                    name:'QQ',
                    type:'line',
                    stack: 'QQ',
                    smooth: true,
                    // areaStyle : {},
                    data:[0, 0, 0]  
                },
                {
                    name:'微信',
                    type:'line',
                    stack: '微信',
                    smooth: true,
                    // areaStyle : {},
                    data:[0, 0, 0]
                },
            ],
            color:['#75b9ff','#00f0f1','#bc84ff','#ffb578','#97b553','#1E90FF','#0000CD','#00FF00','#DAA520','#FF8C00']
        },
        // 表格数据
        tableData: [
            {
                'channel': 'QQ',
                'consult': 0,
                'visitors': 0
            },
            {
                'channel': '微信',
                'consult': 0,
                'visitors': 0
            },
            {
                'channel': 'APP',
                'consult': 0,
                'visitors': 0
            }
        ],
          myChart:"",
          myChartTwo:"",
      };
    },
    created() {
        this.getInit(this.versionInfo);
        this.getIndustry();
    },
    mounted() {


        this.drawLine()

        /*
        * 动态get当前页面的宽度 驱使echarts 变化
        */
        window.addEventListener('resize',  ()=>{
            this.myChart.resize();
            this.myChartTwo.resize();
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
        /*---------- 初始化数据---------------*/ 
        // 初始化数据
        getInit( type , datas) {
            let normal = new Date();
            normal.setDate(normal.getDate() - 2);
            let stateTime = this.formatDate(normal);
            let endTime = this.formatDate(new Date());
            this.time = [stateTime,endTime];
            this.trade2.xAxis.data = this.getDay(stateTime,endTime);
            let args = {'start_date': stateTime , 'end_date' : endTime};
            let API = '';
            /*  经典版本0    重构版本1*/
            if(type === '1') {
              API = '/api/data/get_channel_data/'
            } else {
              API = '/api/data/channel_data/get_channel/'
            }
            if(datas) {
                this.time = [datas.start_date,datas.end_date];
                this.trade2.xAxis.data = this.getDay(datas.start_date,datas.end_date);
                args = {
                    'start_date': datas.start_date,
                    'end_date': datas.end_date,
                    'industry': datas.industry,
                    'deploy': datas.deploy,
                    'index': datas.index
                };
                let arg = '';
                let _length = datas.channel.length - 1;
                if(datas.channel) {
                    API += '?'
                }
                datas.channel.forEach((item,index) => {
                    if(_length === index) {
                        let arg_end = 'channel=' + item;
                        arg += arg_end
                    }else {
                        let arg_other = 'channel=' + item + '&';
                        arg += arg_other
                    }
                })
                API += arg
            }
            axioIn.get(API, { params: args} ).then((res) => {
                this.$store.commit('setLoading', false)
                if(!datas) {
                    this.deployment = res.data.deploy_list;
                    let _that = this;
                    for(let [channel_key, channel_val] of Object.entries(res.data.channel_list)) {
                        _that.channel.push({value: channel_key, label: channel_val})
                    } 
                    this.trade.series[0].name = '咨询量';
                    this.index = 0;
                };             
                //访客量 总数
                this.visitors = res.data.visitors ? res.data.visitors : 0; 
                //咨询量 总数
                this.consult = res.data.consult ? res.data.consult : 0; 
                // 图像更新
                if(res.data.bread.length){
                    this.trade.series[0].data = res.data.bread;
                }else {
                    this.trade.series[0].data = [{"name": "IOS App","value": 0},{"name": "web","value": 0},{"name": "wechat","value": 0},{"name": "未知","value": 0}]
                }
                if(res.data.broken_line.length){
                    this.trade2.series = [];  
                    this.trade2.legend.data = [];
                    let colorArr = this.trade2.color;
                    let line_shadow = res.data.broken_line.length > 3 ? false : true;
                    res.data.broken_line.map((item,index) => {
                        this.trade2.series.push({
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
                        this.trade2.legend.data.push(item.name);
                    });
                }else {
                    this.trade2.series = [
                        {
                            name:'QQ',
                            type:'line',
                            stack: 'QQ',
                            smooth: true,
                            // areaStyle : {},
                            data:[0, 0, 0]},
                        {
                            name:'微信',
                            type:'line',
                            stack: '微信',
                            smooth: true,
                            // areaStyle : {},
                            data:[0, 0, 0]
                        }]
                    this.trade2.legend.data = ['QQ','微信'];
                }
                this.drawLine(); 
                // 表格数据
                this.tableData = res.data.form;
            }).catch((err) => {
                this.drawLine();
                this.buttonMessage(err,'error',1500);
            })
        },
        // 获取站点行业
        getIndustry() {
            let API = '/api/workorder/industry/';
            axioIn.get(API).then((res) => {
                this.industry = res.data
            })
        },
        
        /*----------下拉选择改变  更新视图------------*/ 
        // 时间  选择
        changeTime(value) {
            let endTime = this.formatDate(new Date());
            let stateTime = this.formatDate(new Date(value));
            this.time = [stateTime,endTime];
            if(endTime === 'NaN-NaN-NaN' || endTime === "" || endTime === null || endTime === 'undefined') {
                return
            }else {
                this.updateData(stateTime,endTime, '' ,'' , '' , '' )
            }
        },
        // 日期  选择
        changeDate(obj) {
            if(obj) {
                this.updateData(obj[0], obj[1], '' , '' , '', '')
            }
        },
        // 站点/行业  选择
        changeIndustry(val) {
            this.industry.forEach((item)=>{
                if(item.id === val) {
                    this.industry_type = item.industry
                }
            });
            this.updateData( '' ,'' , '', this.industry_type, '' , '' )
        },
        // 部署方式  选择
        changeDeployment(val){
            this.deployment_type = val;
            this.updateData('' , '' ,  '' ,  '' ,val, '' )
        },

        // 渠道  选择
        changeChannel(val) {
            if(this.channelSelecteds.length >= 3){
                return this.buttonMessage('最多选三项','error',1500)
            }else {
                // 已选渠道筛选                    
                this.channel.forEach( (item) => {
                    if(item.value === val) {
                        let secStr = JSON.stringify(this.channelSelecteds);
                        if(secStr.indexOf(item.value) != -1){
                            // console.log(secStr.indexOf(item.value))
                            return this.buttonMessage('选择重复','warning',1500)
                        }else {
                            this.channelSelecteds.push({label: item.label, value: item.value});
                            this.channel_lsit[val] = item.label
                        }
                    }
                });
            }
            this.updateData('' , '' , Object.keys(this.channel_lsit), '' , '' , '' )
        },
        // 访客量/咨询量  选择
        changeIndex(target) {
            this.target = target;
            if(target === '咨询量') {
                this.index = 0;
            }else {
                this.index = 1;
            };
            this.trade.series[0].name = target;
            this.updateData('' , '' ,'','' ,'' , this.index);
        },

        // 更新数据视图
        updateData(start_date,end_date,channel_lsit,industry,deploy,index) {
            let datas = {
                'start_date': start_date ? start_date : this.time[0],
                'end_date': end_date ? end_date : this.time[1],
                'channel': channel_lsit ? channel_lsit : Object.keys(this.channel_lsit),
                'industry': industry ? industry : this.industry_type,
                'deploy': deploy ? deploy : this.deployment_type,
                'index': index ? index : 0
            };
            this.getInit(this.versionInfo, datas);
        },
        // 实例饼图  实例折线图
        drawLine() {
            this.myChart  = echarts.init(document.getElementById('myChart1'));
            this.myChart.setOption(this.trade, true)
            this.myChartTwo = echarts.init(document.getElementById('myChart2'));
            this.myChartTwo.setOption(this.trade2, true)
        },
        // 删除 已选渠道
        handleClose(tag) {
            this.channel_type = "";
            this.channelSelecteds = this.channelSelecteds.filter(item => {
                return item.label != tag.label
            });
            this.channel_lsit.splice(this.channel_lsit.findIndex(item => item === tag.label), 1);
            if(this.channelSelecteds.length === 0) {
                this.updateData()
            }else {
                this.updateData( '' , '' ,Object.keys(this.channel_lsit),'' ,'' , '')
            }
        },
        // 按时/按日 开关按钮切换
        changeAccountType(type) {
            this.time_checked = type;
        },
        exportDitch () {//导出
          let version_type = this.$store.state.versionInfo || window.sessionStorage.getItem('vertion');
          if(!version_type)version_type = 0;
          window.open(`/api/data/channel_data/derive_channel/?start_date=${this.time[0]}&end_date=${this.time[1]}&version=${version_type}&channel=${Object.keys(this.channel_lsit)}&industry=${this.industry_type}&deploy=${this.deployment_type}`)
        }
    },
    computed: {
        ...mapGetters({
            version_type: 'getVersion'
        }),
    },
    watch: {
        version_type(val) {
            this.versionInfo = val;
            this.deployment_type = "";
            this.industry_type = "";
            this.channel_type = "";
            this.index = "";
            this.channelSelecteds = [];
            this.channel_lsit = [];
            this.getInit(this.versionInfo);
        }
    }
};