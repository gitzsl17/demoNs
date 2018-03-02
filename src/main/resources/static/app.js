define(function (require, exports, module) {
	var angular = require('angular');
	var asyncLoader = require('angular-async-loader');
	require('angular-zh-cn');
	require('angular-ui-router');
	require('angular-ui-sortable');

	require('angular-route');
	require('angular-resource');
	require('angular-touch');
	require('angular-mocks');
	require('angular-cookies');
	require('angular-animate');
	require('angular-css');
	require('angular-hotkeys');
	require('angular-color-picker');

	require('angular-translate');
	require('angular-translate-storage-cookie');
	require('angular-translate-storage-local');
	require('angular-translate-loader-static-files');
	require('angular-translate-loader-partial');
	
	require('angular-uuid2');
	require('ng-file-upload');
	require('ng-file-upload-shim');
	require('ng-contextmenu');

//	require('betsol-load-stylesheet');
//	require('betsol-ng-ui-router-styles');
	require('ui.bootstrap');

	var app = angular.module('app', ['ui.router', 'ui.sortable', 'ngResource', 'ngAnimate', 'ngCookies', 'ngContextMenu',
		'pascalprecht.translate', 'ui.bootstrap', 'angularUUID2', 'ngFileUpload', 'angularCSS', 'cfp.hotkeys', 'mp.colorPicker']);
	app.run(['$state', '$stateParams', '$rootScope', '$translate', '$css',
		/** @memberOf app */
		function run($state, $stateParams, $rootScope, $translate, $css) {
			$rootScope.$state = $state;
			$rootScope.$stateParams = $stateParams;
			
			$css.add('3rd/angular-color-picker.css');

			$rootScope.supportedLanguages = angular.extend({
				en_US: 'English',
				zh_CN: '简体中文'
			}, app.supportedLanguages);

			$rootScope.changeLanguage = function (langKey) {
				$translate.use(langKey);
			};
			$rootScope.getCurrentLanguage = function () {
				return $translate.proposedLanguage() || $translate.use();
			};
			$rootScope.objKeys = function (obj) {
				return obj ? Object.keys(obj) : [];
			};
			$rootScope.saveJsonToFile = function (data, filename) {
				if (!data) {
					console.error('No data');
					return;
				}

				if (!filename) {
					filename = 'download.json';
				}

				if (typeof data === 'object') {
					data = angular.toJson(data, 2);
				}

				var blob = new Blob([data], { type: 'text/json' }),
					e = document.createEvent('MouseEvents'),
					a = document.createElement('a');

				a.download = filename;
				a.href = window.URL.createObjectURL(blob);
				a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
				e.initEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
				a.dispatchEvent(e);
			};


			$rootScope.toDataChange = function (obj, arr, ignoreNull, dataType) {
				var change = { id: obj['id'], items: {} };
				angular.forEach(arr, function (key) {
					if (ignoreNull && (obj[key] === null || 'undefined' === typeof obj[key])) {
						return;
					}
					var opts = [];
					opts.push({'set':obj[key]});

					if (dataType && dataType[key]) {
						change.items[key] = {'opts': opts, "type":dataType[key]};
					} else {
						change.items[key] = {'opts': opts};
					}
				});
				return change;
			};
			$rootScope.toDataChangeEx = function (obj, key, arr, ignoreNull, dataType) {
				var change = { id: obj[key], items: {} };
				angular.forEach(arr, function (key) {
					if (ignoreNull && (obj[key] === null || 'undefined' === typeof obj[key])) {
						return;
					}
					var opts = [];
					opts.push({'set':obj[key]});
					if (dataType && dataType[key]) {
						change.items[key] = {'opts': opts, "type":dataType[key]};
					} else {
						change.items[key] = {'opts': opts};
					}
				});
				return change;
			};

			$rootScope.ProcStateTexts = {
				'null': 'null',
				Waiting: '尚未开始',
				Running: '流程进行中',
				Terminated: '流程已经终止',
				Completed: '流程已完成'
			};
			
			$rootScope.ProcStateIcons = {
				Waiting: 'fa-circle-thin text-default',
				Running: 'fa-futbol-o fa-spin text-primary',
				Terminated: 'fa-square text-danger',
				Completed: 'fa-check-circle text-success'
			};

			$rootScope.ActStateTexts = {
				Waiting: '等待中',
				Running: '正在执行',
				Terminated:	'被终止了',
				Completed: '已完成',
				Exception: '出异常啦'
			};

			$rootScope.WorkStateTexts = {
				'null': 'null',
				Waiting: '等待处理',
				Received: '已被领取',
				Working: '正在处理',
				Terminated: '已被终止',
				Completed: '已完成',
				Exception: '出错啦'
			};
			
			$rootScope.WorkStateIcons = {
					'null': 'null',
					Waiting: 'fa-hourglass-1',
					Received: 'fa-handshake-o',
					Working: 'fa-hourglass-2',
					Terminated: 'fa-minus-circle',
					Completed: 'fa-check-circle',
					Exception: 'fa-times-circle'
				};

			$rootScope.JobStateTexts = {
				'IsWaiting' : '待处理',
				'Doing'     : '正在处理',
				'OK'        : '成功',
				'Failure'   : '失败',
				'Error'     : '出错',
				'Suspanded' : '挂起'
			};

			$rootScope.WorkStateIcons = {
				Waiting: 'fa-hourglass-1 text-info',
				Received: 'fa-handshake-o text-primary',
				Working: 'fa-hourglass-2 fa-spin text-primary',
				Terminated: 'fa-minus-circle text-warning',
				Completed: 'fa-check-circle text-success',
				Exception: 'fa-times-circle text-danger'
			};

			$rootScope.SvcStateIcons = {
				'true': 'fa-futbol-o fa-spin text-primary',
				'false': 'fa-square text-danger'
			};

			$rootScope.ETypes = [
			    { type: "INT", caption: "整数(32位)" },
			    { type: "LONG", caption: "整数(64位)" },
			    { type: "DOUBLE", caption: "浮点数字" },
			    { type: "STRING", caption: "字符串" },
			    { type: "TEXT", caption: "文本" },
			    { type: "BOOLEAN", caption: "布尔" },
			    { type: "DATETIME", caption: "日期（含时间）" },
			    { type: "DATE", caption: "日期（不含时间）" }
			];

			$rootScope.ESubTypes = [
			    { type: "Unrestricted", caption: " " },
			    { type: "StationId", caption: " 站点Id " },
			    { type: "DepartmentId", caption: " 部门Id " },
			    { type: "UserId", caption: " 用户Id " },
			    { type: "GroupId", caption: " 工作组（栏目）Id " },
			    { type: "RoleId", caption: " 角色Id " },
			    { type: "FolderId", caption: " 文件夹Id " },
			    { type: "ProjectId", caption: " 项目Id " },
			    { type: "ApplicationId", caption: " 应用Id " },
			    { type: "AssetId", caption: " 资产Id " },
			    { type: "FileId", caption: " 文件Id " },
			    { type: "DeviceId", caption: " 存储设备Id " },
			    { type: "SessionId", caption: " 会话Id " }
			];
			
			$rootScope.MTypes = $rootScope.ETypes.toMap('type', 'caption');
			$rootScope.MSubTypes = $rootScope.ESubTypes.toMap('type', 'caption');
			
			$rootScope.LogoutTypes = [
			    { type: "NONE", caption: "不处理" },
			    { type: "BACK_CHANNEL", caption: "通过制定的地址通知该应用" },
			    { type: "FRONT_CHANNEL", caption: "重定向回CAS服务" }
			];
		}]);

	app.config(['$translateProvider', '$translatePartialLoaderProvider',
		/** @memberOf app */
		function $translateProvider1($translateProvider, $translatePartialLoaderProvider) {
			$translateProvider.useSanitizeValueStrategy('escape');
			$translateProvider.useLoader('$translatePartialLoader', {
				// TODO read require confg urlArgs
				urlTemplate: './{part}/l10n/{lang}.json'// + "?bust=" + (new Date()).getTime()
			});
			$translateProvider.preferredLanguage('zh_CN');
			$translateProvider.useLocalStorage();
			$translateProvider.storageKey('lang');
		}]);

	app.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
		return {
			request: function (config) {
				return config;
			},
			requestError: function (rejection) {
				return $q.reject(rejection);
			},
			response: function (response) {
				if(!!response.data)
					response.data.$authMode = response.headers('AUTH_MODE');
				return response;
			},
			responseError: function (rejection) {
				switch (rejection.status) {
					case 0:
					case 401:
					case 403:
						if ($rootScope.session) {
							$rootScope.session = undefined;
						}
						// TODO 使用过程中超长时间未动，会话过期了
						// 需要判断之前是从cas还是local登录的，然后跳转到相应的登录？
						// 或者判断一下不是retrieve和logon造成的，然后提示一下会话过期了，然后跳转到相应登录
						// TODO 先不判断了，如果一切认证经过cas管理，我们这里会话永不过期就行了
						break;
				}
				return $q.reject(rejection);
			}
		};
	});
	app.config(function ($httpProvider) {
		$httpProvider.interceptors.push('authInterceptor');
	});

	app.factory('Message', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
		/** @memberOf app */
		function Message() { }

		$rootScope.messages = [];

		return {
			defaults: {
				level: 'warning',
				closable: false,
				lifecycle: 2000,
				close: function () {
					$rootScope.messages.splice($rootScope.messages.indexOf(this), 1);
				}
			},
			danger: function (text, closable) {
				this.show({ text: text, level: 'danger', closable: closable || false });
			},
			warn: function (text, closable) {
				this.show({ text: text, level: 'warning', closable: closable || false });
			},
			info: function (text, closable) {
				this.show({ text: text, level: 'info', closable: closable || false });
			},
			success: function (text, closable) {
				this.show({ text: text, level: 'success', closable: closable || false });
			},
			show: function (msg) {
				msg = $.extend(true, {}, this.defaults, msg);
				$rootScope.messages.push(msg);
				if (!msg.closable) {
					$timeout(function () {
						msg.close();
					}, msg.lifecycle);
				}
			}
		};
	}]);
	
	app.factory('Geom', function() {
		/** Tools */
		// 几何函数	
		/** @memberOf nSiteConsoleServices */
		function Geom (){}
		// 已知：
		// 1.以点A(x0, y0)为中心，宽高为w, h的矩形
		// 2.点B(x1, y1)
		// 计算向量1 -> 2与矩形边相交的点
		Geom._interact = function (x0, y0, w, h, x1, y1) {
			var x = 0;
			var y = 0;

			var sx = x1 - x0;
			var sy = y1 - y0;
			var sw = w / 2;
			var sh = h / 2;

			if (sx == 0) {
				x = x0;
				y = y0 + (sy >= 0 ? sh : -sh);
			} else if (sy == 0) {
				x = x0 + (sx >= 0 ? sw : -sw);
				y = y0;
			} else if (Math.abs(sy) * w <= h * Math.abs(sx)) {
				x = x0 + (sx >= 0 ? sw : -sw);
				y = y0 + sy * sw / Math.abs(sx);
			} else if (Math.abs(sy) * w > h * Math.abs(sx)) {
				x = x0 + sx * sh / Math.abs(sy);
				y = y0 + (sy >= 0 ? sh : -sh);
			}
			return [x, y];
		};
		// 计算交点的简化写法
		Geom.interact = function (size, pt0, pt1) {
			var t = this._interact(pt0.x, pt0.y, size.w, size.h, pt1.x, pt1.y);
			return {x: t[0], y: t[1]};
		};
		// 重新规划，根据矩形中心点到第二点的向量与矩形边的交点，修改第一点的坐标
		Geom.interactStart = function(rect, pts) {
			if(pts.length < 2) return;
			var pt = this.interact(rect.size, this.mid(rect), pts[1]);
			pts[0].x = pt.x; pts[0].y = pt.y;
		};
		// 重新规划，修改最后一点的坐标
		Geom.interactEnd = function(rect, pts) {
			if(pts.length < 2) return;
			var pt = this.interact(rect.size, this.mid(rect), pts[pts.length - 2]);
			pts[pts.length - 1].x = pt.x; pts[pts.length - 1].y = pt.y;
		};
		// 取矩形区域的重点坐标
		Geom.mid = function(rect) {
			return {
				x: rect.leftTop.x + rect.size.w / 2.0,
				y: rect.leftTop.y + rect.size.h / 2.0
			};
		};
		// 取落在范围内的数字，如果溢出则返回边界
		Geom.bound = function(min, max, num) {
			return Math.max(min, Math.min(max, num));
		},
		// 取半像素，以使线更细
		Geom.sharpen = function(num) {
			return Math.round(num + 0.5) - 0.5;
		};
		// 计算两点间距离
		Geom.distance = function (pt1, pt2) {
			return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
		};
		// 计算两点向量的角度（弧度）
		Geom.sita = function (pt1, pt2) {
			var row = this.distance(pt1, pt2);
			var y = pt2.y - pt1.y;
			var x = pt2.x - pt1.x;
			if (row == 0) {
				return 0;
			} else if (x >= 0) {
				return Math.asin(y / row);
			} else {
				return Math.PI - Math.asin(y / row);
			}
		};
		// 判断点是否落在矩形内，严格
		Geom.hitRect = function (rect, pt) {
			return pt.x >= rect.leftTop.x
				&& pt.x <= rect.leftTop.x + rect.size.w
				&& pt.y >= rect.leftTop.y
				&& pt.y <= rect.leftTop.y + rect.size.h;
		};
		Geom.hitRects = function(rect, rt1) {
			return rt1.leftTop.x >= rect.leftTop.x
				&& rt1.leftTop.x + rt1.size.w <= rect.leftTop.x + rect.size.w
				&& rt1.leftTop.y >= rect.leftTop.y
				&& rt1.leftTop.y + rt1.size.h <= rect.leftTop.y + rect.size.h;
		},
		// 判断点pt0是否落在pt1和pt2的连线上，近似
		Geom.hitLine = function(pt0, pt1, pt2) {
			return Geom.distance(pt0, pt1) + Geom.distance(pt0, pt2)
					- Geom.distance(pt1, pt2) < 3;
		};
		// 计算经过所有点的Bezier曲线的控制点
		Geom.genCtrlPoints = function (pts) {
			var cpts = [pts[0]];
			for (var i = 1; i < pts.length; i++) {
				if (i == pts.length - 1) {
					cpts.push(pts[i]);
				} else {
					var x1 = pts[i].x, y1 = pts[i].y;
					var x2 = pts[i - 1].x, y2 = pts[i - 1].y;
					var x3 = pts[i + 1].x, y3 = pts[i + 1].y;
					cpts.push({x : x1 + x2 / 4 - x3 / 4, y : y1 + y2 / 4 - y3 / 4});
					cpts.push({x : x1 + x3 / 4 - x2 / 4, y : y1 + y3 / 4 - y2 / 4});
				}
			}
			return cpts;
		};
		// 返回夹杂控制点的新数组，在点之间插入了Bezier控制点，[x0,y0,cx1,cy1,cx2,cy2,x1,y1....]
		Geom.mergeCtrlPoints = function(pts) {
			var cpts = this.genCtrlPoints(pts);
			var arr = [pts[0]];
			for (var i = 1; i < pts.length; i++) {
				var ptc1 = cpts[(i - 1) * 2];
				var ptc2 = cpts[(i - 1) * 2 + 1];
				arr.push(ptc1, ptc2, pts[i]);
			}
			return arr;
		};
		// 创建SvgPath对象，链式操作
		Geom.createSvgPath = function() {
			var _arr = [];
			return {
				_make : function (type, pts) {
					if (pts instanceof Array) {
						var pt = pts.shift();
						_arr.push(type, pt.x, ',', pt.y);
						angular.forEach(pts, function (pt) {
							_arr.push(' ', pt.x, ',', pt.y);
						});
					} else {
						_arr.push(type, pts.x, ',', pts.y);
					}
					return this;
				},
				curveC : function (pts) {
					return this._make('C', pts);
				},
				move : function (pts) {
					return this._make('M', pts);
				},
				line : function (pts) {
					return this._make('L', pts);
				},
				close : function () {
					_arr.push('z');
					return this;
				},
				toString : function () {
					return _arr.join('');
				}
			};
		};
		return Geom;
	});
	
	app.factory('Gis', function() {
		/** @memberOf app */
		function Gis(){}

		// 通过百度的接口，获取lbs对应的地址信息，注意由于百度接口调用次数有限制，所以这里实现了尽量少的调用
		var loadingBMP = false;
		var consumers = {};
		var cache = {};
		var getting = {};
		
		/** @memberOf LocationHelper */
		var _getGeoLocation = function(lbs, callback) {
			// TODO 这里有个硬编码，所有不符合条件的坐标都以SMG所在地的坐标替换
			lbs = lbs != null && lbs.split(',').length === 2 && lbs !== '0,0' ? lbs : null;//'121.471864,31.23406';
			if(lbs == null) {
				callback('');
				return;
			}
			(consumers[lbs] || (consumers[lbs] = [])).push(callback);
			if('undefined' !== typeof BMap) {
				_getGeoLocationInner(lbs);
				return;
			} else if(loadingBMP) {
				return;
			}
			
			_loadBMP(function(success){
				if(success) {
					$.each(consumers, function(key, i){
						_getGeoLocationInner(key);
					});
				}
			});
			/** @memberOf LocationHelper */
			function _getGeoLocationInner(lbs) {
				if(cache[lbs]) {
					consumers[lbs].forEach(function(fun){
						 fun(cache[lbs]);
					});
					delete getting[lbs];
					delete consumers[lbs];
					return;
				}
				if(getting[lbs]) {
					return;
				}
				getting[lbs] = lbs;
				var s = lbs.split(',');
				var pt = new BMap.Point(s[0], s[1]);
				new BMap.Geocoder().getLocation(pt, function(rs){
					var addr = rs ? rs.address : '';
					cache[lbs] = addr;
					consumers[lbs].forEach(function(fun){
						 fun(addr);
					});
					delete getting[lbs];
					delete consumers[lbs];
				});
			}
		};
		
		/** @memberOf LocationHelper */
		var _loadBMP = function(callback) {
			loadingBMP = true;
			$.ajax({
				url: 'http://api.map.baidu.com/getscript?v=2.0&ak=epWoVCqlhofczATzUN0gl4UT&services=&t=20141204161725',
				dataType: 'script',
				success: function(response, status){
					callback(!!BMap);
				}
			});
		};
		
		// 根据IP地址
		var __patternIPv4 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		var __patternIntranet = /^(127\.0\.0\.1)|(localhost)|(10\.\d{1,3}\.\d{1,3}\.\d{1,3})|(172\.((1[6-9])|(2\d)|(3[01]))\.\d{1,3}\.\d{1,3})|(192\.168\.\d{1,3}\.\d{1,3})$/;
		
		/** @memberOf LocationHelper */
		var _getIPLocation = function(ip, callback) {
			var addr = __patternIntranet.test(ip) || '0:0:0:0:0:0:0:1' === ip ? '内网' : __patternIPv4.test(ip) ? '外网' : ''/*非IP*/;
			
			if(addr !== '外网') {
				callback(addr);
				return;
			}
			(consumers[ip] || (consumers[ip] = [])).push(callback);
			_getIPLocationInner(ip);
			
			/** @memberOf LocationHelper */
			function _getIPLocationInner(ip) {
				if(cache[ip]) {
					consumers[ip].forEach(function(fun){
						fun(cache[ip]);
					});
					delete getting[ip];
					delete consumers[ip];
					return;
				}
				if(getting[ip]) {
					return;
				}
				getting[ip] = ip;
				$.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=' + ip, function(_result){
					var info = remote_ip_info;
					if (info.ret == '1'){
						if(info.province === info.city) {
							info.city = '';
						}
						if(info.province + info.city && info.country === '中国') {
							info.country = '';
						}
						var addr = info.country + info.province + info.city + remote_ip_info.isp;
						consumers[ip].forEach(function(fun){
							fun(addr);
						});
						delete getting[ip];
						delete consumers[ip];
						return;
					}
				});
			}
		};
		
		//		_getIPLocation('127');
		//		_getIPLocation('127.0.0.1');
		//		_getIPLocation('localhost');
		//		_getIPLocation('10.1.1.1');
		//		_getIPLocation('172.16.1.1');
		//		_getIPLocation('192.168.1.9');
		//		_getIPLocation('180.162.160.2');
		
		return {
			getGeoLocation: _getGeoLocation,
			getIPLocation: _getIPLocation
		};
	});

	app.filter('bytes', function() {
		return function(bytes, precision) {
			if(bytes == 0) return 0;
			if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
			if (typeof precision === 'undefined') precision = 1;
			var units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'NB', 'DB', 'CB'],
				number = Math.floor(Math.log(bytes) / Math.log(1024));
			return (bytes / Math.pow(1024, Math.floor(number))).toFixed(precision) +  ' ' + units[number];
		}
	});
	app.config(['$compileProvider', function($compileProvider) {
//	    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel):/);
	    $compileProvider.aHrefSanitizationWhitelist(/^\s*([a-zA-Z0-9\-]+):/);
	}]);
	
	app.config(function($sceDelegateProvider) {
		$sceDelegateProvider.resourceUrlWhitelist([
		     // Allow same origin resource loads.
		     'self',
		     // Allow loading from w3c domain.  Notice the difference between * and **.
		     'http://media.w3.org/**',
		     // Allow all
		     'http://**',
		     'https://**'
		     ]);
	});
	
	app.filter('filterOne', function($filter) {
		return function(array, expression, comparator, anyPropertyKey) {
			if(!array) return undefined;
			var arr = $filter('filter')(array, expression, comparator, anyPropertyKey);
			return arr.length > 0 ? arr[0] : undefined;
		};
	});
	
	asyncLoader.configure(app);
	module.exports = app;
});








