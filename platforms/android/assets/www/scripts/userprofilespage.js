!function(e,t,a){function n(e,t){var n="";n+='<div data-role="controlgroup">',n+=t.Items.map(function(e){var t="",a="chkShareFolder"+e.Id;t+='<label for="'+a+'">'+e.Name+"</label>";var n=!0,i=n?' checked="checked"':"";return t+='<input data-mini="true" class="chkShareFolder" data-folderid="'+e.Id+'" type="checkbox" id="'+a+'"'+i+" />"}).join(""),n+="</div>",a(".librarySharingList",e).html(n).trigger("create")}function i(e,t){var a=Globalize.translate("DeleteUserConfirmation");Dashboard.confirm(a,Globalize.translate("DeleteUser"),function(a){a&&(Dashboard.showLoadingMsg(),ApiClient.deleteUser(t).then(function(){v(e)}))})}function r(e){var t=a(e).parents(".card")[0],n=a(t).parents(".page")[0],r=t.getAttribute("data-userid"),o=[];o.push({name:Globalize.translate("ButtonOpen"),id:"open",ironIcon:"mode-edit"}),o.push({name:Globalize.translate("ButtonLibraryAccess"),id:"access",ironIcon:"lock"}),o.push({name:Globalize.translate("ButtonParentalControl"),id:"parentalcontrol",ironIcon:"person"}),o.push({name:Globalize.translate("ButtonDelete"),id:"delete",ironIcon:"delete"}),require(["actionsheet"],function(){ActionSheetElement.show({items:o,positionTo:t,callback:function(e){switch(e){case"open":Dashboard.navigate("useredit.html?userid="+r);break;case"access":Dashboard.navigate("userlibraryaccess.html?userid="+r);break;case"parentalcontrol":Dashboard.navigate("userparentalcontrol.html?userid="+r);break;case"delete":i(n,r)}}})})}function o(e,t){var a="",n="card squareCard bottomPaddedCard";e.Policy.IsDisabled&&(n+=" grayscale"),a+="<div data-userid='"+e.Id+"' class='"+n+"'>",a+='<div class="cardBox visualCardBox">',a+='<div class="cardScalable">',a+='<div class="cardPadder"></div>';var i="useredit.html?userId="+e.Id;a+='<a class="cardContent" href="'+i+'">';var r;r=e.PrimaryImageTag?ApiClient.getUserImageUrl(e.Id,{width:300,tag:e.PrimaryImageTag,type:"Primary"}):"css/images/userflyoutdefault.png";var o="cardImage";return e.Policy.IsDisabled&&(o+=" disabledUser"),a+='<div class="'+o+'" style="background-image:url(\''+r+"');\">",e.ConnectUserId&&t&&(a+='<div class="playedIndicator" title="'+Globalize.translate("TooltipLinkedToEmbyConnect")+'"><iron-icon icon="cloud"></iron-icon></div>'),a+="</div>",a+="</a>",a+="</div>",a+='<div class="cardFooter">',a+='<div class="cardText" style="text-align:right; float:right;padding:0;">',a+='<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnUserMenu"></paper-icon-button>',a+="</div>",a+='<div class="cardText" style="padding-top:10px;padding-bottom:10px;">',a+=e.Name,a+="</div>",a+="</div>",a+="</div>",a+="</div>"}function s(e,t){var a="";return a+=e.map(function(e){return o(e,t)}).join("")}function d(e,t,n){var i=s(t,n);e.html(i).trigger("create"),a(".btnUserMenu",e).on("click",function(){r(this)})}function l(e,t){d(a(".localUsers",e),t.filter(function(e){return"Guest"!=e.ConnectLinkType}),!0),d(a(".connectUsers",e),t.filter(function(e){return"Guest"==e.ConnectLinkType}))}function c(e){require(["jqmpopup"],function(){var t=a(e).parents(".card"),n=a(e).parents(".page"),i=t.attr("data-id");a(".userMenu",n).popup("close").remove();var r='<div data-role="popup" class="userMenu tapHoldMenu" data-theme="a">';r+='<ul data-role="listview" style="min-width: 180px;">',r+='<li data-role="list-divider">'+Globalize.translate("HeaderMenu")+"</li>",r+='<li><a href="#" class="btnDelete" data-id="'+i+'">'+Globalize.translate("ButtonCancel")+"</a></li>",r+="</ul>",r+="</div>",n.append(r);var o=a(".userMenu",n).popup({positionTo:e||"window"}).trigger("create").popup("open").on("popupafterclose",function(){a(this).off("popupafterclose").remove()});a(".btnDelete",o).on("click",function(){g(n,this.getAttribute("data-id")),a(".userMenu",n).popup("close").remove()})})}function u(e){var t="",a="card squareCard bottomPaddedCard";t+="<div data-id='"+e.Id+"' class='"+a+"'>",t+='<div class="cardBox visualCardBox">',t+='<div class="cardScalable">',t+='<div class="cardPadder"></div>';var n="#";t+='<a class="cardContent" href="'+n+'">';var i=e.ImageUrl||"css/images/userflyoutdefault.png";return t+='<div class="cardImage" style="background-image:url(\''+i+"');\">",t+="</div>",t+="</a>",t+="</div>",t+='<div class="cardFooter">',t+='<div class="cardText" style="text-align:right; float:right;padding:0;">',t+='<paper-icon-button icon="'+AppInfo.moreIcon+'" class="btnUserMenu"></paper-icon-button>',t+="</div>",t+='<div class="cardText" style="padding-top:10px;padding-bottom:10px;">',t+=e.UserName,t+="</div>",t+="</div>",t+="</div>",t+="</div>"}function p(e,t){t.length?a(".sectionPendingGuests",e).show():a(".sectionPendingGuests",e).hide();var n=t.map(u).join(""),i=a(".pending",e).html(n).trigger("create");a(".btnUserMenu",i).on("click",function(){c(this)})}function g(e,t){Dashboard.showLoadingMsg(),ApiClient.ajax({type:"DELETE",url:ApiClient.getUrl("Connect/Pending",{Id:t})}).then(function(){v(e)})}function v(e){Dashboard.showLoadingMsg(),ApiClient.getUsers().then(function(t){l(e,t),Dashboard.hideLoadingMsg()}),ApiClient.getJSON(ApiClient.getUrl("Connect/Pending")).then(function(t){p(e,t)}),ApiClient.getJSON(ApiClient.getUrl("Library/MediaFolders",{IsHidden:!1})).then(function(t){n(e,t)})}function h(e){Dashboard.showLoadingMsg(),ApiClient.getJSON(ApiClient.getUrl("Channels",{})).then(function(){var t=a(".chkShareFolder:checked",e).get().map(function(e){return e.getAttribute("data-folderid")});ApiClient.ajax({type:"POST",url:ApiClient.getUrl("Connect/Invite"),dataType:"json",data:{ConnectUsername:a("#txtConnectUsername",e).val(),EnabledLibraries:t.join(","),SendingUserId:Dashboard.getCurrentUserId(),EnableLiveTv:!1}}).then(function(t){a("#popupInvite").popup("close"),Dashboard.hideLoadingMsg(),b(e,t)})})}function b(e,t){if(!t.IsNewUserInvitation&&!t.IsPending)return void v(e);var a=t.IsNewUserInvitation?Globalize.translate("MessageInvitationSentToNewUser",t.GuestDisplayName):Globalize.translate("MessageInvitationSentToUser",t.GuestDisplayName);setTimeout(function(){Dashboard.alert({message:a,title:Globalize.translate("HeaderInvitationSent"),callback:function(){v(e)}})},300)}function f(e){Dashboard.getCurrentUser().then(function(t){if(t.ConnectUserId)a("#popupInvite",e).popup("open"),a("#txtConnectUsername",e).val("");else{var n=Globalize.translate("MessageConnectAccountRequiredToInviteGuest");n+="<br/>",n+="<br/>",n+='<a href="useredit.html?userId='+t.Id+'">'+Globalize.translate("ButtonLinkMyEmbyAccount")+"</a>",n+="<br/>",Dashboard.alert({message:n,title:Globalize.translate("HeaderInviteGuest")})}})}function m(){var e=this,t=a(e).parents(".page");return h(t),!1}a(e).on("pageinit","#userProfilesPage",function(){var e=this;a(".btnInvite",e).on("click",function(){f(e)}),a(".btnAddUser",e).on("click",function(){Dashboard.navigate("usernew.html")}),a(".addUserForm").off("submit",m).on("submit",m)}).on("pagebeforeshow","#userProfilesPage",function(){var e=this;v(e)})}(document,window,jQuery);