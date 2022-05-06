"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      show: false
    };
  }
};
if (!Array) {
  const _easycom_w_popup2 = common_vendor.resolveComponent("w-popup");
  _easycom_w_popup2();
}
const _easycom_w_popup = () => "../../uni_modules/w-popup/components/w-popup/w-popup.js";
if (!Math) {
  _easycom_w_popup();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.show = true),
    b: common_vendor.o(($event) => $data.show = $event),
    c: common_vendor.p({
      ["safe-area-inset-bottom"]: true,
      ["z-index"]: 1200,
      height: 1e3,
      modelValue: $data.show
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Volumes/D/work/sgWxApp/w-popup\u793A\u4F8B/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