/******************************************************************************************************************/
/* 以下内容暂时放在这里，以后考虑变成service？？？ */
/******************************************************************************************************************/



/**
 * 数字格式化为文件大小
 * @author yoson
 *
 */
Number.prototype.getFileSizeString = function () {
	var n = parseInt(this), s = '';
	for (var arr = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], m = 0, res = n / 1024; res > 1; res /= 1024, m++) {
		s = res.toFixed(2) + " " + arr[m];
	}
	if (n < 1024) {
		s = n + 'B';
	} else if (n === 1024) {
		s = "1KB"
	}
	return s;
};
/**
 * 获取码率
 * @returns {String}
 */
Number.prototype.getBitRateString = function () {
	var n = parseInt(this), s = '';
	for (var arr = ["Kbps", "Mbps", "Gbps", "Tbps", "Pbps", "Ebps", "Zbps", "Ybps"], m = 0, res = n / 1024; res > 1; res /= 1024, m++) {
		s = res.toFixed(2) + " " + arr[m];
	}
	if (n < 1024) {
		s = n + 'bps';
	} else if (n === 1024) {
		s = "1Kbps"
	}
	return s;
};

String.prototype.startWith = function (str) {
	return new RegExp("^" + str).test(this);
};

String.prototype.endWith = function (str) {
	return new RegExp(str + "$").test(this);
};

