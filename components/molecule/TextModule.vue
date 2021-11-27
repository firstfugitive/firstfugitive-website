<template>
  <div class="text-module">{{ text }}</div>
</template>

<script>
export default {
  name: "TextModule",
  props: {
    data: Object,
  },
  computed: {
    text() {
      return this.data?.fields?.text;
    },
  },
};
</script>


<style lang="scss" >
@import "assets/css/variables";

.text-module {
  text-align: center;
  padding: 4rem 5rem;
}
</style>