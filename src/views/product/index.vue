<template>
  <div>
    <app-card>
      <h1>
        <span>Organization</span>
      </h1>
      <h1>当前主题 {{ theme }}<app-svg-icon name="Icon_32_Dingdong" size="100" /></h1>
      <p>{{ currentMechanism.mechanismName }}</p>

      <app-grid :column="8" gap="10px" center>
        <app-svg-icon name="table" color="var(--color-primary)" />
        <app-svg-icon name="dashboard" color="var(--color-primary)" />
        <app-svg-icon name="example" color="var(--color-primary)" />
        <app-svg-icon name="eye" color="var(--color-primary)" />
        <app-svg-icon name="eye-open" color="var(--color-primary)" />
        <app-svg-icon name="form" color="var(--color-primary)" />
        <app-svg-icon name="hamburger" color="var(--color-primary)" />
        <app-svg-icon name="link" color="#3d8aff" />
        <app-svg-icon name="nested" color="#3d8aff" />
        <app-svg-icon name="password" color="#3d8aff" />
        <app-svg-icon name="table" color="#3d8aff" />
        <app-svg-icon name="tree" color="#3d8aff" />
        <app-svg-icon name="user" color="#3d8aff" />
      </app-grid>

      <app-grid :column="8" gap="10px" center style="margin-top: 15px">
        <app-svg-icon name="Icon_32_Dingdong" />
        <app-svg-icon name="Icon_31_Skateboard" />
        <app-svg-icon name="Icon_29_Speaker" />
        <app-svg-icon name="Icon_29_Disco" />
        <app-svg-icon name="Icon_28_Projector" />
        <app-svg-icon name="Icon_25_Lego" />
        <app-svg-icon name="Icon_24_Bowling" />
        <app-svg-icon name="Icon_23_Domino" />
        <app-svg-icon name="Icon_21_VR" />
        <app-svg-icon name="Icon_21_Barcode" />
        <app-svg-icon name="Icon_20_dice" />
        <app-svg-icon name="Icon_19_Smartphone" />
        <app-svg-icon name="Icon_18_Headphone" />
        <app-svg-icon name="Icon_16_Pager" />
        <app-svg-icon name="Icon_15_Telephone" />
        <app-svg-icon name="Icon_14_SEO" />
        <app-svg-icon name="Icon_13_Camera" />
        <app-svg-icon name="Icon_10_Television" />
        <app-svg-icon name="Icon_9_Computer" />
        <app-svg-icon name="Icon_7_Disk" />
        <app-svg-icon name="Icon_6_Vinyl" />
        <app-svg-icon name="Icon_5_Cassette" />
        <app-svg-icon name="Icon_4_GameBot" />
        <app-svg-icon name="Icon_3_Console" />
        <app-svg-icon name="Icon_2_Console" />
        <app-svg-icon name="Icon_1_Console" />
        <app-svg-icon name="a-Icon_8_FloppyDisk" />
        <app-svg-icon name="a-Icon_11_RadioTape" />
        <app-svg-icon name="a-Icon_12Turntable" />
        <app-svg-icon name="a-Icon_22_PlayingCard" />
      </app-grid>
    </app-card>

    <app-card>
      {{ activityDate.toLocaleDateString() }}
      <app-calendar v-model="activityDate" />
    </app-card>

    <app-card>
      <section style="height: 600px">
        <app-virtual-list
          ref="virtualRef"
          :item-height="40"
          :data="productList"
          :prop="{ limit: 20 }"
          @end="getProduct"
        >
          <template v-slot="item">
            <div>{{ item.id }} {{ item.title }}</div>
          </template>
        </app-virtual-list>
      </section>
    </app-card>

    <app-card>
      <el-select v-model="form.select" placeholder="">
        <el-option label="case1" value="case1" />
        <el-option label="case2" value="case2" />
        <el-option label="case3" value="case3" />
      </el-select>

      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="item.name" v-for="(item, index) in options" :key="item.name + index">
          <el-input v-model="item.value" />
        </el-form-item>
      </el-form>
    </app-card>

    <app-card flex1>
      <router-link to="buy/1">
        <el-button type="primary">购买</el-button>
      </router-link>
    </app-card>
  </div>
</template>

<script>
import Vue, { computed, ref, shallowRef } from 'vue'
import { mapGetters } from 'vuex'
import { useStore } from '@/hooks/useStore'
import { getProductList } from '@/mock/product'

const caseMap = new Map()

