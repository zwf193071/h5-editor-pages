import { merge } from 'lodash'
import editorProjectConfig from '@client/pages/editor/DataModel'
/**
 * 编辑器数据状态存储
 */
const state = {
    // 当前编辑器编辑工程项目数据
    projectData: {

    },
    // 当前正在编辑的页面uuid
    activePageUUID: '',
    // 画板中选中的元素uuid
    activeElementUUID: ''
}
const actions = {
    /**
	 * 初始化编辑项目数据
	 * @param state
	 * @param data
	 */
    setPrjectData({ commit, state, dispatch }, data) {
        let projectData = data;
        if (!projectData) {
            projectData = editorProjectConfig.getProjectConfig()
        }
        commit('setPrjectData', projectData);
        // 判断如果有页面择选中第一个没有则新建一个页面再选中第一个
        if (!state.projectData.pages || !state.projectData.pages.length) {
            dispatch('addPage')
        }
        dispatch('setActivePageUUID', state.projectData.pages[0].uuid)
    },
    /**
	 * 设置当前选中页面uuid
	 * @param state
	 * @param data
	 */
    setActivePageUUID({ commit }, uuid) {
        commit('setActivePageUUID', uuid);
        // 当前选中页面切换后清空元素选中的uuid
        commit('setActiveElementUUID', '');
    },
    /**
	 * 设置当前选中激活元素uuid
	 * @param state
	 * @param data
	 */
    setActiveElementUUID({ commit }, uuid) {
        commit('setActiveElementUUID', uuid);
    },
    /**
	 * 添加元素
	 * @param commit
	 * @param data
	 */
    addElement({ commit }, elData) {
        let activePage = getters.activePage(state)
        let data = editorProjectConfig.getElementConfig(elData, { zIndex: activePage.elements.length + 1 })
        commit('addElement', data);
        commit('setActiveElementUUID', data.uuid);
    },
    /**
	 * 元素指令， 用于结束针对元素修改相关指令，再由此方法派发actions做具体修改
	 * @param dispatch
	 * @param type
	 * @param data
	 */
    elementCommand({ commit, dispatch, state }, command) {
        let elData = getters.activeElement(state)
        switch (command) {
            case 'copy':
                console.log(commit);
                dispatch('copyElement', elData)
                break;
            case 'delete':
                dispatch('deleteElement', elData.uuid)
                break;
            case 'fontA+':
                dispatch('resetElementCommonStyle', { fontSize: elData.commonStyle.fontSize + 1 })
                break;
            case 'fontA-':
                dispatch('resetElementCommonStyle', { fontSize: elData.commonStyle.fontSize - 1 })
                break;
            case 'fontB':
                dispatch('resetElementCommonStyle', { fontWeight: elData.commonStyle.fontWeight === 'bold' ? 'normal' : 'bold' })
                break;
            default:
                break;
        }
    },
    /**
	 * 添加页面
	 * @param commit
	 */
    addPage({ commit }, uuid) {
        let data = editorProjectConfig.getPageConfig()
        let index = -1;
        if (uuid) {
            index = state.projectData.pages.findIndex(v => { return v.uuid === uuid })
        } else {
            index = state.projectData.pages.length - 1;
        }
        commit('insertPage', data, index);
    },
    resetElementCommonStyle({ commit }, style) {
        commit('resetElementCommonStyle', style)
    },
    deleteElement({ state, commit }, uuid) {
        // 如果删除选中元素则取消元素选中
        if (uuid === state.activeElementUUID) {
            commit('setActiveElementUUID', '')
        }
        commit('deleteElement', uuid)
    },
    copyElement({ state, commit }, elData) {
        let copyOrignData = elData ? elData : getters.activeElement(state)
        let activePage = getters.activePage(state)
        let data = editorProjectConfig.copyElement(copyOrignData, { zIndex: activePage.elements.length + 1 })
        commit('addElement', data);
        commit('setActiveElementUUID', data.uuid)
    }
}
const mutations = {
    setPrjectData(state, data) {
        state.projectData = data;
    },
    setActivePageUUID(state, data) {
        state.activePageUUID = data;
    },
    setActiveElementUUID(state, data) {
        state.activeElementUUID = data;
    },
    /**
	 * 往画板添加元素
	 * @param state
	 * @param elData
	 */
    addElement(state, elData) {
        let index = state.projectData.pages.findIndex(v => { return v.uuid === state.activePageUUID })
        state.projectData.pages[index].elements.push(elData);
    },
    /**
	 * 重置元素样式，
	 * @param commit
	 * @param uuid
	 * @param styleObject
	 */
    resetElementCommonStyle(state, style) {
        let activeElement = getters.activeElement(state)
        activeElement.commonStyle = merge(activeElement.commonStyle, style)
    },
    /**
	 * 往画板删除元素
	 * @param state
	 * @param elData  activeElementIndex
	 */
    deleteElement(state, uuid) {
        let activePage = getters.activePage(state)
        let elementIndex = activePage.elements.findIndex(v => { return v.uuid === uuid })
        activePage.elements.splice(elementIndex, 1)
    },
}
const getters = {
    /**
	 * 当前选中的页面index
	 * @param state
	 * @returns {*}
	 */
    currentPageIndex(state) {
        // 如果不存在页面返回-1
        if (!state.projectData.pages) {
            return -1;
        }
        return state.projectData.pages.findIndex(v => { return v.uuid === state.activePageUUID })
    },
    /**
	 * 当前选中的页面index
	 * @param state
	 * @returns {*}
	 */
    activeElementIndex(state) {
        // 如果不存在页面返回-1
        if (!state.projectData.pages) {
            return -1;
        }
        let currentPageIndex = state.projectData.pages.findIndex(v => { return v.uuid === state.activePageUUID })
        if (currentPageIndex === -1) {
            return -1;
        }
        return state.projectData.pages[currentPageIndex].elements.findIndex(v => { return v.uuid === state.activeElementUUID })
    },
    /**
	 * 当前选中的页面
	 */
    activePage() {
        // 如果不存在页面返回-1
        if (!state.projectData.pages || !state.activePageUUID) {
            return { commonStyle: {}, config: {} };
        }
        return state.projectData.pages.find(v => { return v.uuid === state.activePageUUID })
    },
    /**
	 * 当前选中元素
	 */
    activeElement() {
        // 如果不存在页面返回-1
        if (!state.projectData.pages) {
            return { commonStyle: {}, propsValue: {} };
        }
        let currentPageIndex = state.projectData.pages.findIndex(v => { return v.uuid === state.activePageUUID })
        if (currentPageIndex === -1) {
            return { commonStyle: {}, propsValue: {} };
        }
        return state.projectData.pages[currentPageIndex].elements.find(v => { return v.uuid === state.activeElementUUID })
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}