<template>
    <div class="ren back">
        <p class="ji">
            <section>
                <span class="sear"><label for="">角色名称</label><input type="text" v-model="messs1" @keyup.enter="search"></span>
                <span class="sear"><label for="">人员名称</label><input type="text" v-model="messs2" @keyup.enter="search"></span>
                <a href="javascript:void(0)" class="so" @click="search()">搜索</a>
                <a href="javascript:void(0)" class="cho" @click="mess()">重置</a>
            </section>
        </p>
        <p class="xinz"><a href="javascript:void(0)"  class="so" @click='operating()'>新增账号</a></p>
        <p class="cp">
            <a href="javascript:void(0)" class="wid_1 wid4">序号</a>
            <a href="javascript:void(0)" class="wid4">人员名称</a>
            <a href="javascript:void(0)" class="wid4">角色名称</a>
            <a href="javascript:void(0)" class="wid4">操作</a>
        </p>
        <ul class="it">
            <li v-for="(item) in items" :key="item.id">
                <span class="wid_1 wid4">{{item.index}}</span>
                <span class="wid4">{{item.last_name}}</span>
                <span class="wid4">{{item.groups_name}}</span>
                <span class="wid4">
                      <a href="javascript:void(0)" class="bian" @click="operating(item.username)"><i class="el-icon-edit"></i></a>
                      <a href="javascript:void(0)" class="delete" @click='deleRole(item.username)'><i class="el-icon-delete"></i></a>
                    <!-- <a href="javascript:void(0)" class="bian" @click="operating(item.username)"></a>
                    <a href="javascript:void(0)" class="delete" @click="deleRole(item.username)"></a> -->
                </span>
            </li>
        </ul>
        <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :modal-append-to-body = "false">
            <el-form :model="zhang1">
                <el-form-item label="人员名称:" :label-width="formLabelWidth">
                  <el-input v-model="zhang1.last_name" autocomplete="off" placeholder="请输入用户名称(中文)" clearable></el-input>
                  <em class='ii'>*</em>
                </el-form-item>
                <el-form-item label="人员账号:" :label-width="formLabelWidth">
                  <el-input v-model="zhang1.username" autocomplete="off" placeholder="请输入用户账号(拼音)" clearable :disabled="!zhang1.type"></el-input>
                  <em class='ii'>*</em>
                </el-form-item>
                <el-form-item label="人员密码:" :label-width="formLabelWidth" v-show="zhang1.type">
                  <el-input v-model="zhang1.pass" autocomplete="off" placeholder="请输入密码，数字+字母，最多12位" maxlength="12" clearable></el-input>
                  <em class='ii'>*</em>
                </el-form-item>
                <el-form-item label="人员邮箱:" :label-width="formLabelWidth" v-show="!zhang1.type">
                  <el-input v-model="zhang1.email" autocomplete="off" placeholder="请输入邮箱" disabled></el-input>
                  <em class='ii'>*</em>
                </el-form-item>
                <el-form-item label="人员角色:" :label-width="formLabelWidth" class="rules">
                    <el-checkbox :indeterminate="zhang1.setRule.isIndeterminate"  v-model="zhang1.setRule.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <em class='ii'>*</em> 
                    <el-checkbox-group v-model="zhang1.setRule.checkedRules" @change="handleCheckedRulesChange">
                        <div class="checkbox_container"><el-checkbox v-for="rule in zhang1.setRule.Rules" :label="rule.name" :key="rule.name" :title="rule.name">{{rule.name}}</el-checkbox></div>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCancel">取 消</el-button>
                <el-button type="primary" @click="dialogDetermine">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script src="./index.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>
<style src='./style.css'></style>