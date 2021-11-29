<template>
  <div class="page-header">
    <div class="page-header__wrapper">
      <div class="page-header__bg">
        <div class="page-header__gradient"></div>
      </div>
      <header class="">
        <ul class="page-header__elements">
          <li>{{title}}</li>
        </ul>
        <div 
          @click="activateMenu"
          class="page-header__menu-button"  >
          <svg width="20" height="20" viewBox="0 0 20 20"
            :class="['page-header__menu-icon', {'page-header__menu-icon--active': menuActive}]">
            <title>
              dots
            </title>
            <circle cx="10" cy="10" r="2"/>
            <circle cx="3" cy="10" r="2"/>
            <circle cx="17" cy="10" r="2"/>
          </svg>
        </div>
        <div :class="['page-header__menu', {'page-header__menu--active': menuActive}]">
          <ul class="page-header__menu-navigation">
            <li class="page-header__menu-element"
              v-for="(elem, i) in navigationElements"
              :key="`navElem_${i}`">
              <base-link 
                :url="getNavElementUrl(elem)" 
                :text="getNavElementUrlText(elem)"
                :darkStyle="true"></base-link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import BaseLink from '../atom/BaseLink.vue';
export default {
  components: { BaseLink },
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
    },
    getNavElementUrl(element) {
      let link = element?.fields?.link?.fields;
      return `${link?.urlSubfolder?.fields?.path}${link?.slug}`;
    },
    getNavElementUrlText(element) {
      return element?.fields?.title;
    }
  },
  computed: {
    title() {
      return this.data?.fields?.title;
    },
    navigationElements() {
      return this.data?.fields?.navigationElements;
    },
    navigationElements() {
      return this.data?.fields?.navigationElements;
    },
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
    //height: calc(var(--height-header) + 20px);
    height: var(--height-header);
  }

  &__menu-button {
    z-index: 102;
    cursor: pointer;

    
  }

  &__menu-icon {
    margin: 0.5rem;
    fill: $color-white;

    @include mb-up($tablet-min) {
      height: 30px;
      width: 30px;
    }

    &--active {
      fill: $color-design-grey;
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
    font-size: 1rem;

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

  &__menu {
    z-index: 101;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $color-transparent-white;
    width: 100vw;
    height: 0vh;
    overflow: hidden;
    transition: height 0.5s ease-out, opacity 0.5s ease-out;
    opacity: 0;

    &--active {
      opacity: 1;
      height: 100vh;

      .page-header__menu-element {
        opacity: 1;
      }

      .page-header__menu-icon {
        fill: $color-design-grey;
      }
    }

    &-navigation {
      max-width: 52%;
      margin: var(--height-header) auto 2rem auto;
      text-align: center;
    }

    &-element {
      padding: 1rem 0;
      color: $color-design-grey;
      transition: opacity 0.8s ease-out;
      opacity: 0;
      
      @extend %fontBig;
    }
  }
}
</style>
