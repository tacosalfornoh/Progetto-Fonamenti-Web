import component2 from '../../../../../Downloads/Vue3-QuickStart-master/Vue3-QuickStart-master/components/component2.js'
import functions from '../../../../../Downloads/Vue3-QuickStart-master/Vue3-QuickStart-master/functions.js'

export default {
    name: 'Page2',
    components: {component2},

    setup() {
        const title = 'Page Two'

        //get url parameter 'msg' (for example: /page2?msg=something)
        const msg = functions.getUrlParam('msg');
    
        return {title, msg}
    },
    
    template: `
        <div>
            {{ title }}
            <component2 :message="msg"></component2>
        </div>
    `,
  };