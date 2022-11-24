import fs from 'fs'
import scssParser from 'scss-parser'
import query from 'query-ast'

function parseAst(source) {
  const data = fs.readFileSync(source, 'utf-8')
  const ast = scssParser.parse(data)
  const $ = query(ast)

  /**
   * @type {Record<string, {name: string, value: string}>[]}
   */
  const response = $('declaration').map(function (item) {
    const name = '$' + $(item).find('variable').first().value().trim()

    const value = (function () {
      const hasFunction = $(item).find('value').has('function').length()
      if (hasFunction) {
        const functionType = $(item).find('value').has('function')
        const identifierValue = functionType.find('identifier').value()
        const argumentsValue = functionType.find('arguments').value()
        return identifierValue + '(' + '$' + argumentsValue + ')'
      }

      return '#' + $(item).find('value').value().trim()
    })()
    return { name, value }
  })

  return response
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

  return `
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
 * @param {string} option.variable
 * @returns {import('vite').Plugin}
 */
function theme(option) {
  const scssVariable = parseAst(option.variable)

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
