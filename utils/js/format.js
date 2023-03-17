/*
* 数据格式化
*/
function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}
let formatKit = {
	// 日期格式化 固定形式
	dateTimeFormat(datetime) {
		let date = new Date(datetime);
		let YY = (date.getFullYear() + '').substring(2,4) + '-';
		let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		return YY + MM + DD +" " + hh + mm
	},
	// 日期格式化 自定义形式
	customDateTimeFormat(date , fmt){
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
		}
		let o = {
			'M+': date.getMonth() + 1,
			'd+': date.getDate(),
			'h+': date.getHours(),
			'm+': date.getMinutes(),
			's+': date.getSeconds()
		}
		for (let k in o) {
			if (new RegExp(`(${k})`).test(fmt)) {
				let str = o[k] + ''
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
			}
		}
		return fmt
	},
	// 千位分隔符 示例：5,000.50
	thousandSeparator(amount){
		const integer = amount.split('.')[0]; // 取得整数位
		const decimal = amount.split('.')[1]; // 取得小数位
		if(decimal){ // 如果存在小数位，保留小数位，整数位格式化
			return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
		}
		 // 如果不存在小数位，小数位补.00，整数位格式化
		return integer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '.00'
	},
	// 分数格式化，示例：4.5/5.0
	scoreFormat(score){
		const scoreValue = score.toString(); // 格式转换
		if( scoreValue.split('.').length <= 1 ){ // 是否存在小数位 
			return scoreValue + '.0'; // 不存在补.0
		}
		return scoreValue
	},
	/* 表单序列化：对象形式返回地址中携带的参数 */
	getQueryObject(url) {
		url = url == null ? window.location.href : url
		const search = url.substring(url.lastIndexOf('?') + 1)
		const obj = {}
		const reg = /([^?&=]+)=([^?&=]*)/g
		search.replace(reg, (rs, $1, $2) => {
			const name = decodeURIComponent($1)
			let val = decodeURIComponent($2)
			val = String(val)
			obj[name] = val
			return rs
		})
		return obj
	},
	// 自定义脱敏 str：文本	frontLen：前面显示的文本位数	endLen：后面显示的文本位数
	plusXing(str, frontLen, endLen) {
		str = str.replace(/\s/g, "");
		if (str.length == 2) {
			return str.substring(0, frontLen) + '*'
		}
		if (str.length <= (frontLen + endLen)) {
			return str.substring(0, frontLen) + '*'
		}
		var len = str.length - frontLen - endLen;
		var xing = '';
		for (var i = 0; i < len; i++) {
			xing += '*';
		}
		return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
	},
	//金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
	fenToYuan(val) {
		var str = (val/100).toFixed(2) + '';
		var intSum = str.substring(0,str.indexOf(".")).replace( /\B(?=(?:\d{3})+$)/g, ',' );//取到整数部分
		var dot = str.substring(str.length,str.indexOf("."))//取到小数部分搜索
		var ret = intSum + dot;
		return ret;
	},
	// 生成一个随机Id
	getID(){
	   return Number(Math.random().toString().substr(2) + Date.now()).toString(36)
	}
}
export default formatKit