﻿(function(){function show(options){require(['paperbuttonstyle'],function(){var id='dlg'+new Date().getTime();var html='';var style="";var windowHeight=$(window).height();if(options.positionTo&&windowHeight>=540){var pos=$(options.positionTo).offset();pos.top+=$(options.positionTo).innerHeight()/2;pos.left+=$(options.positionTo).innerWidth()/2;pos.top-=24;pos.left-=24;pos.top-=(55*options.items.length)/2;pos.left-=80;pos.top-=$(window).scrollTop();pos.left-=$(window).scrollLeft();pos.top=Math.min(pos.top,$(window).height()-300);pos.left=Math.min(pos.left,$(window).width()-300);pos.top=Math.max(pos.top,0);pos.left=Math.max(pos.left,0);style+='position:fixed;top:'+pos.top+'px;left:'+pos.left+'px';}
html+='<paper-dialog id="'+id+'" entry-animation="fade-in-animation" exit-animation="fade-out-animation" with-backdrop style="'+style+'">';if(options.title){html+='<h2>';html+=options.title;html+='</h2>';}
var isScrollable=!$.browser.safari;if(isScrollable){html+='<paper-dialog-scrollable>';}
var renderIcon=options.items.filter(function(o){return o.ironIcon;}).length;for(var i=0,length=options.items.length;i<length;i++){var option=options.items[i];html+='<paper-button class="block menuButton ripple btnOption" data-id="'+option.id+'" style="margin:0;">';if(option.ironIcon){html+='<iron-icon icon="'+option.ironIcon+'"></iron-icon>';}
else if(renderIcon){html+='<iron-icon></iron-icon>';}
html+='<span>'+option.name+'</span>';html+='</paper-button>';}
if(isScrollable){html+='</paper-dialog-scrollable>';}
if(options.showCancel){html+='<div class="buttons">';html+='<paper-button dialog-dismiss>'+Globalize.translate('ButtonCancel')+'</paper-button>';html+='</div>';}
html+='</paper-dialog>';$(document.body).append(html);setTimeout(function(){var dlg=document.getElementById(id);dlg.open();$(dlg).on('iron-overlay-closed',function(){$(this).remove();});$('.btnOption',dlg).on('click',function(){var selectedId=this.getAttribute('data-id');setTimeout(function(){dlg.close();if(options.callback){options.callback(selectedId);}},100);});},100);});}
window.ActionSheetElement={show:show};})();