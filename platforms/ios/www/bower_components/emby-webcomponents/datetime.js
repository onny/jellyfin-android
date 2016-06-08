define(["globalize"],function(e){function t(e,t){var r=/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|([+-])(\d{2}):(\d{2}))?/,a=e.match(r);if(!a)throw"Couldn't parse ISO 8601 date string '"+e+"'";var n=[1,2,3,4,5,6,10,11];for(var o in n)a[n[o]]=parseInt(a[n[o]],10);a[7]=parseFloat(a[7]);var i=Date.UTC(a[1],a[2]-1,a[3],a[4],a[5],a[6]);if(a[7]>0&&(i+=Math.round(1e3*a[7])),"Z"!=a[8]&&a[10]){var u=60*a[10]*60*1e3;a[11]&&(u+=60*a[11]*1e3),"-"==a[9]?i-=u:i+=u}else t===!1&&(i+=6e4*(new Date).getTimezoneOffset());return new Date(i)}function r(e){var t=36e9,r=6e8,a=1e7,n=[],o=e/t;o=Math.floor(o),o&&n.push(o),e-=o*t;var i=e/r;i=Math.floor(i),e-=i*r,10>i&&o&&(i="0"+i),n.push(i);var u=e/a;return u=Math.floor(u),10>u&&(u="0"+u),n.push(u),n.join(":")}function a(t){var r=e.getCurrentLocale();return r&&o?t.toLocaleDateString(r):t.toLocaleDateString()}function n(r){if("string"===(typeof r).toString().toLowerCase())try{r=t(r,!0)}catch(a){return r}var n=e.getCurrentLocale(),i=n&&o?r.toLocaleTimeString(n):r.toLocaleTimeString(),u=i.toLowerCase();if(-1!=u.indexOf("am")||-1!=u.indexOf("pm")){i=u;var g=r.getHours()%12,l=r.getHours()>11?"pm":"am";g||(g=12);var f=r.getMinutes();10>f&&(f="0"+f),i=g+":"+f+l}else{var s=i.split(":");s.length>2&&(s.length-=1,i=s.join(":"))}return i}var o=function(){try{(new Date).toLocaleTimeString("i")}catch(e){return"RangeError"===e.name}return!1}();return{parseISO8601Date:t,getDisplayRunningTime:r,toLocaleDateString:a,getDisplayTime:n}});