import { gsap, Power1 } from 'gsap'
import * as THREE from 'three'
import * as d3 from 'd3'
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS2DObject, CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer'

import localIcon from '../images/local.png'

const textureLoader = new THREE.TextureLoader()

class MapBase {
  /**
   * @type {Three.Map}
   */
  data = null

  /**
   * @param {HTMLElement} container
   * @param {number} width
   * @param {number} height
   */
  constructor(container, width, height) {
    /**
     * @type {HTMLElement}
     * @protected
     */
    this.container = container

    /**
     * @type {number}
     * @protected
     */
    this.width = width

    /**
     * @type {number}
     * @protected
     */
    this.height = height

    /**
     * @type {THREE.Object3D[]}
     * @protected
     */
    this.clickObjects = []

    /**
     * @protected
     */
    this.scene = null

    /**
     * @protected
     */
    this.camera = null

    /**
     * @protected
     */
    this.renderer = null

    /**
     * @protected
     */
    this.CSS2dRenderer = null

    /**
     * @protected
     */
    this.SVGRenderer = null

    /**
     * @protected
     */
    this.control = null

    /**
     * @protected
     * @type {GUI}
     */
    this.gui = null
  }

  /**
   * @param {Three.Map} map
   */
  init(map) {
    this.data = map
    const context = this

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    this.initScene()
    this.initHelper()
    this.initCamera()
    this.initLight()
    this.initRenderer()
    this.initCSS2dRenderer()
    // this.initSVGRenderer()
    this.initControl()
    this.initCanvas()

    /**
     * @private
     */
    this.resize = function () {
      // 重置渲染器输出画布canvas尺寸
      context.renderer.setSize(window.innerWidth, window.innerHeight)
      context.CSS2dRenderer.setSize(window.innerWidth, window.innerHeight)
      // context.SVGRenderer.setSize(window.innerWidth, window.innerHeight)
      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      context.camera.aspect = window.innerWidth / window.innerHeight

      context.control.update()
      // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
      // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
      // 如果相机的一些属性发生了变化，需要执行 updateProjectionMatrix()方法更新相机的投影矩阵
      context.camera.updateProjectionMatrix()
    }

    /**
     * @private
     * @param {MouseEvent} e
     */
    this.pointerdown = function (e) {
      e.preventDefault()
      mouse.x = (e.clientX / context.renderer.domElement.clientWidth) * 2 - 1
      mouse.y = -(e.clientY / context.renderer.domElement.clientHeight) * 2 + 1

      raycaster.setFromCamera(mouse, context.camera)

      // 总结一下，这里必须装网格，mesh，装入组是没有效果的
      // 所以我们将所有的盒子的网格放入对象就可以了
      // 需要被监听的对象要存储在clickObjects中。
      const intersects = raycaster.intersectObjects(context.clickObjects)

      // console.log(intersects)
      if (intersects.length > 0) {
        context.onPointDown(intersects[0].object)
      }
    }

    this.container.addEventListener('pointerdown', this.pointerdown)
    window.addEventListener('resize', this.resize)
    window.dispatchEvent(new Event('resize'))
  }

