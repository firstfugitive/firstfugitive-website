<template>
  <div class="base-button">
    <base-link class="link" :url="url" :text="text"></base-link>
  </div>
</template>

<script>
import BaseLink from './BaseLink.vue';
export default {
  components: { BaseLink },
  name: "BaseButton",
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


<style lang="scss" >
@import 'assets/css/variables';
@import 'assets/css/placeholder.scss';

.base-button {
	position: relative;
	text-align: center;

  .link {
    display: block;
    position: relative;
    padding: 1rem 2rem;
    border: 1px solid $color-white;
    @extend %borderRadius;
    transition: background-color 0.5s;

    &:hover {
      background-color: $color-soft-white;
    }
  }
}

/* 
style: transparent, border, animation
.base-button {
  position: relative;
	text-align: center;

	.link {
		display: block;
		position: relative;
		padding: 1rem 2rem;
  	border: 1px solid $color-white;

		&::after {
			content: '';
			position: absolute;
			z-index: -1;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 0%;
			transition: height 0.5s;
			background-color: $color-transparent-white;
		}
		&:hover::after {
			height: 100%;
		}
  }
} */
</style>