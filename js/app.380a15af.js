(function(t){function e(e){for(var n,a,s=e[0],o=e[1],u=e[2],f=0,d=[];f<s.length;f++)a=s[f],Object.prototype.hasOwnProperty.call(i,a)&&i[a]&&d.push(i[a][0]),i[a]=0;for(n in o)Object.prototype.hasOwnProperty.call(o,n)&&(t[n]=o[n]);l&&l(e);while(d.length)d.shift()();return c.push.apply(c,u||[]),r()}function r(){for(var t,e=0;e<c.length;e++){for(var r=c[e],n=!0,s=1;s<r.length;s++){var o=r[s];0!==i[o]&&(n=!1)}n&&(c.splice(e--,1),t=a(a.s=r[0]))}return t}var n={},i={app:0},c=[];function a(e){if(n[e])return n[e].exports;var r=n[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=n,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)a.d(r,n,function(e){return t[e]}.bind(null,n));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],o=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var l=o;c.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"2a5c":function(t,e,r){"use strict";r("992a")},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("7a23"),i={id:"app"},c=Object(n["d"])("h1",{class:"app-title"},"Military Movie Database",-1),a={class:"filter-container"},s={key:0,class:"film-count"},o={key:1,class:"film-count"},u={class:"movie-container"};function l(t,e,r,l,f,d){var p=Object(n["i"])("MovieCard");return Object(n["e"])(),Object(n["c"])("div",i,[c,Object(n["d"])("div",a,[Object(n["m"])(Object(n["d"])("select",{"onUpdate:modelValue":e[1]||(e[1]=function(t){return f.filterStatus=t}),placeholder:"ALL"},[(Object(n["e"])(!0),Object(n["c"])(n["a"],null,Object(n["h"])(f.statusOptions,(function(t){return Object(n["e"])(),Object(n["c"])("option",{key:t},Object(n["j"])(t),1)})),128))],512),[[n["k"],f.filterStatus]]),Object(n["m"])(Object(n["d"])("input",{"onUpdate:modelValue":e[2]||(e[2]=function(t){return f.searchTerm=t}),placeholder:"Search for a film by name"},null,512),[[n["l"],f.searchTerm]]),1===d.listLength?(Object(n["e"])(),Object(n["c"])("div",s,"Showing "+Object(n["j"])(d.listLength)+" film",1)):(Object(n["e"])(),Object(n["c"])("div",o,"Showing "+Object(n["j"])(d.listLength)+" films",1))]),Object(n["d"])("div",u,[(Object(n["e"])(!0),Object(n["c"])(n["a"],null,Object(n["h"])(d.filteredFilms,(function(t){return Object(n["e"])(),Object(n["c"])(p,{key:t.Title+t.Year,Title:t.Title,Remarks:t.Remarks,Year:t.Year,Status:t.Status},null,8,["Title","Remarks","Year","Status"])})),128))])])}r("4de4"),r("a630"),r("d3b7"),r("07ac"),r("4d63"),r("ac1f"),r("25f0"),r("6062"),r("3ca3"),r("466d"),r("ddb0");var f=r("3835"),d=Object(n["n"])("data-v-70d89176");Object(n["g"])("data-v-70d89176");var p={class:"movie-status"},b={class:"movie-title"},h={class:"movie-year"},m={class:"movie-remarks"};Object(n["f"])();var v=d((function(t,e,r,i,c,a){return Object(n["e"])(),Object(n["c"])("div",{class:["movie-card",a.movieStatus]},[Object(n["d"])("div",p,Object(n["j"])(r.Status),1),Object(n["d"])("div",b,Object(n["j"])(r.Title),1),Object(n["d"])("div",h,Object(n["j"])(r.Year),1),Object(n["d"])("div",m,'"'+Object(n["j"])(r.Remarks)+'"',1)],2)})),j={props:["Title","Remarks","Year","Status"],methods:{handleClick:function(){this.count++,1===this.count?this.plural="time":this.plural="times"}},computed:{movieStatus:function(){return"APPROVED"===this.Status?"approved":"DENIED"===this.Status?"denied":"other"}}};r("2a5c");j.render=v,j.__scopeId="data-v-70d89176";var O=j,S=r("5698"),y={name:"App",data:function(){return{searchTerm:"",searchTopic:"",filterStatus:"ALL",movies:[],statusOptions:[],pluralFilms:"films"}},mounted:function(){var t=this;Promise.all([S["b"]("./movies.csv",S["a"])]).then((function(e){var r=Object(f["a"])(e,1),n=r[0];function i(t,e){for(var r=[],n=0;n<t.length-1;n++){var i=Object.values(t)[n][e];r.push(i)}return r}var c=n.filter((function(t){return null!=t.Status&&null!=t.Title})).sort((function(t,e){return t.Title-e.Title}));t.movies=c;var a=Array.from(new Set(i(c,"Status")));a.push("ALL"),t.statusOptions=a.sort()}))},computed:{filteredFilms:function(){var t=new RegExp(this.searchTerm,"i"),e=new RegExp(this.filterStatus,"i");return"ALL"===this.filterStatus&&""===this.searchTerm?this.movies:"ALL"!=this.filterStatus&&""===this.searchTerm?this.movies.filter((function(t){return t.Status.match(e)})):"ALL"===this.filterStatus&&""!=this.searchTerm?this.movies.filter((function(e){return e.Title.toString().match(t)})):this.movies.filter((function(r){return r.Status.match(e)&&r.Title.toString().match(t)}))},listLength:function(){return this.filteredFilms.length}},components:{MovieCard:O}};r("64be");y.render=l;var g=y;Object(n["b"])(g).mount("#app")},"64be":function(t,e,r){"use strict";r("c894")},"992a":function(t,e,r){},c894:function(t,e,r){}});
//# sourceMappingURL=app.380a15af.js.map