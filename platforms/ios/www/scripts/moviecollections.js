define(["events","libraryBrowser","imageLoader","alphaPicker","listView","cardBuilder","emby-itemscontainer"],function(e,t,a,r,n,i){return function(e,o,l){function s(e){var a=c(e),r=S[a];return r||(r=S[a]={query:{SortBy:"SortName",SortOrder:"Ascending",IncludeItemTypes:"BoxSet",Recursive:!0,Fields:"PrimaryImageAspectRatio,SortName",ImageTypeLimit:1,EnableImageTypes:"Primary,Backdrop,Banner,Thumb",StartIndex:0,Limit:h},view:t.getSavedView(a)||"Poster"},t.loadSavedQueryValues(a,r.query)),r}function u(e){return s(e).query}function c(e){return e.savedQueryKey||(e.savedQueryKey=t.getSavedQueryKey("movies")),e.savedQueryKey}function d(){var e=g.getCurrentViewStyle(),t=l.querySelector(".itemsContainer");"List"==e?(t.classList.add("vertical-list"),t.classList.remove("vertical-wrap")):(t.classList.remove("vertical-list"),t.classList.add("vertical-wrap")),t.innerHTML=""}function m(e){Dashboard.showLoadingMsg();var r=u(e);ApiClient.getItems(Dashboard.getCurrentUserId(),r).then(function(o){function s(){r.StartIndex+=r.Limit,m(l)}function u(){r.StartIndex-=r.Limit,m(l)}window.scrollTo(0,0),v(e);var d,y=LibraryBrowser.getQueryPagingHtml({startIndex:r.StartIndex,limit:r.Limit,totalRecordCount:o.TotalRecordCount,showLimit:!1,updatePageSizeSetting:!1,addLayoutButton:!1,sortButton:!1,filterButton:!1}),h=g.getCurrentViewStyle();d="Thumb"==h?i.getCardsHtml({items:o.Items,shape:"backdrop",preferThumb:!0,context:"movies",lazy:!0,overlayPlayButton:!0,showTitle:!0}):"ThumbCard"==h?i.getCardsHtml({items:o.Items,shape:"backdrop",preferThumb:!0,context:"movies",lazy:!0,cardLayout:!0,showTitle:!0,showItemCounts:!0}):"Banner"==h?i.getCardsHtml({items:o.Items,shape:"banner",preferBanner:!0,context:"movies",lazy:!0}):"List"==h?n.getListViewHtml({items:o.Items,context:"movies",sortBy:r.SortBy}):i.getCardsHtml("PosterCard"==h?{items:o.Items,shape:"auto",context:"movies",showTitle:!0,showYear:!0,lazy:!0,cardLayout:!0,showItemCounts:!0}:{items:o.Items,shape:"auto",context:"movies",centerText:!0,lazy:!0,overlayPlayButton:!0,showTitle:!0});var S,f,p=l.querySelectorAll(".paging");for(S=0,f=p.length;f>S;S++)p[S].innerHTML=y;for(p=l.querySelectorAll(".btnNextPage"),S=0,f=p.length;f>S;S++)p[S].addEventListener("click",s);for(p=l.querySelectorAll(".btnPreviousPage"),S=0,f=p.length;f>S;S++)p[S].addEventListener("click",u);o.Items.length||(d='<p style="text-align:center;">'+Globalize.translate("MessageNoCollectionsAvailable")+"</p>");var w=l.querySelector(".itemsContainer");w.innerHTML=d,a.lazyChildren(w),t.saveQueryValues(c(e),r),Dashboard.hideLoadingMsg()})}function v(e){var t=u(e);g.alphaPicker.value(t.NameStartsWithOrGreater)}function y(e){var a=e.querySelector(".alphaPicker");a.addEventListener("alphavaluechanged",function(t){var a=t.detail.value,r=u(e);r.NameStartsWithOrGreater=a,r.StartIndex=0,m(e)}),g.alphaPicker=new r({element:a,valueChangeEvent:"click"}),e.querySelector(".btnSort").addEventListener("click",function(a){t.showSortMenu({items:[{name:Globalize.translate("OptionNameSort"),id:"SortName"},{name:Globalize.translate("OptionImdbRating"),id:"CommunityRating,SortName"},{name:Globalize.translate("OptionDateAdded"),id:"DateCreated,SortName"},{name:Globalize.translate("OptionParentalRating"),id:"OfficialRating,SortName"},{name:Globalize.translate("OptionReleaseDate"),id:"PremiereDate,SortName"}],callback:function(){u(e).StartIndex=0,m(e)},query:u(e),button:a.target})});var n=e.querySelector(".btnSelectView");n.addEventListener("click",function(e){t.showLayoutMenu(e.target,g.getCurrentViewStyle(),"List,Poster,PosterCard,Thumb,ThumbCard".split(","))}),n.addEventListener("layoutchange",function(a){var r=a.detail.viewStyle;s(e).view=r,t.saveViewSetting(c(e),r),u(e).StartIndex=0,d(),m(e)}),e.querySelector(".btnNewCollection").addEventListener("click",function(){require(["collectionEditor"],function(e){var t=ApiClient.serverInfo().Id;(new e).show({items:[],serverId:t})})})}var g=this,h=t.getDefaultPageSize(),S={};g.getCurrentViewStyle=function(){return s(l).view},y(l),d(),g.renderTab=function(){m(l),v(l)},g.destroy=function(){}}});