import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
// import sanitizeHtml from 'sanitize-html';
// import MarkdownIt from 'markdown-it';
// const parser = new MarkdownIt()


export async function GET(context) {

    const posts = await getCollection('allBlog')

    return rss({
        title: "Food's Tech Blog",
        description: "A rookie developer's blog about tech",
        site: context.site,
        items: posts.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `${post.id}`,
        })),
    });
}