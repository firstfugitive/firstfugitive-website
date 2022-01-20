<template>
  <div 
    :class="['base-text', {'text-module--big': big}, {'text-module--bold': bold}, {'text-module--gotham': gotham}]"
    :style="`text-align: ${align}`">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "BaseText",
  props: {
    text: String,
    align: String,
    big: Boolean,
    bold: Boolean,
    gotham: Boolean
  },
};
</script>


<style lang="scss" >
@import "assets/css/variables";
@import 'assets/css/placeholder.scss';

.base-text {
  &--big {
    @extend %fontVeryBig;
  }

  &--bold {
    font-weight: bold;
  }

  &--gotham {
    @extend %fontGotham;
  }

}
</style>