define(["dialogHelper","jQuery","emby-input","emby-select","paper-fab","paper-item-body","paper-icon-item","paper-icon-button-light"],function(e,t){function n(){if(0==h.length)return require(["alert"],function(e){e({text:Globalize.translate("PleaseAddAtLeastOneFolder"),type:"error"})}),!1;var n=this,i=t(n).parents(".dialog")[0],o=t("#txtValue",n).val(),r=t("#selectCollectionType",n).val();return"mixed"==r&&(r=null),ApiClient.addVirtualFolder(o,r,m.refresh,h).then(function(){f=!0,e.close(i)},function(){require(["toast"],function(e){e(Globalize.translate("ErrorAddingMediaPathToVirtualFolder"))})}),!1}function i(e){return e.filter(function(e){return e.isSelectable!==!1}).map(function(e){return'<option value="'+e.value+'">'+e.name+"</option>"}).join("")}function o(e,o){t("#selectCollectionType",e).html(i(o)).val("").on("change",function(){if("mixed"!=this.value){var e=t(this).parents(".dialog")[0],n=this.selectedIndex;if(-1!=n){var i=this.options[n].innerHTML.replace("*","").replace("&amp;","&"),r=this.value;t("#txtValue",e).val(i);var a=o.filter(function(e){return e.value==r})[0];t(".collectionTypeFieldDescription",e).html(a.message||"")}}}),t(".btnAddFolder",e).on("click",r),t("form",e).off("submit",n).on("submit",n)}function r(){var e=t(this).parents(".popupEditor")[0];require(["directorybrowser"],function(t){var n=new t;n.show({callback:function(t){t&&c(e,t),n.close()}})})}function a(e,t){var n="";return n+='<paper-icon-item role="menuitem" class="lnkPath">',n+='<paper-fab mini style="background:#52B54B;" icon="folder" item-icon></paper-fab>',n+="<paper-item-body>",n+=e,n+="</paper-item-body>",n+='<button is="paper-icon-button-light"" class="btnRemovePath" data-index="'+t+'"><iron-icon icon="remove-circle"></iron-icon></button>',n+="</paper-icon-item>"}function l(e){var n=h.map(a).join(""),i=e.querySelector(".folderList");i.innerHTML=n,n?i.classList.remove("hide"):i.classList.add("hide"),t(e.querySelectorAll(".btnRemovePath")).on("click",s)}function c(e,t){0==h.filter(function(e){return e.toLowerCase()==t.toLowerCase()}).length&&(h.push(t),l(e))}function s(){var e=this,n=parseInt(e.getAttribute("data-index")),i=h[n];h=h.filter(function(e){return e.toLowerCase()!=i.toLowerCase()});var o=t(this).parents(".popupEditor")[0];l(o)}function u(){Dashboard.hideLoadingMsg(),p.resolveWith(null,[f])}function d(){var t=this;t.show=function(t){var n=jQuery.Deferred();m=t,p=n,f=!1;var i=new XMLHttpRequest;return i.open("GET","components/medialibrarycreator/medialibrarycreator.template.html",!0),i.onload=function(){var n=this.response,i=e.createDialog({size:"small",modal:!1,removeOnClose:!0});i.classList.add("ui-body-a"),i.classList.add("background-theme-a"),i.classList.add("popupEditor"),i.innerHTML=Globalize.translateDocument(n),document.body.appendChild(i),o(i,t.collectionTypeOptions),i.addEventListener("close",u),e.open(i),i.querySelector(".btnCancel").addEventListener("click",function(){e.close(i)}),h=[],l(i)},i.send(),n.promise()}}var p,f,m,h=[];return d});