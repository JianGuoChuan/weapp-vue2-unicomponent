/*
* 请求api挂载到全局
*/
import generalApi from '@/utils/api/generalApi.js';
const install = (Vue, vm) => {
    let api = {};
	api.generalApi = generalApi(vm);
    Vue.prototype.$api = api;
}
export default {
    install
}