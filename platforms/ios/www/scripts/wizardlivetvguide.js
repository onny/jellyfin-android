define(["jQuery"],function(e){function n(n,t){Dashboard.showLoadingMsg();var o=ApiClient;o.getJSON(o.getUrl("Startup/Configuration")).then(function(o){var r=null;(o.LiveTvGuideProviderType||"").toLowerCase()==t.toLowerCase()&&o.LiveTvGuideProviderId&&(r=o.LiveTvGuideProviderId);var u="components/tvproviders/"+t.toLowerCase()+".js";require([u],function(t){var o=new t(n,r,{showCancelButton:!1,showSubmitButton:!1,showConfirmation:!1});Dashboard.hideLoadingMsg(),o.init(),a=o,e(a).on("submitted",i)})})}function t(e,t){a=null,ApiClient.ajax({type:"GET",url:"components/tvproviders/"+t.toLowerCase()+".template.html"}).then(function(i){var o=e.querySelector(".providerTemplate");o.innerHTML=Globalize.translateDocument(i),n(e,t)})}function i(){var e=ApiClient;e.getJSON(e.getUrl("Startup/Info")).then(function(e){Dashboard.navigate(e.SupportsRunningAsService?"wizardservice.html":"wizardagreement.html")})}function o(){a.submit()}function r(n){e("#selectType",n).trigger("change")}var a;e(document).on("pageinit","#wizardGuidePage",function(){var n=this;e("#selectType",n).on("change",function(){t(n,this.value)}),e(".btnSkip",n).on("click",i),e(".btnNext",n).on("click",o)}).on("pageshow","#wizardGuidePage",function(){var e=this;r(e)})});