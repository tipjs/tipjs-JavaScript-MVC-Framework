/*
 * tipJS - OpenSource Javascript MVC Framework ver.1.27
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */
var tipJS=tipJS||{};tipJS.ver=tipJS.version="1.27";(function(){var H=tipJS.getById=function(V,i){return !i?document.getElementById(V):i.getElementById(V)};var u=tipJS.getByName=function(i,V){return !V?document.getElementsByName(i):V.getElementsByName(i)};var M=tipJS.getByTag=function(i,V){return !V?document.getElementsByTagName(i):V.getElementsByTagName(i)};var j=function(V,W){for(var i in W){if(V[i]){continue}V[i]=W[i]}return V};var o=function(Y,W){if(!W||typeof W!="object"||(!W.__name&&!W.name)){throw"Please check your "+Y+" definition"}var V=(W.__name)?W.__name:W.name;if(typeof V!="string"){throw"Please check your "+Y+" definition"}if(W.__extend&&W.__extend===V&&Y!="controllers"){throw"Can't extend itself"}var X=V.split("."),Z=X[0],i=X[1],aa=I(Z);if(!aa){throw"Please check your "+Y+" definition"}if(aa.loadOrder.presentOrder()===Y){if(Y=="controllers"){W.__appName__=Z}else{if(W.__name){delete W.__name}}Q.depart[Z]=Q.depart[Z]||{};Q.depart[Z][Y]=Q.depart[Z][Y]||{};Q.depart[Z][Y][i]=W}};var U=function(Z,V){if(V===Q.OBJ_TPL.loadOrder.order[0]){return T(Z[V])}var Y=Z.name;if(N.MAIN&&N.MAIN!=Y&&V!="models"){return[]}var X=r.path[V],W=r.applicationPath[Y],i=T(Z[V]);return A(W,X,i)};var A=function(X,Z,Y){var W=[];for(var V=Y.length;V--;){W.push(X+k(Z)+Y[V])}return W};var J=function(V,i){if(i.nocache===true){V=(V.indexOf("?")<0)?V+"?":V+"&";V=V+i.paramName+"="+i.version}return V};var v=tipJS.loadJS=function(X,W,V){var i=document.createElement("script");i.type="text/javascript";i.src=J(X,W);i.charset=r.charSet;if(V){if(i.readyState){i.onreadystatechange=function(){if(this.readyState=="loaded"||this.readyState=="complete"){this.onreadystatechange=null;V(this)}}}else{i.onload=function(){V(this)}}}document.getElementsByTagName("head")[0].appendChild(i)};var b=function(V,X,W){var i=function(Y){if(t(V,X,Y.src)){f(V)}};v(W,D(V),i)};var z=function(V,Y){l(V,Y);var W=h(V);var Z=U(W,Y);Q[V][Y].requireList=Z;if(Z.length>0){for(var X=Z.length;X--;){b(V,Y,Z[X])}}else{f(V)}};var q=function(X){if(!X.__extend){return X}if(typeof X.__extend==="string"){X=w(X,X.__extend)}else{if(X.__extend instanceof Array){var V=X.__extend;for(var W=V.length;W--;){X=w(X,V[W])}}}delete X.__extend;return X};var w=function(W,V){var i=V.split(".");if(i.length==2){return j(W,p(i[1],false,i[0]))}else{return j(W,x(V))}};var x=tipJS.loadCommonModel=function(V,Z){var X=Q.common.models;if(!X[V]||X[V]==undefined){throw"Could not find commonModel: "+V}if(Z===true){var W=Q.common.syncModels;if(!W){W=Q.common.syncModels={}}if(W[V]){return W[V]}var i=W[V]=q(c(X[V]));if(V.lastIndexOf("VO")==(V.length-2)){if(typeof i.__init==="function"){i.__init();delete i.__init}return i}i.loadCommonModel=x;if(typeof i.__init==="function"){i.__init();delete i.__init}return i}var Y=q(c(X[V]));if(V.lastIndexOf("VO")==(V.length-2)){if(typeof Y.__init==="function"){Y.__init();delete Y.__init}return Y}Y.loadCommonModel=x;if(typeof Y.__init==="function"){Y.__init();delete Y.__init}return Y};var p=function(W,ab,V){var aa=(!V)?N.MAIN:V,Y=Q.depart[aa].models;if(!Y[W]||Y[W]==undefined){throw"Could not find model: "+W}if(ab===true){var X=Q.depart[aa].syncModels;if(!X){X=Q.depart[aa].syncModels={}}if(X[W]){return X[W]}var i=X[W]=q(c(Y[W]));if(W.lastIndexOf("VO")==(W.length-2)){if(typeof i.__init==="function"){i.__init();delete i.__init}return i}i.loadCommonModel=x;i.loadModel=p;i.getById=H;i.getByName=u;i.getByTag=M;if(typeof i.__init==="function"){i.__init();delete i.__init}return i}var Z=q(c(Y[W]));if(W.lastIndexOf("VO")==(W.length-2)){if(typeof Z.__init==="function"){Z.__init();delete Z.__init}return Z}Z.loadCommonModel=x;Z.loadModel=p;Z.getById=H;Z.getByName=u;Z.getByTag=M;if(typeof Z.__init==="function"){Z.__init();delete Z.__init}return Z};tipJS.loadModel=function(V,Z){var aa=(typeof Z==="boolean")?Z:false;try{var W=V.split("."),Y=W[0],i=W[1]}catch(X){throw"tipJS.loadModel : invalid parameter"}return p(i,aa,Y)};var I=function(i){return N[i]};var h=function(i){return N[i].define};var D=function(i){var W={};var V=h(i);if(V){var X=V.noCacheVersion;if(V.noCacheAuto===true){X=""+Math.random()}W.nocache=V.noCache;W.version=X;W.paramName=V.noCacheParam}return W};var f=function(W){var Z=I(W);if(Z.loadOrder.isLastOrder()===false){z(W,Z.loadOrder.nextOrder());return}if(N.MAIN!=W){return}var V=function(ac){var ab=Q.common.views;if(!ab||!ab[ac]||ab[ac]==undefined){throw"Could not find commonView: "+ac}var aa=c(ab[ac]);aa.loadCommonView=V;aa.renderTemplate=e;aa.getById=H;aa.getByName=u;aa.getByTag=M;if(aa.__extend&&typeof aa.__extend==="string"){aa=j(aa,V(aa.__extend));delete aa.__extend}if(typeof aa.__init==="function"){aa.__init();delete aa.__init}return aa};var Y=function(af,aa){var ae=(!aa)?N.MAIN:aa,ad=Q.depart[ae].views;if(!ad||!ad[af]||ad[af]==undefined){throw"Could not find view: "+af}var ac=c(ad[af]);ac.loadCommonView=V;ac.loadView=Y;ac.renderTemplate=e;ac.getById=H;ac.getByName=u;ac.getByTag=M;if(ac.__extend&&typeof ac.__extend==="string"){var ab=ac.__extend.split(".");if(ab.length==2){ac=j(ac,Y(ab[1],ab[0]))}else{ac=j(ac,V(ac.__extend))}delete ac.__extend}if(typeof ac.__init==="function"){ac.__init();delete ac.__init}return ac};var i=Z.controller=Q.depart[W].controllers;if(i){for(var X in i){i[X].loadCommonModel=x;i[X].loadCommonView=V;i[X].loadModel=p;i[X].loadView=Y;i[X].renderTemplate=e;i[X].getById=H;i[X].getByName=u;i[X].getByTag=M}}(function(ab){var af=I(ab);af.define.onLoad(af.onLoadParam);if(B&&B[ab]){var ac=B[ab];for(var ae=0,ad=ac.length;ae<ad;ae++){var aa=ac[ae];tipJS.action(aa.name,aa.param)}delete B[ab]}})(W)};var t=function(V,X,Z){var Y=Q[V][X].requireList;for(var W=Y.length;W--;){if(Y[W]===true){continue}if(Z.indexOf(Y[W])>=0){Y[W]=true;break}}for(var W=Y.length;W--;){if(Y[W]!==true){return false}}return true};var k=function(i){return g.pathDiv+i+g.pathDiv};var c=tipJS.cloneObject=function(i){if(typeof Object.create==="function"){c=tipJS.cloneObject=function(V){return Object.create(V)};return c(i)}c=tipJS.cloneObject=function(W){function V(){}V.prototype=W;return new V()};return c(i)};var E=tipJS.echo=function(X,V,W){if(W&&(typeof W!="string"||typeof W=="string"&&W.split(".").length>5)){return}if(!V){V=""}if(X===null||X===undefined){console.log(((W)?W+".":"")+X);return}if(typeof X=="boolean"||typeof X=="number"||typeof X=="string"){if(typeof X==V||V==""){console.log(((W)?W+".":"")+X)}return}for(var i in X){if(X[i]&&X[i] instanceof Array){console.log(((W)?W+".":"")+i+":Array");E(X[i],V,((W)?W+".":"")+i)}else{if(X[i]&&typeof X[i]=="object"){console.log(((W)?W+".":"")+i+":Object");E(X[i],V,((W)?W+".":"")+i)}else{if(typeof X[i]==V||V==""){console.log(((W)?W+".":"")+i+":"+X[i])}}}}};var T=tipJS.uniqueArray=function(W){var Y=[],V=W.length;for(var Z=0;Z<V;Z++){for(var X=Z+1;X<V;X++){if(W[Z]===W[X]){X=++Z}}Y.push(W[Z])}return Y};var l=function(i,V){Q[i]=Q[i]||{};Q[i][V]=Q[i][V]||{}};var F=function(X,W){for(var Y=0,V=W.length;Y<V;Y++){var Z=W[Y];if(X.noCache&&X.noCache===true){Z+=(Z.indexOf("?")<0)?"?":"&";Z+=(X.noCacheParam?X.noCacheParam:r.noCacheParam)+"=";if(X.noCacheAuto===true){Z+=Math.random()}else{Z+=(X.noCacheVersion?X.noCacheVersion:r.noCacheVersion)}}document.write('<script type="text/javascript" charset="'+(X.charSet?X.charSet:r.charSet)+'" src="'+Z+'"><\/script>')}};tipJS.config=function(W){if(W.commonLib){F(W,W.commonLib);delete W.commonLib}if(W.commonModel){F(W,W.commonModel);delete W.commonModel}if(W.commonView){F(W,W.commonView);delete W.commonView}r=j(W,Q.OBJ_TPL.config);if(tipJS.isDevelopment===null){var V=window.location.hostname;if(V.length==0){tipJS.isDevelopment=true;return}for(var X=r.developmentHostList.length;X--;){if(V.match(r.developmentHostList[X])!==null){tipJS.isDevelopment=true;break}}}};var a=function(){var i=new Date();return((i.now)?i.now():i.getTime())/1000};tipJS.benchmark={};var y={};tipJS.benchmark.mark=function(i){y[i]=a()};tipJS.benchmark.elapsedTime=function(i,X,V){var W=y[i],Z=y[X],Y=Z-W;if(V){V(i,X,W,Z,Y)}else{tipJS.log("elapsed time["+i+" to "+X+"] : "+Y+" seconds","[BENCHMARK]")}return Y};var K=function(){var i=false;if(window.XMLHttpRequest){i=new XMLHttpRequest()}else{if(window.ActiveXObject){try{i=new ActiveXObject("Msxml2.XMLHTTP")}catch(W){try{i=new ActiveXObject("Microsoft.XMLHTTP")}catch(V){}}}}K=function(){return i};return K()};var e=function(X){var Z=N.MAIN;if(h(Z).templateCache&&s[X.url]){var W=O(s[X.url],X.data);if(typeof X.renderTo=="string"){document.getElementById(X.renderTo).innerHTML+=W}return W}var V=D(Z),aa=J(X.url,V),i=K();i.open("GET",aa,false);try{i.send(null)}catch(Y){return null}if(i.readyState==4&&i.status==200){var W=s[X.url]=i.responseText;W=O(W,X.data);if(typeof X.renderTo=="string"){document.getElementById(X.renderTo).innerHTML+=W}return W}else{throw"Could not find template file:"+aa}};var O=function(V,X){V=V.replace(/\r\n/g,"\n");V=V.replace(/\r/g,"\n");V=V.replace(/\\/g,"\\\\");V=V.replace(/\n/g,"");var i=V.split("@>"),W=new Function("data",P(i));return W(X)};var P=function(ad){var ag=[],ae=[],V=[],ab="PLANE",af="VALUE",X="PARSE",Z="__temp_HTML__.push(";ag.push("var __temp_HTML__ = [];");for(var Y=0,ac=ad.length;Y<ac;Y++){var aa=ad[Y];if(aa.indexOf("<@=")>-1){var W=aa.split("<@=");if(W.length>1){V.push(W[0].replace(/"/g,'\\"'));V.push(W[1]);ae.push(ab);ae.push(af)}else{V.push(W[0]);ae.push(af)}}else{if(aa.indexOf("<@")>-1){var W=aa.split("<@");if(W.length>1){V.push(W[0].replace(/"/g,'\\"'));V.push(W[1]);ae.push(ab);ae.push(X)}else{V.push(W[0]);ae.push(X)}}else{V.push(aa.replace(/"/g,'\\"'));ae.push(ab)}}}for(var Y=0,ac=V.length;Y<ac;Y++){var aa=V[Y];if(ae[Y]==af){aa='""+'+aa+'+""';ag.push(Z+aa+");")}else{if(ae[Y]==X){ag.push(aa)}else{aa='"'+aa+'"';ag.push(Z+aa+");")}}}ag.push("return __temp_HTML__.join('');");return ag.join("")};tipJS.commonModel=function(i){if(!i||typeof i!="object"||(!i.__name&&!i.name)){throw"Please check your CommonModel definition"}var V=(i.__name)?i.__name:i.name;if(typeof V!="string"){throw"Please check your CommonModel definition"}if(i.__extend&&i.__extend===V){throw"Can't extend itself"}if(i.__name){delete i.__name}Q.common.models[V]=i};tipJS.commonView=function(i){if(!i||typeof i!="object"||(!i.__name&&!i.name)){throw"Please check your CommonView definition"}var V=(i.__name)?i.__name:i.name;if(typeof V!="string"){throw"Please check your CommonView definition"}if(i.__extend&&i.__extend===V){throw"Can't extend itself"}if(i.__name){delete i.__name}Q.common.views[V]=i};var g=(function(){var i={pathDiv:"/",blank:"",extJS:"js",extDiv:"."};return i})();tipJS.log=function(W,X){window.console=window.console||{log:function(){},error:function(){}};var ab=new Date(),i=ab.getFullYear(),ad=ab.getMonth()+1,Y=ab.getDate(),ac=ab.getHours(),V=ab.getMinutes(),Z=ab.getSeconds(),aa=ab.getMilliseconds();console.log(((X)?X:"")+i+"/"+ad+"/"+Y+" "+ac+":"+V+":"+Z+"."+aa+" "+W)};tipJS.debug=function(i){if(tipJS.isDevelopment){tipJS.log(i,"[DEBUG]")}};tipJS.controller=function(i){o("controllers",i)};tipJS.model=function(i){o("models",i)};tipJS.view=function(i){o("views",i)};tipJS.action=function(W,V){var ae,ab,ad;try{ae=W.split(".");ab=ae[0];ad=ae[1];if(ab.length==0||ad.length==0){throw""}}catch(ac){throw"tipJS.action : invalid parameter"}var Z=I(ab);if(!Z||!Z.loadOrder||!Z.loadOrder.isLastOrder()){B=B||{};B[ab]=B[ab]||[];B[ab].push({name:W,param:V});return}if(!Z.controller||!Z.controller[ad]){throw"Could not find controller: "+W}var i;if(tipJS.isDevelopment===true){i=a()}var X=c(Z.controller[ad]);if(!X){throw"Could not find controller"}var Y={controllerName:(X.__name)?X.__name:X.name,ctrler:X,beforeCtrler:Z.define.beforeController,afterCtrler:Z.define.afterController};if(Y.beforeCtrler){if(Y.beforeCtrler(V)===false){return}}var aa=function(){var ag=Y.ctrler;try{var aj=function(){if(ag.afterInvoke){ag.afterInvoke(V)}};var af=function(){var ak=true;if(ag.invoke){ak=ag.invoke(V)}if(ak!==false){aj()}};var ah=function(){var ak=true;if(ag.beforeInvoke){ak=ag.beforeInvoke(V)}if(ak!==false){af()}};ah()}catch(ai){if(ag.exceptionInvoke){ag.exceptionInvoke(ai,V)}else{throw ai}}if(Y.afterCtrler){Y.afterCtrler(V)}if(tipJS.isDevelopment===true){tipJS.debug(W+" completed in "+(a()-i)+" seconds")}};if(Y.ctrler.async===true){setTimeout(aa,15)}else{aa()}};tipJS.loadApp=function(Z,aa){tipJS.debug("tipJS version "+tipJS.version);for(var V=0,W=Z.length;V<W;V++){var Y=Z[V],X=[];if(!N.MAIN){N.MAIN=Y}if(aa){N[Y]=N[Y]||{};N[Y].onLoadParam=aa}X.push(r.applicationPath[Y]);X.push(g.pathDiv);X.push(r.defineFileName);X.push(g.extDiv);X.push(g.extJS);setTimeout(function(){if(!N[Y]||!N[Y].define){throw"Could not find application: "+Y}},1000);v(X.join(g.blank),{nocache:true,version:Math.random(),paramName:r.noCacheParam})}};tipJS.define=function(W){W=j(W,Q.OBJ_TPL.define);if(W.templateCache===undefined){W.templateCache=r.templateCache}if(W.noCache===undefined){W.noCache=r.noCache;W.noCacheVersion=r.noCacheVersion;W.noCacheParam=r.noCacheParam;W.noCacheAuto=r.noCacheAuto}else{if(W.noCache===true){if(W.noCacheVersion===undefined){W.noCacheVersion=r.noCacheVersion}if(W.noCacheParam===undefined){W.noCacheParam=r.noCacheParam}if(W.noCacheAuto===undefined){W.noCacheAuto=r.noCacheAuto}}}var i=W.name;N[i]=N[i]||{};N[i].loadOrder={};N[i].loadOrder=j(N[i].loadOrder,Q.OBJ_TPL.loadOrder);var V=N[i].loadOrder.presentOrder();l(i,V);N[i].define=W;z(i,V)};var Q={};Q.OBJ_TPL={config:{noCache:false,noCacheVersion:1,noCacheParam:"noCacheVersion",noCacheAuto:false,templateCache:true,charSet:"utf-8",defineFileName:"define",path:{controllers:"controllers",models:"models",views:"views"},developmentHostList:[],applicationPath:{}},define:{extLib:[],controllers:[],models:[],views:[],onLoad:function(){},beforeController:function(){},afterController:function(){}},loadOrder:{index:0,init:function(){this.index=0},presentOrder:function(){return this.order[this.index]},nextOrder:function(){return this.order[++this.index]},isLastOrder:function(){return(this.index+1)==this.order.length},order:["extLib","controllers","models","views"]}};Q.depart=Q.depart||{};Q.common=Q.common||{};Q.common.models=Q.common.models||{};Q.common.views=Q.common.views||{};var N={},s={},B={},r=c(Q.OBJ_TPL.config),m=window.location.pathname,R=window.location.search,L=document.getElementsByTagName("script"),G,d,n,C=null;for(var S=L.length;S--;){d=L[S].src;n=d.match(/tipJS-MVC\.js$/);if(n){G=d.substring(0,d.length-n[0].length);break}}document.write('<script type="text/javascript" charset="UTF-8" src="'+G+"tipJS.config.js?"+r.noCacheParam+"="+Math.random()+'"><\/script>');if(R.match("(\\?|&)debug")!==null||m.match("debug")!==null){C=true}else{if(R.match("(\\?|&)nodebug")!==null||m.match("nodebug")!==null){C=false}}tipJS.isDevelopment=C})();