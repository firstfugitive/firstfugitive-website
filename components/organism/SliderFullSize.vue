<template>
    <div class="module slider-full-size">
        <img class="" :src="firstImageSrc">
        <div class="slider-full-size__modal">
            <base-link :url="linkUrl" :text="'Home'"></base-link>
        </div>
    </div>
</template>

<script>
import BaseLink from '../atom/BaseLink.vue';
export default {
    components: { BaseLink },
    name: "SliderFullSize",
    props: {
        data: Object
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
        linkUrl() {
            return `${"/"}${"home"}`;
        }
    }
}
</script>


<style lang="scss" scoped>

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

    img {
        display: block;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
    }

    &__modal {
        position: absolute;
        top:50%;
        left:50%;
        transform: translateX(-50%);
    }
}

</style>