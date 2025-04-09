import { glob } from "astro/loaders"
import { z, defineCollection, type CollectionConfig } from "astro:content"

const blogSchema = z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
        url: z.string(),
        alt: z.string(),
    }),
    tags: z.array(z.string())
})

const createBlogCollection = (baseUrl: string): CollectionConfig<typeof blogSchema> => {
    return defineCollection({
        loader: glob({pattern: '**/[^_]*.md', base: baseUrl}),
        schema: blogSchema
    })
}

export const collections = { 
    allBlog: createBlogCollection("./src/blog/all"),
    frontendBlog: createBlogCollection("./src/blog/frontend"), 
    backendBlog: createBlogCollection("./src/blog/backend"), 
    databaseBlog: createBlogCollection("./src/blog/database"), 
    webscrapingBlog: createBlogCollection("./src/blog/webscraping") }