/*
* 数据校验，规则匹配
*/
let rules = {
    money: [/^(?!0\.00)(?:0|[1-9]\d*)(?:\.\d{1,2})?$/, "请填写有效的金额"],
    digits: [/^\d+$/, "请填写数字"],
    letters: [/^[a-z]+$/i, "请填写字母"],
    date: [/^\d{4}-\d{2}-\d{2}$/, "请填写有效的日期，格式:yyyy-mm-dd"],
    time: [/^([01]\d|2[0-3])(:[0-5]\d){1,2}$/, "请填写有效的时间，00:00到23:59之间"],
    email: [/^[\w\+\-]+(\.[\w\+\-]+)*@[a-z\d\-]+(\.[a-z\d\-]+)*\.([a-z]{2,4})$/i, "请填写有效的邮箱"],
    url: [/^(https?|s?ftp):\/\/\S+$/i, "请填写有效的网址"],
    qq: [/^[1-9]\d{4,}$/, "请填写有效的QQ号"],
    IDcard: [/^\d{6}(19|2\d)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)?$/, "请填写正确的身份证号码"],
    tel: [/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, "请填写有效的电话号码"],
    mobile: [/^1[3-9]\d{9}$/, "请填写有效的手机号"],
    zipcode: [/^\d{6}$/, "请检查邮政编码格式"],
    chinese: [/^[\u0391-\uFFE5]+$/, "请填写中文字符"],
    username: [/^\w{3,12}$/, "请填写3-12位数字、字母、下划线"],
    password: [/^\w{8,16}$/, "请填写8-16位数字、字母、下划线"],
    eovacode: [/^\w{3,50}$/, "编码由3-50位数字、字母、下划线组成"],
    mescode: [/^(\w|\-){3,32}$/, "编码由3-32位数字、字母、下划线以及-组成组成"],
    totalprice: [/((^[1-9]\d{0,6})|^0)(\.\d{1,4})?$/, "请填写有效的金额"],
    unitprice: [/((^[1-9]\d{0,6})|^0)(\.\d{1,8})?$/, "请填写有效的金额"],
    num: [/^[0-9][0-9]*([.][0-9]+)?$/, "请输入整数或小数"]
};
let kit = {
	checkByRule(ruleKey, value) {
		if(!rules[ruleKey]){
			return {
				code: 201,
				msg: '找不到该预设规则',
				data: false
			}
		}
		const rule = rules[ruleKey][0];
		const errText = rules[ruleKey][1];
		return {
			code: 200,
			msg: rule.test(value) ? '' : errText,
			data: rule.test(value)
		};
	},
    isPrice(price){
        this.checkByRule('unitprice',price);
    },
    isPhone(phone) {
        this.checkByRule('mobile',phone);
    },
};
export default kit;