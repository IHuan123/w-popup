# w-popup
```vue
   <w-popup v-model="show" ref="el" z-index="1200" :height="800">
      <view style="height: 100%;background: #AED581"></view>
   </w-popup>
```

## 组件属性

|  属性   |  类型   | 默认值 |       说明        |
| :-----: | :-----: | :----: | :---------------: |
| v-model | Boolean | false  | 控制弹框显示/隐藏 |
| z-index | Number  |   1    | 弹出层z-index属性 |
| height  | Number  |  1000  |       高度        |
| safe-area-inset-bottom  | Boolean  |  false  |       是否启用安全区适配        |
## 组件事件

| 名称  |   触发时机   |
| :---: | :----------: |
| open  | 弹出层打开时 |
| close | 弹出层关闭时 |

## 接口

组件实例api` 方法

| 名称  |    作用    |
| :---: | :--------: |
| open  | 打开弹出层 |
| close | 关闭弹出层 |
