import axioIn from "../../store/axioIn";

export default {
    data () {
        return {
            currentPage:1,
            pageSize:10,
            searchData:{
                searchVal:'',
            },
            tableDatas: [],
            gridList:[],
            gridId:'',
            totalCount:0,
        }
    },
    created(){
        console.log(this);
    },
    beforeMount(){
        if(this.searchData.searchVal!==''){
            this.getData();
        }
        this.gridData();
    },
    methods: {
        //grid 字典表
        gridData(){
            axioIn.get(`/api/support/get_grid_list/`).then((res)=>{
                this.gridList = res.data;
            })
        },
        onGridChange(grid_id){
            console.log(grid_id);
            this.gridId = grid_id;
            this.getData(grid_id);
        },
        getData(siteid=''){
            this.tableLoading = true;
            axioIn.get(`/api/support/get_siteid_server/?siteid=${siteid}`).then((res)=>{

                let datas = res.data[0],
                    arr = [];
                Object.keys(datas).forEach(
                    (key) => {
                        arr.push({
                            name: key,
                            info: datas[key],
                        })
                    }
                );

                this.tableDatas = arr;

                this.totalCount=arr.length;

            })
        },
        handleCurrentChange(current){
            this.currentPage = current;
        },
        buttonMessage(data, types, time) {
            this.$notify({
                title: '提示信息',
                message: data,
                position: 'top-right',
                type: types,
                duration: time,
            });
        },
        onSearchFn(){
            let {searchData} = this,
                {searchVal} = searchData;

            if(searchVal.indexOf("kf_") == -1){
                this.buttonMessage('请输入正确的企业Id','warning',1500)
                return;
            }

            this.getData(searchVal);
        },
        handleSizeChange() {
            
        }
    },
    components: {
    },
    watch:{
    }
};