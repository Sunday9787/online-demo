import _ from 'lodash-es'

/**
 * @this Page
 * @param {Page.Option} option
 * @param {object} searchFields
 * @param {number} searchFields.page
 * @param {number} searchFields.limit
 */
function updateFields(searchFields, option) {
  searchFields.page = this.pagination.current
  searchFields.limit = this.pagination.limit

  for (const [key, value] of Object.entries(this.form)) {
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
 */
function pageHelpWatch(field) {
  /**
   * @type {Record<string, Vue.WatchHandler<string>>}
   */
  const watch = Object.create(null)

  for (const [keyMap, value] of Object.entries(field)) {
    const [startTimeKey] = value
    const watchKey = ['this.form', startTimeKey].join('.')

    /**
     * @this {Page}
     */
    watch[watchKey] = function (val) {
      if (!val) this[keyMap] = null
    }
  }

  return watch
}

/**
 * @param {Page.Option['timeFieldMap']} field
 */
function pageHelpComputed(field) {
  /**
   * @type {Record<string, Vue.ComputedOptions<string[]|null>>}
   */
  const computed = Object.create(null)

  for (const [mapKey, value] of Object.entries(field)) {
    const [startTimeKey, endTimeKey] = value

    computed[mapKey] = {
      /**
       * @this {Page}
       */
      get() {
        if (this.form[startTimeKey]) {
          return [this.form[startTimeKey], this.form[endTimeKey]]
        }

        return null
      },
      /**
       * @this {Page}
       * @param {null|[string, string]} val
       */
      set(val) {
        const [startTime, endTime] = val || ['', '']

        this.form[startTimeKey] = startTime
        this.form[endTimeKey] = endTime
      }
    }
  }

  return computed
}

/**
 * @type {Page.Option}
 */
const defaultOption = { immediate: true, ignoreField: [], timeFieldMap: Object.create(null) }

/**
 * @param {Page.Option} opt
 */
function page(opt) {
  /** @type {Record<string, unknown>} */
  const searchFields = Object.create(null)
  /** @type {Page.Option} */
  const option = Object.assign({}, defaultOption, opt)

  /**
   * @type {Vue.ComponentOptions<Page>}
   */
  const mixin = {
    data() {
      return {
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
      }
    },
    computed: pageHelpComputed(option.timeFieldMap),
    created() {
      if (option.immediate) {
        this.search()
      }
    },
    methods: {
      /**
       * @param {string} ref
       */
      resetForm(ref) {
        resetFields(searchFields)
        this.$refs[ref].resetFields()
        this.search()
      },
      /**
       * @this {Page}
       */
      search: _.debounce(
        /**
         * @this {Page}
         * @param {number} [current]
         */
        function (current) {
          if (typeof current === 'number') {
            const params = {
              limit: this.pagination.limit,
              page: this.pagination.current
            }

            updateFields.call(this, searchFields, option)
            this._fetchData(params)
            return
          }

          if (this.pagination.current === 1) {
            this.search(1)
            return
          }

          this.pagination.current = 1
        },
        300
      ),
      /**
       * @param {Record<string, unknown>} [params]
       */
      async _fetchData(params) {
        this.table.loading = true

        try {
          const response = await option.request({ ...params, ...searchFields })
          this.table.data = response.list
          this.pagination.total = response.totalCount
        } finally {
          this.table.loading = false
        }
      }
    },
    watch: Object.assign(
      {
        /**
         * @this {Page} Page
         * @param {number} val
         */
        'pagination.current'(val) {
          this.search(val)
        },
        /**
         * @this {Page} Page
         * @param {number} val
         */
        'pagination.limit'(val) {
          console.log(Math.ceil(this.pagination.total / val), this.pagination.current)
          /**
           * 当前总数 / 新分页条数 = 修改后最大页码
           * 如果小于 当前页码
           * 说明 当前页码需要更新为 修改后最大页码
           * 取消获取数据请求
           * 页码更新
           */
          if (Math.ceil(this.pagination.total / val) < this.pagination.current) return
          this.search(this.pagination.current)
        }
      },
      pageHelpWatch(option.timeFieldMap)
    )
  }

  return mixin
}

export default page
