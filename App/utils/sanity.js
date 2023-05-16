import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "su52ogba",
  dataset: "production",
  useCdn: true, // set to `true` to fetch from edge cache
  apiVersion: "2022-01-12",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
// sanity cors add http://localhost:3000
export default client;
