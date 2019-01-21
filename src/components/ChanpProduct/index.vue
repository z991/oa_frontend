<template>
  <div class="chanp">
    <!-- <p class="qu">{{typeName}} - 产品功能</p> -->
    <p class="ji">
        <label for="">{{productName}}</label>
        <el-button type="primary" size="mini" style="margin:5px 15px 5px 0;float:right" @click="modify">修改</el-button>
        <!-- <input type="text" v-model="messs"  @keyup.enter="search" placeholder="请输入功能名称"/>
        <a href="javascript:void(0)" class="so" @click='search()'>搜索</a>
        <a href="javascript:void(0)" class="cho" @click='chon()'>重置</a> -->
    </p>
    <p class="xinz"><a href="javascript:void(0)"  class="so" @click="showDialog(0)">新增功能</a></p>
    <!-- 产品表头 -->
    <p class="cp">
        <a href="javascript:void(0)" class="wid_1 wid5">序号</a>
        <a href="javascript:void(0)" class="wid5">功能名称</a>
        <a href="javascript:void(0)" class="wid5">功能路径</a>
        <a href="javascript:void(0)" class="wid5">文本形式</a>
        <a href="javascript:void(0)" class="wid5">操作</a> 
    </p>
    <!-- 产品表格 -->
    <ul class="it">
        <li v-for="item in items" :key="item.id">
            <span class="wid_1 wid5">{{item.index}}</span>
            <span class="wid5">{{item.func_name}}</span>
            <span class="wid5">{{item.func_code}}</span>
            <span class="wid5">{{item.func_type}}</span>
            <span class="wid5">
                <a href="javascript:void(0)" class="bian" @click="showDialog(1,item.id)"><i class="el-icon-edit"></i></a>
                <a href="javascript:void(0)" class="dele" @click='delet(item.id)'><i class="el-icon-delete"></i></a>
                <!-- <a href="javascript:void(0)" class="bian" @click="showDialog(1,item.id)"></a>
                <a href="javascript:void(0)" class="dele" @click='delet(item.id)'></a> -->
            </span>
        </li>
    </ul>
    <!-- 分页 -->
    <pagination :number='page' :chain="rowNum" v-on:increment="incrementTotal" :page-index='pageIndex'></pagination>

    <!-- 产品信息弹窗 -->
    <el-dialog :title="dialogTitle"  :visible.sync="dialogFormVisible" :modal-append-to-body = "false">
        <el-form :model="form">
            <el-form-item label="功能名称" :label-width="formLabelWidth">
                <el-input v-model="form.func_name"  placeholder="请输入功能名称" clearable></el-input>
                <em class='ii'>*</em>
            </el-form-item>
             <el-form-item label="功能路径" :label-width="formLabelWidth">
                <el-input v-model="form.func_code" placeholder="请输入功能路径" clearable></el-input>
                <em class='ii'>*</em>
            </el-form-item>
            <el-form-item label="文本形式" :label-width="formLabelWidth">
                <el-select v-model="form.func_type" placeholder="请选择文本形式" clearable @change="textFormChange">
                    <el-option label="文本框" value="文本框"></el-option>
                    <el-option label="单选框" value="单选框"></el-option>
                </el-select>
                <em class='ii'>*</em>
            </el-form-item>
            <el-form-item label="客户版本" :label-width="formLabelWidth">
                <el-radio-group v-model="form.cli_version">
                    <el-radio :label="1">B2B</el-radio>
                    <el-radio :label="2">B2C</el-radio>
                    <el-radio :label="3">不限</el-radio>
                    <em class='ii'>*</em>
                </el-radio-group>
            </el-form-item>

            <!-- 添加功能选择 -->
            <el-radio-group v-show="form.featuresShow" v-model="optionsIndex" @change="featureChange">
                <div class="optionType" v-for="(item,index) in form.selection" :key="item.id"> 
                    <el-form-item label="" :label-width="noWidth" class="item_header">
                        <el-radio :label="index" :label-width="noWidth">设为默认</el-radio>
                        <i class="el-icon-delete" @click="delFeatures(0,index)" style="margin-left:calc(100% - 180px)"></i>
                    </el-form-item>
                    <el-form-item label="选项名称" :label-width="formLabelWidth">
                        <el-input v-model="item.select_name"   placeholder="请输入选项名称" clearable></el-input>
                        <em class='ii'>*</em>
                    </el-form-item>
                    <el-form-item label="选项值" :label-width="formLabelWidth">
                        <el-input v-model="item.select_value"   placeholder="请输入选项值" clearable></el-input>
                        <em class='ii'>*</em>
                    </el-form-item>
                </div>
            </el-radio-group>
            <el-form-item v-show="form.featuresShow" label="" :label-width="noWidth" style="margin: 0 auto 20px">
                <el-button type="primary" @click="add_funs(0)">添加功能选项</el-button>
            </el-form-item>

            <!-- 添加上级条件 -->
            <!-- <el-form-item v-show="type" label="" :label-width="noWidth" class="formContainer" v-for="(items,index) in SuperiorItems" :key="'Superior' + index">
                <div class="optionType">
                    <el-form-item label="" :label-width="noWidth" class="item_header"><i class="el-icon-delete" @click="delFeatures(1,index)"></i></el-form-item>
                    <el-form-item label="上级功能" :label-width="formLabelWidth2">
                        <el-select v-model="items.SeletedVal" placeholder="请选择上级功能" clearable @change="superFormChange">
                            <el-option v-for='item in items.list' :label="item.func_name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item v-show="items.func_type === '单选框'" label="当上级功能选择" :label-width="formLabelWidth2">
                        <el-select v-model="items.default" placeholder="请选择功能" @change="SuperiorItemChange">
                            <el-option v-for="select in Superior" :label="select.select_name" :value="select.id" :key="select.id"></el-option>
                        </el-select>
                        <span>时显示</span>
                    </el-form-item>

                    <el-form-item v-show="items.func_type != '单选框'" v-for="(select,SuperiorIndex) in Superior" :key="select.id"  label="当上级功能选择" :label-width="formLabelWidth2">
                        <el-input v-model="select.select_value"  placeholder="请输入" clearable class="condition" style="width:70%"></el-input>
                        <span>时显示</span>
                        <i class="el-icon-delete" @click="delFeatures(3,SuperiorIndex)"></i>
                    </el-form-item>
                    <el-form-item v-show="items.func_type != '单选框'" label="" :label-width="noWidth">
                        <el-button type="primary" @click="add_funs(3)">新增上级条件</el-button>
                    </el-form-item>
                </div>
            </el-form-item> -->
            <!-- <el-form-item v-show="type" label="" :label-width="noWidth">
                <el-button type="primary" @click="add_funs(1)">添加上级条件</el-button>
            </el-form-item> -->


            <!-- 添加联调功能 -->
            <!-- <el-form-item v-show="type" label="" :label-width="noWidth" class="formContainer" v-for="(items,index) in LinkageItems" :key="'Linkage' + index">
                <div class="optionType" >
                    <el-form-item label="" :label-width="noWidth" class="item_header"><i class="el-icon-delete" @click="delFeatures(2,index)"></i></el-form-item>
                    <el-form-item label="联动功能" :label-width="formLabelWidth2">
                        <el-select v-model="items.SeletedVal" placeholder="请选择联动功能" clearable @change="linkageFormChange">
                            <el-option v-for="item in items.list" :label="item.func_name" :value="item.id" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-show="items.func_type === '单选框'" label="当联动功能选择" :label-width="formLabelWidth2">
                        <el-select v-model="items.default" placeholder="请选择功能" @change="LinkageItemChange">
                             <el-option v-for="select in Linkage" :label="select.select_name" :value="select.id" :key="select.id"></el-option>
                        </el-select>
                        <span>时显示</span>
                    </el-form-item>
                    <el-form-item v-show="items.func_type != '单选框'"  v-for="(select,LinkageIndex) in Linkage" :key="select.id" label="当联动功能选择" :label-width="formLabelWidth2">
                        <el-input v-model="select.select_name"  placeholder="请输入" clearable class="condition" style="width:70%"></el-input>
                        <span>时显示</span>
                        <i class="el-icon-delete" @click="delFeatures(4,LinkageIndex)"></i>
                    </el-form-item>
                    <el-form-item v-show="items.func_type != '单选框'" label="" :label-width="noWidth">
                        <el-button type="primary" @click="add_funs(4)">新增联动条件</el-button>
                    </el-form-item>
                </div>
            </el-form-item> -->
            <!-- <el-form-item v-show="type" label="" :label-width="noWidth" style="margin: 0 auto">
                <el-button type="primary" @click="add_funs(2)" disabled title="该功能暂时未开放">添加联动功能</el-button>
            </el-form-item> -->

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogCancel" size="small">取 消</el-button>
            <el-button type="primary" @click="dialogDetermine" size="small">确 定</el-button>
        </div>
    </el-dialog>

  </div>
</template>
<style src="./style.scss" rel="stylesheet/scss" lang="scss" scoped></style>
<script src="./index.js"></script>
<style src='./style.css'></style>
