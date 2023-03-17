<template>
	<view>
		<d-button @click='test'>123</d-button>
		<d-tips ref="toast" backgroundColor="red"></d-tips>
	</view>
</template>

<script>
	export default {
		methods: {
			test() {
				let options = {
					msg: 111,
					duration: 2000
				};
				this.$refs.toast.showTips(options);
			}
		},
		onLoad() {
			
		}
	}
</script>

<style>
</style>