<template>
  <view>
    <button @click="show = true">show</button>
    <w-popup v-model="show" ref="el" :z-index="1200" :height="1200">
      <div style="text-align:center;height: 100%;display: flex;align-items: center;justify-content: center;background: red">hello</div>
    </w-popup>
  </view>
</template>
<script>

export default {
  data(){
    return {
      show:false
    }
  },
}
</script>

<style scoped lang="scss"></style>