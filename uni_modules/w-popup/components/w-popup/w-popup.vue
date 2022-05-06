<template>
  <view class="popup-container" @touchmove.native.stop.prevent>
    <view :class="['mask',showPopup?'show-mask':'hide-mask']" :style="{zIndex:zIndex-1}" :catchtouchmove="true"
          v-if="showMask"
          :data-component-info="componentInfo" @click="popup.closePopup"/>
    <view
        :catchtouchmove="true"
        :class="['popup-box popup-transition',safeAreaInsetBottom ? 'safe-area-inset-bottom':'']"
        :style="{transform:`translate3d(0,${ translateY }px,0)`,height: popupH + 'px',zIndex:zIndex}">
      <view class="move-btn flex row"
            :data-component-info="componentInfo"
            id="popup-move-btn"
            @touchstart="popup.touchstart"
            @touchmove="popup.touchmove"
            @touchend="popup.touchend"
            :style="{pointerEvents:showPopup?'auto':'none'}"
      >
        <view class="line"></view>
      </view>
      <view class="content-box" :style="{height:height+'rpx'}">
        <slot/>
      </view>
    </view>
  </view>
</template>
<script lang="wxs" module="popup">
var componentInfo = null
var popupInstance = null
var startTranslateY = 0 //手势开始的translateY
var currentTop = 0 //当前popup的translateY
var distanceTop = 0 //手指在滑动块中距离滑动块顶部距离
function touchstart(event, ownerInstance) {
  var pageY = (event.touches[0] || event.changedTouches[0]).pageY;
  popupInstance = ownerInstance.selectComponent(".popup-box");
  var dataset = event.instance.getDataset()
  componentInfo = dataset.componentInfo;

  var popupStartTop = componentInfo.windowH - componentInfo.popupH;
  distanceTop = pageY - popupStartTop;

  startTranslateY = componentInfo.popupH;

  currentTop = componentInfo.popupH;
  var translateY = componentInfo.popupH;
  popupInstance.setStyle({
    transform: 'translate3d(0,' + -translateY + 'px,0)'
  })
  if (popupInstance.hasClass("popup-transition")) {
    popupInstance.removeClass("popup-transition")
  }
  return false
}

function touchmove(event) {
  var pageY = (event.touches[0] || event.changedTouches[0]).pageY;
  var translateY = componentInfo.windowH - pageY + distanceTop
  if (currentTop > startTranslateY + 10) return;
  currentTop = componentInfo.windowH - pageY + distanceTop;
  popupInstance.setStyle({
    transform: 'translate3d(0,' + -translateY + 'px,0)',
    height: componentInfo.popupH + 'px'
  })
  return false
}

function touchend(event, ownerInstance) {
  return handleTouch(event, ownerInstance)
}

function touchcancel(event, ownerInstance) {
  return handleTouch(event, ownerInstance)
}

function handleTouch(event, ownerInstance) {
  var ph = componentInfo.popupH;
  popupInstance.addClass("popup-transition")
  if (startTranslateY - currentTop < ph * 1 / 4) {
    popupInstance.setStyle({
      transform: 'translate3d(0,' + -ph + 'px,0)',
      height: componentInfo.popupH + 'px'
    })
    ownerInstance.callMethod('handlePopup', {show: true});
  } else {
    closePopup(event, ownerInstance)
  }
  return false
}

//关闭
function closePopup(event, ownerInstance) {
  if (!popupInstance) {
    popupInstance = ownerInstance.selectComponent(".popup-box");
    var dataset = event.instance.getDataset()
    componentInfo = dataset.componentInfo;
  }
  popupInstance.setStyle({
    height: componentInfo.popupH + 'px',
  })
  ownerInstance.callMethod("handlePopup", {show: false})
}

module.exports = {
  touchstart: touchstart,
  touchmove: touchmove,
  touchend: touchend,
  touchcancel: touchcancel,
  closePopup: closePopup,
}
</script>

<script>
export default {
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
      default: 1000
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
    }
  },
  computed: {
    systemInfo() {
      return uni.getSystemInfoSync();
    },
    safeAreaBottom() {
      return this.systemInfo.screenHeight - this.systemInfo.safeArea.bottom
    },
    popupH() {
      return uni.upx2px(this.height) + uni.upx2px(50) + (this.safeAreaInsetBottom ? this.safeAreaBottom : 0)
    },
    componentInfo() {
      return {
        moveBtn: uni.upx2px(50),
        popupH: this.popupH,
        windowH: this.systemInfo.windowHeight,
        safeAreaBottom: this.safeAreaBottom
      }
    },
    translateY() {
      return this.showPopup ? -this.popupH : 0
    }
  },
  watch: {
    showPopup(newVal) {
      if (newVal) {
        this.showMask = newVal
      } else {
        setTimeout(() => {
          this.showMask = newVal
        }, 200)
      }
    },
    // #ifdef VUE3
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.handlePopup({show: newVal})
        if (newVal) {
          this.$emit("open")
        } else {
          this.$emit("close")
        }
      }
    },
    // #endif
    // #ifndef VUE3
    value: {
      immediate: true,
      handler(newVal) {
        this.handlePopup({show: newVal})
      }
    }
    // #endif
  },
  methods: {
    handlePopup(res) {
      this.showPopup = res.show;
      // #ifndef VUE3
      this.$emit("input", res.show)
      // #endif
      // #ifdef VUE3
      this.$emit("update:modelValue", res.show)
      // #endif
    },
    open() {
      this.handlePopup({show: true})
    },
    close() {
      this.handlePopup({show: false})
    },
  },

}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
