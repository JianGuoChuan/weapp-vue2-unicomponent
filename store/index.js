import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let localData = {};

let WX_ENV = 'develop';
// #ifdef MP-WEIXIN
WX_ENV = __wxConfig.envVersion;
// #endif
try{
	// 尝试获取本地是否存在localData变量，第一次启动APP时是不存在的
	localData = uni.getStorageSync('localData');
}catch(e){}
// 需要永久存储，且下次APP启动需要取出的，在state中的变量名，需要永久保存的数据必须在此预配置变量名
let saveStateKeys = ['vuex_userinfo', 'vuex_token', 'vuex_env_token', 'vuex_versionCode', 'vuexBaseUrl'];
// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的localData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('localData');
		// 第一次打开APP，不存在localData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		// 带有_env标志的配置项会具备不同微信环境的数据隔离能力，即开发版存储的数据与体验版、生产版的数据不再互通
		// #ifdef MP-WEIXIN
		if( key.indexOf('_env') != -1 ){
			if( WX_ENV == 'develop' ){
				if( tmp[key] && ( tmp[key].trial || tmp[key].release)){
					tmp[key].develop = value;
				}else{
					tmp[key] = { develop: value };
				}
			}
			if( WX_ENV == 'trial' ){ 
				if(tmp[key] && (tmp[key].develop || tmp[key].release)){
					tmp[key].trial = value;
				}else{
					tmp[key] = { trial: value };
				}
			}
			if( WX_ENV == 'release' ){
				if(tmp[key] && (tmp[key].develop || tmp[key].trial)){
					tmp[key].release = value;
				}else{
					tmp[key] = { release: value };
				}
			}
			uni.setStorageSync('localData', tmp);
			return
		} 
		// #endif
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的localData对象中
		uni.setStorageSync('localData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		// 不需要本地永久存储的无需添加前缀，使用方式与永久方式一致，区别在于不会添加到本地localData中
		// 如果上面从本地获取的localData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		// _env标识的参数具备环境隔离能力，因此需要配置的参数与其他有部分差异
		vuex_env_token: WX_ENV == 'develop' ? (localData.vuex_env_token && localData.vuex_env_token.develop) : 
		WX_ENV == 'trial' ? (localData.vuex_env_token && localData.vuex_env_token.trial) : 
		WX_ENV == 'release' ? (localData.vuex_env_token && localData.vuex_env_token.release) : {},
		// 不具备环境隔离能力的正常配置
		vuex_token: localData.vuex_token ? localData.vuex_token : '',
		vuex_userinfo: localData.vuex_userinfo ? localData.vuex_userinfo : {},
		vuexBaseUrl: localData.vuexBaseUrl ? vuexBaseUrl : '',
		vuex_versionCode: localData.vuex_versionCode ? localData.vuex_versionCode : '',
	},
	mutations: {
		$dStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})
export default store