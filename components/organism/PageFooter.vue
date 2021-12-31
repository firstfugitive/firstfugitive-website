<template>
    <footer class="page-footer">
      © Ben Jacobsen 2022
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
  background-color: $color-white;
  color: $dark-text;
  font-size: 1rem;
}
</style>