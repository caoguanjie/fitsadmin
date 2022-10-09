import ButtonTest from './Form/ButtonTest.vue'
import FitsTreeSelect from './Form/FitsTreeSelect.vue';
import FitsIconSelect from './Form/FitsIconSelect.vue';
import FitsCheckboxAll from './Form/FitsCheckboxAll.vue'
import FitsFormCreate from './Common/FitsFormCreate.vue'
import type { App } from 'vue'

const FitAdminUI = {
    install: (app: App<Element>) => {
        app.component('FitsButtonTest', ButtonTest);
        app.component('FitsTreeSelect', FitsTreeSelect);
        app.component('FitsIconSelect', FitsIconSelect);
        app.component('FitsCheckboxAll', FitsCheckboxAll);
        app.component('FitsFormCreate', FitsFormCreate);
    }
}


export default FitAdminUI