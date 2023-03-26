<template lang="pug">
  section
    app-card
      section.good-container
        keep-alive
          el-carousel(:interval="5000" height="600px" arrow="always" key="preview" v-if="currentSpec")
            el-carousel-item(v-for="(spec, k) in detail.specs" :key="k")
              el-image(:src="spec.img" fit="contain" alt="图片" style="width: 100%; height: 600px")
          el-carousel(:interval="5000" height="600px" arrow="always" key="album" v-else)
            el-carousel-item(v-for="(img, k) in detail.album" :key="k")
              el-image(:src="img" fit="contain" alt="图片" style="width: 100%; height: 600px")

        div.good-title {{ detail.title }}

        ul.good-spec
          li.good-spec__item(v-for="(item) of detail.specs" :key="item.id")
            label.good-spec-title {{ item.attr }}
            spec-group(v-model="item.select")
              spec-item(v-for="(attr) of item.value"
                :disabled="optionSpecs.indexOf(attr.label) < 0"
                :key="attr.id"
                :label="attr.label") {{ attr.label }}

        div
          el-button(type='primary').fluid 购买

    app-card
      h3 已选择
      p {{ currentSpec || '-' }}
</template>

<script>
import { goodInfo as detail, specCombinationList } from '@/mock/goods'
import { SpecMatrix } from '@/view/product/utils/adjoin-matrix'

/**
 * @param {Good.SpecCombination[]} data
 */
function createSpecCombinationMap(data) {
  /**
   * @type {Map<string, Good.SpecCombination>}
   */
  const result = new Map()

  data.forEach(function (item) {
    const key = item.spec.map(item => item.value).join(',')
    result.set(key, item)
  })

  return result
}

export default {
  name: 'ProductBuy',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    specGroup: () => import('@/view/product/components/spec-group.vue'),
    specItem: () => import('@/view/product/components/spec-item.vue')
  },
  data() {
    return {
      detail,
      specCombinationList,
      specCombinationMap: createSpecCombinationMap(specCombinationList),
      specMatrix: new SpecMatrix(detail.specs, specCombinationList)
    }
  },
  computed: {
    form() {
      /**
       * @type {string[]}
       */
      const result = []

      this.detail.specs.forEach(function (item) {
        if (item.select) result.push(item.select)
      })

      return result
    },
    optionSpecs() {
      return this.specMatrix.getSpecsOptions(this.form)
    },
    currentSpec() {
      if (this.form.length) {
        const key = this.form.join(',')
        return this.specCombinationMap.get(key)
      }

      return null
    }
  },
  mounted() {}
}
</script>

<style lang="scss">
.good-container {
  width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.good-title {
  @include ellipsis;
}

.good-spec {
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
}

.good-spec__item {
  display: flex;
}

.good-spec-title {
  &::after {
    content: '：';
  }
}
</style>
