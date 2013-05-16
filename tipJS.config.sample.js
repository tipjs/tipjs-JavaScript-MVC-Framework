// configuring tipJS
tipJS.config({
	noCache:true,
	noCacheVersion:"1.000",
	noCacheAuto:true,
	noCacheParam:"noCacheVersion",
	charSet:"utf-8",
	developmentHostList:[
		'localhost',
		'127.0.0.1',
		'tipjs.com'
	],
	commonLib:[
		"http://tipjs.com/tipJS/jquery-ui-1.8.21/jquery-1.7.2.min.js",
		"http://tipjs.com/tipJS/extjs-4.1.1/ext-all.js"
	],
	commonModel:[
		"/tipJS/examples/common/models/CommonModel.js",
		"/tipJS/tutorials/common/commonParent.js",
		"/tipJS/tutorials/common/commonParent2.js",
		"/tipJS/tutorials/common/commonParent3.js"
	],
	commonView:[
		"/tipJS/examples/common/views/CommonView.js",
		"/tipJS/tutorials/common/commonViewParent.js",
		"/tipJS/tutorials/common/commonViewParent2.js"
	],
	applicationPath:{
		geolocation : '/tipJS/examples/geolocation',
		FileAPI : '/tipJS/examples/FileAPI',
		helloWorld : '/tipJS/examples/helloWorld',
		helloWorldTpl : '/tipJS/examples/helloWorldTpl',
		withExtJS : '/tipJS/examples/withExtJS',
		todoMVC : '/tipJS/examples/todoMVC',
		
		Controller : '/tipJS/tutorials/Controller',
		Model : '/tipJS/tutorials/Model',
		ModelExtend : '/tipJS/tutorials/ModelExtend',
		ModelSync : '/tipJS/tutorials/ModelSync',
		ModelVO : '/tipJS/tutorials/ModelVO',
		View : '/tipJS/tutorials/View',
		ViewExtend : '/tipJS/tutorials/ViewExtend'
	}
});

