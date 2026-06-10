import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '6zrqfn4s',
  dataset: 'production',
  useCdn: false, // will fetch drafts!
  apiVersion: '2024-01-01',
});

async function run() {
  try {
    const projects = await client.fetch(`*[_type == "project"]{ _id, title, slug }`);
    console.log(JSON.stringify(projects, null, 2));
  } catch (e) {
    console.error(e);
  }
}

run();
