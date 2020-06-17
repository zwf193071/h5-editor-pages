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
        commit('setActiveElementUUID', data.uuid)
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
        commit('addHistoryCache')
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
    }
}
const getters = {
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