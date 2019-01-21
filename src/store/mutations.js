import {OA_BREADCRUMBD,OA_LIBRARY,LOG_FUNCTION} from "./mutations-type"
export default {
    condition (state,n) {state.search = n},
    getFileld (state,n) {state.fileld = n},
    savePage (state, n) {state.saveInfo = n;},
    evaluate(state,n){

        if(n.company_address===null){
            n.company_address={province:'',city:'',detail:''}
        }
        else{state.company_info=n}

        if(n.company_url.length!==0){
            n.company_url.map(n=>{n.ac=false;n.a2=true;})
            n.company_url[0].ac=true;n.company_url[0].a2=false;
        }
        else{n.company_url=[{company_url:'',ac:true,a2:false}]}
    },
    evaluate1(state,n){//link_info
        if(n.length===0){state.link_info=[
            // {linkman:'',link_phone:'',link_email:'',link_qq:''}
        ]}
        else{
            state.link_info=n;
        }
    },
    evaluate2(state,n){
        // console.log(n);

        state.station_info=n},
    evaluate3(state,n){state.functio=n},
    evaluate4(state,n){state.account_conf=n;n.sure_pwd=n.set_pwd;},
    evaluate5(state,n){state.id=n},//开站的修改的id
    evaluate6(state,n){state.func_list=n},
    evaluate7(state,n){
        state.ton_pro=n},
    // evaluate6(state,n){state.ite4=n},
    empty(state){
        state.company_info={};
        state.link_info=[];
        state.station_info={};
        state.account_conf=[];
        state.id='';
        state.functio=[];
        //state.ite4=[]
    },
    evaluate8(state,n){
        state.customer_type=n;
    },
    // 设置管理员权限
    setroletype(state,n) {
        state.roletype = n;
    },
    // 设置用户类型
    setUserType(state,n) {
        state.usertype = n;
    },
    // 设置默认菜单
    setActiveIndex(state,n) {
        state.activeIndex = n;
    },
    // 数据加载中 设置
    setLoading(state,n) {
        state.isLoading = n;
    },
    // saveVersion(state,n) {
    //   state.versionInfo = n;
    // },
    saveVersion(state, info) {
        state.versionInfo = info;
        window.sessionStorage.vertion = info;
    },
    [OA_BREADCRUMBD](state,info){
        state.breadcrumbData = info;
        window.sessionStorage.breadcrumbData = info;
    },
    [OA_LIBRARY](state,info){
        state.oaLibraryData = JSON.stringify(info);
        window.sessionStorage.oaLibraryData = JSON.stringify(info);

    },
    [LOG_FUNCTION](state,info){

        state.funcLogArr.push(info);
        let result = [],
            obj = {};
        state.funcLogArr.reverse();
        for(var i =0; i<state.funcLogArr.length; i++){
            if(!obj[state.funcLogArr[i].name]){
                result.push(state.funcLogArr[i]);
                obj[state.funcLogArr[i].name] = true;

            }
        }
        console.log(result);
        state.funcLogArr = result;

    }
}
