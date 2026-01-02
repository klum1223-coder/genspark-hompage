import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'sermon',
  title: '설교',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '설교 제목',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pastor',
      title: '설교자',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: '설교 날짜',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'verse',
      title: '본문 말씀',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: '설교 분류',
      type: 'string',
      options: {
        list: [
          { title: '주일 설교', value: '주일 설교' },
          { title: '수요 설교', value: '수요 설교' },
          { title: '특별 설교', value: '특별 설교' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'series',
      title: '시리즈',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: '요약',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: '설교 내용',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'audioUrl',
      title: '오디오 URL',
      type: 'url',
    }),
    defineField({
      name: 'videoUrl',
      title: '비디오 URL',
      type: 'url',
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
      name: 'attachments',
      title: '첨부파일 (PDF 등)',
      type: 'array',
      of: [{ type: 'file' }],
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
      pastor: 'pastor',
      date: 'date',
      category: 'category',
      isActive: 'isActive',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { title, pastor, date, category, isActive, media } = selection
      const status = isActive ? '🟢' : '🔴'
      const dateStr = date ? new Date(date).toLocaleDateString('ko-KR') : ''
      
      return {
        title: `${status} ${title}`,
        subtitle: `${dateStr} | ${pastor} | ${category}`,
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
  ],
})
