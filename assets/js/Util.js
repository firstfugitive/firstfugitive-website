export const getUrlFromPage = (page) => {
  return `${page?.fields?.urlSubfolder?.fields?.path}${page?.fields?.slug}`;
}