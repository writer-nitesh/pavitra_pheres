import { defineCollection, z } from 'astro:content'

const CATEGORIES = [
    'Wedding Venues',
    'Planning Tips',
    'Local Traditions',
    'Seasonal Considerations',
    'Vendor Recommendations',
    'Real Wedding Stories',
    'Legal Requirements',
    'Budgeting Tips',
    'Guest Activities',
    'Cultural Experiences',
    'Cultural Heritage'
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
            tags: z.array(z.string()),
            keywords: z.array(z.string()),
            draft: z.boolean().default(false),
            tableOfContents: z.array(z.string()),
            relatedPosts: z.array(z.string())
        })
})

export const collections = { posts }