<template>
  <div class="base-link">
    <nuxt-link class="link" :to="url">{{ text }}</nuxt-link>
  </div>
</template>

<script>
export default {
  name: "BaseLink",
  props: {
    url: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
};
</script>


<style lang="scss" scoped>
.base-link {

  .link {
    border: 2px solid black;
    padding: 1rem 2rem;
    &:hover {
        background: rgba(220, 171, 171, 0.1);
    }

    text-decoration: none;
    &:visited {
      color: black;
    }
  }
}
</style>