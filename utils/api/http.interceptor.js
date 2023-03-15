/*
* 请求配置，请求响应拦截
*/
import devConfig from '@/utils/config.js';
function serializePara(para) {
    if (!para) {
        return para;
    }
    return Object.keys(para).reduce((obj, key) => {
        if (para[key] === null || para[key] === undefined) {
            return obj;
        }
        if (Array.isArray(para[key]) && typeof(para[key][0]) === 'string'||typeof(para[key][0]) === 'number') {
            obj[key] = para[key].join(',');
        } else {
            obj[key] = typeof(para[key]) === 'object' ? JSON.stringify(para[key]) : para[key];
        }
        return obj;
    }, {});
}
const install = (Vue, vm) => {
	const config = {
		baseUrl: devConfig.baseUrl,
		timeout: 15000,
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...', // 请求loading中的文字提示
		loadingTime: 1000, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		loadingMask: true, // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
		// 如果将此值设置为true，拦截回调中将会返回服务端返回的所有数据response，而不是response.data
		// 设置为true后，就需要在this.$u.http.interceptor.response进行多一次的判断，请打印查看具体值
		originalData: true,
		// 设置自定义头部content-type
		header: {
			'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
		}
	}
	Vue.prototype.$d.setConfig(config);
	// 请求拦截，配置Token等参数
	Vue.prototype.$d.requestIntercept = (config) => {
		try {
		    // 处理参数中的对象,解析为平级
		    config.data = serializePara(config.data);
		} catch (e) {
		    return false;
		}
		// config.header.Authorization ='token';
		config.data.token = '452yhx92653';
		return config; 
	}
	// 响应拦截，判断状态码是否通过
	Vue.prototype.$d.responseIntercept = (res, configs) => {
		let ret = handleResponse(res);
		if (!ret) {
			// 广播异常
		    uni.$emit('requestUnhandledRejection', res);
			return false
		}
		if(config.originalData){
			return res.data
		}
		return res
	}
}
function handleResponse(res) {
    if (res.statusCode == 200 && res.data.state == 'ok') {
        // 状态审核
		return true
    } else if(res.errMsg || res.data.state == 'fail'){
        return false
    };
}
export default {
	install
}