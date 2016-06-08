define(["dialogHelper","layoutManager","globalize","html!./../icons/nav.html","css!./style.css","emby-button","paper-icon-button-light","emby-input"],function(t,n,e){function o(t,n,e,o){var i=e?"":' tabindex="-1"';return o=o?" autofocus":"",'<button is="paper-icon-button-light" class="'+n+'"'+i+o+'><iron-icon icon="'+t+'"></iron-icon></button>'}return function(i){"string"==typeof i&&(i={title:"",text:i});var a={removeOnClose:!0},r=!1,s=!1;n.tv?(a.size="fullscreen",r=!0,s=!0):(a.modal=!1,a.entryAnimationDuration=160,a.exitAnimationDuration=200);var u=t.createDialog(a);u.classList.add("promptDialog");var l="",c="";return l+='<div class="promptDialogContent">',r&&(l+=o("dialog:arrow-back","btnPromptExit",!1)),i.title&&(l+="<h2>",l+=i.title,l+="</h2>"),l+="<form>",l+='<div class="inputContainer">',l+='<input is="emby-input" type="text" autoFocus class="txtPromptValue" value="'+(i.value||"")+'" label="'+(i.label||"")+'"/>',i.description&&(l+='<div class="fieldDescription">',l+=i.description,l+="</div>"),l+="</div>",l+="<br/>",s?l+='<button is="emby-button" type="submit" class="raised btnSubmit"><iron-icon icon="nav:check"></iron-icon><span>'+e.translate("sharedcomponents#ButtonOk")+"</span></button>":(l+='<div class="buttons">',l+='<button is="emby-button" type="submit" class="btnSubmit">'+e.translate("sharedcomponents#ButtonOk")+"</button>",l+='<button is="emby-button" type="button" class="btnPromptExit">'+e.translate("sharedcomponents#ButtonCancel")+"</button>",l+="</div>"),l+="</form>",l+="</div>",u.innerHTML=l,document.body.appendChild(u),u.querySelector("form").addEventListener("submit",function(n){return c=u.querySelector(".txtPromptValue").value,n.preventDefault(),n.stopPropagation(),setTimeout(function(){t.close(u)},300),!1}),u.querySelector(".btnPromptExit").addEventListener("click",function(){t.close(u)}),t.open(u).then(function(){var t=c;return t?t:Promise.reject()})}});