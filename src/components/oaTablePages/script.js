export default {
    props: {
        // 数据列表

        loading:{
          type:Boolean,
          default:()=>true,
        },
        // prop:表头绑定的地段，label：表头名称，align：每列数据展示形式（left, center, right），width:列宽
        list: {
            type: Array,
            default: () => []
        },
        // 需要展示的列 === prop：列数据对应的属性，label：列名，align：对齐方式，width：列宽
        columns: {
            type: Array,
            default: () => []
        },
        operates: {
            type: Object,
            default: () => {
            }
        },
        operatesCondition:{
            type:Object,
            default:function(){
                return { flag:false,modelName:'personal'}
            }
        },
        // 分页参数 === pageSize:每页展示的条数，pageIndex:当前页，pageArray: 每页展示条数的控制集合，默认 _page_array
        pagination: {
            type: Object,
            default: {}
        },
    },
    components: {
        oaRenderDom: {
            functional: true,
            props: {
                row: Object,
                render: Function,
                index: Number,
                column: {
                    type: Object,
                    default: null
                }
            },
            render: (h, scope) => {
                const params = {
                    row: scope.props.row,
                    index: scope.props.index
                }
                if (scope.props.column) params.column = scope.props.column
                return scope.props.render(h, params)
            }
        }
    },
    data() {
        return {
        }
    },

    methods: {
        // 切换每页显示的数量
        handleSizeChange(size) {
            this.pagination.pageSize = size
        },
        // 切换页码
        handleIndexChange(current) {
            this.$emit('onPageChange',current);
        },
        // 多行选中
    },

}

