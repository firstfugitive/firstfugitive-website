<template>
  <div class="image-full-size">
    <img class="" :src="getImageSrc(image)" />
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "SliderFullSize",
  props: {
    data: Object,
  },
  methods: {
    getImageSrc(image) {
      return image.fields?.file?.url;
    },
  },
  computed: {
    image() {
      return this.data?.fields?.image;
    },
  },
};
</script>


<style lang="scss">

@import 'assets/css/placeholder.scss';

.image-full-size {
  height: 100vh;
  width: 100vw;
  position: relative;

    img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }

  
}
</style>