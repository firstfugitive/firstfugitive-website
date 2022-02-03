<template>
  <nuxt-link class="blog-teaser" :to="getUrlFromBlog(blogPage)">
    <picture class="blog-teaser__image" >
      <img :src="getImageSrcFromBlog(blogPage)" />
    </picture>
    <div class="blog-teaser__title">
      {{ getTitleFromBlog(blogPage) }}
    </div>
  </nuxt-link>
</template>

<script>
import { getUrlFromPage } from '../../assets/js/Util.js';

export default {
  name: "BlogTeaser",
  props: {
    blogPage: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getTitleFromBlog(blogPage) {
      return blogPage?.fields?.content?.fields?.title;
    },
    getImageSrcFromBlog(blogPage) {
      return blogPage?.fields?.content?.fields?.image?.fields?.file?.url;
    },
    getUrlFromBlog(blogPage) {
      return getUrlFromPage(blogPage);
    },
  },
};
</script>


<style lang="scss" >
@import "assets/css/variables";
@import 'assets/css/placeholder.scss';

.blog-teaser {
  overflow: hidden;
  text-align: center;
  max-width: 300px;
  text-decoration: none;
  @extend %boxShadow;
  border-radius: 8px;
  color: $dark-text;
  width: calc(100% - 2rem);
  @include mb-up($tablet-min) {
    width: calc(50% - 2rem);
  }
  &:visited {
    color: $dark-text;
    text-decoration: none;
  }
  &:hover {
    @extend %boxShadowHover;
  }
  &__image {
    display: flex;
    justify-content: center;
    img {
      width: 100%;
      object-fit: cover;
      border-top-right-radius: 8px;
      border-top-left-radius: 8px;
      height: 130px;
      @include mb-up($tablet-min) {
        height: 150px;
      }
      @include mb-up($desktop-min) {
        height: 200px;
      }
    }
  }
  &__title {
    line-height: 1.5rem;
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