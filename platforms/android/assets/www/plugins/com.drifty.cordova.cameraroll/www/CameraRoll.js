cordova.define("com.drifty.cordova.cameraroll.CameraRoll",function(o,a,e){var r=o("cordova/exec"),l={};l.getPhotos=function(o,a){r(o,a,"CameraRoll","getPhotos",[])},l.saveToCameraRoll=function(o,a,e){r(a,e,"CameraRoll","saveToCameraRoll",[o])},e.exports=l});