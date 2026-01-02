import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
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
          { title: '예배', value: 'worship' },
          { title: '행사', value: 'event' },
          { title: '선교', value: 'mission' },
          { title: '교육', value: 'education' },
          { title: '친교', value: 'fellowship' },
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
      title: '대표 사진',
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
      validation: (Rule) => Rule.required().min(1),
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
            {
              name: 'alt',
              type: 'string',
              title: '대체 텍스트',
              description: '이미지가 로드되지 않을 때 표시될 텍스트',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: '표시 순서',
      type: 'number',
      initialValue: 0,
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
      const categoryMap: Record<string, string> = {
        worship: '예배',
        event: '행사',
        mission: '선교',
        education: '교육',
        fellowship: '친교',
      }
      
      return {
        title: `${status} ${title}`,
        subtitle: `${dateStr} | ${categoryMap[category] || category} | ${imageCount || 0}장`,
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
      title: '표시 순서',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
