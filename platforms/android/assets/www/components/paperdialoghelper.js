!function(t){function o(t,o,i){function a(e){var i=e.detail.state||{},a=i.hash=="#"+o;"back"==i.direction&&t&&(a||(t.close(),t=null))}function n(){i!==!1&&Dashboard.onPopupClose(),t=null,e()&&(window.removeEventListener("navigate",a),window.location.hash=="#"+o&&history.back())}t.addEventListener("iron-overlay-closed",n),t.open(),i!==!1&&Dashboard.onPopupOpen(),e()&&(window.location.hash=o,window.addEventListener("navigate",a))}function e(){return browserInfo.msie?!1:browserInfo.edge?!1:!0}function i(t,e,i){new o(t,e,i)}function a(t){e()?t.opened&&history.back():t.close()}function n(t){t=t||{};var o=document.createElement("paper-dialog");o.setAttribute("with-backdrop","with-backdrop"),o.setAttribute("role","alertdialog"),browserInfo.msie||browserInfo.mozilla||t.modal!==!1&&o.setAttribute("modal","modal"),o.setAttribute("noAutoFocus","noAutoFocus"),browserInfo.mobile||(o.entryAnimation="scale-up-animation",o.exitAnimation="fade-out-animation"),o.classList.add("popupEditor"),o.classList.add("small"==t.size?"small-paper-dialog":"medium"==t.size?"medium-paper-dialog":"fullscreen-paper-dialog");var e=t.theme||"b";return o.classList.add("ui-body-"+e),o.classList.add("background-theme-"+e),o.classList.add("smoothScrollY"),o}function s(t,o){var e=$(window).height();if(e>=540){var i=$(o).offset();i.top+=o.offsetHeight/2,i.left+=o.offsetWidth/2,i.top-=24,i.left-=24,i.top-=$(t).height()/2,i.left-=$(t).width()/2,i.top-=$(window).scrollTop(),i.left-=$(window).scrollLeft(),i.top=Math.min(i.top,e-300),i.left=Math.min(i.left,$(window).width()-300),i.top=Math.max(i.top,0),i.left=Math.max(i.left,0),t.style.position="fixed",t.style.left=i.left+"px",t.style.top=i.top+"px"}}t.PaperDialogHelper={openWithHash:i,close:a,createDialog:n,positionTo:s}}(this);