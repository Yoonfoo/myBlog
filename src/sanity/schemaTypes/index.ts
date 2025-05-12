import type { SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./blockContent";
import { tagType } from "./tag";
import { postType } from "./post";

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [blockContentType, tagType, postType],
};