import { defineField, defineType } from "sanity";

export const postType = defineType({
    name:"post",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
          name: "slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 96,
          },
        }),
        defineField({
            name: "publishedDate",
            type: "datetime",
        }),
        defineField({
            name: "description",
            type: "string",
        }),
        defineField({
            name: "author",
            type: "string",
        }),
        defineField({
            name: "mainImage",
            type: "image",
            options: {
                hotspot: true,
            },
            fields: [
                {
                    name: "alt",
                    type: "string",
                    title: "Alternative Text",
                },
            ],
        }),
        defineField({
            name: "tags",
            type: "array",
            of: [{type: "string"}]
        }),
        defineField({
            name: "body",
            type: "blockContent",
        })
    ],

    preview: {
        select: {
            title: "title",
            author: "post.author",
            media: "mainImage",
        },
        prepare(selection) {
            const { author } = selection;
            return { ...selection, subtitle: author && `by ${author}` };
        },
    },
});