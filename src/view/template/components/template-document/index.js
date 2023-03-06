import Vue from 'vue'
import TemplateDocumentPromptConstructor from './render.vue'

const TemplateDocumentPrompt = Vue.extend(TemplateDocumentPromptConstructor)

/**
 * @type {Vue|null}
 */
let templateDocumentPromptInstance = null

/**
 * @returns {Promise<'ok'|'cancel'>}
 */
export default function templateDocumentPrompt() {
  if (!templateDocumentPromptInstance) {
    templateDocumentPromptInstance = new TemplateDocumentPrompt()
    templateDocumentPromptInstance.$mount()

    document.body.appendChild(templateDocumentPromptInstance.$el)
  }

  return templateDocumentPromptInstance.open()
}
