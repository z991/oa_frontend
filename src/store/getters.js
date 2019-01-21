let _sessionStorage = window.sessionStorage;
export default {
    getVersion(state) {
        state.versionInfo = state.versionInfo || _sessionStorage.vertion;
        return state.versionInfo;
    },
    getBreadcrumbData(state){
        state.breadcrumbData = state.breadcrumbData || JSON.parse(_sessionStorage.breadcrumbData);
        return state.breadcrumbData;
    },
    getLibraryData(state){
        state.oaLibraryData =  JSON.parse(_sessionStorage.oaLibraryData);
        return state.oaLibraryData;
    },
    getLogFuncArr(state){
        return state.funcLogArr;

    }
}
