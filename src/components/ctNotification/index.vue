<template>
    <div class="ct-Notification" v-show="show" @click="onCloseBind">
        <div class="ct-NotifiBody" @click.stop>
        <div class="ct-Title">
            <span>{{title}}</span>
            <i class="el-icon-close" @click="onCloseBind"></i>
        </div>
                <ul class="listsContainer" v-if="dataList.length"  >
                    <li v-for="(item,index) in dataList" :key="index">
                        <div class="listLeft">
                            <div class="circle"></div>
                            <div class="line"></div>
                        </div>
                        <div class="listRight">
                            <div class="listTit">
                                <!--<span class="listDesc">{{item.user}}：添加备注</span>-->
                                <span class="listTime">{{item.last_execution_time}}</span>
                            </div>
                            <div class="listContent">
                                <div>时间段:{{item.start_date + " " + item.end_date}}</div>
                            </div>
                            <div class="listFooter"></div>
                        </div>
                    </li>
                </ul>
            <div v-show="!dataList.length" style="text-align:center;padding-top:20px;">
                暂无记录
            </div>
            </div>

    </div>
</template>
<script src="./script.js"></script>
<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>