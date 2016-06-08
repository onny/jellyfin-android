define(["datetime","paper-icon-button-light"],function(e){function t(){var e="";return e+='<div class="nowPlayingBar hide">',e+='<div class="nowPlayingBarPositionContainer">',e+='<paper-slider pin step=".1" min="0" max="100" value="0" class="nowPlayingBarPositionSlider"></paper-slider>',e+="</div>",e+='<div class="nowPlayingBarInfoContainer">',e+='<div class="nowPlayingImage"></div>',e+='<div class="nowPlayingBarText"></div>',e+="</div>",e+='<div class="nowPlayingBarCenter">',e+='<button is="paper-icon-button-light" class="previousTrackButton mediaButton"><iron-icon icon="skip-previous"></iron-icon></button>',e+='<button is="paper-icon-button-light" class="unpauseButton mediaButton"><iron-icon icon="play-arrow"></iron-icon></button>',e+='<button is="paper-icon-button-light" class="pauseButton mediaButton"><iron-icon icon="pause"></iron-icon></button>',e+='<button is="paper-icon-button-light" class="stopButton mediaButton"><iron-icon icon="stop"></iron-icon></button>',e+='<button is="paper-icon-button-light" class="nextTrackButton mediaButton"><iron-icon icon="skip-next"></iron-icon></button>',e+='<div class="nowPlayingBarCurrentTime"></div>',e+="</div>",e+='<div class="nowPlayingBarRight">',e+='<button is="paper-icon-button-light" class="muteButton mediaButton"><iron-icon icon="volume-up"></iron-icon></button>',e+='<button is="paper-icon-button-light" class="unmuteButton mediaButton"><iron-icon icon="volume-off"></iron-icon></button>',e+='<paper-slider pin step="1" min="0" max="100" value="0" class="nowPlayingBarVolumeSlider" style="width:100px;vertical-align:middle;display:inline-block;"></paper-slider>',e+='<button is="paper-icon-button-light" class="toggleRepeatButton mediaButton"><iron-icon icon="repeat"></iron-icon></button>',e+='<div class="nowPlayingBarUserDataButtons">',e+="</div>",e+='<button is="paper-icon-button-light" class="unpauseButton mediaButton"><iron-icon icon="play-arrow"></iron-icon></button>',e+='<button is="paper-icon-button-light" class="pauseButton mediaButton"><iron-icon icon="pause"></iron-icon></button>',e+='<button is="paper-icon-button-light" class="remoteControlButton mediaButton"><iron-icon icon="tablet-android"></iron-icon></button>',e+='<button is="paper-icon-button-light" class="playlistButton mediaButton"><iron-icon icon="queue-music"></iron-icon></button>',e+="</div>",e+="</div>"}function n(e){return V||(V=e.offsetHeight),V+"px"}function i(e){if(!e.classList.contains("hide")){var t=function(){e.classList.add("hide")};return!browserInfo.animate||browserInfo.mobile?void t():void requestAnimationFrame(function(){var i=[{height:n(e),offset:0},{height:"0",display:"none",offset:1}],o={duration:200,iterations:1,fill:"both",easing:"ease-out"};e.animate(i,o).onfinish=t})}}function o(e){e.classList.contains("hide")&&(e.classList.remove("hide"),browserInfo.animate&&!browserInfo.mobile&&requestAnimationFrame(function(){var t=[{height:"0",offset:0},{height:n(e),offset:1}],i={duration:200,iterations:1,fill:"both",easing:"ease-out"};e.animate(t,i)}))}function a(){T&&T.pause()}function r(){T&&T.unpause()}function s(t){k=t.querySelector(".nowPlayingBarCurrentTime"),L=t.querySelector(".nowPlayingImage"),S=t.querySelector(".nowPlayingBarText"),R=t.querySelector(".nowPlayingBarUserDataButtons"),M=t.querySelector(".unmuteButton"),M.addEventListener("click",function(){T&&T.unMute()}),C=t.querySelector(".muteButton"),C.addEventListener("click",function(){T&&T.mute()}),t.querySelector(".stopButton").addEventListener("click",function(){T&&T.stop()});var n,i;for(N=t.querySelectorAll(".pauseButton"),n=0,i=N.length;i>n;n++)N[n].addEventListener("click",a);for(q=t.querySelectorAll(".unpauseButton"),n=0,i=q.length;i>n;n++)q[n].addEventListener("click",r);t.querySelector(".nextTrackButton").addEventListener("click",function(){T&&T.nextTrack()}),t.querySelector(".previousTrackButton").addEventListener("click",function(){T&&T.previousTrack()}),t.querySelector(".remoteControlButton").addEventListener("click",function(){l()}),t.querySelector(".playlistButton").addEventListener("click",function(){l(2)}),A=t.querySelector(".toggleRepeatButton"),A.addEventListener("click",function(){if(T){var e=U||{};switch((e.PlayState||{}).RepeatMode){case"RepeatAll":T.setRepeatMode("RepeatOne");break;case"RepeatOne":T.setRepeatMode("RepeatNone");break;default:T.setRepeatMode("RepeatAll")}}}),D=A.querySelector("iron-icon"),setTimeout(function(){E=t.querySelector(".nowPlayingBarVolumeSlider"),E.addEventListener("change",function(){T&&T.setVolume(this.value)}),x=t.querySelector(".nowPlayingBarPositionSlider"),x.addEventListener("change",function(){if(T&&U){var e=parseFloat(this.value),t=e/100*U.NowPlayingItem.RunTimeTicks;T.seek(Math.floor(t))}}),x._setPinValue=function(t){var n=U;if(!n||!n.NowPlayingItem||!n.NowPlayingItem.RunTimeTicks)return void(this.pinValue="--:--");var i=n.NowPlayingItem.RunTimeTicks;i/=100,i*=t,this.pinValue=e.getDisplayRunningTime(i)}},300)}function l(e){Dashboard.navigate(e?"nowplaying.html?tab="+e:"nowplaying.html")}function c(){return new Promise(function(e){return H?void e(H):void require(["css!css/nowplayingbar.css","paper-slider"],function(){return(H=document.querySelector(".nowPlayingBar"))?void e(H):(document.body.insertAdjacentHTML("beforeend",t()),H=document.querySelector(".nowPlayingBar"),!browserInfo.safari&&AppInfo.isNativeApp||!browserInfo.mobile||H.classList.add("noMediaProgress"),s(H),void e(H))})})}function u(e){e.classList.remove("hide")}function d(e){e.classList.add("hide")}function g(e,t){return t.NowPlayingItem?H?void p(e,t):void c().then(function(){p(e,t)}):void h()}function p(t,n){if(v(),"positionchange"==t.type){var i=(new Date).getTime();if(700>i-F)return;F=i}U=n;var o,a,r=MediaController.getPlayerInfo(),s=n.PlayState||{};if(s.IsPaused){for(o=0,a=N.length;a>o;o++)d(N[o]);for(o=0,a=q.length;a>o;o++)u(q[o])}else{for(o=0,a=N.length;a>o;o++)u(N[o]);for(o=0,a=q.length;a>o;o++)d(q[o])}m(n,r);var l=n.NowPlayingItem||{};if(x&&!x.dragging){if(l.RunTimeTicks){var c=s.PositionTicks/l.RunTimeTicks;c*=100,x.value=c}else x.value=0;x.disabled=!s.CanSeek}var g=e.getDisplayRunningTime(s.PositionTicks);l.RunTimeTicks&&(g+=" / "+e.getDisplayRunningTime(l.RunTimeTicks)),k.innerHTML=g,y(n)}function m(e,t){t=t||MediaController.getPlayerInfo();var n=e.PlayState||{},i=t.supportedCommands,o=!0,a=!0,r=!0;-1==i.indexOf("Mute")&&(o=!1),-1==i.indexOf("Unmute")&&(a=!1),n.IsMuted?o=!1:a=!1,-1==i.indexOf("SetRepeatMode")?A.classList.add("hide"):A.classList.remove("hide"),"RepeatAll"==n.RepeatMode?(D.icon="repeat",A.classList.add("repeatActive")):"RepeatOne"==n.RepeatMode?(D.icon="repeat-one",A.classList.add("repeatActive")):(D.icon="repeat",A.classList.remove("repeatActive")),-1==i.indexOf("SetVolume")&&(r=!1),t.isLocalPlayer&&AppInfo.hasPhysicalVolumeButtons&&(o=!1,a=!1,r=!1),o?u(C):d(C),a?u(M):d(M),E&&(r?E.classList.remove("hide"):E.classList.add("hide"),E.dragging||(E.value=n.VolumeLevel||0))}function y(e){var t=MediaController.getNowPlayingNameHtml(e.NowPlayingItem)||"";-1!=t.indexOf("<br/>")?S.classList.add("nowPlayingDoubleText"):S.classList.remove("nowPlayingDoubleText"),e.NowPlayingItem.Id&&(t='<a style="color:inherit;text-decoration:none;" href="'+LibraryBrowser.getHref(e.NowPlayingItem)+'">'+t+"</a>"),S.innerHTML=t;var n,i=80,o=e.NowPlayingItem;n=o.PrimaryImageTag?ApiClient.getScaledImageUrl(o.PrimaryImageItemId,{type:"Primary",height:i,tag:o.PrimaryImageTag}):o.BackdropImageTag?ApiClient.getScaledImageUrl(o.BackdropItemId,{type:"Backdrop",height:i,tag:o.BackdropImageTag,index:0}):o.ThumbImageTag?ApiClient.getScaledImageUrl(o.ThumbImageItemId,{type:"Thumb",height:i,tag:o.ThumbImageTag}):"TvChannel"==o.Type||"Recording"==o.Type?"css/images/items/detail/tv.png":"Audio"==o.MediaType?"css/images/items/detail/audio.png":"css/images/items/detail/video.png",n!=O&&(O=n,ImageLoader.lazyImage(L,n),o.Id?ApiClient.getItem(Dashboard.getCurrentUserId(),o.Id).then(function(e){R.innerHTML=LibraryBrowser.getUserDataIconsHtml(e,!1)}):R.innerHTML="")}function f(e,t){var n=this;n.beginPlayerUpdates(),P.call(n,e,t)}function v(){c().then(o)}function h(){var e=document.getElementsByClassName("nowPlayingBar")[0];e&&i(e)}function b(e){var t=this;t.endPlayerUpdates(),h()}function P(e,t){var n=this;n.isDefaultPlayer&&t.NowPlayingItem&&"Video"==t.NowPlayingItem.MediaType||g(e,t)}function B(){T&&(Events.off(T,"playbackstart",f),Events.off(T,"playbackstop",b),Events.off(T,"volumechange",w),Events.off(T,"playstatechange",P),Events.off(T,"positionchange",P),T.endPlayerUpdates(),T=null,h())}function w(){var e=this;Promise.all([e.getPlayerState(),c()]).then(function(t){var n=t[0];e.isDefaultPlayer&&n.NowPlayingItem&&"Video"==n.NowPlayingItem.MediaType||m(n)})}function I(e){B(),T=e,e.getPlayerState().then(function(t){t.NowPlayingItem&&e.beginPlayerUpdates(),P.call(e,{type:"init"},t)}),Events.on(e,"playbackstart",f),Events.on(e,"playbackstop",b),Events.on(e,"volumechange",w),Events.on(e,"playstatechange",P),Events.on(e,"positionchange",P)}var T,k,L,S,R,M,C,E,q,N,x,A,D,U,V,H,O,F=0;Events.on(MediaController,"playerchange",function(){I(MediaController.getCurrentPlayer())}),I(MediaController.getCurrentPlayer())});