import moment from "moment";

export default {
    props: {
        // 数据列表
        title:{
            type:null,
            default:()=>'还未添加标题',
        },
        show:{
            type:Boolean,
            default:()=>false,
        },
        dataList:{
            type:Array,
            default:function(){
            }
        },

    },
    data() {
        return {
        }
    },


    methods: {
        onCloseBind() {
            this.$emit('closeType',false);
        },

    },
    watch:{
        'dataList'(arr){
         if (Array.isArray(arr) && arr.length > 0){
             arr.map((item)=>{
                item.last_execution_time= moment(item.last_execution_time).format('YYYY-MM-DD HH:mm:ss')
                     })
         }
        }
    }

}