  /**
   * 创建相机
   * @protected
   */
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000)
    this.camera.position.set(8, 8, 8)
    this.camera.lookAt(0, 0, 0)
  }

  /**
   * 创建场景
   * @protected
   */
  initScene() {
    this.scene = new THREE.Scene()
  }

  /**
   * 创建坐标轴辅助线
   * @protected
   */
  initHelper() {
    const axesHelper = new THREE.AxesHelper(50)
    this.gui = new GUI({ title: '地图控制器' })
    this.scene.add(axesHelper)

    document.body.appendChild(this.gui.domElement)
  }

  /**
   *
   * @protected
   */
  initControl() {
    const context = this
    this.control = new OrbitControls(this.camera, this.renderer.domElement)
    this.control.target.set(0, 0, 0)

    // controls 目标默认是 0 0 0 修改后需要手动更新
    this.control.update()

    /**
     * @private
     */
    this.change = function () {
      // OrbitControls 发生变化时 更新 渲染器
      context.renderer.render(context.scene, context.camera)
      context.CSS2dRenderer.render(context.scene, context.camera)
      // context.SVGRenderer.render(context.scene, context.camera)
    }

    this.control.addEventListener('change', this.change)
  }

  /**
   * 创建渲染器
   * @protected
   */
  initRenderer() {
    const context = this

    const bootstrap = function () {
      context.renderer.render(context.scene, context.camera)
      context.CSS2dRenderer.render(context.scene, context.camera)
      // context.SVGRenderer.render(context.scene, context.camera)
    }

    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xd3e6fb, 1)

    this.renderer.setAnimationLoop(bootstrap)
    this.container.appendChild(this.renderer.domElement)
  }

  /**
   * 创建2d渲染器
   * @protected
   */
  initCSS2dRenderer() {
    this.CSS2dRenderer = new CSS2DRenderer()
    this.CSS2dRenderer.setSize(window.innerWidth, window.innerHeight)
    this.CSS2dRenderer.domElement.style.position = 'absolute'
    this.CSS2dRenderer.domElement.style.left = '0'
    this.CSS2dRenderer.domElement.style.top = '0'
    this.CSS2dRenderer.domElement.style.pointerEvents = 'none'

    this.container.appendChild(this.CSS2dRenderer.domElement)
  }

  /**
   * 创建SVG渲染器
   * @protected
   */
  initSVGRenderer() {
    // this.SVGRenderer = new SVGRenderer()
    // this.SVGRenderer.setSize(window.innerWidth, window.innerHeight)
    // this.SVGRenderer.domElement.style.position = 'absolute'
    // this.SVGRenderer.domElement.style.left = '0'
    // this.SVGRenderer.domElement.style.top = '0'
    // this.SVGRenderer.domElement.style.pointerEvents = 'none'
    // this.container.appendChild(this.SVGRenderer.domElement)
  }

  /**
   * 创建光源
   * @protected
   */
  initLight() {
    // 创建环境光光源
    const ambientLight = new THREE.AmbientLight(0xd4e7fd, 4)
    this.scene.add(ambientLight)

    // 创建多个平行光
    const directionalLight = new THREE.DirectionalLight(0xe8eaeb, 0.2)
    directionalLight.position.set(0, 10, 5)
    const directionalLight2 = directionalLight.clone()
    directionalLight2.position.set(0, 10, -5)
    const directionalLight3 = directionalLight.clone()
    directionalLight3.position.set(5, 10, 0)
    const directionalLight4 = directionalLight.clone()
    directionalLight4.position.set(-5, 10, 0)
    this.scene.add(directionalLight)
    this.scene.add(directionalLight2)
    this.scene.add(directionalLight3)
    this.scene.add(directionalLight4)

    const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 2, 0xff0000)
    this.scene.add(directionalLightHelper)

    const lightFolder = this.gui.addFolder('平行光')
    lightFolder.add(directionalLight.position, 'x', 0, 20).name('x轴')
    lightFolder.add(directionalLight.position, 'y', 0, 20).name('y轴')
    lightFolder.add(directionalLight.position, 'z', 0, 20).name('z轴')
    lightFolder.add(directionalLight, 'intensity', 0, 5).name('强度')

    lightFolder
      .addColor(ambientLight, 'color')
      .onChange(function (value) {
        ambientLight.color.set(value)
      })
      .name('环境光颜色')
  }

  /**
   * 开始绘制
   * @abstract
   * @protected
   */
  initCanvas() {}

  /**
   * 点击事件
   * @abstract
   * @protected
   */
  onPointDown() {}

  destroy() {
    window.removeEventListener('resize', this.resize)
    this.container.removeEventListener('pointerdown', this.pointerdown)
    this.control.removeEventListener('change', this.change)
  }
}

/**
 * d3.geoMercator()是一个地理投影函数，用于将地球表面的经纬度坐标映射到二维平面上。
 */
const offsetXY = d3.geoMercator()

export default class ThreeMap extends MapBase {
  iconMap = textureLoader.load(localIcon)

