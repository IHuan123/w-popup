(function(vue) {
  "use strict";
  function _interopNamespace(e) {
    if (e && e.__esModule)
      return e;
    var n = { __proto__: null, [Symbol.toStringTag]: "Module" };
    if (e) {
      Object.keys(e).forEach(function(k) {
        if (k !== "default") {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function() {
              return e[k];
            }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }
  var vue__namespace = /* @__PURE__ */ _interopNamespace(vue);
  var block0 = (Comp) => {
    (Comp.$wxs || (Comp.$wxs = [])).push("popup");
    (Comp.$wxsModules || (Comp.$wxsModules = {}))["popup"] = "7a918bfa";
  };
  var _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$2 = {
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
      }
    },
    data() {
      return {
        showPopup: false
      };
    },
    computed: {
      systemInfo() {
        return uni.getSystemInfoSync();
      },
      componentInfo() {
        return {
          moveBtn: uni.upx2px(50),
          popupH: uni.upx2px(this.height),
          windowH: this.systemInfo.windowHeight
        };
      },
      top() {
        return this.showPopup ? this.componentInfo.windowH - this.componentInfo.popupH : this.componentInfo.windowH;
      }
    },
    watch: {
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
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "popup-container",
      onTouchmove: _cache[4] || (_cache[4] = vue.withModifiers(() => {
      }, ["stop", "prevent"]))
    }, [
      $data.showPopup ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: vue.normalizeClass(["mask"]),
        style: vue.normalizeStyle({ zIndex: $props.zIndex - 1 }),
        catchtouchmove: true,
        "data-component-info": $options.componentInfo,
        onClick: _cache[0] || (_cache[0] = (...args) => _ctx.popup.closePopup && _ctx.popup.closePopup(...args))
      }, null, 12, ["data-component-info"])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("view", {
        catchtouchmove: true,
        class: vue.normalizeClass(["popup-box popup-transition"]),
        style: vue.normalizeStyle({ top: $options.top + "px", height: $props.height + "rpx", zIndex: $props.zIndex })
      }, [
        vue.createElementVNode("view", {
          class: "move-btn flex row",
          "data-component-info": $options.componentInfo,
          id: "popup-move-btn",
          onTouchstart: _cache[1] || (_cache[1] = (...args) => _ctx.popup.touchstart && _ctx.popup.touchstart(...args)),
          onTouchmove: _cache[2] || (_cache[2] = (...args) => _ctx.popup.touchmove && _ctx.popup.touchmove(...args)),
          onTouchend: _cache[3] || (_cache[3] = (...args) => _ctx.popup.touchend && _ctx.popup.touchend(...args)),
          style: vue.normalizeStyle({ pointerEvents: $data.showPopup ? "auto" : "none" })
        }, [
          vue.createElementVNode("view", { class: "line" })
        ], 44, ["data-component-info"]),
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4)
    ], 32);
  }
  if (typeof block0 === "function")
    block0(_sfc_main$2);
  var __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-0d4a68c2"]]);
  Object.freeze({});
  Object.freeze([]);
  const isString = (val) => typeof val === "string";
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const toRawType = (value) => {
    return toTypeString(value).slice(8, -1);
  };
  function isDebugMode() {
    return typeof __channelId__ === "string" && __channelId__;
  }
  function jsonStringifyReplacer(k, p) {
    switch (toRawType(p)) {
      case "Function":
        return "function() { [native code] }";
      default:
        return p;
    }
  }
  function normalizeLog(type, filename, args) {
    if (isDebugMode()) {
      args.push(filename.replace("at ", "uni-app:///"));
      return console[type].apply(console, args);
    }
    const msgs = args.map(function(v) {
      const type2 = toTypeString(v).toLowerCase();
      if (type2 === "[object object]" || type2 === "[object array]") {
        try {
          v = "---BEGIN:JSON---" + JSON.stringify(v, jsonStringifyReplacer) + "---END:JSON---";
        } catch (e) {
          v = type2;
        }
      } else {
        if (v === null) {
          v = "---NULL---";
        } else if (v === void 0) {
          v = "---UNDEFINED---";
        } else {
          const vType = toRawType(v).toUpperCase();
          if (vType === "NUMBER" || vType === "BOOLEAN") {
            v = "---BEGIN:" + vType + "---" + v + "---END:" + vType + "---";
          } else {
            v = String(v);
          }
        }
      }
      return v;
    });
    return msgs.join("---COMMA---") + " " + filename;
  }
  function formatAppLog(type, filename, ...args) {
    const res = normalizeLog(type, filename, args);
    res && console[type](res);
  }
  function resolveEasycom(component, easycom) {
    return isString(component) ? easycom : component;
  }
  const _sfc_main$1 = {
    data() {
      return {
        show: false
      };
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_w_popup = resolveEasycom(vue.resolveDynamicComponent("w-popup"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = ($event) => $data.show = true)
      }, "show"),
      vue.createVNode(_component_w_popup, {
        modelValue: $data.show,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.show = $event),
        ref: "el",
        "z-index": 1200,
        height: 1200
      }, {
        default: vue.withCtx(() => [
          vue.createElementVNode("div", { style: { "text-align": "center", "height": "100%", "display": "flex", "align-items": "center", "justify-content": "center", "background": "red" } }, "hello")
        ]),
        _: 1
      }, 8, ["modelValue"])
    ]);
  }
  var PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
  if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
    Promise.prototype.finally = function(callback) {
      const promise = this.constructor;
      return this.then((value) => promise.resolve(callback()).then(() => value), (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      }));
    };
  }
  if (uni && uni.base64ToArrayBuffer) {
    ArrayBuffer = uni.base64ToArrayBuffer("").constructor;
  }
  if (uni.restoreGlobal) {
    uni.restoreGlobal(vue__namespace, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
  }
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  function createApp() {
    const app = vue.createVueApp(_sfc_main);
    return {
      app
    };
  }
  const __app__ = createApp().app;
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.use(uni.__vuePlugin).mount("#app");
})(Vue);
