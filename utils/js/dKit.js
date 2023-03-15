/*
* 通用方法
*/
let kit = {
	// 复制文本
	copyText(copyValue){
		let that = this;
		uni.setClipboardData({
			data:copyValue, //要被复制的内容
			success:()=>{ //复制成功的回调函数
				that.toast("内容已复制")
			}
		});
	},
	// 扫码
	scanCode() {
		// #ifdef H5
		console.log( '此方法需要在真实环境下执行' );
		// #endif
	    return new Promise((reslove, reject) => {
	        uni.scanCode({
	            success(res) {
	                reslove(res);
	            },
	            fail(err) {
	                reject(res);
	            }
	        });
	    });
	},
	// 清除所有存储
	clearStorage(key) {
		if(key){
			uni.removeStorageSync(key);
			return
		}
		uni.clearStorage();
	}
}
export default kit