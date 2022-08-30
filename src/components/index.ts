import ButtonTest from './Form/ButtonTest.vue'
import TreeSelect from './Form/TreeSelect.vue'
import type { App } from 'vue'

const FitAdminUI = {
    install: (app: App<Element>) => {
        app.component('FitsButtonTest', ButtonTest);
        app.component('FitsTreeSelect', TreeSelect);
    }
}


export default FitAdminUI