!function(){"use strict";var translateSubMod=angular.module("translate.sub",[]);translateSubMod.provider("$translate",[function(){var _translations=[],_current="en-US";this.translations=function(lang,obj){angular.isDefined(lang)&&angular.isDefined(obj)&&(_translations[lang]=angular.copy(obj),_current=lang)},this.$get=[function(){return{instant:function(what){return angular.isDefined(what)&&angular.isDefined(_translations[_current][what])?_translations[_current][what]:""}}}]}]),translateSubMod.filter("translate",["$translate",function($translate){return function(what){return $translate.instant(what)}}]);var ctrlrs;try{angular.module("pascalprecht.translate"),ctrlrs=angular.module("dialogs.controllers",["ui.bootstrap.modal","pascalprecht.translate"])}catch(err){ctrlrs=angular.module("dialogs.controllers",["ui.bootstrap.modal","translate.sub"])}ctrlrs.controller("errorDialogCtrl",["$scope","$uibModalInstance","$translate","data",function($scope,$uibModalInstance,$translate,data){$scope.header=angular.isDefined(data.header)?data.header:$translate.instant("DIALOGS_ERROR"),$scope.msg=angular.isDefined(data.msg)?data.msg:$translate.instant("DIALOGS_ERROR_MSG"),$scope.icon=angular.isDefined(data.fa)&&angular.equals(data.fa,!0)?"fa fa-warning":"glyphicon glyphicon-warning-sign",$scope.close=function(){$uibModalInstance.close(),$scope.$destroy()}}]),ctrlrs.controller("waitDialogCtrl",["$scope","$uibModalInstance","$translate","$timeout","data",function($scope,$uibModalInstance,$translate,$timeout,data){$scope.header=angular.isDefined(data.header)?data.header:$translate.instant("DIALOGS_PLEASE_WAIT_ELIPS"),$scope.msg=angular.isDefined(data.msg)?data.msg:$translate.instant("DIALOGS_PLEASE_WAIT_MSG"),$scope.progress=angular.isDefined(data.progress)?data.progress:100,$scope.icon=angular.isDefined(data.fa)&&angular.equals(data.fa,!0)?"fa fa-clock-o":"glyphicon glyphicon-time",$scope.$on("dialogs.wait.complete",function(){$timeout(function(){$uibModalInstance.close(),$scope.$destroy()})}),$scope.$on("dialogs.wait.message",function(evt,args){$scope.msg=angular.isDefined(args.msg)?args.msg:$scope.msg}),$scope.$on("dialogs.wait.progress",function(evt,args){$scope.msg=angular.isDefined(args.msg)?args.msg:$scope.msg,$scope.progress=angular.isDefined(args.progress)?args.progress:$scope.progress}),$scope.getProgress=function(){return{width:$scope.progress+"%"}}}]),ctrlrs.controller("notifyDialogCtrl",["$scope","$uibModalInstance","$translate","data",function($scope,$uibModalInstance,$translate,data){$scope.header=angular.isDefined(data.header)?data.header:$translate.instant("DIALOGS_NOTIFICATION"),$scope.msg=angular.isDefined(data.msg)?data.msg:$translate.instant("DIALOGS_NOTIFICATION_MSG"),$scope.icon=angular.isDefined(data.fa)&&angular.equals(data.fa,!0)?"fa fa-info":"glyphicon glyphicon-info-sign",$scope.close=function(){$uibModalInstance.close(),$scope.$destroy()}}]),ctrlrs.controller("confirmDialogCtrl",["$scope","$uibModalInstance","$translate","data",function($scope,$uibModalInstance,$translate,data){$scope.header=angular.isDefined(data.header)?data.header:$translate.instant("DIALOGS_CONFIRMATION"),$scope.msg=angular.isDefined(data.msg)?data.msg:$translate.instant("DIALOGS_CONFIRMATION_MSG"),$scope.icon=angular.isDefined(data.fa)&&angular.equals(data.fa,!0)?"fa fa-check":"glyphicon glyphicon-check",$scope.no=function(){$uibModalInstance.dismiss("no")},$scope.yes=function(){$uibModalInstance.close("yes")}}]),angular.module("dialogs.services",["ui.bootstrap.modal","dialogs.controllers"]).provider("dialogs",[function(){var _b=!0,_k=!0,_w="dialogs-default",_bdc="dialogs-backdrop-default",_copy=!0,_wTmpl=null,_wSize="lg",_animation=!1,_fa=!1,_setOpts=function(opts){var _opts={};return opts=opts||{},_opts.kb=angular.isDefined(opts.keyboard)?!!opts.keyboard:_k,_opts.bd=angular.isDefined(opts.backdrop)?opts.backdrop:_b,_opts.bdc=angular.isDefined(opts.backdropClass)?opts.backdropClass:_bdc,_opts.ws=!angular.isDefined(opts.size)||"sm"!==opts.size&&"lg"!==opts.size&&"md"!==opts.size?_wSize:opts.size,_opts.wc=angular.isDefined(opts.windowClass)?opts.windowClass:_w,_opts.anim=angular.isDefined(opts.animation)?!!opts.animation:_animation,_opts};this.useBackdrop=function(val){angular.isDefined(val)&&(_b=val)},this.useEscClose=function(val){angular.isDefined(val)&&(_k=!(angular.equals(val,0)||angular.equals(val,"false")||angular.equals(val,"no")||angular.equals(val,null)||angular.equals(val,!1)))},this.useClass=function(val){angular.isDefined(val)&&(_w=val)},this.useCopy=function(val){angular.isDefined(val)&&(_copy=!(angular.equals(val,0)||angular.equals(val,"false")||angular.equals(val,"no")||angular.equals(val,null)||angular.equals(val,!1)))},this.setWindowTmpl=function(val){angular.isDefined(val)&&(_wTmpl=val)},this.setSize=function(val){angular.isDefined(val)&&(_wSize=angular.equals(val,"sm")||angular.equals(val,"lg")||angular.equals(val,"md")?val:_wSize)},this.useAnimation=function(){_animation=!0},this.useFontAwesome=function(){_fa=!0},this.$get=["$uibModal",function($uibModal){return{error:function(header,msg,opts){return opts=_setOpts(opts),$uibModal.open({templateUrl:"/dialogs/error.html",controller:"errorDialogCtrl",backdrop:opts.bd,backdropClass:opts.bdc,keyboard:opts.kb,windowClass:opts.wc,size:opts.ws,animation:opts.anim,resolve:{data:function(){return{header:angular.copy(header),msg:angular.copy(msg),fa:_fa}}}})},wait:function(header,msg,progress,opts){return opts=_setOpts(opts),$uibModal.open({templateUrl:"/dialogs/wait.html",controller:"waitDialogCtrl",backdrop:opts.bd,backdropClass:opts.bdc,keyboard:opts.kb,windowClass:opts.wc,size:opts.ws,animation:opts.anim,resolve:{data:function(){return{header:angular.copy(header),msg:angular.copy(msg),progress:angular.copy(progress),fa:_fa}}}})},notify:function(header,msg,opts){return opts=_setOpts(opts),$uibModal.open({templateUrl:"/dialogs/notify.html",controller:"notifyDialogCtrl",backdrop:opts.bd,backdropClass:opts.bdc,keyboard:opts.kb,windowClass:opts.wc,size:opts.ws,animation:opts.anim,resolve:{data:function(){return{header:angular.copy(header),msg:angular.copy(msg),fa:_fa}}}})},confirm:function(header,msg,opts){return opts=_setOpts(opts),$uibModal.open({templateUrl:"/dialogs/confirm.html",controller:"confirmDialogCtrl",backdrop:opts.bd,backdropClass:opts.bdc,keyboard:opts.kb,windowClass:opts.wc,size:opts.ws,animation:opts.anim,resolve:{data:function(){return{header:angular.copy(header),msg:angular.copy(msg),fa:_fa}}}})},create:function(url,ctrlr,data,opts,ctrlAs){var copy=opts&&angular.isDefined(opts.copy)?opts.copy:_copy;return opts=_setOpts(opts),$uibModal.open({templateUrl:url,controller:ctrlr,controllerAs:ctrlAs,keyboard:opts.kb,backdrop:opts.bd,backdropClass:opts.bdc,windowClass:opts.wc,size:opts.ws,animation:opts.anim,resolve:{data:function(){return copy?angular.copy(data):data}}})}}}]}]),angular.module("dialogs.main",["dialogs.services","ngSanitize"]).config(["$translateProvider","dialogsProvider",function($translateProvider,dialogsProvider){try{angular.module("pascalprecht.translate")}catch(err){$translateProvider.translations("en-US",{DIALOGS_ERROR:"Error",DIALOGS_ERROR_MSG:"An unknown error has occurred.",DIALOGS_CLOSE:"Close",DIALOGS_PLEASE_WAIT:"Please Wait",DIALOGS_PLEASE_WAIT_ELIPS:"Please Wait...",DIALOGS_PLEASE_WAIT_MSG:"Waiting on operation to complete.",DIALOGS_PERCENT_COMPLETE:"% Complete",DIALOGS_NOTIFICATION:"Notification",DIALOGS_NOTIFICATION_MSG:"Unknown application notification.",DIALOGS_CONFIRMATION:"Confirmation",DIALOGS_CONFIRMATION_MSG:"Confirmation required.",DIALOGS_OK:"OK",DIALOGS_YES:"Yes",DIALOGS_NO:"No"})}try{var _sheets=document.styleSheets;sheetLoop:for(var i=_sheets.length-1;i>=0;i--){var _matches=null,_rules=null;if(!_sheets[i].disabled){if(null!==_sheets[i].href&&(_matches=_sheets[i].href.match(/font\-*awesome/i)),angular.isArray(_matches)){dialogsProvider.useFontAwesome();break}_rules=_sheets[i].cssRules;for(var x=_rules.length-1;x>=0;x--)if("string"==typeof _rules[x].selectorText&&".fa"===_rules[x].selectorText.toLowerCase()){dialogsProvider.useFontAwesome();break sheetLoop}}}}catch(err){}}]).run(["$templateCache","$interpolate",function($templateCache,$interpolate){var startSym=$interpolate.startSymbol(),endSym=$interpolate.endSymbol();$templateCache.put("/dialogs/error.html",'<div class="modal-header dialog-header-error"><button type="button" class="close" ng-click="close()">&times;</button><h4 class="modal-title text-danger"><span class="'+startSym+"icon"+endSym+'"></span> <span ng-bind-html="header"></span></h4></div><div class="modal-body text-danger" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="close()">'+startSym+'"DIALOGS_CLOSE" | translate'+endSym+"</button></div>"),$templateCache.put("/dialogs/wait.html",'<div class="modal-header dialog-header-wait"><h4 class="modal-title"><span class="'+startSym+"icon"+endSym+'"></span> '+startSym+"header"+endSym+'</h4></div><div class="modal-body"><p ng-bind-html="msg"></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" ng-style="getProgress()"></div><span class="sr-only">'+startSym+"progress"+endSym+startSym+'"DIALOGS_PERCENT_COMPLETE" | translate'+endSym+"</span></div></div>"),$templateCache.put("/dialogs/notify.html",'<div class="modal-header dialog-header-notify"><button type="button" class="close" ng-click="close()" class="pull-right">&times;</button><h4 class="modal-title text-info"><span class="'+startSym+"icon"+endSym+'"></span> '+startSym+"header"+endSym+'</h4></div><div class="modal-body text-info" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="close()">'+startSym+'"DIALOGS_OK" | translate'+endSym+"</button></div>"),$templateCache.put("/dialogs/confirm.html",'<div class="modal-header dialog-header-confirm"><button type="button" class="close" ng-click="no()">&times;</button><h4 class="modal-title"><span class="'+startSym+"icon"+endSym+'"></span> '+startSym+"header"+endSym+'</h4></div><div class="modal-body" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="yes()">'+startSym+'"DIALOGS_YES" | translate'+endSym+'</button><button type="button" class="btn btn-primary" ng-click="no()">'+startSym+'"DIALOGS_NO" | translate'+endSym+"</button></div>")}])}();