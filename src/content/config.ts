import { defineCollection, z } from 'astro:content'

const CATEGORIES = [
    'Destination Weddings',
    'Cultural Heritage',
    'Wedding Planning',
] as const

export const posts = defineCollection({
    type: 'content',
    schema: ({ image }) =>
        z.object({
            title: z.string().max(80),
            description: z.string(),
            pubDate: z
                .string()
                .or(z.date())
                .transform((val) => new Date(val)),
            cover: image(),
            coverAlt: z.string(),
            coverImgSourceName: z.string(),
            coverImgSourceLink: z.string(),
            category: z.enum(CATEGORIES),
            keywords: z.array(z.string()),
            draft: z.boolean().default(false),
            tableOfContents: z.array(z.string()),
            relatedPosts: z.array(z.string())
        })
})

export const collections = { posts }