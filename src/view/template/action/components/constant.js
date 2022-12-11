import { TemplateMMSize } from '@/view/template/action/class/size'

export async function size() {
  const A4size = new TemplateMMSize({ width: 210, height: 297 })
  const A5size = new TemplateMMSize({ width: 148, height: 210 })

  console.log(A4size)

  await A4size.init()
  await A5size.init()

  return {
    A4: A4size.toPixel(),
    A5: A5size.toPixel()
  }
}
