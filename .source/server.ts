// @ts-nocheck
import * as __fd_glob_6 from "../content/docs-unity/index.mdx?collection=docsUnity"
import { default as __fd_glob_5 } from "../content/docs-unity/meta.json?collection=docsUnity"
import * as __fd_glob_4 from "../content/docs-engine/index.mdx?collection=docsEngine"
import * as __fd_glob_3 from "../content/docs-engine/getting-started.mdx?collection=docsEngine"
import { default as __fd_glob_2 } from "../content/docs-engine/meta.json?collection=docsEngine"
import * as __fd_glob_1 from "../content/docs-csharp/index.mdx?collection=docsCsharp"
import { default as __fd_glob_0 } from "../content/docs-csharp/meta.json?collection=docsCsharp"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docsCsharp = await create.docs("docsCsharp", "content/docs-csharp", {"meta.json": __fd_glob_0, }, {"index.mdx": __fd_glob_1, });

export const docsEngine = await create.docs("docsEngine", "content/docs-engine", {"meta.json": __fd_glob_2, }, {"getting-started.mdx": __fd_glob_3, "index.mdx": __fd_glob_4, });

export const docsUnity = await create.docs("docsUnity", "content/docs-unity", {"meta.json": __fd_glob_5, }, {"index.mdx": __fd_glob_6, });