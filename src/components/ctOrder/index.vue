<template>
    <div class="Order">
        <div class="Main">

                <div style="display:block;line-height:32px;border-bottom:1px solid #dcdfe6;padding-left:5px;font-size:16px;">订单信息</div>
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm" >
                    <el-form-item label="访客ID" prop="userid">
                        <el-input v-model="ruleForm.userid"></el-input>
                    </el-form-item>
                    <el-form-item label="订单时间" prop="date">
                        <el-date-picker
                                v-model="ruleForm.date"
                                type="datetime"
                                placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="siteId" prop="siteid">
                        <el-input v-model="ruleForm.siteid"></el-input>
                    </el-form-item>
                    <el-form-item label="价格" prop="price">
                        <el-input v-model="ruleForm.price"></el-input>
                    </el-form-item>
                    <el-form-item label="订单号" prop="ordernum">
                        <el-input v-model="ruleForm.ordernum"></el-input>
                    </el-form-item>
                    <el-form-item label="访客clientID" prop="clientid">
                        <el-input v-model="ruleForm.clientid"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script src="./script.js"></script>

<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
