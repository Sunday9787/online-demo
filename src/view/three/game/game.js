import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import bg from '../images/block.jpg'
import bgActive from '../images/block_active.jpg'

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

const texture = textureLoader.load(bg)
const activeTexture = textureLoader.load(bgActive)

class GameBase {
  /**
   * @param {HTMLElement} container
   * @param {number} width
   * @param {number} height
   */
  constructor(container, width, height) {
    /**
     * @protected
     */
    this.map = map

    /**
     * @type {HTMLElement}
     * @protected
     */
    this.container = container

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

  get row() {
    return this.grid[0]
  }

  get col() {
    return this.grid[1]
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

    this.renderer = new THREE.WebGL1Renderer({ antialias: true })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setClearColor(0xe8e8e8, 1)

    this.renderer.setAnimationLoop(bootstrap)
    this.container.appendChild(this.renderer.domElement)
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
 * @param {number} x
 * @param {number} y
 */
function createObjectName(x, y) {
  return `${x}-${y}`
}

/**
 * @param {string} name
 * @returns {[number, number]}
 */
function objectNameToLocation(name) {
  return name.split('-').map(item => Number(item))
}

export default class Game extends GameBase {
  tips = new Map([
    ['21222324', '赫拉利将告诉你人类是如何从动物变成上帝'],
    ['40414243', '对两次世界大战的哲学思考，直面存在的危机'],
    ['81828384', '看萧红写的这书名还以为是一条河的历史'],
    ['9091', '鲁迅先生的短篇小说集，里面有《狂人日记》'],
    ['64656667', '天下合久必分，分久必合'],
    ['46474849', '与达尔文《物种起源论》及哥白尼《天体运行论》并称为人类三大思想革命的经典之作'],
    ['262728', '三位艺术天才的非凡人生，罗曼罗兰著'],
    ['5678', '证明你上过中学的又一个有力佐证，冰心奶奶如是说'],
    ['11121', '我们都是故事外的人——阿尔贝·加缪'],
    ['13233343', '一种追求简单生活的价值观'],
    ['415161718191', '余华手下一本关于记忆的长篇小说'],
    ['647484', '走遍万水千山，泪尽撒哈拉'],
    ['2737475767', '达康书记别低头，皇冠会掉'],
    ['81828', '中国四大名著之一']
  ])

  /**
   * @type {Array<THREE.Mesh>}
   */
  units = []

  /**
   * 空白材质
   */
  emptyMaterial = new THREE.MeshBasicMaterial({ color: 0xe3b35d, name: 'emptyUnitMaterial' })

  /**
   * 单元格材质
   */
  material = new THREE.MeshBasicMaterial({ map: texture, name: 'unitMaterial' })

  /**
   * 高亮单元格材质
   */
  activeMaterial = new THREE.MeshBasicMaterial({ map: activeTexture, name: 'activeUnitMaterial' })

  /**
   * @param {THREE.Object3D} unit
   */
  onPointDown(unit) {
    if (unit.userData.empty) return

    /**
     * 重置
     */
    this.resetCollection(this.units, unit)

    unit.userData.down = !unit.userData.down

    /**
     * @type {boolean}
     */
    const down = unit.userData.down
    /**
     * @type {boolean}
     */
    const selectRow = unit.userData.selectRow

    console.log('selectRow', selectRow)
    console.log('down', down)
    /**
     * @type {[number, number]}
     */
    const [x, y] = objectNameToLocation(unit.name)

    const row = this.collectionUnit(x, y, true)
    const col = this.collectionUnit(x, y, false)

    if (down && selectRow) {
      this.renderColCollection(x, y, [row, col])
    } else {
      this.renderRowCollection(x, y, [row, col])
    }
  }

  /**
   * 渲染 列
   * 如果当前列内元素小于2个时 渲染行
   * @param {number} x
   * @param {number} y
   * @param {[THREE.Mesh, THREE.Mesh]}
   */
  renderColCollection(x, y, [rowCollection, colCollection]) {
    const aroundColUnit = this.aroundUnit(x, y, colCollection, false)

    if (aroundColUnit.length < 2) {
      this.renderRowCollection(x, y, [rowCollection, colCollection], true)
      return
    }

    for (const item of aroundColUnit) {
      item.userData.selectRow = false
      item.material = this.activeMaterial
    }
  }

  /**
   * 渲染 行
   * 如果当前行内元素小于2个时 渲染列
   * @param {number} x
   * @param {number} y
   * @param {[THREE.Mesh, THREE.Mesh]}
   */
  renderRowCollection(x, y, [rowCollection, colCollection]) {
    const aroundRowUnit = this.aroundUnit(x, y, rowCollection, true)

    if (aroundRowUnit.length < 2) {
      return this.renderColCollection(x, y, [rowCollection, colCollection], false)
    }

    for (const item of aroundRowUnit) {
      item.userData.selectRow = true
      item.material = this.activeMaterial
    }
  }

  /**
   * 重置为默认样式
   * @param {Array<THREE.Mesh>} collection
   * @param {THREE.Mesh} unit
   */
  resetCollection(collection, unit) {
    const context = this

    const data = collection.filter(function (item) {
      return !item.userData.empty
    })

    for (const item of data) {
      item.material = context.material
      item.userData.down = false
    }
  }

  /**
   * 寻找 当前行或者列 单元格
   * @param {number} x
   * @param {number} y
   * @param {boolean} row 行/列
   */
  collectionUnit(x, y, row) {
    return this.units.filter(function (item) {
      const [itemX, itemY] = objectNameToLocation(item.name)
      return row ? itemY === y : itemX === x
    })
  }

  /**
   * 寻找 前后非空 单元格
   * @param {number} x
   * @param {number} y
   * @param {Array<THREE.Object3D>} collection 当前行/列合集
   * @param {boolean} row 是否选择行
   */
  aroundUnit(x, y, collection, row) {
    /**
     * @type {THREE.Mesh[]}
     */
    const result = []
    const length = collection.length
    const start = row ? x : y

    for (let index = start; index < length; index++) {
      const element = collection[index]
      if (element && element.userData.empty) break
      result.push(element)
    }

    for (let index = start - 1; index >= 0; index--) {
      const element = collection[index]
      if (element && element.userData.empty) break
      result.push(element)
    }

    return result
  }

  /**
   * @protected
   */
  initCanvas() {
    // 创建几何
    const geometry = new THREE.BoxGeometry(100, 100, 100)
    const group = new THREE.Group()

    const [row, col] = this.grid

    // 创建矩阵
    for (let x = 0; x < row; x++) {
      for (let y = 0; y < col; y++) {
        let mesh = new THREE.Mesh(geometry, this.emptyMaterial)

        for (const item of this.map) {
          if (item.x === x && item.y === y) {
            mesh = new THREE.Mesh(geometry, this.material)
            break
          }
        }

        mesh.position.set(x * 120, 0, y * 120)
        mesh.name = createObjectName(x, y)
        mesh.userData.down = false
        mesh.userData.selectRow = null

        if (mesh.material.name === 'emptyUnitMaterial') {
          mesh.userData.empty = true
        }

        this.clickObjects.push(mesh)
        this.units.push(mesh)
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
