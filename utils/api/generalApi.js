/*
* 一般通用请求
*/
const generalApi = function(vm) {
	return {
		// 测试Api
		testApi(param) {
			return vm.$d.get('/api/job/page', { id: '452', pageSize: 10, page_no: 1 });
		},
		// 测试Api2
		test2Api(param) {
			return vm.$d.get('/api/job/detail', { id: '452' });
		},
	}
};
export default generalApi;