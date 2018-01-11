App.directive('nsEcharts', function ($window, $timeout) {
	return {
		restrict: 'AC',
		templateUrl: 'directive/ns-echarts.html',
		link: function(scope, element, attrs) {
			var $echartsConfig = {
				tooltip: {
					trigger: 'axis'
				},
				title: {
					text: '约稿、供稿数量统计',
					subtext: '实时数据'
				},
				tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['约稿数量', '供稿数量']
				},
				color:['#3CC7EB','#AEC7FF'],
				toolbox: {
					show: true,
					feature: {
						mark: { show: true },
						dataView: { show: true, readOnly: false },
						magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
						restore: { show: true },
						saveAsImage: { show: true }
					}
				},
				calculable: true,
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"],
					splitLine:{show: false},//去除网格线
					axisLabel: {
                        show: true,
                    }
				}],
				yAxis: [{
					type: 'value',
					splitLine:{show: false},//去除网格线
					axisLabel: {
                        show: true,
                    }
				}],
				series: [{
						name: '约稿数量',
						type: 'line',
						smooth: true,
						itemStyle: { normal: { areaStyle: { type: 'default' } } },
						data: [10,3,16,7,15,11,18],
					},
					{
						name: '供稿数量',
						type: 'line',
						smooth: true,
						itemStyle: { normal: { areaStyle: { type: 'default' } } },
						data: [5,18,9,10,22,10,15],
					}
				]
			};
			if(!scope.$echartsInstance)
				scope.$echartsInstance = {};
			scope.$watch(attrs.echarts, function() {
				var option = angular.extend({}, $echartsConfig, scope.$eval(attrs.echarts));
				if(option.id) {
					scope.$echartsInstance[option.id] = echarts.init(element.find("#searchCost")[0]);
					scope.$echartsInstance[option.id].setOption(option);
				} else {
					scope.$echartsInstance = echarts.init(element.find("#searchCost")[0]);
					scope.$echartsInstance.setOption(option);
				}
			});
			$window.onresize = function() {
				if(scope.$echartsInstance.searchTimeOption)
					scope.$echartsInstance.searchTimeOption.resize();
				if(scope.$echartsInstance.searchCostOption)
					scope.$echartsInstance.searchCostOption.resize();
				if(scope.$echartsInstance.searchNumOption)
					scope.$echartsInstance.searchNumOption.resize();

			};
		}
	}
});