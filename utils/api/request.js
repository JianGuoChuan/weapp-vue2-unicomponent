/*
* 请求封装
*/
import devConfig from '@/utils/config.js';
let httpConfig = {};
let requestTimer = '';
let timeOutTimer = '';
const install = function(Vue, vm) {
	let request = {
		// 请求配置设置
		setConfig: (config) => {
			httpConfig = config;
		},
		// 请求
		http: (method, url, data) => {
			// 如果存在定时器，则清除前一个定时器
			if(requestTimer){ 
				requestTimer = '';
				clearTimeout(requestTimer);
			}
			const requsetConfig = vm.$d.requestIntercept({url, data, header: {}});
			return new Promise( (resolve, reject) => {
				if(httpConfig.showLoading){
					requestTimer = setTimeout( () => {
						uni.showLoading({
							title: httpConfig.loadingText || '加载中...',
							mask: true, // 是否存在蒙版
						});
						timeOutTimer = setTimeout( () => {
							uni.hideLoading();
							uni.showToast({title: '请求已超时',icon: 'none'});
							clearTimeout(timeOutTimer);
						}, httpConfig.timeout || 15000);
						clearTimeout(requestTimer);
					}, httpConfig.loadingTime || 1000);
				}
				uni.request({
					url: httpConfig.baseUrl + requsetConfig.url,
					method: method,
					header: requsetConfig.header,
					data: requsetConfig.data,
					timeout: httpConfig.timeout || 15000,
					success: (res) => {
						uni.hideLoading();
						clearTimeout(requestTimer);
						clearTimeout(timeOutTimer);
						return resolve(res)
					},
					fail: (err) => {
						uni.hideLoading();
						clearTimeout(requestTimer);
						clearTimeout(timeOutTimer);
						return reject(err)
					}
				});
			})
		},
		// get便捷请求
		get: (url, data) => {
			return new Promise( (resolve, reject) => {
				request.http('get', url, data).then( res => {
					return resolve(res)
				}).catch( err => {
					return reject(err)
				});
			}).then( res => {
				return new Promise((resolve, reject) => {
					return resolve(vm.$d.responseIntercept(res))
				});
			}).catch( err => {
				vm.$d.responseIntercept(err);
				return
			});
		},
		// post便捷请求
		post: (url, data) => {
			return new Promise( (resolve, reject) => {
				request.http('post', url, data).then(res => {
					return resolve(res)
				}).catch( err => {
					return reject(err)
				});
			}).then( res => {
				return new Promise((resolve, reject) => {
					return resolve(vm.$d.responseIntercept(res))
				});
			}).catch(err => {
				vm.$d.responseIntercept(err);
			});
		},
	};
	Vue.prototype.$d = request;
};
export default install;