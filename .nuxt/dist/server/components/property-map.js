exports.ids = [7];
exports.modules = {

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/PropertyMap.vue?vue&type=template&id=d16cbb48&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._ssrNode("<div class=\"app-wrapper app-padded-vertical\"><h2 class=\"app-subtitle\">Location</h2> <p class=\"app-description\">"+_vm._ssrEscape("\n            "+_vm._s(_vm.home.location.address)+"\n            "+_vm._s(_vm.home.location.city)+" \n            "+_vm._s(_vm.home.location.state)+" \n            "+_vm._s(_vm.home.location.country)+"\n        ")+"</p> <div class=\"app-map\"></div></div>")])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/PropertyMap.vue?vue&type=template&id=d16cbb48&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/PropertyMap.vue?vue&type=script&lang=js&
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
/* harmony default export */ var PropertyMapvue_type_script_lang_js_ = ({
  props: {
    home: {
      type: Object,
      required: true
    }
  },

  mounted() {
    // we use map instead of google maps so that in the future we may switch to something else and only need to change code inside the plugin
    this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng);
  }

});
// CONCATENATED MODULE: ./components/PropertyMap.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_PropertyMapvue_type_script_lang_js_ = (PropertyMapvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./components/PropertyMap.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_PropertyMapvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  "4d0f796c"
  
)

/* harmony default export */ var PropertyMap = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=property-map.js.map