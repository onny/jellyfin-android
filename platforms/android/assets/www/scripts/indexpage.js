!function(e){function t(e){if(AppInfo.isNativeApp&&browserInfo.safari)switch(e){case 0:return d;case 1:return"resume";case 2:return"nextup";case 3:return"latestmovies";case 4:return"latestepisodes";case 5:return"latesttvrecordings";default:return""}switch(e){case 0:return d;case 1:return"resume";case 2:return"latestmedia";case 3:return"latesttvrecordings";default:return""}}function r(e,r,a,s){var o=r.Id,i=a.CustomPrefs["home"+s]||t(s);"folders"==i&&(i=d);var n="0"!=a.CustomPrefs.enableLibraryTileNames,l=e.querySelector(".section"+s);if("latestmedia"==i)return Sections.loadRecentlyAdded(l,r);if("latestmovies"==i)return Sections.loadLatestMovies(l,r);if("latestepisodes"==i)return Sections.loadLatestEpisodes(l,r);if("librarytiles"==i)return Sections.loadLibraryTiles(l,r,"backdrop",s,!1,n);if("smalllibrarytiles"==i)return Sections.loadLibraryTiles(l,r,"homePageSmallBackdrop",s,!1,n);if("smalllibrarytiles-automobile"==i)return Sections.loadLibraryTiles(l,r,"homePageSmallBackdrop",s,!0,n);if("librarytiles-automobile"==i)return Sections.loadLibraryTiles(l,r,"backdrop",s,!0,n);if("librarybuttons"==i)return Sections.loadlibraryButtons(l,o,s);if("resume"==i)return Sections.loadResume(l,o);if("nextup"==i)return Sections.loadNextUp(l,o);if("latesttvrecordings"==i)return Sections.loadLatestLiveTvRecordings(l,o);if("latestchannelmedia"==i)return Sections.loadLatestChannelMedia(l,o);l.innerHTML="";var u=DeferredBuilder.Deferred();return u.resolve(),u.promise()}function a(e,t,a){var s,o,i=6,n=e.querySelector(".sections");if(!n.innerHTML.length){var l="";for(s=0,o=i;o>s;s++)l+='<div class="homePageSection section'+s+'"></div>';n.innerHTML=l}var u=[];for(s=0,o=i;o>s;s++)u.push(r(e,t,a,s));return Promise.all(u)}function s(e,t){c("home",t).then(function(e){e.CustomPrefs[f]=b,ApiClient.updateDisplayPreferences("home",e,t,AppSettings.displayPreferencesKey())})}function o(t,r){if(r.CustomPrefs[f]==b)e(".welcomeMessage",t).hide();else{Dashboard.hideLoadingMsg();var a=e(".welcomeMessage",t).show();r.CustomPrefs[f]?(e(".tourHeader",a).html(Globalize.translate("HeaderWelcomeBack")),e(".tourButtonText",a).html(Globalize.translate("ButtonTakeTheTourToSeeWhatsNew"))):(e(".tourHeader",a).html(Globalize.translate("HeaderWelcomeToProjectWebClient")),e(".tourButtonText",a).html(Globalize.translate("ButtonTakeTheTour")))}}function i(t,r){require(["swipebox"],function(){e.swipebox([{href:"css/images/tour/web/tourcontent.jpg",title:Globalize.translate("WebClientTourContent")},{href:"css/images/tour/web/tourmovies.jpg",title:Globalize.translate("WebClientTourMovies")},{href:"css/images/tour/web/tourmouseover.jpg",title:Globalize.translate("WebClientTourMouseOver")},{href:"css/images/tour/web/tourtaphold.jpg",title:Globalize.translate("WebClientTourTapHold")},{href:"css/images/tour/web/tourmysync.png",title:Globalize.translate("WebClientTourMySync")},{href:"css/images/tour/web/toureditor.png",title:Globalize.translate("WebClientTourMetadataManager")},{href:"css/images/tour/web/tourplaylist.png",title:Globalize.translate("WebClientTourPlaylists")},{href:"css/images/tour/web/tourcollections.jpg",title:Globalize.translate("WebClientTourCollections")},{href:"css/images/tour/web/tourusersettings1.png",title:Globalize.translate("WebClientTourUserPreferences1")},{href:"css/images/tour/web/tourusersettings2.png",title:Globalize.translate("WebClientTourUserPreferences2")},{href:"css/images/tour/web/tourusersettings3.png",title:Globalize.translate("WebClientTourUserPreferences3")},{href:"css/images/tour/web/tourusersettings4.png",title:Globalize.translate("WebClientTourUserPreferences4")},{href:"css/images/tour/web/tourmobile1.jpg",title:Globalize.translate("WebClientTourMobile1")},{href:"css/images/tour/web/tourmobile2.png",title:Globalize.translate("WebClientTourMobile2")},{href:"css/images/tour/enjoy.jpg",title:Globalize.translate("MessageEnjoyYourStay")}],{afterClose:function(){s(t,r),e(".welcomeMessage",t).hide()},hideBarsDelay:3e4})})}function n(e,t){if(LibraryBrowser.needsRefresh(t)&&window.ApiClient){var r=Dashboard.getCurrentUserId();Dashboard.showLoadingMsg(),c("home",r).then(function(r){Dashboard.getCurrentUser().then(function(s){a(t,s,r).then(function(){AppInfo.isNativeApp||o(e,r),Dashboard.hideLoadingMsg(),LibraryBrowser.setLastRefreshed(t)})})})}}function l(e,t){var r=e.querySelector(".pageTabContent[data-index='"+t+"']"),a=[],s="HomePage",o="";switch(t){case 0:a.push("scripts/sections"),o="renderHomeTab";break;case 1:a.push("scripts/homenextup"),o="renderNextUp";break;case 2:a.push("scripts/favorites"),o="renderFavorites";break;case 3:a.push("scripts/homeupcoming"),o="renderUpcoming"}require(a,function(){window[s][o](e,r)})}function u(t,r){if(r.NowPlayingItem&&"Video"==r.NowPlayingItem.MediaType){var a=e(e.mobile.activePage)[0],s=a.querySelector("neon-animated-pages");s.dispatchEvent(new CustomEvent("tabchange",{}))}}function c(e,t){return ApiClient.getDisplayPreferences(e,t,AppSettings.displayPreferencesKey())}var d="smalllibrarytiles",b="14",f="homePageTour";pageIdOn("pageinit","indexPage",function(){var e=this,t=e.querySelector("paper-tabs"),r=e.querySelector("neon-animated-pages");LibraryBrowser.configurePaperLibraryTabs(e,t,r,"index.html"),r.addEventListener("tabchange",function(t){l(e,parseInt(t.target.selected))}),e.querySelector(".btnTakeTour").addEventListener("click",function(){i(e,Dashboard.getCurrentUserId())}),AppInfo.enableHomeTabs?(e.classList.remove("noSecondaryNavPage"),e.querySelector(".libraryViewNav").classList.remove("hide")):(e.classList.add("noSecondaryNavPage"),e.querySelector(".libraryViewNav").classList.add("hide"))}),pageIdOn("pageshow","indexPage",function(){e(MediaController).on("playbackstop",u)}),pageIdOn("pagebeforehide","indexPage",function(){e(MediaController).off("playbackstop",u)}),window.HomePage={renderHomeTab:n}}(jQuery,document);