export default {
  name: 'ProductIndex',
  setup() {
    const store = useStore('appModule')
    const theme = computed(() => store.state.theme)
    const activityDate = ref(new Date())
    /**
     * @type {import('vue').Ref<Product.Detail[]>}
     */
    const productList = ref([])

    const virtualRef = shallowRef()

    async function getProduct(options) {
      const response = await getProductList({ limit: options.limit, current: options.current })
      productList.value = productList.value.concat(response.list)
      virtualRef.value.loaded()
    }

    return {
      theme,
      activityDate,
      productList,
      virtualRef,
      getProduct
    }
  },
  data() {
    return {
      case1: [
        { name: 'case1-1', value: '' },
        { name: 'case1-2', value: '' },
        { name: 'case1-3', value: '' }
      ],
      'case1-1': [
        { name: 'case1-1-1', value: '' },
        { name: 'case1-1-3', value: '' },
        { name: 'case1-1-2', value: '' }
      ],
      'case1-2': [
        { name: 'case1-2-1', value: '' },
        { name: 'case1-2-3', value: '' },
        { name: 'case1-2-2', value: '' }
      ],
      case2: [
        { name: 'case2-1', value: '' },
        { name: 'case2-2', value: '' },
        { name: 'case2-3', value: '' }
      ],
      case3: [
        { name: 'case3-1', value: '' },
        { name: 'case3-2', value: '' },
        { name: 'case3-3', value: '' },
        { name: 'case3-4', value: '' },
        { name: 'case3-5', value: '' }
      ],
      caseDefault: [
        { name: 'case-default-1', value: '' },
        { name: 'case-default-2', value: '' },
        { name: 'case-default-3', value: '' },
        { name: 'case-default-4', value: '' },
        { name: 'case-default-5', value: '' }
      ],
      form: {
        select: '',
        mechanismId: null,
        level2: '',
        level3: ''
      },
      /** 黄牛 */
      scalper: [
        {
          name: '业务总监签字',
          uploadNum: '材料1',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '核销记录',
          uploadNum: '材料2',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '介入说明',
          uploadNum: '材料3',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '审计部高总审核同意',
          uploadNum: '材料4',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '其他',
          uploadNum: '材料5',
          uploadFile: '',
          remoteFileName: ''
        }
      ],
      cheat: [
        {
          name: '业务部门总监审核同意',
          uploadNum: '材料1',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '审计部高总审核同意',
          uploadNum: '材料2',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '系统拦截记录',
          uploadNum: '材料3',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '虚假理赔资料',
          uploadNum: '材料4',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '责任人承认虚假理赔证据',
          uploadNum: '材料5',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '其他',
          uploadNum: '材料6',
          uploadFile: '',
          remoteFileName: ''
        }
      ],
      cheat2: [
        {
          name: '业务总监企业微信回复截图',
          uploadNum: '材料1',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '审计部高总审核同意',
          uploadNum: '材料2',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '货物追回照片',
          uploadNum: '材料3',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '货物正常走货轨迹截图',
          uploadNum: '材料4',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '货物价值证明',
          uploadNum: '材料5',
          uploadFile: '',
          remoteFileName: ''
        },
        {
          name: '其他',
          uploadNum: '材料6',
          uploadFile: '',
          remoteFileName: ''
        }
      ],
      materialDefault: [
        {
          name: '附件',
          uploadNum: '材料1',
          uploadFile: '',
          remoteFileName: ''
        }
      ]
    }
  },
  created() {
    caseMap.set('case1', this.case1)
    caseMap.set('case1-1', this['case1-1'])
    caseMap.set('case1-2', this['case1-2'])
    caseMap.set('case1', this.case1)
    caseMap.set('case2', this.case2)
    caseMap.set('case3', this.case3)
    caseMap.set('caseDefault', this.caseDefault)
  },
  computed: {
    options() {
      if (this.form.select) {
        return Vue.observable([
          { name: 'case-observable-1', value: '' },
          { name: 'case-observable-2', value: '' },
          { name: 'case-observable-3', value: '' },
          { name: 'case-observable-4', value: '' },
          { name: 'case-observable-5', value: '' }
        ])
      }

      return caseMap.get('caseDefault')
    },
    materialList() {
      if (this.form.level2 === '黄牛') {
        return this.scalper
      }

      if (this.form.level2 === '偷盗骗保') {
        if (this.form.level3 === '骗保') {
          return this.cheat
        }
        return this.cheat2
      }

      return this.materialDefault
    },
    ...mapGetters('appModule', ['currentMechanism'])
  }
}
</script>
