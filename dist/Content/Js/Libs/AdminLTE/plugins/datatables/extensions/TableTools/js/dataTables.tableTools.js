var TableTools;!function(window,document,undefined){var factory=function($,DataTable){"use strict";var ZeroClipboard_TableTools={version:"1.0.4-TableTools2",clients:{},moviePath:"",nextId:1,$:function(thingy){return"string"==typeof thingy&&(thingy=document.getElementById(thingy)),thingy.addClass||(thingy.hide=function(){this.style.display="none"},thingy.show=function(){this.style.display=""},thingy.addClass=function(name){this.removeClass(name),this.className+=" "+name},thingy.removeClass=function(name){this.className=this.className.replace(new RegExp("\\s*"+name+"\\s*")," ").replace(/^\s+/,"").replace(/\s+$/,"")},thingy.hasClass=function(name){return!!this.className.match(new RegExp("\\s*"+name+"\\s*"))}),thingy},setMoviePath:function(path){this.moviePath=path},dispatch:function(id,eventName,args){var client=this.clients[id];client&&client.receiveEvent(eventName,args)},register:function(id,client){this.clients[id]=client},getDOMObjectPosition:function(obj){var info={left:0,top:0,width:obj.width?obj.width:obj.offsetWidth,height:obj.height?obj.height:obj.offsetHeight};for(""!==obj.style.width&&(info.width=obj.style.width.replace("px","")),""!==obj.style.height&&(info.height=obj.style.height.replace("px",""));obj;)info.left+=obj.offsetLeft,info.top+=obj.offsetTop,obj=obj.offsetParent;return info},Client:function(elem){this.handlers={},this.id=ZeroClipboard_TableTools.nextId++,this.movieId="ZeroClipboard_TableToolsMovie_"+this.id,ZeroClipboard_TableTools.register(this.id,this),elem&&this.glue(elem)}};return ZeroClipboard_TableTools.Client.prototype={id:0,ready:!1,movie:null,clipText:"",fileName:"",action:"copy",handCursorEnabled:!0,cssEffects:!0,handlers:null,sized:!1,glue:function(elem,title){this.domElement=ZeroClipboard_TableTools.$(elem);var zIndex=99;this.domElement.style.zIndex&&(zIndex=parseInt(this.domElement.style.zIndex,10)+1);var box=ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement);this.div=document.createElement("div");var style=this.div.style;style.position="absolute",style.left="0px",style.top="0px",style.width=box.width+"px",style.height=box.height+"px",style.zIndex=zIndex,"undefined"!=typeof title&&""!==title&&(this.div.title=title),0!==box.width&&0!==box.height&&(this.sized=!0),this.domElement&&(this.domElement.appendChild(this.div),this.div.innerHTML=this.getHTML(box.width,box.height).replace(/&/g,"&amp;"))},positionElement:function(){var box=ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement),style=this.div.style;if(style.position="absolute",style.width=box.width+"px",style.height=box.height+"px",0!==box.width&&0!==box.height){this.sized=!0;var flash=this.div.childNodes[0];flash.width=box.width,flash.height=box.height}},getHTML:function(width,height){var html="",flashvars="id="+this.id+"&width="+width+"&height="+height;if(navigator.userAgent.match(/MSIE/)){var protocol=location.href.match(/^https/i)?"https://":"http://";html+='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="'+protocol+'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="'+width+'" height="'+height+'" id="'+this.movieId+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="'+ZeroClipboard_TableTools.moviePath+'" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="'+flashvars+'"/><param name="wmode" value="transparent"/></object>'}else html+='<embed id="'+this.movieId+'" src="'+ZeroClipboard_TableTools.moviePath+'" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="'+width+'" height="'+height+'" name="'+this.movieId+'" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="'+flashvars+'" wmode="transparent" />';return html},hide:function(){this.div&&(this.div.style.left="-2000px")},show:function(){this.reposition()},destroy:function(){if(this.domElement&&this.div){this.hide(),this.div.innerHTML="";var body=document.getElementsByTagName("body")[0];try{body.removeChild(this.div)}catch(e){}this.domElement=null,this.div=null}},reposition:function(elem){if(elem&&(this.domElement=ZeroClipboard_TableTools.$(elem),this.domElement||this.hide()),this.domElement&&this.div){var box=ZeroClipboard_TableTools.getDOMObjectPosition(this.domElement),style=this.div.style;style.left=""+box.left+"px",style.top=""+box.top+"px"}},clearText:function(){this.clipText="",this.ready&&this.movie.clearText()},appendText:function(newText){this.clipText+=newText,this.ready&&this.movie.appendText(newText)},setText:function(newText){this.clipText=newText,this.ready&&this.movie.setText(newText)},setCharSet:function(charSet){this.charSet=charSet,this.ready&&this.movie.setCharSet(charSet)},setBomInc:function(bomInc){this.incBom=bomInc,this.ready&&this.movie.setBomInc(bomInc)},setFileName:function(newText){this.fileName=newText,this.ready&&this.movie.setFileName(newText)},setAction:function(newText){this.action=newText,this.ready&&this.movie.setAction(newText)},addEventListener:function(eventName,func){eventName=eventName.toString().toLowerCase().replace(/^on/,""),this.handlers[eventName]||(this.handlers[eventName]=[]),this.handlers[eventName].push(func)},setHandCursor:function(enabled){this.handCursorEnabled=enabled,this.ready&&this.movie.setHandCursor(enabled)},setCSSEffects:function(enabled){this.cssEffects=!!enabled},receiveEvent:function(eventName,args){var self;switch(eventName=eventName.toString().toLowerCase().replace(/^on/,"")){case"load":if(this.movie=document.getElementById(this.movieId),!this.movie)return self=this,void setTimeout(function(){self.receiveEvent("load",null)},1);if(!this.ready&&navigator.userAgent.match(/Firefox/)&&navigator.userAgent.match(/Windows/))return self=this,setTimeout(function(){self.receiveEvent("load",null)},100),void(this.ready=!0);this.ready=!0,this.movie.clearText(),this.movie.appendText(this.clipText),this.movie.setFileName(this.fileName),this.movie.setAction(this.action),this.movie.setCharSet(this.charSet),this.movie.setBomInc(this.incBom),this.movie.setHandCursor(this.handCursorEnabled);break;case"mouseover":this.domElement&&this.cssEffects&&this.recoverActive&&this.domElement.addClass("active");break;case"mouseout":this.domElement&&this.cssEffects&&(this.recoverActive=!1,this.domElement.hasClass("active")&&(this.domElement.removeClass("active"),this.recoverActive=!0));break;case"mousedown":this.domElement&&this.cssEffects&&this.domElement.addClass("active");break;case"mouseup":this.domElement&&this.cssEffects&&(this.domElement.removeClass("active"),this.recoverActive=!1)}if(this.handlers[eventName])for(var idx=0,len=this.handlers[eventName].length;idx<len;idx++){var func=this.handlers[eventName][idx];"function"==typeof func?func(this,args):"object"==typeof func&&2==func.length?func[0][func[1]](this,args):"string"==typeof func&&window[func](this,args)}}},window.ZeroClipboard_TableTools=ZeroClipboard_TableTools,function($,window,document){TableTools=function(oDT,oOpts){!this instanceof TableTools&&alert("Warning: TableTools must be initialised with the keyword 'new'");var dtSettings=$.fn.dataTable.Api?new $.fn.dataTable.Api(oDT).settings()[0]:oDT.fnSettings();return this.s={that:this,dt:dtSettings,print:{saveStart:-1,saveLength:-1,saveScroll:-1,funcEnd:function(){}},buttonCounter:0,select:{type:"",selected:[],preRowSelect:null,postSelected:null,postDeselected:null,all:!1,selectedClass:""},custom:{},swfPath:"",buttonSet:[],master:!1,tags:{}},this.dom={container:null,table:null,print:{hidden:[],message:null},collection:{collection:null,background:null}},this.classes=$.extend(!0,{},TableTools.classes),this.s.dt.bJUI&&$.extend(!0,this.classes,TableTools.classes_themeroller),this.fnSettings=function(){return this.s},"undefined"==typeof oOpts&&(oOpts={}),TableTools._aInstances.push(this),this._fnConstruct(oOpts),this},TableTools.prototype={fnGetSelected:function(filtered){var i,iLen,out=[],data=this.s.dt.aoData,displayed=this.s.dt.aiDisplay;if(filtered)for(i=0,iLen=displayed.length;i<iLen;i++)data[displayed[i]]._DTTT_selected&&out.push(data[displayed[i]].nTr);else for(i=0,iLen=data.length;i<iLen;i++)data[i]._DTTT_selected&&out.push(data[i].nTr);return out},fnGetSelectedData:function(){var i,iLen,out=[],data=this.s.dt.aoData;for(i=0,iLen=data.length;i<iLen;i++)data[i]._DTTT_selected&&out.push(this.s.dt.oInstance.fnGetData(i));return out},fnGetSelectedIndexes:function(filtered){var i,iLen,out=[],data=this.s.dt.aoData,displayed=this.s.dt.aiDisplay;if(filtered)for(i=0,iLen=displayed.length;i<iLen;i++)data[displayed[i]]._DTTT_selected&&out.push(displayed[i]);else for(i=0,iLen=data.length;i<iLen;i++)data[i]._DTTT_selected&&out.push(i);return out},fnIsSelected:function(n){var pos=this.s.dt.oInstance.fnGetPosition(n);return this.s.dt.aoData[pos]._DTTT_selected===!0},fnSelectAll:function(filtered){this._fnRowSelect(filtered?this.s.dt.aiDisplay:this.s.dt.aoData)},fnSelectNone:function(filtered){this._fnRowDeselect(this.fnGetSelectedIndexes(filtered))},fnSelect:function(n){"single"==this.s.select.type?(this.fnSelectNone(),this._fnRowSelect(n)):this._fnRowSelect(n)},fnDeselect:function(n){this._fnRowDeselect(n)},fnGetTitle:function(oConfig){var sTitle="";if("undefined"!=typeof oConfig.sTitle&&""!==oConfig.sTitle)sTitle=oConfig.sTitle;else{var anTitle=document.getElementsByTagName("title");anTitle.length>0&&(sTitle=anTitle[0].innerHTML)}return"¡".toString().length<4?sTitle.replace(/[^a-zA-Z0-9_\u00A1-\uFFFF\.,\-_ !\(\)]/g,""):sTitle.replace(/[^a-zA-Z0-9_\.,\-_ !\(\)]/g,"")},fnCalcColRatios:function(oConfig){var i,iLen,aoCols=this.s.dt.aoColumns,aColumnsInc=this._fnColumnTargets(oConfig.mColumns),aColWidths=[],iWidth=0,iTotal=0;for(i=0,iLen=aColumnsInc.length;i<iLen;i++)aColumnsInc[i]&&(iWidth=aoCols[i].nTh.offsetWidth,iTotal+=iWidth,aColWidths.push(iWidth));for(i=0,iLen=aColWidths.length;i<iLen;i++)aColWidths[i]=aColWidths[i]/iTotal;return aColWidths.join("\t")},fnGetTableData:function(oConfig){if(this.s.dt)return this._fnGetDataTablesData(oConfig)},fnSetText:function(clip,text){this._fnFlashSetText(clip,text)},fnResizeButtons:function(){for(var cli in ZeroClipboard_TableTools.clients)if(cli){var client=ZeroClipboard_TableTools.clients[cli];"undefined"!=typeof client.domElement&&client.domElement.parentNode&&client.positionElement()}},fnResizeRequired:function(){for(var cli in ZeroClipboard_TableTools.clients)if(cli){var client=ZeroClipboard_TableTools.clients[cli];if("undefined"!=typeof client.domElement&&client.domElement.parentNode==this.dom.container&&client.sized===!1)return!0}return!1},fnPrint:function(bView,oConfig){oConfig===undefined&&(oConfig={}),bView===undefined||bView?this._fnPrintStart(oConfig):this._fnPrintEnd()},fnInfo:function(message,time){var info=$("<div/>").addClass(this.classes.print.info).html(message).appendTo("body");setTimeout(function(){info.fadeOut("normal",function(){info.remove()})},time)},fnContainer:function(){return this.dom.container},_fnConstruct:function(oOpts){var that=this;this._fnCustomiseSettings(oOpts),this.dom.container=document.createElement(this.s.tags.container),this.dom.container.className=this.classes.container,"none"!=this.s.select.type&&this._fnRowSelectConfig(),this._fnButtonDefinations(this.s.buttonSet,this.dom.container),this.s.dt.aoDestroyCallback.push({sName:"TableTools",fn:function(){$(that.s.dt.nTBody).off("click.DTTT_Select",that.s.custom.sRowSelector).off("mousedown.DTTT_Select","tr").off("mouseup.DTTT_Select","tr"),$(that.dom.container).empty();var idx=$.inArray(that,TableTools._aInstances);idx!==-1&&TableTools._aInstances.splice(idx,1)}})},_fnCustomiseSettings:function(oOpts){"undefined"==typeof this.s.dt._TableToolsInit&&(this.s.master=!0,this.s.dt._TableToolsInit=!0),this.dom.table=this.s.dt.nTable,this.s.custom=$.extend({},TableTools.DEFAULTS,oOpts),this.s.swfPath=this.s.custom.sSwfPath,"undefined"!=typeof ZeroClipboard_TableTools&&(ZeroClipboard_TableTools.moviePath=this.s.swfPath),this.s.select.type=this.s.custom.sRowSelect,this.s.select.preRowSelect=this.s.custom.fnPreRowSelect,this.s.select.postSelected=this.s.custom.fnRowSelected,this.s.select.postDeselected=this.s.custom.fnRowDeselected,this.s.custom.sSelectedClass&&(this.classes.select.row=this.s.custom.sSelectedClass),this.s.tags=this.s.custom.oTags,this.s.buttonSet=this.s.custom.aButtons},_fnButtonDefinations:function(buttonSet,wrapper){for(var buttonDef,i=0,iLen=buttonSet.length;i<iLen;i++){if("string"==typeof buttonSet[i]){if("undefined"==typeof TableTools.BUTTONS[buttonSet[i]]){alert("TableTools: Warning - unknown button type: "+buttonSet[i]);continue}buttonDef=$.extend({},TableTools.BUTTONS[buttonSet[i]],!0)}else{if("undefined"==typeof TableTools.BUTTONS[buttonSet[i].sExtends]){alert("TableTools: Warning - unknown button type: "+buttonSet[i].sExtends);continue}var o=$.extend({},TableTools.BUTTONS[buttonSet[i].sExtends],!0);buttonDef=$.extend(o,buttonSet[i],!0)}var button=this._fnCreateButton(buttonDef,$(wrapper).hasClass(this.classes.collection.container));button&&wrapper.appendChild(button)}},_fnCreateButton:function(oConfig,bCollectionButton){var nButton=this._fnButtonBase(oConfig,bCollectionButton);if(oConfig.sAction.match(/flash/)){if(!this._fnHasFlash())return!1;this._fnFlashConfig(nButton,oConfig)}else"text"==oConfig.sAction?this._fnTextConfig(nButton,oConfig):"div"==oConfig.sAction?this._fnTextConfig(nButton,oConfig):"collection"==oConfig.sAction&&(this._fnTextConfig(nButton,oConfig),this._fnCollectionConfig(nButton,oConfig));return this.s.dt.iTabIndex!==-1&&$(nButton).attr("tabindex",this.s.dt.iTabIndex).attr("aria-controls",this.s.dt.sTableId).on("keyup.DTTT",function(e){13===e.keyCode&&(e.stopPropagation(),$(this).trigger("click"))}).on("mousedown.DTTT",function(e){oConfig.sAction.match(/flash/)||e.preventDefault()}),nButton},_fnButtonBase:function(o,bCollectionButton){var sTag,sLiner,sClass;bCollectionButton?(sTag=o.sTag&&"default"!==o.sTag?o.sTag:this.s.tags.collection.button,sLiner=o.sLinerTag&&"default"!==o.sLinerTag?o.sLiner:this.s.tags.collection.liner,sClass=this.classes.collection.buttons.normal):(sTag=o.sTag&&"default"!==o.sTag?o.sTag:this.s.tags.button,sLiner=o.sLinerTag&&"default"!==o.sLinerTag?o.sLiner:this.s.tags.liner,sClass=this.classes.buttons.normal);var nButton=document.createElement(sTag),nSpan=document.createElement(sLiner),masterS=this._fnGetMasterSettings();return nButton.className=sClass+" "+o.sButtonClass,nButton.setAttribute("id","ToolTables_"+this.s.dt.sInstance+"_"+masterS.buttonCounter),nButton.appendChild(nSpan),nSpan.innerHTML=o.sButtonText,masterS.buttonCounter++,nButton},_fnGetMasterSettings:function(){if(this.s.master)return this.s;for(var instances=TableTools._aInstances,i=0,iLen=instances.length;i<iLen;i++)if(this.dom.table==instances[i].s.dt.nTable)return instances[i].s},_fnCollectionConfig:function(nButton,oConfig){var nHidden=document.createElement(this.s.tags.collection.container);nHidden.style.display="none",nHidden.className=this.classes.collection.container,oConfig._collection=nHidden,document.body.appendChild(nHidden),this._fnButtonDefinations(oConfig.aButtons,nHidden)},_fnCollectionShow:function(nButton,oConfig){var that=this,oPos=$(nButton).offset(),nHidden=oConfig._collection,iDivX=oPos.left,iDivY=oPos.top+$(nButton).outerHeight(),iWinHeight=$(window).height(),iDocHeight=$(document).height(),iWinWidth=$(window).width(),iDocWidth=$(document).width();nHidden.style.position="absolute",nHidden.style.left=iDivX+"px",nHidden.style.top=iDivY+"px",nHidden.style.display="block",$(nHidden).css("opacity",0);var nBackground=document.createElement("div");nBackground.style.position="absolute",nBackground.style.left="0px",nBackground.style.top="0px",nBackground.style.height=(iWinHeight>iDocHeight?iWinHeight:iDocHeight)+"px",nBackground.style.width=(iWinWidth>iDocWidth?iWinWidth:iDocWidth)+"px",nBackground.className=this.classes.collection.background,$(nBackground).css("opacity",0),document.body.appendChild(nBackground),document.body.appendChild(nHidden);var iDivWidth=$(nHidden).outerWidth(),iDivHeight=$(nHidden).outerHeight();iDivX+iDivWidth>iDocWidth&&(nHidden.style.left=iDocWidth-iDivWidth+"px"),iDivY+iDivHeight>iDocHeight&&(nHidden.style.top=iDivY-iDivHeight-$(nButton).outerHeight()+"px"),this.dom.collection.collection=nHidden,this.dom.collection.background=nBackground,setTimeout(function(){$(nHidden).animate({opacity:1},500),$(nBackground).animate({opacity:.25},500)},10),this.fnResizeButtons(),$(nBackground).click(function(){that._fnCollectionHide.call(that,null,null)})},_fnCollectionHide:function(nButton,oConfig){null!==oConfig&&"collection"==oConfig.sExtends||null!==this.dom.collection.collection&&($(this.dom.collection.collection).animate({opacity:0},500,function(e){this.style.display="none"}),$(this.dom.collection.background).animate({opacity:0},500,function(e){this.parentNode.removeChild(this)}),this.dom.collection.collection=null,this.dom.collection.background=null)},_fnRowSelectConfig:function(){if(this.s.master){var that=this,dt=this.s.dt;this.s.dt.aoOpenRows;$(dt.nTable).addClass(this.classes.select.table),"os"===this.s.select.type&&($(dt.nTBody).on("mousedown.DTTT_Select","tr",function(e){e.shiftKey&&$(dt.nTBody).css("-moz-user-select","none").one("selectstart.DTTT_Select","tr",function(){return!1})}),$(dt.nTBody).on("mouseup.DTTT_Select","tr",function(e){$(dt.nTBody).css("-moz-user-select","")})),$(dt.nTBody).on("click.DTTT_Select",this.s.custom.sRowSelector,function(e){var row="tr"===this.nodeName.toLowerCase()?this:$(this).parents("tr")[0],select=that.s.select,pos=that.s.dt.oInstance.fnGetPosition(row);if(row.parentNode==dt.nTBody&&null!==dt.oInstance.fnGetData(row)){if("os"==select.type)if(e.ctrlKey||e.metaKey)that.fnIsSelected(row)?that._fnRowDeselect(row,e):that._fnRowSelect(row,e);else if(e.shiftKey){var rowIdxs=that.s.dt.aiDisplay.slice(),idx1=$.inArray(select.lastRow,rowIdxs),idx2=$.inArray(pos,rowIdxs);if(0===that.fnGetSelected().length||idx1===-1)rowIdxs.splice($.inArray(pos,rowIdxs)+1,rowIdxs.length);else{if(idx1>idx2){var tmp=idx2;idx2=idx1,idx1=tmp}rowIdxs.splice(idx2+1,rowIdxs.length),rowIdxs.splice(0,idx1)}that.fnIsSelected(row)?(rowIdxs.splice($.inArray(pos,rowIdxs),1),that._fnRowDeselect(rowIdxs,e)):that._fnRowSelect(rowIdxs,e)}else that.fnIsSelected(row)&&1===that.fnGetSelected().length?that._fnRowDeselect(row,e):(that.fnSelectNone(),that._fnRowSelect(row,e));else that.fnIsSelected(row)?that._fnRowDeselect(row,e):"single"==select.type?(that.fnSelectNone(),that._fnRowSelect(row,e)):"multi"==select.type&&that._fnRowSelect(row,e);select.lastRow=pos}}),dt.oApi._fnCallbackReg(dt,"aoRowCreatedCallback",function(tr,data,index){dt.aoData[index]._DTTT_selected&&$(tr).addClass(that.classes.select.row)},"TableTools-SelectAll")}},_fnRowSelect:function(src,e){var i,len,that=this,data=this._fnSelectData(src),anSelected=(0===data.length?null:data[0].nTr,[]);for(i=0,len=data.length;i<len;i++)data[i].nTr&&anSelected.push(data[i].nTr);if(null===this.s.select.preRowSelect||this.s.select.preRowSelect.call(this,e,anSelected,!0)){for(i=0,len=data.length;i<len;i++)data[i]._DTTT_selected=!0,data[i].nTr&&$(data[i].nTr).addClass(that.classes.select.row);null!==this.s.select.postSelected&&this.s.select.postSelected.call(this,anSelected),TableTools._fnEventDispatch(this,"select",anSelected,!0)}},_fnRowDeselect:function(src,e){var i,len,that=this,data=this._fnSelectData(src),anDeselectedTrs=(0===data.length?null:data[0].nTr,[]);for(i=0,len=data.length;i<len;i++)data[i].nTr&&anDeselectedTrs.push(data[i].nTr);if(null===this.s.select.preRowSelect||this.s.select.preRowSelect.call(this,e,anDeselectedTrs,!1)){for(i=0,len=data.length;i<len;i++)data[i]._DTTT_selected=!1,data[i].nTr&&$(data[i].nTr).removeClass(that.classes.select.row);null!==this.s.select.postDeselected&&this.s.select.postDeselected.call(this,anDeselectedTrs),TableTools._fnEventDispatch(this,"select",anDeselectedTrs,!1)}},_fnSelectData:function(src){var pos,i,iLen,out=[];if(src.nodeName)pos=this.s.dt.oInstance.fnGetPosition(src),out.push(this.s.dt.aoData[pos]);else{if("undefined"!=typeof src.length){for(i=0,iLen=src.length;i<iLen;i++)src[i].nodeName?(pos=this.s.dt.oInstance.fnGetPosition(src[i]),out.push(this.s.dt.aoData[pos])):"number"==typeof src[i]?out.push(this.s.dt.aoData[src[i]]):out.push(src[i]);return out}"number"==typeof src?out.push(this.s.dt.aoData[src]):out.push(src)}return out},_fnTextConfig:function(nButton,oConfig){var that=this;null!==oConfig.fnInit&&oConfig.fnInit.call(this,nButton,oConfig),""!==oConfig.sToolTip&&(nButton.title=oConfig.sToolTip),$(nButton).hover(function(){null!==oConfig.fnMouseover&&oConfig.fnMouseover.call(this,nButton,oConfig,null)},function(){null!==oConfig.fnMouseout&&oConfig.fnMouseout.call(this,nButton,oConfig,null)}),null!==oConfig.fnSelect&&TableTools._fnEventListen(this,"select",function(n){oConfig.fnSelect.call(that,nButton,oConfig,n)}),$(nButton).click(function(e){null!==oConfig.fnClick&&oConfig.fnClick.call(that,nButton,oConfig,null,e),null!==oConfig.fnComplete&&oConfig.fnComplete.call(that,nButton,oConfig,null,null),that._fnCollectionHide(nButton,oConfig)})},_fnHasFlash:function(){try{var fo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");if(fo)return!0}catch(e){if(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"]!==undefined&&navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)return!0}return!1},_fnFlashConfig:function(nButton,oConfig){var that=this,flash=new ZeroClipboard_TableTools.Client;null!==oConfig.fnInit&&oConfig.fnInit.call(this,nButton,oConfig),flash.setHandCursor(!0),"flash_save"==oConfig.sAction?(flash.setAction("save"),flash.setCharSet("utf16le"==oConfig.sCharSet?"UTF16LE":"UTF8"),flash.setBomInc(oConfig.bBomInc),flash.setFileName(oConfig.sFileName.replace("*",this.fnGetTitle(oConfig)))):"flash_pdf"==oConfig.sAction?(flash.setAction("pdf"),flash.setFileName(oConfig.sFileName.replace("*",this.fnGetTitle(oConfig)))):flash.setAction("copy"),flash.addEventListener("mouseOver",function(client){null!==oConfig.fnMouseover&&oConfig.fnMouseover.call(that,nButton,oConfig,flash)}),flash.addEventListener("mouseOut",function(client){null!==oConfig.fnMouseout&&oConfig.fnMouseout.call(that,nButton,oConfig,flash)}),flash.addEventListener("mouseDown",function(client){null!==oConfig.fnClick&&oConfig.fnClick.call(that,nButton,oConfig,flash)}),flash.addEventListener("complete",function(client,text){null!==oConfig.fnComplete&&oConfig.fnComplete.call(that,nButton,oConfig,flash,text),that._fnCollectionHide(nButton,oConfig)}),null!==oConfig.fnSelect&&TableTools._fnEventListen(this,"select",function(n){oConfig.fnSelect.call(that,nButton,oConfig,n)}),this._fnFlashGlue(flash,nButton,oConfig.sToolTip)},_fnFlashGlue:function(flash,node,text){var that=this,id=node.getAttribute("id");document.getElementById(id)?flash.glue(node,text):setTimeout(function(){that._fnFlashGlue(flash,node,text)},100)},_fnFlashSetText:function(clip,sData){var asData=this._fnChunkData(sData,8192);clip.clearText();for(var i=0,iLen=asData.length;i<iLen;i++)clip.appendText(asData[i])},_fnColumnTargets:function(mColumns){var i,iLen,aColumns=[],dt=this.s.dt,columns=dt.aoColumns,columnCount=columns.length;if("function"==typeof mColumns){var a=mColumns.call(this,dt);for(i=0,iLen=columnCount;i<iLen;i++)aColumns.push($.inArray(i,a)!==-1)}else if("object"==typeof mColumns){for(i=0,iLen=columnCount;i<iLen;i++)aColumns.push(!1);for(i=0,iLen=mColumns.length;i<iLen;i++)aColumns[mColumns[i]]=!0}else if("visible"==mColumns)for(i=0,iLen=columnCount;i<iLen;i++)aColumns.push(!!columns[i].bVisible);else if("hidden"==mColumns)for(i=0,iLen=columnCount;i<iLen;i++)aColumns.push(!columns[i].bVisible);else if("sortable"==mColumns)for(i=0,iLen=columnCount;i<iLen;i++)aColumns.push(!!columns[i].bSortable);else for(i=0,iLen=columnCount;i<iLen;i++)aColumns.push(!0);return aColumns},_fnNewline:function(oConfig){return"auto"==oConfig.sNewLine?navigator.userAgent.match(/Windows/)?"\r\n":"\n":oConfig.sNewLine},_fnGetDataTablesData:function(oConfig){var i,iLen,j,jLen,aRow,arr,tr,aData=[],sLoopData="",dt=this.s.dt,regex=new RegExp(oConfig.sFieldBoundary,"g"),aColumnsInc=this._fnColumnTargets(oConfig.mColumns),bSelectedOnly="undefined"!=typeof oConfig.bSelectedOnly&&oConfig.bSelectedOnly;if(oConfig.bHeader){for(aRow=[],i=0,iLen=dt.aoColumns.length;i<iLen;i++)aColumnsInc[i]&&(sLoopData=dt.aoColumns[i].sTitle.replace(/\n/g," ").replace(/<.*?>/g,"").replace(/^\s+|\s+$/g,""),sLoopData=this._fnHtmlDecode(sLoopData),aRow.push(this._fnBoundData(sLoopData,oConfig.sFieldBoundary,regex)));aData.push(aRow.join(oConfig.sFieldSeperator))}bSelectedOnly=!0;var aDataIndex,aSelected=this.fnGetSelectedIndexes();for(bSelectedOnly="none"!==this.s.select.type&&bSelectedOnly&&0!==aSelected.length,aDataIndex=bSelectedOnly?aSelected:DataTable.Api?new DataTable.Api(dt).rows(oConfig.oSelectorOpts).indexes().flatten().toArray():dt.oInstance.$("tr",oConfig.oSelectorOpts).map(function(id,row){return dt.oInstance.fnGetPosition(row)}).get(),j=0,jLen=aDataIndex.length;j<jLen;j++){for(tr=dt.aoData[aDataIndex[j]].nTr,aRow=[],i=0,iLen=dt.aoColumns.length;i<iLen;i++)if(aColumnsInc[i]){var mTypeData=dt.oApi._fnGetCellData(dt,aDataIndex[j],i,"display");oConfig.fnCellRender?sLoopData=oConfig.fnCellRender(mTypeData,i,tr,aDataIndex[j])+"":"string"==typeof mTypeData?(sLoopData=mTypeData.replace(/\n/g," "),sLoopData=sLoopData.replace(/<img.*?\s+alt\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s>]+)).*?>/gi,"$1$2$3"),sLoopData=sLoopData.replace(/<.*?>/g,"")):sLoopData=mTypeData+"",sLoopData=sLoopData.replace(/^\s+/,"").replace(/\s+$/,""),sLoopData=this._fnHtmlDecode(sLoopData),aRow.push(this._fnBoundData(sLoopData,oConfig.sFieldBoundary,regex))}aData.push(aRow.join(oConfig.sFieldSeperator)),oConfig.bOpenRows&&(arr=$.grep(dt.aoOpenRows,function(o){return o.nParent===tr}),1===arr.length&&(sLoopData=this._fnBoundData($("td",arr[0].nTr).html(),oConfig.sFieldBoundary,regex),aData.push(sLoopData)))}if(oConfig.bFooter&&null!==dt.nTFoot){for(aRow=[],i=0,iLen=dt.aoColumns.length;i<iLen;i++)aColumnsInc[i]&&null!==dt.aoColumns[i].nTf&&(sLoopData=dt.aoColumns[i].nTf.innerHTML.replace(/\n/g," ").replace(/<.*?>/g,""),sLoopData=this._fnHtmlDecode(sLoopData),aRow.push(this._fnBoundData(sLoopData,oConfig.sFieldBoundary,regex)));aData.push(aRow.join(oConfig.sFieldSeperator))}var _sLastData=aData.join(this._fnNewline(oConfig));return _sLastData},_fnBoundData:function(sData,sBoundary,regex){return""===sBoundary?sData:sBoundary+sData.replace(regex,sBoundary+sBoundary)+sBoundary},_fnChunkData:function(sData,iSize){for(var asReturn=[],iStrlen=sData.length,i=0;i<iStrlen;i+=iSize)i+iSize<iStrlen?asReturn.push(sData.substring(i,i+iSize)):asReturn.push(sData.substring(i,iStrlen));return asReturn},_fnHtmlDecode:function(sData){if(sData.indexOf("&")===-1)return sData;var n=document.createElement("div");return sData.replace(/&([^\s]*?);/g,function(match,match2){return"#"===match.substr(1,1)?String.fromCharCode(Number(match2.substr(1))):(n.innerHTML=match,n.childNodes[0].nodeValue)})},_fnPrintStart:function(oConfig){var that=this,oSetDT=this.s.dt;this._fnPrintHideNodes(oSetDT.nTable),this.s.print.saveStart=oSetDT._iDisplayStart,this.s.print.saveLength=oSetDT._iDisplayLength,oConfig.bShowAll&&(oSetDT._iDisplayStart=0,oSetDT._iDisplayLength=-1,oSetDT.oApi._fnCalculateEnd&&oSetDT.oApi._fnCalculateEnd(oSetDT),oSetDT.oApi._fnDraw(oSetDT)),""===oSetDT.oScroll.sX&&""===oSetDT.oScroll.sY||(this._fnPrintScrollStart(oSetDT),$(this.s.dt.nTable).bind("draw.DTTT_Print",function(){that._fnPrintScrollStart(oSetDT)}));var anFeature=oSetDT.aanFeatures;for(var cFeature in anFeature)if("i"!=cFeature&&"t"!=cFeature&&1==cFeature.length)for(var i=0,iLen=anFeature[cFeature].length;i<iLen;i++)this.dom.print.hidden.push({node:anFeature[cFeature][i],display:"block"}),anFeature[cFeature][i].style.display="none";$(document.body).addClass(this.classes.print.body),""!==oConfig.sInfo&&this.fnInfo(oConfig.sInfo,3e3),oConfig.sMessage&&$("<div/>").addClass(this.classes.print.message).html(oConfig.sMessage).prependTo("body"),this.s.print.saveScroll=$(window).scrollTop(),window.scrollTo(0,0),$(document).bind("keydown.DTTT",function(e){27==e.keyCode&&(e.preventDefault(),that._fnPrintEnd.call(that,e))})},_fnPrintEnd:function(e){var oSetDT=this.s.dt,oSetPrint=this.s.print;this.dom.print;this._fnPrintShowNodes(),""===oSetDT.oScroll.sX&&""===oSetDT.oScroll.sY||($(this.s.dt.nTable).unbind("draw.DTTT_Print"),this._fnPrintScrollEnd()),window.scrollTo(0,oSetPrint.saveScroll),$("div."+this.classes.print.message).remove(),$(document.body).removeClass("DTTT_Print"),oSetDT._iDisplayStart=oSetPrint.saveStart,oSetDT._iDisplayLength=oSetPrint.saveLength,oSetDT.oApi._fnCalculateEnd&&oSetDT.oApi._fnCalculateEnd(oSetDT),oSetDT.oApi._fnDraw(oSetDT),$(document).unbind("keydown.DTTT")},_fnPrintScrollStart:function(){var nTheadSize,nTfootSize,oSetDT=this.s.dt,nScrollHeadInner=oSetDT.nScrollHead.getElementsByTagName("div")[0],nScrollBody=(nScrollHeadInner.getElementsByTagName("table")[0],oSetDT.nTable.parentNode);nTheadSize=oSetDT.nTable.getElementsByTagName("thead"),nTheadSize.length>0&&oSetDT.nTable.removeChild(nTheadSize[0]),null!==oSetDT.nTFoot&&(nTfootSize=oSetDT.nTable.getElementsByTagName("tfoot"),nTfootSize.length>0&&oSetDT.nTable.removeChild(nTfootSize[0])),nTheadSize=oSetDT.nTHead.cloneNode(!0),oSetDT.nTable.insertBefore(nTheadSize,oSetDT.nTable.childNodes[0]),null!==oSetDT.nTFoot&&(nTfootSize=oSetDT.nTFoot.cloneNode(!0),oSetDT.nTable.insertBefore(nTfootSize,oSetDT.nTable.childNodes[1])),""!==oSetDT.oScroll.sX&&(oSetDT.nTable.style.width=$(oSetDT.nTable).outerWidth()+"px",nScrollBody.style.width=$(oSetDT.nTable).outerWidth()+"px",nScrollBody.style.overflow="visible"),""!==oSetDT.oScroll.sY&&(nScrollBody.style.height=$(oSetDT.nTable).outerHeight()+"px",nScrollBody.style.overflow="visible")},_fnPrintScrollEnd:function(){var oSetDT=this.s.dt,nScrollBody=oSetDT.nTable.parentNode;""!==oSetDT.oScroll.sX&&(nScrollBody.style.width=oSetDT.oApi._fnStringToCss(oSetDT.oScroll.sX),nScrollBody.style.overflow="auto"),""!==oSetDT.oScroll.sY&&(nScrollBody.style.height=oSetDT.oApi._fnStringToCss(oSetDT.oScroll.sY),nScrollBody.style.overflow="auto")},_fnPrintShowNodes:function(){for(var anHidden=this.dom.print.hidden,i=0,iLen=anHidden.length;i<iLen;i++)anHidden[i].node.style.display=anHidden[i].display;anHidden.splice(0,anHidden.length)},_fnPrintHideNodes:function(nNode){for(var anHidden=this.dom.print.hidden,nParent=nNode.parentNode,nChildren=nParent.childNodes,i=0,iLen=nChildren.length;i<iLen;i++)if(nChildren[i]!=nNode&&1==nChildren[i].nodeType){var sDisplay=$(nChildren[i]).css("display");"none"!=sDisplay&&(anHidden.push({node:nChildren[i],display:sDisplay}),nChildren[i].style.display="none")}"BODY"!=nParent.nodeName.toUpperCase()&&this._fnPrintHideNodes(nParent)}},TableTools._aInstances=[],TableTools._aListeners=[],TableTools.fnGetMasters=function(){for(var a=[],i=0,iLen=TableTools._aInstances.length;i<iLen;i++)TableTools._aInstances[i].s.master&&a.push(TableTools._aInstances[i]);return a},TableTools.fnGetInstance=function(node){"object"!=typeof node&&(node=document.getElementById(node));for(var i=0,iLen=TableTools._aInstances.length;i<iLen;i++)if(TableTools._aInstances[i].s.master&&TableTools._aInstances[i].dom.table==node)return TableTools._aInstances[i];return null},TableTools._fnEventListen=function(that,type,fn){TableTools._aListeners.push({that:that,type:type,fn:fn})},TableTools._fnEventDispatch=function(that,type,node,selected){for(var listeners=TableTools._aListeners,i=0,iLen=listeners.length;i<iLen;i++)that.dom.table==listeners[i].that.dom.table&&listeners[i].type==type&&listeners[i].fn(node,selected)},TableTools.buttonBase={sAction:"text",sTag:"default",sLinerTag:"default",sButtonClass:"DTTT_button_text",
sButtonText:"Button text",sTitle:"",sToolTip:"",sCharSet:"utf8",bBomInc:!1,sFileName:"*.csv",sFieldBoundary:"",sFieldSeperator:"\t",sNewLine:"auto",mColumns:"all",bHeader:!0,bFooter:!0,bOpenRows:!1,bSelectedOnly:!1,oSelectorOpts:undefined,fnMouseover:null,fnMouseout:null,fnClick:null,fnSelect:null,fnComplete:null,fnInit:null,fnCellRender:null},TableTools.BUTTONS={csv:$.extend({},TableTools.buttonBase,{sAction:"flash_save",sButtonClass:"DTTT_button_csv",sButtonText:"CSV",sFieldBoundary:'"',sFieldSeperator:",",fnClick:function(nButton,oConfig,flash){this.fnSetText(flash,this.fnGetTableData(oConfig))}}),xls:$.extend({},TableTools.buttonBase,{sAction:"flash_save",sCharSet:"utf16le",bBomInc:!0,sButtonClass:"DTTT_button_xls",sButtonText:"Excel",fnClick:function(nButton,oConfig,flash){this.fnSetText(flash,this.fnGetTableData(oConfig))}}),copy:$.extend({},TableTools.buttonBase,{sAction:"flash_copy",sButtonClass:"DTTT_button_copy",sButtonText:"Copy",fnClick:function(nButton,oConfig,flash){this.fnSetText(flash,this.fnGetTableData(oConfig))},fnComplete:function(nButton,oConfig,flash,text){var lines=text.split("\n").length;oConfig.bHeader&&lines--,null!==this.s.dt.nTFoot&&oConfig.bFooter&&lines--;var plural=1==lines?"":"s";this.fnInfo("<h6>Table copied</h6><p>Copied "+lines+" row"+plural+" to the clipboard.</p>",1500)}}),pdf:$.extend({},TableTools.buttonBase,{sAction:"flash_pdf",sNewLine:"\n",sFileName:"*.pdf",sButtonClass:"DTTT_button_pdf",sButtonText:"PDF",sPdfOrientation:"portrait",sPdfSize:"A4",sPdfMessage:"",fnClick:function(nButton,oConfig,flash){this.fnSetText(flash,"title:"+this.fnGetTitle(oConfig)+"\nmessage:"+oConfig.sPdfMessage+"\ncolWidth:"+this.fnCalcColRatios(oConfig)+"\norientation:"+oConfig.sPdfOrientation+"\nsize:"+oConfig.sPdfSize+"\n--/TableToolsOpts--\n"+this.fnGetTableData(oConfig))}}),print:$.extend({},TableTools.buttonBase,{sInfo:"<h6>Print view</h6><p>Please use your browser's print function to print this table. Press escape when finished.</p>",sMessage:null,bShowAll:!0,sToolTip:"View print view",sButtonClass:"DTTT_button_print",sButtonText:"Print",fnClick:function(nButton,oConfig){this.fnPrint(!0,oConfig)}}),text:$.extend({},TableTools.buttonBase),select:$.extend({},TableTools.buttonBase,{sButtonText:"Select button",fnSelect:function(nButton,oConfig){0!==this.fnGetSelected().length?$(nButton).removeClass(this.classes.buttons.disabled):$(nButton).addClass(this.classes.buttons.disabled)},fnInit:function(nButton,oConfig){$(nButton).addClass(this.classes.buttons.disabled)}}),select_single:$.extend({},TableTools.buttonBase,{sButtonText:"Select button",fnSelect:function(nButton,oConfig){var iSelected=this.fnGetSelected().length;1==iSelected?$(nButton).removeClass(this.classes.buttons.disabled):$(nButton).addClass(this.classes.buttons.disabled)},fnInit:function(nButton,oConfig){$(nButton).addClass(this.classes.buttons.disabled)}}),select_all:$.extend({},TableTools.buttonBase,{sButtonText:"Select all",fnClick:function(nButton,oConfig){this.fnSelectAll()},fnSelect:function(nButton,oConfig){this.fnGetSelected().length==this.s.dt.fnRecordsDisplay()?$(nButton).addClass(this.classes.buttons.disabled):$(nButton).removeClass(this.classes.buttons.disabled)}}),select_none:$.extend({},TableTools.buttonBase,{sButtonText:"Deselect all",fnClick:function(nButton,oConfig){this.fnSelectNone()},fnSelect:function(nButton,oConfig){0!==this.fnGetSelected().length?$(nButton).removeClass(this.classes.buttons.disabled):$(nButton).addClass(this.classes.buttons.disabled)},fnInit:function(nButton,oConfig){$(nButton).addClass(this.classes.buttons.disabled)}}),ajax:$.extend({},TableTools.buttonBase,{sAjaxUrl:"/xhr.php",sButtonText:"Ajax button",fnClick:function(nButton,oConfig){var sData=this.fnGetTableData(oConfig);$.ajax({url:oConfig.sAjaxUrl,data:[{name:"tableData",value:sData}],success:oConfig.fnAjaxComplete,dataType:"json",type:"POST",cache:!1,error:function(){alert("Error detected when sending table data to server")}})},fnAjaxComplete:function(json){alert("Ajax complete")}}),div:$.extend({},TableTools.buttonBase,{sAction:"div",sTag:"div",sButtonClass:"DTTT_nonbutton",sButtonText:"Text button"}),collection:$.extend({},TableTools.buttonBase,{sAction:"collection",sButtonClass:"DTTT_button_collection",sButtonText:"Collection",fnClick:function(nButton,oConfig){this._fnCollectionShow(nButton,oConfig)}})},TableTools.buttons=TableTools.BUTTONS,TableTools.classes={container:"DTTT_container",buttons:{normal:"DTTT_button",disabled:"DTTT_disabled"},collection:{container:"DTTT_collection",background:"DTTT_collection_background",buttons:{normal:"DTTT_button",disabled:"DTTT_disabled"}},select:{table:"DTTT_selectable",row:"DTTT_selected selected"},print:{body:"DTTT_Print",info:"DTTT_print_info",message:"DTTT_PrintMessage"}},TableTools.classes_themeroller={container:"DTTT_container ui-buttonset ui-buttonset-multi",buttons:{normal:"DTTT_button ui-button ui-state-default"},collection:{container:"DTTT_collection ui-buttonset ui-buttonset-multi"}},TableTools.DEFAULTS={sSwfPath:"../swf/copy_csv_xls_pdf.swf",sRowSelect:"none",sRowSelector:"tr",sSelectedClass:null,fnPreRowSelect:null,fnRowSelected:null,fnRowDeselected:null,aButtons:["copy","csv","xls","pdf","print"],oTags:{container:"div",button:"a",liner:"span",collection:{container:"div",button:"a",liner:"span"}}},TableTools.defaults=TableTools.DEFAULTS,TableTools.prototype.CLASS="TableTools",TableTools.version="2.2.4",$.fn.dataTable.Api&&$.fn.dataTable.Api.register("tabletools()",function(){var tt=null;return this.context.length>0&&(tt=TableTools.fnGetInstance(this.context[0].nTable)),tt}),"function"==typeof $.fn.dataTable&&"function"==typeof $.fn.dataTableExt.fnVersionCheck&&$.fn.dataTableExt.fnVersionCheck("1.9.0")?$.fn.dataTableExt.aoFeatures.push({fnInit:function(oDTSettings){var init=oDTSettings.oInit,opts=init?init.tableTools||init.oTableTools||{}:{};return new TableTools(oDTSettings.oInstance,opts).dom.container},cFeature:"T",sFeature:"TableTools"}):alert("Warning: TableTools requires DataTables 1.9.0 or newer - www.datatables.net/download"),$.fn.DataTable.TableTools=TableTools}(jQuery,window,document),"function"==typeof $.fn.dataTable&&"function"==typeof $.fn.dataTableExt.fnVersionCheck&&$.fn.dataTableExt.fnVersionCheck("1.9.0")?$.fn.dataTableExt.aoFeatures.push({fnInit:function(oDTSettings){var oOpts="undefined"!=typeof oDTSettings.oInit.oTableTools?oDTSettings.oInit.oTableTools:{},oTT=new TableTools(oDTSettings.oInstance,oOpts);return TableTools._aInstances.push(oTT),oTT.dom.container},cFeature:"T",sFeature:"TableTools"}):alert("Warning: TableTools 2 requires DataTables 1.9.0 or newer - www.datatables.net/download"),$.fn.dataTable.TableTools=TableTools,$.fn.DataTable.TableTools=TableTools,TableTools};"function"==typeof define&&define.amd?define(["jquery","datatables"],factory):"object"==typeof exports?factory(require("jquery"),require("datatables")):jQuery&&!jQuery.fn.dataTable.TableTools&&factory(jQuery,jQuery.fn.dataTable)}(window,document);