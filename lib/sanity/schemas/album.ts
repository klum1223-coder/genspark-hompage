import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'album',
  title: '사진 앨범',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '앨범명',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: '날짜',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '예배', value: '예배' },
          { title: '행사', value: '행사' },
          { title: '선교', value: '선교' },
          { title: '교육', value: '교육' },
          { title: '친교', value: '친교' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '설명',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: '대표 이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: '사진들',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: '사진 설명',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: '활성화',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      category: 'category',
      imageCount: 'images.length',
      isActive: 'isActive',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, date, category, imageCount, isActive, media } = selection
      const status = isActive ? '🟢' : '🔴'
      const dateStr = date ? new Date(date).toLocaleDateString('ko-KR') : ''
      
      return {
        title: `${status} ${title}`,
        subtitle: `${dateStr} | ${category} | ${imageCount || 0}장`,
        media,
      }
    },
  },
  orderings: [
    {
      title: '날짜 (최신순)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
    {
      title: '날짜 (오래된순)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
})
