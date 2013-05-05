/*
 * tipJS - OpenSource Javascript MVC Framework ver.1.33
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */
var tipJS={};tipJS.ver=tipJS.version="1.33";(function(){var W=function(ai,i){return !i?document.getElementById(ai):i.getElementById(ai)};var u=function(i,ai){return !ai?document.getElementsByName(i):ai.getElementsByName(i)};var F=function(i,ai){return !ai?document.getElementsByTagName(i):ai.getElementsByTagName(i)};var t=function(i){return"Please check your "+i+" definition"};var Y=function(ai,aj){for(var i in aj){if(ai[i]){continue}ai[i]=aj[i]}return ai};var m=function(ak,ai){if(ak instanceof Array){for(var aj=ak.length;aj--;){if(ak[aj]==ai){return true}}}else{if(ak==ai){return true}}return false};var J=function(al,aj){if(!aj||typeof aj!="object"){throw new Error(t(al))}var ai=(aj.__name)?aj.__name:aj.name;if(typeof ai!="string"){throw new Error(t(al))}if(aj.__extend&&al!="controllers"&&m(aj.__extend,ai)){throw new Error("Can't extend itself:"+ai)}var ak=ai.split("."),am=ak[0],i=ak[1],ao=T[am];if(!ao){throw new Error(t(al))}if(ao.loadOrder.presentOrder()===al){var an=P[am]=P[am]||{};an[al]=an[al]||{};an[al][i]=aj}};var s=function(an,aj){var ai=n.loadOrder;if(aj===ai.order[0]){return f(an[aj])}var am=an.name;if(T.MAIN&&T.MAIN!=am&&aj!="models"){return[]}if(aj===ai.order[1]&&an.localSet){an[aj]=[K+p.path.lang+"/"+tipJS.lang+".js"];return an[aj]}var al=p.path[aj],ak=p.applicationPath[am],i=f(an[aj]);return y(ak,al,i)};var y=function(ak,am,al){var aj=[];for(var ai=al.length;ai--;){aj.push(ak+Z(am)+al[ai])}return aj};var G=function(ai,i){if(i.nocache===true){ai+=(ai.indexOf("?")<0)?"?":"&";ai+=i.paramName+"="+i.version}return ai};var k=tipJS.loadJS=function(ak,aj,ai){var i=document.createElement("script");i.type="text/javascript";i.src=G(ak,aj);i.charset=p.charSet;if(ai){if(i.readyState){i.onreadystatechange=function(){if(this.readyState=="loaded"||this.readyState=="complete"){this.onreadystatechange=null;ai(this)}}}else{i.onload=function(){ai(this)}}}F("head")[0].appendChild(i)};var ae=function(i,aj,ai){k(ai,E(i),function(ak){if(O(i,aj,ak.src)){S(i)}})};var af=function(ai,ak){B(ai,ak);var al=U[ai][ak].requireList=s(o(ai),ak);if(al.length>0){for(var aj=al.length;aj--;){ae(ai,ak,al[aj])}}else{S(ai)}};var d=function(al,ak){var ai=al.__extend;if(!ai){return al}if(typeof ai=="string"){al=z(al,ai,ak)}else{if(ai instanceof Array){for(var aj=ai.length;aj--;){al=z(al,ai[aj],ak)}}}return al};var z=function(ak,aj,ai){var i=aj.split(".");if(ai=="model"){if(i.length==2){return Y(ak,L(I(i[1],false,i[0])))}else{return Y(ak,L(l(aj)))}}else{if(i.length==2){return Y(ak,L(H(i[1],i[0])))}else{return Y(ak,L(b(aj)))}}};var l=tipJS.loadCommonModel=function(ai,am){var ak=ab;if(!ak[ai]||ak[ai]===undefined){throw new Error("Could not find commonModel: "+ai)}if(am===true){var aj=A;if(aj[ai]){return aj[ai]}var i=aj[ai]=L(ak[ai],N["CommonModel"+ai]);if(typeof i.__init=="function"){i.__init()}return i}var al=L(ak[ai],N["CommonModel"+ai]);if(typeof al.__init=="function"){al.__init()}return al};var I=function(aj,ao,ai){var an=(!ai)?T.MAIN:ai,al=P[an].models;if(!al[aj]||al[aj]===undefined){throw new Error("Could not find model: "+aj)}if(ao===true){var ak=P[an].syncModels;if(!ak){ak=P[an].syncModels={}}if(ak[aj]){return ak[aj]}var i=ak[aj]=L(al[aj],N["models"+an+"."+aj]);if(typeof i.__init=="function"){i.__init()}return i}var am=L(al[aj],N["models"+an+"."+aj]);if(typeof am.__init=="function"){am.__init()}return am};var b=function(aj){var ai=a;if(!ai||!ai[aj]||ai[aj]===undefined){throw new Error("Could not find commonView: "+aj)}var i=L(ai[aj],N["CommonView"+aj]);if(typeof i.__init=="function"){i.__init()}return i};var H=function(al,i){var ak=(!i)?T.MAIN:i,aj=P[ak].views;if(!aj||!aj[al]||aj[al]===undefined){throw new Error("Could not find view: "+al)}var ai=L(aj[al],N["views"+ak+"."+al]);if(typeof ai.__init=="function"){ai.__init()}return ai};tipJS.loadModel=function(ai,am){var an=(typeof am=="boolean")?am:false;try{var aj=ai.split("."),al=aj[0],i=aj[1]}catch(ak){throw new Error("tipJS.loadModel : invalid parameter")}return I(i,an,al)};var o=function(i){return T[i].define};var E=function(i){var aj={};var ai=o(i);if(ai){aj.nocache=ai.noCache;aj.version=(ai.noCacheAuto===true)?""+Math.random():ai.noCacheVersion;aj.paramName=ai.noCacheParam}return aj};var S=function(aq){var am=T[aq];if(am.loadOrder.isLastOrder()===false){af(aq,am.loadOrder.nextOrder());return}if(T.MAIN!=aq){return}var al=am.controller=P[aq].controllers;if(al){for(var aj in al){al[aj].loadCommonModel=l;al[aj].loadCommonView=b;al[aj].loadModel=I;al[aj].loadView=H;al[aj].renderTemplate=v;al[aj].getById=W;al[aj].getByName=u;al[aj].getByTag=F}}for(var aj in ab){var at=(ab[aj].__name)?ab[aj].__name:ab[aj].name;d(ab[aj],"model");if(at.lastIndexOf("VO")!=(at.length-2)){ab[aj].loadCommonModel=l;ab[aj].getById=W;ab[aj].getByName=u;ab[aj].getByTag=F}N["CommonModel"+at]=V(ab[aj])}var an=P[aq].models;if(an){for(var aj in an){var at=(an[aj].__name)?an[aj].__name:an[aj].name;d(an[aj],"model");if(at.lastIndexOf("VO")!=(at.length-2)){an[aj].loadCommonModel=l;an[aj].loadModel=I;an[aj].getById=W;an[aj].getByName=u;an[aj].getByTag=F}N["models"+at]=V(an[aj])}}for(var aj in a){var at=(a[aj].__name)?a[aj].__name:a[aj].name;d(a[aj],"view");a[aj].loadCommonView=b;a[aj].renderTemplate=v;a[aj].getById=W;a[aj].getByName=u;a[aj].getByTag=F;N["CommonView"+at]=V(a[aj])}var ai=P[aq].views;if(ai){for(var aj in ai){var at=(ai[aj].__name)?ai[aj].__name:ai[aj].name;d(ai[aj],"view");ai[aj].loadCommonView=b;ai[aj].loadView=H;ai[aj].renderTemplate=v;ai[aj].getById=W;ai[aj].getByName=u;ai[aj].getByTag=F;N["views"+at]=V(ai[aj])}}tipJS.debug("tipJS version "+tipJS.version+"["+tipJS.lang+"]");am.define.onLoad(am.onLoadParam);if(C&&C[aq]){var ap=C[aq];for(var ak=0,ar=ap.length;ak<ar;ak++){var ao=ap[ak];tipJS.action(ao.name,ao.param)}delete C[aq]}};var O=function(ai,al,an){var am=U[ai][al].requireList;for(var ak=am.length;ak--;){if(am[ak]===true){continue}var aj=am[ak].indexOf("./")>-1?am[ak].substr(am[ak].lastIndexOf("./")+1):am[ak];if(an.indexOf(aj)>-1){am[ak]=true;break}}for(var ak=am.length;ak--;){if(am[ak]!==true){return false}}return true};var Z=function(i){return"/"+i+"/"};var ac=function(i){if(typeof Object.create=="function"){ac=function(ai){return Object.create(ai)}}else{ac=function(aj){function ai(){}ai.prototype=aj;return new ai()}}return ac(i)};var L=tipJS.cloneObject=function(ak,i){if(ak==null||typeof ak!="object"){return ak}if(!i){var aj=(ak instanceof Array)?[]:{};for(var ai in ak){if(typeof ak[ai]=="object"){aj[ai]=L(ak[ai],false)}else{aj[ai]=ak[ai]}}return aj}else{return ac(ak)}};var V=function(ai){for(var i in ai){if(typeof ai[i]=="object"){return true}}return false};var ad=tipJS.echo=function(ak,ai,aj){if(aj&&(typeof aj!="string"||typeof aj=="string"&&(aj.split(".").length+aj.split("]").length)>3)){return}if(!ai){ai=""}if(ak===null||ak===undefined){console.log(((aj)?aj+".":"")+ak);return}if(typeof ak!="object"){if(typeof ak==ai||ai==""){console.log(((aj)?aj+".":"")+ak+"["+typeof ak+"]")}return}if(ak instanceof Array){console.log(((aj)?aj+":":"")+"[Array["+ak.length+"]]")}else{console.log(((aj)?aj+":":"")+"[Object]")}for(var i in ak){if(ak instanceof Array){if(typeof ak[i]=="object"){ad(ak[i],ai,((aj)?aj+"[":"[")+i+((aj)?"]":"]"))}else{if(typeof ak[i]==ai||ai==""){console.log(((aj)?aj+"[":"[")+i+((aj)?"]":"]")+":"+ak[i]+" ("+typeof ak[i]+")")}}}else{if(typeof ak[i]=="object"){ad(ak[i],ai,((aj)?aj+".":"")+i)}else{if(typeof ak[i]==ai||ai==""){console.log(((aj)?aj+".":"")+i+":"+ak[i]+" ("+typeof ak[i]+")")}}}}};var f=tipJS.uniqueArray=function(aj){var al=[],ai=aj.length;for(var am=0;am<ai;am++){for(var ak=am+1;ak<ai;ak++){if(aj[am]===aj[ak]){ak=++am}}al.push(aj[am])}return al};var B=function(i,ai){var aj=U[i]=U[i]||{};aj[ai]=aj[ai]||{}};var Q=function(ak,aj){for(var al=0,ai=aj.length;al<ai;al++){var am=aj[al];if(ak.noCache&&ak.noCache===true){am+=(am.indexOf("?")<0)?"?":"&";am+=(ak.noCacheParam?ak.noCacheParam:p.noCacheParam)+"=";if(ak.noCacheAuto===true){am+=Math.random()}else{am+=(ak.noCacheVersion?ak.noCacheVersion:p.noCacheVersion)}}document.write('<script type="text/javascript" charset="'+(ak.charSet?ak.charSet:p.charSet)+'" src="'+am+'"><\/script>')}};tipJS.config=function(ai){if(ai.commonLib){Q(ai,ai.commonLib)}if(ai.commonModel){Q(ai,ai.commonModel)}if(ai.commonView){Q(ai,ai.commonView)}p=Y(ai,n.config);if(tipJS.isDevelopment===null){for(var aj=p.developmentHostList.length;aj--;){if(ag.hostname.match(p.developmentHostList[aj])!==null){tipJS.isDevelopment=true;break}}}};var x=function(){var i=new Date();return(i.now)?i.now():i.getTime()};tipJS.benchmark={};tipJS.benchmark.mark=function(i){w[i]=x()};tipJS.benchmark.elapsedTime=function(i,ak,ai){var aj=w[i],am=w[ak],al=(am-aj)/1000;if(ai){ai(i,ak,aj,am,al)}else{tipJS.log("elapsed time["+i+" to "+ak+"] : "+al+" seconds","[BENCHMARK]")}return al};var j=function(){var i=false;if(window.XMLHttpRequest){i=new XMLHttpRequest()}else{if(window.ActiveXObject){try{i=new ActiveXObject("Msxml2.XMLHTTP")}catch(aj){try{i=new ActiveXObject("Microsoft.XMLHTTP")}catch(ai){}}}}j=function(){return i};return j()};var v=function(ak){if(arguments.length>1){return r(arguments[0],arguments[1],arguments[2])}var am=T.MAIN;if(o(am).templateCache&&q[ak.url]){var aj=r(q[ak.url],ak.data,ak.tplId);if(typeof ak.renderTo=="string"){W(ak.renderTo).innerHTML+=aj}return aj}var ai=E(am),an=G(ak.url,ai),i=j();i.open("GET",an,false);try{i.send(null)}catch(al){return null}if(i.readyState==4&&i.status==200){var aj=q[ak.url]=i.responseText;aj=r(aj,ak.data,ak.tplId);if(typeof ak.renderTo=="string"){W(ak.renderTo).innerHTML+=aj}return aj}else{throw new Error("Could not find template file:"+an)}};var r=function(an,al,aq){an=an.replace(/\r\n/g,"\n");an=an.replace(/\r/g,"\n");an=an.replace(/\\/g,"\\\\");an=an.replace(/\n/g,"");if(typeof aq=="string"){var ap=an.split("[[#"),aj=new RegExp("^"+aq+"]]");for(var am=0,ao=ap.length;am<ao;am++){if(ap[am].match(aj)){an=ap[am].replace(aj,"");break}}}else{an=an.replace(/\[\[#[a-zA-Z0-9_-]*\]\]/g,"")}var ak=an.split("@>"),ai=new Function("data",ah(ak));return ai(al)};var ah=function(aq){var au=[],ar=[],ai=[],ao="PLN",at="VAL",ak="PAS",am="__tempArr__.push(";au.push("var __tempArr__ = [];");for(var al=0,ap=aq.length;al<ap;al++){var an=aq[al];if(an.indexOf("<@=")>-1){var aj=an.split("<@=");if(aj.length>1){ai.push(aj[0].replace(/"/g,'\\"'));ai.push(aj[1]);ar.push(ao);ar.push(at)}else{ai.push(aj[0]);ar.push(at)}}else{if(an.indexOf("<@")>-1){var aj=an.split("<@");if(aj.length>1){ai.push(aj[0].replace(/"/g,'\\"'));ai.push(aj[1]);ar.push(ao);ar.push(ak)}else{ai.push(aj[0]);ar.push(ak)}}else{ai.push(an.replace(/"/g,'\\"'));ar.push(ao)}}}for(var al=0,ap=ai.length;al<ap;al++){var an=ai[al];if(ar[al]==at){an='""+'+an+'+""';au.push(am+an+");")}else{if(ar[al]==ak){au.push(an)}else{an='"'+an+'"';au.push(am+an+");")}}}au.push("return __tempArr__.join('');");return au.join("")};tipJS.commonModel=function(ai){var i="CommonModel";if(!ai||typeof ai!="object"){throw new Error(t(i))}var aj=(ai.__name)?ai.__name:ai.name;if(typeof aj!="string"){throw new Error(t(i))}if(ai.__extend&&m(ai.__extend,aj)){throw new Error("Can't extend itself:"+aj)}ab[aj]=ai};tipJS.commonView=function(ai){var i="CommonView";if(!ai||typeof ai!="object"){throw new Error(t(i))}var aj=(ai.__name)?ai.__name:ai.name;if(typeof aj!="string"){throw new Error(t(i))}if(ai.__extend&&m(ai.__extend,aj)){throw new Error("Can't extend itself:"+aj)}a[aj]=ai};tipJS.log=function(aj,ak){window.console=window.console||{log:function(){},error:function(){}};var ao=new Date(),i=ao.getFullYear(),aq=ao.getMonth()+1,al=ao.getDate(),ap=ao.getHours(),ai=ao.getMinutes(),am=ao.getSeconds(),an=ao.getMilliseconds();console.log(((ak)?ak:"")+i+"/"+aq+"/"+al+" "+ap+":"+ai+":"+am+"."+an+" "+aj)};tipJS.debug=function(i){if(tipJS.isDevelopment){tipJS.log(i,"[DEBUG]")}};tipJS.localSet=function(i){var ai=T[T.MAIN];if(ai.loadOrder.presentOrder()===n.loadOrder.order[1]){R=i}};tipJS.msg=function(i){return R[i]?R[i]:i};tipJS.controller=function(i){J("controllers",i)};tipJS.model=function(i){J("models",i)};tipJS.view=function(i){J("views",i)};tipJS.action=function(aj,ai){var aq=aj.split("."),ao=aq[0],ap=aq[1];if(ao.length==0||ap.length==0){throw new Error("tipJS.action : invalid parameter")}var am=T[ao];if(!am||!am.loadOrder||!am.loadOrder.isLastOrder()){C[ao]=C[ao]||[];C[ao].push({name:aj,param:ai});return}if(!am.controller||!am.controller[ap]){throw new Error("Could not find controller: "+aj)}if(tipJS.isDevelopment===true){var i=x()}var ak=L(am.controller[ap],N["controllers"+ao+"."+ap]);if(!ak){throw new Error("Could not find controller")}var al={controllerName:(ak.__name)?ak.__name:ak.name,beforeCtrler:am.define.beforeController,afterCtrler:am.define.afterController,loadCommonModel:ak.loadCommonModel,loadCommonView:ak.loadCommonView,loadModel:ak.loadModel,loadView:ak.loadView,renderTemplate:ak.renderTemplate,getById:ak.getById,getByName:ak.getByName,getByTag:ak.getByTag};if(al.beforeCtrler&&al.beforeCtrler(ai)===false){return}var an=function(){var at=function(){var aw=function(){if(ak.afterInvoke){ak.afterInvoke(ai)}};var au=function(){if(ak.invoke&&ak.invoke(ai)===false){return}aw()};var av=function(){if(ak.beforeInvoke&&ak.beforeInvoke(ai)===false){return}au()};av()};if(ak.exceptionInvoke){try{at()}catch(ar){ak.exceptionInvoke(ar,ai)}}else{at()}if(al.afterCtrler){al.afterCtrler(ai)}if(tipJS.isDevelopment===true){tipJS.debug(aj+" completed in "+((x()-i)/1000)+" seconds")}};if(ak.async===true){setTimeout(an,(!ak.delay?15:ak.delay))}else{an()}};tipJS.loadApp=function(am,an){for(var ai=0,ak=am.length;ai<ak;ai++){var al=am[ai];if(!T.MAIN){T.MAIN=al}if(an){T[al]={};T[al].onLoadParam=an}var aj=p.applicationPath[al]+"/"+p.defineFileName+".js";setTimeout(function(){if(!T[al]||!T[al].define){throw new Error("Could not find application:"+al)}},1000);k(aj,{nocache:true,version:Math.random(),paramName:p.noCacheParam})}delete tipJS.loadApp};tipJS.define=function(aj){Y(aj,n.define);if(aj.templateCache===undefined){aj.templateCache=p.templateCache}if(aj.noCache===undefined){aj.noCache=p.noCache;aj.noCacheVersion=p.noCacheVersion;aj.noCacheParam=p.noCacheParam;aj.noCacheAuto=p.noCacheAuto}else{if(aj.noCache===true){if(aj.noCacheVersion===undefined){aj.noCacheVersion=p.noCacheVersion}if(aj.noCacheParam===undefined){aj.noCacheParam=p.noCacheParam}if(aj.noCacheAuto===undefined){aj.noCacheAuto=p.noCacheAuto}}}var i=aj.name;T[i]=T[i]||{};T[i].loadOrder={};Y(T[i].loadOrder,n.loadOrder);var ai=T[i].loadOrder.presentOrder();B(i,ai);T[i].define=aj;af(i,ai)};var U={},P={},ab={},A={},a={},n={config:{noCache:false,noCacheVersion:1,noCacheParam:"noCacheVersion",noCacheAuto:false,templateCache:true,charSet:"utf-8",defineFileName:"define",path:{lang:"lang",controllers:"controllers",models:"models",views:"views"},developmentHostList:[],applicationPath:{}},define:{extLib:[],lang:[],controllers:[],models:[],views:[],localSet:false,onLoad:function(){},beforeController:function(){},afterController:function(){},loadCommonModel:l,loadModel:I,loadCommonView:b,loadView:H},loadOrder:{index:0,init:function(){this.index=0},presentOrder:function(){return this.order[this.index]},nextOrder:function(){return this.order[++this.index]},isLastOrder:function(){return(this.index+1)==this.order.length},order:["extLib","lang","controllers","models","views"]}},w={},T={},R={},q={},C={},p=L(n.config),N={},ag=window.location,g=ag.pathname,X=ag.search,M=F("script"),K,c,h,D=null,e=(navigator.language||navigator.systemLanguage||navigator.userLanguage).substr(0,2);for(var aa=M.length;aa--;){c=M[aa].src;h=c.match(/tipJS-MVC-1\.33\.js$/);if(h){K=c.substring(0,c.length-h[0].length);break}}if(X.match("(\\?|&)debug")!==null||g.match("debug")!==null){D=true}tipJS.isDevelopment=D;tipJS.lang=e;document.write('<script type="text/javascript" charset="UTF-8" src="'+K+"tipJS.config.js?"+p.noCacheParam+"="+Math.random()+'"><\/script>')})();