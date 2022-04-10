<template>
  <view class="popup-container">
    <view :class="['mask','z-index-' + zIndex]" :catchtouchmove="true" v-if="showPopup"
          :data-component-info="componentInfo" @click="popup.closePopup"/>
    <view :catchtouchmove="true" :class="['popup-box popup-transition']"
          :style="{top: top + 'px',height: height + 'rpx',zIndex:zIndex}">
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
      <slot/>
    </view>
  </view>
</template>
<script lang="wxs" module="popup">
var componentInfo = null
var popupInstance = null
var startTop = 0
var currentTop = 0
var distanceTop = 0
function touchstart(event, ownerInstance) {
  var pageY = (event.touches[0] || event.changedTouches[0]).pageY;
  popupInstance = ownerInstance.selectComponent(".popup-box");
  var dataset = event.instance.getDataset()
  componentInfo = dataset.componentInfo;
  startTop = componentInfo.windowH - componentInfo.popupH;
  distanceTop = pageY - startTop;
  currentTop = pageY - distanceTop
  popupInstance.setStyle({
    top: pageY - distanceTop + 'px',
  })
  if (popupInstance.hasClass("popup-transition")) {
    popupInstance.removeClass("popup-transition")
  }
  return false
}

function touchmove(event) {
  var pageY = (event.touches[0] || event.changedTouches[0]).pageY;
  if (currentTop < startTop) return;
  currentTop = pageY;
  popupInstance.setStyle({
    top: pageY - distanceTop + 'px',
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
  if (currentTop - startTop < ph * 1 / 4) {
    popupInstance.setStyle({
      top: startTop + 'px',
      height: componentInfo.popupH + 'px'
    })

    ownerInstance.callMethod('handlePopup', {show: true});
  } else {
    closePopup(event, ownerInstance)
  }
  return false
}

function closePopup(event, ownerInstance) {
  if (!popupInstance) {
    popupInstance = ownerInstance.selectComponent(".popup-box");
    var dataset = event.instance.getDataset()
    componentInfo = dataset.componentInfo;
  }

  popupInstance.setStyle({
    top: "",
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
  emits:{
    "close": null,
    "open": null
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
    value:{
      type:Boolean,
      default: false
    },
    modelValue:{
      type:Boolean,
      default: false
    }
  },
  data(){
    return {
      showPopup:false
    }
  },
  computed: {
    systemInfo() {
      return uni.getSystemInfoSync();
    },
    componentInfo() {
      return {
        moveBtn: uni.upx2px(50),
        popupH: uni.upx2px(this.height),
        windowH: this.systemInfo.windowHeight,
      }
    },
    top() {
      return this.showPopup ? this.componentInfo.windowH - this.componentInfo.popupH : this.componentInfo.windowH
    }
  },
  watch:{
    modelValue(newVal){
      this.handlePopup({show:newVal})
      if(newVal){
        this.$emit("open")
      }else{
        this.$emit("close")
      }
    },
    value(newVal){
      this.handlePopup({show:newVal})
    },
  },
  methods: {
    handlePopup(res) {
      this.showPopup = res.show;
      // #ifndef VUE3
      this.$emit("input",res.show)
      // #endif
      // #ifdef VUE3
      this.$emit("update:modelValue",res.show)
      // #endif
    },
    open() {
      this.handlePopup({show:true})
    },
    close() {
      this.handlePopup({show:false})
    },
  },

}
</script>
<style scoped lang="scss">
@import "./index.scss";
</style>
