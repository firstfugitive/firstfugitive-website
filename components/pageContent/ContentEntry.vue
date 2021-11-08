<template>
  <div>
    <component
      v-for="item in content"
	    :is="item.contentType"
      :data="item"
      :key="`${item.contentType}_${item.sys.id}`"
      :contentTypeId="item.sys.id"
    />
  </div>
</template>

<script>
export default {
  name: "ContentEntry",
  props: {
    data: {},
  },
  computed: {
    content() {
	    if (!this.data?.fields?.content) {
        return [];
      }
      return Object.values(this.data?.fields?.content)
        .filter(i => i instanceof Object)
        .flat()
        .map(i => ({
          ...i,
          contentType: i?.sys?.contentType?.sys?.id
      }));
    }
  },
};
</script>

<style scoped>

.link {
  position: absolute;
  top:0;
  left:0;
}
</style>
