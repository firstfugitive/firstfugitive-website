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
  border: 2px solid black;
	padding: 1rem 2rem;
	&:hover {
			background: rgba(220, 171, 171, 0.1);
	}

	&::before {
		content: '';
		position: absolute;
		z-index: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 0%;
		transition: height 0.5s;
		background-color: $color-soft-white;
	}

	&:hover::before {
		height: 100%;
	}

	.link {
		position: relative;
		z-index: 100;

    text-decoration: none;
    &:visited {
      color: black;
    }
  }
}
</style>