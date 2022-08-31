import ButtonTest from './Form/ButtonTest.vue'
import type { App } from 'vue'

const FitAdminUI = {
    install: (app: App<Element>) => {
        app.component('FitsButtonTest', ButtonTest);
    }
}


export default FitAdminUI