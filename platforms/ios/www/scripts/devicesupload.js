define(["jQuery"],function(e){function a(a,t){e("#txtUploadPath",a).val(t.CameraUploadPath||""),e("#chkSubfolder",a).checked(t.EnableCameraUploadSubfolders)}function t(e){Dashboard.showLoadingMsg(),ApiClient.getNamedConfiguration("devices").then(function(t){a(e,t),Dashboard.hideLoadingMsg()})}function n(a){ApiClient.getNamedConfiguration("devices").then(function(t){t.CameraUploadPath=e("#txtUploadPath",a).val(),t.EnableCameraUploadSubfolders=e("#chkSubfolder",a).checked(),ApiClient.updateNamedConfiguration("devices",t).then(Dashboard.processServerConfigurationUpdateResult)})}function o(){var a=this,t=e(a).parents(".page");return n(t),!1}function i(){return[{href:"syncactivity.html",name:Globalize.translate("TabSyncJobs")},{href:"devicesupload.html",name:Globalize.translate("TabCameraUpload")},{href:"syncsettings.html",name:Globalize.translate("TabSettings")}]}e(document).on("pageinit","#devicesUploadPage",function(){var a=this;e("#btnSelectUploadPath",a).on("click.selectDirectory",function(){require(["directorybrowser"],function(t){var n=new t;n.show({callback:function(t){t&&e("#txtUploadPath",a).val(t),n.close()},header:Globalize.translate("HeaderSelectUploadPath")})})}),e(".devicesUploadForm").off("submit",o).on("submit",o)}).on("pageshow","#devicesUploadPage",function(){LibraryMenu.setTabs("syncadmin",1,i);var e=this;t(e)})});