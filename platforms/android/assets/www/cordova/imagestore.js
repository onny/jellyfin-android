!function(){function e(e,r){"IMG"!==e.tagName?e.style.backgroundImage="url('"+r+"')":e.setAttribute("src",r)}function r(){var e=DeferredBuilder.Deferred();return t?e.resolveWith(null,[t]):requestFileSystem(PERSISTENT,0,function(r){t=r,e.resolveWith(null,[t])}),e.promise()}function n(){function n(e){var r=e.indexOf("://");return-1!=r&&(e=e.substring(r+3),r=e.indexOf("/"),-1!=r&&(e=e.substring(r+1))),CryptoJS.MD5(e).toString()}function t(e){if(browserInfo.safari){var r=e.indexOf("/Documents");return-1!=r?e.substring(r):e.replace("file://","")}return e}var o=this;o.getImageUrl=function(e){browserInfo.android&&-1!=e.indexOf("tag=")&&(e+="&accept=webp");var o=DeferredBuilder.Deferred(),i=n(e);return r().then(function(r){var n=r.root.toURL()+"/emby/cache/"+i;resolveLocalFileSystemURL(n,function(e){var r=t(e.toURL());o.resolveWith(null,[r])},function(){var r=new FileTransfer;r.download(e,n,function(e){var r=t(e.toURL());o.resolveWith(null,[r])})})}),o.promise()},o.setImageInto=function(r,n){function t(){e(r,n)}o.getImageUrl(n).then(function(n){e(r,n)},t)};window.ImageStore=o}var t;require(["cryptojs-sha1"],function(){new n})}();