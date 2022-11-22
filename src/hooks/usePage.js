import { computed, reactive, toRefs, watch } from 'vue'
import { debounce } from 'lodash-es'

/**
 * @this Page
 * @param {Page.Option} option
 * @param {object} searchFields
 * @param {number} searchFields.page
 * @param {number} searchFields.limit
 */
function updateFields(searchFields, option, form) {
  searchFields.page = this.pagination.current
  searchFields.limit = this.pagination.limit

  for (const [key, value] of Object.entries(form)) {
    if (option.ignoreField.some(ignoreField => ignoreField === key)) {
      continue
    }

    searchFields[key] = value
  }
}

/**
 * @param {Record<string, unknown>} searchFields
 */
function resetFields(searchFields) {
  Object.keys(searchFields).forEach(key => {
    delete searchFields[key]
  })
}

/**
 * @param {Page.Option['timeFieldMap']} field
 * @param {Record<string, unknown>} form
 */
function pageHelpComputed(field, form) {
  /**
   * @type {Record<string, unknown>}
   */
  const pageHelpComputed = reactive({})

  for (const [mapKey, value] of Object.entries(field)) {
    const [startTimeKey, endTimeKey] = value

    pageHelpComputed[mapKey] = computed({
      get() {
        if (form[startTimeKey]) {
          return [form[startTimeKey], form[endTimeKey]]
        }

        return null
      },
      set(val) {
        const [startTime, endTime] = val || ['', '']

        form[startTimeKey] = startTime
        form[endTimeKey] = endTime
      }
    })
  }

  return pageHelpComputed
}

/**
 * @type {Page.Option}
 */
const defaultOption = { immediate: true, ignoreField: [], timeFieldMap: Object.create(null) }

/**
 * @param {Page.Option} opt
 * @param {Record<string, unknown>} form
 */
export function usePage(opt, form) {
  /** @type {Record<string, unknown>} */
  const searchFields = Object.create(null)
  /** @type {Page.Option} */
  const option = Object.assign({}, defaultOption, opt)

  const state = reactive({
    pagination: {
      limit: 20,
      current: 1,
      total: 0,
      sizes: [20, 50, 100],
      layout: ['total', 'prev', 'pager', 'next', 'sizes', 'jumper'].join(',')
    },
    table: {
      loading: false,
      data: []
    }
  })

  /**
   * @param {Record<string, unknown>} [params]
   */
  const fetchData = async function (params) {
    state.table.loading = true

    try {
      const response = await option.request({ ...params, ...searchFields })
      state.table.data = response.list
      state.pagination.total = response.totalCount
    } finally {
      state.table.loading = false
    }
  }

  const resetForm = function (ref) {
    resetFields(searchFields)
    ref.resetFields()
    search()
  }

  /**
   * @param {number} [current]
   */
  const search = debounce(function (current) {
    if (typeof current === 'number') {
      const params = {
        limit: state.pagination.limit,
        page: state.pagination.current
      }

      updateFields.call(state, searchFields, option, form)
      fetchData(params)
      return
    }

    if (state.pagination.current === 1) {
      search(1)
      return
    }

    state.pagination.current = 1
  }, 300)

  if (option.immediate) {
    search()
  }

  const helpComputed = pageHelpComputed(option.timeFieldMap, form)

  for (const [keyMap, value] of Object.entries(option.timeFieldMap)) {
    const [startTimeKey] = value

    watch(
      () => form[startTimeKey],
      function (val) {
        if (!val) helpComputed[keyMap] = null
      }
    )
  }

  // watch(() => state.pagination.current, search)
  // watch(
  //   () => state.pagination.limit,
  //   function (val) {
  //     console.log(Math.ceil(state.pagination.total / val), state.pagination.current)
  //     /**
  //      * 当前总数 / 新分页条数 = 修改后最大页码
  //      * 如果小于 当前页码
  //      * 说明 当前页码需要更新为 修改后最大页码
  //      * 取消获取数据请求
  //      * 页码更新
  //      */
  //     if (Math.ceil(state.pagination.total / val) < state.pagination.current) return
  //     search(state.pagination.current)
  //   }
  // )

  return {
    resetForm,
    search,
    ...toRefs(state),
    ...toRefs(helpComputed)
  }
}
