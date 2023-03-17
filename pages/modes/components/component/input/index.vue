<template>
	<view class="padding-md">
		<d-inputBar v-model="value" :clearIcon='true'
			leftIcon='icon-ecrt icon-ecrt-search'></d-inputBar>
		<d-searchBar :options="options" mode='typeSearch'></d-searchBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				searchKey: '',
				options: [{
						label: 'ICCID',
						desc : '按卡ICCID搜索',
						value: 'iccid',
						checked : true
					},{
						label: '按渠道',
						desc : '按归属渠道搜索',
						value: 'formChannel',
						checked : false
					},
				],
			}
		},
	}
</script>

<style>
</style>