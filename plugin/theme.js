import fs from 'fs'
import glob from 'glob'
import postcss from 'postcss'

/**
 * @param {string} sourcePath
 */
function parseAst(sourcePath) {
  const source = fs.readFileSync(sourcePath, 'utf-8')
  const root = postcss.parse(source)

  /**
   * @type {Record<string, {name: string, value: string}>[]}
   */
  const result = []

  root.walkDecls(function (decl) {
    if (decl.parent && decl.parent.type === 'root') {
      result.push({ name: decl.prop, value: decl.value })
    }
  })

  return result
}

/**
 * @param {{name: string, value: string}[]} data
 */
function transformVariable(data) {
  /**
   * @type {{light:{name:string,value:string}[], dark:{name:string,value:string}[]}}
   */
  const theme = { light: [], dark: [] }

  data.forEach(item => {
    if (/light$/.test(item.name)) {
      theme.light.push(item)
    } else {
      theme.dark.push(item)
    }
  })

  /**
   * @param {{name: string, value: string}[]} data
   * @param {'light'|'dark'} model
   */
  const format = function (data, model) {
    return data
      .map(function (item) {
        const regExp = new RegExp(`(?<=\\$--).+(?=-${model})`)
        const variable = regExp.exec(item.name)[0]
        return variable + ': ' + item.name
      })
      .join(',\n')
  }

  /**
   *
   * @param {{name: string, value: string}[]} data
   */
  function variable(data) {
    return data.map(item => `${item.name}: ${item.value};`).join('\n')
  }

  return `
    ${variable(data)}

    $themes: (
      light: (
        ${format(theme.light, 'light')}
      ),
      dark: (
        ${format(theme.dark, 'dark')}
      )
    );
  `
}

/**
 * @param {object} option
 * @param {string} option.pattern
 * @returns {import('vite').Plugin}
 */
function theme(option) {
  const scss = glob.sync(option.pattern)
  const scssVariable = scss.flatMap(parseAst)

  return {
    name: 'theme-variable',
    config(config) {
      const scss = config.css.preprocessorOptions.scss
      scss.additionalData += transformVariable(scssVariable)
      return config
    }
  }
}

export default theme
