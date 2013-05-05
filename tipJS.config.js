/*
 * tipJS - Javascript MVC Framework ver.1.000
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */


// configuring tipJS
tipJS.config(function() {
	
	var _ROOT = "/tipJS-dev";
	
	var config = {
		noCache:true,
		noCacheVersion:"1.000",
		noCacheParam:"noCacheVersion",
		noCacheAuto:false,
		charSet:"utf-8",
		developmentHostList:[
			'localhost'
			,'127.0.0.1'
			,'tipjs.com'
		],
		commonLib:[
			_ROOT+"/lib/jquery-ui-1.8.21/jquery-1.7.2.min.js?ver=1212"
			//,"/tipJS-dev/lib/extjs-4.0.2a/ext-all-debug.js"
		],
		commonModel:[
			_ROOT+"/common/models/CommonModel.js",
			_ROOT+"/tutorial/common/commonParent.js",
			_ROOT+"/tutorial/common/commonParent2.js",
			_ROOT+"/tutorial/common/commonParent3.js"
		],
		commonView:[
			_ROOT+"/common/views/CommonView.js",
			_ROOT+"/tutorial/common/commonViewParent.js",
			_ROOT+"/tutorial/common/commonViewParent2.js"
		],
		applicationPath:{
			test : _ROOT+'/examples/test'
			,test1 : _ROOT+'/test1'
			
			,Controller : _ROOT+'/tutorial/Controller'
			,Model : _ROOT+'/tutorial/Model'
			,ModelExtend : _ROOT+'/tutorial/ModelExtend'
			,ModelSync : _ROOT+'/tutorial/ModelSync'
			,ModelVO : _ROOT+'/tutorial/ModelVO'
			,View : _ROOT+'/tutorial/View'
			,ViewExtend : _ROOT+'/tutorial/ViewExtend'
		}
	};
	
	return config;
	
}());

