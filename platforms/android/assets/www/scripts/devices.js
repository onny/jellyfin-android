!function(){function e(e,t){var a=Globalize.translate("DeleteDeviceConfirmation");Dashboard.confirm(a,Globalize.translate("HeaderDeleteDevice"),function(a){a&&(Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Devices",{Id:t})}).then(function(){i(e)}))})}function t(t,i){var a="";i.length&&(a+='<div class="paperList">'),a+=i.map(function(e){var t="";return t+="<paper-icon-item>",t+='<paper-fab mini style="background:#999;" icon="tablet-android" item-icon></paper-fab>',t+="<paper-item-body three-line>",t+='<a class="clearLink" href="device.html?id='+e.Id+'">',t+="<div>",t+=e.Name,t+="</div>",e.AppName&&(t+="<div secondary>",t+=e.AppName,t+="</div>"),e.LastUserName&&(t+="<div secondary>",t+=Globalize.translate("DeviceLastUsedByUserName",e.LastUserName),t+="</div>"),t+="</a>",t+="</paper-item-body>",t+='<paper-icon-button icon="delete" data-id="'+e.Id+'" title="'+Globalize.translate("ButtonDelete")+'" class="btnDeleteDevice"></paper-icon-button>',t+="</paper-icon-item>"}).join(""),i.length&&(a+="</div>");var n=$(".devicesList",t).html(a).trigger("create");$(".btnDeleteDevice",n).on("click",function(){e(t,this.getAttribute("data-id"))})}function i(e){Dashboard.showLoadingMsg(),ApiClient.getJSON(ApiClient.getUrl("Devices",{SupportsPersistentIdentifier:!0})).then(function(i){t(e,i.Items),Dashboard.hideLoadingMsg()})}$(document).on("pageshow","#devicesPage",function(){var e=this;i(e)})}();