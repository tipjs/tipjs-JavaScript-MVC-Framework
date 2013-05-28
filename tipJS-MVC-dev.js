/*
 * tipJS - OpenSource Javascript MVC Framework ver.1.41
 *
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

// tipJS initialization
(function(context) {
	"use strict";

	var tipJS = {};
	tipJS.ver = tipJS.version = tipJS.VERSION = "1.41";

	context.tipJS = tipJS;

	// Type Check [ecmascript 15.2.4.2] 참조
	var __oString = Object.prototype.toString;

	/**
	 *  전달된 obj 가 아래 타입 중 어느 타입인지 체크
	 *  Arguments
	 *  Function
	 *  String
	 *  Number
	 *  Boolean
	 *  Date
	 *  RegExp
	 */
	var __types = [ 'Arguments', 'Function', 'String', 'Number', 'Boolean', 'Date', 'RegExp' ];
	for(var t = 0, lt=__types.length; t < lt; t++) {
		(function(type) {
			tipJS['is' + type] = function(obj) {
				return __oString.call(obj) === '[object '+type+']';
			}
		})(__types[t]);
	}

	/**
	 * obj 가 Array 인지 체크
	 *
	 * @param obj
	 * @return boolean
	 */
	tipJS.isArray = Array.isArray || function(obj) {
		return __oString.call(obj) === '[object Array]';
	};

	/**
	* obj 가 Object 인지 체크 [ecmascript 15.2.1.1] 참조
	*
	* @param obj
	* @return boolean
	*/
	tipJS.isObject = function(obj) {
		return obj === Object(obj);
	};

	/**
	 * obj 로부터 id 를 통해 object 획득
	 *
	 * @param id
	 * @param obj
	 * @return HTMLElement
	 */
	var __getById = function(id, obj){
		return !obj ? document.getElementById(id):obj.getElementById(id);
	};

	/**
	 * obj 로부터 name 를 통해 objects 획득
	 *
	 * @param name
	 * @param obj
	 * @return NodeList
	 */
	var __getByName = function(name, obj){
		return !obj ? document.getElementsByName(name):obj.getElementsByName(name);
	};

	/**
	 * obj 로부터 tag 를 통해 objects 획득
	 *
	 * @param tag
	 * @param obj
	 * @return NodeList
	 */
	var __getByTag = function(tag, obj){
		return !obj ? document.getElementsByTagName(tag):obj.getElementsByTagName(tag);
	};

  /**
   * Array-liked-Object를 배열화함.
   * @param obj
   * @returns Array
   * @private
   */
	var __toArray = function(obj) {
		var _ret = [];
		if (obj.length) {
			for(var i=0, len=obj.length;i<len; i++) _ret[i] = obj[i];
		}
		return _ret;
	};

	/**
	 * 정의 에러 메세지취득
	 *
	 * @param name
	 * @return errMsg
	 */
	var __getDefErrMsg = function(name){
		return "Please : define " + name;
	};

	/**
	 * overwrite Object 에 존재하는 속성 이외의 항목을 base Object의 속성과 병합
	 *
	 * @param overwrite
	 * @param base
	 * @return 병합된 Object
	 */
	var __mergeObj = function(overwrite, base) {
		for (var k in base) {
			if (overwrite[k])
				continue;
			overwrite[k] = base[k];
		}
		return overwrite;
	};

	/**
	 * 자신을 확장하는지 체크
	 *
	 * @param ext
	 * @param name
	 * @return result
	 */
	var __isSelfExt = function(ext, name){
		if (tipJS.isArray(ext)) {
			for(var i=ext.length; i--;){
				if (ext[i] == name) {
					return true;
				}
			}
		} else {
			if (ext == name)
				return true;
		}
		return false;
	};
	/**
	 * depart Object 를 departType 으로 등록
	 *
	 * @param departType
	 * @param depart
	 */
	var __registDepart = function(departType, depart) {
		if (!tipJS.isObject(depart))
			throw new Error(__getDefErrMsg(departType));

		var _appDepartName = (depart.__name) ? depart.__name : depart.name;
		if (!tipJS.isString(_appDepartName))
			throw new Error(__getDefErrMsg(departType));

		if (depart.__extend && departType != "controllers" && __isSelfExt(depart.__extend, _appDepartName)) {
			throw new Error("Can't extend itself: " + _appDepartName);
		}

		var _arrAppDepart = _appDepartName.split("."),
			_appName = _arrAppDepart[0],
			_departName = _arrAppDepart[1],
			_app = __app__[_appName];

		if (!_app)
			throw new Error(__getDefErrMsg(departType));

		if (_app.loadOrder.presentOrder() === departType) {
			var _sApp = __departBase__[_appName] = __departBase__[_appName] || {};
			_sApp[departType] = _sApp[departType] || {};
			_sApp[departType][_departName] = depart;
		}
	};

	/**
	 * Application 에 속하는 파일들을 경로가 포함된 파일로 리스트화
	 *
	 * @param define
	 * @param depart
	 * @return File Path를 포함한 List
	 */
	var __getAppReqList = function(define, depart) {
		var _sLoadOdr = __DEF_BASE__.loadOrder;
		if (depart === _sLoadOdr.order[0])
			return __uniqArray(define[depart]);

		var _appName = define.name;
		if (__app__.MAIN && __app__.MAIN != _appName && depart != "models")
			return [];

		if (depart === _sLoadOdr.order[1] && define.localSet) {
			define[depart] = [_filepath+__config__.path.lang+"/"+tipJS.lang+".js"];
			return define[depart];
		}

		var _path = __config__.path[depart],
			_appRoot = __config__.applicationPath[_appName],
			_departs = __uniqArray(define[depart]);
		return __getUnitPathList(_appRoot, _path, _departs);
	};

	/**
	 * Application 에 속하는 unit(depart)의 File Path를 작성
	 *
	 * @param rootPath
	 * @param unitPath
	 * @param unit
	 * @return unit의 File Path
	 */
	var __getUnitPathList = function(rootPath, unitPath, unit) {
		var _ret = [];
		for (var i = unit.length; i--;) {
			_ret.push(rootPath + __wrapPath(unitPath) + unit[i]);
		}
		return _ret;
	};

	/**
	 * JS File 의 NoCache 처리를 위한 Query String 을 작성
	 *
	 * @param file
	 * @param config
	 * @return Query String
	 */
	var __makeNocacheStr = function(file, config) {
		if (config.nocache === true) {
			file += (file.indexOf("?") < 0) ? "?" : "&";
			file += config.paramName + "=" + config.version;
		}
		return file;
	};

	/**
	 * JS File Load
	 *
	 * @param file
	 * @param noCacheOpt
	 * @param callbackFn
	 */
	var __loadJsFile = tipJS.loadJS = function(file, noCacheOpt, callbackFn) {
		var _tagScript = document.createElement('script');
		_tagScript.type = 'text/javascript';
		_tagScript.src = __makeNocacheStr(file, noCacheOpt);
		_tagScript.charset = __config__.charSet;

		if (callbackFn) {
			if (_tagScript.readyState) {
				_tagScript.onreadystatechange = function() {
					if (this.readyState == 'loaded' || this.readyState == 'complete') {
						this.onreadystatechange = null;
						callbackFn(this);
					}
				};
			} else {
				_tagScript.onload = function() {
					callbackFn(this);
				};
			}
		}
		__getByTag('head')[0].appendChild(_tagScript);
	};

	/**
	 * Application에 속해 있는 JS File 을 읽어들임
	 *
	 * @param appName
	 * @param depart
	 * @param file
	 */
	var __loadAppSubFile = function(appName, depart, file) {
		__loadJsFile(file, __getAppCacheInfo(appName), function(scriptTag) {
			if (__chkAppLoaded(appName, depart, scriptTag.src))
				__afterAppLoaded(appName);
		});
	};

	/**
	 * Application에 속해 있는 각각의 Part 를 읽어들인 후 모두 완료되면 Application 초기화 메소드를 호출
	 *
	 * @param appName
	 * @param depart
	 */
	var __loadDepart = function(appName, depart) {
		__initAppReqNS(appName, depart);
		var _requireList = __require__[appName][depart].requireList = __getAppReqList(__getAppDef(appName), depart);
		if (_requireList.length > 0) {
			for (var i = _requireList.length; i--;) {
				__loadAppSubFile(appName, depart, _requireList[i]);
			}
		} else
			__afterAppLoaded(appName);
	};

	/**
	 * Model object 의 extension
	 *
	 * @param child
	 * @param type
	 * @return extended Object
	 */
	var __extModel = function(child, type){
		var _parents = child.__extend;
		if (!_parents)
			return child;

		if (tipJS.isString(_parents)) {
			child = __getExtObj(child, _parents, type);
		} else if (_parents instanceof Array) {
			for (var i = _parents.length; i--;) {
				child = __getExtObj(child, _parents[i], type);
			}
		}
		return child;
	};

	/**
	 * Model object 의 extension
	 *
	 * @param child
	 * @param parent
	 * @return extended Object
	 */
	var __getExtObj = function(child, parent, type){
		var _arrExtend = parent.split(".");
		if (type == "model") {
			if (_arrExtend.length == 2)
				return __mergeObj(child, __cloneObj(__loadModel(_arrExtend[1], false, _arrExtend[0])));
			else
				return __mergeObj(child, __cloneObj(__loadCommonModel(parent)));
		} else {
			if (_arrExtend.length == 2)
				return __mergeObj(child, __cloneObj(__loadView(_arrExtend[1], _arrExtend[0])));
			else
				return __mergeObj(child, __cloneObj(__loadCommonView(parent)));
		}
	};

	/**
	 * tipJS 의 config.js 에 정의된 commonModel 을 작성 후 반환
	 *
	 * @param modelName
	 * @param loadType
	 * @return commonModel Object
	 */
	var __loadCommonModel = tipJS.loadCommonModel = function(modelName, loadType) {
		var _models = __commonModels__;
		if (!_models[modelName] || _models[modelName] === undefined)
			throw new Error("Can't find commonModel: " + modelName);

		// synchronized model
		if (loadType === true) {
			var _syncModels = __commonSyncModels__;

			if (_syncModels[modelName])
				return _syncModels[modelName];

			var _syncModel = _syncModels[modelName] = __cloneObj(_models[modelName], __isFlat__["CommonModel"+modelName]);

			if (typeof _syncModel.__init == "function") {
				_syncModel.__init();
			}
			return _syncModel;
		}
		var _ret = __cloneObj(_models[modelName], __isFlat__["CommonModel"+modelName]);

		if (tipJS.isFunction(_ret.__init)) {
			_ret.__init();
		}
		return _ret;
	};

	/**
	 * tipJS 의 define.js 에 정의된 Application Model 을 작성 후 반환
	 *
	 * @param modelName
	 * @param loadType
	 * @param appName
	 * @return Application Model Object
	 */
	var __loadModel = function(modelName, loadType, appName) {
		var _appName = (!appName) ? __app__.MAIN : appName,
			_models = __departBase__[_appName].models;

		if (!_models[modelName] || _models[modelName] === undefined)
			throw new Error("Can't find model: " + modelName);

		// synchronized model
		if (loadType === true) {
			var _syncModels = __departBase__[_appName].syncModels;
			if (!_syncModels)
				_syncModels = __departBase__[_appName].syncModels = {};

			if (_syncModels[modelName])
				return _syncModels[modelName];

			var _syncModel = _syncModels[modelName] = __cloneObj(_models[modelName], __isFlat__["models"+_appName+"."+modelName]);

			if (tipJS.isFunction(_syncModel.__init)) {
				_syncModel.__init();
			}
			return _syncModel;
		}
		var _ret = __cloneObj(_models[modelName], __isFlat__["models"+_appName+"."+modelName]);

		if (tipJS.isFunction(_ret.__init)) {
			_ret.__init();
		}
		return _ret;
	};

	/**
	 * tipJS 의 config.js 에 정의된 commonViewModel 을 작성 후 반환
	 *
	 * @param viewName
	 * @return commonViewModel Object
	 */
	var __loadCommonView = function(viewName) {
		var _views = __commonViews__;
		if (!_views || !_views[viewName] || _views[viewName] === undefined)
			throw new Error("Can't find commonView: " + viewName);

		var _ret = __cloneObj(_views[viewName], __isFlat__["CommonView"+viewName]);
		if (tipJS.isFunction(_ret.__init)) {
			_ret.__init();
		}
		return _ret;
	};

	/**
	 * tipJS 의 define.js 에 정의된 Application ViewModel 을 작성 후 반환
	 *
	 * @param viewName
	 * @return Application viewModel Object
	 */
	var __loadView = function(viewName, appName) {
		var _appName = (!appName) ? __app__.MAIN : appName,
			_views = __departBase__[_appName].views;
		if (!_views || !_views[viewName] || _views[viewName] === undefined)
			throw new Error("Can't find view: " + viewName);

		var _ret = __cloneObj(_views[viewName], __isFlat__["views"+_appName+"."+viewName]);
		if (tipJS.isFunction(_ret.__init)) {
			_ret.__init();
		}
		return _ret;
	};

	/**
	 * tipJS 의 define.js 에 정의된 Application Model 을 작성 후 반환
	 *
	 * @param appModelName
	 * @param loadType
	 * @return Application Model Object
	 */
	tipJS.loadModel = function(appModelName, loadType) {
		var _arrName, _appName, _modelName,
			_loadType = (tipJS.isBoolean(loadType)) ? loadType : false;

		if ((_arrName = appModelName.split(".")).length != 2)
			throw new Error("tipJS.loadModel : invalid parameter");

		_appName = _arrName[0]; 
		_modelName = _arrName[1];

		return __loadModel(_modelName, _loadType, _appName);
	};

	/**
	 * tipJS 의 Application 정의 Object 를 반환
	 *
	 * @param appName
	 * @return Application 정의 Object
	 */
	var __getAppDef = function(appName) {
		return __app__[appName].define;
	};

	/**
	 * Application 의 NoCache 설정정보 Object 를 반환
	 *
	 * @param appName
	 * @return NoCache 정보 Object
	 */
	var __getAppCacheInfo = function(appName) {
		var _ret = {};
		var _define = __getAppDef(appName);
		if (_define) {
			_ret.nocache = _define.noCache;
			_ret.version = (_define.noCacheAuto === true) ? "" + Math.random() : _define.noCacheVersion;
			_ret.paramName = _define.noCacheParam;
		}
		return _ret;
	};

	/**
	 * Application 들의 하위 Controller tree 작성
	 *
	 */
	var __makeAppCtrl = function(){
		var _appName, _app, _ctrlers, _ctrlName, _ctrler, _ctrlerWrapper;
		for (_appName in __app__) {
			__appCtrl__[_appName] = {};
			_app = __app__[_appName];
			_ctrlers = _app.controller;
			for (_ctrlName in _ctrlers){
				_ctrler = __cloneObj(_ctrlers[_ctrlName]);
				_ctrlerWrapper = {
					controllerName  : (_ctrler.__name) ? _ctrler.__name : _ctrler.name,
					beforeCtrler    : _app.define.beforeController,
					afterCtrler     : _app.define.afterController,
					loadCommonModel : _ctrler.loadCommonModel,
					loadCommonView  : _ctrler.loadCommonView,
					loadModel       : _ctrler.loadModel,
					loadView        : _ctrler.loadView,
					renderTemplate  : _ctrler.renderTemplate,
					getById         : _ctrler.getById,
					getByName       : _ctrler.getByName,
					getByTag        : _ctrler.getByTag
				};
				__appCtrl__[_appName][_ctrlName] = (function(wrapper, ctrler){
					return function(){
						var _args = arguments, _ctrlerStartTime, _doCtrler;
						if (tipJS.isDevelopment === true)
							_ctrlerStartTime = __getSecs();

						if (wrapper.beforeCtrler && wrapper.beforeCtrler.apply(wrapper, arguments) === false) {
							return;
						}

						_doCtrler = function() {
							var _ctrlInvoke = function() {
								var _invoke2 = function() {
									if (ctrler.afterInvoke)
										ctrler.afterInvoke.apply(ctrler, _args);
								};
								var _invoke1 = function() {
									if (ctrler.invoke && ctrler.invoke.apply(ctrler, _args) === false)
										return;

									_invoke2();
								};
								var _invoke = function() {
									if (ctrler.beforeInvoke && ctrler.beforeInvoke.apply(ctrler, _args) === false)
										return;

									_invoke1();
								};
								_invoke();
							};
							if (ctrler.exceptionInvoke) {
								try {
									_ctrlInvoke();
								} catch (e) {
									(_args = __toArray(_args)).unshift(e);
									ctrler.exceptionInvoke.apply(ctrler, _args);
								}
							} else
								_ctrlInvoke();

							if (wrapper.afterCtrler)
								wrapper.afterCtrler.apply(wrapper, _args);

							if (tipJS.isDevelopment === true)
								tipJS.debug(wrapper.controllerName + " completed in " + ((__getSecs() - _ctrlerStartTime)/1000) + " seconds");
						}; // _doCtrler
						
						if (ctrler.async === true)
							setTimeout(_doCtrler, (!ctrler.delay ? 15 : ctrler.delay));
						else
							_doCtrler();
					}
				})(_ctrlerWrapper, _ctrler);
			}
		}
	};

	/**
	 * Application 이 모두 load 된후 실행되는 메소드
	 * Application 의 모든 depart 를 재정의 후 define.js 에서 정의된 onLoad 메소드 호출
	 *
	 * @param appName
	 */
	var __afterAppLoaded = function(appName) {
		var k, _mdlName;
		var _app = __app__[appName];
		if (_app.loadOrder.isLastOrder() === false) {
			__loadDepart(appName, _app.loadOrder.nextOrder());
			return;
		}
		if (__app__.MAIN != appName) return;

		// Controller build
		var _ctrlers = _app.controller = __departBase__[appName].controllers;
		if (_ctrlers) {
			for (k in _ctrlers) {
				_ctrlers[k].loadCommonModel = __loadCommonModel;
				_ctrlers[k].loadCommonView = __loadCommonView;
				_ctrlers[k].loadModel = __loadModel;
				_ctrlers[k].loadView = __loadView;
				_ctrlers[k].renderTemplate = __getTpl;
				_ctrlers[k].getById = __getById;
				_ctrlers[k].getByName = __getByName;
				_ctrlers[k].getByTag = __getByTag;
			}
		}
		// AppCtrl build
		__makeAppCtrl();
		// commonModel build
		for (k in __commonModels__) {
			_mdlName = (__commonModels__[k].__name) ? __commonModels__[k].__name : __commonModels__[k].name;
			__extModel(__commonModels__[k], "model");
			if (_mdlName.lastIndexOf("VO") != (_mdlName.length - 2)) {
				__commonModels__[k].loadCommonModel = __loadCommonModel;
				__commonModels__[k].getById = __getById;
				__commonModels__[k].getByName = __getByName;
				__commonModels__[k].getByTag = __getByTag;
			}
			__isFlat__["CommonModel"+_mdlName] = !__hasObj(__commonModels__[k]);
		}
		// Model build
		var _mdls = __departBase__[appName].models;
		if (_mdls) {
			for (k in _mdls) {
				_mdlName = (_mdls[k].__name) ? _mdls[k].__name : _mdls[k].name;
				__extModel(_mdls[k], "model");
				if (_mdlName.lastIndexOf("VO") != (_mdlName.length - 2)) {
					_mdls[k].loadCommonModel = __loadCommonModel;
					_mdls[k].loadModel = __loadModel;
					_mdls[k].getById = __getById;
					_mdls[k].getByName = __getByName;
					_mdls[k].getByTag = __getByTag;
				}
				__isFlat__["models"+_mdlName] = !__hasObj(_mdls[k]);
			}
		}
		// commonView build
		for (k in __commonViews__) {
			_mdlName = (__commonViews__[k].__name) ? __commonViews__[k].__name : __commonViews__[k].name;
			__extModel(__commonViews__[k], "view");
			__commonViews__[k].loadCommonView = __loadCommonView;
			__commonViews__[k].renderTemplate = __getTpl;
			__commonViews__[k].getById = __getById;
			__commonViews__[k].getByName = __getByName;
			__commonViews__[k].getByTag = __getByTag;
			__isFlat__["CommonView"+_mdlName] = !__hasObj(__commonViews__[k]);
		}
		// View build
		var _views = __departBase__[appName].views;
		if (_views) {
			for (k in _views) {
				_mdlName = (_views[k].__name) ? _views[k].__name : _views[k].name;
				__extModel(_views[k], "view");
				_views[k].loadCommonView = __loadCommonView;
				_views[k].loadView = __loadView;
				_views[k].renderTemplate = __getTpl;
				_views[k].getById = __getById;
				_views[k].getByName = __getByName;
				_views[k].getByTag = __getByTag;
				__isFlat__["views"+_mdlName] = !__hasObj(_views[k]);
			}
		}
		tipJS.debug("tipJS version " + tipJS.version + "[" + tipJS.lang + "]");
		if (!tipJS.isArray(_app.onLoadArgs)) {
			_app.onLoadArgs = [];
		}
		_app.define.onLoad.apply(_app.define, _app.onLoadArgs);
		if (__reservedStack__ && __reservedStack__[appName]) {
			var _reservedAction = __reservedStack__[appName];
			for (var i = 0, actionLen = _reservedAction.length; i < actionLen; i++) {
				var _actionObj = _reservedAction[i];
				tipJS.action(_actionObj.name, _actionObj.param);
			}
			delete __reservedStack__[appName];
		}
	};

	/**
	 * Application 의 각 part 의 모든 File 이 load 되었는지 확인
	 *
	 * @param appName
	 * @param depart
	 * @param src
	 * @return load 확인 Flag
	 */
	var __chkAppLoaded = function(appName, depart, src) {
		var i, _requireList = __require__[appName][depart].requireList, _reqPath;

		for (i = _requireList.length; i--;) {
			if (_requireList[i] === true)
				continue;

			_reqPath = _requireList[i].indexOf("./") > -1 ? _requireList[i].substr(_requireList[i].lastIndexOf("./")+1):_requireList[i];
			if (src.indexOf(_reqPath) > -1) {
				_requireList[i] = true;
				break;
			}
		}
		for (i = _requireList.length; i--;) {
			if (_requireList[i] !== true)
				return false;
		}
		return true;
	};

	/**
	 * File 경로에 대한 Wrapper
	 *
	 * @param path
	 * @return ex) /path/
	 */
	var __wrapPath = function(path) {
		return "/" + path + "/";
	};

	/**
	 * 인수로 들어온 Object 의 복제를 반환(속도용)
	 *
	 * @param target
	 * @return Object Clone
	 */
	var __cloneObjN = function(target) {
		if (tipJS.isFunction(Object.create)) {
			__cloneObjN = function(o) {
				return Object.create(o);
			};
		} else {
			__cloneObjN = function(o) {
				function F() {}
				F.prototype = o;
				return new F();
			};
		}
		return __cloneObjN(target);
	};

	/**
	 * 인수로 들어온 Object 의 복제를 반환
	 *
	 * @param target
	 * @param isFlat
	 * @return Object Clone
	 */
	var __cloneObj = tipJS.cloneObject = function(obj, isFlat){
		if (obj == null || typeof obj != "object") {
			return obj;
		}
		if (!isFlat) {
			var newObj = (obj instanceof Array) ? [] : {};
			for (var k in obj) {
				if (typeof obj[k] == "object") {
					newObj[k] = __cloneObj(obj[k], false);
				} else {
					newObj[k] = obj[k];
				}
			}
			return newObj;
		} else {
			return __cloneObjN(obj);
		}
	};

	/**
	 * 인수로 들어온 Object 가 단일 Object인가를 판별
	 *
	 * @param obj
	 * @return isFlatObject flag
	 */
	var __hasObj = function(obj) {
		for (var k in obj) {
			// Array 와 Object 일때 true
			if (typeof obj[k] == "object")
				return true;
		}
		return false;
	};

	/**
	 * 인수로 들어온 target object 의 내용을 console에 출력
	 *
	 * @param target
	 * @param filter
	 * @param parentName
	 */
	var __echo = tipJS.echo = function(target, filter, parentName) {
		if (parentName && (typeof parentName != "string" || typeof parentName == "string" && (parentName.split(".").length + parentName.split("]").length) > 3))
			return;

		if (!filter) filter = "";
		if (target === null || target === undefined) {
			console.log(((parentName) ? parentName + "." : "") + target);
			return;
		}
		if (typeof target != "object") {
			if (typeof target == filter || filter === "")
				console.log(((parentName) ? parentName + "." : "") + target + "["+ typeof target +"]");
			return;
		}
		if (target instanceof Array) {
			console.log(((parentName) ? parentName + ":" : "") + "[Array["+ target.length + "]]");
		} else {
			console.log(((parentName) ? parentName + ":" : "") + "[Object]");
		}
		for (var k in target) {
			if (target instanceof Array) {
				if (typeof target[k] == "object"){
					__echo(target[k], filter, ((parentName) ? parentName + "[" : "[") + k + ((parentName) ? "]" : "]"));
				} else {
					if (typeof target[k] == filter || filter === "")
						console.log(((parentName) ? parentName + "[" : "[") + k + ((parentName) ? "]" : "]") + ":" + target[k] + " ("+ typeof target[k] +")");
				}
			} else {
				if (typeof target[k] == "object"){
					__echo(target[k], filter, ((parentName) ? parentName + "." : "")+k);
				} else {
					if (typeof target[k] == filter || filter === "")
						console.log(((parentName) ? parentName + "." : "") + k + ":" + target[k] + " ("+ typeof target[k] +")");
				}
			}
		}
	};

	/**
	 * 인수로 들어온 array 의 요소들을 중복되지 않는 요소로 재작성 후 반환
	 *
	 * @param arr
	 * @return unique 한 요소를 갖는 array
	 */
	var __uniqArray = tipJS.uniqueArray = function(arr) {
		var ret = [], len = arr.length;
		for (var i = 0; i < len; i++) {
			for (var j = i + 1; j < len; j++) {
				if (arr[i] === arr[j])
					j = ++i;
			}
			ret.push(arr[i]);
		}
		return ret;
	};

	/**
	 * Application 별 __require__ Object 의 초기화
	 *
	 * @param appName
	 * @param depart
	 */
	var __initAppReqNS = function(appName, depart) {
		var _sAppName = __require__[appName] = __require__[appName] || {};
		_sAppName[depart] = _sAppName[depart] || {};
	};

	/**
	 * tipJS 의 config.js 에 정의되어 있는 공통 JS File 을 읽어들임
	 *
	 * @param config
	 * @param arrayJS
	 */
	var __loadCommonJSFiles = function(config, arrayJS) {
		for (var i = 0, len = arrayJS.length; i < len; i++) {
			var src = arrayJS[i];
			if (config.noCache && config.noCache === true) {
				src += (src.indexOf("?") < 0) ? "?" : "&";
				src += (config.noCacheParam ? config.noCacheParam : __config__.noCacheParam) + "=";
				if (config.noCacheAuto === true)
					src += Math.random();
				else
					src += (config.noCacheVersion ? config.noCacheVersion : __config__.noCacheVersion);
			}
			document.write('<script type="text/javascript" charset="' + (config.charSet ? config.charSet : __config__.charSet) + '" src="' + src + '"></script>');
		}
	};

	/**
	 * tipJS 의 config.js 에 정의되어 있는 내용을 tipJS에 반영
	 *
	 * @param config
	 */
	tipJS.config = function(config) {
		if (config.commonLib) {
			__loadCommonJSFiles(config, config.commonLib);
		}
		if (config.commonModel) {
			__loadCommonJSFiles(config, config.commonModel);
		}
		if (config.commonView) {
			__loadCommonJSFiles(config, config.commonView);
		}
		__config__ = __mergeObj(config, __DEF_BASE__.config);
		if (tipJS.isDevelopment === null) {
			for (var i = __config__.developmentHostList.length; i--;) {
				if (_winLoc.hostname.match(__config__.developmentHostList[i]) !== null) {
					tipJS.isDevelopment = true;
					break;
				}
			}
		}
	};

	/**
	 * 초단위 반환
	 *
	 * @return seconds
	 */
	var __getSecs = function(){
		var _now = new Date();
		return (_now.now) ? _now.now() : _now.getTime();
	};

	/* Benchmark */
	tipJS.benchmark = {};

	/**
	 * Benchmark 용 키등록
	 *
	 * @param markName
	 */
	tipJS.benchmark.mark = function(markName){
		__benchRecs__[markName] = __getSecs();
	};

	/**
	 * Benchmark 용 키에 따라 경과시간을 출력
	 * 
	 * @param startName
	 * @param endName
	 * @param callbackFn
	 * @return elapsedTime
	 */
	tipJS.benchmark.elapsedTime = function(startName, endName, callbackFn){
		var _startTime = __benchRecs__[startName],
		_endTime = __benchRecs__[endName],
		_elapsedTime = (_endTime - _startTime) / 1000;
		// if exist callback function
		if (callbackFn)
			callbackFn(startName, endName, _startTime, _endTime, _elapsedTime);
		else
			tipJS.log("elapsed time[" + startName + " to " + endName + "] : " + _elapsedTime + " seconds", "[BENCHMARK]");
		return _elapsedTime;
	};

	/* Template */
	/**
	 * XML Request 객체의 생성 후 반환
	 *
	 * @return XML Request Object
	 */
	var __getXMLReq = function() {
		var _xmlreq = false;
		if (window.XMLHttpRequest)
			_xmlreq = new XMLHttpRequest();
		else if (window.ActiveXObject) {
			try {
				_xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e1) {
				try {
					_xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e2) {}
			}
		}
		__getXMLReq = function() {
			return _xmlreq;
		};
		return __getXMLReq();
	};

	/**
	 * HTML Template File 을 읽어들인 후 file 내용을 반환
	 *
	 * @param config
	 * @return Template string
	 */
	var __getTpl = function(config) {
		var _retTxt;
		var _appName = __app__.MAIN;
		if (arguments.length > 1) {
			return __renderTpl(arguments[0], arguments[1], arguments[2]);
		}

		if (__getAppDef(_appName).templateCache && __templateCache__[config.url]) {
			_retTxt = __renderTpl(__templateCache__[config.url], config.data, config.tplId);
			if (tipJS.isString(config.renderTo))
				__getById(config.renderTo).innerHTML += _retTxt;

			return _retTxt;
		}
		var _appNoCacheInfo = __getAppCacheInfo(_appName),
			_fileUrl = __makeNocacheStr(config.url, _appNoCacheInfo),
			_xmlhttp = __getXMLReq();

		_xmlhttp.open("GET", _fileUrl, false);
		try {
			_xmlhttp.send(null);
		} catch(e) {
			return null;
		}

		if (_xmlhttp.readyState == 4 && _xmlhttp.status == 200) {
			_retTxt = __templateCache__[config.url] = _xmlhttp.responseText;
			_retTxt = __renderTpl(_retTxt, config.data, config.tplId);
			if (tipJS.isString(config.renderTo))
				__getById(config.renderTo).innerHTML += _retTxt;

			return _retTxt;
		} else
			throw new Error("Can't find templates file: " + _fileUrl);
	};

	/**
	 * HTML Template 의 내용과 표시될 Data의 병합처리
	 *
	 * @param html
	 * @param data
	 * @param templateKey
	 * @return rendered HTML
	 */
	var __renderTpl = function(html, data, templateKey) {
		html = html.replace(/\r\n/g, "\n");
		html = html.replace(/\r/g, "\n");
		html = html.replace(/\\/g, '\\\\');
		html = html.replace(/\n/g, '');

		if (tipJS.isString(templateKey)) {
			var _applyAreas = html.split("[[#"),
				_regEx = new RegExp("^"+templateKey+"\]\]");
			for (var i = 0, len = _applyAreas.length; i < len; i++) {
				if (_applyAreas[i].match(_regEx)) {
					html = _applyAreas[i].replace(_regEx, '');
					break;
				}
			}
		} else {
			html = html.replace(/\[\[#[a-zA-Z0-9_-]*\]\]/g, '');
		}
		var _tokens = html.split("@>"),
			_evalFunc = new Function("data", __compileTpl(_tokens));

		return _evalFunc(data);
	};

	/**
	 * HTML Template 의 내용을 Parsing
	 *
	 * @param tokens
	 * @return tokens result
	 */
	var __compileTpl = function(tokens) {
		var _ret = [], _types = [], _newTokens = [],
			_TYPE_PLANE = "PLN", _TYPE_VALUE = "VAL", _TYPE_PARSE = "PAS",
			_cmdPush = '__tempArr__.push(',
			i, len, _token, _tokens;

		_ret.push('var __tempArr__ = [];');
		for (i = 0, len = tokens.length; i < len; i++) {
			_token = tokens[i];

			if (_token.indexOf("<@=") > -1) {
				_tokens = _token.split("<@=");
				if (_tokens.length > 1) {
					_newTokens.push(_tokens[0].replace(/"/g, '\\"'));
					_newTokens.push(_tokens[1]);
					_types.push(_TYPE_PLANE);
					_types.push(_TYPE_VALUE);
				} else {
					_newTokens.push(_tokens[0]);
					_types.push(_TYPE_VALUE);
				}
			} else if (_token.indexOf("<@") > -1) {
				_tokens = _token.split("<@");
				if (_tokens.length > 1) {
					_newTokens.push(_tokens[0].replace(/"/g, '\\"'));
					_newTokens.push(_tokens[1]);
					_types.push(_TYPE_PLANE);
					_types.push(_TYPE_PARSE);
				} else {
					_newTokens.push(_tokens[0]);
					_types.push(_TYPE_PARSE);
				}
			} else {
				_newTokens.push(_token.replace(/"/g, '\\"'));
				_types.push(_TYPE_PLANE);
			}
		} // for i
		for (i = 0, len = _newTokens.length; i < len; i++) {
			_token = _newTokens[i];
			if (_types[i] == _TYPE_VALUE) {
				_token = '"\"+' + _token + '+\""';
				_ret.push(_cmdPush + _token + ");");
			} else if (_types[i] == _TYPE_PARSE) {
				_ret.push(_token);
			} else {
				_token = '"' + _token + '"';
				_ret.push(_cmdPush + _token + ");");
			}
		}
		_ret.push("return __tempArr__.join('');");
		return _ret.join('');
	};

	/**
	 * tipJS 의 commonModel 을 정의
	 *
	 * @param commonModel
	 */
	tipJS.commonModel = function(commonModel) {
		var _type = "CommonModel";
		if (!commonModel || typeof commonModel != "object")
			throw new Error(__getDefErrMsg(_type));

		var _mdlName = (commonModel.__name) ? commonModel.__name : commonModel.name;
		if (typeof _mdlName != "string")
			throw new Error(__getDefErrMsg(_type));

		if (commonModel.__extend && __isSelfExt(commonModel.__extend, _mdlName))
			throw new Error("Can't extend itself: "+_mdlName);

		__commonModels__[_mdlName] = commonModel;
	};

	/**
	 * tipJS 의 commonView 를 정의
	 *
	 * @param commonView
	 */
	tipJS.commonView = function(commonView) {
		var _type = "CommonView";
		if (!commonView || typeof commonView != "object")
			throw new Error(__getDefErrMsg(_type));

		var _viewName = (commonView.__name) ? commonView.__name : commonView.name;
		if (typeof _viewName != "string")
			throw new Error(__getDefErrMsg(_type));

		if (commonView.__extend && __isSelfExt(commonView.__extend, _viewName))
			throw new Error("Can't extend itself: "+_viewName);

		__commonViews__[_viewName] = commonView;
	};

	/**
	 * tipJS 의 console logger
	 *
	 * @param msg
	 * @param prefix
	 */
	tipJS.log = function(msg, prefix) {
		window.console = window.console || {
			log : function() {},
			error : function() {}
		};
		var _today = new Date(), _yyyy = _today.getFullYear(), _mm = _today.getMonth() + 1, _dd = _today.getDate(), _hh = _today.getHours(), _mi = _today.getMinutes(), _ss = _today.getSeconds(), _ms = _today.getMilliseconds();
		console.log(((prefix) ? prefix : "") + _yyyy + '/' + _mm + '/' + _dd + ' ' + _hh + ':' + _mi + ':' + _ss + '.' + _ms + ' ' + msg);
	};

	/**
	 * tipJS 의 console debugger
	 *
	 * @param msg
	 */
	tipJS.debug = function(msg) {
		if (tipJS.isDevelopment)
			tipJS.log(msg, "[DEBUG]");
	};

	/**
	 * tipJS 의 localSet 정의 메소드
	 *
	 * @param controller
	 */
	tipJS.localSet = function(msgs) {
		var _app = __app__[__app__.MAIN];
		if (_app.loadOrder.presentOrder() === __DEF_BASE__.loadOrder.order[1]) __msg__ = msgs;
	};

	/**
	 * tipJS 의 localSet 메세지 취득
	 *
	 * @param controller
	 */
	tipJS.msg = function(key){
		return __msg__[key] ? __msg__[key] : key;
	};

	/**
	 * tipJS 의 Controller 정의 메소드
	 *
	 * @param controller
	 */
	tipJS.controller = function(ctrler) {
		__registDepart("controllers", ctrler);
	};

	/**
	 * tipJS 의 Application Model 정의 메소드
	 *
	 * @param model
	 */
	tipJS.model = function(model) {
		__registDepart("models", model);
	};

	/**
	 * tipJS 의 Application View 정의 메소드
	 *
	 * @param view
	 */
	tipJS.view = function(view) {
		__registDepart("views", view);
	};

	/**
	 * tipJS 의 Application Controller 호출 메소드
	 *
	 * @param ctrlerName
	 * @param params
	 */
	tipJS.action = function() {
		var _arrName, _appName, _ctrlerName, _app, _ctrler;
		if (!arguments.length) {
			return __appCtrl__;
		} else {
			var _appCtrlName = arguments[0];
			var _args = __toArray(arguments).slice(1);
			_arrName = _appCtrlName.split(".");
			if ((_appName = _arrName[0]).length == 0 || (_ctrlerName = _arrName[1]).length == 0)
				throw new Error("tipJS.action : invalid parameter");

			_app = __app__[_appName];
			if (!_app || !_app.loadOrder || !_app.loadOrder.isLastOrder()) {
				__reservedStack__[_appName] = __reservedStack__[_appName] || [];
				__reservedStack__[_appName].push({
					name : _appCtrlName,
					param : _args
				});
				return;
			}
			_ctrler = __appCtrl__[_appName][_ctrlerName];
			_ctrler.apply(_ctrler, _args);
		}
	};

	/**
	 * tipJS 의 Application Load 메소드
	 *
	 * @param appNames
	 * @param params
	 */
	tipJS.loadApp = function() {
		var _appNames = arguments[0], _args = __toArray(arguments).slice(1);
		if (typeof _appNames == "string") _appNames = [_appNames];
		for (var i = 0, appLen = _appNames.length; i < appLen; i++) {
			var _appName = _appNames[i];
			if (!__app__.MAIN)
				__app__.MAIN = _appName;
			if (_args.length) {
				__app__[_appName] = {};
				__app__[_appName].onLoadArgs = _args;
			}
			var _filePath = __config__.applicationPath[_appName]+"/"+__config__.defineFileName+".js";
			setTimeout(function() {
				if (!__app__[_appName] || !__app__[_appName].define)
					throw new Error("Can't find application: "+_appName);
			}, 1000);
			__loadJsFile(_filePath, {
				nocache : true,
				version : Math.random(),
				paramName : __config__.noCacheParam
			});
		}
		delete tipJS.loadApp;
	};

	/**
	 * tipJS 의 Application 정의 메소드
	 *
	 * @param define
	 */
	tipJS.define = function(define) {
		__mergeObj(define, __DEF_BASE__.define);
		if (define.templateCache === undefined)
			define.templateCache = __config__.templateCache;

		if (define.noCache === undefined) {
			define.noCache = __config__.noCache;
			define.noCacheVersion = __config__.noCacheVersion;
			define.noCacheParam = __config__.noCacheParam;
			define.noCacheAuto = __config__.noCacheAuto;
		} else {
			if (define.noCache === true) {
				if (define.noCacheVersion === undefined)
					define.noCacheVersion = __config__.noCacheVersion;

				if (define.noCacheParam === undefined)
					define.noCacheParam = __config__.noCacheParam;

				if (define.noCacheAuto === undefined)
					define.noCacheAuto = __config__.noCacheAuto;
			}
		}
		var _appName = define.name;
		__app__[_appName] = __app__[_appName] || {};
		__app__[_appName].loadOrder = {};
		__mergeObj(__app__[_appName].loadOrder, __DEF_BASE__.loadOrder);

		var _depart = __app__[_appName].loadOrder.presentOrder();
		__initAppReqNS(_appName, _depart);
		__app__[_appName].define = define;
		__loadDepart(_appName, _depart);
	};

	/*
	 * Booting tipJS
	 */
	var __require__ = {},
	__departBase__ = {},
	__commonModels__ = {},
	__commonSyncModels__ = {},
	__commonViews__ = {},
	__DEF_BASE__ = {
		config : {
			noCache : false,
			noCacheVersion : 1.000,
			noCacheParam : "noCacheVersion",
			noCacheAuto : false,
			templateCache : true,
			charSet : "utf-8",
			defineFileName : "define",
			path : {
				lang : "lang",
				controllers : "controllers",
				models : "models",
				views : "views"
			},
			developmentHostList : [],
			applicationPath : {}
		},
		define : {
			extLib : [],
			lang : [],
			controllers : [],
			models : [],
			views : [],
			localSet : false,
			onLoad : function() {},
			beforeController : function() {},
			afterController : function() {},
			loadCommonModel : __loadCommonModel,
			loadModel : __loadModel,
			loadCommonView : __loadCommonView,
			loadView : __loadView
		},
		loadOrder : {
			index : 0,
			init : function() {
				this.index = 0;
			},
			presentOrder : function() {
				return this.order[this.index];
			},
			nextOrder : function() {
				return this.order[++this.index];
			},
			isLastOrder : function() {
				return (this.index + 1) == this.order.length;
			},
			order : ["extLib", "lang", "controllers", "models", "views"]
		}
	},
	__benchRecs__ = {},
	__app__ = {},
	__appCtrl__ = {},
	__msg__ = {},
	__templateCache__ = {},
	__reservedStack__ = {},
	__config__ = __cloneObj(__DEF_BASE__.config),
	__isFlat__ = {},
	_winLoc = window.location, _pathname = _winLoc.pathname, _queryString = _winLoc.search, _scripts = __getByTag('script'), _filepath, _scriptSrc, _match, _isDevelopment = null, _lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0,2);

	for (var i = _scripts.length; i--;) {
		_scriptSrc = _scripts[i].src;
		_match = _scriptSrc.match(/tipJS-MVC-dev\.js$/);
		if (_match) {
			_filepath = _scriptSrc.substring(0, _scriptSrc.length - _match[0].length);
			break;
		}
	}

	if (_queryString.match('(\\?|&)debug') !== null || _pathname.match('debug') !== null)
		_isDevelopment = true;

	tipJS.isDevelopment = _isDevelopment;
	tipJS.lang = _lang;
	document.write('<script type="text/javascript" charset="UTF-8" src="' + _filepath + 'tipJS.config.js?' + __config__.noCacheParam + '=' + Math.random() + '"></script>');

})(this);
