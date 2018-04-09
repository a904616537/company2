$(function() {
	// 初始化地图资源
	var sContent ="天安门坐落在中国北京市中心,故宫的南侧,与天安门广场隔长安街相望,是清朝皇城的大门...";
	var map = new BMap.Map("l-map");
	var point = new BMap.Point(116.404, 39.915);
	map.centerAndZoom(point, 15);
	var infoWindow = new BMap.InfoWindow(sContent);  // 创建信息窗口对象
	map.openInfoWindow(infoWindow,point); //开启信息窗口
	document.getElementById("r-result").innerHTML = "信息窗口的内容是：<br />" + infoWindow.getContent();
})