/**
 * 11位手机号验证
 */
String.prototype.isMobilePhone = function () {
	var reg = new RegExp('^1\\d{10}$');
	return reg.test(this);
};

String.prototype.ellipsis = function (limit) {
	var num = 0, str = '', tail = '';
	for (var i = 0; i < this.length; i++) {
		if (this.charCodeAt(i) > 127 || this.charCodeAt(i) < 0) num += 2;
		else num++;
		if (num > limit) {
			tail = '...';
			break;
		}
		str += this.charAt(i);
	}
	return str + tail;
};
Number.prototype.toStorageStringFromGB = function () {
	var n = this, s = '0';
	for (var arr = ["TB", "PB", "EB", "ZB", "YB"], m = 0, res = n / 1024; res >= 1; res /= 1024, m++) {
		s = res.toFixed(1) + " " + arr[m];
	}
	return s;
}
Number.prototype.toStorageString = function () {
	var n = this, s = '0';
	for (var arr = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], m = 0, res = n / 1024; res >= 1; res /= 1024, m++) {
		s = res.toFixed(1) + " " + arr[m];
	}
	return s;
};
Number.prototype.toTimeSpanString = function () {
	if (this < 1000) {
		return '<1秒';
	}
	var d = new Date(this), s = '';
	if (d.getUTCHours() != 0) {
		s += d.getUTCHours() + '小时';
		if (d.getSeconds() != 0) {
			s += d.getMinutes() + '分' + d.getSeconds() + '秒';
		} else {
			s += d.getMinutes() + '分钟';
		}
	} else {
		if (d.getSeconds() != 0) {
			if (d.getMinutes() != 0) {
				s += d.getMinutes() + '分';
			}
			s += d.getSeconds() + '秒';
		} else {
			s += d.getMinutes() + '分钟';
		}
	}

    return s;
};

