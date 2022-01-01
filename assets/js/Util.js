export const getUrlFromPage = (page) => {
  if(page && page.fields 
      && page.fields.urlSubfolder && page.fields.urlSubfolder.fields && page.fields.urlSubfolder.fields.path
      && page.fields.slug) {
    return `${page.fields.urlSubfolder.fields.path}${page.fields.slug}`;
  } else {
    return undefined;
  }
}

export const formatDate = (rawDate) => {
  if (!rawDate) {
    return undefined;
  }
  const date = new Date(rawDate);
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleString('en', dateOptions);
}
