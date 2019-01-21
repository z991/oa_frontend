import WangEditor from 'wangeditor'
import axioIn from "../../store/axioIn";
export default {
    name: 'versionSettings',
    data() {
        return {
            verSionData: {
                verSionCopy: '',
                verSionTheme: '',
            },
            editor: {},
            contactsData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            verSionTags: [],
            version_ids:'',
            product_id:'',
        }
    },
    props: {
        propsId: {
            type: [String, Number],
        },
        propsType:{
            type:[String]
        },
        propsContent:{
            type:[Object]
        }
    },
    beforeMount() {
        this.getContacts();
        this.onpropsIdDetails(this.propsType,this.propsId,this.propsContent);
    },
    computed:
        {
            contactList: function () {
                let arr = [];
                arr = this.contactsData;

                return arr;
            }
        },
    mounted() {
        this.editor = new WangEditor('#editorElem');
        this.editor.customConfig.uploadImgServer = '/api/goods/get_editor/'
        this.editor.customConfig.uploadImgUrl = '/setup/avatar-upload/';
        this.editor.customConfig.uploadFileName = 'myFileName';
        this.editor.customConfig.uploadImgHeaders = {
            'Accept': 'text/x-json'
        }
        this.editor.customConfig.uploadImgHooks = {
            customInsert: function (insertImg, result, editor) {
                var url = result;
                insertImg(url);
            }
        }
        this.editor.customConfig.menus = [
            'head', 'bold', 'underline',
            'strikeThrough', 'foreColor',
            'link', 'justify', 'quote', 'emoticon',
            'image', 'video'
        ];
        this.editor.create();
    },
    computed:
        {
            contactList: function () {
                let arr = [];

                arr = this.contactsData
                return arr;
            },
        },
    methods: {
        /*
            版本设置 发送
            参数
         */
        onSendOut() {
            console.log(this.verSionData)
            let {verSionTags, verSionData , version_ids,product_id} = this,
                {verSionCopy, verSionTheme} = verSionData,
                content = this.editor.$textElem[0].innerHTML;
            axioIn.post('/api/version/versionrepository/handle_release_notice/', {
                recipients_list: verSionTags,
                nickname: verSionCopy,
                theme: verSionTheme,
                content: content,
                version_ids:version_ids,
                product_id:product_id
            }).then((res) => {
                if (res){
                    this.$message({
                        message: '发送成功',
                        type: 'success'
                    });
                    let flag = false,clearId = '';

            this.$emit("onPropsSendFlag", [flag, clearId]);
                    // this.$emit('onPropsSendFlag',false);
                }

            })
        },
        onpropsIdDetails(propsType,id,queryItem)
        {
                console.log(id);
                let str='';
                axioIn.get('/api/version/versionrepository/release_notice/?version_id=' + id).then((res) => {
                    if (propsType=='id' &&Array.isArray(res.data) && res.data.length > 0){
                            this.version_ids=id;
                            res.data.map((item)=>{
                                str += '产品名称：' + item.product_explain +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ '产品介绍：' + item.product_name +'</br>'
                            })
                    }else if (propsType =='content') {
                        this.product_id=id;
                        str += '产品名称：' + queryItem.product_explain +'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+ '产品介绍：' + queryItem.product_name +'</br>'
                    }
                    this.editor.$textElem[0].innerHTML=str;
                })
        },
        /*
            Contacts Tree getData 目前数据没有定型
         */
        getContacts()
        {
            axioIn.get('/api/version/versionrepository/get_email_list ').then((res) => {
                if (res) {
                    let data = res.data,
                        arr = [];
                    Object.keys(data).forEach(key => {
                        arr.push({
                            label: key,
                            id: data[key]
                        })
                    })
                    this.contactsData = arr;
                }
                this.$store.commit("setLoading", false);

            })
        },
        //标签 Tags close
        handleClose(tag) {
            this.verSionTags.splice(this.verSionTags.indexOf(tag), 1);
        },

        //Tree 选中fn
        onSetCheckKedKeys() {
            this.onGetCheckKedKeys();
        },
        // 触发 getCheckNode  获取选中节点
        onGetCheckKedKeys() {
            let treeCheckedNode = this.$refs.verSionTree.getCheckedKeys();
            this.verSionTags = treeCheckedNode;
            //数组判断 是否有父节点 如果存在截取掉
        },
        onEmitIsSend() {
            /*
            flag 控制显示
            clearid 清楚掉父组件带过来的版本Id
             */
            let flag = false,
                clearId = '';

            this.$emit("onPropsSendFlag", [flag, clearId]);
        },
    },
}
