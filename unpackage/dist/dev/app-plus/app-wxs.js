var __wxsModules={};

__wxsModules["7a918bfa"] = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // <stdin>
  var require_stdin = __commonJS({
    "<stdin>"(exports, module) {
      var componentInfo = null;
      var popupInstance = null;
      var startTop = 0;
      var currentTop = 0;
      var distanceTop = 0;
      function touchstart(event, ownerInstance) {
        var pageY = (event.touches[0] || event.changedTouches[0]).pageY;
        __f__("log", "at uni_modules/w-popup/components/w-popup/w-popup.vue:30", pageY);
        popupInstance = ownerInstance.selectComponent(".popup-box");
        var dataset = event.instance.getDataset();
        componentInfo = dataset.componentInfo;
        startTop = componentInfo.windowH - componentInfo.popupH;
        distanceTop = pageY - startTop;
        currentTop = pageY - distanceTop;
        popupInstance.setStyle({
          top: pageY - distanceTop + "px"
        });
        if (popupInstance.hasClass("popup-transition")) {
          popupInstance.removeClass("popup-transition");
        }
        return false;
      }
      function touchmove(event) {
        var pageY = (event.touches[0] || event.changedTouches[0]).pageY;
        if (currentTop < startTop)
          return;
        currentTop = pageY;
        popupInstance.setStyle({
          top: pageY - distanceTop + "px",
          height: componentInfo.popupH + "px"
        });
        return false;
      }
      function touchend(event, ownerInstance) {
        return handleTouch(event, ownerInstance);
      }
      function touchcancel(event, ownerInstance) {
        return handleTouch(event, ownerInstance);
      }
      function handleTouch(event, ownerInstance) {
        var ph = componentInfo.popupH;
        popupInstance.addClass("popup-transition");
        if (currentTop - startTop < ph * 1 / 4) {
          popupInstance.setStyle({
            top: startTop + "px",
            height: componentInfo.popupH + "px"
          });
          ownerInstance.callMethod("handlePopup", { show: true });
        } else {
          closePopup(event, ownerInstance);
        }
        return false;
      }
      function closePopup(event, ownerInstance) {
        if (!popupInstance) {
          popupInstance = ownerInstance.selectComponent(".popup-box");
          var dataset = event.instance.getDataset();
          componentInfo = dataset.componentInfo;
        }
        popupInstance.setStyle({
          height: componentInfo.popupH + "px"
        });
        ownerInstance.callMethod("handlePopup", { show: false });
      }
      module.exports = {
        touchstart,
        touchmove,
        touchend,
        touchcancel,
        closePopup
      };
    }
  });
  return require_stdin();
})();
