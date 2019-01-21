<template>
    <div id="date">
    <!-- 年份 月份 -->
    <div class="month">
        <ul>
            <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
            <li class="arrow" @click="pickPre(currentYear,currentMonth)">❮</li>
            <li class="year-month" @click="pickYear(currentYear,currentMonth)">
                <span class="choose-year" @click="getYears(currentYear)">{{ currentYear }}年</span><span class="choose-month" @click="getMonths(currentMonth)" v-show="getMonth">{{ currentMonth }}月</span>
                
            </li>
            <li class="arrow" @click="pickNext(currentYear,currentMonth)">❯</li>
        </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays" v-show="weekdays">
        <li>一</li>
        <li>二</li>
        <li>三</li>
        <li>四</li>
        <li>五</li>
        <li style="color:red">六</li>
        <li style="color:red">日</li>
    </ul>
    <div class="timeNum" v-show="showYear">
        <ul>
            <li v-for="(date,index) in year" :key="index" @click="presentYear(date)"><span style="cursor:pointer;">{{date}}</span></li>
            <!-- <li class="vintage"><span><</span><span>></span></li> -->
        </ul>
    </div>
    <div class="timeNum" v-show="showMonth">
        <ul>
            <li v-for="(date,index) in month" :key="index" @click="presentMonth(date,index)"><span style="cursor:pointer;">{{date}}</span></li>
        </ul>
    </div>
    <!-- 日期 -->
    <ul class="days" v-show="date">
        <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
        <li  v-for="(dayobject,index) in days" :key="index" @click='pick(dayobject)'>
            <!--本月-->
            <!--如果不是本月  改变类名加灰色-->

            <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>

            <!--如果是本月  还需要判断是不是这一天-->
            <span v-else>
          <!--今天  同年同月同日-->
                <span v-if="dayobject.day.getFullYear() == new Date().getFullYear() && dayobject.day.getMonth() == new Date().getMonth() && dayobject.day.getDate() == new Date().getDate()" class="active">{{ dayobject.day.getDate() }}</span>
                <span v-else>{{ dayobject.day.getDate() }}</span>
            </span>

        </li>
    </ul>
