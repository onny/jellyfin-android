cordova.define("com.connectsdk.cordovaplugin.ConnectSDK.js",function(e,t){"use strict";function i(e,t){return[new w(e,t)]}function n(e,t,i,n){return[new w(e,t),i&&new S(e,i),n&&new A(e,n)]}function s(e,t){return[new j(e,t)]}function r(e,t,i){var n=function(){for(var n={},s=i.args||[],r=0;r<s.length;r++){var o=s[r],c=!1;"?"===o[o.length-1]&&(o=o.substr(0,o.length-1),c=!0),!c&&r>arguments.length,n[o]=arguments[r]}return this._device._sendCommand(e,t,n,i.subscribe,i.responseWrapper)};return n}function o(e,i){var n={constructor:function(e){this._device=e}};for(var s in i){var o=i[s];"function"==typeof o?n[s]=o:"object"==typeof o&&(n[s]=r(e,s,o))}var c=u(n);t.interfaces||(t.interfaces={}),t.interfaces[e]=c,g._registerInterface(e,c)}var c="ConnectSDK",a={addListener:function(e,t,i){if(!e)throw new Error("missing parameter: event");if(!t)throw new Error("missing parameter: callback");return this._listeners=this._listeners||{},this._listeners||(this._listeners={}),this._listeners[e]||(this._listeners[e]=[]),this._listeners[e].push({callback:t,context:i}),this.emit("_addListener",e),this},removeListener:function(e,t,i){return this._listeners&&this._listeners[e]&&(this._listeners[e]=this._listeners[e].filter(function(e){return t&&t!==e.callback&&i&&i!==e.context})),this.emit("_removeListener",e),this},hasListeners:function(e){if(e)return this._listeners&&this._listeners[e]&&this._listeners[e].length>0;for(e in this._listeners)if("_"!==e[0]&&this._listeners.hasOwnProperty(e)&&this._listeners[e].length>0)return!0;return!1},emit:function(e){var t=this._listeners&&this._listeners[e],i=Array.prototype.slice.call(arguments,1);t&&t.forEach(function(e){e.callback.apply(e.context||null,i)}),this["on"+e]&&this["on"+e].apply(null,i)},on:function(e,t,i){return this.addListener(e,t,i)},off:function(e,t,i){return this.removeListener(e,t,i)}},d={success:function(e,t){return this.on("success",e,t)},error:function(e,t){return this.on("error",e,t)},complete:function(e,t){return this.on("complete",e,t)}},u=function(e){var t;if(!e.constructor)throw t=function(){},new Error("no constructor");t=e.constructor,delete e.constructor;var i=t.prototype;if(e.inherits){var n=e.inherits.prototype;for(var s in n)n.hasOwnProperty(s)&&(i[s]=n[s])}if(e.mixins&&(e.mixins.forEach(function(e){for(var t in e)e.hasOwnProperty(t)&&(i[t]=e[t])}),delete e.mixins),e.statics){for(var r in e.statics)e.statics.hasOwnProperty(r)&&(t[r]=e.statics[r]);delete e.statics}for(var o in e)e.hasOwnProperty(o)&&(i[o]=e[o]);return t},h=u({constructor:function(e){if(!e)throw new Error("missing argument to CapabilityFilter constructor");"string"==typeof e&&(e=[e]),this._capabilities=e},getCapabilities:function(){return this._capabilities.slice(0)}}),l=u({mixins:[a,d],constructor:function(){},close:function(){cordova.exec(null,null,c,"closeDevicePicker",[])}}),p={ON:"on",OFF:"off"},_={NONE:"NONE",FIRST_SCREEN:"FIRST_SCREEN",PIN:"PIN",MIXED:"MIXED",AIRPLAY_MIRRORING:"AIRPLAY_MIRRORING"},v={WEBAPP:"webapp",MEDIA:"media"},f={Chromecast:"Chromecast",DIAL:"DIAL",DLNA:"DLNA",NetcastTV:"NetcastTV",Roku:"Roku",WebOSTV:"webOS TV",FireTV:"FireTV",AirPlay:"AirPlay"},m={NUM_0:0,NUM_1:1,NUM_2:2,NUM_3:3,NUM_4:4,NUM_5:5,NUM_6:6,NUM_7:7,NUM_8:8,NUM_9:9,DASH:10,ENTER:11},b=u({mixins:[a],constructor:function(){this._config={},this._devices={}},_getDeviceByDesc:function(e){var t=this._devices[e.deviceId];return t||(t=new g(e),this._devices[e.deviceId]=t),t},_handleDiscoveryUpdate:function(e){var t=e[0],i=e[1];if(t)if("startdiscovery"===t?this._started=!0:"stopdiscovery"===t&&(this._started=!1),"devicefound"===t||"devicelost"===t||"deviceupdated"===t){var n=i.device.deviceId,s=this._getDeviceByDesc(i.device);"devicelost"===t?delete this._devices[n]:(this._devices[n]=s,"deviceupdated"===t&&s._handleDiscoveryUpdate(i.device)),this.emit(t,s),this.emit("devicelistchanged",this.getDeviceList())}else this.emit.apply(this,e)},_handleDiscoveryError:function(e){this.emit("error",e)},_setPairingLevel:function(e,t){if(!e||"[object String]"!==Object.prototype.toString.call(e))throw new TypeError("expected pairingLevel to be a string");this._config.pairingLevel=e,t&&cordova.exec(null,null,c,"setDiscoveryConfig",[{pairingLevel:this._config.pairingLevel}])},_setAirPlayServiceMode:function(e,t){this._config.airPlayServiceMode=e,t&&cordova.exec(null,null,c,"setDiscoveryConfig",[{airPlayServiceMode:this._config.airPlayServiceMode}])},_setCapabilityFilters:function(e,t){if(e=e||[],"[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("capabilityFilters should be an array");e=e.map(function(e){if(e instanceof h)return e.getCapabilities();if("[object Array]"===Object.prototype.toString.call(e))return e;throw new TypeError("filter objects must be CapabilityFilter instances or arrays of strings")}),this._config.capabilityFilters=e,t&&this._started&&cordova.exec(null,null,c,"setDiscoveryConfig",[{capabilityFilters:this._config.capabilityFilters}])},startDiscovery:function(e){e&&(e.pairingLevel&&this._setPairingLevel(e.pairingLevel,!1),e.airPlayServiceMode&&this._setAirPlayServiceMode(e.airPlayServiceMode,!1),e.capabilityFilters&&this._setCapabilityFilters(e.capabilityFilters,!1)),cordova.exec(this._handleDiscoveryUpdate.bind(this),this._handleDiscoveryError.bind(this),c,"startDiscovery",[this._config])},stopDiscovery:function(){cordova.exec(null,this._handleDiscoveryError.bind(this),c,"stopDiscovery",[this.config])},setPairingLevel:function(e){this._setPairingLevel(e,!0)},setAirPlayServiceMode:function(e){this._setAirPlayServiceMode(e,!0)},setCapabilityFilters:function(e){this._setCapabilityFilters(e,!0)},pickDevice:function(e,t,i){var n=this,s=new l;t&&s.on("success",t),i&&s.on("error",i);var r=function(e){var t=n._getDeviceByDesc(e);t._handleDiscoveryUpdate(e),s.emit("success",t),s.emit("complete",void 0,t)},o=function(e){s.emit("error",e),s.emit("complete",e)};return cordova.exec(r,o,c,"pickDevice",[e]),s},getDeviceList:function(){var e=[];for(var t in this._devices)e.push(this._devices[t]);return e}}),g=u({mixins:[a],statics:{_interfaceClasses:{},_serviceWrappers:{},_registerInterface:function(e,t){var i="get"+e[0].toUpperCase()+e.substr(1);this._interfaceClasses[e]=t,this.prototype[i]=function(){return this._interfaces[e]}},_registerServiceWrapper:function(e,t){if(!e)throw new TypeError("invalid name: "+e);this._serviceWrappers[e]=t}},constructor:function(e){this._deviceId=e.deviceId,this._nextCommandId=1,this._interfaces={},this._desc=e,this._ready=e.ready||!1;for(var t in g._interfaceClasses){var i=g._interfaceClasses[t];this._interfaces[t]=new i(this)}this._capabilities={},this._subscribedToEvents=!1,this.on("_addListener",this._handleAddListener,this),this._cacheServices(),this._cacheCapabilities()},_handleAddListener:function(){this.hasListeners()&&!this._subscribedToEvents&&(this._subscribedToEvents=!0,cordova.exec(this._handleUpdate.bind(this),this._handleError.bind(this),c,"setDeviceListener",[this._deviceId]))},_cacheServices:function(){var e=this._desc.services;if(delete this._desc.services,e){this._services={};for(var t=0;t<e.length;t+=1){var i=e[t];i.name&&(this._services[i.name]=i)}}},_cacheCapabilities:function(){var e=this._desc.capabilities;if(delete this._desc.capabilities,e){for(var t={},i=0;i<e.length;i+=1)t[e[i]]=!0;this._capabilities=t}},_handleDiscoveryUpdate:function(e){this._desc=e,this._cacheServices(),this._cacheCapabilities(),void 0!==e.ready&&(this._ready=e.ready)},_handleUpdate:function(e){var t=e[0],i=e[1];if("capabilitieschanged"===t){var n,s,r=i.added||[],o=i.removed||[];for(n=0;n<r.length;n+=1)s=r[n],this._capabilities[s]=!0;for(n=0;n<o.length;n+=1)s=o[n],delete this._capabilities[s];e=[t]}else"disconnect"===t?(this._capabilities={},this._ready=!1):"ready"===t&&(this._ready=!0);this.emit.apply(this,e)},_handleError:function(e){this.emit("error",e)},connect:function(){this._subscribedToEvents=!0,cordova.exec(this._handleUpdate.bind(this),this._handleError.bind(this),c,"connectDevice",[this._deviceId])},disconnect:function(){cordova.exec(null,this._handleError.bind(this),c,"disconnectDevice",[this._deviceId])},setPairingType:function(e){cordova.exec(this._handleUpdate.bind(this),this._handleError.bind(this),c,"setPairingType",[this._deviceId,e])},isReady:function(){return this._ready},getFriendlyName:function(){return this._desc.friendlyName},getIPAddress:function(){return this._desc.ipAddress||this._desc.lastKnownIPAddress},getModelName:function(){return this._desc.modelName},getModelNumber:function(){return this._desc.modelNumber},getCapabilities:function(){return Object.keys(this._capabilities)},hasCapability:function(e){return!!this._capabilities[e.toString()]},supports:function(e){var t=[];1===arguments.length?t="[object Array]"===Object.prototype.toString.call(e)?e:[e]:arguments.length>0&&(t=arguments);for(var i=0;i<t.length;i+=1)if(!this.hasCapability(t[i]))return!1;return!0},supportsAny:function(e){var t=[];1===arguments.length?t="[object Array]"===Object.prototype.toString.call(e)?e:[e]:arguments.length>0&&(t=arguments);for(var i=0;i<t.length;i+=1)if(this.hasCapability(t[i]))return!0;return!1},hasService:function(e){if(!e)throw new Error("hasService: service name argument is null or undefined");return e in this._services},getService:function(e){return this.hasService(e)&&e in g._serviceWrappers?g._serviceWrappers[e](this):null},getId:function(){return this._deviceId},_createCommandId:function(){return this._deviceId+"_"+this._nextCommandId++},_sendCommand:function(e,t,i,n,s){var r=this._createCommand(n,s);return r._send(e,t,i),r},_createCommand:function(e,t){var i={responseWrapper:t},n=this._createCommandId(),s=e?new C(this,n,i):new y(this,n,i);return s}}),y=u({mixins:[a,d],_subscribe:!1,constructor:function(e,t,i){this._device=e,this._commandId=t,this._responseWrapper=i&&i.responseWrapper},_send:function(e,t,i){var n=this,s=function(e){var t=e[0];if("success"===t){var i=e.slice(1);n._responseWrapper&&(i=n._responseWrapper.apply(null,[n._device].concat(i))),n.emit.apply(n,["success"].concat(i)),n.emit.apply(n,["complete",void 0].concat(i))}else n.emit.apply(n,e)},r=function(e){n.emit("error",e),n.emit("complete",e)};cordova.exec(s,r,c,"sendCommand",[n._device._deviceId,n._commandId,e,t,i,n._subscribe])}}),C=u({inherits:y,_subscribe:!0,constructor:function(){y.apply(this,arguments)},unsubscribe:function(){cordova.exec(null,null,c,"cancelCommand",[this._device._deviceId,this._commandId])}}),I={_scheduleCleanup:function(){var e=this;setTimeout(function(){e._acquireRequested||e.release()},0)},_checkAcquired:function(){if(!this._objectId)throw new Error(this._acquired?this._typeName+" instance was released and is no longer valid to use":this._typeName+" instance not valid; you must call .acquire() immediately upon obtaining the object (such as in a success callback) and call .release() when done using it")},acquire:function(){return void 0===this._objectId?this:(this._checkAcquired(),this._acquired||this._acquireRequested||(this._acquireRequested=!0,cordova.exec(this._handleEvent.bind(this),null,c,"acquireWrappedObject",[this._objectId])),this)},release:function(){return this._objectId&&(cordova.exec(null,null,c,"releaseWrappedObject",[this._objectId]),this._objectId=null),this},_handleEvent:function(e){this.emit.apply(this,e)}},w=u({mixins:[a,I],_typeName:"LaunchSession",constructor:function(e,t){this._device=e,this._data=t,this._objectId=t.objectId},getAppId:function(){return this._data.appId},close:function(){return this._device._sendCommand("CORDOVAPLUGIN","closeLaunchSession",{launchSession:this._data},!1)},toJSON:function(){return this._data}}),S=u({mixins:[a,I],constructor:function(e,t){this._device=e,this._data=t,this._objectId=t.objectId},_sendCommand:function(e,t){return t=t||{},t.objectId=this._objectId,this._device._sendCommand("mediaControl",e,t)},play:function(){return this._sendCommand("play")},pause:function(){return this._sendCommand("pause")},stop:function(){return this._sendCommand("stop")},rewind:function(){return this._sendCommand("rewind")},fastForward:function(){return this._sendCommand("fastForward")},seek:function(e){return this._sendCommand("seek",{position:e})},getDuration:function(){return this._sendCommand("getDuration")},getPosition:function(){return this._sendCommand("getPosition")},subscribePlayState:function(){return this._sendCommand("subscribePlayState")}}),A=u({mixins:[a,I],constructor:function(e,t){this._device=e,this._data=t,this._objectId=t.objectId},_sendCommand:function(e,t){return t=t||{},t.objectId=this._objectId,this._device._sendCommand("playlistControl",e,t)},next:function(){return this._sendCommand("next")},previous:function(){return this._sendCommand("previous")},jumpToTrack:function(e){return this._sendCommand("jumpToTrack",{index:e})}}),j=u({mixins:[a,I],_typeName:"WebAppSession",constructor:function(e,t){this._device=e,this._data=t,this._objectId=t.objectId,this._scheduleCleanup()},connect:function(){return this.acquire(),this._device._sendCommand("webAppSession","connect",{objectId:this._objectId})},disconnect:function(){return this.acquire(),this._device._sendCommand("webAppSession","disconnect",{objectId:this._objectId})},setWebAppSessionListener:function(){return this.acquire(),this._device._sendCommand("webAppSession","setWebAppSessionListener",{objectId:this._objectId})},sendText:function(e){return this.acquire(),this._device._sendCommand("webAppSession","sendText",{objectId:this._objectId,text:e})},sendJSON:function(e){return this.acquire(),this._device._sendCommand("webAppSession","sendJSON",{objectId:this._objectId,jsonObject:e})},close:function(){return this._device._sendCommand("CORDOVAPLUGIN","closeLaunchSession",{launchSession:this._data.launchSession},!1)},toJSON:function(){return this._data}});o("launcher",{launchApp:{args:["appId","params?"],responseWrapper:i},closeApp:{args:["appId"],responseWrapper:i},launchAppStore:{args:["appId"],responseWrapper:i},launchBrowser:{args:["url?"],responseWrapper:i},launchHulu:{args:["contentId?"],responseWrapper:i},launchNetflix:{args:["contentId?"],responseWrapper:i},launchYouTube:{args:["contentId?"],responseWrapper:i},getAppList:{}}),o("mediaPlayer",{displayImage:{args:["url","mimeType","options?"],responseWrapper:n,subscribe:!0},playMedia:{args:["url","mimeType","options?"],responseWrapper:n,subscribe:!0},closeMedia:{args:["appInfo"]}}),o("externalInputControl",{getExternalInputList:{},setExternalInput:{args:["externalInputInfo"]},showExternalInputPicker:{responseWrapper:i}}),o("mediaControl",{play:{},pause:{},stop:{},rewind:{},fastForward:{},seek:{args:["position"]},getDuration:{},getPosition:{},subscribePlayState:{}}),o("playlistControl",{next:{},previous:{},jumpToTrack:{args:["index"]}}),o("keyControl",{up:{},down:{},left:{},right:{},ok:{},back:{},home:{},sendKeyCode:{args:["keyCode"]}}),o("mouseControl",{connectMouse:{},disconnectMouse:{},move:{args:["dx","dy"]},scroll:{args:["dx","dy"]},click:{}}),o("textInputControl",{sendText:{args:["input"]},sendEnter:{},sendDelete:{},subscribeTextInputStatus:{}}),o("powerControl",{powerOff:{}}),o("toastControl",{showToast:{args:["message","options?"]},showClickableToast:{args:["message","options?"]}}),o("TVControl",{channelUp:{},channelDown:{},setChannel:{args:["channelInfo"]},getChannelList:{},getCurrentChannel:{},subscribeCurrentChannel:{subscribe:!0}}),o("volumeControl",{getVolume:{},setVolume:{args:["volume"]},volumeUp:{},volumeDown:{},getMute:{},setMute:{args:["mute"]},subscribeMute:{subscribe:!0},subscribeVolume:{subscribe:!0}}),o("webAppLauncher",{launchWebApp:{args:["webAppId","params?"],responseWrapper:s},joinWebApp:{args:["webAppId","params?"],responseWrapper:s},closeWebApp:{args:["webAppId"]},pinWebApp:{args:["webAppId"]},unPinWebApp:{args:["webAppId"]},isWebAppPinned:{args:["webAppId"]},subscribeIsWebAppPinned:{args:["webAppId"],subscribe:!0}});var x=u({_interfaceName:"",constructor:function(){},_sendServiceCommand:function(e,t,i){return this._device._sendCommand(this._interfaceName,e,t,i)}}),D=u({inherits:x,_interfaceName:"webOSTVService",constructor:function(e){x.call(this,e),this._device=e},connectToApp:function(e){return this._sendServiceCommand("joinApp",{appId:e},!1,s)},joinApp:function(e){return this._sendServiceCommand("joinApp",{appId:e},!1,s)}});g._registerServiceWrapper(f.WebOSTV,function(e){return new D(e)}),t.Command=y,t.Subscription=C,t.LaunchSession=w,t.DevicePicker=l,t.ConnectableDevice=g,t.CapabilityFilter=h,t.PairingLevel=p,t.PairingType=_,t.AirPlayServiceMode=v,t.Services=f,t.KeyCodes=m,"undefined"!=typeof __CSDKCapabilities&&(t.Capabilites=__CSDKCapabilities),t.discoveryManager=new b});