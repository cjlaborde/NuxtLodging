(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{160:function(t,e,n){"use strict";e.a=function(t){return new Date(t).toLocaleDateString(void 0,{month:"long",year:"numeric"})}},173:function(t,e,n){"use strict";n.r(e);var r=n(160),o={props:{user:{type:Object,required:!0}},methods:{shortDate:r.a}},c=n(28),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"app-background-grey"},[n("div",{staticClass:"app-wrapper app-padded-vertical"},[n("div",{staticClass:"app-host-header"},[n("div",[n("img",{attrs:{src:t.user.image}})]),t._v(" "),n("div",[n("div",{staticClass:"app-host-name"},[t._v("\n                    "+t._s(t.user.name)+"\n                ")]),t._v(" "),n("div",{staticClass:"app-host-date"},[t._v("\n                    Joined in "+t._s(t.shortDate(t.user.joined))+"\n                ")]),t._v(" "),n("div",{staticClass:"app-flex"},[n("div",{staticClass:"app-host-reviews"},[t._v("\n                        "+t._s(t.user.reviewCount)+" reviews\n                    ")])])])]),t._v(" "),n("div",{staticClass:"app-host-description"},[t._v(t._s(t.user.description))])])])}),[],!1,null,null,null);e.default=component.exports}}]);