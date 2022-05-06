<template>
  <view>
    <button @click="show = true">show</button>
    <w-popup safe-area-inset-bottom v-model="show" :z-index="1200" :height="1000">
      <view style="height: 100%;background: #AED581"></view>
    </w-popup>
  </view>
</template>
<script>

export default {
  data(){
    return {
      show:false,

    }
  },
}
</script>

<style scoped lang="scss"></style>
