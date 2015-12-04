!function(a,n){function e(a,n,e){var i=Globalize.translate("UninstallPluginConfirmation").replace("{0}",e);Dashboard.confirm(i,Globalize.translate("UninstallPluginHeader"),function(e){e&&(Dashboard.showLoadingMsg(),ApiClient.uninstallPlugin(n).then(function(){d(a)}))})}function i(){Dashboard.alert({message:Globalize.translate("NoPluginConfigurationMessage")})}function t(){Dashboard.alert({message:Globalize.translate("MessagePluginConfigurationRequiresLocalAccess")})}function o(n,e){var i=a.grep(e,function(a){return a.PluginId==n.Id})[0],t="",o=Dashboard.isConnectMode(),l=i?Dashboard.getConfigurationPageUrl(i.Name):null,s=i&&!o?l:null;return t+="<div data-id='"+n.Id+"' data-name='"+n.Name+"' class='card backdropCard bottomPaddedCard'>",t+='<div class="cardBox visualCardBox">',t+='<div class="cardScalable">',t+='<div class="cardPadder"></div>',t+=s?'<a class="cardContent" href="'+s+'">':l?o?'<div class="cardContent connectModePluginCard">':'<div class="cardContent">':'<div class="cardContent noConfigPluginCard noHoverEffect">',t+=n.ImageUrl?'<div class="cardImage" style="background-image:url(\''+n.ImageUrl+"');\">":'<div class="cardImage" style="background-image:url(\'css/images/items/list/collection.png\');">',t+="</div>",t+=s?"</a>":"</div>",t+="</div>",t+='<div class="cardFooter">',t+='<div class="cardText" style="text-align:right; float:right;padding-top:5px;">',t+='<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnCardMenu"></paper-icon-button>',t+="</div>",t+="<div class='cardText'>",t+=n.Name,t+="</div>",t+="<div class='cardText'>",t+=n.Version,t+="</div>",t+="</div>",t+="</div>",t+="</div>"}function l(a,n,e){ApiClient.getJSON(ApiClient.getUrl("dashboard/configurationpages")+"?pageType=PluginConfiguration").then(function(i){s(a,n,i,e)})}function s(n,e,l,s){e=e.sort(function(a,n){return a.Name>n.Name?1:-1});var d=e.map(function(a){return o(a,l)}).join("");if(e.length){var c=a(".installedPlugins",n).html(d).trigger("create");a(".noConfigPluginCard",c).on("click",function(){i()}),a(".connectModePluginCard",c).on("click",function(){t()}),a(".btnCardMenu",c).on("click",function(){r(n,this)})}else s&&(d+='<div style="padding:5px;">',d+="<p>"+Globalize.translate("MessageNoPluginsInstalled")+"</p>",d+='<p><a href="plugincatalog.html">',d+=Globalize.translate("BrowsePluginCatalogMessage"),d+="</a></p>",d+="</div>"),a(".installedPlugins",n).html(d).trigger("create");Dashboard.hideLoadingMsg()}function r(n,i){var t=a(i).parents(".card"),o=t.attr("data-id"),l=t.attr("data-name"),s=a(".cardContent",t).attr("href"),r=[];s&&r.push({name:Globalize.translate("ButtonSettings"),id:"open",ironIcon:"mode-edit"}),r.push({name:Globalize.translate("ButtonUninstall"),id:"delete",ironIcon:"delete"}),require(["actionsheet"],function(){ActionSheetElement.show({items:r,positionTo:i,callback:function(a){switch(a){case"open":Dashboard.navigate(s);break;case"delete":e(n,o,l)}}})})}function d(a){Dashboard.showLoadingMsg(),ApiClient.getInstalledPlugins().then(function(n){l(a,n,!0)})}a(document).on("pageshow","#pluginsPage",function(){d(this)}),n.PluginsPage={renderPlugins:l}}(jQuery,window);