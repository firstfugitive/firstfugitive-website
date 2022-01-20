<template>
  <div>
    <page-header :data="header"/>
    
    <component
      v-for="item in content"
	    :is="item.contentType"
      :data="item"
      :key="`${item.contentType}_${item.sys.id}`"
      :contentTypeId="item.sys.id"
    />
    
    <page-footer :data="footer"></page-footer>
  </div>
</template>

<script>
import PageConfigMixin from '../../assets/js/PageConfigMixin.js';
import PageHeader from '../../components/organism/PageHeader.vue'
import PageFooter from '../../components/organism/PageFooter.vue'

export default {
  name: "ContentStandard",
  components: { PageHeader, PageFooter },
  mixins: [PageConfigMixin],
  props: {
    data: {},
  },
  computed: {
    content() {
	  if (!this.data?.fields?.content) {
        return [];
      }
      return Object.values(this.data?.fields?.content)
        .filter(i => i instanceof Object)
        .flat()
        .map(i => ({
          ...i,
          contentType: i?.sys?.contentType?.sys?.id
      }));
    },
  },
};
</script>
