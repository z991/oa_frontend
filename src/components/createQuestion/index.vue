<template>
    <div class="createQuestions">
        <header>创建问题</header>
        <main>
            <div class="tit_info">
                <!-- <div><span>企业ID：</span><span>{{company.id}}</span></div> -->
                <div><span>客户名称：</span><span>{{company.name}}</span></div>
                <div><span>部署方式：</span><span>{{company.deploy_way}}</span></div>
                <div><span>实施顾问：</span><span>{{company.implementation}}</span></div>
                <div><span>运营顾问：</span><span>{{company.operation}}</span></div>
                <div><span>商务顾问：</span><span>{{company.business}}</span></div> 
            </div>
            <div class="main_info">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="125px" class="demo-ruleForm">
                    <el-form-item label="问题类型" prop="matter_type" align="left">
                        <el-select v-model="ruleForm.matter_type" placeholder="请选择问题类型">
                            <el-option v-for="item in questionList" :label="item.label" :value="item.value" :key="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="经办人" prop="responsible" class="unnecessary">
                        <el-select v-model="ruleForm.responsible" placeholder="请选择经办人">
                            <el-option v-for="item in managerList" :label="item.last_name" :value="item.last_name" :key="item.last_name"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="问题名称" prop="matter_name">
                        <el-input v-model="ruleForm.matter_name" placeholder="请输入问题名称"></el-input>
                    </el-form-item>
                    <el-form-item label="培训方式" prop="training_method">
                        <el-select v-model="ruleForm.training_method" placeholder="请选择培训方式">
                            <el-option :label="item.label" :value="item.value" v-for="item in trainingMethodList" :key="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户现状描述" prop="description_customer" class="unnecessary">
                        <el-input type="textarea" v-model="ruleForm.description_customer"></el-input>
                    </el-form-item>
                    <el-form-item label="已上线模块" prop="online_module">
                        <el-checkbox-group v-model="ruleForm.online_module">
                            <el-checkbox v-for="item in onlinemodelList" @change="CheckChange(item,unonlinemodelList)" :label="item.label" name="type" :key="item.id" :disabled="item.disabled">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="未上线模块" prop="unonline_module" class="unnecessary">
                        <el-checkbox-group v-model="ruleForm.unonline_module">
                            <el-checkbox v-for="item in unonlinemodelList" @change="CheckChange(item,onlinemodelList)" :label="item.label" name="type" :key="item.id" :disabled="item.disabled">{{item.label}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>  
                    <el-form-item label="培训联系人" prop="training_contact">
                        <el-input v-model="ruleForm.training_contact"></el-input>
                    </el-form-item>
                    <el-form-item label="培训联系人电话" prop="training_contactnum">
                        <el-input v-model.number="ruleForm.training_contactnum"></el-input>
                    </el-form-item>
                    <el-form-item label="培训联系人QQ" prop="training_contactqq">
                        <el-input v-model="ruleForm.training_contactqq"></el-input>
                    </el-form-item>
                    <el-form-item label="培训联系人职位" prop="training_position">
                        <el-input v-model="ruleForm.training_position"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </main>
        <footer>
            <el-button size="mini" @click="cancel('ruleForm')">取消</el-button>
            <el-button type="primary" size="mini"  @click="save('ruleForm')">确定</el-button>
        </footer>
    </div>
</template>

<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style src="./style.css"></style>
