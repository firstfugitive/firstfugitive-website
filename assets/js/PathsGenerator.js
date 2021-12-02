const contentful = require('../../plugins/contentful');

const PAGES = {
  'content_type': 'page',
  'limit': 1000,
};

function generatePaths() {
  return contentful.createClient().getEntries(PAGES)
    .then(extractPages)
    .then(transformPagesToPaths)
    .then(filterIndexPaths)
    .then(logPaths)
    .catch(handleError);
}

async function filterIndexPaths(pages) {
  return pages.map(e => e.replace('index/', ''));
}

async function extractPages(response) {
  return response.items;
}

async function transformPagesToPaths(pages) {
  return pages.flatMap(transformPageToPath);
}

async function logPaths(paths) {
  console.dir(paths, {maxArrayLength: 1000})
  console.log('Sites to be generated:', paths.length)
  return paths;
}

function transformPageToPath(page) {
  let paths = [];
  /* for (let lang in page.fields.slug) {
    const slug = page.fields.slug[lang];
    const urlSubfolder = page.fields.urlSubfolder[lang];
    if (!slug || !urlSubfolder)
      continue;
    const prefix = prefixFromLanguage(lang);
    paths.push(`${prefix}${urlSubfolder}${slug}/`)
  } */
  return `${page?.fields?.urlSubfolder?.fields?.path}${page?.fields?.slug}/`;
}

function prefixFromLanguage(language) {
  return language !== 'en' ? `/${language}` : '';
}

function handleError(error) {
  console.error(error);
  return ['/'];
}

module.exports = {generatePaths}
