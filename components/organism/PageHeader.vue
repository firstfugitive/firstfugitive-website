<template>
  <div class="module page-header">
    <div class="page-header__wrapper">
      <div class="page-header__bg">
        <div class="page-header__gradient"></div>
      </div>
      <header class="">
        <ul>
          <li>
            BEN JACOBSEN
          </li>
        </ul>
      </header>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header"
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

  header {
    position: absolute;
    top: 0;
    left: 0;
    color: $color-white;
    padding: 2rem 3rem;

    ul > li {
      @extend %fontGotham;
    }
  }
}
</style>
