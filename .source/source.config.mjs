// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
var docsEngine = defineDocs({
  dir: "content/docs-engine",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    }
  },
  meta: {
    schema: metaSchema
  }
});
var docsCsharp = defineDocs({
  dir: "content/docs-csharp",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    }
  },
  meta: {
    schema: metaSchema
  }
});
var docsUnity = defineDocs({
  dir: "content/docs-unity",
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true
    }
  },
  meta: {
    schema: metaSchema
  }
});
var source_config_default = defineConfig({
  mdxOptions: {
    // Add MDX plugins here if needed.
  }
});
export {
  source_config_default as default,
  docsCsharp,
  docsEngine,
  docsUnity
};
