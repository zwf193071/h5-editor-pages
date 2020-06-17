import Text from './text'

const components = [
    Text
]
const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    components.map(component => Vue.component(component.name, component))
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
let _he_register_components_object = {};
components.forEach(item => {
    _he_register_components_object[item.name] = item
})
export {
    Text,
    _he_register_components_object
}