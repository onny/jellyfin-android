define(["browser","appStorage","apphost","loading","connectionManager","globalize","embyRouter","dom","css!./multiselect"],function(e,t,n,r,a,o,i,s){function c(){var e=S;if(e){e.parentNode.removeChild(e),S=null,I=[],C=[];for(var t=document.querySelectorAll(".itemSelectionPanel"),n=0,r=t.length;r>n;n++){var a=t[n].parentNode;a.removeChild(t[n]),a.classList.remove("withMultiSelect")}}}function l(){if(!(P>=15||(P++,15>P))){var e="8";t.getItem("tapholdhelp")!=e&&(t.setItem("tapholdhelp",e),require(["alert"],function(e){e({text:o.translate("sharedcomponents#TryMultiSelectMessage"),title:o.translate("sharedcomponents#TryMultiSelect")})}))}}function d(e,t){if(!s.parentWithClass(e.target,"chkItemSelect")){var n=t.querySelector(".chkItemSelect");if(n)if(n.classList.contains("checkedInitial"))n.classList.remove("checkedInitial");else{var r=!n.checked;n.checked=r,u(n,r)}}return e.preventDefault(),e.stopPropagation(),!1}function u(e,t){var n=s.parentWithAttribute(e,"data-id").getAttribute("data-id");if(t){var r=I.filter(function(e){return e==n});r.length||(I.push(n),C.push(e))}else I=I.filter(function(e){return e!=n}),C=C.filter(function(t){return t!=e});if(I.length){var a=document.querySelector(".itemSelectionCount");a&&(a.innerHTML=I.length)}else c()}function h(){u(this,this.checked)}function m(t,n){var r=t.querySelector(".itemSelectionPanel");if(!r){r=document.createElement("div"),r.classList.add("itemSelectionPanel");var a=t.querySelector(".cardBox")||t.querySelector(".cardContent");a.classList.add("withMultiSelect"),a.appendChild(r);var o="chkItemSelect";n&&!e.firefox&&(o+=" checkedInitial");var i=n?" checked":"";r.innerHTML='<label class="checkboxContainer"><input type="checkbox" is="emby-checkbox" data-outlineclass="multiSelectCheckboxOutline" class="'+o+'"'+i+"/><span></span></label>";var s=r.querySelector(".chkItemSelect");s.addEventListener("change",h)}}function p(){var e=S;if(!e){e=document.createElement("div"),e.classList.add("selectionCommandsPanel"),document.body.appendChild(e),S=e;var t="";t+='<div style="float:left;">',t+='<button is="paper-icon-button-light" class="btnCloseSelectionPanel autoSize"><i class="md-icon">close</i></button>',t+='<span class="itemSelectionCount"></span>',t+="</div>";var r="dots-horiz"==n.moreIcon?"&#xE5D3;":"&#xE5D4;";t+='<button is="paper-icon-button-light" class="btnSelectionPanelOptions autoSize" style="margin-left:auto;"><i class="md-icon">'+r+"</i></button>",e.innerHTML=t,e.querySelector(".btnCloseSelectionPanel").addEventListener("click",c);var a=e.querySelector(".btnSelectionPanelOptions");a.addEventListener("click",v)}}function f(e,t){return new Promise(function(n,r){var a=o.translate("sharedcomponents#ConfirmDeleteItem"),i=o.translate("sharedcomponents#HeaderDeleteItem");t.length>1&&(a=o.translate("sharedcomponents#ConfirmDeleteItems"),i=o.translate("sharedcomponents#HeaderDeleteItems")),require(["confirm"],function(o){o(a,i).then(function(){var r=t.map(function(t){e.deleteItem(t)});Promise.all(r).then(n)},r)})})}function v(e){var t=a.currentApiClient();t.getCurrentUser().then(function(r){var a=[];a.push({name:o.translate("sharedcomponents#AddToCollection"),id:"addtocollection",ironIcon:"add"}),a.push({name:o.translate("sharedcomponents#AddToPlaylist"),id:"playlist",ironIcon:"playlist-add"}),r.Policy.EnableContentDeletion&&a.push({name:o.translate("sharedcomponents#Delete"),id:"delete",ironIcon:"delete"}),r.Policy.EnableContentDownloading&&n.supports("filedownload"),a.push({name:o.translate("sharedcomponents#GroupVersions"),id:"groupvideos",ironIcon:"call-merge"}),r.Policy.EnableSync&&n.supports("sync")&&a.push({name:o.translate("sharedcomponents#MakeAvailableOffline"),id:"synclocal"}),a.push({name:o.translate("sharedcomponents#MarkPlayed"),id:"markplayed"}),a.push({name:o.translate("sharedcomponents#MarkUnplayed"),id:"markunplayed"}),a.push({name:o.translate("sharedcomponents#Refresh"),id:"refresh"}),r.Policy.EnableSync&&a.push({name:o.translate("sharedcomponents#SyncToOtherDevice"),id:"sync"}),require(["actionsheet"],function(n){n.show({items:a,positionTo:e.target,callback:function(e){var n=I.slice(0),r=t.serverInfo().Id;switch(e){case"addtocollection":require(["collectionEditor"],function(e){(new e).show({items:n,serverId:r})}),c(),y();break;case"playlist":require(["playlistEditor"],function(e){(new e).show({items:n,serverId:r})}),c(),y();break;case"delete":f(t,n).then(function(){i.goHome()}),c(),y();break;case"groupvideos":b(t,n);break;case"markplayed":n.forEach(function(e){t.markPlayed(t.getCurrentUserId(),e)}),c(),y();break;case"markunplayed":n.forEach(function(e){t.markUnplayed(t.getCurrentUserId(),e)}),c(),y();break;case"refresh":require(["refreshDialog"],function(e){new e({itemIds:n,serverId:r}).show()}),c(),y();break;case"sync":require(["syncDialog"],function(e){e.showMenu({items:n.map(function(e){return{Id:e}}),serverId:r})}),c(),y();break;case"synclocal":require(["syncDialog"],function(e){e.showMenu({items:n.map(function(e){return{Id:e}}),isLocalSync:!0,serverId:r})}),c(),y()}}})})})}function y(){var e=[];[].forEach.call(C,function(t){var n=s.parentWithAttribute(t,"is","emby-itemscontainer");n&&-1==e.indexOf(n)&&e.push(n)});for(var t=0,n=e.length;n>t;t++)e[t].dispatchEvent(new CustomEvent("needsrefresh",{detail:{},cancelable:!1,bubbles:!0}))}function b(e,t){if(t.length<2)return void require(["alert"],function(e){e({text:o.translate("sharedcomponents#PleaseSelectTwoItems")})});var n=o.translate("sharedcomponents#TheSelectedItemsWillBeGrouped");require(["confirm"],function(a){a(n,o.translate("sharedcomponents#GroupVersions")).then(function(){r.show(),e.ajax({type:"POST",url:e.getUrl("Videos/MergeVersions",{Ids:t.join(",")})}).then(function(){r.hide(),c(),y()})})})}function g(e){require(["emby-checkbox"],function(){for(var t=document.querySelectorAll(".card"),n=0,r=t.length;r>n;n++)m(t[n],e==t[n]);p(),u(e,!0)})}function k(e){var t=e.target;if(I.length){var n=s.parentWithClass(t,"card");if(n){var r=n.querySelector(".itemSelectionPanel");if(r)return d(e,r)}return e.preventDefault(),e.stopPropagation(),!1}}var S,I=[],C=[],P=0;return document.addEventListener("viewbeforehide",c),function(t){function n(e){var t=s.parentWithClass(e.target,"card");return t&&g(t),e.preventDefault(),e.stopPropagation&&e.stopPropagation(),!1}function r(t){e.touch&&!e.safari?o.addEventListener("contextmenu",n):require(["hammer"],function(e){var r=new e.Manager(t),o=new e.Press({time:500});r.add(o),r.on("press",n),a.manager=r}),l(t)}var a=this,o=t.container;r(o),t.bindOnClick!==!1&&o.addEventListener("click",k),a.onContainerClick=k,a.destroy=function(){o.removeEventListener("click",k),o.removeEventListener("contextmenu",n);var e=a.manager;e&&(e.destroy(),a.manager=null)}}});