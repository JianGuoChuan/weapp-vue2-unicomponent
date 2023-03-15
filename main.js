import Vue from 'vue'
import App from './App'
import dKit from './utils/js/dKit.js'
import router from './utils/router/router.js'
import mixinStore from './store/$d.mixin.js'
import store from '@/store';
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/utils/api/http.interceptor.js';
// 请求方法配置
import request from '@/utils/api/request.js';
// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/utils/api/http.api.js';

Vue.prototype.$dKit = dKit;
Vue.prototype.$routes = router;
Vue.prototype.$store = store;

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
});

Vue.mixin(mixinStore);
Vue.use(request, app);
Vue.use(httpInterceptor, app);
Vue.use(httpApi, app);

app.$mount()

// 消息监听
uni.$on('requestUnhandledRejection', function(event) {
	let msg = event.msg || ( event.data && event.data.msg ) || event.errMsg ;
	uni.showToast({
	    icon: 'none',
	    position: 'bottom',
	    title: msg,
	    duration: 2000
	});
});
