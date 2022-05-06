"use strict";
var common_vendor = require("../../../../common/vendor.js");
var block0 = (Component2) => {
  if (!Component2.wxsCallMethods) {
    Component2.wxsCallMethods = [];
  }
  Component2.wxsCallMethods.push("handlePopup");
};
const _sfc_main = {
  emits: {
    "close": null,
    "open": null,
    "update:modelValue": null
  },
  props: {
    zIndex: {
      type: Number,
      default: 1
    },
    height: {
      type: Number,
      default: 1e3
    },
    value: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    safeAreaInsetBottom: Boolean
  },
  data() {
    return {
      showPopup: false,
      showMask: false
    };
  },
  computed: {
    systemInfo() {
      return common_vendor.index.getSystemInfoSync();
    },
    safeAreaBottom() {
      return this.systemInfo.screenHeight - this.systemInfo.safeArea.bottom;
    },
    popupH() {
      return common_vendor.index.upx2px(this.height) + common_vendor.index.upx2px(50) + (this.safeAreaInsetBottom ? this.safeAreaBottom : 0);
    },
    componentInfo() {
      return {
        moveBtn: common_vendor.index.upx2px(50),
        popupH: this.popupH,
        windowH: this.systemInfo.windowHeight,
        safeAreaBottom: this.safeAreaBottom
      };
    },
    translateY() {
      return this.showPopup ? -this.popupH : 0;
    }
  },
  watch: {
    showPopup(newVal) {
      if (newVal) {
        this.showMask = newVal;
      } else {
        setTimeout(() => {
          this.showMask = newVal;
        }, 200);
      }
    },
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.handlePopup({ show: newVal });
        if (newVal) {
          this.$emit("open");
        } else {
          this.$emit("close");
        }
      }
    }
  },
  methods: {
    handlePopup(res) {
      this.showPopup = res.show;
      this.$emit("update:modelValue", res.show);
    },
    open() {
      this.handlePopup({ show: true });
    },
    close() {
      this.handlePopup({ show: false });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showMask
  }, $data.showMask ? {
    b: common_vendor.n($data.showPopup ? "show-mask" : "hide-mask"),
    c: $props.zIndex - 1,
    d: $options.componentInfo
  } : {}, {
    e: $options.componentInfo,
    f: $data.showPopup ? "auto" : "none",
    g: $props.height + "rpx",
    h: common_vendor.n($props.safeAreaInsetBottom ? "safe-area-inset-bottom" : ""),
    i: `translate3d(0,${$options.translateY}px,0)`,
    j: $options.popupH + "px",
    k: $props.zIndex,
    l: common_vendor.o(() => {
    })
  });
}
if (typeof block0 === "function")
  block0(_sfc_main);
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0d4a68c2"], ["__file", "/Volumes/D/work/sgWxApp/w-popup\u793A\u4F8B/uni_modules/w-popup/components/w-popup/w-popup.vue"]]);
wx.createComponent(Component);
