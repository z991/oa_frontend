
<template>
    <div class="versionSettings">
        <div class="versionSettings-back">
            <el-button type="primary"  @click="onEmitIsSend">返回</el-button>
        </div>
        <div class="versionSettings-left">
        <div class="serviceTitle"><span class="titleDefault">发送邮件</span></div>
        <div class="service-Action">
            <el-button type="primary" @click="onSendOut">发送</el-button>
        </div>
        <div class='revise'>
            <div class="revise-Text">
                <label>收件人</label>
                <div class="revise-Tags">
                    <el-tag
                            :key="tag"
                            v-for="tag in verSionTags"
                            :disable-transitions="false"
                            >
                        {{tag}}
                    </el-tag>
                </div>
                <!--<el-input v-model="verSionAddressee" placeholder=""></el-input>-->
            </div>
            <div class="revise-Text">
                <label>抄送</label>
                <el-input  placeholder="" v-model="verSionData.verSionCopy"
                ></el-input>
            </div>
            <div class="revise-Text">
                <label>主题</label>
                <el-input placeholder="" v-model="verSionData.verSionTheme"></el-input>
            </div>
            <div class="revise-Text">
                <label>正文</label>
                <span id="editorElem" ></span>
            </div>
            <div class="revise-People">
                <label>发件人：</label>
                <span>发件人信息</span>
            </div>
        </div>
        </div>
        <div class="versionSettings-right">
            <div class="versionSettings-people">联系人</div>
            <el-tree
                    :data="contactList"
                    ref="verSionTree"
                    show-checkbox
                    @check-change="onSetCheckKedKeys"
                    node-key="id"
                    :props="defaultProps">
            </el-tree>
        </div>
  </div>
</template>
<script src="./script.js"></script>
<style rel="stylesheet/scss" lang="scss"  src="./../../assets/home.scss" scoped></style>
<style rel="stylesheet/scss" lang="scss"  src="./style.scss" scoped></style>

<style  lang='scss'>

    #editorElem{display:inline-block;width:90%;border-radius:5px;margin-left:-4px;z-index:12;

        .w-e-toolbar{border-top-left-radius: 5px;border-top-right-radius: 5px;border:1px solid black;}
        .w-e-text-container{height: 480px!important;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;border:1px solid black;z-index:12}
        .w-e-text{
            text-align:left;
        }
    }
</style>