!function(t){var e={},n=function(t){if(!t)for(var o in e)t=e[o].id;if(t){var i=e[t];return i?i:e[t]=new n.Api(t)}return null};n.Api=function(o){function i(){s.resize()}var r,a,s=this;this.id=o,this.container=document.getElementById(o),this.config=null,this.setup=function(e){r=null,a=!1;var s={mode:"html5",flash:"coverflow.swf",width:480,height:270,item:0,backgroundcolor:"000000",backgroundopacity:1,wmode:"window",gradientcolor:void 0,coverwidth:150,coverheight:"auto",covergap:40,coverangle:70,coverdepth:170,coveroffset:130,removeblackborder:!1,fixedsize:!1,opacitydecrease:.1,reflectionopacity:.3,reflectionratio:155,reflectionoffset:0,showduration:!1,showtext:!0,textstyle:".coverflow-text{color:#f1f1f1;text-align:center;font-family:Arial Rounded MT Bold,Arial;} .coverflow-text h1{font-size:14px;font-weight:normal;line-height:21px;} .coverflow-text h2{font-size:11px;font-weight:normal;} .coverflow-text a{color:#0000EE;}",textoffset:75,tweentime:.8,rotatedelay:0,focallength:250,framerate:60,mousewheel:!0,x:0,y:0};return this.events={ready:new n.Signal,playlist:new n.Signal,focus:new n.Signal,click:new n.Signal,fadeIn:new n.Signal,fadeOut:new n.Signal},this.config=n.Utils.extend(s,e),this.config.id=this.id,this.container=document.getElementById(o),this.container.innerHTML="",this.container.tabIndex=0,n.Utils.addClass(this.container,"coverflow"),-1!==String(this.config.width).indexOf("%")&&(n.Utils.off(t,"resize",i),n.Utils.on(t,"resize",i)),this.resize(this.config.width,this.config.height),"html5"===this.getMode()?r=new n.html5(this):"flash"===this.getMode()&&(r=new n.flash(this)),this.left=r.left,this.right=r.right,this.prev=r.prev,this.next=r.next,this.to=r.to,this.fadeIn=r.fadeIn,this.fadeOut=r.fadeOut,this},this.remove=function(){var o=document.createElement("div");o.id=this.id,this.container.parentNode.replaceChild(o,this.container),this.container=o,n.Utils.off(t,"resize",i),r&&r.destroy(),delete e[this.id]},this.resize=function(t,e){n.Utils.css(this.container,{width:t,height:e}),this.config.width=this.container.clientWidth,this.config.height=this.container.clientHeight,r&&r.resize(this.config.width,this.config.height)},this.getMode=function(){return n.Utils.hasFlash&&"flash"===this.config.mode?"flash":!n.Utils.isIE&&n.Modernizr.csstransforms3d&&n.Modernizr.csstransitions&&n.Modernizr.canvas?"html5":"flash"},this.on=function(t,e){this.events[t].on(e),a&&"ready"===t&&this.events.ready.trigger.apply(this)},this.off=function(t,e){this.events[t].off(e)},this.trigger=function(t){a=!0;var e=Array.prototype.slice.call(arguments);e.shift(),this.events[t].trigger.apply(this,e)}},"undefined"!=typeof jQuery&&(jQuery.fn.coverflow=function(t){var e=n(this[0].id);return e[t]?e[t].apply(e,Array.prototype.slice.call(arguments,1)):"object"==typeof t?e.setup.apply(e,arguments):t?($.error("Method "+t+" does not exist on jQuery.coverflow"),void 0):e}),t.coverflow=n}(window),function(t){t.flash=function(t){function e(){var e='<object id="'+t.id+'-coverflow-flash" data="'+t.config.flash+'" width="100%" height="100%" type="application/x-shockwave-flash">'+'<param name="movie" value="'+t.config.flash+'" />'+'<param name="wmode" value="'+t.config.wmode+'" />'+'<param name="allowscriptaccess" value="always" />'+'<param name="flashvars" value="'+n(t.config)+'" />'+'<a href="http://get.adobe.com/flashplayer/">Get Adobe Flash player</a>'+"</object>";t.container.innerHTML=e,o=document.getElementById(t.id+"-coverflow-flash")}function n(t){var e="";for(var n in t)e+="object"==typeof t[n]?n+"="+encodeURIComponent("[[JSON]]"+JSON.stringify(t[n]))+"&":n+"="+encodeURIComponent(t[n])+"&";return e.slice(0,-1)}var o;this.resize=function(t,e){o.apiResize(t,e)},this.left=function(){o.apiLeft()},this.right=function(){o.apiRight()},this.prev=function(){o.apiPrev()},this.next=function(){o.apiNext()},this.to=function(t){o.apiTo(t)},this.fadeIn=function(e){t.events.fadeIn.off().on(e),o.apiFadeIn()},this.fadeOut=function(e){t.events.fadeOut.off().on(e),o.apiFadeOut()},this.destroy=function(){},e()}}(coverflow),function(t){t.html5=function(e){function n(){var n=document.createElement("style");n.type="text/css",document.getElementsByTagName("head")[0].appendChild(n),n.appendChild(document.createTextNode(y.textstyle));var i=t.Utils.hexToRgb(y.backgroundcolor);y.backgroundcolor="rgba("+i.r+","+i.g+","+i.b+","+y.backgroundopacity+")",g.style.backgroundColor=y.backgroundcolor,void 0!==y.gradientcolor&&(i=t.Utils.hexToRgb(y.gradientcolor),y.gradientcolor="rgba("+i.r+","+i.g+","+i.b+","+y.backgroundopacity+")",g.style.background="-webkit-gradient(linear, left top, left bottom, from("+y.gradientcolor+"), to("+y.backgroundcolor+"))"),e.trigger("ready"),e.events.playlist.on(o);var r=new t.PlaylistLoader(e);r.load(e.config.playlist)}function o(e){h=e,y.coverheight="auto"==y.coverheight?y.height:y.coverheight,d&&d.destroy(),d=new t.CoverFlow(g,h,y),g.appendChild(d.el),u&&g.removeChild(u),y.showtext===!0&&(u=document.createElement("div"),t.Utils.addClass(u,"coverflow-text"),g.appendChild(u)),d.onFocus(r),d.onClick(a),v.resize(y.width,y.height),y.rotatedelay>0&&(p&&v.stopRotation(),p=setInterval(s,y.rotatedelay),g.addEventListener("touchstart",v.stopRotation,!1),g.addEventListener("mousedown",v.stopRotation,!1)),g.addEventListener("webkitTransitionEnd",f,!1),g.addEventListener("transitionend",f,!1),y.mousewheel&&(g.addEventListener("mousewheel",i),g.addEventListener("DOMMouseScroll",i))}function i(t){t.preventDefault();var e=t.detail?-120*t.detail:t.wheelDelta,n=Math.ceil(Math.abs(e)/120);if(n>0){var o=Math.abs(e)/e,i=null;if(o>0?i=v.left:0>o&&(i=v.right),"function"==typeof i)for(var r=0;n>r;r++)i()}}function r(t){if(y.showtext===!0){var n=h[t];n&&(u.innerHTML="<h1>"+(void 0===n.title?"":n.title)+"</h1><h2>"+(void 0===n.description?"":n.description)+"</h2>")}e.trigger("focus",t,h[t]?h[t].link:void 0)}function a(t){y.rotatedelay>0&&p&&v.stopRotation(),e.trigger("click",t,h[t]?h[t].link:void 0)}function s(){d.next()}function c(){g.style.opacity=1}function l(){u&&(u.style.opacity=0),d.fadeOut(function(){g.style.opacity=0})}function f(t){t.target===g&&(0===parseInt(g.style.opacity,10)?e.events.fadeOut.trigger():(u&&(u.style.opacity=1),d.fadeIn(function(){e.events.fadeIn.trigger()})))}var h,d,u,p,v=this,g=e.container,y=e.config;this.stopRotation=function(){g.removeEventListener("touchstart",v.stopRotation,!1),g.removeEventListener("mousedown",v.stopRotation,!1),clearInterval(p)},this.resize=function(t,e){d&&d.resize(t,e),u&&(u.style.top=e-y.textoffset+"px")},this.left=function(){d.left()},this.right=function(){d.right()},this.prev=function(){d.prev()},this.next=function(){d.next()},this.to=function(t){d.to(t)},this.fadeIn=function(t){e.events.fadeIn.off().on(t),c()},this.fadeOut=function(t){e.events.fadeOut.off().on(t),l()},this.destroy=function(){d&&d.destroy()},n()}}(coverflow),function(t){t.CoverFlow=function(e,n,o){function i(t){t.stopPropagation(),0===parseInt(y.el.firstChild.style.opacity,10)?(s.el.style.opacity=0,c.trigger()):1===parseInt(y.el.firstChild.style.opacity,10)&&l.trigger()}function r(t){if(0===t.button){for(var e=this,n=0;null!==(e=e.previousSibling);)n+=1;var o=s.covers[n],i=t.offsetY||t.layerY;i<o.halfHeight&&(t.preventDefault(),o.index!=u?s.to(o.index):s.clicked(o.index))}}function a(t){var e=t.target;if("INPUT"!=e.tagName&&"SELECT"!=e.tagName&&"TEXTAREA"!=e.tagName&&-1!==[37,39,38,40,32].indexOf(t.keyCode))switch(t.preventDefault(),t.keyCode){case 37:s.left();break;case 39:s.right();break;case 38:s.to(0);break;case 40:s.to(f-1);break;case 32:s.clicked(u)}}var s=this;this.config=o;var c=new t.Signal,l=new t.Signal,f=n.length,h=0,d=0,u=0,p=[],v=[];this.covers=[],this.transforms=[],this.prevF=-1,this.transformProp=t.Modernizr.prefixed("transform"),this.space=o.coveroffset+o.covergap,this._angle="rotateY("+-o.coverangle+"deg)",this.angle="rotateY("+o.coverangle+"deg)",this.offsetX=0,this.offsetY=0,this.el=document.createElement("div"),this.el.className="coverflow-wrap",this.tray=document.createElement("div"),this.tray.className="coverflow-tray",this.el.appendChild(this.tray),this.el.style[t.Modernizr.prefixed("perspective")]=o.focallength+"px";for(var g=new t.Controller(this,this.tray,this.config),y=null,m=0;f>m;m++)y=new t.Cover(s,m,n[m].image,n[m].duration,o),this.tray.appendChild(y.el),y.el.addEventListener("mousedown",r),y.el.style[t.Modernizr.prefixed("transitionDuration")]=this.config.tweentime+"s",this.covers[m]=y;y&&(y.el.firstChild.addEventListener("webkitTransitionEnd",i,!1),y.el.firstChild.addEventListener("transitionend",i,!1)),e.addEventListener("touchstart",g,!0),e.addEventListener("keydown",a,!1),this.fadeOut=function(t){c.off().on(t);for(var e=0;e<this.covers.length;e++)this.covers[e].el.firstChild.style.opacity=0},this.fadeIn=function(t){l.off().on(t),s.el.style.opacity=1;for(var e=0;e<this.covers.length;e++)this.covers[e].el.firstChild.style.opacity=1},this.itemComplete=function(t){if(d=t>d?t:d,h+=1,h==f){s.to(o.item);for(var e=0;f>e;e++)this.covers[e].setY(d)}},this.left=function(){u>0&&s.to(u-1)},this.right=function(){f-1>u&&s.to(u+1)},this.prev=function(){u>0?s.to(u-1):s.to(f-1)},this.next=function(){f-1>u?s.to(u+1):s.to(0)},this.to=function(t){var e;"string"==typeof t&&(e=/^([+-])=(\d)/.exec(t))&&(t=(e[1]+1)*e[2]+u),t>f-1?t=f-1:0>t&&(t=0),u=t,g.to(t)},this.focused=function(t){for(var e=0;e<p.length;e++)p[e](t)},this.clicked=function(t){for(var e=0;e<v.length;e++)v[e](t)},this.onFocus=function(t){p.push(t)},this.onClick=function(t){v.push(t)},this.destroy=function(){e.removeChild(s.el),e.removeEventListener("touchstart",g,!0),e.removeEventListener("keydown",a,!1)},this.resize=function(){this.offsetX=.5*o.width+o.x,this.offsetY=.5*o.height+o.y,this.setTrayStyle(g.currentX+this.offsetX,this.offsetY)}},t.CoverFlow.prototype.updateTouchEnd=function(t){var e=this.getFocusedCover(t.currentX);t.currentX=-e*this.config.covergap,this.update(t.currentX)},t.CoverFlow.prototype.getFocusedCover=function(t){var e=-Math.round(t/this.config.covergap);return Math.min(Math.max(e,0),this.covers.length-1)},t.CoverFlow.prototype.getFocusedCoverOne=function(t){var e=-Math.round(t/this.config.covergap);return Math.min(Math.max(e,-1),this.covers.length)},t.CoverFlow.prototype.tap=function(t,e,n){var o=-Math.round(n/this.config.covergap),i=this.covers[o];if(i.el==t.target.parentNode){var r=this.findPos(this.tray),a=r.y+this.offsetY+i.halfHeight/2;a>e&&this.clicked(i.index)}},t.CoverFlow.prototype.findPos=function(t){var e=0,n=0;if(t.offsetParent){do e+=t.offsetLeft,n+=t.offsetTop;while(null!==(t=t.offsetParent));return{x:e,y:n}}},t.CoverFlow.prototype.setTrayStyle=function(t,e){this.tray.style[this.transformProp]="translate3d("+t+"px, "+e+"px, 0)"},t.CoverFlow.prototype.setCoverStyle=function(t,e,n){this.transforms[e]!=n&&(t.el.style[this.transformProp]=n,this.transforms[e]=n)},t.CoverFlow.prototype.getCoverTransform=function(t,e){var n=e*this.config.covergap;return t==e?"translate3d("+n+"px, 0, 0)":e>t?"translate3d("+(n+this.space)+"px, 0, "+-this.config.coverdepth+"px) "+this._angle:"translate3d("+(n-this.space)+"px, 0, "+-this.config.coverdepth+"px) "+this.angle},t.CoverFlow.prototype.update=function(t){this.setTrayStyle(t+this.offsetX,this.offsetY);var e=this.getFocusedCoverOne(t);e!=this.prevF&&(this.focused(e),this.prevF=e);for(var n=0;n<this.covers.length;n++)this.setCoverStyle(this.covers[n],n,this.getCoverTransform(e,n))}}(coverflow),function(t){t.Cover=function(e,n,o,i,r){function a(){var n,o=p.width,a=p.height,v=0,g=0,y=0;if(r.removeblackborder){var m=document.createElement("canvas");m.width=o,m.height=a,n=m.getContext("2d"),n.drawImage(p,0,0);for(var w=n.getImageData(0,0,o,a).data,x=0,C=0,b=0,E=0;a>E;E++){for(x=0,C=0;o>C;C++)b=4*(E*o+C),x+=w[b]<<16|w[b+1]<<8|w[b+2];if(!(460551>x/o))break;v++}for(E=a-1;E>=0;E--){for(x=0,C=0;o>C;C++)b=4*(E*o+C),x+=w[b]<<16|w[b+1]<<8|w[b+2];if(!(460551>x/o))break;g++}a-=v+g}var k;if(r.fixedsize?(s=Math.round(f),c=Math.round(h),c/a>s/o?(k=c/a,y+=.5*(o-s/k)):(k=s/o,v+=.5*(a-c/k))):f>=h?(s=Math.round(o/a*h),c=Math.round(h),k=h/a):(s=Math.round(f),c=Math.round(a/o*f),k=f/o),l.halfHeight=c,d.top=-(.5*c)+"px",d.left=-(.5*s)+"px",d.width=s+"px",d.height=c+"px",u.width=s,u.height=2*c,n=u.getContext("2d"),n.drawImage(p,y,v,o-2*y,a-2*v,0,0,s,c),r.showduration&&i>0){n.save();var M=t.Cover.formatTime(i);n.font="normal 10px Arial Rounded MT Bold, Arial";var T=n.measureText(M),I=T.width;n.roundRect(s-(I+9),5,I+4,11,2),n.fillStyle="#000",n.globalAlpha=.7,n.fill(),n.fillStyle="#fff",n.globalAlpha=.8,n.textAlign="right",n.fillText(M,s-7,14),n.restore()}r.reflectionopacity>0&&(d.height=2*c+"px",t.Cover.reflect(u,s,c,r.reflectionopacity,r.reflectionratio,r.reflectionoffset)),e.itemComplete(c)}var s,c,l=this,f=r.coverwidth,h=r.coverheight;this.index=n,this.halfHeight=0,this.el=document.createElement("div"),this.el.className=t.Cover.getClassName();var d=this.el.style;1===r.backgroundopacity&&(d.backgroundColor=r.backgroundcolor);var u=document.createElement("canvas");this.el.appendChild(u);var p=new Image;p.onload=a,p.src=o,this.setY=function(t){var e=.5*t-(t-c);this.el.style.top=-e+"px"}},t.Cover.getClassName=function(){return"coverflow-cell"},t.Cover.reflect=function(t,e,n,o,i,r){var a=t.getContext("2d");a.save(),a.scale(1,-1),a.drawImage(t,0,2*-n-r),a.restore(),a.globalCompositeOperation="destination-out";var s=a.createLinearGradient(0,0,0,n);s.addColorStop(i/255,"rgba(255, 255, 255, 1.0)"),s.addColorStop(0,"rgba(255, 255, 255, "+(1-o)+")"),a.translate(0,n+r),a.fillStyle=s,a.fillRect(0,0,e,n)},t.Cover.formatTime=function(t){var e=Math.floor(t/3600),n=Math.floor(t%3600/60),o=Math.floor(t%3600%60);return(0===e?"":e.toString()+":")+n.toString()+":"+(10>o?"0"+o.toString():o.toString())},window.CanvasRenderingContext2D&&CanvasRenderingContext2D.prototype&&(CanvasRenderingContext2D.prototype.roundRect=function(t,e,n,o,i){return 2*i>n&&(i=n/2),2*i>o&&(i=o/2),this.beginPath(),this.moveTo(t+i,e),this.arcTo(t+n,e,t+n,e+o,i),this.arcTo(t+n,e+o,t,e+o,i),this.arcTo(t,e+o,t,e,i),this.arcTo(t,e,t+n,e,i),this.closePath(),this})}(coverflow),function(t){t.Controller=function(e,n,o){this.flow=e,this.elem=n,this.config=o,this.currentX=0,this.currentY=0,this.transformProp=t.Modernizr.prefixed("transitionDuration")},t.Controller.prototype.handleEvent=function(t){this[t.type](t)},t.Controller.prototype.touchstart=function(t){t.stopImmediatePropagation(),this.startX=t.touches[0].pageX-this.currentX,this.startY=t.touches[0].pageY-this.currentY,this.pageY=t.touches[0].pageY,this.moved=!1,window.addEventListener("touchmove",this,!0),window.addEventListener("touchend",this,!0),this.elem.style[this.transformProp]="0s"},t.Controller.prototype.touchmove=function(t){t.stopImmediatePropagation(),this.lastX=this.currentX,this.lastY=this.currentY,this.currentX=t.touches[0].pageX-this.startX,this.currentY=t.touches[0].pageY-this.startY,Math.abs(this.currentX-this.lastX)>Math.abs(this.currentY-this.lastY)?(t.preventDefault(),this.moved=!0,this.lastMoveTime=(new Date).getTime(),this.flow.update(this.currentX)):(window.removeEventListener("touchmove",this,!0),window.removeEventListener("touchend",this,!0))},t.Controller.prototype.touchend=function(t){if(t.stopImmediatePropagation(),window.removeEventListener("touchmove",this,!0),window.removeEventListener("touchend",this,!0),this.elem.style[this.transformProp]=this.config.tweentime+"s",this.moved){t.preventDefault();var e=this.currentX-this.lastX,n=(new Date).getTime()-this.lastMoveTime+1;this.currentX=this.currentX+50*e/n,this.flow.updateTouchEnd(this)}else this.flow.tap(t,this.pageY,this.currentX)},t.Controller.prototype.to=function(t){this.currentX=-t*this.config.covergap,this.flow.update(this.currentX)}}(coverflow),function(t){t.PlaylistLoader=function(e){function n(t){var n=[];if(r.hasOwnProperty("route")){r.route.hasOwnProperty("playlist")&&(t=t[r.route.playlist]);for(var i=0;i<t.length;i++)n[i]={image:o(t[i],"image"),title:o(t[i],"title"),description:o(t[i],"description"),link:o(t[i],"link"),duration:o(t[i],"duration")}}e.events.playlist.trigger(n),e.events.playlist.off()}function o(t,e){if(r.route.hasOwnProperty(e)){for(var n=t,o=r.route[e].split("."),i=0;i<o.length;i++)n=n[o[i]];return n}return t[e]}function i(t){var n=JSON.parse(t.responseText);e.events.playlist.trigger(n),e.events.playlist.off()}var r=e.config;this.load=function(o){"string"==typeof o?-1!==o.indexOf("callback=?")?t.Utils.jsonp(o,n):t.Utils.ajax(o,i):"object"==typeof o&&(e.events.playlist.trigger(o),e.events.playlist.off())}}}(coverflow),function(t){t.Signal=function(){var t=[];this.on=function(e){return t.push(e),this},this.trigger=function(){for(var e=Array.prototype.slice.call(arguments),n=0;n<t.length;n++)"function"==typeof t[n]&&t[n].apply(this,e);return this},this.off=function(e){if(e)for(var n=0;n<t.length;n++)t[n]===e&&(t.splice(n,1),n--);else t=[];return this}}}(coverflow),function(t){var e=0;t.Utils={hasFlash:"undefined"!=typeof navigator.plugins&&"object"==typeof navigator.plugins["Shockwave Flash"]||window.ActiveXObject&&new ActiveXObject("ShockwaveFlash.ShockwaveFlash")!==!1,isIE:null!==navigator.userAgent.match(/msie/i),uniqueId:function(t){var n=e++;return t?t+n:n},ajax:function(t,e,n){var o;o=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),o.onreadystatechange=function(){4===o.readyState&&(200===o.status?e&&e(o):n&&n(t))};try{o.open("GET",t,!0),o.send(null)}catch(i){n&&n(t)}return o},jsonp:function(e,n,o){var i=-1===e.indexOf("?")?"?":"&";o=o||{};for(var r in o)o.hasOwnProperty(r)&&(i+=encodeURIComponent(r)+"="+encodeURIComponent(o[r])+"&");var a=t.Utils.uniqueId("json_call");window[a]=function(t){n(t),window[a]=null};var s=document.createElement("script");s.src=-1!==e.indexOf("callback=?")?e.replace("callback=?","callback="+a)+i.slice(0,-1):e+i+"callback="+a,s.async=!0,s.onload=s.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(s.onload=s.onreadystatechange=null,s&&s.parentNode&&s.parentNode.removeChild(s))};var c=document.head||document.getElementsByTagName("head")[0]||document.documentElement;c.insertBefore(s,c.firstChild)},extend:function(t,e){for(var n in e)e[n]&&e[n].constructor&&e[n].constructor===Object?(t[n]=t[n]||{},arguments.callee(t[n],e[n])):t[n]=e[n];return t},css:function(t,e){if(t)for(var n in e)if("undefined"!=typeof e[n]){if("number"==typeof e[n]&&"zIndex"!=n&&"opacity"!=n){if(isNaN(e[n]))continue;e[n]=Math.ceil(e[n])+"px"}try{t.style[n]=e[n]}catch(o){}}},addClass:function(t,e){-1===t.className.indexOf(e)&&(t.className+=" "+e)},hexToRgb:function(t){var e=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;t=t.replace(e,function(t,e,n,o){return e+e+n+n+o+o});var n=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return n?{r:parseInt(n[1],16),g:parseInt(n[2],16),b:parseInt(n[3],16)}:null},on:function(t,e,n){if(null!==t&&void 0!==t)for(var o=e.split(" "),i=0;i<o.length;i++)t.addEventListener?t.addEventListener(o[i],n,!1):t.attachEvent?t.attachEvent("on"+o[i],n):t["on"+o[i]]=n},off:function(t,e,n){if(null!==t&&void 0!==t)for(var o=e.split(" "),i=0;i<o.length;i++)t.removeEventListener?t.removeEventListener(o[i],n,!1):t.detachEvent?t.detachEvent("on"+o[i],n):t["on"+o[i]]=null}}}(coverflow),Array.indexOf||(Array.prototype.indexOf=function(t){for(var e=0;e<this.length;e++)if(this[e]==t)return e;return-1}),coverflow.Modernizr=function(t,e,n){function o(t){y.cssText=t}function i(t,e){return typeof t===e}function r(t,e){return!!~(""+t).indexOf(e)}function a(t,e){for(var o in t){var i=t[o];if(!r(i,"-")&&y[i]!==n)return"pfx"==e?i:!0}return!1}function s(t,e,o){for(var r in t){var a=e[t[r]];if(a!==n)return o===!1?t[r]:i(a,"function")?a.bind(o||e):a}return!1}function c(t,e,n){var o=t.charAt(0).toUpperCase()+t.slice(1),r=(t+" "+x.join(o+" ")+o).split(" ");return i(e,"string")||i(e,"undefined")?a(r,e):(r=(t+" "+C.join(o+" ")+o).split(" "),s(r,e,n))}var l,f,h,d="2.6.2",u={},p=e.documentElement,v="modernizr",g=e.createElement(v),y=g.style,m=({}.toString," -webkit- -moz- -o- -ms- ".split(" ")),w="Webkit Moz O ms",x=w.split(" "),C=w.toLowerCase().split(" "),b={},E=[],k=E.slice,M=function(t,n,o,i){var r,a,s,c,l=e.createElement("div"),f=e.body,h=f||e.createElement("body");if(parseInt(o,10))for(;o--;)s=e.createElement("div"),s.id=i?i[o]:v+(o+1),l.appendChild(s);return r=["&#173;",'<style id="s',v,'">',t,"</style>"].join(""),l.id=v,(f?l:h).innerHTML+=r,h.appendChild(l),f||(h.style.background="",h.style.overflow="hidden",c=p.style.overflow,p.style.overflow="hidden",p.appendChild(h)),a=n(l,t),f?l.parentNode.removeChild(l):(h.parentNode.removeChild(h),p.style.overflow=c),!!a},T={}.hasOwnProperty;h=i(T,"undefined")||i(T.call,"undefined")?function(t,e){return e in t&&i(t.constructor.prototype[e],"undefined")}:function(t,e){return T.call(t,e)},Function.prototype.bind||(Function.prototype.bind=function(t){var e=this;if("function"!=typeof e)throw new TypeError;var n=k.call(arguments,1),o=function(){if(this instanceof o){var i=function(){};i.prototype=e.prototype;var r=new i,a=e.apply(r,n.concat(k.call(arguments)));return Object(a)===a?a:r}return e.apply(t,n.concat(k.call(arguments)))};return o}),b.canvas=function(){var t=e.createElement("canvas");return!!t.getContext&&!!t.getContext("2d")},b.canvastext=function(){return!!u.canvas&&!!i(e.createElement("canvas").getContext("2d").fillText,"function")},b.csstransforms3d=function(){var t=!!c("perspective");return t&&"webkitPerspective"in p.style&&M("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(e){t=9===e.offsetLeft&&3===e.offsetHeight}),t},b.csstransitions=function(){return c("transition")};for(var I in b)h(b,I)&&(f=I.toLowerCase(),u[f]=b[I](),E.push((u[f]?"":"no-")+f));return u.addTest=function(t,e){if("object"==typeof t)for(var o in t)h(t,o)&&u.addTest(o,t[o]);else{if(t=t.toLowerCase(),u[t]!==n)return u;e="function"==typeof e?e():e,"undefined"!=typeof enableClasses&&enableClasses&&(p.className+=" "+(e?"":"no-")+t),u[t]=e}return u},o(""),g=l=null,u._version=d,u._prefixes=m,u._domPrefixes=C,u._cssomPrefixes=x,u.testProp=function(t){return a([t])},u.testAllProps=c,u.testStyles=M,u.prefixed=function(t,e,n){return e?c(t,e,n):c(t,"pfx")},u}(this,this.document);