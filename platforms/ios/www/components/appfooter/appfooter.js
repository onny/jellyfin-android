define(["css!./appfooter"],function(){function e(){var e=document.createElement("div");return e.classList.add("appfooter"),document.body.appendChild(e),e}function n(e,n){require(["headroom-window"],function(e){self.headroom=e,e.add(n)})}function t(t){var o=this;o.element=e(t),o.add=function(e){o.element.appendChild(e)},o.insert=function(e){"string"==typeof e?o.element.insertAdjacentHTML("afterbegin",e):o.element.insertBefore(e,o.element.firstChild)},n(o,o.element)}return t.prototype.destroy=function(){var e=this;e.headroom&&(e.headroom.remove(e.element),e.headroom=null),e.element=null},t});