define(["browser","dom","css!./emby-button","registerElement"],function(t,e){function n(){return t.tv?!1:!0}function i(t,e){for(var n=document.createElement("div"),i=0,s=e.classList.length;s>i;i++)n.classList.add(e.classList[i]+"-ripple-effect");var o=t.offsetX||0,a=t.offsetY||0;o>0&&a>0&&(n.style.left=o+"px",n.style.top=a+"px"),e.appendChild(n),n.addEventListener("animationend",function(){n.parentNode.removeChild(n)},!1)}function s(t){var e=this;requestAnimationFrame(function(){i(t,e)})}function o(t){13==t.keyCode&&s.call(this,t)}var a=Object.create(HTMLButtonElement.prototype);a.createdCallback=function(){this.classList.contains("paper-icon-button-light")||(this.classList.add("paper-icon-button-light"),n()&&(e.addEventListener(this,"keydown",o,{passive:!0}),e.addEventListener(this,"click",s,{passive:!0})))},document.registerElement("paper-icon-button-light",{prototype:a,"extends":"button"})});