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


<style lang="scss" >
@import "assets/css/variables";

.base-link {
  position: relative;
	text-align: center;

	.link {
		display: block;
		position: relative;
		padding: 1rem 2rem;
  	border: 1px solid $color-design-black;

    text-decoration: none;
    color: $color-design-black;
    &:visited {
      color: $color-design-black;
    	text-decoration: none;
    }

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
}
</style>