import { createClient } from '../../plugins/contentful.js';

const client = createClient();

const BlogService = {
  fetchAll
}

export default BlogService;

async function fetchAll(descending = false) {
  let result = await client.getEntries({
    content_type: 'page',
    'fields.content[0].sys.contentType.sys.id': 'pageContentHome',
    limit: 1000
  }).then((res) => res.items);

  return result;
}