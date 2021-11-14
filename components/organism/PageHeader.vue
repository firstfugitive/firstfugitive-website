<template>
  <div class="module page-header">
    <div class="page-header__wrapper">
      <div class="page-header__bg">
        <div class="page-header__gradient"></div>
      </div>
      <header class="">
        <ul class="page-header__elements">
          <li>{{title}}</li>
        </ul>
        <svg 
          @click="activateMenu"
          class="page-header__menu-icon" 
          width="20" height="20" viewBox="0 0 20 20">
          <title>
            dots
          </title>
          <circle cx="10" cy="10" r="2"/>
          <circle cx="3" cy="10" r="2"/>
          <circle cx="17" cy="10" r="2"/>
        </svg>
        <div :class="['page-header__menu', {'page-header__menu--active': menuActive}]">
          
        </div>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    data: Object,
  },
  data() {
    return {
      menuActive: false
    }
  },
  methods: {
    activateMenu(e) {
      e.preventDefault();
      console.log('Hello');
      this.menuActive = !this.menuActive;
    }
  },
  computed: {
    title() {
      return this.data?.fields?.title;
    }
  }
}

</script>

<style lang="scss">
@import 'assets/css/variables.scss';
@import 'assets/css/placeholder.scss';

.page-header {
  width: 100vw;
  height: var(--height-header);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;

  &__wrapper {
    position: relative;
  }

  &__bg {
  }

  &__gradient {
    opacity: 0.6;
    background-image: url(assets/img/menu-gradient.png);
    background-repeat: no-repeat;
    background-size: contain;
    background-repeat: repeat-x;
    width: 100%;
    height: 100px;
  }

  &__menu-icon {
    fill: $color-white;
    z-index: 102;

    @include mb-up($tablet-min) {
      height: 30px;
      width: 30px;
    }
  }

  &__menu {
    z-index: 101;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $color-soft-white;
    width: 0vw;
    height: 100vh;
    overflow-x: hidden;
    transition: width 0.5s ease-out;

    &--active {
      width: 100vw;
    }
  }

  header {
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    color: $color-white;
    padding: 2rem 3rem;

    @include mb-down($mobile-max) {
      font-size: 0.7rem;
      padding: 1.4rem 1.8rem;
    }

  }

  &__elements {
    flex-grow: 1;

    & > li {
      @extend %fontGotham;
    }
  }
}
</style>
