<template lang="pug">
.three-container
</template>

<script>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import gsap from 'gsap'
import { radian } from '@/utils'

/**
 * 创建圆弧
 * @param {number} radius 半径
 * @param {number} divisions 步长
 * @param {number} startRadian 起始弧度
 * @param {number} endRadian 结束弧度
 */
function createArc(radius, divisions, startRadian = 0, endRadian = Math.PI * 2) {
  /**
   * @type {import('three').Vector3[]}
   */
  const points = []
  const sp = endRadian / divisions

  for (let i = 0; i <= divisions; i++) {
    const angle = startRadian + i * sp
    const x = radius * Math.cos(angle)
    const y = radius * Math.sin(angle)
    points.push(new THREE.Vector3(x, y, 0))
  }

  return points
}

export default {
  name: 'ThreeDragon',
  mounted() {
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const scene = new THREE.Scene()
    const axesHelper = new THREE.AxesHelper(500)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const control = new OrbitControls(camera, renderer.domElement)

    const bootstrap = function () {
      renderer.render(scene, camera)
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

    control.target.set(0, 0, 0)
    camera.position.set(0, 0, 100)
    camera.lookAt(0, 0, 0)
    scene.add(axesHelper)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0xd3e6fb, 1)
    renderer.setAnimationLoop(bootstrap)

    window.addEventListener('resize', resize)
    window.dispatchEvent(new Event('resize'))

    const fontLoader = new FontLoader()
    const fontUrl = new URL('./font/DengXian_Regular.json', import.meta.url)

    /**
     * @param {string} text
     * @param {import('three/examples/jsm/loaders/FontLoader').Font} font
     */
    const createFont = function (text, font) {
      const textGeometry = new TextGeometry(text, {
        font,
        size: 30,
        height: 6, // 指定文本的厚度或高度，以像素为单位
        curveSegments: 100, // 指定曲线的分段数，这会影响文本曲线的光滑程度。分段数越大，曲线越光滑
        bevelEnabled: true, // 指定是否启用斜角（bevel），即是否给文本添加倒角效果
        bevelThickness: 2, // 如果启用了斜角，这个参数指定斜角的厚度
        bevelSize: 2, // 如果启用了斜角，这个参数指定斜角的大小
        bevelOffset: 2, // 如果启用了斜角，这个参数指定斜角的偏移量。
        bevelSegments: 2 // 如果启用了斜角，这个参数指定斜角的分段数，影响斜角的光滑程度。
      })

      const material = new THREE.MeshMatcapMaterial({ color: 0xf44336 })
      const mesh = new THREE.Mesh(textGeometry, material)

      return mesh
    }

    const createPlane = function () {
      const geometry = new THREE.PlaneGeometry(10, 10, 32, 32)
      // 获取顶点数据
      const positionAttribute = geometry.attributes.position
      const vertexArray = positionAttribute.array

      // 修改顶点数据
      for (let i = 0; i < vertexArray.length; i += 3) {
        const x = vertexArray[i]
        const y = vertexArray[i + 1]
        // 简单的波浪效果
        vertexArray[i + 2] = Math.sin(x) * Math.cos(y)
      }

      // 更新顶点数据
      positionAttribute.needsUpdate = true
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide, wireframe: true })
      const plane = new THREE.Mesh(geometry, material)

      return plane
    }

    const plane = createPlane()
    scene.add(plane)

    const createCircle = function () {
      const points = createArc(100, 100)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: 0xe91e63 })
      const line = new THREE.Line(geometry, material)
      line.position.setZ(50)

      return line
    }

    const circle = createCircle()
    scene.add(circle)

    const createCatmullRomCurve3 = function () {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-50, 20, 90),
        new THREE.Vector3(-10, 40, 40),
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(60, -60, 0),
        new THREE.Vector3(70, 0, 80)
      ])

      const points = curve.getPoints(100)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: 0xe92903 })
      const line = new THREE.Line(geometry, material)

      return line
    }

    const catmullRomLine = createCatmullRomCurve3()
    scene.add(catmullRomLine)

    const createLine3d = function () {
      const shape = new THREE.Shape()
      const R = 80 // 圆弧半径
      const H = 200 // 直线部分高度
      // 直线1
      const line1 = new THREE.LineCurve(new THREE.Vector2(R, H), new THREE.Vector2(R, 0))
      // 圆弧
      const arc = new THREE.ArcCurve(0, 0, R, 0, radian(-90), true)
      // 直线2
      const line2 = new THREE.LineCurve(new THREE.Vector2(-H, -R), new THREE.Vector2(-H, -R))

      // CurvePath创建一个组合曲线对象
      const curvePath = new THREE.CurvePath()
      // line1, arc, line2拼接出来一个U型轮廓曲线，注意顺序
      curvePath.curves.push(line1, arc, line2)

      // 执行.getPoints()，直线部分不会像曲线返回中间多余点，只需要起始点即可。
      const pointsArr = curvePath.getPoints(100) // 曲线上获取点
      shape.setFromPoints(pointsArr)

      const geometry = new THREE.ExtrudeGeometry(shape, {
        steps: 1,
        depth: 50, // 拉伸的深度
        bevelEnabled: false
      })

      // 创建材质
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide })
      const mesh = new THREE.Mesh(geometry, material)
      return mesh
    }

    const line3d = createLine3d()
    // scene.add(line3d)
    console.log(line3d)

    const createPoint = function () {
      const index = new THREE.BufferAttribute(new Float32Array([0, 0, 0, 10, 0, 0, 10, 10, 0, 0, 10, 0]), 3)
      const geometry = new THREE.BufferGeometry()
      const material = new THREE.PointsMaterial({ color: 0xffff00, size: 5 })
      const point = new THREE.Points(geometry, material)
      geometry.setAttribute('position', index)
      point.position.setZ(80)

      return point
    }

    const point = createPoint()
    scene.add(point)

    const createBackground = function () {
      const R = 80 // 圆弧半径
      const H = 200 // 直线部分高度
      // 直线1
      const line1 = new THREE.LineCurve(new THREE.Vector2(R, H), new THREE.Vector2(R, 0))
      // 圆弧
      const arc = new THREE.ArcCurve(0, 0, R, 0, radian(-90), true)
      // 直线2
      const line2 = new THREE.LineCurve(new THREE.Vector2(-H, -R), new THREE.Vector2(-H, -R))

      // CurvePath创建一个组合曲线对象
      const curvePath = new THREE.CurvePath()
      // line1, arc, line2拼接出来一个U型轮廓曲线，注意顺序
      curvePath.curves.push(line1, arc, line2)

      // 执行.getPoints()，直线部分不会像曲线返回中间多余点，只需要起始点即可。
      const pointsArr = curvePath.getPoints(100) // 曲线上获取点
      const geometry = new THREE.BufferGeometry()
      geometry.setFromPoints(pointsArr) // 读取坐标数据赋值给几何体顶点
      const material = new THREE.LineBasicMaterial({ color: 0x35ee, side: THREE.DoubleSide })
      const line = new THREE.Line(geometry, material)
      line.rotateY(Math.PI)

      return line
    }

    const background = createBackground()
    scene.add(background)

    fontLoader.loadAsync(fontUrl.href).then(function (font) {
      const texts = '龙年大吉'.split('')
      const group = new THREE.Group()

      const curve = new THREE.LineCurve3(new THREE.Vector3(-200, 0, 0), new THREE.Vector3(100, 100, 0))

      const points = curve.getPoints(100)
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ color: 0x009688 })
      const line = new THREE.Line(geometry, material)
      scene.add(line)

      const tl = gsap.timeline({
        repeat: -1,
        defaults: {
          duration: 2,
          ease: 'elastic.out(1, .75)'
        }
      })

      for (let i = 0; i < texts.length; i++) {
        const text = texts[i]
        const textMesh = createFont(text, font)
        textMesh.geometry.center()
        textMesh.position.set(i * 60, 0, 10)
        tl.to(textMesh.position, { x: '+=40', delay: i * 0.1 }, '<').to(
          textMesh.rotation,
          { y: (Math.PI / 180) * 360 },
          '<'
        )
        group.add(textMesh)
      }

      // 居中文字组
      group.position.setX((60 * texts.length) / -2)
      scene.add(group)
    })

    this.$el.appendChild(renderer.domElement)
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('resize', resize)
    })
  }
}
</script>
