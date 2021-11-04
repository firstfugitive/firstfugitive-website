<template>
  <div>
    <component
      v-for="(item) in content"
      :is="item.contentType"
      :data="item"
      :key="`${item.contentType}_${item.sys.id}`"
    />
  </div>
</template>

<script>
import DvdAnimation from '../components/molecule/DvdAnimation.vue';
import { createClient } from "../plugins/contentful";

const client = createClient();
//item.contentType.split('page')[1]
export default {
  components: { DvdAnimation },
  name: "Page",
  head() {
    return {
      title: `${this.pageTitle} | Ben Jacobsen`,
      htmlAttrs: {
        lang: "en",
      },
    };
  },
  async asyncData(ctx) {
    const route = ctx.route.path;
    let pathParts = route.split('/').filter(e => e !== '');
    let slug = pathParts.reverse()[0];
    let urlSubfolder = '/' + route.substr(0, route.lastIndexOf(slug));
    slug = slug || 'index';

    if (true/*ctx.isDev*/) {
      console.info('ROUTE', route);
      console.info('NAME', ctx.route.name);
      console.info('URL-SUBFOLDER', urlSubfolder);
      console.info('SLUG', slug);
    }

    let pageObject = await client.getEntries({
      content_type: 'page',
      /*'fields.urlSubfolder.fields.path': urlSubfolder,*/
      'fields.slug': slug,
      include: 6
    }).then((response) => response.items[0]);

    //if page not able to be fetched -> probably 404 error
    if (!pageObject) {
      console.error('Error 404: Page could not be found.')
      ctx.error({ message: 'Error 404', statusCode: 404 });
      return;
    }

    return {
      pageObject,
      slug,
      urlSubfolder
    };
  },
  computed: {
    pageTitle() {
      return this.pageObject?.fields?.pageTitle;
    },
    content() {
      if (!this.pageObject?.fields?.content) {
        return [];
      }
      return Object.values(this.pageObject?.fields?.content)
        .filter(i => i instanceof Object)
        .flat()
        .map(i => ({
          ...i,
          contentType: i?.sys?.contentType?.sys?.id
      }));
    },
    text() {
      return this.pageObject?.fields?.text;
    },
  }
};
</script>

<style >

body {
  margin: 0;
}

</style>
