/*
 * tipJS - Javascript MVC Framework ver.1.000
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */


// configuring tipJS
tipJS.config({
	commonLib:[
		"http://tipjs.com/tipJS/jquery-ui-1.8.21/jquery-1.7.2.min.js",
		"http://tipjs.com/tipJS/extjs-4.1.1/ext-all.js"
	],

	// 절대경로나 상대경로를 지정하지 않으면 _filepath를 coreRoot로 인식하게 변경하여 설치 경로와 상관없이 동작 가능하게 함.
	commonModel:[
		"examples/common/models/CommonModel.js",
		"tutorials/common/commonParent.js",
		"tutorials/common/commonParent2.js",
		"tutorials/common/commonParent3.js"
	],
	commonView:[
		"examples/common/views/CommonView.js",
		"tutorials/common/commonViewParent.js",
		"tutorials/common/commonViewParent2.js"
	],
	applicationPath:{
		geolocation : 'examples/geolocation',
		FileAPI : 'examples/FileAPI',
		helloWorld : 'examples/helloWorld',
		helloWorldTpl : 'examples/helloWorldTpl',
		withExtJS : 'examples/withExtJS',
		todoMVC : 'examples/todoMVC',
		
		Controller : 'tutorials/Controller',
		Interceptor : 'tutorials/Interceptor',
		Model : 'tutorials/Model',
		ModelExtend : 'tutorials/ModelExtend',
		ModelSync : 'tutorials/ModelSync',
		ModelVO : 'tutorials/ModelVO',
		View : 'tutorials/View',
		ViewExtend : 'tutorials/ViewExtend'
	}
});

