<template>
  <div>
    <component
      v-for="item in content"
	    :is="item.contentType"
      :data="item"
      :key="`${item.contentType}_${item.sys.id}`"
      :contentTypeId="item.sys.id"
    >
      <div class="content-entry__button">
        <base-button :url="link" :text="linkText"></base-button>
      </div>
    </component>
  </div>
</template>

<script>
import BaseButton from '../atom/BaseButton.vue';
export default {
  components: { BaseButton },
  name: "ContentEntry",
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
    link() {
      let linkObject = this.data?.fields?.link;
      let slug = linkObject?.fields?.slug;
      let urlSubfolder = linkObject?.fields?.urlSubfolder?.fields?.path;
      if (slug && urlSubfolder) {
        return `${urlSubfolder}${slug}`;
      }
      return undefined;
    },
    linkText() {
      return this.data?.fields?.linkText;
    },
  },
};
</script>

<style lang="scss">

@import 'assets/css/variables.scss';
@import 'assets/css/placeholder.scss';

.link {
  position: absolute;
  top:0;
  left:0;
}

.content-entry__button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    @extend %fontGotham;
  }
</style>
