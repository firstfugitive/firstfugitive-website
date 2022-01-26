<template>
  <nuxt-link :class="['base-link', {'base-link--dark': darkStyle}]" :to="url"><slot></slot></nuxt-link>
</template>

<script>
export default {
  name: "BaseLink",
  props: {
    url: {
      type: String,
      required: true,
    },
    darkStyle: {
      type: Boolean,
      required: false
    }
  },
};
</script>


<style lang="scss" >
@import "assets/css/variables";

.base-link {
  text-decoration: none;
  color: $bright-text;
  &:visited {
    color: $bright-text;
    text-decoration: none;
  }

  &--dark {
    color: $dark-text;
    &:visited {
      color: $dark-text;
    }
  }
}
</style>