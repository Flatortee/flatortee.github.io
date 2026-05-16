// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docsCsharp: create.doc("docsCsharp", {"index.mdx": () => import("../content/docs-csharp/index.mdx?collection=docsCsharp"), }),
  docsEngine: create.doc("docsEngine", {"getting-started.mdx": () => import("../content/docs-engine/getting-started.mdx?collection=docsEngine"), "index.mdx": () => import("../content/docs-engine/index.mdx?collection=docsEngine"), }),
  docsUnity: create.doc("docsUnity", {"index.mdx": () => import("../content/docs-unity/index.mdx?collection=docsUnity"), }),
};
export default browserCollections;