Date.prototype.DateAdd = function (strInterval, num) {
	var dtTmp = this;
	switch (strInterval) {
		case 's': return new Date(Date.parse(dtTmp) + (1000 * num));
		case 'n': return new Date(Date.parse(dtTmp) + (60000 * num));
		case 'h': return new Date(Date.parse(dtTmp) + (3600000 * num));
		case 'd': return new Date(Date.parse(dtTmp) + (86400000 * num));
		case 'w': return new Date(Date.parse(dtTmp) + ((86400000 * 7) * num));
		case 'q': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + num * 3, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
		case 'm': return new Date(dtTmp.getFullYear(), (dtTmp.getMonth()) + num, dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
		case 'y': return new Date((dtTmp.getFullYear() + num), dtTmp.getMonth(), dtTmp.getDate(), dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds());
	}
};

Number.prototype.toTimeString = function (speechrate) {
	//TODO sunwei
	var hour = parseInt((this) / speechrate / 60) < 10 ? '0' + parseInt((this) / speechrate / 60) : parseInt((this) / speechrate / 60);
	var min = parseInt((this) / speechrate) % 60 < 10 ? '0' + parseInt((this) / speechrate) % 60 : parseInt((this) / speechrate) % 60;
	var sec = parseInt((this) / speechrate * 60) % 60 < 10 ? '0' + parseInt((this) / speechrate * 60) % 60 : parseInt((this) / speechrate * 60) % 60;
	var s = hour + ':' + min + ':' + sec;
	return s;
};

/**
 * 日期格式化
 * 
 * @param format
 * @returns
 */
Date.prototype.format = function (format) {
	var o = {
		"M+": this.getMonth() + 1, //month
		"d+": this.getDate(), //day
		"h+": this.getHours(), //hour
		"m+": this.getMinutes(), //minute
		"s+": this.getSeconds(), //second
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
		"S": this.getMilliseconds() //millisecond
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) if (new RegExp("(" + k + ")").test(format)) {
		format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
	}
	return format;
};


Array.prototype.toMap = function (key/*elm[key]*/, val/*val? elm[val] : elm*/) {
	var map = {};
	for (var i = 0, n = this.length; i < n; i++) {
		if ('undefined' === typeof key) {
			map[this[i]] = this[i];
		} else {
			map[this[i][key]] = 'undefined' === typeof val ? this[i] : this[i][val];
		}
	}
	return map;
};
Array.prototype.sortUnique = function () {
	var arr = [].concat(this);
	return this.sort().filter(function (el, i, a) {
		return (i == a.indexOf(el));
	});
};
