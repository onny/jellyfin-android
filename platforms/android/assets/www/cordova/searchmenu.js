!function(){function e(){var e=this;e.show=function(){cordova.searchbar.show()},e.hide=function(){cordova.searchbar.hide()},document.addEventListener("searchEvent",function(n){Events.trigger(e,"change",[n.text||""])},!0),document.addEventListener("searchClosed",function(){Events.trigger(e,"closed")},!0)}window.SearchMenu=new e}();