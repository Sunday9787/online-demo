# 前言

一个 vue hooks 学习项目，也是对过去的一个总结

![image-20230307183338710](https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/2023-03-07-18-33-38-image-20230307183338710.png)

![image-20230307183216402](https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/2023-03-07-18-32-16-image-20230307183216402.png)

![image-20230307183231746](https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/2023-03-07-18-32-31-image-20230307183231746.png)

![image-20230307183301078](https://static-1256180570.cos.ap-nanjing.myqcloud.com/image/2023-03-07-18-33-01-image-20230307183301078.png)

## 动机

Vue 组合式api 出来有些时日了，之前朋友跟我分享hooks 思想 讲半天我还是不明白，也不明白为啥 要把 `Options API` 改成 `Composition API` 选项式用的挺好的没啥毛病啊 mixin 也非常好 真不明白为啥

当时我是抵制学习 Vue3，就这样 又过了大概一年时间

后面工作上需要维护一个项目 当时不是很忙，想着炫技 又去看了看组合式api 尝试着用 组合式api 写一个小功能出来

```js
import { ref, onBeforeUnmount } from '@vue/composition-api'

export function useMenu() {
  const menuVisible = ref(false)

  const handle = function (e) {
    menuVisible.value = false
  }

  onMounted(function () {
    document.body.addEventListener('click', handle, { capture: false })
  })

  onBeforeUnmount(function () {
    document.body.removeEventListener('click', handle)
  })

  return {
    menuVisible
  }
}
```

```js
setup() {
  const { menuVisible } = useMenu()

  return {
    menuVisible
  }
}
```

我好像真正理解了什么叫 `Composition API` 理解了尤大的良苦用心

实际用下来 组合式api 在某些场景下 的确非常好用非常棒，在某些下就不太好虽然可以 但是麻烦了点 没有 mixin好用

1、组合式在 父级组件 需要一个单独功能点的数据时 非常好用

例如：tab 切换 toggle

2、混入在 父级组件功能很稳定 功能集成度高的情况 非常好用

例如：crud 表单查询 重置 翻页

总结来说 

`组合式` 就是非常灵活 灵活到没有下限也没有上限，特点：功能代码集成度高方便维护

`选项式` 比较死板 但是有下限也有上限  特点：this 用着很舒服

新手使用选项式写的再垃圾也有个下限托着，反之 组合式不能

------

## 入门

```bash
# 克隆项目
git clone git@github.com:Sunday9787/online-demo.git

# 进入项目目录
cd online-demo

# 安装依赖
pnpm i

# 开发
pnpm dev
```

这样会自动打开 http://localhost:7007

## 主要功能

- 主题切换
- 模板编辑器
- 通用curd封装

### 全局组件

- app-form-collapse
- app-form-tab
- app-form-tab-pane
- app-patient
- app-big-screen

### 主要页面

| 路径                | 功能点                    |
| ------------------- | ------------------------- |
| /                   | 自动适应大屏              |
| /dashboard/index    | CURD 模板                 |
| /user/index         | 报告模板 - 创建&编辑 模板 |
| /consultation/index | grid 布局                 |
