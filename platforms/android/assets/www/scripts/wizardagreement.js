!function(e,t){function a(){var e=t(this).parents(".page")[0];return e.querySelector(".chkAccept").checked?Dashboard.navigate("wizardfinish.html"):Dashboard.alert({message:Globalize.translate("MessagePleaseAcceptTermsOfServiceBeforeContinuing"),title:""}),!1}t(document).on("pageinit","#wizardAgreementPage",function(){t(".wizardAgreementForm").off("submit",a).on("submit",a)})}(window,jQuery);