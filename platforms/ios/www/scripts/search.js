define(["libraryBrowser","events","scrollStyles"],function(e,n){function t(){b&&(clearTimeout(b),b=null)}function a(e){return"Audio"==e.Type?[[e.AlbumArtist,e.Album].join(" - ")]:"MusicAlbum"==e.Type?[e.AlbumArtist]:"MusicArtist"==e.Type?[Globalize.translate("LabelArtist")]:"Movie"==e.Type?[Globalize.translate("LabelMovie")]:"MusicVideo"==e.Type?[Globalize.translate("LabelMusicVideo")]:"Episode"==e.Type?[Globalize.translate("LabelEpisode")]:"Series"==e.Type?[Globalize.translate("Series")]:"BoxSet"==e.Type?[Globalize.translate("LabelCollection")]:e.ChannelName?[e.ChannelName]:[e.Type]}function i(){var e=this;e.showSearchPanel=function(){f()}}function o(n,t){t=t.map(function(e){return e.Id=e.ItemId,e.ImageTags={},e.UserData={},e.PrimaryImageTag&&(e.ImageTags.Primary=e.PrimaryImageTag),e});var i=e.getPosterViewHtml({items:t,shape:"auto",lazy:!0,overlayText:!1,showTitle:!0,centerImage:!0,centerText:!0,textLines:a,overlayPlayButton:!0}),o=n.querySelector(".itemsContainer");o.innerHTML=i,ImageLoader.lazyChildren(o)}function r(e,n){var t=b;Dashboard.showLoadingMsg(),ApiClient.getSearchHints({userId:Dashboard.getCurrentUserId(),searchTerm:(n||"").trim(),limit:30}).then(function(n){t==b&&o(e,n.SearchHints),Dashboard.hideLoadingMsg()},function(){Dashboard.hideLoadingMsg()})}function s(e,n){if(!n){var a=e.querySelector(".itemsContainer");return a&&(a.innerHTML=""),void t()}t(),b=setTimeout(function(){r(e,n)},300)}function c(n){var t=document.querySelector(".searchResultsOverlay");if(n&&!t){var a=document.createElement("div");a.className="searchResultsOverlay ui-body-b smoothScrollY background-theme-b",a.innerHTML='<div class="searchResultsContainer"><div class="itemsContainer"></div></div></div>',document.body.appendChild(a),e.createCardMenus(a),t=a}return t}function u(e){var n;e?(n=c(!0),v||l(n,1),v=!0,document.body.classList.add("bodyWithPopupOpen"),s(n,e)):(n=c(!1),n&&(s(n,""),v&&(d(n,1),v=!1),document.body.classList.remove("bodyWithPopupOpen")))}function l(e,n){var t=[{opacity:"0",offset:0},{opacity:"1",offset:1}],a={duration:200,iterations:n,fill:"both"};e.animate&&e.animate(t,a)}function d(e,n){var t=[{opacity:"1",offset:0},{opacity:"0",offset:1}],a={duration:600,iterations:n,fill:"both"},i=function(){e.parentNode.removeChild(e)};e.animate?e.animate(t,a).onfinish=i:i()}function m(){require(["searchmenu"],function(){n.on(window.SearchMenu,"closed",h),n.on(window.SearchMenu,"change",function(e,n){u(n)})})}function h(){u(""),y()}function f(){require(["searchmenu"],function(){window.SearchMenu.show()})}function y(){require(["searchmenu"],function(){window.SearchMenu.hide()})}var b;window.Search=new i;var v;document.addEventListener("viewbeforehide",h),document.addEventListener("headercreated",function(){m()}),n.on(MediaController,"beforeplaybackstart",h)});