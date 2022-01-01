<template>
  <div>
    <image-full-size
      :data="data"
    >
      <div class="content-blog__details">
        <div class="content-blog__title">{{ title }}</div>
        <div class="content-blog__date">{{ date }}</div>
      </div>
    </image-full-size>

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
import { formatDate } from '../../assets/js/Util.js';
export default {
  components: { ImageFullSize },
  name: "ContentBlog",
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
    date() {
      let rawDate = this.data?.fields?.creationDate;
      return formatDate(rawDate);
    },
    title() {
      return this.data?.fields?.title;
    }
  }
};
</script>

<style lang="scss">
@import 'assets/css/variables.scss';
@import 'assets/css/placeholder.scss';

.content-blog {
  &__details {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    background-color: $color-transparent-white;
    //border: 1px solid $color-design-black;
    @extend %borderRadius;
    padding: 8% 10%;
    @include mb-up($tablet-min) {
      padding: 2rem 3rem;
    }
    @include mb-up($desktop-min) {
      padding: 3.5rem 5rem;
    }
  }

  &__title {
    @extend %fontGotham;
    @extend %fontVeryBig;
    margin-bottom: 1rem;
    @include mb-up($tablet-min) {
      margin-bottom: 1.5rem;
    }
  }

  &__date {
    @extend %fontStandard;
  }
}

</style>