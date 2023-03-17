<template>
	<view class="padding-md">
		<button @tap='show = true'>123</button>
		<Dfilter v-model="show" :config='config' @filter='filter'></Dfilter>
	</view>
</template>

<script>
	import Dfilter from "@/components/d/d-filter/d-filter.vue"
	export default {
		components: { 
			Dfilter
		},
		data() {
			return {
				show: false,
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
						title: '标签2',
						prop: 'type2',
						type: 'label',
						active: 0,
						options: [
							{ label: "不限", value: 0 },
							{ label: "月结", value: 1 },
							{ label: "日结", value: 2 },
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
						foldClose: false
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
