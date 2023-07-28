import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import bg from '../images/IMG_7049.jpg'

const map = [
  { y: 0, x: 0 },
  { y: 0, x: 1 },
  { y: 0, x: 2 },
  { y: 0, x: 5 },
  { y: 0, x: 6 },
  { y: 0, x: 7 },
  { y: 0, x: 8 },

  { y: 1, x: 2 },
  { y: 1, x: 8 },

  { y: 2, x: 0 },
  { y: 2, x: 1 },
  { y: 2, x: 2 },
  { y: 2, x: 3 },
  { y: 2, x: 6 },
  { y: 2, x: 7 },
  { y: 2, x: 8 },
  { y: 2, x: 10 },

  { y: 3, x: 2 },
  { y: 3, x: 3 },
  { y: 3, x: 7 },
  { y: 3, x: 10 },

  { y: 4, x: 2 },
  { y: 4, x: 3 },
  { y: 4, x: 6 },
  { y: 4, x: 7 },
  { y: 4, x: 8 },
  { y: 4, x: 9 },
  { y: 4, x: 10 },
  { y: 4, x: 11 },

  { y: 5, x: 0 },
  { y: 5, x: 1 },
  { y: 5, x: 2 },
  { y: 5, x: 3 },
  { y: 5, x: 7 },
  { y: 5, x: 10 },

  { y: 6, x: 1 },
  { y: 6, x: 4 },
  { y: 6, x: 5 },
  { y: 6, x: 6 },
  { y: 6, x: 7 },
  { y: 6, x: 9 },

  { y: 7, x: 1 },
  { y: 7, x: 5 },
  { y: 7, x: 8 },
  { y: 7, x: 9 },
  { y: 7, x: 10 },
  { y: 7, x: 11 },

  { y: 8, x: 0 },
  { y: 8, x: 1 },
  { y: 8, x: 2 },
  { y: 8, x: 3 },
  { y: 8, x: 4 },
  { y: 8, x: 5 },
  { y: 8, x: 9 }
]

const textureLoader = new THREE.TextureLoader()

class GameBase {
  /**
   * @param {HTMLCanvasElement} el
   * @param {number} width
   * @param {number} height
   */
  constructor(el, width, height) {
    /**
     * @protected
     */
    this.map = map

    /**
     * @type {HTMLCanvasElement}
     * @protected
     */
    this.el = el

    /**
     * @type {[number,number]}
     * @protected
     */
    this.grid = [12, 9]

    /**
     * @type {number}
     * @protected
     */
    this.size = 120

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
    this.control = null

    const [row, col] = this.grid
    /**
     * @type {THREE.Vector3}
     * @protected
     */
    this.centerVector = new THREE.Vector3((row * this.size) / 2, 0, (col * this.size) / 2)
  }

  init() {
    const context = this

    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    this.initScene()
    this.initCamera()
    this.initLight()
    this.initRenderer()
    this.initHelper()
    this.initControl()
    this.initCanvas()

    /**
     * @private
     */
    this.resize = function () {
      // 重置渲染器输出画布canvas尺寸
      context.renderer.setSize(window.innerWidth, window.innerHeight)
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
        // 在这里填写点击代码
        console.log('dianji')
        console.log(intersects[0].object)
      }
    }

    this.el.addEventListener('pointerdown', this.pointerdown)
    window.addEventListener('resize', this.resize)
    window.dispatchEvent(new Event('resize'))
  }

  /**
   * 创建相机
   * @protected
   */
  initCamera() {
    this.camera = new THREE.PerspectiveCamera(30, this.width / this.height, 0.1, 8000)
    this.camera.position.set(800, 800, 800)
    this.camera.lookAt(this.centerVector)
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
    const axesHelper = new THREE.AxesHelper(800)
    this.scene.add(axesHelper)
  }

  /**
   *
   * @protected
   */
  initControl() {
    const context = this
    this.control = new OrbitControls(this.camera, this.renderer.domElement)
    this.control.target.set(this.centerVector.x, this.centerVector.y, this.centerVector.z)

    // controls 目标默认是 0 0 0 修改后需要手动更新
    this.control.update()

    /**
     * @private
     */
    this.change = function () {
      // OrbitControls 发生变化时 更新 渲染器
      context.renderer.render(context.scene, context.camera)
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
    }

    this.renderer = new THREE.WebGL1Renderer({ antialias: true, canvas: this.el })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xe8e8e8, 1)

    this.renderer.setAnimationLoop(bootstrap)
  }

  /**
   * 创建光源
   * @protected
   */
  initLight() {
    // 创建光源
    const pointLight = new THREE.PointLight(0xfff, 1)
    pointLight.position.set(400, 0, 0)
    this.scene.add(pointLight)
  }

  /**
   * 开始绘制
   * @abstract
   * @protected
   */
  initCanvas() {}

  destroy() {
    window.removeEventListener('resize', this.resize)
    this.el.removeEventListener('pointerdown', this.pointerdown)
    this.control.removeEventListener('change', this.change)
  }
}

export default class Game extends GameBase {
  /**
   * @protected
   */
  initCanvas() {
    const texture = textureLoader.load(bg)
    // 创建几何
    const geometry = new THREE.BoxGeometry(100, 100, 100)

    // 创建材质
    const emptyMaterial = new THREE.MeshBasicMaterial({ color: 0xe3b35d })
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const group = new THREE.Group()

    const [row, col] = this.grid

    // 创建矩阵
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) {
        let mesh = new THREE.Mesh(geometry, emptyMaterial)

        for (const item of this.map) {
          if (item.x === x && item.y === y) {
            mesh = new THREE.Mesh(geometry, material)
            break
          }
        }

        mesh.position.set(x * 120, 0, y * 120)
        mesh.name = `${x}-${y}`
        this.clickObjects.push(mesh)
        group.add(mesh)
      }
    }

    const centerGroup = new THREE.Group()
    centerGroup.add(group)

    group.position.set(-this.centerVector.x, 0, -this.centerVector.z)
    centerGroup.position.set(this.centerVector.x, 0, this.centerVector.z)
    this.scene.add(centerGroup)
  }
}
