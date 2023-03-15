// 保留的自定义请求方法，无需配置api，直接引入使用
const systemInfo = uni.getSystemInfoSync();
import devConfig from '@/utils/config.js';
let requestNum = 0;
const fetch = ( method, url, data = {}, callback, closeloading) => {
	const token = uni.getStorageSync('Token');
	if(!closeloading){
		uni.showLoading({title: '加载中',mask: true});
	}
	requestNum++;
	uni.request({
		method,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
		},
		url: `${devConfig.baseUrl}${url}`,
		data,
		success: res => {
			setTimeout(() => {
				callback(res.data);
			}, 100);
		},
		fail: () => {
			uni.showToast({
				icon: "none",
				title: "请求失败"
			});
		},
		complete: () => {
			requestNum--;
			if (requestNum <= 0) {
				if(!closeloading){
					uni.hideLoading();
				}
			}
		}
	});
};

module.exports = {
	getJson: (url, data, callback, closeloading) => {
		fetch('get', url, data, callback, closeloading);
	},
	postJson: (url, data, callback, closeloading) => {
		fetch('post', url, data, callback), closeloading;
	},
	putJson: (url, data, callback, closeloading) => {
		fetch('put', url, data, callback, closeloading);
	}
};
