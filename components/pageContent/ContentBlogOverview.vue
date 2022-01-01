<template>
  <div>
    <component
      v-for="item in content"
	    :is="item.contentType"
      :data="item"
      :key="`${item.contentType}_${item.sys.id}`"
      :contentTypeId="item.sys.id"
    />
  </div>
</template>

<script>
import ImageFullSize from '../molecule/ImageFullSize.vue';
import BlogService from '../../assets/js/BlogService.js';
export default {
  components: { ImageFullSize },
  name: "ContentBlogOverview",
  props: {
    data: {},
  },
  data() {
    return {
      items: []
    }
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
  mounted() {
    this.fetchBlogEntries();
  },
  methods: {
    async fetchBlogEntries() {
      this.items = await BlogService.fetchAll();
    }
  }
};
</script>

<style lang="scss">
@import 'assets/css/variables.scss';
@import 'assets/css/placeholder.scss';

.content-blog-overview {
}

</style>