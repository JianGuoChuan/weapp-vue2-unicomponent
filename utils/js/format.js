/*
* 数据格式化
*/
function padLeftZero(str) {
	return ('00' + str).substr(str.length)
}
let formatKit = {
	// 日期格式化
	dateTimeFormat(datetime) {
		let date = new Date(datetime);
		let YY = (date.getFullYear() + '').substring(2,4) + '-';
		let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
		let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		return YY + MM + DD +" " + hh + mm
	},
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
	}
}
export default formatKit