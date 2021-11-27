<template>
    <footer class="page-footer">
      © Ben Jacobsen 2021
    </footer>
</template>

<script>
export default {
  name: "Footer"
}

</script>

<style lang="scss" >
@import "assets/css/variables";

.page-footer {
  text-align: center;
  padding: 1rem 5rem;
  background-color: $color-design-grey;
  color: $bright-text;
}
</style>