!function(){$(document).on("pagebeforeshow","#logPage",function(){var e=this;Dashboard.showLoadingMsg(),require(["paper-fab","paper-item-body","paper-icon-item"],function(){var a=ApiClient;a.getJSON(a.getUrl("System/Logs")).then(function(i){var r="";r+='<div class="paperList">',r+=i.map(function(e){var i=a.getUrl("System/Logs/Log",{name:e.Name});i+="&api_key="+a.accessToken();var r="";r+="<paper-icon-item>",r+='<a item-icon class="clearLink" href="'+i+'" target="_blank">',r+='<paper-fab mini icon="schedule" class="blue" item-icon></paper-fab>',r+="</a>",r+="<paper-item-body two-line>",r+='<a class="clearLink" href="'+i+'" target="_blank">',r+="<div>"+e.Name+"</div>";var o=parseISO8601Date(e.DateModified,{toLocal:!0}),t=o.toLocaleDateString();return t+=" "+LibraryBrowser.getDisplayTime(o),r+="<div secondary>"+t+"</div>",r+="</a>",r+="</paper-item-body>",r+="</paper-icon-item>"}).join(""),r+="</div>",$(".serverLogs",e).html(r),Dashboard.hideLoadingMsg()})})})}();