<template>
	<view class="padding-md">
		<button @tap='select(0)' class="margin-b-md">打开初始化弹框</button>
		<button @tap='select(1)' class="margin-b-md">修改按钮背景颜色</button>
		<button @tap='select(2)' class="margin-b-md">修改按钮文本颜色</button>
		<button @tap='select(3)' class="margin-b-md">筛选项开启折叠</button>
		<button @tap='select(4)' class="margin-b-md">遮罩层点击禁止关闭</button>
		<button @tap='select(5)' class="margin-b-md">禁止筛选后自动关闭</button>
		<button @tap='select(101)' class="margin-b-md">支持调整弹出方向</button>
		<button @tap='select(101)' class="margin-b-md">支持初始化弹框宽度</button>
		<button @tap='select(101)' class="margin-b-md">支持修改弹框标题</button>
		<button @tap='select(101)' class="margin-b-md">筛选配置请查看源码</button>
		<Dfilter v-model="show" :config='config' 
			:mode='mode'
			:filterBtnBgColor='fBgColor'
			:resetBtnBgColor='rBgColor'
			:filterBtnColor='fColor'
			:resetBtnColor='rColor'
			:isMaskClick='isMaskClick'
			:isAutoClose='isAutoClose'
			@filter='filter'></Dfilter>
	</view>
</template>

<script>
	import Dfilter from "@/components/extension/d-filter/d-filter.vue"
	export default {
		components: { 
			Dfilter
		},
		data() {
			return {
				show: false,
				mode: 'right',
				fBgColor: '',
				rBgColor: '',
				fColor: '',
				rColor: '',
				isMaskClick: true,
				isAutoClose: true,
				config: [
					{
						title: '标签',
						prop: 'type',
						type: 'label',
						active: 0,
						options: [
							{ label: "不限", value: 0 },
							{ label: "月结", value: 1 },
							{ label: "日结日结日结", value: 2 },
							{ label: "小时工", value: 3 },
							{ label: "计件", value: 4 }
						]
					},{
						title: '多选',
						prop: 'checked',
						type: 'checked',
						options: [
							{ label: "是否1", value: '0', checked: true },
							{ label: "是否2", value: '1', checked: false },
						]
					},{
						title: '单选',
						prop: 'radio',
						type: 'radio',
						active: 0,
						options: [
							{ label: "38", value: 1 },
							{ label: "39", value: 2 },
							{ label: "40", value: 3 },
						],
						foldClose: true
					},{
						title: '区间',
						prop: 'intervalValue',
						minPlaceholder: '自定义最小值',
						maxPlaceholder: '自定义最大值',
						type: 'interval',
						foldClose: false 
					},{
						title: '日期区间',
						prop: 'dateTimeValue',
						starPlaceholder: '起始日期',
						endPlaceholder: '截止日期',
						type: 'dateTime',
						foldClose: false 
					}
				]
			}
		},
		onLoad() {
			
		},
		methods: {
			select(index){
				switch(index){
					case 0: 
						this.mode = 'right';
						this.fBgColor = '';
						this.rBgColor = '';
						this.fColor = '';
						this.rColor = '';
						const index1 = this.config.findIndex(item => item.prop == 'radio');
						this.config[index1].foldClose = undefined;
						this.isMaskClick = true;
						this.isAutoClose = true;
						break;
					case 1: 
						this.fBgColor = 'red';
						this.rBgColor = '#b8db7c';
						this.fColor = '';
						this.rColor = '';
						break;
					case 2:
						this.fBgColor = '';
						this.rBgColor = '';
						this.fColor = 'red';
						this.rColor = '#b8db7c';
						break;
					case 3:
						const index3 = this.config.findIndex(item => item.prop == 'radio');
						this.config[index3].foldClose = false;
						break;
					case 4:
						this.isMaskClick = false;
						this.isAutoClose = true;
						break;
					case 5:
						this.isMaskClick = true;
						this.isAutoClose = false;
						break;
					default: break;
				}
				if(index == 101) return
				this.show = true;
			},
			filter(e){
				console.log(e);
			},
			reset(e){
				console.log(e);
			},
		}
	}
</script>

<style scoped lang="scss">
	
</style>
