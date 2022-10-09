import FitsTreeSelect from './Form/FitsTreeSelect.vue';
import FitsIconSelect from './Form/FitsIconSelect.vue';
import FitsCheckboxAll from './Form/FitsCheckboxAll.vue'
import FitsFormCreate from './Common/FitsFormCreate.vue'
import FitsDialog from './Dialog/FitsDialog.vue'
import FitsDrawer from './Dialog/FitsDrawer.vue'
import FitsFormDialog from './Common/FitsFormDialog.vue'
import FormTitle from './Common/FormTitle.vue'
import FitsCard from './Card/FitsCard.vue'
import FitsEcharts from './Card/FitsEcharts.vue'
import FitsForm from './Form/FitsForm.vue'
import FitsListSearch from './List/FitsListSearch.vue'
import type { App } from 'vue'

const FitAdminUI = {
    install: (app: App<Element>) => {
        app.component('FitsTreeSelect', FitsTreeSelect);
        app.component('FitsIconSelect', FitsIconSelect);
        app.component('FitsCheckboxAll', FitsCheckboxAll);
        app.component('FitsFormCreate', FitsFormCreate);
        app.component('FitsDialog', FitsDialog);
        app.component('FitsDrawer', FitsDrawer);
        app.component('FitsFormDialog', FitsFormDialog);
        app.component('FormTitle', FormTitle);
        app.component('FitsCard', FitsCard);
        app.component('FitsEcharts', FitsEcharts);
        app.component('FitsForm', FitsForm);
        app.component('FitsListSearch', FitsListSearch);
    }
}


export default FitAdminUI