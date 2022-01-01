<template>
  <div>
    <div class="content-blog-overview__intro">
      Read through some blogs
    </div>
    <div class="content-blog-overview__blogs">
      <nuxt-link class="content-blog-overview__blog-teaser"
        :to="getUrlFromBlog(item)"
        v-for="(item, index) in items" 
        :key="`blog-teaser_${index}`">
        <img class="content-blog-overview__blog-image" :src="getImageSrcFromBlog(item)" />
        <div class="content-blog-overview__blog-title">
          {{ getTitleFromBlog(item) }}
        </div>
      </nuxt-link>
    </div>

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
import { getUrlFromPage } from '../../assets/js/Util.js';
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
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    @include mb-down($mobile-max) {
      margin: 0 5%;
    }
  }
  &__blog-teaser {
    text-align: center;
    max-width: 200px;
    text-decoration: none;
    @extend %boxShadow;
    border-radius: 8px;
    color: $dark-text;
    &:visited {
      color: $dark-text;
      text-decoration: none;
    }
    &:hover {

    }
    img {
      max-width: 100%;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
    }
  }
  &__blog-title {
    padding: 0.6rem 1.3rem;
    @include mb-up($tablet-min) {
      padding: 0.8rem 1.6rem;
    }
    @include mb-up($desktop-min) {
      padding: 1rem 2rem;
    }
  }
}

</style>