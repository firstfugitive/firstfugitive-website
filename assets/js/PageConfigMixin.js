export default {
    props: {
        standardPageConfig: Object
    },
    computed: {
        header() {
            return this.standardPageConfig?.fields?.header;
        },
        footer() {
            return this.standardPageConfig?.fields?.footer;
        }
    }
}
