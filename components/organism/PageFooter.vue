<template>
    <footer class="page-footer">
      {{ copyright }}
    </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    data: Object,
  },
  computed: {
    copyright() {
      return this.data?.fields?.copyright;
    },
  }
}

</script>

<style lang="scss" >
@import "assets/css/variables";

.page-footer {
  text-align: center;
  padding: 1rem 5rem;
  background-color: $color-white;
  color: $dark-text;
  font-size: 1rem;
}
</style>