</div>
</template>
<script>
export default {
    name:'date',
    
  data: function(){
        return {
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            days: [],
            aap:'',
            date:true,
            showYear: false,
            showMonth: false,
            getMonth: true,
            weekdays: true,
            month: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
            year: []
 }
 },
 created: function() {  //在vue初始化时调用
            this.initData(null);
            var a = this.currentYear - 5;
            for(var i=0;i<12;i++){
                this.year.push(a);
                a++;
            }
        },
        methods: {
            formatMonth: function(index){
                var forMonth = [1,2,3,4,5,6,7,8,9,10,11,12]
                return forMonth[index]
            },
            presentMonth: function(month,index){
                var b = this.formatMonth(index)
                this.currentMonth = b
                this.showYear = false
                this.showMonth = false
                this.date = true
                this.weekdays = true
                this.getMonth = true
                var a = this.formatDate(this.currentYear,this.currentMonth,1)
                this.initData(a)
            },
            presentYear: function(year){
                this.currentYear = year
                this.showYear = false
                this.showMonth = true
                this.weekdays = false
                this.date = false
                this.getMonth = false
            },
            getYears: function(year){
                if(this.showYear){return}
                // else if(this.showMonth&&this.year.length === 0){
                //     this.getMonth = false
                //     this.showYear = true
                //     this.showMonth = false
                //     this.weekdays = false
                //     this.date = false
                //     var a = year - 5;
                //     for(var i=0;i<12;i++){
                //         this.year.push(a);
                //         a++;
                //     }
                // }
                else if(this.showMonth){
                    this.getMonth = false
                    this.showYear = true
                    this.showMonth = false
                    this.weekdays = false
                    this.date = false
                }else if(this.date){
                    console.log('length')
                    this.getMonth = false
                    this.showYear = true
                    this.showMonth = false
                    this.weekdays = false
                    this.date = false
                    var a = year - 5;this.year = [];
                    for(var i=0;i<12;i++){
                        this.year.push(a);
                        a++;
                    }
                }             
            },
            getMonths: function(){
                if(this.showMonth)return
                this.getMonth = false
                this.showYear = false
                this.showMonth = true
                this.weekdays = false
                this.date = false
            },
            initData: function(cur) {
                var leftcount=0; //存放剩余数量
                var date;
                this.weekdays = true;this.date = true;this.showYear = false;this.showMonth = false;
                if (cur) {
                    date = new Date(cur);
                } else {
                    var now=new Date();
                    var d = new Date(this.formatDate(now.getFullYear() , now.getMonth()+1 , 1));
                    d.setDate(42);
                    date = new Date(this.formatDate(d.getFullYear(),d.getMonth(),1));
                }
                this.currentDay = date.getDate();
                this.currentYear = date.getFullYear();
                // console.log(this.currentYear)
                this.currentMonth = date.getMonth() + 1;

                this.currentWeek = date.getDay(); // 1...6,0
                if (this.currentWeek == 0) {
                    this.currentWeek = 7;
                }
                var str = this.formatDate(this.currentYear , this.currentMonth, this.currentDay);
                // console.log(this.currentYear)
                this.days.length = 0;
                // 今天是周日，放在第一行第7个位置，前面6个
                //初始化本周
                for (var i = this.currentWeek - 1; i >= 0; i--) {
                    var d = new Date(str);
                    d.setDate(d.getDate() - i);
                    var dayobject={}; //用一个对象包装Date对象  以便为以后预定功能添加属性
                    dayobject.day=d;
                    this.days.push(dayobject);//将日期放入data 中的days数组 供页面渲染使用


                }
                //其他周
                for (var i = 1; i <= 42 - this.currentWeek; i++) {
                    var d = new Date(str);
                    d.setDate(d.getDate() + i);
                    var dayobject={};
                    dayobject.day=d;
                    this.days.push(dayobject);
                }

            },
            pickPre: function(year, month) {

                // setDate(0); 上月最后一天
                // setDate(-1); 上月倒数第二天
                // setDate(dx) 参数dx为 上月最后一天的前后dx天
                if(this.showYear){
                    if(this.year.length){
                        var list = this.year[0]-12
                        this.year = []
                        for(var i=0;i<12;i++){
                            this.year.push(list)
                            list++;
                        }
                    }
                }else if(this.date){
                    var d = new Date(this.formatDate(year , month , 1));
                    d.setDate(0);
                    this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                }
            },
            pickNext: function(year, month) {
                if(this.showYear){
                    if(this.year.length){
                        var list = this.year[0]+12
                        this.year = []
                        for(var i=0;i<12;i++){
                            this.year.push(list)
                            list++;
                        }
                    }
                }else if(this.date){
                    var d = new Date(this.formatDate(year , month , 1));
                    d.setDate(42);
                    this.initData(this.formatDate(d.getFullYear(),d.getMonth() + 1,1));
                }
            },
            pickYear: function(year, month) {
                // alert(year + "," + month);
            },

            // 返回 类似 2016-01-02 格式的字符串
            formatDate: function(year,month,day){
                var y = year;
                var m = month;
                if(m<10) m = "0" + m;
                var d = day;
                if(d<10) d = "0" + d;
                return y+"-"+m+"-"+d
            },
            pick:function(date){
                //if(date.day.getMonth()+1 != this.currentMonth){return}
                //else{
                this.aap=this.formatDate(date.day.getFullYear(),date.day.getMonth()+1,date.day.getDate())
                //console.log(this.aap)
                this.$emit('incrementt',this.aap)
               // console.log(this.aap)
                //}
            },
            //hide1:function(){this.date_s=false;}

}}
</script>
<style scoped lang='scss'>
  @import '../assets/home';
  #date{width:300px;height:240px;border:1px solid gray;position: absolute;z-index:11;background-color:#ecf0f1;left:117px;
  .month{
  ul li{float:left;margin:5px 10px;}
  .arrow{font-size:16px;cursor:pointer;}
  .year-month{width:220px;margin-top:8px;text-align: center;&:hover{cursor: pointer;}}
  }
  .weekdays,.days{margin:10px;
      li{float:left;width:30px;margin:5px;}
  }
  .days li{cursor:pointer;}
  .active{color:blue}
  .other-month{color:gray}
  .timeNum{
    ul li{float:left;
        span{display: inline-block;width:75px;height:60px;text-align: center;line-height: 60px;}}
    // .vintage{
    //     span{display: inline-block;width:38px;height:20px;line-height: 20px;}
    // }
    // position:absolute;top:30px;left:100px;width:130px;background: #fff;
  }
  }
</style>

