define(["events","apiclient"],function(e,n){var r={Unavailable:0,ServerSelection:1,ServerSignIn:2,SignedIn:3,ConnectSignIn:4},t={Local:0,Remote:1,Manual:2},o={getServerAddress:function(e,n){switch(n){case t.Local:return e.LocalAddress;case t.Manual:return e.ManualAddress;case t.Remote:return e.RemoteAddress;default:return e.ManualAddress||e.LocalAddress||e.RemoteAddress}}},c=function(c,s,i,a,u,d,l){function f(e,n){for(var r=0,t=n.length;t>r;r++)c.addOrUpdateServer(e,n[r]);return e}function v(e){e({State:r.Unavailable,ConnectUser:Y.connectUser()})}function p(e,n){e.Name=n.ServerName,e.Id=n.Id,n.LocalAddress&&(e.LocalAddress=n.LocalAddress),n.WanAddress&&(e.RemoteAddress=n.WanAddress),n.MacAddress&&(e.WakeOnLanInfos=[{MacAddress:n.MacAddress}])}function I(e,n){return e+"/emby/"+n}function h(e){var n=e.headers||{};"json"==e.dataType&&(n.accept="application/json");var r={headers:n,method:e.type,credentials:"same-origin"},t=e.contentType;return e.data&&("string"==typeof e.data?r.body=e.data:(r.body=T(e.data),t=t||"application/x-www-form-urlencoded; charset=UTF-8")),t&&(n["Content-Type"]=t),e.timeout?g(e.url,r,e.timeout):fetch(e.url,r)}function g(e,n,r){return new Promise(function(t,o){var c=setTimeout(o,r);n=n||{},n.credentials="same-origin",fetch(e,n).then(function(e){clearTimeout(c),t(e)},function(){clearTimeout(c),o()})})}function T(e){var n=[];for(var r in e){var t=e[r];null!==t&&void 0!==t&&""!==t&&n.push(encodeURIComponent(r)+"="+encodeURIComponent(t))}return n.join("&")}function S(e){if(!e)throw new Error("Request cannot be null");return e.headers=e.headers||{},h(e).then(function(n){return n.status<400?"json"==e.dataType||"application/json"==e.headers.accept?n.json():n:Promise.reject(n)},function(e){throw e})}function m(e,n){return e=I(e,"system/info/public"),S({type:"GET",url:e,dataType:"json",timeout:n||$})}function A(n){Q=n,e.trigger(Y,"connectusersignedin",[n])}function C(r,t){var c=Y.getApiClient(r.Id);if(!c){var d=o.getServerAddress(r,t);c=new n(d,s,i,a,u,l),Z.push(c),c.serverInfo(r),c.onAuthenticated=function(e,n){U(e,n,{},!0)},e.trigger(Y,"apiclientcreated",[c])}return c}function U(e,n,r,o){var s=c.credentials(),i=s.Servers.filter(function(e){return e.Id==n.ServerId}),a=i.length?i[0]:e.serverInfo();r.updateDateLastAccessed!==!1&&(a.DateLastAccessed=(new Date).getTime(),a.LastConnectionMode==t.Local&&(a.DateLastLocalConnection=(new Date).getTime())),a.Id=n.ServerId,o?(a.UserId=n.User.Id,a.AccessToken=n.AccessToken):(a.UserId=null,a.AccessToken=null),c.addOrUpdateServer(s.Servers,a),w(a,n.User),c.credentials(s),e.serverInfo(a),L(e,r),k(a,a.LastConnectionMode,n.User)}function w(e,n){var r={Id:n.Id,IsSignedInOffline:!0};c.addOrUpdateUser(e,r)}function L(e,n){n=n||{},n.reportCapabilities!==!1&&e.reportCapabilities(d),n.enableWebSocket!==!1&&!e.isWebSocketOpenOrConnecting()&&e.isWebSocketSupported()&&e.openWebSocket()}function k(n,r,t){C(n,r),e.trigger(Y,"localusersignedin",[t])}function y(e){return new Promise(function(n){Q&&Q.Id==e.ConnectUserId?n():e.ConnectUserId&&e.ConnectAccessToken?(Q=null,P(e.ConnectUserId,e.ConnectAccessToken).then(function(e){A(e),n()},function(){n()})):n()})}function E(e){return"https://connect.emby.media/service/"+e}function P(e,n){if(!e)throw new Error("null userId");if(!n)throw new Error("null accessToken");var r="https://connect.emby.media/service/user?id="+e;return S({type:"GET",url:r,dataType:"json",headers:{"X-Application":s+"/"+i,"X-Connect-UserToken":n}})}function D(e,n,r){if(!e.ExchangeToken)throw new Error("server.ExchangeToken cannot be null");if(!r.ConnectUserId)throw new Error("credentials.ConnectUserId cannot be null");var t=o.getServerAddress(e,n);return t=I(t,"Connect/Exchange?format=json&ConnectUserId="+r.ConnectUserId),S({type:"GET",url:t,dataType:"json",headers:{"X-MediaBrowser-Token":e.ExchangeToken}}).then(function(n){return e.UserId=n.LocalUserId,e.AccessToken=n.AccessToken,n},function(){return e.UserId=null,e.AccessToken=null,Promise.reject()})}function M(e,n){return new Promise(function(r){var t=o.getServerAddress(e,n);S({type:"GET",url:I(t,"System/Info"),dataType:"json",headers:{"X-MediaBrowser-Token":e.AccessToken}}).then(function(o){p(e,o),e.UserId&&S({type:"GET",url:I(t,"users/"+e.UserId),dataType:"json",headers:{"X-MediaBrowser-Token":e.AccessToken}}).then(function(t){k(e,n,t),r()},function(){e.UserId=null,e.AccessToken=null,r()})},function(){e.UserId=null,e.AccessToken=null,r()})})}function b(e){if(Q&&Q.ImageUrl)return{url:Q.ImageUrl};if(e&&e.PrimaryImageTag){var n=Y.getApiClient(e),r=n.getUserImageUrl(e.Id,{tag:e.PrimaryImageTag,type:"Primary"});return{url:r,supportsParams:!0}}return{url:null,supportsParams:!1}}function O(n){var r=n.serverInfo()||{},t={serverId:r.Id};return n.logout().then(function(){e.trigger(Y,"localusersignedout",[t])},function(){e.trigger(Y,"localusersignedout",[t])})}function j(e){if(!e.ConnectAccessToken||!e.ConnectUserId)return Promise.resolve([]);var n="https://connect.emby.media/service/servers?userId="+e.ConnectUserId;return S({type:"GET",url:n,dataType:"json",headers:{"X-Application":s+"/"+i,"X-Connect-UserToken":e.ConnectAccessToken}}).then(function(e){return e.map(function(e){return{ExchangeToken:e.AccessKey,ConnectServerId:e.Id,Id:e.SystemId,Name:e.Name,RemoteAddress:e.Url,LocalAddress:e.LocalAddress,UserLinkType:"guest"==(e.UserType||"").toLowerCase()?"Guest":"LinkedUser"}})},function(){return[]})}function R(e,n){return e.filter(function(e){return e.ExchangeToken?n.filter(function(n){return e.Id==n.Id}).length>0:!0})}function N(){return new Promise(function(e){var n=function(n){var r=n.map(function(e){var n={Id:e.Id,LocalAddress:X(e)||e.Address,Name:e.Name,DateLastLocalConnection:(new Date).getTime()};return n.LastConnectionMode=n.ManualAddress?t.Manual:t.Local,n});e(r)};require(["serverdiscovery"],function(e){e.findServers(1e3).then(n,function(){n([])})})})}function X(e){if(e.Address&&e.EndpointAddress){var n=e.EndpointAddress.split(":")[0],r=e.Address.split(":");if(r.length>1){var t=r[r.length-1];isNaN(parseInt(t))||(n+=":"+t)}return z(n)}return null}function x(e){require(["wakeonlan"],function(n){for(var r=e.WakeOnLanInfos||[],t=0,o=r.length;o>t;t++)n.send(r[t])})}function G(e,n){return(e||"").toLowerCase()==(n||"").toLowerCase()}function W(e,n,r,c,s,i){if(n>=e.length)return void v(i);var a=e[n],u=o.getServerAddress(r,a),d=!1,l=!1,f=$;return a==t.Local?(d=!0,f=8e3):a==t.Manual&&(G(u,r.LocalAddress)||G(u,r.RemoteAddress))&&(l=!0),l||!u?void W(e,n+1,r,c,s,i):void m(u,f).then(function(e){q(r,e,a,s,i)},function(){if(d){{1e4-((new Date).getTime()-c)}W(e,n+1,r,c,s,i)}else W(e,n+1,r,c,s,i)})}function q(e,n,r,t,o){var s=c.credentials();s.ConnectAccessToken?y(s).then(function(){e.ExchangeToken?D(e,r,s).then(function(){F(e,s,n,r,!0,t,o)},function(){F(e,s,n,r,!0,t,o)}):F(e,s,n,r,!0,t,o)}):F(e,s,n,r,!0,t,o)}function F(n,o,s,i,a,u,d){if(a&&n.AccessToken)return void M(n,i).then(function(){F(n,o,s,i,!1,u,d)});p(n,s),n.LastConnectionMode=i,u.updateDateLastAccessed!==!1&&(n.DateLastAccessed=(new Date).getTime(),i==t.Local&&(n.DateLastLocalConnection=(new Date).getTime())),c.addOrUpdateServer(o.Servers,n),c.credentials(o);var l={Servers:[]};l.ApiClient=C(n,i),l.State=n.AccessToken?r.SignedIn:r.ServerSignIn,l.Servers.push(n),l.ApiClient.updateServerInfo(n,i),l.State==r.SignedIn&&L(l.ApiClient,u),d(l),e.trigger(Y,"connected",[l])}function z(e){return e=e.trim(),0!=e.toLowerCase().indexOf("http")&&(e="http://"+e),e=e.replace("Http:","http:"),e=e.replace("Https:","https:")}function B(e,n){return n=e.cleanPassword(n),CryptoJS.MD5(n).toString()}function H(){if(Y.isLoggedIntoConnect()){var e=Y.connectUser();if(e&&e.IsSupporter)return!0}return!1}function J(e){var n=c.credentials(),r=n.Servers.filter(function(n){return n.Id==e}),t=r.length?r[0]:null;t&&(t.DateLastLocalConnection=(new Date).getTime(),c.addOrUpdateServer(n.Servers,t),c.credentials(n))}function K(e){e.headers=e.headers||{},e.headers["X-Application"]=s+"/"+i}function V(e){var n={type:"POST",url:E("pin/authenticate"),data:{deviceId:e.DeviceId,pin:e.Pin},dataType:"json"};return K(n),S(n)}var Q,Y=this,Z=[],$=2e4;return Y.connectUser=function(){return Q},Y.appVersion=function(){return i},Y.capabilities=function(){return d},Y.deviceId=function(){return u},Y.credentialProvider=function(){return c},Y.connectUserId=function(){return c.credentials().ConnectUserId},Y.connectToken=function(){return c.credentials().ConnectAccessToken},Y.getServerInfo=function(e){var n=c.credentials().Servers;return n.filter(function(n){return n.Id==e})[0]},Y.getLastUsedServer=function(){var e=c.credentials().Servers;return e.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),e.length?e[0]:null},Y.getLastUsedApiClient=function(){var e=c.credentials().Servers;if(e.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),!e.length)return null;var n=e[0];return C(n,n.LastConnectionMode)},Y.addApiClient=function(n){Z.push(n);var r=c.credentials().Servers.filter(function(e){return G(e.ManualAddress,n.serverAddress())||G(e.LocalAddress,n.serverAddress())||G(e.RemoteAddress,n.serverAddress())}),o=r.length?r[0]:{};if(o.DateLastAccessed=(new Date).getTime(),o.LastConnectionMode=t.Manual,o.LastConnectionMode==t.Local&&(o.DateLastLocalConnection=(new Date).getTime()),o.ManualAddress=n.serverAddress(),n.serverInfo(o),n.onAuthenticated=function(e,n){U(e,n,{},!0)},!r.length){var s=c.credentials();s.Servers=[o],c.credentials(s)}e.trigger(Y,"apiclientcreated",[n]),o.Id||n.getPublicSystemInfo().then(function(e){var r=c.credentials();o.Id=e.Id,n.serverInfo(o),r.Servers=[o],c.credentials(r)})},Y.clearData=function(){Q=null;var e=c.credentials();e.ConnectAccessToken=null,e.ConnectUserId=null,e.Servers=[],c.credentials(e)},Y.getOrCreateApiClient=function(e){var n=c.credentials(),r=n.Servers.filter(function(n){return G(n.Id,e)});if(!r.length)throw new Error("Server not found: "+e);var t=r[0];return C(t,t.LastConnectionMode)},Y.user=function(e){return new Promise(function(n){function r(){var e=b(o);n({localUser:o,name:Q?Q.Name:o?o.Name:null,imageUrl:e.url,supportsImageParams:e.supportsParams})}function t(){e&&e.getCurrentUserId()?e.getCurrentUser().then(function(e){o=e,r()},r):r()}var o,s=c.credentials();!s.ConnectUserId||!s.ConnectAccessToken||e&&e.getCurrentUserId()?t():y(s).then(t,t)})},Y.isLoggedIntoConnect=function(){return Y.connectToken()&&Y.connectUserId()?!0:!1},Y.logout=function(){for(var n=[],r=0,t=Z.length;t>r;r++){var o=Z[r];o.accessToken()&&n.push(O(o))}return Promise.all(n).then(function(){for(var n=c.credentials(),r=n.Servers.filter(function(e){return"Guest"!=e.UserLinkType}),t=0,o=r.length;o>t;t++){var s=r[t];s.UserId=null,s.AccessToken=null,s.ExchangeToken=null;for(var i=s.Users||[],a=0,u=i.length;u>a;a++)i[a].IsSignedInOffline=!1}n.Servers=r,n.ConnectAccessToken=null,n.ConnectUserId=null,c.credentials(n),Q&&(Q=null,e.trigger(Y,"connectusersignedout"))})},Y.getSavedServers=function(){var e=c.credentials(),n=e.Servers.slice(0);return n.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),n},Y.getAvailableServers=function(){var e=c.credentials();return Promise.all([j(e),N()]).then(function(n){var r=n[0],t=n[1],o=e.Servers.slice(0);return f(o,t),f(o,r),o=R(o,r),o.sort(function(e,n){return(n.DateLastAccessed||0)-(e.DateLastAccessed||0)}),e.Servers=o,c.credentials(e),o})},Y.connect=function(){return new Promise(function(e){Y.getAvailableServers().then(function(n){Y.connectToServers(n).then(function(n){e(n)})})})},Y.getOffineResult=function(){},Y.connectToServers=function(e){return new Promise(function(n){if(1==e.length)Y.connectToServer(e[0]).then(function(e){e.State==r.Unavailable&&(e.State=null==e.ConnectUser?r.ConnectSignIn:r.ServerSelection),n(e)});else{var t=e.length?e[0]:null;t?Y.connectToServer(t).then(function(t){n(t.State==r.SignedIn?t:{Servers:e,State:e.length||Y.connectUser()?r.ServerSelection:r.ConnectSignIn,ConnectUser:Y.connectUser()})}):n({Servers:e,State:e.length||Y.connectUser()?r.ServerSelection:r.ConnectSignIn,ConnectUser:Y.connectUser()})}})},Y.connectToServer=function(e,n){return new Promise(function(r){var o=[];null!=e.LastConnectionMode,-1==o.indexOf(t.Manual)&&o.push(t.Manual),-1==o.indexOf(t.Local)&&o.push(t.Local),-1==o.indexOf(t.Remote)&&o.push(t.Remote),x(e);var c=(new Date).getTime();n=n||{},W(o,0,e,c,n,r)})},Y.connectToAddress=function(e){return new Promise(function(n,r){function o(){v(n)}return e?(e=z(e),void m(e,$).then(function(r){var c={ManualAddress:e,LastConnectionMode:t.Manual};p(c,r),Y.connectToServer(c).then(n,o)},o)):void r()})},Y.loginToConnect=function(e,n){return new Promise(function(r,t){return e&&n?void require(["connectservice","cryptojs-md5"],function(o){var a=B(o,n);S({type:"POST",url:"https://connect.emby.media/service/user/authenticate",data:{nameOrEmail:e,password:a},dataType:"json",contentType:"application/x-www-form-urlencoded; charset=UTF-8",headers:{"X-Application":s+"/"+i}}).then(function(e){var n=c.credentials();n.ConnectAccessToken=e.AccessToken,n.ConnectUserId=e.User.Id,c.credentials(n),A(e.User),r(e)},t)}):void t()})},Y.signupForConnect=function(e,n,r,t){return new Promise(function(o,c){return e&&n&&r?t?r!=t?void c({errorCode:"passwordmatch"}):void require(["connectservice","cryptojs-md5"],function(t){var a=B(t,r);S({type:"POST",url:"https://connect.emby.media/service/register",data:{email:e,userName:n,password:a},dataType:"json",contentType:"application/x-www-form-urlencoded; charset=UTF-8",headers:{"X-Application":s+"/"+i,"X-CONNECT-TOKEN":"CONNECT-REGISTER"}}).then(o,function(e){try{return e.json()}catch(n){c()}}).then(function(e){e&&e.Status&&c({errorCode:e.Status})},c)}):void c({errorCode:"passwordmatch"}):void c({errorCode:"invalidinput"})})},Y.getApiClient=function(e){return e.ServerId&&(e=e.ServerId),Z.filter(function(n){var r=n.serverInfo();return!r||r.Id==e})[0]},Y.getUserInvitations=function(){var e=Y.connectToken();if(!e)throw new Error("null connectToken");if(!Y.connectUserId())throw new Error("null connectUserId");var n="https://connect.emby.media/service/servers?userId="+Y.connectUserId()+"&status=Waiting";return S({type:"GET",url:n,dataType:"json",headers:{"X-Connect-UserToken":e,"X-Application":s+"/"+i}})},Y.deleteServer=function(e){if(!e)throw new Error("null serverId");var n=c.credentials().Servers.filter(function(n){return n.Id==e});return n=n.length?n[0]:null,new Promise(function(r){function t(){var n=c.credentials();n.Servers=n.Servers.filter(function(n){return n.Id!=e}),c.credentials(n),r()}if(!n.ConnectServerId)return void t();var o=Y.connectToken(),a=Y.connectUserId();if(!o||!a)return void t();var u="https://connect.emby.media/service/serverAuthorizations?serverId="+n.ConnectServerId+"&userId="+a;S({type:"DELETE",url:u,headers:{"X-Connect-UserToken":o,"X-Application":s+"/"+i}}).then(t,t)})},Y.rejectServer=function(e){var n=Y.connectToken();if(!e)throw new Error("null serverId");if(!n)throw new Error("null connectToken");if(!Y.connectUserId())throw new Error("null connectUserId");var r="https://connect.emby.media/service/serverAuthorizations?serverId="+e+"&userId="+Y.connectUserId();return fetch(r,{method:"DELETE",headers:{"X-Connect-UserToken":n,"X-Application":s+"/"+i}})},Y.acceptServer=function(e){var n=Y.connectToken();if(!e)throw new Error("null serverId");if(!n)throw new Error("null connectToken");if(!Y.connectUserId())throw new Error("null connectUserId");var r="https://connect.emby.media/service/ServerAuthorizations/accept?serverId="+e+"&userId="+Y.connectUserId();return S({type:"GET",url:r,headers:{"X-Connect-UserToken":n,"X-Application":s+"/"+i}})},Y.getRegistrationInfo=function(e,n){return H()?Promise.resolve({Name:e,IsRegistered:!0,IsTrial:!1}):Y.getAvailableServers().then(function(r){var t=r.filter(function(e){return G(e.Id,n.serverInfo().Id)});if(!t.length)return{};var o=t[0];return o.DateLastLocalConnection?n.getRegistrationInfo(e):ApiClient.getJSON(ApiClient.getUrl("System/Endpoint")).then(function(r){return r.IsInNetwork?(J(o.Id),n.getRegistrationInfo(e)):{}})})},Y.createPin=function(){var e={type:"POST",url:E("pin"),data:{deviceId:u},dataType:"json"};return K(e),S(e)},Y.getPinStatus=function(e){var n={deviceId:e.DeviceId,pin:e.Pin},r={type:"GET",url:E("pin")+"?"+T(n),dataType:"json"};return K(r),S(r)},Y.exchangePin=function(e){return V(e).then(function(e){var n=c.credentials();return n.ConnectAccessToken=e.AccessToken,n.ConnectUserId=e.UserId,c.credentials(n),y(n)})},Y};return{ConnectionState:r,ConnectionMode:t,ServerInfo:o,ConnectionManager:c}});