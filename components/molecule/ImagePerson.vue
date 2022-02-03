<template>
    <div class="module image-person">
        <img class="" :src="getImageSrc(image)" />
    </div>
</template>

<script>

export default {
  name: "ImagePerson",
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


<style lang="scss" >

.image-person {
    text-align: center;
    width: 150px;
    height: 150px;
    position: relative;
    overflow: hidden;
    img {
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
    }
}
</style>