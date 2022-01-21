<template>
  <div>
    <component
      :is="contentType"
      :data="pageContent"
      :standardPageConfig="standardPageConfig"
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
      title: this.pageTitle,
      meta: [
        ...this.openGraphTags
      ],
      htmlAttrs: {
        lang: "de",
      },
    };
  },
  async asyncData(ctx) {
    const route = ctx.route.path;
    let pathParts = route.split('/').filter(e => e !== '');
    let slug = pathParts.reverse()[0];
    let urlSubfolder = route.substr(0, route.lastIndexOf(slug));
    slug = slug || 'index';

    if (true/*ctx.isDev*/) {
      console.info('ROUTE', route);
      console.info('NAME', ctx.route.name);
      console.info('URL-SUBFOLDER', urlSubfolder);
      console.info('SLUG', slug);
    }

    //fetch page
    let pageObject = await client.getEntries({
      content_type: 'page',
      /*'fields.urlSubfolder.fields.path': urlSubfolder,*/
      'fields.slug': slug,
      include: 6
    }).then((response) => response.items[0]);

    //fetch standard page configuration
    let standardPageConfig = await client.getEntries({
      content_type: 'standardPageConfig',
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
      urlSubfolder,
      standardPageConfig
    };
  },
  computed: {
    pageTitle() {
      let pageTitle = this.pageObject?.fields?.pageTitle;
      if(!pageTitle) return 'Ben Jacobsen';
      return `${pageTitle} | Ben Jacobsen`;
    },

    pageContent() {
      if (!this.pageObject?.fields?.content) {
        return undefined;
      }
      return this.pageObject.fields.content;
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
    contentType() {
      return this.pageContent?.sys?.contentType?.sys?.id;
    },
    openGraphTags() {
      const ogTitle = this.pageTitle;
      const ogDescription = this.pageObject?.fields?.openGraphDescription ? 
        this.pageObject?.fields?.openGraphDescription : this.standardPageConfig?.fields.openGraphStandardDescription;
      //TODO: maybe implement logic to pull image from blog if it's a blog
      const ogImage = this.pageObject?.fields?.openGraphImage ? 
        this.pageObject?.fields?.openGraphImage : this.standardPageConfig?.fields.openGraphStandardImage;
      const ogAdditionals = undefined//this.fields.additionalOpenGraphTags;

      //disable if no option is set
      if (!ogTitle && !ogDescription && !ogImage && (!ogAdditionals || !ogAdditionals.length > 0))
        return [];

      let ogTags = [
        //these tags are always available
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'benjacobsen.de' },
        {
          property: 'og:url',
          content: `https://www.benjacobsen.com${this.urlSubfolder}${this.slug}/`
        }
      ];

      //these tags may or may not be added, even though that might cause og tags not to be complete
      if (ogTitle) ogTags.push({ property: 'og:title', content: ogTitle });
      if (ogDescription) ogTags.push({ property: 'og:description', content: ogDescription });
      if (ogImage?.fields?.file?.url) ogTags.push({
        property: 'og:image',
        content: 'https:' + ogImage.fields.file.url
      });

      //tags added by editors
      if (ogAdditionals) {
        ogTags = [
          ...ogTags,
          ...(ogAdditionals.map(e => ({
            hid: e.key,
            property: e.key,
            content: e.value
          })))
        ]
      }

      return ogTags;
    },
  }
};
</script>

<style >

body {
  margin: 0;
}

</style>
