import component1 from '../components/component1.js'

export default {
    name: 'Approfondimento',
    components: {component1},

    setup() {        
        const title = 'Page One'
        return {title}
    },

    template: `
        <div>
            {{ title }}
            <component1></component1>
        </div>
    `,
};