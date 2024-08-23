<template lang="pug">
.three-container
  el-progress(
    :percentage="percentage"
    :stroke-width="26"
    style=`
      position: absolute;
      width: 45%;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);`
      v-if="!hideProgressBar")
</template>

<script>
import * as THREE from 'three'
import gsap from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Status from 'three/examples/jsm/libs/stats.module'

export default {
  name: 'ThreeEarth',
  data() {
    return {
      percentage: 0,
      hideProgressBar: false
    }
  },
  mounted() {
    const vm = this
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const scene = new THREE.Scene()
    const axesHelper = new THREE.AxesHelper(500)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const light = new THREE.PointLight()
    const lightHelp = new THREE.PointLightHelper(light, 10, 0x3d8ffa)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05)
    const control = new OrbitControls(camera, renderer.domElement)

    /** 性能检测工具 */
    const status = new Status()

    const bootstrap = function () {
      renderer.render(scene, camera)
      status.update()
      control.update()
    }

    const resize = function () {
      // 重置渲染器输出画布canvas尺寸
      renderer.setSize(window.innerWidth, window.innerHeight)
      // SVGRenderer.setSize(window.innerWidth, window.innerHeight)
      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      camera.aspect = window.innerWidth / window.innerHeight

      control.update()
      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix()方法更新相机的投影矩阵
      camera.updateProjectionMatrix()
    }

    light.position.set(100, 100, 100)
    control.target.set(0, 0, 0)
    camera.position.set(0, 0, 120)
    light.lookAt(0, 0, 0)
    camera.lookAt(0, 0, 0)

    scene.add(axesHelper, light, lightHelp, ambientLight)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xd3e6fb, 1)
    renderer.setAnimationLoop(bootstrap)

    window.addEventListener('resize', resize)
    window.dispatchEvent(new Event('resize'))

    const loadingManager = new THREE.LoadingManager()
    // 在加载资源开始时的回调函数
    loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
      console.log(`Started loading file: ${url}.`)
      console.log(`Loaded ${itemsLoaded} of ${itemsTotal} files.`)
    }

    // 在加载资源过程中调用的回调函数
    loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
      console.log(`Loading file: ${url}.`)
      console.log(`Loaded ${itemsLoaded} of ${itemsTotal} files.`)
      vm.percentage = (itemsLoaded / itemsTotal) * 100
    }

    // 在加载所有资源完成后的回调函数
    loadingManager.onLoad = function () {
      console.log('All resources loaded.')
    }

    // 在加载资源出错时调用的回调函数
    loadingManager.onError = function (url) {
      console.error(`There was an error loading ${url}.`)
    }

    const textureLoader = new THREE.TextureLoader(loadingManager)
    const earthMapUrl = new URL('@/images/earth/2_no_clouds_8k.jpg', import.meta.url)
    const cloudMapUrl = new URL('@/images/earth/fair_clouds_8k.png', import.meta.url)
    const terrainMapUrl = new URL('@/images/earth/elev_bump_8k.jpg', import.meta.url)
    const starMapUrl = new URL('@/images/earth/starfield.jpg', import.meta.url)

    Promise.all([
      textureLoader.loadAsync(earthMapUrl.href),
      textureLoader.loadAsync(cloudMapUrl.href),
      textureLoader.loadAsync(terrainMapUrl.href),
      textureLoader.loadAsync(starMapUrl.href)
    ]).then(function ([earthTexture, cloudTexture, terrainTexture, starTexture]) {
      vm.hideProgressBar = true

      const createSpace = function () {
        // 创建太空材质
        const material = new THREE.MeshBasicMaterial({
          map: starTexture,
          // 使从里面显示材质
          side: THREE.BackSide
        })
        const geometry = new THREE.SphereGeometry(200, 500, 500)
        const shape = new THREE.Mesh(geometry, material)
        return shape
      }

      const createCloud = function () {
        // 创建云层的材质，使用透明度
        const material = new THREE.MeshPhongMaterial({
          map: cloudTexture,
          transparent: true // 使云层具有透明效果
        })
        const geometry = new THREE.SphereGeometry(50 * 1.02, 100, 100)
        const shape = new THREE.Mesh(geometry, material)

        return shape
      }

      const createEarth = function () {
        // 创建地球材质
        const material = new THREE.MeshPhongMaterial({
          map: earthTexture,
          // 地球地形贴图
          bumpMap: terrainTexture,
          bumpScale: 0.3
        })
        const geometry = new THREE.SphereGeometry(50, 100, 100)
        const shape = new THREE.Mesh(geometry, material)

        return shape
      }

      const earth = createEarth()
      const cloud = createCloud()
      const space = createSpace()
      const group = new THREE.Group()
      group.add(cloud, earth)
      scene.add(space, group)

      const tl = gsap.timeline({ defaults: { duration: 6, ease: 'ease' } })
      // 旋转角度度量单位是弧度 -Math.PI * 2 代表顺时针旋转360°
      const tl2 = gsap.timeline({ defaults: { y: -Math.PI * 2, repeat: -1, ease: 'linear' } })

      // 进场动画
      tl.from(group.position, { x: 50, y: 50, z: 50 }).from(group.scale, { x: 2, y: 2, z: 2 }, '<')

      tl2
        // 星空旋转动画
        .to(space.rotation, { duration: 360 })
        // 云层旋转动画（持续时间比地球快一点产生视差效果）
        .to(cloud.rotation, { duration: 120 }, '<')
        // 地球旋转动画
        .to(earth.rotation, { duration: 180 }, '<')
    })

    this.$el.appendChild(renderer.domElement)
    this.$el.appendChild(status.dom)
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('resize', resize)
      vm.$el.removeChild(status.dom)
      vm.$el.removeChild(renderer.domElement)
    })
  }
}
</script>
