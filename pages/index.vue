<template>
  <div>
    <span>Hello World</span>
    <span>{{ fields.text }}</span>
  </div>
</template>

<script>
import { createClient } from '../plugins/contentful';

const client = createClient();

export default {
  name: 'Home',
  data() {
    return {
      loaded: false,
      fields: {},
      metadata: {},
      sys: {}
    }
  },
  head() {
    return {
      title: `FirstFugitive | Home`,
      htmlAttrs: {
        lang: 'en'
      }
    }
  },
  async asyncData(ctx) {

    console.log('CTX', ctx);

    const route = ctx.route.path;
    console.log('route', route);

    return route;
  },
  async fetch() {

    let pageEntries = await client.getEntries({
    }).then((response) => {
      const content = response.items[0];
      this.fields = content.fields;
      this.metadata = content.metadata;
      this.sys = content.sys;

      return content;
    });

    console.log('pageEntries', pageEntries);

    //if page not able to be fetched -> probably 404 error
    if (!pageEntries) {
      console.error('Error 404: Page could not be found.')
      return;
    }

    return pageEntries;
  }

}
</script>