  /**
   * @type {Array<[string, string]>}
   */
  flyCity = [
    ['信阳市', '郑州市'],
    ['信阳市', '鹤壁市'],
    ['信阳市', '三门峡市'],
    ['信阳市', '洛阳市'],
    ['信阳市', '濮阳市']
  ]

  /**
   * @type {Map<string, THREE.Vector3>}
   */
  flayPoint = new Map()

  initCanvas() {
    const context = this

    this.map = context.createMap(context.data)

    const box = new THREE.Box3().setFromObject(this.map)
    const boxHelper = new THREE.Box3Helper(box, 0xffff00)

    const center = box.getCenter(new THREE.Vector3())

    this.map.position.x = this.map.position.x - center.x
    this.map.position.y = this.map.position.y - center.y

    context.scene.add(boxHelper)
    context.scene.add(this.map)
  }

  /**
   * 创建 地图几何
   * @param {[number, number][]} data
   * @param {number} color
   * @param {number} color
   */
  createMesh(data, color, depth) {
    const shape = new THREE.Shape()
    data.forEach((item, idx) => {
      const [x, y] = offsetXY(item)
      if (idx === 0) shape.moveTo(x, -y)
      else shape.lineTo(x, -y)
    })

    const shapeGeometry = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: false
    })

    const shapeMaterial = new THREE.MeshStandardMaterial({
      color,
      emissive: 0x000000,
      roughness: 0.45,
      metalness: 0.8,
      transparent: true,
      side: THREE.DoubleSide
    })

    const mesh = new THREE.Mesh(shapeGeometry, shapeMaterial)
    return mesh
  }

  /**
   * 创建 地图边界线
   * @param {[number, number][]} data
   * @param {number} color
   * @param {number} color
   */
  createLine(data, depth) {
    const points = []
    data.forEach(item => {
      const [x, y] = offsetXY(item)
      points.push(new THREE.Vector3(x, -y, 0))
    })
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const upLineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })
    const downLineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff })

    const upLine = new THREE.Line(lineGeometry, upLineMaterial)
    const downLine = new THREE.Line(lineGeometry, downLineMaterial)
    downLine.position.z = -0.0001
    upLine.position.z = depth + 0.0001
    return [upLine, downLine]
  }

  /**
   * @param {Three.Map} data
   *
   */
  createMap(data) {
    const context = this
    const map = new THREE.Group()
    const center = data.features[0].properties.centroid
    /**
     * offsetXY.center(center)是用于指定投影的中心点，这个中心点决定了投影的中心位置，地图上的所有要素都将以该点为中心进行投影转换。
     * .translate([0, 0])是指定投影的平移量。这里的 [0, 0] 表示在平面坐标系中的 x 和 y 方向上都没有平移，也就是将地图的投影结果放置在平面坐标系的原点位置。
     */
    offsetXY.center(center).translate([0, 0])

    /**
     * @this {ThreeMap}
     * @param {[number, number][]} coordinate
     * @param {number} color
     * @param {number} depth
     * @param {THREE.Group} unit
     */
    const handle = function (coordinate, color, depth, unit) {
      const mesh = this.createMesh(coordinate, color, depth)
      const line = this.createLine(coordinate, depth)
      unit.add(mesh, ...line)
      this.clickObjects.push(mesh)
    }

    data.features.forEach(feature => {
      const unit = new THREE.Group()

      const { coordinates, type } = feature.geometry
      const { name, centroid, center } = feature.properties
      const color = new THREE.Color(`hsl(
        ${233},
        ${Math.random() * 30 + 55}%,
        ${Math.random() * 30 + 55}%)`).getHex()
      const depth = Math.random() * 0.3 + 0.3
      const point = centroid || center || [0, 0]
      const label = context.createLabel(name, point, depth)
      const icon = context.createPoint(point, depth)
      unit.name = name

      const [flayX, flayY] = offsetXY(point)
      context.flayPoint.set(name, new THREE.Vector3(flayX, -flayY, depth))

      coordinates.forEach(coordinate => {
        if (type === 'MultiPolygon') coordinate.forEach(item => handle.apply(context, [item, color, depth, unit]))
        if (type === 'Polygon') handle.apply(context, [coordinate, color, depth, unit])
      })

      map.add(unit, label, icon)
    })

    this.createFlayLine(map)

    return map
  }

  /**
   * @param {string} name
   * @param {[number,number]} point
   * @param {number} depth
   */
  createLabel(name, point, depth) {
    const [x, y] = offsetXY(point)
    const div = document.createElement('label')
    const label = new CSS2DObject(div)
    div.style.color = '#fff'
    div.style.fontSize = '12px'
    div.style.textShadow = '1px 1px 2px #047cd6'
    div.textContent = name

    label.scale.set(1.1, 1.1, 1.1)
    label.position.set(x, -y, depth)

    return label
  }

  /**
   * @param {[number,number]} point
   * @param {number} depth
   */
  createPoint(point, depth) {
    const material = new THREE.SpriteMaterial({ map: this.iconMap })
    const sprite = new THREE.Sprite(material)
    const [x, y] = offsetXY(point)
    sprite.scale.set(0.3, 0.3, 0.3)

    sprite.position.set(x, -y, depth + 0.2)
    sprite.renderOrder = 1
    return sprite
  }

  /**
   * @param {THREE.Mesh} unit
   */
  onPointDown(unit) {
    const parent = unit.parent
    const group = this.map.children.filter(item => item.type === 'Group')

    for (const {
      children: [mesh]
    } of group) {
      if (mesh === unit) continue
      mesh.material.opacity = 1
    }

    for (const item of parent.children) {
      item.material.opacity = 0.4
    }
  }

  /**
   * @param {THREE.Vector3} point
   */
  createFlyPoint(point) {
    /**
     * 创建 飞行起点圆
     */
    const material = new THREE.MeshBasicMaterial({ color: 0x1a46d0, side: THREE.DoubleSide })
    const circleGeometry = new THREE.CircleGeometry(0.1, 200)
    const circle = new THREE.Mesh(circleGeometry, material)
    circle.position.add(point)

    /**
     * 创建圆环
     */
    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x1a46f0, side: THREE.DoubleSide, transparent: true })
    const ringGeometry = new THREE.RingGeometry(0.1, 0.15, 200)
    const ring = new THREE.Mesh(ringGeometry, ringMaterial)
    ring.position.add(point)

    return [circle, ring]
  }

  /**
   * @param {THREE.Vector3} startPosition
   * @param {THREE.Vector3} endPosition
   */
  createLineConnect(startPosition, endPosition) {
    const [start, startRing] = this.createFlyPoint(startPosition)
    const [end, endRing] = this.createFlyPoint(endPosition)

    const curve = new THREE.QuadraticBezierCurve3(
      startPosition,
      new THREE.Vector3((startPosition.x + endPosition.x) / 2, (startPosition.y + endPosition.y) / 2, 8),
      endPosition
    )

    const points = curve.getPoints(50)
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x6e43c3, side: THREE.DoubleSide })
    const line = new THREE.Line(lineGeometry, lineMaterial)

    return [start, end, line, startRing, endRing]
  }

  /**
   * @param {THREE.Group} group
   */
  createFlayLine(group) {
    /**
     * @type {Array<THREE.Mesh>}
     */
    const rings = []

    for (const [startCity, endCity] of this.flyCity) {
      const startPosition = this.flayPoint.get(startCity)
      const endPosition = this.flayPoint.get(endCity)
      const [start, end, line, startRing, endRing] = this.createLineConnect(startPosition, endPosition)

      rings.push(startRing, endRing)
      group.add(start, end, line, startRing, endRing)
    }

    this.animateFlay(rings)
  }

  /**
   * @param {THREE.Mesh[]} data
   */
  animateFlay(data) {
    for (const mesh of data) {
      gsap.fromTo(
        mesh.scale,
        { x: 0.1, y: 0.1, z: 0.1 },
        { x: 1.2, y: 1.2, z: 1.2, duration: 3, repeat: -1, ease: Power1.easeInOut }
      )
      gsap.fromTo(mesh.material, { opacity: 1 }, { opacity: 0, duration: 3, repeat: -1, ease: Power1.easeInOut })
    }
  }
}
