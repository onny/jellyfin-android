!function(e,n){function t(e,n,t){var o="components/tvproviders/"+n+".js";require([o],function(n){var o=new n(e,t,{});o.init()})}function o(e,n,o){var r=new XMLHttpRequest;r.open("GET","components/tvproviders/"+n+".template.html",!0),r.onload=function(){var r=this.response,a=e.querySelector(".providerTemplate");a.innerHTML=Globalize.translateDocument(r),t(e,n,o)},r.send()}e(n).on("pageshow","#liveTvGuideProviderPage",function(){Dashboard.showLoadingMsg();var e=getParameterByName("id"),n=getParameterByName("type"),t=this;o(t,n,e)})}(jQuery,document,window);