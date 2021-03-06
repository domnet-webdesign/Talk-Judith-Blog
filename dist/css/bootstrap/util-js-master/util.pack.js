
/*!
Script: Namespace.js
 Namespace utility

Copyright:
 Copyright (c) 2009 Maxime Bouroumeau-Fuseau

License:
 MIT-style license.
 
Version:
 1.1
*/var Namespace=(function(){var _listeners={};var _includedIdentifiers=[];var _toArray=function(obj){if(typeof(obj)=='object'&&obj.sort){return obj;}
return new Array(obj);};var _createXmlHttpRequest=function(){var xhr;try{xhr=new XMLHttpRequest()}catch(e){try{xhr=new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(e){try{xhr=new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(e){try{xhr=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{xhr=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){throw new Error("This browser does not support XMLHttpRequest.")}}}}}
return xhr;};var _isHttpRequestSuccessful=function(status){return(status>=200&&status<300)||status==304||status==1223||(!status&&(location.protocol=="file:"||location.protocol=="chrome:"));};var _createScript=function(data){var script=document.createElement('script');script.type='text/javascript';script.text=data;document.body.appendChild(script);};var _dispatchEvent=function(eventName,properties){if(!_listeners[eventName])return;properties.event=eventName;for(var i=0;i<_listeners[eventName].length;i++){_listeners[eventName][i](properties);}};var _namespace=function(identifier){var klasses=arguments[1]||false;var ns=window;if(identifier!=''){var parts=identifier.split(Namespace.separator);for(var i=0;i<parts.length;i++){if(!ns[parts[i]]){ns[parts[i]]={};}
ns=ns[parts[i]];}}
if(klasses){for(var klass in klasses){ns[klass]=klasses[klass];}}
_dispatchEvent('create',{'identifier':identifier});return ns;};_namespace.exist=function(identifier){if(identifier=='')return true;var parts=identifier.split(Namespace.separator);var ns=window;for(var i=0;i<parts.length;i++){if(!ns[parts[i]]){return false;}
ns=ns[parts[i]];}
return true;};_namespace.mapIdentifierToUri=function(identifier){var regexp=new RegExp('\\'+Namespace.separator,'g');return Namespace.baseUri+identifier.replace(regexp,'/')+'.js';};_loadScript=function(identifier){var successCallback=arguments[1]||false;var errorCallback=arguments[2]||false;var async=successCallback!=false;var uri=_namespace.mapIdentifierToUri(identifier);var event={'identifier':identifier,'uri':uri,'async':async,'callback':successCallback};var xhr=_createXmlHttpRequest();xhr.open("GET",uri,async);if(async){xhr.onreadystatechange=function(){if(xhr.readyState==4){if(_isHttpRequestSuccessful(xhr.status||0)){_createScript(xhr.responseText);_dispatchEvent('include',event);successCallback();return;}
event.status=xhr.status;_dispatchEvent('includeError',event);errorCallback&&errorCallback();}};}
xhr.send(null);if(!async){if(_isHttpRequestSuccessful(xhr.status||0)){_createScript(xhr.responseText);_dispatchEvent('include',event);return true;}
event.status=xhr.status;_dispatchEvent('includeError',event);return false;}};_namespace.include=function(identifier){var successCallback=arguments[1]||false;var errorCallback=arguments[2]||false;if(_includedIdentifiers[identifier]){successCallback&&successCallback();return true;}
if(successCallback){_loadScript(identifier,function(){_includedIdentifiers[identifier]=true;successCallback();},errorCallback);}else{if(_loadScript(identifier)){_includedIdentifiers[identifier]=true;return true;}
return false;}};_namespace.use=function(identifier){var identifiers=_toArray(identifier);var callback=arguments[1]||false;var autoInclude=arguments.length>2?arguments[2]:Namespace.autoInclude;var event={'identifier':identifier};for(var i=0;i<identifiers.length;i++){identifier=identifiers[i];var parts=identifier.split(Namespace.separator);var target=parts.pop();var ns=_namespace(parts.join(Namespace.separator));if(target=='*'){for(var objectName in ns){window[objectName]=ns[objectName];}}else{if(ns[target]){window[target]=ns[target];}else{if(autoInclude){if(callback){_namespace.include(identifier,function(){window[target]=ns[target];if(i+1<identifiers.length){_namespace.unpack(identifiers.slice(i+1),callback,autoInclude);}else{_dispatchEvent('use',event);callback&&callback();}});return;}else{_namespace.include(identifier);window[target]=ns[target];}}}}}
_dispatchEvent('use',event);callback&&callback();};_namespace.from=function(identifier){return{include:function(){var callback=arguments[0]||false;_namespace.include(identifier,callback);},use:function(_identifier){var callback=arguments[1]||false;if(_identifier.charAt(0)=='.'){_identifier=identifier+_identifier;}
if(callback){_namespace.include(identifier,function(){_namespace.use(_identifier,callback,false);});}else{_namespace.include(identifier);_namespace.use(_identifier,callback,false);}}};};_namespace.provide=function(identifier){var identifiers=_toArray(identifier);for(var i=0;i<identifiers.length;i++){if(!(identifier in _includedIdentifiers)){_dispatchEvent('provide',{'identifier':identifier});_includedIdentifiers[identifier]=true;}}};_namespace.addEventListener=function(eventName,callback){if(!_listeners[eventName])_listeners[eventName]=[];_listeners[eventName].push(callback);};_namespace.removeEventListener=function(eventName,callback){if(!_listeners[eventName])return;for(var i=0;i<_listeners[eventName].length;i++){if(_listeners[eventName][i]==callback){delete _listeners[eventName][i];return;}}};return _namespace;})();Namespace.separator='.';Namespace.baseUri='./';Namespace.autoInclude=false;