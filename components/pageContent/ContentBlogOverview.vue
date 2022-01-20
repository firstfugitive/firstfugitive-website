<template>
  <div>
    <page-header :data="header"></page-header>

    <base-text class="content-blog-overview__intro"
      :big="true"
      :bold="true"
      :gotham="true"
      v-if="headline"
      :text="headline"/>
    
    <div class="content-blog-overview__blogs">
      <blog-teaser
        v-for="(item, index) in items"
        :key="`blog-teaser_${index}`"
        :blogPage="item"></blog-teaser>
    </div>
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
import ImageFullSize from '../molecule/ImageFullSize.vue';
import BlogTeaser from '../molecule/BlogTeaser.vue';
import BlogService from '../../assets/js/BlogService.js';
import { getUrlFromPage } from '../../assets/js/Util.js';
import PageConfigMixin from '../../assets/js/PageConfigMixin.js';
import PageHeader from '../../components/organism/PageHeader.vue'
import PageFooter from '../../components/organism/PageFooter.vue'
import BaseText from '../atom/BaseText.vue';

export default {
  name: "ContentBlogOverview",
  components: { ImageFullSize, BlogTeaser, PageHeader, PageFooter, BaseText },
  mixins: [PageConfigMixin],
  props: {
    data: {},
  },
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.fetchBlogEntries();
  },
  methods: {
    async fetchBlogEntries() {
      this.items = await BlogService.fetchAll();
    },
    getTitleFromBlog(blogPage) {
      return blogPage?.fields?.content?.fields?.title;
    },
    getImageSrcFromBlog(blogPage) {
      return blogPage?.fields?.content?.fields?.image?.fields?.file?.url;
    },
    getUrlFromBlog(blogPage) {
      return getUrlFromPage(blogPage);
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
    headline() {
      return this.data?.fields?.headline;
    }
  },
};
</script>

<style lang="scss">
@import 'assets/css/variables.scss';
@import 'assets/css/placeholder.scss';

.content-blog-overview {
  &__intro {
    margin-top: var(--height-header);
    margin-bottom: 4rem;
    text-align: center;
    @extend %fontGotham;
    @extend %fontVeryBig;
  }
  &__blogs {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: stretch;
    margin: 0 5%;
    gap: 1.5rem;
    @include mb-up($tablet-min) {
      margin: 0 1.5rem;
      gap: 2rem;
    }
    @include mb-up($desktop-min) {
      margin: 0 4rem;
      gap: 3rem;
    }
    @include mb-up($desktop-extended) {
      margin: 0 15rem;
    }
  }
}

</style>