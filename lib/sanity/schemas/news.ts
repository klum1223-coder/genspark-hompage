import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'news',
  title: '교회 소식',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '카테고리',
      type: 'string',
      options: {
        list: [
          { title: '공지', value: '공지' },
          { title: '행사', value: '행사' },
          { title: '소식', value: '소식' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: '날짜',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: '작성자',
      type: 'string',
      initialValue: '관리자',
    }),
    defineField({
      name: 'excerpt',
      title: '요약',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'content',
      title: '내용',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: '썸네일',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'isFeatured',
      title: '주요 공지',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'views',
      title: '조회수',
      type: 'number',
      initialValue: 0,
      readOnly: true,
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
      category: 'category',
      date: 'date',
      isFeatured: 'isFeatured',
      isActive: 'isActive',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { title, category, date, isFeatured, isActive, media } = selection
      const status = isActive ? '🟢' : '🔴'
      const featured = isFeatured ? '⭐' : ''
      const dateStr = date ? new Date(date).toLocaleDateString('ko-KR') : ''
      
      return {
        title: `${status} ${featured} ${title}`,
        subtitle: `${dateStr} | ${category}`,
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
      title: '조회수 (많은순)',
      name: 'viewsDesc',
      by: [{ field: 'views', direction: 'desc' }],
    },
  ],
})
