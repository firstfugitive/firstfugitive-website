<template>
  <div class="module slider-full-size">
    <hooper class="slider-full-size__slider"
			:infiniteScroll="true" 
			:autoPlay="true" 
			:playSpeed="7000">
      <slide>
        <img class="" :src="firstImageSrc" />
      </slide>
      <slide>
        <img class="" :src="secImageSrc" />
        
      </slide>
			
    	<hooper-pagination slot="hooper-addons"></hooper-pagination>
    </hooper>
		<div class="slider-full-size__modal">
			<base-link :url="link" :text="linkText"></base-link>
		</div>
  </div>
</template>

<script>
import BaseLink from "../atom/BaseLink.vue";
import { Hooper, Slide, Pagination as HooperPagination } from "hooper";
import 'hooper/dist/hooper.css';

export default {
  components: { BaseLink, Hooper, Slide, HooperPagination },
  name: "SliderFullSize",
  props: {
    data: Object,
  },
  computed: {
    images() {
      return this.data?.fields?.items;
    },
    firstImage() {
      return this.images ? this.images[0] : undefined;
    },
    firstImageSrc() {
      return this.firstImage?.fields?.file?.url;
    },
    secImage() {
      return this.images ? this.images[1] : undefined;
    },
    secImageSrc() {
      return this.secImage?.fields?.file?.url;
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

.slider-full-size {
  height: 100vh;
  width: 100vw;
  position: relative;

  /* &:before {
        width: 100%;
        display: table;
        content: '';
        padding-top: 56.25%;
    }

    img {
        position: absolute;
        top: 0;
        width: 100%;
        left: 0;
    } */

	&__slider {
		height: 100%;
		img {
			display: block;
			width: 100vw;
			height: 100vh;
			object-fit: cover;
		}

		.hooper-indicator.is-active,
		.hooper-indicator:hover {
			background-color: black;
		}
	}

  /* img {
    display: block;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  } */

  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>