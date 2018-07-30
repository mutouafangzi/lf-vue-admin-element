/* import Common from './Common'
import MuseUI from './Muse-UI'
import MintUI from './Mint-UI'
import iViewUI from './iView-UI' */

var getTemplate = function (info, _attr = {}, _slots = {}) {
  let component = {
    template: "<div data-component-active tabIndex='0'  label='按钮' type='default'  style='background-color: #00a1b7;width: 100px;height: 100px'> 按钮</div>",
    attributes: { }
  }
  // 没有class属性的，添加class属性
  if (!component.attributes.class) {
    component.attributes.class = {
      type: 'text',
      value: ''
    }
  }

  // 添加组件标识 (info.id是唯一标识)
  component.template = component.template.replace(' ', ' data-component-active tabIndex="0" ')

  component.info = info

  return component
}

var getSlotContent = function (slots) {
  let inner = ''
  let components = JSON.parse(JSON.stringify(_Vue.$store.state.components))
  Object.keys(slots).forEach(slot => {
    slots[slot].forEach(({ id }) => {
      let component = components.find(component => component.info.id === id)
      let children = []
      Object.keys(component.slots).forEach(slot => {
        component.slots[slot].forEach(item => children.push(item))
      })

      component.attributes.slot = component.slot // 设置当前组件的slot ，getTemplate中根据这个属性设置模板的slot，不存在则不设置
      component = getTemplate(component.info, component.attributes, component.slots)

      // 为嵌套的组件添加id属性 具备id属性 才能选中后属性视图内容变更
      if (component.template.indexOf(`id="${id}"`) == -1) { component.template = component.template.replace(' ', ` id="${id}" `) }

      inner += component.template
    })
  })
  return inner
}
var getStringTypeAttr = function (attributes) {
  // value为空的不添加到模板中
  let stringAttr = ''
  Object.keys(attributes).forEach(key => {
    let attrKey
    let arr = ['text', 'selection', 'icon', 'ionicon', 'color'] // 这些类型都不用加bind
    if (arr.includes(attributes[key].type) || attributes[key].notBind) {
      attrKey = key
    } else {
      attrKey = `:${key}`
    }
    let attr = attributes[key].value ? `${attrKey}="${attributes[key].value}"\n` : ''
    stringAttr += attr
  })
  return stringAttr
}
export { getSlotContent, getTemplate, getStringTypeAttr }
