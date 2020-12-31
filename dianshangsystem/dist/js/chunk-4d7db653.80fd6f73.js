(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4d7db653"],{"1d9f":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"categories"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:{path:"/welcome"}}},[e._v("首页")]),r("el-breadcrumb-item",[e._v("商品管理")]),r("el-breadcrumb-item",[e._v("商品分类")])],1),r("el-card",{staticClass:"m-t-20"},[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.Operation("","Add")}}},[e._v("添加分类")]),r("el-table",{staticClass:"m-t-20",attrs:{data:e.tableData,border:"","row-key":"cat_id","tree-props":{children:"children"}}},[r("el-table-column",{attrs:{label:"#",type:"index",width:"50"}}),r("el-table-column",{attrs:{label:"分类名称",prop:"cat_name"}}),r("el-table-column",{attrs:{label:"是否有效"}},[r("i",{staticClass:"el-icon-success",staticStyle:{color:"lightgreen"}})]),r("el-table-column",{attrs:{label:"排序"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-tag",{directives:[{name:"show",rawName:"v-show",value:0===t.row.cat_level,expression:"scope.row.cat_level === 0"}],attrs:{type:"danger"}},[e._v("一级")]),r("el-tag",{directives:[{name:"show",rawName:"v-show",value:1===t.row.cat_level,expression:"scope.row.cat_level === 1"}],attrs:{type:"success"}},[e._v("二级")]),r("el-tag",{directives:[{name:"show",rawName:"v-show",value:2===t.row.cat_level,expression:"scope.row.cat_level === 2"}],attrs:{type:"warning"}},[e._v("三级")])]}}])}),r("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{size:"mini",type:"primary",icon:"el-icon-edit"},on:{click:function(r){return e.Operation(t.row,"Edit")}}},[e._v("编辑")]),r("el-button",{attrs:{size:"mini",type:"danger",icon:"el-icon-delete"},on:{click:function(r){return e.Operation(t.row,"Delete")}}},[e._v("删除")])]}}])})],1),r("el-pagination",{staticClass:"m-t-20",attrs:{"current-page":e.queryinfo.pagenum,"page-sizes":[5,10,20,30],"page-size":e.queryinfo.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}}),r("el-dialog",{attrs:{title:e.title,visible:e.dialogVisible,width:"50%"},on:{"update:visible":function(t){e.dialogVisible=t},closed:e.handelClose}},[r("el-form",{ref:"categoriesForm",attrs:{model:e.categoriesForm,rules:e.rules,"label-width":"80px"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:"添加分类"===e.title,expression:"title === '添加分类'"}]},[r("el-form-item",{attrs:{label:"分类名称",prop:"cat_name"}},[r("el-input",{model:{value:e.categoriesForm.cat_name,callback:function(t){e.$set(e.categoriesForm,"cat_name",t)},expression:"categoriesForm.cat_name"}})],1),r("el-form-item",{attrs:{label:"父级分类"}},[r("el-cascader",{staticStyle:{width:"100%"},attrs:{"expand-trigger":"hover",options:e.options,props:e.props,clearable:""},on:{change:e.handleChange},model:{value:e.selectedKeys,callback:function(t){e.selectedKeys=t},expression:"selectedKeys"}})],1)],1),r("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"编辑分类"===e.title,expression:"title === '编辑分类'"}],attrs:{label:"分类名称"}},[r("el-input",{model:{value:e.categoriesForm.cat_name,callback:function(t){e.$set(e.categoriesForm,"cat_name",t)},expression:"categoriesForm.cat_name"}})],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(t){e.dialogVisible=!1}}},[e._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.SubmitForm("categoriesForm")}}},[e._v("确 定")])],1)],1)],1)],1)},a=[],o=(r("96cf"),r("1da1")),i={data:function(){return{dialogVisible:!1,queryinfo:{type:3,pagenum:1,pagesize:5},tableData:[],total:0,type:"",message:"",title:"",selectedKeys:[],categoriesForm:{cat_name:"",cat_pid:0,cat_level:0},cat_id:"",rules:{cat_name:[{required:!0,message:"请输入分类名称",trigger:"blur"}]},options:[],props:{checkStrictly:!0,label:"cat_name",value:"cat_id",children:"children"},mode:""}},created:function(){this.Categories()},methods:{Categories:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$http.get("categories",{params:e.queryinfo});case 2:r=t.sent,200==r.meta.status?(e.type="success",e.message="获取商品分类成功！",e.tableData=r.data.result,e.total=r.data.total):(e.type="error",e.message="获取商品分类失败！"),e.$message({type:e.type,message:e.message});case 5:case"end":return t.stop()}}),t)})))()},Operation:function(e,t){var r=this;return Object(o["a"])(regeneratorRuntime.mark((function n(){var a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:n.t0=t,n.next="Add"===n.t0?3:"Edit"===n.t0?11:"Delete"===n.t0?17:19;break;case 3:return r.title="添加分类",r.mode=t,n.next=7,r.$http.get("categories",{params:{type:2}});case 7:return a=n.sent,200==a.meta.status&&(r.options=a.data),r.dialogVisible=!0,n.abrupt("break",19);case 11:return r.title="编辑分类",r.mode=t,r.categoriesForm.cat_name=e.cat_name,r.cat_id=e.cat_id,r.dialogVisible=!0,n.abrupt("break",19);case 17:return r.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(Object(o["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r.$http["delete"]("categories/".concat(e.cat_id));case 2:n=t.sent,200==n.meta.status?(r.type="success",r.message="删除成功！",1===r.tableData.length&&(r.queryinfo.pagenum=r.queryinfo.pagenum-1),r.Categories()):(r.type="error",r.message="error"),r.$message({type:r.type,message:r.message});case 5:case"end":return t.stop()}}),t)}))))["catch"]((function(){r.$message({type:"info",message:"已取消删除"})})),n.abrupt("break",19);case 19:case"end":return n.stop()}}),n)})))()},handleChange:function(e){if(this.selectedKeys.length>0)return this.categoriesForm.cat_pid=this.selectedKeys[this.selectedKeys.length-1],void(this.categoriesForm.cat_level=this.selectedKeys.length);this.categoriesForm.cat_pid=0,this.categoriesForm.cat_level=0},SubmitForm:function(e){var t=this;this.$refs[e].validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(r){var n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!r){e.next=16;break}e.t0=t.mode,e.next="Add"===e.t0?4:"Edit"===e.t0?9:14;break;case 4:return e.next=6,t.$http.post("categories",t.categoriesForm);case 6:return n=e.sent,201==n.meta.status?(t.type="success",t.message="添加分类成功！",t.Categories(),t.dialogVisible=!1):(t.type="error",t.message="添加分类失败！"),e.abrupt("break",14);case 9:return e.next=11,t.$http.put("categories/".concat(t.cat_id),{cat_name:t.categoriesForm.cat_name});case 11:return a=e.sent,200==a.meta.status?(t.type="success",t.message="更新分类名称成功！",t.Categories(),t.dialogVisible=!1):(t.type="error",t.message="更新分类名称失败！"),e.abrupt("break",14);case 14:e.next=18;break;case 16:t.type="error",t.message="请先按要求填写信息！";case 18:t.$message({type:t.type,message:t.message});case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},handleSizeChange:function(e){this.queryinfo.pagesize=e,this.Categories()},handleCurrentChange:function(e){this.queryinfo.pagenum=e,this.Categories()},handelClose:function(){this.categoriesForm.cat_name=""}}},s=i,c=r("2877"),l=Object(c["a"])(s,n,a,!1,null,"70e3fddb",null);t["default"]=l.exports},"1da1":function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));r("d3b7");function n(e,t,r,n,a,o,i){try{var s=e[o](i),c=s.value}catch(l){return void r(l)}s.done?t(c):Promise.resolve(c).then(n,a)}function a(e){return function(){var t=this,r=arguments;return new Promise((function(a,o){var i=e.apply(t,r);function s(e){n(i,a,o,s,c,"next",e)}function c(e){n(i,a,o,s,c,"throw",e)}s(void 0)}))}}},"96cf":function(e,t,r){var n=function(e){"use strict";var t,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{c({},"")}catch(N){c=function(e,t,r){return e[t]=r}}function l(e,t,r,n){var a=t&&t.prototype instanceof g?t:g,o=Object.create(a.prototype),i=new j(n||[]);return o._invoke=E(e,r,i),o}function u(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(N){return{type:"throw",arg:N}}}e.wrap=l;var h="suspendedStart",p="suspendedYield",f="executing",m="completed",d={};function g(){}function v(){}function y(){}var w={};w[o]=function(){return this};var b=Object.getPrototypeOf,_=b&&b(b(S([])));_&&_!==r&&n.call(_,o)&&(w=_);var x=y.prototype=g.prototype=Object.create(w);function k(e){["next","throw","return"].forEach((function(t){c(e,t,(function(e){return this._invoke(t,e)}))}))}function L(e,t){function r(a,o,i,s){var c=u(e[a],e,o);if("throw"!==c.type){var l=c.arg,h=l.value;return h&&"object"===typeof h&&n.call(h,"__await")?t.resolve(h.__await).then((function(e){r("next",e,i,s)}),(function(e){r("throw",e,i,s)})):t.resolve(h).then((function(e){l.value=e,i(l)}),(function(e){return r("throw",e,i,s)}))}s(c.arg)}var a;function o(e,n){function o(){return new t((function(t,a){r(e,n,t,a)}))}return a=a?a.then(o,o):o()}this._invoke=o}function E(e,t,r){var n=h;return function(a,o){if(n===f)throw new Error("Generator is already running");if(n===m){if("throw"===a)throw o;return $()}r.method=a,r.arg=o;while(1){var i=r.delegate;if(i){var s=F(i,r);if(s){if(s===d)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var c=u(e,t,r);if("normal"===c.type){if(n=r.done?m:p,c.arg===d)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=m,r.method="throw",r.arg=c.arg)}}}function F(e,r){var n=e.iterator[r.method];if(n===t){if(r.delegate=null,"throw"===r.method){if(e.iterator["return"]&&(r.method="return",r.arg=t,F(e,r),"throw"===r.method))return d;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var a=u(n,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,d;var o=a.arg;return o?o.done?(r[e.resultName]=o.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,d):o:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function C(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function O(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function j(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(C,this),this.reset(!0)}function S(e){if(e){var r=e[o];if(r)return r.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function r(){while(++a<e.length)if(n.call(e,a))return r.value=e[a],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}return{next:$}}function $(){return{value:t,done:!0}}return v.prototype=x.constructor=y,y.constructor=v,v.displayName=c(y,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,c(e,s,"GeneratorFunction")),e.prototype=Object.create(x),e},e.awrap=function(e){return{__await:e}},k(L.prototype),L.prototype[i]=function(){return this},e.AsyncIterator=L,e.async=function(t,r,n,a,o){void 0===o&&(o=Promise);var i=new L(l(t,r,n,a),o);return e.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},k(x),c(x,s,"Generator"),x[o]=function(){return this},x.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var r in e)t.push(r);return t.reverse(),function r(){while(t.length){var n=t.pop();if(n in e)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=S,j.prototype={constructor:j,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(O),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function a(n,a){return s.type="throw",s.arg=e,r.next=n,a&&(r.method="next",r.arg=t),!!a}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],s=i.completion;if("root"===i.tryLoc)return a("end");if(i.tryLoc<=this.prev){var c=n.call(i,"catchLoc"),l=n.call(i,"finallyLoc");if(c&&l){if(this.prev<i.catchLoc)return a(i.catchLoc,!0);if(this.prev<i.finallyLoc)return a(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return a(i.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return a(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=e,i.arg=t,o?(this.method="next",this.next=o.finallyLoc,d):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),d},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),O(r),d}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var a=n.arg;O(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:S(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),d}},e}(e.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}}}]);
//# sourceMappingURL=chunk-4d7db653.80fd6f73.js.map