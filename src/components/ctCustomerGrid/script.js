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
            this.gridId = grid_id;
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
            let {gridId} = this;

            this.getData(gridId);
        },
        onExportFn(){
            let {searchData} = this,
                {searchVal} = searchData;
            if(searchVal){
                window.open(`/api/support/get_server_siteid/?grid_id=${searchVal}&export=${1}`)
            } else{
                this.buttonMessage('请先选择grid','warning',1500)
            }
        },
        getData(grid_id=''){
            axioIn.get(`/api/support/get_server_siteid/?grid_id=${grid_id}`).then((res)=>{

                let data = res.data;



                this.tableDatas = data;

                this.totalCount = this.tableDatas.length;

            })
        },
        handleCurrentChange(current){
            this.currentPage = current;
        },
        handleSizeChange() {
            
        }
    },
    components: {
    },
    watch:{
    }
};