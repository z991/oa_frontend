import axioIn from '../../store/axioIn';

export default {
    data(){
        return {
            ruleForm: {
                userid: '',
                siteid: '',
                price: '',
                date: '',
                ordernum: '',
                clientid: '',
            },
            searchData:{
              searchVal:'',
            },
            rules: {
                userid: [
                    { required: true, message: '请输入用户id', trigger: 'blur' },
                    { min: 2, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
                ],
                siteid: [
                    { required: true, message: '请输入企业id', trigger: 'blur' },
                    { min: 2, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }
                ],
                price: [
                    {  required: true, message: '请输入价格', trigger: 'blur' }
                ],
                date: [
                    { required: true, message: '请选择日期', trigger: 'blur' ,}
                ],
                ordernum: [
                    { required: true, message: '请选择活动资源', trigger: 'blur' }
                ],
                clientid: [
                    { required: true, message: '请填写活动形式', trigger: 'blur' }
                ]
            }
        }
    },

    methods: {
        // 提示信息
        buttonMessage(data, types, time) {
            this.$notify({
                title: '提示信息',
                message: data,
                position: 'top-right',
                type: types,
                duration: time,
            });
        },

        // 订单提交
        submitForm(formName) {
            this.$refs[formName].validate((valid,errorObj) => {
                let {ruleForm} = this;

                    if (valid) {

                            axioIn.get('/api/support/supply_order/',{params:{
                                    userid: ruleForm.userid,
                                    siteid: ruleForm.siteid,
                                    price: ruleForm.price,
                                    ordernum: ruleForm.ordernum,
                                    date: ruleForm.date,
                                    clientid: ruleForm.clientid
                                }}
                            )
                                .then((res) => {
                                        this.buttonMessage('订单补交成功！','success',1500);
                                        Object.keys(ruleForm).forEach((key)=>{
                                            ruleForm[key] = '';
                                        })

                                    },(res) => {
                                        setTimeout(() => {
                                            this.buttonMessage('订单补交失败','warning',1500);
                                        },3000)
                                    }
                                )
                        }
                     else {
                        this.buttonMessage('订单信息校验失败','warning',1500);
                        return false;
                    }
                }
            );
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }

    },

}
