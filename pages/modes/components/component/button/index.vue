<template>
	<view class="padding-md buttonContent">
		<view>
			<view class="padding-tb-md font-bold text-word-spacing-1"> 默认按钮组 </view>
			<view class="margin-tb-md"><d-button>默认按钮</d-button></view>
			<view class="margin-tb-md"><d-button disabled loading @click="detail">禁用</d-button></view>
			<view class="margin-tb-md"><d-button disabled loading disabledGray @click="detail">灰底禁用</d-button></view>
			<view class="margin-tb-md"><d-button type="white" @click="detail">白色常规背景</d-button></view>
			<view class="margin-tb-md"><d-button disabled loading type="white" @click="detail">白色常规背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button type="danger" @click="detail">红色危险背景</d-button></view>
			<view class="margin-tb-md"><d-button disabled loading type="danger" @click="detail">红色危险背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button type="warning" @click="detail">黄色警告背景</d-button></view>
			<view class="margin-tb-md"><d-button disabled loading type="warning" @click="detail">黄色警告背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button type="green" @click="detail">绿色成功背景</d-button></view>
			<view class="margin-tb-md"><d-button disabled loading type="green" @click="detail">绿色成功背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button type="blue" @click="detail">蓝色默认背景</d-button></view>
			<view class="margin-tb-md"><d-button disabled loading type="blue" @click="detail">蓝色默认背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button type="gray" @click="detail">灰色暗淡按钮</d-button></view>
			<view class="margin-tb-md"><d-button disabled loading type="gray" @click="detail">灰色暗淡按钮+状态</d-button></view>
			<view class="margin-tb-md"><d-button type="black" @click="detail">黑色格调按钮</d-button></view>
			<view class="margin-tb-md"><d-button disabled loading type="black" @click="detail">黑色格调按钮+状态</d-button></view>
		</view>
		<view>
			<view class="padding-tb-md font-bold text-word-spacing-1"> 镂空按钮组 </view>
			<view class="margin-tb-md"><d-button plain>默认按钮</d-button></view>
			<view class="margin-tb-md"><d-button plain disabled loading @click="detail">禁用</d-button></view>
			<view class="margin-tb-md"><d-button plain disabled loading disabledGray @click="detail">灰底禁用</d-button></view>
			<view class="margin-tb-md"><d-button plain type="white" @click="detail">白色常规背景</d-button></view>
			<view class="margin-tb-md"><d-button plain disabled loading type="white" @click="detail">白色常规背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button plain type="danger" @click="detail">红色危险背景</d-button></view>
			<view class="margin-tb-md"><d-button plain disabled loading type="danger" @click="detail">红色危险背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button plain type="warning" @click="detail">黄色警告背景</d-button></view>
			<view class="margin-tb-md"><d-button plain disabled loading type="warning" @click="detail">黄色警告背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button plain type="green" @click="detail">绿色成功背景</d-button></view>
			<view class="margin-tb-md"><d-button plain disabled loading type="green" @click="detail">绿色成功背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button plain type="blue" @click="detail">蓝色默认背景</d-button></view>
			<view class="margin-tb-md"><d-button plain disabled loading type="blue" @click="detail">蓝色默认背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button plain  type="gray" @click="detail">灰色暗淡按钮</d-button></view>
			<view class="margin-tb-md"><d-button plain disabled loading type="gray" @click="detail">灰色暗淡按钮+状态</d-button></view>
			<view class="margin-tb-md"><d-button plain type="black" @click="detail">黑色格调按钮</d-button></view>
			<view class="margin-tb-md"><d-button plain disabled loading type="black" @click="detail">黑色格调按钮+状态</d-button></view>
		</view>
		<view>
			<view class="padding-tb-md font-bold text-word-spacing-1"> 圆角默认按钮组 </view>
			<view class="margin-tb-md"><d-button shape="circle">默认按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" disabled loading @click="detail">禁用</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" disabled loading disabledGray @click="detail">灰底禁用</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" type="white" @click="detail">白色常规背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" disabled loading type="white" @click="detail">白色常规背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" type="danger" @click="detail">红色危险背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" disabled loading type="danger" @click="detail">红色危险背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" type="warning" @click="detail">黄色警告背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" disabled loading type="warning" @click="detail">黄色警告背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" type="green" @click="detail">绿色成功背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" disabled loading type="green" @click="detail">绿色成功背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" type="blue" @click="detail">蓝色默认背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" disabled loading type="blue" @click="detail">蓝色默认背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle"  type="gray" @click="detail">灰色暗淡按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" disabled loading type="gray" @click="detail">灰色暗淡按钮+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" type="black" @click="detail">黑色格调按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" disabled loading type="black" @click="detail">黑色格调按钮+状态</d-button></view>
		</view>
		<view>
			<view class="padding-tb-md font-bold text-word-spacing-1"> 圆角空心按钮组 </view>
			<view class="margin-tb-md"><d-button shape="circle" plain>默认按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain disabled loading @click="detail">禁用</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain disabled loading disabledGray @click="detail">灰底禁用</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain type="white" @click="detail">白色常规背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain disabled loading type="white" @click="detail">白色常规背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain type="danger" @click="detail">红色危险背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain disabled loading type="danger" @click="detail">红色危险背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain type="warning" @click="detail">黄色警告背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain disabled loading type="warning" @click="detail">黄色警告背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain type="green" @click="detail">绿色成功背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain disabled loading type="green" @click="detail">绿色成功背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain type="blue" @click="detail">蓝色默认背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain disabled loading type="blue" @click="detail">蓝色默认背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain  type="gray" @click="detail">灰色暗淡按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain disabled loading type="gray" @click="detail">灰色暗淡按钮+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain type="black" @click="detail">黑色格调按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="circle" plain disabled loading type="black" @click="detail">黑色格调按钮+状态</d-button></view>
		</view>
		<view>
			<view class="padding-tb-md font-bold text-word-spacing-1"> 平角默认按钮组 </view>
			<view class="margin-tb-md"><d-button shape="rightAngle">默认按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" disabled loading @click="detail">禁用</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" disabled loading disabledGray @click="detail">灰底禁用</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" type="white" @click="detail">白色常规背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" disabled loading type="white" @click="detail">白色常规背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" type="danger" @click="detail">红色危险背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" disabled loading type="danger" @click="detail">红色危险背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" type="warning" @click="detail">黄色警告背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" disabled loading type="warning" @click="detail">黄色警告背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" type="green" @click="detail">绿色成功背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" disabled loading type="green" @click="detail">绿色成功背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" type="blue" @click="detail">蓝色默认背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" disabled loading type="blue" @click="detail">蓝色默认背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle"  type="gray" @click="detail">灰色暗淡按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" disabled loading type="gray" @click="detail">灰色暗淡按钮+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" type="black" @click="detail">黑色格调按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" disabled loading type="black" @click="detail">黑色格调按钮+状态</d-button></view>
		</view>
		<view>
			<view class="padding-tb-md font-bold text-word-spacing-1"> 平角镂空按钮组 </view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain>默认按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain disabled loading @click="detail">禁用</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain disabled loading disabledGray @click="detail">灰底禁用</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain type="white" @click="detail">白色常规背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain disabled loading type="white" @click="detail">白色常规背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain type="danger" @click="detail">红色危险背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain disabled loading type="danger" @click="detail">红色危险背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain type="warning" @click="detail">黄色警告背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain disabled loading type="warning" @click="detail">黄色警告背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain type="green" @click="detail">绿色成功背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain disabled loading type="green" @click="detail">绿色成功背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain type="blue" @click="detail">蓝色默认背景</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain disabled loading type="blue" @click="detail">蓝色默认背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain  type="gray" @click="detail">灰色暗淡按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain disabled loading type="gray" @click="detail">灰色暗淡按钮+状态</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain type="black" @click="detail">黑色格调按钮</d-button></view>
			<view class="margin-tb-md"><d-button shape="rightAngle" plain disabled loading type="black" @click="detail">黑色格调按钮+状态</d-button></view>
		</view>
		<view>
			<view class="padding-tb-md font-bold text-word-spacing-1"> 阴影按钮组 </view>
			<view class="margin-tb-md"><d-button shadow>默认按钮</d-button></view>
			<view class="margin-tb-md"><d-button shadow disabled loading @click="detail">禁用</d-button></view>
			<view class="margin-tb-md"><d-button shadow disabled loading disabledGray @click="detail">灰底禁用</d-button></view>
			<view class="margin-tb-md"><d-button shadow type="white" @click="detail">白色常规背景</d-button></view>
			<view class="margin-tb-md"><d-button shadow disabled loading type="white" @click="detail">白色常规背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shadow type="danger" @click="detail">红色危险背景</d-button></view>
			<view class="margin-tb-md"><d-button shadow disabled loading type="danger" @click="detail">红色危险背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shadow type="warning" @click="detail">黄色警告背景</d-button></view>
			<view class="margin-tb-md"><d-button shadow disabled loading type="warning" @click="detail">黄色警告背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shadow type="green" @click="detail">绿色成功背景</d-button></view>
			<view class="margin-tb-md"><d-button shadow disabled loading type="green" @click="detail">绿色成功背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shadow type="blue" @click="detail">蓝色默认背景</d-button></view>
			<view class="margin-tb-md"><d-button shadow disabled loading type="blue" @click="detail">蓝色默认背景+状态</d-button></view>
			<view class="margin-tb-md"><d-button shadow  type="gray" @click="detail">灰色暗淡按钮</d-button></view>
			<view class="margin-tb-md"><d-button shadow disabled loading type="gray" @click="detail">灰色暗淡按钮+状态</d-button></view>
			<view class="margin-tb-md"><d-button shadow type="black" @click="detail">黑色格调按钮</d-button></view>
			<view class="margin-tb-md"><d-button shadow disabled loading type="black" @click="detail">黑色格调按钮+状态</d-button></view>
		</view>
		<view>
			<view class="padding-tb-md font-bold text-word-spacing-1"> 自定义尺寸 </view>
			<view class="margin-tb-md"><d-button margin="0 20rpx 26rpx 0" width="280rpx" height="90rpx" :size="32">默认按钮</d-button></view>
			<view class="margin-tb-md"><d-button margin="0 20rpx 26rpx 0" type="danger" width="280rpx" height="90rpx" :size="32" @click="detail">按钮</d-button></view>
			<view class="margin-tb-md"><d-button margin="0 20rpx 26rpx 0" width="200rpx" height="80rpx" :size="28" @click="detail">按钮</d-button></view>
			<view class="margin-tb-md"><d-button margin="0 20rpx 26rpx 0" width="140rpx" height="60rpx" :size="24">按钮</d-button></view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.buttonContent{
		background-color: #dcdcdc;
	}
</style>