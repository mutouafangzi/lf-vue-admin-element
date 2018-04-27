import oPanel from './panel.vue';

// 导出模块
export default oPanel;
//global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.component('o-panel', oPanel);
}
