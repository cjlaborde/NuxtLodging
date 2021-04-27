exports.ids = [4];
exports.modules = {

/***/ 17:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ((number, singularWord) => {
  const text = `${number} ${singularWord}`;
  if (number == 1) return text;
  return text + 's';
});

/***/ }),

/***/ 25:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/PropertyDetails.vue?vue&type=template&id=99a531b6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"app-wrapper"},[_vm._ssrNode("<div class=\"app-double-column app-property-details\"><div><h1>"+_vm._ssrEscape(_vm._s(_vm.home.title))+"</h1> <div class=\"app-flex\"><div class=\"app-address\">"+_vm._ssrEscape("\n                  "+_vm._s(_vm.home.location.address)+" "+_vm._s(_vm.home.location.city)+" "+_vm._s(_vm.home.location.state)+" "+_vm._s(_vm.home.location.country)+"\n                ")+"</div> <div class=\"app-rating\">"+_vm._ssrEscape("\n                    "+_vm._s(_vm.home.reviewValue)+" ")+"<span>"+_vm._ssrEscape(_vm._s(_vm.home.reviewCount))+"</span></div></div> <div class=\"app-property-details-footer\">"+_vm._ssrEscape("\n              "+_vm._s(_vm.pluralize(_vm.home.guests, "guest"))+" ·\n              "+_vm._s(_vm.pluralize(_vm.home.bedrooms, "room"))+" ·\n              "+_vm._s(_vm.pluralize(_vm.home.beds, "bed"))+" ·\n              "+_vm._s(_vm.pluralize(_vm.home.bathrooms, "bath"))+"\n            ")+"</div></div> <div><div class=\"app-price\">"+_vm._ssrEscape("\n              $"+_vm._s(_vm.home.pricePerNight))+"<span> / night</span></div> <div class=\"app-search\"><input type=\"text\" placeholder=\"Check in\" class=\"datepicker\"> <input type=\"text\" placeholder=\"Check out\" class=\"datepicker\"></div> <button class=\"app-big-button\">Request to book!</button></div></div>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/PropertyDetails.vue?vue&type=template&id=99a531b6&

// EXTERNAL MODULE: ./utils/pluralize.js
var pluralize = __webpack_require__(17);

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/PropertyDetails.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var PropertyDetailsvue_type_script_lang_js_ = ({
  props: {
    home: {
      type: Object,
      required: true
    }
  },
  methods: {
    pluralize: pluralize["a" /* default */]
  }
});
// CONCATENATED MODULE: ./components/PropertyDetails.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PropertyDetailsvue_type_script_lang_js_ = (PropertyDetailsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./components/PropertyDetails.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_PropertyDetailsvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "28ebdba0"
  
)

/* harmony default export */ var PropertyDetails = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=property-details.js.map