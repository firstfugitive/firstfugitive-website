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
        ...this.openGraphTagsAndMicrodata
      ],
      headAttrs: {
        itemscope: true,
        itemtype: 'http://schema.org/Article'
      },
      htmlAttrs: {
        lang: "de",
      },
      link: [
        ...this.microdataForLinkTag
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          type: "application/ld+json",
          innerHTML: this.jsonLdForScriptTag
        }
      ]
    };
  },
  async asyncData(ctx) {
    const route = ctx.route.path;
    let pathParts = route.split('/').filter(e => e !== '');
    let slug = pathParts.reverse()[0];
    let urlSubfolder = route.substr(0, route.lastIndexOf(slug));
    slug = slug || 'index';

    if (ctx.isDev) {
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
    },
    contentType() {
      return this.pageContent?.sys?.contentType?.sys?.id;
    },
    seoImage() {
      //TODO: maybe implement logic to pull image from blog if it's a blog
      return this.pageObject?.fields?.openGraphImage ? 
        this.pageObject.fields.openGraphImage : this.standardPageConfig?.fields?.openGraphStandardImage;
    },
    seoDescription() {
      return this.pageObject?.fields?.openGraphDescription ? 
        this.pageObject.fields.openGraphDescription : this.standardPageConfig?.fields?.openGraphStandardDescription;
    },
    openGraphTagsAndMicrodata() {
      const ogTitle = this.pageTitle;

      let ogAdditionals = {}
      if(this.pageObject?.fields?.openGraphAdditionals) {
        ogAdditionals = this.pageObject.fields.openGraphAdditionals;
      } else if(this.standardPageConfig?.fields?.openGraphStandardAdditionals) {
        ogAdditionals = this.standardPageConfig.fields.openGraphStandardAdditionals;
      }
      
      //disable if no option is set
      if (!ogTitle && !this.seoDescription && !this.seoImage && (!ogAdditionals || !ogAdditionals.length > 0))
        return [];

      let ogTags = [
        //these tags are always available
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'benjacobsen.de' },
        {
          property: 'og:url',
          content: `https://www.benjacobsen.com${this.urlSubfolder}${this.slug === "index" ? "" : this.slug}/`
        }
      ];

      //these tags may or may not be added, even though that might cause og tags not to be complete
      if (ogTitle) ogTags.push({ property: 'og:title', itemprop: 'name', content: ogTitle });
      if (this.seoDescription) {
        ogTags.push({ property: 'og:description', itemprop: 'description', content: this.seoDescription });
        ogTags.push({ hid: 'description', name: 'description', content: this.seoDescription })
      }
      if (this.seoImage?.fields?.file?.url) ogTags.push({
        property: 'og:image',
        content: 'https:' + this.seoImage.fields.file.url
      });

      //tags added by editors
      
      if (ogAdditionals) {
        let ogAdditionalsList = [];
        for (let [key, value] of Object.entries(ogAdditionals)) {
          ogAdditionalsList.push({
            hid: key,
            property: key,
            content: value
          })
        }
        ogTags = [
          ...ogTags,
          ...ogAdditionalsList
        ]
      }

      return ogTags;
    },
    microdataForLinkTag() {
      if (this.seoImage?.fields?.file?.url) {
        return [
          {
            itemprop: 'image',
            href: this.seoImage.fields.file.url
          }
        ]
      };
      return []
    },
    jsonLdForScriptTag() {
      return `{
        "@context": "https://schema.org/",
        "@type": "Article",
        "name": "${this.pageTitle}",
        "headline": "${this.seoDescription}",
        "image": "${this.seoImage?.fields?.file?.url ? this.seoImage.fields.file.url : ""}",
        "author": {
          "@type": "Person",
          "name": "Ben Jacobsen",
          "url": "https://benjacobsen.de"
        }
      }`
    }
  }
};
</script>

<style >

body {
  margin: 0;
}

</style>
